import { test, expect } from "@playwright/test";
import { assertMinTapTarget } from "./helpers";

// This suite runs against the fixture-mode build (playwright.config.ts's webServer sets
// USE_BLOG_FIXTURES=true) — real content from web/src/lib/content/defaultBlogData.ts, not live
// Sanity data. Fixture posts: "why-surds-trip-up-students" (category form-4-5) and
// "indices-rules-in-order" (category form-1-3). See docs/DECISIONS.md §29 for the fixture-safety
// policy this build mode exists to test without depending on approved Sanity content existing.

test.describe("blog archive (/blog/)", () => {
	test("renders fixture posts and category counts", async ({ page }) => {
		await page.goto("/blog/");
		await expect(
			page.getByRole("heading", {
				name: "Where maths goes wrong, and what to do about it",
			}),
		).toBeVisible();
		await expect(
			page.getByRole("link", {
				name: /Why surds trip up students who were fine with indices/,
			}),
		).toBeVisible();
		await expect(
			page.getByRole("link", {
				name: /The indices rules, in the order students actually need them/,
			}),
		).toBeVisible();
	});

	test("category rail links to all 6 syllabus levels plus Everything", async ({
		page,
	}) => {
		await page.goto("/blog/");
		const rail = page.locator(".category-rail");
		await expect(rail.getByRole("link")).toHaveCount(7);
		await expect(
			rail.getByRole("link", { name: /Everything/ }),
		).toHaveAttribute("aria-current", "page");
	});

	test("pagination is absent with only one page of results", async ({
		page,
	}) => {
		// Real current behavior with 2 fixture posts and pageSize 10 (lastPage === 1) — the
		// paginate() && multi-page navigation shape itself is verified against Astro's own source
		// (node_modules/astro/dist/core/render/paginate.js) and documented Page<T> API, not by
		// manufacturing extra fixture posts just to force a second page.
		await page.goto("/blog/");
		await expect(
			page.getByRole("navigation", { name: "Pagination" }),
		).toHaveCount(0);
	});
});

test.describe("category archive (/blog/level/[slug]/)", () => {
	test("filters to only that category's posts", async ({ page }) => {
		await page.goto("/blog/level/form-4-5/");
		await expect(
			page.getByRole("link", { name: /Why surds trip up/ }),
		).toBeVisible();
		await expect(
			page.getByRole("link", { name: /The indices rules/ }),
		).toHaveCount(0);
	});

	test("marks the active category in the rail", async ({ page }) => {
		await page.goto("/blog/level/form-4-5/");
		const rail = page.locator(".category-rail");
		await expect(
			rail.getByRole("link", { name: /Form 4 to 5/ }),
		).toHaveAttribute("aria-current", "page");
	});

	test("renders the empty state for a category with zero fixture posts (VS-empty-state)", async ({
		page,
	}) => {
		await page.goto("/blog/level/standard-1-6/");
		await expect(
			page.getByText(/No notes for Standard 1 to 6 yet/),
		).toBeVisible();
	});
});

test.describe("tap targets (390px)", () => {
	test.use({ viewport: { width: 390, height: 844 } });

	test("category rail pills meet the 44x44 minimum", async ({ page }) => {
		await page.goto("/blog/");
		await assertMinTapTarget(page, ".category-rail__pill");
	});
});
