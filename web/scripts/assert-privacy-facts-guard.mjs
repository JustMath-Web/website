#!/usr/bin/env node
// Guards the privacy notice (docs/DECISIONS.md §49). Two parts:
//   1. unit cases for checkPrivacyFacts — the function the production build runs;
//   2. the real facts and the real page, checked as production would see them.
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import {
	checkPrivacyFacts,
	isPrivacyReleaseReady,
	previewBranch,
} from "../src/lib/content/assertPrivacyFacts.ts";
import { PRIVACY_FACTS } from "../src/lib/privacy.ts";
import {
	PRIVACY_NOTICE,
	SECTION_IDS,
} from "../src/lib/content/privacyNotice.ts";

const good = {
	ownerName: "Example Sdn Bhd",
	contactEmail: "hello@mathematicsmalaysia.com",
	whatsappRetention: {
		en: "12 months after the last message",
		ms: "12 bulan selepas mesej terakhir",
	},
	analyticsRetention: { en: "14 months", ms: "14 bulan" },
	lastUpdated: "2026-10-09",
	copyApprovedOn: "2026-10-10",
};
const prod = { DEPLOY_ENV: "production" };

// A finished set passes; anything unfinished fails in production only.
assert.equal(checkPrivacyFacts(good, prod).error, undefined);
assert.equal(
	checkPrivacyFacts({ ...good, ownerName: null }, {}).error,
	undefined,
	"non-production never blocks",
);

// Each case breaks ONE thing and the error must name that field.
const cases = {
	"ownerName null": [{ ownerName: null }, "ownerName"],
	"contactEmail null": [{ contactEmail: null }, "contactEmail"],
	"whatsappRetention.en null": [
		{ whatsappRetention: { ...good.whatsappRetention, en: null } },
		"whatsappRetention.en",
	],
	"whatsappRetention.ms null": [
		{ whatsappRetention: { ...good.whatsappRetention, ms: null } },
		"whatsappRetention.ms",
	],
	"analyticsRetention.en null": [
		{ analyticsRetention: { ...good.analyticsRetention, en: null } },
		"analyticsRetention.en",
	],
	"analyticsRetention.ms null": [
		{ analyticsRetention: { ...good.analyticsRetention, ms: null } },
		"analyticsRetention.ms",
	],
	"ownerName undefined": [{ ownerName: undefined }, "ownerName"],
	"ownerName 2 chars": [{ ownerName: "ab" }, "ownerName"],
	"ownerName whitespace": [{ ownerName: "   " }, "ownerName"],
	"bracket in ownerName": [{ ownerName: "[owner name]" }, "ownerName"],
	"bracket in en retention": [
		{ whatsappRetention: { ...good.whatsappRetention, en: "[12] months" } },
		"whatsappRetention.en",
	],
	"mixed-case Todo": [
		{ analyticsRetention: { ...good.analyticsRetention, ms: "Todo" } },
		"analyticsRetention.ms",
	],
	"N/A": [{ ownerName: "N/A" }, "ownerName"],
	TBC: [{ ownerName: "TBC" }, "ownerName"],
	"to be confirmed": [{ ownerName: "To be confirmed" }, "ownerName"],
	"???": [{ ownerName: "???" }, "ownerName"],
	"bad date": [{ lastUpdated: "yesterday" }, "lastUpdated"],
	"impossible date": [{ lastUpdated: "2026-02-30" }, "lastUpdated"],
	"9999-99-99": [{ lastUpdated: "9999-99-99" }, "lastUpdated"],
	"bad email": [{ contactEmail: "not-an-email" }, "contactEmail is not"],
	"a@b.x email": [{ contactEmail: "a.b@c.x" }, "contactEmail is not"],
	"copyApprovedOn null": [{ copyApprovedOn: null }, "copyApprovedOn"],
	"copyApprovedOn impossible": [
		{ copyApprovedOn: "2026-13-01" },
		"copyApprovedOn",
	],
};
for (const [name, [bad, field]] of Object.entries(cases)) {
	const { error } = checkPrivacyFacts({ ...good, ...bad }, prod);
	assert.ok(error, `should reject: ${name}`);
	assert.ok(
		error.includes(field),
		`${name}: error should name ${field}, got: ${error}`,
	);
	const lines = error.split("\n").filter((l) => l.startsWith("  - "));
	assert.equal(
		lines.length,
		1,
		`${name}: should isolate one problem, got ${lines.length}`,
	);
}

// The page keeps its layout ids; the headings come from the content module.
const page = readFileSync(
	new URL("../src/pages/privacy.astro", import.meta.url),
	"utf8",
);
for (const lang of ["en", "ms"]) {
	assert.ok(
		page.includes(`id="notice-${lang}" lang="${lang}"`),
		`missing ${lang} section`,
	);
}

// Non-string runs in order: "em", "strong" or "fact:<key>".
function kinds(runs) {
	return runs
		.filter((r) => typeof r !== "string")
		.map((r) => ("fact" in r ? `fact:${r.fact}` : "em" in r ? "em" : "strong"))
		.join(",");
}
function shape(block) {
	return "p" in block
		? `p[${kinds(block.p)}]`
		: `ul:${block.ul.length}[${block.ul.map(kinds).join("|")}]`;
}
for (const lang of ["en", "ms"]) {
	const n = PRIVACY_NOTICE[lang];
	assert.equal(n.lang, lang, `${lang}: lang field`);
	assert.deepEqual(
		n.sections.map((s) => s.id),
		[...SECTION_IDS],
		`${lang}: all ten ids, in order`,
	);
	// check the text runs only (never JSON.stringify: its own [] syntax would match)
	const runs = [...n.preamble, ...n.sections.flatMap((s) => s.blocks)].flatMap(
		(b) => ("p" in b ? b.p : b.ul.flat()),
	);
	for (const r of runs) {
		const t =
			typeof r === "string"
				? r
				: "em" in r
					? r.em
					: "strong" in r
						? r.strong
						: "";
		assert.ok(
			!/\[[^\]]*\]/.test(t),
			`${lang}: bracketed placeholder text: ${t}`,
		);
		assert.ok(!/(TODO|TBD|FIXME)/i.test(t), `${lang}: placeholder word: ${t}`);
		assert.ok(!/[<>]/.test(t), `${lang}: markup in copy: ${t}`);
	}
}
// The preamble is not shape-compared: EN has an extra pointer line to the Malay version.
// translation drift: same structure in both languages, section by section
PRIVACY_NOTICE.en.sections.forEach((s, i) => {
	const m = PRIVACY_NOTICE.ms.sections[i];
	assert.deepEqual(
		s.blocks.map(shape),
		m.blocks.map(shape),
		`section ${s.id}: EN and MS block structure differ`,
	);
});

// Preview-branch exception: only a positively identified non-main branch skips the guard.
const nullFacts = { ...good, ownerName: null };
const P = (extra) => ({ DEPLOY_ENV: "production", ...extra });
for (const [label, env] of Object.entries({
	noBranch: P({}),
	emptyBranch: P({ WORKERS_CI_BRANCH: "" }),
	spaces: P({ WORKERS_CI_BRANCH: "   " }),
	main: P({ WORKERS_CI_BRANCH: "main" }),
	Main: P({ WORKERS_CI_BRANCH: "Main" }),
	mainSpace: P({ WORKERS_CI_BRANCH: "main " }),
	refsMain: P({ WORKERS_CI_BRANCH: "refs/heads/main" }),
	pagesMain: P({ CF_PAGES_BRANCH: "main" }),
})) {
	assert.ok(
		checkPrivacyFacts(nullFacts, env).error,
		`must stay blocked: ${label}`,
	);
	assert.equal(previewBranch(env), null, `not a preview: ${label}`);
}
for (const [label, env] of Object.entries({
	feature: P({ WORKERS_CI_BRANCH: "feat/consent-banner-privacy-notice" }),
	pages: P({ CF_PAGES_BRANCH: "feat/x" }),
	sameBoth: P({ WORKERS_CI_BRANCH: "feat/x", CF_PAGES_BRANCH: "feat/x" }),
})) {
	const r = checkPrivacyFacts(nullFacts, env);
	assert.equal(r.error, undefined, `preview must not be blocked: ${label}`);
	assert.ok(r.skippedForPreview, `preview skip must be reported: ${label}`);
}
for (const env of [
	P({ WORKERS_CI_BRANCH: "feat/x", CF_PAGES_BRANCH: "main" }),
	P({ WORKERS_CI_BRANCH: "main", CF_PAGES_BRANCH: "feat/x" }),
	P({ WORKERS_CI_BRANCH: "feat/x", CF_PAGES_BRANCH: "feat/y" }),
]) {
	assert.ok(
		checkPrivacyFacts(nullFacts, env).error,
		"conflicting branch signals must stay blocked",
	);
	assert.equal(previewBranch(env), null);
}
assert.equal(
	checkPrivacyFacts(good, P({ WORKERS_CI_BRANCH: "feat/x" })).skippedForPreview,
	undefined,
);
// The page's draft note / noindex follow isPrivacyReleaseReady, not copyApprovedOn alone.
assert.equal(isPrivacyReleaseReady(good), true);
assert.equal(
	isPrivacyReleaseReady({ ...good, contactEmail: null }),
	false,
	"copyApprovedOn set but contactEmail null is still not release-ready",
);
assert.equal(isPrivacyReleaseReady({ ...good, copyApprovedOn: null }), false);

// The real facts (last, so the content cases above report first), judged as production would.
const real = checkPrivacyFacts(PRIVACY_FACTS, prod);
assert.equal(real.error, undefined, real.error);

console.log("privacy facts guard: ok");
