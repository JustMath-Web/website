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
| Cloudflare Pages management | Cloudflare dashboard available in browser | Dashboard/GitHub integration remains acceptable for account setup |
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
| Hosting target | Cloudflare Pages |
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
| Astro adapter | none (static Cloudflare Pages deploy) |
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
`web/` with `schema: '../studio/schemaTypes/**/*.ts'`, output kept inside `web/` so the build
stays self-contained). Deferred until real page queries exist to scan; do not treat `types.ts` as
generated until this is wired and re-run.

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
- Astro on Cloudflare Pages docs: `https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/`
  (superseded `https://vercel.com/docs/frameworks/frontend/astro`, consulted at scaffold time when
  hosting was still Vercel — see §32)
- Package versions: `pnpm view`

## 5. Recurring Cost Assumptions

Checked on 2026-08-14.

| Service | Assumption | Source |
| --- | --- | --- |
| Cloudflare Pages | Free plan: unlimited static-asset requests/bandwidth, 500 builds/month, 1 concurrent build, 20-minute build timeout — comfortably covers this project's traffic and deploy cadence; re-check if build volume or a Functions/SSR need ever appears | `https://developers.cloudflare.com/pages/functions/pricing/`, `https://developers.cloudflare.com/pages/platform/limits/` (checked 2026-08-30, replaces the Vercel row below — see §32) |
| Sanity | Existing project can be used; Free may work technically, Growth is USD 15/seat/month when Editor/Developer roles or collaboration features are required | `https://www.sanity.io/pricing` |
| Resend | Not used at launch. If forms/email are added, Free is 3,000 emails/month with 100/day cap; Pro starts at USD 20/month | `https://resend.com/docs/knowledge-base/what-is-resend-pricing` |
| Cloudflare Turnstile | Not used at launch. If forms are added, Free plan is sufficient for most production applications | `https://developers.cloudflare.com/turnstile/plans/` |
| ~~Vercel~~ (superseded 2026-08-30, §32) | Use Pro for commercial hosting; current listed entry price is USD 20/month | `https://vercel.com/pricing` |

Client-facing services should be client-owned or explicitly documented as developer-managed during
maintenance. The build/request limits above were confirmed against Cloudflare's own docs
(2026-08-30); whether Cloudflare's free plan carries any commercial-use restriction was **not**
confirmed from an authoritative source during this check — verify against Cloudflare's actual Terms
of Service before treating the free plan as settled for this commercial site, same standard the
guideline already applies to Vercel Hobby.

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
Redirects are implemented in `web/public/_redirects` (Cloudflare Pages, since §32) — keep the
redirect map small and test each route against a preview deployment before merging.

Known limitation: this is not a full continuity audit. Missing: indexed URL export, Search Console
data, backlink inventory, analytics history, complete WordPress content export, plugin/integration
inventory, old sitemap/feed inspection, and full redirect parity.

### 10a. Continuity audit completed — 2026-09-05

The "known limitation" above is now **closed for URL inventory and redirect parity**. Four of the
eight missing inputs were obtained; the rest are recorded as still-open below.

**Method.** The inventory is the **union** of all six legacy sitemaps and Search Console
`Pages.csv` (Web, last 16 months, to 2026-09-04). The union is load-bearing, not belt-and-braces:
`/writer/kongsf/` returns 200 and carries 26 impressions at avg. position 9.08 while appearing in
**no sitemap**. A sitemap-only audit — which is what the original list above was — misses it. That
is also why the table above listed 7 URLs and this one lists 19.

**Full inventory and decisions.** Impressions/position are 16-month Search Console totals.

| Old URL | Clicks | Impr | Pos | Decision |
| --- | ---: | ---: | ---: | --- |
| `/` | 27 | 1533 | 11.32 | Served natively |
| `/blog/` | 0 | 31 | 8.32 | Served natively |
| `/pricing/` | 9 | 111 | 15.41 | 301 → `/#pricing` — **see risk below** |
| `/about/` | 0 | 82 | 15.49 | 301 → `/#about` |
| `/faq/` | 0 | 62 | 22.56 | 301 → `/#faq` |
| `/writer/kongsf/` | 0 | 26 | 9.08 | 301 → `/#about` (new; sitemap-invisible) |
| `/online-mathematics-tuition-form-1-chapter-2/` | 1 | 113 | 8.22 | 301 → `/blog/level/form-1-3/`; **best 1:1 refresh candidate** (new) |
| `/differentiation-using-the-first-principle/` | 0 | 59 | 36.76 | 301 → `/blog/level/add-maths/`; 1:1 refresh candidate |
| `/chapter-1-rational-numbers/` | 0 | 8 | 7.00 | 301 → `/blog/level/form-1-3/` (new) |
| `/mastering-algebra/` | 0 | 2 | 6.00 | 301 → `/blog/level/form-1-3/` |
| `/category/math/` | 0 | 2 | 7.00 | 301 → `/blog/` (new) |
| `/category/form-1/` | 0 | 2 | 8.00 | 301 → `/blog/level/form-1-3/` (new) |
| `/category/rational-numbers/` | 0 | 1 | 6.00 | 301 → `/blog/level/form-1-3/` (new) |
| `/category/differentiation/` | 0 | 0 | — | 301 → `/blog/level/add-maths/` (new) |
| `/category/algebra/` | 0 | 0 | — | 301 → `/blog/level/form-1-3/` |
| `/sample-page/` | 0 | 0 | — | **No redirect — 404 by decision** |
| `/optin_confirmation/` | 0 | 0 | — | **No redirect — 404 by decision** |
| `/preference_page/` | 0 | 0 | — | **No redirect — 404 by decision** |
| `/unsubscribe_confirmation/` | 0 | 0 | — | **No redirect — 404 by decision** |

**Why those four 404 rather than redirect.** WordPress and mailing-list plumbing with zero clicks
and zero impressions across 16 months. The new site has no forms and no lead capture at all (§11),
so there is no honest target; pointing them at the home page would be a soft-404. This is a recorded
decision, not an oversight. Note `_redirects` on Workers Static Assets supports only 301/302/303/
307/308 — **410 is not available**, so these fall through to the default 404.

**Recorded risk — `/pricing/` is the property's best-converting page.** 9 clicks from 111
impressions is an 8.11% CTR against a site-wide average of 2.03% (37/1,821): 24% of all site clicks
from 6% of impressions, and the only page besides the home page with meaningful clicks. (Its avg.
position of 15.41 is identical to Malaysia's country-level 15.41 — verified as a coincidence in
`Pages.csv` line 3, not a transcription error. Noted so the check is not repeated.) It is being folded into an anchor on the one-pager,
along with `/about/` (82 impr) and `/faq/` (62 impr) — 255 impressions, 14% of the property, on
three URLs that cease to exist as pages. The one-pager architecture is a deliberate design decision
and this entry does not reverse it, but the cost is now measured rather than assumed, and it should
be revisited if pricing intent shows up in post-cutover Search Console.

**Resolved 2026-09-05 — the one-pager stands; do not build a standalone `/pricing/` page.** The risk
above was briefly escalated to "the one architecture change this data supports". A page-level query
cross-tab settled it and the escalation was wrong. `/pricing/`'s visible queries over 16 months are
`maths enrichment class` (1 click), `malaysia ai math class for kids` (3 impr), `maths enrichment
classes` (2), `just math` (1), `math enrichment class` (1) — **zero fee intent**, and widening the
check to all 62 property queries returns zero for *price/pricing/fee/cost/rate/charge/yuran/harga/
berapa* as well. The page earns stray *enrichment* traffic for a service the business does not sell
under that name, plus brand traffic the 301 preserves anyway.

Two framing corrections worth keeping: **the rebuild does not delete pricing** — the table is on the
page and the 301 leads to it; only a separately rankable URL is lost. And **9 clicks over 16 months
is ~0.5/month** — the "24% of all clicks" figure is true only because the property earned 37 clicks
in total, and it was quoted without the small-base caution applied everywhere else in this analysis.

Caveat, stated: 93% of `/pricing/`'s impressions are below Search Console's anonymisation threshold,
so this is *no support for the justifying hypothesis*, not proof of no fee demand. It is enough to
decide, because reversing a recorded architecture decision needs affirmative cause and none appeared.
Re-test at the post-cutover re-pull (`copywriting/SEARCH-STRATEGY.md` §6) — at which point the move
would be adding a page, not un-picking an aged redirect.

**Still open.** No 404 page exists (`web/src/pages/404.astro` absent, no `not_found_handling` in
`wrangler.jsonc`), so the four deliberate 404s and any stray legacy URL return a bare, unbranded
404. A real 404 page needs approved copy and is therefore a separate change. Backlink inventory,
complete WordPress content export, and plugin/integration inventory remain unobtained; none of them
block redirect parity, which is what this entry closes.

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

### 12a. Blocker resolved — legacy IDs reused, implemented 2026-09-05

The owner confirmed on 2026-09-05 that the IDs running on the legacy WordPress site are his to
reuse, which closes §12's blocker. Implemented as:

| Item | Value | Where |
| --- | --- | --- |
| GTM container | `GTM-KP5SMKV` | `web/src/lib/analytics.ts` |
| GA4 measurement ID | `G-6EWT7G0LZS` | Recorded only — **not** loaded on the page, see below |
| Search Console verification | `gph_0vw9…sgtQ` | `<meta>` in `BaseLayout.astro` |

**GTM is the single container, per §12 — GA4 is deliberately not a second on-page tag.** The legacy
site loads both (`gtag/js?id=G-6EWT7G0LZS` *and* `gtm.js?id=GTM-KP5SMKV`). Mirroring that here would
double-count every pageview if the container also holds a GA4 tag, and container contents cannot be
inspected from outside.

> **Must be confirmed before cutover:** open the GTM container and check a **GA4 Configuration tag
> for `G-6EWT7G0LZS` exists in it**. If it does not, add it *there* rather than adding a second
> on-page tag. Then verify in GA4 Realtime after cutover. If this is skipped and the container has
> no GA4 tag, analytics will load and collect nothing.

**Search Console verification is load-bearing and easy to lose.** The property is verified by **meta
tag**, and `dig TXT mathematicsmalaysia.com` returns nothing — there is no DNS fallback. When the
domain stops serving WordPress, verification breaks unless the new site carries that tag. It now
does, on every page type, covered by a test. Losing it means losing the property and its 16 months
of query history, which is the baseline `copywriting/SEARCH-STRATEGY.md` schedules a re-pull against.

> **Owner action before cutover — add a DNS TXT record as a SECOND verification method on the
> EXISTING property.** The distinction matters and is easy to get wrong: creating a new *Domain*
> property does **not** protect the history — it starts at zero. Search Console permits multiple
> verification methods on one property, so adding TXT to the existing URL-prefix property removes
> the single point of failure without touching the history. The meta tag then stops being the only
> thing standing between a deploy and losing the baseline.

> **Owner action — review who has access to the GTM container.** `script-src` now allows
> `https://www.googletagmanager.com`, which means anyone who can publish in that container can
> execute arbitrary JavaScript on this site. That is inherent to GTM rather than a flaw in this
> implementation, but the container is inherited from the legacy site and its access list has never
> been established. The CSP is now exactly as strong as that list. Check it at the same time as the
> GA4 tag check above.

**Dev/test isolation is by hostname, not build flag.** §12 requires production analytics off in
local/dev/test, but a build-time flag is insufficient here: the production build is what deploys to
`*.workers.dev` preview URLs while the site is still pre-launch behind `Disallow: /` (§13/§27).
`public/analytics.js` therefore no-ops unless `location.hostname === "mathematicsmalaysia.com"`, so
it is inert everywhere today and self-activates at cutover with no follow-up deploy.

**CSP was widened, minimally, and no `'unsafe-inline'` was introduced.** GTM's documented snippet is
inline JS, which `script-src 'self'` blocks; using it would have forced `'unsafe-inline'` sitewide to
install one tag. The loader is a static same-origin file instead, and the site still ships zero
executable inline scripts (JSON-LD data blocks excepted) — asserted by test. Added to
`web/public/_headers`: `googletagmanager.com` on `script-src`/`img-src`, and a new `connect-src` for
the GA4 beacon hosts (previously these fell back to `default-src 'self'`, which would have silently
dropped every hit).

**`<noscript>` fallback added 2026-09-05** at the owner's request, matching his supplied install
snippet, with `frame-src https://www.googletagmanager.com` added to the CSP for it. One limitation
recorded rather than hidden: unlike the head tag it **cannot be RUNTIME-gated**, because the gate is
JavaScript and this element exists for agents that run none. It *could* be gated at build time via
an env var, which would remove the exception entirely; that option was considered and deliberately
not taken, because the exposure below does not justify a second configuration path. It is therefore the single analytics
surface that is not inert on preview URLs pre-cutover. Exposure is small — it fires only for a
visitor executing no JavaScript that also loads iframes, which excludes ordinary browsers and most
crawlers — and GA4 cannot record a session from it regardless.

**Consent:** still none, and none added. §12's condition ("if non-essential tags require it for the
chosen target markets") is unresolved — Malaysia's PDPA does not impose a GDPR-style prior-consent
rule for analytics cookies, but this has not been checked against the actual tags in the container,
which cannot be inspected from outside. **Open item**, carried, not silently closed.

**Tests:** `web/tests/e2e/analytics-host-gate.spec.ts` — the tag ships with its configuration but
fires no Google request off-host and leaves `dataLayer` undefined; the verification meta is present
on home, blog archive and category pages; no executable inline script exists.

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
- **Remove the pre-launch noindex guard** (`web/public/robots.txt`, `web/public/_headers`'s
  `X-Robots-Tag` header — added §27, moved from `vercel.json` to `_headers` in §32) and connect the
  real custom domain before treating the site as launched. Added 2026-08-18 after Bob's PR #20
  re-review caught the production Vercel deployment being publicly indexable while every other
  condition above was still open.

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

**Branch protection: blocked, not skipped by choice (2026-08-16).** Both the classic branch-protection
API and the newer rulesets API return `403 Upgrade to GitHub Pro or make this repository public` —
GitHub's Free org plan doesn't allow protecting a **private** repo's branches at all, for either
mechanism. Owner's decision at the time: **do not** pay for GitHub Team or make the repo public just
to unblock this. `main` stays technically unprotected (force-push and direct pushes remain technically
possible), with these compensating measures instead:

- CI (this section) still runs and is still the thing to check before merging.
- **Manual discipline going forward: feature branches + PRs, wait for both CI jobs to go green,
  merge — treat `main` as if it were protected even though GitHub isn't enforcing it.** No more
  direct pushes to `main` from this point on (the git-setup and CI-setup commits earlier in this
  session were pushed directly to bootstrap the repo before this discipline existed to apply).
- This is a recorded, owner-approved exception to guideline Section 7's "Branch protection on `main`:
  require PR + passing CI" — not a silently-shipped gap. Revisit if the plan situation changes (an
  org upgrade, or a reason to make the repo public).

**Resolved 2026-08-18 — §27.** The repo went public as part of PR #20 (Vercel git-connect required
it), which is exactly the "revisit" trigger named above. Bob's PR #20 re-review caught that branch
protection had not actually been turned on despite the blocker being gone — real protection is now
enabled (required status checks `web`/`studio`, required PR, `enforce_admins`, force-push and
deletion blocked). Full detail in §27.

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

## 24. Font self-hosting — VS-10 (guideline Section 7 rule 4) — 2026-08-16

Fixes VS-10, the last item from Bob's 2026-08-15 review's original P2/P3 queue (batch 4 of Charlie's
4-PR triage split — batches 1–3 are §21/§22/§23, all merged). Branched from `main` after PR #11
(merge-log backfill for #7/#8/#9) merged, per Charlie's explicit instruction not to start this PR on
an older `main`.

**License checked first, not assumed** (guideline Section 7 rule 4: "confirm the license first;
self-host when permitted"): `node_modules/@fontsource/ibm-plex-{serif,sans,mono}/package.json`
each report `"license": "OFL-1.1"`, and each package ships its own `LICENSE` file — the SIL Open Font
License explicitly permits embedding, self-hosting, and subsetting.

**Chose `@fontsource` over manually downloading/subsetting binaries.** Fontsource repackages the
same upstream IBM Plex release under the original OFL terms, already split per-subset per-weight
per-style (e.g. `latin-600-italic.css`, `latin-ext-600-italic.css`, `cyrillic-600-italic.css`, ...),
each with `font-display: swap` already set and both `.woff2`/`.woff` provided. That per-subset split
is exactly what "subset only to glyphs/languages the site actually supports" requires — this site is
`en-MY`, Latin script only (confirmed: no CJK/Cyrillic/Greek content anywhere in `docs/CONTENT-MODEL.
md` or the CMS schema), so only the `latin-*` files were imported, never the combined `{weight}.css`
files (which bundle every script IBM Plex supports — cyrillic, cyrillic-ext, greek, vietnamese, and
more — into one `@font-face` per subset, wastefully shipped to every visitor regardless of need).
Hand-rolling subsetting with `pyftsubset` would reproduce the same output with more surface for error
and no verifiable provenance back to the upstream release.

**Exact weights/styles matched to what the old Google Fonts `@import` requested** — no more, no
fewer: IBM Plex Serif 400/500/600/700 normal + 400/600 italic (wordmark + display), IBM Plex Sans
400/500/600/700 normal + 400 italic (UI text), IBM Plex Mono 400/500/600 normal only (numerals — the
original request had no mono italic). 14 `@import`s total in `web/src/styles/tokens/fonts.css`,
each a bare npm-package specifier (`@import "@fontsource/ibm-plex-serif/latin-600.css";`) resolved by
Vite's CSS import pipeline — the same mechanism `global.css` already relies on one line down for
`@import "tailwindcss"`, so this isn't a new or unproven resolution path.

**Verified directly in the built output, not assumed:**

- `grep -rn "googleapis\|gstatic" dist/` — zero matches (previously present).
- `find dist -iname "*.woff2"` — 14 files, one per import, all under `dist/_astro/`, hashed filenames
  (Vite's normal asset pipeline).
- Parsed the compiled CSS for `@font-face` blocks — 14 total, each with both `.woff2` and `.woff`
  `src` entries and `font-display:swap` intact.

**CSP tightened in `web/vercel.json`** (the follow-up §22 flagged as pending): removed
`https://fonts.googleapis.com` from `style-src` and `https://fonts.gstatic.com` from `font-src` — no
longer real dependencies once every font byte ships from the same origin. New CSP: `default-src
'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self';
object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`. `'unsafe-inline'`
on `style-src` remains for the same reason recorded in §22 (Astro's compiled scoped `<style>` blocks
have no CSP hash/nonce support) — unrelated to fonts, not touched here.

**Test fix, caught by the suite itself, not introduced deliberately:** the VS-14 skip-link tap-target
test (`tests/e2e/landing.spec.ts`) started failing intermittently after this change —
`box!.height` measuring `43.99999809265137` against a `>= 44` assertion. Root cause isn't a real
layout regression (manual inspection via `getComputedStyle`/`getBoundingClientRect` outside the test
runner showed a clean `44px`/`44` every time): the test calls `.boundingBox()` immediately after
`page.keyboard.press("Tab")`, with no wait for `.skip-link`'s own `transform` CSS transition
(`transition: transform var(--dur-2) var(--ease-out)`, triggered on focus) to finish — a pre-existing
race that local vs. CDN font-load timing was apparently close enough to the boundary to expose.
Fixed by awaiting the element's `transitionend` event (listener attached before the `Tab` press, to
avoid missing it) before measuring, rather than loosening the `>= 44` threshold — the test should
assert the final resting size, not a mid-animation frame. Reran the full suite twice clean (23/23
both times) after the fix to confirm it wasn't a one-off pass.

**Verified:** `web`: `format:check`, `check`, `build`, full Playwright suite (23/23, ×2 consecutive
clean runs). `pnpm audit --audit-level=critical` still exits `0` — only the pre-existing, already
-accepted `path-to-regexp` high finding remains (§23's `undici` row no longer appears in a fresh
audit; not investigated further here, out of this PR's scope). **Not independently verifiable in
this environment:** real-device font-load performance/FOUT behavior and whether Vercel actually
serves the new headers/CSP correctly — same caveat as §22, no Vercel project is linked yet.

## 25. HANDOFF.md and log/ move to local-only tracking — 2026-08-17

Charlie's call: after PR #17 merged, opening a dedicated docs-only PR (#18) just to add one merge-log
entry was overhead disproportionate to its value. `HANDOFF.md` and `log/*.md` exist for Charlie's and
the AI's own session-to-session continuity — "where we left off" — not as documentation for other
readers, so the PR/CI/review cycle they'd been going through added no real verification value.

**What changed:** both are now git-ignored (`.gitignore`: `/HANDOFF.md`, `/log/`). Previously-tracked
history is untouched (`git rm --cached`, not deleted from disk) — both remain real files on disk,
still written to after every merge exactly as before, just never committed or pushed again. No more
dedicated log-only PRs going forward.

**What didn't change:** this file (`docs/DECISIONS.md`) stays tracked and pushed — it's the durable
engineering-decision record (license checks, CSP rationale, accepted-exception table, etc.), reused
by anyone reading the repo, not session-scoped bookkeeping. The merge-log *discipline* itself (write
an entry per merged PR, only after independently confirming the merge, never as a prediction) is
unchanged — only where those entries live changed.

**Resolved 2026-08-17:** a separate session updated `02-INFORMATIVE-BLOG.md` itself (now v1.8.0,
CORE-01/CORE-05) to require this pattern generally — `HANDOFF.md` and `log/` MUST be gitignored per
the guideline text now, not just a Math-specific deviation. Re-read after the update; consistent with
what Math already shipped, no further changes needed here.

## 26. Real Vercel deployment connected and verified — 2026-08-18

Resolves the "not independently verifiable in this environment" caveat that had been open since §22
(PR #8) and repeated in §24 (PR #17) — headers, CSP, and redirects were previously only checked
against source/`dist/` output, never against a real deploy. No Vercel project existed for this repo
before today.

**Setup:** created project `webteam-ck/just-math-malaysia` (Vercel team "Team Charlie Dev", slug
renamed from `team-bomy` to `webteam-ck` on 2026-08-18 — shared with other personal projects, the
only team available), git-connected to `JustMath-Web/website`, root directory `web/`. Two blockers
hit and resolved along the way, both Charlie's calls, not mine to decide unilaterally:

- The Vercel↔GitHub App wasn't installed on the `JustMath-Web` org yet (a prior install was scoped to
  a different project) — Charlie installed it.
- Vercel's Hobby (free) plan cannot git-connect a **private** repo owned by a GitHub **organization**
  (Pro-only) — Charlie's call was to make `JustMath-Web/website` public rather than upgrade to Pro.
  Before flipping visibility, checked full git history for ever-committed `.env` files (only
  `.env.example` templates, no real one) and grepped all tracked files for common secret patterns
  (API key formats, private key headers) — clean. GitHub's own repo-visibility change is a genuinely
  consequential action Claude Code's permission layer blocks from automated execution regardless of
  in-chat confirmation; Charlie ran the `gh repo edit --visibility public` command himself.

**Env vars set** (`PUBLIC_SANITY_PROJECT_ID=v4v0i7gl`, `PUBLIC_SANITY_DATASET=production` — both
already non-secret per `web/.env.example`'s own comment) across Production/Preview/Development so the
deploy exercises the real Sanity-backed path (`getLandingPageData()`'s `source: "sanity"` branch)
rather than always falling back to `defaultLandingData.ts`. `vercel link` also appended `.env*` to
`web/.gitignore` (it had only `.vercel` before) — kept, since it protects the `VERCEL_OIDC_TOKEN` in
the `.env.local` it created locally.

**Verified against the real deployment** (`https://just-math-malaysia.vercel.app`), not just
predicted from source:

- `curl -sI /` — CSP header is byte-for-byte the PR #17 value (`default-src 'self'; script-src
  'self'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self'; object-src 'none';
  base-uri 'self'; form-action 'self'; frame-ancestors 'none'`), plus `x-content-type-options:
  nosniff`, `referrer-policy: strict-origin-when-cross-origin`, `x-frame-options: DENY` — all three
  from §22 present exactly as configured. Vercel additionally adds `strict-transport-security`
  automatically for HTTPS deployments — not something `vercel.json` configured, a platform default.
- `curl -sI /about/`, `/faq/`, `/pricing/` — all three return real `301`s to `/#about`, `/#faq`,
  `/#pricing` exactly as configured in `vercel.json`.
- Build log confirms the Sanity fetch path actually ran (`"Sanity returned incomplete landing data;
  using local fallback content"` — the CMS itself doesn't have complete content yet, a Studio-content
  gap, not a config or code problem; `hasSanityEnv()` correctly detected the env vars and attempted
  the real fetch before falling back).

**One nuance worth recording plainly:** the deploy landed as a Vercel **production** deployment
(aliased to `just-math-malaysia.vercel.app`), not a preview, because it was run via `vercel deploy`
locally from the `main` branch — which the git-connect step had just designated this project's
Production Branch — without an explicit `--target preview` override. This does **not** mean the site
is publicly launched: no custom domain is attached, `mathematicsmalaysia.com` still points nowhere
related to this project, and the `vercel.app` URL is not linked or announced anywhere. Going forward,
the git integration behaves normally for a connected project — pushes to `main` deploy to production
(this same URL), PRs against `main` get their own preview URLs automatically.

**Not yet done:** no custom domain attached (`mathematicsmalaysia.com` still needs to be pointed here
when Charlie is ready for an actual public launch — separately gated on the launch conditions in §13,
unrelated to this infra work). Studio content is incomplete, so the live fetch path currently still
resolves to fallback data in practice, same as local builds.

**Real bug found and fixed: Root Directory wasn't set, silently breaking every future git-triggered
deploy.** `vercel link --project just-math-malaysia` (run from inside `web/`) only links the local
directory to the project for CLI-driven deploys — it does **not** set the project's "Root Directory"
build setting, which is what git-triggered builds (PR pushes, merges to `main`) actually use to know
to `cd web/` before building. Without it, the first PR-triggered deploy (opening this very PR)
cloned the full repo, found no lockfile at repo root, silently fell back from pnpm to npm
("Skipping build cache since Package Manager changed from 'pnpm' to 'npm'"), never ran `pnpm install`,
and failed with `astro: command not found`. This setting isn't exposed by `vercel project update`
(only build/dev/install command and output directory), nor by any available MCP tool for an
already-created project (`create_git_project`'s `rootDirectory` param only applies at creation time) —
Charlie set it directly via the dashboard (Project Settings → General → Root Directory → `web`).
Confirmed fixed: pushed an empty commit to retrigger, the resulting preview deployment built and
reached `Ready` status (`vercel ls` — `webteam-ck/just-math-malaysia`, target `Preview`).

**Preview deployments are protected by Vercel Authentication (SSO) by default** — `curl`ing a preview
URL directly redirects to `vercel.com/sso-api` rather than returning the page. This is expected,
correct default behavior for a team project (keeps in-progress branches from being publicly visible),
not a bug — not disabled here. Production's headers/CSP/redirects were already independently verified
above; the preview path's own correctness is covered by its build reaching `Ready`, not by re-curling
identical `vercel.json` config through an auth wall for no additional signal.

**Correction, from §27 below: the claim above that production is fine because "no custom domain is
attached" was incomplete.** It's true no *real* domain points here, but the bare `just-math-malaysia.
vercel.app` alias was still a real, live, `200`-returning, unauthenticated, indexable URL — Bob's
PR #20 re-review caught this as a genuine P1, not a nitpick. See §27 for the actual fix.

## 27. Bob's PR #20 re-review: branch protection + public production deployment — 2026-08-18

Two P1 findings from Bob's re-review of this PR, both real, both fixed here rather than argued with.

**Finding 1 — `main` was still unprotected after the repo went public.** The §18 exception recorded
branch protection as *blocked* specifically because the repo was private on GitHub's Free org plan;
the repo going public earlier in this same PR is exactly the "revisit if..." trigger that exception
named, and nothing had actually revisited it. Fixed: `gh api --method PUT
repos/JustMath-Web/website/branches/main/protection` with required status checks (`web`, `studio`,
`strict: true`), `required_pull_request_reviews` (PR required; `required_approving_review_count: 0`
since Charlie works solo — the PR gate itself, not a second-reviewer gate, is what matters here),
`enforce_admins: true` (applies to Charlie too — no bypass), `allow_force_pushes: false`,
`allow_deletions: false`, `required_conversation_resolution: true`. Verified via a fresh read of
`repos/JustMath-Web/website/branches/main` afterward (`"protected": true`), not just trusted from the
PUT response. §18 updated in place with a "Resolved" note rather than deleted, so the historical
reasoning for why it was ever unprotected stays legible.

**Finding 2 — the production Vercel deployment was public and indexable while §13's launch conditions
are still open.** `just-math-malaysia.vercel.app` returned a real `200` (confirmed against a
never-before-requested path, ruling out stale edge cache as an alternative explanation), had no
`robots.txt` (`404`), and the page's own canonical/OG tags point at `mathematicsmalaysia.com` — meaning
a search engine indexing this interim URL could plausibly surface it under the real business's
identity before Mr Kong's portrait, the operator-mark sign-off, the WhatsApp glyph decision, or blog
content review have actually happened.

Tried to close this at the Vercel-platform level first: `ssoProtection.deploymentType` has an `"all"`
value (per the MCP tool's own schema) that would gate every deployment, including the registered
production domain alias, behind Vercel Authentication. Neither the CLI (`vercel project protection
enable --sso` only cycles through other enum values, no flag to target `"all"` specifically) nor the
`plugin:vercel:vercel` MCP server (`update_project_deployment_protection` — token expired, needs
Charlie to re-authorize the connector; not something I can trigger myself) could set it. Confirmed by
direct testing, not assumed: `all_except_custom_domains` and `prod_deployment_urls_and_all_previews`
were both tried via CLI, and a never-cached path on the production alias still returned an
unauthenticated `404` (not an SSO redirect) under both.

Shipped the fix that's fully within reach instead, and it's sufficient on its own per Bob's own
"protecting/noindexing... either" framing: `web/public/robots.txt` (`Disallow: /`, everything) and a
sitewide `X-Robots-Tag: noindex, nofollow, noarchive` header in `vercel.json`. Checked Vercel's
current `vercel.json` docs before reaching for a host-scoped alternative (a `has` condition matching
only `*.vercel.app` requests, to avoid the header ever reaching a future real-domain deploy) — `has`
only documents `header`/`cookie`/`query` types, no `host` type exists, so that path was never real to
begin with, not a shortcut skipped. Applied unconditionally instead: safe right now because no custom
domain is connected to anything yet, and **added an explicit new §13 launch condition** ("remove the
pre-launch noindex guard... before treating the site as launched") so this doesn't silently persist
into the real launch by omission. A Playwright test (`robots.txt (pre-launch guard, §27)`) asserts the
file itself; the `X-Robots-Tag` header is HTTP-layer-only and shares the same "not testable through
`scripts/serve-dist.mjs`" caveat as the CSP/security-header tests since PR #8.

**Still open, flagged for Charlie, not blocking:** the Vercel-Authentication-covers-production gap
above is real defense-in-depth this doesn't close — noindex stops search engines, but the URL is
still directly reachable by anyone with the link (and it *is* in this now-public repo's own history).
Two ways to close it, either sufficient: (a) re-authorize the `plugin:vercel:vercel` MCP connector so
`update_project_deployment_protection` can set `ssoProtection.deploymentType: "all"`, or (b) set it
directly via the dashboard (Project Settings → Deployment Protection → Vercel Authentication → scope
to cover Production). Same pattern as the Root Directory fix earlier in this PR — a one-field change
Charlie can make in seconds once he chooses to.

**Verified:** `web`: `format:check`, `check`, `build` all pass with the new `robots.txt`/`vercel.json`
change. Full Playwright suite passes including the new robots.txt test. Branch protection confirmed
live via a fresh GitHub API read. `robots.txt` confirmed present in the built `dist/` output;
`X-Robots-Tag` confirmed only in `vercel.json` source at PR-review time (it does not appear in `dist/`
or `.vercel/output/config.json` — Vercel applies `vercel.json` headers at its own edge, not by baking
them into the static build).

**Post-merge production verification, 2026-08-21 (PR #20 merged `15a86b1`, confirmed via `gh pr view
20 --json state,mergedAt,mergeCommit` before checking, not assumed):** `curl -sI
https://just-math-malaysia.vercel.app/` — `x-robots-tag: noindex, nofollow, noarchive` present.
`curl -s .../robots.txt` — returns the disallow-all file with its guard comment intact. Both confirmed
live on the real production deployment, closing the "pending" note above.

## 28. Blog infrastructure PR 1 — KaTeX self-hosting + Portable Text math renderer — 2026-08-25

First of a 4-PR blog infrastructure sequence (VS-15/VS-17 were queued pending blog routes existing;
the blog itself was already fully scoped — `docs/CONTENT-MODEL.md`, `docs/DECISIONS.md` §8/§9,
`design/ui_kits/blog/`). This PR is foundation only: no routes exist yet, nothing in `web/src/pages/`
consumes these components.

**License, self-hosting, build-time rendering — per `design/ASSETS.md` §4 and `design/DESIGN.md`'s
"Blog templates" section, both explicit requirements, not inferred:** `katex` added exact-pinned
(`0.18.4`, current stable — checked via `npm view katex version`, not pinned to the design-preview
kit's older `0.16.11` CDN reference, which was a convenience pin for a static HTML preview, not a
production decision). License confirmed directly from the installed package's own `LICENSE` file and
`package.json` (`MIT`), not just quoted from ASSETS.md's claim — same discipline as the VS-10
`@fontsource` self-hosting.

**CSS self-hosted, but component-scoped, not global.** `katex/dist/katex.min.css` is imported
directly inside `MathInline.astro`/`MathBlock.astro`/`Working.astro` (the only components that ever
render KaTeX output), not into `fonts.css`/`global.css` — those are pulled in on every page via
`BaseLayout.astro`, and the landing page never renders any maths. Astro/Vite's per-page code-splitting
means this CSS only reaches a page's bundle if that page actually imports one of these components
(transitively, via a future post page consuming the component map below). Confirmed in the build:
`grep -rn katex dist/` returns zero matches — expected, since nothing consumes these components yet;
this is not a self-hosting verification (nothing KaTeX-related is emitted regardless of whether
self-hosting is wired correctly), just confirmation the scoped import didn't leak anywhere by
accident. The real self-hosting/scoping verification happens once a real route exists to render
against.

**Portable Text component map for `astro-portabletext`** (installed since project scaffold, v0.13.0,
unused until now): `components.type` takes a `Record<string, Component>` keyed by `_type`, confirmed
directly from `astro-portabletext`'s own type definitions and README, not assumed. New components
under `web/src/components/portabletext/`, field shapes read directly from
`studio/schemaTypes/objects/portableTextObjects.ts` (not from `design/ui_kits/blog/Blog.jsx`'s
React reference — an early draft of this work incorrectly assumed the JSX reference's shape, caught
and corrected before implementation):

- `MathInline`/`MathBlock` — `{ latex, caption? }`, inline vs. displayed equation.
- `Working` — `{ title = "Working", steps: string[] }`. **No per-step explanation field** — the
  design-preview JSX shows one (`step.why`), the real schema doesn't have it. Not added here; a
  genuine schema change to raise separately if wanted, not something to invent silently.
- `CommonMistake` — `{ mistake, correction }`, both plain `text` fields, not Portable Text — no
  nested inline maths is possible here, unlike the design-preview JSX's single nesting-capable body.
- `Callout` — `{ tone: "note" | "tip", body }`, plain text, same no-nesting constraint.
- `ImageWithAlt` — reuses the existing `urlFor()` helper (`web/src/lib/sanity/image.ts`), confirmed
  against `@sanity/image-url`'s actual type definitions (`.width()`, `.auto("format")`, `.url()` are
  real methods, not assumed).

**Security and accessibility, both verified against KaTeX's actual type definitions, not assumed:**
every `renderToString` call sets `trust: false, strict: "ignore"` (confirmed real option values from
`node_modules/katex/types/katex.d.ts`) — the XSS defense once LaTeX is editor-authored content, per
`design/DESIGN.md`'s explicit instruction. `set:html` is used only for KaTeX's own sanitized render
output; the plain-text fields (`mistake`, `correction`, `callout.body`, `working.title`) render
through normal Astro `{expression}` interpolation (auto-escaped), never `set:html`. `output` is left
at KaTeX's default (`"htmlAndMathml"`, confirmed the actual default from the type definitions) rather
than narrowed to `"html"` — preserves the accessible MathML tree for screen readers alongside the
visual HTML; verifying this survives into real rendered output is deferred to the PR that actually
renders a post (this PR has no consuming route to check it against yet).

**Verified:** `format:check`, `check` (0 errors/warnings/hints), `build` all pass. Full Playwright
suite, 24/24, no regressions. `dist/` confirmed to contain zero KaTeX-related output — expected for
this PR, not a self-hosting proof (see above). **Deliberately not claimed here**: self-hosted assets
actually appearing, zero external CDN/font references, no client-side math JS shipping, MathML
surviving into real output, and KaTeX rendering correctly with JS disabled — all require a real
consuming route (the post page, next in this sequence) and are that PR's verification responsibility,
not this one's.

**Started on a clean branch, discarding an earlier stray attempt.** A prior local branch
(`blog-katex-portabletext`) had uncommitted work from an earlier, since-corrected approach — notably
importing KaTeX's CSS globally into `fonts.css`, exactly the approach rejected above. Discarded
entirely (`git restore`/`rm -rf`, branch deleted) rather than salvaged, per instruction, so no stale
assumptions carried forward. This PR's branch (`blog-pr1-katex-portabletext`) started from clean,
synced `main`.

**Bob's review of this PR** (approved, no blockers) flagged two non-blocking items explicitly deferred
to PR 3, not silently dropped:

- `MathBlock.astro` uses a `<div>` + caption `<p>` rather than `<figure>`/`<figcaption>` — re-check
  semantic caption association once a real post route actually renders one.
- `ImageWithAlt.astro` is intentionally minimal for now: no `srcset`, explicit width/height, or
  `decoding="async"`. Revisit under image/performance review once PR 3 has a real route to measure
  against, rather than optimizing a component nothing renders yet.

## 29. Blog infrastructure PR 2 — archive + category routes, fixture-safe data layer — 2026-08-26

Second of the 4-PR blog sequence. Ships `web/src/pages/blog/[...page].astro` and
`web/src/pages/blog/level/[slug]/[...page].astro`, their components
(`CategoryRail`/`PostRow`/`Meta`/`Pagination`/`EmptyState` under `web/src/components/blog/`), and the
`blogData.ts` fixture-safe wrapper layer the whole plan's fixture-safety policy depends on.

**Route file shape, confirmed against live Astro docs before writing anything (required checkpoint
from the plan, not skipped):** `paginate()` requires `[...page].astro` (not a separate `index.astro`)
to put page 1 at the base path and numbered pages after — confirmed from
`https://docs.astro.build/en/guides/routing/`. The category route additionally needed the nested-
pagination pattern (`paginate(posts, { params: { slug }, pageSize })` called once per category) —
also confirmed from the same docs page, not assumed. One real implementation bug caught by an actual
build, not by reasoning about it: a module-scope `const PAGE_SIZE = 10` above `getStaticPaths()`
triggered `PAGE_SIZE is not defined` at build time (Astro/Vite splits `getStaticPaths()` into its own
build-time chunk, which didn't carry the constant with it) — fixed by inlining `pageSize: 10` directly
in each `paginate()` call, matching the official docs example's own pattern.

**`paginate([])` behavior verified from Astro's actual source**
(`node_modules/astro/dist/core/render/paginate.js`), not the docs (which don't cover this edge case):
`lastPage = Math.max(1, Math.ceil(data.length / pageSize))` — always at least 1, so an empty-array
category still gets a real page 1 to render the empty state on, never a missing route. Confirmed
directly in a real build too: all 6 category routes generated, including the 4 with zero fixture
posts.

**`blogData.ts` — the fixture-safety layer**, gating every blog data function
(`getBlogArchiveData`/`getBlogPostData`/`getBlogPostSlugs`/`getCategoryArchiveData`/
`getBlogCategorySlugs`) through one shared `resolveBlogSource()` check, per the plan's tightened
policy (docs/DECISIONS.md's plan history — nine rounds of review before implementation, see PR 1's
§28 for the earlier corrections):

- Fixture content (`web/src/lib/content/defaultBlogData.ts`, 2 posts exercising every PR 1 custom
  Portable Text object at least once) renders **only** when `USE_BLOG_FIXTURES === "true"` **and**
  the build is confirmed non-production.
- Production detection uses Vercel's real `VERCEL_ENV` system variable (`"production"` /
  `"preview"` / `"development"`), not `NODE_ENV`. Confirmed three ways, not assumed: (1) fetched
  Vercel's current system-environment-variables docs directly — available at both build and
  runtime; (2) confirmed it's actually populated on this project via `vercel env pull --environment
  production` (`VERCEL_ENV="production"` in the downloaded file — system env var access is an
  opt-in project setting per Vercel's docs, so this was a real risk worth checking, not a formality);
  (3) `USE_BLOG_FIXTURES` and `VERCEL_ENV` both added to `web/src/env.d.ts`'s typed
  `ImportMetaEnv`, matching the existing convention for `PUBLIC_SANITY_PROJECT_ID` etc.
- Production build + can't get real Sanity data (missing config **or** a fetch throwing) → **the
  build fails**, verified for real, not just by reading the code: ran `VERCEL_ENV=production pnpm
  build` locally with no Sanity env configured — build failed with exit code 1 and a clear error
  message. Ran it again with `USE_BLOG_FIXTURES=true` also set — still failed the same way,
  confirming production genuinely rejects fixture mode rather than silently honoring the flag.
- Non-production + can't get real Sanity data → real empty state (`pnpm build` with no env at all,
  no fixture flag → rendered "No notes published yet", zero fixture content in the output).
- Fixture mode active → fixture posts render (`USE_BLOG_FIXTURES=true pnpm build` → both fixture
  posts appear, correctly filtered per category, correct dynamically-computed category counts).
- **Real Sanity connection, non-production** → also verified against the actual live project
  (`PUBLIC_SANITY_PROJECT_ID=v4v0i7gl PUBLIC_SANITY_DATASET=production pnpm build`, no fixture flag):
  real GROQ queries executed (build took ~11s vs. ~200ms, confirming real network calls, not a
  no-op), returned zero approved posts (Studio content genuinely incomplete, a content gap not a
  bug — same situation already known from VS-10), and rendered the real empty state, not fixture
  content and not an error. All four policy branches now verified against real builds, not just
  reasoned about.

**Playwright suite build now runs in fixture mode** (`playwright.config.ts`'s `webServer.env:
{ USE_BLOG_FIXTURES: "true" }`), matching how the rest of this suite already exercises the homepage's
own fixture fallback — never sets `VERCEL_ENV`, so the production-rejection path is never
accidentally exercised by CI. Extracted `assertMinTapTarget`/`assertNoHorizontalOverflow` from
`landing.spec.ts` into a shared `tests/e2e/helpers.ts` (reused by the new `tests/e2e/blog.spec.ts` —
a genuine second call site, not premature extraction). New suite: archive/category rendering,
category-rail link count and active-state, the empty-state branch against a real zero-post fixture
category, pagination correctly absent with the current 2-post fixture volume (multi-page navigation
mechanics themselves verified against Astro's source/docs above, not manufactured with extra fixture
posts just to force a second page), and 44×44 tap targets on the category rail.

**A small bug caught while wiring the header CTA**: initially passed `siteSettings.whatsappMessage`
(the prefilled text) as `SiteHeader`'s `ctaHref` prop — wrong, that's not a URL. The homepage sources
its header CTA from a Sanity-authored `cta.href`; blog pages have no equivalent per-page CTA object,
so a small shared `buildWhatsAppUrl()` helper (`web/src/lib/content/whatsappUrl.ts`) derives the real
`wa.me` URL from `siteSettings.whatsappNumber`/`whatsappMessage` instead — used by all blog pages
needing header chrome (archive, category, and PR 3's post page).

**Verified:** `format:check`, `check` (0 errors/warnings/hints), full Playwright suite 39/39 (31 +
the 8 new blog tests), all four `blogData.ts` policy branches verified against real builds as
detailed above. Deferred to PR 3 per the plan: KaTeX self-hosting/CSS-scoping proof (no post route
exists yet to render Portable Text against), the two Bob-flagged `MathBlock`/`ImageWithAlt` items
from §28.

**Follow-up commit, same PR: automated CI coverage for the production-fetch-failure branch.** Bob's
review of this PR found everything else coherent but flagged one real, correctly-scoped-as-non-
blocking gap: the production-fails-without-Sanity branch above had only ever been verified by
manually running `pnpm build` locally — CI itself always builds in fixture mode
(`playwright.config.ts`'s `webServer.env`), so a future regression in `resolveBlogSource()` (e.g.
someone removing the `throw`, or breaking `VERCEL_ENV` detection) would go unnoticed until a real
production deploy actually hit it. Charlie's call: close the gap now rather than defer it, since it's
small and directly testable with existing tooling.

`web/scripts/assert-production-fails-without-sanity.mjs` — spawns a real `astro build` with
`VERCEL_ENV=production` and Sanity config explicitly cleared (not just unset, in case CI's own
environment ever gains Sanity secrets for an unrelated reason), and asserts it fails **with the
specific expected error message**, not just "any" failure — an unrelated build breakage must not be
misread as this guardrail passing. Wired into `.github/workflows/ci.yml`'s `web` job as
`pnpm test:blog-production-guardrail`, right after the normal `pnpm build` step.

**The guardrail was tested against a real regression, not just the happy path**: temporarily removed
the `throw` from `resolveBlogSource()` (simulating exactly the kind of accidental regression this
exists to catch), ran the script, confirmed it correctly reported `FAIL` with a clear diagnostic and
exit code 1; reverted, ran it again, confirmed `OK`/exit code 0. A guardrail that can't be shown to
actually catch the failure it claims to catch isn't verified — this is more than the earlier `pnpm
build` manual checks and closes Bob's specific observation, not just adds a nominal test.

## 30. Blog infrastructure PR 3 — post route + structured data — 2026-08-27

Third of the 4-PR blog sequence. Ships `web/src/pages/blog/[slug].astro` — the actual post page —
plus the two Bob-flagged deferrals from §28 (`MathBlock` figure/figcaption, `ImageWithAlt`
srcset/dimensions/decoding) and PR 1's remaining unverified claims (KaTeX self-hosting/CSS-scoping,
MathML survival, no client-side maths JS), which had no consuming route to check against until now.

**Post route.** `getStaticPaths()` sources slugs from PR 2's `getBlogPostSlugs()` (the fallback-aware
wrapper, not the raw query), then fetches each post individually via `getBlogPostData(slug)` and
passes the resolved post through as a static-props value rather than re-fetching per page. This is
the idiomatic Astro pattern for a fully static site (`output: "static"`, confirmed from
`astro.config.mjs`) — there is no server at request time to evaluate a runtime 404 against, so the
correct place to handle "slug list and individual fetch disagree" is at build time, before the page
is ever generated, not inside the page.

**`resolveValidPosts()` (`web/src/lib/content/resolveValidPosts.ts`) is the null-post filter the plan
called for**, extracted as its own pure function (only type-only imports, no runtime dependencies) so
it can be verified directly rather than only through the route that consumes it. The plan's own
verification note was explicit that a genuinely non-existent slug 404ing on its own doesn't exercise
this code — it only proves Astro's ordinary routing, which would 404 the same way with or without
this filter. Proven instead with a standalone script,
`web/scripts/assert-post-static-paths-filter-nulls.mjs`, run via `node --experimental-strip-types`
(Node 22+, this project runs 26.3.0; works here specifically because the file's only import is
type-only and erased at compile time, so no runtime module resolution is needed) — constructs a
synthetic slug list where the middle entry's fetch came back `null` (the exact "list and fetch
disagree" scenario, which fixture data can't produce on its own since it's internally consistent by
construction) and asserts the filter drops exactly that entry, in order, keeping the others. Verified
against a real regression, matching this project's established discipline: temporarily removed the
`.filter()` call, confirmed the script failed with a clear diagnostic, reverted, confirmed it passed.
Wired into CI as `pnpm test:blog-null-post-filter`, right after the production guardrail from §29. The
route itself also keeps a defensive `if (!post) throw` even though `resolveValidPosts` should make it
unreachable — matches this project's "don't assume it can't happen" pattern already used elsewhere,
not a contradiction of the filter's correctness.

**A real bug, found only once the route actually rendered `ImageWithAlt` for the first time**:
`web/src/lib/sanity/image.ts`'s `urlFor()` was building its image-URL builder from the authenticated
`sanityClient` export (`./client.ts`), whose `createClient({ projectId: undefined, ... })` call throws
immediately in fixture mode (no `PUBLIC_SANITY_PROJECT_ID` set) — PR 1 never caught this because
nothing consumed `ImageWithAlt` yet. Fixed by building the `@sanity/image-url` builder from a plain
`{ projectId, dataset }` object instead of the client — confirmed directly against `@sanity/image-url`'s
own type definitions that this shape (`SanityProjectDetails`) is accepted on its own, with no
authentication needed to build an image URL. This fully decouples image-URL-building from the
data-fetching client, which is the correct dependency direction regardless of fixture mode.

**Bob's two deferred items from §28, closed:**
- `MathBlock.astro`: `<div class="math-block">` / `<p class="math-block__caption">` →
  `<figure class="math-block">` / `<figcaption class="math-block__caption">`, for a real semantic
  caption association instead of an unrelated paragraph that happens to sit underneath.
- `ImageWithAlt.astro`: added `srcset` (600/900/1200w, matched to the post body's 64ch prose measure
  — roughly 700–900px on screen at typical body sizes, so this covers standard/2x density without
  generating widths nothing will ever request) and `sizes="(min-width: 768px) 700px, 100vw"`; real
  `width`/`height` via a new `getImageDimensions(ref)` in `image.ts`, parsing Sanity's own
  `image-{assetId}-{width}x{height}-{format}` asset-ref convention directly with a regex (the same
  pattern `@sanity/asset-utils`'s own `getImageDimensions` parses — not adding that whole package for
  one regex); `decoding="async"`.

**Structured data.** `BlogPosting` JSON-LD follows `BaseLayout.astro`'s existing `organizationJsonLd`
pattern exactly — its own `<script type="application/ld+json" is:inline set:html={...}>` tag,
only real-data fields (`headline`, `author.name`, `datePublished`, `dateModified` only when
`post.updatedAt` actually exists, canonical `url`), no invented fields.

**Verification — this is where PR 1's deferred checks and the plan's full checklist actually happen**,
against the fixture build (`playwright.config.ts`'s `USE_BLOG_FIXTURES: "true"`, same as PR 2):

- Breadcrumb, H1, and `Meta` render correctly, and the breadcrumb links to both `/blog/` and the
  post's category archive.
- Every custom Portable Text object from PR 1 renders on a real post (`CommonMistake`, `Working`,
  `ImageWithAlt`, plus maths — the fixture post exercises all of them, per §28/§29's fixture design).
- `BlogPosting` JSON-LD parses and has the right shape, **alongside** `BaseLayout`'s Organization
  JSON-LD — both legitimately coexist on the same page. A first draft of this test used a single
  `script[type="application/ld+json"]` locator and hit a real Playwright strict-mode violation (two
  matches, not one) — fixed by reading all blocks via `.allTextContents()`, parsing each, and
  asserting on the one whose `@type` is `BlogPosting` specifically, while separately asserting the
  Organization block is still present. Caught by the test actually running, not by inspection.
- **Maths renders with accessible MathML with JavaScript disabled** (`browser.newContext({
  javaScriptEnabled: false })`, matching the existing FAQ no-JS pattern, VS-06) — proves KaTeX's
  output is genuine build-time-rendered static HTML, not something a client script assembles, and
  that a real `<math>` element is present, confirming `output: "htmlAndMathml"` was never narrowed to
  `"html"` per §28's original accessibility requirement.
- **No external CDN/font-host requests for stylesheets, fonts, or scripts on the post page** — proves
  KaTeX is genuinely self-hosted, not pulled from a CDN. Scoped to `request.resourceType()` of
  `stylesheet`/`font`/`script` only; the fixture post's own `cdn.sanity.io` image URL (a real,
  legitimate Sanity image CDN reference, §28) would otherwise be a false positive if images weren't
  excluded from the check.
- **The post page's own CSS bundle includes `.katex` styles, and the landing page's CSS bundles do
  not** — the two-sided check the plan required (present where expected, absent everywhere else),
  confirming KaTeX's CSS import stayed component-scoped rather than leaking into the global
  stylesheet every page ships.
- **A real tap-target bug, caught by the test actually running**: `.breadcrumb__link` measured
  37.109375px wide (need ≥44px) — it had `min-height` but no `min-width`, so short link text like
  "Notes" shrank below the minimum. Fixed with `min-width: var(--control-h)`, `justify-content:
  center`, and inline padding/negative-margin compensation so the visible text doesn't shift.

**Verified:** `format:check`, `check` (0 errors/warnings/hints), full Playwright suite 39/39 (all
previous plus 8 new post-page/KaTeX-scoping tests), both new CI guardrail scripts tested against real
regressions before being trusted. Nothing deferred to PR 4 from this PR's own scope — the two
outstanding Bob items from §28 are closed, and every claim from §28's original "deferred to PR 3"
list has now been checked against a real build rather than assumed.

## 31. Blog infrastructure PR 4 — RSS + sitemap + old-post redirects — 2026-08-27

Last of the 4-PR blog sequence (closes VS-15). Charlie's explicit call on scope: RSS, sitemap, the 3
old-post redirects, and the docs note for the unused Sanity `redirect` scaffold — nothing else. No
cleanup, no launch-indexing changes, no further blog polish; the existing pre-launch noindex guard
(§27) stays exactly as-is until the real launch conditions in §13 close.

**`web/src/pages/rss.xml.ts`.** `@astrojs/rss` added exact-pinned (4.0.19, MIT, confirmed from the
installed package's own `LICENSE`/`package.json`, matching this project's pinning discipline). API
confirmed against Astro's current docs before writing anything (same "verify, don't assume"
checkpoint discipline as PR 2's `paginate()`/`VERCEL_ENV` checks) — `rss()` exported from
`@astrojs/rss`, called from a `GET(context: APIContext)` handler, `site` sourced from
`context.site`. Items sourced from PR 2's `getBlogArchiveData()` wrapper, not a raw query — title,
excerpt-as-description, `publishedAt`-as-`pubDate`, and a `/blog/{slug}/` link per post.

**Sourced from approved production content only, verified directly, not assumed:** `getBlogArchiveData()`
is the same fixture-safe wrapper every blog page already goes through (§29/§30's `resolveBlogSource()`
policy) — fixture mode is structurally impossible in a production build, and a production build that
can't reach real Sanity data fails outright rather than ever reaching this file's `rss()` call. Checked
directly across all three real build paths, not just reasoned about: `USE_BLOG_FIXTURES=true` build →
`dist/rss.xml` contains both fixture posts; a plain build with no env at all → `dist/rss.xml` is a
valid, empty `<channel>` (real empty state, zero fixture leakage); a real Sanity connection
(`PUBLIC_SANITY_PROJECT_ID=v4v0i7gl PUBLIC_SANITY_DATASET=production`, non-production) → build took
~14s (real network calls, not a no-op) and produced the same valid empty feed, since the live dataset
still has zero approved posts — a known, already-documented content gap (§29), not a bug. `VERCEL_ENV=
production` with no Sanity config → build still fails outright, exit code 1, confirming this PR didn't
weaken that guarantee.

**Sitemap.** `@astrojs/sitemap` (already an installed-but-unconfigured dependency, the FE-51 "dead
weight" finding from the original review) wired into `astro.config.mjs`'s `integrations: [sitemap()]`
with no extra options — no `filter`/`serialize` customization, matching the narrow scope. Verified
against real build output, not assumed: `dist/sitemap-index.xml` + `dist/sitemap-0.xml` generated on
every build; in fixture mode, includes both post pages plus all archive/category routes; in the
default (non-fixture) build, includes every archive/category route but correctly omits post pages
(there are none to include — `getStaticPaths()` for `blog/[slug].astro` generates zero paths without
real or fixture posts).

**The pre-launch noindex guard is untouched, deliberately.** `robots.txt` (disallow-all) and
`vercel.json`'s sitewide `X-Robots-Tag: noindex, nofollow, noarchive` header (§13/§27) both still
apply after this PR — a sitemap existing doesn't grant search engines permission to crawl it while
those are in place. This was already the plan's own documented expectation ("robots.txt's pre-launch
noindex guard still blocks real indexing regardless of the new sitemap existing — expected, not a
conflict"), reconfirmed as an explicit scope boundary for this PR rather than something to revisit
here.

**Redirects.** Added the 3 remaining old-post redirects to `web/vercel.json`, all `statusCode: 301`,
targets re-verified directly against `docs/CONTENT-MODEL.md` (line 260ish) and this file's own §21
table just now, not retyped from memory or the plan document:

- `/category/algebra/` → `/blog/level/form-1-3/`
- `/differentiation-using-the-first-principle/` → `/blog/level/add-maths/`
- `/mastering-algebra/` → `/blog/level/form-1-3/`

These were deliberately excluded from the original PR #8 redirect batch (§22) because their
destinations didn't exist yet — they do now that PR 2 shipped the category routes. Matches the
existing `vercel.json` hand-written pattern (§22/§24 precedent) rather than Astro's `redirects` config
or the adapter's `staticHeaders` option, for the same reasons already recorded in §22. Same honest
limitation as every prior `vercel.json` change: the file is valid JSON matching Vercel's schema, and
`getStaticPaths()` confirms `/blog/level/form-1-3/` and `/blog/level/add-maths/` are real, generated
routes — but the redirect *behavior* itself (a real `301` at these paths) is unverified until checked
against the live Vercel deployment post-merge, via the same `curl -sI` pattern used for VS-08/VS-10/
VS-11.

**Unused Sanity `redirect` type — documented as intentional scaffolding, per Charlie's explicit call
during plan review, not dead code.** `studio/schemaTypes/documents/redirect.ts` and
`web/src/lib/sanity/queries.ts`'s `getRedirects()` remain unused by any route — this PR's 3 redirects
are hand-written in `vercel.json`, matching the existing pattern for the first 3 (§22). The Sanity
`redirect` document type stays in place for future editorial use (e.g. Mr Kong retiring an old post
URL post-launch without needing a code change), not removed as unreachable code.

**Verified:** `format:check`, `check` (0 errors/warnings/hints), `build` clean across all four env
combinations tested above, full Playwright suite unchanged at 39/39 (this PR adds no new browser-
testable surface — RSS/sitemap are XML endpoints verified by direct build-output inspection, and
`vercel.json` redirects were never locally verifiable in this project, per the established §22
limitation), both existing CI guardrail scripts (`test:blog-production-guardrail`,
`test:blog-null-post-filter`) rerun clean, confirming this PR didn't regress either. Real redirect/
sitemap/RSS behavior on the live deployment: pending post-merge verification, same as every prior
`vercel.json` change.

This closes VS-15 and the full 4-PR blog infrastructure sequence. VS-17 (`index.astro` extraction),
deliberately queued since the original 2026-08-15 review, is now unblocked — real blog templates
exist to compare against, per Charlie's own stated preference during plan review.

## 32. Migration: Vercel → Cloudflare Pages — 2026-08-30

**Historical note, read this first.** Sections 5, 17, 18, 22–24, and 26–31 above describe the
project's Vercel-era deployment — real decisions, real verification, accurate at the time each was
written. They are **retained unmodified as historical record**, per this project's own convention for
dated log entries (matching how `HANDOFF.md` preserves prior dated sections as history). From this
entry forward, they are **superseded for current deployment/production-detection guidance** — do not
follow `VERCEL_ENV`, `vercel.json`, or "wire the Sanity webhook to a Vercel deploy hook" instructions
found in those sections as if they describe today's setup. Section 13's Launch Conditions and
Section 10's redirect implementation note were updated in place (not left as history) since they are
living checklists, not point-in-time PR records.

**Decision, not yet executed as a deploy.** Charlie asked whether the site could move from Vercel to
Cloudflare Pages; both an initial review pass and an independent one (Bob) confirmed it can, since the
site has no SSR/adapter-dependent surface — `astro build` already runs in Astro's default `static`
output (no `output` set in `astro.config.mjs`), confirmed again in this migration's own build log
(`[build] output: "static"`). Andy's recommendation, confirmed by Bob's independent review, was to
migrate as a **static** Cloudflare Pages deploy, not an SSR one:

- **No `@astrojs/cloudflare` adapter added.** Cloudflare's own Astro guide reserves that adapter for
  SSR / Pages Functions; this project needs neither. `@astrojs/vercel` was removed from
  `astro.config.mjs` and `web/package.json` outright, not swapped for a different platform adapter —
  the correct application of FE-40 (don't add a dependency the project has no use for).
- **`web/vercel.json` deleted**, replaced by `web/public/_headers` and `web/public/_redirects`
  (Cloudflare Pages' own convention — Astro's `public/` copies both into `dist/` root untouched,
  confirmed present in a real build). Same header set (CSP, `X-Content-Type-Options`,
  `Referrer-Policy`, `X-Frame-Options`, and the pre-launch `X-Robots-Tag: noindex, nofollow,
  noarchive` guard, kept deliberately per §13) and the same six redirects, translated to
  `_redirects`' plain-text format.
- **`VERCEL_ENV` → `DEPLOY_ENV`, a deliberate host-neutral sentinel, not `CF_PAGES_BRANCH`.** Keying
  the blog's production-never-fixtures guardrail (`web/src/lib/content/blogData.ts`'s
  `isProductionBuild()`, §28/§29) off a branch name would tie a business-level "is this production"
  question to a deployment detail — a branch rename or a future non-`main` production setup would
  silently break it. `DEPLOY_ENV=production` is set only in Cloudflare Pages' production environment;
  local/preview/dev leave it unset, same fallback behavior the old `VERCEL_ENV` check had. Updated
  everywhere the old variable was read or documented: `web/src/lib/content/blogData.ts`,
  `web/src/env.d.ts`, `web/scripts/assert-production-fails-without-sanity.mjs` (including the env var
  the script's spawned build sets to force the production path — the one place a missed rename would
  have silently stopped the guardrail from testing anything), `web/.env.example`,
  `web/playwright.config.ts`'s comment, `.github/workflows/ci.yml`'s comment, `web/README.md`, and
  this file's §2–4 capability/stack/version tables (updated in place, not appended, since those
  sections are the project's living current-stack reference, not a dated PR log).

**Verified, not assumed — two independent passes.** First pass (Claude, this session): after
resyncing `web/pnpm-lock.yaml` (`pnpm install` — the lockfile still listed `@astrojs/vercel` after the
`package.json` edit landed, which would have broken `pnpm install --frozen-lockfile` in CI; resync
dropped 44 packages), ran `format:check` (clean), `check` (0 errors/warnings/hints, 44 files), `build`
(static output confirmed, `dist/_headers` and `dist/_redirects` present with the expected content),
both guardrail scripts (`test:blog-production-guardrail` — the actual test of the `DEPLOY_ENV` rename,
confirms the production-fails-without-Sanity path still fires for the right reason;
`test:blog-null-post-filter`), and the full Playwright suite (39/39, no regression from the
pre-migration count). Second pass (Bob, independent): reran `pnpm install --frozen-lockfile`,
`format:check`, `check`, `build`, and both guardrail scripts — all reproduced clean — plus `git diff
--check`, and confirmed the §32 documentation fix itself closed the "mixes Vercel/Cloudflare current
guidance" finding. Bob's own browser pass was blocked by a local sandbox restriction (`listen EPERM`
on `127.0.0.1:4321`, an environment limitation, not a finding about the code), so Bob could not
independently clear that one check. **Closed by a third run** (Claude, after Bob's re-review and
this section's own doc edits): `pnpm test:e2e` rerun against the exact current tree — `git status`
confirms no file under `web/` changed since the first pass's 39/39 run, only this file
(`docs/DECISIONS.md`, outside `web/`) — reproduced **39/39** again. Browser verification for this
migration is not resting on a stale run; it is a fresh pass against the tree as it stands right now.

**Bob's one finding from this review, addressed above:** this section itself, plus the four
in-place fixes to §§4d/5/10/13, close the "decisions record mixes new Cloudflare flow with old
Vercel-era current-policy text" finding — the historical PR entries (§§26–31) are left as accurate
history per the note at the top of this section, and every section that presents itself as *current*
guidance (reference-sources bibliography, recurring-cost table, redirect implementation note, launch
conditions) now names Cloudflare Pages terms instead.

**Bob's verdict: Approved with conditions (code).** Zero open P0/P1 code issues; the migration is
implemented and verified. The conditions are deployment-ops items (below), not code defects — review
is closed on the code diff, not on live deployment readiness. **Caveat, recorded plainly:** this
verdict reached this entry only as reported chat text from Bob's session, not yet as a written entry
in `review/bob/CODE-REVIEW.md`, `review/bob/APPROVAL-CHECKLIST.md`, or `BOB-REVIEWER-HANDOFF.md` —
checked directly, none of the three mention this review round yet. Per Section 3's independence rule,
Claude/Andy MUST NOT write Bob's verdict into Bob's own review files on Bob's behalf; that record
still needs to come from Bob's session before the Definition of Done's "`review/bob/CODE-REVIEW.md`
... current for the reviewed commit" line can be checked off.

**Merged.** PR #31 (`cloudflare-pages-migration`, merge commit `55f6647`, 2026-08-30) — the migration
itself plus the `wrangler.jsonc` follow-up commit, both confirmed via `gh pr view 31 --json
state,mergedAt,mergeCommit`. PR #32 (`bob-review-record-wrangler-migration`, merge commit `67c27c0`,
2026-08-31, confirmed the same way) — closed a real process gap: Bob's narrow re-review write-up for
the `wrangler.jsonc` delta was still uncommitted local changes at the moment PR #31 merged, so `main`
briefly had the reviewed code without its own review record. PR #32 restored it through the normal
protected-branch path (`main` requires a PR — confirmed via `gh api
repos/.../branches/main/protection`), not by amending PR #31 or rewriting its history. Merge-log
entries: `log/2026-08-30_PR31_cloudflare-pages-migration.md`,
`log/2026-08-31_PR32_bob-review-record-wrangler-migration.md`.

**Discovery mid-rollout, also recorded here for continuity:** Cloudflare's dashboard no longer offers
classic Pages project creation for new projects (confirmed directly by Charlie in the dashboard, not
assumed) — new git-connected static sites deploy via **Workers static assets** instead. This is why
`web/wrangler.jsonc` exists; it does not change the core decision above (still no `@astrojs/cloudflare`
adapter, still fully static). The deployment-ops steps below are written for the Workers flow, not
classic Pages.

**Done, since this section was last updated:** the Cloudflare project (`justmathwebsite`, Workers
static-assets flow) is created and live at `https://justmathwebsite.charlie-kong.workers.dev`,
`DEPLOY_ENV=production` and the Sanity env vars are set in its production environment, and the Sanity
publish webhook is wired to a real Cloudflare deploy hook and has been independently confirmed firing
correctly (`npx sanity hooks logs` from `studio/`, three real deliveries, all `200`). See §33 for the
incident this surfaced and its resolution.

**Not yet done — still open (deployment ops, not code):**

- The `mathematicsmalaysia.com` custom domain is still not connected (§13) — deliberately held, gated
  on the other unresolved launch conditions there, not on anything from this migration.
- Commercial-use terms for Cloudflare's free plan were not confirmed against Cloudflare's actual Terms
  of Service during this pass (§5) — verify before relying on the free plan for this commercial site,
  the same bar the guideline already sets for Vercel Hobby.

## 33. Content-gap incident: missing `homePage`, then null `footerLinks` — 2026-08-31

**Record this narrowly and precisely** — the point is to explain the deployment timeline honestly, so
a future reader doesn't misdiagnose the same symptoms as a webhook or Cloudflare platform bug. It was
neither. Two independent, pre-existing content gaps in the production Sanity dataset, encountered
back to back.

**Symptom that started this:** Charlie added a header nav link ("Test") in Studio and published it.
The site never showed it, despite the webhook visibly triggering a rebuild each time.

**Finding 1 — `homePage` did not exist in the production dataset at all.** Confirmed via direct query
(`count(*[_id=="homePage"])` → `0`, both published and as a draft). `web/src/lib/content/landingData.ts`'s
`getLandingPageData()` requires `homePage`, `siteSettings`, and `navigation` all to be present or it
falls back entirely to `defaultLandingData.ts`'s hardcoded content (deliberate, safe design — an
incomplete CMS response must never partially render). Since `homePage` was always missing, **every**
build silently rendered full local fallback content — including the header/footer nav — regardless of
what was published to `navigation`. This was not a deploy or webhook problem; the real content was
simply never being read at all.

Fixed via a one-off script (`client.createIfNotExists`, run once locally, deleted after use — never
committed) that created only the missing `homePage` document, reusing the same content-shape logic as
`studio/scripts/seed.ts`'s `homePageDocument()`. Deliberately did **not** run `pnpm seed` itself: that
script's singleton block uses `transaction.createOrReplace(...)` unconditionally on `siteSettings`,
`navigation`, and `homePage` together — since `siteSettings`/`navigation` already existed (including
Charlie's real "Test" edit), a real `pnpm seed` run at this point would have silently overwritten both
with their hardcoded defaults. `createIfNotExists` was chosen specifically because it is a safe no-op
against anything that already exists.

**Finding 2 — once `homePage` existed, `navigation.footerLinks` was found to be `null`.** A second,
independent gap: the `navigation` document had `headerLinks` set but had never had `footerLinks` set
at all. `web/src/components/SiteFooter.astro` does `navigation.footerLinks.map(...)` with no null
guard, since the code's own safety net (the `homePage`/`siteSettings`/`navigation` completeness check
in `getLandingPageData()`) assumes any singleton that IS present is itself well-formed — it checks for
*presence*, not internal shape. This bug was **latent since the project's earliest CMS setup**, never
triggered before, because the missing `homePage` (Finding 1) always forced full fallback first,
including a valid local `footerLinks` array — the real, broken `navigation.footerLinks` was never
actually read by a build until Finding 1 was fixed. Reproduced locally and confirmed via direct query
(`*[_id=="navigation"][0]{headerLinks,footerLinks}` → `footerLinks: null`). Fixed the same safe way:
a `.patch("navigation").set({footerLinks: [...]}).commit()` (one-off script, deleted after use) that
touched only `footerLinks`, never `headerLinks`.

**The webhook itself was never broken.** Cross-checked `npx sanity hooks logs` (from `studio/`)
against `npx wrangler deployments list --name justmathwebsite`:

| Webhook delivery (Sanity) | Result | Cloudflare outcome |
| --- | --- | --- |
| `2026-08-31T03:38:10Z` | `200` | Deployment `03:38:54Z` — succeeded |
| `2026-08-31T03:44:24Z` (Charlie's "Test" link publish) | `200` | Deployment `03:45:15Z` — succeeded (still full fallback content per Finding 1, so safely rendered, just not what anyone was looking for) |
| `2026-08-31T04:10:33Z` (the `homePage` creation from Finding 1's fix) | `200` | **No deployment** — Cloudflare's own build log for this exact window (`04:10:36`–`04:11:07Z`) shows the build ran and crashed with precisely Finding 2's `TypeError: Cannot read properties of null (reading 'map')` in `SiteFooter`, then `Failed: error occurred while running build command` |

In other words: the webhook correctly delivered every time, and Cloudflare correctly refused to
publish a broken build once real (partially-complete) content made it crash. The pipeline behaved
exactly as it should have; the underlying content was briefly in a genuinely broken state, for the
short window between fixing Finding 1 and discovering/fixing Finding 2.

**Manual `wrangler deploy` was used to reach the current live state, after both gaps were closed** —
not before. `rm -rf dist && PUBLIC_SANITY_PROJECT_ID=v4v0i7gl PUBLIC_SANITY_DATASET=production pnpm build`
succeeded cleanly only once both fixes were in place, confirmed in the built HTML (`grep` for the
"Test" link in `dist/index.html`), then `npx wrangler deploy --name justmathwebsite` from `web/`
pushed it live, re-confirmed via a direct `curl` of the real deployment URL.

**Verification still open, not yet run:** publish one harmless change in Studio and confirm the full
webhook → Cloudflare build → deploy chain completes on its own, with no manual `wrangler deploy` step.
That is the actual proof this is self-sufficient going forward, not just patched by hand this once.
Tracked in §32's "still open" list.

## 34. Pinned `engines.node` to an exact version — 2026-08-31

**Scoped narrowly to this one change** — the broader preview-branch `Workers Builds` cache
investigation (§32/§33's "still open" lists) is a separate, ongoing concern and is not resolved by
this alone; this entry documents only the deterministic fix that was safe to ship immediately.

`web/package.json`'s `engines.node` changed from a range (`">=22.12.0"`) to an exact pin
(`"22.12.0"`). Root cause, found by comparing successful vs. failing Cloudflare build logs line by
line: a successful build shows `Restoring from build output cache` immediately followed by
`Success: Build output restored from build cache.` before `Detected the following tools from
environment: nodejs@22.12.0, pnpm@10.11.1`. A failing build skips that confirmation line entirely —
`Detected the following tools from environment: nodejs@22.12.0 or newer, pnpm@10.11.1` — meaning the
build-tool cache was cold (a miss), and Cloudflare's fallback auto-detection read `engines.node`
directly, rendered the `>=` range as the literal English phrase "or newer", and then tried to
install a package version by that literal (invalid) name.

This was masked for hours by a lucky warm cache (multiple successful builds on unchanged commits all
hit the cache and reused a previously-resolved `22.12.0`), which is why it was initially misdiagnosed
as preview-branch-only (§33's "still open" list). It is not preview-specific: **any commit to `main`
invalidates the build cache** (confirmed — PR #41's merge, a one-line `wrangler.jsonc` change with
nothing to do with Node versions, triggered the exact same failure on `main` itself at
`2026-08-31T06:22:18Z`). Setting the `NODE_VERSION` dashboard variable to `22.12.0` (§32) never
actually fixed this; it was coincidental — some earlier build happened to cache a correct resolution,
and every real commit since has been exposing the same underlying auto-detection bug again.

An exact pin removes the range entirely, so there is nothing left for the fallback path to
mis-render, regardless of cache state — this makes the deployed build deterministic independent of
Cloudflare's cache behavior, rather than depending on a lucky warm cache to avoid the bug.
`web/README.md`'s setup instructions updated to match (states the exact pin and why, rather than
`Node ≥22.12`, which would now read as a minimum when it is not).

**Verified:** `format:check`, `check`, `build`, both blog guardrail scripts, and the full Playwright
suite all still pass with the pinned version (nothing about the pin itself changes runtime behavior —
`22.12.0` was always the actual version installed in every successful build; this only removes the
ambiguity that let the range-parsing bug surface).

**Deliberately not addressed here:** why the build-output/dependency cache goes cold on a real commit
in the first place, whether Cloudflare's range-parsing fallback is itself a platform bug worth a
support ticket, and the standing `Workers Builds` preview-check investigation — all remain open,
tracked in §32/§33.

**Correction, same day, tested and disproven — this section's root-cause theory was wrong.** This
PR's own `Workers Builds: justmathwebsite` check ran against the exact-pinned commit (build
`68af2a71-ebc7-4730-a4c6-4fcde3c02218`, `2026-08-31T07:29:01Z`–`07:29:11Z`) and failed with the
**identical** `nodejs@22.12.0 or newer` / `Failed: error occurred while installing tools or
dependencies` error as before the pin. The range-in-`engines.node` hypothesis above is therefore
disproven, not merely unconfirmed — an exact pin removes the range entirely, and the exact same
failure still occurs. Also checked and ruled out: no `.nvmrc` or `.node-version` file exists anywhere
in the repo (these would take priority over both `engines.node` and the `NODE_VERSION` dashboard
variable per Cloudflare's own docs), and `studio/package.json` has no conflicting `engines` field.

The actual mechanism remains unknown. What is still confirmed, from comparing successful vs. failing
build logs: a successful build shows `Success: Build output restored from build cache.` immediately
before correctly detecting `nodejs@22.12.0` (exact); a failing one skips that confirmation line
(a cache miss) and shows the mangled `22.12.0 or newer` instead — regardless of what `engines.node`
or `NODE_VERSION` say. This strongly suggests a genuine Cloudflare-side bug in Workers Builds' cold
build-tool-cache resolution path, not something fixable through this repo's own configuration.

**This PR was merged anyway** (`babdd50`), retitled and relabeled before merging to state plainly
that it is a cleanup/determinism improvement, not a fix for this issue — exact pinning is still a
better project contract than a range for this deployment setup on its own merits, independent of
whether it touches the Cloudflare bug. The bug itself is tracked as its own open investigation, not
closed by this entry; next candidates, in no particular order: a `.nvmrc` file (a different
resolution mechanism than either `engines.node` or the variable, per Cloudflare's docs), inspecting
Wrangler/Workers Build project settings for anything else that could govern the build-image Node
version, or treating it as a Cloudflare platform bug worth a support ticket.

**Further observed pattern, still not a proven root cause — record this precisely so the next
review doesn't re-discover it from scratch.** Cross-referencing every `Workers Builds: justmathwebsite`
result seen so far: **every failure has coincided with a cold build-tool cache, and every success
with a warm one** (a warm cache shows `Success: Build output restored from build cache.` immediately
before a correct `nodejs@22.12.0` detection; a cold one skips that line and shows the mangled
`22.12.0 or newer`). This is **not** a preview-vs-production distinction, even though it can look
like one: `main` has mostly stayed warm because it gets rebuilt far more often, while every PR in
this workflow uses a brand-new branch, which is cold on its first (often only) build by definition.
Confirmed reproduced again on PR #44's own first build (`ae73770e...`, `08:13:04Z`–`08:13:21Z`),
identical signature to every prior failure.

Practical consequence, until Cloudflare's behavior changes or the actual mechanism is found: **expect
the non-required `Workers Builds` check to fail on most or all new PR branches going forward** — this
is not a new regression each time it happens, it is the same already-diagnosed pattern. It does
**not** change how a PR's merge readiness is judged: the **required** GitHub checks (`web`, `studio`)
remain the sole authoritative signal for that, exactly as `main`'s branch protection already
enforces. Separately, and independently of any PR, `main`'s actual live-deploy health should still be
checked directly (a real deployment on `wrangler deployments list --name justmathwebsite`, and/or a
live `curl`) rather than inferred from a PR's `Workers Builds` status one way or the other — the two
are not the same signal.

**Still not fully proven beyond the observed logs above**: this is a strong, consistent correlation
across every instance seen so far, not a confirmed mechanism. It remains an open, Cloudflare-side
tool-detection/build-cache question — see the next-candidates list above (`.nvmrc`, other Wrangler/
Workers Build settings, a Cloudflare support ticket) for how to actually root-cause it, whenever that
becomes worth the time.

## 35. §33's verification step: webhook → build → deploy confirmed end-to-end — 2026-08-31

**Closes §33's open verification item.** Found the actual root cause of the webhook silence noted
there in passing, and confirmed the full pipeline now works with zero manual intervention.

**Root cause of the multi-hour webhook silence:** the Sanity webhook's "Trigger on" event-type
filter did not have **Update** and **Delete** checked — only some other event type(s) were. A
document *edit* (as opposed to a brand-new document) never fired the webhook while this was
misconfigured. Charlie found and fixed this directly in the webhook's own settings in
`sanity.io/manage` (not visible from `npx sanity hooks list`/`logs`, which show delivery history and
target config but not the trigger-event checkboxes). This explains the gap between §33's three
early, successful deliveries and the silence afterward — evidently at least one of those three
happened to be an event type that was still enabled at the time, and normal content edits later were
not.

**Verified end-to-end, for real, immediately after the fix:**

- Charlie published two further test edits directly in Studio (removing the earlier "Test" header
  link, then adding a "Test2" one) — ordinary content edits, not document creations.
- `npx sanity hooks logs` showed a new delivery at `2026-08-31T08:07:21Z`, `200`.
- `npx wrangler deployments list --name justmathwebsite` showed a new successful deployment
  45 seconds later, at `08:08:06Z` — no manual `wrangler deploy` run by anyone.
- `curl` against the real live URL confirmed the header shows `Test2` — the actual new content, not
  a cached or stale response.

This is the first time this project has observed the complete chain (Studio edit → publish → Sanity
webhook → Cloudflare build → live deploy) complete correctly on its own. The Cloudflare cold-cache
Node-detection bug (§34) did not reproduce on this build either, but that is not claimed as fixed —
recent builds (PR #42/#43's merge commits, and this one) have simply all succeeded; whether the
underlying bug is fixed, intermittent, or coincidentally avoided remains genuinely unknown and is
still tracked as its own open item in §34.

## 36. Blog taxonomy seeded: six categories + one author — 2026-09-01

**Factual record, docs-only.** Production Sanity had zero `category` and zero `author` documents
(confirmed by direct query) — the six-pill category rail on `/blog` was rendering entirely from
`web/src/lib/content/defaultLandingData.ts`'s local `defaultCategories` fallback
(`web/src/lib/content/blogData.ts`'s `categories.length > 0 ? categories : defaultCategories`), not
from real content. Seeded via a one-off, non-committed script (`createIfNotExists`/slug-lookup, the
same safe pattern as the `homePage` fix in §33), run for real after a dry-run confirmed the plan.

**Six category documents created**, canonical slugs and order values:

| Title | Slug | Short label | Order | `_id` |
| --- | --- | --- | --- | --- |
| Standard 1 to 6 | `standard-1-6` | Standard 1 to 6 | 10 | `category-standard-1-6` |
| Form 1 to 3 | `form-1-3` | Form 1 to 3 | 20 | `category-form-1-3` |
| Form 4 to 5 | `form-4-5` | Form 4 to 5 | 30 | `category-form-4-5` |
| Additional Mathematics | `add-maths` | Add Maths | 40 | `category-add-maths` |
| SPM | `spm` | SPM | 50 | `category-spm` |
| IGCSE | `igcse` | IGCSE | 60 | `category-igcse` |

**One author document created** — Name: Mr Kong, Slug: `mr-kong`, Role: Tutor, Just Math Malaysia,
`_id`: `author-mr-kong`.

**Verified after the run, not just trusted from script output:** a direct read query confirmed
exactly 6 `category` documents and 1 `author` document exist, with the values above. `homePage`,
`navigation`, and `siteSettings` `_updatedAt` timestamps were checked before and after and are
unchanged — this run did not touch them.

**These are structural taxonomy records the frontend now depends on** (category filter rail, post
categorization), not reviewed editorial content — the Mr Kong review gate from §13 ("blog content and
maths need Mr Kong review before any post ships") applies at the individual **post** level via
`reviewStatus == "approvedByMrKong"` (`web/src/lib/sanity/queries.ts`'s `APPROVED_POST_FILTER`), not
to this taxonomy scaffolding.

**Category and post counts stay `0` until real posts exist.** Seeding the taxonomy alone does not
populate the archive, RSS feed, or filter counts — those only reflect posts with
`reviewStatus == "approvedByMrKong"`, which is unaffected by this entry.

**Token handling:** the Sanity write token used for this run was briefly exposed in the chat
transcript (pasted rather than run privately) — treated as one-time-use, not reused for anything
else. Charlie was asked to revoke it in `sanity.io/manage` immediately after this run; not
independently confirmed from this session — verify it was actually done if picking this up later.

## 37. `.nvmrc` experiment also disproven — three independent mechanisms ruled out

**Third and final pre-planned experiment, run on the explicit condition set in §34: only try
`.nvmrc` once the exact `engines.node` pin had already failed.** It had (PR #42). Added
`web/.nvmrc` containing `22.12.0` (PR #50) — Cloudflare's own docs (fetched directly, not assumed)
state version files take priority over both the `NODE_VERSION` variable and `engines.node` for
resolving the build image's Node version, a genuinely different code path than either prior attempt.

**Result: identical failure**, reproduced on this PR's own first (guaranteed cold-cache) build —
`nodejs@22.12.0 or newer` detected, `Installing nodejs 22.12.0 or newer`, `Failed: error occurred
while installing tools or dependencies`. Same signature as every prior cold-cache failure: no
`Success: Build output restored from build cache.` confirmation line before the mangled detection.

**Three independent, documented Cloudflare mechanisms have now all been tried and disproven** as the
fix for this specific failure mode:

| Mechanism | Tried | Result |
| --- | --- | --- |
| `engines.node` as a range (`">=22.12.0"`) | Original state | Fails on cold cache |
| `engines.node` pinned exact (`"22.12.0"`) | §34, PR #42 | Fails identically on cold cache |
| `NODE_VERSION` dashboard variable | Confirmed correctly set throughout | No effect either way |
| `.nvmrc` version file | This entry, PR #50 | Fails identically on cold cache |

This is strong evidence the failure is a genuine bug in Cloudflare Workers Builds' own cold-cache
tool-detection path, not a configuration gap in this repo — every officially documented override
mechanism has been exhausted without changing the outcome. Remaining, not yet tried: other
Wrangler/Workers Build project settings not yet inventoried, and a Cloudflare support ticket (the
path this project's own prior notes named as the fallback once `.nvmrc` also failed).

**`web/.nvmrc` is being kept regardless of this negative result** — same reasoning as §34's exact
`engines.node` pin: an explicit, correct Node version pin is a reasonable project artifact on its own
merits, independent of whether it fixes this particular Cloudflare-side bug.

**Practical status unchanged from §34/§35's note:** still non-blocking (non-required check, `main`
and the live site have continued deploying successfully whenever a build happens to land on a warm
cache), still not proven beyond the observed correlation, still tracked as its own open item rather
than something worth continuing to chase without further information — e.g. a Cloudflare support
response, or a change in Cloudflare's own platform behavior.

## 38. Cloudflare project cutover — parallel-project theory confirmed, `justmathwebsite` replaced

**Resolves the practical impact of §32/§34/§37's cold-cache investigation, though not the underlying
mechanism.** Following Bob's explicit parallel-project plan (never delete/recreate the working
project directly — prove a fresh one first, only cut over once proven, keep the old one as
rollback): created a new Cloudflare project connected to the same repo/path/build command, with the
same environment variables re-entered manually (Cloudflare does not carry these over between
projects). Named `justmathweb` initially (a different name was required — Cloudflare does not allow
duplicate project names while the original `justmathwebsite` still existed).

**Four consecutive clean builds on the new project, zero failures** — a sharp contrast with the old
project's persistent intermittent cold-cache failures documented in §32/§34/§37:

| # | Time (UTC) | Trigger | Node detected | Result |
| --- | --- | --- | --- | --- |
| 1 | 16:09–16:10 | First build (new project) | `nodejs@22.12.0` (correct) | Success |
| 2 | 16:17–16:18 | Manual dashboard retry | `nodejs@22.12.0` (correct) | Success |
| 3 | 16:22–16:23 | Manual retry, post-rename to `justmathwebsite` | `nodejs@22.12.0` (correct) | Success, no name-mismatch warning |
| 4 | 16:28–16:29 | **Real Sanity webhook trigger** (Charlie published a real excerpt/meta-description edit) | `nodejs@22.12.0` (correct) | Success |

Each success independently verified against the real live deployment, not just trusted from the
build log — direct `curl` confirmed real content (the post, the real excerpt, the real meta
description) on every one.

**This is strong evidence for — not an absolute proof of — a project-specific root cause.** The
working theory: the original `justmathwebsite` project's very first setup attempt briefly had
`NODE_VERSION` literally set to the invalid string `"22.12.0 or newer"` before Charlie corrected it;
something about that bad value appears to have lodged in a deeper, more persistent cache layer
specific to that project that normal fixes (correcting the variable, exact-pinning `engines.node`,
adding `.nvmrc`) never reached, while a genuinely fresh project never inherited it. The underlying
Cloudflare-side mechanism remains unconfirmed — this was never proven via a support response or
platform documentation, only inferred from four consecutive successes where the old project would
statistically have been expected to fail again eventually.

**Cutover sequence actually executed, in order:**
1. Old project renamed `justmathwebsite` → `justmathwebsite-old` (not deleted — kept as rollback per
   the plan; full deployment history confirmed intact back to its original 2026-08-31T08:42:57Z
   creation, verified via `wrangler deployments list --name justmathwebsite-old`).
2. New project renamed `justmathweb` → `justmathwebsite` — lands exactly on the name
   `web/wrangler.jsonc` already declared, so **no code change was needed**; build #3 above confirms
   this (the earlier "Failed to match Worker name" warning is gone entirely).
3. Sanity's deploy-hook webhook repointed from the old project to the new one.
4. A real Studio publish (build #4 above) proved the full chain — Studio edit → publish → webhook →
   build → deploy → live — end to end on the new project, not just a manual dashboard test.

**Still open:** whether the old webhook target (now pointing at the inert `-old` project) was
actually removed, or just superseded by the new one, was not independently confirmed in this
session — low risk either way since nothing serves traffic from `justmathwebsite-old` anymore, but
worth a cleanup pass. `justmathwebsite-old` should be deleted only after, per Bob's plan, at least a
day or two of clean deploys on the new project — not yet. The custom domain connection remains
untouched and still gated on §13's unrelated launch conditions.

## 39. Hosted Sanity Studio deployed — https://justmath.sanity.studio/ — 2026-09-02

**Factual record.** Charlie previously only had local Studio access (`pnpm dev` in `studio/`,
localhost:3333) — no hosted deployment had ever actually been run, despite §4d's "hosted Studio"
references (aspirational at the time, not yet done). Confirmed **independent of the custom domain**:
Sanity's hosted Studio is a separate service on Sanity's own infrastructure, entirely unrelated to
`mathematicsmalaysia.com` or Cloudflare — there was no need to wait for the domain connection.

Deployed via `npx sanity deploy --url justmath -y` (the `-y`/`--url` flags used specifically to avoid
the command's normal interactive hostname prompt). Live at **https://justmath.sanity.studio/**,
confirmed via a real request (redirects through Sanity's own hosted-app routing, the expected,
normal behavior for a `*.sanity.studio` URL — not an error).

**`studio/sanity.cli.ts` updated** to record the resulting `appId`
(`y9gew7u6o2492ftxnfa25hy2`), per the CLI's own recommendation printed after the first deploy — pins
future `sanity deploy` runs to this same hosted app so they never re-prompt for it. Re-deployed once
after adding it to confirm: the "No appId configured" build warning is gone, and the deploy completed
without any prompt, landing on the same `https://justmath.sanity.studio/` URL as before.

**No effect on the website's own deployment or build** — this is Studio-only tooling, `web/` is
untouched by this change.

## 40. `justmathwebsite-old` deleted from Cloudflare — §38 cutover fully closed out

**Factual record.** Charlie deleted the retired `justmathwebsite-old` Cloudflare project on
2026-09-02, after roughly a day of clean deploys on the replacement `justmathwebsite` project
(cutover completed 2026-09-01, §38). This is earlier than §38's original "24–48 hours" guidance
suggested — Charlie's own call, not something re-litigated here.

**Deletion confirmed independently, not just taken on report:**
- `npx wrangler deployments list --name justmathwebsite-old` now returns `[code: 10007] This Worker
  does not exist on your account` — the project is actually gone, not just renamed again.
- `npx wrangler deployments list --name justmathwebsite` still returns healthy recent deployments —
  the active project is unaffected.
- `npx sanity hooks list` shows exactly one webhook (`JustMathWebsite - CF Webhook`), already
  pointed at the current project's deploy hook — no second, stale hook targeting the deleted project
  existed to clean up. §38's "still open" cleanup-pass concern is resolved: there was nothing left
  to remove.

**§38's cutover is now fully closed out.** The only remaining open items from that section — the
unconfirmed underlying Cloudflare-side root cause, and the untouched custom domain connection gated
on §13 — are unrelated to this deletion and remain as they were.
