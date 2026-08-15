import { createClient } from "@sanity/client";

/**
 * Static-build-first: useCdn is false so builds always read the latest published content
 * (guideline 02-INFORMATIVE-BLOG.md §6 build strategy — Sanity webhook triggers a rebuild).
 * Read-only. Never construct a client with a write token in this app (guideline §18).
 *
 * perspective is always "published", independent of whether a token is configured. A token is
 * only ever an authentication concern (needed if the dataset is private); it must never by itself
 * flip production reads to draft content. Bob P1-DEV-01 (review/bob/CODE-REVIEW.md): the previous
 * version set perspective:"drafts" whenever SANITY_API_READ_TOKEN existed, so a token added for a
 * private dataset would leak unpublished draft content into the public build.
 */
export const sanityClient = createClient({
	projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
	dataset: import.meta.env.PUBLIC_SANITY_DATASET,
	apiVersion: "2026-08-14",
	useCdn: false,
	token: import.meta.env.SANITY_API_READ_TOKEN || undefined,
	perspective: "published",
});

/**
 * Draft content is only ever readable through this explicit, separate client — never through
 * `sanityClient`. Requires BOTH a token and the distinct ENABLE_SANITY_PREVIEW opt-in, so preview
 * access can't be switched on by token presence alone. Not wired to any route yet (no preview mode
 * exists in this scaffold); this exists so a future preview route has the correct, safe primitive
 * to import rather than reaching for `sanityClient` and widening its perspective.
 */
export function createPreviewClient() {
	if (import.meta.env.ENABLE_SANITY_PREVIEW !== "true") {
		throw new Error(
			"createPreviewClient() called without ENABLE_SANITY_PREVIEW=true.",
		);
	}
	if (!import.meta.env.SANITY_API_READ_TOKEN) {
		throw new Error("createPreviewClient() requires SANITY_API_READ_TOKEN.");
	}
	return createClient({
		projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
		dataset: import.meta.env.PUBLIC_SANITY_DATASET,
		apiVersion: "2026-08-14",
		useCdn: false,
		token: import.meta.env.SANITY_API_READ_TOKEN,
		perspective: "drafts",
	});
}
