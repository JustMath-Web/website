import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getBlogArchiveData } from "../lib/content/blogData";
import { getLandingPageData } from "../lib/content/landingData";

// Sourced from the same fixture-safe getBlogArchiveData() wrapper the archive/category pages use
// (docs/DECISIONS.md §29/§30) — a production build can only ever reach this with real, approved
// Sanity posts (fixture mode is structurally impossible in production, and a production build with
// no reachable Sanity data fails outright rather than rendering here at all). No separate check is
// needed in this file for that guarantee to hold.
export async function GET(context: APIContext) {
	const { posts } = await getBlogArchiveData();
	const { siteSettings } = await getLandingPageData();

	return rss({
		title: `${siteSettings.siteName} — Notes`,
		description:
			siteSettings.defaultSeo.metaDescription ?? siteSettings.siteName,
		site: context.site ?? siteSettings.domain,
		items: posts.map((post) => ({
			title: post.title,
			// Defensive, not just typed as required: excerpt is a required Studio field, but
			// Studio's own validation had a bug that let it publish as null (fixed separately in
			// the schema) — a single post with a malformed excerpt must never be able to throw
			// here and take the whole production build down with it. `@astrojs/rss` rejects an
			// explicit null for an optional string field; coalesce to undefined instead.
			description: post.excerpt || undefined,
			pubDate: new Date(post.publishedAt),
			link: `/blog/${post.slug.current}/`,
		})),
	});
}
