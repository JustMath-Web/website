// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://mathematicsmalaysia.com",
	adapter: vercel(),
	integrations: [sitemap()],
	vite: {
		plugins: [tailwindcss()],
	},
});
