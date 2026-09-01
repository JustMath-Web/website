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

	test("breadcrumb links meet the 44x44 minimum", async ({ page }) => {
		await page.goto("/blog/why-surds-trip-up-students/");
		await assertMinTapTarget(page, ".breadcrumb__link");
	});
});

test.describe("blog post (/blog/[slug]/)", () => {
	test("renders breadcrumb, heading, and meta", async ({ page }) => {
		await page.goto("/blog/why-surds-trip-up-students/");
		await expect(
			page.getByRole("heading", {
				name: "Why surds trip up students who were fine with indices",
			}),
		).toBeVisible();
		await expect(
			page.getByRole("navigation", { name: "Breadcrumb" }).getByText("Notes"),
		).toBeVisible();
		await expect(
			page
				.getByRole("navigation", { name: "Breadcrumb" })
				.getByText("Form 4 to 5"),
		).toBeVisible();
	});

	test("renders every custom Portable Text object from the fixture post", async ({
		page,
	}) => {
		await page.goto("/blog/why-surds-trip-up-students/");
		await expect(page.getByText("Where this goes wrong")).toBeVisible();
		await expect(page.locator(".working")).toBeVisible();
		await expect(
			page.locator(
				"img[alt='A worked example showing surds being simplified step by step on a whiteboard']",
			),
		).toBeVisible();
		const youtubeIframe = page.locator(".pt-youtube iframe");
		await expect(youtubeIframe).toHaveAttribute(
			"src",
			"https://www.youtube-nocookie.com/embed/xxxxxxxxxxx",
		);
		await expect(youtubeIframe).toHaveAttribute(
			"title",
			"A five-minute recap of the same simplification method.",
		);
		await expect(
			page.getByText("A five-minute recap of the same simplification method."),
		).toBeVisible();
	});

	test("BlogPosting JSON-LD is present and valid, alongside the sitewide Organization JSON-LD", async ({
		page,
	}) => {
		await page.goto("/blog/why-surds-trip-up-students/");
		// Two distinct JSON-LD blocks legitimately coexist on this page: BaseLayout's sitewide
		// Organization one (in <head>) and this page's own BlogPosting one — both real, valid
		// schema.org practice, not a bug. Parse every script tag and find the BlogPosting one
		// specifically, rather than assuming there's only one on the page.
		const rawBlocks = await page
			.locator('script[type="application/ld+json"]')
			.allTextContents();
		const parsed = rawBlocks.map((raw) => JSON.parse(raw));
		expect(parsed.some((block) => block["@type"] === "Organization")).toBe(
			true,
		);
		const blogPosting = parsed.find(
			(block) => block["@type"] === "BlogPosting",
		);
		expect(blogPosting).toBeTruthy();
		expect(blogPosting.headline).toBe(
			"Why surds trip up students who were fine with indices",
		);
		expect(blogPosting.author).toEqual({ "@type": "Person", name: "Mr Kong" });
		expect(blogPosting.datePublished).toBe("2026-08-01T00:00:00.000Z");
	});

	// The whole point of build-time KaTeX rendering (design/DESIGN.md) is that maths shows up with no
	// client-side JS at all — verify that claim directly, matching this project's existing no-JS
	// pattern for the FAQ accordion (VS-06), not just trust it from the source.
	test("maths renders with accessible MathML, with JavaScript disabled", async ({
		browser,
	}) => {
		const context = await browser.newContext({ javaScriptEnabled: false });
		const page = await context.newPage();
		try {
			await page.goto("/blog/why-surds-trip-up-students/");
			await expect(page.locator(".katex").first()).toBeVisible();
			const mathMlCount = await page.locator("math").count();
			expect(mathMlCount).toBeGreaterThan(0);
		} finally {
			await context.close();
		}
	});
});

test.describe("KaTeX self-hosting and CSS scoping (VS-KaTeX)", () => {
	test("no external CDN/font-host requests for CSS, fonts, or scripts on the post page", async ({
		page,
	}) => {
		// The fixture post's ImageWithAlt block deliberately points at cdn.sanity.io with a synthetic,
		// non-existent asset ID (docs/DECISIONS.md §28) — that's Sanity's real, legitimate image CDN,
		// not something KaTeX self-hosting is meant to eliminate. Scoped to the resource types this
		// check actually cares about: stylesheet/font/script, not images.
		const externalRequests: string[] = [];
		page.on("request", (request) => {
			const type = request.resourceType();
			if (type !== "stylesheet" && type !== "font" && type !== "script") {
				return;
			}
			const url = new URL(request.url());
			if (url.hostname !== "127.0.0.1" && url.hostname !== "localhost") {
				externalRequests.push(`${type}: ${request.url()}`);
			}
		});
		await page.goto("/blog/why-surds-trip-up-students/");
		expect(externalRequests).toEqual([]);
	});

	test("the post page's own CSS bundle includes KaTeX styles", async ({
		page,
	}) => {
		await page.goto("/blog/why-surds-trip-up-students/");
		const cssHrefs = await page
			.locator('link[rel="stylesheet"]')
			.evaluateAll((links) => links.map((l) => (l as HTMLLinkElement).href));
		let found = false;
		for (const href of cssHrefs) {
			const css = await (await page.request.get(href)).text();
			if (css.includes(".katex")) {
				found = true;
				break;
			}
		}
		expect(found).toBe(true);
	});

	test("the landing page's CSS bundles do not include KaTeX styles", async ({
		page,
	}) => {
		await page.goto("/");
		const cssHrefs = await page
			.locator('link[rel="stylesheet"]')
			.evaluateAll((links) => links.map((l) => (l as HTMLLinkElement).href));
		for (const href of cssHrefs) {
			const css = await (await page.request.get(href)).text();
			expect(css).not.toContain(".katex");
		}
	});
});
