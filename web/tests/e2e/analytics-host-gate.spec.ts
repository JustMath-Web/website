import { expect, test } from "@playwright/test";

/**
 * The analytics loader must stay inert anywhere that is not the production domain, because the site
 * is still pre-launch behind `Disallow: /` and firing on preview/workers.dev URLs would pollute the
 * GA4 property whose baseline the cutover comparison depends on (docs/DECISIONS.md §12,
 * copywriting/SEARCH-STRATEGY.md §1). Asserted against real built output on 127.0.0.1.
 */
test("analytics is configured but does not fire off the production host", async ({
	page,
}) => {
	const googleRequests: string[] = [];
	page.on("request", (request) => {
		const url = request.url();
		if (
			url.includes("googletagmanager.com") ||
			url.includes("google-analytics.com")
		) {
			googleRequests.push(url);
		}
	});

	await page.goto("/");
	await page.waitForLoadState("networkidle");

	// The tag ships and carries its configuration...
	const tag = page.locator("script[data-gtm-id]");
	await expect(tag).toHaveAttribute("data-gtm-id", "GTM-KP5SMKV");
	await expect(tag).toHaveAttribute(
		"data-analytics-host",
		"mathematicsmalaysia.com",
	);

	// ...but the host gate keeps it from doing anything here.
	expect(googleRequests).toEqual([]);
	expect(await page.evaluate(() => (window as any).dataLayer)).toBeUndefined();
});

/**
 * Search Console ownership must survive the cutover. The property is verified by meta tag with no
 * DNS TXT fallback, so losing this tag loses the property and 16 months of query history.
 */
test("Search Console verification tag is present on every page type", async ({
	page,
}) => {
	for (const path of ["/", "/blog/", "/blog/level/add-maths/"]) {
		await page.goto(path);
		await expect(
			page.locator('meta[name="google-site-verification"]'),
		).toHaveAttribute("content", "gph_0vw9JyYV8vII8ecnQBcvDrx4gs0qmsFvL78sgtQ");
	}
});

/**
 * The CSP is `script-src 'self'` with no `'unsafe-inline'`. Adding GTM must not have introduced an
 * executable inline script, or every page would break under the shipped header.
 */
test("no executable inline scripts (JSON-LD data blocks excepted)", async ({
	page,
}) => {
	await page.goto("/");
	const offenders = await page.evaluate(() =>
		Array.from(document.querySelectorAll("script"))
			.filter((s) => !s.src && s.type !== "application/ld+json")
			.map((s) => s.outerHTML.slice(0, 120)),
	);
	expect(offenders).toEqual([]);
});
