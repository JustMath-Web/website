import { test, expect, type Page } from "@playwright/test";

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

const MIN_TAP_TARGET = 44;

async function assertNoHorizontalOverflow(page: Page) {
	const overflow = await page.evaluate(
		() =>
			document.documentElement.scrollWidth -
			document.documentElement.clientWidth,
	);
	expect(overflow).toBeLessThanOrEqual(0);
}

async function assertMinTapTarget(page: Page, selector: string) {
	const targets = page.locator(selector);
	const count = await targets.count();
	expect(count).toBeGreaterThan(0);

	for (let index = 0; index < count; index += 1) {
		const box = await targets.nth(index).boundingBox();
		expect(box, `${selector} [${index}] has no bounding box`).not.toBeNull();
		expect(box!.width, `${selector} [${index}] width`).toBeGreaterThanOrEqual(
			MIN_TAP_TARGET,
		);
		expect(box!.height, `${selector} [${index}] height`).toBeGreaterThanOrEqual(
			MIN_TAP_TARGET,
		);
	}
}

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

		const buttons = faq.locator(".faq-list button");
		const count = await buttons.count();
		expect(count).toBeGreaterThan(1);

		const firstButton = buttons.nth(0);
		const secondButton = buttons.nth(1);

		// The first FAQ item is open by default (index.astro: `const open = index === 0`).
		await expect(firstButton).toHaveAttribute("aria-expanded", "true");

		await secondButton.click();
		await expect(secondButton).toHaveAttribute("aria-expanded", "true");
		await expect(firstButton).toHaveAttribute("aria-expanded", "false");

		const firstPanelId = await firstButton.getAttribute("aria-controls");
		expect(firstPanelId).not.toBeNull();
		await expect(page.locator(`#${firstPanelId}`)).toBeHidden();

		const secondPanelId = await secondButton.getAttribute("aria-controls");
		expect(secondPanelId).not.toBeNull();
		await expect(page.locator(`#${secondPanelId}`)).toBeVisible();
	});

	test("reachable and operable by keyboard", async ({ page }) => {
		await page.goto("/");
		const faq = page.locator("#faq");
		await faq.scrollIntoViewIfNeeded();

		const firstButton = faq.locator(".faq-list button").first();
		await firstButton.focus();
		await expect(firstButton).toBeFocused();

		await page.keyboard.press("Enter");
		await expect(firstButton).toHaveAttribute("aria-expanded", "false");
	});
});
