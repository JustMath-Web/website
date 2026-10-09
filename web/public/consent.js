/**
 * Consent store for Google measurement. Static and same-origin so the CSP (`script-src 'self'`,
 * no `'unsafe-inline'`) needs no change. Loaded before `analytics.js`, which waits for it.
 *
 * Why localStorage and not a cookie: this choice must not itself be a tracking cookie, and nothing
 * server-side reads it. Consequence, recorded not hidden: the record exists only in the visitor's
 * browser. It shows what that browser chose; it is not a server-side proof of consent
 * (docs/DECISIONS.md §49).
 */
(function () {
	var KEY = "jm-consent-v1";
	var VERSION = 1;

	function read() {
		try {
			var v = JSON.parse(window.localStorage.getItem(KEY));
			if (
				v &&
				v.version === VERSION &&
				(v.choice === "accepted" || v.choice === "rejected")
			) {
				return v.choice;
			}
		} catch (e) {}
		return null;
	}

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
	}

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

	function banner() {
		return document.getElementById("consent-banner");
	}

	function show() {
		var b = banner();
		placeAboveCtaBar();
		if (b) b.hidden = false;
	}

	function hide() {
		var b = banner();
		if (b) b.hidden = true;
	}

	// GTM may start in this page without anything stored (storage blocked) and before any Google
	// cookie exists. Remember in memory that this page accepted, so a later Reject still reloads.
	var acceptedThisPage = false;

	function set(choice) {
		if (choice !== "accepted" && choice !== "rejected") return;
		var previous = read();
		write(choice);
		hide();
		if (choice === "accepted") acceptedThisPage = true;
		if (
			choice === "rejected" &&
			(acceptedThisPage ||
				previous === "accepted" ||
				googleCookieNames().length > 0)
		) {
			// GTM may already be running in this page. Clearing cookies and reloading is the only
			// reliable way to stop it.
			clearGoogleCookies();
			window.location.reload();
			return;
		}
		window.dispatchEvent(new CustomEvent("jm-consent", { detail: choice }));
	}

	// The mobile WhatsApp bar is fixed to the bottom (<=640px, z-index 20). Park the banner above
	// it instead of on top of it. Re-measured whenever the banner opens or the window resizes.
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
		var el =
			event.target && event.target.closest
				? event.target.closest("[data-consent],[data-consent-open]")
				: null;
		if (!el) return;
		if (el.hasAttribute("data-consent-open")) {
			event.preventDefault();
			show();
			var first = banner() && banner().querySelector("[data-consent]");
			if (first) first.focus();
			return;
		}
		set(el.getAttribute("data-consent") === "accept" ? "accepted" : "rejected");
	});

	if (read() === null) show();
})();
