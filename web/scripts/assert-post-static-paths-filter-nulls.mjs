#!/usr/bin/env node
// Proves the "slug list and individual post fetch disagree" branch that
// src/lib/content/resolveValidPosts.ts exists to handle — the case a live CMS can genuinely produce
// between blog/[slug].astro's getStaticPaths() calling getBlogPostSlugs() and then getBlogPostData()
// per slug within the same build. A request for a genuinely non-existent slug only proves Astro's
// routing 404s for an ungenerated path, which would be true even without this filtering — it doesn't
// exercise this code. This does, directly, per docs/DECISIONS.md §30.

import assert from "node:assert/strict";
import { resolveValidPosts } from "../src/lib/content/resolveValidPosts.ts";

// Simulates: three slugs were listed, but the middle one's individual fetch came back null (the
// exact scenario the code comment describes) — construct it directly rather than via fixture data,
// since fixture mode's slugs/posts are inherently consistent by design and can't produce this case.
const slugs = [
	{ slug: "post-a" },
	{ slug: "post-b-inconsistent" },
	{ slug: "post-c" },
];
const posts = [{ title: "Post A" }, null, { title: "Post C" }];

const result = resolveValidPosts(slugs, posts);

assert.deepEqual(
	result.map((entry) => entry.slug),
	["post-a", "post-c"],
	"resolveValidPosts should drop the slug whose fetch returned null and keep the others, in order",
);
assert.equal(
	result.every((entry) => entry.post !== null),
	true,
	"every surviving entry must have a non-null post",
);

console.log(
	"OK: resolveValidPosts correctly filters out a slug whose individual fetch returned null.",
);
