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
	 * Vercel's own system environment variable — "production" | "preview" | "development". Not set
	 * outside a Vercel build/runtime (e.g. local dev), which is intentional: lib/content/blogData.ts
	 * treats an unset value as "not production" for the fixture-mode gate.
	 */
	readonly VERCEL_ENV?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
