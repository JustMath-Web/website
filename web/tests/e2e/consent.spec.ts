import { expect, test, type Page } from "@playwright/test";

const GOOGLE =
	/googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net|google\.com(\.my)?\/ads\//;

/** Make the page believe 127.0.0.1 is the production host, and stub Google. */
async function asProduction(page: Page, hits: string[]) {
	await page.route(GOOGLE, (route) => {
		hits.push(route.request().url());
		return route.fulfill({
			status: 200,
			contentType: "application/javascript",
			body: "",
		});
	});
	await page.route("**/*", async (route) => {
		const req = route.request();
		if (req.resourceType() === "document") {
			const res = await route.fetch();
			const body = (await res.text()).replace(
				'data-analytics-host="mathematicsmalaysia.com"',
				'data-analytics-host="127.0.0.1"',
			);
			return route.fulfill({ response: res, body });
		}
		return route.fallback();
	});
}

test("the Google request pattern covers every host seen on a first visit", () => {
	for (const url of [
		"https://www.googletagmanager.com/gtm.js?id=GTM-KP5SMKV",
		"https://analytics.google.com/g/collect?v=2",
		"https://stats.g.doubleclick.net/g/collect?v=2",
		"https://www.google.com.my/ads/ga-audiences?v=1",
		"https://www.google.com/ads/ga-audiences?v=1",
	]) {
		expect(GOOGLE.test(url), url).toBe(true);
	}
	expect(GOOGLE.test("https://cdn.sanity.io/images/x.jpg")).toBe(false);
});

test("built HTML has no Google Tag Manager noscript iframe", async ({
	request,
}) => {
	const html = await (await request.get("/")).text();
	expect(html).not.toContain("googletagmanager.com");
});

test("no Google request before a choice, even on the production host", async ({
	page,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	await page.goto("/");
	await page.waitForLoadState("networkidle");
	expect(hits).toEqual([]);
	expect(await page.evaluate(() => (window as any).dataLayer)).toBeUndefined();
	expect(await page.evaluate(() => (window as any).jmConsent.get())).toBeNull();
});

test("accept loads GTM once and the choice survives a reload", async ({
	page,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	await page.goto("/");
	await page.evaluate(() => (window as any).jmConsent.set("accepted"));
	await expect
		.poll(() => hits.filter((u) => u.includes("gtm.js")).length)
		.toBe(1);
	await page.reload();
	await expect
		.poll(() => hits.filter((u) => u.includes("gtm.js")).length)
		.toBe(2); // one per page load
	expect(await page.evaluate(() => (window as any).jmConsent.get())).toBe(
		"accepted",
	);
});

test("reject loads nothing and survives a reload", async ({ page }) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	await page.goto("/");
	await page.evaluate(() => (window as any).jmConsent.set("rejected"));
	await page.reload();
	await page.waitForLoadState("networkidle");
	expect(hits).toEqual([]);
	expect(await page.evaluate(() => (window as any).jmConsent.get())).toBe(
		"rejected",
	);
});

test("accept then reject clears Google cookies and stops GTM after the reload", async ({
	page,
	context,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	await page.goto("/");
	await page.evaluate(() => (window as any).jmConsent.set("accepted"));
	await context.addCookies([
		{ name: "_ga", value: "x", url: "http://127.0.0.1:4321" },
		{ name: "_ga_ABC123", value: "x", url: "http://127.0.0.1:4321" },
		{ name: "keep", value: "x", url: "http://127.0.0.1:4321" },
	]);
	hits.length = 0;
	await Promise.all([
		page.waitForEvent("load"),
		page.evaluate(() => (window as any).jmConsent.set("rejected")),
	]);
	const names = (await context.cookies()).map((c) => c.name);
	expect(names).toContain("keep");
	expect(names.filter((n) => /^_(ga|gid|gat|gcl)/.test(n))).toEqual([]);
	expect(hits).toEqual([]);
});

test("blocked storage: accept then reject still stops GTM by reloading", async ({
	page,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	await page.addInitScript(() => {
		Object.defineProperty(window, "localStorage", {
			get() {
				throw new DOMException("blocked", "SecurityError");
			},
		});
	});
	await page.goto("/");
	await page.evaluate(() => (window as any).jmConsent.set("accepted"));
	await expect
		.poll(() => hits.filter((u) => u.includes("gtm.js")).length)
		.toBe(1);
	hits.length = 0;
	await Promise.all([
		page.waitForEvent("load"),
		page.evaluate(() => (window as any).jmConsent.set("rejected")),
	]);
	await page.waitForLoadState("networkidle");
	expect(hits).toEqual([]); // the reloaded page has no stored choice and loads no Google
	expect(await page.evaluate(() => (window as any).dataLayer)).toBeUndefined();
});

test("garbage or old-version stored choice counts as no choice", async ({
	page,
}) => {
	await page.addInitScript(() =>
		localStorage.setItem("jm-consent-v1", "{not json"),
	);
	await page.goto("/");
	expect(await page.evaluate(() => (window as any).jmConsent.get())).toBeNull();
	await page.evaluate(() =>
		localStorage.setItem(
			"jm-consent-v1",
			JSON.stringify({ choice: "accepted", version: 0 }),
		),
	);
	expect(await page.evaluate(() => (window as any).jmConsent.get())).toBeNull();
});

test("unavailable localStorage does not crash and does not track", async ({
	page,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	await page.addInitScript(() => {
		Object.defineProperty(window, "localStorage", {
			get() {
				throw new DOMException("blocked", "SecurityError");
			},
		});
	});
	const errors: string[] = [];
	page.on("pageerror", (e) => errors.push(e.message));
	await page.goto("/");
	await page.waitForLoadState("networkidle");
	expect(errors).toEqual([]);
	expect(hits).toEqual([]);
	expect(await page.evaluate(() => (window as any).jmConsent.get())).toBeNull();
});
