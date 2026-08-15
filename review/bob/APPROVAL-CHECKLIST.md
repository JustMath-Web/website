# Bob Approval Checklist

## Development Scaffold Re-Review - 2026-08-14

Current stage: Astro + Sanity scaffold review before first vertical slice.

Current verdict: **Approved for the next controlled development step**. This is not launch approval
and not vertical-slice approval.

### P1 Blockers

- [x] P1-DEV-01: production Sanity reads no longer switch to `drafts` merely because
  `SANITY_API_READ_TOKEN` exists. Public client is `published`; preview client is separate and gated.
- [x] P1-DEV-02: shippable green `href="#"` smoke-page control removed; smoke page now uses a
  non-interactive swatch and `rg 'href="#"' web/src` is clean.

### P2 Conditions

- [x] P2-DEV-01: CMS-authored navigation and redirect URL fields now have schema allowlist
  validation.
- [x] P2-DEV-02: broad `unknown` CMS result types were replaced with explicit homepage and Portable
  Text result types. Sanity TypeGen remains deferred and documented.
- [x] P2-DEV-03: GROQ helpers now use explicit projections and avoid dereferencing category refs per
  candidate post in the filter.
- [x] P2-DEV-04: routed document slugs now enforce lowercase-hyphen format and uniqueness.
- [x] P2-DEV-05: Studio package versions are pinned; hosted Studio auto-update remains enabled as an
  accepted, documented operational risk.
- [x] P2-DEV-06: default Astro/Sanity README boilerplate replaced with project-specific setup,
  env, checks, Studio access, and deploy documentation.
- [x] P2-DEV-07: Claude's scaffold-stage FE self-check is recorded in `docs/DECISIONS.md`.

### P3 Cleanup

- [x] P3-DEV-01: token-copy evidence is now byte-for-byte truthful; `diff -rq` is clean and the
  copied token directory is excluded from Prettier.
- [x] P3-DEV-02: stale `docs/DECISIONS.md` Section 4a wording updated. It now says the public client
  uses `published` and only the gated preview client uses `drafts`.

### Verified In This Re-Review

- [x] `diff -rq design/tokens web/src/styles/tokens` passed with no output.
- [x] `rg 'href="#"' web/src` returned no matches.
- [x] `web`: `pnpm build`, `pnpm check`, and `pnpm format:check` passed.
- [x] `studio`: `pnpm typecheck`, `pnpm lint`, and `pnpm format:check` passed.
- [x] `studio`: `pnpm build` passed with network escalation; Sanity emitted the documented
  auto-update/runtime version warning.
- [x] Route/stack match the accepted direction: `02-INFORMATIVE-BLOG.md`, Astro, standalone Sanity,
  no commerce backend.
- [x] `web/reusable/` is absent.
- [x] Prior design-review launch conditions remain open and unchanged.

---

## Prior Design Approval Checklist - 2026-08-14

Date: 2026-08-14

Current stage: blog archive/post design-package re-review before development.

Current verdict: **Approved with conditions for development handoff**. The final blog/header touch-target issue is closed; owner/client launch conditions still carry forward.

## P1 Blockers

- [x] P1-01: restore truthful, visible keyboard focus states for form controls in source and `_ds_bundle.js`.
- [x] P1-02: remove stale `#9c6a17` from the progress-report template and verify AA contrast on the callout heading.

## Approval Conditions

- [ ] P2-01: project owner decides the disabled-note legibility tradeoff.
- [ ] P2-03: client/project owner closes launch inputs: portrait or typographic rebuild, brand-owner sign-off on the adopted operator redraw, richer brand-brief evidence, FAQ count binding, two report strings, optional trust-bar accessible-name wording, "Schedule Now" decision, Mr Kong-reviewed blog content/math, and the narrowed WhatsApp glyph decision.

## Resolved Conditions

- [x] Final blog/header touch-target P2 closed: `STATES.md` now states `>=44x44px`; rendered at 390px and 1200px, header "Blog" is `44 x 44` on landing/archive/post and post breadcrumb "Notes" is `44 x 44`; 0 under-44 focusable targets and no horizontal overflow.
- [x] Route classification accepted: use `02-INFORMATIVE-BLOG.md`, Astro + Sanity, because ongoing editorial publishing is now in scope; `01-LANDING-PAGE.md` is superseded.
- [x] Blog template direction accepted: archive uses ruled rows, category taxonomy uses syllabus levels, post uses long-form prose + KaTeX + `Working`.
- [x] Blog category count type scale fixed: category counts now use `--size-2xs` / 12px; remaining `--size-3xs` uses are gap-chart annotation only.
- [x] Blog/header main target-size fixes checked: header "Schedule Now" is `169.6 x 44`, category filters are 44px high, pagination is 44px high, breadcrumbs are 44px high.
- [x] Landing shell production contract added to `STATES.md`: `lang`, skip link, `<main id="main">`, heading order, section labelling, and anchor behavior for the Astro build.
- [x] Web Development craft standard split accepted: only design-dependent §A semantics were pulled into `STATES.md`; layout, architecture, framework, dependencies, and code quality remain development review.
- [x] Font substitution decision closed: IBM Plex is confirmed; production self-hosting remains a build task, not a design decision.
- [x] WhatsApp brand-guideline check narrowed: word replacement, capitalization, endorsement, and authored verb usages are handled; remaining issue is official white/reversed asset vs dropping the glyph.
- [x] WhatsAppButton source comment closed: it now says the glyph is not the only destination signal and points to `ASSETS.md` §4.
- [x] Predecessor logo verified: old live-site PNG fetches at `350 x 100`; palette confirms the colored operator cluster. This reopens the route/mark decision as a condition.
- [x] Mark direction decided: owner chose Option B; Bob agrees with the choice.
- [x] Landing header render checked at 390px: operator mark aligned with type block, ink color, 0 clipped, 0 sub-24px targets, 0 stuck invisible.
- [x] Main Option B UI/card sync checked: booking source + bundle copy, brand component card, brand guideline lockup card, clearspace card, website README, `ASSETS.md`, and `_ds_manifest.json` now match the operator mark; manifest/card marker drift is 0.
- [x] Residual Option B package sync closed: `BRAND-INTAKE.md` §4, the standalone document-control progress-report template lockup, and root `HANDOFF.md` current status block now match the adopted operator mark.
- [x] Clearspace rewrite accepted as a derived rule: half the mark's height is coherent, subject to the same brand-owner sign-off as the adopted redraw.
- [x] Re-review browser limitation removed: Bob ran local Chrome/CDP checks.
- [x] Accordion package sync closed: `Accordion.d.ts`, `Accordion.prompt.md`, source fallback, and bundle fallback now carry the same accessibility contract.
- [x] Forced fallback browser check closed: 13 FAQ items, 13 fully wired, 12 closed panels, 12 closed panels inert, 0 bad rows with the design-system Accordion removed at render time.
- [x] Checkbox invalid-state wording closed: `STATES.md` now says box-shadow/ring rather than outline.

## Bob Review Decisions

- [x] `tavis.live` row stands; Bob found enough evidence to keep it as the fifth scan site.
- [x] CS-03 is accepted as a recorded route exception, not a pass. No directions stage is required for this package review unless the owner reopens direction selection.
- [x] CS-16 owner override accepted.
- [x] CS-71 ledger check passes for review timing; append the package row only after approval.

## Re-Review Checks Completed

- [x] `node --check design/_ds_bundle.js`.
- [x] Manifest-vs-CSS token diff: 125 CSS vars, 125 manifest tokens, 0 diffs, 0 duplicates.
- [x] Stale/failing value grep: no shipping `#9c6a17`; no shipping `outline:none` focus suppression.
- [x] Bundle-driven forms card: 7/7 controls show the 2px slate focus outline and match `:focus-visible`.
- [x] Website FAQ: 13/13 accordion items have trigger/panel relationships, region labelling, and inert closed panels in the rendered path.
- [x] Website FAQ fallback: 13/13 accordion items have trigger/panel relationships, region labelling, and inert closed panels when forced onto `PlainAccordion`.
- [x] Website at 390, 768, and 1440: 0 clipped elements, 0 sub-24px targets, 0 stuck-invisible reveal elements after transition settle.
- [x] Option B rendered card pass: brand component card, booking kit, reports UI kit, lockup card, and clearspace card render the operator mark/lockup with no stale equals copy.
- [x] Document-control report template render: operator SVG renders at `45.09 x 45.09`, no old uppercase/rule lockup, no stale equals copy, `.lockup-fill` resolves in template context.
- [x] Blog archive/post browser pass: archive and post at 390/768/1440 have 1 `h1`, 1 `main#main`, no browser-level sub-24px targets, no contrast failures, and no page-level horizontal overflow; post has 13 KaTeX formulas and no `[object Object]`.
- [x] Blog cards registered: manifest/card marker diff is 32 cards, 0 drift.
- [x] 2026-08-14 final blog re-check: landing/archive/post at 390 and 1200 have `scrollWidth === clientWidth`, 0 non-KaTeX clipped elements, 0 under-44 focusable targets, and post has 13 formulas with no formula-container overflow.
