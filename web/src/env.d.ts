/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_SANITY_PROJECT_ID: string;
	readonly PUBLIC_SANITY_DATASET: string;
	readonly SANITY_API_READ_TOKEN?: string;
	/** Must be the exact string "true" to opt into draft reads. See lib/sanity/client.ts. */
	readonly ENABLE_SANITY_PREVIEW?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
