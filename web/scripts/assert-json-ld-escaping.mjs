#!/usr/bin/env node
// CI guardrail for web/src/lib/content/jsonLd.ts -> toSafeJsonLdString.
//
// Why this exists. All three application/ld+json blocks (BaseLayout's Organization, the blog post's
// BlogPosting, the home page's FAQPage) embed Sanity-authored text into a real <script> element via
// set:html. Plain JSON.stringify never escapes `<`, so a field containing the literal text
// `</script>` would close the script tag early and let the remainder of its value render as raw HTML
// — a real, if low-likelihood, injection path, since the text comes from trusted Sanity editors, not
// public visitors. Bob review, PR #86.
//
// Deliberately a unit assertion on the pure function, mirroring assert-landing-content-guard.mjs's
// shape, rather than a browser test: what matters here is the exact byte sequence in the output
// string, which a rendered DOM would already have parsed/escaped away by the time Playwright could
// inspect it.

import { strict as assert } from "node:assert";

const { toSafeJsonLdString } = await import("../src/lib/content/jsonLd.ts");

// 1. The dangerous case: a value containing a literal script-closing tag.
const malicious = {
	answer: '</script><script>alert("pwned")</script>',
};
const escaped = toSafeJsonLdString(malicious);
assert.ok(
	!escaped.includes("</script>"),
	`output must not contain a literal "</script>": ${escaped}`,
);
assert.ok(
	!escaped.includes("<script>"),
	`output must not contain a literal "<script>": ${escaped}`,
);

// 2. Escaping must be reversible — JSON.parse has to reconstruct the exact original value. A fix
// that mangled the string in a way JSON.parse couldn't undo would "pass" test 1 by accident while
// corrupting every legitimate answer.
assert.deepEqual(JSON.parse(escaped), malicious);

// 3. Ordinary content (no `<`) must render byte-identical to plain JSON.stringify — this function
// must not change what a normal FAQ answer or Organization field looks like.
const ordinary = { name: "Just Math Malaysia", count: 13 };
assert.equal(toSafeJsonLdString(ordinary), JSON.stringify(ordinary));

console.log(
	"OK: toSafeJsonLdString neutralises </script> and <script>, round-trips through JSON.parse, and " +
		"leaves ordinary content untouched.",
);
