# Development Decisions — Just Math Malaysia

Date started: 2026-08-14

This file records the initialization decisions for the Astro + Sanity development stage. The design
authority remains the approved local `design/` package plus Bob's design-review artifacts.

## 1. Stage And Approval

Design status: **approved with conditions for development handoff**, not launch approval.

Authoritative design-review records:

- `BOB-REVIEWER-HANDOFF.md`
- `review/bob/REVIEW.md`
- `review/bob/APPROVAL-CHECKLIST.md`
- Root `HANDOFF.md`, latest section: `2026-08-14 — Design package approved with conditions for development handoff`

No design-author component or accessibility blocker remains. Remaining items gate launch, not the
Astro scaffold:

- Project-owner decisions: header CTA wording, WhatsApp glyph asset/removal, disabled-note
  legibility, trust-bar accessible name, adopted operator-mark sign-off, richer brand evidence.
- Client / Mr Kong input: portrait or typographic About fallback, two report empty-state strings,
  Mr Kong-reviewed blog copy and maths.
- Build rule: FAQ count is bound to the FAQ array length, never hard-coded.

## 2. Capability Check

| Capability | Result | Fallback / note |
| --- | --- | --- |
| Current library docs | Available via web search and `pnpm view` | Official docs/pricing were checked before recording versions |
| Design authority | Local `design/` package | No Figma dependency |
| Vercel management | Vercel CLI available: `56.4.1` | Dashboard/GitHub integration remains acceptable for account setup |
| Browser verification | Local Chrome available; Playwright will be pinned in the web app | Manual checklist only if Playwright install fails |
| GitHub | `gh` CLI available: `2.94.0` | Git remote/user dashboard if no auth is available later |
| Google Drive/Docs/Sheets | Not required for current content inventory | User exports if client content later lives there |
| Design review skill | `web-design-guidelines` available and used in design review | Manual FE/accessibility review if unavailable later |
| Independent code review | Bob web-dev reviewer prompt exists under `Setup_Instructions` | Separate Bob session still required before Definition of Done |

## 3. Stack Decision

Route: `02-INFORMATIVE-BLOG.md` — Informative Website + Blog.

Reason:

- Scope includes ongoing editorial publishing.
- Design package includes landing page, report surface, blog archive, and blog post template.
- Existing Sanity Studio already exists in `studio/`.
- Bob accepted this route in `BOB-REVIEWER-HANDOFF.md`.

Stack:

| Layer | Decision |
| --- | --- |
| Site framework | Astro |
| CMS | Sanity |
| Studio | Keep existing standalone `studio/` package |
| Web app location | Build in existing `web/` folder |
| Styling | Tailwind CSS v4 plus project CSS tokens derived from `design/` |
| Package manager | pnpm |
| Language | TypeScript strict |
| Hosting target | Vercel |
| Search | None at launch; Pagefind later if required |
| Forms | None at launch |
| Email | None at launch; Resend only if forms/newsletter are added |
| Spam protection | None at launch; Turnstile only if forms are added |
| Analytics | None until client-owned GTM/GA4 IDs are supplied |

The current `web/reusable/README.md` is stale and must not be used as source of truth. It references
deleted equals/wordmark assets and the old `justmath.my` target. The scaffold must delete or
regenerate `web/reusable/` from the current `design/` package before implementation relies on it.

## 4. Version Baseline

Checked on 2026-08-14.

| Package / tool | Version |
| --- | --- |
| Node | `v26.3.0` |
| pnpm | `11.6.0` |
| Astro | `7.2.2` |
| `create-astro` (scaffold CLI only, not a runtime dep) | `5.2.3` |
| `@sanity/client` | `8.0.0` |
| `sanity` (studio/) | `6.9.1` installed (`^6.9.1`, patch `6.9.2` available) |
| `@astrojs/vercel` | `11.0.5` |
| Tailwind CSS | `4.3.3` |
| `@tailwindcss/vite` | `4.3.3` |
| `astro-portabletext` | `0.13.0` |
| `@sanity/image-url` | `2.1.1` |
| `groq` | `6.9.2` |
| `@astrojs/sitemap` | `3.7.3` |
| `@astrojs/check` | `0.9.10` |
| TypeScript (web/) | `6.0.3` |
| Prettier (web/) | `3.9.6` |
| `prettier-plugin-astro` | `0.14.1` |
| `prettier-plugin-tailwindcss` | `0.8.1` |
| `@playwright/test` | `1.62.1` (not yet installed — add with the first Playwright verification pass) |
| Vitest | `4.1.10` (not yet installed — add with the first business-logic test) |
| Pagefind, if added later | `1.5.2` |
| Zod, if forms are added later | `4.4.3` |
| Resend, if email is added later | `6.20.0` |

**Deviations from the version baseline recorded during scaffold (2026-08-14), with reasons:**

- **`@sanity/astro` dropped, `@sanity/client` used instead.** `@sanity/astro`'s peer dependencies
  (`react`, `react-dom`, `react-is`, `sanity`, `styled-components`) pulled in ~800 packages for
  features this project does not use — the embedded-Studio-in-Astro-route and Visual Editing
  integrations. FE-40/FE-33: no React island need exists yet, and `web/` does not embed Studio
  (`studio/` stays standalone per §3/§6 above). `@sanity/client` + `groq`'s `defineQuery` gives the
  same typed-fetch capability (Section 24's `lib/sanity/` — client, typed queries, image helpers)
  with 8 packages instead of ~800 and no unused peer surface.
- **TypeScript pinned to `6.0.3`, not the initially-checked `7.0.2`.** `@astrojs/check@0.9.10`
  (latest, needed for `astro check`/FE-50) peer-depends on `typescript@^5.0.0 || ^6.0.0` and does
  not yet support the TS 7 major. Re-pin to 7.x once `@astrojs/check` publishes support.
- **`sanity.io/docs/astro` (the `@sanity/astro` integration guide) is no longer the relevant
  reference** given the swap above; `@sanity/client` + `groq` docs are.

## 4a. Sanity Client Fetch Perspective

`web/src/lib/sanity/client.ts`'s default `sanityClient` always fetches with `perspective:
'published'` — public reads never see draft content, regardless of whether `SANITY_API_READ_TOKEN`
is set (Bob P1-DEV-01, fixed; see the 2026-08-14 "Bob's scaffold review findings fixed" entry in
root `HANDOFF.md`). The separate, explicitly-gated `createPreviewClient()` is the only place
`perspective: 'drafts'` is used, and it requires both the token and `ENABLE_SANITY_PREVIEW=true`.

Naming note, still worth keeping: the current `@sanity/client` (8.0.0) types mark `previewDrafts`
deprecated in favor of `'drafts'` — most existing tutorials/training data still show the old name.

## 4b. TypeGen Not Yet Wired

`web/src/lib/sanity/types.ts` is hand-authored to match `docs/CONTENT-MODEL.md`, not generated.
`web/` and `studio/` are separate package roots (no shared pnpm workspace), so Sanity TypeGen needs
a config in one of them with a relative schema-glob into the other (e.g. a `sanity-typegen.json` in
`web/` with `schema: '../studio/schemaTypes/**/*.ts'`, output kept inside `web/` so Vercel's
build — which only checks out `web/` — stays self-contained). Deferred until real page queries
exist to scan; do not treat `types.ts` as generated until this is wired and re-run.

## 4c. pnpm Supply-Chain Build Approvals

`studio/pnpm-workspace.yaml` had an unresolved `esbuild: set this to true or false` placeholder
from initial bootstrap, which blocked `pnpm install`/`pnpm exec` outright
(`ERR_PNPM_IGNORED_BUILDS`). Set to `true`, matching `web/pnpm-workspace.yaml`'s existing
`esbuild: true` — esbuild's postinstall only fetches its own prebuilt native binary for the current
platform, the same package already trusted in the sibling project.

## 4d. Studio Auto-Update Policy (Bob P2-DEV-05)

`studio/package.json` caret ranges are now pinned to the exact installed versions (matching `web/`'s
discipline). That does not remove the `sanity build` warning that local `sanity`/`@sanity/vision`
(`6.9.1`) differ from the hosted runtime (`6.9.2`) — `studio/sanity.cli.ts` sets `autoUpdates: true`,
so the **hosted, deployed** Studio always serves Sanity's latest release on its update channel
regardless of the locally pinned package version. Pinning `package.json` controls local dev/build
only.

**Decision: keep `autoUpdates: true`.** This is Sanity's own recommended default, and Studio here is
single-editor internal admin tooling, not the public site — the operational cost of appId/channel
version-pinning a low-traffic internal CMS panel outweighs the risk for this project.

- **Owner:** developer (Claude/whoever holds `studio/` maintenance), not Mr Kong.
- **Risk:** a hosted-Studio release could ship a breaking change untested against this schema
  before local dev catches up.
- **Test cadence:** re-check the hosted Studio (`pnpm build` warning, and a manual open of
  `sanity.io/manage` → this project's Studio) whenever the local `sanity` package version is bumped,
  and at least quarterly otherwise, since auto-updates can drift ahead silently between bumps.
- **Rollback path:** `sanity.io/manage` → this project → Studio deployment lets a specific
  version/channel be pinned per deployment if a hosted regression appears; the emergency fix is to
  set `autoUpdates: false` in `studio/sanity.cli.ts` and redeploy pinned to the last-known-good
  version.

Version/reference sources:

- Astro install/docs: `https://docs.astro.build/`
- `@sanity/client` + `groq` docs: `https://www.sanity.io/docs/apis-and-sdks/js-client-querying`,
  `https://www.sanity.io/docs/apis-and-sdks/sanity-typegen`
- Sanity Content Lake perspectives: `https://www.sanity.io/docs/content-lake/perspectives`
- Astro on Vercel docs: `https://vercel.com/docs/frameworks/frontend/astro`
- Package versions: `pnpm view`

## 5. Recurring Cost Assumptions

Checked on 2026-08-14.

| Service | Assumption | Source |
| --- | --- | --- |
| Vercel | Use Pro for commercial hosting; current listed entry price is USD 20/month | `https://vercel.com/pricing` |
| Sanity | Existing project can be used; Free may work technically, Growth is USD 15/seat/month when Editor/Developer roles or collaboration features are required | `https://www.sanity.io/pricing` |
| Resend | Not used at launch. If forms/email are added, Free is 3,000 emails/month with 100/day cap; Pro starts at USD 20/month | `https://resend.com/docs/knowledge-base/what-is-resend-pricing` |
| Cloudflare Turnstile | Not used at launch. If forms are added, Free plan is sufficient for most production applications | `https://developers.cloudflare.com/turnstile/plans/` |

Client-facing services should be client-owned or explicitly documented as developer-managed during
maintenance. Vercel Hobby must not be used for this commercial site.

## 6. Sanity Project

Use the existing Sanity project unless the owner changes infrastructure later.

| Setting | Value |
| --- | --- |
| Project ID | `v4v0i7gl` |
| Dataset | `production` |
| Current Studio path | `studio/` |
| Current Studio status | Minimal scaffold, no schema types yet |

Development will add schemas in `studio/schemaTypes/` and frontend queries in `web/src/lib/sanity/`.
Sanity-generated document IDs are used for ordinary documents. Explicit IDs are reserved for
singletons such as `siteSettings`, `navigation`, and `homePage`.

## 7. Language And Routing

Launch language: `en-MY` only.

Reason: no Bahasa Melayu page copy exists beyond the approved English phrase "in English and Bahasa
Melayu". Creating `ms-MY` routes now would scaffold infrastructure without translated content to
publish.

Implementation:

- `<html lang="en-MY">`
- No i18n dependency or localized route tree for v1.
- Bahasa Melayu phrases inside English copy do not require separate routes.
- If translated BM pages are expected later, add i18n as a scoped follow-up before creating those
  routes and documents.

## 8. Launch Sitemap

Pages/templates for v1:

| Route | Source / status |
| --- | --- |
| `/` | Landing page from approved copy and design package |
| `/blog/` | Blog archive template |
| `/blog/[slug]/` | Blog post template |
| `/blog/level/[slug]/` | Category archive template |
| `/rss.xml` | Blog RSS feed |
| `/robots.txt` | Generated/static robots policy |
| `/sitemap.xml` | Generated sitemap |

Category archives are confirmed as the archive template reused with a filtered post list and
syllabus-level heading/kicker. No new layout family is authorized. The design package implies this
via `CategoryRail` active state and `DESIGN.md` states: category archive = same as archive, filtered.

## 9. Blog And Taxonomy

Launch blog model:

- Categories are the six syllabus levels from the design package.
- Mr Kong is the default/initial author.
- Tags are optional; do not expose tag archives in v1 unless real content requires them.
- No comments.
- No newsletter.
- No on-site search at launch.
- RSS is included.
- Article maths must be reviewed by Mr Kong before publish.

The sample surds article and all sample post titles, dates, excerpts, read times, category counts,
and maths in `design/ui_kits/blog/` are placeholder. They may seed fixture data for local template
testing, but they must not be treated as approved production content.

## 10. Old Site Continuity And Redirects

Domain: `mathematicsmalaysia.com`.

Decision: proceed with the Astro scaffold now, without a full Stage 0R audit, but preserve the known
live URL inventory as first-slice redirects. This is a conscious middle path: no stop-and-audit, but
also no day-one 404 wave for URLs that are already known to return 200.

Known current live URLs supplied by the project owner:

| Old URL | Status today | New target decision |
| --- | --- | --- |
| `/about/` | 200 | `/#about` |
| `/blog/` | 200 | `/blog/` |
| `/faq/` | 200 | `/#faq` |
| `/pricing/` | 200 | `/#pricing` |
| `/category/algebra/` | 200 | `/blog/level/form-1-3/` initially; revise if imported posts justify a tighter algebra landing |
| `/differentiation-using-the-first-principle/` | 200 | 301 to `/blog/level/add-maths/` initially; revise to a refreshed post URL if imported |
| `/mastering-algebra/` | 200 | 301 to `/blog/level/form-1-3/` initially; revise to a refreshed post URL if imported |
| `/storage/2022/12/site-logo-math-white.png` | 200 asset | Do not rely on it in the new site; no redirect required unless external references are found |

The two old blog posts (`/mastering-algebra/` and `/differentiation-using-the-first-principle/`)
should be reviewed before Mr Kong writes fresh blog content. They get concrete first-slice 301
fallbacks now, and may later become one-to-one redirects to refreshed posts.

Implementation note: create explicit 301 rules for the page URLs during the first vertical slice.
If Vercel config is used, keep the redirect map small and test each route in preview.

Known limitation: this is not a full continuity audit. Missing: indexed URL export, Search Console
data, backlink inventory, analytics history, complete WordPress content export, plugin/integration
inventory, old sitemap/feed inspection, and full redirect parity.

## 11. Forms, Lead Capture, And WhatsApp

No contact form at launch.

Conversion action:

- WhatsApp link only.
- All five in-page CTAs share the approved label:
  `Book a free maths assessment on WhatsApp`
- Approved URL:
  `https://wa.me/60194728768?text=Hi%2C%20I%27d%20like%20to%20book%20the%20free%20maths%20assessment.%20My%20child%20is%20in%20___`

Header CTA currently reads `Schedule Now` as an owner override in the design package. It remains a
launch decision whether that wording stands or changes to a voice-compliant/destination-explicit
label.

Because no forms launch in v1:

- No Resend.
- No Turnstile.
- No lead database.
- No form privacy workflow.

If forms are added later, they must follow the full Forms architecture in `02-INFORMATIVE-BLOG.md`.

## 12. Analytics And Consent

No analytics at scaffold time.

Reason: no client-owned GTM/GA4 IDs were supplied during initialization. Production analytics must
not be invented or attached to developer-owned accounts.

When IDs are supplied:

- Prefer GTM as the single container.
- Add one typed analytics module.
- Keep production analytics disabled in local/dev/test.
- Add consent handling if non-essential analytics/advertising tags require it for the chosen target
  markets and tag stack.

## 13. Assets And Launch Conditions

Assets available:

- Adopted operator mark SVGs in `design/assets/`.
- Open Graph source/image in `design/assets/og/`, if present in the local design package.
- IBM Plex families are confirmed, but production should self-host subset font files.

Launch conditions:

- Mr Kong portrait is missing. Do not ship stock/fake tutor imagery. Use a typographic About fallback
  only if approved.
- Adopted operator redraw needs brand-owner sign-off.
- WhatsApp glyph must be either an official white/reversed asset from Meta's kit or removed.
- Blog content and maths need Mr Kong review before any post ships.
- Two report empty-state strings need Mr Kong's voice before parent-facing report use.

## 14. Implementation Constraints From Design Review

- Green only means a control opens WhatsApp.
- The operator mark is the active mark; deleted equals/wordmark assets must not reappear.
- Category archive reuses the archive layout with filtered posts.
- FAQ count is computed from data length.
- Production HTML ships visible; reveal effects enhance after boot and respect reduced motion.

## 15. Pre-Scaffold Approval Gate

The route, stack, language, launch exclusions, Sanity project, and known redirect-list continuity
decision are approved by the project owner. The remaining pre-scaffold work is to create the Astro
project in `web/`, regenerate or remove stale `web/reusable/`, and implement the first vertical
slice.

## 16. Scaffold-Stage FE Self-Check (Claude, implementer)

Recorded per guideline Section 9, before requesting Bob's review, per Bob P2-DEV-07
(`review/bob/CODE-REVIEW.md`) — this entry was originally missing and is added retroactively after
that finding. Scope: the scaffold only (project setup, token/Sanity wiring, schemas) — most FE-xx
gates that govern real page templates, components, and browser behavior are correctly N/A until the
first vertical slice exists, and Bob's independent `review/bob/FE-GATE-AUDIT.md` is the audit of
record, not this self-check.

| Gate | Result | Evidence |
| --- | --- | --- |
| FE-01 Meaning, not appearance | Limited pass | `web/src/pages/index.astro` uses `main`/`h1`/`p`; the WhatsApp-color swatch is a non-interactive `div` with `role="img"`, not a control. No real templates exist to fully assess. |
| FE-02 `<section>` accessible name | N/A | No `<section>` in the scaffold. |
| FE-03 `<article>` for standalone content | N/A | No blog templates yet. |
| FE-04 Repeated siblings are a list | N/A | No repeated UI groups implemented yet. |
| FE-05 Links navigate, buttons act | **Fixed** | Bob's P1-DEV-02 finding (green anchor, `href="#"`) is resolved: the element is now a non-interactive labelled swatch, not an `<a>`. `rg 'href="#"' web/src` returns no matches. |
| FE-06 Heading hierarchy | Limited pass | One `<h1>` on the smoke page; no multi-level hierarchy to assess yet. |
| FE-07 Complete landmarks | Partial | One `<main id="main">`; no header/footer/nav shell built yet. |
| FE-10 Layout method | N/A | No real layouts (Grid vs Flex decisions) implemented yet. |
| FE-11 Absolute positioning | Pass | None used. |
| FE-12 Sibling spacing uses gap | N/A | No sibling groups yet. |
| FE-13 Values come from tokens | Pass | `web/src/styles/global.css` maps `design/tokens/*.css` into Tailwind's `@theme inline`, replacing (not augmenting) Tailwind's default color/text/radius/shadow/tracking/leading/ease scales, so only real brand tokens are reachable as utilities. Token files are byte-identical to `design/tokens/` (`diff -rq` clean) and excluded from Prettier so they stay that way — Bob P3-DEV-01 fixed. |
| FE-14 Mobile-first, no overflow | Unverified | No Playwright/browser pass exists yet; deferred to the first vertical slice per guideline Section 19's testing order. |
| FE-20 Extract on reuse | N/A | No components yet. Studio schema objects (`seo`, `imageWithAlt`, `cta`, `subSection`, etc.) are already extracted for reuse across document types where the design genuinely repeats. |
| FE-21 No monoliths/duplicates | N/A | No component tree yet. |
| FE-22 Content separated from presentation | Pass for the data layer | `docs/CONTENT-MODEL.md` is fully modeled in `studio/schemaTypes/`; `web/src/lib/sanity/types.ts` has explicit interfaces for every `homePage` section (Bob P2-DEV-02 fixed — no `unknown` reaches a typed function signature). No components consume it yet, so full FE-22 can't be assessed until they do. |
| FE-23 Explicit typed component APIs | Partial | Query helper functions are explicitly typed end-to-end against hand-authored interfaces; not yet Sanity-TypeGen-generated (`docs/DECISIONS.md` §4b, open). No components exist yet to check prop typing. |
| FE-24 Business-logic components project-owned | N/A | No forms/search/pagination/redirect *runtime* logic implemented yet (redirect *documents* and validation exist in the schema, not yet consumed by a route). |
| FE-30 One framework | Pass | `web/package.json` has Astro only; no second frontend framework. |
| FE-31 Intentional hydration | Pass | `rg "client:" web/src` — no hydration directives exist. |
| FE-32 No JS for platform behavior | Pass | No client-side JS in the scaffold. |
| FE-33 Astro islands discipline | Pass | No `@astrojs/react`, no islands. `@sanity/astro` (which would have pulled React in as a peer dependency for an unused Studio-embed feature) was deliberately not used — `docs/DECISIONS.md` §4 deviations. |
| FE-34 Data flow and fetching discipline | **Fixed** | Bob's P1-DEV-01 finding (token presence silently switching `perspective` to `"drafts"`) is resolved: `sanityClient` always reads `perspective: "published"`; draft access requires the separate `createPreviewClient()` plus an explicit `ENABLE_SANITY_PREVIEW=true`. Bob's P2-DEV-03 (whole-document fetches, reference-dereferencing category filter) is also resolved: `queries.ts` now uses explicit field projections everywhere and resolves the category slug to `_id` before filtering posts, instead of dereferencing `categories[]->slug.current` per candidate post. |
| FE-40 Dependency ladder | Pass | `docs/DECISIONS.md` §4 records the reasoning for every non-default dependency choice, including reversing `@sanity/astro` for `@sanity/client` after inspecting its peer-dependency footprint (~800 packages pulled in for unused React/Studio-embed features). |
| FE-41 Registry discipline | N/A | No registry components used. |
| FE-42 Registry provenance | N/A | Same as FE-41. |
| FE-50 Typed/lint-clean/buildable | Pass | `web`: `pnpm build`, `pnpm check`, `pnpm format:check` all pass. `studio`: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build` all pass. |
| FE-51 No dead weight | Partial | READMEs are now project-specific (Bob P2-DEV-06 fixed). `@astrojs/sitemap` is installed but not yet configured — deliberately deferred until real routes exist to include in a sitemap, not forgotten; tracked here so it doesn't silently stay unconfigured once routes land. |
| FE-52 Comments explain why | Pass | Source comments throughout `web/` and `studio/` cite the specific design/guideline constraint or Bob finding behind each non-obvious choice, not what the code already says. |
| FE-53 Compiling is not completing | Pass | Root `HANDOFF.md`'s 2026-08-14 scaffold entry and both package READMEs explicitly list what is and isn't built; this scaffold was not represented as a vertical slice or launch-ready. |
| FE-60 Decision ladder | Pass | `docs/DECISIONS.md` §4 deviations show the ladder in use: `@sanity/client` chosen over `@sanity/astro` once the simpler option was confirmed sufficient (rungs 1–3 before reaching for a heavier integration). |
| FE-61 Respect existing codebase | Pass | `studio/`'s existing minimal, correctly-configured scaffold was left untouched rather than re-bootstrapped; the two-package (non-monorepo) layout already decided in §3/§6 was preserved rather than restructured into `apps/`. |

**Summary:** FE-05 and FE-34 were failing (Bob's two P1s) and are now fixed and re-verified above.
All P2 findings tied to a specific FE gate (navItem/redirect URL allowlisting → FE-05/security;
broad `unknown` types → FE-22/23; whole-document GROQ fetches → FE-34; unenforced slug format →
content-model/FE-13 adjacent; Studio dependency pinning → FE-40) are addressed. Gates marked N/A
above remain genuinely not assessable until the first vertical slice exists, per Bob's own scoping
in `review/bob/FE-GATE-AUDIT.md`.
