# PR #17 — fix: self-host IBM Plex fonts, tighten CSP (VS-10)

Date: 2026-08-17
PR: https://github.com/JustMath-Web/website/pull/17
Branch: `fix/font-self-hosting-vs10`
Merge commit: `e1bb277`

## What Shipped

- **VS-10**: IBM Plex Serif/Sans/Mono self-hosted via `@fontsource` (OFL-1.1, license confirmed
  directly from each package's `package.json`/`LICENSE`, not assumed), replacing the Google Fonts
  `@import url(...)` in `web/src/styles/tokens/fonts.css`. Only the latin-only subset files are
  imported (`en-MY`, Latin script only) at the exact weights/styles the old import requested — 14
  `@font-face` rules total, confirmed in the built `dist/` output (14 local `.woff2` files, zero
  `googleapis`/`gstatic` references).
- CSP in `web/vercel.json` tightened accordingly: removed `https://fonts.googleapis.com` from
  `style-src` and `https://fonts.gstatic.com` from `font-src`, since no external font host is
  contacted anymore.
- Caught (by the suite itself, not deliberately introduced) and fixed a pre-existing timing race in
  the VS-14 skip-link tap-target Playwright test — it measured `.boundingBox()` immediately after the
  `Tab` press, before `.skip-link`'s own CSS transform transition settled, occasionally reporting a
  sub-pixel-short height. Fixed by awaiting `transitionend` before measuring, not by loosening the
  `>= 44` threshold.
- **Follow-up commit, same PR:** Bob's review caught the three new `@fontsource` dependencies
  installed with caret ranges (`pnpm add`'s default), inconsistent with this repo's exact-pinning
  discipline (`docs/DECISIONS.md` §4d). Re-pinned to exact `5.3.0` in `package.json`, refreshed
  `pnpm-lock.yaml` to match — resolved versions/integrity hashes unchanged.

Batch 4 of 4 of Charlie's P2/P3 triage split — the last item from Bob's 2026-08-15 review's original
queue (excluding VS-15/VS-17, which stay deliberately queued until blog routes/more templates exist).

## Root Cause

N/A — new capability (self-hosting, CSP tightening), not a bug fix. The skip-link test fix addresses
a latent test-timing race exposed by the change in font-load timing, not a product bug.

## Review Notes (Bob)

Fixes VS-10 from Bob's 2026-08-15 review (`review/bob/CODE-REVIEW.md`). Bob reviewed both the initial
PR and the follow-up exact-pinning fix; second pass found no remaining gaps and confirmed the PR
ready to merge. Charlie merged directly.

## Deferred

- Real-device font-load performance/FOUT behavior and whether Vercel actually serves the new
  headers/CSP correctly are not independently verifiable in this environment — no Vercel project is
  linked yet (same caveat as PR #8).
- Remaining queue: VS-15 (sitemap/RSS/robots) and VS-17 (`index.astro` extraction) stay queued —
  blocked on blog routes / more templates existing, not started here.
- Six open Dependabot PRs (#10, #12–#16, `studio/` version bumps + one GitHub Actions bump) are
  unrelated to this PR and were not touched — flagged separately for a future triage pass. #12
  (`sanity`/`@sanity/vision`) has a failing `studio` CI check as of this entry; #15 is a TypeScript
  major version bump (5.9.3 → 6.0.3) that warrants review before merging, not a routine patch bump.
