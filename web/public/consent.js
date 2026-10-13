// @ts-check
/**
 * Opt-out store and widget behaviour for Google measurement. Static and same-origin so the CSP (`script-src 'self'`,
 * no `'unsafe-inline'`) needs no change. Loaded before `analytics.js`, which waits for it.
 *
 * Opt-out model (docs/DECISIONS.md §49, R16): Google measurement is ON by default; the visitor can
 * opt out (and back in) from the floating widget. The choice lives in localStorage and an opt-out is
 * mirrored in a first-party cookie (no identifier, not a tracking cookie) so it survives blocked
 * storage. Nothing server-side reads either; the record exists only in the visitor's browser.
 */
(function () {
	var KEY = "jm-consent-v1";
	var VERSION = 1;

	/** @returns {boolean} */
	function cookieOptOut() {
		return document.cookie.split(";").some(function (c) {
			return c.trim() === KEY + "=rejected";
		});
	}

	/**
	 * The stored choice, or null when there is none (or it is garbage or an old version). An opt-out
	 * in EITHER the localStorage record or the mirror cookie counts, so blocked storage cannot lose it.
	 * @returns {ConsentChoice | null}
	 */
	function read() {
		var stored = null;
		try {
			var v = JSON.parse(
				/** @type {string} */ (window.localStorage.getItem(KEY)),
			);
			if (
				v &&
				v.version === VERSION &&
				(v.choice === "accepted" || v.choice === "rejected")
			) {
				stored = v.choice;
			}
		} catch (e) {}
		if (stored === "rejected" || cookieOptOut()) return "rejected";
		return stored;
	}

	/** @param {ConsentChoice} choice */
	function write(choice) {
		try {
			window.localStorage.setItem(
				KEY,
				JSON.stringify({
					choice: choice,
					version: VERSION,
					at: new Date().toISOString(),
				}),
			);
		} catch (e) {}
		// First-party mirror of the opt-out only, so it survives blocked storage. It is not a tracking
		// cookie and holds no identifier.
		var secure = window.location.protocol === "https:" ? "; Secure" : "";
		document.cookie =
			choice === "rejected"
				? KEY + "=rejected; max-age=31536000; path=/; SameSite=Lax" + secure
				: KEY + "=; max-age=0; path=/; SameSite=Lax" + secure;
	}

	/** @returns {string[]} */
	function googleCookieNames() {
		return document.cookie
			.split(";")
			.map(function (c) {
				return c.split("=")[0].trim();
			})
			.filter(function (n) {
				return /^_(ga|gid|gat|gcl)/.test(n);
			});
	}

	function clearGoogleCookies() {
		var host = window.location.hostname;
		var parts = host.split(".");
		var domains = [host];
		if (parts.length > 1) domains.push("." + parts.slice(-2).join("."));
		googleCookieNames().forEach(function (name) {
			domains.forEach(function (d) {
				document.cookie =
					name +
					"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" +
					d;
			});
			document.cookie =
				name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
		});
	}

	function widget() {
		return document.getElementById("consent-widget");
	}

	function panel() {
		return document.getElementById("consent-panel");
	}

	function toggleButton() {
		return document.getElementById("consent-toggle");
	}

	/** Does the Google tag run on this host? Same gate as analytics.js (single source: the data attributes). */
	function hostGateOpen() {
		var el = document.querySelector("script[data-gtm-id]");
		var host = el && el.getAttribute("data-analytics-host");
		return !!host && window.location.hostname === host;
	}

	// Tracking is ON unless the visitor opted out. GTM may be running in this page from its first
	// moment, so a later opt-out must reload it away. Remember in memory whether it may be running,
	// so the rule holds even when nothing is stored (storage blocked) and no cookie exists yet.
	var gtmMayRun = hostGateOpen() && read() !== "rejected";

	/** Reflect the current choice in the panel: status line and the pressed button. */
	function sync() {
		var off = read() === "rejected";
		var w = widget();
		if (!w) return;
		w.querySelectorAll("[data-consent]").forEach(function (btn) {
			var isOptOut = btn.getAttribute("data-consent") === "reject";
			btn.setAttribute("aria-pressed", String(isOptOut === off));
		});
		w.querySelectorAll("[data-consent-status]").forEach(function (node) {
			var line = /** @type {HTMLElement} */ (node);
			line.hidden =
				line.getAttribute("data-consent-status") !== (off ? "off" : "on");
		});
	}

	function openPanel() {
		var p = panel();
		var t = toggleButton();
		placeAboveCtaBar();
		if (p) p.hidden = false;
		if (t) t.setAttribute("aria-expanded", "true");
	}

	/** @param {boolean} [returnFocus] */
	function closePanel(returnFocus) {
		var p = panel();
		var t = toggleButton();
		if (p) p.hidden = true;
		if (t) {
			t.setAttribute("aria-expanded", "false");
			if (returnFocus) t.focus();
		}
	}

	/** @param {ConsentChoice} choice */
	function set(choice) {
		if (choice !== "accepted" && choice !== "rejected") return;
		write(choice);
		sync();
		if (choice === "accepted") {
			gtmMayRun = hostGateOpen();
		} else if (gtmMayRun || googleCookieNames().length > 0) {
			// GTM may already be running in this page. Clearing cookies and reloading is the only
			// reliable way to stop it.
			clearGoogleCookies();
			window.location.reload();
			return;
		}
		window.dispatchEvent(new CustomEvent("jm-consent", { detail: choice }));
	}

	// The mobile WhatsApp bar is fixed to the bottom (<=640px, z-index 20). Park the widget above
	// it instead of on top of it. Re-measured whenever the panel opens or the window resizes.
	function placeAboveCtaBar() {
		var bar = document.querySelector(".mobile-cta-bar");
		var h = 0;
		// Not `offsetParent`: it is null for a position:fixed element even when visible. Ask the
		// computed style and the rectangle instead.
		if (bar && window.getComputedStyle(bar).display !== "none") {
			var rect = bar.getBoundingClientRect();
			if (rect.height > 0) h = rect.height;
		}
		document.documentElement.style.setProperty("--consent-offset", h + "px");
	}
	window.addEventListener("resize", placeAboveCtaBar);

	window.jmConsent = { get: read, set: set };

	document.addEventListener("click", function (event) {
		var target = /** @type {Element | null} */ (event.target);
		var el =
			target && target.closest
				? target.closest(
						"[data-consent],[data-consent-open],[data-consent-toggle],[data-consent-close]",
					)
				: null;
		if (!el) return;
		if (el.hasAttribute("data-consent-toggle")) {
			var p = panel();
			if (p && !p.hidden) closePanel(false);
			else openPanel();
			return;
		}
		if (el.hasAttribute("data-consent-close")) {
			closePanel(true);
			return;
		}
		if (el.hasAttribute("data-consent-open")) {
			event.preventDefault();
			openPanel();
			var pressed = /** @type {HTMLElement | null} */ (
				document.querySelector(
					'#consent-panel [data-consent][aria-pressed="true"]',
				)
			);
			if (pressed) pressed.focus();
			return;
		}
		set(el.getAttribute("data-consent") === "accept" ? "accepted" : "rejected");
	});

	document.addEventListener("keydown", function (event) {
		var p = panel();
		if (event.key === "Escape" && p && !p.hidden) closePanel(true);
	});

	// A saved opt-out must leave no Google cookie. Opting out clears them and reloads, but the Google
	// tag can write its session cookie again while the old page unloads, so clear once more on the
	// page that follows. (Audit 2026-10-11: `_ga_<id>` survived in 8 of 8 delayed runs.)
	if (read() === "rejected" && googleCookieNames().length > 0) {
		clearGoogleCookies();
	}

	var w = widget();
	if (w) {
		w.hidden = false; // shown only when JavaScript runs; without it nothing tracks either
		placeAboveCtaBar();
		sync();
	}
})();
