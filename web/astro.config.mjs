// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { checkDeployEnv } from "./src/lib/content/assertDeployEnv.ts";
import { checkPrivacyFacts } from "./src/lib/content/assertPrivacyFacts.ts";
import { PRIVACY_FACTS } from "./src/lib/privacy.ts";
import { sanityRedirects } from "./src/lib/content/sanityRedirectsIntegration.ts";

/**
 * Fails the build when Cloudflare says it is deploying `main` but DEPLOY_ENV does not say
 * `production` — see src/lib/content/assertDeployEnv.ts for why that matters.
 *
 * Lives in an integration hook rather than a package script because the Cloudflare build command is
 * configured in a dashboard: a check wired into `pnpm build` could be bypassed by changing that
 * command, which is the same class of problem this check exists to catch. Every Astro build runs
 * this, whoever invoked it.
 */
const deployEnvGuard = {
	name: "just-math:deploy-env-guard",
	hooks: {
		"astro:build:start": () => {
			const { error, warning } = checkDeployEnv(process.env);
			if (warning) console.warn(`[deploy-env-guard] ${warning}`);
			if (error) throw new Error(`[deploy-env-guard] ${error}`);
		},
	},
};

/**
 * Fails a production build while the privacy notice carries an unfinished owner fact — see
 * src/lib/content/assertPrivacyFacts.ts. Same reasoning as `deployEnvGuard` for living in a hook.
 *
 * Runs in `astro:build:done`, i.e. LAST, on purpose. The build command still exits non-zero, so
 * Cloudflare does not publish; but every earlier production check (for example "Sanity is not
 * configured", which `pnpm test:blog-production-guardrail` asserts on) gets to fail first with its
 * own message instead of being masked by this one (docs/DECISIONS.md §49, ruling R13).
 */
const privacyFactsGuard = {
	name: "just-math:privacy-facts-guard",
	hooks: {
		"astro:build:done": () => {
			const { error } = checkPrivacyFacts(PRIVACY_FACTS, process.env);
			if (error) throw new Error(`[privacy-facts-guard] ${error}`);
		},
	},
};

// https://astro.build/config
export default defineConfig({
	site: "https://mathematicsmalaysia.com",
	integrations: [
		deployEnvGuard,
		privacyFactsGuard,
		sitemap(),
		sanityRedirects(),
	],
	vite: {
		plugins: [tailwindcss()],
		build: {
			// Never inline fonts as data: URIs. The CSP is `font-src 'self'`, which blocks data:
			// fonts, and Vite inlines any asset under 4KB — KaTeX_Size3's woff2 was inlined, so every
			// blog post logged a CSP error and fell back to the .woff. Other small assets keep the
			// default (undefined = use the 4KB limit). docs/DECISIONS.md §43.
			assetsInlineLimit: (filePath) =>
				/\.(woff2?|ttf|otf|eot)$/i.test(filePath) ? false : undefined,
		},
	},
});
