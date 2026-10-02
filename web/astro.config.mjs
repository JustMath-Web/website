// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { checkDeployEnv } from "./src/lib/content/assertDeployEnv.ts";
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

// https://astro.build/config
export default defineConfig({
	site: "https://mathematicsmalaysia.com",
	integrations: [deployEnvGuard, sitemap(), sanityRedirects()],
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
