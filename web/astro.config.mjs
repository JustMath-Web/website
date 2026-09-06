// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import { checkDeployEnv } from "./src/lib/content/assertDeployEnv.ts";

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
	integrations: [deployEnvGuard, sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
