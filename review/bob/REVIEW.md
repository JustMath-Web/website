# Bob Review - Just Math Malaysia Design Package

Date: 2026-08-14

Reviewer role: Bob, independent reviewer. Andy is the design author. Bob did not edit Andy's `design/` artifacts.

Scope: complete local design package at `design/`, including the 2026-08-12 blog archive/post addition, plus root `HANDOFF.md`, `PRODUCT.md`, approved brief/copy, and shared craft ledgers. The Claude Design link was treated as read-only context; the local package is the deliverable under review.

Standards checked: Bob reviewer prompt v1.7.0 at `/Users/charlie/Documents/Projects/Setup_Instructions/Guidelines/Web-Design/Web-Design-Guidelines/BOB-WEB-DESIGN-REVIEWER-PROMPT.md`, Web Development craft standard v2.2.0 at `/Users/charlie/Documents/Projects/Setup_Instructions/Guidelines/Web-Development/WEB-DEV-CRAFT-STANDARD.md`, current Web Interface Guidelines fetched from `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`, and WCAG 2.2 from W3C (`https://www.w3.org/TR/WCAG22/`).

Verdict: **Approved with conditions for development handoff.** The prior P1 blockers remain resolved, Option B package sync remains closed, the blog category-count P2 is resolved, and the final blog/header 44x44 hit-area P2 is now resolved. There are no remaining Andy-owned design-author blockers. This is not launch approval: owner/client conditions still carry into development. Route classification is accepted: this belongs under `02-INFORMATIVE-BLOG.md` (Astro + Sanity), not `01-LANDING-PAGE.md`.

## Resolved P1s

### [P1-01] Form focus states were not as documented

- Prior finding: `Input`, `Select`, `Checkbox`, and `_ds_bundle.js` suppressed focus outlines while `STATES.md` claimed no `outline:none` existed.
- Re-review evidence: `rg "outline:\\s*['\"]?none|outline: none" design --glob '!review/**'` now finds only explanatory comments, not focus-removal assignments. `design/components/forms/Input.jsx:19`, `design/components/forms/Select.jsx:17`, and `design/components/forms/Checkbox.jsx:11` no longer suppress the global outline.
- Browser evidence: bundle-driven forms card rendered in installed Chrome through CDP. Text input, textarea, select, two radios, checkbox, and invalid input all computed `outlineWidth: 2px`, `outlineStyle: solid`, `outlineColor: rgb(43, 68, 104)`, and matched `:focus-visible`.
- Status: resolved.

### [P1-02] Progress-report template carried stale contrast-failing ochre

- Prior finding: `design/templates/progress-report/ProgressReport.dc.html` used stale `#9c6a17`, measuring 4.05:1 on `#f6eedd`.
- Re-review evidence: `design/templates/progress-report/ProgressReport.dc.html:40` now uses `#8f6114`, matching `design/tokens/colors.css:17`.
- Static evidence: `rg "#9c6a17" design --glob '!review/**'` returns no shipping/template instances.
- Contrast evidence: `#8f6114` on `#f6eedd` measures 4.68:1.
- Status: resolved.

## Remaining Open Conditions

### [P2] Disabled option notes remain a legibility decision

- Category: material risk
- Evidence: `design/STATES.md:123-135` records disabled option text at 2.71:1 and disabled option notes at 1.88:1 because the whole option dims to 42% opacity. WCAG exempts inactive UI text, but the note may carry the reason a parent needs, for example "Full this term".
- Why it matters: this does not block the design review, but it affects decision clarity for unavailable slots.
- Required correction: project owner either accepts the tradeoff explicitly, or Andy renders disabled notes outside the dimmed wrapper at a readable text token while keeping the control itself disabled.
- Owner: project owner
- Approval needed: yes
- Status: open condition

### [P2] Launch-critical owner/client inputs are disclosed but unresolved

- Category: material risk / content and brand integrity
- Evidence: `HANDOFF.md`, `design/COPY-GAPS.md`, `design/ASSETS.md`, and `design/BRAND-INTAKE.md` still leave decisions open: missing portrait or typographic About rebuild, brand-owner sign-off on the adopted operator redraw, richer brand-brief evidence, FAQ count binding to the data array, two report default strings, the optional screen-reader-only trust-bar label, the "Schedule Now" owner decision, all blog article copy/math content, and the narrowed WhatsApp logo-color/asset-source decision. IBM Plex is now confirmed, so font substitution is not an open design decision; production still needs self-hosted subset files.
- Why it matters: these do not block Bob's package approval with conditions, but they block a responsible launch and could cause development to ship derived brand/copy decisions as official.
- Required correction: get the portrait or approve a typographic About rebuild; record brand-owner sign-off on the adopted mark redraw; locate/reconstruct the richer written brand brief or mark its decisions as derived owner-approved; bind the FAQ count at build time; confirm the two report strings before they appear in a parent-facing document; optionally accept or override `aria-label="Teaching experience"`; decide whether "Schedule Now" stands despite the brand-voice conflict; replace all placeholder blog posts/counts/math with Mr Kong-reviewed content before launch; resolve the WhatsApp glyph by using an official white/reversed asset from the Meta kit or dropping the glyph. If the client dislikes the remaining approved-copy verb phrase, approve an explicit copy override.
- Owner: client / project owner
- Approval needed: yes
- Status: open condition

## Resolved Conditions

- Final blog/header 44x44 hit-area P2: resolved. `design/STATES.md:18` now says `>=44x44px`; `design/STATES.md:197-225` records the before/after and verification. `design/ui_kits/website/LandingShell.jsx:376-380` and `_ds_bundle.js:3282-3287` now give the header "Blog" link `minWidth: 44`; `design/ui_kits/blog/BlogPages.jsx:84-86` gives the breadcrumb links `minWidth: 44`. Rendered evidence at 390px and 1200px: landing/archive/post header "Blog" is `44 x 44`, post breadcrumb "Notes" is `44 x 44`, header "Schedule Now" remains `169.6 x 44`, there are 0 under-44 focusable targets, and `scrollWidth === clientWidth`.
- Blog category-count type-scale P2: resolved. `design/ui_kits/blog/Blog.jsx:116` now uses `var(--size-2xs)` for category counts. Browser evidence at 390px and 1200px: counts `59, 12, 9, 14, 8, 11, 5` all compute to `12px`. Static search shows the remaining `--size-3xs` uses are the gap-chart annotation paths in `design/ui_kits/website/LandingShell.jsx:242` and `design/ui_kits/website/LandingShell.jsx:281`, plus their compiled bundle copies.
- P2 landing shell contract: resolved for the package. `design/STATES.md:41-56` now specifies `lang`, skip link, `<main id="main" tabindex="-1">`, heading order, section labelling, and anchor scroll behavior for the Astro build. This is acceptable as a build contract because the current package is a prototype kit rather than the final Astro shell.
- Web Development craft standard design-dependent subset: resolved for the package. Bob does not apply the whole FE standard to the design phase; FE-10 onward is implementation review. Section A semantic decisions that would otherwise force developer invention are now recorded in `design/STATES.md:64-114`: FE-02 section names, FE-04 list choices, FE-05 link-vs-button intent, FE-06 heading order, FE-07 landmarks, and FE-33 Astro/React consequence.
- Predecessor-site/mark-direction decision: resolved. Bob verified the old live `mathematicsmalaysia.com` logo asset as a real predecessor mark, the owner chose Option B, and Bob agrees with that choice over the old colored PNG, equals mark, or type-only header.
- Option B package sync: resolved. Booking source and bundle copy, brand component card, brand guideline lockup card, clearspace card, website README, `ASSETS.md`, `_ds_manifest.json`, `BRAND-INTAKE.md`, the standalone document-control progress-report template, and the root status block now match the adopted operator mark. Browser checks confirm the document-control report and React reports UI kit both render an ink operator SVG (`45.09 x 45.09`) with no retired uppercase/rule lockup and no stale equals copy. `.lockup-fill` resolves in both contexts (`text-align: justify`, `text-align-last: justify`). Bob accepts the new clearspace rule (half the mark's height) as a coherent derived rule, subject to the same brand-owner sign-off as the redraw itself.
- Route classification for development: resolved. `02-INFORMATIVE-BLOG.md` classifies "ongoing editorial publishing" as Informative Website + Blog with Astro + Sanity. `01-LANDING-PAGE.md` explicitly stops when an ongoing blog is needed. Bob agrees this project should enter development under `02-INFORMATIVE-BLOG.md`; the old Bricks/WordPress brief is superseded for this build.
- Blog template direction: mostly resolved. Archive rows rather than cards are consistent with the no-imagery system; category taxonomy as syllabus levels is coherent; the single-post `Working` component correctly turns the approved "line by line" promise into a reusable article pattern; KaTeX is a justified dependency if it renders at build time in production.
- Blog touch-target first-round fixes: header "Schedule Now", category filters, pagination, breadcrumbs' vertical area, and in-page CTAs met the 44px height floor at 390px. The later width issue on the header "Blog" link and post "Notes" breadcrumb is closed by the final 44x44 P2 above.
- P2 Accordion package sync: resolved. `design/components/feedback/Accordion.d.ts:5-21` now documents the accessibility contract and `idPrefix`; `design/components/feedback/Accordion.prompt.md:9` records the same contract; `design/ui_kits/website/LandingClose.jsx:206-231` now gives `PlainAccordion` matching IDs, `aria-controls`, `role="region"`, `aria-labelledby`, and closed-panel `inert`; `_ds_bundle.js` carries the same fallback contract.
- P3 checkbox invalid-state wording drift: resolved. `design/STATES.md:70` and `design/STATES.md:104-108` now say box-shadow ring, not outline.
- WhatsApp brand-guideline check: mostly resolved and narrowed. `design/ASSETS.md:79-122` records the check. The glyph does not replace the word, capitalization is correct in visitor-facing copy, endorsement is not implied, and two authored verb usages were changed to "Message on WhatsApp". The remaining "WhatsApp me for what is currently open." is approved client copy and is correctly left as a client/owner decision rather than silently rewritten.
- P3 WhatsAppButton source-comment drift: resolved. `design/components/core/WhatsAppButton.jsx:39-42` now says the glyph is not the only destination signal and points to `ASSETS.md` §4.
- Prior browser limitation: resolved. Bob reran browser checks locally with installed Google Chrome through CDP.

## Bob Decisions

- `tavis.live`: no finding. Bob accepts the row as verified enough for this design review. Keep the recorded caveat if the source cannot be refetched later.
- CS-03: no directions stage was run. Bob accepts "route exception / not applicable" for this review because the owner explicitly chose to continue and enhance the selected Claude Design package. Do not rewrite it as "CS-03 passed".
- CS-16: owner override accepted. The numbered kickers are dense by the letter of the gate, but the owner override is recorded and the device is consistently tied to the measurement motif rather than generic eyebrow scaffolding.
- CS-71: ledger reachable at the moved Setup_Instructions path and currently has no project rows. No collision. Do not append this package row until after approval.

## Verification Performed

- Read: root `HANDOFF.md`, `PRODUCT.md`, approved brief and final copy, core design docs, source components, UI kits, templates, tokens, `_ds_bundle.js`, `_ds_manifest.json`, moved Bob prompt, and the Web Development craft standard.
- Standards: fetched current Web Interface Guidelines and WCAG 2.2.
- Static checks: `node --check design/_ds_bundle.js` passed; manifest/CSS diff reported 125 CSS vars, 125 manifest tokens, 0 diffs, 0 duplicates; manifest/card marker diff reported 32 cards, 0 drift.
- Greps: no stale `#9c6a17`, no shipping `outline:none`, accordion semantics inspected in source and bundle.
- Browser checks: bundle-driven forms card focus states passed; live landing FAQ semantics passed; forced fallback FAQ semantics passed with the design-system Accordion removed at render time: 13 FAQ items, 13 fully wired, 12 closed panels, 12 closed panels inert, 0 bad rows. Landing page at 390, 768, and 1440 had 0 clipped elements, 0 sub-24px targets, and 0 stuck-invisible reveal elements after transitions completed.
- WhatsApp check: official Meta page currently redirects behind login from Bob's browser, so Bob did not independently quote its live body. Bob verified the practical rules against current public summaries and inspected local implementation: `design/components/brand/WhatsAppGlyph.jsx:7` uses `fill="currentColor"` and `design/components/core/WhatsAppButton.jsx:30` sets `color: var(--white)`. The unresolved issue is not "white can never be allowed"; it is that the current component programmatically tints a glyph rather than proving an official white/reversed WhatsApp asset is being used.
- Predecessor logo check: Bob fetched and measured `https://mathematicsmalaysia.com/storage/2022/12/site-logo-math-white.png` as a `350 x 100` PNG. Palette inspection confirms the four-color operator cluster, including green `#84d063`. The main homepage is bot-gated from Bob's browser, but the asset URL and current indexed search results are enough to reject the "no predecessor" statement as written.
- Option B mark check: deleted asset files are absent and no non-doc shipping path references them. `node --check design/_ds_bundle.js` passed; manifest/CSS token diff remains 125/125/0; manifest/card drift is 0. Rendered 390px landing header passes with no clipping, no small targets, no stuck invisible elements, and ink operator mark aligned to the type block. Rendered brand card, booking kit, React reports UI kit, lockup card, clearspace card, and standalone document-control report template use the operator mark/lockup with no stale equals copy. Historical mentions remain in dated `HANDOFF.md` sections and in explicit retirement notes in `ASSETS.md` / `readme.md`; Bob treats those as history, not active drift.
- Blog render check: archive and post rendered at 390/768/1440 previously. Current 390px and 1200px re-check: landing, archive, and post have `scrollWidth === clientWidth`, no non-KaTeX clipped elements, 0 under-44 focusable targets, and post still renders 13 KaTeX formulas with no formula-container overflow and no `[object Object]`. Category counts compute to `12px`. Header "Blog" computes to `44 x 44`; header "Schedule Now" computes to `169.6 x 44`; category filters compute to at least `44px` high; post breadcrumb "Notes" computes to `44 x 44`.
- Blog source/doc check: `design/COPY-GAPS.md:124-151` records the "Schedule Now" voice/destination conflict and the fact that all blog post copy, dates, counts, and maths are placeholder. `design/ASSETS.md:106-108` records KaTeX self-host/build-time requirements. `design/DESIGN.md:217-231` records archive/post/category template intent and build-time KaTeX requirements.
- Non-blocking runtime note: local server logged a missing `.image-slots.state.json` sidecar while loading the website kit. The portrait/image-slot launch blocker is already disclosed in `ASSETS.md` and `HANDOFF.md`.
