/**
 * Enhancements for the blog post table of contents (src/components/blog/TableOfContents.astro).
 *
 * Served as a static, same-origin file for the same reason as public/faq-accordion.js: the CSP is
 * `script-src 'self'` with no `'unsafe-inline'`, and Astro inlines a small bundled <script> into the
 * page, which the CSP would block.
 *
 * The TOC already works with no JS (plain anchors, :hover/:focus-within rail, native popover sheet).
 * This file only adds:
 *   - the current-section highlight (`aria-current="location"` on the matching links),
 *   - the markers that slide to the current section,
 *   - the reading-progress ring on the mobile pill (`--toc-progress`, 0–1),
 *   - closing the mobile sheet after a link is tapped,
 *   - Escape closing the desktop panel (WCAG 1.4.13: it covers text below ~1366px) until focus
 *     moves or the pointer leaves the rail. Moving focus to another link shows it again, so a
 *     keyboard user never tabs through invisible links (WCAG 2.4.7).
 * Marker motion uses the --dur-* tokens, which styles/tokens/motion.css zeroes under
 * prefers-reduced-motion, so this file needs no reduced-motion check of its own.
 */
(function () {
	var root = document.querySelector("[data-toc]");
	if (!root) return;

	var targets = Array.prototype.slice.call(
		root.querySelectorAll("[data-toc-target]"),
	);
	var ids = [];
	targets.forEach(function (el) {
		var id = el.getAttribute("data-toc-target");
		if (ids.indexOf(id) === -1) ids.push(id);
	});
	var headings = ids
		.map(function (id) {
			return document.getElementById(id);
		})
		.filter(Boolean);
	if (!headings.length) return;

	var markers = Array.prototype.slice.call(
		root.querySelectorAll("[data-toc-marker]"),
	);
	var sheet = root.querySelector(".toc-sheet");
	var prose = document.querySelector(".prose");
	var header = document.querySelector(".site-header");
	var activeId = null;
	var queued = false;

	function headerOffset() {
		return (header ? header.getBoundingClientRect().height : 0) + 24;
	}

	/** The last heading whose top has scrolled past the header, or null above the first one. */
	function currentId() {
		var line = headerOffset() + 1;
		var found = null;
		for (var i = 0; i < headings.length; i += 1) {
			if (headings[i].getBoundingClientRect().top <= line)
				found = headings[i].id;
			else break;
		}
		// At the very bottom a short last section can never reach the line — count it as read.
		var atEnd =
			window.innerHeight + window.scrollY >=
			document.documentElement.scrollHeight - 2;
		if (atEnd) found = headings[headings.length - 1].id;
		return found;
	}

	/** Moves each marker onto the element in its own container that matches the current section. */
	function placeMarkers() {
		markers.forEach(function (marker) {
			var box = marker.parentElement;
			var match =
				activeId &&
				box.querySelector('[data-toc-target="' + CSS.escape(activeId) + '"]');
			if (!match || !match.offsetHeight) {
				marker.classList.remove("is-placed");
				return;
			}
			var top =
				match.getBoundingClientRect().top - box.getBoundingClientRect().top;
			// The rail marker is a fixed-size dot centred on its 2px line; the list highlight
			// takes the full height of its link.
			if (marker.classList.contains("toc-marker--line")) {
				top += match.offsetHeight / 2 - (marker.offsetHeight || 6) / 2;
			} else {
				marker.style.height = match.offsetHeight + "px";
			}
			marker.style.transform = "translateY(" + top + "px)";
			marker.classList.add("is-placed");
		});
	}

	function setProgress() {
		if (!prose) return;
		var rect = prose.getBoundingClientRect();
		var travel = rect.height - window.innerHeight + headerOffset();
		var progress = travel <= 0 ? 1 : (headerOffset() - rect.top) / travel;
		progress = Math.min(1, Math.max(0, progress));
		root.style.setProperty("--toc-progress", progress.toFixed(3));
	}

	function update() {
		queued = false;
		var next = currentId();
		if (next !== activeId) {
			activeId = next;
			targets.forEach(function (el) {
				var on = el.getAttribute("data-toc-target") === activeId;
				if (el.tagName === "A") {
					if (on) el.setAttribute("aria-current", "location");
					else el.removeAttribute("aria-current");
				} else {
					el.classList.toggle("is-active", on);
				}
			});
		}
		placeMarkers();
		setProgress();
	}

	function queue() {
		if (queued) return;
		queued = true;
		window.requestAnimationFrame(update);
	}

	var rail = root.querySelector(".toc-rail");
	if (rail) {
		document.addEventListener("keydown", function (event) {
			if (event.key !== "Escape") return;
			if (rail.matches(":hover") || rail.contains(document.activeElement)) {
				rail.classList.add("is-dismissed");
			}
		});
		rail.addEventListener("mouseleave", function () {
			if (!rail.contains(document.activeElement)) {
				rail.classList.remove("is-dismissed");
			}
		});
		// Any focus move ends the dismissal: into another link here (so focus stays visible), or out
		// of the rail. Escape itself moves no focus, so this never undoes the key press.
		rail.addEventListener("focusin", function () {
			rail.classList.remove("is-dismissed");
		});
		// relatedTarget is where focus is going, known synchronously — no timer, so focus that leaves
		// and comes straight back can never leave the panel stuck dismissed.
		rail.addEventListener("focusout", function (event) {
			var leaving = !event.relatedTarget || !rail.contains(event.relatedTarget);
			if (leaving && !rail.matches(":hover")) {
				rail.classList.remove("is-dismissed");
			}
		});
	}

	window.addEventListener("scroll", queue, { passive: true });
	window.addEventListener("resize", queue);
	// The sheet is display:none while closed, so its marker can only be measured once it opens.
	if (sheet) {
		sheet.addEventListener("toggle", queue);
		sheet.addEventListener("click", function (event) {
			var link = event.target.closest("a[data-toc-target]");
			if (link && typeof sheet.hidePopover === "function") sheet.hidePopover();
		});
	}
	update();
})();
