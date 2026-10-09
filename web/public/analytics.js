// @ts-check
/**
 * Google Tag Manager loader.
 *
 * Served as a static, same-origin file so it satisfies the site's `script-src 'self'` CSP with no
 * `'unsafe-inline'`. GTM's documented snippet is inline JS; using it would have forced
 * `'unsafe-inline'` sitewide to install one tag. This site ships zero executable inline scripts and
 * that stays true. (An Astro bundled `<script>` was tried first — Astro inlines chunks this small,
 * which the CSP would block, so a static file it is.)
 *
 * Configuration is NOT duplicated here. The container ID and the host gate are read from data
 * attributes set by `src/components/Analytics.astro`, which reads them from `src/lib/analytics.ts` —
 * the single source of truth (`docs/DECISIONS.md` §12).
 *
 * GTM now loads only after an `accepted` choice; see `consent.js`. On that choice, and before GTM
 * is requested, Google Consent Mode v2 is declared on the dataLayer: all four signals `denied` by
 * default, then `granted` as the visitor accepted. Nothing is defined or pushed before then. The
 * design is a binary accept/reject gate, so the update grants all four together (docs/DECISIONS.md
 * §49, ruling R14).
 */
(function () {
	// `document.currentScript` is null for a deferred script, so find the tag by its marker.
	var el = document.querySelector("script[data-gtm-id]");
	if (!el) return;

	var gtmId = el.getAttribute("data-gtm-id");
	var host = el.getAttribute("data-analytics-host");
	if (!gtmId || !host) return;

	// Host gate — unchanged: keeps preview, *.workers.dev and localhost traffic out of the property.
	if (window.location.hostname !== host) return;

	var started = false;
	function start() {
		if (started) return;
		started = true;
		var layer = (window.dataLayer = window.dataLayer || []);
		// GTM reads gtag() commands as `arguments` objects, so this must push `arguments`, not an array.
		function gtag() {
			layer.push(arguments);
		}
		var signals = [
			"analytics_storage",
			"ad_storage",
			"ad_user_data",
			"ad_personalization",
		];
		/** @param {"denied" | "granted"} value */
		function state(value) {
			/** @type {Record<string, string>} */
			var out = {};
			signals.forEach(function (name) {
				out[name] = value;
			});
			return out;
		}
		gtag("consent", "default", state("denied"));
		gtag("consent", "update", state("granted"));
		layer.push({ "gtm.start": Date.now(), event: "gtm.js" });
		var tag = document.createElement("script");
		tag.async = true;
		tag.src = "https://www.googletagmanager.com/gtm.js?id=" + gtmId;
		document.head.appendChild(tag);
	}

	// Consent first. `consent.js` is deferred ahead of this file, so `jmConsent` exists here.
	window.addEventListener("jm-consent", function (event) {
		if (event.detail === "accepted") start();
	});
	if (window.jmConsent && window.jmConsent.get() === "accepted") start();
})();
