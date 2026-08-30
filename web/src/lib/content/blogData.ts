import { defaultCategories } from "./defaultLandingData";
import { defaultPosts } from "./defaultBlogData";
import type {
	Category,
	CategoryWithCount,
	Post,
	PostSummary,
} from "../sanity/types";

/**
 * Blog data access, fallback-aware but deliberately stricter than
 * web/src/lib/content/landingData.ts's homepage pattern — see docs/DECISIONS.md §28/§29 for the full
 * policy history. Summary:
 *
 * - Fixture posts (web/src/lib/content/defaultBlogData.ts) render ONLY when both `USE_BLOG_FIXTURES`
 *   is the literal string "true" AND the build is confirmed non-production. There is no other path
 *   that ever renders fixture content — not missing Sanity config, not a fetch failure, nothing.
 * - A production build that cannot get real Sanity data for any reason (missing config or a fetch
 *   throwing) fails outright. "Empty state" only ever means "Sanity answered and there are
 *   genuinely zero approved posts" — never "Sanity couldn't be reached."
 * - A non-production build (preview/dev) that can't reach Sanity renders the same empty state
 *   instead of failing, since the stakes are lower there — but still never substitutes fixtures.
 */

// One concrete check, used everywhere production/fixture-mode logic needs it, so there is never a
// second copy of this condition to drift out of sync with this one. DEPLOY_ENV is a host-set
// production sentinel, configured explicitly in the Cloudflare Pages production environment for
// this migration. NODE_ENV/import.meta.env.PROD alone cannot distinguish a real production deploy
// from a preview build, since preview builds also commonly run in production mode.
function isProductionBuild(): boolean {
	return import.meta.env.DEPLOY_ENV === "production";
}

function isFixtureMode(): boolean {
	return import.meta.env.USE_BLOG_FIXTURES === "true" && !isProductionBuild();
}

function hasSanityEnv(): boolean {
	return Boolean(
		import.meta.env.PUBLIC_SANITY_PROJECT_ID &&
		import.meta.env.PUBLIC_SANITY_DATASET,
	);
}

type BlogSource = "fixture" | "sanity" | "unavailable";

/**
 * Resolves which data path a blog data function should take, and enforces the production-never-
 * fixtures / production-fails-on-missing-data rules in one place. "unavailable" means Sanity isn't
 * configured at all; callers treat that the same as a caught fetch error below.
 */
function resolveBlogSource(): BlogSource {
	if (isFixtureMode()) {
		return "fixture";
	}

	if (!hasSanityEnv()) {
		if (isProductionBuild()) {
			throw new Error(
				"Blog data requested in a production build, but Sanity is not configured " +
					"(PUBLIC_SANITY_PROJECT_ID/PUBLIC_SANITY_DATASET missing) and USE_BLOG_FIXTURES is not " +
					"set. Production must never render an empty/placeholder blog state due to missing " +
					"config — set the Sanity env vars, or explicitly enable fixture mode in a non-production " +
					"context only. See docs/DECISIONS.md §28/§29.",
			);
		}
		return "unavailable";
	}

	return "sanity";
}

function failOrWarn(action: string, error: unknown): void {
	if (isProductionBuild()) {
		throw new Error(`${action} failed in a production build: ${error}`);
	}
	console.warn(
		`${action} failed; rendering empty state (non-production).`,
		error,
	);
}

export interface BlogArchiveData {
	posts: PostSummary[];
	categories: CategoryWithCount[];
	source: "sanity" | "fixture";
}

export async function getBlogArchiveData(): Promise<BlogArchiveData> {
	const resolved = resolveBlogSource();

	if (resolved === "fixture") {
		return {
			posts: defaultPosts,
			categories: withFixturePostCounts(defaultCategories, defaultPosts),
			source: "fixture",
		};
	}

	if (resolved === "unavailable") {
		return { posts: [], categories: defaultCategories, source: "sanity" };
	}

	try {
		const { getAllPosts, getCategoriesWithCounts } =
			await import("../sanity/queries");
		const [posts, categories] = await Promise.all([
			getAllPosts(),
			getCategoriesWithCounts(),
		]);
		return {
			posts,
			categories: categories.length > 0 ? categories : defaultCategories,
			source: "sanity",
		};
	} catch (error) {
		failOrWarn("Blog archive fetch", error);
		return { posts: [], categories: defaultCategories, source: "sanity" };
	}
}

export interface BlogPostData {
	post: Post | null;
	source: "sanity" | "fixture";
}

export async function getBlogPostData(slug: string): Promise<BlogPostData> {
	const resolved = resolveBlogSource();

	if (resolved === "fixture") {
		return {
			post: defaultPosts.find((post) => post.slug.current === slug) ?? null,
			source: "fixture",
		};
	}

	if (resolved === "unavailable") {
		return { post: null, source: "sanity" };
	}

	try {
		const { getPostBySlug } = await import("../sanity/queries");
		return { post: await getPostBySlug(slug), source: "sanity" };
	} catch (error) {
		failOrWarn(`Blog post fetch for slug "${slug}"`, error);
		return { post: null, source: "sanity" };
	}
}

export async function getBlogPostSlugs(): Promise<{ slug: string }[]> {
	const resolved = resolveBlogSource();

	if (resolved === "fixture") {
		return defaultPosts.map((post) => ({ slug: post.slug.current }));
	}

	if (resolved === "unavailable") {
		return [];
	}

	try {
		const { getPostSlugs } = await import("../sanity/queries");
		return await getPostSlugs();
	} catch (error) {
		failOrWarn("Blog post slugs fetch", error);
		return [];
	}
}

export interface CategoryArchiveData {
	category: Category | null;
	posts: PostSummary[];
	source: "sanity" | "fixture";
}

export async function getCategoryArchiveData(
	slug: string,
): Promise<CategoryArchiveData> {
	const resolved = resolveBlogSource();

	if (resolved === "fixture") {
		const category =
			defaultCategories.find((c) => c.slug.current === slug) ?? null;
		return {
			category,
			posts: defaultPosts.filter((post) =>
				post.categories.some((c) => c.slug.current === slug),
			),
			source: "fixture",
		};
	}

	if (resolved === "unavailable") {
		return { category: null, posts: [], source: "sanity" };
	}

	try {
		const { getCategoryBySlug, getPostsByCategorySlug } =
			await import("../sanity/queries");
		const [category, posts] = await Promise.all([
			getCategoryBySlug(slug),
			getPostsByCategorySlug(slug),
		]);
		return { category, posts, source: "sanity" };
	} catch (error) {
		failOrWarn(`Category archive fetch for slug "${slug}"`, error);
		return { category: null, posts: [], source: "sanity" };
	}
}

export async function getBlogCategorySlugs(): Promise<{ slug: string }[]> {
	const resolved = resolveBlogSource();

	if (resolved === "fixture" || resolved === "unavailable") {
		// Categories are fixed structural data (the 6 syllabus levels), not editorial content — safe
		// to always list them so /blog/level/[slug]/ routes exist even without a live Sanity
		// connection, unlike posts.
		return defaultCategories.map((category) => ({
			slug: category.slug.current,
		}));
	}

	try {
		const { getCategoriesWithCounts } = await import("../sanity/queries");
		const categories = await getCategoriesWithCounts();
		return categories.length > 0
			? categories.map((category) => ({ slug: category.slug.current }))
			: defaultCategories.map((category) => ({ slug: category.slug.current }));
	} catch (error) {
		failOrWarn("Category slugs fetch", error);
		return defaultCategories.map((category) => ({
			slug: category.slug.current,
		}));
	}
}

function withFixturePostCounts(
	categories: CategoryWithCount[],
	posts: Post[],
): CategoryWithCount[] {
	return categories.map((category) => ({
		...category,
		postCount: posts.filter((post) =>
			post.categories.some((c) => c.slug.current === category.slug.current),
		).length,
	}));
}
