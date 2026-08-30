import { defineConfig } from "@playwright/test";

/**
 * Static site: `webServer` builds then serves `dist/` via `scripts/serve-dist.mjs`, matching what
 * actually ships (guideline Section 19 — browser verification MUST run against real built output,
 * not dev mode). Not `astro preview`: it daemonizes (prints "running" and returns immediately),
 * which Playwright's `webServer` can't track as a live process. Viewports mirror the widths this
 * project's own breakpoints and Bob's reviews measure at (390/560/768/1440 — see design/STATES.md
 * and review/bob/CODE-REVIEW.md).
 */
export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
	use: {
		baseURL: "http://127.0.0.1:4321",
		viewport: { width: 1440, height: 900 },
		trace: "on-first-retry",
	},
	webServer: {
		command: "pnpm run build && node scripts/serve-dist.mjs 4321",
		url: "http://127.0.0.1:4321",
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
		// USE_BLOG_FIXTURES: real fixture content to test the blog routes against, matching how the
		// homepage's own fixture fallback already lets every other test here exercise real content
		// without a live Sanity connection. Never set DEPLOY_ENV here — production build behavior
		// (fail on missing Sanity, reject this flag) is what web/src/lib/content/blogData.ts is
		// supposed to do in that case, and this suite must not accidentally mask that.
		env: { USE_BLOG_FIXTURES: "true" },
	},
});
