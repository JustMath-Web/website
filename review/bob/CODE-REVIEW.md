# Bob Code Review - Just Math Malaysia Development Scaffold Re-Review

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
