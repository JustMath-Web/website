import { expect, test, type BrowserContext, type Page } from "@playwright/test";
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

const gtmCount = (hits: string[]) =>
	hits.filter((u) => u.includes("gtm.js")).length;

const googleCookies = async (context: BrowserContext) =>
	(await context.cookies())
		.map((c) => c.name)
		.filter((n) => /^_(ga|gid|gat|gcl)/.test(n));

/** Open the panel with the floating button, then press one of its two buttons. */
async function choose(page: Page, which: "accept" | "reject") {
	const panel = page.locator("#consent-panel");
	if (await panel.isHidden()) await page.locator("#consent-toggle").click();
	await panel.locator(`[data-consent="${which}"]`).click();
}

/** Opt out through the real UI and wait for the reload it triggers. */
async function optOut(page: Page) {
	await Promise.all([page.waitForEvent("load"), choose(page, "reject")]);
}

test("default visit on the production host: GTM is requested once and the panel is closed", async ({
	page,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	await page.goto("/");
	await expect.poll(() => gtmCount(hits)).toBe(1);
	await page.waitForLoadState("networkidle");
	expect(gtmCount(hits)).toBe(1);
	expect(await page.evaluate(() => (window as any).jmConsent.get())).toBeNull();
	await expect(page.locator("#consent-toggle")).toBeVisible();
	await expect(page.locator("#consent-panel")).toBeHidden();
	await expect(page.locator("#consent-toggle")).toHaveAttribute(
		"aria-expanded",
		"false",
	);
});

test("default visit on a non-production host loads nothing from Google", async ({
	page,
}) => {
	const hits: string[] = [];
	await page.route(GOOGLE, (route) => {
		hits.push(route.request().url());
		return route.abort();
	});
	await page.goto("/");
	await page.waitForLoadState("networkidle");
	expect(hits).toEqual([]);
	expect(await page.evaluate(() => (window as any).dataLayer)).toBeUndefined();
});

test("opt out: nothing from Google after the reload and on the next page, cookies cleared, choice stored twice", async ({
	page,
	context,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	await page.goto("/");
	await expect.poll(() => gtmCount(hits)).toBe(1);
	await context.addCookies([
		{ name: "_ga", value: "x", url: "http://127.0.0.1:4321" },
		{ name: "_ga_ABC123", value: "x", url: "http://127.0.0.1:4321" },
		{ name: "keep", value: "x", url: "http://127.0.0.1:4321" },
	]);
	hits.length = 0;
	await optOut(page);
	await page.waitForLoadState("networkidle");
	const cookies = await context.cookies();
	expect(cookies.map((c) => c.name)).toContain("keep");
	expect(await googleCookies(context)).toEqual([]);
	expect(cookies.find((c) => c.name === "jm-consent-v1")?.value).toBe(
		"rejected",
	);
	expect(
		await page.evaluate(() => localStorage.getItem("jm-consent-v1")),
	).toContain('"rejected"');
	expect(hits).toEqual([]);
	expect(await page.evaluate(() => (window as any).dataLayer)).toBeUndefined();
	expect(await page.evaluate(() => "gtag" in window)).toBe(false);
	expect(await page.evaluate(() => (window as any).jmConsent.get())).toBe(
		"rejected",
	);
	// and on the next page
	await page.goto("/blog/");
	await page.waitForLoadState("networkidle");
	expect(hits).toEqual([]);
	expect(await page.evaluate(() => (window as any).dataLayer)).toBeUndefined();
});

test("after an opt-out the panel shows the off state with Opt out pressed", async ({
	page,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	await page.goto("/");
	await optOut(page);
	await page.locator("#consent-toggle").click();
	await expect(page.locator('[data-consent="reject"]')).toHaveAttribute(
		"aria-pressed",
		"true",
	);
	await expect(page.locator('[data-consent="accept"]')).toHaveAttribute(
		"aria-pressed",
		"false",
	);
	await expect(page.locator("#consent-panel .consent__status")).toContainText(
		"Google tracking is off",
	);
	await expect(page.locator("#consent-panel .consent__status")).toContainText(
		"dimatikan",
	);
});

test("opt out then opt back in: GTM loads again with no reload and the status line follows", async ({
	page,
	context,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	await page.goto("/");
	await optOut(page);
	hits.length = 0;
	let reloaded = false;
	page.on("load", () => (reloaded = true));
	await page.locator("#consent-toggle").click();
	await choose(page, "accept");
	await expect.poll(() => gtmCount(hits)).toBe(1);
	expect(reloaded).toBe(false);
	await expect(page.locator("#consent-panel .consent__status")).toContainText(
		"Google tracking is on",
	);
	await expect(page.locator('[data-consent="accept"]')).toHaveAttribute(
		"aria-pressed",
		"true",
	);
	expect(
		(await context.cookies()).some((c) => c.name === "jm-consent-v1"),
	).toBe(false);
	expect(await page.evaluate(() => (window as any).jmConsent.get())).toBe(
		"accepted",
	);
	// and the next page tracks again
	await page.goto("/blog/");
	await expect.poll(() => gtmCount(hits)).toBe(2);
});

test("delayed opt-out: a Google cookie written while the old page unloads is gone after the reload and a further wait", async ({
	page,
	context,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	// Model what the audit observed: the tag writes its session cookie again while the page that was
	// tracking unloads (the reload that the opt-out triggers). Registered after asProduction so it wins.
	await page.route(/googletagmanager\.com\/gtm\.js/, (route) => {
		hits.push(route.request().url());
		return route.fulfill({
			status: 200,
			contentType: "application/javascript",
			body: 'window.addEventListener("pagehide", function () { document.cookie = "_ga_6EWT7G0LZS=late; path=/; max-age=34000000"; });',
		});
	});
	await page.goto("/");
	await expect.poll(() => gtmCount(hits)).toBe(1);
	await page.waitForTimeout(1500);
	hits.length = 0;
	await optOut(page);
	await page.waitForTimeout(1500);
	expect(await googleCookies(context)).toEqual([]);
	// And it stays gone on the next page, with no Google request.
	await page.goto("/privacy/");
	await page.waitForTimeout(1000);
	expect(await googleCookies(context)).toEqual([]);
	expect(hits).toEqual([]);
});

test("blocked storage: the opt-out still persists through its cookie and stops GTM on the next page", async ({
	page,
	context,
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
	await expect.poll(() => gtmCount(hits)).toBe(1); // no stored choice: tracking is on
	hits.length = 0;
	await optOut(page); // GTM may be running, so it reloads even though nothing could be stored
	await page.waitForLoadState("networkidle");
	expect(hits).toEqual([]);
	expect(await page.evaluate(() => (window as any).dataLayer)).toBeUndefined();
	expect(await page.evaluate(() => (window as any).jmConsent.get())).toBe(
		"rejected",
	);
	expect(
		(await context.cookies()).find((c) => c.name === "jm-consent-v1")?.value,
	).toBe("rejected");
	await page.goto("/blog/");
	await page.waitForLoadState("networkidle");
	expect(hits).toEqual([]);
	expect(errors).toEqual([]);
});

test("both stores blocked: the opt-out fails closed, with no reload, for this tab", async ({
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
		Object.defineProperty(document, "cookie", {
			get: () => "",
			set: () => {},
		});
	});
	const errors: string[] = [];
	page.on("pageerror", (e) => errors.push(e.message));
	let reloaded = false;
	await page.goto("/");
	await expect.poll(() => gtmCount(hits)).toBe(1);
	page.on("load", () => (reloaded = true));
	hits.length = 0;
	await choose(page, "reject");
	await expect(
		page.locator('#consent-panel [data-consent-status="tab"]'),
	).toBeVisible();
	await expect(page.locator("#consent-panel .consent__status")).toContainText(
		"opt-out applies to this tab only",
	);
	await expect(page.locator("#consent-panel .consent__status")).toContainText(
		"hanya untuk tab ini",
	);
	await page.waitForTimeout(1000);
	expect(reloaded).toBe(false);
	expect(hits).toEqual([]);
	const last = await page.evaluate(() => {
		const layer = (window as any).dataLayer as unknown[];
		return Array.from(layer[layer.length - 1] as ArrayLike<unknown>);
	});
	expect(last).toEqual([
		"consent",
		"update",
		{
			analytics_storage: "denied",
			ad_storage: "denied",
			ad_user_data: "denied",
			ad_personalization: "denied",
		},
	]);
	expect(
		await page.evaluate(() => (window as any)["ga-disable-G-6EWT7G0LZS"]),
	).toBe(true);
	// the same tab, another page: nothing loads and nothing is defined
	await page.goto("/blog/");
	await page.waitForLoadState("networkidle");
	expect(hits).toEqual([]);
	expect(await page.evaluate(() => (window as any).dataLayer)).toBeUndefined();
	expect(await page.evaluate(() => (window as any).jmConsent.get())).toBe(
		"rejected",
	);
	await page.locator("#consent-toggle").click();
	await expect(
		page.locator('#consent-panel [data-consent-status="tab"]'),
	).toBeVisible();
	expect(errors).toEqual([]);
	// opting back in clears the tab marker and tracking returns without a reload
	await choose(page, "accept");
	await expect.poll(() => gtmCount(hits)).toBe(1);
	expect(await page.evaluate(() => window.name)).not.toContain("jm-optout");
});

const bothBlocked = (page: Page) =>
	page.addInitScript(() => {
		Object.defineProperty(window, "localStorage", {
			get() {
				throw new DOMException("blocked", "SecurityError");
			},
		});
		Object.defineProperty(document, "cookie", {
			get: () => "",
			set: () => {},
		});
	});

const signals = (v: string) => ({
	analytics_storage: v,
	ad_storage: v,
	ad_user_data: v,
	ad_personalization: v,
});

const layerNow = (page: Page) =>
	page.evaluate(() =>
		((window as any).dataLayer ?? []).map((e: unknown) =>
			Object.prototype.toString.call(e) === "[object Arguments]"
				? Array.from(e as ArrayLike<unknown>)
				: e,
		),
	);

test("both stores blocked, same page: opt out then Keep on reloads and tracks again with signals granted", async ({
	page,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	await bothBlocked(page);
	await page.goto("/");
	await expect.poll(() => gtmCount(hits)).toBe(1);
	hits.length = 0;
	await choose(page, "reject");
	await expect(
		page.locator('#consent-panel [data-consent-status="tab"]'),
	).toBeVisible();
	await page.waitForTimeout(800);
	expect(hits).toEqual([]);
	await Promise.all([page.waitForEvent("load"), choose(page, "accept")]);
	await expect.poll(() => gtmCount(hits)).toBe(1);
	expect(
		await page.evaluate(() => (window as any)["ga-disable-G-6EWT7G0LZS"]),
	).not.toBe(true);
	const seen = await layerNow(page);
	expect(seen.slice(0, 2)).toEqual([
		["consent", "default", signals("denied")],
		["consent", "update", signals("granted")],
	]);
	expect(seen[2]).toMatchObject({ event: "gtm.js" });
	expect(await page.evaluate(() => window.name)).not.toContain("jm-optout");
	await page.locator("#consent-toggle").click();
	await expect(page.locator("#consent-panel .consent__status")).toContainText(
		"Google tracking is on",
	);
});

test("normal storage, same page: opt out then Keep on loads GTM with signals granted and no ga-disable", async ({
	page,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	await page.goto("/");
	await optOut(page);
	hits.length = 0;
	await choose(page, "accept");
	await expect.poll(() => gtmCount(hits)).toBe(1);
	expect(
		await page.evaluate(() => (window as any)["ga-disable-G-6EWT7G0LZS"]),
	).not.toBe(true);
	const seen = await layerNow(page);
	expect(seen.slice(0, 2)).toEqual([
		["consent", "default", signals("denied")],
		["consent", "update", signals("granted")],
	]);
});

test("garbage or old-version stored choice counts as no choice, so tracking is on", async ({
	page,
}) => {
	const hits: string[] = [];
	await asProduction(page, hits);
	await page.addInitScript(() =>
		localStorage.setItem("jm-consent-v1", "{not json"),
	);
	await page.goto("/");
	expect(await page.evaluate(() => (window as any).jmConsent.get())).toBeNull();
	await expect.poll(() => gtmCount(hits)).toBe(1);
	await page.evaluate(() =>
		localStorage.setItem(
			"jm-consent-v1",
			JSON.stringify({ choice: "rejected", version: 0 }),
		),
	);
	expect(await page.evaluate(() => (window as any).jmConsent.get())).toBeNull();
	await page.reload();
	await expect.poll(() => gtmCount(hits)).toBe(2);
});

test("widget is visible with no choice, with bilingual text and equal buttons", async ({
	page,
}) => {
	await page.goto("/");
	const toggle = page.locator("#consent-toggle");
	await expect(toggle).toBeVisible();
	await expect(toggle).toContainText("Cookies / Kuki");
	await toggle.click();
	const panel = page.locator("#consent-panel");
	await expect(panel).toBeVisible();
	await expect(panel.locator('p[lang="en"]').first()).toContainText(
		"opt out here at any time",
	);
	await expect(panel.locator('p[lang="ms"]').first()).toContainText(
		"menarik diri",
	);
	await expect(panel).toContainText("Keep on");
	await expect(panel).toContainText("Kekal hidup");
	await expect(panel).toContainText("Opt out");
	await expect(panel).toContainText("Tarik diri");
	await expect(panel.locator('a[href="/privacy/"]').first()).toBeVisible();
	const a = await panel.locator('[data-consent="accept"]').boundingBox();
	const r = await panel.locator('[data-consent="reject"]').boundingBox();
	expect(Math.abs(a!.width - r!.width)).toBeLessThanOrEqual(2);
	expect(Math.abs(a!.height - r!.height)).toBeLessThanOrEqual(2);
	await expect(panel.locator('[data-consent="accept"]')).toHaveAttribute(
		"aria-pressed",
		"true",
	);
	await expect(panel.locator('[data-consent="reject"]')).toHaveAttribute(
		"aria-pressed",
		"false",
	);
	await expect(panel.locator('input[type="checkbox"]')).toHaveCount(0);
});

test("the panel opens and closes with the button, Close, Escape and the footer link, and focus returns", async ({
	page,
}) => {
	await page.goto("/");
	const toggle = page.locator("#consent-toggle");
	const panel = page.locator("#consent-panel");
	await toggle.click();
	await expect(panel).toBeVisible();
	await expect(toggle).toHaveAttribute("aria-expanded", "true");
	await toggle.click();
	await expect(panel).toBeHidden();
	await expect(toggle).toHaveAttribute("aria-expanded", "false");
	// Close button returns focus to the floating button
	await toggle.click();
	await panel.locator("[data-consent-close]").click();
	await expect(panel).toBeHidden();
	await expect(toggle).toBeFocused();
	// Escape does too
	await toggle.click();
	await page.keyboard.press("Escape");
	await expect(panel).toBeHidden();
	await expect(toggle).toBeFocused();
	// the footer link opens the panel and moves focus into it
	await page.locator("[data-consent-open]").click();
	await expect(panel).toBeVisible();
	await expect(toggle).toHaveAttribute("aria-expanded", "true");
	await expect(panel.locator('[data-consent="accept"]')).toBeFocused();
});

test("opening the widget never happens by itself", async ({ page }) => {
	await page.goto("/");
	await page.waitForTimeout(800);
	await expect(page.locator("#consent-panel")).toBeHidden();
});

test("the floating button meets the 44px target and the widget is not a focus trap", async ({
	page,
}) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/");
	const box = (await page.locator("#consent-toggle").boundingBox())!;
	expect(box.width).toBeGreaterThanOrEqual(43.99);
	expect(box.height).toBeGreaterThanOrEqual(43.99);
	await page.locator("#consent-toggle").click(); // panel open
	let left = false;
	for (let i = 0; i < 8; i++) {
		await page.keyboard.press("Tab");
		if (
			await page.evaluate(
				() => !document.activeElement?.closest("#consent-widget"),
			)
		) {
			left = true;
			break;
		}
	}
	expect(left).toBe(true);
});

for (const width of [320, 390, 640]) {
	test(`at ${width}px the widget clears the mobile WhatsApp bar, keeps it clickable and does not overflow`, async ({
		page,
	}) => {
		await page.setViewportSize({ width, height: 844 });
		await page.goto("/");
		const toggle = page.locator("#consent-toggle");
		const bar = page.locator(".mobile-cta-bar");
		await expect(toggle).toBeVisible();
		await expect(bar).toBeVisible();
		const offset = await page.evaluate(() =>
			parseFloat(
				document.documentElement.style.getPropertyValue("--consent-offset"),
			),
		);
		expect(offset).toBeGreaterThan(0); // a fixed bar must be measured, not read as zero
		const r = (await bar.boundingBox())!;
		const c = (await bar.locator("a").first().boundingBox())!;
		const topmost = (x: number, y: number, sel: string) =>
			page.evaluate(
				([px, py, s]) =>
					!!document
						.elementFromPoint(px as number, py as number)
						?.closest(s as string),
				[x, y, sel],
			);
		for (const open of [false, true]) {
			if (open) await toggle.click();
			const t = (await toggle.boundingBox())!;
			// no overlap: the button's bottom edge is at or above the bar's top edge
			expect(t.y + t.height).toBeLessThanOrEqual(r.y + 1);
			expect(
				await topmost(t.x + t.width / 2, t.y + t.height / 2, "#consent-widget"),
			).toBe(true);
			// and the bar's own button is what sits under its centre point
			expect(
				await topmost(c.x + c.width / 2, c.y + c.height / 2, ".mobile-cta-bar"),
			).toBe(true);
			if (open) {
				const p = (await page.locator("#consent-panel").boundingBox())!;
				expect(p.y + p.height).toBeLessThanOrEqual(r.y + 1);
				expect(p.y).toBeGreaterThanOrEqual(0);
				for (const which of ["accept", "reject"]) {
					const b = (await page
						.locator(`#consent-panel [data-consent="${which}"]`)
						.boundingBox())!;
					expect(
						await topmost(
							b.x + b.width / 2,
							b.y + b.height / 2,
							"#consent-widget",
						),
						which,
					).toBe(true);
				}
			}
			if (width <= 390) await assertNoHorizontalOverflow(page);
		}
	});
}

test("on desktop the widget sits at the bottom-left with no bar offset", async ({
	page,
}) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/");
	const t = (await page.locator("#consent-toggle").boundingBox())!;
	expect(t.x).toBeLessThan(40);
	expect(900 - (t.y + t.height)).toBeLessThan(40);
});

test("with JavaScript off the widget never shows and nothing tracks", async ({
	browser,
}) => {
	const ctx = await browser.newContext({ javaScriptEnabled: false });
	const page = await ctx.newPage();
	const hits: string[] = [];
	page.on("request", (r) => {
		if (GOOGLE.test(r.url())) hits.push(r.url());
	});
	await page.goto("/");
	await expect(page.locator("#consent-widget")).toBeAttached();
	await expect(page.locator("#consent-widget")).toBeHidden();
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

test("every widget and footer link to /privacy/ resolves", async ({
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
		expect(hrefs.length).toBeGreaterThanOrEqual(2); // widget + footer
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

test("default visit pushes Consent Mode v2 default (all denied) then update (all granted) before gtm.js is requested", async ({
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

test("a blog post with a YouTube video still loads no Google analytics or ads request after opt-out", async ({
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
	await optOut(page);
	hits.length = 0;
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
	test(`at ${width}px each widget privacy link is visibly separated from the sentence before it`, async ({
		page,
	}) => {
		await page.setViewportSize({ width, height: 844 });
		await page.goto("/");
		await page.locator("#consent-toggle").click();
		await expect(page.locator("#consent-panel")).toBeVisible();
		// Measured on the rendered page: the compiler can collapse the whitespace before the link, so
		// the HTML alone proves nothing. Compare the right edge of the last character before the link
		// with the link's first box, when they share a line.
		const gaps = await page.evaluate(() =>
			Array.from(
				document.querySelectorAll<HTMLAnchorElement>(
					'#consent-panel .consent__text a[href="/privacy/"]',
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

test("/privacy/ renders notice text as text, never as markup", async ({
	page,
}) => {
	await page.goto("/privacy/");
	const html = await page.locator("main").innerHTML();
	expect(html).not.toMatch(/&lt;(script|img|iframe)/i); // nothing double-escaped from copy
	expect(await page.locator("main script, main iframe, main img").count()).toBe(
		0,
	);
});

// Draft state (the committed state): `/privacy/` stays noindex with a draft note until every owner
// fact, `copyApprovedOn` (approval of the draft), `adviserReviewedOn` and `nativeMalayReviewedOn`
// are set. Whoever sets the last review date inverts this test; that edit is part of the release
// checklist in DECISIONS §49 (R17, R18).
test("/privacy/ is noindex and shows the draft note until the adviser and native Malay reviews are recorded", async ({
	page,
}) => {
	// Draft state while `adviserReviewedOn` or `nativeMalayReviewedOn` is null (docs/DECISIONS.md §49,
	// R18). When both reviews are done and recorded, whoever sets the dates inverts this test: the
	// robots meta and the draft note must be absent.
	await page.goto("/privacy/");
	await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
		"content",
		"noindex,nofollow",
	);
	await expect(page.locator(".draft-note")).toContainText("Draft");
});

test("/privacy/ notice paragraphs and lists keep their measure, spacing and indent", async ({
	page,
}) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto("/privacy/");
	const p = await page
		.locator("#notice-en h3 + p")
		.first()
		.evaluate((el) => {
			const s = getComputedStyle(el);
			return { maxWidth: s.maxWidth, marginBottom: s.marginBottom };
		});
	expect(p.maxWidth).not.toBe("none");
	expect(parseFloat(p.maxWidth)).toBeGreaterThan(0);
	expect(parseFloat(p.maxWidth)).toBeLessThan(900); // about 68ch, not the full column
	expect(p.marginBottom).toBe("12px");
	const ul = await page
		.locator("#notice-en ul")
		.first()
		.evaluate((el) => {
			const s = getComputedStyle(el);
			return { type: s.listStyleType, padLeft: s.paddingLeft };
		});
	// The old page showed no bullets either (Tailwind preflight resets list-style); this test pins
	// the old computed look, it does not change it.
	expect(ul.type).toBe("none");
	expect(parseFloat(ul.padLeft)).toBeGreaterThan(0);
});
