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
		{ from: "/a", to: "/b/", permanent: false },
		{ from: "/c", to: "/d/" },
	]);
	assert.deepEqual(lines(r.content), ["/a /b/ 302", "/c /d/ 301"]);
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
		{ from: "/dup", to: "/one/" },
		{ from: "/dup", to: "/two/" },
	]);
	const swapped = mergeRedirects("", [
		{ from: "/dup", to: "/two/" },
		{ from: "/dup", to: "/one/" },
	]);
	assert.equal(lines(first.content).length, 1);
	assert.deepEqual(lines(first.content), lines(swapped.content));
	assert.equal(first.skipped.length, 1);
}

// 11. One-hop rule (guideline §Cutover): a target that is itself redirected would chain. Reject.
{
	const r = mergeRedirects("", [
		{ from: "/a", to: "/b/" },
		{ from: "/b/", to: "/c/" },
	]);
	assert.deepEqual(lines(r.content), ["/b/ /c/ 301"]);
	assert.match(r.skipped[0].reason, /chain|hop/i);
	// ...including chains into the static file.
	const s = mergeRedirects(STATIC, [{ from: "/legacy", to: "/pricing/" }]);
	assert.equal(lines(s.content).length, 2);
	assert.match(s.skipped[0].reason, /chain|hop/i);
}

// 13. Cloudflare cannot match a query string or fragment in the source (Bob, PR #115).
{
	const r = mergeRedirects("", [
		{ from: "/old?ref=1", to: "/a" },
		{ from: "/old#part", to: "/a" },
	]);
	assert.equal(lines(r.content).length, 0);
	assert.deepEqual(r.applied, []);
	assert.equal(r.skipped.length, 2);
}

// 14. Cloudflare's 1,000-character limit applies to the whole `from to status` line. Exactly at the
// limit is applied; one character over is skipped, and never counted as applied.
{
	const fits = "/" + "a".repeat(1000 - 5 - 3 - 1);
	const ok = mergeRedirects("", [{ from: fits, to: "/b/" }]);
	assert.equal(
		ok.content.split("\n").find((l) => l.startsWith(fits)).length,
		1000,
	);
	assert.deepEqual(ok.applied, [fits]);
	const over = mergeRedirects("", [{ from: fits, to: "/bb/" }]);
	assert.deepEqual(over.applied, []);
	assert.match(over.skipped[0].reason, /1000|long/i);
}

// 15. Same source and target, different `permanent`: the status must not depend on fetch order
// (Bob, PR #115). 301 wins, and the other document is reported as skipped.
{
	const a = mergeRedirects("", [
		{ from: "/d", to: "/n/", permanent: true },
		{ from: "/d", to: "/n/", permanent: false },
	]);
	const b = mergeRedirects("", [
		{ from: "/d", to: "/n/", permanent: false },
		{ from: "/d", to: "/n/", permanent: true },
	]);
	assert.deepEqual(lines(a.content), ["/d /n/ 301"]);
	assert.deepEqual(lines(b.content), ["/d /n/ 301"]);
	assert.equal(a.skipped.length, 1);
	assert.equal(b.skipped.length, 1);
}

// 15b. Bob, PR #118: a target without a trailing slash would be two hops (Cloudflare 307s to
// `/blog/`). Skipped with a reason an editor can act on; file paths and fragments-only stay valid.
{
	const r = mergeRedirects("", [
		{ from: "/blogs", to: "/blog" },
		{ from: "/pricing", to: "/#pricing" },
		{ from: "/logo", to: "/logo.png" },
	]);
	assert.deepEqual(lines(r.content), [
		"/logo /logo.png 301",
		"/pricing /#pricing 301",
	]);
	assert.equal(r.skipped.length, 1);
	assert.match(r.skipped[0].reason, /end with a \//);
}

// 15c. Bob, PR #119: the site's own full address is not emitted, whatever its path.
{
	const r = mergeRedirects("", [
		{ from: "/a", to: "https://mathematicsmalaysia.com/blog" },
		{ from: "/b", to: "https://www.mathematicsmalaysia.com/blog/" },
		{ from: "/c", to: "https://example.com/blog" },
	]);
	assert.deepEqual(lines(r.content), ["/c https://example.com/blog 301"]);
	assert.equal(r.skipped.length, 2);
	assert.match(r.skipped[0].reason, /address of this site/);
}

// 16. PARITY: Studio blocks publication with the same rules the build applies. Run one table of
// inputs through both; any disagreement means an editor could publish something the build drops
// (or the reverse). Cross-document rules (duplicates, chains) are build-only and not in this table.
{
	const { validateRedirectFrom, validateRedirectTo } =
		await import("../../studio/schemaTypes/lib/redirectValidation.ts");
	const long = "/" + "a".repeat(1000 - 5 - 3 - 1);
	const cases = [
		["/pricing", "/#pricing"],
		["/old-post/", "/blog/new-post/"],
		["/ext", "https://example.com/x?y=1"],
		["/pricing ", "/ok"],
		[" /pricing", "/ok"],
		["/x\n/evil", "/ok"],
		["/y", "/ok\n/steal /elsewhere 301"],
		["/tab\t", "/ok"],
		["/z", "/has space"],
		["no-slash", "/x"],
		["//host", "/x"],
		["/", "/blog/"],
		["/blog/*", "/"],
		["/p/:slug", "/blog/"],
		["/old?ref=1", "/a"],
		["/old#part", "/a"],
		["/a", "http://example.com"],
		["/a", "javascript:alert(1)"],
		["/a", "//evil.example"],
		["/a", "blog"],
		["/same", "/same"],
		[long, "/b/"],
		[long, "/bb/"],
		["/a", "/"],
		["/a", "/blog/"],
		["/a", "/#pricing"],
		["/a", "/blog/?page=2"],
		["/a", "/logo.png"],
		["/a", "/files/report.pdf?dl=1"],
		["/a", "/blog"],
		["/a", "/blog#faq"],
		["/a", "/blog?page=2"],
		["/a", "/about-us"],
		["/a", "https://example.com/page"],
		["/a", "https://mathematicsmalaysia.com/blog"],
		["/a", "https://mathematicsmalaysia.com/blog/"],
		["/a", "https://mathematicsmalaysia.com"],
		["/a", "https://www.mathematicsmalaysia.com/blog/"],
		["/a", "https://MathematicsMalaysia.com/blog/"],
		["/a", "https://mathematicsmalaysia.com./blog/"],
		["/a", "https://mathematicsmalaysia.com:443/blog/"],
		["/a", "https://notmathematicsmalaysia.com/blog"],
		["/a", "https://mathematicsmalaysia.com.evil.example/blog"],
		["/a", "https://mathematicsmalaysia.com@evil.example/blog"],
		["/a", "https://sub.mathematicsmalaysia.com/blog"],
		["/a", "https://"],
	];
	for (const [from, to] of cases) {
		const studioOk =
			validateRedirectFrom(from) === true &&
			validateRedirectTo(to, from) === true;
		const buildOk = mergeRedirects("", [{ from, to }]).applied.length === 1;
		assert.equal(
			buildOk,
			studioOk,
			`Studio and build disagree on ${JSON.stringify({ from, to })}: studio=${studioOk} build=${buildOk}`,
		);
	}
}

// 12. Nothing to add → the static file comes back unchanged (no stray marker block).
{
	const r = mergeRedirects(STATIC, []);
	assert.equal(r.content, STATIC);
}

console.log("merge-redirects guard: all assertions passed");
