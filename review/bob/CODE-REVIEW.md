# Bob Code Review — Just Math Malaysia Vertical Slice Review

Date: 2026-08-16 (scoped re-review)

Reviewer role: Bob, independent reviewer. Claude is the implementer. Bob did not edit application
code, `docs/DECISIONS.md`, or the project `HANDOFF.md`.

Review type: **scoped re-review**, not a full vertical-slice pass. Claude's fix commit `05ab713`
("fix: resolve the four P1 findings from Bob's vertical-slice review"), merged to `main` at
`c1186435c7b96b0905f4988f2ca5c497540f9409` (current `HEAD`), claims to resolve the four P1 findings
(VS-01 through VS-04) plus one adjacent P2 (VS-05) from the 2026-08-15 review immediately below. This
section re-inspects only those five findings and the files the fix commit actually touched
(`.github/workflows/ci.yml`, `.gitignore`, `docs/DECISIONS.md`, `studio/schemaTypes/documents/homePage.ts`,
`studio/scripts/seed.ts`, `web/package.json`, `web/playwright.config.ts`, `web/scripts/serve-dist.mjs`,
`web/src/components/GapChart.astro`, `web/src/components/SiteFooter.astro`,
`web/src/components/SiteHeader.astro`, `web/src/lib/content/defaultLandingData.ts`,
`web/src/lib/sanity/queries.ts`, `web/src/lib/sanity/types.ts`, `web/src/pages/index.astro`,
`web/tests/e2e/landing.spec.ts`). The other 8 P2s and 4 P3s from the 2026-08-15 review (VS-06 through
VS-17) are **not re-litigated here** — they remain open and unaffected, exactly as left below.

## Evidence and commands actually run this pass

- `git log --oneline -8`, `git show --stat 05ab713`, `git rev-parse HEAD` — confirmed the fix commit's
  file list and that `c118643...` is genuinely current `HEAD`.
- `git diff 05ab713~1 05ab713 -- <file>` for every touched file, read in full — not the post-fix
  state alone, the actual diff, to see exactly what changed and confirm nothing outside the claimed
  scope moved.
- `docs/DECISIONS.md` §19 read in full and treated as an unverified claim until independently checked
  against the diffs and live behavior.
- `cd studio && pnpm install --frozen-lockfile` (already up to date), `pnpm seed:dry-run` (6
  categories, 1 author, 3 singletons — `siteSettings, navigation, homePage` — no writes, matches the
  count claimed in §19), `pnpm typecheck` (clean), `pnpm lint` (clean), `pnpm format:check` (clean),
  `pnpm build` (clean, same documented Sanity auto-update warning as the 2026-08-15 pass, not a
  regression).
- `cd web && pnpm install --frozen-lockfile` (already up to date), `pnpm build` (clean, 1 page),
  `pnpm check` (`astro check` — 0 errors/warnings/hints, 20 files), `pnpm format:check` (clean on a
  fresh checkout; see the new minor issue noted below re: `test-results/` and `.prettierignore`).
- `node scripts/serve-dist.mjs 4321` against the freshly built `dist/`, then Playwright MCP
  (`mcp__plugin_playwright_playwright__*`) navigation/evaluate/resize at 390×844, 560×900, 768×1024,
  and 1440×900 — real `getBoundingClientRect()` measurement of the specific elements VS-02/VS-03
  flagged, real DOM inspection of the VS-05 `<nav>`/`<ul>`/`<li>` structure, and a live read of the
  `GapChart`/figure-callout DOM text to confirm VS-01's data actually renders end-to-end, not just
  that the prop is wired in source.
- `cd web && pnpm exec playwright install --with-deps chromium`, then `pnpm test:e2e` (killing my own
  manually-started dist server first so Playwright's own `webServer` built and served a clean copy) —
  **19/19 tests pass**, matching the count and pass claim in §19.
- `gh run list --limit 8` and `gh run view 31894636124 --json headSha,conclusion` — confirmed the CI
  run for the exact merge commit (`headSha: c1186435c7b96b0905f4988f2ca5c497540f9409`) is `success`.
- `git status --porcelain` after all of the above — clean; test artifacts (`test-results/`,
  `playwright-report/`) removed before finishing so no reviewer-generated state was left in the repo.

## Re-Review: VS-01 through VS-05

### VS-01 — RESOLVED

- `web/src/components/GapChart.astro` now declares `interface Props { annotations?:
  GapChartAnnotation[] }`, defaults to `[]`, and builds its `measured` lookup by
  `stops.indexOf(annotation.year)` — matching by the CMS-authored `year` code, not array position, so
  authoring order in Studio genuinely doesn't matter. `web/src/pages/index.astro:147` now passes
  `<GapChart annotations={homePage.problem.gapChartAnnotations} />` — no longer called with zero
  props.
- Confirmed live in a real browser (560px, fallback data path): `.gap-chart__flags span` text content
  is `["", "", "", "OCT 2026", "", "", "", "", "FROM 2027", "", "SPM"]` — index 3 (`S4`), index 8
  (`F3`), index 10 (`F5`) — exactly matching `defaultLandingData.ts`'s
  `{year: "S4", label: "OCT 2026"}` / `{year: "F3", label: "FROM 2027"}` / `{year: "F5", label:
  "SPM"}` entries and the original hardcoded values Bob's 2026-08-15 review found. This confirms the
  full chain (schema → query → fallback/CMS → prop → component render) actually works, not just that
  the prop exists in source.
- All five new fields Bob asked for are wired end-to-end, verified layer by layer:
  - `problem.independentChecksCount`, `about.yearsExperience`, `about.studentsPerYear`,
    `finalCta.freeMinutes`: added to `studio/schemaTypes/documents/homePage.ts` as
    `Rule.required().integer().min(0)` number fields; added to the GROQ projection in
    `web/src/lib/sanity/queries.ts`; typed as required (non-optional) `number` in
    `web/src/lib/sanity/types.ts`, matching the schema's required-ness; present with real values in
    `web/src/lib/content/defaultLandingData.ts` (`2`, `24`, `20`, `30` — identical to the values they
    replace); included in `studio/scripts/seed.ts`'s `homePageDocument()` automatically via the
    existing `{...page.problem}` / `{...page.about}` / `{...page.finalCta}` spreads (no extra
    per-field wiring needed there since these are plain scalars, unlike the array fields below);
    rendered directly in `index.astro` at the four call sites Bob's original review cited by line
    number. Confirmed live: figure-callout renders `2`.
  - `pricing.availabilityTimeBlocks`: added as an array-of-object field (`Rule.min(1)`, deliberately
    *not* `Rule.required()` — array presence, not scalar presence), a sibling of `availability` rather
    than nested inside it (documented rationale in DECISIONS.md §19: `availability`'s `subSection`
    type is shared with two other sections that don't need time blocks); typed as optional
    `TimeBlock[]` in `types.ts`, correctly matching the schema's non-required-ness; projected in
    `queries.ts`; present in `defaultLandingData.ts` with the original two time blocks; explicitly
    mapped with `_type: 'timeBlock'` tagging in `seed.ts` (needed because it's an array of objects,
    same pattern already used for `gapChartAnnotations`); consumed in `index.astro` as
    `{(homePage.pricing.availabilityTimeBlocks ?? []).map(...)}` — defensively guarded against
    `undefined`, so a genuinely-empty Studio document renders zero time blocks rather than crashing.
  - `problem.gapChartAnnotations` itself remains correctly optional in both schema (no
    `Rule.required()`) and `types.ts` (`gapChartAnnotations?:`), and `GapChart.astro`'s own
    `annotations = []` default handles the empty/undefined case gracefully (chart renders with all
    bars at baseline, no crash) — this is the one field Bob's review explicitly said didn't need to
    become required.
  - Field description on `gapChartAnnotations` corrected from "if/when built" (stale — the chart now
    exists) to describe the actual `year`/stop-code matching contract.
- `pnpm seed:dry-run` reproduces the same counts DECISIONS.md §19 claims (6 categories, 1 author, 3
  singletons, no writes) — no regression in seed behavior from the schema additions.
- **New minor issue found, not a blocker:** `gapChartAnnotations[].year` (the sub-field, unchanged by
  this fix commit — pre-existing since scaffold time) still has no validation restricting it to the
  11 valid stop codes (`S1`–`S6`, `F1`–`F5`); it's a bare `type: 'string'` with no `Rule` at all. This
  gap was harmless while the field was fetched-and-discarded (Bob's original VS-01 finding), but this
  fix commit activates the field, so it's now a live, silent-failure path: if an editor types `"Form
  3"` instead of `"F3"`, `GapChart.astro`'s `stops.indexOf(annotation.year)` returns `-1`, the
  `measured[index] = annotation.label` assignment is skipped, and that annotation silently vanishes
  from the chart with **no error in Studio, no build warning, no console error** — the exact kind of
  silent content/reality mismatch VS-01's original "why it matters" argued the site can't afford.
  Recommend adding `Rule.custom` (or a `list`/`options` dropdown on `year`) restricting it to the 11
  stop codes; not required for this verdict since it's a pre-existing gap merely made reachable, not
  something this commit introduced from scratch, but worth fixing alongside the next touch to this
  schema.

### VS-02 — RESOLVED

- `web/src/pages/index.astro`'s `.level-row__heading a` now has `display: inline-flex; align-items:
  center; min-height: var(--control-h); margin-block: -13.6px;` in addition to its prior
  `justify-self: start`.
- Measured live (Playwright, real built `dist/` output, not `pnpm dev`) at all four project-standard
  widths — 390, 560, 768, 1440px: all 4 "Blog notes" links measure **67.6 × 44px** at every width
  (width unchanged from before, as expected — Bob's original finding already noted width was fine;
  only height needed fixing).
- Overlap check (390px, per-row `getBoundingClientRect()` on `.level-row__heading`,
  `.level-row__heading a`, and the next sibling `.level-row__body`): the enlarged link box extends a
  few pixels below its heading container's own box (e.g. row 0: link bottom `6060.24` vs. heading
  container bottom `6046.65`), but `.level-row__body` doesn't start until `6070.65` — roughly 10px of
  clearance, no visual overlap with the row body in any of the 4 rows checked.
- No new horizontal overflow: `document.documentElement.scrollWidth === clientWidth` at all four
  widths (390/560/768/1440), confirmed directly via `browser_evaluate`, not inferred.

### VS-03 — RESOLVED, including the regression documented in DECISIONS.md §19

- `web/src/components/SiteFooter.astro`'s `.site-footer__link` is `display: flex` (not
  `inline-flex`), with `align-items: center; min-height: var(--control-h); margin-block: -13px;`.
  DECISIONS.md §19's own account says the first attempt used `inline-flex`, which shrank the links to
  ~38px wide once VS-05's `<ul>/<li>` wrap moved the `<a>` a level deeper than the grid that used to
  stretch it, and that this was caught by the new Playwright suite and fixed by switching to `flex`
  (block-level, stretches to fill its `<li>`). Independently confirmed this account is accurate and
  the fix holds:
  - 390px: all 5 footer links measure **350 × 44px** (single-column footer layout at this width).
  - 560px: **512 × 44px**. 768px: **180 × 44px** (3-column grid, narrower column). 1440px: **244 ×
    44px**. In every case the link's width equals its column's available width — no shrink-to-fit
    regression at any tested viewport.
  - No horizontal overflow at any of the four widths (same `scrollWidth === clientWidth` check as
    VS-02).
- This is the one finding of the five where a real regression genuinely occurred mid-fix (per the
  implementer's own honest account) and was genuinely caught and corrected before this commit landed
  — the Playwright suite added for VS-04 is what caught it, which is itself evidence VS-04 does real
  work rather than being pro-forma.

### VS-04 — RESOLVED

- `web/tests/e2e/landing.spec.ts` (157 lines, 19 tests) read in full. Coverage against what the
  2026-08-15 review required:
  - **Overflow at multiple widths:** `assertNoHorizontalOverflow` run at all 4 project-standard
    widths (390/560/768/1440) via a parametrized `test.describe` loop.
  - **Landmarks:** one `<main>`/`<h1>` and one `<header>`/`<footer>` asserted at all 4 widths. (Does
    not separately assert the two distinctly-labelled `<nav>` count the 2026-08-15 review's manual
    pass covered — a minor coverage gap versus the ad hoc pass, not a defect in what exists.)
  - **VS-02/VS-03 tap targets specifically:** `assertMinTapTarget(page, ".level-row__heading a")` and
    `assertMinTapTarget(page, ".site-footer__link")` are their own named tests at 390px, plus a third
    test for the header link (not one of the two P1s, but the same technique, added for symmetry).
  - **Keyboard tab order + focus visibility:** first-`Tab`-reaches-skip-link with a real
    `outlineStyle !== 'none'` check, plus skip-link activation moving focus to `#main`. Narrower than
    the full "first 6 focusable elements" tab-order trace the 2026-08-15 manual pass did, but it does
    cover the one keyboard interaction this project has had a real regression story about (the skip
    link) and does check computed focus-ring visibility, not just DOM focus.
  - **FAQ accordion:** click-based single-open/close-previous test plus a keyboard (`Enter`)
    open/close test, checking `aria-expanded` and panel visibility on both the clicked and the
    previously-open item.
  - Net: genuinely covers all five areas the prior review named, at a real (if not maximal) depth —
    not a token file that merely exists.
- Ran it myself, fresh: `pnpm exec playwright install --with-deps chromium` succeeded; `pnpm
  test:e2e` (after killing a manually-started dist server so Playwright's own `webServer` step built
  and served independently) reports **19 passed (2.8s)**, zero failures, zero flaked.
- `web/playwright.config.ts`: `webServer.command` is `pnpm run build && node scripts/serve-dist.mjs
  4321`, confirming tests genuinely run against the built `dist/` output per guideline Section 19, not
  `astro dev`. `scripts/serve-dist.mjs` read in full — a plain `node:http`/`node:fs` static file
  server with a path-traversal guard (`filePath.startsWith(root)`), correctly serving `index.html` for
  directory requests. No real bug found in it; its blanket `catch { 404 }` doesn't distinguish
  "file not found" from other I/O errors, which is a minor code-smell (would misreport a permissions
  error as a 404) but not a defect that affects this project's actual usage (a read-only local `dist/`
  in CI/dev).
- `.github/workflows/ci.yml`'s `web` job: `pnpm exec playwright install --with-deps chromium` and
  `pnpm test:e2e` are real, uncommented steps after the existing `build` step, followed by an
  `actions/upload-artifact` step for the HTML report (`if: ${{ !cancelled() }}`, 14-day retention) —
  not commented out, not skipped.
- `gh run list --limit 8` shows the merge commit's CI run (`31894636124`) as `success`; `gh run view
  31894636124 --json headSha,conclusion` confirms `headSha: c1186435c7b96b0905f4988f2ca5c497540f9409`
  — the exact current `HEAD` — with `conclusion: "success"`. Not trusting the badge; independently
  matched the SHA.
- **New minor issue found, not a blocker:** `.gitignore` was updated in this fix commit to exclude
  `web/test-results/` and `web/playwright-report/` (Playwright's local output directories), but
  `web/.prettierignore` was **not** updated to match. Running `pnpm test:e2e` locally leaves
  `test-results/.last-run.json` behind (untracked, correctly gitignored), and a subsequent `pnpm
  format:check` then fails on that file until it's manually deleted (reproduced directly: format:check
  failed with `test-results/.last-run.json` flagged, passed cleanly again immediately after `rm -rf
  test-results playwright-report`). This does **not** affect CI — `ci.yml`'s `web` job runs
  `format:check` before `test:e2e`, so the artifact doesn't exist yet when the check runs — but it is
  a real rough edge for local dev: running the test suite before checking formatting (a natural order)
  produces a spurious failure. Cheap fix: add `test-results/` and `playwright-report/` to
  `.prettierignore` alongside the `.gitignore` entries already added.

### VS-05 — RESOLVED

- `web/src/components/SiteHeader.astro`: `navigation.headerLinks` now maps into `<li><a
  class="site-header__link">...</a></li>` inside a `<ul class="site-header__list">`, itself inside
  `<nav class="site-header__nav" aria-label="Primary navigation">`. Confirmed live:
  `headerNav.querySelector('ul')` truthy, 1 `<li>` (matches the single header link), zero `<a>`
  elements as direct children of `<nav>` (all now one level deeper, inside `<li>`), `aria-label`
  unchanged (`"Primary navigation"`).
- `web/src/components/SiteFooter.astro`: same pattern, `<ul class="site-footer__list">` with 5 `<li>`
  wrapping the 5 footer links, inside `<nav aria-label="Footer navigation">`. Confirmed live: 5
  `<li>` present, `aria-label` unchanged.
- No duplicate or missing links in either group (counts match the underlying `navigation.headerLinks`
  / `navigation.footerLinks` arrays: 1 and 5 respectively, same as the 2026-08-15 review recorded).
  Keyboard order is unaffected — wrapping in `<ul>/<li>` doesn't change tab order, and this was also
  implicitly re-verified by the VS-04 skip-link keyboard test passing.

## Scoped Verdict

**Approved with conditions**, scoped strictly to VS-01 through VS-05. All five are genuinely resolved
— not just claimed-resolved — verified against the actual diff, the actual rendered DOM at four real
viewports, a real Playwright run (19/19 green), and a real CI run on the exact `HEAD` commit
(`31894636124`, `success`, `headSha` matches).

The "with conditions" qualifier reflects two new, minor, non-blocking issues surfaced during this
re-review (both detailed above, neither reopens VS-01 or VS-04):

1. `web/.prettierignore` should gain `test-results/` and `playwright-report/` entries alongside the
   `.gitignore` entries this commit already added, so a local `pnpm test:e2e` run doesn't leave
   `pnpm format:check` spuriously broken until manual cleanup. Does not affect CI.
2. `studio/schemaTypes/documents/homePage.ts`'s `gapChartAnnotations[].year` sub-field should get a
   `Rule` restricting it to the 11 valid stop codes (`S1`–`S6`, `F1`–`F5`). This gap predates the fix
   commit, but the fix commit is what made it consequential — a Studio typo there now silently drops
   a chart annotation with no error anywhere in the pipeline.

**This verdict covers VS-01 through VS-05 only.** The other 8 P2s (VS-06 through VS-13) and 4 P3s
(VS-14 through VS-17) from the 2026-08-15 review below remain exactly as they were left — **open, not
re-litigated, and not affected by this verdict**. This is not full vertical-slice approval; a future
review still needs to clear those before the vertical slice as a whole can be approved.

---



Reviewer role: Bob, independent reviewer. Claude is the implementer. Bob did not edit application
code, `docs/DECISIONS.md`, or the project `HANDOFF.md`.

Governing guideline: `02-INFORMATIVE-BLOG.md`, guideline_version `1.6.0`. Framework/backend branch:
Astro site in `web/`, standalone Sanity Studio in `studio/`, no commerce backend.

Commit reviewed: `770965218abcbc048c1261c9ca0ad3f4b6bb832c` (branch `main`, working tree clean at
review time).

Review stage: **first vertical slice** — landing page rendering from the real component tree and
local fallback content (Sanity dataset is empty). No blog routes exist. This review continues past
the earlier, already-approved scaffold review recorded lower in this file
(`review/bob/CODE-REVIEW.md`'s 2026-08-14 section) and is scoped to what changed since: layouts, the
real landing-page component tree, the seed script, git/CI setup.

Verdict: **Revision required.** Four P1 findings block approval: a CMS-modeled data field that is
fetched and then silently discarded by the component that should render it, two tap-target
accessibility failures in new navigation links, and the complete absence of a Playwright test suite
for a stage whose own guideline section (19) makes browser verification a MUST. None of these are
present in the prior, already-closed scaffold review — all four are new to this vertical slice.

## Accessible Evidence

- Git repository: full history, branch `main`, single commit under review confirmed via `git log -1`.
- Local files: `docs/DECISIONS.md`, `docs/CONTENT-MODEL.md`, `HANDOFF.md` (full, both pages),
  `design/**` (`DESIGN.md`, `STATES.md`, `COPY-GAPS.md`, `ASSETS.md`), all four prior
  `review/bob/*.md` files and `BOB-REVIEWER-HANDOFF.md`, `web/**`, `studio/**`,
  `.github/workflows/ci.yml`.
- `gh` CLI: authenticated (`charliekhc`), used to confirm the CI run for the exact commit under
  review.
- Playwright MCP (`mcp__plugin_playwright_playwright__*`): available and used for real-browser
  verification against the built static output served locally (`pnpm preview`).
- Missing/not applicable evidence: no deployed preview (no Vercel project linked — confirmed
  `web/.vercel/` has only local build output, no `project.json`); no seeded Sanity content (dataset
  is empty, confirmed by design — `web`'s CI build deliberately omits `PUBLIC_SANITY_*` env vars so
  it always takes the local-fallback path); no `graphify-out/` present, so direct structural reads
  were used instead of a graph query.
- Official docs: none needed beyond what the prior scaffold review already checked (Sanity
  perspectives, unchanged this pass); WCAG 2.2 SC 2.5.8 (Target Size Minimum) applied from working
  knowledge of the current W3C Recommendation text, consistent with the project's own
  `design/STATES.md` §0 house rule, which independently sets the same ≥44×44 bar and is not in
  dispute.

## Commands Run (reproduced independently, not trusted from CI's badge alone)

- `cd web && pnpm install --frozen-lockfile` → already up to date.
- `cd web && pnpm format:check` → clean.
- `cd web && pnpm check` (`astro check`) → 0 errors, 0 warnings, 0 hints, 17 files.
- `cd web && pnpm build` → clean, 1 page built (`/index.html`).
- `cd studio && pnpm install --frozen-lockfile` → already up to date.
- `cd studio && pnpm format:check` → clean.
- `cd studio && pnpm typecheck` (`tsc --noEmit`) → clean.
- `cd studio && pnpm lint` (`eslint .`) → clean.
- `cd studio && pnpm build` (`sanity build`) → clean, only the documented auto-update version-drift
  warning (`docs/DECISIONS.md` §4d, unchanged, still an accepted policy).
- `cd studio && pnpm seed:dry-run` → 6 categories, 1 author, 3 singletons, no writes.
- `gh run list --limit 5` and `gh run list --json headSha,conclusion` → latest run
  (`31891195182`) is `success`, `headSha` matches the commit under review exactly.
- `pnpm preview --port 4325` in `web/`, then Playwright MCP against `http://localhost:4325/` at
  390×844, 560×900, 768×1024, and 1440×900 — DOM/CSSOM inspection (overflow edge-test, landmark
  counts, heading order, tap-target measurement, computed-contrast calculation), real keyboard `Tab`
  traversal, a real click on the FAQ accordion, `prefers-reduced-motion: reduce` emulation, console/
  network/response monitoring, and PNG header inspection for `og-default.png`.

All of the above match what `docs/DECISIONS.md` and `HANDOFF.md` claim for this commit — no
over-claim found in the implementer's own record for the commands re-run here.

## P1 Findings

### [P1] VS-01: CMS-modeled gap-chart data is fetched and then discarded; several other editorial figures are hardcoded in the template

- Category: objective defect
- Gate: FE-22 (content separated from presentation) / FE-34 (data flow and fetching discipline)
- Evidence:
  - `studio/schemaTypes/documents/homePage.ts:91-105` defines `problem.gapChartAnnotations`, an
    array of `{year, label}` objects, with the field description "Structured data for the gap
    chart, **if/when built**. Optional at scaffold time." The gap chart has now been built.
  - `web/src/lib/sanity/queries.ts:53` projects `gapChartAnnotations[]{_key, year, label}` inside
    the `homePageQuery`, so every build fetches this field from Sanity (or reads it from
    `web/src/lib/content/defaultLandingData.ts:170-174` in fallback mode).
  - `web/src/lib/sanity/types.ts:215-225` types the field (`GapChartAnnotation`,
    `ProblemSection.gapChartAnnotations`).
  - `web/src/pages/index.astro:147` renders `<GapChart />` with **zero props**.
  - `web/src/components/GapChart.astro:1-19` has no `interface Props`, no `Astro.props` — it
    hardcodes its own `stops` array (`"S1"..."F5"`) and `measured` record (`3: "OCT 2026", 8: "FROM
    2027", 10: "SPM"`) independently of the CMS field that exists for exactly this purpose.
  - The same pattern recurs for other on-page "big figure" callouts, all hardcoded directly in
    `index.astro` rather than sourced from any content field: `<strong>2</strong>` (independent
    checks, line ~144), `<strong>24</strong>` (years, About/portrait-fallback, line ~256, duplicating
    the fact already carried in `homePage.trustItems`), `<strong>20</strong>` (students/year,
    statPanel, line ~276), `<strong>30</strong>` (minutes free, final CTA, line ~474), and the
    `3pm to 6pm` / `8pm to 11pm` time blocks (pricing availability, lines ~364-368), each duplicating
    a fact already stated in prose fields (`trustItems`, `about.statPanel.body`,
    `pricing.availability.body`) that an editor *can* reach in Sanity.
- Failure scenario: Mr Kong's tenure passes 24 years, or the Ministry's Learning Matrix schedule in
  `trustItems`/`problem.body` is updated in Sanity once the dataset is seeded — the prose and the
  `trustItems` figure update correctly, but the large mono-numeral figures on screen (`24`, `2`,
  `20`, `30`, the chart's year/label pairs) do not, because they are literal characters in
  `.astro` source, not reads of the field an editor just changed. The page then visibly contradicts
  itself: prose says one number, the adjacent oversized figure says another.
- Why it matters: this is a maths-tuition business whose entire pitch rests on specific, checkable
  facts (years of experience, number of students, the exact months the Learning Matrix and Form 3
  assessment land). A silent mismatch between the editable prose and an un-editable large-type
  figure sitting next to it is a factual-accuracy defect a parent could actually notice, and it is
  invisible to whoever edits the content in Studio — nothing in the Studio UI signals that these
  numbers are unreachable.
- Required correction: either (a) wire `GapChart` to accept and render `homePage.problem.gapChartAnnotations` as props (the field and the fetch already exist — this is prop-plumbing, not new schema work), or (b) if the chart's specific stop/year layout is judged too structurally different from a flat annotation list to drive generically, remove the now-misleading `gapChartAnnotations` field and its "if/when built" description from the schema and record that decision in `docs/DECISIONS.md`. For the other hardcoded figures, either add typed fields for them (a `yearsExperience`, `studentsPerYear`, `checksCount` style pattern) or explicitly record in `docs/DECISIONS.md` that these are intentionally decorative, hand-synced restatements — not left silent.
- Owner: Claude
- Verification: a future review re-fetches `homePage.problem.gapChartAnnotations` with an edited
  value through the real (now-seeded) Sanity dataset and confirms the rendered `GapChart` reflects
  it, and confirms `docs/DECISIONS.md` records the chosen treatment for the remaining hardcoded
  figures.
- Status: open

### [P1] VS-02: "Blog notes" level-to-category links fail the tap-target minimum

- Category: objective defect
- Gate: Accessibility (WCAG 2.2 SC 2.5.8, AA) / design-authority continuity
  (`design/STATES.md` §0: "Tap target ≥44×44px on any surface a parent touches")
- Evidence: `web/src/pages/index.astro:222-224` renders `<a href={categoryHref(level)}>Blog
  notes</a>` inside `.level-row__heading` for each of the 4 level rows. The CSS at
  `web/src/pages/index.astro:955-959` (`.level-row__heading a`) sets only `justify-self: start`,
  `color`, and `font` — no `min-height`, no padding. Measured live in a real browser (Playwright,
  built static output, `pnpm preview`) at 390, 560, 768, and 1440px: all four "Blog notes" links
  measure **67.6 × 16.8px** at every viewport, including desktop. `computedMinH: auto`,
  `padding: 0px`.
- Failure scenario: a parent on a phone tries to tap "Blog notes" under the "Form 1 to 3" level row
  to read notes for that syllabus level; the actual hit target is 16.8px tall against the project's
  own ≥44px rule and WCAG 2.2's 24px AA floor — a real, not theoretical, mis-tap risk, and this is
  the *only* link from the landing page's Levels section into the category archive.
- Why it matters: WCAG 2.2 SC 2.5.8 (AA) failure with no applicable exception — this is a
  block-level standalone link, not inline text in a sentence, so the "inline" exception does not
  apply. It also breaks the project's own explicit global rule in `design/STATES.md` §0
  ("≥44×44px on any surface a parent touches"), the same rule the design phase already hardened
  once for the header "Blog" link and post breadcrumb "Notes" link (`design/STATES.md` §2.6). This
  link did not exist during that design pass — it is new to this vertical slice — so it slipped
  through the exact check that was specifically written to catch it.
- Required correction: apply `min-height: var(--control-h)` (or equivalent) with vertically centred
  text, matching the technique already used and verified for the header "Blog" link and post
  breadcrumb in `design/STATES.md` §2.6.
- Owner: Claude
- Verification: re-measure all 4 "Blog notes" links at 390 and 1200px; confirm ≥44×44 with no
  visual shift to sibling content (same acceptance bar as the prior header/breadcrumb fix).
- Status: open

### [P1] VS-03: Footer navigation links fail the tap-target minimum

- Category: objective defect
- Gate: Accessibility (WCAG 2.2 SC 2.5.8, AA) / design-authority continuity (`design/STATES.md` §0)
- Evidence: `web/src/components/SiteFooter.astro:22-30` renders `navigation.footerLinks` (Home,
  Pricing, FAQ, Blog, Call) directly as `<a class="site-footer__link">` inside `<nav>`. The CSS at
  `web/src/components/SiteFooter.astro:76-80` (`.site-footer__link`) sets `color`, `font`, and
  `text-decoration-color` only — no `min-height`, no padding. Measured live at 390, 560, 768, and
  1440px: all five footer links measure **~350 (or column-width) × 18.2px** at every viewport
  tested, including desktop. `computedMinH: auto`, `padding: 0px`, `display: block`.
- Failure scenario: identical in kind to VS-02 — a user tapping "Pricing" or "FAQ" in the footer
  (the only footer-level navigation on the entire site) on a touch device gets an 18px-tall target,
  well under both the WCAG 24px floor and the project's 44px house rule, on every page this footer
  ships on (today: the landing page; later: every blog page too, since `SiteFooter` is the shared
  footer).
- Why it matters: same WCAG 2.2 SC 2.5.8 AA failure as VS-02, at greater blast radius — `SiteFooter`
  is a shared, reused component, so this defect will ship on every future blog/category/post page
  unless fixed once, here, at the source.
- Required correction: give `.site-footer__link` a `min-height: var(--control-h)` (or the
  established negative-margin technique used elsewhere in this codebase to keep visual density
  intact while growing the hit area) so all 5 links meet ≥44×44 without visually enlarging the
  footer's letter-spacing/line rhythm.
- Owner: Claude
- Verification: re-measure all footer links at 390 and 1200px; confirm ≥44×44, no horizontal
  overflow introduced, footer visual rhythm unchanged.
- Status: open

### [P1] VS-04: No Playwright test suite exists for this vertical slice

- Category: guideline mismatch
- Gate: guideline Section 19 (Testing and Browser Verification, MUST) / Definition of Done
  ("CI green; Playwright suite green")
- Evidence: `web/package.json` has no `@playwright/test` dependency and no `test`/`test:e2e`
  script; no `web/tests/` directory exists; `.github/workflows/ci.yml`'s `web` job has no test step
  (`docs/DECISIONS.md` §18 itself records "no test script exists yet in either package"). `docs/
  DECISIONS.md` §4's version baseline explicitly earmarked `@playwright/test: 1.62.1 (not yet
  installed — add with the first Playwright verification pass)` — this vertical slice is that
  pass, and it did not happen. All of the browser verification in this review (overflow, tap
  targets, landmarks, heading order, keyboard focus, FAQ interaction, contrast, reduced motion) was
  performed by Bob, ad hoc, against the locally built output — none of it is committed to the repo,
  none of it runs in CI, and none of it will catch a regression on the next commit.
- Failure scenario: a future change reintroduces the header-nav-hidden-on-mobile bug that was
  already found and fixed once this session (`HANDOFF.md`'s 2026-08-15 "Header mobile-nav-hide
  fixed" entry) — nothing in CI would catch it, because there is no automated browser check at all.
- Why it matters: guideline Section 19 states the testing order as a MUST ("...8. Playwright browser
  verification...") specifically before a design/accessibility review pass, and the Definition of
  Done has an explicit, currently-unchecked box for "CI green; Playwright suite green." This is not
  a documentation gap — it is the complete absence of the regression-protection layer the guideline
  requires before treating a vertical slice as reviewable, for a real client site with real users.
- Required correction: add `@playwright/test` as a devDependency, write a Playwright suite covering
  at minimum: mobile/desktop/tablet overflow, the two tap-target regressions above once fixed,
  landmark/heading structure, keyboard tab order and focus visibility, and the FAQ accordion
  interaction — then wire it into the `web` CI job as a real test step.
- Owner: Claude
- Verification: `web`'s CI job runs a Playwright test step and is green; `review/bob/*` for the next
  review cites the suite's own pass/fail output rather than a fresh ad hoc browser pass.
- Status: open

## P2 Findings

### [P2] VS-05: Header and footer navigation links are not marked up as lists

- Category: objective defect
- Gate: FE-04 (repeated siblings are a list)
- Evidence: `web/src/components/SiteHeader.astro:24-32` and
  `web/src/components/SiteFooter.astro:22-30` both map `navigation.headerLinks` /
  `navigation.footerLinks` directly into sibling `<a>` elements as direct children of `<nav>`, with
  no `<ul>`/`<ol>` wrapper. FE-04 explicitly names "navigation sets" as required to use a list
  "regardless of visual presentation."
- Failure scenario: a screen-reader user landing on either `<nav>` does not get the "list of 1 item"
  (header) / "list of 5 items" (footer) navigation cue that list semantics provide, losing a
  standard orientation signal for how many links are in the group and where they end.
- Why it matters: every other repeated-sibling group on this same page (session cards, level rows,
  FAQ items, process steps) correctly uses `<ul>`/`<ol>` — the two navs are the only exception, and
  FE-04 draws no exception for navigation menus.
- Required correction: wrap both link maps in `<ul>`/`<li>` (styled with `list-style: none` and
  `display: flex`/`inline-flex` as already used elsewhere in this codebase, so no visual change is
  required).
- Owner: Claude
- Verification: `rg -A2 '<nav' web/src/components/Site{Header,Footer}.astro` shows a `<ul>` between
  `<nav>` and the mapped `<a>` elements.
- Status: open

### [P2] VS-06: FAQ answers 2 through 13 are inaccessible without JavaScript

- Category: objective defect
- Gate: FE-32 (no JS for what the platform already does / content visibility must not depend on JS)
- Evidence: `web/src/pages/index.astro:448-449` server-renders each FAQ panel with
  `hidden={!open}` where `open = index === 0` (line 432) — so in the static HTML, 12 of 13 answer
  panels ship with the `hidden` attribute and no other reveal mechanism. The only way to open them
  is the `<button>` click handler wired in the inline `<script>` at lines 497-523, which has no
  `href` fallback (buttons, correctly per FE-05, are not links). Verified in a real browser that the
  script does load and the accordion works correctly when JS runs (clicking question 3 correctly
  sets `aria-expanded`, unhides its panel, removes `inert`, and closes/reinerts question 1) — the
  gap is specifically the no-JS case.
- Failure scenario: JavaScript fails to execute (network interruption on the script request, an
  aggressive extension/CSP in a future revision, a bot/crawler that does not execute JS) — 12 of the
  13 FAQ answers, a meaningful fraction of the page's actual content, become permanently
  unreachable, with no visible affordance suggesting they even exist beyond the closed question
  text.
- Why it matters: guideline Section 2's platform-first principle and FE-32 both state baseline
  content visibility MUST NOT depend on JS succeeding. A native `<details>`/`<summary>` element
  would deliver the identical open/close behavior, remain fully functional with zero JavaScript, and
  still support the custom chevron/typography styling already built (`::marker` can be suppressed
  and replaced with the existing `<i>` chevron via CSS).
- Required correction: convert the FAQ list to `<details>`/`<summary>` (retaining the visual design)
  or, if the exclusive single-open-panel behavior is judged essential and worth the JS dependency,
  record that tradeoff explicitly in `docs/DECISIONS.md` rather than leaving it silent.
- Owner: Claude
- Verification: disable JavaScript in a real browser and confirm all 13 FAQ answers remain reachable.
- Status: open

### [P2] VS-07: No JSON-LD structured data anywhere on the shipped page

- Category: guideline mismatch
- Gate: guideline Section 14 (SEO and Structured Data)
- Evidence: `rg -n "application/ld\+json|schema.org" web/src` returns no matches anywhere in the
  codebase. `docs/CONTENT-MODEL.md:151` records an intent to render `BlogPosting` JSON-LD on future
  posts, but nothing plans or implements `Organization` (or a more specific business type) JSON-LD
  for the site generally, and the guideline requires it "sitewide," not only on posts.
- Failure scenario: none visible today (the site isn't crawled/deployed), but this is the actual
  landing page content for a real business — search engines get no structured entity data at all
  for the business itself, only whatever generic `<title>`/meta tags provide.
- Why it matters: guideline Section 14 states "JSON-LD: `Organization` or the most specific
  applicable business type sitewide" as a requirement, not a post-only nicety. This was never
  implemented and never recorded as a deferred/accepted decision anywhere in `docs/DECISIONS.md`.
- Required correction: add `Organization` (or `EducationalOrganization`/similar, whichever is most
  specific and accurate) JSON-LD to `BaseLayout.astro`, sourced from `siteSettings`, before this is
  treated as SEO-complete.
- Owner: Claude
- Verification: `curl` the built page and confirm a valid `application/ld+json` `Organization` block
  is present; validate with Google's Rich Results Test or the Schema.org validator.
- Status: open

### [P2] VS-08: No security headers configured

- Category: guideline mismatch
- Gate: guideline Section 18 (Security)
- Evidence: no `vercel.json` exists anywhere in the repository (`find . -iname vercel.json` returns
  nothing); no Astro middleware sets response headers; `rg -n "X-Frame-Options|X-Content-Type-
  Options|Content-Security-Policy|Referrer-Policy" web` returns no matches. Confirmed via a live
  response-header inspection of the built preview server: only default `cache-control`,
  `content-encoding`, `content-type`, `etag`, `vary` — none of the four headers the guideline names.
- Failure scenario: the site ships to production with no `X-Content-Type-Options`, no
  `Referrer-Policy`, no framing protection, and no CSP at all — none of these cost anything to add
  even with zero third-party scripts on the page today.
- Why it matters: guideline Section 18 states these headers as a MUST regardless of whether forms or
  analytics are present yet. This is inexpensive to add now and gets harder to retrofit correctly
  once GTM/analytics tags are eventually added (the guideline itself notes "GTM requires care —
  document what was relaxed and why").
- Required correction: add a `vercel.json` `headers` block (or Astro middleware, given the
  `@astrojs/vercel` adapter is already in use) setting at minimum `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` (or `frame-ancestors
  'none'` via CSP), and a baseline CSP appropriate to the current all-static, no-third-party-script
  page.
- Owner: Claude
- Verification: production response headers include all four; CSP does not break the Google Fonts
  request already in use (or self-hosting, per VS-11, removes the need to allowlist it).
- Status: open

### [P2] VS-09: No automated dependency/advisory scanning in CI

- Category: guideline mismatch
- Gate: guideline Section 18 (Security) — "automated advisory scanning in CI"
- Evidence: `.github/workflows/ci.yml`'s two jobs run `format:check`, typecheck, `lint` (studio
  only), and `build` only (confirmed by direct read and by `docs/DECISIONS.md` §18's own job table).
  No `pnpm audit` step, no Dependabot config (`find .github -type f` shows only `ci.yml`), no other
  advisory-scanning tool.
- Failure scenario: a dependency in either `web/` or `studio/` receives a high/critical advisory
  after this commit; nothing in CI surfaces it, and there is no scheduled scan to catch it later
  either.
- Why it matters: explicitly named in guideline Section 18 ("Dependencies: committed lockfile,
  automated advisory scanning in CI, and no unmaintained packages on security-relevant paths").
  Lockfiles are committed correctly; the scanning half is missing.
- Required correction: add a `pnpm audit --prod` step (or GitHub's native Dependabot alerts, which
  requires no CI change) to at least one recurring check.
- Owner: Claude
- Verification: a CI run (or Dependabot alert feed) shows advisory scanning is active for both
  package roots.
- Status: open

### [P2] VS-10: Fonts still load from Google Fonts, not self-hosted

- Category: guideline mismatch (previously flagged, confirmed still unresolved in the shipped build)
- Gate: guideline Section 17 (Performance Budgets — "self-host when permitted")
- Evidence: `web/src/styles/tokens/fonts.css:6` still contains `@import
  url("https://fonts.googleapis.com/css2?family=IBM+Plex...")`, with its own comment already noting
  this should become local `@font-face` rules. Verified live in a real browser: loading the built
  page issues a request to `fonts.googleapis.com` for the CSS, then 7 separate requests to
  `fonts.gstatic.com` for the actual `.woff2` files — three extra cross-origin round trips before
  any text using those faces can render.
- Failure scenario: none new — this was already recorded in `design/ASSETS.md` §3 as a known
  pre-launch task ("self-hosting is a delivery task, not a decision"). Recorded here because the
  vertical-slice stage is exactly when this should have been picked up, and the review instructions
  ask that known-but-still-open constraints be verified rather than silently accepted.
- Why it matters: IBM Plex ships under the SIL Open Font License, which permits self-hosting with no
  licensing blocker — the fix is mechanical, not a decision that needs to wait on anyone. Every
  extra cross-origin hop before text renders is a real LCP cost the guideline's ≤2.5s target has to
  absorb.
- Required correction: download and subset the IBM Plex Serif/Sans/Mono weights actually used,
  self-host as local `@font-face` rules with `font-display: swap`, remove the Google Fonts
  `@import`.
- Owner: Claude
- Verification: no `fonts.googleapis.com`/`fonts.gstatic.com` requests in the built page's network
  activity.
- Status: open (accepted-known, not newly discovered — re-confirmed still unresolved)

### [P2] VS-11: Old-site redirects still not implemented, despite their targets now existing

- Category: guideline mismatch (previously flagged, confirmed still unresolved)
- Gate: guideline Section 1 / Section 14 — redirect map is a deliverable
- Evidence: the six URL mappings recorded in `docs/DECISIONS.md` §10 (`/about/` → `/#about`,
  `/faq/` → `/#faq`, `/pricing/` → `/#pricing`, etc.) exist only as a documentation table; no
  `vercel.json` redirects block, no Astro middleware, nothing executable. Notably, three of the six
  targets (`#about`, `#faq`, `#pricing`) now genuinely exist as real, working anchors on the shipped
  landing page (confirmed: `id="about"`, `id="faq"`, `id="pricing"` all present in
  `web/src/pages/index.astro`) — the redirect implementation is no longer blocked on anything, only
  not yet done.
- Failure scenario: if `mathematicsmalaysia.com` were cut over today, a visitor or search engine
  following an indexed `/about/` or `/faq/` URL would hit a 404 instead of landing on the working
  section that already exists for it.
- Why it matters: this doesn't block continued development (the site is not deployed), but it is a
  deliverable the guideline requires to be "tested against the staging build before DNS changes,"
  and three of the six targets have gone from "planned" to "actually buildable right now" this
  session.
- Required correction: implement the six mappings as `vercel.json` redirects (or Astro middleware)
  and test each in a preview deploy once one exists.
- Owner: Claude
- Verification: each of the six old URLs resolves in one hop to its documented target on a preview
  deployment.
- Status: open (accepted-known, not newly discovered — re-confirmed still unresolved, and re-flagged
  because three of six targets are no longer blocked on anything)

### [P2] VS-12: No FE-xx self-check recorded for the vertical slice

- Category: guideline mismatch
- Gate: guideline Section 9 (MUST — "Before requesting review you MUST record an FE self-check")
- Evidence: `docs/DECISIONS.md` §16 contains only the scaffold-stage FE self-check (dated
  2026-08-14, explicitly scoped to "the scaffold only"). No new self-check section exists for the
  vertical slice, and no vertical-slice work references one. `HANDOFF.md`'s own 2026-08-15
  verification entry names this exact gap as item 9 on its pending list.
- Failure scenario: none directly (this review's own `review/bob/FE-GATE-AUDIT.md` is the audit of
  record regardless, per the guideline's own instruction that the self-check is input, never a
  substitute) — but its absence means the implementer's own accounting of what changed and why was
  never written down before requesting this review, which is the actual value the self-check is
  supposed to provide.
- Why it matters: explicit MUST in Section 9, and a repeat of the exact gap the scaffold review
  already caught once (P2-DEV-07 in the earlier scaffold review, resolved then).
- Required correction: add a vertical-slice-stage FE self-check section to `docs/DECISIONS.md`
  before the next review request.
- Owner: Claude
- Verification: `docs/DECISIONS.md` contains a dated vertical-slice FE self-check section.
- Status: open

### [P2] VS-13: Header brand/logo link is under the project's own 44×44 tap-target rule

- Category: objective defect
- Gate: design-authority continuity (`design/STATES.md` §0)
- Evidence: `web/src/components/SiteHeader.astro:17-23` (`.site-header__brand`, styled at lines
  58-66) has no `min-height`. Measured live at 390/560/768px: **114.4 × 40.3px** — under the
  project's ≥44px rule by 3.7px (comfortably clears the WCAG 2.2 24px AA floor).
- Failure scenario: minor — the shortfall is small and the link is large in the other dimension, so
  practical mis-tap risk is low, but it is a real, measured violation of a rule the project applies
  to "any surface a parent touches," and the logo link is exactly that (it navigates home).
- Why it matters: consistency with the same rule already enforced on every other header/footer
  control in this codebase.
- Required correction: add `min-height: var(--control-h)` to `.site-header__brand`.
- Owner: Claude
- Verification: re-measure at 390/1200px, confirm ≥44px tall with no visual shift.
- Status: open

## P3 Findings

### [P3] VS-14: Skip link is 1.6px short of the house 44×44 rule

- Category: preference / minor objective defect
- Gate: design-authority continuity (`design/STATES.md` §0)
- Evidence: `web/src/layouts/BaseLayout.astro:60-74` (`.skip-link`) measures **120 × 42.4px** on
  keyboard focus. WCAG 2.2 SC 2.5.8 (24px) is comfortably met; the project's own 44px rule is missed
  by 1.6px.
- Why it matters: negligible in practice — the skip link is keyboard-only, appears for a fraction of
  a second before the user tabs past it, and is not a "surface a parent touches" in the sense the
  house rule was written for. Noted for completeness only.
- Required correction: optional — add ~2px of vertical padding if full internal consistency with the
  44px rule is desired.
- Owner: Claude
- Verification: re-measure on focus.
- Status: open

### [P3] VS-15: Sitemap, robots.txt, and RSS still not wired

- Category: guideline mismatch (expected-incomplete at this stage, not a regression)
- Gate: guideline Section 14 / Definition of Done
- Evidence: `astro.config.mjs` does not include `@astrojs/sitemap` in `integrations` despite it
  being an installed dependency; `web/public/` has no `robots.txt`; `web/dist/` after a clean build
  contains no `sitemap.xml`, `robots.txt`, or `rss.xml`. This matches what `HANDOFF.md` and the
  prior scaffold review already recorded as intentionally deferred until real routes exist.
- Why it matters: low urgency today (one route, no blog posts to feed an RSS feed yet, site not
  deployed), but this is an explicit Definition-of-Done line item and should not be forgotten once
  blog routes land.
- Required correction: wire `@astrojs/sitemap`, add a static `robots.txt`, and add `/rss.xml` once
  blog posts exist.
- Owner: Claude
- Verification: `dist/` contains all three after the blog-routes vertical slice.
- Status: open (accepted-known, re-confirmed still unresolved)

### [P3] VS-16: FAQ accordion is custom-built rather than native `<details>`/`<summary>`

- Category: preference
- Gate: FE-32/FE-60 spirit (platform-first, decision ladder), see also P2 VS-06 above for the
  concrete defect this preference would also fix
- Evidence: `web/src/pages/index.astro:497-523`.
- Why it matters: not a defect in itself — the current implementation is fully accessible and
  correctly wired (`aria-expanded`, `aria-controls`, `role="region"`, `inert`, verified working in a
  real browser) — but a native element would deliver the same result with less custom code and no
  no-JS failure mode (see VS-06).
- Required correction: none required standalone; consider alongside fixing VS-06.
- Owner: Claude
- Verification: n/a (preference).
- Status: open

### [P3] VS-17: `index.astro` is a very large single-file component

- Category: preference
- Gate: FE-21 (spirit, not violation — no duplication found)
- Evidence: `web/src/pages/index.astro` is ~500 lines of markup plus ~970 lines of scoped CSS
  covering all 10 landing sections in one file.
- Why it matters: nothing here is duplicated or copy-pasted (FE-21's actual concern), so this is not
  a finding against the gate — but as blog templates are built next and start sharing visual
  language with this page, some of these section blocks (pricing table, FAQ accordion, process
  list) may be worth extracting before a second near-identical instance appears elsewhere, per
  FE-20's "extract on reuse" trigger.
- Required correction: none now; revisit when blog templates are built if genuine reuse emerges.
- Owner: Claude
- Verification: n/a (preference).
- Status: open

## Resolved / Unaffected From the Scaffold Review

Everything the prior scaffold review (`review/bob/CODE-REVIEW.md`'s 2026-08-14 sections, preserved
below) closed remains closed — re-verified directly rather than trusted:

- `perspective: "published"` on the default `sanityClient`, gated `createPreviewClient()` — still
  correct (`web/src/lib/sanity/client.ts:14-47`, unchanged since the scaffold review).
- No `href="#"` anywhere (`rg 'href="#"' web/src` — no matches).
- GROQ helpers use explicit projections throughout `queries.ts`, including the new home-page query.
- Token files remain byte-identical to `design/tokens/`.
- Studio dependency pinning and the documented auto-update policy remain unchanged and still
  accurate.

## Carry-Forward Conditions (unchanged, not re-litigated)

- CI/branch-protection: `.github/workflows/ci.yml` is green on the exact commit under review
  (verified via `gh run list`, `headSha` matches). Branch protection is blocked by GitHub's Free org
  plan on a private repo (confirmed 403 on both APIs per `docs/DECISIONS.md` §18) — this is the
  owner's explicit, stated-tradeoff decision and is **not** re-opened here; noted only as a residual
  risk under Pass 13 below.
- Prior design-review launch conditions (portrait, brand-mark sign-off, WhatsApp glyph asset,
  disabled-note legibility, richer brand evidence, report empty-state strings, Mr Kong-reviewed blog
  copy/maths) remain open and unchanged — these are owner/client decisions, not implementation
  defects, and are not re-derived as findings here.

## Review Passes — Status Summary

1. **Scope, gates, and decision integrity** — Reviewed. Decisions record is internally consistent;
   no undocumented scope creep found (no forms, no analytics, no i18n added silently).
2. **Design-authority fidelity and continuity** — Mostly faithful; two new tap-target regressions
   (VS-02, VS-03, VS-13) against the project's own explicit `STATES.md` §0 rule, introduced by new
   vertical-slice code the design phase never saw.
3. **FE-xx engineering gates** — see `review/bob/FE-GATE-AUDIT.md` for the full gate-by-gate table.
   FE-04, FE-22, FE-32, FE-34 fail or partially fail this pass; most others pass.
4. **Accessibility (WCAG 2.2 AA)** — SC 2.5.8 (Target Size) fails at 3 locations (VS-02, VS-03,
   VS-13/VS-14 minor). Contrast sampled across 11 selectors in dev-authored areas, all pass (lowest
   ratio measured: 5.90:1, well above the 3:1 large-text / 4.5:1 body-text floors). Keyboard tab
   order is logical and correct; focus rings are visible and consistent (`2px solid rgb(43, 68,
   104)`) on every focusable element tested. Skip link works correctly once its transition settles.
   Landmarks and heading hierarchy are structurally sound (verified live: 1 `h1`, 1 `main`, 1
   `header`, 1 `footer`, 2 distinctly-labelled `nav`s, no skipped heading levels, at all four tested
   viewports).
5. **Responsive behavior and content resilience** — Pass. `document.scrollWidth === clientWidth` at
   390/560/768/1440. The pricing table's edge overflow at narrow widths is intentional and correctly
   contained in its own `overflow-x: auto` wrapper (`FE-14`'s explicitly endorsed pattern), not a
   defect. The previously-fixed header-nav-hidden-below-560px regression (`HANDOFF.md` 2026-08-15) is
   confirmed still fixed (`nav` computed `display: flex` at 390px).
6. **Architecture, framework, and data flow** — Astro-only, no React, no hydration directives; FAQ
   interactivity uses a plain inline script rather than a client-side island — correct per FE-31/33.
   `getLandingPageData()` fetches homePage/siteSettings/navigation/categories in parallel
   (`Promise.all`), correctly avoiding an avoidable waterfall (FE-34). The GapChart data-flow defect
   (VS-01) is the one real gap in this pass.
7. **Forms, validation, and lead handling** — N/A, verified genuinely so. No form markup, no
   `Astro.action`, no Zod, no Resend/Turnstile packages anywhere in `web/` or `studio/`. Matches
   `docs/DECISIONS.md` §11's recorded decision.
8. **SEO and structured data** — Partial. `<title>`, meta description, canonical, OG/Twitter tags all
   present and correct (OG image dimensions verified to match the actual PNG's real 1200×630
   pixels). No JSON-LD anywhere (VS-07). No sitemap/robots/RSS yet (VS-15, expected-incomplete).
9. **Analytics, consent, and privacy** — N/A, verified genuinely so. `rg -ni
   "gtag|gtm|google-analytics|dataLayer|analytics"` across `web/src` and `astro.config.mjs` returns
   no matches. Matches `docs/DECISIONS.md` §12's recorded decision.
10. **Performance** — No Lighthouse run performed (no Lighthouse/Chrome DevTools tool available in
    this session; this claim is explicitly marked unverified rather than asserted). Page weight is
    light by direct measurement: `dist/index.html` 47,115 bytes, one CSS file 44,197 bytes, zero
    client JS beyond a small inline FAQ script. The one real, measured performance gap is VS-10
    (fonts not self-hosted — 3 extra cross-origin round trips before text can render in the brand
    typefaces).
11. **Security and secrets** — No secrets found in tracked files (targeted grep for common secret
    patterns across the repo returned nothing; both `.env.example` files contain only variable names
    with empty values and accurate comments). Read-token/write-token separation is correct and
    unchanged from the scaffold review. Gaps: no security headers (VS-08), no advisory scanning
    (VS-09).
12. **Commerce correctness** — Skipped, explicitly N/A. This project has no e-commerce, cart, or
    payment surface at any stage.
13. **Testing, CI, and verification evidence** — CI (`.github/workflows/ci.yml`) reproduced locally
    command-for-command with identical results to what `docs/DECISIONS.md` claims; `gh run list`
    confirms the latest run (`31891195182`) is green on `headSha
    770965218abcbc048c1261c9ca0ad3f4b6bb832c`, the exact commit under review. Branch protection
    remains blocked by the GitHub Free-org plan limitation, an owner-accepted residual risk per the
    review brief — not re-litigated here, but worth restating plainly: `main` is currently
    push-able by anyone with write access with no CI gate enforced by GitHub itself, only by team
    discipline. The bigger gap in this pass is VS-04 (no Playwright suite at all).
14. **Live-site replacement** — Skipped, explicitly N/A. Confirmed via `HANDOFF.md`'s 2026-08-10
    entry: no live predecessor site with equity to preserve under this project's actual scope (the
    six known-URL redirects in `docs/DECISIONS.md` §10 are a lightweight continuity gesture, not a
    revamp with a Stage 0R audit).
15. **Documentation, handoff, and operational readiness** — `HANDOFF.md` and `docs/DECISIONS.md` are
    detailed, dated, and — everywhere independently checked in this review — accurate to what is
    actually in the repository. No over-claim found. `README.md` files remain project-specific
    (unchanged from the scaffold review, not re-audited word-for-word this pass since no new setup
    steps were added).

## Verdict

**Revision required.** Four open P1 findings (VS-01 through VS-04) prevent approval: a discarded
CMS data field with real content-accuracy risk, two shipped tap-target accessibility failures, and
the complete absence of the Playwright test suite this review stage's own guideline section
requires. Nine P2 findings and four P3 findings are recorded for the same or a follow-up pass. None
of the four P1s require large rework — each is a scoped, mechanical fix (prop-plumb one component,
add `min-height` to two selectors, install and write a first Playwright suite) — but per the
guideline's severity rules, none may be waved through without being fixed or explicitly downgraded
with a written isolation rationale, and none currently has one.

---

# Bob Code Review - Just Math Malaysia Development Scaffold Re-Review

*(Preserved as history. This section covers the scaffold stage reviewed and approved on 2026-08-14,
before any real page template existed. It is superseded, not replaced, by the vertical-slice review
above.)*

Date: 2026-08-14

Reviewer role: Bob, independent reviewer. Claude is the implementer. Bob did not edit application
code, `docs/DECISIONS.md`, or the project `HANDOFF.md`.

Governing guideline: `02-INFORMATIVE-BLOG.md`, guideline_version `1.6.0`. Framework/backend branch:
Astro site in `web/`, standalone Sanity Studio in `studio/`, no commerce backend.

Review stage: scaffold re-review after Claude's fix pass. Scope is limited to initialization
records, Astro/Sanity scaffold, schema/query contracts, token wiring, and claimed verification
commands. This is not vertical-slice, feature-complete, preview-deploy, seeded-content, browser,
CI, or launch approval.

Verdict: **Approved for the next controlled development step.** The previous P1, P2, and P3
scaffold findings are resolved or accepted as documented risk. No open scaffold findings remain. The
next review still needs real page rendering, browser/a11y checks, seeded or mocked content evidence,
and route-level tests once a vertical slice exists.

## Accessible Evidence

- Local files: `docs/DECISIONS.md`, `docs/CONTENT-MODEL.md`, `HANDOFF.md`, `design/**`,
  `review/bob/REVIEW.md`, `review/bob/APPROVAL-CHECKLIST.md`, `BOB-REVIEWER-HANDOFF.md`,
  `web/**`, and `studio/**`.
- Prior design review: `review/bob/REVIEW.md` approved the design package with launch conditions.
- Missing evidence by scope: no Git repository at the active root, no commit under review, no CI, no
  preview deployment, no Playwright, no seeded Sanity content, and no real frontend vertical slice.
- Graphify: no `graphify-out/graph.json`; direct structural reads used.
- Official docs checked: Sanity Content Lake perspectives
  (`https://www.sanity.io/docs/content-lake/perspectives`) and Sanity preview guidance
  (`https://www.sanity.io/docs/content-lake/presenting-and-previewing-content`). These confirm that
  production reads should use `published`, while draft preview uses `drafts`.

## Commands Run

- `diff -rq design/tokens web/src/styles/tokens` passed with no output.
- `rg 'href="#"' web/src` returned no matches.
- `rg -n "perspective: \"drafts\"|perspective: \"published\"|createPreviewClient|ENABLE_SANITY_PREVIEW" web/src/lib/sanity/client.ts web/src/env.d.ts`
  showed `published` on the default client and `drafts` only in `createPreviewClient()`.
- `web`: `pnpm build` passed.
- `web`: `pnpm check` passed with 0 errors, 0 warnings, 0 hints.
- `web`: `pnpm format:check` passed.
- `studio`: `pnpm typecheck` passed.
- `studio`: `pnpm lint` passed.
- `studio`: `pnpm format:check` passed.
- `studio`: sandboxed `pnpm build` failed on restricted DNS to `sanity-cdn.com`; escalated
  `pnpm build` passed. The remaining Sanity auto-update/runtime warning matches the documented
  policy in `docs/DECISIONS.md:142-164`.

## Resolved Findings

### [P1] P1-DEV-01: production Sanity reads can leak draft perspective

Status: **resolved**.

Evidence: `web/src/lib/sanity/client.ts:14-21` now keeps `sanityClient` on
`perspective: "published"` regardless of token presence. Draft access moved to the separate
`createPreviewClient()` at `web/src/lib/sanity/client.ts:30-46`, gated by both
`ENABLE_SANITY_PREVIEW=true` and `SANITY_API_READ_TOKEN`.

Bob assessment: this fixes the production-private-dataset failure mode. Token presence is now only
authentication; it does not widen public fetch perspective.

### [P1] P1-DEV-02: green `href="#"` smoke-page control

Status: **resolved**.

Evidence: `web/src/pages/index.astro:25-31` now renders a non-interactive labelled token swatch
instead of an anchor. `rg 'href="#"' web/src` returned no matches.

Bob assessment: the current smoke page no longer violates FE-05 with a placeholder link. The
WhatsApp-green semantic rule must still be enforced when the real CTA component lands.

### [P2] P2-DEV-01: CMS-authored navigation and redirect URLs are not allowlisted

Status: **resolved for scaffold**.

Evidence: `studio/schemaTypes/objects/navItem.ts` validates `href` by `kind`: internal `/`,
fragment `#`, external `https://`, WhatsApp `https://wa.me/`, and telephone `tel:`. `studio/schemaTypes/documents/redirect.ts`
validates redirect `from` as `/` and `to` as either `/` or `https://`.

Bob assessment: the schema now enforces URL shape before frontend rendering/redirect code trusts the
content. More exhaustive URL unit tests should be added when link/redirect runtime logic is built.

### [P2] P2-DEV-02: TypeGen deferred and broad CMS result types

Status: **resolved for scaffold**.

Evidence: `web/src/lib/sanity/types.ts` now defines explicit homepage section types and a typed
Portable Text union for `post.body`. `rg` found no broad `unknown` in `web/src/lib/sanity/types.ts`
or query helper signatures; the remaining `unknown` is confined to a Studio validation-context cast.
`docs/DECISIONS.md:125-132` correctly records that these are hand-authored, not generated.

Bob assessment: explicit result types are sufficient for scaffold review because no components
consume CMS content yet. Sanity TypeGen remains a future hardening task once real page queries and
routes exist.

### [P2] P2-DEV-03: whole-document GROQ fetches and category dereference filter

Status: **resolved for scaffold**.

Evidence: `web/src/lib/sanity/queries.ts:21-145` now uses explicit projections for singleton,
navigation, post, category, and redirect helpers. `web/src/lib/sanity/queries.ts:134-140` resolves
the category slug to `_id` inside the query and filters posts with `references(...)`, instead of
dereferencing `categories[]->slug.current` per candidate post.

Bob assessment: the query layer is now reviewable against explicit result types. When static path
generation lands, add route-level checks for missing/legacy slugs and empty result states.

### [P2] P2-DEV-04: documented slug constraints are not enforced

Status: **resolved for scaffold**.

Evidence: `studio/schemaTypes/lib/slugValidation.ts:12-27` enforces lowercase hyphenated slugs and
checks duplicate draft/published pairs by document type. The helper is used by post, category, and
author slug fields.

Bob assessment: schema-level routed-slug enforcement now matches the content model. Add route-query
guards such as `defined(slug.current)` when real static-path generation is implemented.

### [P2] P2-DEV-05: Studio dependency/runtime control

Status: **resolved as accepted documented risk**.

Evidence: `studio/package.json` package versions are pinned to exact versions. `docs/DECISIONS.md:142-164`
records the deliberate choice to keep hosted Studio `autoUpdates: true`, with owner, risk, test
cadence, and rollback path. `studio` build still warns that the hosted runtime is ahead of local
`sanity`/`@sanity/vision`, but the warning now corresponds to an explicit operational policy.

Bob assessment: accepted for this scaffold because Studio is internal admin tooling and the risk is
documented. Re-check this policy before a public/shared Studio handoff.

### [P2] P2-DEV-06: setup documentation is scaffold boilerplate

Status: **resolved for scaffold**.

Evidence: `web/README.md` and `studio/README.md` are now project-specific and cover purpose,
commands, environment, deployment/runtime behavior, and deferred work.

Bob assessment: enough for a developer handoff at scaffold stage. Root-level documentation can be
expanded once both package roots have real runtime flows.

### [P2] P2-DEV-07: missing Claude FE self-check

Status: **resolved**.

Evidence: `docs/DECISIONS.md:360-407` records Claude's scaffold-stage FE self-check with per-gate
results and evidence.

Bob assessment: the self-check now exists and matches the scaffold scope. Bob's audit remains the
independent record.

### [P3] P3-DEV-01: token-copy evidence was not byte-verbatim

Status: **resolved**.

Evidence: `diff -rq design/tokens web/src/styles/tokens` passed with no output. `web/.prettierignore:6-8`
excludes the copied token directory so formatting will not silently rewrite the design-authority
files again.

Bob assessment: token evidence is now truthful and repeatable.

## Final Cleanup Resolved

### [P3] P3-DEV-02: stale Sanity perspective decision note

Status: **resolved**.

Evidence: `docs/DECISIONS.md:121-128` now says the default `sanityClient` always fetches with
`perspective: 'published'`, regardless of `SANITY_API_READ_TOKEN`, and that
`createPreviewClient()` is the only `drafts` path gated by both the token and
`ENABLE_SANITY_PREVIEW=true`. A sweep of `HANDOFF.md`, `web/README.md`, `web/.env.example`, and
`web/src/lib/sanity/client.ts` found no stale current-behavior wording.

Bob assessment: the documentation now matches the implemented published/preview split.

## Carry-Forward Conditions

- This is scaffold approval only. The landing page vertical slice still needs real Sanity-backed
  rendering or fixture evidence, browser/mobile/a11y checks, and route-level behavior review.
- `@astrojs/sitemap` remains intentionally unconfigured until real routes exist; verify it does not
  stay dead weight once routes land.
- Sanity TypeGen is still deferred. Explicit hand-authored types are acceptable at this stage, but
  the TypeGen decision should be revisited once the query set stabilizes.
- Prior design-review launch conditions remain open and unchanged: portrait/typographic fallback,
  adopted-mark sign-off, WhatsApp glyph asset/removal decision, Mr Kong-reviewed blog content/math,
  FAQ count binding, report strings, and owner copy decisions.
