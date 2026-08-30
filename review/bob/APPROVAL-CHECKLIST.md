# Bob Approval Checklist

## Cloudflare Pages Migration Review - 2026-08-30

Scoped review of the current uncommitted migration diff. Scoped verdict: **Approved with
conditions**.

- [x] `@astrojs/vercel` removed from `web/astro.config.mjs` and `web/package.json`; no SSR adapter
  replacement added.
- [x] `DEPLOY_ENV` now gates production behavior in `web/src/lib/content/blogData.ts`,
  `web/src/env.d.ts`, `web/scripts/assert-production-fails-without-sanity.mjs`,
  `.github/workflows/ci.yml`, `web/playwright.config.ts`, `web/.env.example`, and the updated
  documentation.
- [x] `web/vercel.json` was replaced by `web/public/_headers` and `web/public/_redirects`.
- [x] `web/pnpm-lock.yaml` was resynchronized and `pnpm install --frozen-lockfile` stays clean.
- [x] `pnpm format:check`, `pnpm check`, `pnpm build`, `pnpm test:blog-production-guardrail`, and
  `pnpm test:blog-null-post-filter` all pass.
- [x] `pnpm test:e2e` is recorded as a fresh 39/39 rerun against the exact current tree in
  `docs/DECISIONS.md` §32.

### Conditions Still Open

- [ ] Cloudflare Pages project does not exist yet.
- [ ] Production env vars still need to be set in the Pages dashboard (`DEPLOY_ENV=production` plus
  the Sanity vars).
- [ ] Sanity publish webhook still needs to be repointed to a Cloudflare Pages deploy hook.
- [ ] Cloudflare Pages commercial/free-plan terms still need confirmation.

## Vertical Slice Re-Review (P1/P2 Fix Commit) — 2026-08-16

Scoped re-review of fix commit `05ab713` (`HEAD c1186435c7b96b0905f4988f2ca5c497540f9409`), which
claims to resolve VS-01 through VS-05 from the 2026-08-15 review below. This is **not** full
vertical-slice approval — VS-06 through VS-17 remain open, unaffected, and not re-checked here.

Scoped verdict: **Approved with conditions.** All five targeted findings are genuinely resolved; two
new minor (non-blocking) issues were found during verification.

### VS-01 through VS-05 — Re-Checked

- [x] VS-01: `GapChart.astro` now takes an `annotations` prop, consumes
  `homePage.problem.gapChartAnnotations`, and matches by `year` code (not array position). All five
  new CMS fields Bob asked for (`problem.independentChecksCount`, `about.yearsExperience`,
  `about.studentsPerYear`, `pricing.availabilityTimeBlocks`, `finalCta.freeMinutes`) are wired
  schema → GROQ query → types → local fallback → seed script → component render, verified layer by
  layer, not spot-checked. `pnpm seed:dry-run` reproduces the same 6/1/3 counts DECISIONS.md §19
  claims. Confirmed live in browser: chart renders CMS/fallback data, not hardcoded values.
- [x] VS-02: "Blog notes" level links measured **67.6 × 44px** at 390/560/768/1440px (was 67.6 ×
  16.8px). No overlap with adjacent row content, no new horizontal overflow at any width.
- [x] VS-03: Footer links measured **44px tall at every width**, width equal to their column's full
  available width at every width tested (350/512/180/244px across 390/560/768/1440px) — confirmed the
  `inline-flex`-shrink regression DECISIONS.md §19 describes (caught by the implementer's own new
  Playwright test, not by this review) is genuinely fixed, not still present.
- [x] VS-04: `web/tests/e2e/landing.spec.ts` (19 tests) read in full and confirmed to cover overflow
  (4 widths), landmarks, the VS-02/VS-03 tap-target regressions by name, keyboard tab order + focus
  visibility (skip link), and FAQ accordion interaction (click + keyboard). Ran independently:
  `pnpm exec playwright install --with-deps chromium` + `pnpm test:e2e` → **19/19 pass**. CI step is
  real (not commented out) in `.github/workflows/ci.yml`'s `web` job. `gh run view 31894636124` for
  the exact `HEAD` commit confirms `conclusion: success`, `headSha` matches.
- [x] VS-05: `SiteHeader.astro` and `SiteFooter.astro` both now wrap their nav links in real
  `<ul>/<li>`, confirmed live (1 `<li>` header, 5 `<li>` footer). `aria-label`s on both `<nav>`
  elements unchanged. No duplicate/missing links, keyboard order unaffected.

### New Issues Found This Pass (non-blocking)

- [ ] `web/.prettierignore` should add `test-results/` and `playwright-report/` to match the
  `.gitignore` entries this commit already added — otherwise a local `pnpm test:e2e` run leaves
  `test-results/.last-run.json` behind and the next `pnpm format:check` spuriously fails until it's
  manually deleted. Does not affect CI (format:check runs before test:e2e in `ci.yml`).
- [ ] `studio/schemaTypes/documents/homePage.ts`'s `gapChartAnnotations[].year` sub-field has no
  validation restricting it to the 11 valid stop codes (`S1`-`S6`, `F1`-`F5`) — pre-existing gap, but
  now consequential since this fix commit activates the field: a Studio typo there silently drops a
  chart annotation with no error anywhere.

### Not Re-Checked (unaffected, still open from 2026-08-15)

- [ ] VS-06 through VS-13 (P2s), VS-14 through VS-17 (P3s) — see the 2026-08-15 section below.

---

## Vertical Slice Review — 2026-08-15

Current stage: first vertical slice (landing page renders from the real component tree and local
fallback content; no blog routes yet), reviewed at commit
`770965218abcbc048c1261c9ca0ad3f4b6bb832c`.

Current verdict: **Revision required.** This is not launch approval and not a blog-routes approval.

### P1 Blockers

- [ ] VS-01: `GapChart.astro` must consume `homePage.problem.gapChartAnnotations` instead of
  hardcoding its own values (or the field must be formally removed and the decision recorded); the
  other hardcoded editorial figures (`24`, `2`, `20`, `30`, the availability time blocks) need either
  real fields or a recorded hand-sync decision.
- [ ] VS-02: "Blog notes" level-to-category links (67.6 × 16.8px) must reach ≥44×44.
- [ ] VS-03: Footer navigation links (~350 × 18.2px) must reach ≥44×44.
- [ ] VS-04: A Playwright test suite must exist, be wired into `web`'s CI job, and be green — not
  substituted by an ad hoc reviewer pass.

### P2 Conditions

- [ ] VS-05: Header and footer `<nav>` link groups must be marked up as `<ul>`/`<li>`.
- [ ] VS-06: FAQ answers 2–13 must remain reachable with JavaScript disabled (native
  `<details>`/`<summary>` recommended, or the JS dependency recorded as a deliberate tradeoff).
- [ ] VS-07: `Organization` (or a more specific type) JSON-LD must be added sitewide.
- [ ] VS-08: Security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`/CSP)
  must be configured via `vercel.json` or middleware.
- [ ] VS-09: Automated dependency/advisory scanning must run in CI or via Dependabot.
- [ ] VS-10: Fonts must be self-hosted, replacing the Google Fonts `@import` (previously flagged,
  still open).
- [ ] VS-11: The six documented old-site redirects must be implemented as executable config, not
  only documentation (previously flagged, still open — three of six targets now exist on the real
  page, so nothing blocks doing this).
- [ ] VS-12: A vertical-slice-stage FE self-check must be recorded in `docs/DECISIONS.md` (repeat of
  a gap the scaffold review already caught once as P2-DEV-07).
- [ ] VS-13: Header brand/logo link (114 × 40.3px) should reach ≥44×44 for consistency with the rest
  of the header.

### P3 Cleanup

- [ ] VS-14: Skip link (120 × 42.4px) is 1.6px short of the house 44×44 rule — optional polish.
- [ ] VS-15: Sitemap/robots.txt/RSS still not wired — expected at this stage, revisit once blog
  routes exist.
- [ ] VS-16: Consider native `<details>`/`<summary>` for the FAQ accordion (fixes VS-06 as a side
  effect).
- [ ] VS-17: `index.astro` is a large single-file component — no defect found, revisit extraction
  once blog templates might share patterns with it.

### Verified In This Review

- [x] `git log -1` confirms the commit under review and a clean working tree.
- [x] `web`: `pnpm install --frozen-lockfile`, `pnpm format:check`, `pnpm check` (0 errors/warnings),
  `pnpm build` all reproduced clean, independently of CI's badge.
- [x] `studio`: `pnpm install --frozen-lockfile`, `pnpm format:check`, `pnpm typecheck`, `pnpm lint`,
  `pnpm build` all reproduced clean (only the documented, accepted Sanity auto-update warning).
- [x] `studio`: `pnpm seed:dry-run` reports 6 categories, 1 author, 3 singletons, no writes.
- [x] `gh run list` confirms the latest CI run (`31891195182`) is `success` on
  `headSha 770965218abcbc048c1261c9ca0ad3f4b6bb832c` — the exact commit under review.
- [x] Real-browser Playwright verification performed at 390, 560, 768, and 1440px: landmark counts,
  heading order, tap-target measurement (edge-test and dimension measurement, not `scrollWidth`
  alone), computed-contrast sampling (11 selectors, all pass), keyboard tab order and focus-ring
  visibility, `prefers-reduced-motion` behavior, FAQ accordion interaction, console/network/response
  monitoring (zero errors, zero failed requests, zero non-2xx responses), and OG image dimension
  verification against the actual PNG header.
- [x] Secret scan of tracked files (targeted grep for common key/credential patterns): none found;
  both `.env.example` files contain only variable names, no values.
- [x] Forms: genuinely N/A, confirmed by absence of any form markup, Astro Action, Zod, Resend, or
  Turnstile package in either `web/` or `studio/`.
- [x] Analytics: genuinely N/A, confirmed by `rg` across `web/src` and `astro.config.mjs` for
  `gtag|gtm|google-analytics|dataLayer|analytics` returning no matches.
- [x] `web/reusable/` remains absent (unchanged from scaffold).
- [x] Prior design-review launch conditions (portrait, mark sign-off, WhatsApp glyph, disabled-note
  legibility, richer brand evidence, report strings, Mr Kong-reviewed blog copy) remain open,
  unchanged, and correctly not re-derived here as implementation findings — they are owner/client
  decisions per the review brief.
- [x] Branch protection: confirmed still blocked by GitHub's Free org plan (403 on both APIs per
  `docs/DECISIONS.md` §18) — this is the owner's explicit, stated-tradeoff decision and is treated
  as a residual risk, not re-opened as a finding, per the review brief's explicit instruction.

---

## Development Scaffold Re-Review - 2026-08-14

*(Preserved as history.)*

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
