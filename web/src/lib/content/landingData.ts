import {
	defaultCategories,
	defaultHomePage,
	defaultNavigation,
	defaultSiteSettings,
} from "./defaultLandingData";
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

		if (!homePage || !siteSettings || !navigation) {
			console.warn(
				"Sanity returned incomplete landing data; using local fallback content. Run `pnpm seed` in studio/ after configuring a write token.",
			);
			return fallbackData();
		}

		return {
			homePage,
			siteSettings,
			navigation,
			categories: categories.length > 0 ? categories : defaultCategories,
			source: "sanity",
		};
	} catch (error) {
		console.warn(
			"Sanity landing data fetch failed; using local fallback content.",
			error,
		);
		return fallbackData();
	}
}
