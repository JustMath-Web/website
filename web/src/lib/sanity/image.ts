import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

/**
 * Deliberately built from a plain {projectId, dataset} object, not the authenticated `sanityClient`
 * export in ./client.ts — that client's `createClient()` call throws immediately if
 * PUBLIC_SANITY_PROJECT_ID is unset (e.g. in blog fixture mode, docs/DECISIONS.md §29, which never
 * configures Sanity). Building an image URL needs no authentication or network call at all, so it
 * has no reason to depend on — or fail because of — the data-fetching client's eager initialization.
 * Confirmed `@sanity/image-url` accepts this plain-object shape directly (its own type definitions
 * export a `SanityProjectDetails` variant for exactly this).
 */
const builder = createImageUrlBuilder({
	projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
	dataset: import.meta.env.PUBLIC_SANITY_DATASET,
});

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

/**
 * Sanity image asset refs encode their original dimensions in the ref string itself
 * (`image-{assetId}-{width}x{height}-{format}`, a stable, documented Sanity convention — see
 * @sanity/asset-utils's own `getImageDimensions`, which parses the exact same pattern). Parsed
 * directly here rather than adding that whole package as a dependency for one regex.
 */
export function getImageDimensions(
	ref: string,
): { width: number; height: number } | null {
	const match = /-(\d+)x(\d+)-/.exec(ref);
	if (!match) {
		return null;
	}
	return { width: Number(match[1]), height: Number(match[2]) };
}
