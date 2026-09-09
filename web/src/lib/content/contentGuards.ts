/**
 * Shared guards against a single root cause: **presence tested where content should be tested.**
 *
 * Four separate-looking bugs on this project turned out to be the same mistake:
 *
 *   1. `post.seo ?? siteSettings.defaultSeo` — an object exists, so its empty fields win (fixed #54)
 *   2. `category.seo` projected and never read — the field exists, so nobody noticed (fixed #54)
 *   3. `if (!homePage || !siteSettings || !navigation)` — a husk document is truthy, so it renders
 *   4. `?? ` chains on strings — nullish-only, so `""` passes through as a legitimate value
 *
 * #3 is the one that mattered: a `drafts.homePage` containing only schema defaults sat in production
 * Sanity for six days, and every automated check in this repo was blind to it because the document
 * existed. Discarding that draft fixed the data. This file fixes the guard.
 *
 * **Precise about the exposure, because an earlier version of this comment overstated it.** The
 * Studio could NOT have published that husk: `studio/schemaTypes/documents/homePage.ts` already
 * marks the hero, trust bar, problem and sessions fields `Rule.required()`, and Sanity disables the
 * Publish button on validation errors. The reachable path was an **API write** — a script, a
 * migration, or an agent tool — none of which run Studio validation. That is not hypothetical: the
 * husk was found *because* an API client was about to patch and publish it, which would have
 * succeeded. This guard exists for the path validation does not cover.
 */

/**
 * The production sentinel. `DEPLOY_ENV` is host-set and configured explicitly in the Cloudflare
 * production environment; `NODE_ENV`/`import.meta.env.PROD` cannot distinguish a real production
 * deploy from a preview build, since preview builds also commonly run in production mode.
 *
 * Lives here rather than in `blogData.ts` so landing and blog share one definition — there was
 * previously only one copy, but only the blog consulted it, which is how the landing path ended up
 * with no production strictness at all.
 */
export function isProductionBuild(): boolean {
	return import.meta.env.DEPLOY_ENV === "production";
}

/** True only for a string with at least one non-whitespace character. `""` and `"   "` are not text. */
export function hasText(value: unknown): value is string {
	return typeof value === "string" && value.trim().length > 0;
}

/**
 * First argument that is actually text, else `undefined`.
 *
 * Use instead of `??` when chaining user-editable strings. `??` is nullish-only, so a field someone
 * cleared to `""` in the Studio wins the chain and ships — an empty `<title>` rather than the
 * fallback that was written precisely for that case.
 */
export function firstNonEmpty(
	...values: (string | null | undefined)[]
): string | undefined {
	for (const value of values) {
		if (hasText(value)) return value;
	}
	return undefined;
}

/** Minimal shapes — structural, so this module never has to import the full Sanity types. */
interface MaybeHomePage {
	hero?: { headline?: unknown; subheadline?: unknown } | null;
	trustItems?: unknown[] | null;
	levels?: unknown[] | null;
}
interface MaybeSiteSettings {
	siteName?: unknown;
	whatsappNumber?: unknown;
	whatsappMessage?: unknown;
}
interface MaybeNavigation {
	headerLinks?: unknown[] | null;
	footerLinks?: unknown[] | null;
}

/**
 * Names every required piece of landing content that is missing or blank. Empty array means the
 * documents are genuinely usable — not merely present.
 *
 * The fields checked are the ones whose absence produces a broken page rather than a degraded one:
 * no headline, no level blocks, no trust bar, or a WhatsApp CTA that cannot be built. `whatsappNumber`
 * and `whatsappMessage` are in the list because they are the only conversion channel on the site —
 * a page that renders perfectly with a dead CTA is worse than a page that fails to build.
 */
export function findMissingLandingContent(
	homePage: MaybeHomePage | null | undefined,
	siteSettings: MaybeSiteSettings | null | undefined,
	navigation: MaybeNavigation | null | undefined,
): string[] {
	const missing: string[] = [];

	if (!homePage) {
		missing.push("homePage (document missing)");
	} else {
		if (!hasText(homePage.hero?.headline))
			missing.push("homePage.hero.headline");
		if (!hasText(homePage.hero?.subheadline))
			missing.push("homePage.hero.subheadline");
		if (!homePage.trustItems?.length) missing.push("homePage.trustItems");
		if (!homePage.levels?.length) missing.push("homePage.levels");
	}

	if (!siteSettings) {
		missing.push("siteSettings (document missing)");
	} else {
		if (!hasText(siteSettings.siteName)) missing.push("siteSettings.siteName");
		if (!hasText(siteSettings.whatsappNumber))
			missing.push("siteSettings.whatsappNumber");
		if (!hasText(siteSettings.whatsappMessage))
			missing.push("siteSettings.whatsappMessage");
	}

	if (!navigation) {
		missing.push("navigation (document missing)");
	} else if (
		!navigation.headerLinks?.length &&
		!navigation.footerLinks?.length
	) {
		missing.push(
			"navigation.headerLinks / navigation.footerLinks (both empty)",
		);
	}

	return missing;
}
