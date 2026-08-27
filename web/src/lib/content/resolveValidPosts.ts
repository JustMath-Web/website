import type { Post } from "../sanity/types";

/**
 * Pairs each requested slug with its fetched post, dropping any pair where the fetch came back null
 * — the "slug list and individual fetch disagree" case a live CMS can produce between two build-time
 * calls (docs/DECISIONS.md §30). Used directly by blog/[slug].astro's getStaticPaths() so an
 * inconsistent slug is simply never built as a static page at all, rather than needing a runtime 404
 * check that a fully static site has no server to evaluate. Deliberately has no runtime imports of
 * its own (only a type-only import, erased at compile time) so it can be exercised directly with
 * Node's native TypeScript support, without pulling in Astro/Vite's module graph — see
 * web/scripts/assert-post-static-paths-filter-nulls.mjs.
 */
export function resolveValidPosts(
	slugs: { slug: string }[],
	posts: (Post | null)[],
): { slug: string; post: Post }[] {
	return slugs
		.map((entry, index) => ({ slug: entry.slug, post: posts[index] ?? null }))
		.filter(
			(entry): entry is { slug: string; post: Post } => entry.post !== null,
		);
}
