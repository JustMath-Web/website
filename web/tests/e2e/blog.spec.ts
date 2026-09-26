import { test, expect } from "@playwright/test";
import { assertMinTapTarget, assertNoHorizontalOverflow } from "./helpers";

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
		// One positive assertion per override. The failure this guards against is a SILENT DROP:
		// if a major astro-portabletext bump changes the override signature, it does not throw — it
		// renders the block as nothing. The page builds, the post loads, and the maths or the embed
		// is simply absent. "The post looks fine" is exactly the check that would pass.
		await expect(page.locator(".callout")).toBeVisible();
		await expect(page.getByText("Where this goes wrong")).toBeVisible(); // commonMistake's label
		await expect(page.locator(".working")).toBeVisible();
		// Block and inline maths are separate overrides sharing one KaTeX surface — asserted apart,
		// because a `.katex` locator alone stays green when only one of the two stops rendering.
		await expect(page.locator(".math-block")).toBeVisible();
		await expect(page.locator(".math-inline").first()).toBeVisible();
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
		//
		// The fixture post also carries a deliberate YouTube embed (PR #48), and the youtube-nocookie
		// player fetches its OWN css/js/fonts from Google hosts once the lazy iframe starts loading.
		// Those are the embed's subresources, not this site's — the CSP already allows the frame
		// (`frame-src https://www.youtube-nocookie.com`), and this test is about first-party CSS,
		// fonts and scripts being self-hosted. Excluded by host rather than by timing: the iframe is
		// `loading="lazy"`, so whether its requests land before `goto` resolves is a RACE, and this
		// assertion was already flaky on main (observed failing 1 run in 5 with no code changes)
		// before anything on this branch touched it. Excluding the hosts makes it deterministic.
		const EMBED_HOSTS = [
			"www.youtube-nocookie.com",
			"fonts.gstatic.com",
			"www.google.com",
		];
		const externalRequests: string[] = [];
		page.on("request", (request) => {
			const type = request.resourceType();
			if (type !== "stylesheet" && type !== "font" && type !== "script") {
				return;
			}
			const url = new URL(request.url());
			if (
				url.hostname !== "127.0.0.1" &&
				url.hostname !== "localhost" &&
				!EMBED_HOSTS.includes(url.hostname)
			) {
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

// The fixture surds post has 6 headings over three levels (H2–H4), including "Worked example"
// twice; the indices post has none. See components/blog/TableOfContents.astro.
test.describe("blog post table of contents", () => {
	const POST = "/blog/why-surds-trip-up-students/";
	const EXPECTED_IDS = [
		"split-the-number-into-square-factors",
		"worked-example",
		"where-students-go-wrong",
		"worked-example-2",
		"adding-under-the-root",
		"see-it-step-by-step",
	];

	test("every H2–H4 gets a unique id, and each TOC link points at one", async ({
		page,
	}) => {
		await page.goto(POST);
		const ids = await page
			.locator(".prose :is(h2, h3, h4)")
			.evaluateAll((els) => els.map((el) => el.id));
		expect(ids).toEqual(EXPECTED_IDS);

		const toc = page.getByRole("navigation", { name: "Table of contents" });
		const hrefs = await toc
			.getByRole("link")
			.evaluateAll((links) => links.map((a) => a.getAttribute("href")));
		expect(hrefs).toEqual(EXPECTED_IDS.map((id) => `#${id}`));
	});

	test("desktop: a rail link lands the heading below the sticky header and marks it current", async ({
		page,
	}) => {
		await page.goto(POST);
		await expect(page.locator(".toc-pill")).toBeHidden();
		const toc = page.getByRole("navigation", { name: "Table of contents" });
		const link = toc.getByRole("link", { name: "See it step by step" });
		// Keyboard focus opens the panel (:focus-within), the same path a keyboard user takes.
		await link.focus();
		await expect(page.locator(".toc-panel")).toHaveCSS("opacity", "1");
		await link.press("Enter");
		await expect(page).toHaveURL(/#see-it-step-by-step$/);
		await expect(link).toHaveAttribute("aria-current", "location");
		const top = await page
			.locator("#see-it-step-by-step")
			.evaluate((el) => el.getBoundingClientRect().top);
		const headerHeight = await page
			.locator(".site-header")
			.evaluate((el) => el.getBoundingClientRect().height);
		expect(top).toBeGreaterThanOrEqual(headerHeight);
	});

	test("desktop 1024px: Escape closes the open panel until focus moves (WCAG 1.4.13, 2.4.7)", async ({
		page,
	}) => {
		// At 1024px the open panel covers ~150px of the text column, so it must be dismissible.
		await page.setViewportSize({ width: 1024, height: 800 });
		await page.goto(POST);
		const panel = page.locator(".toc-panel");
		const toc = page.getByRole("navigation", { name: "Table of contents" });
		await toc.getByRole("link").first().focus();
		await expect(panel).toHaveCSS("opacity", "1");

		await page.keyboard.press("Escape");
		await expect(panel).toHaveCSS("opacity", "0");
		// Moving focus to the next link shows the panel again — a keyboard user must never tab
		// through invisible links (WCAG 2.4.7). Bob, PR #100 re-review.
		await page.keyboard.press("Tab");
		await expect(toc.getByRole("link").nth(1)).toBeFocused();
		await expect(panel).toHaveCSS("opacity", "1");

		await page.keyboard.press("Escape");
		await expect(panel).toHaveCSS("opacity", "0");

		// Focus leaves the rail, then comes back: the panel opens again.
		await page.locator("#post-title").evaluate((el) => {
			el.setAttribute("tabindex", "-1");
			(el as HTMLElement).focus();
		});
		await toc.getByRole("link").first().focus();
		await expect(panel).toHaveCSS("opacity", "1");
	});

	test("desktop: the rail lines meet 3:1 contrast against the page (WCAG 1.4.11)", async ({
		page,
	}) => {
		await page.goto(POST);
		const ratio = await page
			.locator(".toc-rail__line")
			.first()
			.evaluate((el) => {
				const rgb = (value: string) =>
					(value.match(/\d+(\.\d+)?/g) ?? []).slice(0, 3).map(Number);
				const lum = ([r, g, b]: number[]) => {
					const c = [r, g, b].map((v) => {
						const s = v / 255;
						return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
					});
					return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
				};
				const line = lum(rgb(getComputedStyle(el).backgroundColor));
				const page = lum(rgb(getComputedStyle(document.body).backgroundColor));
				const [hi, lo] = line > page ? [line, page] : [page, line];
				return (hi + 0.05) / (lo + 0.05);
			});
		expect(ratio).toBeGreaterThanOrEqual(3);
	});

	test("mobile: the Contents pill opens a sheet, and tapping a link closes it", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto(POST);
		const pill = page.getByRole("button", { name: "Contents" });
		await expect(pill).toBeVisible();
		await expect(page.locator(".toc-rail")).toBeHidden();
		await assertMinTapTarget(page, ".toc-pill");

		await pill.click();
		const sheet = page.locator(".toc-sheet");
		await expect(sheet).toBeVisible();
		await assertMinTapTarget(page, ".toc-sheet .toc-link");
		await assertMinTapTarget(page, ".toc-sheet__close");

		await sheet.getByRole("link", { name: "Where students go wrong" }).click();
		await expect(sheet).toBeHidden();
		await expect(page).toHaveURL(/#where-students-go-wrong$/);
		await assertNoHorizontalOverflow(page);
	});

	test("mobile: the pill sits above the fixed WhatsApp bar", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 390, height: 844 });
		await page.goto(POST);
		const pill = await page.locator(".toc-pill").boundingBox();
		const bar = await page.locator(".mobile-cta-bar").boundingBox();
		expect(pill!.y + pill!.height).toBeLessThanOrEqual(bar!.y);
	});

	test("works with JavaScript disabled: plain anchors and a native popover sheet", async ({
		browser,
	}) => {
		// Reduced motion keeps this test deterministic. Without it, ~1 run in 5 inside the test runner
		// hung on the sheet-link click with "element is not stable" until the timeout — while the sheet
		// was fully open and its box identical in every sample (Bob, PR #100). So it is Playwright's
		// own stability check stalling, not movement on the page; the site has no bug here. This test
		// checks the no-JS mechanics (anchors + native popover), not the slide-in or smooth scroll.
		const context = await browser.newContext({
			javaScriptEnabled: false,
			reducedMotion: "reduce",
			viewport: { width: 390, height: 844 },
		});
		const page = await context.newPage();
		try {
			await page.goto(POST);
			await page.getByRole("button", { name: "Contents" }).click();
			const sheet = page.locator(".toc-sheet");
			await expect(sheet).toBeVisible();
			await sheet.getByRole("link", { name: "Adding under the root" }).click();
			await expect(page).toHaveURL(/#adding-under-the-root$/);
		} finally {
			await context.close();
		}
	});

	test("a post with no headings renders no TOC and loads no TOC script", async ({
		page,
	}) => {
		await page.goto("/blog/indices-rules-in-order/");
		await expect(page.locator("[data-toc]")).toHaveCount(0);
		await expect(page.locator('script[src="/blog-toc.js"]')).toHaveCount(0);
	});
});
