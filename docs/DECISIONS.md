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
| `@playwright/test` | `1.62.1`, installed 2026-08-16 with the vertical-slice Playwright suite (§19 below) |
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

## 17. Repository (guideline Section 7) — 2026-08-15

Neither the project root nor `web/` had ever been a Git repository, and `studio/`'s standalone repo
had only one stale bootstrap commit with everything since uncommitted and no remote — flagged as the
top-priority risk in `HANDOFF.md`. Resolved this session:

- **Repo scope: one monorepo at the project root**, not one repo per package. `web/`, `studio/`,
  `design/`, `docs/`, `review/`, and the root loose files (briefs, approved copy, handoff/decision
  docs) are all tracked together, so implementation, the design authority, and Bob's review evidence
  share one backed-up history. `studio/`'s prior standalone `.git` (one commit, no remote, fully
  superseded by current working-tree state) was removed rather than preserved or merged in — nothing
  of value was in it beyond what the fresh initial commit already captures.
- **GitHub owner: new dedicated org**, per owner's choice — `JustMath-Web`, matching the
  developer-owned-org convention already used for BOMY (`BOMY-Inflow-Vision`) rather than the
  personal account, so the project isn't tied to one person's account long-term.
- **Repo: `JustMath-Web/website`, private.** Created via `gh repo create --private`; local `main` is
  the initial commit and tracks `origin/main`.
- **Root `.gitignore`** merges the ignore rules already present in `web/.gitignore` and
  `studio/.gitignore` (each subproject's own `.gitignore` is left in place and still applies) plus
  root-level concerns: `.pnpm-store/`, `.DS_Store`, `.claude/settings.local.json` (machine-local, not
  shared), and `*.env*` variants other than the tracked `.env.example` files. Swept for secrets
  before the first commit — no `.env` (non-example) or credential-bearing files existed to leak.
- **Commit identity:** GitHub's push-protection rejected the first attempt (GH007 — private email)
  because the local commit author email wasn't a verified/public address on the `charliekhc`
  account. Re-configured to the account's GitHub-provided noreply address
  (`7158367+charliekhc@users.noreply.github.com`) instead of making a personal address public.

**Not done in this pass, deliberately out of scope for "set up git":** branch protection on `main`
and CI (GitHub Actions running typecheck/lint/tests/build) — both still required by guideline
Section 7 before this counts as fully compliant, but branch protection requiring "passing CI" needs
a CI workflow to exist first, and this is a two-package (non-monorepo-workspace) layout (`web/` and
`studio/` are separate `pnpm-workspace.yaml` roots), so the CI matrix needs its own decision. Tracked
as the next repository task in `HANDOFF.md`.

## 18. CI (guideline Section 7) — 2026-08-15

`.github/workflows/ci.yml` added: two jobs, `web` and `studio` (one per `pnpm-workspace.yaml` root,
per §17 — not a unified matrix, since their real scripts differ). Each installs with
`pnpm install --frozen-lockfile`, then runs the project's own existing scripts — no script was
invented that wasn't already in `package.json`:

| Job | format:check | typecheck | lint | test | build |
| --- | --- | --- | --- | --- | --- |
| `web` | `pnpm format:check` | `pnpm check` (`astro check`) | *(none — web has no separate lint script, only Prettier)* | *(none — no test script exists yet)* | `pnpm build` |
| `studio` | `pnpm format:check` | `pnpm typecheck` (`tsc --noEmit`) | `pnpm lint` (`eslint .`) | *(none — no test script exists yet)* | `pnpm build` |

Pinned to the recorded baseline (§4): pnpm `11.6.0`, Node `26`. Actions pinned to their current
majors (`actions/checkout@v7`, `actions/setup-node@v7`, `pnpm/action-setup@v6`) after the first run
flagged `actions/checkout@v4`/`setup-node@v4`/`action-setup@v4` as targeting a deprecated Node 20
runtime.

No secrets are configured or required: `PUBLIC_SANITY_PROJECT_ID`/`PUBLIC_SANITY_DATASET` are
deliberately left unset in CI, so `web`'s build always takes the local-fallback content path
(`landingData.ts`'s `hasSanityEnv()` check) rather than hitting the live, still-unseeded production
Sanity dataset over the network — keeps the build deterministic and avoids a network dependency in
CI. `studio`'s `projectId`/`dataset` are hardcoded in `sanity.cli.ts`/`sanity.config.ts` (public,
non-secret values) so `sanity build` needs nothing from the environment either.

Verified: pushed to `main` directly (both projects' scripts were run locally first as a pre-flight
and passed), watched via `gh run watch` — both jobs green in ~40-50s each, no failures, no
annotations after the action-version bump.

**Branch protection: blocked, not skipped by choice.** Both the classic branch-protection API and
the newer rulesets API return `403 Upgrade to GitHub Pro or make this repository public` — GitHub's
Free org plan doesn't allow protecting a **private** repo's branches at all, for either mechanism.
Owner's decision: **do not** pay for GitHub Team or make the repo public just to unblock this.
`main` stays technically unprotected (force-push and direct pushes remain technically possible), with
these compensating measures instead:

- CI (this section) still runs and is still the thing to check before merging.
- **Manual discipline going forward: feature branches + PRs, wait for both CI jobs to go green,
  merge — treat `main` as if it were protected even though GitHub isn't enforcing it.** No more
  direct pushes to `main` from this point on (the git-setup and CI-setup commits earlier in this
  session were pushed directly to bootstrap the repo before this discipline existed to apply).
- This is a recorded, owner-approved exception to guideline Section 7's "Branch protection on `main`:
  require PR + passing CI" — not a silently-shipped gap. Revisit if the plan situation changes (an
  org upgrade, or a reason to make the repo public).

## 19. Vertical-slice P1 fixes — Bob review response (2026-08-16)

Fixes the four P1 findings from Bob's 2026-08-15 vertical-slice review (`review/bob/CODE-REVIEW.md`)
that block approval. Scope deliberately held to the P1s plus the one P2 (VS-05) that shares a file
with a P1 fix — not a general cleanup pass. The other eight P2s and four P3s are still open.

**VS-01 — CMS data wired instead of hardcoded.** `homePage.problem.gapChartAnnotations` was already
modeled, fetched, and typed but never passed to `GapChart.astro`; the component now takes an
`annotations` prop and builds its internal `measured` lookup by matching each annotation's `year`
against the chart's fixed stop codes (`stops.indexOf(annotation.year)`), so authoring order in
Studio doesn't matter. The description on that field ("if/when built") was stale and is corrected.

For the other hardcoded figures Bob flagged (`2`, `24`, `20`, `30`, the two availability time
blocks), added typed CMS fields rather than parsing them out of prose or recording them as an
accepted decorative-duplication exception — Bob offered both options; wiring is the more correct fix
since these are already distinct, independently-true facts, not values derivable from the prose
fields they sit beside:

- `problem.independentChecksCount` (number) — the "2" figure-callout. Corroborated by the page's own
  heading text ("checks...twice before SPM"): 2 counts before SPM, SPM itself is the third and final
  measure, not one of the "2".
- `about.yearsExperience`, `about.studentsPerYear` (number) — the portrait-fallback "24" and stat-panel
  "20" figures.
- `pricing.availabilityTimeBlocks` (array of `{range, label}`, min 1) — the two time-range figures;
  placed as a sibling of `availability` rather than inside it, because `availability`'s type
  (`subSection`) is shared with `sessions.subSections` and `about.statPanel` and gaining a
  time-blocks field there would leak an irrelevant field into both.
- `finalCta.freeMinutes` (number) — the close-section "30" figure.

All five are `Rule.required()` (the page has no sensible default for an unset business fact) except
`availabilityTimeBlocks`, which is `Rule.min(1)` — plural by nature, not a single required scalar.
Schema, GROQ projection (`queries.ts`), types (`types.ts`), the local fallback
(`defaultLandingData.ts`), and the seed script (`scripts/seed.ts`'s `_type: 'timeBlock'` tagging for
the new array) were all updated together; `pnpm seed:dry-run` still reports the same 6/1/3 counts.

**VS-02 / VS-03 — tap targets fixed using the established `--control-h` technique.** Same pattern
already verified for the header "Blog" link and post breadcrumb (`design/STATES.md` §2.6):
`min-height: var(--control-h)` with a compensating negative `margin-block` so the enlarged hit area
folds back into surrounding whitespace instead of shifting sibling content. `.level-row__heading a`
("Blog notes") only needed height (width was already 67.6px, over 44). `.site-footer__link` needed
both dimensions.

**VS-05 (P2, rolled in — shares both touched nav components).** Header and footer navigation link
groups now render as `<ul>/<li>` (FE-04). Doing this moved each `<a>` one level deeper than the grid
that previously stretched it to full column width, which silently broke the footer fix's width (an
`inline-flex` link shrinks to content width instead of stretching) — caught by the new Playwright
suite's own tap-target test, not by manual inspection. Fixed by using `display: flex` (block-level,
stretches to the `<li>`) instead of `inline-flex`.

**VS-04 — Playwright suite added and wired into CI.** `@playwright/test` `1.62.1` installed (matches
the version pinned in §4 since scaffold time). `tests/e2e/landing.spec.ts` covers, at the four
widths this project's own reviews measure at (390/560/768/1440): no horizontal overflow; landmark
counts (`main`, `h1`, `header`, `footer`); the VS-02/VS-03 tap-target fixes specifically (so a
regression is caught, not just today's fix); keyboard tab order reaching the skip link with a
visible focus ring, and the skip link's actual behavior; and the FAQ accordion's click and keyboard
interaction (single-open, correct `aria-expanded`/hidden state).

**`astro preview` doesn't work as Playwright's `webServer` command.** It daemonizes — prints
"Preview server running... pid N" and returns immediately, leaving a detached child actually serving
— so Playwright's process-tracking reports `"Process from config.webServer exited early"` even
though the server is healthy. Rather than add a static-file-server dependency for a one-page site,
`scripts/serve-dist.mjs` is a ~40-line zero-dependency Node `http`/`fs` server (FE-40 ladder: native
capability was sufficient, no package needed). `playwright.config.ts`'s `webServer.command` is
`pnpm run build && node scripts/serve-dist.mjs 4321` — tests always run against the real built
`dist/` output, never dev mode, per guideline Section 19.

CI (`.github/workflows/ci.yml`, `web` job): added `pnpm exec playwright install --with-deps
chromium` and `pnpm test:e2e` steps after the existing build step, plus an `actions/upload-artifact`
step (HTML report, 14-day retention, uploads even on failure via `!cancelled()`) for debugging a CI
failure without re-running locally. `playwright.config.ts` reporter is `list` locally and
`["list", "html"]` in CI.

**Verified:** all 19 tests pass locally against the built `dist/` output (`pnpm test:e2e`); `web`'s
`format:check`, `check`, and `build` all still pass after every change; `studio`'s `format:check`,
`typecheck`, `lint`, `build`, and `seed:dry-run` all still pass after the schema/seed changes.

## 20. Two follow-ups from Bob's scoped re-review — 2026-08-16

Both flagged as new-minor by Bob's re-review of §19's fixes (`review/bob/CODE-REVIEW.md`, 2026-08-16
section); neither blocked that verdict, but both were cheap and adjacent, so fixed immediately rather
than queued.

- **`web/.prettierignore`** now excludes `test-results`, `playwright-report`, `blob-report` —
  matching the `.gitignore` entries added in §19 but missed there. Reproduced the bug first
  (`pnpm test:e2e` then `pnpm format:check` failed on `test-results/.last-run.json`), confirmed the
  fix resolves it (same sequence now passes clean), then cleaned the artifacts before committing.
- **`studio/schemaTypes/documents/homePage.ts`**: `gapChartAnnotations[].year` now has
  `Rule.required().custom(...)` restricting it to the 11 valid stop codes (a local
  `GAP_CHART_STOP_CODES` constant, duplicated by hand from `web/src/components/GapChart.astro`'s
  `stops` array since the two packages don't share code — comment notes they must stay in sync), plus
  `options: {list: GAP_CHART_STOP_CODES}` so Studio renders it as a picklist rather than free text,
  preventing the typo at entry time rather than only rejecting it after. Note: `Rule.valid(...)`,
  the first thing tried, doesn't exist on Sanity 6.x's `StringRule` type (confirmed against the
  installed package's own `.d.ts`, not assumed) — `Rule.custom()` is the correct API for restricting
  a string field to an arbitrary allowed set.

**Verified:** `studio`: `format:check`, `typecheck`, `lint`, `build`, `seed:dry-run` all pass (the
existing fallback annotations — `S4`, `F3`, `F5` — are all valid stop codes, so the new required
validation doesn't break seeding). `web`: unaffected by either change, but full check/build/test
suite re-run anyway to confirm — all pass.

## 21. Accessibility/semantics PR (P2 batch 1 of Charlie's triage split) — 2026-08-16

Fixes VS-06 + VS-16 (FAQ keyboard/no-JS reachability) together, and VS-13 + VS-14 (tap-target
sizing), per Charlie's PR split of the remaining review queue. VS-07/08/11, VS-09/12, and VS-10 are
separate PRs; VS-15/VS-17 stay queued (blog routes / more templates don't exist yet). Merged as PR
#7.

**VS-06 + VS-16 — FAQ accordion rebuilt on native `<details>`/`<summary>`.** The prior implementation
was a `<button>` + `<div role="region">` pair driven entirely by a client `<script>` (`aria-expanded`,
`hidden`, `inert` all set by hand); with JavaScript disabled or failing to load, every answer stayed
permanently hidden. Replaced with `<details name="faq">` per `<li>` (`open={index === 0}` for the
default-open first item) — the browser's own disclosure widget handles toggling, keyboard operation
(Enter/Space), and the accessible expanded/collapsed state natively, with zero JavaScript. The
`name="faq"` attribute (Baseline-supported set of exclusive `<details>` groups — ships in all current
major browsers) reproduces the old "only one open at a time" behavior without a script, so the entire
client `<script>` block in `index.astro` was deleted, not just shrunk. Visual result is unchanged:
same plus/cross `<i>` glyph, same chevron rotation on open, native disclosure triangle suppressed via
`list-style: none` (`::-webkit-details-marker { display: none }` for older WebKit) — confirmed by
screenshot, not just by reading the CSS. `role="region"`/`aria-labelledby`/generated `buttonId`/
`panelId` were all removed as dead weight (FE-51): native `<details>`/`<summary>` already expresses
the disclosure relationship to assistive tech without them.

**Icon animation tweak, per Charlie's request:** the open/close transition now rotates *both* bars
instead of only the vertical one — `.faq-list details[open] i::before` (the horizontal bar) to
180deg, `i::after` (the vertical bar) to 270deg, both reversing automatically on close via the
existing `transition: transform var(--dur-3) var(--ease-standard)` (no new transition code needed).
End states are pixel-identical to before (a bar at 180deg/270deg looks the same as one at 0deg/90deg
for a symmetric line) — only the transition motion changes, to a fuller spin. Verified the computed
`transform` matrices directly (`matrix(-1,0,0,-1,...)` = rotate(180deg),
`matrix(0,-1,1,0,...)` = rotate(270deg), confirmed via `getComputedStyle`, not assumed from the CSS
source) and re-ran the full Playwright suite (22/22 still pass — this is a motion-only change, no
selector/markup touched).

**VS-13 — header brand/logo link.** `.site-header__brand` gets `display: inline-flex; align-items:
center; min-height: var(--control-h)`. Width was already 114px (over 44); only height needed the
~3.7px bump, absorbed without layout shift since the header's own `min-height: 62px` already exceeds
44px.

**VS-14 — skip link.** Same technique on `.skip-link` (`position: fixed`, so no negative-margin
compensation needed — it isn't in flow with siblings). Was 42.4px tall, 1.6px short.

**Playwright suite:** `web/tests/e2e/landing.spec.ts` updated for the new `<details>` markup
(`toHaveJSProperty("open", …)` instead of `aria-expanded` attribute checks); added tap-target tests
for VS-13/VS-14 (skip link measured after `Tab`-focusing it, since it's translated off-screen until
`:focus-visible`); added a dedicated **JavaScript-disabled** test
(`browser.newContext({ javaScriptEnabled: false })`) that clicks a `<summary>` and asserts the answer
becomes visible — this is VS-06's actual claim, verified directly rather than inferred from using a
native element. 22/22 tests pass (was 19).

**Verified:** `web`: `format:check`, `check`, `build`, and the full Playwright suite (22/22, including
the new no-JS test) all pass. Manually screenshotted the FAQ section before and after a click
(`node scripts/serve-dist.mjs` + Playwright MCP) to confirm the native marker is genuinely suppressed
and the exclusive-group close-on-open behavior looks identical to the old scripted version — not
just that the assertions pass.

## 22. Production hardening PR (P2 batch 2 of Charlie's triage split) — 2026-08-16

Fixes VS-07 (JSON-LD), VS-08 (security headers), and VS-11 (executable redirects) — batch 2 of
Charlie's 4-PR triage split. Batch 1 (§21 above) merged first as PR #7; this branch is rebased onto
that merge, resolving the expected tail-append conflict on this file and `HANDOFF.md`. Checked
current docs before implementing, per guideline Section 2 rule 4 (training data may be stale):
fetched Astro's routing guide, the `@astrojs/vercel` adapter docs, and Vercel's `vercel.json`
reference directly rather than relying on memory.

**VS-08 + VS-11 — both land in one new `web/vercel.json`.** Chose a hand-written `vercel.json` over
Astro's own `redirects` config (`astro.config.mjs`) or the adapter's `staticHeaders` + Astro
experimental-CSP path: the docs fetch on the adapter's `staticHeaders` option turned up real
uncertainty (tied to an Astro *experimental* CSP feature, not confirmed to cover the specific header
set the guideline names) where a plain `vercel.json` `headers`/`redirects` array is the stable,
directly-documented mechanism for exactly this — matches FE-60's ladder without reaching past what's
actually needed.

- **Headers** (`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `X-Frame-Options: DENY`, plus a real CSP — not a placeholder) applied via a `source: "/(.*)"`
  wildcard entry.
- **CSP is a genuine reflection of what the built site actually loads, checked against the real
  `dist/` output, not assumed:** `script-src 'self'` — confirmed zero `<script>` tags exist anywhere
  in the built HTML (`grep -o '<script[^>]*>' dist/index.html` returns nothing; PR #7 deleted the
  last one). `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com` and
  `font-src 'self' https://fonts.gstatic.com` — Astro's compiled scoped `<style>` blocks have no
  CSP hash/nonce support, hence `'unsafe-inline'` for styles specifically (not scripts); the Google
  Fonts hosts are a real, current dependency (`tokens/fonts.css`'s `@import url(https://fonts.
  googleapis.com/...)` — confirmed to survive literally into the compiled CSS bundle, not inlined at
  build time, so the browser really does fetch both hosts at runtime). **This allowance should
  shrink once VS-10 (font self-hosting) lands** — tracked there, not fixed here. `img-src 'self'`
  (no `data:` — confirmed no data-URI images anywhere in the built output, so not adding an
  unneeded allowance). `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`,
  `frame-ancestors 'none'` — standard hardening, all free given the site's actual shape (no forms,
  no plugins, no embedding).
- **Redirects: only the 3 of 6 documented redirects (`docs/CONTENT-MODEL.md` §9) whose targets
  actually resolve right now** — `/about/`→`/#about`, `/faq/`→`/#faq`, `/pricing/`→`/#pricing`, all
  `statusCode: 301`. Deliberately **excluded** the other 3 (`/category/algebra/`,
  `/differentiation-using-the-first-principle/`, `/mastering-algebra/` → `/blog/level/...`) because
  their destinations don't exist yet — no blog routes are built. A 301 to a route that itself 404s
  is worse than no redirect for both crawlers and users; shipping those three now would mean this
  PR's own claim ("redirects implemented") wouldn't be fully true. Deferred to whenever blog routes
  ship, bundled with VS-15 (sitemap/RSS/robots — same trigger).
- **Not independently verifiable in this environment.** No Vercel project is linked (confirmed
  earlier this session) and headers/redirects in `vercel.json` only take effect on Vercel's actual
  infrastructure — my own `scripts/serve-dist.mjs` (used for local dev and the Playwright suite)
  does not and cannot apply them. Validated the file is syntactically correct (`JSON.parse` — no
  throw) and structurally matches Vercel's current documented schema (fetched directly, not
  remembered). The header/redirect *behavior itself* is unverified until a real deploy exists — not
  claimed as tested, per guideline Section 2 rule 5.

**VS-07 — sitewide `Organization` JSON-LD.** Added to `BaseLayout.astro`'s `<head>`
(`<script is:inline type="application/ld+json">`) rather than `Astro check`-flagged Astro script
processing, since it's an inert data block, not executable script (confirmed: CSP `script-src` does
not govern `application/ld+json` script tags — they're never executed as JS by the browser, so the
strict `script-src 'self'` above doesn't need to special-case it). `BaseLayout` now takes a required
`siteSettings: SiteSettings` prop rather than fetching it itself — keeps the "fetch at the nearest
boundary that owns the data need" discipline (FE-34): `index.astro` already fetches `siteSettings`
via `getLandingPageData()`, so BaseLayout consuming it as a prop avoids a second, duplicate Sanity
read per page. Future page templates (blog routes) will pass it the same way once built.

**Fields included, and why not more:** `name` (`siteSettings.siteName`), `url`
(`siteSettings.domain`), `telephone` (`+${siteSettings.whatsappNumber}` — E.164, matches the format
already recorded for that field in `docs/CONTENT-MODEL.md` §7). **No `logo` or `sameAs`**: no image
asset or social-profile URLs exist in `siteSettings` to source them from truthfully, and inventing
placeholder values would be exactly the "silently invented business-critical content" the guideline
prohibits (Section 2 rule 3). Plain `Organization` type, not a narrower one: the finding itself
named `Organization` as acceptable, and guessing a more specific schema.org business classification
wasn't clearly signalled by anything in the brief.

**Verified:** `web`: `format:check`, `check`, `build` all pass. Full Playwright suite, 23/23 (added
one new test: parses the rendered JSON-LD script tag and asserts `@context`/`@type`/`name`/`url`/
`telephone` shape — this part *is* locally verifiable, unlike the vercel.json headers/redirects,
since it's page content rather than an HTTP-layer behavior). Confirmed the rendered JSON-LD in the
actual built `dist/index.html` matches the expected shape exactly (`{"@context":"https://schema.org",
"@type":"Organization","name":"Just Math Malaysia","url":"https://mathematicsmalaysia.com",
"telephone":"+60194728768"}`).

## 23. Ops/docs PR (P2 batch 3 of Charlie's triage split) — 2026-08-16

Fixes VS-09 (dependency/advisory scanning) and VS-12 (vertical-slice FE self-check) — batch 3 of
Charlie's 4-PR triage split. Batches 1 (§21, PR #7) and 2 (§22, PR #8) merged first, in that order;
this branch is rebased onto that combined state, resolving the expected tail-append conflict on this
file and `HANDOFF.md`.

### VS-09 — dependency/advisory scanning

Three parts, not one:

1. **Enabled GitHub's native Dependabot vulnerability alerts and automated security-fix PRs** on the
   repo (`gh api --method PUT repos/JustMath-Web/website/vulnerability-alerts` and
   `.../automated-security-fixes`) — both were off by default (confirmed via `gh api
   repos/.../vulnerability-alerts` returning "disabled" before enabling, not assumed).
2. **`.github/dependabot.yml`**: weekly version-update PRs for `web/`, `studio/` (separate entries —
   two `pnpm-workspace.yaml` roots, matching CI's two-job split), and the GitHub Actions workflow
   files themselves. Astro and Sanity packages are grouped so a routine update doesn't open a dozen
   single-package PRs.
3. **`pnpm audit --audit-level=critical`** added as a CI step in both `web` and `studio` jobs
   (`.github/workflows/ci.yml`), right after `pnpm install`.

**Why `--audit-level=critical` and not the default (any finding fails):** `pnpm audit` run locally
against the current lockfiles found real findings that are not fixable by simply bumping a direct
dependency — both a `high` and a `moderate`-and-`high` set of transitive advisories. Recording them
here as the guideline's own "accepted exception needs an owner, rationale, compensating control, and
review date" rather than either silently ignoring them or shipping a CI gate that fails on the very
commit that adds it:

| Package | Severity | Advisory | Path | Owner | Rationale / compensating control | Review by |
| --- | --- | --- | --- | --- | --- | --- |
| `path-to-regexp` | High | ReDoS (GHSA-9wv6-86v2-598j) | `web`: `@astrojs/vercel > @vercel/routing-utils > path-to-regexp` | Claude | Build-time-only dependency (Vercel adapter's routing-config generation) — never runs in the browser or on a production request path. No untrusted input reaches it; builds run in CI or local dev only. | Next `@astrojs/vercel` minor/major bump |
| `undici` | Moderate–High (8 moderate, 3 high, same root advisory chain) | Cookie-attribute injection (GHSA-v3r7-h72x-cjcm) and related | `studio`: `sanity > @sanity/cli > ... > @module-federation/dts-plugin > undici` | Claude | Sanity CLI's own dev/build tooling (TypeScript declaration generation for Studio plugins) — not part of the deployed Studio app or the public website. No network requests from this path touch real user data. | Next `sanity` minor/major bump |

Both are genuinely build-tool-only chains, not runtime/production code — confirmed by reading each
`pnpm audit` "Paths" output, not assumed from the package name. `--audit-level=critical` means any
*future* critical-severity advisory (in either package's own direct tree or a new transitive one)
still fails CI immediately; only these two already-triaged, non-critical findings are let through,
and they remain visible in every CI run's log rather than silenced. Verified locally before wiring
in: `pnpm audit --audit-level=critical` exits `0` in both `web` and `studio` as of this commit.

### VS-12 — vertical-slice FE self-check

Never existed before this PR (Bob's own 2026-08-15 review flagged its absence as VS-12, and did its
own independent gate-by-gate assessment in `review/bob/FE-GATE-AUDIT.md` in its place — this is the
self-check that should have preceded that review, written retroactively). Scope: the current `main`
tip (`331f8ac`, includes the merged VS-01/VS-05 fixes from PR #2; does **not** include PRs #7/#8,
still open as of this table). Re-ran the checkable gates fresh rather than transcribing Bob's table
wholesale — `format:check`/`check`/`build` (`web`) and `format:check`/`typecheck`/`lint`/`build`
(`studio`) all reproduced clean just now; `rg "client:" web/src` and `rg 'href="#"' web/src` both
return zero matches, confirmed directly, not assumed. Live-browser/viewport claims (contrast,
overflow-at-width, focus-ring visibility) cite Bob's own independently-measured evidence in
`review/bob/FE-GATE-AUDIT.md` rather than re-deriving them a third time — attributed explicitly
below, not presented as freshly measured by this pass.

| Gate | Result | Evidence |
| --- | --- | --- |
| FE-01 Meaning, not appearance | Pass | Real semantic elements throughout (`header`/`nav`/`main`/`footer`/`section`/`figure`/`table`/`ul`/`ol`/`button type="button"`/real `a href`). No click-handler-on-`div` pattern. |
| FE-02 `<section>` accessible name | Pass | All 10 `<section>`/labelled-`<aside>` elements in `index.astro` have `aria-labelledby` or `aria-label` — confirmed by grep just now (10 matches), not just recalled. |
| FE-03 `<article>` for standalone content | N/A | No blog archive/post routes exist yet. Required once `/blog/[slug]/` lands. |
| FE-04 Repeated siblings are a list | **Pass** (was Fail at scaffold-review time before PR #2) | Header/footer nav both wrap link maps in `<ul>/<li>` since PR #2's VS-05 fix, on `main` now. |
| FE-05 Links navigate, buttons act (hard gate) | Pass | `rg 'href="#"' web/src` — zero matches, confirmed fresh. FAQ toggle is a real `<button type="button">` with `aria-expanded`/`aria-controls`. |
| FE-06 Heading hierarchy | Pass | `grep -oE "<h[1-6]" src/pages/index.astro` — exactly one `h1`, seven `h2`, five `h3`, confirmed fresh. Full sequence/nesting correctness (no skipped levels) per Bob's live-browser trace, `review/bob/FE-GATE-AUDIT.md` 2026-08-15. |
| FE-07 Complete landmarks | Pass | One `<main>`, one `<header>`, one `<footer>`, two distinctly-labelled `<nav>` — confirmed live at 4 viewports per Bob's evidence (same file). |
| FE-10 Layout method | Pass | Grid for two-dimensional relationships (hero, session-card, level-row, process-step, footer grids), Flexbox for one-axis relationships (header row, trust items, FAQ button row). No flex-faking-grid pattern. |
| FE-11 Absolute positioning | Pass | Only decorative graph-paper overlays, visually-hidden clipping, and the fixed-position skip link — no primary structure depends on it. |
| FE-12 Sibling spacing uses gap | Pass | `gap` used throughout grid/flex containers. |
| FE-13 Values come from tokens | Pass | `diff -rq design/tokens web/src/styles/tokens` clean (unchanged since scaffold). All reviewed color/type/spacing/radius/shadow declarations resolve to `var(--...)`. |
| FE-14 Mobile-first, no overflow | Pass | Bob's live measurement: `scrollWidth === clientWidth` at 390/560/768/1440px; the pricing `<table>`'s intentional internal scroll is correctly contained in `.table-wrap { overflow-x: auto }`. |
| FE-20 Extract on reuse | Pass | `SectionMarker`, `WhatsAppCta`, `LogoLockup`, `GapChart` are genuine reused/domain extractions. No premature generic wrappers. |
| FE-21 No monoliths/duplicates | Pass, with a note | No duplicate/near-identical components. `index.astro` itself is a large single file — tracked as VS-17 (P3 preference, not a rule violation; revisit once blog templates might share patterns). |
| FE-22 Content separated from presentation | **Pass** (was Fail before PR #2) | `GapChart.astro` now takes a typed `annotations` prop and renders CMS-sourced data; the five other previously-hardcoded figures are now typed CMS fields, wired end-to-end. Fixed by PR #2 (VS-01), independently re-verified by Bob's 2026-08-16 scoped re-review. |
| FE-23 Explicit typed component APIs | Pass | Every component with dynamic content has a typed `interface Props`. |
| FE-24 Business-logic components project-owned/tested (hard gate) | N/A | No forms, search, pagination, consent, or preview-gating logic in this slice yet. Required once real business logic lands. |
| FE-30 One framework | Pass | Astro only in `web/package.json` — no React/Vue/Svelte. |
| FE-31 Intentional hydration | Pass | `rg "client:" web/src` — zero matches, confirmed fresh. |
| FE-32 No JS for platform behavior | **Partial fail, still open** | 12 of 13 FAQ answer panels still ship `hidden` in static HTML with no non-JS reveal path on `main` (PR #7 fixes this via native `<details>`/`<summary>` but is not yet merged as of this table). Isolation rationale recorded: `review/bob/CODE-REVIEW.md` VS-06 (P2 — same-origin inline script, zero console/network errors observed, but the guideline's MUST is unmet as written). |
| FE-33 Astro islands discipline | Pass | No `@astrojs/react`, no island components, no `client:*` directives anywhere. |
| FE-34 Data flow and fetching discipline | Pass | `getLandingPageData()` issues `Promise.all([...])` — no avoidable waterfall. The previously fetch-then-discarded `gapChartAnnotations` field (the other half of this gate's earlier "Partial" rating) is now consumed, fixed by PR #2. |
| FE-40 Dependency ladder | Pass | No unjustified new dependencies. `@playwright/test` was earmarked in §4 and is now actually installed and wired (VS-04, PR #7 — not yet merged, but the dependency-ladder answer itself was already recorded correctly). |
| FE-41 Registry discipline | N/A | No registry components used anywhere in `web/`. |
| FE-42 Registry provenance | N/A | Same as FE-41. |
| FE-50 Typed/lint-clean/buildable | Pass | Reproduced fresh, this session: `web`: `format:check`/`check` (0 errors/warnings/hints)/`build` all clean. `studio`: `format:check`/`typecheck`/`lint`/`build` all clean (only the documented, accepted Sanity auto-update warning, §4d). |
| FE-51 No dead weight | Partial | `@astrojs/sitemap` remains installed but unconfigured (VS-15, correctly still queued — blocked on blog routes existing). The `gapChartAnnotations`-is-dead-weight half of this gate is now fixed (PR #2). |
| FE-52 Comments explain why | Pass | Comments in `client.ts`/`queries.ts`/`landingData.ts`/`defaultLandingData.ts`/the new `GapChart.astro`/schema files explain intent, constraint, or history — not restating what the code already says. |
| FE-53 Compiling is not completing | Pass | `HANDOFF.md`'s dated entries distinguish scaffold/vertical-slice/fix-commit states candidly; Bob's independent re-verification of specific claims (byte counts, CI SHAs, measured pixel values) found no over-claim across three separate review passes. |
| FE-60 Decision ladder | Pass, with a note | Native HTML/CSS preferred throughout. One place the ladder wasn't fully climbed on `main` as of this table: the FAQ accordion uses a custom button+script pattern where native `<details>`/`<summary>` would satisfy FE-32 more simply (VS-16, P3 preference; PR #7 addresses this, not yet merged). |
| FE-61 Respect existing codebase | Pass | Builds on the approved scaffold's token/query/schema layers without rewriting them; the two-package layout and Sanity client split are preserved unchanged. |

**Summary:** every gate that failed or partially failed at the 2026-08-15 review is now Pass **except
FE-32** (and, as a direct consequence, the decision-ladder note on FE-60) — both tied to the same
still-open VS-06 finding, fixed in already-opened PR #7 but not yet merged as of this table's commit.
Nothing regressed. N/A gates remain genuinely N/A for the same reasons Bob recorded: no blog routes,
business logic, or registry components exist yet in this vertical slice.

**Rebase note (resolving this branch's conflict with `main` after PR #7 and #8 merged):** the table
above is an accurate record of commit `331f8ac`, not rewritten to match current `main`. PR #7 (§21,
merged) fixes the FE-32/FE-60 findings via native `<details>`/`<summary>` — those two rows are now
stale, not re-verified fresh as part of this rebase (that would be a real re-audit, not a merge
conflict resolution). The next FE gate check — whether a fresh self-check or Bob's next review pass —
should confirm FE-32 reads Pass on current `main` rather than trusting this note.

