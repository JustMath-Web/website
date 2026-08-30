# Bob Reviewer Handoff - Just Math Malaysia

Date: 2026-08-16

## 2026-08-30 - Cloudflare Pages migration review

Role: Bob, independent reviewer. Claude is the implementer. Bob did not edit application code,
`docs/DECISIONS.md`, or root `HANDOFF.md`.

Review type: **scoped migration review** of the current uncommitted Vercel → Cloudflare Pages
changes in the shared working tree, against `HEAD c1186435c7b96b0905f4988f2ca5c497540f9409`.

Scoped verdict: **Approved with conditions.** No open P0/P1 code defects remain in the migration.
The only remaining blockers are deployment operations, not code defects:
create the Cloudflare Pages project, set production env vars there, and repoint the Sanity webhook.

### Capabilities and fallbacks actually used

| Capability | Status | Notes |
| --- | --- | --- |
| Bash / Read / Grep / Glob | Available | Used for diff inspection, source scans, and file-line verification. |
| Playwright / browser verification | Partially available | This sandbox could not bind `127.0.0.1:4321` (`listen EPERM`), so Bob could not rerun the browser suite locally in this session. The project record in `docs/DECISIONS.md` §32 notes a fresh 39/39 rerun against the exact current tree. |
| `pnpm` checks | Available | `format:check`, `check`, `build`, and the two guardrail scripts all passed; `pnpm install --frozen-lockfile` stayed clean. |
| `gh` CLI | Available, authenticated (`charliekhc`) | Not needed in this migration pass. |

### Files/evidence reviewed this pass

- `web/astro.config.mjs`, `web/package.json`, `web/src/env.d.ts`,
  `web/src/lib/content/blogData.ts`, `web/scripts/assert-production-fails-without-sanity.mjs`,
  `web/playwright.config.ts`, `web/tests/e2e/landing.spec.ts`, `web/public/robots.txt`,
  `web/public/_headers`, `web/public/_redirects`, `web/README.md`, `web/.env.example`,
  `.github/workflows/ci.yml`, `docs/DECISIONS.md`.
- Current `git status --short`, `git diff --stat`, `git diff --check`.
- `rg` scans for `VERCEL_ENV`, `vercel.json`, `@astrojs/vercel`, `DEPLOY_ENV`, `_headers`,
  `_redirects`, and Cloudflare/Vercel host references in the changed files.

### Tools and commands actually run this pass

- `cd web && pnpm install --frozen-lockfile`
- `cd web && pnpm format:check`
- `cd web && pnpm check`
- `cd web && pnpm build`
- `cd web && pnpm test:blog-production-guardrail`
- `cd web && pnpm test:blog-null-post-filter`
- `cd web && pnpm test:e2e` (sandbox failed to bind `127.0.0.1:4321` with `listen EPERM`)
- `git diff --check`

### Viewports/flows actually tested

- Browser verification is covered by the fresh 39/39 rerun recorded in `docs/DECISIONS.md` §32
  against the exact current tree.
- This session's local sandbox could not reproduce the browser port bind, so Bob did not rerun the
  browser suite directly here.

### Resolved and open findings

- No open P0/P1 code findings remain in the migration.
- The previously flagged decisions-record mismatch is closed: `docs/DECISIONS.md` now separates
  historical Vercel-era entries from the current Cloudflare Pages guidance.
- Open conditions are deployment-only: create the Cloudflare Pages project, set `DEPLOY_ENV`
  and Sanity env vars there, and repoint the Sanity webhook.

### Residual unverified risk

- Cloudflare Pages project state, environment variables, deploy hook, and commercial plan terms are
  still external to the repo and require dashboard-level setup/confirmation.

### Next steps

1. Create the Cloudflare Pages project for `web/`.
2. Set `DEPLOY_ENV=production` and the Sanity env vars in the Pages production environment.
3. Repoint the Sanity publish webhook to the Cloudflare Pages deploy hook.
4. Confirm the plan/terms decision before treating the host migration as fully closed.

## 2026-08-16 - Scoped re-review of the P1/P2 fix commit

Role: Bob, independent development reviewer. Claude is the implementer, a separate session with no
visibility into this one. Bob did not edit application code, `docs/DECISIONS.md`, or root
`HANDOFF.md`.

Review type: **scoped re-review**, not a full vertical-slice pass. Claude's fix commit `05ab713`
("fix: resolve the four P1 findings from Bob's vertical-slice review"), merged to `main` at
`c1186435c7b96b0905f4988f2ca5c497540f9409` (current `HEAD` at review time), claims to resolve VS-01
through VS-04 (P1) plus VS-05 (P2, rolled in because it shares both files touched for VS-02/VS-03)
from the 2026-08-15 review below. This session re-inspected only those five findings plus the files
the fix commit actually touched — not a fresh vertical-slice pass, and VS-06 through VS-17 (the
other 8 P2s and 4 P3s) were deliberately **not** re-litigated.

Scoped verdict: **Approved with conditions.** All five targeted findings are genuinely resolved.
Two new minor, non-blocking issues were found during verification (detailed below and in
`review/bob/CODE-REVIEW.md`'s 2026-08-16 section) — neither reopens any of the five findings.

### Capabilities and fallbacks actually used

| Capability | Status | Notes |
| --- | --- | --- |
| Bash / Read / Grep / Glob | Available | Used throughout, including `git diff 05ab713~1 05ab713 -- <file>` per touched file. |
| Playwright (`mcp__plugin_playwright_playwright__*`) | Available | Used for all real-browser re-measurement of VS-02/VS-03/VS-05 — no manual-checklist fallback needed. |
| `gh` CLI | Available, authenticated (`charliekhc`) | Used to confirm the CI run for the exact `HEAD` commit, not just trust the badge. |
| `pnpm exec playwright install --with-deps chromium` / `pnpm test:e2e` | Available, ran clean | 19/19 tests passed on a fresh install, matching the count and pass claim in `docs/DECISIONS.md` §19. |

### Files/evidence reviewed this pass

- `review/bob/CODE-REVIEW.md`'s 2026-08-15 section (the findings being re-checked).
- `docs/DECISIONS.md` §19, read in full and treated as an unverified claim until independently
  checked against the diff and live behavior.
- `git log --oneline -8`, `git show --stat 05ab713`, `git rev-parse HEAD`.
- `git diff 05ab713~1 05ab713 -- <file>` for every file the fix commit touched, read in full:
  `web/src/components/GapChart.astro`, `web/src/pages/index.astro`,
  `studio/schemaTypes/documents/homePage.ts`, `web/src/lib/sanity/queries.ts`,
  `web/src/lib/sanity/types.ts`, `web/src/lib/content/defaultLandingData.ts`,
  `studio/scripts/seed.ts`, `web/src/components/SiteHeader.astro`,
  `web/src/components/SiteFooter.astro`, `web/tests/e2e/landing.spec.ts`,
  `web/playwright.config.ts`, `web/scripts/serve-dist.mjs`, `.github/workflows/ci.yml`.
- Current-state reads (not diff) of the same files, plus `web/.prettierignore` and `.gitignore`, to
  confirm the post-fix state is internally consistent, not just that the diff looks right in
  isolation.

### Tools and commands actually run this pass

- `cd studio && pnpm install --frozen-lockfile` (already up to date), `pnpm seed:dry-run` (6
  categories, 1 author, 3 singletons, no writes — matches §19's claim), `pnpm typecheck` (clean),
  `pnpm lint` (clean), `pnpm format:check` (clean), `pnpm build` (clean, same documented Sanity
  auto-update warning as before, not a regression).
- `cd web && pnpm install --frozen-lockfile` (already up to date), `pnpm build` (clean, 1 page),
  `pnpm check` (0 errors/warnings/hints, 20 files), `pnpm format:check` (clean on a fresh checkout —
  see the new prettierignore issue noted below, reproduced then cleaned up).
- `node scripts/serve-dist.mjs 4321` against a freshly built `dist/`, then Playwright MCP navigation
  + `browser_evaluate` + `browser_resize` at 390×844, 560×900, 768×1024, 1440×900 for real
  `getBoundingClientRect()` measurement of the exact elements VS-02/VS-03 flagged, real DOM inspection
  of the VS-05 `<ul>/<li>` structure, and a live read of the `GapChart` flag text + figure-callout
  text to confirm VS-01 renders real data end-to-end.
- `cd web && pnpm exec playwright install --with-deps chromium`, then `pnpm test:e2e` (killed my own
  manually-started dist server first so Playwright's own `webServer` step built and served
  independently, matching what CI does) → **19 passed (2.8s)**.
- `gh run list --limit 8`, `gh run view 31894636124 --json headSha,conclusion,displayTitle,headBranch`
  — confirmed `headSha: c1186435c7b96b0905f4988f2ca5c497540f9409` (exact current `HEAD`),
  `conclusion: success`.
- `git status --porcelain` before and after — clean; reviewer-generated `test-results/` and
  `playwright-report/` directories removed before finishing.

### Viewports/flows actually tested (real browser)

- **Viewports:** 390×844, 560×900, 768×1024, 1440×900 — the same four this project's own reviews and
  its new Playwright suite standardize on.
- **VS-02:** `.level-row__heading a` ("Blog notes", 4 instances) measured 67.6×44px at all four
  widths; per-row overlap check against `.level-row__body` confirmed ~10px clearance, no visual
  overlap; `scrollWidth === clientWidth` at all four widths.
- **VS-03:** `.site-footer__link` (5 instances) measured 44px tall and full-column-width at all four
  widths (350/512/180/244px across the four breakpoints) — specifically re-checked for the
  `inline-flex`-shrink regression DECISIONS.md §19 admits happened mid-fix, confirmed not present in
  the shipped state.
- **VS-05:** confirmed `<ul>` present with the correct `<li>` count inside both `<nav>` elements
  (1 header, 5 footer), zero `<a>` as direct `<nav>` children, both `aria-label`s unchanged.
- **VS-01:** confirmed the rendered `GapChart` and figure-callout text reflect the CMS/fallback data
  (`OCT 2026` / `FROM 2027` / `SPM` at the correct stop positions, `2` independent checks), not
  hardcoded literals — the full data chain actually executes at render time.

### New issues found this pass (both minor, non-blocking, recorded in `review/bob/CODE-REVIEW.md`'s
2026-08-16 section and `review/bob/APPROVAL-CHECKLIST.md`)

1. `web/.prettierignore` doesn't exclude `test-results/`/`playwright-report/` even though this
   commit's `.gitignore` update does — a local `pnpm test:e2e` run leaves an artifact that breaks the
   next `pnpm format:check` until manually cleaned. Doesn't affect CI (step order avoids it).
2. `studio/schemaTypes/documents/homePage.ts`'s `gapChartAnnotations[].year` sub-field (unchanged by
   this commit, pre-existing since scaffold time) still has no validation restricting it to the 11
   valid stop codes. This was harmless while the field was fetched-and-discarded; this fix commit
   activates the field, so a Studio typo there now silently drops a chart annotation with zero error
   anywhere in the pipeline.

### What this verdict does and does not cover

**Covers:** VS-01 through VS-05 only, all confirmed genuinely resolved by direct re-verification
(diff review + live browser measurement + independent Playwright run + independent CI-status check),
not by trusting `docs/DECISIONS.md` §19's claims.

**Does not cover:** VS-06 through VS-13 (the other 8 P2s) and VS-14 through VS-17 (the 4 P3s) from
the 2026-08-15 review below. These remain open, unchanged, and were not re-checked in this pass — the
fix commit did not touch the areas they concern (JSON-LD, security headers, dependency scanning, font
self-hosting, redirects, the FE self-check gap, the header brand-link tap target, the skip-link tap
target, sitemap/robots/RSS, the FAQ no-JS gap, or the `index.astro` file-size preference). A future
review still needs to clear those before the vertical slice as a whole can be approved. **This is not
full vertical-slice approval.**

---

## 2026-08-15 - Vertical slice development review

Role: Bob, independent development reviewer. Claude is the implementer. Bob did not edit
application code, `docs/DECISIONS.md`, or root `HANDOFF.md`.

Scoped verdict: **Revision required.** This is the first review of the vertical slice (landing page
rendering from the real component tree and local fallback content; no blog routes yet) — it
continues past the already-closed scaffold review below, which covered only tokens/Sanity
wiring/schemas before any real page existed.

Governing guideline: `02-INFORMATIVE-BLOG.md`, guideline_version `1.6.0`. Framework/backend branch:
Astro in `web/`, standalone Sanity Studio in `studio/`, no commerce backend.

Commit reviewed: `770965218abcbc048c1261c9ca0ad3f4b6bb832c` (branch `main`, clean working tree,
confirmed via `git log -1` / `git status`).

### Capabilities and fallbacks actually used

| Capability | Status | Notes |
| --- | --- | --- |
| Bash / Read / Grep / Glob | Available | Used throughout. |
| Playwright (`mcp__plugin_playwright_playwright__*`) | Available | Used for all real-browser verification — no manual-checklist fallback needed. |
| `gh` CLI | Available, authenticated (`charliekhc`) | Used to confirm the CI run for the exact commit under review, not just trust the badge. |
| Docs-lookup MCP (context7 etc.) | Not invoked | Nothing in this pass required a fresh framework-API lookup beyond what the scaffold review already confirmed (Sanity perspectives, unchanged); WCAG 2.2 SC 2.5.8 applied from the same standard the project's own `design/STATES.md` §0 already codifies, not from memory of an unstable API. |
| Lighthouse / Chrome DevTools performance audit | Not available in this session | Performance pass (10) is marked partially unverified — page-weight facts (byte sizes, request counts) were measured directly instead; Core Web Vitals scores were not run and are not asserted. |

### Files/evidence reviewed

- `Setup_Instructions/Guidelines/Web-Development/Web-Development-Guidelines/02-INFORMATIVE-BLOG.md`
  (full read).
- `docs/DECISIONS.md`, `docs/CONTENT-MODEL.md`, `HANDOFF.md` (both pages, full read).
- `design/DESIGN.md`, `design/STATES.md` (tap-target rule, §0 and §2.6), `design/COPY-GAPS.md`
  (unresolved-placeholder check).
- All four prior `review/bob/*.md` files and the pre-existing `BOB-REVIEWER-HANDOFF.md` content
  (preserved below, unmodified).
- `web/src/**` in full: `pages/index.astro`, `layouts/BaseLayout.astro`, all 6 components
  (`SiteHeader`, `SiteFooter`, `WhatsAppCta`, `GapChart`, `SectionMarker`, `LogoLockup`),
  `lib/content/{landingData,defaultLandingData}.ts`, `lib/sanity/{client,queries,types,image}.ts`,
  `styles/**`.
- `studio/schemaTypes/documents/{homePage,redirect}.ts`, `studio/schemaTypes/objects/navItem.ts`.
- `.github/workflows/ci.yml`, `web/astro.config.mjs`, `web/package.json`, both `.env.example` files.
- `web/dist/` after a clean local build (`index.html`, CSS bundle, `og-default.png`).

### Tools and commands actually run

- `git log -1`, `git status`, `git branch -a`.
- `web`: `pnpm install --frozen-lockfile` (already up to date), `pnpm format:check` (clean),
  `pnpm check` (`astro check` — 0 errors/warnings/hints, 17 files), `pnpm build` (clean, 1 page).
- `studio`: `pnpm install --frozen-lockfile` (already up to date), `pnpm format:check` (clean),
  `pnpm typecheck` (clean), `pnpm lint` (clean), `pnpm build` (clean, only the documented Sanity
  auto-update version-drift warning), `pnpm seed:dry-run` (6 categories, 1 author, 3 singletons, no
  writes).
- `gh run list --limit 5`, `gh run list --json headSha,conclusion,workflowName` — confirmed the
  latest run (`31891195182`) is `success` on `headSha 77096521...`, the exact commit under review.
- `pnpm preview --port 4325` in `web/`, then Playwright MCP against the served static build.
- Targeted `rg`/`grep` sweeps: `href="#"` (clean), analytics/`gtag`/`dataLayer` (clean, confirms N/A
  as decided), JSON-LD/`schema.org` (empty — a finding), font-loading (`@font-face`/Google Fonts —
  confirms still-external), security headers (empty — a finding), secret patterns across tracked
  files (clean), `.github/` contents (only `ci.yml`, no Dependabot — a finding).
- A Python one-liner reading the PNG header of `og-default.png` to confirm its real pixel dimensions
  match the `og:image:width`/`height` meta tags (1200×630, confirmed correct).

### Viewports/flows actually tested (real browser, not inferred from markup)

- **Viewports:** 390×844, 560×900 (documented breakpoint), 768×1024, 1440×900.
- **Overflow:** `document.documentElement.scrollWidth === clientWidth` confirmed at all four
  widths; a separate per-element "right edge past viewport" test additionally confirmed the pricing
  table's known/intended horizontal scroll stays contained inside its own `overflow-x: auto`
  wrapper rather than leaking to the page body.
- **Landmarks/headings:** counted `h1`/`main`/`header`/`footer`/`nav` and the full heading-level
  sequence at all four widths — structurally correct, no skipped levels, both `nav`s distinctly
  labelled.
- **Tap targets:** measured every `<a>`/`<button>` under 44px in either dimension at all four
  widths, then re-measured the worst offenders precisely with `getBoundingClientRect()` plus
  computed `min-height`/`padding` to confirm root cause, not just symptom.
- **Keyboard:** real `Tab` traversal through the first 6 focusable elements, confirming order and a
  visible, consistent `2px solid rgb(43, 68, 104)` focus ring on every one; separately confirmed the
  skip link becomes fully visible (`top: 12, left: 12`, no transform) once its transition settles on
  focus.
- **FAQ accordion:** a real click on the third question confirmed correct `aria-expanded` toggling,
  panel `hidden`/`inert` state changes, and exclusive single-open behavior; separately confirmed (by
  reading the server-rendered HTML, not a live no-JS browser run) that 12 of 13 panels ship `hidden`
  with no non-JS fallback path.
- **Contrast:** sampled and computed actual contrast ratios (alpha-composited against the true
  ancestor background, not assumed) for 11 selectors across dev-authored areas not previously
  checked at the code level — footer links/contact/brand copy, level-row links, trust-band text,
  pricing table cells, gap-chart axis labels, FAQ buttons, availability card, portrait fallback.
  Lowest ratio found: 5.90:1 (large text) — no contrast failures.
- **Reduced motion:** emulated `prefers-reduced-motion: reduce` and confirmed the session-card hover
  transition duration collapses to `0s`.
- **Console/network:** zero console errors, zero page errors, zero failed requests, zero non-2xx
  responses across the full page load at 1440px, including the real external Google Fonts requests
  (which do succeed — 8 requests, 2 CSS + 6 unique woff2 files after dedup).

### Resolved from the scaffold review (re-verified independently, not trusted from the record)

All ten scaffold-stage findings (2 P1, 7 P2, 1 P3) remain closed on independent re-check: the
published/preview Sanity client split, `href="#"` absence, navItem/redirect URL allowlisting,
explicit CMS result types, explicit GROQ projections, slug validation, Studio dependency pinning,
project-specific READMEs, the scaffold FE self-check's continued presence, and byte-identical
tokens. Nothing regressed.

### Open findings, this review (full detail and evidence in `review/bob/CODE-REVIEW.md`)

**P1 (4, all new to this vertical slice — none present at scaffold stage):**

- VS-01: `GapChart.astro` hardcodes chart data that `homePage.problem.gapChartAnnotations` already
  models, is already fetched by `queries.ts`, and is already typed — the CMS field is fetched and
  then silently discarded. Several other on-page figures (24, 2, 20, 30, the availability time
  blocks) are likewise hardcoded literals duplicating facts already present in editable prose
  fields, creating real content-drift risk once the dataset is seeded and edited.
- VS-02: "Blog notes" level-to-category links measure 67.6×16.8px — fails both WCAG 2.2 SC 2.5.8 AA
  and the project's own `design/STATES.md` §0 ≥44×44 rule, at every tested viewport.
- VS-03: Footer navigation links measure ~350×18.2px — same failure, shared component, ships on
  every future page.
- VS-04: No Playwright suite exists anywhere in the repository. `@playwright/test` was explicitly
  earmarked in `docs/DECISIONS.md` §4 to be added with this exact vertical slice, and was not. All
  browser verification in this review was performed ad hoc by Bob and is not committed, repeatable,
  or CI-enforced.

**P2 (9):** header/footer nav not marked up as lists (FE-04); 12 of 13 FAQ answers unreachable
without JS (FE-32); no JSON-LD anywhere; no security headers configured; no dependency/advisory
scanning in CI; fonts still loaded from Google Fonts, not self-hosted (previously known, confirmed
still open); old-site redirects still not implemented as executable config despite three of six
targets now genuinely existing on the real page (previously known, confirmed still open); no
vertical-slice FE self-check recorded in `docs/DECISIONS.md` (repeat of a gap the scaffold review
already caught once); header brand/logo link at 114×40.3px, under the house 44×44 rule by ~4px.

**P3 (4):** skip link 1.6px short of the house 44×44 rule; sitemap/robots/RSS still not wired
(expected-incomplete at this stage, not a regression); FAQ accordion could be native
`<details>`/`<summary>` (would also fix VS-06); `index.astro` is a large single-file component (no
duplication found, just a size/maintainability note for later).

### Disagreements

None with the implementer's own record — every claim in `HANDOFF.md`/`docs/DECISIONS.md` checked in
this pass was found accurate. The disagreement, if any, is with the completeness of what was
delivered relative to the guideline's Section 19 MUST for this exact stage (Playwright), not with
anything Claude claimed was true.

### Residual unverified risk

- **Performance (Lighthouse/Core Web Vitals):** not run — no Lighthouse/DevTools tool was available
  in this session. Page-weight facts were measured directly instead (47,115-byte HTML, 44,197-byte
  CSS, zero client JS beyond a small inline script) and are a reasonable proxy, but LCP/CLS/INP
  numbers themselves are unverified.
- **No-JS FAQ behavior:** established by reading the server-rendered HTML's `hidden` attributes, not
  by running an actual browser session with JavaScript disabled. The conclusion (12 of 13 panels
  unreachable) follows directly from the markup and script logic and is not expected to change under
  a literal no-JS run, but that literal run was not performed.
- **Branch protection:** confirmed still blocked by GitHub's Free org plan (403 on both APIs), which
  is the owner's explicit, already-accepted tradeoff per `docs/DECISIONS.md` §18 — restated here as
  a residual risk (an unprotected `main` relying on team discipline alone), not reopened as a
  finding.

### Prioritized next steps for the implementer

1. Fix the two tap-target regressions (VS-02, VS-03) and the header logo (VS-13) — mechanical
   `min-height` additions, same technique already used and verified elsewhere in this codebase.
2. Wire `GapChart` to the CMS field that already exists for it (VS-01), and record a decision for
   the other hardcoded figures.
3. Install `@playwright/test`, write a suite covering at minimum overflow/tap-targets/landmarks/
   keyboard/FAQ, wire it into CI (VS-04).
4. Work through the P2 list (nav list markup, FAQ no-JS fallback, JSON-LD, security headers,
   advisory scanning, font self-hosting, redirects, FE self-check) before the next review.
5. Record a vertical-slice FE self-check in `docs/DECISIONS.md` before requesting the next review,
   per guideline Section 9.

### Artifacts updated by Bob

- `review/bob/CODE-REVIEW.md` (new dated section at top; scaffold section preserved below as
  history).
- `review/bob/FE-GATE-AUDIT.md` (new dated section at top; scaffold section preserved below).
- `review/bob/APPROVAL-CHECKLIST.md` (new dated section at top; scaffold and design sections
  preserved below).
- This handoff section.

---

## 2026-08-14 - Development scaffold re-review

Role: Bob, independent development reviewer. Claude is the implementer. Bob did not edit application
code, `docs/DECISIONS.md`, or root `HANDOFF.md`.

Scoped verdict: **Approved for the next controlled development step**. This is not vertical-slice,
feature-complete, preview-deploy, browser, CI, seeded-content, or launch approval.

Governing guideline: `02-INFORMATIVE-BLOG.md` guideline_version `1.6.0`. Framework/backend branch:
Astro in `web/`, standalone Sanity Studio in `studio/`, no commerce backend.

Commit reviewed: unavailable. The active project root is still not a Git repository.

Files/evidence reviewed:

- `docs/DECISIONS.md`, `docs/CONTENT-MODEL.md`, `HANDOFF.md`
- prior design and scaffold review files in `review/bob/**` and `BOB-REVIEWER-HANDOFF.md`
- `web/src/lib/sanity/**`, `web/src/pages/index.astro`, `web/src/styles/**`, `web/README.md`
- `studio/schemaTypes/**`, `studio/package.json`, `studio/sanity.cli.ts`, `studio/README.md`

Tools and checks actually run:

- `diff -rq design/tokens web/src/styles/tokens`: passed with no output.
- `rg 'href="#"' web/src`: no matches.
- Sanity perspective grep confirmed `published` on the default client and `drafts` only in
  `createPreviewClient()`.
- `web`: `pnpm build`, `pnpm check`, and `pnpm format:check` passed.
- `studio`: `pnpm typecheck`, `pnpm lint`, and `pnpm format:check` passed.
- `studio`: sandboxed `pnpm build` failed on restricted DNS to `sanity-cdn.com`; escalated
  `pnpm build` passed with the documented Sanity auto-update/runtime warning.
- Current Sanity docs checked for Content Lake perspectives: `published` excludes drafts; `drafts`
  is the preview perspective for draft content.

Resolved from the first scaffold review:

- P1-DEV-01: production Sanity reads no longer switch to `drafts` when a token exists. Public reads
  use `published`; draft reads require `createPreviewClient()` and `ENABLE_SANITY_PREVIEW=true`.
- P1-DEV-02: green `href="#"` smoke-page control removed.
- P2-DEV-01: navigation and redirect URLs are allowlisted by schema validation.
- P2-DEV-02: homepage and Portable Text result types are explicit. TypeGen remains deferred and
  documented.
- P2-DEV-03: GROQ helpers use explicit projections and avoid per-candidate category dereference
  filtering.
- P2-DEV-04: post/category/author slugs enforce lowercase-hyphen format and uniqueness.
- P2-DEV-05: Studio package versions are pinned; hosted auto-update remains enabled as accepted,
  documented operational risk.
- P2-DEV-06: web and studio READMEs are project-specific.
- P2-DEV-07: Claude's scaffold-stage FE self-check exists in `docs/DECISIONS.md`.
- P3-DEV-01: token files are byte-identical and excluded from Prettier.
- P3-DEV-02: `docs/DECISIONS.md` Section 4a now accurately distinguishes the public `published`
  client from the gated preview `drafts` client.

Open scaffold findings: none.

Carry-forward conditions:

- First vertical slice must still prove real rendering, browser/mobile/a11y behavior, route-level
  data handling, and meaningful test coverage.
- `@astrojs/sitemap` is installed but intentionally not configured until real routes exist.
- Sanity TypeGen is still deferred; explicit hand-authored types are acceptable for scaffold only.
- Prior design-review launch conditions remain open and unchanged.

Artifacts updated by Bob:

- `review/bob/CODE-REVIEW.md`
- `review/bob/FE-GATE-AUDIT.md`
- `review/bob/APPROVAL-CHECKLIST.md`
- this re-review handoff section

---

## 2026-08-14 - Development scaffold review

Role: Bob, independent development reviewer. Claude is the implementer. Bob did not edit application
code, `docs/DECISIONS.md`, or root `HANDOFF.md`.

Scoped verdict: **Revision required** for the scaffold review. This is not vertical-slice,
feature-complete, preview-deploy, or launch approval.

Governing guideline: `02-INFORMATIVE-BLOG.md` guideline_version `1.6.0`. Framework/backend branch:
Astro in `web/`, standalone Sanity Studio in `studio/`, no commerce backend.

Commit reviewed: unavailable. The active project root is not a Git repository (`git status`,
`git rev-parse --show-toplevel`, and `git rev-parse HEAD` all failed with "not a git repository").

Files/evidence reviewed:

- `docs/DECISIONS.md`, `docs/CONTENT-MODEL.md`, `HANDOFF.md`
- prior design review files: `review/bob/REVIEW.md`, `review/bob/APPROVAL-CHECKLIST.md`
- `web/package.json`, `web/astro.config.mjs`, `web/.env.example`, `web/src/pages/index.astro`,
  `web/src/styles/**`, `web/src/lib/sanity/**`
- `studio/package.json`, `studio/sanity.config.ts`, `studio/sanity.cli.ts`, `studio/structure.ts`,
  `studio/schemaTypes/**`

Tools and checks actually run:

- `web`: `pnpm build` passed; `pnpm check` passed; `pnpm format:check` passed.
- `studio`: initial `pnpm typecheck`/`pnpm lint`/`pnpm build` attempts failed before their target
  checks because pnpm aborted non-interactive dependency purge. `CI=true pnpm install` then hit
  restricted DNS. Escalated `pnpm install --config.confirmModulesPurge=false` passed.
- `studio`: after install, `pnpm typecheck`, `pnpm lint`, and `pnpm format:check` passed.
- `studio`: sandboxed `pnpm build` failed on `sanity-cdn.com` DNS; escalated `pnpm build` passed
  with Sanity warnings about no `appId` and runtime `sanity`/`@sanity/vision` 6.9.2 vs local 6.9.1.
- `diff -rq design/tokens web/src/styles/tokens` reports all token files differ; inspected diffs are
  formatting/serialization rather than confirmed value drift.
- Current Sanity docs checked for Content Lake perspectives: `published` excludes drafts; `drafts`
  treats draft content as published.

Open P1 findings:

- P1-DEV-01: `web/src/lib/sanity/client.ts` uses `perspective: "drafts"` whenever
  `SANITY_API_READ_TOKEN` is set. Production builds that need a token for a private dataset can leak
  draft/unpublished content. Split production published reads from access-controlled preview reads.
- P1-DEV-02: `web/src/pages/index.astro` ships a green WhatsApp-style anchor with `href="#"`,
  violating FE-05 and the reserved-green WhatsApp constraint.

Open P2/P3 findings:

- CMS navigation/redirect URL fields need allowlist validation before frontend render/redirect logic
  trusts them.
- Sanity TypeGen is not wired and current CMS result types use broad `unknown` for major content
  sections.
- GROQ helpers need explicit projections and a category filter that does not dereference refs in the
  filter.
- Routed slugs need the documented lowercase-hyphen/uniqueness validation.
- Studio dependency/runtime updates need pinning or an explicit governed auto-update policy.
- README/setup docs are still framework starter boilerplate.
- Claude's scaffold-stage FE self-check is missing from `docs/DECISIONS.md`.
- Token-copy wording says "verbatim" but the files are reformatted.

Artifacts written by Bob:

- `review/bob/CODE-REVIEW.md`
- `review/bob/FE-GATE-AUDIT.md`
- updated `review/bob/APPROVAL-CHECKLIST.md` with a development-scaffold section
- this development-review handoff section

Next re-review should start from the two P1s, then verify the P2 URL validation, TypeGen/projection,
slug, Studio dependency, README, and FE self-check corrections. Real browser/accessibility review is
deferred until a vertical slice exists.

---

Role: Bob, independent reviewer. Andy remains the design author and owner of the design artifacts.

Scoped verdict: **Approved with conditions for development handoff**. This is not launch approval. The previous landing/report package remains approved with conditions, the blog category-count P2 is resolved, and the final blog/header 44x44 touch-target P2 is resolved. No Andy-owned design-author blocker remains.

## Artifacts Reviewed

- Root: `HANDOFF.md`, `PRODUCT.md`, `just-math-design-brief.md`, `just-math-page-copy-final.md`.
- Package docs: `design/DESIGN.md`, `design/STATES.md`, `design/COPY-GAPS.md`, `design/ASSETS.md`, `design/BRAND-INTAKE.md`, `design/MARKET-SCAN.md`, `design/SECTOR-PROFILE.md`, `design/readme.md`.
- Source/artifacts: `design/components/**`, `design/ui_kits/**` including `design/ui_kits/blog/**`, `design/templates/progress-report/**`, `design/tokens/**`, `design/_ds_bundle.js`, `design/_ds_manifest.json`.
- Shared ledgers: `/Users/charlie/Documents/Projects/Setup_Instructions/Guidelines/Web-Design/DESIGN-FINGERPRINTS.md`, `/Users/charlie/Documents/Projects/Setup_Instructions/Guidelines/Web-Design/Sector-Profiles/`.

## Standards And Tools

- Bob prompt: `/Users/charlie/Documents/Projects/Setup_Instructions/Guidelines/Web-Design/Web-Design-Guidelines/BOB-WEB-DESIGN-REVIEWER-PROMPT.md`.
- Web Development craft standard: `/Users/charlie/Documents/Projects/Setup_Instructions/Guidelines/Web-Development/WEB-DEV-CRAFT-STANDARD.md`.
- Web Interface Guidelines: fetched current rules from `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`.
- WCAG baseline: W3C WCAG 2.2 at `https://www.w3.org/TR/WCAG22/`.
- Local checks: `rg`, `node --check`, Node manifest/CSS diff, file/line inspection, local HTTP server, installed Google Chrome through CDP.

## Re-Review Result

- P1 resolved: form focus states are now truthful and visible. Bundle-driven browser check showed all 7 tested controls with `2px solid rgb(43, 68, 104)` outline and `:focus-visible` matched.
- P1 resolved: progress-report template now uses `#8f6114`; old `#9c6a17` is absent from shipping design files; callout contrast is 4.68:1.
- P2 resolved: production landmark/skip-link contract is now specified in `design/STATES.md`.
- Design-to-development semantic contract resolved: `design/STATES.md` now answers the FE §A decisions that belong to design, without importing the full engineering standard into the design phase.
- Mark direction resolved: owner chose Option B, and Bob agrees. Rendered landing header passes at 390px.
- Option B package sync resolved: booking source and bundle copy, brand component card, brand guideline lockup card, clearspace card, website README, `ASSETS.md`, `_ds_manifest.json`, `BRAND-INTAKE.md`, the standalone document-control report template, and the root status block now match the operator mark. Bob accepts the new clearspace rule (half the mark's height) as a coherent derived rule, subject to brand-owner sign-off.
- P2 resolved: Accordion package sync is closed across source, declaration, prompt, bundle, and forced fallback render.
- P3 resolved: checkbox invalid-state docs now say box-shadow/ring, not outline.
- Browser pass completed: website at 390, 768, and 1440 had 0 clipped elements, 0 sub-24px targets, and 0 stuck-invisible reveal elements after transitions settled.
- Route classification accepted for development: use `02-INFORMATIVE-BLOG.md` with Astro + Sanity. `01-LANDING-PAGE.md` is superseded because ongoing editorial publishing is now in scope.
- Blog template direction mostly accepted: archive rows rather than cards, syllabus-level taxonomy, long-form post template, KaTeX maths, and `Working` are coherent with the design system.
- Final blog/header touch-target P2 resolved: `STATES.md` now clarifies the rule as 44x44, not 44 tall. Rendered at 390px and 1200px, header "Blog" is `44 x 44` on landing/archive/post, post breadcrumb "Notes" is `44 x 44`, header "Schedule Now" remains `169.6 x 44`, and all checked surfaces have 0 under-44 focusable targets and no horizontal overflow.

## Open Conditions

- P2: disabled option notes remain a project-owner legibility decision.
- P2: launch-critical owner/client inputs remain unresolved: portrait or typographic About rebuild, brand-owner sign-off on the adopted operator redraw, richer brand-brief evidence, FAQ count binding, two report strings, optional trust-bar accessible-name wording, "Schedule Now" decision, Mr Kong-reviewed blog content/math, and the narrowed WhatsApp glyph decision. IBM Plex is confirmed; self-hosting fonts is a production implementation task.

## Decisions Made In This Review

- `tavis.live` is accepted as verified enough to keep in `MARKET-SCAN.md`.
- CS-03 remains a recorded route exception, not a pass. It does not block this package review because the owner is continuing an already-selected design package.
- CS-16 owner override accepted.
- CS-71 ledger comparison is clean. The ledger has no project rows; do not append this package row until after approval.
- The sanitized online-tuition sector profile has not been filed to the shared sector library, correctly. That is a project-close action after approval.

## Verification Results

- `node --check design/_ds_bundle.js`: passed.
- Manifest/CSS token diff: 125 CSS vars, 125 manifest tokens, 0 diffs, 0 duplicates.
- Manifest/card marker diff: 32 cards, 0 drift.
- Contrast calculation: old `#9c6a17` on `#f6eedd` is 4.05:1; corrected `#8f6114` on `#f6eedd` is 4.68:1.
- Focus grep: no shipping `outline:none` focus suppression in `design/`.
- FE semantic contract check: `design/STATES.md:64-114` covers FE-02, FE-04, FE-05, FE-06, FE-07, and FE-33; `design/COPY-GAPS.md:108-120` logs the only new accessible-name string.
- WhatsApp brand check: `design/ASSETS.md:79-122` records the result. Word replacement, capitalization, endorsement, and two authored verb usages are handled. One approved-copy phrase remains a client/owner decision. The glyph decision remains: use an official white/reversed WhatsApp asset from the Meta kit, or drop the glyph. Current implementation tints a path via `currentColor`, so it is not yet proven as an official white asset.
- WhatsAppButton comment check: `design/components/core/WhatsAppButton.jsx:39-42` now states the glyph is not the only destination signal and refers to `ASSETS.md` §4.
- Predecessor logo check: Bob fetched `https://mathematicsmalaysia.com/storage/2022/12/site-logo-math-white.png`, received HTTP 200, and measured it as `350 x 100`. Palette inspection confirms the old four-color operator cluster, including green `#84d063`. The homepage itself is bot-gated from Bob's browser, so this is not a full Stage 0R audit.
- Option B render check: at 390px, landing header had mark `32.8 x 32.8`, type block height `32.78`, fill `rgb(20,22,26)`, 0 clipped elements, 0 sub-24px targets, 0 stuck invisible. Deleted asset files are absent and no non-doc shipping path references deleted filenames.
- Option B rendered surface check: brand component card, booking kit, reports UI kit, lockup card, and clearspace card all render the operator mark/lockup with no stale equals copy. Booking uses `monogram-operators-invert.svg` and says "operator mark".
- Option B residual sync re-check: `BRAND-INTAKE.md` now says three SVG marks and correctly frames the redraw; the standalone document-control progress-report template renders an ink operator SVG at `45.09 x 45.09`, has no old uppercase/rule lockup, no stale equals copy, and `.lockup-fill` resolves in template context.
- Blog browser check: archive and post rendered at 390/768/1440. Archive: 1 `h1`, 1 `main#main`, 0 clipped elements, 0 browser-level sub-24px targets, 0 contrast failures. Post: 1 `h1`, heading order `H1,H2,H2,H2,H3`, 1 `main#main`, 13 KaTeX formulas, no `[object Object]`, no page-level horizontal scroll, 0 browser-level sub-24px targets, 0 contrast failures. KaTeX internal SVG paths falsely trip edge-based element clipping probes but do not create document or formula-container overflow.
- Blog docs check: `COPY-GAPS.md` records the "Schedule Now" conflict and placeholder blog copy/math; `ASSETS.md` records KaTeX self-host/build-time requirement; `DESIGN.md` records archive/post/category template intent.
- 2026-08-14 final blog P2 re-check: `node --check` passed; manifest/CSS token diff remains 125/125/0; manifest/card marker diff remains 32/0. Source and bundle now use `size="md"` for the header CTA; category counts use `--size-2xs` / 12px; remaining `--size-3xs` uses are gap-chart annotations only. Rendered 390px and 1200px landing/archive/post have `scrollWidth === clientWidth`, 0 non-KaTeX clipped elements, and 0 under-44 focusable targets. Header "Blog" is `44 x 44`; post breadcrumb "Notes" is `44 x 44`; post still has 13 KaTeX formulas with no formula-container overflow.
- Accordion browser check: 13/13 live FAQ items wired with `aria-controls`, matching panel IDs, `role=region`, `aria-labelledby`, and closed-panel `inert`.
- Forced fallback Accordion browser check: with `window.JustMathDesignSystem_270e96.Accordion` removed at render time, 13 FAQ items, 13 fully wired, 12 closed panels, 12 closed panels inert, 0 bad rows.
- Ledger check: reachable at the moved Setup_Instructions path, header only, no project rows.

## Next Step

Development can start under `02-INFORMATIVE-BLOG.md` with the owner/client conditions carried forward: disabled-note legibility, portrait or typographic About rebuild, adopted-mark sign-off, WhatsApp glyph asset/removal decision, richer brand-brief evidence, FAQ count binding, report strings, optional trust-bar accessible-name wording, "Schedule Now", and Mr Kong-reviewed blog content/math.
