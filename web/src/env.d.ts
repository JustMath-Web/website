/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_SANITY_PROJECT_ID: string;
	readonly PUBLIC_SANITY_DATASET: string;
	readonly SANITY_API_READ_TOKEN?: string;
	/** Must be the exact string "true" to opt into draft reads. See lib/sanity/client.ts. */
	readonly ENABLE_SANITY_PREVIEW?: string;
	/**
	 * Must be the exact string "true" to render fixture blog content instead of real Sanity data.
	 * Non-public (server/build-side routing logic only) and deliberately ignored in production builds
	 * regardless of its value — see lib/content/blogData.ts.
	 */
	readonly USE_BLOG_FIXTURES?: string;
	/**
	 * Deployment environment flag set by the host. This project uses a deliberate
	 * "production" sentinel for blog fixture gating; when unset, local/dev/preview builds are
	 * treated as non-production. Set this to "production" only in the Cloudflare Pages
	 * production environment.
	 */
	readonly DEPLOY_ENV?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
