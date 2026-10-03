#!/usr/bin/env node
// CI guardrail for web/src/lib/content/postHeadings.ts -> withHeadingIds.
//
// Why this exists. Every table-of-contents link jumps to a heading id this function assigns. Two
// headings with the same id, or a heading taking an id the page already uses (`main`, `post-title`,
// `toc-sheet`), send the link to the wrong place and mark the wrong item current. Bob review, PR #100:
// "Example", "Example 2", "Example" used to give `example`, `example-2`, `example-2`.
//
// A unit assertion on the pure function, like assert-json-ld-escaping.mjs: these are edge cases in
// editor content that no fixture post would carry.

import { strict as assert } from "node:assert";

const { withHeadingIds, RESERVED_IDS } =
	await import("../src/lib/content/postHeadings.ts");

let key = 0;
const heading = (style, ...children) => ({
	_key: `k${key++}`,
	_type: "block",
	style,
	markDefs: [],
	children: children.map((child) =>
		typeof child === "string"
			? { _key: `s${key++}`, _type: "span", text: child }
			: { _key: `m${key++}`, _type: "mathInline", latex: child.latex },
	),
});
const ids = (blocks) => withHeadingIds(blocks).headings.map((h) => h.id);

// 1. A literal "-2" heading must not be re-used by a later duplicate.
assert.deepEqual(
	ids([
		heading("h2", "Example"),
		heading("h2", "Example 2"),
		heading("h2", "Example"),
	]),
	["example", "example-2", "example-3"],
);

// 2. Page-level ids are never taken by a heading.
assert.deepEqual(
	ids([
		heading("h2", "Main"),
		heading("h3", "Post title"),
		heading("h4", "TOC sheet"),
	]),
	["main-2", "post-title-2", "toc-sheet-2"],
);
for (const reserved of RESERVED_IDS) {
	assert.ok(!ids([heading("h2", reserved)]).includes(reserved), reserved);
}

// 3. Every id is unique, and the rendered body carries exactly the ids the TOC links to.
const body = [
	heading("h2", "Worked example"),
	{ _key: "p", _type: "block", style: "normal", markDefs: [], children: [] },
	heading("h3", "Worked example"),
	heading("h4", "Worked example 2"),
	heading("h2", "Worked example"),
];
const result = withHeadingIds(body);
const tocIds = result.headings.map((h) => h.id);
assert.equal(new Set(tocIds).size, tocIds.length, `duplicate ids: ${tocIds}`);
assert.deepEqual(
	result.body.filter((b) => b._headingId).map((b) => b._headingId),
	tocIds,
);

// 4. Inline maths stays in the TOC label (it used to be dropped: "Derivative of x²" -> "Derivative of").
const maths = withHeadingIds([
	heading("h2", "Derivative of ", { latex: "x^2" }),
]);
assert.deepEqual(maths.headings[0].parts, [
	{ text: "Derivative of " },
	{ latex: "x^2" },
]);
assert.equal(maths.headings[0].id, "derivative-of-x-2");

// 5. Only H2–H4 count, and an empty heading gets no id.
assert.deepEqual(
	ids([heading("normal", "Body"), heading("h2"), heading("h3", "Real")]),
	["real"],
);

// 6. Bob, PR #114 P2: an FAQ section title is a post section. It joins the TOC, in body order,
// through the same pass, so its id is unique and the TOC link points at the rendered heading.
const faq = (title, titleLevel, ...questions) => ({
	_key: `f${key++}`,
	_type: "faqAccordion",
	title,
	titleLevel,
	questionLevel: "h3",
	items: questions.map((question) => ({
		_key: `q${key++}`,
		_type: "faqEntry",
		question,
		answer: [],
	})),
});
{
	const f = faq("Common questions", "h3", "Is a surd irrational?");
	const r = withHeadingIds([
		heading("h2", "Intro"),
		f,
		heading("h2", "Common questions"),
	]);
	assert.deepEqual(
		r.headings.map((h) => [h.id, h.level]),
		[
			["intro", 2],
			["common-questions", 3],
			["common-questions-2", 2],
		],
	);
	assert.deepEqual(r.headings[1].parts, [{ text: "Common questions" }]);
	assert.equal(r.body[1]._headingId, "common-questions");
	assert.equal(r.body[1]._type, "faqAccordion");
	assert.equal(
		new Set(r.headings.map((h) => h.id)).size,
		r.headings.length,
		"FAQ title ids must be unique with the rest",
	);
	assert.equal(f._headingId, undefined, "the input block must not be mutated");
}

// 7. A title the page will not render gets no TOC entry and no id: no title, a blank title, or
// no question that would render (the section renders nothing at all then).
{
	const r = withHeadingIds([
		faq(undefined, "h2", "Q?"),
		faq("   ", "h2", "Q?"),
		faq("Has no questions", "h2"),
		faq("Only blank questions", "h2", "  ", ""),
	]);
	assert.deepEqual(r.headings, []);
	assert.ok(r.body.every((b) => b._headingId === undefined));
}

// 8. A missing or unsupported titleLevel renders as H2 (FaqAccordion.astro), so the TOC says H2.
assert.deepEqual(
	withHeadingIds([
		faq("A", undefined, "Q?"),
		faq("B", "h1", "Q?"),
	]).headings.map((h) => h.level),
	[2, 2],
);

console.log(
	"OK: withHeadingIds gives unique ids (including after a literal -N heading), never takes a " +
		"reserved page id, matches body and TOC, and keeps inline maths in labels.",
);
