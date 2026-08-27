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

// TEMPORARY pre-launch guard (docs/DECISIONS.md §27) — asserts the disallow-all robots.txt exists.
// vercel.json's matching X-Robots-Tag header is HTTP-layer only, not testable through this suite's
// local static server (scripts/serve-dist.mjs doesn't apply vercel.json headers — same caveat as
// the CSP/security-header tests, see docs/DECISIONS.md §22).
test.describe("robots.txt (pre-launch guard, §27)", () => {
	test("disallows all crawling", async ({ page }) => {
		const response = await page.goto("/robots.txt");
		expect(response?.status()).toBe(200);
		const body = await response!.text();
		expect(body).toMatch(/User-agent:\s*\*/i);
		expect(body).toMatch(/Disallow:\s*\/\s*$/im);
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
