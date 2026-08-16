# PR #4 — docs: backfill merge log for PR #1-#3

Date: 2026-08-16
PR: https://github.com/JustMath-Web/website/pull/4
Branch: `docs/merge-log-backfill`
Merge commit: `8aee249`

## What Shipped

Created `log/` at the repo root and added the three entries `02-INFORMATIVE-BLOG.md` Section 7
(v1.1.1) newly requires, backdated to each PR's actual merge date: `log/2026-08-15_PR1_...md`,
`log/2026-08-15_PR2_...md`, `log/2026-08-15_PR3_...md`. Docs only, no application code changed.

## Root Cause

N/A — not a bug fix. The merge-log requirement postdates PR #1 through #3, so this is a one-time
backfill to bring the repo into compliance, not a response to a defect.

## Review Notes (Bob)

No separate Bob review pass ran against this PR (docs-only, no application code). Bob did recommend
the merge order for this PR and PR #5 (#4 first, since it establishes the log baseline; #5 second,
since it carries the actual fixes) and flagged that PR #4 and #5 would themselves need log entries
written only after their own merges were confirmed — see PR #5's entry below and this file's sibling.

## Deferred

Nothing — this PR was itself a deferred item (the backfill) closed out in full. The two follow-up
fixes it referenced ahead of time are PR #5.
