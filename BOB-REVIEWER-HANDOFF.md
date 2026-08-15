# Bob Reviewer Handoff - Just Math Malaysia

Date: 2026-08-14

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
