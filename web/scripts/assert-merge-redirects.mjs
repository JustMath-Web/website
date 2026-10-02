#!/usr/bin/env node
// CI guardrail for the Sanity → `_redirects` merge (src/lib/content/mergeRedirects.ts).
//
// Why this exists. Redirect documents in Sanity were never read by anything: the schema, the GROQ
// query and the `Redirect` type all existed, and no build step consumed them, so an editor could
// save a redirect and the live site would ignore it. This merge is the consumer. It also takes
// editor-typed text and writes it into a file Cloudflare parses line by line, so the validation is
// a security boundary (a newline in a field must not become a second rule) — hence an assertion.

import { strict as assert } from "node:assert";

const { mergeRedirects } = await import("../src/lib/content/mergeRedirects.ts");

const STATIC = [
	"# comment line",
	"/pricing/    /#pricing    301",
	"/about/      /#about      301",
	"",
].join("\n");

const lines = (content) =>
	content
		.split("\n")
		.filter((l) => l.trim() && !l.trim().startsWith("#"))
		.map((l) => l.trim().split(/\s+/).join(" "));

// 1. Happy path: static rules stay first and untouched; Sanity rules are appended.
{
	const r = mergeRedirects(STATIC, [
		{ from: "/old-post/", to: "/blog/new-post/", permanent: true },
	]);
	assert.deepEqual(lines(r.content), [
		"/pricing/ /#pricing 301",
		"/about/ /#about 301",
		"/old-post/ /blog/new-post/ 301",
	]);
	assert.deepEqual(r.applied, ["/old-post/"]);
	assert.equal(r.skipped.length, 0);
}

// 2. permanent:false → 302; permanent missing → 301 (schema default is true).
{
	const r = mergeRedirects("", [
		{ from: "/a", to: "/b", permanent: false },
		{ from: "/c", to: "/d" },
	]);
	assert.deepEqual(lines(r.content), ["/a /b 302", "/c /d 301"]);
}

// 3. External https target is allowed; other schemes are not.
{
	const r = mergeRedirects("", [
		{ from: "/ext", to: "https://example.com/x?y=1" },
		{ from: "/http", to: "http://example.com" },
		{ from: "/js", to: "javascript:alert(1)" },
		{ from: "/proto", to: "//evil.example" },
	]);
	assert.deepEqual(lines(r.content), ["/ext https://example.com/x?y=1 301"]);
	assert.equal(r.skipped.length, 3);
}

// 4. INJECTION: whitespace or newlines in a field must never produce an extra rule.
{
	const r = mergeRedirects("", [
		{ from: "/x\n/evil", to: "/ok" },
		{ from: "/y", to: "/ok\n/steal /elsewhere 301" },
		{ from: "/has space", to: "/ok" },
		{ from: "/z", to: "/has space" },
		{ from: "/tab\t", to: "/ok" },
	]);
	assert.equal(lines(r.content).length, 0, "no unsafe rule may be emitted");
	assert.equal(r.skipped.length, 5);
}

// 5. Cloudflare placeholder / splat syntax in `from` is rejected (editors mean literal paths).
{
	const r = mergeRedirects("", [
		{ from: "/blog/*", to: "/" },
		{ from: "/p/:slug", to: "/blog/" },
	]);
	assert.equal(lines(r.content).length, 0);
	assert.equal(r.skipped.length, 2);
}

// 6. A redirect from "/" would take down the home page. Reject it.
{
	const r = mergeRedirects("", [{ from: "/", to: "/blog/" }]);
	assert.equal(lines(r.content).length, 0);
	assert.match(r.skipped[0].reason, /home/i);
}

// 7. Missing or malformed values never crash the build.
{
	const r = mergeRedirects("", [
		{ from: "no-slash", to: "/x" },
		{ from: "/a" },
		{ to: "/x" },
		null,
		"string",
		{ from: 5, to: "/x" },
	]);
	assert.equal(lines(r.content).length, 0);
	assert.equal(r.skipped.length, 6);
}

// 8. Self-redirect (loop) is rejected.
{
	const r = mergeRedirects("", [{ from: "/same", to: "/same" }]);
	assert.equal(lines(r.content).length, 0);
	assert.match(r.skipped[0].reason, /itself|loop/i);
}

// 9. A Sanity rule whose `from` already exists in the static file is skipped: the repo file wins.
{
	const r = mergeRedirects(STATIC, [{ from: "/pricing/", to: "/other/" }]);
	assert.deepEqual(lines(r.content), [
		"/pricing/ /#pricing 301",
		"/about/ /#about 301",
	]);
	assert.match(r.skipped[0].reason, /already/i);
}

// 10. Duplicate `from` inside Sanity: exactly one wins, deterministically.
{
	const first = mergeRedirects("", [
		{ from: "/dup", to: "/one" },
		{ from: "/dup", to: "/two" },
	]);
	const swapped = mergeRedirects("", [
		{ from: "/dup", to: "/two" },
		{ from: "/dup", to: "/one" },
	]);
	assert.equal(lines(first.content).length, 1);
	assert.deepEqual(lines(first.content), lines(swapped.content));
	assert.equal(first.skipped.length, 1);
}

// 11. One-hop rule (guideline §Cutover): a target that is itself redirected would chain. Reject.
{
	const r = mergeRedirects("", [
		{ from: "/a", to: "/b" },
		{ from: "/b", to: "/c" },
	]);
	assert.deepEqual(lines(r.content), ["/b /c 301"]);
	assert.match(r.skipped[0].reason, /chain|hop/i);
	// ...including chains into the static file.
	const s = mergeRedirects(STATIC, [{ from: "/legacy", to: "/pricing/" }]);
	assert.equal(lines(s.content).length, 2);
	assert.match(s.skipped[0].reason, /chain|hop/i);
}

// 12. Nothing to add → the static file comes back unchanged (no stray marker block).
{
	const r = mergeRedirects(STATIC, []);
	assert.equal(r.content, STATIC);
}

console.log("merge-redirects guard: all assertions passed");
