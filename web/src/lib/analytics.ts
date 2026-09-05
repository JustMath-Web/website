/**
 * Analytics configuration — the single typed module required by `docs/DECISIONS.md` §12.
 *
 * These are the CLIENT-OWNED identifiers already running on the legacy WordPress site, reused with
 * the owner's explicit authorisation (2026-09-05). They are public identifiers, not secrets: they
 * ship in the HTML of every page that loads them, so hardcoding them here is not a leak. They are
 * hardcoded rather than read from env deliberately — an unset env var in Cloudflare would fail
 * silently and collect nothing, which is the failure mode this is most likely to hit.
 *
 * §12 says "prefer GTM as the single container", so GA4 is NOT loaded as a second on-page tag even
 * though the legacy site does exactly that (it loads `gtag/js?id=G-6EWT7G0LZS` *and* the GTM
 * container). Loading both here would double-count every pageview if the container also holds a GA4
 * tag. §12a records the one thing that must be confirmed inside the container before cutover.
 */
export const GTM_ID = "GTM-KP5SMKV";

/**
 * Recorded for traceability only — deliberately NOT loaded on the page. GA4 data is expected to
 * flow from a GA4 Configuration tag inside the GTM container above.
 */
export const GA4_MEASUREMENT_ID = "G-6EWT7G0LZS";

/**
 * Search Console verification token, lifted from the legacy site's own `<meta>` tag.
 *
 * This is load-bearing at cutover and easy to miss: the property is verified by META TAG, and
 * `dig TXT mathematicsmalaysia.com` returns nothing, so there is no DNS fallback. The moment the
 * domain stops serving WordPress, verification breaks and the property — with its 16 months of
 * query history — becomes inaccessible unless this tag is present on the new site.
 */
export const GSC_VERIFICATION_TOKEN =
	"gph_0vw9JyYV8vII8ecnQBcvDrx4gs0qmsFvL78sgtQ";

/**
 * Analytics loads ONLY on this host.
 *
 * §12 requires production analytics to stay off in local/dev/test, but a build-time production flag
 * is not enough here: the production build is what deploys to `*.workers.dev` preview URLs, and the
 * site is still pre-launch behind `robots.txt: Disallow: /` and a site-wide `X-Robots-Tag: noindex`
 * (§13/§27). Firing on those URLs would pollute a property whose historical baseline is being used
 * for the cutover comparison in `copywriting/SEARCH-STRATEGY.md`.
 *
 * Gating on hostname instead means analytics is inert everywhere today and turns itself on at
 * cutover, with no follow-up deploy required.
 */
export const ANALYTICS_HOSTNAME = "mathematicsmalaysia.com";
