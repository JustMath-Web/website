import type { SiteSettings } from "../sanity/types";

/**
 * The homepage sources its header CTA link from a Sanity-authored `cta.href` (see
 * `homePage.hero.cta`). Blog pages have no equivalent per-page CTA object, so their header link is
 * built directly from `siteSettings`'s WhatsApp fields instead — same wa.me URL shape as the fixture
 * constant in defaultLandingData.ts, just derived rather than hardcoded.
 */
export function buildWhatsAppUrl(siteSettings: SiteSettings): string {
	return `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(siteSettings.whatsappMessage)}`;
}
