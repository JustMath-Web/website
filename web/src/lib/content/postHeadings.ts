import type { PortableTextBlock, PostBodyBlock } from "../sanity/types";

export type HeadingLevel = 2 | 3 | 4;

/** A heading's label, in order: plain text runs and inline maths (rendered with KaTeX in the TOC). */
export type HeadingPart = { text: string } | { latex: string };

export interface PostHeading {
	id: string;
	parts: HeadingPart[];
	level: HeadingLevel;
}

/**
 * Ids the post page already uses outside the body (BaseLayout's skip-link target, the post title,
 * the TOC sheet). A heading slug must never take one, or its TOC link would jump somewhere else.
 * Keep in sync if the post page gains another id.
 */
export const RESERVED_IDS = ["main", "post-title", "toc-sheet"];

/** A heading block with the anchor id the renderer and the table of contents both use. */
export type HeadingBlock = PortableTextBlock & { _headingId?: string };

const HEADING_LEVELS: Record<string, HeadingLevel> = { h2: 2, h3: 3, h4: 4 };

function isHeadingBlock(block: PostBodyBlock): block is PortableTextBlock {
	return block._type === "block" && block.style in HEADING_LEVELS;
}

/** Label parts of a heading, keeping inline maths in place instead of dropping it. */
function headingParts(block: PortableTextBlock): HeadingPart[] {
	const parts: HeadingPart[] = [];
	for (const child of block.children) {
		if (child._type === "span" && child.text) parts.push({ text: child.text });
		else if (child._type === "mathInline" && child.latex.trim())
			parts.push({ latex: child.latex });
	}
	return parts;
}

/** Slug source: the text runs, plus the LaTeX (so a maths-only heading still gets a real slug). */
function slugSource(parts: HeadingPart[]): string {
	return parts
		.map((part) => ("text" in part ? part.text : ` ${part.latex} `))
		.join("")
		.trim();
}

export function slugifyHeading(text: string): string {
	const slug = text
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
	return slug || "section";
}

/**
 * One pass over a post body: gives every H2–H4 a unique, readable anchor id and returns the list
 * the table of contents renders. Both come from the same pass, so a TOC link can never point at an
 * id the page did not render. A taken id — an earlier heading's, or one in RESERVED_IDS — gets the
 * next free `-2`, `-3`… suffix, so "Example", "Example 2", "Example" become `example`,
 * `example-2`, `example-3`.
 */
export function withHeadingIds(body: PostBodyBlock[]): {
	body: PostBodyBlock[];
	headings: PostHeading[];
} {
	const taken = new Set<string>(RESERVED_IDS);
	const headings: PostHeading[] = [];

	const withIds = body.map((block) => {
		if (!isHeadingBlock(block)) return block;
		const parts = headingParts(block);
		const source = slugSource(parts);
		if (!source) return block;

		const base = slugifyHeading(source);
		let id = base;
		for (let n = 2; taken.has(id); n += 1) id = `${base}-${n}`;
		taken.add(id);

		headings.push({ id, parts, level: HEADING_LEVELS[block.style] });
		return { ...block, _headingId: id } satisfies HeadingBlock;
	});

	return { body: withIds, headings };
}
