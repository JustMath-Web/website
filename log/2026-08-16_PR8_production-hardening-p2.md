# PR #8 — fix: Organization JSON-LD, security headers, executable redirects

Date: 2026-08-16
PR: https://github.com/JustMath-Web/website/pull/8
Branch: `fix/production-hardening-p2`
Merge commit: `ada87f0`

## What Shipped

- **VS-07**: sitewide `Organization` JSON-LD added to `BaseLayout.astro`'s `<head>`. Only fields with
  real data (`name`, `url`, `telephone`) — no invented `logo`/`sameAs`. `BaseLayout` now takes
  `siteSettings` as a required prop instead of fetching it again itself, avoiding a duplicate Sanity
  read per page.
- **VS-08 + VS-11**: new `web/vercel.json` — security headers (`X-Content-Type-Options`,
  `Referrer-Policy`, `X-Frame-Options`, and a CSP checked against the actual built `dist/` output,
  not assumed) plus 3 of the 6 documented redirects. The other 3 target blog routes that don't exist
  yet, deliberately deferred rather than shipped as redirects-to-a-404.
- Checked Astro's routing docs, the `@astrojs/vercel` adapter docs, and Vercel's `vercel.json`
  reference directly before implementing, per guideline Section 2 rule 4.
- Rebased onto PR #7 after it merged first — `docs/DECISIONS.md`/`HANDOFF.md` tail-append conflict
  resolved, renumbering the production-hardening section to §22.

## Root Cause

N/A — new capability (JSON-LD, security headers, redirects), not a bug fix.

## Review Notes (Bob)

Fixes VS-07, VS-08, VS-11 from Bob's 2026-08-15 review (`review/bob/CODE-REVIEW.md`). Not
independently re-reviewed by Bob before merge — Charlie reviewed and merged directly.

## Deferred

- The 3 blog-route redirects, deferred to when blog routes ship (same trigger as VS-15).
- The CSP's Google Fonts allowance (`style-src`/`font-src`) is temporary — tracked to shrink once
  VS-10 (font self-hosting) lands.
- Header/redirect *behavior* itself is unverified pre-deploy — no Vercel project is linked to this
  repo yet.
