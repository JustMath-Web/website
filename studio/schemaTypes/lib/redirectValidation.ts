/**
 * Entry-local rules for `redirect` documents, enforced at publish time in Studio.
 *
 * The build (web/src/lib/content/mergeRedirects.ts) re-checks the same rules as a second boundary,
 * but it can only log a warning an editor never sees. Without these, a trailing space in `from`
 * publishes happily and the redirect silently never exists. web/scripts/assert-merge-redirects.mjs
 * runs the same inputs through both validators so the two cannot drift apart.
 *
 * Rules that need other documents (duplicate `from`, chains) cannot be checked here; the build skips
 * those with a warning.
 *
 * Pure and import-free on purpose: the web test imports this file directly.
 */

/** Cloudflare's per-declaration limit for `_redirects`: one `from to status` line. */
export const MAX_DECLARATION_LENGTH = 1000

// One field is exactly one token in the generated file, so no whitespace or control characters.
const UNSAFE_CHARS = /[\s\u0000-\u001f\u007f]/

/** Longest status token (`301`/`302`) plus the two separating spaces. */
const STATUS_AND_SEPARATORS = 5

export function validateRedirectFrom(value: unknown): true | string {
  if (value === undefined || value === null || value === '') return true // `required()` reports it
  if (typeof value !== 'string') return 'From must be text.'
  if (UNSAFE_CHARS.test(value)) return 'From cannot contain spaces or line breaks.'
  if (!value.startsWith('/') || value.startsWith('//')) return 'From must start with a single /.'
  if (value === '/') return 'From cannot be / — that would redirect the home page.'
  if (/[*:]/.test(value)) return 'From cannot contain * or : (no wildcards).'
  if (/[?#]/.test(value)) {
    return 'From cannot contain ? or #. Cloudflare cannot match a query string or a #fragment in the old address.'
  }
  return true
}

export function validateRedirectTo(value: unknown, from?: unknown): true | string {
  if (value === undefined || value === null || value === '') return true
  if (typeof value !== 'string') return 'To must be text.'
  if (UNSAFE_CHARS.test(value)) return 'To cannot contain spaces or line breaks.'
  const internal = value.startsWith('/') && !value.startsWith('//')
  if (!internal && !value.startsWith('https://')) {
    return 'To must be a path starting with a single / or an https:// URL.'
  }
  if (typeof from === 'string' && from) {
    if (from === value) return 'To is the same as From — that is a loop.'
    if (from.length + value.length + STATUS_AND_SEPARATORS > MAX_DECLARATION_LENGTH) {
      return `From and To together are too long (Cloudflare allows ${MAX_DECLARATION_LENGTH} characters per rule).`
    }
  }
  return true
}
