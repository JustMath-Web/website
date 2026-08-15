# PR #2 — fix: resolve vertical-slice P1 findings from Bob's review

Date: 2026-08-15
PR: https://github.com/JustMath-Web/website/pull/2
Branch: `fix/vertical-slice-p1-findings`
Merge commit: `c118643`

## What Shipped

- **VS-01**: `GapChart.astro` now takes a real `annotations` prop and consumes
  `homePage.problem.gapChartAnnotations`, matching each annotation by its `year` stop code
  (`stops.indexOf(annotation.year)`) rather than array position. Added five new typed Sanity fields
  (`problem.independentChecksCount`, `about.yearsExperience`, `about.studentsPerYear`,
  `pricing.availabilityTimeBlocks`, `finalCta.freeMinutes`), wired end-to-end: schema → GROQ query →
  types → local fallback data → seed script → render — replacing hardcoded literals in
  `index.astro`.
- **VS-02 / VS-03**: "Blog notes" level links and footer nav links now meet the 44×44 tap-target
  minimum, using the same `--control-h` + negative-margin technique already verified for the header
  "Blog" link and post breadcrumb.
- **VS-05** (P2, rolled in — shared both files touched for VS-02/VS-03): header and footer
  navigation link groups now render as `<ul>/<li>` (FE-04).
- **VS-04**: added a 19-test Playwright suite (`web/tests/e2e/landing.spec.ts`) covering overflow at
  four widths, landmark structure, the VS-02/VS-03 tap-target fixes specifically, keyboard tab order
  and focus visibility, and the FAQ accordion — wired into the `web` CI job. Added
  `web/scripts/serve-dist.mjs`, a small zero-dependency static file server, since `astro preview`
  daemonizes (returns immediately, leaving a detached child serving) and can't be tracked by
  Playwright's `webServer`.

## Root Cause

- **VS-01**: the CMS field, GROQ projection, and TypeScript type for `gapChartAnnotations` already
  existed, but `<GapChart />` was left called with zero props when the component was built — the
  wiring step was simply never done. Several other on-page figures were hand-typed literals
  duplicating facts already present in editable prose fields, so an editor's change to that prose
  wouldn't be reflected in the adjacent large-type figure.
- **VS-02 / VS-03**: both links were added after the design-phase touch-target hardening pass that
  fixed the header "Blog" link and post breadcrumb, so neither went through that check.
- **VS-04**: `@playwright/test` was pinned in the version baseline at scaffold time but never
  actually installed or wired — deferred at scaffold time and not picked back up until this pass.

## Review Notes (Bob)

Bob's 2026-08-15 review (`review/bob/CODE-REVIEW.md`) raised VS-01 through VS-04 as P1 blockers and
VS-05 as P2. All five addressed in this PR. One regression surfaced during the fix itself — not by
Bob, but caught by the new Playwright suite before this PR was opened: wrapping nav links in
`<ul>/<li>` for VS-05 broke the VS-03 footer fix's width (`inline-flex` shrank to content width once
the `<a>` was nested one level deeper than the grid that used to stretch it); fixed with
`display: flex`.

## Deferred

The other 8 P2s and 4 P3s from Bob's 2026-08-15 review (VS-06 through VS-17) intentionally left open
per Charlie's explicit tight-scope instruction — normal triage, not part of this PR.
