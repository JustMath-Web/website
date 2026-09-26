import type { PortableTextBlock, PostBodyBlock } from "../sanity/types";

export type HeadingLevel = 2 | 3 | 4;

export interface PostHeading {
	id: string;
	text: string;
	level: HeadingLevel;
}

/** A heading block with the anchor id the renderer and the table of contents both use. */
export type HeadingBlock = PortableTextBlock & { _headingId?: string };

const HEADING_LEVELS: Record<string, HeadingLevel> = { h2: 2, h3: 3, h4: 4 };

function isHeadingBlock(block: PostBodyBlock): block is PortableTextBlock {
	return block._type === "block" && block.style in HEADING_LEVELS;
}

/**
 * Plain text of a heading. Spans only — an inline maths node's raw LaTeX would read as noise in a
 * contents list — falling back to that LaTeX only when the heading has no span text at all.
 */
function headingText(block: PortableTextBlock): string {
	const spans = block.children
		.map((child) => (child._type === "span" ? child.text : ""))
		.join("")
		.trim();
	if (spans) return spans;
	return block.children
		.map((child) => (child._type === "mathInline" ? child.latex : ""))
		.join(" ")
		.trim();
}

export function slugifyHeading(text: string): string {
	const slug = text
		.normalize("NFKD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
	return slug || "section";
}

/**
 * One pass over a post body: gives every H2–H4 a unique, readable anchor id and returns the list
 * the table of contents renders. Both come from the same pass, so a TOC link can never point at an
 * id the page did not render. Duplicate heading text gets `-2`, `-3`… in document order.
 */
export function withHeadingIds(body: PostBodyBlock[]): {
	body: PostBodyBlock[];
	headings: PostHeading[];
} {
	const used = new Map<string, number>();
	const headings: PostHeading[] = [];

	const withIds = body.map((block) => {
		if (!isHeadingBlock(block)) return block;
		const text = headingText(block);
		if (!text) return block;

		const base = slugifyHeading(text);
		const seen = used.get(base) ?? 0;
		used.set(base, seen + 1);
		const id = seen === 0 ? base : `${base}-${seen + 1}`;

		headings.push({ id, text, level: HEADING_LEVELS[block.style] });
		return { ...block, _headingId: id } satisfies HeadingBlock;
	});

	return { body: withIds, headings };
}
