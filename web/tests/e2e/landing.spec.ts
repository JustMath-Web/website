import { test, expect } from "@playwright/test";
import {
	MIN_TAP_TARGET,
	assertMinTapTarget,
	assertNoHorizontalOverflow,
} from "./helpers";

/**
 * Viewports matched to this project's own breakpoints (SiteHeader's 560px, index.astro's 860/520px)
 * and to the widths Bob's independent reviews measure at (review/bob/CODE-REVIEW.md).
 */
const VIEWPORTS = [
	{ name: "mobile-390", width: 390, height: 844 },
	{ name: "mobile-560", width: 560, height: 900 },
	{ name: "tablet-768", width: 768, height: 1024 },
	{ name: "desktop-1440", width: 1440, height: 900 },
];

for (const viewport of VIEWPORTS) {
	test.describe(`landing page @ ${viewport.name}`, () => {
		test.use({ viewport: { width: viewport.width, height: viewport.height } });

		test("has no horizontal overflow", async ({ page }) => {
			await page.goto("/");
			await assertNoHorizontalOverflow(page);
		});

		test("has exactly one <main> and one <h1>", async ({ page }) => {
			await page.goto("/");
			await expect(page.locator("main")).toHaveCount(1);
			await expect(page.locator("h1")).toHaveCount(1);
		});

		test("has header and footer landmarks", async ({ page }) => {
			await page.goto("/");
			await expect(page.locator("header")).toHaveCount(1);
			await expect(page.locator("footer")).toHaveCount(1);
		});
	});
}

test.describe("structured data (VS-07)", () => {
	test("sitewide Organization JSON-LD is present and valid", async ({
		page,
	}) => {
		await page.goto("/");
		const raw = await page
			.locator('script[type="application/ld+json"]')
			.textContent();
		expect(raw).not.toBeNull();

		const json = JSON.parse(raw!);
		expect(json["@context"]).toBe("https://schema.org");
		expect(json["@type"]).toBe("Organization");
		expect(typeof json.name).toBe("string");
		expect(json.name.length).toBeGreaterThan(0);
		expect(json.url).toMatch(/^https:\/\//);
		expect(json.telephone).toMatch(/^\+\d+$/);
	});
});

// Post-cutover (docs/DECISIONS.md §13b). This test was the INVERSE until launch: it asserted the
// pre-launch `Disallow: /` guard existed (§27). Inverted rather than deleted, so the file keeps a
// test — an accidental revert to `Disallow: /` would otherwise delist the entire site with no
// symptom anyone would notice for weeks.
//
// _headers' X-Robots-Tag is HTTP-layer only and not testable through this suite's local static
// server (scripts/serve-dist.mjs doesn't apply Pages headers — same caveat as the CSP/security-header
// tests, docs/DECISIONS.md §22), so its removal is verified by inspection in the cutover PR.
test.describe("robots.txt (post-cutover, §13b)", () => {
	test("permits crawling and declares the sitemap", async ({ page }) => {
		const response = await page.goto("/robots.txt");
		expect(response?.status()).toBe(200);
		const body = await response!.text();
		expect(body).toMatch(/User-agent:\s*\*/i);
		expect(body).toMatch(/Allow:\s*\//i);
		expect(body).toMatch(
			/Sitemap:\s*https:\/\/mathematicsmalaysia\.com\/sitemap-index\.xml/i,
		);
	});

	test("does NOT disallow crawling — the pre-launch guard must not come back", async ({
		page,
	}) => {
		const response = await page.goto("/robots.txt");
		const body = await response!.text();
		// Only a bare `Disallow: /` blocks everything; `Disallow:` with a path is fine, and a
		// commented line is not a directive.
		const activeDisallowAll = body
			.split("\n")
			.filter((line) => !line.trim().startsWith("#"))
			.some((line) => /^\s*Disallow:\s*\/\s*$/i.test(line));
		expect(activeDisallowAll).toBe(false);
	});
});

// Tap targets are only required to meet the minimum on touch-relevant widths; 390px is this
// project's primary phone breakpoint and where Bob's review measured the VS-02/VS-03 failures.
test.describe("tap targets (390px)", () => {
	test.use({ viewport: { width: 390, height: 844 } });

	test("'Blog notes' level links meet the 44x44 minimum (VS-02)", async ({
		page,
	}) => {
		await page.goto("/");
		await assertMinTapTarget(page, ".level-row__heading a");
	});

	test("footer navigation links meet the 44x44 minimum (VS-03)", async ({
		page,
	}) => {
		await page.goto("/");
		await assertMinTapTarget(page, ".site-footer__link");
	});

	test("header navigation links meet the 44x44 minimum", async ({ page }) => {
		await page.goto("/");
		await assertMinTapTarget(page, ".site-header__link");
	});

	test("header brand/logo link meets the 44x44 minimum (VS-13)", async ({
		page,
	}) => {
		await page.goto("/");
		await assertMinTapTarget(page, ".site-header__brand");
	});

	test("skip link meets the 44x44 minimum when focused (VS-14)", async ({
		page,
	}) => {
		await page.goto("/");
		// .skip-link animates into view on focus (transform transition). Measuring
		// mid-transition can report a sub-pixel-short bounding box from the browser's
		// compositor, not a real layout regression, so wait for the transition to
		// settle before asserting the final resting size.
		const transitionSettled = page.locator(".skip-link").evaluate(
			(el) =>
				new Promise<void>((resolve) =>
					el.addEventListener("transitionend", () => resolve(), {
						once: true,
					}),
				),
		);
		await page.keyboard.press("Tab");
		await transitionSettled;
		const box = await page.locator(".skip-link").boundingBox();
		expect(box, "skip link has no bounding box").not.toBeNull();
		expect(box!.width).toBeGreaterThanOrEqual(MIN_TAP_TARGET);
		expect(box!.height).toBeGreaterThanOrEqual(MIN_TAP_TARGET);
	});
});

test.describe("keyboard navigation", () => {
	test("first Tab reaches the skip link with a visible focus ring", async ({
		page,
	}) => {
		await page.goto("/");
		await page.keyboard.press("Tab");

		const focused = page.locator(":focus");
		await expect(focused).toHaveAttribute("href", "#main");

		const outlineStyle = await focused.evaluate(
			(el) => getComputedStyle(el).outlineStyle,
		);
		expect(outlineStyle).not.toBe("none");
	});

	test("skip link moves focus to <main> on activation", async ({ page }) => {
		await page.goto("/");
		await page.keyboard.press("Tab");
		await page.keyboard.press("Enter");
		await expect(page).toHaveURL(/#main$/);
	});
});

test.describe("FAQ accordion", () => {
	test("opens one item on click and closes the previously open one", async ({
		page,
	}) => {
		await page.goto("/");
		const faq = page.locator("#faq");
		await faq.scrollIntoViewIfNeeded();

		const items = faq.locator(".faq-list details");
		const count = await items.count();
		expect(count).toBeGreaterThan(1);

		const first = items.nth(0);
		const second = items.nth(1);

		// The first FAQ item is open by default (index.astro: `open={index === 0}`).
		await expect(first).toHaveJSProperty("open", true);
		await expect(second).toHaveJSProperty("open", false);

		await second.locator("summary").click();

		// Native <details name="faq"> makes the group exclusive — the browser closes the rest.
		await expect(second).toHaveJSProperty("open", true);
		await expect(first).toHaveJSProperty("open", false);
	});

	test("reachable and operable by keyboard", async ({ page }) => {
		await page.goto("/");
		const faq = page.locator("#faq");
		await faq.scrollIntoViewIfNeeded();

		const first = faq.locator(".faq-list details").first();
		const summary = first.locator("summary");
		await summary.focus();
		await expect(summary).toBeFocused();

		await page.keyboard.press("Enter");
		await expect(first).toHaveJSProperty("open", false);
	});

	// VS-06: switched from a scripted show/hide to native <details>/<summary> specifically so
	// answers stay reachable if JavaScript fails to load or run — verify that claim directly,
	// in a browser context with JS actually disabled, not just by reading the markup.
	test("answers remain reachable with JavaScript disabled (VS-06)", async ({
		browser,
	}) => {
		const context = await browser.newContext({ javaScriptEnabled: false });
		const page = await context.newPage();

		try {
			await page.goto("/");
			const faq = page.locator("#faq");
			await faq.scrollIntoViewIfNeeded();

			const items = faq.locator(".faq-list details");
			expect(await items.count()).toBeGreaterThan(1);

			const second = items.nth(1);
			await expect(second.locator(".faq-list__panel")).toBeHidden();

			await second.locator("summary").click();
			await expect(second.locator(".faq-list__panel")).toBeVisible();
		} finally {
			await context.close();
		}
	});
});

// The portrait is the only photograph on the site, and it carries the page's central claim that a
// real named person teaches every session (design/ASSETS.md §2). It was MISSING and launch-blocking
// until 2026-09-08; the page shipped a typographic fallback instead. These assert the image branch,
// which fixture data now exercises via a synthetic asset ref (same pattern as defaultBlogData, §28).
test.describe("about portrait (design/ASSETS.md §2)", () => {
	test("renders the portrait slot, not the typographic fallback", async ({
		page,
	}) => {
		await page.goto("/");
		await expect(page.locator("#mrkong-portrait")).toBeVisible();
		await expect(page.locator(".portrait-fallback")).toHaveCount(0);
	});

	test("is a responsive 4:5 image with a real alt and no layout shift", async ({
		page,
	}) => {
		await page.goto("/");
		const img = page.locator("#mrkong-portrait img");

		// A non-empty alt: `intent: decorative` would be wrong for this image specifically.
		const alt = await img.getAttribute("alt");
		expect(alt?.trim().length).toBeGreaterThan(0);

		// width/height must describe the DELIVERED 4:5 crop, not the source asset's ratio —
		// otherwise the browser reserves the wrong box and the section shifts on load.
		const w = Number(await img.getAttribute("width"));
		const h = Number(await img.getAttribute("height"));
		expect(h / w).toBeCloseTo(1.25, 2);

		// Sanity must be asked for the crop, so the bytes match the pixels shown.
		const src = await img.getAttribute("src");
		expect(src).toContain("fit=crop");
		expect(src).toContain("auto=format");

		const srcset = await img.getAttribute("srcset");
		expect(srcset?.split(",").length).toBeGreaterThanOrEqual(3);
		await expect(img).toHaveAttribute("loading", "lazy");
	});

	test("the byline renders once, above the heading", async ({ page }) => {
		await page.goto("/");
		// Approved copy places it above the heading when the photograph is shown; the fallback
		// carries it otherwise. Exactly one, never both.
		await expect(page.locator(".about-byline")).toHaveCount(1);
		const bylineY = await page
			.locator(".about-byline")
			.evaluate((el) => el.getBoundingClientRect().top);
		const headingY = await page
			.locator("#about-title")
			.evaluate((el) => el.getBoundingClientRect().top);
		expect(bylineY).toBeLessThan(headingY);
	});
});
