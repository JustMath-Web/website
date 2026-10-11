import { expect, type Page } from "@playwright/test";

export const MIN_TAP_TARGET = 44;
/**
 * The product requirement stays 44 CSS px. Browsers report a laid-out box in floating point, and
 * Chromium has measured a 44px `min-height` link at 43.99997 (blog TOC sheet, CI and local). Allow
 * 0.01px of that rounding noise so a real shortfall (even 43.9) still fails.
 */
export const SUBPIXEL_TOLERANCE = 0.01;

export async function assertNoHorizontalOverflow(page: Page) {
	const overflow = await page.evaluate(
		() =>
			document.documentElement.scrollWidth -
			document.documentElement.clientWidth,
	);
	expect(overflow).toBeLessThanOrEqual(0);
}

export async function assertMinTapTarget(page: Page, selector: string) {
	const targets = page.locator(selector);
	const count = await targets.count();
	expect(count).toBeGreaterThan(0);

	for (let index = 0; index < count; index += 1) {
		const box = await targets.nth(index).boundingBox();
		expect(box, `${selector} [${index}] has no bounding box`).not.toBeNull();
		expect(box!.width, `${selector} [${index}] width`).toBeGreaterThanOrEqual(
			MIN_TAP_TARGET - SUBPIXEL_TOLERANCE,
		);
		expect(box!.height, `${selector} [${index}] height`).toBeGreaterThanOrEqual(
			MIN_TAP_TARGET - SUBPIXEL_TOLERANCE,
		);
	}
}
