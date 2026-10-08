# Bob Reviewer Handoff - Just Math Malaysia

Last updated: 2026-10-08

## 2026-10-08 — Dependabot review batch closed; review files ready for Andy's PR

Bob verified local `main` at `ca81db4a936cd0ea7649b8c2df5736e6564c73a3`, the #124 merge, with all 15 reviewed Dependabot merge commits in first-parent history. GitHub confirms #124 merged at the exact head Bob approved, and a read-only open-PR query returns zero Dependabot PRs. The pending diff contains only Bob's four owned review outputs and passes `git diff --check`. The records below preserve each exact-head review and attributed manual evidence. Andy may put those four files in one docs-only PR; Charlie reviews and merges it manually. Bob did not branch, commit, push, or merge.

The hosted Studio still reflects the deploy from `3893647`; #122 and #123 subsequently changed its lockfile. A redeploy and `/blog` versus `/blog/` validation check remain a separate operational follow-up. Bob did not deploy or operate the editor.

---

## 2026-10-07 — Development review: PR #124 web Sharp update

Bob reviewed exact open head `5378405f775049c87d83e1a9cea1fb662b899d8b` against merged `main` at `1fd3d01d1a9eb74991a2b152e9777e094f269558`, under `02-INFORMATIVE-BLOG.md` v1.13.0. Only `web/pnpm-lock.yaml` changes: optional indirect Sharp 0.35.4 → 0.35.5, platform packages/integrity, and bundled libvips 1.3.3 → 1.3.4. No manifest or web source changes. Upstream Sharp/libvips release notes checked. The site's portrait and blog images use Sanity CDN URLs, not direct Sharp calls; no `astro:assets` use was found. GitHub reports CLEAN/mergeable. Bob verified Actions run `37624842512` targets this SHA: web frozen install, audit, format, Astro check, build, guards, and Playwright pass; Studio and Workers Builds pass. GitHub's successful Cloudflare deployment comment links the head to a commit preview; Bob fetched the preview home page (200) and its real portrait JPEG from Sanity CDN (200, 600×750). This checks image delivery, not Sharp transformation. Bob did not install or run a local 0.35.5 build. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge at this head; a later head requires re-review. This is the last PR of the new four-PR Dependabot batch. The Studio redeploy for #122/#123 remains open. Bob did not merge, deploy, or edit Andy-owned files.

---

## 2026-10-07 — Development review: PR #121 web smol-toml update

Bob reviewed exact open head `de6f3c40992ef987004c45f7a7bdcae83b5b23e1` against merged `main` at `774c345820548bdfb7eb8bc5d601d26ebd778029`, under `02-INFORMATIVE-BLOG.md` v1.13.0. Only `web/pnpm-lock.yaml` changes: indirect `smol-toml` 1.8.0 → 1.9.0, integrity, and Astro/internal-helper references. No manifest or web source changes. The upstream release describes a parser rewrite, stricter parsing, and null-prototype result objects; GitHub's reviewed advisory lists 1.9.0 as the fix for quadratic-time parsing. GitHub reports CLEAN/mergeable. Bob verified Actions run `37621687836` targets this SHA: web frozen install, audit, format, Astro check, build, guards, and Playwright pass; Studio and Workers Builds also pass. Bob did not install or run a local 1.9.0 build. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge at this head; a later head requires re-review. Andy updates #124 after #121 merges. Bob did not merge, deploy, or edit Andy-owned files.

---

## 2026-10-07 — Development review: PR #123 Studio smol-toml update

Bob reviewed exact open head `a2ec8bd72d455469570951fe593a75e1d611ce8f` against merged `main` at `f4cedf06b2a97a62f3190293104c7faa166bc612`, under `02-INFORMATIVE-BLOG.md` v1.13.0. Only `studio/pnpm-lock.yaml` changes: indirect `smol-toml` 1.8.0 → 1.9.0, integrity, and `@sanity/cli`/`@vercel/frameworks` references. No manifest or Studio source changes. The upstream release describes a parser rewrite, stricter parsing, and null-prototype result objects; GitHub's reviewed advisory lists 1.9.0 as the fix for quadratic-time parsing. GitHub reports CLEAN/mergeable. Bob verified Actions run `37610266372` targets this SHA: Studio frozen install, audit, format, typecheck, lint, three validation guards, and `sanity build` pass; web and Workers Builds also pass. CI does not run `sanity deploy` or arbitrary TOML input checks, and Bob did not install or run a local 1.9.0 build. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge at this head; a later head requires re-review. Andy updates #121 after #123 merges. Bob did not merge, deploy, or edit Andy-owned files.

---

## 2026-10-07 — Development review: PR #122 Studio source-map-js update

Bob reviewed exact open head `37d9026393ec3febb870f835d5175b62a6523ae9` against merged `main` at `9201dc2a6a8b58825a5521e7702ff3e457a902f0`, under `02-INFORMATIVE-BLOG.md` v1.13.0. Only `studio/pnpm-lock.yaml` changes: indirect `source-map-js` 1.2.1 → 1.2.2, integrity, and `css-tree`/`postcss` references. No manifest or Studio source changes. The upstream release fixes an indexed source-map denial of service and a browser CSP crash; GitHub's reviewed advisory lists 1.2.2 as patched. GitHub reports CLEAN/mergeable. Bob verified Actions run `37608428092` targets this SHA and its Studio frozen install, audit, format, typecheck, lint, three validation guards, and build pass; web and Workers Builds also pass. Bob did not install the PR branch or run a local 1.2.2 build. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge at this head; a later head requires re-review. Andy updates #123 after #122 merges. Bob did not merge, deploy, or edit Andy-owned files.

---

## 2026-10-07 — Development review: PR #116 indirect devalue update

Bob reviewed exact open head `28a5a515308b794228f6c58e92830f4705c8ef5e` against merged `main` at `4232bea916a70e5e03ce95aaea416a36813c7bba`, under `02-INFORMATIVE-BLOG.md` v1.13.0. Entire diff is `web/pnpm-lock.yaml`: indirect `devalue` 5.9.2 → 5.9.4 and corresponding integrity/Astro snapshot references. No manifest or application source changed; project code does not import `devalue` directly. Upstream 5.9.3 release notes describe parsing and serialization fixes, including Node Buffer visible-byte handling; 5.9.4 describes tree-shaking optimization. GitHub reports CLEAN/mergeable. Bob verified Actions run `37560261910` targets this SHA; web CI passes frozen install, audit, format, Astro check, build, guards, and Playwright; studio and Workers Builds checks also pass. Bob did not install the PR branch or run a local 5.9.4 build. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge at this head; a later head requires re-review. This is the last queued Dependabot PR in the batch. Bob did not merge, deploy, or edit Andy-owned files.

---

## 2026-10-07 — Development review: PR #108 Portable Text renderer update

Bob reviewed exact open head `1598a61dd52a2c8892674b1e29e722106bedfb48` against merged `main` at `04c015fd25e8dfcd5603ada9f232fdbb90955d70`, under `02-INFORMATIVE-BLOG.md` v1.13.0. Only web manifest and lockfile change: pinned `astro-portabletext` 1.0.0 → 1.0.1, with no unrelated dependency or project source edits. Upstream 1.0.1 release notes describe preventing mutation of inbound Portable Text data. GitHub reports CLEAN/mergeable. Bob verified Actions run `37556294193` targets this head; web frozen install, audit, format, Astro check, build, guards, and Playwright pass, as do Studio and Workers Builds. The built fixture post tests positively assert all custom blocks, including maths, tables, and FAQ answers. GitHub's Cloudflare comment links this head to a successful commit preview; Bob fetched three published post pages (200), including the Learning Matrix post with rendered tables and FAQ details matching a read-only Sanity body-type query. Published math was not separately observed. Local renderer remains 1.0.0, so Bob did not install or claim a local 1.0.1 build. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge at this head; a later head requires re-review. Bob did not merge, deploy, write Sanity content, or edit Andy-owned files.

---

## 2026-10-07 — Development review: PR #106 web Prettier update

Bob reviewed exact open head `6bc2ee3c1808a37688ffa7643f4e621a62c28ae6` against merged `main` at `34177407332f91ee4e24dca2d199feb6506c8bbd`, under `02-INFORMATIVE-BLOG.md` v1.13.0. Only web manifest and lockfile change: pinned development dependency Prettier 3.9.6 → 3.9.9 with expected peer-reference propagation. Upstream 3.9.7–3.9.9 release notes checked. GitHub reports CLEAN/mergeable; exact-head web, studio, and Workers Builds checks pass. Bob verified Actions run `37490311567` targets this SHA and web CI passes frozen install, audit, `format:check`, Astro check, build, guards, and Playwright. Local web Prettier remains 3.9.6; Bob did not install or run local 3.9.9 checks. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge at this head; a later head requires re-review. Bob did not merge, deploy, or edit Andy-owned files.

---

## 2026-10-06 — Development review: PR #104 web Sanity client update

Bob reviewed exact open head `bdfe1100cbb8cca58e1a0dc34137fd34261184f8` against merged `main` at `e46b8a91a01dcb80a2c80322a53a911b46adce1f`, under `02-INFORMATIVE-BLOG.md` v1.13.0. The actual update is `@sanity/client` 8.6.2 → **8.9.0**, correcting Andy's 8.8.0 description. Only the web manifest and lockfile change, including two expected event-stream transitives. Upstream 8.7.0/8.8.0/8.9.0 release notes checked; this project's read-only GROQ fetch setup is unchanged. GitHub reports CLEAN/mergeable; exact-head web, studio, and Workers Builds checks pass. Bob verified Actions run `37488377487` targets this SHA and web CI passes frozen install, build, guards, and Playwright. CI's blog content uses fixtures, so Bob checked the Cloudflare commit preview linked to `bdfe110`: `/blog/` returned 200 with five posts matching a separate published-dataset Sanity query, and a preview post page returned 200 with the matching title. An independently installed `@sanity/client` 8.9.0 also fetched a published post using the web client's API version and read settings. Bob did not inspect the full Cloudflare build log or run a local web 8.9.0 build. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge at this head; a later head requires re-review. Bob did not install, merge, deploy, write Sanity content, or edit Andy-owned files.

---

## 2026-10-06 — Development review: PR #103 KaTeX update

Bob reviewed exact open head `5d4d36a2f7fb50c8c372bd4012dc78023a29300c` against merged `main` at `5ca06cd6001b8db35a96dbe2e514237367b6cf4f`, under `02-INFORMATIVE-BLOG.md` v1.13.0. Only web manifest and lockfile change: pinned KaTeX 0.18.7 → 0.18.9 with corresponding integrity/snapshot, no other dependency update. Upstream 0.18.8/0.18.9 release notes checked. GitHub reports CLEAN/mergeable. Exact-head `web`, `studio`, and Workers Builds checks pass; Bob confirmed Actions run `37446549439` targets this SHA. Web CI uses a frozen install, builds, and runs Playwright against a built fixture blog post; the tests cover inline/block math, MathML with JavaScript disabled, math in tables and FAQ answers, and local KaTeX CSS/fonts. This is fixture evidence, not a visual inspection of every live post. Local installed KaTeX is 0.18.7; Bob did not install 0.18.9 or run a local build/browser. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge at this head; a later head requires re-review. Bob did not merge, deploy, or edit Andy-owned files.

---

## 2026-10-06 — Development review: PR #101 Astro update

Bob reviewed exact open head `eab094096c4ff38d0a50b372064068eb711bc843` against merged `main` at `38936470d975948039d769cd878899ae0eeddaef`, under `02-INFORMATIVE-BLOG.md` v1.13.0. Only web manifest and lockfile change: pinned Astro 7.3.3 → 7.3.5 with expected compiler/Markdown/transitive resolutions. Astro 7.3.4/7.3.5 release notes checked; the project does not use the new experimental container API or incremental builds. GitHub reports CLEAN/mergeable. Exact-head `web`, `studio`, and Workers Builds checks pass. Bob verified Actions run `37444266407` has this head SHA; its web job passed frozen install, audit, format, check, build, guards, and Playwright. Local installed Astro is 7.3.3, so Bob did not run or claim a local 7.3.5 build. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge at this head; a later head requires re-review. Bob did not install, merge, deploy, or edit Andy-owned files.

---

## 2026-10-06 — Hosted Studio deployment preflight after #105 merge

GitHub confirms #105 merged as `38936470d975948039d769cd878899ae0eeddaef`; local `main` matches. Andy reported `npx sanity deploy --dry-run` built the Studio and listed files without uploading; Bob did not run it. Bob read stale local installed versions before deployment: `dompurify` 3.4.14, `prettier` 3.9.8, and `tsx` 4.23.13, behind merged requirements 3.4.16, 3.9.9, and 4.23.15. `HANDOFF.md` now reports that `pnpm install --frozen-lockfile` fixed this before Charlie deployed main `3893647`; it records `Deployed 1/1 schemas` and Charlie's hosted Studio editor result as reported, not witnessed. Bob did not independently verify the post-install package versions, run the deployment, or operate the editor.

---

## 2026-10-06 — Development review: PR #105 Studio tsx update

Bob reviewed rebased exact open head `32303c2b26ca91fccc1cfb34cc17a603243a032b` against merged `main` at `4027abbdf86e1a66ff541851fb9b4a9fd3a3edd8`, under `02-INFORMATIVE-BLOG.md` v1.13.0. Read-only `gh pr view/checks/diff`, local CI file inspection, and upstream tsx release notes were used. Only Studio manifest and lockfile change: pinned dev dependency `tsx` 4.23.13 → 4.23.15, integrity, and peer references. Exact-head web, studio, Workers Builds pass; PR is CLEAN/mergeable. Bob did not run local branch tests or a browser flow. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge at this head; a later head requires re-review. This is the final queued Studio dependency PR in the batch; a separately authorized hosted Studio deployment and editor smoke check follow merge. Bob edited only reviewer outputs and did not update branches, merge, install, or deploy.

---

## 2026-10-06 — Development review: PR #107 Studio Prettier update

Bob reviewed exact open head `0322d5649f1b872c052a1e4a1aa2921202e8eeb0` against merged `main` at `90ab6c4a26fcfcdd39ee99b85f59c27b747e89b1`, under `02-INFORMATIVE-BLOG.md` v1.13.0. Read-only `gh pr view/checks/diff` and local CI file inspection were used. Only the Studio manifest and lockfile change: pinned development dependency `prettier` 3.9.8 → 3.9.9. Exact-head web, studio, Workers Builds pass; PR is CLEAN/mergeable. Bob did not run local branch tests or a browser flow. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge at this head; a later head requires re-review. Hosted Studio deployment remains a separate operational step after #105. Bob edited only reviewer outputs and did not update branches, merge, install, or deploy.

---

## 2026-10-06 — Development review: PR #112 Studio DOMPurify update

Bob reviewed exact open head `c94a1fcc4c66443b1fc7631281c1a2f84b6a3f3e` against merged `main` at `3002ee6e75ddcfb1550f7031660bd9a0d181cb26`, under `02-INFORMATIVE-BLOG.md` v1.13.0. Read-only `gh pr view/checks/diff`, local CI file inspection, and Cure53 release notes were used. Only the Studio lockfile changes: indirect `dompurify` 3.4.14 → 3.4.16 and its dependency references. Exact-head web, studio, and Workers Builds pass; PR is CLEAN/mergeable. Bob did not run local branch tests or a browser flow. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge at this head; a later head requires re-review. A hosted Studio deployment remains planned after the remaining Studio dependency PRs; that is a separate operational check. Bob edited only reviewer outputs and did not update branches, merge, install, or deploy.

---

## 2026-10-05 — Development review: PR #113 Studio lockfile patch

Bob reviewed exact open head `bb733eb76a96a70b9a8126a607d000ed4a80fb16` against merged `main` at `916d82d348e24856d14b7788c6d352273149a992`, under `02-INFORMATIVE-BLOG.md` v1.13.0. Read-only `gh pr list/view/diff`, local CI file inspection, and GitHub's reviewed `GHSA-6j4f-fj2g-mc7p` advisory were used. Only the Studio lockfile changes: `brace-expansion` 5.0.9 → 5.0.12 under `minimatch`; 5.0.9 is affected and 5.0.10 patched per the advisory. Exact-head web, studio, Workers Builds pass; PR is CLEAN/mergeable. Bob did not rerun tests or inspect a new browser flow. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge at this head; a later head requires re-review. Read-only verification of the hosted Studio's deployed bundle remains a separate follow-up; the hosted version number does not identify the deployed commit. There are ten open Dependabot PRs including #113 at this check. Bob edited only reviewer outputs and did not update branches, merge, install, or deploy.

---

## 2026-10-05 — Development review: PR #117 Sanity dependency update

Bob reviewed exact open head `e0077e2545affa23416daede4e1f5086d47dded4` against base `87a5f3fef9a08d42becca57f86db123b27547c4d`, under `02-INFORMATIVE-BLOG.md` v1.13.0. Tools: read-only `gh pr view`, `gh pr checks`, `gh pr diff`, local file reads of CI and `HANDOFF.md`, and upstream Sanity/Client release notes. Only the Studio package manifest and lockfile change. Exact-head web, studio, and Workers Builds pass; GitHub reports CLEAN/mergeable. Bob did not run local branch tests or operate a browser.

Charlie reportedly tested a temporary redirect draft in local Studio 6.17.0 at this head: `To /blog` errored and blocked Publish; `To /blog/` cleared it; draft deleted without publishing. Andy relayed the result in `HANDOFF.md` and reports a later search found no `/smoke-test` record. This is attributed manual evidence, not Bob's observation; exact error text, screenshot, and audit log remain unavailable. No scoped finding is open. **Verdict: Approved** for Charlie's manual merge of PR #117 at this head; a later head requires re-review. Bob edited only reviewer outputs and did not merge, install dependencies, deploy, or write Sanity content. The other ten Dependabot PRs require individual updated-head reviews.

---

## 2026-10-03 — PR #119 merged; Studio deploy reported

GitHub confirms PR #119 merged at 2026-10-03 15:27:36 UTC as `6bc0f8ab9def23e049506ac65ac971d31f090edc`, and local `main` matches `origin/main`. Bob approved exact head `bbb15116e557ed93965fbddcb48be4811ca16fc1` after the docs-only merge from main, in addition to earlier approval at `c56f045`. Andy reports a successful `pnpm deploy` from `studio/` with 1/1 schemas deployed. Bob checked that the hosted Studio URL responds and redirects into Sanity's sign-in flow; he did not run the deployment or observe the authenticated redirect editor on the hosted instance. An optional hosted `/blog` validation smoke check remains.

One P3 historical-record correction is for Andy: the gitignored `log/2026-10-03_PR119_redirect-target-trailing-slash.md:20-21` currently says Bob approved only `c56f045` and did not approve `bbb1511`. That is false; the exact-head approval is recorded in these reviewer outputs and the prior verdict. Bob cannot edit the log under Rule 0. The **Approved** verdict for the merged implementation remains in force. Bob edited only reviewer outputs and did not merge, deploy, write Sanity content, or modify Andy-owned code, docs, handoff, or logs.

---

## 2026-10-03 — PR #119 exact-head approval at `bbb1511`

Bob re-reviewed exact open PR #119 head `bbb15116e557ed93965fbddcb48be4811ca16fc1` against approved `c56f0452d9349960e922f67546eafffd5c26425f` and current base `a292b14497734900a464497ef66abffb915649cf`. The merge from main adds only the 24-line §46 production-verification record from PR #118, which Bob independently approved at `adad45d` and GitHub confirms merged as `a292b14`. §46–§48 remain in order. No code, schema, validation, tests, or configuration changed since the `c56f045` approval, so its independent checks and Charlie-attributed live Studio evidence carry forward. Exact-head web, studio, Workers Builds and current PR diff whitespace checks pass; GitHub says the PR is open and mergeable.

**Scoped verdict: Approved** for Charlie's manual merge of PR #119 at `bbb1511`. No scoped finding remains open. Deploy Studio after merge to make the new rule available in hosted Studio. Bob edited only reviewer outputs and did not commit, merge, deploy, write Sanity content, or change application code, decisions, or the project handoff.

---

## 2026-10-03 — PR #119 final-head approval at `c56f045`

Bob reviewed exact open head `c56f0452d9349960e922f67546eafffd5c26425f` against previously reviewed `df7b9a6dee382bdaa3dd19e4078ff83824625a08`, under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. Commit `dad584b` closes the P2 own-host absolute-target bypass in Studio and build validation with apex/`www` and look-alike parity tests. Bob inspected source, ran both guards, direct probes, and Sanity schema validation (0 errors/warnings). The Studio guard's initial sandbox attempt hit `tsx` IPC `EPERM`; the approved rerun passed. Commit `c56f045` changes only §48 to record the manual Studio result. `git diff --check` and exact-head web, studio, Workers Builds statuses pass.

Charlie reports testing local Studio at `dad584b`: `/blog` and a full `https://mathematicsmalaysia.com/blog/` target showed errors and blocked Publish; `/blog/` cleared the errors; the temporary draft was deleted without publishing and the redirect list checked. This is Charlie's result relayed by Andy, not Bob's direct observation; exact error wording and list contents were not recorded. It closes the scoped live-editor evidence gate when combined with Bob's independent checks. No code changed after the tested head.

**Scoped verdict: Approved** for Charlie's manual PR #119 merge. Deploy Studio after merge so hosted editors get the new rule. PR #118 remains a separately approved, open documentation PR. Bob edited only reviewer outputs and did not commit, merge, deploy, write Sanity content, or modify application code, decisions, or the project handoff.

---

## 2026-10-03 — PR #119 redirect-target rule review at `df7b9a6`

Bob reviewed exact open head `df7b9a6dee382bdaa3dd19e4078ff83824625a08` against base `f9cd4d24687fb220ec798a4afa5b736efb841387`. The new Studio/build rule correctly rejects relative `/blog` and accepts `/blog/`, `/#pricing`, and file examples. Exact-head web, studio, and Workers Builds statuses pass; `git diff --check`, both guards, and Sanity schema validation pass (0 errors/warnings). The Studio guard's first sandbox run hit `tsx` IPC `EPERM`; its approved rerun passed. Andy reports a live-data build applied three redirects and skipped duplicate `/pricing/` because the static rule wins; Bob did not independently run that build. No live Studio error/Publish flow was tested at this head.

One open **P2** is in `review/bob/CODE-REVIEW.md`: both validators accept an absolute same-site target such as `https://mathematicsmalaysia.com/blog`; the build emits it, yet live `/blog` 307-redirects to `/blog/`. A copied full URL therefore recreates the two-hop error. Andy should treat apex and `www` absolute URLs as internal or reject them with guidance to use relative paths, test both hosts in Studio/build/parity, and update §48/content-model wording. A live local-Studio check should follow that correction: invalid `/blog` blocks Publish, valid `/blog/` clears the error, and the unpublished temporary draft is deleted with the redirect list checked. Charlie performs it or explicitly authorizes Andy; Bob cannot write Sanity under Rule 0.

**Scoped verdict: Blocked** pending this source correction and essential live Studio evidence. No P0/P1 finding is open. PR #118 remains a separate approved docs PR awaiting Charlie's merge. Bob edited only reviewer outputs; he did not change code, decisions, project handoff, Sanity, deployment, or Git history.

---

## 2026-10-03 — PR #118 docs-only production-verification approval

Bob reviewed exact open head `adad45d5ee497a526e7f348255d5226fd8793b21` against `f9cd4d24687fb220ec798a4afa5b736efb841387`. Only `docs/DECISIONS.md` §46 changed; the diff whitespace check and all three exact-head GitHub statuses pass. Bob directly checked live one-hop 301 redirects for `/blogs`, `/blogs/`, `/pricing`, `/pricing/`, and `www` → apex. `/blogs/` now works, closing its earlier P2 production coverage gap. Bob ran read-only Sanity webhook logs: the 09:38:20Z and 09:43:59Z success/200 entries identify `redirect` payloads in filtered detailed output. These events, the live change, and Charlie's report of no manual build support §46's editor-flow conclusion. Bob did not obtain a Cloudflare deployment ID or inspect the current dashboard; the dated project `HANDOFF.md` records the www rule location and September 21 creation, while Bob rechecked its live effect.

**Scoped verdict: Approved** for Charlie's manual merge of documentation PR #118. No finding in that diff remains open. The distinct P2 source-prevention gap remains for Andy: `mergeRedirects.ts` does not recognize Cloudflare's implicit slash redirect for a noncanonical target. Bob edited only reviewer outputs and did not commit, merge, deploy, write Sanity content, or modify Andy-owned code, decisions, or handoff files.

---

## 2026-10-03 — `/blogs/` remains uncovered

Bob verified that `/blogs/` currently returns 404, although `/blogs` now redirects to `/blog/` in one hop. The current Studio/build validators accept literal `/blogs/` as a separate source and reject wildcard/placeholder input; they provide no regex option. Charlie can add a second Sanity Redirect (`From /blogs/`, `To /blog/`, permanent 301) without replacing the existing `/blogs` rule. Bob will verify both exact URLs after the new rule deploys. This is an open P2 production coverage gap. Cloudflare does support splats in `_redirects`, but their greedy match is broader than these two specific URLs; see the [primary documentation](https://developers.cloudflare.com/workers/static-assets/redirects/). Bob edited only reviewer outputs and did not change Sanity, code, decisions, or deployment settings.

---

## 2026-10-03 — `/blogs` one-hop production fix verified

Charlie reported changing the Sanity redirect target to `/blog/`. Bob initially still saw the old `301 /blog` response at 09:29:28 UTC, then independently observed HEAD and GET returning `301 /blog/` at 09:30:14 UTC. A following GET reached `/blog/` with 200 after one redirect. The concrete production two-hop finding is **closed**. Bob did not inspect or edit the Sanity document, and has not matched a specific Sanity hook delivery to the build; the live change is consistent with the reported publish/deploy sequence without proving its exact trigger.

The P2 prevention gap remains for Andy: `mergeRedirects.ts` checks only explicit redirect sources, so it does not catch Cloudflare's automatic slash redirect when an editor targets `/blog`. Add a canonical-target rule or equivalent guidance and regression test before claiming the one-hop guarantee holds for every future editor redirect. Bob edited only reviewer outputs and did not touch code, decisions, Sanity, Git history, or deployment settings.

---

## 2026-10-03 — PR #115 post-merge `/blogs` redirect finding

Bob independently checked the production responses: `/blogs` returns 301 to `/blog`, which returns 307 to `/blog/`, which returns 200. A following GET counted two redirects. Both `/pricing` and `/pricing/` return one-hop 301 to `/#pricing`. The `/blogs` chain is an open **P2 production finding** against the guideline/§46 one-hop rule. `mergeRedirects.ts` only checks explicit redirect sources, so it misses Cloudflare's default folder-index slash canonicalization; current `wrangler.jsonc` does not override HTML handling. See `review/bob/CODE-REVIEW.md` for evidence and the [Cloudflare primary documentation](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/).

Charlie should change the Sanity `/blogs` target from `/blog` to `/blog/`, publish, then have Bob retest for a single 301 directly to the 200 destination. Andy should address the broader guard/editor guidance so new targets do not repeat this. Andy reports two 200 Sanity hook deliveries but cannot tie either to this publish; Wrangler deployment listing failed with account authorization code 10000. Bob did not run those CLIs. The live rule shows deployment but does not by itself prove which event started the build. This post-merge finding does not retroactively alter the scoped PR #115 pre-merge approval. Bob changed only reviewer outputs and did not edit Sanity, docs/DECISIONS.md, code, deployment configuration, or Git history.

---

## 2026-10-03 — PR #114 final-head approval at `01a8a7a`

Bob reviewed exact open PR head `01a8a7ac64b8c08307677a8a80c7360ca0789a8d` against previously checked `f27f83e4f72ecd8a0a36ec1fb6b52ac841d55afe`, under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. The only change is §47's manual Studio evidence; no FAQ source or tests changed. `git diff --check 4eb2672...HEAD` passes, and exact-head GitHub `web`, `studio`, and Workers Builds statuses are successful. Prior P1/P2 FAQ source findings, P3 whitespace, and the Workers status gap remain closed.

§47 records Charlie's 2026-10-03 report from local Studio at `f27f83e` against production Sanity: H2/H4 and blank answer blocked Publish, valid H2/H3 with a substantive answer cleared the errors, nothing was published, and the temporary draft was deleted. Charlie reported steps 4–7 “all expected”; this encompasses the previously requested valid Publish-available and post-list checks, though exact error wording and post list contents were not provided. This is Charlie's result relayed by Andy, not Bob's direct observation. Together with Bob's prior independent source/schema/guard/browser verification, it closes the pre-merge editorial-flow evidence gate.

**Scoped verdict: Approved** for Charlie's manual merge of PR #114. Bob did not merge or deploy. After merge, the updated Studio schema needs deployment, and an editor-authored FAQ on a published post remains to be verified. VoiceOver/NVDA was not checked. Bob edited only reviewer outputs and did not commit, create/edit Sanity content, or change application code, decisions, or the project handoff. Preserve historical review sections below as dated records.

---

## 2026-10-02 — PR #114 cleanup re-review at `f27f83e`

Bob reviewed exact open head `f27f83e4f72ecd8a0a36ec1fb6b52ac841d55afe` against `e8c905da8f0c8edb8069e2d4bdc34b144ebb4238`. The sole change removes the extra blank line from `docs/DECISIONS.md`, and `git diff --check 4eb2672...HEAD` now passes. The earlier three FAQ implementation findings remain closed; no code or tests changed. The PR's exact-head GitHub rollup shows `web`, `studio`, and Workers Builds successful. A direct GitHub check-runs query confirms Workers Builds also passed on `e8c905d`; its earlier absence from `gh pr checks` was a listing gap. Bob did not run or inspect a Cloudflare build artifact independently.

**Scoped verdict: Blocked** solely on the unobserved revised FAQ Studio editing flow. Charlie can test locally at `f27f83e`, or explicitly authorize Andy one temporary unpublished post draft in the production dataset. Verify insertion, heading choices, skipped H2/H4 and blank-answer publish-blocking errors, valid H2/H3 with a substantive answer clearing errors and making Publish available, and draft deletion with the original post list restored. Do not publish. Record observer, tested head, and result; Bob then reviews that evidence and the then-current PR head. Bob cannot create a Sanity draft under Rule 0. VoiceOver/NVDA and a real published FAQ remain unverified. Bob edited only the four reviewer outputs and did not commit, merge, deploy, or modify application code, decisions, the project handoff, or Sanity content.

---

## 2026-10-02 — PR #114 FAQ correction re-review at `e8c905d`

Bob reviewed exact open head `e8c905da8f0c8edb8069e2d4bdc34b144ebb4238` against merged PR base `4eb267247f8d011e70d4472d2340fd28a73e12bf`, under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. The local `main` ref is stale; comparisons used the actual PR base. The three findings from `2cd9106` are resolved in source/tests: the heading-level gap now blocks publication, blank answer blocks are rejected unless they contain real text or inline maths, and rendered FAQ H2–H4 titles enter the article contents list through collision-safe anchors. Including FAQ titles follows the owner's existing §42 decision; it does not need to be reopened as a new preference choice. Details are in `review/bob/CODE-REVIEW.md`.

Bob independently ran the post-heading and FAQ validation guards, Sanity schema validation (0 errors, 0 warnings), and 14 focused FAQ/contents Playwright tests against a fresh build; all passed. Exact-head GitHub `web` and `studio` checks pass, but Workers Builds did not appear in the check list. `git diff --check` reports one extra blank line at `docs/DECISIONS.md:2829`; Andy should remove it. No live Studio FAQ form, VoiceOver/NVDA, or real published FAQ was inspected.

**Scoped verdict: Blocked** on live Studio editorial-flow evidence. Charlie can run the check or explicitly authorize Andy one temporary unpublished draft in the production dataset; Bob cannot do so under Rule 0. Use local Studio at the PR head, test skipped H2/H4 and blank-answer publish-blocking errors, then valid H2/H3 with a substantive answer and Publish available; delete without publishing and confirm the original post list. Also reconcile the absent Workers status or supply equivalent Cloudflare build evidence, and clean the P3 document whitespace. Bob re-reviews the evidence and then-current head before Charlie's manual merge. Bob edited only these four reviewer outputs, did not commit, merge, deploy, or write Sanity content, application code, decisions, or the project handoff.

---

## 2026-10-02 — PR #115 final-head approval at `4a9dd00`

Bob reviewed exact open head `4a9dd00734b46a8de89c6c4eab6f4a81d8281770` against prior reviewed `5ebe9f2e7a5d94e09503fe7694b2e4747b275bb8`, under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. The only change is nine lines added to `docs/DECISIONS.md` §46; `git diff --check` passes. Exact-head `web`, `studio`, and Workers Builds checks pass. Scoped verdict: **Approved** for Charlie's user-controlled merge of PR #115. The previous P1/P2/P3 source and documentation findings were closed at `5ebe9f2`; no scoped finding remains open.

The decision record now contains Charlie's dated manual local-Studio test at `5ebe9f2` against production Sanity: a temporary redirect draft with `/pricing ` in From showed an error and blocked Publish; valid `/review-test` → `/blog/` cleared the error and made Publish available; the draft was not published, was deleted, and the redirect list checked. Andy relayed Charlie's report; Bob did not witness the UI, see a screenshot, or inspect Sanity audit logs. This specific manual evidence plus Bob's earlier independent source, schema, test, and probe checks closes the editor-flow evidence gate for pre-merge review. The invalid root `/` case was unit-tested but not tried in Studio; no live PR redirect or redirect-specific webhook was tested.

Next: Charlie merges manually, then verify on the deployed Worker that `/pricing` and `/pricing/` each redirect to `/#pricing` in one hop. On a later intentional redirect publish, confirm Sanity hook delivery, Cloudflare deployment, and the live HTTP response before claiming editor changes deploy automatically. Bob edited only reviewer outputs and did not create a draft, modify Sanity content, commit, merge, deploy, or change application code, decisions, or the project handoff. Historical reviewer sections remain intact.

---

## 2026-10-02 — PR #115 correction re-review at `5ebe9f2`

Reviewed exact open head `5ebe9f2e7a5d94e09503fe7694b2e4747b275bb8` against prior head `02b7e9299957451b474b2ada85488b24c79a1cd3`, under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. The four prior findings are closed in source/tests: Studio validators are bound to both redirect fields and check common invalid inputs, Cloudflare-unsupported/overlong source rules are skipped, same-path conflicting statuses choose 301 regardless of fetch order, and §46 now reconciles webhook history with the redirect-specific unknown. Bob checked Sanity's current validation documentation for `context.document` and publish-blocking custom errors. No new source finding was found.

Exact-head `web`, `studio`, and Workers Builds checks pass. Bob inspected the nine-file delta and ran `git diff --check`, both redirect guards, and `pnpm exec sanity schema validate` (0 errors, 0 warnings). The Studio guard first hit sandbox tsx IPC `EPERM`; an approved rerun passed. Direct probes confirmed `/pricing `, query/fragment sources, and an overlong line are rejected by Studio logic and skipped by the build; valid `/pricing` → `/#pricing` is accepted; duplicate 301/302 documents yield 301 in either order. Bob did not rerun full Playwright or a Sanity-backed site build. Andy reports a local live-dataset build still adds the pricing rule; that is not Bob's independent observation. Bob did not rerun the current hook CLI; §35/§39 are prior dated evidence and Andy reports the hook remains listed today.

**Scoped verdict: Blocked** on the live Studio form check requested for the earlier P1. Neither Andy nor Bob has observed this revised form reject an invalid redirect and block Publish. Charlie must authorize one temporary production-dataset draft for Andy, or test directly; Bob cannot write Sanity content. Use **local Studio running the PR head** against the production dataset, because the hosted Studio may still serve the pre-merge schema. In one unpublished draft, test trailing-space and root sources and try Publish to confirm it is blocked; then enter valid `/review-test` → `/blog/`, confirm the error clears and Publish becomes available, **do not publish**, delete the draft, and verify the redirect list. Publishing valid `/pricing` would create a second redirect for an existing source and is not part of this test. Record non-sensitive evidence and the exact commit. Bob then re-inspects that evidence and the current head. Charlie alone merges after an eligible verdict. After merge, verify both `/pricing` and `/pricing/` HTTP responses and one redirect edit → hook → deployment → live response. Bob edited only reviewer outputs and did not commit, merge, deploy, or change application code, decisions, the project handoff, or Sanity content.

---

## 2026-10-02 — Development review: PR #115 Sanity redirects

Reviewed exact open head `02b7e9299957451b474b2ada85488b24c79a1cd3` against main `e677a43be185abbf40dfb40ebfdf63734cf224b0`, under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. Scoped verdict: **Revision required**. One P1 task-completion finding is open: the existing Studio `redirect` schema allows common invalid inputs such as a trailing-space source, while the new build merge skips them and warns only in developer logs. Two P2s: unsupported Cloudflare source query/fragment syntax and overlong rules are counted as applied; duplicate same-source/same-target documents with different `permanent` values can switch between 301/302 according to fetch order. One P3: §46's webhook uncertainty overlooks §35/§39's dated end-to-end hook evidence. Exact evidence, owner actions, and verification criteria are in `review/bob/CODE-REVIEW.md`.

Bob inspected the seven-file PR delta, existing Studio redirect schema, static `_redirects`, Wrangler config, content model, prior webhook records, and current Cloudflare Workers Static Assets redirect documentation. Exact-head GitHub `web`, `studio`, and Cloudflare checks passed; local `git diff --check`, `pnpm test:merge-redirects`, and `pnpm build` passed. Bob directly probed the pure merge: `/old?ref=1` and `/old#part` were applied; a 1,207-character rule was emitted; reversing two same-source/same-target documents changed 301 to 302. The local build did **not** have `PUBLIC_SANITY_PROJECT_ID`/`PUBLIC_SANITY_DATASET` in its config process, warned, and kept only the static file; Andy's build with one Sanity rule is a separate reported result. Read-only `curl` on 2026-10-02 observed live `/pricing` 404 and `/pricing/` 301 with `Location: /#pricing`, the expected pre-merge baseline. No Cloudflare response from PR #115's generated file, current Sanity webhook dashboard state, or redirect-specific hook event was observed.

Next: Andy aligns Studio validation with builder rules, rejects Cloudflare-unsupported/overlong rules, fixes duplicate status resolution, tests these cases, and reconciles the webhook note with historical evidence. Bob re-reviews the revised exact head. Only after an eligible verdict does Charlie merge manually; then verify both pricing paths and an edit → hook → build → live-response chain. Bob edited only reviewer outputs and did not modify application code, `docs/DECISIONS.md`, `HANDOFF.md`, Sanity content, or deployment state.

---

## 2026-10-01 — Development review: PR #114 FAQ accordion

Reviewed exact open head `2cd9106e8a171fa55849f84d94964e5eb409274f` against main `e677a43be185abbf40dfb40ebfdf63734cf224b0`, under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. Scoped verdict: **Revision required**. See `review/bob/CODE-REVIEW.md` for one open FE-06 P1 (a warning allows H3 FAQ title → H5 question headings), one P2 blank-answer validation defect, and one P2 mismatch with the §42 H2–H4 contents-list decision. The P1 is a guideline failure; this review does not assert that a heading-rank gap alone automatically fails WCAG 1.3.1. No prior #111 finding was reopened.

Bob inspected the PR diff, schema/validator/tests, Astro renderer, typed content model, §42/§46 decisions, and governing guideline. Exact-head GitHub `web`, `studio`, and Cloudflare checks passed; local `git diff --check`, `pnpm test:faq-validation`, and six targeted FAQ Playwright tests against a fresh Astro build passed. Initial local test attempts hit sandbox `EPERM` on tsx IPC and localhost binding; approved escalated reruns passed. A read-only built-site Chromium inspection at 320, 560, 768, 1024, and 1440px found no document overflow, 54px summary targets, a visible 2px focus outline, and visible open answers under reduced motion. The server was stopped afterward. Bob did not independently rerun the full 70-test suite, typecheck, lint, or Studio schema validation; exact-head CI covers their configured checks. Current Sanity validation, HTML Standard, and W3C WAI heading guidance were consulted for source-based findings.

Live Studio insert/edit/publish validation, VoiceOver/NVDA, and an editor-authored FAQ on a deployed page remain unverified. Andy's proposed temporary draft would write to the production Sanity dataset; only Charlie can authorize that specific draft. Recommendation: Andy resolves the P1/P2 code and contents-list questions, then—if Charlie explicitly approves—uses one temporary draft to test title, levels, question/answer editing, publish-blocking errors, and cleanup. Bob re-inspects the revised exact head and evidence before changing the verdict. Charlie merges manually after an eligible verdict; Studio deploy is a later step. Bob edited only reviewer outputs, did not create a draft, commit, merge, deploy, or change application code, decisions, or the project handoff.

---

## 2026-10-01 — PR #111 final-head approval at `41c965c`

Bob reviewed exact open PR head `41c965c69b22e3b6342d84c071e9765e3bbf7129` against prior head `0642c8e4a14e21c44bfef4bb4997d92ad36c3859`, under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. The delta is only `docs/DECISIONS.md` §45a; `git diff --check` passes. Exact-head `web`, `studio`, and Cloudflare checks pass. Scoped verdict: **Approved** for the user-controlled PR merge. The earlier P1/P2/P3 findings were independently checked and closed on prior heads; no scoped finding remains open.

The decision record now contains dated manual Studio 6.16.0 UAT against `0642c8e`: Andy reports Charlie authorized a second temporary draft, wrapper Caption/row-header switch/Table field were visible, a nested 3×3 grid inserted, whitespace-caption and blank-header errors blocked Publish, and deletion restored the original four-post list. Bob read the record but did not witness Studio, inspect screenshots/audit logs, create a draft, or verify the post count independently. This specific manual evidence, combined with Bob's prior source, schema, validator, and built-browser checks, closes the editor-flow evidence blocker for pre-merge review. One-grid/stray-text UI errors and a Studio-authored public render were not live-tested; unit/fixture tests cover the code paths. No post-merge Studio deployment or production table was verified.

Next: user merges manually; Andy deploys Studio and verifies a real authored table before editors rely on the feature. Bob edited only reviewer outputs and did not commit, merge, deploy, or modify application code, decisions, or the project handoff. Historical reviewer sections remain intact.

---

## 2026-10-01 — PR #111 caption-test re-review at `0642c8e`

One-file follow-up at exact head `0642c8e4a14e21c44bfef4bb4997d92ad36c3859`: `studio/scripts/assert-table-validation.ts` now asserts one valid caption and five invalid inputs. Bob inspected the diff, ran `git diff --check` and the test independently (pass); all three exact-head CI checks passed. The prior P2 missing-test finding is resolved. Andy reports a deliberate mutation proved the test fails when the validator is broken; Bob did not witness it. Scoped verdict remains **Blocked** solely on missing live Studio wrapper workflow evidence. No second production-dataset draft was created by Bob or authorized in this review. Next: owner authorization, controlled live test and cleanup, then Bob re-inspection; user merges manually after an eligible verdict. Bob edited only review outputs and did not commit, deploy, or merge.

---

## 2026-10-01 — PR #111 caption follow-up at `6c5cf78`

Current PR head `6c5cf782986ff9309b37a0a414afb56e6128c110`, `02-INFORMATIVE-BLOG.md` v1.12.1. Scoped verdict remains **Blocked** because the nested Studio wrapper flow has not been seen live. Three exact-head GitHub checks passed; Bob inspected the four-file diff and ran `git diff --check`. Bob directly invoked `validateTableCaption` against empty, whitespace, tab/newline, null, missing, and valid values: behavior is correct. A new P2 is open in `review/bob/CODE-REVIEW.md`: the committed `assert-table-validation.ts` imports that function but contains no caption assertions, while its success message and `docs/DECISIONS.md` claim those cases were unit-tested. The prior whitespace behavior finding is resolved in source; the test claim is not.

Next: Andy adds actual caption assertions and updates the claim if needed. If the owner explicitly authorizes one more temporary draft in the production Sanity dataset, Andy checks wrapper fields, nested grid, validation blocks, and rendered output, deletes the draft, and confirms the original four-post list. Bob re-inspects exact-head evidence before changing the verdict. Bob edited only reviewer outputs and did not create a draft, commit, deploy, or merge.

---

## 2026-10-01 — PR #111 wrapper re-review

Exact head `0caa9d6274e6d31a6bb4cba965de6dc53dfa6834`, governing `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. Scoped pre-merge verdict: **Blocked**, because the new nested Studio wrapper workflow has never been exercised live. This follows the initial PR review at `12bab82`. The two earlier P1s are corrected in source and built fixture rendering; the P3 radius/test-count findings are closed. The caption P2 remains open in narrower form: Sanity's `Rule.required()` accepts whitespace-only strings, while Astro trims them and renders no caption with a generic “Table” region name.

Evidence actually inspected: diff from `12bab82`, Studio schema and validation source, web renderer/types/fixture/tests, design/decisions; exact-head `web`, `studio`, Cloudflare checks; local `git diff --check`; `pnpm exec sanity schema validate` (0 errors/warnings); `pnpm test:table-validation` (pass after approved escalation for sandbox IPC `EPERM`); four targeted Playwright browser tests against a fresh build (4/4 pass). No live Studio wrapper, real editor-authored table, deployed PR preview, or production table was inspected. The earlier live test of the old, unwrapped grid was reported by Andy and revealed that its caption field was unreachable; it does not verify the new wrapper.

Next: Andy tightens caption validation and adds a whitespace test; after the user authorizes a second temporary production-dataset draft, Andy tests insertion, caption/checkbox visibility, nested grid editing, exactly-one-grid/header-off Publish blocks, and valid rendered output, then deletes the draft and confirms post count. Bob re-inspects the exact updated head and evidence. Bob edited only reviewer outputs, did not commit, merge, deploy, or write to Sanity. Previous reviewer sections remain intact.

---

## 2026-10-01 — Development review: PR #111 blog tables

Bob reviewed PR #111 at exact head `12bab82bae8a87afe46a7f0af76c06f5f9e8d6ae` against `main` `0a8fe57647c84c0bc6e85b0ed688aa6b6349cae3`. Governing guideline: `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. Astro 7, Sanity Studio 6.16.0, Cloudflare Workers static assets. Stage: scoped pre-merge feature review. **Verdict: Revision required.** Two P1 accessibility findings remain open in `review/bob/CODE-REVIEW.md` (headerless editor state; missing row-header semantics in sample tables). A P2 table-naming risk and two P3 corrections are also open. No preference disagreement requires a user decision unless the owner changes the approved square-corner table treatment.

Evidence/tools actually used: `gh pr view/diff`, direct source/design/decision/handoff/prior-review reads, current Sanity documentation, W3C table guidance, Vercel Web Interface Guidelines, `git diff --check`, `pnpm exec sanity schema validate` (0 errors/warnings), and targeted Playwright against a fresh build (3/3 passed). The first local test run hit sandbox localhost `EPERM`; an approved escalated rerun passed. Exact-head GitHub `web`, `studio`, and Cloudflare checks were green. Chromium inspection of the built fixture post at 320, 390, 560, 768, and 1440px found no page overflow, working arrow-key scroll in the wide table, two captioned tables, zero row headers, and no page errors. The 1440px page still has a wide table that scrolls inside the constrained article column. No live Studio UI, deployed PR preview, real editor-authored table, or production table was inspected. Graphify had no existing graph; creating one would violate Bob's output-only write scope, so direct reads were used.

Andy should correct the P1 table semantics and tests, then the P2/P3 items. Bob re-inspects the exact revised head, including a header-toggle-off case, row labels, distinct table names, and CI. The user merges manually after an eligible verdict. Studio deployment and a real table insertion remain later operational checks. Bob edited only `review/bob/**` and this reviewer handoff, did not commit or merge, and preserved previous uncommitted reviewer history.

---

## 2026-09-29 — PR #110 final-head approval

Reviewed exact PR head `f666a605757ea16bc9dc5c49d7073146bdbe6dc0`
against `5af1fd6`. PR is open/mergeable. Exact-head `web`, `studio`, and
Cloudflare checks pass; follow-up `git diff --check` passes. Bob edited only
reviewer outputs and did not merge or deploy.

`design/ui_kits/website/LandingShell.jsx` now draws the root mark inline,
and its README names the 2026-09-29 owner decision. Bob rendered the actual
website kit over a read-only localhost server in Chrome: the new mark is
visible, header SVG has the expected viewBox and mask, and there are zero
old-operator rectangles or console errors. The bundle retains an old private
`PageHeader`, but the mockup loads the updated source after the bundle and
uses that header. The private block is not a public component export. Bob's
prior demand to patch it for this mockup was broader than necessary.

Scoped verdict: **Approved**. All PR #110 P2/P3 findings are closed. The
logo is not yet verified on production because the PR is unmerged; user
performs the merge. Historical mockup favicons and private bundled source
remain documented reference debt, not an open finding for this logo review.

---

## 2026-09-29 — PR #110 third follow-up re-review

Reviewed exact head `5af1fd65b663c486f95fa6a6d7f694a3cc4cbef0` against
`5ab15cb`. PR remains open/mergeable; exact-head `web`, `studio`, and
Cloudflare checks pass; `git diff --check` passes. Only reviewer outputs
were edited; Bob did not merge or deploy.

The duplicate SVG mask-ID P3 is closed: reusable Logo source and the compiled
Logo block now use `React.useId()`. `BRAND-INTAKE.md` no longer calls the
unmerged mark live. The bundle's exported Logo uses the new root mark, but
its separate `PageHeader` still contains the old inline operator SVG from
`ui_kits/website/LandingShell.jsx`. The website-kit README still says the
operator lockup is current, and the website-kit HTML only has a source comment
about the old favicon, not a visible historical notice. Other old-mark kit
references have source comments; the guideline monogram card does have a
visible banner. The design-package P2 therefore remains open, narrowed to
those current-looking mockup entry points. No live Astro logo defect found.

Scoped verdict: **Approved with conditions**. Andy should update or visibly
archive the old-mark mockups and correct the website-kit README, or the user
may explicitly accept that reference-package risk for later. Production
status remains unverified while PR #110 is open.

---

## 2026-09-29 — PR #110 second follow-up re-review

Reviewed exact PR head `5ab15cb769af66bbdf8db2e91b60bdbb1577fdf7` against
`80ec3cb`. PR remains open/mergeable; `web`, `studio`, and Cloudflare checks pass;
follow-up `git diff --check` passes. Only reviewer outputs were edited.

The full owner design-share URL is now in `design/ASSETS.md`. The replacement
favicon comparison is visible and shows 16/32/64px icons on both grounds; Bob
inspected it directly. Four header/footer captures remained valid. The main
design readme/intake and reusable Logo source now describe/draw the new root
mark, and the old comparison page is labelled historical. The evidence P2 is
closed; the design-authority P2 is narrowed but remains open because the website
design-kit README, inline kit mark, generated `_ds_bundle.js`, and some direct
SVG references still present the old mark in active-looking previews. The
intake also prematurely says the new mark is “live” while the PR remains open.
The reusable design Logo repeats mask IDs across same-treatment instances (P3).

Scoped verdict: **Approved with conditions** for the PR's live Astro change.
Andy should reconcile or explicitly archive the remaining design-kit surfaces;
the user may accept that separate package risk for later. Bob did not merge,
deploy, or edit Andy-owned files. Production status remains unverified.

---

## 2026-09-29 — PR #110 follow-up re-review

Reviewed exact head `80ec3cbfe16ba698e2cccdaae34159791398a35d`, follow-up
to `2c530f9`, against the two open P2s. PR remains open/mergeable; `web`, `studio`,
and Cloudflare checks pass. Follow-up `git diff --check` passes. Bob edited reviewer
outputs only; no commit or merge.

`design/ASSETS.md` §1c now records the owner-selected root mark, supersedes the
operator choice in that file, and explains the old √ ban. The durable link is still
truncated and `design/readme.md`, `BRAND-INTAKE.md`, the reusable Logo component,
and mark comparison still present the retired mark as current. P2 design authority
remains partially addressed. The four committed header/footer PNGs show the new
lockup at desktop and mobile sizes without apparent clipping. The committed
favicon-comparison PNG is 700×380 and solid white, so the claimed 16/32/64px
evidence is absent. Exact-head favicon SVG renders in Chrome; 32px ICO renders.
P2 visual evidence remains partially addressed. Scoped verdict stays **Approved
with conditions**. Andy should reconcile the remaining design-package guidance
and replace the blank comparison image; user decides any deferral and merges.

---

## 2026-09-29 — Development review: PR #110 new logo

Bob reviewed PR head `2c530f9f3d00aa63fe64fab09d11eaeee818d0e0` against
`main` `b0689158284b8357a713646d26bc57c5dd657271` under
`02-INFORMATIVE-BLOG.md` v1.11.0 (shared core v1.11.1). Static Astro, Sanity,
Cloudflare Workers static assets. Scoped verdict: **Approved with conditions**;
two P2s open in `review/bob/CODE-REVIEW.md`.

Evidence and tools: `gh pr view/diff/checks`, exact-head CI run `36515654302`,
`git show/diff --check`, direct reads of the five changed files, current design
package, handoff, and prior Bob review; Chrome inspection of the linked Claude
primary and small-size logo boards plus the PR's raw `logo.svg` and `favicon.svg`.
CI `web`, `studio`, and Cloudflare Workers Builds passed; web CI reported 60
Playwright tests. No local PR build, live PR header/footer viewport test, or PR
preview was available. Andy's claimed screenshots were not attached.

The owner-directed newer logo canvas supersedes the old operator-grid mark for
this implementation. The checked-in design package still calls the grid active
and bans √; Andy must record the explicit supersession and reconcile reusable
design assets. Andy must provide the claimed desktop/phone lockup and small-size
favicon captures, or a preview, for Bob's independent visual check. No P0/P1
implementation defect found. No user preference or business dispute remains
unless the owner contests the newer approval evidence. Production status is
unverified because the PR is open. Next: Andy resolves the P2s; Bob re-inspects;
user merges manually. Bob edited only reviewer outputs and did not commit or
merge anything. Prior reviewer output changes remain uncommitted in the local
working tree.

---

## 2026-09-29 — PR #109 final-head and live re-review

PR #109 gained a documentation-only correction after Bob's first review: final head
`e9991155a1a15e1bc2a2aa465a68e284281d79c1`, merge commit
`b0689158284b8357a713646d26bc57c5dd657271`. The diff corrects the claim about
Cloudflare's 24-hour zero-view window; final-head CI run `36513998888` and the PR's
Cloudflare Workers Builds check passed. No new finding. Scoped verdict: **Approved**.

Public HTTP checks confirmed both published posts link
`/_astro/_slug_.ChVmnjN6.css`, which has zero `data:font` references. Its same-origin
KaTeX_Size3 `.woff2` URL responds HTTP 200 as `font/woff2`; the live CSP remains
`font-src 'self'`. The home page and both posts lack Cloudflare beacon markers; the
home page still references GTM. Andy reported zero browser errors and attributed
Google fonts on the Differentiation post to its YouTube embed. Bob did not directly
inspect browser console or request initiators; the in-app browser was unavailable.
No viewport or interaction tests were run in this follow-up; final-head CI passed
its built-output Playwright suite. Google Analytics visitor counts were not verified.

Bob edited only `review/bob/**` and this reviewer handoff. These changes are saved
locally and remain uncommitted in the working tree; Rule 0 prohibits Bob from
committing them. No further PR #109 release work is open.

---

## 2026-09-29 — Development review: PR #109

Bob independently reviewed PR #109; Andy remains the implementer. Bob edited only
`review/bob/**` and this reviewer handoff, never application code, `docs/DECISIONS.md`, or
the project `HANDOFF.md`.

- Scope and verdict: **Approved** for the three-file pre-merge change at head
  `dc6c6eb5d2665b22ce104f73885d126ff3192994` against `main`
  `68561c105941d02b80ade3c823fabc1f3819ce9e`. Governing guideline:
  `02-INFORMATIVE-BLOG.md` v1.11.0, shared core v1.11.1. Static Astro + Sanity on
  Cloudflare Workers static assets. No merge performed.
- Tools and evidence: `gh pr view/diff/checks`, CI run `36512363380` web log,
  `git show/diff --check`, direct source and prior-review reading, official Vite and
  Cloudflare documentation, and public `curl` response checks. Graphify was unavailable
  under Rule 0 because generating its graph would write outside Bob's reviewer outputs;
  source was read directly. No local PR build, direct dashboard inspection, or browser
  console test was run.
- CI: `web`, `studio`, and Cloudflare Workers Builds green; web CI reports 60 passed
  Playwright tests against built output, including the new font assertion. The exact
  PR head was unchanged on the final status check.
- Production evidence: home, archive, and a published post had no Cloudflare beacon
  markers. Home still referenced Google Tag Manager. Current published post stylesheet
  `/_astro/_slug_.UQRz33V-.css` had one `data:font` reference, confirming the font fix
  is not yet live. The fixture route used in CI is a 404 in production.
- Viewports and flows: no direct PR preview browser session or viewport test in this
  review; the CI suite covers its configured 390/560/768/1440px widths. Public HTTP
  responses were inspected for beacon and font markers only.
- Open findings: none in this diff. No disagreement requiring a decision. The 24-hour
  zero-view metric does not prove Cloudflare analytics never worked historically.
- Next: user merges manually; Andy confirms the new production build and checks an
  actually published blog post for same-origin fonts and zero CSP font refusals, then
  confirms the Cloudflare beacon remains absent. A code review is not a production
  verification of the not-yet-deployed font fix.

---

## 2026-08-30 - Cloudflare Pages migration review

Role: Bob, independent reviewer. Claude is the implementer. Bob did not edit application code,
`docs/DECISIONS.md`, or root `HANDOFF.md`.

Review type: **scoped migration review** of the current uncommitted Vercel → Cloudflare Pages
changes in the shared working tree, against `HEAD c1186435c7b96b0905f4988f2ca5c497540f9409`.

Scoped verdict: **Approved with conditions.** No open P0/P1 code defects remain in the migration.
The only remaining blockers are deployment operations, not code defects:
create the Cloudflare Pages project, set production env vars there, and repoint the Sanity webhook.

### Capabilities and fallbacks actually used

| Capability | Status | Notes |
| --- | --- | --- |
| Bash / Read / Grep / Glob | Available | Used for diff inspection, source scans, and file-line verification. |
| Playwright / browser verification | Partially available | This sandbox could not bind `127.0.0.1:4321` (`listen EPERM`), so Bob could not rerun the browser suite locally in this session. The project record in `docs/DECISIONS.md` §32 notes a fresh 39/39 rerun against the exact current tree. |
| `pnpm` checks | Available | `format:check`, `check`, `build`, and the two guardrail scripts all passed; `pnpm install --frozen-lockfile` stayed clean. |
| `gh` CLI | Available, authenticated (`charliekhc`) | Not needed in this migration pass. |

### Files/evidence reviewed this pass

- `web/astro.config.mjs`, `web/package.json`, `web/src/env.d.ts`,
  `web/src/lib/content/blogData.ts`, `web/scripts/assert-production-fails-without-sanity.mjs`,
  `web/playwright.config.ts`, `web/tests/e2e/landing.spec.ts`, `web/public/robots.txt`,
  `web/public/_headers`, `web/public/_redirects`, `web/README.md`, `web/.env.example`,
  `.github/workflows/ci.yml`, `docs/DECISIONS.md`.
- Current `git status --short`, `git diff --stat`, `git diff --check`.
- `rg` scans for `VERCEL_ENV`, `vercel.json`, `@astrojs/vercel`, `DEPLOY_ENV`, `_headers`,
  `_redirects`, and Cloudflare/Vercel host references in the changed files.

### Tools and commands actually run this pass

- `cd web && pnpm install --frozen-lockfile`
- `cd web && pnpm format:check`
- `cd web && pnpm check`
- `cd web && pnpm build`
- `cd web && pnpm test:blog-production-guardrail`
- `cd web && pnpm test:blog-null-post-filter`
- `cd web && pnpm test:e2e` (sandbox failed to bind `127.0.0.1:4321` with `listen EPERM`)
- `git diff --check`

### Viewports/flows actually tested

- Browser verification is covered by the fresh 39/39 rerun recorded in `docs/DECISIONS.md` §32
  against the exact current tree.
- This session's local sandbox could not reproduce the browser port bind, so Bob did not rerun the
  browser suite directly here.

### Resolved and open findings

- No open P0/P1 code findings remain in the migration.
- The previously flagged decisions-record mismatch is closed: `docs/DECISIONS.md` now separates
  historical Vercel-era entries from the current Cloudflare Pages guidance.
- Open conditions are deployment-only: create the Cloudflare Pages project, set `DEPLOY_ENV`
  and Sanity env vars there, and repoint the Sanity webhook.

### Residual unverified risk

- Cloudflare Pages project state, environment variables, deploy hook, and commercial plan terms are
  still external to the repo and require dashboard-level setup/confirmation.

### Next steps

1. Create the Cloudflare Pages project for `web/`.
2. Set `DEPLOY_ENV=production` and the Sanity env vars in the Pages production environment.
3. Repoint the Sanity publish webhook to the Cloudflare Pages deploy hook.
4. Confirm the plan/terms decision before treating the host migration as fully closed.

### 2026-08-30 Wrangler assets-only delta re-review

Bob re-reviewed the follow-up PR #31 commit adding `web/wrangler.jsonc` for Cloudflare Workers
static assets deployment.

- PR #31 head SHA: `20274648424a4d7f6ea0b8d3e40abcd96ff4faac`.
- PR state: open, not draft, mergeable.
- CI: `web` success and `studio` success on the PR head.
- `web/wrangler.jsonc`: assets-only config, no `main`, `assets.directory` is `./dist`.
- `web/.gitignore`: `.wrangler/` ignored.
- `web/public/_headers` and `web/public/_redirects`: still present and emitted to `dist/` by a real
  `pnpm build`.
- Local checks rerun by Bob: `pnpm format:check`, `pnpm build`, and `git diff --check
  origin/main..HEAD` all passed.

Result: no new finding. The scoped verdict remains **Approved with conditions**.

## 2026-08-16 - Scoped re-review of the P1/P2 fix commit

Role: Bob, independent development reviewer. Claude is the implementer, a separate session with no
visibility into this one. Bob did not edit application code, `docs/DECISIONS.md`, or root
`HANDOFF.md`.

Review type: **scoped re-review**, not a full vertical-slice pass. Claude's fix commit `05ab713`
("fix: resolve the four P1 findings from Bob's vertical-slice review"), merged to `main` at
`c1186435c7b96b0905f4988f2ca5c497540f9409` (current `HEAD` at review time), claims to resolve VS-01
through VS-04 (P1) plus VS-05 (P2, rolled in because it shares both files touched for VS-02/VS-03)
from the 2026-08-15 review below. This session re-inspected only those five findings plus the files
the fix commit actually touched — not a fresh vertical-slice pass, and VS-06 through VS-17 (the
other 8 P2s and 4 P3s) were deliberately **not** re-litigated.

Scoped verdict: **Approved with conditions.** All five targeted findings are genuinely resolved.
Two new minor, non-blocking issues were found during verification (detailed below and in
`review/bob/CODE-REVIEW.md`'s 2026-08-16 section) — neither reopens any of the five findings.

### Capabilities and fallbacks actually used

| Capability | Status | Notes |
| --- | --- | --- |
| Bash / Read / Grep / Glob | Available | Used throughout, including `git diff 05ab713~1 05ab713 -- <file>` per touched file. |
| Playwright (`mcp__plugin_playwright_playwright__*`) | Available | Used for all real-browser re-measurement of VS-02/VS-03/VS-05 — no manual-checklist fallback needed. |
| `gh` CLI | Available, authenticated (`charliekhc`) | Used to confirm the CI run for the exact `HEAD` commit, not just trust the badge. |
| `pnpm exec playwright install --with-deps chromium` / `pnpm test:e2e` | Available, ran clean | 19/19 tests passed on a fresh install, matching the count and pass claim in `docs/DECISIONS.md` §19. |

### Files/evidence reviewed this pass

- `review/bob/CODE-REVIEW.md`'s 2026-08-15 section (the findings being re-checked).
- `docs/DECISIONS.md` §19, read in full and treated as an unverified claim until independently
  checked against the diff and live behavior.
- `git log --oneline -8`, `git show --stat 05ab713`, `git rev-parse HEAD`.
- `git diff 05ab713~1 05ab713 -- <file>` for every file the fix commit touched, read in full:
  `web/src/components/GapChart.astro`, `web/src/pages/index.astro`,
  `studio/schemaTypes/documents/homePage.ts`, `web/src/lib/sanity/queries.ts`,
  `web/src/lib/sanity/types.ts`, `web/src/lib/content/defaultLandingData.ts`,
  `studio/scripts/seed.ts`, `web/src/components/SiteHeader.astro`,
  `web/src/components/SiteFooter.astro`, `web/tests/e2e/landing.spec.ts`,
  `web/playwright.config.ts`, `web/scripts/serve-dist.mjs`, `.github/workflows/ci.yml`.
- Current-state reads (not diff) of the same files, plus `web/.prettierignore` and `.gitignore`, to
  confirm the post-fix state is internally consistent, not just that the diff looks right in
  isolation.

### Tools and commands actually run this pass

- `cd studio && pnpm install --frozen-lockfile` (already up to date), `pnpm seed:dry-run` (6
  categories, 1 author, 3 singletons, no writes — matches §19's claim), `pnpm typecheck` (clean),
  `pnpm lint` (clean), `pnpm format:check` (clean), `pnpm build` (clean, same documented Sanity
  auto-update warning as before, not a regression).
- `cd web && pnpm install --frozen-lockfile` (already up to date), `pnpm build` (clean, 1 page),
  `pnpm check` (0 errors/warnings/hints, 20 files), `pnpm format:check` (clean on a fresh checkout —
  see the new prettierignore issue noted below, reproduced then cleaned up).
- `node scripts/serve-dist.mjs 4321` against a freshly built `dist/`, then Playwright MCP navigation
  + `browser_evaluate` + `browser_resize` at 390×844, 560×900, 768×1024, 1440×900 for real
  `getBoundingClientRect()` measurement of the exact elements VS-02/VS-03 flagged, real DOM inspection
  of the VS-05 `<ul>/<li>` structure, and a live read of the `GapChart` flag text + figure-callout
  text to confirm VS-01 renders real data end-to-end.
- `cd web && pnpm exec playwright install --with-deps chromium`, then `pnpm test:e2e` (killed my own
  manually-started dist server first so Playwright's own `webServer` step built and served
  independently, matching what CI does) → **19 passed (2.8s)**.
- `gh run list --limit 8`, `gh run view 31894636124 --json headSha,conclusion,displayTitle,headBranch`
  — confirmed `headSha: c1186435c7b96b0905f4988f2ca5c497540f9409` (exact current `HEAD`),
  `conclusion: success`.
- `git status --porcelain` before and after — clean; reviewer-generated `test-results/` and
  `playwright-report/` directories removed before finishing.

### Viewports/flows actually tested (real browser)

- **Viewports:** 390×844, 560×900, 768×1024, 1440×900 — the same four this project's own reviews and
  its new Playwright suite standardize on.
- **VS-02:** `.level-row__heading a` ("Blog notes", 4 instances) measured 67.6×44px at all four
  widths; per-row overlap check against `.level-row__body` confirmed ~10px clearance, no visual
  overlap; `scrollWidth === clientWidth` at all four widths.
- **VS-03:** `.site-footer__link` (5 instances) measured 44px tall and full-column-width at all four
  widths (350/512/180/244px across the four breakpoints) — specifically re-checked for the
  `inline-flex`-shrink regression DECISIONS.md §19 admits happened mid-fix, confirmed not present in
  the shipped state.
- **VS-05:** confirmed `<ul>` present with the correct `<li>` count inside both `<nav>` elements
  (1 header, 5 footer), zero `<a>` as direct `<nav>` children, both `aria-label`s unchanged.
- **VS-01:** confirmed the rendered `GapChart` and figure-callout text reflect the CMS/fallback data
  (`OCT 2026` / `FROM 2027` / `SPM` at the correct stop positions, `2` independent checks), not
  hardcoded literals — the full data chain actually executes at render time.

### New issues found this pass (both minor, non-blocking, recorded in `review/bob/CODE-REVIEW.md`'s
2026-08-16 section and `review/bob/APPROVAL-CHECKLIST.md`)

1. `web/.prettierignore` doesn't exclude `test-results/`/`playwright-report/` even though this
   commit's `.gitignore` update does — a local `pnpm test:e2e` run leaves an artifact that breaks the
   next `pnpm format:check` until manually cleaned. Doesn't affect CI (step order avoids it).
2. `studio/schemaTypes/documents/homePage.ts`'s `gapChartAnnotations[].year` sub-field (unchanged by
   this commit, pre-existing since scaffold time) still has no validation restricting it to the 11
   valid stop codes. This was harmless while the field was fetched-and-discarded; this fix commit
   activates the field, so a Studio typo there now silently drops a chart annotation with zero error
   anywhere in the pipeline.

### What this verdict does and does not cover

**Covers:** VS-01 through VS-05 only, all confirmed genuinely resolved by direct re-verification
(diff review + live browser measurement + independent Playwright run + independent CI-status check),
not by trusting `docs/DECISIONS.md` §19's claims.

**Does not cover:** VS-06 through VS-13 (the other 8 P2s) and VS-14 through VS-17 (the 4 P3s) from
the 2026-08-15 review below. These remain open, unchanged, and were not re-checked in this pass — the
fix commit did not touch the areas they concern (JSON-LD, security headers, dependency scanning, font
self-hosting, redirects, the FE self-check gap, the header brand-link tap target, the skip-link tap
target, sitemap/robots/RSS, the FAQ no-JS gap, or the `index.astro` file-size preference). A future
review still needs to clear those before the vertical slice as a whole can be approved. **This is not
full vertical-slice approval.**

---

## 2026-08-15 - Vertical slice development review

Role: Bob, independent development reviewer. Claude is the implementer. Bob did not edit
application code, `docs/DECISIONS.md`, or root `HANDOFF.md`.

Scoped verdict: **Revision required.** This is the first review of the vertical slice (landing page
rendering from the real component tree and local fallback content; no blog routes yet) — it
continues past the already-closed scaffold review below, which covered only tokens/Sanity
wiring/schemas before any real page existed.

Governing guideline: `02-INFORMATIVE-BLOG.md`, guideline_version `1.6.0`. Framework/backend branch:
Astro in `web/`, standalone Sanity Studio in `studio/`, no commerce backend.

Commit reviewed: `770965218abcbc048c1261c9ca0ad3f4b6bb832c` (branch `main`, clean working tree,
confirmed via `git log -1` / `git status`).

### Capabilities and fallbacks actually used

| Capability | Status | Notes |
| --- | --- | --- |
| Bash / Read / Grep / Glob | Available | Used throughout. |
| Playwright (`mcp__plugin_playwright_playwright__*`) | Available | Used for all real-browser verification — no manual-checklist fallback needed. |
| `gh` CLI | Available, authenticated (`charliekhc`) | Used to confirm the CI run for the exact commit under review, not just trust the badge. |
| Docs-lookup MCP (context7 etc.) | Not invoked | Nothing in this pass required a fresh framework-API lookup beyond what the scaffold review already confirmed (Sanity perspectives, unchanged); WCAG 2.2 SC 2.5.8 applied from the same standard the project's own `design/STATES.md` §0 already codifies, not from memory of an unstable API. |
| Lighthouse / Chrome DevTools performance audit | Not available in this session | Performance pass (10) is marked partially unverified — page-weight facts (byte sizes, request counts) were measured directly instead; Core Web Vitals scores were not run and are not asserted. |

### Files/evidence reviewed

- `Setup_Instructions/Guidelines/Web-Development/Web-Development-Guidelines/02-INFORMATIVE-BLOG.md`
  (full read).
- `docs/DECISIONS.md`, `docs/CONTENT-MODEL.md`, `HANDOFF.md` (both pages, full read).
- `design/DESIGN.md`, `design/STATES.md` (tap-target rule, §0 and §2.6), `design/COPY-GAPS.md`
  (unresolved-placeholder check).
- All four prior `review/bob/*.md` files and the pre-existing `BOB-REVIEWER-HANDOFF.md` content
  (preserved below, unmodified).
- `web/src/**` in full: `pages/index.astro`, `layouts/BaseLayout.astro`, all 6 components
  (`SiteHeader`, `SiteFooter`, `WhatsAppCta`, `GapChart`, `SectionMarker`, `LogoLockup`),
  `lib/content/{landingData,defaultLandingData}.ts`, `lib/sanity/{client,queries,types,image}.ts`,
  `styles/**`.
- `studio/schemaTypes/documents/{homePage,redirect}.ts`, `studio/schemaTypes/objects/navItem.ts`.
- `.github/workflows/ci.yml`, `web/astro.config.mjs`, `web/package.json`, both `.env.example` files.
- `web/dist/` after a clean local build (`index.html`, CSS bundle, `og-default.png`).

### Tools and commands actually run

- `git log -1`, `git status`, `git branch -a`.
- `web`: `pnpm install --frozen-lockfile` (already up to date), `pnpm format:check` (clean),
  `pnpm check` (`astro check` — 0 errors/warnings/hints, 17 files), `pnpm build` (clean, 1 page).
- `studio`: `pnpm install --frozen-lockfile` (already up to date), `pnpm format:check` (clean),
  `pnpm typecheck` (clean), `pnpm lint` (clean), `pnpm build` (clean, only the documented Sanity
  auto-update version-drift warning), `pnpm seed:dry-run` (6 categories, 1 author, 3 singletons, no
  writes).
- `gh run list --limit 5`, `gh run list --json headSha,conclusion,workflowName` — confirmed the
  latest run (`31891195182`) is `success` on `headSha 77096521...`, the exact commit under review.
- `pnpm preview --port 4325` in `web/`, then Playwright MCP against the served static build.
- Targeted `rg`/`grep` sweeps: `href="#"` (clean), analytics/`gtag`/`dataLayer` (clean, confirms N/A
  as decided), JSON-LD/`schema.org` (empty — a finding), font-loading (`@font-face`/Google Fonts —
  confirms still-external), security headers (empty — a finding), secret patterns across tracked
  files (clean), `.github/` contents (only `ci.yml`, no Dependabot — a finding).
- A Python one-liner reading the PNG header of `og-default.png` to confirm its real pixel dimensions
  match the `og:image:width`/`height` meta tags (1200×630, confirmed correct).

### Viewports/flows actually tested (real browser, not inferred from markup)

- **Viewports:** 390×844, 560×900 (documented breakpoint), 768×1024, 1440×900.
- **Overflow:** `document.documentElement.scrollWidth === clientWidth` confirmed at all four
  widths; a separate per-element "right edge past viewport" test additionally confirmed the pricing
  table's known/intended horizontal scroll stays contained inside its own `overflow-x: auto`
  wrapper rather than leaking to the page body.
- **Landmarks/headings:** counted `h1`/`main`/`header`/`footer`/`nav` and the full heading-level
  sequence at all four widths — structurally correct, no skipped levels, both `nav`s distinctly
  labelled.
- **Tap targets:** measured every `<a>`/`<button>` under 44px in either dimension at all four
  widths, then re-measured the worst offenders precisely with `getBoundingClientRect()` plus
  computed `min-height`/`padding` to confirm root cause, not just symptom.
- **Keyboard:** real `Tab` traversal through the first 6 focusable elements, confirming order and a
  visible, consistent `2px solid rgb(43, 68, 104)` focus ring on every one; separately confirmed the
  skip link becomes fully visible (`top: 12, left: 12`, no transform) once its transition settles on
  focus.
- **FAQ accordion:** a real click on the third question confirmed correct `aria-expanded` toggling,
  panel `hidden`/`inert` state changes, and exclusive single-open behavior; separately confirmed (by
  reading the server-rendered HTML, not a live no-JS browser run) that 12 of 13 panels ship `hidden`
  with no non-JS fallback path.
- **Contrast:** sampled and computed actual contrast ratios (alpha-composited against the true
  ancestor background, not assumed) for 11 selectors across dev-authored areas not previously
  checked at the code level — footer links/contact/brand copy, level-row links, trust-band text,
  pricing table cells, gap-chart axis labels, FAQ buttons, availability card, portrait fallback.
  Lowest ratio found: 5.90:1 (large text) — no contrast failures.
- **Reduced motion:** emulated `prefers-reduced-motion: reduce` and confirmed the session-card hover
  transition duration collapses to `0s`.
- **Console/network:** zero console errors, zero page errors, zero failed requests, zero non-2xx
  responses across the full page load at 1440px, including the real external Google Fonts requests
  (which do succeed — 8 requests, 2 CSS + 6 unique woff2 files after dedup).

### Resolved from the scaffold review (re-verified independently, not trusted from the record)

All ten scaffold-stage findings (2 P1, 7 P2, 1 P3) remain closed on independent re-check: the
published/preview Sanity client split, `href="#"` absence, navItem/redirect URL allowlisting,
explicit CMS result types, explicit GROQ projections, slug validation, Studio dependency pinning,
project-specific READMEs, the scaffold FE self-check's continued presence, and byte-identical
tokens. Nothing regressed.

### Open findings, this review (full detail and evidence in `review/bob/CODE-REVIEW.md`)

**P1 (4, all new to this vertical slice — none present at scaffold stage):**

- VS-01: `GapChart.astro` hardcodes chart data that `homePage.problem.gapChartAnnotations` already
  models, is already fetched by `queries.ts`, and is already typed — the CMS field is fetched and
  then silently discarded. Several other on-page figures (24, 2, 20, 30, the availability time
  blocks) are likewise hardcoded literals duplicating facts already present in editable prose
  fields, creating real content-drift risk once the dataset is seeded and edited.
- VS-02: "Blog notes" level-to-category links measure 67.6×16.8px — fails both WCAG 2.2 SC 2.5.8 AA
  and the project's own `design/STATES.md` §0 ≥44×44 rule, at every tested viewport.
- VS-03: Footer navigation links measure ~350×18.2px — same failure, shared component, ships on
  every future page.
- VS-04: No Playwright suite exists anywhere in the repository. `@playwright/test` was explicitly
  earmarked in `docs/DECISIONS.md` §4 to be added with this exact vertical slice, and was not. All
  browser verification in this review was performed ad hoc by Bob and is not committed, repeatable,
  or CI-enforced.

**P2 (9):** header/footer nav not marked up as lists (FE-04); 12 of 13 FAQ answers unreachable
without JS (FE-32); no JSON-LD anywhere; no security headers configured; no dependency/advisory
scanning in CI; fonts still loaded from Google Fonts, not self-hosted (previously known, confirmed
still open); old-site redirects still not implemented as executable config despite three of six
targets now genuinely existing on the real page (previously known, confirmed still open); no
vertical-slice FE self-check recorded in `docs/DECISIONS.md` (repeat of a gap the scaffold review
already caught once); header brand/logo link at 114×40.3px, under the house 44×44 rule by ~4px.

**P3 (4):** skip link 1.6px short of the house 44×44 rule; sitemap/robots/RSS still not wired
(expected-incomplete at this stage, not a regression); FAQ accordion could be native
`<details>`/`<summary>` (would also fix VS-06); `index.astro` is a large single-file component (no
duplication found, just a size/maintainability note for later).

### Disagreements

None with the implementer's own record — every claim in `HANDOFF.md`/`docs/DECISIONS.md` checked in
this pass was found accurate. The disagreement, if any, is with the completeness of what was
delivered relative to the guideline's Section 19 MUST for this exact stage (Playwright), not with
anything Claude claimed was true.

### Residual unverified risk

- **Performance (Lighthouse/Core Web Vitals):** not run — no Lighthouse/DevTools tool was available
  in this session. Page-weight facts were measured directly instead (47,115-byte HTML, 44,197-byte
  CSS, zero client JS beyond a small inline script) and are a reasonable proxy, but LCP/CLS/INP
  numbers themselves are unverified.
- **No-JS FAQ behavior:** established by reading the server-rendered HTML's `hidden` attributes, not
  by running an actual browser session with JavaScript disabled. The conclusion (12 of 13 panels
  unreachable) follows directly from the markup and script logic and is not expected to change under
  a literal no-JS run, but that literal run was not performed.
- **Branch protection:** confirmed still blocked by GitHub's Free org plan (403 on both APIs), which
  is the owner's explicit, already-accepted tradeoff per `docs/DECISIONS.md` §18 — restated here as
  a residual risk (an unprotected `main` relying on team discipline alone), not reopened as a
  finding.

### Prioritized next steps for the implementer

1. Fix the two tap-target regressions (VS-02, VS-03) and the header logo (VS-13) — mechanical
   `min-height` additions, same technique already used and verified elsewhere in this codebase.
2. Wire `GapChart` to the CMS field that already exists for it (VS-01), and record a decision for
   the other hardcoded figures.
3. Install `@playwright/test`, write a suite covering at minimum overflow/tap-targets/landmarks/
   keyboard/FAQ, wire it into CI (VS-04).
4. Work through the P2 list (nav list markup, FAQ no-JS fallback, JSON-LD, security headers,
   advisory scanning, font self-hosting, redirects, FE self-check) before the next review.
5. Record a vertical-slice FE self-check in `docs/DECISIONS.md` before requesting the next review,
   per guideline Section 9.

### Artifacts updated by Bob

- `review/bob/CODE-REVIEW.md` (new dated section at top; scaffold section preserved below as
  history).
- `review/bob/FE-GATE-AUDIT.md` (new dated section at top; scaffold section preserved below).
- `review/bob/APPROVAL-CHECKLIST.md` (new dated section at top; scaffold and design sections
  preserved below).
- This handoff section.

---

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
