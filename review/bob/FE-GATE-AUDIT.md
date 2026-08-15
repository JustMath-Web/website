# Bob FE Gate Audit - Development Scaffold Re-Review

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
