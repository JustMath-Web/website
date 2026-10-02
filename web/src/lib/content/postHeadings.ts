import type {
	FaqAccordion,
	FaqEntry,
	PortableTextBlock,
	PostBodyBlock,
} from "../sanity/types";

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

/** An FAQ section block with the anchor id its title heading uses. */
export type FaqBlock = FaqAccordion & { _headingId?: string };

const HEADING_LEVELS: Record<string, HeadingLevel> = { h2: 2, h3: 3, h4: 4 };

/**
 * The questions an FAQ actually renders. Shared by the component and the heading pass so a title
 * the page does not render can never get a TOC entry.
 */
export function faqVisibleItems(node: FaqAccordion): FaqEntry[] {
	return (node.items ?? []).filter((item) => item.question?.trim());
}

/** The FAQ title's heading level; a missing or unsupported value renders as H2. */
export function faqTitleLevel(node: FaqAccordion): HeadingLevel {
	return HEADING_LEVELS[node.titleLevel ?? ""] ?? 2;
}

/** The title text, or "" when the page will not render a title heading for this FAQ. */
function faqTitle(node: FaqAccordion): string {
	return faqVisibleItems(node).length > 0 ? (node.title?.trim() ?? "") : "";
}

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
 * One pass over a post body: gives every H2–H4 — including an FAQ section's title — a unique, readable anchor id and returns the list
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

	const uniqueId = (source: string) => {
		const base = slugifyHeading(source);
		let id = base;
		for (let n = 2; taken.has(id); n += 1) id = `${base}-${n}`;
		taken.add(id);
		return id;
	};

	const withIds = body.map((block) => {
		if (block._type === "faqAccordion") {
			const title = faqTitle(block);
			if (!title) return block;
			const id = uniqueId(title);
			headings.push({
				id,
				parts: [{ text: title }],
				level: faqTitleLevel(block),
			});
			return { ...block, _headingId: id } satisfies FaqBlock;
		}
		if (!isHeadingBlock(block)) return block;
		const parts = headingParts(block);
		const source = slugSource(parts);
		if (!source) return block;

		const id = uniqueId(source);
		headings.push({ id, parts, level: HEADING_LEVELS[block.style] });
		return { ...block, _headingId: id } satisfies HeadingBlock;
	});

	return { body: withIds, headings };
}
