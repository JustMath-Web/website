#!/usr/bin/env node
// CI guardrail for the landing-content completeness check
// (web/src/lib/content/contentGuards.ts -> findMissingLandingContent).
//
// Why this exists. On 2026-09-06 a `drafts.homePage` containing only Sanity schema defaults — a
// "husk" — was found sitting in production, where it had been for six days. Nothing in this repo
// could see it: the old guard was `if (!homePage || !siteSettings || !navigation)`, and a husk is a
// truthy object.
//
// Precise about the path, because Studio validation already covers the other one. The Studio could
// not have published that husk — the landing-critical fields are `Rule.required()` and Sanity
// disables Publish on validation errors. An API write (script, migration, agent tool) runs no such
// validation, and that is how it would have been published. Two independent controls, two paths.
//
// Discarding that draft fixed the data. This asserts the GUARD, because the mechanism that creates
// husks is "someone opens a singleton in the Studio", which is a thing people do. Without this, the
// next husk has exactly the same consequence.
//
// Deliberately a unit assertion rather than a full build: a husk cannot be simulated by clearing env
// vars the way assert-production-fails-without-sanity.mjs does, and the interesting behaviour is a
// pure function. Mirrors assert-post-static-paths-filter-nulls.mjs's shape.

import { strict as assert } from "node:assert";

const { findMissingLandingContent, hasText, firstNonEmpty } =
	await import("../src/lib/content/contentGuards.ts");

const complete = {
	homePage: {
		hero: {
			headline: "Know exactly where your child's maths stands",
			subheadline: "Twenty-four years…",
		},
		trustItems: [1, 2, 3, 4],
		levels: [1, 2, 3, 4],
	},
	siteSettings: {
		siteName: "Just Math Malaysia",
		whatsappNumber: "60194728768",
		whatsappMessage:
			"Hi, I'd like to book the free maths assessment. My child is in ___",
	},
	navigation: { headerLinks: [1], footerLinks: [1, 2, 3, 4, 5] },
};

const check = (o) =>
	findMissingLandingContent(o.homePage, o.siteSettings, o.navigation);

// 1. Real content passes.
assert.deepEqual(
	check(complete),
	[],
	"complete landing content should report nothing missing",
);

// 2. THE REGRESSION THAT MATTERS. This is the exact shape of the husk found in production:
//    a truthy document carrying only schema defaults. The old presence check passed it.
const husk = {
	homePage: {
		title: "Home page",
		hero: { cta: { label: "Book a free maths assessment on WhatsApp" } },
		seo: { noindex: false },
	},
	siteSettings: complete.siteSettings,
	navigation: complete.navigation,
};
const huskMissing = check(husk);
assert.ok(
	huskMissing.length > 0,
	"a husk homePage must be reported as incomplete",
);
assert.ok(
	huskMissing.includes("homePage.hero.headline"),
	`husk should name the missing headline, got: ${huskMissing.join(", ")}`,
);
assert.ok(
	huskMissing.includes("homePage.levels"),
	`husk should name the missing level blocks, got: ${huskMissing.join(", ")}`,
);

// 3. Null documents are still caught (the old guard's only real job).
assert.ok(
	check({ homePage: null, siteSettings: null, navigation: null }).length >= 3,
);

// 4. Empty strings are content, not presence — the `??`-vs-`""` instance of the same root cause.
assert.ok(
	check({
		...complete,
		siteSettings: { ...complete.siteSettings, siteName: "" },
	}).includes("siteSettings.siteName"),
	"an empty-string siteName must be reported missing, not accepted",
);
assert.ok(
	check({
		...complete,
		siteSettings: { ...complete.siteSettings, whatsappMessage: "   " },
	}).includes("siteSettings.whatsappMessage"),
	"a whitespace-only whatsappMessage must be reported missing",
);

// 5. The WhatsApp CTA is the site's only conversion channel: a page that renders with a dead button
//    is worse than a build that fails.
assert.ok(
	check({
		...complete,
		siteSettings: { ...complete.siteSettings, whatsappNumber: "" },
	}).includes("siteSettings.whatsappNumber"),
);

// 6. Helper semantics, since the string chains across three routes now depend on them.
assert.equal(hasText(""), false);
assert.equal(hasText("   "), false);
assert.equal(hasText("x"), true);
assert.equal(hasText(null), false);
assert.equal(hasText(0), false, "a non-string must never count as text");
assert.equal(firstNonEmpty(undefined, "", "  ", "real", "later"), "real");
assert.equal(firstNonEmpty(undefined, "", null), undefined);

console.log(
	"OK: landing content guard rejects husks, null documents, empty strings and whitespace — " +
		"and firstNonEmpty skips blanks that `??` would have passed through.",
);
