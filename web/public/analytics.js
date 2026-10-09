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
 * GTM now loads only after an `accepted` choice; see `consent.js`.
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
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
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
