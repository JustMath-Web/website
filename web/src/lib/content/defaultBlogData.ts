import { defaultAuthor } from "./defaultLandingData";
import type { Post, PostBodyBlock } from "../sanity/types";

/**
 * Fixture blog content — rendered only in explicit fixture mode (web/src/lib/content/blogData.ts's
 * `USE_BLOG_FIXTURES=true` + non-production gate), never in a real build. Exists so the archive/
 * category/post routes and the Portable Text renderer (web/src/components/portabletext/) have real
 * content to render against in CI/local dev without depending on Sanity having approved posts yet.
 *
 * The "surds" post exercises every custom Portable Text object from PR 1 at least once. Its
 * `imageWithAlt` block references a synthetic, well-formed-but-unpublished Sanity asset ID
 * (`image-fixture0000000000000000000000000000000000-1200x800-jpg`) — @sanity/image-url builds a
 * deterministic CDN URL from any correctly-shaped reference without validating the asset exists, so
 * this exercises the component's markup/alt-text handling; the URL itself would 404 if actually
 * fetched, which is fine — fixture mode tests structure, not real asset delivery.
 */

const author = {
	_id: defaultAuthor._id,
	name: defaultAuthor.name,
	slug: defaultAuthor.slug,
};

const surdsCategory = {
	_id: "category-form-4-5",
	title: "Form 4 to 5",
	slug: { current: "form-4-5" },
};

const indicesCategory = {
	_id: "category-form-1-3",
	title: "Form 1 to 3",
	slug: { current: "form-1-3" },
};

const surdsBody: PostBodyBlock[] = [
	{
		_key: "b1",
		_type: "block",
		style: "normal",
		markDefs: [],
		children: [
			{
				_key: "b1s1",
				_type: "span",
				text: "A surd like ",
			},
			{ _key: "b1m1", _type: "mathInline", latex: "\\sqrt{72}" },
			{
				_key: "b1s2",
				_type: "span",
				text: " looks intimidating until you split it into its perfect-square factors.",
			},
		],
	},
	{
		_key: "b2",
		_type: "mathBlock",
		latex: "\\sqrt{72} + \\sqrt{50}",
		caption: "The starting expression",
	},
	{
		_key: "b3",
		_type: "working",
		title: "Working",
		steps: [
			"\\sqrt{72} + \\sqrt{50}",
			"= \\sqrt{36 \\times 2} + \\sqrt{25 \\times 2}",
			"= 6\\sqrt{2} + 5\\sqrt{2}",
			"= 11\\sqrt{2}",
		],
	},
	{
		_key: "b4",
		_type: "commonMistake",
		mistake:
			"Adding the numbers under the root directly, e.g. treating −72 + −50 as ≅122.",
		correction:
			"Surds only add once they share the same root — simplify each one to its simplest form first.",
	},
	{
		_key: "b5",
		_type: "callout",
		tone: "tip",
		body: "If the number under the root has no perfect-square factor greater than 1, the surd is already in simplest form.",
	},
	{
		_key: "b6",
		_type: "imageWithAlt",
		image: {
			_type: "image",
			asset: {
				_type: "reference",
				_ref: "image-fixture0000000000000000000000000000000000-1200x800-jpg",
			},
		},
		intent: "informative",
		alt: "A worked example showing surds being simplified step by step on a whiteboard",
		caption: "The same working, shown line by line.",
	},
	{
		_key: "b7",
		_type: "youtubeEmbed",
		// Deliberately synthetic 11-char placeholder ID, same convention as b6's fake Sanity asset
		// reference above — fixture mode tests the embed's structure/markup, not real video delivery.
		url: "https://www.youtube.com/watch?v=xxxxxxxxxxx",
		caption: "A five-minute recap of the same simplification method.",
	},
];

const indicesBody: PostBodyBlock[] = [
	{
		_key: "i1",
		_type: "block",
		style: "normal",
		markDefs: [],
		children: [
			{
				_key: "i1s1",
				_type: "span",
				text: "Indices follow a small set of rules — the trouble starts when students try to memorise the rules without the reason behind them.",
			},
		],
	},
];

export const defaultPosts: Post[] = [
	{
		_id: "post-fixture-surds",
		title: "Why surds trip up students who were fine with indices",
		slug: { current: "why-surds-trip-up-students" },
		excerpt:
			"Surds and indices use the same underlying idea, but students who are confident with one often stumble on the other. Here's the line-by-line working that fixes it.",
		author,
		categories: [surdsCategory],
		publishedAt: "2026-08-01T00:00:00.000Z",
		readingTimeMinutes: 4,
		reviewStatus: "approvedByMrKong",
		body: surdsBody,
	},
	{
		_id: "post-fixture-indices",
		title: "The indices rules, in the order students actually need them",
		slug: { current: "indices-rules-in-order" },
		excerpt:
			"Not every index law matters equally on day one. This is the order that keeps students moving instead of stuck.",
		author,
		categories: [indicesCategory],
		publishedAt: "2026-07-15T00:00:00.000Z",
		readingTimeMinutes: 3,
		reviewStatus: "approvedByMrKong",
		body: indicesBody,
	},
];
