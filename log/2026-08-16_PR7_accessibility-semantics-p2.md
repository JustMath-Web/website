# PR #7 — fix: FAQ accordion on native details/summary; tap targets for header brand + skip link

Date: 2026-08-16
PR: https://github.com/JustMath-Web/website/pull/7
Branch: `fix/accessibility-semantics-p2`
Merge commit: `7ded498`

## What Shipped

- **VS-06 + VS-16**: FAQ accordion rebuilt on native `<details name="faq">`/`<summary>`, replacing a
  `<button>` + `<div role="region">` pair driven entirely by a client `<script>`. The `name="faq"`
  attribute gives exclusive single-open-at-a-time behavior natively, so the old `<script>` block was
  deleted entirely, not shrunk.
- **VS-13**: header brand/logo link now meets the 44×44 tap-target minimum (was 114×40.3).
- **VS-14**: skip link now meets 44×44 when focused (was 120×42.4).
- Playwright suite updated for the new `<details>` markup, extended with tap-target tests for
  VS-13/VS-14 and a dedicated JavaScript-disabled test proving VS-06's actual claim (an FAQ answer
  becomes visible on click with `browser.newContext({ javaScriptEnabled: false })`). 22/22 tests.
- Follow-up commit, same PR: FAQ icon animation tweak per Charlie's request — both bars now spin on
  toggle (horizontal bar 180°, vertical bar 270°) instead of only the vertical bar at 90°. End states
  unchanged; only the transition motion changed. Verified via computed `transform` matrices, not
  assumed from the CSS source.

## Root Cause

- VS-06/VS-16: the FAQ accordion was hand-built with a scripted show/hide before the vertical slice
  had a chance to reach for the platform-native `<details>`/`<summary>` element, which does the same
  job without JavaScript.
- VS-13/VS-14: both links were added/existed before the design-phase touch-target hardening pass that
  fixed the header "Blog" link and post breadcrumb, so neither went through that check.

## Review Notes (Bob)

Fixes VS-06, VS-13, VS-14, VS-16 from Bob's 2026-08-15 review (`review/bob/CODE-REVIEW.md`). Not
independently re-reviewed by Bob before merge — Charlie reviewed and merged directly per the
established triage-PR workflow.

## Deferred

The icon-animation tweak was scoped to motion only, not markup/selectors — re-ran the full Playwright
suite to confirm nothing else regressed. Remaining P2s/P3s (VS-07 through VS-12, VS-15, VS-17) are
separate PRs/queued items, not part of this one.
