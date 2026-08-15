# Bob FE Gate Audit — Vertical Slice Review

## 2026-08-16 — Scoped re-review of the fix commit

Scope: re-check only the two gates the 2026-08-15 audit below failed outright (FE-04, FE-22) plus the
data-flow half of FE-34 and the P2 isolation-rationale gate FE-32 was recorded against, against fix
commit `05ab713` (`HEAD c1186435c7b96b0905f4988f2ca5c497540f9409`). Every other gate's 2026-08-15
result stands unchanged and is **not re-audited here** — the fix commit didn't touch the areas those
gates cover (forms, hydration, registry, dependency ladder, etc.).

| Gate | 2026-08-15 result | 2026-08-16 result | Evidence |
| --- | --- | --- | --- |
| FE-04 Repeated siblings are a list | **Fail** | **Pass** | `web/src/components/SiteHeader.astro` and `web/src/components/SiteFooter.astro` both now wrap their link maps in `<ul>/<li>` inside `<nav>`. Confirmed live in a real browser: header `<nav>` contains a `<ul>` with 1 `<li>`, footer `<nav>` contains a `<ul>` with 5 `<li>`, zero `<a>` elements as direct children of either `<nav>` anymore. Both `aria-label`s (`"Primary navigation"`, `"Footer navigation"`) unchanged. Link counts match the underlying data (1 header, 5 footer) — no duplicate/missing links introduced by the markup change. |
| FE-22 Content separated from presentation | **Fail** | **Pass** | `web/src/components/GapChart.astro` now takes `annotations?: GapChartAnnotation[]` as a real typed prop and is called as `<GapChart annotations={homePage.problem.gapChartAnnotations} />` in `web/src/pages/index.astro:147` — the field is no longer fetched-and-discarded. Confirmed live: the rendered chart's flag text (`OCT 2026` / `FROM 2027` / `SPM` at the correct stop indices) matches the fallback CMS data exactly, proving the full schema→query→prop→render chain actually executes, not just that the prop type-checks. The five other hardcoded figures Bob's 2026-08-15 pass flagged (`2`, `24`, `20`, `30`, the two time blocks) are now typed CMS fields (`problem.independentChecksCount`, `about.yearsExperience`, `about.studentsPerYear`, `finalCta.freeMinutes`, `pricing.availabilityTimeBlocks`), wired schema→query→types→fallback→seed→render for every one of the five — verified field-by-field, not spot-checked. See `review/bob/CODE-REVIEW.md`'s 2026-08-16 VS-01 section for the full per-field trace. |
| FE-34 Data flow and fetching discipline (fetch-then-discard half) | Partial (same root cause as FE-22) | Pass | The `gapChartAnnotations` fetch is now consumed, closing the specific "fetched but nothing reads it" defect FE-34 was partially failing on. `getLandingPageData()`'s `Promise.all` parallel-fetch discipline (the other half of FE-34, already passing) is unchanged. |
| FE-51 No dead weight (gapChartAnnotations-is-dead-weight half) | Partial (same root cause) | Pass | Same fix as FE-22/FE-34 above — the previously-dead GROQ projection is now live. The unrelated `@astrojs/sitemap`-unconfigured half of this gate's 2026-08-15 "Partial" rating is unchanged and unaffected (VS-15, still open, not touched by this commit). |
| FE-32 No JS for platform behavior (VS-06, the FAQ no-JS gap) | Partial fail, P2 isolation rationale (VS-06) | **Unchanged — still Partial fail** | Not in scope for this fix commit (VS-06 was not one of the five findings addressed) and not re-audited here. The new Playwright suite (VS-04) does add automated coverage of the FAQ's *with-JS* interaction (click + keyboard), but does not test the no-JS case, so it neither closes nor worsens VS-06. Recorded for completeness only — still open, still tracked as VS-06 in `review/bob/CODE-REVIEW.md`. |

### Scoped FE Result (2026-08-16)

**FE-04 and FE-22 now pass** (both were the only two gates failing outright on 2026-08-15); the
FE-34/FE-51 partial ratings whose root cause was the same discarded-field defect are now full passes
on that half. No gate that was passing on 2026-08-15 regressed — the fix commit's changes were
additive/corrective in the areas it touched (`GapChart`, header/footer nav markup, tap-target CSS,
new test infrastructure) and didn't disturb any other gate's evidence. All other gates keep their
2026-08-15 rating unchanged, including FE-32 (still Partial fail, VS-06, out of scope for this
commit) and everything marked N/A (still genuinely N/A — no blog routes, forms, or registry
components were added). This is a scoped update, not a re-audit of the full gate table; see the
2026-08-15 table below for every gate's full evidence.

---

Date: 2026-08-15

Scope: first vertical slice. Landing page renders from the real component tree
(`web/src/pages/index.astro` + `web/src/components/*` + `web/src/layouts/BaseLayout.astro`), fed by
`web/src/lib/content/landingData.ts` (Sanity-first, local-fallback). No blog routes exist yet. Most
gates that were correctly N/A at scaffold time (`review/bob/FE-GATE-AUDIT.md`'s 2026-08-14 section,
preserved below as history) are now assessable against real code and real browser behavior. No
vertical-slice FE self-check exists in `docs/DECISIONS.md` yet (flagged separately as finding
`VS-12` in `review/bob/CODE-REVIEW.md`) — this table is Bob's own independent assessment, not a
verification of a self-check that was never written.

Commit: `770965218abcbc048c1261c9ca0ad3f4b6bb832c`.

| Gate | Result | Evidence | Disagreement / follow-up |
| --- | --- | --- | --- |
| FE-01 Meaning, not appearance | Pass | Real semantic elements throughout: `header`, `nav`, `main`, `footer`, `section`, `figure`/`figcaption` (`GapChart.astro`), `table`/`thead`/`tbody`/`th scope`/`caption` (pricing table), `ul`/`ol` for repeated groups, `button type="button"` for the FAQ toggle, real `a href` everywhere. No click-handler-on-`div` pattern found. | — |
| FE-02 `<section>` accessible name | Pass | All 10 landing `<section>` elements have `aria-labelledby` pointing to a visible heading/label or `aria-label` directly (trust band: `aria-label="Teaching experience"`; FAQ/Levels: `aria-labelledby` to their `SectionMarker` label span, matching the design-authority decision recorded in `HANDOFF.md`'s 2026-08-11 "Dev-standard scope settled" entry). Verified in source, all 10 confirmed. | — |
| FE-03 `<article>` for standalone content | N/A | No blog archive/post routes exist yet. | Required once `/blog/[slug]/` lands. |
| FE-04 Repeated siblings are a list | **Fail** | Session cards, level rows, FAQ items, process steps, and the hero's spine list all correctly use `<ul>`/`<ol>`. **Header nav (`SiteHeader.astro:24-32`) and footer nav (`SiteFooter.astro:22-30`) do not** — both map link arrays directly into sibling `<a>` inside `<nav>` with no `<ul>` wrapper. | `review/bob/CODE-REVIEW.md` VS-05 (P2, isolation rationale: content remains reachable and correctly labelled, only the "list of N" screen-reader grouping cue is lost — not downgraded from the FE-04 default without reason, but the reason is stated). |
| FE-05 Links navigate, buttons act | Pass (hard gate) | Every `<a>` in the rendered page has a real `href` (`rg 'href="#"' web/src` — no matches); the FAQ toggle is a real `<button type="button">` with `aria-expanded`/`aria-controls`, not a link. Verified interactively in a real browser: click behavior, keyboard-Tab reachability, and visible focus ring all confirmed. | — |
| FE-06 Heading hierarchy | Pass | One `<h1>` (hero). Verified live in browser at 4 viewports: heading sequence is `H1, H2, H2, H3×5, H2×5, H3, H2, H3×2, H2, H3×4, H2` — no skipped levels, every H3 nests under a preceding H2, every return to H2 is a new top-level section. The FAQ and trust-band sections intentionally have no heading (per the recorded design decision), using `aria-label`/`aria-labelledby` on the section instead — consistent with FE-02's allowance. | — |
| FE-07 Complete landmarks | Pass | Verified live at 390/560/768/1440: exactly 1 `<main>`, 1 `<header>`, 1 `<footer>`, 2 `<nav>` elements with distinct accessible names (`"Primary navigation"`, `"Footer navigation"`). | — |
| FE-10 Layout method | Pass | Grid used for genuinely two-dimensional relationships (hero grid, session-card grid, level-row internal grid, process-step grid, footer's 3-column grid); Flexbox used for one-axis relationships (header inner row, trust-item internals, FAQ button row). No flex-faking-grid pattern found. | — |
| FE-11 Absolute positioning | Pass | Used only for decorative graph-paper overlays (`::before` grid backgrounds), visually-hidden utility clipping, and the fixed-position skip link (a legitimate overlay use case). No primary page structure depends on it. | — |
| FE-12 Sibling spacing uses gap | Pass | `gap` used throughout grid/flex containers (hero-grid, session-grid, dash-list, faq-list spacing via `padding`/`border` on list items rather than child margins, trust-grid, etc.). | — |
| FE-13 Values come from tokens | Pass | All color/typography/spacing/radius/shadow declarations reviewed resolve to `var(--...)` tokens. `clamp()` bounds for fluid type scale are legitimate arbitrary values for responsive sizing, not a token violation. `diff -rq design/tokens web/src/styles/tokens` remains clean (unchanged from scaffold). | — |
| FE-14 Mobile-first, no overflow | Pass | Verified live: `document.documentElement.scrollWidth === clientWidth` at 390/560/768/1440px — no page-level horizontal overflow at any tested width. The pricing `<table>` (`min-width: 620px`) extends past the viewport edge at 390/560px by design, but is correctly contained inside `.table-wrap { overflow-x: auto }`, the exact pattern FE-14 itself names as acceptable ("wide content... scrolls inside its own container, never the page body"). Confirmed the page body itself never scrolls horizontally despite the table's internal scroll. Confirmed the previously-fixed header-nav-hidden-below-560px regression (`HANDOFF.md` 2026-08-15 entry) has not regressed: `nav` computed `display: flex` at 390px. | — |
| FE-20 Extract on reuse | Pass | `SectionMarker`, `WhatsAppCta`, `LogoLockup`, `GapChart` are genuinely reused/domain-meaningful extractions. No premature generic-wrapper components found. | — |
| FE-21 No monoliths/duplicates | Pass, with a note | No duplicate or near-identical components found — the actual FE-21 concern is clean. `index.astro` itself is a large single file (~500 lines markup + ~970 lines scoped CSS covering all 10 sections), noted as `review/bob/CODE-REVIEW.md` VS-17 (P3 preference, not a rule violation). | Revisit extraction once blog templates might reuse pricing-table/FAQ-accordion patterns. |
| FE-22 Content separated from presentation | **Fail** | `web/src/components/GapChart.astro` has no `Props` interface at all and hardcodes the exact `stops`/`measured` values that `studio/schemaTypes/documents/homePage.ts:91-105`'s `problem.gapChartAnnotations` field, `web/src/lib/sanity/queries.ts:53`'s projection, and `web/src/lib/content/defaultLandingData.ts:170-174`'s fallback data all already model and fetch for exactly this purpose — the field is fetched then discarded. Several other on-page numeric figures (`24`, `2`, `20`, `30`, the availability time blocks) are likewise hardcoded literals in `index.astro` duplicating facts already present in editable prose/array fields. | `review/bob/CODE-REVIEW.md` VS-01 (P1, no isolation rationale offered — real content-accuracy risk once the dataset is seeded and edited). |
| FE-23 Explicit typed component APIs | Pass | Every component with dynamic content has a typed `interface Props` (`SiteHeader`, `SiteFooter`, `WhatsAppCta`, `SectionMarker`, `LogoLockup`). `GapChart`'s lack of any `Props` is the FE-22 defect above, not a typing gap — its API is honestly typed as "takes nothing," which is the actual bug. | — |
| FE-24 Business-logic components project-owned/tested | N/A | No forms, search, pagination, consent, or preview-gating runtime logic in this slice. The FAQ open/close toggle is a UI interaction, not "business logic" under the guideline's own listed examples. | Required once real business logic (forms, search) lands. |
| FE-30 One framework | Pass | `web/package.json` has Astro only; no React/Vue/Svelte anywhere in `web/`. | — |
| FE-31 Intentional hydration | Pass | `rg "client:" web/src` — zero matches. FAQ interactivity uses a plain inline `<script>` operating on real DOM nodes, not a hydrated island — the least aggressive approach possible, exceeding this gate's bar. | — |
| FE-32 No JS for platform behavior | **Partial fail** | Navigation, CTAs, and 1-of-13 FAQ answers work with no JS. **12 of 13 FAQ answer panels ship `hidden` in the static HTML** (`index.astro:432,448-449`) with no non-JS reveal path — content visibility for a meaningful fraction of the page depends on the inline script executing. | `review/bob/CODE-REVIEW.md` VS-06 (P2, isolation rationale: same-origin inline script with no external dependency, verified loading with zero console/network errors in this review's own testing — real-world failure probability is lower than a third-party-script scenario, but the guideline's MUST is still unmet as written). |
| FE-33 Astro islands discipline | Pass | No `@astrojs/react`, no island components, no client directives anywhere in `web/`. | — |
| FE-34 Data flow and fetching discipline | Partial | `getLandingPageData()` (`web/src/lib/content/landingData.ts:39-79`) correctly issues `Promise.all([...])` for homePage/siteSettings/navigation/categories — no avoidable waterfall. The `gapChartAnnotations` fetch-then-discard (see FE-22 above) is also a data-flow discipline defect: a field is fetched that no component ever reads. | Same root cause as FE-22 (VS-01); tracked once, not double-counted as a separate finding. |
| FE-40 Dependency ladder | Pass | No new unjustified dependencies added this slice. `@playwright/test` was explicitly earmarked in `docs/DECISIONS.md` §4 to be added "with the first Playwright verification pass" (this slice) and was not — tracked as a testing-process gap (VS-04), not a dependency-ladder violation. | — |
| FE-41 Registry discipline | N/A | No registry components used anywhere in `web/`. | — |
| FE-42 Registry provenance | N/A | Same as FE-41. | — |
| FE-50 Typed/lint-clean/buildable | Pass | Reproduced independently, not trusted from CI alone: `web`: `pnpm format:check`, `pnpm check` (0 errors/warnings/hints), `pnpm build` all clean. `studio`: `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm build` all clean (only the documented, accepted Sanity auto-update version-drift warning). | — |
| FE-51 No dead weight | Partial | `@astrojs/sitemap` remains installed but unconfigured (unchanged, still tracked as VS-15). The `gapChartAnnotations` GROQ projection is itself dead weight in the same sense — data fetched over the network on every build/request that nothing consumes (see FE-22/FE-34). | — |
| FE-52 Comments explain why | Pass | Comments in `client.ts`, `queries.ts`, `landingData.ts`, `defaultLandingData.ts` explain intent/constraint/history (citing prior Bob findings and design decisions by name), not restating what the code already says. | — |
| FE-53 Compiling is not completing | Pass | `HANDOFF.md`'s dated entries are candid about what is/isn't built at each stage; this review's independent re-verification of specific claims (dist byte size, FAQ count, redirect targets, CI run/commit match) found no over-claim. | — |
| FE-60 Decision ladder | Pass, with a note | Native HTML/CSS preferred throughout (Grid/Flex over positioning, scoped CSS over a component library, plain script over a client island for the FAQ). The one place the ladder arguably wasn't fully climbed: a custom button+script accordion where native `<details>`/`<summary>` (rung 1, native HTML) would satisfy the same requirement more simply and without the FE-32 gap (VS-16, P3 preference). | — |
| FE-61 Respect existing codebase | Pass | Builds directly on the approved scaffold's token/query/schema layers without rewriting them; the two-package layout and Sanity client split from the scaffold review are preserved unchanged. | — |

## Scoped FE Result

**Two gates fail outright for the vertical slice: FE-04 and FE-22.** One gate partially fails:
FE-32 (and, as the same root cause, FE-34's fetch-discipline half). Per the guideline's severity
rule, a failed `FE-xx` gate is P1 by default; FE-04 and FE-32 are recorded at P2 in
`review/bob/CODE-REVIEW.md` with a written isolation rationale each (VS-05, VS-06), consistent with
the rule that only named exceptions (FE-05, FE-24, FE-41) may never be downgraded — FE-22 has no
such rationale offered and stays at its default P1 (VS-01).

Gates marked N/A above (FE-03, FE-24, FE-41, FE-42) remain genuinely out of scope for this slice —
no blog routes, business logic, or registry components exist yet — and become hard gates for the
next vertical slice (blog routes) exactly as the scaffold audit predicted.

---

# Bob FE Gate Audit - Development Scaffold Re-Review

*(Preserved as history — scaffold stage, 2026-08-14, before any real page template existed.)*

Date: 2026-08-14

Scope: scaffold only. No real page templates, component tree, Portable Text renderer, seeded
content, browser suite, CI, or preview deployment exists yet. Claude's scaffold-stage FE self-check
now exists in `docs/DECISIONS.md:360-407`; Bob compared it against source and command evidence.

| Gate | Claude self-check | Bob result | Evidence | Disagreement / follow-up |
| --- | --- | --- | --- | --- |
| FE-01 Meaning, not appearance | Limited pass | Limited pass | Smoke page uses `main`, `h1`, `p`, and a labelled non-interactive swatch. | Re-audit once real templates exist. |
| FE-02 Named sections | N/A | N/A for scaffold | No production sections implemented. | Required for landing/blog sections. |
| FE-03 Article for standalone content | N/A | N/A for scaffold | No blog archive/detail route exists. | Required for post detail/listing slice. |
| FE-04 Repeated siblings are lists | N/A | N/A for scaffold | No repeated UI groups implemented. | Required for nav/archive/trust/FAQ/levels. |
| FE-05 Links navigate, buttons act | Fixed | Pass for scaffold | `web/src/pages/index.astro:25-31` is no longer an anchor; `rg 'href="#"' web/src` has no matches. | Re-audit real WhatsApp/link components. |
| FE-06 Heading hierarchy | Limited pass | Limited pass | Smoke page has one `h1`; no section/article hierarchy yet. | Re-audit real pages. |
| FE-07 Landmarks | Partial | Partial | Smoke page has one `main#main`; no header/footer/nav shell yet. | Required in first real shell. |
| FE-10 Layout method | N/A | N/A for scaffold | No real layouts implemented. | Re-audit real components. |
| FE-11 Absolute positioning | Pass | Pass for scaffold | No absolute-position layout dependence found in scaffold UI. | Re-audit real components. |
| FE-12 Sibling spacing uses gap | N/A | N/A for scaffold | No sibling group components yet. | Re-audit real components. |
| FE-13 Token values | Pass | Pass | `diff -rq design/tokens web/src/styles/tokens` is clean; copied token directory is ignored by Prettier. | Keep byte-verbatim token check in handoff evidence. |
| FE-14 Mobile-first/no overflow | Unverified | Unverified by scope | No Playwright/browser pass exists and no real responsive template exists. | Required in first vertical slice. |
| FE-20 Extract on reuse | N/A | N/A for scaffold | No web component tree implemented. | Re-audit once components exist. |
| FE-21 No monoliths/duplicates | N/A | N/A for scaffold | No component tree implemented. | Re-audit once components exist. |
| FE-22 Content separated from presentation | Pass for data layer | Pass for scaffold data layer | CMS schemas exist; `web/src/lib/sanity/types.ts` has explicit homepage and Portable Text result types. | Full pass requires components consuming content without casts. |
| FE-23 Explicit typed APIs | Partial | Partial/pass for scaffold | Query helper returns are explicit; TypeGen remains deferred and recorded in `docs/DECISIONS.md:125-132`. | Revisit TypeGen once real queries/routes exist. |
| FE-24 Business logic project-owned/tested | N/A | N/A for scaffold | No forms/search/pagination/redirect runtime logic implemented. | Tests required when runtime logic lands. |
| FE-30 One framework | Pass | Pass for `web` | Public site remains Astro-only; Studio React is isolated to Sanity Studio. | Keep React out of public site unless justified as an island. |
| FE-31 Hydration boundaries | Pass | Pass for scaffold | `rg "client:" web/src` found no hydration directives. | Re-audit future islands. |
| FE-32 No JS for platform behavior | Pass | Pass for scaffold | No client-side JS in the scaffold. | Re-audit mobile nav/FAQ/search. |
| FE-33 Astro islands discipline | Pass | Pass for scaffold | No `@astrojs/react`, no island components, no client directives. | Re-audit if interactive islands are added. |
| FE-34 Data fetching discipline | Fixed | Pass for scaffold | Default Sanity client is `published`; preview client is explicit and gated. GROQ helpers use explicit projections and avoid per-candidate category dereference filters. | Re-audit with real route data fetching. |
| FE-40 Dependency ladder/control | Pass | Pass with accepted risk | Studio versions are pinned; hosted Studio auto-update risk is documented in `docs/DECISIONS.md:142-164`. | Re-check before shared/public Studio handoff. |
| FE-41 Registry discipline | N/A | N/A for scaffold | No registry components found in app code. | Record provenance if any are added. |
| FE-42 Registry provenance | N/A | N/A for scaffold | No registry components found in app code. | Same as FE-41. |
| FE-50 Typed/lint-clean/buildable | Pass | Pass | `web` build/check/format pass; `studio` typecheck/lint/format/build pass. Studio build needed network escalation for Sanity CDN lookup. | Keep evidence current after vertical-slice changes. |
| FE-51 No dead weight | Partial | Partial | READMEs are now project-specific. `@astrojs/sitemap` is installed but not configured until real routes exist. | Verify sitemap setup once routes land. |
| FE-52 Comments explain why | Pass | Pass | Source comments explain why, and `docs/DECISIONS.md:121-128` now accurately describes the published/preview Sanity client split. | Keep decisions current when implementation changes. |
| FE-53 Compiling is not completing | Pass | Pass by scope note | `HANDOFF.md` and READMEs state scaffold limitations. | Do not treat scaffold as vertical-slice approval. |
| FE-60 Decision ladder | Pass | Pass | `docs/DECISIONS.md` records dependency decisions and auto-update posture. | Keep decisions current when implementation changes. |
| FE-61 Respect existing codebase | Pass | Pass | Existing two-package layout and design-review constraints were preserved. | Continue preserving design-author constraints. |

Scoped FE result: **Approved for the scaffold.** FE-05 and FE-34 are no longer failing. Gates marked
N/A or unverified are genuinely outside scaffold scope and become hard gates for the first real
vertical slice.
