import {
	defaultCategories,
	defaultHomePage,
	defaultNavigation,
	defaultSiteSettings,
} from "./defaultLandingData";
import { findMissingLandingContent, isProductionBuild } from "./contentGuards";
import type {
	CategoryWithCount,
	HomePage,
	Navigation,
	SiteSettings,
} from "../sanity/types";

export interface LandingPageData {
	homePage: HomePage;
	siteSettings: SiteSettings;
	navigation: Navigation;
	categories: CategoryWithCount[];
	source: "sanity" | "fallback";
}

function hasSanityEnv() {
	return Boolean(
		import.meta.env.PUBLIC_SANITY_PROJECT_ID &&
		import.meta.env.PUBLIC_SANITY_DATASET,
	);
}

function fallbackData(): LandingPageData {
	return {
		homePage: defaultHomePage,
		siteSettings: defaultSiteSettings,
		navigation: defaultNavigation,
		categories: defaultCategories,
		source: "fallback",
	};
}

export async function getLandingPageData(): Promise<LandingPageData> {
	if (!hasSanityEnv()) {
		if (isProductionBuild()) {
			throw new Error(
				"Landing data requested in a production build, but Sanity is not configured " +
					"(PUBLIC_SANITY_PROJECT_ID/PUBLIC_SANITY_DATASET missing). Production must never " +
					"render fallback copy due to missing config. See docs/DECISIONS.md §28/§29 — this " +
					"mirrors the rule blogData.ts has always enforced.",
			);
		}
		return fallbackData();
	}

	try {
		const {
			getCategoriesWithCounts,
			getHomePage,
			getNavigation,
			getSiteSettings,
		} = await import("../sanity/queries");
		const [homePage, siteSettings, navigation, categories] = await Promise.all([
			getHomePage(),
			getSiteSettings(),
			getNavigation(),
			getCategoriesWithCounts(),
		]);

		/**
		 * Content-aware, not presence-aware. The previous check was
		 * `if (!homePage || !siteSettings || !navigation)`, which a HUSK passes: a Sanity singleton
		 * opened in the Studio before it is seeded exists as a document carrying only schema
		 * defaults. One such `drafts.homePage` sat in production for six days, truthy and therefore
		 * invisible to this guard, one Publish click from blanking the live page.
		 *
		 * Production now FAILS rather than falling back. A static build that quietly substitutes
		 * fixture content for real content ships a page nobody authored and reports success —
		 * exactly the failure `docs/DECISIONS.md` §28/§29 already forbids for the blog. The landing
		 * path had no equivalent rule; this is that rule.
		 */
		const missing = findMissingLandingContent(
			homePage,
			siteSettings,
			navigation,
		);
		if (missing.length > 0) {
			const detail = missing.join(", ");
			if (isProductionBuild()) {
				throw new Error(
					"Landing data from Sanity is incomplete in a production build. Missing or blank: " +
						`${detail}. This usually means a singleton is an unseeded husk (a document ` +
						"holding only schema defaults) rather than real content. Production must never " +
						"substitute fallback copy for real copy — fix the content in Sanity, or run " +
						"`pnpm seed` in studio/. See docs/DECISIONS.md §28/§29.",
				);
			}
			console.warn(
				`Sanity landing data is incomplete (${detail}); using local fallback content ` +
					"(non-production). Run `pnpm seed` in studio/ after configuring a write token.",
			);
			return fallbackData();
		}

		if (!homePage || !siteSettings || !navigation) {
			// Unreachable: findMissingLandingContent reports a null document as missing, and that
			// branch either threw (production) or returned fallback data (everywhere else). Kept for
			// type narrowing and as a genuine last line of defence — the same "don't assume it can't
			// happen" discipline as blog/[slug].astro's null-post check (docs/DECISIONS.md §30).
			throw new Error(
				"Landing data narrowing invariant violated: a document was null after passing the " +
					"completeness check. findMissingLandingContent and this branch have drifted.",
			);
		}

		return {
			homePage,
			siteSettings,
			navigation,
			categories: categories.length > 0 ? categories : defaultCategories,
			source: "sanity",
		};
	} catch (error) {
		// Re-thrown untouched in production: both the incompleteness error above and a genuine fetch
		// failure must fail the build rather than silently shipping fixture copy.
		if (isProductionBuild()) throw error;
		console.warn(
			"Sanity landing data fetch failed; using local fallback content (non-production).",
			error,
		);
		return fallbackData();
	}
}
