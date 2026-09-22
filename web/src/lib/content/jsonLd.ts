/**
 * All three `application/ld+json` blocks (BaseLayout's Organization, the blog post's BlogPosting,
 * the home page's FAQPage) embed Sanity-authored text via `JSON.stringify` with `set:html`. Plain
 * `JSON.stringify` never escapes `<`, so a field containing the literal text `</script>` would close
 * the script tag early and let the rest of its value render as raw HTML. Escaping every `<` to its
 * Unicode form is invisible to `JSON.parse` (which unescapes `<` back to `<`) but can never be
 * read as a tag by the HTML parser — the standard fix for JSON-in-`<script>` embedding, not specific
 * to this project. Bob review, PR #86.
 */
export function toSafeJsonLdString(value: unknown): string {
	return JSON.stringify(value).replace(/</g, "\\u003c");
}
