import { expect, test, type Page } from "@playwright/test";
import { assertNoHorizontalOverflow } from "./helpers";

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

test("banner appears with no choice, in Malay and English, with equal buttons", async ({
	page,
}) => {
	await page.goto("/");
	const banner = page.locator("#consent-banner");
	await expect(banner).toBeVisible();
	await expect(banner).toContainText("Accept");
	await expect(banner).toContainText("Terima");
	await expect(banner).toContainText("Reject");
	await expect(banner).toContainText("Tolak");
	await expect(banner.locator('a[href="/privacy/"]').first()).toBeVisible();
	const a = await banner.locator('[data-consent="accept"]').boundingBox();
	const r = await banner.locator('[data-consent="reject"]').boundingBox();
	expect(Math.abs(a!.width - r!.width)).toBeLessThanOrEqual(2);
	expect(Math.abs(a!.height - r!.height)).toBeLessThanOrEqual(2);
	await expect(banner.locator('input[type="checkbox"]')).toHaveCount(0);
});

test("clicking Reject hides the banner and it stays hidden on the next page", async ({
	page,
}) => {
	await page.goto("/");
	await page.locator('#consent-banner [data-consent="reject"]').click();
	await expect(page.locator("#consent-banner")).toBeHidden();
	await page.goto("/blog/");
	await expect(page.locator("#consent-banner")).toBeHidden();
});

test("footer Cookie settings reopens the banner and moves focus into it", async ({
	page,
}) => {
	await page.goto("/");
	await page.locator('#consent-banner [data-consent="reject"]').click();
	await page.locator("[data-consent-open]").click();
	await expect(page.locator("#consent-banner")).toBeVisible();
	await expect(
		page.locator('#consent-banner [data-consent="accept"]'),
	).toBeFocused();
});

for (const width of [320, 390, 640]) {
	test(`at ${width}px the banner clears the mobile WhatsApp bar and keeps it clickable`, async ({
		page,
	}) => {
		await page.setViewportSize({ width, height: 844 });
		await page.goto("/");
		const banner = page.locator("#consent-banner");
		const bar = page.locator(".mobile-cta-bar");
		await expect(banner).toBeVisible();
		await expect(bar).toBeVisible();
		const offset = await page.evaluate(() =>
			parseFloat(
				document.documentElement.style.getPropertyValue("--consent-offset"),
			),
		);
		expect(offset).toBeGreaterThan(0); // a fixed bar must be measured, not read as zero
		const b = (await banner.boundingBox())!;
		const r = (await bar.boundingBox())!;
		expect(b.height).toBeLessThanOrEqual(844 * 0.5);
		// no overlap: the banner's bottom edge is at or above the bar's top edge
		expect(b.y + b.height).toBeLessThanOrEqual(r.y + 1);
		// and the bar's own button is what sits under its centre point
		const cta = bar.locator("a").first();
		const c = (await cta.boundingBox())!;
		const topmostIsCta = await page.evaluate(
			([x, y]) => !!document.elementFromPoint(x, y)?.closest(".mobile-cta-bar"),
			[c.x + c.width / 2, c.y + c.height / 2],
		);
		expect(topmostIsCta).toBe(true);
		// both banner buttons are reachable
		for (const which of ["accept", "reject"]) {
			const btn = banner.locator(`[data-consent="${which}"]`);
			const box = (await btn.boundingBox())!;
			const hit = await page.evaluate(
				([x, y]) =>
					!!document.elementFromPoint(x, y)?.closest("#consent-banner"),
				[box.x + box.width / 2, box.y + box.height / 2],
			);
			expect(hit, which).toBe(true);
		}
	});
}

test("on desktop the banner is not a focus trap", async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/");
	for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
	const inside = await page.evaluate(
		() => !!document.activeElement?.closest("#consent-banner"),
	);
	expect(inside).toBe(false);
});

test("with JavaScript off the banner never shows and nothing tracks", async ({
	browser,
}) => {
	const ctx = await browser.newContext({ javaScriptEnabled: false });
	const page = await ctx.newPage();
	const hits: string[] = [];
	page.on("request", (r) => {
		if (GOOGLE.test(r.url())) hits.push(r.url());
	});
	await page.goto("/");
	await expect(page.locator("#consent-banner")).toBeAttached();
	await expect(page.locator("#consent-banner")).toBeHidden();
	expect(hits).toEqual([]);
	await ctx.close();
});

test("/privacy/ has both languages and every s.7(1) heading", async ({
	page,
}) => {
	await page.goto("/privacy/");
	// The head must be parsed as a head (a stray element before <html> pushes it into <body>).
	expect(
		await page.evaluate(() => document.head.querySelector("title") !== null),
	).toBe(true);
	expect(
		await page.evaluate(() => document.head.childElementCount),
	).toBeGreaterThan(0);
	for (const lang of ["en", "ms"]) {
		await expect(
			page.locator(`section#notice-${lang}[lang="${lang}"]`),
		).toBeVisible();
		for (const id of [
			"who",
			"collect",
			"source",
			"rights",
			"recipients",
			"choices",
			"voluntary",
			"children",
			"retention",
			"changes",
		]) {
			await expect(page.locator(`#${id}-${lang}`)).toHaveCount(1);
		}
	}
	const sitemap = await (await page.request.get("/sitemap-0.xml")).text();
	expect(sitemap).toContain("/privacy/");
});

test("every banner and footer link to /privacy/ resolves", async ({
	page,
	request,
}) => {
	for (const path of ["/", "/blog/"]) {
		await page.goto(path);
		const hrefs = await page
			.locator('a[href="/privacy/"]')
			.evaluateAll((as) =>
				as.map((a) => (a as HTMLAnchorElement).getAttribute("href")),
			);
		expect(hrefs.length).toBeGreaterThanOrEqual(2); // banner + footer
		for (const href of new Set(hrefs)) {
			expect((await request.get(href!)).status(), href!).toBe(200);
		}
	}
});

test("/privacy/ has exactly one h1 and an outline that never skips a level", async ({
	page,
}) => {
	await page.goto("/privacy/");
	await expect(page.locator("h1")).toHaveCount(1);
	const levels = await page.evaluate(() =>
		Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6")).map((h) =>
			Number(h.tagName.slice(1)),
		),
	);
	expect(levels[0]).toBe(1);
	levels.forEach((level, i) => {
		if (i > 0) {
			expect(
				level,
				`heading ${i} jumps from h${levels[i - 1]}`,
			).toBeLessThanOrEqual(levels[i - 1] + 1);
		}
	});
	for (const lang of ["en", "ms"]) {
		const section = page.locator(`section#notice-${lang}`);
		const first = section.locator("h1,h2,h3,h4,h5,h6").first();
		expect(await first.evaluate((h) => h.tagName)).toBe("H2");
		// the section is named by that h2
		const labelledBy = await section.getAttribute("aria-labelledby");
		expect(await first.getAttribute("id")).toBe(labelledBy);
		// every required subsection is an h3 beneath it
		await expect(section.locator("h3")).toHaveCount(10);
		await expect(section.locator("h1")).toHaveCount(0);
	}
});

test("accept pushes Consent Mode v2 default (all denied) then update (all granted) before gtm.js is requested", async ({
	page,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	// Snapshot the dataLayer at the moment gtm.js is requested (registered after asProduction, so
	// it takes precedence for this URL). gtag() pushes `arguments` objects; plain objects are
	// GTM's own start event.
	let atGtmRequest: unknown[] | null = null;
	await page.route(/googletagmanager\.com\/gtm\.js/, async (route) => {
		atGtmRequest = await page.evaluate(() =>
			((window as any).dataLayer ?? []).map((e: unknown) =>
				Object.prototype.toString.call(e) === "[object Arguments]"
					? Array.from(e as ArrayLike<unknown>)
					: e,
			),
		);
		hits.push(route.request().url());
		return route.fulfill({
			status: 200,
			contentType: "application/javascript",
			body: "",
		});
	});
	await page.goto("/");
	// Nothing is defined or pushed before an accepted choice.
	expect(await page.evaluate(() => (window as any).dataLayer)).toBeUndefined();
	await page.evaluate(() => (window as any).jmConsent.set("accepted"));
	await expect.poll(() => atGtmRequest).not.toBeNull();
	const signals = (v: string) => ({
		analytics_storage: v,
		ad_storage: v,
		ad_user_data: v,
		ad_personalization: v,
	});
	const seen = atGtmRequest as unknown as unknown[];
	expect(seen.slice(0, 2)).toEqual([
		["consent", "default", signals("denied")],
		["consent", "update", signals("granted")],
	]);
	expect(seen[2]).toMatchObject({ event: "gtm.js" });
	expect(seen).toHaveLength(3);
});

test("no dataLayer with no choice and after Reject", async ({ page }) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	await page.goto("/");
	expect(await page.evaluate(() => (window as any).dataLayer)).toBeUndefined();
	expect(await page.evaluate(() => "gtag" in window)).toBe(false);
	await page.evaluate(() => (window as any).jmConsent.set("rejected"));
	await page.reload();
	await page.waitForLoadState("networkidle");
	expect(await page.evaluate(() => (window as any).dataLayer)).toBeUndefined();
	expect(await page.evaluate(() => "gtag" in window)).toBe(false);
	expect(hits).toEqual([]);
});

test("a blog post with a YouTube video still loads no Google analytics or ads request after Reject", async ({
	page,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	// The video loads from YouTube's privacy-enhanced domain whatever the visitor chose (the notice
	// says so; docs/DECISIONS.md §49, R12). That request is intentionally allowed and is NOT in the
	// GOOGLE pattern. Stub it so the test is hermetic and can show it was made.
	const youtube: string[] = [];
	await page.route(/youtube-nocookie\.com/, (route) => {
		youtube.push(route.request().url());
		return route.fulfill({
			status: 200,
			contentType: "text/html",
			body: "<!doctype html><title>stub</title>",
		});
	});
	await page.goto("/blog/why-surds-trip-up-students/");
	await page.evaluate(() => (window as any).jmConsent.set("rejected"));
	await page.reload();
	await page.waitForLoadState("networkidle");
	await expect(page.locator(".pt-youtube iframe")).toHaveCount(1);
	expect(youtube.length).toBeGreaterThan(0);
	expect(hits).toEqual([]);
	expect(await page.evaluate(() => (window as any).dataLayer)).toBeUndefined();
});

for (const width of [320, 390]) {
	test(`/privacy/ has no horizontal overflow at ${width}px`, async ({
		page,
	}) => {
		await page.setViewportSize({ width, height: 844 });
		await page.goto("/privacy/");
		await assertNoHorizontalOverflow(page);
	});
}

for (const width of [390, 1440]) {
	test(`at ${width}px each banner privacy link is visibly separated from the sentence before it`, async ({
		page,
	}) => {
		await page.setViewportSize({ width, height: 844 });
		await page.goto("/");
		await expect(page.locator("#consent-banner")).toBeVisible();
		// Measured on the rendered page: the compiler can collapse the whitespace before the link, so
		// the HTML alone proves nothing. Compare the right edge of the last character before the link
		// with the link's first box, when they share a line.
		const gaps = await page.evaluate(() =>
			Array.from(
				document.querySelectorAll<HTMLAnchorElement>(
					'#consent-banner .consent__text a[href="/privacy/"]',
				),
			).map((a) => {
				let node: Node | null = a.previousSibling;
				while (node && !(node.nodeType === 3 && node.textContent!.trim()))
					node = node.previousSibling;
				const text = node!.textContent!;
				const range = document.createRange();
				range.setStart(node!, text.length - 1);
				range.setEnd(node!, text.length);
				const last = range.getBoundingClientRect();
				const link = a.getClientRects()[0];
				const sameLine = link.top < last.bottom && link.bottom > last.top;
				return { sameLine, gap: link.left - last.right };
			}),
		);
		expect(gaps).toHaveLength(2);
		for (const g of gaps) {
			if (g.sameLine) expect(g.gap).toBeGreaterThanOrEqual(3);
		}
	});
}
