import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { createClient } from "@sanity/client";
import type { AstroIntegration } from "astro";

import { mergeRedirects } from "./mergeRedirects.ts";

/**
 * Appends the redirects editors saved in Sanity Studio to `dist/_redirects` after the build.
 *
 * Runs after the build rather than writing into `public/` so the committed file stays the
 * hand-maintained legacy map and the generated rules never land in git.
 *
 * Reads `process.env` directly, not `import.meta.env`: this runs in the config process, where Vite
 * has not injected anything. Cloudflare provides the variables there; locally they may be absent.
 *
 * Failure policy follows the blog's: a production build must not ship silently missing redirects,
 * so a Sanity failure there fails the build. Everywhere else it warns and keeps the static rules.
 */
export function sanityRedirects(): AstroIntegration {
	return {
		name: "just-math:sanity-redirects",
		hooks: {
			"astro:build:done": async ({ dir, logger }) => {
				const env = process.env;
				const isProduction = env.DEPLOY_ENV === "production";
				const projectId = env.PUBLIC_SANITY_PROJECT_ID;
				const dataset = env.PUBLIC_SANITY_DATASET;

				const bail = (message: string) => {
					if (isProduction) throw new Error(`[sanity-redirects] ${message}`);
					logger.warn(`${message} Keeping only public/_redirects.`);
				};

				if (!projectId || !dataset) {
					bail("PUBLIC_SANITY_PROJECT_ID / PUBLIC_SANITY_DATASET are not set.");
					return;
				}

				let documents: unknown[];
				try {
					documents = await createClient({
						projectId,
						dataset,
						apiVersion: "2026-08-14",
						useCdn: false,
						token: env.SANITY_API_READ_TOKEN || undefined,
						perspective: "published",
					}).fetch(`*[_type == "redirect"]{from, to, permanent}`);
				} catch (error) {
					bail(`Could not read redirects from Sanity: ${error}.`);
					return;
				}

				const file = fileURLToPath(new URL("_redirects", dir));
				const staticFile = await readFile(file, "utf8").catch(() => "");
				const result = mergeRedirects(staticFile, documents);

				for (const { from, reason } of result.skipped) {
					logger.warn(`Skipped Sanity redirect ${from}: ${reason}`);
				}
				if (result.applied.length > 0) {
					await writeFile(file, result.content);
				}
				logger.info(
					`${result.applied.length} Sanity redirect(s) added, ${result.skipped.length} skipped.`,
				);
			},
		},
	};
}
