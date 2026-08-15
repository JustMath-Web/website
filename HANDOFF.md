# Just Math Malaysia — Project Handoff

> ## STATUS 2026-08-16: Two re-review follow-ups fixed · merge log backfilled · new no-self-merge rule
>
> Charlie confirmed PR #3 merged (fast-forwarded to `5853485`) and made two decisions: fix the two
> minor items Bob's scoped re-review flagged, in a tiny PR, now — and don't self-merge PRs going
> forward (he merges). He also updated `02-INFORMATIVE-BLOG.md` to `v1.7.1`, which codifies both:
> Section 7 now has an explicit **"No auto-merge"** rule and a new **merge-log** requirement (one
> `log/YYYY-MM-DD_PR<number>_<slug>.md` entry per merged PR, written only after confirming the merge
> actually happened).
>
> **Merge log backfilled (PR #4):** `log/` didn't exist before this requirement, so PR #1–#3 each got
> a backfilled entry — merge status independently re-confirmed via `gh pr view <n> --json
> state,mergedAt,mergeCommit` before writing each one, not assumed from earlier context. CI green;
> not merged (Charlie merges).
>
> **Two follow-ups fixed (next PR, not yet opened as of this entry):**
>
> 1. `web/.prettierignore` now excludes the Playwright artifact dirs, matching `.gitignore` — fixes
>    the spurious local `format:check` failure after `pnpm test:e2e`. Verified by reproducing the
>    bug first, then confirming the fix resolves it.
> 2. `studio/schemaTypes/documents/homePage.ts`'s `gapChartAnnotations[].year` now validates against
>    the 11 real stop codes and renders as a Studio picklist instead of free text. First attempt
>    (`Rule.valid(...)`) doesn't exist on Sanity 6.x's `StringRule` — confirmed against the installed
>    package's own type definitions, not assumed; `Rule.custom()` is correct. Full detail in
>    `docs/DECISIONS.md` §20.
>
> The remaining 8 P2s / 4 P3s from Bob's original review are still open, queued for normal triage —
> not part of this pass.

> ## STATUS 2026-08-16: P1 fixes merged · Bob's scoped re-review — Approved with conditions
>
> Per Charlie's instruction: fix the four P1s (objective approval blockers, not triage candidates),
> tight scope, PR → CI green → merge → scoped Bob re-review of just the touched findings. All done.
> Full detail in `docs/DECISIONS.md` §19; Bob's full evidence in `review/bob/CODE-REVIEW.md`,
> `review/bob/FE-GATE-AUDIT.md`, `review/bob/APPROVAL-CHECKLIST.md`, `BOB-REVIEWER-HANDOFF.md`
> (2026-08-16 sections, newest first; the 2026-08-15 findings are preserved below each).
>
> **Fixed and merged** (PR #2, `fix/vertical-slice-p1-findings`, commit `05ab713`, CI green, merged
> to `main` at `c118643`):
>
> - **VS-01** — `GapChart.astro` now takes an `annotations` prop and matches by stop code
>   (`stops.indexOf(annotation.year)`), not array position. Added five new typed Sanity fields for
>   the other hardcoded figures Bob flagged (`problem.independentChecksCount`,
>   `about.yearsExperience`, `about.studentsPerYear`, `pricing.availabilityTimeBlocks`,
>   `finalCta.freeMinutes`), wired schema → GROQ query → types → local fallback → seed script →
>   render.
> - **VS-02 / VS-03** — "Blog notes" and footer nav links now meet 44×44, using the same
>   `--control-h` + negative-margin technique already verified for the header "Blog" link.
> - **VS-05** (P2, rolled in — shared both touched files) — header/footer nav now `<ul>/<li>`.
> - **VS-04** — added a 19-test Playwright suite (`web/tests/e2e/landing.spec.ts`), wired into CI.
>   `astro preview` turned out to daemonize (prints "running" and returns immediately) — incompatible
>   with Playwright's `webServer`, which needs a trackable foreground process — so
>   `web/scripts/serve-dist.mjs` is a small zero-dependency static server instead of adding a package
>   for a one-page site.
>
> **Caught by the new tests, not by eyeballing:** wrapping nav links in `<ul>/<li>` for VS-05 broke
> the footer tap-target fix — moving the `<a>` one level deeper than the grid that used to stretch it
> meant `inline-flex` shrank it back to content width (~38px). The Playwright suite's own tap-target
> test failed immediately; fixed with `display: flex` instead.
>
> **Bob's scoped re-review** (fresh session, no memory of the fix work — re-verified against the
> actual merged commit, not the implementer's account of it): **Approved with conditions**, scoped
> strictly to VS-01 through VS-05. All five confirmed genuinely resolved — live DOM measurement at
> 390/560/768/1440px for the tap targets, live render of CMS-sourced chart data (not just
> prop-wired-in-source), an independent 19/19 Playwright run, and the CI run for the exact merge SHA
> confirmed green via `gh run view`. The other 8 P2s and 4 P3s from the 2026-08-15 review were
> explicitly **not re-litigated** — still open, unaffected.
>
> **Two new minor issues found by the re-review, neither reopening anything:**
>
> 1. `web/.prettierignore` wasn't updated alongside `.gitignore` for the Playwright artifacts —
>    running `pnpm test:e2e` locally leaves `test-results/.last-run.json` behind, and a subsequent
>    `pnpm format:check` spuriously fails until it's cleaned up. Doesn't affect CI (job order runs
>    `format:check` before `test:e2e`).
> 2. `gapChartAnnotations[].year` still has no validation restricting it to the 11 valid stop codes
>    (S1–S6, F1–F5) — pre-existing gap, now more consequential since the field is genuinely
>    editor-facing: a Studio typo there would silently drop a chart annotation with no error anywhere
>    in the pipeline.
>
> Neither fixed yet — flagged to Charlie for a decision on fixing now vs. queuing. **Per Charlie's
> instruction, PRs are opened and confirmed green but not self-merged going forward — he merges.**

> ## STATUS 2026-08-15: Bob's independent dev review of the vertical slice — Revision required
>
> Ran as a genuinely separate session (fresh agent, no memory of this project's implementation
> history) against commit `7709652` (`770965218abcbc048c1261c9ca0ad3f4b6bb832c`), per guideline
> Section 3's independence requirement — Claude did not review its own work. Full detail in
> `review/bob/CODE-REVIEW.md`, `review/bob/FE-GATE-AUDIT.md`, `review/bob/APPROVAL-CHECKLIST.md`,
> `BOB-REVIEWER-HANDOFF.md` (all new dated sections at the top; prior scaffold/design history
> preserved unmodified below each).
>
> **Verdict: Revision required.** 4 P1, 9 P2, 4 P3. All ten prior scaffold-review findings remain
> closed — nothing regressed. Reproduced CI green independently (not trusted from the badge), ran
> real-browser Playwright checks at 390/560/768/1440px.
>
> **The four P1s, all new to this vertical slice (none present at scaffold time):**
>
> 1. **VS-01 — `GapChart.astro` hardcodes chart data that Sanity already models, fetches, and
>    types** (`homePage.problem.gapChartAnnotations`, wired through `queries.ts` and `types.ts`, but
>    `<GapChart />` in `index.astro:147` is rendered with zero props and the component hardcodes its
>    own `stops`/`measured` values instead). Several other big-numeral figures on the page (`24`
>    years, `2` independent checks, `20` students/year, `30` minutes free, the `3pm-6pm`/`8pm-11pm`
>    availability blocks) are likewise hardcoded, each duplicating a fact already sitting in an
>    editable prose field. Once the Sanity dataset is seeded, an editor changing the real field
>    won't change what's on screen — the page can end up contradicting itself.
> 2. **VS-02 — "Blog notes" level-to-category links measure 67.6×16.8px**, well under the WCAG 2.2
>    24px floor and this project's own ≥44×44 house rule (`design/STATES.md` §0). New to this slice;
>    didn't exist during the design-phase touch-target hardening pass.
> 3. **VS-03 — Footer nav links measure ~350×18.2px**, same failure, and `SiteFooter` is a shared
>    component — ships on every future page, not just the landing page.
> 4. **VS-04 — No Playwright suite exists anywhere in the repo.** `docs/DECISIONS.md` §4 explicitly
>    earmarked this vertical slice as "add [Playwright] with the first Playwright verification
>    pass" — it didn't happen. Every browser check in Bob's review was done ad hoc against the local
>    build; none of it is committed or CI-enforced, so nothing would catch a regression (Bob's own
>    example: the header mobile-nav-hide bug fixed earlier this session — nothing in CI would have
>    caught it if it came back).
>
> **9 P2s** (full list/evidence in `review/bob/APPROVAL-CHECKLIST.md`): header/footer nav not marked
> up as `<ul>`/`<li>` (FE-04); FAQ answers 2-13 depend on JS with no native fallback; no sitewide
> `Organization` JSON-LD; no security headers configured; no dependency/advisory scanning in CI;
> Google Fonts `@import` instead of self-hosted (repeat, previously flagged); the six documented
> old-site redirects still not implemented as executable config (repeat — three of six targets now
> exist on the real page, so nothing blocks doing this now); no vertical-slice-stage FE self-check
> recorded in `docs/DECISIONS.md` (repeat of a gap the scaffold review already caught once);
> header brand/logo link at 114×40.3px, a hair under 44×44.
>
> **4 P3s**, all minor/expected-at-this-stage: skip link 1.6px short of 44×44; sitemap/robots/RSS
> still unwired (expected — revisit with blog routes); FAQ accordion could use native
> `<details>/<summary>` (fixes the P2 JS-dependency finding as a side effect); `index.astro` is a
> large single-file component, not yet a defect.
>
> **Not fixed yet — none of this has been implemented in this pass.** Reported to Charlie for a
> decision on whether to fix now or triage.

> ## STATUS 2026-08-15: CI added and green · branch protection blocked by plan, owner-accepted · moving to Bob's review
>
> Per Charlie's instruction, in order: CI → get `main` green → branch protection → Bob's independent
> dev review. First three done as far as GitHub's Free-org plan allows; full detail in
> `docs/DECISIONS.md` §18.
>
> **CI:** `.github/workflows/ci.yml`, two jobs (`web`, `studio` — separate `pnpm-workspace.yaml`
> roots, not a unified matrix). Each runs the project's *real, already-existing* scripts —
> `format:check`, typecheck (`astro check` / `tsc --noEmit`), `lint` (studio only — web has none),
> `build`. No test step for either (no test script exists yet in either package). No secrets needed:
> web's build takes the local-fallback content path in CI (Sanity env vars deliberately left unset,
> so it never hits the live, still-empty production dataset); studio's project/dataset are hardcoded,
> public values.
>
> **Pushed straight to `main` and watched it go green** (`gh run watch`), per Charlie's explicit
> order — both jobs pre-flighted locally first, then ~40-50s each in CI. First run flagged
> `actions/checkout@v4`/`setup-node@v4`/`action-setup@v4` as targeting a deprecated Node 20 runtime;
> bumped to `v7`/`v7`/`v6`, re-ran clean with no annotations.
>
> **Branch protection: hit a real wall, not skipped casually.** Both the classic protection API and
> the newer rulesets API returned `403 Upgrade to GitHub Pro or make this repository public` —
> GitHub's Free org plan does not allow protecting a *private* repo's branches at all. Gave Charlie
> the actual tradeoff (pay for GitHub Team vs. make the repo public vs. skip for now); **he chose to
> skip** rather than pay or change visibility. `main` is technically unprotected. Compensating for it
> going forward: **feature branches + PRs + wait for both CI checks before merging, by discipline
> rather than enforcement** — no more direct pushes to `main` after this session's bootstrap commits.
> Recorded as an explicit, owner-approved exception in `docs/DECISIONS.md` §18, not a silent gap.
>
> **Next:** Bob's independent development review (`BOB-WEB-DEV-REVIEWER-PROMPT.md`) against this now
> backed-up, CI-checked commit — the other item the ⚠ reminder below (superseded) originally flagged.

> ## STATUS 2026-08-15: Git set up · repo live on GitHub · this closes the top-priority reminder below
>
> Per Charlie's instruction to act on the top-priority item flagged below (no version control
> anywhere, real data-loss risk). Full detail in `docs/DECISIONS.md` §17; summary here.
>
> **What changed:** project root, `web/`, and `studio/` are now one Git repo rooted at
> `Personal/Math/` (`studio/`'s old standalone repo — one stale commit, no remote — was folded in,
> not preserved separately; nothing in it wasn't already captured by the fresh commit). A root
> `.gitignore` was added (merges `web/`'s and `studio/`'s own `.gitignore` rules plus
> `.pnpm-store/`, `.DS_Store`, `.claude/settings.local.json`, and non-example `.env*`). Swept for
> secrets before committing — none found; only `.env.example` files exist. Initial commit: 215 files,
> `web/` + `studio/` + `design/` + `docs/` + `review/` + root docs, working tree clean after.
>
> **GitHub:** Charlie created a new dedicated org, **`JustMath-Web`** (matching the developer-owned-org
> convention already used for BOMY), since org creation has no CLI/API path for a personal account —
> only the web UI. Repo created and pushed: **`JustMath-Web/website`, private**,
> `main` tracking `origin/main`. One snag: the first push was rejected (`GH007`, private-email
> protection) because the commit author's email wasn't verified/public on the `charliekhc` account —
> fixed by switching commit identity to GitHub's noreply address
> (`7158367+charliekhc@users.noreply.github.com`) rather than making a personal email public.
>
> **Deliberately not done this pass:** branch protection on `main` and CI (GitHub Actions —
> typecheck/lint/tests/build), both still required by guideline Section 7. Branch protection
> requiring "passing CI" needs a CI workflow to exist first, and `web/` and `studio/` are separate
> `pnpm-workspace.yaml` roots (not one unified workspace), so the CI matrix is its own small decision
> — next repository task, not done implicitly here.
>
> **This closes the git/backup half of the ⚠ reminder immediately below.** Bob's independent
> development review (the reminder's other flagged item) is still open and unaffected by this entry.

> ## ⚠ REMINDER FOR THE NEXT SESSION: set up Git — RESOLVED 2026-08-15, see entry above
>
> Superseded by the entry directly above. Left here as history per the guideline's handoff rule
> (newest entries first, prior sections kept). Original text follows, describing the state *before*
> this session's fix — the "no Git repository anywhere" problem it describes no longer applies.

> ## STATUS 2026-08-15: Header mobile-nav-hide fixed and verified · dev may continue
>
> Per Charlie's instruction, fixed the one real finding from the cross-check entry below before dev
> continues: `web/src/components/SiteHeader.astro` no longer sets `.site-header__nav { display: none }`
> below 560px. The mobile-width tightening (`gap: var(--space-3)`) stays; only the hide rule was
> removed. No hamburger or other mobile-nav pattern was needed — the design comp already fits the
> header's contents at 390px, so the fix is dropping the unnecessary hide, not adding a substitute.
>
> **Verified, not asserted:** `pnpm build` clean, `pnpm format:check` clean. Rendered the built output
> at 390×844 in a real browser: nav `display: flex` (was `none`), "Blog" link 44×44, "Schedule Now"
> CTA 131.6×44, header 63px tall, `scrollWidth === clientWidth === 390` (no overflow introduced).
> Screenshot confirms mark + "Just Math / MALAYSIA" + "Blog" + "Schedule Now" all render on one line,
> matching the design comp exactly.
>
> This closes the divergence noted in the entry immediately below — its "Recommend" paragraph is
> superseded by this fix.

> ## STATUS 2026-08-15: Andy (design) cross-check of the vertical slice · closing this design session
>
> Per Charlie's request to close this session, since dev is actively using this file: the design side
> did the cross-check the 2026-08-15 verification entry below flagged as outstanding ("the entry below
> mentions Andy cross-checking (design), not a Bob dev-review pass"). **This is a design-authority
> fidelity check only — it is not Bob's independent development review**, which is still open as
> priority item #2 below and must happen separately.
>
> **Checked against `design/` and found faithful:** `web/src/styles/tokens/{colors,typography,base}.css`
> are byte-identical to their `design/tokens/` counterparts (diffed, not eyeballed — 0 lines differ).
> `LogoLockup.astro`'s SVG path data matches the adopted operator mark exactly, and it correctly
> references `var(--tracking-tight)` rather than hand-typing `-0.02em` the way the original JSX source
> did. The WhatsApp CTA label, `wa.me` URL, and phone number in `defaultLandingData.ts` match the
> approved copy verbatim.
>
> **One real divergence found, not launch-blocking but worth fixing before blog routes ship:**
> `SiteHeader.astro` sets `.site-header__nav { display: none }` below 560px, with no hamburger or
> other mobile substitute — so the sticky header's "Blog" link, which this project verified at 44×44
> with no overflow at 390px earlier in this same design pass, disappears entirely on the phone
> viewport the whole brief targets. It happens to be harmless *today* only because no `/blog/` route
> exists yet (item #3 below) and `footerLinks` also carries a Blog entry — so the link isn't currently
> dead, just unreachable from the header on mobile. The original design comment in
> `LandingShell.jsx` (`"The 'Blog' link is the only route to the blog; without it the archive is
> unreachable"`) was written before a footer fallback existed, and nothing in `design/` ever hides
> this link at any breakpoint — I explicitly screenshotted and measured the 390px header with "Blog"
> visible in this project's earlier verification pass. **Recommend:** either drop the `display: none`
> (the header already fits "Blog" + the CTA on one line at 390px per the design comp) or add a real
> mobile nav pattern before blog routes go live — don't ship the silent hide as-is.
>
> **Design package status: unchanged.** Still **approved with conditions for development handoff**,
> not launch approval. Every condition listed in the 2026-08-14 "approved with conditions" entry and
> in `docs/DECISIONS.md` §1 remains open exactly as recorded — portrait, brand-mark sign-off, WhatsApp
> glyph asset/removal, disabled-note legibility, trust-bar accessible-name confirmation, header CTA
> wording, richer brand evidence, report empty-state strings, Mr Kong-reviewed blog copy/math. Nothing
> the vertical slice did closes any of these; none of them block continued development.
>
> This design/Andy session is closing here. The git-setup gap and the still-pending Bob dev-review
> remain the two highest-priority items for whoever picks this up next — both already flagged below.

> ## ⚠ REMINDER FOR THE NEXT SESSION: set up Git
>
> **Ask Charlie about this at the start of the session, before other work.** Neither the project
> root nor `web/` is a Git repository — none of the scaffold or vertical-slice work is backed up
> anywhere. `studio/` has a git repo but only one commit from initial bootstrap (`feat: bootstrap
> sanity studio`); every schema, the seed script, and all dependency-pinning changes since are
> uncommitted, and it has no remote. Guideline Section 7 requires a dedicated GitHub org and one
> private repo per project (`<client>-web`), with branch protection and CI — none of that exists
> yet. This was flagged as the top-priority item in the 2026-08-15 verification entry below; it
> still hasn't been actioned as of the most recent session.

> ## STATUS 2026-08-15: Vertical slice independently verified · next steps identified, not started
>
> Per Charlie's instruction: checked and verified the vertical-slice claims in the entry below.
> **Nothing was implemented, fixed, or changed in this pass** — verification and a prioritized
> pending list only, for a future session to pick up.
>
> **Verification result: every claim in the entry below checked out, independently re-run, nothing
> over-stated.** `web`: `astro check` (0 errors/warnings, 17 files), `astro build` (clean),
> `prettier --check .` (clean). Built `dist/index.html` is exactly 47,115 bytes (byte-for-byte match
> to the claim), contains the real WhatsApp CTA copy and `wa.me/60194728768` link, has exactly one
> `<h1>` and one `<main>`, and `rg 'href="#"'` returns nothing in source or output. `studio`: `tsc
> --noEmit`, `eslint .`, `prettier --check .` all clean; `sanity build` passes with the same
> documented auto-update version-drift warning as before (§4d, unchanged); `pnpm seed:dry-run`
> correctly reports 6 categories, 1 author, 3 singletons, and makes no writes. Spot-read
> `src/lib/content/landingData.ts` (the new Sanity/fallback path) and a few components
> (`WhatsAppCta.astro`, `SiteHeader.astro`) — the fallback path correctly reuses the
> published-only `sanityClient` (no perspective regression), and the new components use real
> `href`s and the `--control-h` token consistently with the fixes from the scaffold review.
>
> **What's genuinely left, priority order (none of this has been started):**
>
> 1. **No version control at all for `web/`, and `studio/` is local-only with nothing since its
>    first commit.** Root and `web/` are not git repositories — none of the scaffold or vertical-slice
>    work is backed up anywhere. `studio/` has a git repo but only one commit (`feat: bootstrap sanity
>    studio`); every schema, the seed script, and the dependency pinning from the review-fix pass are
>    still uncommitted, and it has no remote. Guideline Section 7 requires a dedicated GitHub org, one
>    private repo per project, branch protection, and CI — none of that exists yet. This is a real
>    data-loss risk, not just a process gap, and arguably belongs before the feature gaps below.
> 2. **Bob's independent development review of this vertical slice hasn't happened.** The entry below
>    mentions Andy cross-checking (design), not a Bob dev-review pass — the guideline's independent
>    Bob review is mandatory before a vertical slice counts as reviewed, the same as the scaffold
>    needed one.
> 3. **No blog routes.** `/blog/`, `/blog/[slug]/`, `/blog/level/[slug]/` don't exist as pages —
>    `getAllPosts`/`getPostBySlug`/`getPostsByCategorySlug` etc. are typed and already used by
>    nothing.
> 4. **Sitemap/RSS/robots not wired.** `@astrojs/sitemap` is an installed dependency but not added to
>    `astro.config.mjs`'s `integrations`; no `/rss.xml`, no `robots.txt`.
> 5. **Redirects not implemented.** The known old-site redirect map (`docs/DECISIONS.md` §10,
>    `docs/CONTENT-MODEL.md` §9) exists only as a document, not as Vercel config/middleware.
> 6. **The Sanity dataset is still empty.** `pnpm seed` (the real write) hasn't run — no
>    `SANITY_API_WRITE_TOKEN` is available in this environment. The live site currently only ever
>    renders `defaultLandingData.ts`'s local fallback copy, never real Sanity content, because
>    `getLandingPageData()` falls back whenever the dataset returns incomplete data.
> 7. **No blog posts exist**, and any future post needs `reviewStatus: approvedByMrKong` before the
>    query filter will let it render (already enforced; just nothing to enforce yet).
> 8. **No Playwright/browser verification pass.** Guideline Section 19 requires viewport screenshots
>    against the design authority, keyboard-nav checks, and overflow checks before a vertical slice
>    is review-ready. Not added.
> 9. **No FE self-check recorded for this slice.** The scaffold review caught this exact gap once
>    already (Bob P2-DEV-07) — a fresh FE-xx self-check for the vertical slice should go in
>    `docs/DECISIONS.md` before the next Bob request, so it doesn't get caught as a repeat finding.
>
> Unchanged from before, not new: the portrait asset, brand-mark sign-off, WhatsApp glyph decision,
> disabled-note legibility, self-hosted fonts, Sanity TypeGen wiring (§4b), and analytics/consent are
> all still open exactly as recorded earlier in this file and in `docs/DECISIONS.md`.

> ## STATUS 2026-08-15: First vertical slice implemented · seed script ready
>
> The first vertical slice now exists in `web/`: `src/pages/index.astro` renders the real landing
> page from the `homePage` data shape, with project layouts/components for the header, footer,
> WhatsApp CTA, section markers, logo lockup, and the no-fake-photo gap chart / typographic portrait
> fallback. `web/src/lib/content/defaultLandingData.ts` holds the approved landing-page copy as the
> local fallback, and `web/src/lib/content/landingData.ts` reads Sanity when public project/dataset
> env vars are present, falling back locally if the dataset is not ready.
>
> The seed path is now Studio-owned: `studio/scripts/seed.ts` reuses that same fallback data to seed
> `homePage`, `siteSettings`, `navigation`, the six syllabus categories, and the default `mr-kong`
> author. Singleton documents use the explicit IDs from `docs/CONTENT-MODEL.md`; normal
> category/author documents are found by slug and created with Sanity-generated IDs when absent.
> `studio/.env.example` and `studio/README.md` document `pnpm seed:dry-run` and tokened
> `pnpm seed`.
>
> **Verified:** `web`: `pnpm check`, `pnpm build`, `pnpm format:check`. `studio`: `pnpm typecheck`,
> `pnpm lint`, `pnpm format:check`, `pnpm build` (with network for Sanity's auto-update module),
> `pnpm seed:dry-run`. Local built-output smoke check: static preview served
> `http://127.0.0.1:4324/`, returned 47,115 bytes, served the generated CSS at 200 OK, contained the
> hero/CTA/final-section strings, and contained no `href="#"`.
>
> **Not done:** the real Sanity dataset seed was **not** run because no private write token is
> available in this environment. Playwright/CI are still not added; there is no screenshot-based
> responsive/a11y pass yet; no blog routes, seed posts, redirects, or portrait asset were built in
> this slice. This is vertical-slice implementation work, not launch approval and not Bob approval.
> Bob's independent development review should be a separate pass using the Bob prompt; no
> `review/bob/*` or `BOB-REVIEWER-HANDOFF.md` files were changed here.
>
> **Environment note:** the project root and `web/` are not Git worktrees in the current
> environment, so there is no root/web git diff to cite. `studio/` is a nested Git worktree and was
> already dirty from the scaffold work; this slice adds the seed-related `README.md`/`package.json`/
> lockfile changes plus `scripts/seed.ts` and `.env.example` inside that existing Studio worktree.
>
> **Pause note:** per Charlie's instruction after this entry, stop here. Do not fix, implement,
> seed, review, or revise anything further in this project until the next session. Andy will
> cross-check this handoff first. The local static preview server that was running on
> `127.0.0.1:4324` has been stopped.

> ## STATUS 2026-08-14: Scaffold review closed — Approved for the next controlled development step
>
> Bob's re-review closed with **no open scaffold findings**. Sequence: initial scaffold review
> returned Revision required (2 P1, 7 P2, 1 P3) → all ten fixed and re-verified → Bob's re-review
> accepted the fixes and raised one new P3 (`docs/DECISIONS.md` §4a still described the pre-fix
> `perspective: 'drafts'`-on-token-presence behavior) → fixed, swept `HANDOFF.md`/`web/README.md`/
> `web/.env.example` for the same staleness (none found, both already accurate) → Bob verified and
> closed. Full detail in the two entries below and in `review/bob/CODE-REVIEW.md`,
> `review/bob/FE-GATE-AUDIT.md`, `review/bob/APPROVAL-CHECKLIST.md`, `BOB-REVIEWER-HANDOFF.md`.
>
> **This is scaffold approval, not launch approval or vertical-slice approval** — same distinction
> the design-phase approvals drew throughout this project. The Astro project in `web/` (tokens,
> Sanity client/queries, TypeScript strict, Tailwind v4) and the Studio schemas in `studio/` are
> approved as a foundation. No real page templates, component tree, Playwright, CI, or seeded
> content exist yet.
>
> **Next step:** the first vertical slice — layouts, the landing page from
> `just-math-page-copy-final.md` via the `homePage` schema, and seeding
> `siteSettings`/`navigation`/categories/author so the query helpers have real data to return.

> ## STATUS 2026-08-14: Bob's scaffold review findings fixed · re-review pending
>
> Bob ran the mandatory independent scaffold review (`review/bob/CODE-REVIEW.md`,
> `review/bob/FE-GATE-AUDIT.md`, `review/bob/APPROVAL-CHECKLIST.md`, `BOB-REVIEWER-HANDOFF.md`) and
> returned **Revision required**, with 2 P1s, 7 P2s, and 1 P3. All ten findings were legitimate —
> nothing was disputed. All ten are now fixed and re-verified; the fixes have **not** been
> independently re-reviewed by Bob yet, so treat this scaffold as unapproved until he confirms.
>
> **The two P1s, both real bugs:**
>
> 1. `web/src/lib/sanity/client.ts` switched to `perspective: "drafts"` whenever
>    `SANITY_API_READ_TOKEN` existed — a token added later for a private dataset would have silently
>    leaked draft/unpublished content into production builds. Fixed: `sanityClient` always reads
>    `"published"` regardless of token presence; draft access now requires a separate
>    `createPreviewClient()` gated on both the token and a distinct `ENABLE_SANITY_PREVIEW=true`.
> 2. The scaffold's only built page shipped a green, WhatsApp-colored anchor with `href="#"` —
>    violating FE-05 and the project's own "green only means a control opens WhatsApp" rule
>    (`docs/DECISIONS.md` §14). Fixed: it's now a non-interactive, labelled token swatch, not a link.
>
> **The seven P2s, all fixed:** navItem/redirect CMS URL fields now validate shape by kind
> (internal/fragment/external/whatsapp/tel, or internal-path/`https://` for redirects) instead of
> accepting any string; `web/src/lib/sanity/types.ts` now has explicit interfaces for every
> `homePage` section (no more broad `unknown`) plus a typed Portable Text union for `post.body`;
> `queries.ts` uses explicit field projections everywhere instead of whole-document spreads, and the
> category-archive query resolves the category slug to `_id` once instead of dereferencing every
> candidate post's categories inside the filter; post/category/author slugs now enforce
> lowercase-hyphenated format and dataset uniqueness; `studio/package.json` caret ranges are pinned
> to exact installed versions, and the Studio auto-update posture is now a recorded decision
> (`docs/DECISIONS.md` §4d) rather than an unreviewed warning; both `web/README.md` and
> `studio/README.md` are real project docs now, not framework starter text; and a scaffold-stage FE
> self-check was added to `docs/DECISIONS.md` §16 (it was missing before the review, per guideline
> Section 9 — this should exist before every future Bob request, not just this one).
>
> **The one P3:** `web/src/styles/tokens/*.css` were claimed "copied verbatim" from
> `design/tokens/`, but an intervening `prettier --write .` had reformatted them, so the claim was no
> longer true (values were untouched — this was a documentation-accuracy finding, not a value-drift
> one). Fixed: re-copied fresh (`diff -rq` now clean) and added to `.prettierignore` so a future
> format pass can't silently drift them again.
>
> **Verified after fixes:** `web`: `pnpm build`, `pnpm check` (0 errors/warnings), `pnpm format:check`
> all pass; `rg 'href="#"' src` returns nothing. `studio`: `pnpm typecheck`, `pnpm lint`,
> `pnpm format:check`, `pnpm build` all pass (the Sanity local-vs-runtime version-drift message in
> the build output is now the documented, accepted §4d policy, not an open question).
>
> **Next step:** send this back to Bob for re-review against `review/bob/APPROVAL-CHECKLIST.md`'s
> P1/P2/P3 list. Do not treat the scaffold as approved on the strength of this entry alone — Bob's
> re-check is the actual gate, per the guideline's independent-review requirement.

> ## STATUS 2026-08-14: Astro + Sanity scaffold complete · no vertical slice built yet
>
> **What exists now, verified.** `/web` is a real Astro project (not the empty folder the prior
> entry describes) — TypeScript strict, Tailwind v4 wired to `design/tokens/*.css` verbatim (not
> hand-transcribed) via `@theme inline`, `@sanity/client` + typed `defineQuery` GROQ helpers for
> every function `docs/CONTENT-MODEL.md` §11 lists, Prettier + `prettier-plugin-astro` +
> `prettier-plugin-tailwindcss`. `/studio` now has real schemas — all 7 document types and the
> shared/homePage objects from `docs/CONTENT-MODEL.md`, a singleton desk structure for
> `homePage`/`siteSettings`/`navigation`, field-level validation matching the publish rules
> (`reviewStatus`, required-alt-when-informative, WhatsApp CTA URL lock). `pnpm build`/`astro
> check`/`prettier --check` pass clean in `web/`; `tsc --noEmit`/`eslint .`/`sanity build` pass
> clean in `studio/`. Full record of what was built and why: `docs/DECISIONS.md` §4 deviations,
> §4a–§4c.
>
> **Not done — this was scaffold, not a vertical slice.** No page renders real content yet
> (`index.astro` is a token-wiring smoke test, not the landing page). No component tree, no
> Portable Text serializers, no Playwright, no CI, no redirects wired, no seed content in the
> dataset (Studio schemas exist but the dataset is empty — nothing to query yet). `docs/DECISIONS.md`
> §4b: Sanity TypeGen is not wired (types in `web/src/lib/sanity/types.ts` are hand-authored against
> the content model, not generated — `web/` and `studio/` are separate package roots with no shared
> workspace, so this needs a `sanity-typegen.json` with a relative schema glob, deferred until real
> queries exist to scan).
>
> **Two deviations from the approved plan, both recorded with reasons in `docs/DECISIONS.md`:**
> `@sanity/astro` was dropped for plain `@sanity/client` (the integration's peer deps pulled in
> ~800 packages — React, Studio-in-browser, styled-components — for features this project doesn't
> use); TypeScript is pinned to `6.0.3` not `7.0.2` because `@astrojs/check` doesn't yet support the
> TS 7 major. Also fixed in passing: `studio/pnpm-workspace.yaml` had an unresolved
> `esbuild: set this to true or false` placeholder blocking `pnpm install` outright — set to `true`
> to match `web/`'s already-approved config (§4c).
>
> **All prior launch/owner/client conditions below are unchanged and still open** — this session
> did not touch design, copy, or brand decisions. Next step is the first vertical slice: layouts,
> the landing page from `just-math-page-copy-final.md` via the new `homePage` schema, and seeding
> `siteSettings`/`navigation`/categories/author so the queries have something to return.

> ## STATUS 2026-08-14: Development initialization docs written · scaffold not started
>
> The design package remains **approved with conditions for development handoff**, not launch
> approval. The development Initialization Gate decisions are now recorded in:
>
> - `docs/DECISIONS.md`
> - `docs/CONTENT-MODEL.md`
>
> Key decisions recorded: route is `02-INFORMATIVE-BLOG.md`; build in existing `/web`; keep
> `/studio` as the separate Sanity Studio; use Sanity project `v4v0i7gl` / dataset `production`;
> launch language is `en-MY` only; no forms, Resend, Turnstile, search, newsletter, comments, or
> analytics at scaffold time; old-site continuity uses the eight known live URLs as first-slice
> redirect/content-review requirements rather than doing a full Stage 0R audit.
>
> Important scaffold warning: `web/reusable/README.md` is stale and references retired
> equals/wordmark assets plus the old `justmath.my` target. Do not treat it as source of truth. The
> next dev step must delete or regenerate `web/reusable/` from the current `design/` package before
> implementation relies on anything in `/web`.
>
> Redirect/content-review call recorded: `/about/` → `/#about`, `/faq/` → `/#faq`, `/pricing/` →
> `/#pricing`, `/category/algebra/` → `/blog/level/form-1-3/`, `/mastering-algebra/` →
> `/blog/level/form-1-3/`, and `/differentiation-using-the-first-principle/` →
> `/blog/level/add-maths/`. The two old post URLs should also be inspected as possible
> seed posts before Mr Kong writes fresh blog content; if refreshed, revise their redirects to the
> new post URLs.
>
> Launch conditions remain unchanged: portrait or typographic About fallback, adopted mark sign-off,
> WhatsApp glyph asset/removal, disabled-note legibility, trust-bar accessible-name confirmation,
> header CTA wording, richer brand evidence, report empty-state strings, and Mr Kong-reviewed blog
> copy/math.
>
> Scaffold/install work has **not** started in this entry. Next step: scaffold the Astro app in
> `/web`, remove/regenerate stale reusable references, add the documented redirects, wire the design
> tokens/assets, and implement the first vertical slice.

> ## STATUS 2026-08-11: Approved with conditions · no design-author blocker remains
>
> **Bob's verdict, independently verified by him** — not a self-assessment. He confirmed the operator
> mark renders at 45.09 × 45.09 in both the static document-control report and the React report, with
> no uppercase/rule lockup and no equals copy anywhere, `.lockup-fill` resolving; bundle parses;
> manifest/CSS 125/125/0; manifest/card drift 30 cards / 0.
>
> **This is not launch approval.** Everything still open is an owner or client decision:
>
> | Owner | Item |
> | --- | --- |
> | **You** | Disabled-note legibility (`STATES.md` §2.5) — low priority, the site has no forms |
> | **You / brand owner** | Sign-off on the adopted operator redraw. The *direction* is the client's own mark; this *execution* is derived |
> | **You** | WhatsApp glyph: ship an official white/reversed asset from Meta's kit, or drop it (lossless — the label says "on WhatsApp") |
> | **Client** | **The portrait — the one true launch blocker.** Or approve a typographic rebuild of About |
> | **Client** | The original brand brief, if it exists — two claims have already traced back to it and proved wrong |
> | **Build** | FAQ count bound to array length, not typed · the two report empty-state strings in Mr Kong's voice · optional trust-bar accessible name |
>
> **Not yet done, deliberately:** the CS-71 fingerprint row stays **unappended** to
> `Setup_Instructions/Guidelines/Web-Design/DESIGN-FINGERPRINTS.md`, and the sanitized sector profile
> stays unfiled. Both wait for conditions to close into full approval — appending early would corrupt
> the ledger future packages are compared against.
>
> **A standing caution for whoever picks this up:** four separate "this is done" claims in this
> project were narrower in reality than in writing, each caught by review rather than by me. Treat
> completion claims here as unverified until independently checked, and when changing brand or
> tokens, **sweep `templates/` explicitly** — it hid a stale colour and a retired lockup because it
> is neither a component nor a UI kit.

> ## 2026-08-11 — Package sync (Bob P2) — closed on the third pass
>
> **This section previously claimed "all five closed". That claim was premature and Bob rejected it**
> — three items were still open at the time: `BRAND-INTAKE.md` §4 still said "Six SVG marks exist",
> the progress-report template still rendered the retired uppercase lockup, and this very heading
> overstated the result. All three are now fixed and listed below.
>
> The stale-copy locations, and which pass caught each:
>
> | Item | Fix |
> | --- | --- |
> | `Booking.jsx` + bundle said "equals monogram" | Now "the operator mark" |
> | `brand.card.html` subtitle advertised the equals mark | "Lockup, mark alone, type alone, reversed"; demo rebuilt around the real variants |
> | `_ds_manifest.json` advertised the equals/equal-sign mark | **8 fields resynced** from the cards' own `@dsCard` markers |
> | `website/README.md` said no logo, pending decision | Now describes the adopted lockup and why the header draws it inline |
> | `BRAND-INTAKE.md` + `ASSETS.md` carried six-mark / type-only approval wording | Now: sign off the operator redraw — direction decided, execution still derived |
> | **`brand-wordmark.card.html`** — not in Bob's list | It still rendered the **entire old uppercase "JUST MATH · rule · MALAYSIA" lockup**. Rebuilt as the real lockup; card renamed **Wordmark → Lockup** |
> | **`brand-clearspace.card.html`** — not in Bob's list | Same old lockup, and clear space was defined as "the cap height of JUST MATH", which no longer exists. Now half the mark's height |
> | **`BRAND-INTAKE.md` §4** — third pass | Said "Six SVG marks exist". Now: three marks, a **redraw of the client's own live mark**, with the six earlier ones deleted |
> | **`templates/progress-report/ProgressReport.dc.html`** — third pass | The report **letterhead** still rendered the retired uppercase "JUST MATH · rule · MALAYSIA". Now the operator lockup, verified rendering |
>
> **Why this took three passes.** Each miss was the same shape: searching for an identifier rather
> than for what a reader sees. I grepped the *filename* `monogram-equals`, never the prose "equals
> monogram"; then I grepped prose but only across the directories I had in mind.
>
> **`templates/` was the blind spot twice** — it also hid the stale `#9c6a17` ochre that Bob caught
> earlier. It is easy to forget because it is neither a component nor a UI kit, yet it renders brand
> surfaces. **Any future brand or token change must sweep `templates/` explicitly.**
>
> **Verified:** all 5 of Bob's items at 0 occurrences · bundle parses · **manifest/CSS 0 diffs of
> 125** · **manifest/card drift 0** (every card's name, subtitle, group and viewport now matches its
> own `@dsCard` marker) · **0 references to any deleted asset**. Brand card renders all four variants
> including reversed, which confirms `currentColor` recolours mark and type together with no second
> asset.
>
> ---
>
> ## 2026-08-11 — Mark decided (Option B) and fully wired
>
> **The owner chose Option B: the operator cluster redrawn in brand ink.** The old four-colour PNG
> does not ship; the equals monogram is retired.
>
> **Wired:** header lockup (mark + stacked type), favicon and WhatsApp avatar, `Logo` component with
> `.d.ts` and prompt, brand cards (monogram, banned), booking-kit avatar, `readme.md` brand section
> and asset index, `ASSETS.md` §1/§1b, and the compiled bundle.
>
> **Deleted — 7 files**, backed up outside the project:
> `logo.svg`, `logo-wordmark.svg`, `logo-wordmark-reversed.svg` (all three rendered as default
> browser type in any `<img>`, because they referenced `class="w"/"m"` with no CSS in the package;
> `logo.svg` was also byte-identical to `logo-wordmark.svg`), the three `monogram-equals*.svg`, and
> the now-obsolete `marks-contact-sheet.html`.
>
> **The `Logo` component was rebuilt**, not patched: variants are now `lockup` (default),
> `monogram`/`mark`, and `wordmark`/`stacked`. The mark draws with `currentColor`, so `reversed`
> recolours it without a second asset.
>
> **Verified:** mark renders 41×41 against a 41px type block — **exactly matched**, because it is
> sized to `2.05em` (1em + 0.45em gap + 0.6em), so the two stay aligned at any viewport. Landing page
> at 390: **0 contrast failures / 234 nodes, 0 clipped, 0 sub-24px targets, 0 stuck invisible.** Bundle
> parses; manifest/CSS 0 diffs of 125; **0 references to any deleted asset** anywhere in the package.
>
> **One rule had to change.** `readme.md` previously said *"Never: a symbol beside the type."* That
> was written for the equals monogram, which read as punctuation next to words. The operator cluster
> is a distinct glyph block and the live site has always set it beside the name, so the rule now
> reads: never the mark **in green**, in any colour but ink-900 or paper, or as the original
> four-colour PNG.
>
> ---
>
> ## 2026-08-11 — P2 REOPENED: a predecessor site exists. "Greenfield" was wrong.
>
> **`mathematicsmalaysia.com` is live** (WordPress/Bricks) and ships a logo:
> `site-logo-math-white.png`, a 350×100 raster of a 2×2 operator cluster (**+ − × ÷**) beside
> "Just MA+H Online", in red `#ea222a`, cyan `#6cc3d9`, **green `#84d063`**, yellow `#f9e105`.
>
> This package was written believing the project was greenfield with no prior mark. **It was not.**
> Seven false statements across five files have been corrected: `DESIGN.md` route note,
> `BRAND-INTAKE.md` (×2), `MARKET-SCAN.md`, `ASSETS.md`, `ui_kits/website/README.md`.
>
> **What this costs, stated plainly:**
>
> - **No Stage 0R audit exists.** Verified only: the logo asset, page title, platform. **Missing:**
>   capture inventory, copy inventory, diagnostic gate scores, equity inventory, and continuity
>   constraints — redirect map, SEO landmarks, integrations, non-regression features.
> - **`MARKET-SCAN.md` has no Exhibit A.** The client's own site was never scored against the
>   conventions its competitors were scored on.
> - Just Math is **defending** a position in this market, not entering it.
>
> ### The mark — OWNER DECISION, nothing wired
>
> Compare at `assets/mark-options.html`. Recommendation is **B**.
>
> | | Option | Verdict |
> | --- | --- | --- |
> | **A** | Live PNG as-is | **Do not ship** — raster; contains green, breaking the reserved-green rule; illegible at a 40px WhatsApp avatar |
> | **B** | Operator cluster redrawn in `ink-900` (`monogram-operators.svg` + `-invert`) | **Recommended** — keeps the recognition, drops the child-facing colour, scales, reverses, survives 40px |
> | **C** | Equals monogram | Well-made but has no connection to what parents have already seen |
>
> **Why the recommendation changed.** The equals monogram was designed believing no prior mark
> existed. It didn't hold: discarding a mark parents may already recognise is an equity decision, not
> a style preference.
>
> **If B is chosen, remaining Andy work:** wire the header lockup, replace the favicon, update the
> `Logo` component, and correct the brand sections of `readme.md`.
>
> **Bob's position is correct: "nothing outstanding on the design author" no longer holds.** The
> owner decides first.

> **Path note (2026-08-11):** the practice guidelines moved from `Projects/Guidelines/` to
> **`Projects/Setup_Instructions/Guidelines/`**. Earlier entries in this file quote the old
> location; the prompts and the fingerprint ledger are unchanged in content, only relocated.
> Current: `Setup_Instructions/Guidelines/Web-Design/` (Andy + Bob prompts, craft standard,
> `DESIGN-FINGERPRINTS.md`, `Sector-Profiles/`).

> ## WhatsApp brand-guideline check — done 2026-08-11
>
> Checked against WhatsApp Brand Resources (`whatsappbrand.com` → Meta). Full record and quotes in
> `ASSETS.md` §4. Four of five checks pass: the glyph never replaces the word, capitalisation is
> exact everywhere, and nothing implies partnership or endorsement.
>
> **Fixed:** two authored strings used "WhatsApp me" — the name as a verb, which the guidelines say
> to avoid. `SiteHeader`'s default label and the `core.card.html` demo now read "Message on WhatsApp".
>
> **Deliberately not fixed:** the third instance, *"WhatsApp me for what is currently open."*, is
> **approved client copy**. Verbatim policy outranks a third-party *should-avoid*, so it stands.
> **[CLIENT DECISION]** — recommendation is to keep it: it is how Malaysians speak, and rewriting
> approved copy for a soft guideline is the worse trade.
>
> **One unresolved item — the glyph ships WHITE.** Stated precisely, per Bob's sharper framing:
> white is **not** automatically disallowed, since Meta's kit generally supplies white/reversed
> variants. The problem is narrower — **this implementation programmatically tints a path** rather
> than using a supplied asset, so we cannot claim the shipped mark is an approved variant.
>
> The launch choice is binary: **ship an official white/reversed asset** from the kit and record
> which file was used, **or drop the glyph** — lossless now, because the label says "on WhatsApp".
> A green glyph on a light button is not a third option; it breaks the reserved-green rule and the
> 4.5:1 label contrast. Meta's brand page requires a login from some networks, so whoever resolves
> this must open the kit signed in.
>
> **P3 cleanup, fixed:** `WhatsAppButton.jsx` still carried a comment calling the glyph "the only
> remaining signal" of destination — stale since the label changed, and misleading because it made
> the drop-the-glyph option look impossible. Corrected. (The same stale claim in the website README
> was fixed earlier; this was the second copy of it.)
>
> This blocks launch only until one of the two options is chosen. It does not block review.
>
> ---
>
> ## Header lockup + domain changed 2026-08-11
>
> **Domain is now `mathematicsmalaysia.com`** (was `justmath.my`) — updated in `readme.md`, the
> website kit README, the `SiteFooter` email default, the OG source **and the regenerated OG PNG**,
> which had the old domain baked into the image.
>
> **The header lockup is now stacked**, per the owner's inspect-element edit: MALAYSIA sits beneath
> "Just Math", justified to exactly the wordmark's width. Measured ink widths match to 0.00px at both
> 390 and 1200. Built from one scale control — `clamp(1rem, 2vw, 1.25rem)` — with everything else in
> `em` and **zero absolute px**, so the whole mark scales in proportion.
>
> Three things were needed to make the widths match, recorded because each is a real trap:
> `align-items: stretch` alone only widens the box (the text still sat 7.78px short); justification
> does nothing on a single word without **`text-justify: inter-character`**; and once justification
> works it absorbs the trailing letter-space, so the manual compensation for it must be removed.
>
> The Safari fallback is **centred, not left** — `.lockup-fill` in `tokens/base.css` puts centring in
> the base rule and the justification inside `@supports`, so unsupported browsers degrade to a
> deliberate-looking lockup. Verified by disabling the `@supports` block and re-measuring: +3.11 /
> −3.12, i.e. centred to within 0.01px.
>
> ---
>
> ## Dev-standard scope settled 2026-08-11 (Bob concurs)
>
> **`WEB-DEV-CRAFT-STANDARD.md` is NOT adopted into the design phase.** Its own governing principle
> standardizes engineering, not the client's visual identity, and FE-10 onward (layout method,
> architecture, framework, dependencies, code quality) belongs to implementation and the web-dev
> review.
>
> **The design-dependent semantic subset IS pre-answered**, in `STATES.md` §0.1–§0.2: FE-02 section
> accessible names, FE-04 list decisions, FE-05 link-vs-button intent, FE-06/07 heading and landmark
> contract, and the FE-33 Astro/React consequence.
>
> This surfaced one real collision: **three sections carry no heading** (trust bar, Levels, FAQ) —
> deliberate design, but an FE-02 gate failure waiting for the developer. Resolved without inventing
> copy: Levels and FAQ point `aria-labelledby` at their existing visible kickers; only the trust bar
> needed a new screen-reader-only label ("Teaching experience"), logged in `COPY-GAPS.md` §2f.
>
> **Important distinction, recorded by Bob:** the prototype is still **not "FE-compliant" and does
> not need to be.** The value is that the Astro dev session inherits semantic decisions rather than
> inventing them. The engineering gates get judged on real code, in that session, by that reviewer.
>
> Also reconciled: `ASSETS.md` §3 was still titled "substitution, flagged and unresolved" while its
> body recorded IBM Plex as confirmed. Heading, status column and the launch-list line now all say
> the same thing — the families are settled; self-hosting is a delivery task, not a decision.
>
> ---
>
> ## Client decisions recorded 2026-08-11
>
> | Item | Decision |
> | --- | --- |
> | Level age bands ("Ages 7 to 12" etc.) | **Confirmed correct.** No longer a copy gap |
> | Fonts | **Keep IBM Plex.** The substitution is now the decision, not a placeholder — font condition closed |
> | IGCSE sentence | **Resolved without a client decision** — reverted to approved copy (see below) |
> | Report timing | **End of each month** — the approved copy was right |
> | Report workflow | **Option (b): assisted generation**, built during development |
> | Portrait | Coming later. Still the one launch blocker |
>
> ### The IGCSE line — derived copy had weakened an approved claim
>
> The page shipped *"Plus IGCSE Mathematics and Additional Mathematics, taught to the international
> syllabus."* The approved copy reads *"IGCSE Mathematics and IGCSE Additional Mathematics, taught to
> the international syllabus **rather than translated across from SPM**."* The dropped clause is the
> differentiator — it separates a natively-taught international syllabus from a converted Malaysian
> one. Restored verbatim in source and bundle. **No client decision was needed; the client had
> already written the better sentence.** Recorded in `COPY-GAPS.md` §2e.
>
> ### "First Monday" was wrong in four places
>
> `readme.md`, `ui_kits/reports/README.md`, `Report.jsx` (rendered report copy) and
> `Checkbox.prompt.md` all said reports go out on the **first Monday of each month**. The approved
> copy says **end of every month**, in three separate places. The wrong version had propagated
> through the package from an unverifiable source. All four corrected, plus the bundle. **0
> occurrences remain.**
>
> ### Report workflow — decision (b), and what it means for development
>
> **Today nothing exists:** `studio/schemaTypes/index.ts` is `export const schemaTypes = []`. The
> report is design only — a document template and a UI kit.
>
> **(b) assisted generation** means: Sanity holds a record per student; Mr Kong fills a short form
> each month; the report document is generated from it and sent by him. Implications for the build:
>
> 1. **A content model is needed** — student, month, topics with a progress level, marks, the prose
>    summary, and the one instruction. This is the first real use of the Sanity studio.
> 2. **`ProgressReport.dc.html` becomes data-driven.** It is currently static design; development maps
>    its blocks to fields. The document design itself does not change.
> 3. **The empty states already built are now load-bearing.** `ProgressMeter level="none"` and
>    `ScoreTable rows=[]` are exactly what a generated report hits for a new student in month one —
>    `STATES.md` §2.4.
> 4. **Sending stays manual and personal.** The approved copy promises *"I send you"*; there is no
>    automated delivery, no portal, no account. (b) assists the writing, not the sending.
> 5. **The Studio admin UI is a new, fourth surface — and it should NOT be brand-designed.** The
>    design package covers three public surfaces. Sanity Studio is internal, single-user tooling;
>    styling it in the Just Math brand would be effort spent where no parent ever looks. Use Sanity's
>    default UI.
>
> This is a **development** decision, recorded here for that session. It does not change the design
> package or affect Bob's verdict.
>
> ---
>
> ## Status as of 2026-08-11: **Approved with conditions — all Andy-owned conditions CLOSED**
>
> Bob's second re-review confirms every design-author condition is closed and independently
> verified: bundle parses, manifest/CSS 125 tokens 0 diffs 0 duplicates, no stale `#9c6a17`, no old
> "danger outline" wording, Accordion source/`.d.ts`/prompt/fallback/bundle all in sync, and the
> forced-fallback browser check passing with the DS Accordion removed (13/13 wired, 12/12 closed
> panels inert, 0 bad rows).
>
> **One precision fix applied after that review.** Bob noted the literal text `outline: none` still
> appears in comments and correction notes even though no focus-suppressing declaration remains.
> `STATES.md` §0 now scopes the claim to the *declaration* — "no shipping `outline: none` focus
> suppression" — and says plainly that the string survives in prose. This is the third time an
> over-broad claim of mine has had to be narrowed to what was actually measured; the note now says
> so, because the lesson is the point: **state the measurement, not the impression of it.**
>
> **Nothing further is blocked on the design author.** Every remaining condition is an owner or
> client decision:
>
> | Owner | Condition |
> | --- | --- |
> | **Owner** | Disabled-note legibility (`STATES.md` §2.5) |
> | **Client** | **The portrait — the one true launch blocker** |
> | **Client** | Approval of the six derived brand marks |
> | **Client** | Five copy strings (`COPY-GAPS.md` §2c and §2d) |
> | **Client** | WhatsApp brand-guideline confirmation |
> | **Client / brand owner** | Font substitution — confirm IBM Plex or supply the licensed serif |
> | **Client** | Richer brand-brief evidence — locate the original written brief (`BRAND-INTAKE.md` §1) |
>
> **Still not done, deliberately, until conditions close into full approval:**
> the CS-71 fingerprint row must not be appended to
> `Setup_Instructions/Guidelines/Web-Design/DESIGN-FINGERPRINTS.md`, and the sanitized sector profile
> has not been filed to `…/Web-Design/Sector-Profiles/`. Both are project-close actions.
>
> ---
>
> ## Previous status (2026-08-11): Approved with conditions — 2 of 4 closed
>
> Bob's re-review moved the verdict to **Approved with conditions** (not launch approval) and marked
> both prior P1s resolved after independent checks. Of his four remaining conditions, the two that
> were Andy's to close are done:
>
> | Condition | Owner | Status |
> | --- | --- | --- |
> | Accordion package sync — `Accordion.d.ts` + stale `PlainAccordion` fallback | Andy | **Closed** — see below |
> | `STATES.md` wording drift: checkbox error described as "outline", implemented as box-shadow | Andy | **Closed** — both the matrix row and §2.3 now say *2px danger `box-shadow` ring, never `outline`*, with the reason |
> | Disabled-note legibility decision | **Owner** | Open — `STATES.md` §2.5 |
> | Launch client inputs (portrait, marks, copy strings, WhatsApp guidelines) | **Client** | Open — `ASSETS.md` |
>
> **Accordion sync, in full.** The stale fallback was the real risk: `PlainAccordion` in
> `LandingClose.jsx` renders whenever the design-system component is absent, so a page could ship
> looking correct while silently dropping `aria-controls`, `role="region"` and `inert` — a loss
> nobody would see. It now carries the identical contract, and the `.d.ts` and `.prompt.md` document
> that contract plus the `idPrefix` collision rule for two accordions on one page.
>
> **Verified by forcing the fallback branch**, not just the happy path: with the design-system
> Accordion present, 13/13 FAQ items fully wired and all closed panels `inert`; with it deliberately
> removed so `PlainAccordion` renders, **13/13 still fully wired**.
>
> The portrait remains the one true launch blocker.
>
> ---
>
> ## Previous status (2026-08-11): Revision required — both P1s fixed
>
> Bob's verdict was **Revision required**, with 2 P1 and 3 P2 findings. His outputs:
> `review/bob/REVIEW.md`, `review/bob/APPROVAL-CHECKLIST.md`, `BOB-REVIEWER-HANDOFF.md`.
>
> **Bob's decisions, accepted:** `tavis.live` stands · CS-03 accepted as a **recorded route
> exception, not a pass** · CS-16 override accepted · CS-71 clean, **no ledger row appended yet**.
>
> | Finding | Status |
> | --- | --- |
> | **P1** — `STATES.md` claimed no `outline: none`, but form components and the bundle still removed outlines; checkbox focus could disappear | **Fixed + verified** — 0 occurrences in sources and bundle; all 7 controls show the 2px slate outline on focus |
> | **P1** — `ProgressReport.dc.html` still used old `#9c6a17` at 4.05:1 on the ochre tint | **Fixed + verified** — now `#8f6114`, measured **4.68:1**; template is 0 failures across 30 nodes |
> | **P2** — Accordion lacked `aria-controls` / panel semantics | **Fixed + verified** — `aria-controls` → panel `id`, panel `role="region"` + `aria-labelledby`, `inert` when closed; height animation preserved |
> | **P2** — no production `<main>` / skip-link contract | **Fixed** — `STATES.md` §0.1 now specifies landmarks, skip link, heading order, section labelling, `lang` |
> | **P2** — disabled-note legibility + client launch inputs | **Open by design** — owner and client decisions, recorded in `STATES.md` §2.5 and `ASSETS.md` |
>
> **Bob could not run Playwright/Chromium locally**, so his viewport screenshot checks were deferred
> to this revision pass. Those checks have now been run here: focus indicators on all 7 controls,
> accordion semantics and animation, the report template, and the landing page at 390/768/1440.
>
> The portrait remains the one true launch blocker. It does not block re-review.
>
> ---
>
> ## Previous status (2026-08-10): design package review-ready — NOT launch-ready
>
> The package is complete enough for an honest independent review. It is **not** approved, and it is
> **not** ready to build or ship.
>
> **There are no known implementation holes.** Every gate is either passed with measured evidence,
> fixed, or recorded as an explicit decision with its owner named. Nothing is hidden behind a "to do".
>
> What remains are **decisions and client input**, assigned:
>
> | Owner | Item |
> | --- | --- |
> | **Bob** | Spot-check `tavis.live` (`MARKET-SCAN.md` §6) — it could not be re-fetched, so its row rests on a single fetch. Verify it or ask for a replacement fifth site |
> | **Bob** | Decide whether CS-03 requires a real directions stage, or whether the scan's inherit/reject table stands in (`DESIGN.md` §11) |
> | **Bob** | Challenge or accept the CS-16 kicker override (recorded, with its weakness stated) |
> | **Owner** | The disabled-note legibility tradeoff (`STATES.md` §2.5) — WCAG-exempt, but it affects the line a parent most needs to read |
> | **Client** | Five copy strings (`COPY-GAPS.md` §2c and §2d), approval of the six derived marks, WhatsApp brand-guideline confirmation |
> | **Client** | **The portrait — the one true launch blocker** |
>
> The portrait does not block Bob. It blocks launch. Those are different gates and should not be
> conflated.

## 2026-08-10 — Initial scoping session

### Current state

Three folders exist under `Personal/Math/`, created ahead of and partly in conflict with the
guideline's initialization gate (scaffolding happened in parallel terminals before this session
caught up):

- **`studio/`** — Sanity Studio, scaffolded via `npm create sanity@latest` (project `v4v0i7gl`,
  dataset `production`), pnpm install completed. Aligned with the guideline's default CMS.
- **`web/`** — stock `create-next-app` (Next.js 16.3.0) output, nothing customized (default
  `page.tsx` / `layout.tsx` / `globals.css` only). **Conflicts** with the guideline's fixed
  Astro-only rule (FE-30/FE-33: Astro is the page framework, React only for islands). Decision:
  remove and re-scaffold as Astro — **not yet done**, paused before executing.
- **`design/`** — a Claude Design System brand package (readme.md, SKILL.md, `tokens/`,
  `components/`, `guidelines/*.card.html`, `assets/`, `ui_kits/`, `templates/`). Substantial,
  coherent brand work: ink/paper/wa-green palette, IBM Plex type system, equals-sign monogram,
  detailed brand-voice rules, accessibility contrast values, component specimens. Built from "a
  written brand brief" (per its own readme) that is **richer than** the project's
  `just-math-design-brief.md` — mentions serif direction, monogram options, banned imagery, tonal
  meaning of "Just" that aren't in the file on disk. Source of that richer brief is not in this
  repo; worth locating or reconstructing if a fresh session needs it.

Also present, predating all of the above:
- `just-math-design-brief.md` — original prose brief (single-page landing, Bricks Builder/WordPress
  build target — **superseded**, see decisions below).
- `just-math-page-copy-final.md` — finished, approved page copy (hero through FAQ, WhatsApp CTA
  links). Explicitly final; must be used verbatim, not rewritten.

### Decisions made this session (record properly in `docs/DECISIONS.md` once the init gate runs)

1. **Guideline classification: `02-INFORMATIVE-BLOG.md`**, not Landing Page and not WordPress/Bricks
   Builder as the original brief specified. Reason: user confirmed the site will expand to include a
   blog, which per the guideline's own Section 1 rule ("ongoing editorial publishing" → Informative
   Blog) rules out Landing Page. The Bricks Builder / WordPress direction in the original brief is
   superseded — these Web-Development-Guidelines don't cover WordPress at all.
2. **Stack: Astro + Sanity + Vercel**, per `02-INFORMATIVE-BLOG.md` Section 6 (not negotiable per
   FE-30/FE-33 without a recorded architectural requirement — no such requirement exists here: no
   auth, no portal, no cross-route client state).
3. **`web/` gets removed and re-scaffolded as Astro.** User approved this explicitly. Not yet
   executed — session paused before doing it.
4. **Design package is not yet in the guideline's expected shape.** The `design/` folder is real,
   usable design authority material but is not the `DESIGN.md` / `STATES.md` / `COPY-GAPS.md` /
   `ASSETS.md` + root `HANDOFF.md` structure that `Web-Design-Guidelines` produces, and has not been
   through a Bob design review. User chose to pause development and go complete/continue a proper
   design session before resuming, rather than developing against the design system export as-is.

### Unresolved / blockers

- Formal design package (`DESIGN.md`, `STATES.md`, `COPY-GAPS.md`, `ASSETS.md`, root `HANDOFF.md`
  per `Web-Design-Guidelines/New-Website/ANDY-WEB-DESIGN-PROMPT.md`) does not exist yet. User is
  going to run/continue that design session separately.
- The Initialization Questionnaire (`02-INFORMATIVE-BLOG.md` Section 4) has **not been run at all** —
  none of the 25 questions (sitemap, editorial workflow, taxonomy, forms/lead capture, i18n,
  tracking, infrastructure/ownership) have been asked or answered.
- The Requirements Summary + Approval Gate (Section 5) has not happened — nothing should be
  scaffolded beyond what already exists (`studio/`) until it does.
- `web/` (Next.js boilerplate) has not yet been removed.
- No `docs/DECISIONS.md` or `docs/CONTENT-MODEL.md` exist yet in the project — to be created once
  the questionnaire runs.

### Next steps, in priority order

1. User completes/finalizes the proper design package (design session under
   `Web-Design-Guidelines/New-Website/ANDY-WEB-DESIGN-PROMPT.md`, or reconciles the existing
   `design/` Claude Design System export into that shape) — ideally with a Bob design review before
   development resumes.
2. Remove `web/` (stock Next.js boilerplate, safe to delete — nothing customized) and scaffold a
   fresh Astro app per `02-INFORMATIVE-BLOG.md` Section 24's suggested structure (`apps/web` +
   `apps/studio` monorepo, or single-package with a `/studio` route — decide at init).
3. Run the Initialization Questionnaire (`02-INFORMATIVE-BLOG.md` Section 4) conversationally,
   grouped by topic, using `just-math-page-copy-final.md` and whatever the finished design package
   defines to pre-fill obvious answers (e.g. WhatsApp CTA, no comments section, no testimonials).
4. Produce and get approval on the Requirements Summary (Section 5) — content model, cost estimate,
   account/ownership list — before any further scaffolding.
5. Implement per the guideline's testing order (Section 19): design mapping → implementation plan →
   vertical slices → TDD for business logic → typecheck/lint/tests/build → Playwright → design/
   accessibility review → preview deploy → **Bob code review** (separate session, mandatory,
   `BOB-WEB-DEV-REVIEWER-PROMPT.md`) → production.

### Verification status

Nothing built or deployed yet beyond `pnpm install` inside `studio/`. No CI, no tests, no preview
URL.

---

## 2026-08-10 — Design craft-gate pass (design-only session)

Design only. No app code was written, no framework installed, `web/` was not touched.

### Route correction

This project was worked under the **Revamp** prompt, but there is no existing live site — no
predecessor to audit, no equity to carry, no redirect map to preserve. The correct route is
**`New-Website/ANDY-WEB-DESIGN-PROMPT.md`**; Stage 0R (site audit, market scan as Exhibit A,
depth decision) does not apply and was not run. What follows is a craft-gate and accessibility
pass on the existing `design/` package, not a revamp audit.

### What was audited

The three UI kits in the Claude Design project `Just Math Design System`, measured in a real
browser at 390px and 1440px — computed styles and contrast ratios, not visual judgement.
Contrast was computed against the *effective* background (alpha-composited up the ancestor
chain), so translucent text over the ink panels is scored as it actually renders.

### Findings and resolution — all five fixed and re-verified

| # | Finding | Resolution |
| --- | --- | --- |
| 1 | **29 WCAG 2.2 AA text-contrast failures.** `--ink-400` @12px = 3.72:1 on paper, 3.41:1 on paper-2; gap-chart year labels at `rgba(paper,.4)` = 3.72:1; `--ochre-600` = 4.48:1 on paper and 4.05:1 on its own tint | Added **`--ink-450 #666d77`** as the text floor (5.01:1 / 4.59:1) and repointed `--text-faint` at it; raised the chart's dim alpha to **.55** (5.92:1); darkened **`--ochre-600` to `#8f6114`** (AA on paper, paper-2 and ochre-100) |
| 2 | **Coloured left-edge accent bar** on the IGCSE price row — the system's own readme bans it outright | Replaced with a 1px ochre rule above and below the full row, keeping the tint and the semibold `90 min` |
| 3 | **Header phone link was a 101×14px target** — the only non-WhatsApp conversion path, against a stated 44px minimum | Now a 44px-high inline-flex target, kept optically flush right with a negative inline margin |
| 4 | **Off-scale type** — 9/10/11px chart labels below the 12px scale floor | Axis labels moved to `--size-2xs`; added **`--size-3xs:11px`**, scoped in writing to data-viz annotation only |
| 5 | **37 blocks defaulted to `opacity:0`**, including a CTA — invisible to any path that does not scroll | Added `window.revealAll()` and a `beforeprint` flush; recorded the production rule that a reveal may only enhance already-visible content |
| 6 | **Hero clipped at 390px.** The corrected, longer CTA label met `white-space: nowrap` in `WhatsAppButton`, so the button's intrinsic width (387px) pushed the page container 17px past a 390px viewport — the lead paragraph, the CTA and `11 YEARS` were all cut off | The label now wraps (`white-space: normal`, `text-wrap: balance`, `min-width: 0`) and the glyph is `flex-shrink: 0` so it can never be squeezed. CTA measures 350px at 390 and 470px at 1440 |

**On finding 6 — the automated check missed this and a screenshot caught it.** `documentElement.scrollWidth`
equalled `clientWidth`, so the standard overflow test passed: something up the tree clips
horizontally, so the overflow never became scrollable, it just silently cut the content off.
Overflow must be tested by comparing **each element's right edge** against the viewport, not by
`scrollWidth`. The final audit uses the edge test.

**The compiled bundle is a real source of truth here.** The kits render from `_ds_bundle.js`, not
from `components/**/*.jsx`, so editing a component source alone changes nothing on screen. **If the
Claude Design app regenerates the bundle from source, re-check that these fixes survived** — the
source files are correct, so a clean regeneration should reproduce them.

### Correction — the first "all six fixed" claim was not verifiable, and review caught it

The initial pass fixed the **sources** and verified the result by auditing the rendered landing page.
That verification was **not sufficient**, and the claim should not have been stated as settled:

`ui_kits/website/index.html` loads `_ds_bundle.js` first and then the three `.jsx` files as
`text/babel`. The later `.jsx` definitions win at runtime, so the landing page audited clean while
the compiled bundle still contained the stale code. Design review found the package internally
inconsistent, correctly: `_ds_bundle.js` still had `rgba(251,250,247,.4)` chart labels, 11px axis
type, the banned IGCSE `borderLeft`, and no `revealAll`; `_ds_manifest.json` still published
`--text-faint → var(--ink-400)`, `--ochre-600 → #9c6a17`, and no `--ink-450`. Every one of those was
confirmed before being fixed.

**What was done in response.** `_ds_bundle.js` was patched to match the sources (each edit asserted
on an exact expected occurrence count, so a mismatch fails loudly rather than silently corrupting a
198KB artifact). `_ds_manifest.json` had its token list **rebuilt from the CSS sources** rather than
hand-edited, reproducing the generator's own last-declaration-wins convention; the net diff is
exactly four entries — `--ink-450` and `--size-3xs` added, `--ochre-600` and `--text-faint` updated —
with no duplicates and no other drift. Card subtitles were resynced from the `@dsCard` markers.
Backups of both artifacts are outside the project tree.

**How it is verified now.** A 20-point package-consistency check (bundle greps + a token-by-token
diff of all 125 manifest entries against the CSS) passes, and the audit was re-run against a
**bundle-driven surface** — `components/core/core.card.html`, which has no `.jsx` override — where
`--text-faint`, `--ink-450` and `--ochre-600` resolve to the new values and the WhatsApp label wraps.

**Standing lesson:** in this package, verifying a fix on the landing page alone proves nothing about
the compiled artifacts. Any future change must be checked on a surface that has no `.jsx` override,
or by diffing the artifacts directly.

### Noted, deliberately not changed

`_ds_manifest.json` records `--dur-1…4` as `0ms`. That is not a typo introduced here: `tokens/motion.css`
declares each duration twice — the real value, then `0ms` inside `@media (prefers-reduced-motion:reduce)` —
and the manifest generator takes the last declaration. So the published token table documents the
reduced-motion value (`0ms`) rather than the design's actual `120/180/240/360ms`. The rebuild
reproduced the generator's behaviour rather than silently diverging from it. **Worth a decision:**
either the generator should ignore declarations inside media queries, or the reduced-motion overrides
should live in a separate file. Flagging, not fixing.

### Verified after the fixes

Re-measured live in-browser against the updated project, at **390 / 768 / 1440**:

- **0 contrast failures** — 234 text nodes at each width, plus 42 in the reports kit and 25 in
  the booking kit.
- **0** coloured side-stripes, **0** sub-24px tap targets, **0** elements stuck at `opacity:0`,
  **0** elements clipped past the right edge, at all three widths.
- Content container measures **1120px**, inside the 1200px cap.
- Console clean (the only warning is the in-browser Babel notice, expected for this prototype).

### Carried into the build — dev constraints, not design choices

1. **Reveal-on-scroll must enhance an already-visible default.** Astro ships static HTML; the
   hidden state must be added by script after boot, never authored into the markup, or the page
   renders blank until JS lands — and stays blank if it never does.
2. **The ramps are split at the AA line, and the split is enforced.** `ink-400` and lighter, and
   `ochre-500`, are non-text values. Using them as text reintroduces finding #1.
3. **Nothing may be signalled by colour or dimness alone** — the chart's measured years and the
   IGCSE row each carry their meaning structurally and in text as well.

### Still open

- No Bob review has been run against the completed package yet.
- Fonts remain a flagged substitution — IBM Plex standing in for an unsupplied licensed serif.

---

## 2026-08-10 — Design package written (`DESIGN.md`, `STATES.md`, `COPY-GAPS.md`, `ASSETS.md`)

Written after the artifact drift was cleared, so the docs describe verified values rather than
intended ones. All four are in `design/` and synced to the Claude Design project.

Everything in them is measured from the package — component sources for states, a normalised
string-by-string diff against the approved copy, in-browser measurement for the layout gates.
Nothing is aspirational.

### Two craft gates fail and need a decision — they are NOT resolved

Recorded in `DESIGN.md` §11. Andy does not mark his own findings resolved.

1. **CS-16 · kicker density — FAIL.** Kickers appear on **8 of 10 sections** (cap is one third),
   seven of them numbered `01`–`07`. The gate's exception needs an *approved direction* documenting
   them as a deliberate system, and no directions stage was ever run, so it cannot honestly be
   claimed. Recommendation: record an explicit override and keep them, because the numbering is the
   same device as the ruled spine and the chart axis rather than decoration — but it must be recorded.
2. **CS-50 · motion purpose map — FAIL.** One uniform 14px fade-up drives nearly every block, which
   the gate names explicitly as a failure when it is the single default. Recommendation: differentiate
   the ink compression bands from the paper prose sections so the reveal reinforces the section
   rhythm instead of flattening it.

Both are visual-polish decisions, independent of the six accessibility/craft fixes.

### Four gates cannot be evaluated

CS-01 to CS-04 depend on `BRAND-INTAKE.md`, `MARKET-SCAN.md` and `SECTOR-PROFILE.md`, none of which
exist — a consequence of the greenfield/Revamp routing error. They are recorded as **not evaluated**,
never as passed. Closing them means running the sector and market-scan stages of the New-Website route.

### What the package now says

- **`DESIGN.md`** — the 11-section spec, incl. the enforced text/non-text split in each colour ramp,
  the section inventory with layout families, a six-item specificity inventory, the CS-71 fingerprint
  (the ledger exists but is **empty**, so no collision; the row is appended only after approval), and
  the gate table above.
- **`STATES.md`** — the component/state matrix. Focus is systemic (`:focus-visible` in `base.css`, no
  `outline:none` anywhere). It names **four real gaps** that must be closed before build: Button has
  no loading state; Input/Select/RadioGroup have no disabled state; there is no success state and no
  error on checkbox/radio; and `ProgressMeter`/`ScoreTable` have no empty state, which the first
  report of a new student will hit immediately.
- **`COPY-GAPS.md`** — 213 unique strings: **174 verbatim, 38 derived, 0 replaced, 0 cliché hits.**
  Three derived strings need client confirmation before shipping: the per-level age bands, the IGCSE
  subject sentence, and `13 things parents ask` (which must be computed from the FAQ array, not typed,
  or it silently goes stale). The CTA override is recorded with approver and date.
- **`ASSETS.md`** — **the portrait is the one launch-blocking asset** and does not exist. Also: all
  six brand marks are derived and need brand-owner approval; fonts and Lucide should be self-hosted
  and vendored for production; no Open Graph image exists yet; and WhatsApp trademark use needs a
  guidelines check.

---

## 2026-08-10 — Gate decisions applied, sector/market stages run

Actioned on the reviewer's instruction: record the CS-16 override, fix CS-50, run the missing
New-Website market/sector docs, keep the assets as launch blockers.

### CS-16 — override recorded (not fixed)

Kept the numbered kickers. Recorded in `DESIGN.md` §11 as an explicit owner override: approver
Charlie, 2026-08-10, on the ground that the numbering is the same device as the ruled spine and the
chart axis rather than eyebrow scaffolding. The known weakness is stated in the same block — the
sections are a narrative argument, not the ordered *sequence* CS-16 has in mind — so Bob can still
challenge it on the merits rather than having to discover it.

### CS-50 — fixed, not overridden

Motion is now assigned by what a section does, via `REVEAL_VARIANTS`:

| Variant | Motion | Applied to | Purpose |
| --- | --- | --- | --- |
| `rise` | 14px rise + fade, 640ms | Prose, headings, lists | Hierarchy — reading order |
| `settle` | Fade only, no travel, 780ms | The three full-bleed ink bands | Rhythm — compression moments arrive rather than march in |
| `still` | None; always visible | The gap-chart wrapper | Deference — the growing bars are the motion |

Verified in-browser: 640ms on 41 prose blocks, 780ms on 6 ink-band elements, 240ms on accordion and
hover; the gap-chart wrapper renders at `opacity: 1` before any reveal fires; 0 elements stuck
invisible after a flush; 0 clipped. Source and compiled bundle patched in step, each edit asserted.

### Sector and market stages — run with real, verified evidence

`BRAND-INTAKE.md`, `MARKET-SCAN.md` and `SECTOR-PROFILE.md` now exist. **CS-02 fabrication is a P0
deception finding, so no competitor was invented:** five real sites were fetched live on 2026-08-10
and every quoted phrase came off the page — `spmmath.my`, `tavis.live`, `hometuitionmalaysia.com`,
`golearn.com.my`, `algonova.com`. The two suggested spot-checks are spmmath.my and tavis.live.

**The finding that matters:** `spmmath.my` is structurally the same business — one teacher, 26 years,
all online, SPM maths — and it competes on fear and scarcity ("1 in 4 students do not pass",
"limited to just 50 students", "secure your spot"). Just Math cannot win as a calmer version of that
pitch; the opposite argument has to be the visible one. That is now the documented differentiation
basis, and it is what §5 of the scan traces the design's inherits/rejects against.

The sector slop trap and its banned phrase list are appended to CS-60 for this project.

### Gate table now

CS-01, CS-02 and CS-04 **pass** on the new artifacts. CS-03 is recorded as **not applicable** rather
than passed: no directions stage was ever run. The market scan's inherit/reject table supplies the
*substance* CS-03 asks for, but it is a retrofit and Bob should treat it as one. **If approval
requires a real directions stage, that is scoped work, not a documentation fix.**

### The four `STATES.md` gaps — closed 2026-08-10

All four are implemented in source **and** `_ds_bundle.js`, with `STATES.md` updated. No `!` cells
remain in the matrix.

**Method note worth keeping:** rather than hand-patching eight compiled functions, the changed
sources were **recompiled with `esbuild`** (already present in `studio/node_modules`) and the
resulting functions spliced into the bundle by top-level declaration boundary. The bundle then
passed `node --check`, and a re-run of the earlier consistency suite confirmed nothing regressed —
the gap-chart `.55` labels, the removed IGCSE side-stripe, `revealAll`, the four `settle` + one
`still` motion variants, and the wrapping WhatsApp label all survived. This is the reliable way to
change components in this package; do not hand-write compiled output.

Two decisions inside the work are worth review:

1. **Success is SLATE, not green.** A green "looks good" message would break the system-wide promise
   that green means *this opens WhatsApp*. Success is `--slate-600` + a `✓`, so it is never carried
   by colour alone.
2. **Button loading shows no spinner and does not change its label.** A rotating element would be
   the only spin in a brand whose motion is fades and short distances; the label staying put also
   means the control cannot change width. The state is announced via a visually-hidden
   `role="status"`.

**One known condition, recorded not fixed:** disabled option text measures 2.71:1, and a disabled
option's explanatory note 1.88:1, because the brand's disabled rule is a flat 42% opacity. **WCAG
2.2 exempts inactive components from contrast, so this is not a failure** — but when the note is the
*reason* a slot is unavailable ("Full this term"), that is the line a parent most needs to read.
`STATES.md` §2.5 carries the recommendation; it is an owner decision, not a bug fix.

Three new derived strings were introduced and logged in `COPY-GAPS.md` §2d — the two report empty
states need client wording, since they appear in a document sent to parents.

### Launch blockers, unchanged

- **The portrait does not exist** — the single blocking asset.
- Brand-owner approval of the six derived marks (or confirm the type-only header stands).
- The three copy strings in `COPY-GAPS.md` §2c, incl. binding `13` to the FAQ array length.
- Self-hosted fonts, vendored Lucide glyphs, an Open Graph image, WhatsApp brand-guideline check.

### Next steps

**The package is ready for Bob.** No known component holes remain; what is left is real decisions
and client input, which is what a review should be spent on.

1. **Hand to Bob.** Ask him to spot-check `tavis.live` in `MARKET-SCAN.md` §6 — it could not be
   re-fetched, so its row rests on a single fetch. Everything else in the scan is independently
   confirmed.
2. Owner decisions waiting: the CS-16 kicker override (recorded, challengeable), the disabled-note
   legibility question (`STATES.md` §2.5), and whether a real directions stage is required (CS-03).
3. Client input: the three copy strings in `COPY-GAPS.md` §2c, the two report empty-state strings in
   §2d, WhatsApp brand-guideline confirmation, and approval of the six derived marks.
4. **Get the portrait** — still the one launch-blocking asset.
5. Only then resume development, which still needs the Astro scaffold and the Initialization
   Questionnaire from the first session's list.

## 2026-08-14 — Bob P2 closed: header/breadcrumb hit areas are now 44×44, not 44 tall

*(Several design sessions ran between 2026-08-10 and this entry without a `HANDOFF.md` update: the
operator-mark logo replaced the equals mark across the header/favicon/docs/bundle, and the blog
archive + single-post templates were built. That work, and an earlier round of Bob P2 closures — the
header CTA control size, blog category-filter and breadcrumb *height*, and the category-count type
scale — is recorded in `STATES.md`, `COPY-GAPS.md` and `ASSETS.md` rather than backfilled here.)*

Bob's re-check of that earlier round found one narrow P2 left: the global tap-target rule (`STATES.md`
§0) says "≥44px" without specifying which dimension, and two inline text links had been fixed on
height only —header **"Blog"** at 36.6×44, post breadcrumb **"Notes"** at 36×44.

**Resolved in favour of the stricter reading — 44×44, not 44 tall** — rather than carving a "44px
tall is enough for inline text links" exception. The rule already exists to exceed the WCAG 2.5.8
floor (which has its own inline-text exemption at 24px); a second, quieter exemption for short links
would undo the reason the stricter rule exists.

**Fix:** `minWidth: 44` + centred text, offset by a matching negative margin (inline for the row-flex
header, block for the breadcrumb — same technique as the earlier height fix) so the larger hit area
folds into surrounding whitespace instead of visibly shifting neighbouring elements. Full detail and
before/after measurements in `STATES.md` §2.6.

**Verified in-browser at 390 and 1200px:** both links now measure 44×44; `scrollWidth ===
clientWidth` on the landing and post pages (no overflow introduced); a screenshot confirms the
breadcrumb still reads as one tight line. Patched in source and spliced into `_ds_bundle.js`
(`PageHeader` only — `BlogPages.jsx` was never in the bundle; confirmed by grep rather than assumed).

**Status: both Bob P2s from this round are closed. Sending back for re-review.** Owner/client
decisions carried forward unchanged (portrait, "Schedule Now" wording, WhatsApp glyph asset, mark
sign-off, blog copy placeholder status).

## 2026-08-14 — Design package approved with conditions for development handoff

Bob's re-check closed the residual P2 and returned: **"the design package is now approved with
conditions for development handoff. This is still not launch approval."** No component or a11y gaps
remain open — every remaining item is an owner or client decision, not a design defect.

Verified this round: header/breadcrumb links 44×44 on landing, archive and post at 390 and 1200;
0 under-44 focusable targets; 0 horizontal overflow; 0 non-KaTeX clipped elements; post still renders
13 formulas with no formula-container overflow; `node --check` on `_ds_bundle.js` passes;
manifest/CSS 125/125 tokens with 0 diffs and 0 duplicates; manifest/card drift 0 across 32 cards.
Bob's own artifacts (`review/bob/REVIEW.md`, `review/bob/APPROVAL-CHECKLIST.md`,
`BOB-REVIEWER-HANDOFF.md`) carry the authoritative sign-off record.

### The full remaining punch list — one consolidated view

Every item below is **owner or client input, not a build task.** Development can start; these gate
**launch**, not the Astro scaffold.

**Charlie (project owner) decisions:**

1. **"Schedule Now" wording** — stands, or one of the voice-compliant alternatives
   (`COPY-GAPS.md` §2g).
2. **WhatsApp glyph** — ship the official asset or drop the glyph from the header CTA
   (`COPY-GAPS.md` §2g, `ASSETS.md` §4). Tied to #1: if the label stops naming the destination, the
   glyph becomes the only signal and can't be dropped.
3. **Disabled-note legibility** — render a disabled option's reason (`"Full this term"`) outside the
   dimmed wrapper so it stays readable, or leave the current uniform-dim behaviour
   (`STATES.md` §2.5). Not a WCAG failure either way; a brand-feel call.
4. **Trust-bar accessible name** — the screen-reader-only label "Teaching experience" is a new
   derived string with no visible counterpart; confirm or supply different wording
   (`COPY-GAPS.md` §2f).
5. **Brand-owner sign-off on the adopted operator mark** — it's a redraw of the live site's own mark,
   not an invention, but the redraw itself is derived and unapproved (`ASSETS.md` §1b/§219,
   `BRAND-INTAKE.md` §86).
6. **Richer brand evidence** — the written brand brief (name hierarchy, "Just" tonal meaning, serif
   direction, banned imagery, monogram options) that `readme.md` was authored from is referenced but
   not in the repo, and is richer than what's on disk. Locate it or reconstruct it — until then its
   decisions are unverifiable (`BRAND-INTAKE.md` §11).

**Client (Mr Kong) input:**

7. **The portrait** — still the single launch-blocking asset, or a typographic About-section fallback
   if it won't be supplied in time.
8. **Report empty-state strings** — "Not assessed yet" and "No marks recorded yet — this month sets
   the baseline" appear in a document sent to parents, so need Mr Kong's voice, not a system default
   (`COPY-GAPS.md` §2d).
9. **FAQ count binding** — "13 things parents ask before booking" is correct today but must be bound
   to the FAQ array length at build time, never hard-coded (`COPY-GAPS.md` §2c). A build rule, not a
   wording question — no client decision needed, just don't let it slip into a literal `13`.
10. **All blog copy and maths, reviewed by Mr Kong before any post ships** — the surds article, titles,
    excerpts, category post counts are all placeholder; an error in a worked example on a tutor's own
    site is worse than no post at all (`COPY-GAPS.md` §2h).

### Next steps

Development can now start on the Astro scaffold. Items 1–10 above don't block that work — they block
**launch**. Track them to closure before the site goes live, not before scaffolding begins.
