# Bob Approval Checklist

## 2026-10-08 — Dependabot review batch closeout

- [x] All 15 reviewed Dependabot PRs are merged to `main`; GitHub shows no open Dependabot PRs. The last merge is #124 at `ca81db4`.
- [x] This review-file change is limited to Bob's four owned outputs; `git diff --check` passes.
- [ ] Andy opens one PR for these four review files; Charlie reviews and merges it manually.
- [ ] Hosted Studio is redeployed from current `main` with the #122/#123 lockfile updates, then the `/blog` and `/blog/` editor validation is checked. This is separate from the review-file PR.

---

## PR #124 web Sharp update — 2026-10-07

Exact open head `5378405f775049c87d83e1a9cea1fb662b899d8b`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Diff limited to `web/pnpm-lock.yaml`: optional Sharp 0.35.4 → 0.35.5, platform packages and integrity, and bundled libvips 1.3.3 → 1.3.4; no manifest or source changes.
- [x] Upstream Sharp and libvips bundle release notes checked. Site portrait/blog images use Sanity CDN URLs; no direct Sharp or `astro:assets` use found.
- [x] Exact-head `web`, `studio`, and Workers Builds checks pass. Web CI includes frozen install, audit, format, Astro check, build, guards, and Playwright.
- [x] Cloudflare commit preview home page (200) includes a portrait image; its Sanity CDN JPEG returns 200 at 600×750. This verifies real image delivery, not a Sharp transform.
- [x] GitHub confirms Charlie merged approved #124 as `ca81db4a936cd0ea7649b8c2df5736e6564c73a3`; Bob did not merge it.

Bob did not install or run a local 0.35.5 build. This is the last PR in the four-PR Dependabot batch. The separate Studio redeploy for #122/#123 remains open.

---

## PR #121 web smol-toml update — 2026-10-07

Exact open head `de6f3c40992ef987004c45f7a7bdcae83b5b23e1`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Diff limited to `web/pnpm-lock.yaml`: `smol-toml` 1.8.0 → 1.9.0, integrity, and Astro/internal-helper references; no manifest or source changes.
- [x] Upstream release and reviewed advisory checked: parser changes include null-prototype results; 1.9.0 fixes quadratic-time parsing.
- [x] Exact-head `web`, `studio`, and Workers Builds checks pass. Web CI includes frozen install, audit, format, Astro check, build, guards, and Playwright.
- [x] GitHub confirms Charlie merged approved #121 as `1fd3d01d1a9eb74991a2b152e9777e094f269558`; Bob did not merge it.

Bob did not install or run a local 1.9.0 build; exact-head CI supplies build and browser-test evidence.

---

## PR #123 Studio smol-toml update — 2026-10-07

Exact open head `a2ec8bd72d455469570951fe593a75e1d611ce8f`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Diff limited to `studio/pnpm-lock.yaml`: `smol-toml` 1.8.0 → 1.9.0, integrity, and `@sanity/cli`/`@vercel/frameworks` references; no manifest or source changes.
- [x] Upstream release and reviewed advisory checked: parser changes include null-prototype results; 1.9.0 fixes quadratic-time parsing.
- [x] Exact-head `studio`, `web`, and Workers Builds checks pass. Studio CI includes frozen install, audit, format, typecheck, lint, three validation guards, and `sanity build`.
- [x] GitHub confirms Charlie merged approved #123 as `774c345820548bdfb7eb8bc5d601d26ebd778029`; Bob did not merge it.

CI does not run `sanity deploy` or arbitrary TOML input tests. Bob did not install or run a local 1.9.0 build.

---

## PR #122 Studio source-map-js update — 2026-10-07

Exact open head `37d9026393ec3febb870f835d5175b62a6523ae9`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Diff limited to `studio/pnpm-lock.yaml`: `source-map-js` 1.2.1 → 1.2.2, integrity, and `css-tree`/`postcss` references; no manifest or source changes.
- [x] Upstream release and reviewed advisory checked: 1.2.2 fixes an indexed source-map denial of service and a browser CSP crash.
- [x] Exact-head `studio`, `web`, and Workers Builds checks pass. Studio CI includes frozen install, audit, format, typecheck, lint, table/FAQ/redirect guards, and build.
- [x] GitHub confirms Charlie merged approved #122 as `f4cedf06b2a97a62f3190293104c7faa166bc612`; Bob did not merge it.

Bob did not install or run a local 1.2.2 build; exact-head CI supplies build and test evidence.

---

## PR #116 indirect devalue update — 2026-10-07

Exact open head `28a5a515308b794228f6c58e92830f4705c8ef5e`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Diff limited to `web/pnpm-lock.yaml`: `devalue` 5.9.2 → 5.9.4, integrity, and Astro dependency/snapshot references; no manifest or source changes.
- [x] Upstream 5.9.3 and 5.9.4 release notes checked; project source has no direct `devalue` import.
- [x] Exact-head `web`, `studio`, and Workers Builds checks pass. Web CI runs frozen install, audit, format, check, build, guards, and Playwright.
- [x] Git history confirms Charlie merged approved #116 as `9201dc2`; Bob did not merge it.

This is the final queued Dependabot PR in the batch. Bob did not run a local 5.9.4 build; exact-head CI provides build and test evidence.

---

## PR #108 Portable Text renderer update — 2026-10-07

Exact open head `1598a61dd52a2c8892674b1e29e722106bedfb48`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Diff limited to `web/package.json` and `web/pnpm-lock.yaml`: `astro-portabletext` 1.0.0 → 1.0.1 and matching lockfile references.
- [x] Upstream 1.0.1 release notes checked: prevents mutation of inbound Portable Text data.
- [x] Exact-head `web`, `studio`, and Workers Builds checks pass. Web CI frozen install, build, and Playwright cover custom blocks, maths, tables, and FAQ behavior on the built fixture post.
- [x] Cloudflare commit preview renders three published posts (200); the Learning Matrix post shows tables and FAQ details matching its Sanity document. Published maths remains verified through the fixture suite only.
- [x] GitHub confirms Charlie merged approved #108 as `4232bea916a70e5e03ce95aaea416a36813c7bba`; Bob did not merge it.

Bob did not install or run a local 1.0.1 build; local renderer remains 1.0.0.

---

## PR #106 web Prettier update — 2026-10-07

Exact open head `6bc2ee3c1808a37688ffa7643f4e621a62c28ae6`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Diff limited to `web/package.json` and `web/pnpm-lock.yaml`: Prettier 3.9.6 → 3.9.9 plus propagated peer references; no application source or runtime dependency changes.
- [x] Upstream 3.9.7, 3.9.8, and 3.9.9 release notes checked.
- [x] Exact-head `web`, `studio`, and Workers Builds checks pass. Web CI uses frozen install and passes `format:check`, Astro check, build, guards, and Playwright.
- [x] GitHub confirms Charlie merged approved #106 as `04c015fd25e8dfcd5603ada9f232fdbb90955d70`; Bob did not merge it.

Bob did not run local 3.9.9 checks because local web Prettier is still 3.9.6. Exact-head CI supplies formatter and build evidence.

---

## PR #104 web Sanity client update — 2026-10-06

Exact open head `bdfe1100cbb8cca58e1a0dc34137fd34261184f8`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Corrected handoff version: actual diff pins `@sanity/client` 8.6.2 → **8.9.0**, with two expected event-stream transitive updates; only web manifest and lockfile change.
- [x] Upstream 8.7.0, 8.8.0, and 8.9.0 release notes checked; project client settings and GROQ queries unchanged.
- [x] Exact-head `web`, `studio`, and Workers Builds checks pass; web CI uses a frozen install and passes check, build, guards, and Playwright.
- [x] Read-only live-data evidence: commit preview `/blog/` returns 200 with five posts matching a published Sanity query; a preview post page returns 200; installed `@sanity/client` 8.9.0 fetches a published post using the web client's settings.
- [x] GitHub confirms Charlie merged approved #104 as `34177407332f91ee4e24dca2d199feb6506c8bbd`; Bob did not merge it.

GitHub CI's blog test uses fixtures; the Cloudflare preview and direct Sanity query supply separate real-content evidence. Bob did not inspect the full Cloudflare build log or run a local web 8.9.0 build.

---

## PR #103 KaTeX update — 2026-10-06

Exact open head `5d4d36a2f7fb50c8c372bd4012dc78023a29300c`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Diff limited to `web/package.json` and `web/pnpm-lock.yaml`: KaTeX 0.18.7 → 0.18.9, with matching lockfile entries and no unrelated packages.
- [x] Upstream 0.18.8 and 0.18.9 release notes checked; math renderer source and security settings are unchanged.
- [x] Exact-head `web`, `studio`, and Workers Builds checks pass. Web CI runs a frozen install, production build, and fixture blog Playwright tests covering inline/block math, MathML without JavaScript, tables, FAQ answers, CSS, and fonts.
- [x] GitHub confirms Charlie merged approved #103 as `e46b8a91a01dcb80a2c80322a53a911b46adce1f`; Bob did not merge it.

Bob did not inspect live posts or run a local 0.18.9 build; local KaTeX remains 0.18.7. Exact-head CI provides the rendering and build evidence for this scope.

---

## PR #101 Astro update — 2026-10-06

Exact open head `eab094096c4ff38d0a50b372064068eb711bc843`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Diff limited to `web/package.json` and `web/pnpm-lock.yaml`: Astro 7.3.3 → 7.3.5 plus transitive lockfile updates.
- [x] Upstream 7.3.4 and 7.3.5 release notes inspected; project has no usage of the new experimental container API or incremental builds.
- [x] Exact-head GitHub `web`, `studio`, and Workers Builds checks pass. Web CI ran frozen install, check, build, guard tests, and Playwright.
- [x] GitHub confirms Charlie merged the approved #101 head as `5ca06cd6001b8db35a96dbe2e514237367b6cf4f`; Bob did not merge it.

Bob did not run a local 7.3.5 build because the local installation remains 7.3.3; exact-head CI provides the build evidence.

---

## Hosted Studio deploy preflight — 2026-10-06

- [x] PR #105 merged as `3893647`; the five Studio dependency PRs in this batch are merged.
- [x] Andy reports `sanity deploy --dry-run` built and listed the files without uploading; Bob did not run it.
- [x] `HANDOFF.md` reports `pnpm install --frozen-lockfile` resolved the stale local dependencies before deployment. Bob did not run the install or independently confirm the installed versions afterward.
- [x] `HANDOFF.md` reports Charlie deployed merged `main` at `3893647` (`Deployed 1/1 schemas`) and ran the hosted editor check. This is attributed owner evidence; Bob did not witness the editor or deploy.

The dry-run build used stale local dependencies, so it does not establish that the deployed bundle would contain the merged lockfile versions.

---

## PR #105 Studio tsx update — 2026-10-06

Exact open head `32303c2b26ca91fccc1cfb34cc17a603243a032b`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Dependabot rebased the branch against merged #107 at `4027abb`; GitHub reports CLEAN/mergeable.
- [x] Diff limited to Studio manifest and lockfile: pinned dev dependency `tsx` 4.23.13 → 4.23.15 and propagated lockfile references.
- [x] Exact-head web, studio, and Workers Builds checks pass, including Studio validation guards and build.
- [x] Git history confirms Charlie merged approved #105 as `3893647`; Bob did not merge it.
- [x] `HANDOFF.md` reports Charlie deployed the hosted Studio from `3893647` and checked the editor flow; Bob did not witness it. A later redeploy for #122/#123 remains open.

The Studio deploy is a separate controlled action, not authorized by this merge verdict.

---

## PR #107 Studio Prettier update — 2026-10-06

Exact open head `0322d5649f1b872c052a1e4a1aa2921202e8eeb0`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Branch updated against merged #112 at `90ab6c4`; GitHub reports CLEAN/mergeable.
- [x] Diff limited to `studio/package.json` and `studio/pnpm-lock.yaml`: pinned dev dependency `prettier` 3.9.8 → 3.9.9.
- [x] Exact-head web, studio, and Workers Builds checks pass, including Studio `format:check`.
- [x] Git history confirms Charlie merged approved #107 as `4027abb`; Bob did not merge it.
- [x] `HANDOFF.md` reports the hosted Studio deploy from `3893647` and Charlie's editor check; Bob did not witness them. A later redeploy for #122/#123 remains open.

The deployment step is separate from this formatter-only merge verdict.

---

## PR #112 Studio DOMPurify update — 2026-10-06

Exact open head `c94a1fcc4c66443b1fc7631281c1a2f84b6a3f3e`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Branch updated against merged #113 at `3002ee6`; GitHub reports CLEAN/mergeable.
- [x] Diff is only `studio/pnpm-lock.yaml`: indirect `dompurify` 3.4.14 → 3.4.16.
- [x] Cure53's release notes for 3.4.15/3.4.16 checked; the later versions include sanitization hardening and fixes.
- [x] Exact-head web, studio, and Workers Builds checks pass.
- [x] Git history confirms Charlie merged approved #112 as `90ab6c4`; Bob did not merge it.
- [x] `HANDOFF.md` reports the hosted Studio deploy from `3893647` and Charlie's editor check; Bob did not witness them. A later redeploy for #122/#123 remains open.

The deployment step is not part of this lockfile-only merge verdict.

---

## PR #113 Studio lockfile patch — 2026-10-05

Exact open head `bb733eb76a96a70b9a8126a607d000ed4a80fb16`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Branch already updated against merged #117; GitHub reports CLEAN/mergeable.
- [x] Diff is only `studio/pnpm-lock.yaml`: `brace-expansion` 5.0.9 → 5.0.12 under `minimatch`.
- [x] GitHub advisory confirms 5.0.9 affected and 5.0.10 patched for `GHSA-6j4f-fj2g-mc7p`.
- [x] Exact-head web, studio, and Workers Builds checks pass.
- [x] Git history confirms Charlie merged approved #113 as `3002ee6`; Bob did not merge it.
- [x] The hosted Studio was checked and later redeployed from `3893647`, as recorded in the 2026-10-06 deployment preflight above. It now needs a further redeploy for #122/#123.

The deployment check is separate from this lockfile-only merge verdict. The remaining Dependabot PRs need updated-head reviews after each merge.

---

## PR #117 Sanity update — 2026-10-05

Exact open head `e0077e2545affa23416daede4e1f5086d47dded4`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Diff limited to Studio package manifest and lockfile; direct versions pinned at Sanity/Vision 6.17.0 and client 8.9.0.
- [x] Exact-head web, studio, and Workers Builds checks pass; PR is CLEAN and mergeable.
- [x] Studio CI covers frozen install, audit, format, typecheck, lint, three validation guards, and build.
- [x] Charlie's local Studio smoke result is recorded in `HANDOFF.md` as reported, not witnessed: invalid `/blog` blocked Publish, valid `/blog/` cleared the error, and the temporary draft was deleted without publishing. Andy's later search found no `/smoke-test` redirect.
- [x] Git history confirms Charlie merged approved #117 as `916d82d`; Bob did not merge it.

Approval is scoped to this head and does not claim that Bob operated Studio or deployed the update.

---

## PR #119 post-merge status — 2026-10-03

- [x] GitHub confirms PR #119 merged as `6bc0f8a` from exact head `bbb1511`, which Bob approved before merge; local `main` matches `origin/main`.
- [x] Andy reports `pnpm deploy` succeeded with 1/1 schemas and the hosted Studio URL. Bob confirmed the URL responds and leads to Sanity auth, but did not inspect the authenticated editor or run the deploy.
- [ ] Andy corrects `log/2026-10-03_PR119_redirect-target-trailing-slash.md:20-21`: Bob approved `c56f045` **and** re-approved exact head `bbb1511` after the docs-only merge.
- [ ] Optional post-deploy editor smoke check by Charlie: hosted Studio rejects `To /blog`; delete any temporary unpublished draft.

Prior **Approved** source verdict remains in force; the P3 log correction is an attribution fix, not a code defect. Bob did not edit the gitignored log or Sanity.

---

## PR #119 exact merged-main head — 2026-10-03

Exact open head `bbb15116e557ed93965fbddcb48be4811ca16fc1`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Merge delta from approved `c56f045` is only 24 lines in `docs/DECISIONS.md` §46, imported from independently approved and now merged PR #118. §46, §47, §48 remain ordered.
- [x] No schema, validator, test, or application code changed; prior source and Charlie-reported live Studio evidence carry forward.
- [x] Exact-head web, studio, and Workers Builds checks pass; PR is open/mergeable; current PR diff whitespace check passes.
- [ ] Charlie merges PR #119 manually; Bob does not merge.
- [ ] After merge, deploy Studio to publish the new validation rule to hosted editors.

No scoped finding remains open at this head.

---

## PR #119 final-head review — 2026-10-03

Exact open head `c56f0452d9349960e922f67546eafffd5c26425f`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Previous P2 own-host full-URL bypass resolved in `dad584b`: apex/`www` targets are rejected by both Studio and build, while true external hosts remain allowed. Bob inspected source, ran both guards and direct probes, and checked schema validation (0 errors/warnings).
- [x] Charlie's reported local-Studio check at `dad584b` found `/blog` and the site's full `/blog/` URL invalid and publish-blocking; `/blog/` cleared errors; draft deleted without publishing; redirect list checked. Exact error wording and list contents were not recorded. Bob did not witness the UI.
- [x] Final `c56f045` only records that result in §48; exact-head web, studio, Workers Builds statuses and `git diff --check` pass.
- [ ] Charlie merges PR #119 manually; Bob does not merge.
- [ ] After merge, deploy Studio so the hosted editor receives the new validation rule.

PR #118 remains separately approved and open. No scoped PR #119 finding remains open.

---

## PR #119 redirect-target rule — 2026-10-03

Exact open head `df7b9a6dee382bdaa3dd19e4078ff83824625a08`; scoped verdict: **Blocked** on live Studio evidence, with one P2 source correction required.

- [x] Seven-file diff reviewed; `git diff --check` passes; exact-head web, studio, Workers Builds checks pass.
- [x] Bob's Studio/web guards and Sanity schema validation pass; first Studio guard attempt hit sandbox `tsx` IPC `EPERM`, approved rerun passed.
- [x] Relative-path rule handles `/blog`, `/blog/`, `/#pricing`, queries/fragments, and file examples in source and guard cases.
- [ ] P2: prevent an editor from using `https://mathematicsmalaysia.com/blog` or the site's `www` host to bypass the one-hop rule. Bob directly confirmed Studio accepts and build emits the apex example, while live `/blog` adds 307. Add both hosts to Studio/build/parity tests and align docs.
- [ ] After the correction, Charlie tests local Studio on the revised head or expressly authorizes Andy one temporary unpublished redirect draft in production. Check `To /blog` error and blocked Publish, valid `To /blog/` clearing the error and making Publish available; delete the draft and verify the redirect list. Record the observer and exact head.
- [ ] Bob re-reviews the corrected head and live evidence. Charlie alone merges; Studio deploy follows merge.

Andy reports three live Sanity rules applied and one static `/pricing/` duplicate skipped by a local build; Bob did not run that Sanity-backed build. The duplicate skip follows the documented precedence and does not itself block this PR.

---

## PR #118 redirect verification record — 2026-10-03

Exact open head `adad45d5ee497a526e7f348255d5226fd8793b21`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Only `docs/DECISIONS.md` §46 changed; PR diff whitespace check passes.
- [x] Exact-head `web`, `studio`, and Workers Builds statuses pass.
- [x] Bob directly verified `/blogs`, `/blogs/`, `/pricing`, and `/pricing/` each return a single 301 to the recorded destination, then 200; `/blogs/` coverage gap closed.
- [x] Bob directly verified `www` → apex one-hop 301; the dated internal handoff supports the recorded Cloudflare rule location/date, though Bob did not view the dashboard.
- [x] Bob independently read successful 200 Sanity hook logs at 09:38:20Z and 09:43:59Z; filtered detailed entries identify `redirect` documents. Live output and Charlie's no-manual-build report support the editorial-flow conclusion; no Cloudflare deployment ID was obtained.
- [ ] Charlie merges PR #118 manually; Bob does not merge.
- [ ] Andy separately addresses the uncanonicalized-target prevention gap in `mergeRedirects.ts` or editor guidance; this is outside this docs-only PR.

No scoped PR #118 finding remains open. Approval does not assert that Bob accessed Cloudflare's dashboard or Wrangler deployment list.

---

## `/blogs/` source coverage — 2026-10-03

- [x] Bob verified `/blogs/` 404 and `/blogs` 301 → `/blog/` on production.
- [x] Source inspection: literal `/blogs/` is valid in current Studio/build rules; wildcards/placeholders are intentionally rejected.
- [ ] Charlie creates a **second** Sanity Redirect with `From /blogs/`, `To /blog/`, permanent 301, leaving the existing `/blogs` document in place.
- [ ] After publish/deploy, Bob checks both source URLs independently for one-hop 301 → `/blog/` and destination 200.

Regex support is unnecessary for these two exact paths. Bob did not write to Sanity.

---

## `/blogs` live retest — 2026-10-03

- [x] Charlie reported changing the Sanity target to `/blog/`; Bob saw the old live response first and the corrected response on a later check.
- [x] Live HEAD and GET: `/blogs` 301 → `/blog/`; following GET: final 200 after exactly one redirect. The specific two-hop production defect is closed.
- [ ] Andy adds a canonical-target guard or editor guidance plus a regression case to prevent future Sanity targets such as `/blog` from creating a Cloudflare slash redirect. Forward-looking P2 finding remains open.
- [ ] To make an audited claim about the exact webhook that triggered this edit's deployment, correlate its Sanity delivery with the build/deployment. The observed live change alone does not identify the event.

Bob did not edit Sanity, application code, docs/DECISIONS.md, or deployment settings.

---

## PR #115 post-merge redirect follow-up — 2026-10-03

- [x] Bob's live HTTP check: `/blogs` 301 → `/blog` 307 → `/blog/` 200; following GET counted two redirects.
- [x] Bob's live HTTP check: `/pricing` and `/pricing/` each return 301 → `/#pricing`.
- [ ] Charlie edits the Sanity `/blogs` redirect target to `/blog/`, publishes, waits for deployment, and reports the result; Bob retests one-hop HTTP behavior.
- [ ] Andy adds a canonical-target check or equivalent editor guidance/test so explicit-rule chain detection does not miss Cloudflare's automatic slash redirect. Bob reviews any future source change.
- [ ] If claiming redirect-document publish automatically triggers the build, correlate a particular Sanity hook delivery with a corresponding deployment and the resulting live rule. Two reported 200 deliveries and the live rule do not identify the triggering event. Wrangler account repair is optional for the immediate HTTP retest.

**P2 production finding open.** This does not change Bob's earlier PR #115 pre-merge verdict or authorize Bob to edit Sanity or merge/deploy.

---

## PR #114 final-head review — 2026-10-03

Exact open head `01a8a7ac64b8c08307677a8a80c7360ca0789a8d`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Prior FAQ P1/P2 source findings and P3 document whitespace are closed; this commit changes only §47's manual-test record.
- [x] Exact-head `web`, `studio`, and Workers Builds checks pass; `git diff --check 4eb2672...HEAD` passes.
- [x] Charlie's reported local-Studio check at `f27f83e`: H2/H4 and a blank answer each blocked Publish; H2/H3 with real answer cleared errors; no publish; temporary draft deleted. The report says steps 4–7 were “all expected,” which includes the valid Publish-available and post-list checks from the instructions, but exact error wording and list contents were not recorded. Bob did not witness the test.
- [ ] Charlie merges PR #114 manually; Bob does not merge.
- [ ] After merge, deploy the Studio schema and verify an editor-authored FAQ on a published post when suitable content is available. VoiceOver/NVDA remains untested.

Approval covers the next gate, not a claim that a real published FAQ or screen-reader behavior was observed.

---

## PR #114 cleanup re-review — 2026-10-02

Exact open head `f27f83e4f72ecd8a0a36ec1fb6b52ac841d55afe`; scoped verdict: **Blocked** on live Studio editorial-flow evidence.

- [x] Prior P1/P2 FAQ source findings closed at `e8c905d`; no implementation changed at this head.
- [x] P3 blank EOF line removed; `git diff --check 4eb2672...HEAD` passes.
- [x] Exact-head `web`, `studio`, and Workers Builds checks pass. GitHub check-runs also confirms the Workers build passed at `e8c905d`; the earlier missing `gh pr checks` listing is reconciled.
- [ ] Charlie tests in local Studio at this head, or expressly authorizes Andy for one temporary unpublished production-dataset post draft. Check FAQ insertion and fields; H2/H4 and blank-answer errors each block Publish; valid H2/H3 plus real answer clears errors and Publish becomes available. Do not publish. Delete the draft and verify the post list; record observer and head.
- [ ] Bob reviews the live result and current head before an eligible verdict. Charlie alone merges; Studio deployment follows merge.

Bob did not create a draft, merge, deploy, or verify VoiceOver/NVDA or a Studio-authored public FAQ.

---

## PR #114 correction re-review — 2026-10-02

Exact open head `e8c905da8f0c8edb8069e2d4bdc34b144ebb4238`, base `4eb267247f8d011e70d4472d2340fd28a73e12bf`; scoped verdict: **Blocked** on live Studio editorial-flow evidence.

- [x] P1 FE-06 heading gap corrected in validator, schema, renderer, fixture, guard, and focused browser tests.
- [x] P2 blank-answer validation corrected in schema/guard; actual nested Studio error still needs observation.
- [x] P2 FAQ title enters the §42 contents list with a collision-safe anchor and a visible-title guard; no new owner decision is needed to keep this.
- [x] Bob's FAQ/TOC browser tests 14/14, post-heading guard, FAQ guard, and schema validation (0 errors/warnings) pass.
- [x] Exact-head GitHub `web` and `studio` checks pass.
- [ ] Andy removes the extra blank EOF line in `docs/DECISIONS.md:2829`; then `git diff --check` should pass.
- [ ] Confirm why Workers Builds did not report on this head, or provide equivalent Cloudflare build evidence. The missing check is not a failed check.
- [ ] Charlie performs a live check or explicitly authorizes Andy to make **one** temporary unpublished post draft in production. Use local Studio at this PR head; hosted Studio may have the old schema. Fill other required post fields, insert FAQ, check title/level controls and question/answer editing, verify skipped H2/H4 and blank-answer errors each block Publish, then valid H2/H3 plus real answer clears FAQ errors and makes Publish available. Do not publish; delete the draft and verify the original post list. Record exact commit and observations.
- [ ] Bob re-reviews that evidence and the then-current PR head. Charlie merges manually only after an eligible verdict; Studio deploy follows merge.

Bob did not create a Sanity draft or observe VoiceOver/NVDA or a Studio-authored public FAQ.

---

## PR #115 final-head review — 2026-10-02

Exact open head `4a9dd00734b46a8de89c6c4eab6f4a81d8281770`; scoped verdict: **Approved** for Charlie's manual merge.

- [x] Four prior code/documentation findings independently closed at `5ebe9f2` and unchanged by this documentation-only commit.
- [x] Charlie's dated manual Studio result in `docs/DECISIONS.md` §46 records trailing-space error, blocked Publish, valid values clearing the error, and deletion of the unpublished draft. Andy relayed it; Bob did not witness the UI or inspect an audit log.
- [x] Exact-head `web`, `studio`, and Workers Builds checks pass; documentation-only diff check passes.
- [ ] Charlie merges PR #115 manually; Bob does not merge.
- [ ] After deploy, verify `/pricing` → `/#pricing` and `/pricing/` → `/#pricing`, each in one hop, on the live domain.
- [ ] Publish a later intentional redirect change and confirm a Sanity hook delivery, a new Cloudflare deployment, and the resulting live HTTP response. Do not tell editors redirect publishes are automatic until that chain is observed for this document type.

No open scoped code finding remains. Approval is for the PR's next gate, not full production readiness of editor-managed redirects.

---

## PR #115 correction re-review — 2026-10-02

Exact open head `5ebe9f2e7a5d94e09503fe7694b2e4747b275bb8`; scoped verdict: **Blocked** on live Studio editor-flow evidence. No source finding remains open at this head.

- [x] Prior P1 Studio/build validation mismatch closed in source and parity tests; Bob directly probed common invalid and valid inputs.
- [x] Prior P2 unsupported source/overlong rule and duplicate-status defects closed in code and direct probes.
- [x] Prior P3 webhook note corrected against §§35/39; redirect-specific trigger is still unverified.
- [x] Exact-head three CI checks green; Bob's web/studio guards, Sanity schema validation (0 errors/warnings), and diff check pass.
- [ ] Charlie authorizes **one** temporary draft in the production Sanity dataset for Andy, or tests the form directly. This is a real dataset write; Bob cannot perform or authorize it.
- [ ] Run the **local Studio from PR head `5ebe9f2`**, connected to the production dataset; the hosted Studio may still serve the old schema until Studio is deployed. In one temporary draft, confirm `/pricing ` and `/` show errors and a Publish attempt is blocked. Enter valid `/review-test` → `/blog/` values, confirm validation clears and Publish becomes available, **do not publish**, then delete the draft and verify the prior **redirect** list. Record non-sensitive evidence and commit tested. Do not create a second published `/pricing` redirect.
- [ ] Bob inspects that evidence and the then-current head. Charlie merges manually only after an eligible verdict.
- [ ] After merge, confirm `/pricing` and `/pricing/` each produce the intended one-hop 301, and a redirect-document edit triggers the Sanity hook, Cloudflare deployment, and new live response without manual deployment.

Bob did not merge, deploy, alter Sanity content, or observe a deployed Worker response from this head.

---

## PR #115 Sanity redirect pre-merge gate — 2026-10-02

Exact open head `02b7e9299957451b474b2ada85488b24c79a1cd3`; scoped verdict: **Revision required**.

- [x] Exact-head `web`, `studio`, Cloudflare checks pass; Bob's merge guard and diff check pass.
- [x] Astro integration executes in a local build; absent config-process Sanity variables left only the static file, so Bob did not reproduce the Sanity-backed output independently.
- [x] Pre-merge live baseline: `/pricing` 404; `/pricing/` 301 → `/#pricing`.
- [ ] P1: Studio must block entry-local values the builder discards, including trailing whitespace, `/`, wildcards/placeholders, unsafe target shape, and self-loops; test a valid and an invalid edit in the Studio UI.
- [ ] P2: reject unsupported source query/fragment syntax and emitted rules over Cloudflare's 1,000-character limit; add tests.
- [ ] P2: define a deterministic status for duplicate same-source/same-target documents or reject the conflict; test reversed result order.
- [ ] P3: correct §46's webhook note using §35/§39's dated evidence, while distinguishing current redirect-specific verification.
- [ ] Bob re-inspects the corrected exact head. Charlie merges manually only after an eligible verdict; Bob does not merge.
- [ ] After merge, verify `/pricing` and `/pricing/` each return the intended one-hop 301; edit a redirect and confirm Sanity hook → Cloudflare build → live response without manual deployment. Record the result for operational handoff.

No Cloudflare response from a deployed PR #115 build, current webhook dashboard view, or redirect-specific hook event was observed.

---

## PR #114 FAQ pre-merge gate — 2026-10-01

Exact open head `2cd9106e8a171fa55849f84d94964e5eb409274f`; scoped verdict: **Revision required**.

- [x] Three exact-head CI checks pass; Bob's diff check, FAQ validator test, and six targeted built-site Playwright tests pass.
- [x] Bob measured no overflow at 320/560/768/1024/1440px, 54px summary targets, and visible focus in Chromium.
- [ ] P1 FE-06: reject title/question heading gaps rather than warning; update the H3→H5 fixture and tests.
- [ ] P2: reject empty or whitespace-only Portable Text answers, while allowing meaningful text or inline maths.
- [ ] P2: put FAQ H2–H4 titles in the article contents list with collision-safe anchors, or record Charlie's approval of their exclusion from the §42 contract.
- [ ] After those corrections, Charlie decides whether Andy may create **one** temporary draft in the production Sanity dataset. Bob's recommendation is not authorization.
- [ ] If authorized, verify live Studio insert menu, title and both level controls, question/answer editing, valid save, blank title/question/answer errors, invalid level error, Publish blocking, and draft deletion with the original post list restored. Record non-sensitive evidence. Check VoiceOver/NVDA separately if available; Chromium's accessibility tree is not that check.
- [ ] Bob re-reviews the revised exact head and live evidence. Charlie merges manually only after an eligible verdict; Studio deploy follows merge.

No live Studio, deployed PR preview, or screen-reader behavior was verified by Bob.

---

## PR #111 final-head review — 2026-10-01

Exact head `41c965c69b22e3b6342d84c071e9765e3bbf7129`; scoped verdict: **Approved** for user-controlled merge.

- [x] All earlier P1/P2/P3 code and evidence findings independently rechecked and closed on prior heads.
- [x] Dated manual UAT in `docs/DECISIONS.md` §45a covers wrapper Caption box, row-header switch, nested grid insertion, whitespace-caption and blank-header Publish blocks, and temporary-draft cleanup. Andy performed it; Bob did not witness it.
- [x] Exact-head `web`, `studio`, and Cloudflare checks green; documentation-only diff check passes.
- [ ] User merges PR #111 manually; Bob does not merge.
- [ ] After merge, Andy deploys Studio and verifies a real authored table renders correctly before editors rely on the feature. One-grid/stray-text errors and a Studio-authored public render were not live-tested in this review.

No open scoped finding remains. Approval is for the PR's next gate, not full site production readiness.

---

## PR #111 caption-test re-review — 2026-10-01

Exact head `0642c8e4a14e21c44bfef4bb4997d92ad36c3859`; scoped verdict: **Blocked** pending live Studio wrapper evidence.

- [x] The previous P2 test-evidence gap is closed: the committed script asserts a valid caption and five invalid cases; Bob reran it.
- [x] Exact-head `web`, `studio`, and Cloudflare checks pass; one-file diff check passes.
- [ ] The owner explicitly authorizes a second temporary production-dataset draft. Bob's recommendation does not grant permission.
- [ ] After approval, verify wrapper caption/checkbox visibility, nested grid insertion, exactly-one-grid/header-off publish blocks, valid rendered output, draft deletion, and restoration of the original four-post list. Capture non-sensitive evidence for Bob.
- [ ] Bob re-inspects the evidence and current head; user merges manually only after an eligible verdict.

---

## PR #111 caption follow-up — 2026-10-01

Exact head `6c5cf782986ff9309b37a0a414afb56e6128c110`; scoped verdict: **Blocked** pending live wrapper evidence.

- [x] Source validator rejects blank, whitespace, tabs/newlines, null, and missing caption values in Bob's direct invocation.
- [x] Exact-head `web`, `studio`, and Cloudflare checks green; local diff check passes.
- [ ] P2: add actual `validateTableCaption` assertions to `studio/scripts/assert-table-validation.ts`; its current success message and decision record claim tests that do not exist.
- [ ] Owner authorizes a second temporary production-dataset draft; Bob's recommendation is not that authorization.
- [ ] After approval, verify wrapper caption/checkbox visibility, grid insertion, exactly-one-grid/header-off publish blocks, rendered output, draft deletion, and restoration of the original post count. Record non-sensitive evidence.
- [ ] Bob re-inspects revised head and live evidence; user merges manually after an eligible verdict.

---

## PR #111 wrapper re-review — 2026-10-01

Exact head `0caa9d6274e6d31a6bb4cba965de6dc53dfa6834`; scoped verdict: **Blocked** pending live Studio evidence. The prior P1s are closed on source/fixture evidence; the nested editor has not been exercised.

- [x] Header validation implemented and independently unit-tested; original grid's header-off Publish block reported by Andy from live Studio, not yet re-tested inside wrapper.
- [x] Row-header-on and row-header-off markup independently tested on built fixture pages.
- [x] Square corners and corrected test count inspected.
- [x] Exact-head three CI checks green; local schema validation, table validation, four browser tests, and diff check passed.
- [ ] P2: reject whitespace-only captions; renderer currently trims them into unnamed tables.
- [ ] With the user's approval for a **second** temporary production-dataset draft, verify the wrapper fields are visible/editable, Insert → Table works inside it, exactly-one-grid and header-off errors block Publish, and valid caption/row-header choices render correctly. Delete the draft and confirm the original post count.
- [ ] Bob re-inspects the revised head and live evidence. User merges manually only after an eligible verdict; Bob never creates the draft or merges.

No deployed preview, production table, or live wrapper was verified in this pass.

---

## PR #111 blog tables — 2026-10-01

Current head `12bab82bae8a87afe46a7f0af76c06f5f9e8d6ae`; scoped verdict: **Revision required**.

- [x] Governing `02-INFORMATIVE-BLOG.md` v1.12.1, prior decisions/design, and exact PR diff inspected.
- [x] Exact-head `web`, `studio`, and Cloudflare checks passed; local diff check, schema validation, and three table browser tests passed.
- [x] Built fixture post checked in Chromium at 320/390/560/768/1440px; no page overflow and keyboard table scroll works.
- [ ] P1: prevent publication of headerless data tables or provide validated alternate headers.
- [ ] P1: support row headers for first-column labels and correct both sample tables.
- [ ] P2: require distinct, descriptive table names/captions.
- [ ] P3: reconcile scroll-frame radius with the square-corner table design rule.
- [ ] P3: correct decision record's “four tests” to three.
- [ ] Re-review corrected exact head. Live Studio insertion/editing and real editor-authored rendering remain unverified; check before calling the feature operational for editors.
- [ ] User merges manually after an eligible verdict; Bob does not merge or deploy.

This is a PR gate, not production readiness for the whole site. Historical review items remain in their prior sections.

---

## PR #110 final-head re-review — 2026-09-29

Current head `f666a605757ea16bc9dc5c49d7073146bdbe6dc0`; scoped verdict:
**Approved**.

- [x] Website kit's source header now uses the new root-mark geometry.
- [x] Website kit README records the new mark and superseded operator decision.
- [x] Actual kit page rendered in Chrome from localhost; new header mark,
  expected mask/viewBox, zero old operator rectangles, zero console errors.
- [x] Exact-head `web`, `studio`, and Cloudflare checks pass; follow-up diff
  check passes.
- [x] Earlier PR #110 design-reference, visual-evidence, and duplicate-mask-ID
  findings closed on prior verified heads.
- [ ] User merges manually; Bob does not merge.

Production deployment of the logo remains unverified while PR #110 is open.
The old private bundle `PageHeader` and historical mockup favicons are
documented reference debt; they do not drive the inspected website kit or
the live Astro site.

---

## PR #110 third re-review — 2026-09-29

Current head `5af1fd65b663c486f95fa6a6d7f694a3cc4cbef0`; scoped verdict:
**Approved with conditions**.

- [x] Exact-head `web`, `studio`, and Cloudflare checks pass; follow-up diff
  check passes.
- [x] Reusable Logo source and compiled Logo block use `React.useId()` for
  per-instance SVG mask IDs; previous P3 closed.
- [x] Intake no longer claims the unmerged logo is live.
- [x] Compiled bundle's exported Logo block now uses the new mark.
- [x] Historical guideline monogram card has a visible on-page notice.
- [ ] P2: the website kit README, inline header source, and compiled
  `PageHeader` still present the retired mark as current; add a visible
  archive notice to the kit and other old-mark mockups, or update their
  actual rendered assets. Source comments alone are insufficient.
- [ ] User decides whether to defer this separate design-package P2 before
  manually merging. Bob does not merge.

The live Astro logo code is unchanged in this follow-up. Production deployment
of PR #110 remains unverified while the PR is open.

---

## PR #110 second re-review — 2026-09-29

Current head `5ab15cb769af66bbdf8db2e91b60bdbb1577fdf7`; scoped verdict:
**Approved with conditions**.

- [x] Full design-share URL now recorded in `design/ASSETS.md`.
- [x] Replacement favicon comparison inspected at 16/32/64px on light/dark
  grounds; previous all-white file is gone.
- [x] Main design readme/intake updated; comparison page marked historical;
  reusable Logo source, declaration, and prompt use the new mark.
- [x] Exact-head `web`, `studio`, and Cloudflare checks pass; follow-up diff
  check passes.
- [ ] P2: reconcile or explicitly archive remaining old-mark design-kit
  previews, generated bundle, website-kit README, and direct SVG links; correct
  the intake's premature “live” claim.
- [ ] P3: make reusable design component mask IDs unique per instance.
- [ ] User decides whether to defer the separate design-package P2 before
  manually merging. Bob does not merge.

The live Astro logo code did not change in this follow-up. Production deployment
of PR #110 remains unverified while the PR is open.

---

## PR #110 re-review — 2026-09-29

Current head `80ec3cbfe16ba698e2cccdaae34159791398a35d`; scoped verdict:
**Approved with conditions**.

- [x] `design/ASSETS.md` §1c records the new owner-chosen mark and explicitly
  resolves its own old √ restriction.
- [x] Four committed desktop/mobile header and footer images opened and inspected.
- [x] Exact-head `web`, `studio`, and Cloudflare checks pass; follow-up diff check passes.
- [ ] P2: finish reconciling current-looking old-mark guidance and reusable assets in
  the design package; include the full design-share URL in the durable record.
- [ ] P2: replace the all-white favicon comparison PNG with a real inspected
  16px/32px light/dark comparison.
- [ ] User merges manually after deciding how to resolve or defer those P2 items.
  Bob does not merge.

The favicon SVG and 32px ICO render, but the attached small-size comparison does
not. Production deployment is unverified while PR #110 remains open.

---

## PR #110 new logo — 2026-09-29

Current stage: scoped pre-merge review. Verdict: **Approved with conditions** at
head `2c530f9f3d00aa63fe64fab09d11eaeee818d0e0`.

- [x] Five-file PR diff and new §44 reviewed; no runtime dependency or CSP change.
- [x] New owner-directed design canvas, its primary lockup, and small-size boards read.
- [x] PR standalone mark and dark favicon SVGs rendered and inspected in Chrome.
- [x] Distinct inline mask IDs, image semantics, token colours, and JSON-LD logo path checked.
- [x] Exact-head `web`, `studio`, and Cloudflare Workers Builds checks passed; web CI reports 60 tests passed.
- [ ] P2: record explicit owner-approved supersession of the operator mark and reconcile the
  checked-in design package; preserve old decision as history.
- [ ] P2: attach the claimed header/footer and 16/32px favicon captures, or give Bob a
  reachable PR preview for independent visual verification.
- [ ] User merges manually after deciding whether to take the P2 corrections in this PR
  or the next controlled step. Bob does not merge.

No P0/P1 finding was opened. Production logo deployment remains unverified while PR #110
is open.

---

## PR #109 production follow-up — 2026-09-29

Scoped verdict: **Approved** at final head `e999115`, merged as `b068915`.

- [x] Final documentation-only commit reviewed; the 24-hour Cloudflare metric is no
  longer described as evidence about earlier periods.
- [x] Final-head `web`, `studio`, and Cloudflare Workers Builds checks passed.
- [x] PR #109 was merged and its new CSS is linked from two published blog posts.
- [x] Deployed post CSS has zero `data:font` references and a same-origin KaTeX font URL.
- [x] Same-origin KaTeX `.woff2` returns HTTP 200 with `font/woff2`.
- [x] Cloudflare beacon markers remain absent on the home page and both published posts.
- [x] Andy reported no browser errors on both posts; Bob independently checked HTTP
  responses, not the browser console.

No PR #109 release action remains open. Google Analytics visitor counting is outside
this verification; the live home page's GTM reference was confirmed.

---

## PR #109 — CSP font and Cloudflare beacon, 2026-09-29

Current stage: scoped pre-merge review. Verdict: **Approved** at PR head `dc6c6eb`.
Historical checklist: the three unchecked release steps below were completed in the
production follow-up above.

- [x] Three-file diff reviewed against `main`; no CSP or dependency changes.
- [x] Vite callback behavior checked against official documentation.
- [x] New built-CSS test covers the `data:font` regression; `web` CI reports 60 passed.
- [x] `web`, `studio`, and Cloudflare Workers Builds checks passed on this PR.
- [x] Live home, blog archive, and published post contain no Cloudflare beacon markup.
- [x] Current published post CSS still contains one `data:font` reference, establishing the
  pre-deploy failure state.
- [ ] User merges PR #109 manually after this review.
- [ ] After the new production build, Andy verifies a published post's CSS has zero
  `data:font` references, font files load from the same origin, and no font CSP refusal occurs.
  The fixture route used in CI is not a published production URL.
- [ ] Recheck the Cloudflare beacon remains absent on the published post after deployment.

The merge and post-deploy checks are release actions; they do not block this scoped PR approval.

---

## Cloudflare Pages Migration Review - 2026-08-30

Scoped review of the current uncommitted migration diff. Scoped verdict: **Approved with
conditions**.

- [x] `@astrojs/vercel` removed from `web/astro.config.mjs` and `web/package.json`; no SSR adapter
  replacement added.
- [x] `DEPLOY_ENV` now gates production behavior in `web/src/lib/content/blogData.ts`,
  `web/src/env.d.ts`, `web/scripts/assert-production-fails-without-sanity.mjs`,
  `.github/workflows/ci.yml`, `web/playwright.config.ts`, `web/.env.example`, and the updated
  documentation.
- [x] `web/vercel.json` was replaced by `web/public/_headers` and `web/public/_redirects`.
- [x] `web/pnpm-lock.yaml` was resynchronized and `pnpm install --frozen-lockfile` stays clean.
- [x] `pnpm format:check`, `pnpm check`, `pnpm build`, `pnpm test:blog-production-guardrail`, and
  `pnpm test:blog-null-post-filter` all pass.
- [x] `pnpm test:e2e` is recorded as a fresh 39/39 rerun against the exact current tree in
  `docs/DECISIONS.md` §32.

### Conditions Still Open

- [ ] Cloudflare Pages project does not exist yet.
- [ ] Production env vars still need to be set in the Pages dashboard (`DEPLOY_ENV=production` plus
  the Sanity vars).
- [ ] Sanity publish webhook still needs to be repointed to a Cloudflare Pages deploy hook.
- [ ] Cloudflare Pages commercial/free-plan terms still need confirmation.

### Wrangler Assets-Only Delta - 2026-08-30

- [x] `web/wrangler.jsonc` exists on PR #31 head SHA
  `20274648424a4d7f6ea0b8d3e40abcd96ff4faac`.
- [x] `web/wrangler.jsonc` has no `main` key.
- [x] `assets.directory` is `./dist`.
- [x] `web/public/_headers` and `web/public/_redirects` remain in place and are emitted to `dist/`
  by `pnpm build`.
- [x] `web/.gitignore` ignores `.wrangler/`.
- [x] PR #31 remains open, not draft, mergeable, and CI-green (`web` and `studio`).
- [x] `pnpm format:check`, `pnpm build`, and `git diff --check origin/main..HEAD` pass locally.

## Vertical Slice Re-Review (P1/P2 Fix Commit) — 2026-08-16

Scoped re-review of fix commit `05ab713` (`HEAD c1186435c7b96b0905f4988f2ca5c497540f9409`), which
claims to resolve VS-01 through VS-05 from the 2026-08-15 review below. This is **not** full
vertical-slice approval — VS-06 through VS-17 remain open, unaffected, and not re-checked here.

Scoped verdict: **Approved with conditions.** All five targeted findings are genuinely resolved; two
new minor (non-blocking) issues were found during verification.

### VS-01 through VS-05 — Re-Checked

- [x] VS-01: `GapChart.astro` now takes an `annotations` prop, consumes
  `homePage.problem.gapChartAnnotations`, and matches by `year` code (not array position). All five
  new CMS fields Bob asked for (`problem.independentChecksCount`, `about.yearsExperience`,
  `about.studentsPerYear`, `pricing.availabilityTimeBlocks`, `finalCta.freeMinutes`) are wired
  schema → GROQ query → types → local fallback → seed script → component render, verified layer by
  layer, not spot-checked. `pnpm seed:dry-run` reproduces the same 6/1/3 counts DECISIONS.md §19
  claims. Confirmed live in browser: chart renders CMS/fallback data, not hardcoded values.
- [x] VS-02: "Blog notes" level links measured **67.6 × 44px** at 390/560/768/1440px (was 67.6 ×
  16.8px). No overlap with adjacent row content, no new horizontal overflow at any width.
- [x] VS-03: Footer links measured **44px tall at every width**, width equal to their column's full
  available width at every width tested (350/512/180/244px across 390/560/768/1440px) — confirmed the
  `inline-flex`-shrink regression DECISIONS.md §19 describes (caught by the implementer's own new
  Playwright test, not by this review) is genuinely fixed, not still present.
- [x] VS-04: `web/tests/e2e/landing.spec.ts` (19 tests) read in full and confirmed to cover overflow
  (4 widths), landmarks, the VS-02/VS-03 tap-target regressions by name, keyboard tab order + focus
  visibility (skip link), and FAQ accordion interaction (click + keyboard). Ran independently:
  `pnpm exec playwright install --with-deps chromium` + `pnpm test:e2e` → **19/19 pass**. CI step is
  real (not commented out) in `.github/workflows/ci.yml`'s `web` job. `gh run view 31894636124` for
  the exact `HEAD` commit confirms `conclusion: success`, `headSha` matches.
- [x] VS-05: `SiteHeader.astro` and `SiteFooter.astro` both now wrap their nav links in real
  `<ul>/<li>`, confirmed live (1 `<li>` header, 5 `<li>` footer). `aria-label`s on both `<nav>`
  elements unchanged. No duplicate/missing links, keyboard order unaffected.

### New Issues Found This Pass (non-blocking)

- [ ] `web/.prettierignore` should add `test-results/` and `playwright-report/` to match the
  `.gitignore` entries this commit already added — otherwise a local `pnpm test:e2e` run leaves
  `test-results/.last-run.json` behind and the next `pnpm format:check` spuriously fails until it's
  manually deleted. Does not affect CI (format:check runs before test:e2e in `ci.yml`).
- [ ] `studio/schemaTypes/documents/homePage.ts`'s `gapChartAnnotations[].year` sub-field has no
  validation restricting it to the 11 valid stop codes (`S1`-`S6`, `F1`-`F5`) — pre-existing gap, but
  now consequential since this fix commit activates the field: a Studio typo there silently drops a
  chart annotation with no error anywhere.

### Not Re-Checked (unaffected, still open from 2026-08-15)

- [ ] VS-06 through VS-13 (P2s), VS-14 through VS-17 (P3s) — see the 2026-08-15 section below.

---

## Vertical Slice Review — 2026-08-15

Current stage: first vertical slice (landing page renders from the real component tree and local
fallback content; no blog routes yet), reviewed at commit
`770965218abcbc048c1261c9ca0ad3f4b6bb832c`.

Current verdict: **Revision required.** This is not launch approval and not a blog-routes approval.

### P1 Blockers

- [ ] VS-01: `GapChart.astro` must consume `homePage.problem.gapChartAnnotations` instead of
  hardcoding its own values (or the field must be formally removed and the decision recorded); the
  other hardcoded editorial figures (`24`, `2`, `20`, `30`, the availability time blocks) need either
  real fields or a recorded hand-sync decision.
- [ ] VS-02: "Blog notes" level-to-category links (67.6 × 16.8px) must reach ≥44×44.
- [ ] VS-03: Footer navigation links (~350 × 18.2px) must reach ≥44×44.
- [ ] VS-04: A Playwright test suite must exist, be wired into `web`'s CI job, and be green — not
  substituted by an ad hoc reviewer pass.

### P2 Conditions

- [ ] VS-05: Header and footer `<nav>` link groups must be marked up as `<ul>`/`<li>`.
- [ ] VS-06: FAQ answers 2–13 must remain reachable with JavaScript disabled (native
  `<details>`/`<summary>` recommended, or the JS dependency recorded as a deliberate tradeoff).
- [ ] VS-07: `Organization` (or a more specific type) JSON-LD must be added sitewide.
- [ ] VS-08: Security headers (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`/CSP)
  must be configured via `vercel.json` or middleware.
- [ ] VS-09: Automated dependency/advisory scanning must run in CI or via Dependabot.
- [ ] VS-10: Fonts must be self-hosted, replacing the Google Fonts `@import` (previously flagged,
  still open).
- [ ] VS-11: The six documented old-site redirects must be implemented as executable config, not
  only documentation (previously flagged, still open — three of six targets now exist on the real
  page, so nothing blocks doing this).
- [ ] VS-12: A vertical-slice-stage FE self-check must be recorded in `docs/DECISIONS.md` (repeat of
  a gap the scaffold review already caught once as P2-DEV-07).
- [ ] VS-13: Header brand/logo link (114 × 40.3px) should reach ≥44×44 for consistency with the rest
  of the header.

### P3 Cleanup

- [ ] VS-14: Skip link (120 × 42.4px) is 1.6px short of the house 44×44 rule — optional polish.
- [ ] VS-15: Sitemap/robots.txt/RSS still not wired — expected at this stage, revisit once blog
  routes exist.
- [ ] VS-16: Consider native `<details>`/`<summary>` for the FAQ accordion (fixes VS-06 as a side
  effect).
- [ ] VS-17: `index.astro` is a large single-file component — no defect found, revisit extraction
  once blog templates might share patterns with it.

### Verified In This Review

- [x] `git log -1` confirms the commit under review and a clean working tree.
- [x] `web`: `pnpm install --frozen-lockfile`, `pnpm format:check`, `pnpm check` (0 errors/warnings),
  `pnpm build` all reproduced clean, independently of CI's badge.
- [x] `studio`: `pnpm install --frozen-lockfile`, `pnpm format:check`, `pnpm typecheck`, `pnpm lint`,
  `pnpm build` all reproduced clean (only the documented, accepted Sanity auto-update warning).
- [x] `studio`: `pnpm seed:dry-run` reports 6 categories, 1 author, 3 singletons, no writes.
- [x] `gh run list` confirms the latest CI run (`31891195182`) is `success` on
  `headSha 770965218abcbc048c1261c9ca0ad3f4b6bb832c` — the exact commit under review.
- [x] Real-browser Playwright verification performed at 390, 560, 768, and 1440px: landmark counts,
  heading order, tap-target measurement (edge-test and dimension measurement, not `scrollWidth`
  alone), computed-contrast sampling (11 selectors, all pass), keyboard tab order and focus-ring
  visibility, `prefers-reduced-motion` behavior, FAQ accordion interaction, console/network/response
  monitoring (zero errors, zero failed requests, zero non-2xx responses), and OG image dimension
  verification against the actual PNG header.
- [x] Secret scan of tracked files (targeted grep for common key/credential patterns): none found;
  both `.env.example` files contain only variable names, no values.
- [x] Forms: genuinely N/A, confirmed by absence of any form markup, Astro Action, Zod, Resend, or
  Turnstile package in either `web/` or `studio/`.
- [x] Analytics: genuinely N/A, confirmed by `rg` across `web/src` and `astro.config.mjs` for
  `gtag|gtm|google-analytics|dataLayer|analytics` returning no matches.
- [x] `web/reusable/` remains absent (unchanged from scaffold).
- [x] Prior design-review launch conditions (portrait, mark sign-off, WhatsApp glyph, disabled-note
  legibility, richer brand evidence, report strings, Mr Kong-reviewed blog copy) remain open,
  unchanged, and correctly not re-derived here as implementation findings — they are owner/client
  decisions per the review brief.
- [x] Branch protection: confirmed still blocked by GitHub's Free org plan (403 on both APIs per
  `docs/DECISIONS.md` §18) — this is the owner's explicit, stated-tradeoff decision and is treated
  as a residual risk, not re-opened as a finding, per the review brief's explicit instruction.

---

## Development Scaffold Re-Review - 2026-08-14

*(Preserved as history.)*

Current stage: Astro + Sanity scaffold review before first vertical slice.

Current verdict: **Approved for the next controlled development step**. This is not launch approval
and not vertical-slice approval.

### P1 Blockers

- [x] P1-DEV-01: production Sanity reads no longer switch to `drafts` merely because
  `SANITY_API_READ_TOKEN` exists. Public client is `published`; preview client is separate and gated.
- [x] P1-DEV-02: shippable green `href="#"` smoke-page control removed; smoke page now uses a
  non-interactive swatch and `rg 'href="#"' web/src` is clean.

### P2 Conditions

- [x] P2-DEV-01: CMS-authored navigation and redirect URL fields now have schema allowlist
  validation.
- [x] P2-DEV-02: broad `unknown` CMS result types were replaced with explicit homepage and Portable
  Text result types. Sanity TypeGen remains deferred and documented.
- [x] P2-DEV-03: GROQ helpers now use explicit projections and avoid dereferencing category refs per
  candidate post in the filter.
- [x] P2-DEV-04: routed document slugs now enforce lowercase-hyphen format and uniqueness.
- [x] P2-DEV-05: Studio package versions are pinned; hosted Studio auto-update remains enabled as an
  accepted, documented operational risk.
- [x] P2-DEV-06: default Astro/Sanity README boilerplate replaced with project-specific setup,
  env, checks, Studio access, and deploy documentation.
- [x] P2-DEV-07: Claude's scaffold-stage FE self-check is recorded in `docs/DECISIONS.md`.

### P3 Cleanup

- [x] P3-DEV-01: token-copy evidence is now byte-for-byte truthful; `diff -rq` is clean and the
  copied token directory is excluded from Prettier.
- [x] P3-DEV-02: stale `docs/DECISIONS.md` Section 4a wording updated. It now says the public client
  uses `published` and only the gated preview client uses `drafts`.

### Verified In This Re-Review

- [x] `diff -rq design/tokens web/src/styles/tokens` passed with no output.
- [x] `rg 'href="#"' web/src` returned no matches.
- [x] `web`: `pnpm build`, `pnpm check`, and `pnpm format:check` passed.
- [x] `studio`: `pnpm typecheck`, `pnpm lint`, and `pnpm format:check` passed.
- [x] `studio`: `pnpm build` passed with network escalation; Sanity emitted the documented
  auto-update/runtime version warning.
- [x] Route/stack match the accepted direction: `02-INFORMATIVE-BLOG.md`, Astro, standalone Sanity,
  no commerce backend.
- [x] `web/reusable/` is absent.
- [x] Prior design-review launch conditions remain open and unchanged.

---

## Prior Design Approval Checklist - 2026-08-14

Date: 2026-08-14

Current stage: blog archive/post design-package re-review before development.

Current verdict: **Approved with conditions for development handoff**. The final blog/header touch-target issue is closed; owner/client launch conditions still carry forward.

## P1 Blockers

- [x] P1-01: restore truthful, visible keyboard focus states for form controls in source and `_ds_bundle.js`.
- [x] P1-02: remove stale `#9c6a17` from the progress-report template and verify AA contrast on the callout heading.

## Approval Conditions

- [ ] P2-01: project owner decides the disabled-note legibility tradeoff.
- [ ] P2-03: client/project owner closes launch inputs: portrait or typographic rebuild, brand-owner sign-off on the adopted operator redraw, richer brand-brief evidence, FAQ count binding, two report strings, optional trust-bar accessible-name wording, "Schedule Now" decision, Mr Kong-reviewed blog content/math, and the narrowed WhatsApp glyph decision.

## Resolved Conditions

- [x] Final blog/header touch-target P2 closed: `STATES.md` now states `>=44x44px`; rendered at 390px and 1200px, header "Blog" is `44 x 44` on landing/archive/post and post breadcrumb "Notes" is `44 x 44`; 0 under-44 focusable targets and no horizontal overflow.
- [x] Route classification accepted: use `02-INFORMATIVE-BLOG.md`, Astro + Sanity, because ongoing editorial publishing is now in scope; `01-LANDING-PAGE.md` is superseded.
- [x] Blog template direction accepted: archive uses ruled rows, category taxonomy uses syllabus levels, post uses long-form prose + KaTeX + `Working`.
- [x] Blog category count type scale fixed: category counts now use `--size-2xs` / 12px; remaining `--size-3xs` uses are gap-chart annotation only.
- [x] Blog/header main target-size fixes checked: header "Schedule Now" is `169.6 x 44`, category filters are 44px high, pagination is 44px high, breadcrumbs are 44px high.
- [x] Landing shell production contract added to `STATES.md`: `lang`, skip link, `<main id="main">`, heading order, section labelling, and anchor behavior for the Astro build.
- [x] Web Development craft standard split accepted: only design-dependent §A semantics were pulled into `STATES.md`; layout, architecture, framework, dependencies, and code quality remain development review.
- [x] Font substitution decision closed: IBM Plex is confirmed; production self-hosting remains a build task, not a design decision.
- [x] WhatsApp brand-guideline check narrowed: word replacement, capitalization, endorsement, and authored verb usages are handled; remaining issue is official white/reversed asset vs dropping the glyph.
- [x] WhatsAppButton source comment closed: it now says the glyph is not the only destination signal and points to `ASSETS.md` §4.
- [x] Predecessor logo verified: old live-site PNG fetches at `350 x 100`; palette confirms the colored operator cluster. This reopens the route/mark decision as a condition.
- [x] Mark direction decided: owner chose Option B; Bob agrees with the choice.
- [x] Landing header render checked at 390px: operator mark aligned with type block, ink color, 0 clipped, 0 sub-24px targets, 0 stuck invisible.
- [x] Main Option B UI/card sync checked: booking source + bundle copy, brand component card, brand guideline lockup card, clearspace card, website README, `ASSETS.md`, and `_ds_manifest.json` now match the operator mark; manifest/card marker drift is 0.
- [x] Residual Option B package sync closed: `BRAND-INTAKE.md` §4, the standalone document-control progress-report template lockup, and root `HANDOFF.md` current status block now match the adopted operator mark.
- [x] Clearspace rewrite accepted as a derived rule: half the mark's height is coherent, subject to the same brand-owner sign-off as the adopted redraw.
- [x] Re-review browser limitation removed: Bob ran local Chrome/CDP checks.
- [x] Accordion package sync closed: `Accordion.d.ts`, `Accordion.prompt.md`, source fallback, and bundle fallback now carry the same accessibility contract.
- [x] Forced fallback browser check closed: 13 FAQ items, 13 fully wired, 12 closed panels, 12 closed panels inert, 0 bad rows with the design-system Accordion removed at render time.
- [x] Checkbox invalid-state wording closed: `STATES.md` now says box-shadow/ring rather than outline.

## Bob Review Decisions

- [x] `tavis.live` row stands; Bob found enough evidence to keep it as the fifth scan site.
- [x] CS-03 is accepted as a recorded route exception, not a pass. No directions stage is required for this package review unless the owner reopens direction selection.
- [x] CS-16 owner override accepted.
- [x] CS-71 ledger check passes for review timing; append the package row only after approval.

## Re-Review Checks Completed

- [x] `node --check design/_ds_bundle.js`.
- [x] Manifest-vs-CSS token diff: 125 CSS vars, 125 manifest tokens, 0 diffs, 0 duplicates.
- [x] Stale/failing value grep: no shipping `#9c6a17`; no shipping `outline:none` focus suppression.
- [x] Bundle-driven forms card: 7/7 controls show the 2px slate focus outline and match `:focus-visible`.
- [x] Website FAQ: 13/13 accordion items have trigger/panel relationships, region labelling, and inert closed panels in the rendered path.
- [x] Website FAQ fallback: 13/13 accordion items have trigger/panel relationships, region labelling, and inert closed panels when forced onto `PlainAccordion`.
- [x] Website at 390, 768, and 1440: 0 clipped elements, 0 sub-24px targets, 0 stuck-invisible reveal elements after transition settle.
- [x] Option B rendered card pass: brand component card, booking kit, reports UI kit, lockup card, and clearspace card render the operator mark/lockup with no stale equals copy.
- [x] Document-control report template render: operator SVG renders at `45.09 x 45.09`, no old uppercase/rule lockup, no stale equals copy, `.lockup-fill` resolves in template context.
- [x] Blog archive/post browser pass: archive and post at 390/768/1440 have 1 `h1`, 1 `main#main`, no browser-level sub-24px targets, no contrast failures, and no page-level horizontal overflow; post has 13 KaTeX formulas and no `[object Object]`.
- [x] Blog cards registered: manifest/card marker diff is 32 cards, 0 drift.
- [x] 2026-08-14 final blog re-check: landing/archive/post at 390 and 1200 have `scrollWidth === clientWidth`, 0 non-KaTeX clipped elements, 0 under-44 focusable targets, and post has 13 formulas with no formula-container overflow.
