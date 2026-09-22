/**
 * Slide animation for the FAQ accordion (<details name="faq"> in src/pages/index.astro).
 *
 * Served as a static, same-origin file for the same reason as public/analytics.js: the site's CSP
 * is `script-src 'self'` with no `'unsafe-inline'`, and Astro inlines a bundled <script> this small
 * directly into the page instead of emitting a separate file, which the CSP would then block.
 *
 * Native <details name="faq"> already gives correct behaviour with no JS at all (instant open/close,
 * one item open at a time — see VS-06). This file only layers a slide animation on top when it
 * loads; if it fails to load or run, the click listener below never attaches and the native
 * behaviour is untouched.
 */
(function () {
	var items = document.querySelectorAll("#faq .faq-list details");
	if (!items.length) return;

	var running = new WeakMap();

	function durationMs() {
		var raw = getComputedStyle(document.documentElement)
			.getPropertyValue("--dur-3")
			.trim();
		var parsed = Number.parseFloat(raw);
		// Also zeroed under prefers-reduced-motion (see styles/tokens/motion.css) — reusing that
		// token means this doesn't need its own reduced-motion media query.
		return Number.isNaN(parsed) ? 0 : parsed;
	}

	function cleanup(details) {
		details.style.height = "";
		details.classList.remove("is-collapsing");
		running.delete(details);
	}

	function slide(details, opening) {
		var prior = running.get(details);
		if (prior) prior.cancel();

		var summary = details.querySelector("summary");
		if (!summary) return;
		var collapsedHeight = summary.offsetHeight;
		var duration = durationMs();

		if (opening) {
			details.open = true;
			var fullHeight = details.scrollHeight;
			if (duration === 0) return;
			var openAnim = details.animate(
				{ height: [collapsedHeight + "px", fullHeight + "px"] },
				{ duration: duration, easing: "cubic-bezier(.2,.6,.3,1)" },
			);
			running.set(details, openAnim);
			openAnim.onfinish = function () {
				cleanup(details);
			};
			openAnim.oncancel = function () {
				cleanup(details);
			};
		} else {
			var startHeight = details.scrollHeight;
			if (duration === 0) {
				details.open = false;
				return;
			}
			// Flips the icon back to "+" right now, in sync with the click — [open] itself stays
			// on until the animation below finishes, so the panel remains visible/measurable
			// throughout the collapse (see the matching CSS override next to .is-collapsing).
			details.classList.add("is-collapsing");
			var closeAnim = details.animate(
				{ height: [startHeight + "px", collapsedHeight + "px"] },
				{ duration: duration, easing: "cubic-bezier(.2,.6,.3,1)" },
			);
			running.set(details, closeAnim);
			closeAnim.onfinish = function () {
				details.open = false;
				cleanup(details);
			};
			closeAnim.oncancel = function () {
				cleanup(details);
			};
		}
	}

	items.forEach(function (details) {
		var summary = details.querySelector("summary");
		if (!summary) return;
		summary.addEventListener("click", function (event) {
			event.preventDefault();
			var opening = !details.open;
			if (opening) {
				items.forEach(function (other) {
					if (other !== details && other.open) slide(other, false);
				});
			}
			slide(details, opening);
		});
	});
})();
