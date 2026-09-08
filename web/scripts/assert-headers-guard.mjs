#!/usr/bin/env node
// CI guardrail for web/public/_headers.
//
// Why this exists. Until now this file had NO test of any kind — the only reference to it in the
// whole suite was a comment explaining why it isn't tested. That reasoning was half right: the HTTP
// *header* can't be asserted through scripts/serve-dist.mjs, which doesn't apply Pages headers. But
// the *file content* can, and that's where regression risk actually lives.
//
// It matters because this one file carries two different silent failures:
//
//   1. `X-Robots-Tag: noindex` — the pre-launch guard removed at cutover (docs/DECISIONS.md §13b).
//      If it comes back, the entire site is delisted from search with NO visible symptom. Pages
//      render fine, links work, nothing errors. You would find out from a traffic graph, weeks late.
//      robots.txt has two Playwright tests guarding exactly this; its other half had none.
//
//   2. The CSP. It grew during launch (googletagmanager for GTM, cdn.sanity.io for the portrait),
//      and each addition was argued for. `'unsafe-inline'` in script-src was specifically REFUSED
//      when GTM was added — the loader was made a same-origin static file instead, so the site
//      ships zero executable inline scripts (§12a). Nothing stopped a future edit from quietly
//      undoing that.
//
// Asserted as content, not presence: the file existing proves nothing.

import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HEADERS_PATH = join(
	dirname(fileURLToPath(import.meta.url)),
	"..",
	"public",
	"_headers",
);
const raw = readFileSync(HEADERS_PATH, "utf8");

// Directive lines only — a commented-out header is not a header, and must not fail this check.
const directives = raw
	.split("\n")
	.map((line) => line.trim())
	.filter((line) => line.length > 0 && !line.startsWith("#"));
const body = directives.join("\n");

// ---------------------------------------------------------------- 1. the delisting risk

const robotsTag = directives.filter((line) => /^X-Robots-Tag\s*:/i.test(line));
assert.deepEqual(
	robotsTag,
	[],
	`X-Robots-Tag is back in _headers: ${robotsTag.join(" | ")}\n\n` +
		"That header delists the entire site from search, and it does so SILENTLY — every page still " +
		"renders, nothing errors, no test but this one fails. It was the pre-launch guard, removed " +
		"deliberately at cutover (docs/DECISIONS.md §13b). If a noindex is genuinely wanted for one " +
		"document, use the per-document `seo.noindex` field in Sanity, which emits a page-level " +
		"robots meta tag instead of a site-wide header.",
);

// ---------------------------------------------------------------- 2. the CSP invariants

const csp = directives.find((line) =>
	/^Content-Security-Policy\s*:/i.test(line),
);
assert.ok(csp, "Content-Security-Policy is missing from _headers entirely.");

// The header NAME is stripped first: the first directive follows `Content-Security-Policy:` rather
// than a `;`, so parsing the raw line would silently return null for default-src and pass every
// assertion about it vacuously.
const cspValue = csp.replace(/^Content-Security-Policy\s*:/i, "");
const directiveValue = (name) => {
	const match = new RegExp(`(?:^|;)\\s*${name}\\s+([^;]+)`, "i").exec(cspValue);
	return match ? match[1].trim() : null;
};

const scriptSrc = directiveValue("script-src");
assert.ok(scriptSrc, "CSP has no script-src directive.");
assert.ok(
	!/'unsafe-inline'/i.test(scriptSrc),
	`script-src contains 'unsafe-inline': ${scriptSrc}\n\n` +
		"This was refused deliberately when GTM was added (docs/DECISIONS.md §12a). GTM's documented " +
		"snippet is inline JS; rather than weaken the policy site-wide to install one tag, the loader " +
		"was made a same-origin static file (public/analytics.js) reading its config from data " +
		"attributes. The site ships zero executable inline scripts and that is the point — adding " +
		"'unsafe-inline' here silently re-opens every page to injected script.",
);

const imgSrc = directiveValue("img-src");
assert.ok(
	imgSrc && /cdn\.sanity\.io/.test(imgSrc),
	`img-src must allow https://cdn.sanity.io, got: ${imgSrc}\n\n` +
		"Every image on the site is served from Sanity's CDN, including the Mr Kong portrait — the " +
		"only photograph on the site and the carrier of its central claim (design/ASSETS.md §2). " +
		"Without this the markup renders and the images silently do not load, which reads as a " +
		"rendering bug rather than a policy one.",
);

// Directives whose absence quietly widens the policy. Each was present at launch.
for (const [name, expected] of [
	["default-src", "'self'"],
	["object-src", "'none'"],
	["base-uri", "'self'"],
	["frame-ancestors", "'none'"],
]) {
	assert.equal(
		directiveValue(name),
		expected,
		`CSP ${name} should be ${expected}, got: ${directiveValue(name)}`,
	);
}

// ---------------------------------------------------------------- 3. the other security headers

for (const header of [
	"X-Content-Type-Options",
	"Referrer-Policy",
	"X-Frame-Options",
]) {
	assert.ok(
		new RegExp(`^${header}\\s*:`, "im").test(body),
		`${header} is missing from _headers.`,
	);
}

console.log(
	"OK: _headers carries no X-Robots-Tag, keeps 'unsafe-inline' out of script-src, allows " +
		"cdn.sanity.io for images, and retains its core CSP and security headers.",
);
