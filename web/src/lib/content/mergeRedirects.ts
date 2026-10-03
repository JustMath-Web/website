/**
 * Merge editor-managed Sanity `redirect` documents into the repo's `public/_redirects` file.
 *
 * Why this exists: the Sanity schema, GROQ query and `Redirect` type existed but nothing consumed
 * them, so a redirect saved in Studio never reached the live site. This runs at build time
 * (see the integration in astro.config.mjs) and appends valid Sanity rules after the static ones.
 *
 * The output is a file Cloudflare parses line by line, and the input is editor-typed text, so
 * validation here is a security boundary: a newline or space in a field must never become a second
 * rule. Invalid entries are skipped and reported, never thrown — one bad document must not take the
 * whole site's build down.
 *
 * Pure (no I/O, no env) so CI can assert it without spawning a build.
 */

export interface MergeResult {
	/** The full `_redirects` file content. */
	content: string;
	/** `from` values that were written. */
	applied: string[];
	/** Entries that were left out, with the reason an editor can act on. */
	skipped: { from: string; reason: string }[];
}

interface Candidate {
	from: string;
	to: string;
	status: 301 | 302;
}

/** Cloudflare's per-declaration limit: one `from to status` line. */
const MAX_DECLARATION_LENGTH = 1000;
/** Two separating spaces plus the three-digit status. */
const STATUS_AND_SEPARATORS = 5;

const MARKER =
	"# --- Redirects from Sanity (generated at build; do not edit) ---";

// No whitespace or control characters anywhere: one field is exactly one token in the file.
const UNSAFE_CHARS = /[\s\u0000-\u001f\u007f]/;

function staticSources(staticFile: string): Set<string> {
	const sources = new Set<string>();
	for (const raw of staticFile.split("\n")) {
		const line = raw.trim();
		if (!line || line.startsWith("#")) continue;
		sources.add(line.split(/\s+/)[0]);
	}
	return sources;
}

/**
 * Cloudflare 307-redirects a page path without a trailing slash (`/blog` → `/blog/`), so a target
 * like that costs a second hop. The part before any `?`/`#` must end in `/` or be a file. Mirrors
 * studio/schemaTypes/lib/redirectValidation.ts; assert-merge-redirects.mjs keeps them in step.
 */
function pathIsSettled(target: string): boolean {
	const path = target.split(/[?#]/)[0];
	return (
		path.endsWith("/") ||
		/\.[A-Za-z0-9]+$/.test(path.slice(path.lastIndexOf("/") + 1))
	);
}

function validate(entry: unknown): Candidate | string {
	if (typeof entry !== "object" || entry === null)
		return "not a redirect object";
	const { from, to, permanent } = entry as Record<string, unknown>;
	if (typeof from !== "string" || typeof to !== "string") {
		return "from and to must both be text";
	}
	if (UNSAFE_CHARS.test(from) || UNSAFE_CHARS.test(to)) {
		return "contains a space or line break";
	}
	if (!from.startsWith("/") || from.startsWith("//")) {
		return "From must start with a single /";
	}
	if (from === "/") return "From cannot be / (it would redirect the home page)";
	// `*` and `:name` are Cloudflare splat/placeholder syntax; editors mean literal paths.
	if (/[*:]/.test(from)) return "From cannot contain * or : (no wildcards)";
	// Cloudflare does not match a query string in the source and never evaluates a source fragment,
	// so the rule would be written and then never fire.
	if (/[?#]/.test(from))
		return "From cannot contain ? or # (Cloudflare cannot match them)";
	const internal = to.startsWith("/") && !to.startsWith("//");
	if (!internal && !to.startsWith("https://")) {
		return "To must be a path starting with / or an https:// URL";
	}
	if (from === to) return "redirects to itself (loop)";
	if (
		from.length + to.length + STATUS_AND_SEPARATORS >
		MAX_DECLARATION_LENGTH
	) {
		return `rule is longer than Cloudflare's ${MAX_DECLARATION_LENGTH}-character limit`;
	}
	if (internal && !pathIsSettled(to)) {
		return "To must end with a / (for example /blog/), unless it is a file such as /logo.png — otherwise Cloudflare adds a second redirect";
	}
	return { from, to, status: permanent === false ? 302 : 301 };
}

export function mergeRedirects(
	staticFile: string,
	sanityRedirects: readonly unknown[],
): MergeResult {
	const skipped: MergeResult["skipped"] = [];
	const label = (entry: unknown) =>
		typeof entry === "object" &&
		entry !== null &&
		typeof (entry as { from?: unknown }).from === "string"
			? (entry as { from: string }).from
			: "(unreadable entry)";

	const taken = staticSources(staticFile);
	const candidates: Candidate[] = [];

	// Sort so duplicates resolve the same way regardless of the order Sanity returns documents in.
	const valid: Candidate[] = [];
	for (const entry of sanityRedirects) {
		const result = validate(entry);
		if (typeof result === "string")
			skipped.push({ from: label(entry), reason: result });
		else valid.push(result);
	}
	// Status is the last tie-break so two documents differing only in `permanent` still resolve the
	// same way every build: 301 sorts first and wins.
	valid.sort(
		(a, b) =>
			a.from.localeCompare(b.from) ||
			a.to.localeCompare(b.to) ||
			a.status - b.status,
	);

	for (const c of valid) {
		if (taken.has(c.from)) {
			skipped.push({
				from: c.from,
				reason: "a rule for this path already exists",
			});
			continue;
		}
		taken.add(c.from);
		candidates.push(c);
	}

	// One-hop rule: a target that is itself redirected would send visitors through two redirects.
	const final = candidates.filter((c) => {
		if (taken.has(c.to)) {
			skipped.push({
				from: c.from,
				reason: `chain: ${c.to} is redirected too — point to its final target`,
			});
			return false;
		}
		return true;
	});

	if (final.length === 0) {
		return { content: staticFile, applied: [], skipped };
	}

	const body = final.map((c) => `${c.from} ${c.to} ${c.status}`).join("\n");
	const content = `${staticFile.replace(/\s+$/, "")}\n\n${MARKER}\n${body}\n`;
	return { content, applied: final.map((c) => c.from), skipped };
}
