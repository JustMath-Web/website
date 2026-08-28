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
			description: post.excerpt,
			pubDate: new Date(post.publishedAt),
			link: `/blog/${post.slug.current}/`,
		})),
	});
}
