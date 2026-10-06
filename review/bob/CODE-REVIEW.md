# Bob Code Review — Just Math Malaysia Vertical Slice Review

## 2026-10-03 — PR #119 post-merge and Studio-deploy report

GitHub confirms PR #119 merged on 2026-10-03 at 15:27:36 UTC as `6bc0f8ab9def23e049506ac65ac971d31f090edc`; local `main` matches `origin/main` at that commit. The exact PR head was `bbb15116e557ed93965fbddcb48be4811ca16fc1`, which Bob **explicitly re-reviewed and approved** after the docs-only main merge. Andy reports `pnpm deploy` in `studio/` printed “Deployed 1/1 schemas” and a successful Studio URL. Bob did not run that deploy. A read-only request to `https://justmath.sanity.studio/` returned a 302 to Sanity's hosted Studio/auth flow, with a `Last-Modified` timestamp after the merge; this confirms the endpoint responds, not which validation code a signed-in editor sees. The hosted `/blog` error check remains optional post-deploy observation.

### [P3] Gitignored #119 merge log misstates Bob's approval head

`log/2026-10-03_PR119_redirect-target-trailing-slash.md:20-21` says Bob approved only `c56f045` and `bbb1511` was pushed after that approval. The dated reviewer record immediately below this section and the prior assistant verdict show Bob approved **both** `c56f045` and exact head `bbb1511` before the user merged. Andy owns correction of those two log lines. The `log/` folder is gitignored; Bob cannot edit it under Rule 0. This record error does not reopen the merged PR's source verdict.

**Scoped verdict: Approved** remains in force for the merged implementation. No new code or production defect was found in this post-merge check. Bob did not merge, deploy, create a Sanity draft, or edit Andy-owned files.

---

## 2026-10-03 — PR #119 merged-main re-review at `bbb1511`

Reviewed exact open PR #119 head `bbb15116e557ed93965fbddcb48be4811ca16fc1` against previously approved `c56f0452d9349960e922f67546eafffd5c26425f` and current PR base `a292b14497734900a464497ef66abffb915649cf`. Merge commit `bbb1511` brings in only 24 lines in `docs/DECISIONS.md` §46 from merged PR #118. Bob inspected that delta and confirmed §46, §47, §48 remain in order; no application, Studio schema, validator, test, configuration, or other decision text changed relative to approved `c56f045`. `git diff --check` passes for both the merge delta and the current PR diff. The PR is open and mergeable; exact-head GitHub `web`, `studio`, and Workers Builds checks all pass.

The independent source/guard/schema checks and Charlie's attributed live Studio evidence from the `c56f045` approval therefore carry forward unchanged. The imported §46 production-verification record was independently reviewed and approved as PR #118 at `adad45d`, and GitHub confirms #118 merged as `a292b14`. No scoped finding remains open. **Verdict: Approved** for Charlie's manual merge of PR #119 at `bbb1511`. After merge, deploy Studio to make the new publish-time rule available in the hosted editor. Bob did not merge, deploy, commit, write Sanity content, or edit Andy-owned files.

---

## 2026-10-03 — PR #119 final-head re-review at `c56f045`

Reviewed exact open PR #119 head `c56f0452d9349960e922f67546eafffd5c26425f` against previously reviewed `df7b9a6dee382bdaa3dd19e4078ff83824625a08` and actual PR base `f9cd4d24687fb220ec798a4afa5b736efb841387`, under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. Intermediate commit `dad584b` changes Studio/build validation, parity/guard tests, field guidance, and docs to reject this site's apex and `www` absolute URLs. Final commit `c56f045` adds only the live Studio evidence record in §48. `git diff --check` passes; exact-head `web`, `studio`, and Workers Builds checks pass.

### Closure of the previous P2

Both validators now parse the hostname of an `https://` target and reject `mathematicsmalaysia.com` and `www.mathematicsmalaysia.com`, including case, trailing-dot, and port variants, with guidance to use a relative path. They allow genuinely different hosts. Bob inspected the two implementations, ran the web merge guard, Studio validation guard, and Sanity schema validation (0 errors, 0 warnings), and directly probed `/blog`, `/blog/`, `/#pricing`, the site's apex/`www` full URLs, and an external URL. Studio rejects `/blog` and both own-host full URLs; the build skips the own-host examples and emits the external one. The Studio guard's first sandbox attempt hit `tsx` IPC `EPERM`; its approved rerun passed. The parity table now includes the own-host and look-alike cases. **The P2 same-site absolute-URL bypass is resolved.** Bob did not independently run Andy's Sanity-backed build.

### Closure of the live editor-flow gate

§48 records Charlie's manual test in local Studio at `dad584b` against the production dataset. As reported to Andy, Charlie said the requested steps were “all expected”: `To /blog` and `To https://mathematicsmalaysia.com/blog/` showed errors and blocked Publish; changing `To` to `/blog/` cleared the errors; the temporary draft was deleted without publishing and the redirect list was checked. This is Charlie's report relayed by Andy, **not Bob's direct observation**. The record does not give exact error wording, a screenshot, or the list contents. Together with Bob's independent source, guard, and schema checks, this is sufficient to close the scoped pre-merge Studio evidence gate. No source/schema file changed after the tested `dad584b` head.

**Scoped verdict: Approved** for Charlie's manual merge of PR #119. No scoped P0/P1/P2/P3 finding remains open. Deploy the revised Studio schema after merge before relying on its new publish-time rule. PR #118 remains a separate, previously approved docs PR awaiting Charlie's merge. Bob did not merge, deploy, create/edit Sanity content, commit, or modify Andy-owned files.

---

## 2026-10-03 — PR #119 redirect-target rule at `df7b9a6`

Reviewed exact open PR #119 head `df7b9a6dee382bdaa3dd19e4078ff83824625a08` against base `f9cd4d24687fb220ec798a4afa5b736efb841387`, under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. The seven-file diff adds a trailing-slash-or-file rule in Studio and build validation, parity/guard cases, field guidance, and §48/content-model documentation. `git diff --check` passes; exact-head GitHub `web`, `studio`, and Workers Builds statuses are successful. Bob independently ran the web merge guard, Studio validation guard (its first attempt hit sandbox `tsx` IPC `EPERM`; the approved rerun passed), and Sanity schema validation (0 errors, 0 warnings). Bob did not rerun a Sanity-backed site build; Andy reports three applied Sanity redirects and one expected `/pricing/` skip because the static rule owns that exact source. That duplicate is a content-cleanup choice, not a functional failure in this PR.

The relative-path cases work in source and tests: `/blog` is rejected, while `/blog/`, `/#pricing`, `/blog/?page=2`, and `/logo.png` pass. Studio and build agree for the tested table. Cloudflare's current [Static Assets HTML-handling documentation](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/) describes the automatic slash redirect for a folder index; Bob also observed live `/blog` return `307 Location: /blog/`.

### [P2] Same-site absolute URLs bypass the new one-hop rule

- **Category:** objective validation gap / incomplete task correction.
- **Evidence:** both validators classify every `https://` target as external and apply `pathIsSettled` only when the target starts with `/`. Bob directly invoked `validateRedirectTo('https://mathematicsmalaysia.com/blog', '/old')`; it returned `true`. `mergeRedirects('', [{from:'/old',to:'https://mathematicsmalaysia.com/blog'}])` emitted `/old https://mathematicsmalaysia.com/blog 301` with no skipped item. The live destination `/blog` returns a further `307` to `/blog/`. A `www.mathematicsmalaysia.com` absolute target can also encounter the existing www-to-apex rule. The parity table cannot catch this because both validators accept it.
- **Failure scenario:** an editor copies this site's full `/blog` URL into `To` instead of the relative path. Studio permits Publish and the build emits the rule, recreating the two-hop failure the PR is meant to prevent.
- **Required correction / owner:** Andy treats the site's apex and `www` absolute URLs as internal for this rule, or rejects same-site absolute targets with actionable guidance to use a relative path. Keep genuinely external `https://` URLs allowed. Add apex and `www` bypass cases to Studio, build, and parity tests; update §48 and the content model to state the precise policy.
- **Status:** open.

### Remaining evidence and verdict

The new validation message and blocked Publish state have not been observed in local Studio. After Andy resolves the P2, Charlie can test the revised head in local Studio or explicitly authorize Andy one temporary unpublished production-dataset redirect draft. Verify `To /blog` displays an error and blocks Publish, `To /blog/` clears it and makes Publish available, then delete without publishing and check the redirect list. Bob cannot write Sanity under Rule 0. **Scoped verdict: Blocked** on essential live Studio evidence, with the P2 source correction required before an eligible merge review. No P0/P1 finding is open. PR #118 is a separate approved, still-open docs PR; Bob did not merge either PR, deploy, or edit Andy-owned files.

---

## 2026-10-03 — PR #118 redirect production-verification record at `adad45d`

Reviewed exact open PR #118 head `adad45d5ee497a526e7f348255d5226fd8793b21` against base `f9cd4d24687fb220ec798a4afa5b736efb841387`, under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. The PR changes only `docs/DECISIONS.md` §46; `git diff --check` passes. Exact-head GitHub `web`, `studio`, and Workers Builds statuses are successful. No code changed, so Bob did not rerun the application test suite for this documentation-only PR.

Bob independently checked production: `/blogs` and `/blogs/` each return `301 Location: /blog/` and reach a 200 page after one redirect; `/pricing` and `/pricing/` each return `301 Location: /#pricing` and reach the homepage after one redirect. This closes the previously open `/blogs/` P2 production coverage gap. `https://www.mathematicsmalaysia.com/` returns one `301` to the apex and reaches 200. The rule's dashboard location, phase, and creation date are supported by the dated internal `HANDOFF.md` entry at lines 130–145, not by Bob viewing the current Cloudflare dashboard. §46 appropriately distinguishes that provenance.

Bob independently ran `pnpm exec sanity hooks logs`: 09:38:20Z and 09:43:59Z entries returned success/200. A filtered detailed-log read identified `_type: 'redirect'` for both entries. This establishes that redirect-document events reached the Sanity webhook. The live changed redirect output and Charlie's report of no manual build support the §46 end-to-end editorial-flow conclusion. Bob did not inspect a matching Cloudflare deployment record because Wrangler access under the current OAuth account failed per Andy's report; the log does not itself supply a deployment ID. §46 discloses this limitation. The www rule's live effect was directly checked; the rule's current dashboard configuration was not.

**Scoped verdict: Approved** for Charlie's manual merge of this documentation-only PR. No finding in the PR #118 diff remains open. The separate P2 source-prevention gap in `mergeRedirects.ts` remains: an editor can still choose an uncanonicalized internal target such as `/blog` and create a Cloudflare 307 second hop. Andy owns that future guard or editor guidance; this documentation PR does not claim to fix it. Bob edited only reviewer outputs, and did not merge, deploy, write Sanity content, or modify `docs/DECISIONS.md` or application code.

---

## 2026-10-03 — `/blogs/` trailing-slash source follow-up

Bob checked production: `/blogs/` returns `404`, while `/blogs` returns one-hop `301 Location: /blog/`. These are distinct source paths in the current redirect setup. Studio's `validateRedirectFrom` and the build's `validate` both accept the literal `/blogs/` as a source, distinct from `/blogs`. The safe content correction is a **new** Sanity Redirect document, `From: /blogs/`, `To: /blog/`, permanent 301; keep the existing `/blogs` document. After publication and deployment, verify each source independently reaches `/blog/` in one hop. Bob did not create the document.

The current editor/build rules intentionally reject `*` and `:` in `From`, and they do not provide regex syntax. [Cloudflare's `_redirects` format](https://developers.cloudflare.com/workers/static-assets/redirects/) supports splats and placeholders, but a splat is greedy and could also catch descendants beyond these two intended URLs. Two exact rules are proportionate and reviewable. **P2 production coverage gap open** until `/blogs/` is redirected. The separate canonical-target prevention gap recorded below also remains open for Andy.

---

## 2026-10-03 — `/blogs` one-hop live retest

After Charlie reported changing the Sanity target to `/blog/`, Bob first observed the old `301 /blog` live response at 09:29:28 UTC. On the next check, the live response had changed: at 09:30:14 UTC both HEAD and GET returned `301 Location: /blog/`, and a following GET ended at `/blog/` with `200` after exactly **one redirect**. The concrete `/blogs` production one-hop defect recorded below is **resolved**. This is direct HTTP evidence, not a Sanity document or deployment-log inspection. The change appearing shortly after Charlie's edit is consistent with the reported publish/build path, but Bob has not correlated a particular hook delivery and build with this edit.

The general prevention gap remains: `mergeRedirects.ts` checks explicit `_redirects` chains but cannot detect Cloudflare's automatic trailing-slash redirect for a target such as `/blog`. Andy owns a guard or editor-facing canonical-target rule and regression test if the §46 one-hop promise is to hold for future editor redirects. **P2 source prevention finding remains open; the specific live route is fixed.** Bob did not change Sanity, code, docs/DECISIONS.md, or deployment settings.

---

## 2026-10-03 — PR #115 post-merge redirect operation

This is a production follow-up to the already merged PR #115, not a change to its prior pre-merge approval. Bob made read-only live HTTP requests on 2026-10-03: `/blogs` returned `301 Location: /blog`; `/blog` returned `307 Location: /blog/`; `/blog/` returned `200`. A GET following redirects ended at `/blog/` after **two redirects**. Both `/pricing` and `/pricing/` returned `301 Location: /#pricing` in one hop. `/blogs` is absent from the repository's static `web/public/_redirects`; the live rule is consistent with the reported Sanity-managed redirect being deployed, but HTTP alone cannot identify which build or webhook caused it.

### [P2] Live `/blogs` redirect violates the one-hop rule

- **Category:** production behavior / one-hop redirect correctness.
- **Gate:** governing guideline CORE-20 and `docs/DECISIONS.md` §46's one-hop contract.
- **Evidence:** the live chain above. `web/src/lib/content/mergeRedirects.ts` checks whether `c.to` is a source in its explicit `taken` set; `/blog` is absent from that set, but the deployed site redirects it to `/blog/`. `web/wrangler.jsonc` does not override HTML handling; [Cloudflare's Static Assets HTML-handling documentation](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/) describes the default automatic trailing-slash redirect for folder index assets. This matches the observed `307`.
- **Impact:** visitors and crawlers make two redirect requests where the project's redirect contract promises one.
- **Required correction:** Charlie changes the Sanity document's `To` from `/blog` to `/blog/`, publishes it, waits for the next deployment, then checks `/blogs` returns a single `301` directly to `/blog/` and the destination returns `200`. Andy should extend the source/build guard or editor guidance to account for canonical site paths, with a regression case for this failure mode; the current explicit-rule chain test cannot catch it.
- **Status:** open; no Sanity edit was made by Bob.

Andy reports two Sanity webhook deliveries returned HTTP 200 at 01:05:11Z and 01:05:19Z, but could not associate either with the `/blogs` publish. He reports `wrangler deployments list` failed with authentication code 10000 for an account without Worker access. Bob did not run either CLI. The live rule establishes a deployed redirect, while redirect-specific webhook causality remains unproven from the supplied logs. Wrangler access is optional for fixing and retesting this route; no account change is needed for Bob's HTTP check. Bob did not edit application code, decisions, Sanity, or deployment configuration.

---

## 2026-10-03 — PR #114 final-head Studio-evidence re-review at `01a8a7a`

Reviewed exact open head `01a8a7ac64b8c08307677a8a80c7360ca0789a8d` against previously reviewed `f27f83e4f72ecd8a0a36ec1fb6b52ac841d55afe`, under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. The only delta is nine added/replaced lines in `docs/DECISIONS.md` §47; no application, schema, test, or deployment file changed. `git diff --check 4eb2672...HEAD` passes. GitHub's exact-head PR status rollup reports `web`, `studio`, and Workers Builds successful. The independent source, schema, guard, and focused-browser results from the `e8c905d` review remain applicable; Bob did not rerun them for this documentation-only commit.

### Closure of the live Studio evidence gate

§47 now records Charlie's 2026-10-03 manual check in local Studio on the feature branch at `f27f83e`, using the production Sanity dataset. Charlie's report, as relayed by Andy, says steps 4–7 were “all expected”: H2 title/H4 questions blocked Publish, a blank answer blocked Publish, H2/H3 with a real answer cleared the errors, nothing was published, and the temporary draft was deleted. This is secondhand evidence, **not Bob's observation**. The record does not give exact error text, a screenshot, or the post list contents. “All expected” refers to the previously specified valid-state Publish availability and post-list check, but those two observations are less explicit than the invalid-state observations. Given the targeted manual check and Bob's prior independent source/tests, the evidence is sufficient to close the scoped pre-merge editor-flow gate. It does not prove a Studio-authored FAQ renders on the public site or VoiceOver/NVDA behavior.

The prior P1/P2/P3 findings remain closed and no scoped finding is open. **Verdict: Approved** for Charlie's manual PR #114 merge. Approval is not a merge or deployment instruction from Bob; the user controls both. After merge, deploy the updated Studio schema and verify a real authored FAQ when a suitable post is published. Bob did not create/edit Sanity content, commit, merge, deploy, or edit Andy-owned files.

---

## 2026-10-02 — PR #114 documentation cleanup at `f27f83e`

Reviewed exact open head `f27f83e4f72ecd8a0a36ec1fb6b52ac841d55afe` against previously reviewed `e8c905da8f0c8edb8069e2d4bdc34b144ebb4238`. The only delta removes the extra blank EOF line in `docs/DECISIONS.md`; `git diff --check 4eb2672...HEAD` is clean. The previous P3 whitespace finding is closed. No FAQ implementation or test file changed, so the source and focused-browser conclusions of the `e8c905d` review carry forward without claiming a new runtime test.

The PR's exact-head status rollup reports `web`, `studio`, and `Workers Builds: justmathwebsite` successful at `f27f83e`. A direct GitHub check-runs query also confirmed all three succeeded at `e8c905d`. The earlier missing Workers status was a `gh pr checks` listing gap, not a missing or failed build. Bob did not independently run a Cloudflare build or open its dashboard artifact.

**Scoped verdict: Blocked** solely on the revised FAQ's live Studio editorial-flow evidence. No P0/P1/P2/P3 source finding remains open. Charlie can test in local Studio at this head or expressly authorize Andy to create and delete one temporary unpublished post draft in the production dataset. Observe FAQ insertion and controls; H2/H4 skipped-level and blank-answer errors each blocking Publish; valid H2/H3 with substantive answer clearing the errors and making Publish available; then delete the draft without publishing and verify the post list. Record who observed it and the tested head. Bob cannot write Sanity under Rule 0 and has not observed this flow. VoiceOver/NVDA and a Studio-authored published FAQ also remain unverified; they are separate from this pre-merge gate. Bob did not merge, deploy, commit, or edit Andy-owned files.

---

## 2026-10-02 — PR #114 FAQ correction re-review at `e8c905d`

Reviewed exact open head `e8c905da8f0c8edb8069e2d4bdc34b144ebb4238` against merged PR base `4eb267247f8d011e70d4472d2340fd28a73e12bf` under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. The local `main` ref is stale, so Bob used the actual PR base and the `e8c905d` correction delta. PR #115 is merged into this branch. Exact-head GitHub checks show `web` and `studio` passing; a Workers Builds check is absent from the returned check list. The GitHub `web` job runs `pnpm build` and the full Playwright suite. Bob independently ran `pnpm test:post-heading-ids`, `pnpm test:faq-validation`, `pnpm exec sanity schema validate` (0 errors, 0 warnings), and 14 focused FAQ/contents Playwright tests against a fresh build; all passed. The Studio guard's first sandbox attempt hit `tsx` IPC `EPERM`; the approved rerun passed. No live Studio FAQ was edited by Bob.

### Closure of the three previous findings

- **P1 FE-06 skipped heading — resolved in source and built browser tests.** `studio/schemaTypes/lib/faqValidation.ts:24-38` requires a question level exactly one below the title; `portableTextObjects.ts` binds the rule as an error and offers only H3–H5. The renderer derives the question rank from the title for older/script-written data. The fixture's second FAQ is H3/H4. The guard tests valid H2/H3, H3/H4, H4/H5 and invalid gaps. The focused browser tests pass.
- **P2 blank answer — resolved in source and guard.** `validateFaqAnswer` checks trimmed text runs or nonblank inline maths; `portableTextObjects.ts` attaches it after the array's required/minimum rule. Empty paragraphs and whitespace fail; maths-only and real text pass in the guard. Whether this message is visible and publish-blocking in the nested Studio editor remains a live-flow check.
- **P2 contents-list decision mismatch — resolved.** `postHeadings.ts:38-50,107-118` adds a visible FAQ's H2–H4 title through the same unique-id pass as ordinary headings; `FaqAccordion.astro` consumes that id and shared title-level helper. The guard covers collisions and hidden/empty FAQs; focused TOC browser tests pass. Inclusion follows the existing §42 decision, so no new owner preference decision is needed to keep it.

### [P3] PR diff has a trailing blank line

`git diff --check 4eb267247f8d011e70d4472d2340fd28a73e12bf...HEAD` reports `docs/DECISIONS.md:2829: new blank line at EOF.` This is minor document cleanup for Andy; it has no FAQ runtime effect. Re-run the diff check after removal.

### Remaining evidence and verdict

The revised FAQ's actual Studio insert/edit/validation path has not been observed. The earlier table PR showed that schema and fixture tests can pass while an editor control is unreachable, so this remains a pre-merge evidence gate for this new editor feature. Use local Studio from this PR head (hosted Studio may have the prior schema), create one temporary **unpublished** post draft only with Charlie's authorization or have Charlie do the test, and populate other required post fields. Verify the FAQ insert menu, title and level controls, question/answer editing, H2/H4 skipped-level error and blocked Publish, blank-answer error and blocked Publish, then valid H2/H3 with a substantive answer clearing the FAQ errors and making Publish available. Do not publish; delete the draft and verify the original post list. Record the exact head and non-sensitive observed result. Bob cannot write Sanity under Rule 0. VoiceOver/NVDA and a real published FAQ remain unverified; Chromium's heading exposure is not a screen-reader check.

Workers Builds did not report on this head when checked; `web` and `studio` passed. Confirm whether Cloudflare runs a PR build for this head or provide equivalent Cloudflare build evidence before merge. The absent status is an evidence gap, not a claimed Cloudflare failure. **Scoped verdict: Blocked** on live Studio editorial-flow evidence, with the missing Workers check to reconcile and P3 whitespace cleanup. No P0/P1/P2 source finding remains open. Bob did not merge, deploy, commit, or edit application code, docs, the project handoff, or Sanity content.

---

## 2026-10-02 — PR #115 final-head re-review at `4a9dd00`

Reviewed exact open head `4a9dd00734b46a8de89c6c4eab6f4a81d8281770` against previously reviewed `5ebe9f2e7a5d94e09503fe7694b2e4747b275bb8`. The only delta is nine added lines in `docs/DECISIONS.md` §46; `git diff --check` passes. Exact-head `web`, `studio`, and Workers Builds checks pass. No application code, schema, test, or deployment setting changed, so the independent source, validator, schema, and direct-probe results from the `5ebe9f2` review remain applicable.

### Closure of the editor-flow evidence gate

`docs/DECISIONS.md` §46 now records Charlie's dated manual test using local Studio on branch `feat/sanity-redirects` at `5ebe9f2` against the production dataset. Charlie reports that a temporary redirect draft with trailing-space `From` `/pricing ` showed an error and blocked Publish; changing it to valid `/review-test` → `/blog/` cleared the error and made Publish available; the valid draft was **not** published, was deleted, and the redirect list was checked. This is Charlie's report relayed by Andy, **not Bob's direct observation**; no screenshot, recording, or Sanity audit log was supplied. The record is specific enough to close the missing-UI-evidence blocker for this scoped pre-merge gate when combined with Bob's prior independent source/schema/test checks. The `/` invalid-source case was unit-tested but not exercised in live Studio; the one observed trailing-space case is sufficient for the earlier P1's concrete failure scenario.

The four earlier findings remain resolved. No scoped P0/P1/P2/P3 finding remains open. No PR #115 redirect was verified on the deployed Worker, and no `redirect` document publish was observed triggering the Sanity webhook; those are operational checks after Charlie's merge and deploy. The existing `/pricing/` rule must retain its 301 while the new `/pricing` rule produces its own one-hop 301.

### Scoped verdict

**Approved** for the next gate: Charlie's manual merge of PR #115. This approval does not certify the new redirect on production or redirect-specific webhook delivery. Bob did not create a Sanity draft, commit, merge, deploy, or edit application code.

---

## 2026-10-02 — PR #115 redirect re-review at `5ebe9f2`

Reviewed exact open head `5ebe9f2e7a5d94e09503fe7694b2e4747b275bb8` against prior reviewed `02b7e9299957451b474b2ada85488b24c79a1cd3`. Nine-file follow-up; `git diff --check` passes. Exact-head `web`, `studio`, and Workers Builds checks pass. Bob independently ran `pnpm test:merge-redirects`, `pnpm test:redirect-validation` (the first attempt hit sandbox tsx IPC `EPERM`; the approved rerun passed), and `pnpm exec sanity schema validate` (0 errors, 0 warnings). Bob also invoked both validation functions and the merge directly for the prior failure inputs. [Sanity's validation documentation](https://www.sanity.io/docs/studio/validation) confirms custom field rules receive `context.document` and error-level validation blocks publishing; the UI effect here has not been observed in Studio.

### Re-verification of the four previous findings

- **P1 Studio/build disagreement — resolved in source and tests.** `studio/schemaTypes/documents/redirect.ts:1-26` attaches `validateRedirectFrom` and `validateRedirectTo`, with the latter reading `context.document.from`. `studio/schemaTypes/lib/redirectValidation.ts:24-52` rejects entry-local invalid cases. `studio/scripts/assert-redirect-validation.ts` checks valid and invalid cases; `web/scripts/assert-merge-redirects.mjs` compares both validators over the same input table. Bob's direct probe found `/pricing ` rejected in Studio and skipped by the merge, while `/pricing` → `/#pricing` passed both. **Live Studio Publish blocking is still unverified**, so this closure is limited to source/test behavior.
- **P2 unsupported source rules/line length — resolved.** `web/src/lib/content/mergeRedirects.ts:68-83` now rejects `?`/`#` sources and a declaration over 1,000 characters. Bob's direct probes confirmed both are skipped and not counted as applied; valid `/pricing` is counted. Tests cover exactly 1,000 and one character over.
- **P2 duplicate 301/302 status — resolved.** `mergeRedirects.ts:109-115` sorts by status after source and target, so 301 wins. Bob reversed two same-source/same-target documents and got `/dup /new 301` both times; the revised guard asserts the same.
- **P3 webhook note — resolved in the decision record.** `docs/DECISIONS.md` §46 now references §35's dated end-to-end publish/hook/deploy evidence and §39's single current-project hook, while explicitly leaving redirect-document trigger behavior and current dashboard settings unverified. Andy reports `npx sanity hooks list` still shows the hook on 2026-10-02; Bob did not independently run that CLI or inspect its dashboard settings.

### Essential evidence still missing

No one has opened the revised redirect form in live Studio and attempted an invalid publish. Source binding, schema validation, and pure-function parity tests cannot prove that an editor sees the message and Publish remains blocked in the actual form. The earlier P1 was specifically an editorial publish-flow defect, so the requested manual check remains a pre-merge evidence gate. Bob cannot create or modify a production Sanity draft under Rule 0. Andy may do one controlled temporary-draft test only with Charlie's explicit authorization, or Charlie may test it directly. Use **local Studio running the PR head** against the production dataset; the hosted Studio may still have the pre-merge schema. Test `/pricing ` (trailing space) and `/` as invalid sources, observe the messages and blocked Publish, then enter valid `/review-test` → `/blog/` values in the same draft and confirm validation clears and Publish becomes available; delete the draft **without publishing** and verify the redirect list. Record non-sensitive evidence and exact commit tested. Publishing valid `/pricing` would create a duplicate of the existing Sanity source. The separate post-merge operational check is one redirect edit → Sanity hook → Cloudflare build → live HTTP response, including both `/pricing` and `/pricing/`.

Bob did not rerun the full Playwright suite or a Sanity-backed site build at this head; exact-head CI is green, and Andy reports a local build adding `/pricing /#pricing 301`. No live Worker response from this unmerged head has been verified.

### Scoped verdict

**Blocked** on the missing live Studio publish-flow evidence. The four source/documentation findings are closed at this head; no new P0/P1/P2/P3 source finding is open. After the manual form check, Bob will inspect its evidence and current head before issuing an eligible verdict. Bob did not merge, deploy, write Sanity content, or edit Andy-owned files.

---

## 2026-10-02 — PR #115 Sanity redirects at `02b7e92`

Reviewed exact open head `02b7e9299957451b474b2ada85488b24c79a1cd3` against `main` `e677a43be185abbf40dfb40ebfdf63734cf224b0` under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. This is a scoped pre-merge feature review. All three exact-head GitHub checks pass. Bob independently ran `git diff --check`, `pnpm test:merge-redirects` (pass), and `pnpm build` (pass, but the local config process had no Sanity environment variables and retained only static redirects). Bob did not access the Sanity dashboard or make a production-dataset write. Andy's production-dataset build result is his report, not Bob's independent build result. Cloudflare's current [Workers Static Assets redirect documentation](https://developers.cloudflare.com/workers/static-assets/redirects/) confirms `_redirects` parsing, first-rule precedence, supported destination fragments, unsupported source query matching, and the 1,000-character declaration limit.

### [P1] Studio accepts redirects the build silently discards for editors

- Category: objective defect / content-model mismatch
- Gate: guideline §20 editorial publishing flow; P1 task completion
- Evidence: `studio/schemaTypes/documents/redirect.ts:8-29` validates `from` only with `startsWith('/')` and `to` only with `startsWith('/')` or `startsWith('https://')`. It therefore accepts `/pricing `, `/`, `/blog/*`, `//host`, and a `to` value with a space. `web/src/lib/content/mergeRedirects.ts:47-67` rejects those entries; `sanityRedirectsIntegration.ts:58-67` logs a warning and continues the build. The editor does not see the build log or a publish-blocking error. The content model §9 still describes the weaker Studio rules.
- Failure scenario: an editor accidentally leaves a trailing space in `from`, publishes, and sees a successful Studio publish and site build, but no redirect appears on the live site.
- Why it matters: this feature promises editor-managed redirects. A common typo becomes a successful-looking publish with no working redirect, so the basic editorial task can fail without feedback to the person who can correct it. Build-time rejection is a sound defense, but cannot replace Studio validation of entry-local rules.
- Required correction: make Studio block publication for the build's entry-local invalid cases (single leading slash, non-root source, no whitespace/control characters or wildcard/placeholder syntax, valid target, no self-loop). Keep the build validator as a second boundary. Add Studio validation tests and one manual editor check. Cross-document duplicates/chains can remain build warnings if the limitation and owner action are clear.
- Owner: Andy
- Verification: inspect and run the new Studio rule tests; in Studio, confirm `/pricing ` and `/` cannot publish, while a valid `/pricing` → `/#pricing` can.
- Status: open

### [P2] The merge counts unsupported Cloudflare source rules as applied

- Category: objective defect
- Gate: redirect correctness / guideline §20
- Evidence: `mergeRedirects.ts:47-68,126-128` rejects whitespace but does not reject `?` or `#` in `from`, or enforce Cloudflare's 1,000-character per-declaration limit. Bob directly invoked `mergeRedirects`: `/old?ref=1` and `/old#part` were reported in `applied`, and a 1,207-character line was emitted and reported as applied. Cloudflare documents that source fragments are not evaluated, source query-parameter matching is unsupported, and declarations over 1,000 characters exceed its limit. The committed guard script has no cases for these inputs.
- Failure scenario: an editor enters a query-specific old URL or a very long source/target; the build reports one redirect added, but Cloudflare cannot apply the intended rule.
- Why it matters: the build success count is not evidence of a usable redirect for these editor inputs.
- Required correction: reject unsupported `from` query/fragment syntax and over-limit emitted lines, with explicit reasons and tests. Do not claim a successful redirect merely because a line was written.
- Owner: Andy
- Verification: direct validator tests for query, fragment, and exactly-at/over-limit declarations; inspect the generated file and a Cloudflare preview if available.
- Status: open

### [P2] Duplicate status can change with Sanity result order

- Category: objective defect
- Gate: redirect determinism / FE-24
- Evidence: `mergeRedirects.ts:86-106` sorts duplicates by `from` and `to` only. Two documents with the same source and target but different `permanent` values compare equal, so the first fetched status wins. Bob ran the merge twice with the documents reversed: one output was `/dup /new 301`, the other `/dup /new 302`. The guard test at `web/scripts/assert-merge-redirects.mjs:123-136` covers different targets, not this tie.
- Failure scenario: two Sanity redirect documents point `/dup` to `/new`, one permanent and one temporary. A change in GROQ result order changes the deployed HTTP status without either document changing.
- Why it matters: crawlers and caches treat 301 and 302 differently, and the decision record currently claims duplicates resolve deterministically.
- Required correction: define and test a stable tie policy, or reject/report conflicting duplicates so no ambiguous status is deployed.
- Owner: Andy
- Verification: reverse same-source/same-target documents with different `permanent` values and compare output and warnings.
- Status: open

### [P3] The webhook note overlooks recorded end-to-end evidence

- Category: documentation mismatch
- Gate: operational handoff / guideline §20
- Evidence: `docs/DECISIONS.md:2718-2723` says the webhook's existence is unverified and editors must manually build until it is confirmed. The same file's §35 (`2161-2185`) records Charlie's two real Studio publishes, successful Sanity hook delivery, a new Cloudflare deployment, and live content verification; §39 (`2359-2360`) records one webhook pointed at the current project.
- Failure scenario: an editor follows §46 and triggers a redundant manual build after every redirect publish, or an operator incorrectly treats the previously verified hook as never configured.
- Why it matters: the operational instruction conflicts with the project's own dated evidence. The *current* dashboard state and whether this `redirect` document type triggers the hook still merit a targeted check.
- Required correction: distinguish the historically verified webhook/deploy chain from the still unverified redirect-specific publish and current hook configuration; name the post-merge check.
- Owner: Andy
- Verification: inspect the revised decision note and, after merge, one redirect edit's hook log, Cloudflare build, and HTTP response.
- Status: open

### Production baseline and remaining evidence

Read-only `curl` on 2026-10-02 found `https://mathematicsmalaysia.com/pricing` returns **404** and `/pricing/` returns **301** with `Location: /#pricing`. This is the expected pre-merge baseline for the two distinct paths, not a test of PR #115 on the deployed Worker. A local `pnpm build` completed but warned that `PUBLIC_SANITY_PROJECT_ID`/`PUBLIC_SANITY_DATASET` were not in the config process, so Bob did not independently reproduce Andy's Sanity-backed output. The PR's actual Cloudflare response and a redirect-document webhook event are unverified. After a corrected PR is merged by Charlie, verify `/pricing` returns one-hop 301 to `/#pricing`, `/pricing/` retains its 301, and a subsequent published redirect change triggers a build without manual action.

### Scoped verdict

**Revision required.** The open P1 editor-validation gap prevents approval for an editor-managed redirect feature. Resolve the P2 provider-format and duplicate-status defects, correct the operational note, and return the revised exact head for re-review. Bob did not merge, deploy, or edit Andy-owned files.

---

## 2026-10-01 — PR #114 FAQ accordion at `2cd9106`

Reviewed exact open head `2cd9106e8a171fa55849f84d94964e5eb409274f` against `main` `e677a43be185abbf40dfb40ebfdf63734cf224b0` under `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. This is a scoped pre-merge feature review. Three exact-head checks pass. Bob ran `git diff --check`, `pnpm test:faq-validation`, and the six targeted FAQ Playwright tests against a fresh build; all pass. In Chromium, the built FAQ had no page overflow at 320/560/768/1024/1440px, 54px summary targets, a 2px visible focus outline, and visible open answers with reduced motion. Bob did not operate live Studio, create a Sanity draft, or inspect VoiceOver/NVDA.

### [P1] A warning permits a skipped question heading level

- Category: guideline mismatch
- Gate: FE-06 heading hierarchy; [W3C WAI heading guidance](https://www.w3.org/WAI/tutorials/page-structure/headings/)
- Evidence: `studio/schemaTypes/lib/faqValidation.ts:36-45` returns only a warning for a gap; `studio/schemaTypes/objects/portableTextObjects.ts:435-437` attaches it with `.warning()`, so it does not block Publish. `web/src/lib/content/defaultBlogData.ts:309-318` supplies title H3/questions H5, and `web/tests/e2e/blog.spec.ts:278-287` asserts five-level questions without an H4. The renderer honors the gap at `web/src/components/portabletext/FaqAccordion.astro:21-28`.
- Failure scenario: an editor picks H3 for the FAQ title and H5 for its directly nested questions. The published outline jumps over H4 within that FAQ.
- Why it matters: the question is a direct child of the FAQ title. The surrounding article cannot supply a missing heading *inside* that parent-child relation. WAI says skipped ranks can confuse heading navigation; FE-06 requires levels to express actual structure. This is an FE gate failure, not a claim that a skipped rank alone automatically fails WCAG 1.3.1.
- Required correction: require the question level to be exactly one deeper than the FAQ title, retaining the offered H3–H6 range for valid pairs; change the fixture and tests to exercise valid pairs and a rejected skipped pair. If the owner wants a different content hierarchy, record and approve that structural requirement first.
- Owner: Andy
- Verification: inspect the revised schema/validator and test, run the guard, and confirm built heading sequence for every fixture FAQ.
- Status: open

### [P2] A one-block answer can contain no answer text

- Category: objective defect
- Gate: content resilience / FE-22
- Evidence: `studio/schemaTypes/objects/portableTextObjects.ts:403-424` validates `answer` with only `Rule.required().min(1)`. That checks array presence/length, not the contents of its Portable Text block. [Sanity's validation documentation](https://www.sanity.io/docs/studio/validation) provides a separate custom rule for rejecting empty Portable Text paragraphs. The renderer sends the array unchanged to `PortableText` at `web/src/components/portabletext/FaqAccordion.astro:55-60`.
- Failure scenario: a question has one empty or whitespace-only paragraph. The length rule passes and the published disclosure opens onto an empty answer.
- Why it matters: the editor promise is a question *with an answer*; a blank panel is a broken content state.
- Required correction: validate meaningful answer content, including inline maths where present, and add cases for an empty block, whitespace-only spans, and a valid answer.
- Owner: Andy
- Verification: run the validator test, then in authorized live Studio attempt to publish a question with one blank answer block and confirm Publish is blocked.
- Status: open; source-based until the Studio interaction is tested

### [P2] FAQ H2–H4 titles are missing from the post contents list

- Category: guideline/record mismatch
- Gate: `docs/DECISIONS.md` §42 post table of contents; content navigation
- Evidence: §42 defines the blog contents list for H2–H4. `web/src/lib/content/postHeadings.ts:25-27,66-86` collects only top-level Portable Text heading blocks, while `FaqAccordion.astro:31-46` renders an H2–H4 FAQ title separately. §46 explicitly records that it has no contents entry or section anchor. `web/tests/e2e/blog.spec.ts` changed the ID test to ignore FAQ headings.
- Failure scenario: a long article contains a prominent H2 FAQ section; the floating contents list omits it even though other H2 sections appear.
- Why it matters: navigation no longer reflects all article sections at the level the owner requested. The decision note acknowledges the gap but does not show an owner-approved change to §42.
- Required correction: include the FAQ title in the heading-ID/contents pass, with a linkable section ID and collision handling, or obtain and record the owner's decision that FAQ sections are intentionally excluded.
- Owner: Andy / Charlie for a scope change
- Verification: built-page test shows a matching FAQ title anchor and contents link, or review a recorded owner decision and adjusted contents contract.
- Status: open

### Essential evidence still missing

No one has exercised this `faqAccordion` insert/edit/validation path in live Studio. A successful schema build and fixture tests do not prove that title and level controls, question array, answer editor, warning/error messages, and Publish blocking are usable. Andy's proposed one temporary production-dataset draft needs **Charlie's explicit authorization**; Bob cannot grant it. The test should include the blank-answer and skipped-level cases after their validators are corrected, then delete the draft and confirm the prior post list. A screen-reader check of heading-in-summary remains unverified; Chromium recognizes the heading, and the [HTML Standard](https://html.spec.whatwg.org/multipage/interactive-elements.html) permits heading content in `summary`, but those facts do not establish VoiceOver/NVDA behavior.

### Scoped verdict

**Revision required.** The open FE-06 P1 prevents approval of PR #114 at this head. The two P2s and live Studio evidence also need resolution before a pre-merge approval. No merge or deployment was performed.

---

## 2026-10-01 — PR #111 final-head re-review at `41c965c`

Reviewed exact open PR head `41c965c69b22e3b6342d84c071e9765e3bbf7129` against the previously reviewed `0642c8e4a14e21c44bfef4bb4997d92ad36c3859`. Governing guideline: `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. This commit changes only `docs/DECISIONS.md` §45a; `git diff --check` passes. Exact-head GitHub `web`, `studio`, and Cloudflare checks pass. Bob did not edit application code, create a Sanity draft, deploy, commit, or merge.

### Closure of the blocked editor-flow gate

`docs/DECISIONS.md:2677-2685` now records dated manual UAT in Studio 6.16.0 against head `0642c8e`: with Charlie's recorded authorization, Andy created a second temporary production-dataset draft, saw **Table** in the body insert menu, opened its wrapper with Caption/row-header switch/nested Table field, inserted a 3×3 grid, saw whitespace-caption and blank-header errors, and confirmed Publish stayed blocked. The draft was deleted and the list reportedly returned to the original four posts. This is Andy's dated manual test record, **not Bob's direct observation**; no screenshot, recording, or Sanity audit log was provided. The record is precise enough to close the missing-UI-evidence blocker for this scoped pre-merge gate when combined with Bob's prior independent source, schema, validator, and built-browser checks. It must not be described as Bob's live Studio test.

The one-grid and stray-text validation messages were not exercised in live Studio; `studio/scripts/assert-table-validation.ts:34-46` tests their validator paths. No Studio-authored table was rendered on the public site; the built fixture tests cover caption, column and optional row headers, maths, responsive containment, and no-JS output. These are residual operational checks after the Studio deploy, not open code findings in this PR. No P0/P1/P2/P3 finding remains open in this scoped review.

### Scoped verdict

**Approved** for the next gate: user-controlled merge of PR #111. This does not certify that the new Studio is deployed or that a real published table has been viewed on production. Andy should deploy Studio after the user's merge and verify a real authored table before treating the feature as operational. The user merges manually; Bob does not merge or deploy.

---

## 2026-10-01 — PR #111 caption-test re-review at `0642c8e`

Exact head `0642c8e4a14e21c44bfef4bb4997d92ad36c3859`. The only change since `6c5cf78` adds real caption assertions to `studio/scripts/assert-table-validation.ts:43-46`: a valid caption returns `true`; missing, null, empty, spaces, and tab/newline values return a caption error. Bob inspected the one-file diff, ran `git diff --check` and independently ran `pnpm test:table-validation` (pass). Exact-head GitHub `web`, `studio`, and Cloudflare checks pass. Andy reports a deliberate validator mutation made the test fail and restoration made it pass; Bob did not witness that mutation, so records it as Andy's report, not Bob's own verification. The previous P2 test-evidence finding is **resolved** by the committed assertions.

**Scoped verdict: Blocked.** No source or test finding remains open in this PR scope, but nobody has verified the nested `postTable` editing flow in live Studio. The first live test of the original grid proved schema/build success did not guarantee a reachable caption field. The owner must authorize any second production-dataset draft separately; Bob cannot grant that permission, create the draft, merge, or deploy. After an authorized live test, Bob will re-inspect its evidence and the exact head.

---

## 2026-10-01 — PR #111 caption follow-up at `6c5cf78`

Exact head `6c5cf782986ff9309b37a0a414afb56e6128c110` (open PR #111), reviewed against `0caa9d6274e6d31a6bb4cba965de6dc53dfa6834` under `02-INFORMATIVE-BLOG.md` v1.12.1. All three exact-head checks (`web`, `studio`, Cloudflare) passed; local diff check passed. Bob did not merge, deploy, create a Sanity draft, or edit Andy-owned files.

The prior whitespace-caption **behavior** is corrected in source: `validateTableCaption` at `studio/schemaTypes/lib/tableValidation.ts:61-66` trims a string and rejects empty output, and `portableTextObjects.ts:276` attaches it to the wrapper caption. Bob independently invoked the function with `""`, spaces, tabs/newlines, `null`, `undefined`, and a valid name; the five invalid values returned the error and the valid name returned `true`. Studio schema validation and live wrapper behavior were not rerun at this head; CI's studio check is green. The new function is *not* exercised by the committed test described below.

### [P2] Caption validation test is claimed but contains no caption assertions

- Category: objective defect
- Gate: guideline Section 19, verification evidence
- Evidence: `studio/scripts/assert-table-validation.ts:3` imports `validateTableCaption`, but lines 15-41 assert only header and wrapper-content validators. Line 44 prints that blank captions were rejected even though the script never calls the caption validator. `docs/DECISIONS.md:2679-2682` calls the cases unit-tested, and the PR handoff claims empty text, whitespace, tabs/newlines, null, and missing values are covered.
- Failure scenario: caption validation regresses or is disconnected from the Studio field; `pnpm test:table-validation` stays green and prints a misleading success message.
- Why it matters: the earlier uncaptained-table defect escaped initial automation, so this exact guard needs real assertions.
- Required correction: add assertions for all claimed invalid values and a valid nonblank caption; keep the success message aligned with what the test actually checks.
- Owner: Andy
- Verification: inspect the committed assertions and run the test; optionally mutate the validator in a disposable context to prove the test fails.
- Status: open

### Scoped verdict

**Blocked.** The nested wrapper's live Studio editing and validation flow is still unverified, which is essential after the original grid's unreachable caption field. The whitespace behavior is fixed in source, but the test-evidence P2 is open. The user authorized only the first production-dataset draft; Bob cannot authorize a second one. If the owner authorizes it, Andy should correct the test first, then run one controlled temporary-draft workflow and provide inspectable evidence for re-review. No production-data action was taken by Bob.

---

## 2026-10-01 — PR #111 wrapper re-review at `0caa9d6`

Reviewed exact head `0caa9d6274e6d31a6bb4cba965de6dc53dfa6834` against the prior reviewed head `12bab82bae8a87afe46a7f0af76c06f5f9e8d6ae` under `02-INFORMATIVE-BLOG.md` v1.12.1. PR remains open; exact-head `web`, `studio`, and Cloudflare checks pass. This is a scoped re-review of the five previous findings and the new wrapper. Bob did not merge, deploy, edit application code, or create a Sanity draft.

### Re-verification of prior findings

- **P1 headerless tables — resolved in source and local validation.** `tableValidation.ts:24-39` rejects absent/zero/non-integer/out-of-range `headerRows` and blank column-header cells. It is attached to the `table` type at `portableTextObjects.ts:248`. Bob independently ran `pnpm test:table-validation` and `pnpm exec sanity schema validate`; both passed. Andy reports that the original, unwrapped table's header-off state blocked Publish in live Studio. The *new nested-wrapper* Studio flow has not been tested live, so its effective validation remains an operational unknown.
- **P1 missing row headers — resolved in rendered fixture.** `postTable.rowHeaders` is an editor field at `portableTextObjects.ts:274-281`. `Table.astro:60-75` renders the first body cell as `<th scope="row">` when true and `<td>` when false. The fixture covers both states; Bob independently ran the four table Playwright tests against a fresh build, all passed.
- **P2 caption optional — narrowed, still open.** The wrapper introduces a required caption field, but the current validation accepts whitespace-only strings; see the finding below. The live form's caption control is also unverified.
- **P3 rounded table frame — resolved.** `Table.astro:88-93` uses no radius, matching `design/DESIGN.md:130`.
- **P3 overstated test count — resolved.** `docs/DECISIONS.md` §45 now accurately lists four table Playwright tests, including the new row-header-off case.

### [P2] Whitespace captions still produce unnamed tables

- Category: objective defect
- Gate: guideline Section 15, content resilience
- Evidence: `studio/schemaTypes/objects/portableTextObjects.ts:266-272` uses only `Rule.required()` for caption. The installed Sanity 6.16.0 validation's string-presence rule checks `!value`, so `"   "` passes. `web/src/components/portabletext/Table.astro:24,34-40` trims that string, emits no `<caption>`, and falls back to `aria-label="Table"`.
- Failure scenario: an editor enters spaces in two Table captions and publishes; both render as uncaptained tables in identically named regions.
- Why it matters: the earlier naming/accessibility risk remains for a valid-by-schema input.
- Required correction: validate `caption.trim().length > 0` and use the same trimmed value for the visible caption and region name. A publish-time test should cover whitespace.
- Owner: Andy
- Verification: enter a whitespace-only caption in the wrapper, confirm Publish is blocked, and inspect a valid table's visible caption and region name.
- Status: open

### Essential evidence still missing

The first live Studio test of the original table exposed a caption field that automation could not reach. The revised `postTable` wrapper has **not** been exercised in live Studio. No reviewer has seen whether the Table insert entry opens the wrapper fields, whether the caption and checkbox can be edited, whether Insert → Table works inside `content`, or whether the one-grid/header validation blocks Publish in that nested form. Static schema validation and fixture-mode browser tests cannot establish those editor behaviors. A controlled live draft test with recorded, non-sensitive evidence is required before this feature can be approved for editors. The user's prior permission was for one draft; Bob has not treated it as authorization for another.

### Checks and verdict

Bob independently ran `git diff --check`, `pnpm exec sanity schema validate` (0 errors/warnings), `pnpm test:table-validation` (pass after sandbox IPC `EPERM` required an approved rerun), and the four table Playwright tests against a fresh built site (4/4 pass). The local browser test's localhost bind used approved escalation. Exact-head GitHub `web`, `studio`, and Cloudflare checks passed. No production post or live wrapper was inspected.

**Blocked** for the scoped editor-feature gate: the live wrapper workflow is essential evidence and unavailable, and the whitespace-caption P2 remains open. Andy should fix that validation path before a single controlled live test, then provide the exact revised head and evidence for Bob's re-review. Bob does not merge or create the draft.

---

## 2026-10-01 — PR #111 blog tables, scoped pre-merge review

Commit: `12bab82bae8a87afe46a7f0af76c06f5f9e8d6ae` against `main` `0a8fe57647c84c0bc6e85b0ed688aa6b6349cae3`. Governing guideline: `02-INFORMATIVE-BLOG.md` v1.12.1/shared core v1.12.1. Astro 7, Sanity Studio 6.16.0, Cloudflare Workers static assets. This reviews the table feature, not the whole site's production readiness.

### [P1] The editor can publish a data table with no headers

- Category: objective defect
- Gate: WCAG 2.2 SC 1.3.1; guideline Section 15
- Evidence: `studio/schemaTypes/objects/portableTextObjects.ts:203,247` leaves `headerRows` unvalidated and requires only one row. Sanity's documented table menu permits turning the header row off. `web/src/components/portabletext/Table.astro:12-18,36-65` then renders only `<td>` cells when `headerRows` is zero or absent. Current tests exercise only `headerRows: 1`.
- Failure scenario: an editor inserts a table, turns off its header row, fills in data, and publishes; the table has no programmatic headers.
- Why it matters: screen-reader users lose the column context for data cells.
- Required correction: enforce a meaningful header row for publishable data tables, including a bounded `headerRows` value and populated header cells, or provide and validate another semantic header model.
- Owner: Andy
- Verification: attempt a header-toggle-off table in Studio and inspect published markup; test this path.
- Status: open

### [P1] The sample tables' first-column labels are not row headers

- Category: objective defect
- Gate: WCAG 2.2 SC 1.3.1; guideline Section 15
- Evidence: `web/src/lib/content/defaultBlogData.ts:165-195` uses “Surd” and “Law” as first-column row identifiers. `web/src/components/portabletext/Table.astro:53-62` renders every body cell as `<td>`. Bob's browser inspection found zero `th[scope=row]` in both sample tables. `docs/DECISIONS.md` §45 records this limitation, but no user acceptance of an accessibility risk exists.
- Failure scenario: when reading “Simplest form” or “Result” by table navigation, the surd or law identifying that row is not associated as a header.
- Why it matters: the visible row-label relationship is missing from the semantics. [W3C's two-header table guidance](https://www.w3.org/WAI/tutorials/tables/two-headers/) calls for `<th scope="row">` when the first column labels rows.
- Required correction: support row headers and render these sample first-column labels as `<th scope="row">`; provide an editor choice for tables where the first column is ordinary data.
- Owner: Andy
- Verification: inspect both rendered fixture tables and test an editor-authored table with row labels.
- Status: open

### [P2] Captions are optional while unnamed tables share the same region name

- Category: material risk
- Gate: guideline Section 15, content resilience
- Evidence: `studio/schemaTypes/objects/portableTextObjects.ts:197-202` does not require `caption`; `web/src/components/portabletext/Table.astro:19,29-35` omits `<caption>` and falls back to `aria-label="Table"` on the focusable region.
- Failure scenario: two uncaptained tables in one article expose two indistinguishable “Table” regions, and neither table has a caption.
- Why it matters: readers cannot identify which table they are entering via region or table navigation.
- Required correction: require a descriptive caption or another distinct, visible and accessible table name.
- Owner: Andy
- Verification: try to publish an uncaptained table and inspect the resulting region/table names.
- Status: open

### [P3] The table frame conflicts with the approved square-corner treatment

- Category: guideline mismatch
- Gate: design authority; FE-13
- Evidence: `design/DESIGN.md:130` prescribes zero radius on tables; `web/src/components/portabletext/Table.astro:78` applies `--radius-lg` (6px) to the frame.
- Failure scenario: blog tables appear with rounded outer corners.
- Why it matters: limited visual drift in a new component.
- Required correction: use square corners or record an owner-approved exception for this frame.
- Owner: Andy / client for a design change
- Verification: compare rendered table frame at approved widths with the design rule.
- Status: open

### [P3] Decision record overstates the number of new tests

- Category: objective defect
- Gate: verification evidence
- Evidence: `docs/DECISIONS.md` §45 says “Four new Playwright tests”; `web/tests/e2e/blog.spec.ts:195-244` adds three, and the suite count rose from 60 to 63.
- Failure scenario: a future reviewer assumes a fourth scenario was verified.
- Why it matters: the evidence record is inaccurate.
- Required correction: state three tests and name the three scenarios.
- Owner: Andy
- Verification: compare the corrected record with the test diff.
- Status: open

### Verification and scope

- Exact-head GitHub checks: `web`, `studio`, and Cloudflare Workers Builds passed. Local `git diff --check` passed. Bob ran `pnpm exec sanity schema validate` (0 errors/warnings) and the three table Playwright tests against a fresh build (3 passed). The sandbox initially denied the localhost bind (`EPERM`); the approved rerun passed.
- Bob inspected the built fixture post in Chromium at 320, 390, 560, 768, and 1440px. Page `scrollWidth === clientWidth` at each width; the wide table scrolled 40px after ArrowRight while focused. No page errors. Both fixture tables had captions and column headers; neither had row headers.
- The schema/config match [Sanity's documented built-in table editor](https://www.sanity.io/docs/studio/portable-text-editor-configuration), with no new package. The live Studio UI, real Sanity-authored table, deployed PR preview, and production post were not inspected. Graphify had no persisted graph; building one would write outside Bob's review outputs, so source was read directly. Vercel Web Interface Guidelines and W3C table guidance were consulted.

### Scoped verdict

**Revision required.** Two open P1 table-semantics findings block approval. Andy makes the corrections; Bob re-reviews the revised head. Bob does not merge or deploy.

---

## 2026-09-29 — PR #110 final-head re-review at `f666a60`

Scope: Andy's follow-up commit `f666a605757ea16bc9dc5c49d7073146bdbe6dc0`
against the prior reviewed head `5af1fd6`, closing the website-kit header P2.
PR #110 remains open and mergeable. All exact-head checks (`web`, `studio`,
Cloudflare Workers Builds) pass, and `git diff --check 5af1fd6..f666a60`
passes. This is a scoped pre-merge verdict, not a fresh site-wide audit.

### Re-verification

- `design/ui_kits/website/LandingShell.jsx:331-361` now draws the root mark
  inline with the expected `0 -4 124 108` viewBox, circular cut mask, two
  paths, and ochre dot. It no longer contains the retired operator rectangles.
  `design/ui_kits/website/README.md:46` now describes the new mark and dates
  the operator cluster as superseded. `docs/DECISIONS.md` §44c records the
  update and browser check.
- Bob served the checked-out `design/` folder read-only over localhost and
  opened the actual `ui_kits/website/index.html` in Chrome. The page rendered
  the new mark in its header. DOM inspection found the header mask ID
  `header-logo-cut`, viewBox `0 -4 124 108`, and zero old operator rectangles.
  The browser console reported zero errors. This verifies the active mockup,
  not a copied test page.
- The bundle still contains an old private `PageHeader` block at
  `design/_ds_bundle.js:3260`, but this mockup loads the updated
  `LandingShell.jsx` via Babel after the bundle and renders that source
  `PageHeader`; the private bundled block is not assigned to the public
  `JustMathDesignSystem_270e96` exports. Bob's prior instruction to patch that
  bundle block was broader than needed for this active page. The old block and
  intentionally historical mockup favicons remain documented reference debt,
  not a current logo authority or live-site defect.
- The earlier full-link, favicon-size evidence, design guidance, reusable
  component, and mask-ID fixes remain as verified in the preceding passes.
  No application code changed in this follow-up.

### Scoped verdict

**Approved.** The remaining PR #110 P2 is closed. No open P0–P3 finding in
this scoped logo review. The new logo is still unverified on the production
site while the PR is open; user performs the merge. Bob did not merge,
deploy, or edit Andy-owned files.

---

## 2026-09-29 — PR #110 third re-review at `5af1fd6`

Scope: Andy's follow-up commit `5af1fd65b663c486f95fa6a6d7f694a3cc4cbef0`
against the prior reviewed head `5ab15cb`. PR #110 remains open and mergeable.
The exact-head `web`, `studio`, and Cloudflare Workers Builds checks all pass;
`git diff --check 5ab15cb..5af1fd6` passes. This pass rechecks the open P2,
the P3 mask-ID issue, and the wording correction; it does not repeat the full
site audit.

### Closed: duplicate mask IDs, premature “live” wording, compiled Logo block

- `design/components/brand/Logo.jsx:8-13` now uses `React.useId()` for each
  `RootMark` mask. Two same-treatment instances no longer derive the same ID
  from `reversed`. The corresponding `design/_ds_bundle.js:17-42` Logo block
  uses the same hook and new root geometry. Andy reports a two-instance browser
  reproduction before and after the fix and a browser test of the patched
  bundle. Bob inspected source and the bundled block, not that scratch test.
  The previous P3 is closed on the code evidence.
- `design/BRAND-INTAKE.md:49-56` now correctly says the new mark is on the
  open PR, not yet merged. The wording issue is closed.
- The bundle's exported `Logo` block now renders the new mark. This narrows
  the design-package P2 but does not close it: the same bundle contains a
  separate old inline website header at `design/_ds_bundle.js:3260`.

### [P2] Website design kit still presents the old logo as current

- Category: design-authority mismatch; continuation of the original P2.
- Evidence: `design/ui_kits/website/README.md:46` still says “The lockup is
  the operator mark + stacked type” and calls it the 2026-08-11 owner decision.
  `design/ui_kits/website/LandingShell.jsx:331-357` still draws the operator
  grid inline, not through the newly corrected reusable `Logo`. The compiled
  `PageHeader` at `design/_ds_bundle.js:3260` contains that same old SVG. The
  only new notice in `design/ui_kits/website/index.html:5` is an HTML comment
  about its favicon, so a person viewing the mockup sees the old header with
  no on-page notice that it is historical. Blog HTML files likewise have
  source comments beside old favicons; the booking mockup has a JSX comment
  beside its old avatar. The guideline monogram card now has a visible
  historical banner and is resolved. The remaining comments document source
  intent but do not fulfil the visible entry-point notice option from Bob's
  previous correction. The old kits are separate from the live Astro site.
- Correction for Andy: either update the website kit's inline header and
  compiled `PageHeader` to the new mark, or clearly archive that kit in its
  README and in a visible notice on its rendered page. Apply the same visible
  notice to any other intentionally historical mockup that still displays
  the operator mark. Preserve the old decision as history. The §44b statement
  that the remaining entry points are fixed should be narrowed until this is
  done.
- Status: open. No production Astro-logo defect or P0/P1 issue is established.

### Scoped verdict

**Approved with conditions.** The latest commit closes the P3 and corrects
the intake/bundle Logo block. One design-package P2 remains because the
website mockup still renders the old mark as if current. The user may accept
that separate reference-package risk for later; Bob does not merge or deploy.

---

## 2026-09-29 — PR #110 second re-review at `5ab15cb`

Scope: Andy's follow-up commit `5ab15cb769af66bbdf8db2e91b60bdbb1577fdf7`
against the prior reviewed head `80ec3cb`. PR #110 is open and mergeable. All
three exact-head checks (`web`, `studio`, Cloudflare Workers Builds) pass, and
`git diff --check 80ec3cb..5ab15cb` passes. This pass addresses the three
requested corrections and the design files they changed; it does not reopen
the full website audit.

### Closed: full design reference and small-size favicon evidence

- `design/ASSETS.md:62-65` now contains the complete owner design-share URL.
- Bob opened `review/andy/pr-110-logo/evidence-favicon-sizes.png` at its native
  424×508 resolution. It visibly shows the new dark-square mark at labelled
  16, 32, and 64px sizes against both light and dark grounds. Pixel inspection
  finds 631 colours; the previous all-white capture was replaced. The four
  header/footer screenshots accepted in the preceding pass remain in the PR.
  The original P2 visual-evidence finding is closed.
- `design/readme.md` and `design/BRAND-INTAKE.md` now introduce the owner-selected
  mark and label the operator decision historical. `design/assets/mark-options.html`
  has a conspicuous superseded notice. `design/components/brand/Logo.jsx`, its
  declaration, and prompt now use the root geometry. Source geometry matches
  the Astro lockup's paths, mask, and dot. Andy reports testing five component
  uses in a scratch browser; Bob inspected source but did not independently run
  that scratch page. These changes substantially reduce the first P2 risk.

### [P2] Some design-package entry points still present the retired logo as current

- Category: design-authority mismatch; continuation of the earlier P2.
- Evidence: `design/ui_kits/website/README.md:46` still says the lockup **is** the
  operator mark; `design/ui_kits/website/LandingShell.jsx:331-357` still draws it
  inline. `design/_ds_bundle.js:21-75` still exports the old `OperatorMark`, and
  the design kit HTML pages load that bundle. Other kit pages and
  `design/guidelines/brand-monogram.card.html` still link the operator SVG files.
  `docs/DECISIONS.md` §44a records these as known, but the remaining files do
  not label themselves historical. The design package therefore still renders
  the retired mark in apparently active previews. These are not live Astro
  assets, and no production-logo defect follows from them.
- Correction for Andy: choose a consistent state for this package. If the kits
  remain reusable, rebuild their bundle and replace their direct old-mark use;
  if they are archived reference work, add unmistakable dated supersession
  notices at their entry points and in the website kit README. Preserve the
  old decision history. The new `BRAND-INTAKE.md` §4 should also change
  “approved and live” to “approved for the live site”: PR #110 is still open.
- Status: open. The user may explicitly accept this separate design-package
  risk for a later pass; that would not affect the live Astro logo review.

### [P3] Reusable design mark repeats mask IDs

`design/components/brand/Logo.jsx:9-10,50-52,69-71` derives the SVG mask ID
only from `reversed`. Two default `<Logo />` instances on one page therefore
emit the same `logo-mark-cut-default` ID. The masks currently have identical
geometry, so the five-use preview can appear correct, but a reusable component
should give each instance its own ID (for example React `useId`). This does
not affect `web/src/components/LogoLockup.astro`, which uses separate IDs for
its header/footer instances. Owner: Andy; follow-up quality correction.

### Scoped verdict

**Approved with conditions.** The full link and favicon evidence are fixed,
and the reusable source component now draws the right mark. One P2 remains in
the design-reference package, plus the P3 mask-ID issue. The PR's live Astro
logo code has no new P0/P1 finding. Bob does not merge or deploy.

---

## 2026-09-29 — PR #110 re-review at `80ec3cb`

Scope: Andy's follow-up commit `80ec3cbfe16ba698e2cccdaae34159791398a35d`
adds `design/ASSETS.md` §1c and five image files under `review/andy/pr-110-logo/`.
PR #110 remains open and mergeable. Exact-head `web`, `studio`, and Cloudflare
Workers Builds checks pass. `git diff --check 2c530f9..80ec3cb` passes. This is a
re-review of the two P2 findings below, not a new site-wide audit.

### P2 design authority — partially addressed, still open

`design/ASSETS.md:60-91,158-169` now states that the owner chose the root mark,
supersedes §§1–1b's operator mark, preserves the old choice as history, and resolves
the local §4 √ conflict. That is a meaningful correction. Its design URL is still
truncated. More materially, `design/readme.md:20-36,97-106` still instructs consumers
to use the operator mark as the only brand symbol and lists √ as banned imagery;
`design/BRAND-INTAKE.md:49-60,86` still calls for sign-off on the retired redraw;
`design/components/brand/Logo.jsx`, its prompt and declaration, and
`design/assets/mark-options.html` remain current-looking old-mark deliverables.
The new §1c acknowledges some of these conflicts but leaves them in place. The
earlier finding's failure scenario therefore remains: a consumer of the design
package can still follow an apparently current instruction to use the old mark.
Andy should add the full design-share URL, date-stamp or label those documents and
old renderings as historical, and update any design component still offered for
reuse. This is design-package consistency work; it does not imply a defect in the
live Astro logo. The owner may choose to defer that separate package refresh, but
Bob cannot call the original P2 fully resolved on the present evidence.

### P2 visual evidence — header/footer closed; favicon capture still open

Bob opened the four committed 1440px/390px header/footer PNGs at their native
resolution. The new mark, wordmark, and reversed footer variant are visible and
aligned; no crowding or clipping is apparent in these crops. The committed
`evidence-favicon-sizes.png` is **700×380, RGB, and every pixel is white** (verified
with Pillow: one unique colour). It shows none of the claimed 16/32/64px comparisons
on light/dark tab backgrounds. Bob independently opened the exact-head favicon SVG
in Chrome and the 32×32 `favicon.ico` image; both render the dark square and light
mark. This supports the asset itself but does not verify the promised 16px capture.
Andy should regenerate and inspect the comparison PNG, then replace the blank file
and PR-comment image in a new commit for Bob to recheck. The evidence problem is a capture
artifact; no favicon rendering defect was established.

### Scoped verdict

**Approved with conditions.** No new P0/P1 or application-code defect was found.
Both original P2 findings are partially addressed; the remaining actions are the
design-package reconciliation and a valid small-size favicon comparison. This is
not a merge instruction or production verification.

---

## 2026-09-29 — PR #110 new logo, scoped pre-merge review

Governing guideline: `02-INFORMATIVE-BLOG.md` v1.11.0, shared core v1.11.1.
Framework: static Astro, Sanity content, Cloudflare Workers static assets. Review head
`2c530f9f3d00aa63fe64fab09d11eaeee818d0e0` against merged `main`
`b0689158284b8357a713646d26bc57c5dd657271`. Five changed files; no
application dependency, route, or security-policy change. The owner-directed newer
Claude design canvas linked in the PR supersedes the operator mark **for the logo**;
the repository's older design package has not yet recorded that supersession.

### [P2] The checked-in design package still declares the retired mark authoritative

- Category: guideline mismatch / material risk
- Gate: guideline Section 8, design-package authority and handoff
- Evidence: `design/ASSETS.md:13-25,48-57` records the operator grid as the adopted mark;
  `design/readme.md:20-36,97-106` says it is the only brand symbol and forbids √ imagery;
  `design/BRAND-INTAKE.md:51-60` still requires sign-off on that redraw. The `design/`
  SVGs, brand component, card and UI-kit headers still render it. PR #110 updates only
  `web/` and adds `docs/DECISIONS.md` §44, whose design-artifact ID is truncated and
  does not explicitly retire the earlier design-package decision.
- Failure scenario: a later developer follows the repository's stated design authority
  and restores the old operator mark, or uses the old mark in a new asset.
- Why it matters: the approved owner change is not portable as a clear source of truth.
  This does not challenge the owner's newer logo decision.
- Required correction: Andy records that the owner-approved new root mark supersedes
  the 2026-08-11 operator-mark decision, with the full design URL and date, then adds
  a dated supersession note to the design package and updates logo-bearing design
  assets that remain intended for reuse. Preserve the old decision as history.
- Owner: Andy, with owner confirmation only if the newer design's approval record is
  disputed.
- Verification: Bob checks the decisions record and design package for one current
  logo authority, with no current-use artifact pointing to the retired mark.
- Status: open

### [P2] Claimed visual checks are not available to the reviewer

- Category: material risk
- Gate: guideline Sections 8 and 19; reviewer evidence rules for responsive behavior
- Evidence: PR body and `docs/DECISIONS.md` §44 report screenshots at 390/1440px and
  favicon renders at 16/32/64px, but neither a preview URL nor the captures are
  attached to the PR. The GitHub deployments query for this head returned none.
  Bob viewed the owner design boards and the PR's standalone SVGs in Chrome, but
  could not inspect the proposed header/footer in a running PR build.
- Failure scenario: the larger inline mark crowds the mobile header, loses alignment
  against the wordmark, or sits poorly in the dark footer despite passing overflow tests.
- Why it matters: this change's main requirement is visual fidelity across contexts.
- Required correction: Andy attaches the cited header/footer desktop and phone
  captures and favicon 16/32px renders, or provides a reachable PR preview. Include
  the commit SHA so the evidence is tied to the reviewed implementation.
- Owner: Andy
- Verification: Bob inspects both lockups and the small favicon against the newer
  design boards at the named sizes.
- Status: open

### Verified in this pass

- The linked owner design conversation contains a direction to adapt the new mark for
  this website; the primary lockup and small-size boards were viewed. The PR's
  `logo.svg` and `favicon.svg` rendered in Chrome and match the source geometry and
  dark favicon treatment at the inspected scale. The external artboard is newer and
  specific to this mark, so the old package's √ ban is not treated as a design veto.
- `web/src/components/LogoLockup.astro:6-10,26-57` uses separate mask IDs for the
  normal and inverted instances; the header and footer each render one. The new
  SVG is decorative (`aria-hidden`) and the visible wordmark remains in the link.
  `MALAYSIA` now uses the existing medium-weight token.
- `web/public/logo.svg` remains a 512×512 standalone mark referenced by the
  Organization JSON-LD in `BaseLayout.astro`. The existing Playwright test fetches
  it and confirms it decodes as an image. The social image was inspected previously:
  it has no operator mark and is unaffected by this PR.
- `web/public/favicon.ico` is a 32×32 PNG bitstream with an `.ico` filename, the
  same packaging pattern documented for the prior asset; this is not a new regression.
- `git diff --check` passed. CI run `36515654302` at the exact PR head passed
  `web`, `studio`, and Cloudflare Workers Builds. The web log reports 60 passed
  Playwright tests. Bob did not rerun a local PR build or inspect a running PR page.

### Scoped verdict

**Approved with conditions.** No open P0/P1 finding in the implementation. The two
P2 items above need correction in the next controlled step. This is approval of the
PR scope, not site-wide brand-system or production-readiness approval, and is not a
merge instruction.

---

## 2026-09-29 — PR #109 final-head and live-deployment re-review

Review stage: post-merge verification of the prior scoped approval below. PR #109 gained
documentation-only commit `e9991155a1a15e1bc2a2aa465a68e284281d79c1` after Bob's
first pass and merged as `b0689158284b8357a713646d26bc57c5dd657271` at
2026-09-29 02:46 UTC. The final-head CI run `36513998888` passed `web` and `studio`, and
the PR's Cloudflare Workers Builds check passed. The added commit changes only
`docs/DECISIONS.md:2475-2478`, narrowing the analytics claim to the observed 24-hour
window; `git diff --check dc6c6eb..e999115` passed.

### Findings

No new P0–P3 finding. The earlier overbroad statement about Cloudflare analytics never
having worked was corrected in the final PR head.

### Live evidence

- Two published posts, `/blog/differentiation-using-the-first-principle/` and
  `/blog/skills-needed-to-perform-well-in-secondary-mathematics-form-1-form-2-and-form-3/`,
  both link `/_astro/_slug_.ChVmnjN6.css`. Neither response contains the Cloudflare beacon
  script or `data-cf-beacon` marker.
- The deployed CSS returns HTTP 200 with `text/css`. It contains zero `data:font`
  references and a normal same-origin `KaTeX_Size3` `.woff2` URL. That `.woff2` returns
  HTTP 200 with `font/woff2`; the unchanged live CSP is `font-src 'self'`.
- The live home page also lacks Cloudflare beacon markers and still references Google
  Tag Manager. This verifies presence of the tag reference, not GA4 visitor counting.
- Andy reports no browser errors on the two posts and attributes Google's font requests
  on the Differentiation post to its YouTube embed. Bob did not independently inspect
  the browser console or requests: the available in-app browser was unavailable, and
  HTTP response checks cannot establish console state or request initiator.

### Scoped verdict

**Approved.** The font and beacon corrections are verified in public production
responses. This remains a scoped review of PR #109 and its deployment, not a new
site-wide production-readiness review. No merge or application edit was performed by Bob.

---

## 2026-09-29 — PR #109, CSP font and Cloudflare beacon follow-up

Review stage: narrow pre-merge review. Governing guideline:
`02-INFORMATIVE-BLOG.md` v1.11.0 (shared core v1.11.1). Framework: static Astro with
Sanity content on Cloudflare Workers static assets; no commerce backend. Reviewed PR head
`dc6c6eb5d2665b22ce104f73885d126ff3192994` against `main`
`68561c105941d02b80ade3c823fabc1f3819ce9e`. This is approval of the PR's three-file
change, not a new site-wide or production-readiness verdict.

### Findings

No P0–P3 finding in the PR diff. The claim that zero Cloudflare page views over the last 24
hours proves the counter *never* worked is broader than the evidence: it describes only that
window. The blocked script and now-absent beacon support the operational decision without
needing that historical claim.

### Evidence

- `web/astro.config.mjs:35-42` uses Vite's documented `assetsInlineLimit` callback: `false`
  excludes font extensions from inlining; `undefined` keeps default behavior for other assets.
  No CSP or dependency change is in the diff. Official Vite build-options documentation
  confirms both return values.
- `web/tests/e2e/blog.spec.ts:236-250` requests every stylesheet linked from the built
  fixture post and rejects `url(data:font...)`. The existing adjacent test checks that the
  post bundle contains KaTeX styles. The new assertion directly covers the observed failure.
- `docs/DECISIONS.md:2464-2478` records the cause, chosen code fix, and Cloudflare dashboard
  decision. `git diff --check` passed; exactly these three files changed.
- GitHub CI run `36512363380` built PR merge commit `03835d1` from this head and base.
  Its `web`, `studio`, and Cloudflare Workers Builds checks passed; the `web` log reports
  **60 passed** Playwright tests, including the new font test. CI runs format, Astro check,
  build, guardrails, and Playwright on built output. I did not rerun the PR build locally or
  verify Andy's claimed red/green mutation test independently.
- Public HTML for `/`, `/blog/`, and a published post lacked both
  `static.cloudflareinsights.com` and `data-cf-beacon` markers. The home page still
  referenced Google Tag Manager. The currently deployed post CSS
  `/_astro/_slug_.UQRz33V-.css` contained **one** `data:font` reference, as expected before
  PR #109 reaches production. These are response inspections, not a browser console test.
- The fixture test URL `/blog/why-surds-trip-up-students/` returns 404 on production.
  Use an actually published route such as
  `/blog/differentiation-using-the-first-principle/` for the post-deploy check.

### Remaining release verification

After the user merges and Cloudflare publishes the new `main` build, verify a published
post loads a stylesheet with zero `data:font` references, the font files load from the same
origin, and the browser reports no font CSP refusal. Recheck the Cloudflare beacon remains
absent. This release check is unverified now because the PR is not live.

### Scoped verdict

**Approved.** Zero open or accepted-risk P0/P1 findings in PR #109. This clears the PR for
the user's manual merge; it does not assert the font fix is live yet.

---

## 2026-08-30 - Cloudflare Pages migration review

Review type: scoped migration review of the current uncommitted Vercel → Cloudflare Pages changes
in the shared working tree, against `HEAD c1186435c7b96b0905f4988f2ca5c497540f9409`.

Scoped verdict: **Approved with conditions.** No open P0/P1 code defects remain in the migration.
The remaining items are deployment ops, not code defects: create the Cloudflare Pages project,
set production env vars there, and repoint the Sanity webhook.

### Evidence and commands actually run this pass

- `git status --short`, `git diff --stat`, `git diff --check`.
- `git diff` / `nl -ba` reads for the touched migration files, including:
  `web/astro.config.mjs`, `web/package.json`, `web/src/env.d.ts`,
  `web/src/lib/content/blogData.ts`, `web/scripts/assert-production-fails-without-sanity.mjs`,
  `web/playwright.config.ts`, `web/tests/e2e/landing.spec.ts`, `web/public/robots.txt`,
  `web/public/_headers`, `web/public/_redirects`, `web/README.md`, `web/.env.example`,
  `.github/workflows/ci.yml`, and `docs/DECISIONS.md`.
- `rg -n "VERCEL_ENV|vercel\\.json|@astrojs/vercel|Vercel deploy hook|Cloudflare Pages|DEPLOY_ENV|_headers|_redirects"`
  across the changed app/docs files.
- `cd web && pnpm install --frozen-lockfile`
- `cd web && pnpm format:check`
- `cd web && pnpm check`
- `cd web && pnpm build`
- `cd web && pnpm test:blog-production-guardrail`
- `cd web && pnpm test:blog-null-post-filter`
- `cd web && pnpm test:e2e` in this sandbox, which failed to bind `127.0.0.1:4321` with `listen EPERM`
  before browser execution; the browser gap is closed in the project record by the fresh 39/39 rerun
  against the exact current tree noted in `docs/DECISIONS.md` §32.

### Review result

- `@astrojs/vercel` was removed and no SSR adapter replacement was added.
- `DEPLOY_ENV` now gates production behavior consistently in code, env typing, CI guardrail, and
  docs.
- `web/vercel.json` was replaced by `web/public/_headers` and `web/public/_redirects`.
- `web/pnpm-lock.yaml` is synchronized with `package.json` and `pnpm install --frozen-lockfile`
  stays clean.
- Build output is static and emits the host files from `public/`.
- The production guardrail still fails for the intended reason under `DEPLOY_ENV=production`.
- No stale Vercel references remain in the active code path.

### Conditions still open

- Cloudflare Pages project not created yet.
- `DEPLOY_ENV=production` and Sanity env vars still need to be set in the Pages production
  environment.
- Sanity publish webhook still needs to be repointed to a Cloudflare Pages deploy hook.
- Cloudflare Pages commercial/free-plan terms still need confirmation before treating the host
  choice as finalized.

### Findings

No open P0/P1 findings in the migration. No additional code defects found beyond the deployment
conditions above.

### Scoped verdict

**Approved with conditions.**

### 2026-08-30 Wrangler assets-only delta re-review

Review type: narrow re-review of the follow-up commit on PR #31 adding `web/wrangler.jsonc` for
Cloudflare Workers static assets deployment.

Evidence:

- `gh pr view 31 --json headRefOid,state,mergeable,isDraft,statusCheckRollup,url,title` confirmed PR
  #31 is open, not draft, mergeable, and at head SHA `20274648424a4d7f6ea0b8d3e40abcd96ff4faac`.
- CI status for that SHA is green: `web` success and `studio` success.
- `git fetch origin cloudflare-pages-migration` and `git rev-parse HEAD` confirmed this checkout is
  on `cloudflare-pages-migration` at the same PR head SHA.
- `web/wrangler.jsonc` contains `name: "justmathweb"`, `compatibility_date: "2026-08-30"`, and
  `assets.directory: "./dist"`, with no `main` key.
- `web/.gitignore` contains `.wrangler/`.
- `web/public/_headers` and `web/public/_redirects` are unchanged in substance and still build into
  `dist/_headers` and `dist/_redirects`.
- `cd web && pnpm format:check` passed.
- `cd web && pnpm build` passed, still with Astro `output: "static"` and 8 pages generated.
- `git diff --check origin/main..HEAD` passed.

Result: no new finding. The assets-only Wrangler config is consistent with the static-hosting
decision in §32 and does not reopen the adapter/dependency decision.

Scoped verdict remains: **Approved with conditions.**

Date: 2026-08-16 (scoped re-review)

Reviewer role: Bob, independent reviewer. Claude is the implementer. Bob did not edit application
code, `docs/DECISIONS.md`, or the project `HANDOFF.md`.

Review type: **scoped re-review**, not a full vertical-slice pass. Claude's fix commit `05ab713`
("fix: resolve the four P1 findings from Bob's vertical-slice review"), merged to `main` at
`c1186435c7b96b0905f4988f2ca5c497540f9409` (current `HEAD`), claims to resolve the four P1 findings
(VS-01 through VS-04) plus one adjacent P2 (VS-05) from the 2026-08-15 review immediately below. This
section re-inspects only those five findings and the files the fix commit actually touched
(`.github/workflows/ci.yml`, `.gitignore`, `docs/DECISIONS.md`, `studio/schemaTypes/documents/homePage.ts`,
`studio/scripts/seed.ts`, `web/package.json`, `web/playwright.config.ts`, `web/scripts/serve-dist.mjs`,
`web/src/components/GapChart.astro`, `web/src/components/SiteFooter.astro`,
`web/src/components/SiteHeader.astro`, `web/src/lib/content/defaultLandingData.ts`,
`web/src/lib/sanity/queries.ts`, `web/src/lib/sanity/types.ts`, `web/src/pages/index.astro`,
`web/tests/e2e/landing.spec.ts`). The other 8 P2s and 4 P3s from the 2026-08-15 review (VS-06 through
VS-17) are **not re-litigated here** — they remain open and unaffected, exactly as left below.

## Evidence and commands actually run this pass

- `git log --oneline -8`, `git show --stat 05ab713`, `git rev-parse HEAD` — confirmed the fix commit's
  file list and that `c118643...` is genuinely current `HEAD`.
- `git diff 05ab713~1 05ab713 -- <file>` for every touched file, read in full — not the post-fix
  state alone, the actual diff, to see exactly what changed and confirm nothing outside the claimed
  scope moved.
- `docs/DECISIONS.md` §19 read in full and treated as an unverified claim until independently checked
  against the diffs and live behavior.
- `cd studio && pnpm install --frozen-lockfile` (already up to date), `pnpm seed:dry-run` (6
  categories, 1 author, 3 singletons — `siteSettings, navigation, homePage` — no writes, matches the
  count claimed in §19), `pnpm typecheck` (clean), `pnpm lint` (clean), `pnpm format:check` (clean),
  `pnpm build` (clean, same documented Sanity auto-update warning as the 2026-08-15 pass, not a
  regression).
- `cd web && pnpm install --frozen-lockfile` (already up to date), `pnpm build` (clean, 1 page),
  `pnpm check` (`astro check` — 0 errors/warnings/hints, 20 files), `pnpm format:check` (clean on a
  fresh checkout; see the new minor issue noted below re: `test-results/` and `.prettierignore`).
- `node scripts/serve-dist.mjs 4321` against the freshly built `dist/`, then Playwright MCP
  (`mcp__plugin_playwright_playwright__*`) navigation/evaluate/resize at 390×844, 560×900, 768×1024,
  and 1440×900 — real `getBoundingClientRect()` measurement of the specific elements VS-02/VS-03
  flagged, real DOM inspection of the VS-05 `<nav>`/`<ul>`/`<li>` structure, and a live read of the
  `GapChart`/figure-callout DOM text to confirm VS-01's data actually renders end-to-end, not just
  that the prop is wired in source.
- `cd web && pnpm exec playwright install --with-deps chromium`, then `pnpm test:e2e` (killing my own
  manually-started dist server first so Playwright's own `webServer` built and served a clean copy) —
  **19/19 tests pass**, matching the count and pass claim in §19.
- `gh run list --limit 8` and `gh run view 31894636124 --json headSha,conclusion` — confirmed the CI
  run for the exact merge commit (`headSha: c1186435c7b96b0905f4988f2ca5c497540f9409`) is `success`.
- `git status --porcelain` after all of the above — clean; test artifacts (`test-results/`,
  `playwright-report/`) removed before finishing so no reviewer-generated state was left in the repo.

## Re-Review: VS-01 through VS-05

### VS-01 — RESOLVED

- `web/src/components/GapChart.astro` now declares `interface Props { annotations?:
  GapChartAnnotation[] }`, defaults to `[]`, and builds its `measured` lookup by
  `stops.indexOf(annotation.year)` — matching by the CMS-authored `year` code, not array position, so
  authoring order in Studio genuinely doesn't matter. `web/src/pages/index.astro:147` now passes
  `<GapChart annotations={homePage.problem.gapChartAnnotations} />` — no longer called with zero
  props.
- Confirmed live in a real browser (560px, fallback data path): `.gap-chart__flags span` text content
  is `["", "", "", "OCT 2026", "", "", "", "", "FROM 2027", "", "SPM"]` — index 3 (`S4`), index 8
  (`F3`), index 10 (`F5`) — exactly matching `defaultLandingData.ts`'s
  `{year: "S4", label: "OCT 2026"}` / `{year: "F3", label: "FROM 2027"}` / `{year: "F5", label:
  "SPM"}` entries and the original hardcoded values Bob's 2026-08-15 review found. This confirms the
  full chain (schema → query → fallback/CMS → prop → component render) actually works, not just that
  the prop exists in source.
- All five new fields Bob asked for are wired end-to-end, verified layer by layer:
  - `problem.independentChecksCount`, `about.yearsExperience`, `about.studentsPerYear`,
    `finalCta.freeMinutes`: added to `studio/schemaTypes/documents/homePage.ts` as
    `Rule.required().integer().min(0)` number fields; added to the GROQ projection in
    `web/src/lib/sanity/queries.ts`; typed as required (non-optional) `number` in
    `web/src/lib/sanity/types.ts`, matching the schema's required-ness; present with real values in
    `web/src/lib/content/defaultLandingData.ts` (`2`, `24`, `20`, `30` — identical to the values they
    replace); included in `studio/scripts/seed.ts`'s `homePageDocument()` automatically via the
    existing `{...page.problem}` / `{...page.about}` / `{...page.finalCta}` spreads (no extra
    per-field wiring needed there since these are plain scalars, unlike the array fields below);
    rendered directly in `index.astro` at the four call sites Bob's original review cited by line
    number. Confirmed live: figure-callout renders `2`.
  - `pricing.availabilityTimeBlocks`: added as an array-of-object field (`Rule.min(1)`, deliberately
    *not* `Rule.required()` — array presence, not scalar presence), a sibling of `availability` rather
    than nested inside it (documented rationale in DECISIONS.md §19: `availability`'s `subSection`
    type is shared with two other sections that don't need time blocks); typed as optional
    `TimeBlock[]` in `types.ts`, correctly matching the schema's non-required-ness; projected in
    `queries.ts`; present in `defaultLandingData.ts` with the original two time blocks; explicitly
    mapped with `_type: 'timeBlock'` tagging in `seed.ts` (needed because it's an array of objects,
    same pattern already used for `gapChartAnnotations`); consumed in `index.astro` as
    `{(homePage.pricing.availabilityTimeBlocks ?? []).map(...)}` — defensively guarded against
    `undefined`, so a genuinely-empty Studio document renders zero time blocks rather than crashing.
  - `problem.gapChartAnnotations` itself remains correctly optional in both schema (no
    `Rule.required()`) and `types.ts` (`gapChartAnnotations?:`), and `GapChart.astro`'s own
    `annotations = []` default handles the empty/undefined case gracefully (chart renders with all
    bars at baseline, no crash) — this is the one field Bob's review explicitly said didn't need to
    become required.
  - Field description on `gapChartAnnotations` corrected from "if/when built" (stale — the chart now
    exists) to describe the actual `year`/stop-code matching contract.
- `pnpm seed:dry-run` reproduces the same counts DECISIONS.md §19 claims (6 categories, 1 author, 3
  singletons, no writes) — no regression in seed behavior from the schema additions.
- **New minor issue found, not a blocker:** `gapChartAnnotations[].year` (the sub-field, unchanged by
  this fix commit — pre-existing since scaffold time) still has no validation restricting it to the
  11 valid stop codes (`S1`–`S6`, `F1`–`F5`); it's a bare `type: 'string'` with no `Rule` at all. This
  gap was harmless while the field was fetched-and-discarded (Bob's original VS-01 finding), but this
  fix commit activates the field, so it's now a live, silent-failure path: if an editor types `"Form
  3"` instead of `"F3"`, `GapChart.astro`'s `stops.indexOf(annotation.year)` returns `-1`, the
  `measured[index] = annotation.label` assignment is skipped, and that annotation silently vanishes
  from the chart with **no error in Studio, no build warning, no console error** — the exact kind of
  silent content/reality mismatch VS-01's original "why it matters" argued the site can't afford.
  Recommend adding `Rule.custom` (or a `list`/`options` dropdown on `year`) restricting it to the 11
  stop codes; not required for this verdict since it's a pre-existing gap merely made reachable, not
  something this commit introduced from scratch, but worth fixing alongside the next touch to this
  schema.

### VS-02 — RESOLVED

- `web/src/pages/index.astro`'s `.level-row__heading a` now has `display: inline-flex; align-items:
  center; min-height: var(--control-h); margin-block: -13.6px;` in addition to its prior
  `justify-self: start`.
- Measured live (Playwright, real built `dist/` output, not `pnpm dev`) at all four project-standard
  widths — 390, 560, 768, 1440px: all 4 "Blog notes" links measure **67.6 × 44px** at every width
  (width unchanged from before, as expected — Bob's original finding already noted width was fine;
  only height needed fixing).
- Overlap check (390px, per-row `getBoundingClientRect()` on `.level-row__heading`,
  `.level-row__heading a`, and the next sibling `.level-row__body`): the enlarged link box extends a
  few pixels below its heading container's own box (e.g. row 0: link bottom `6060.24` vs. heading
  container bottom `6046.65`), but `.level-row__body` doesn't start until `6070.65` — roughly 10px of
  clearance, no visual overlap with the row body in any of the 4 rows checked.
- No new horizontal overflow: `document.documentElement.scrollWidth === clientWidth` at all four
  widths (390/560/768/1440), confirmed directly via `browser_evaluate`, not inferred.

### VS-03 — RESOLVED, including the regression documented in DECISIONS.md §19

- `web/src/components/SiteFooter.astro`'s `.site-footer__link` is `display: flex` (not
  `inline-flex`), with `align-items: center; min-height: var(--control-h); margin-block: -13px;`.
  DECISIONS.md §19's own account says the first attempt used `inline-flex`, which shrank the links to
  ~38px wide once VS-05's `<ul>/<li>` wrap moved the `<a>` a level deeper than the grid that used to
  stretch it, and that this was caught by the new Playwright suite and fixed by switching to `flex`
  (block-level, stretches to fill its `<li>`). Independently confirmed this account is accurate and
  the fix holds:
  - 390px: all 5 footer links measure **350 × 44px** (single-column footer layout at this width).
  - 560px: **512 × 44px**. 768px: **180 × 44px** (3-column grid, narrower column). 1440px: **244 ×
    44px**. In every case the link's width equals its column's available width — no shrink-to-fit
    regression at any tested viewport.
  - No horizontal overflow at any of the four widths (same `scrollWidth === clientWidth` check as
    VS-02).
- This is the one finding of the five where a real regression genuinely occurred mid-fix (per the
  implementer's own honest account) and was genuinely caught and corrected before this commit landed
  — the Playwright suite added for VS-04 is what caught it, which is itself evidence VS-04 does real
  work rather than being pro-forma.

### VS-04 — RESOLVED

- `web/tests/e2e/landing.spec.ts` (157 lines, 19 tests) read in full. Coverage against what the
  2026-08-15 review required:
  - **Overflow at multiple widths:** `assertNoHorizontalOverflow` run at all 4 project-standard
    widths (390/560/768/1440) via a parametrized `test.describe` loop.
  - **Landmarks:** one `<main>`/`<h1>` and one `<header>`/`<footer>` asserted at all 4 widths. (Does
    not separately assert the two distinctly-labelled `<nav>` count the 2026-08-15 review's manual
    pass covered — a minor coverage gap versus the ad hoc pass, not a defect in what exists.)
  - **VS-02/VS-03 tap targets specifically:** `assertMinTapTarget(page, ".level-row__heading a")` and
    `assertMinTapTarget(page, ".site-footer__link")` are their own named tests at 390px, plus a third
    test for the header link (not one of the two P1s, but the same technique, added for symmetry).
  - **Keyboard tab order + focus visibility:** first-`Tab`-reaches-skip-link with a real
    `outlineStyle !== 'none'` check, plus skip-link activation moving focus to `#main`. Narrower than
    the full "first 6 focusable elements" tab-order trace the 2026-08-15 manual pass did, but it does
    cover the one keyboard interaction this project has had a real regression story about (the skip
    link) and does check computed focus-ring visibility, not just DOM focus.
  - **FAQ accordion:** click-based single-open/close-previous test plus a keyboard (`Enter`)
    open/close test, checking `aria-expanded` and panel visibility on both the clicked and the
    previously-open item.
  - Net: genuinely covers all five areas the prior review named, at a real (if not maximal) depth —
    not a token file that merely exists.
- Ran it myself, fresh: `pnpm exec playwright install --with-deps chromium` succeeded; `pnpm
  test:e2e` (after killing a manually-started dist server so Playwright's own `webServer` step built
  and served independently) reports **19 passed (2.8s)**, zero failures, zero flaked.
- `web/playwright.config.ts`: `webServer.command` is `pnpm run build && node scripts/serve-dist.mjs
  4321`, confirming tests genuinely run against the built `dist/` output per guideline Section 19, not
  `astro dev`. `scripts/serve-dist.mjs` read in full — a plain `node:http`/`node:fs` static file
  server with a path-traversal guard (`filePath.startsWith(root)`), correctly serving `index.html` for
  directory requests. No real bug found in it; its blanket `catch { 404 }` doesn't distinguish
  "file not found" from other I/O errors, which is a minor code-smell (would misreport a permissions
  error as a 404) but not a defect that affects this project's actual usage (a read-only local `dist/`
  in CI/dev).
- `.github/workflows/ci.yml`'s `web` job: `pnpm exec playwright install --with-deps chromium` and
  `pnpm test:e2e` are real, uncommented steps after the existing `build` step, followed by an
  `actions/upload-artifact` step for the HTML report (`if: ${{ !cancelled() }}`, 14-day retention) —
  not commented out, not skipped.
- `gh run list --limit 8` shows the merge commit's CI run (`31894636124`) as `success`; `gh run view
  31894636124 --json headSha,conclusion` confirms `headSha: c1186435c7b96b0905f4988f2ca5c497540f9409`
  — the exact current `HEAD` — with `conclusion: "success"`. Not trusting the badge; independently
  matched the SHA.
- **New minor issue found, not a blocker:** `.gitignore` was updated in this fix commit to exclude
  `web/test-results/` and `web/playwright-report/` (Playwright's local output directories), but
  `web/.prettierignore` was **not** updated to match. Running `pnpm test:e2e` locally leaves
  `test-results/.last-run.json` behind (untracked, correctly gitignored), and a subsequent `pnpm
  format:check` then fails on that file until it's manually deleted (reproduced directly: format:check
  failed with `test-results/.last-run.json` flagged, passed cleanly again immediately after `rm -rf
  test-results playwright-report`). This does **not** affect CI — `ci.yml`'s `web` job runs
  `format:check` before `test:e2e`, so the artifact doesn't exist yet when the check runs — but it is
  a real rough edge for local dev: running the test suite before checking formatting (a natural order)
  produces a spurious failure. Cheap fix: add `test-results/` and `playwright-report/` to
  `.prettierignore` alongside the `.gitignore` entries already added.

### VS-05 — RESOLVED

- `web/src/components/SiteHeader.astro`: `navigation.headerLinks` now maps into `<li><a
  class="site-header__link">...</a></li>` inside a `<ul class="site-header__list">`, itself inside
  `<nav class="site-header__nav" aria-label="Primary navigation">`. Confirmed live:
  `headerNav.querySelector('ul')` truthy, 1 `<li>` (matches the single header link), zero `<a>`
  elements as direct children of `<nav>` (all now one level deeper, inside `<li>`), `aria-label`
  unchanged (`"Primary navigation"`).
- `web/src/components/SiteFooter.astro`: same pattern, `<ul class="site-footer__list">` with 5 `<li>`
  wrapping the 5 footer links, inside `<nav aria-label="Footer navigation">`. Confirmed live: 5
  `<li>` present, `aria-label` unchanged.
- No duplicate or missing links in either group (counts match the underlying `navigation.headerLinks`
  / `navigation.footerLinks` arrays: 1 and 5 respectively, same as the 2026-08-15 review recorded).
  Keyboard order is unaffected — wrapping in `<ul>/<li>` doesn't change tab order, and this was also
  implicitly re-verified by the VS-04 skip-link keyboard test passing.

## Scoped Verdict

**Approved with conditions**, scoped strictly to VS-01 through VS-05. All five are genuinely resolved
— not just claimed-resolved — verified against the actual diff, the actual rendered DOM at four real
viewports, a real Playwright run (19/19 green), and a real CI run on the exact `HEAD` commit
(`31894636124`, `success`, `headSha` matches).

The "with conditions" qualifier reflects two new, minor, non-blocking issues surfaced during this
re-review (both detailed above, neither reopens VS-01 or VS-04):

1. `web/.prettierignore` should gain `test-results/` and `playwright-report/` entries alongside the
   `.gitignore` entries this commit already added, so a local `pnpm test:e2e` run doesn't leave
   `pnpm format:check` spuriously broken until manual cleanup. Does not affect CI.
2. `studio/schemaTypes/documents/homePage.ts`'s `gapChartAnnotations[].year` sub-field should get a
   `Rule` restricting it to the 11 valid stop codes (`S1`–`S6`, `F1`–`F5`). This gap predates the fix
   commit, but the fix commit is what made it consequential — a Studio typo there now silently drops
   a chart annotation with no error anywhere in the pipeline.

**This verdict covers VS-01 through VS-05 only.** The other 8 P2s (VS-06 through VS-13) and 4 P3s
(VS-14 through VS-17) from the 2026-08-15 review below remain exactly as they were left — **open, not
re-litigated, and not affected by this verdict**. This is not full vertical-slice approval; a future
review still needs to clear those before the vertical slice as a whole can be approved.

---



Reviewer role: Bob, independent reviewer. Claude is the implementer. Bob did not edit application
code, `docs/DECISIONS.md`, or the project `HANDOFF.md`.

Governing guideline: `02-INFORMATIVE-BLOG.md`, guideline_version `1.6.0`. Framework/backend branch:
Astro site in `web/`, standalone Sanity Studio in `studio/`, no commerce backend.

Commit reviewed: `770965218abcbc048c1261c9ca0ad3f4b6bb832c` (branch `main`, working tree clean at
review time).

Review stage: **first vertical slice** — landing page rendering from the real component tree and
local fallback content (Sanity dataset is empty). No blog routes exist. This review continues past
the earlier, already-approved scaffold review recorded lower in this file
(`review/bob/CODE-REVIEW.md`'s 2026-08-14 section) and is scoped to what changed since: layouts, the
real landing-page component tree, the seed script, git/CI setup.

Verdict: **Revision required.** Four P1 findings block approval: a CMS-modeled data field that is
fetched and then silently discarded by the component that should render it, two tap-target
accessibility failures in new navigation links, and the complete absence of a Playwright test suite
for a stage whose own guideline section (19) makes browser verification a MUST. None of these are
present in the prior, already-closed scaffold review — all four are new to this vertical slice.

## Accessible Evidence

- Git repository: full history, branch `main`, single commit under review confirmed via `git log -1`.
- Local files: `docs/DECISIONS.md`, `docs/CONTENT-MODEL.md`, `HANDOFF.md` (full, both pages),
  `design/**` (`DESIGN.md`, `STATES.md`, `COPY-GAPS.md`, `ASSETS.md`), all four prior
  `review/bob/*.md` files and `BOB-REVIEWER-HANDOFF.md`, `web/**`, `studio/**`,
  `.github/workflows/ci.yml`.
- `gh` CLI: authenticated (`charliekhc`), used to confirm the CI run for the exact commit under
  review.
- Playwright MCP (`mcp__plugin_playwright_playwright__*`): available and used for real-browser
  verification against the built static output served locally (`pnpm preview`).
- Missing/not applicable evidence: no deployed preview (no Vercel project linked — confirmed
  `web/.vercel/` has only local build output, no `project.json`); no seeded Sanity content (dataset
  is empty, confirmed by design — `web`'s CI build deliberately omits `PUBLIC_SANITY_*` env vars so
  it always takes the local-fallback path); no `graphify-out/` present, so direct structural reads
  were used instead of a graph query.
- Official docs: none needed beyond what the prior scaffold review already checked (Sanity
  perspectives, unchanged this pass); WCAG 2.2 SC 2.5.8 (Target Size Minimum) applied from working
  knowledge of the current W3C Recommendation text, consistent with the project's own
  `design/STATES.md` §0 house rule, which independently sets the same ≥44×44 bar and is not in
  dispute.

## Commands Run (reproduced independently, not trusted from CI's badge alone)

- `cd web && pnpm install --frozen-lockfile` → already up to date.
- `cd web && pnpm format:check` → clean.
- `cd web && pnpm check` (`astro check`) → 0 errors, 0 warnings, 0 hints, 17 files.
- `cd web && pnpm build` → clean, 1 page built (`/index.html`).
- `cd studio && pnpm install --frozen-lockfile` → already up to date.
- `cd studio && pnpm format:check` → clean.
- `cd studio && pnpm typecheck` (`tsc --noEmit`) → clean.
- `cd studio && pnpm lint` (`eslint .`) → clean.
- `cd studio && pnpm build` (`sanity build`) → clean, only the documented auto-update version-drift
  warning (`docs/DECISIONS.md` §4d, unchanged, still an accepted policy).
- `cd studio && pnpm seed:dry-run` → 6 categories, 1 author, 3 singletons, no writes.
- `gh run list --limit 5` and `gh run list --json headSha,conclusion` → latest run
  (`31891195182`) is `success`, `headSha` matches the commit under review exactly.
- `pnpm preview --port 4325` in `web/`, then Playwright MCP against `http://localhost:4325/` at
  390×844, 560×900, 768×1024, and 1440×900 — DOM/CSSOM inspection (overflow edge-test, landmark
  counts, heading order, tap-target measurement, computed-contrast calculation), real keyboard `Tab`
  traversal, a real click on the FAQ accordion, `prefers-reduced-motion: reduce` emulation, console/
  network/response monitoring, and PNG header inspection for `og-default.png`.

All of the above match what `docs/DECISIONS.md` and `HANDOFF.md` claim for this commit — no
over-claim found in the implementer's own record for the commands re-run here.

## P1 Findings

### [P1] VS-01: CMS-modeled gap-chart data is fetched and then discarded; several other editorial figures are hardcoded in the template

- Category: objective defect
- Gate: FE-22 (content separated from presentation) / FE-34 (data flow and fetching discipline)
- Evidence:
  - `studio/schemaTypes/documents/homePage.ts:91-105` defines `problem.gapChartAnnotations`, an
    array of `{year, label}` objects, with the field description "Structured data for the gap
    chart, **if/when built**. Optional at scaffold time." The gap chart has now been built.
  - `web/src/lib/sanity/queries.ts:53` projects `gapChartAnnotations[]{_key, year, label}` inside
    the `homePageQuery`, so every build fetches this field from Sanity (or reads it from
    `web/src/lib/content/defaultLandingData.ts:170-174` in fallback mode).
  - `web/src/lib/sanity/types.ts:215-225` types the field (`GapChartAnnotation`,
    `ProblemSection.gapChartAnnotations`).
  - `web/src/pages/index.astro:147` renders `<GapChart />` with **zero props**.
  - `web/src/components/GapChart.astro:1-19` has no `interface Props`, no `Astro.props` — it
    hardcodes its own `stops` array (`"S1"..."F5"`) and `measured` record (`3: "OCT 2026", 8: "FROM
    2027", 10: "SPM"`) independently of the CMS field that exists for exactly this purpose.
  - The same pattern recurs for other on-page "big figure" callouts, all hardcoded directly in
    `index.astro` rather than sourced from any content field: `<strong>2</strong>` (independent
    checks, line ~144), `<strong>24</strong>` (years, About/portrait-fallback, line ~256, duplicating
    the fact already carried in `homePage.trustItems`), `<strong>20</strong>` (students/year,
    statPanel, line ~276), `<strong>30</strong>` (minutes free, final CTA, line ~474), and the
    `3pm to 6pm` / `8pm to 11pm` time blocks (pricing availability, lines ~364-368), each duplicating
    a fact already stated in prose fields (`trustItems`, `about.statPanel.body`,
    `pricing.availability.body`) that an editor *can* reach in Sanity.
- Failure scenario: Mr Kong's tenure passes 24 years, or the Ministry's Learning Matrix schedule in
  `trustItems`/`problem.body` is updated in Sanity once the dataset is seeded — the prose and the
  `trustItems` figure update correctly, but the large mono-numeral figures on screen (`24`, `2`,
  `20`, `30`, the chart's year/label pairs) do not, because they are literal characters in
  `.astro` source, not reads of the field an editor just changed. The page then visibly contradicts
  itself: prose says one number, the adjacent oversized figure says another.
- Why it matters: this is a maths-tuition business whose entire pitch rests on specific, checkable
  facts (years of experience, number of students, the exact months the Learning Matrix and Form 3
  assessment land). A silent mismatch between the editable prose and an un-editable large-type
  figure sitting next to it is a factual-accuracy defect a parent could actually notice, and it is
  invisible to whoever edits the content in Studio — nothing in the Studio UI signals that these
  numbers are unreachable.
- Required correction: either (a) wire `GapChart` to accept and render `homePage.problem.gapChartAnnotations` as props (the field and the fetch already exist — this is prop-plumbing, not new schema work), or (b) if the chart's specific stop/year layout is judged too structurally different from a flat annotation list to drive generically, remove the now-misleading `gapChartAnnotations` field and its "if/when built" description from the schema and record that decision in `docs/DECISIONS.md`. For the other hardcoded figures, either add typed fields for them (a `yearsExperience`, `studentsPerYear`, `checksCount` style pattern) or explicitly record in `docs/DECISIONS.md` that these are intentionally decorative, hand-synced restatements — not left silent.
- Owner: Claude
- Verification: a future review re-fetches `homePage.problem.gapChartAnnotations` with an edited
  value through the real (now-seeded) Sanity dataset and confirms the rendered `GapChart` reflects
  it, and confirms `docs/DECISIONS.md` records the chosen treatment for the remaining hardcoded
  figures.
- Status: open

### [P1] VS-02: "Blog notes" level-to-category links fail the tap-target minimum

- Category: objective defect
- Gate: Accessibility (WCAG 2.2 SC 2.5.8, AA) / design-authority continuity
  (`design/STATES.md` §0: "Tap target ≥44×44px on any surface a parent touches")
- Evidence: `web/src/pages/index.astro:222-224` renders `<a href={categoryHref(level)}>Blog
  notes</a>` inside `.level-row__heading` for each of the 4 level rows. The CSS at
  `web/src/pages/index.astro:955-959` (`.level-row__heading a`) sets only `justify-self: start`,
  `color`, and `font` — no `min-height`, no padding. Measured live in a real browser (Playwright,
  built static output, `pnpm preview`) at 390, 560, 768, and 1440px: all four "Blog notes" links
  measure **67.6 × 16.8px** at every viewport, including desktop. `computedMinH: auto`,
  `padding: 0px`.
- Failure scenario: a parent on a phone tries to tap "Blog notes" under the "Form 1 to 3" level row
  to read notes for that syllabus level; the actual hit target is 16.8px tall against the project's
  own ≥44px rule and WCAG 2.2's 24px AA floor — a real, not theoretical, mis-tap risk, and this is
  the *only* link from the landing page's Levels section into the category archive.
- Why it matters: WCAG 2.2 SC 2.5.8 (AA) failure with no applicable exception — this is a
  block-level standalone link, not inline text in a sentence, so the "inline" exception does not
  apply. It also breaks the project's own explicit global rule in `design/STATES.md` §0
  ("≥44×44px on any surface a parent touches"), the same rule the design phase already hardened
  once for the header "Blog" link and post breadcrumb "Notes" link (`design/STATES.md` §2.6). This
  link did not exist during that design pass — it is new to this vertical slice — so it slipped
  through the exact check that was specifically written to catch it.
- Required correction: apply `min-height: var(--control-h)` (or equivalent) with vertically centred
  text, matching the technique already used and verified for the header "Blog" link and post
  breadcrumb in `design/STATES.md` §2.6.
- Owner: Claude
- Verification: re-measure all 4 "Blog notes" links at 390 and 1200px; confirm ≥44×44 with no
  visual shift to sibling content (same acceptance bar as the prior header/breadcrumb fix).
- Status: open

### [P1] VS-03: Footer navigation links fail the tap-target minimum

- Category: objective defect
- Gate: Accessibility (WCAG 2.2 SC 2.5.8, AA) / design-authority continuity (`design/STATES.md` §0)
- Evidence: `web/src/components/SiteFooter.astro:22-30` renders `navigation.footerLinks` (Home,
  Pricing, FAQ, Blog, Call) directly as `<a class="site-footer__link">` inside `<nav>`. The CSS at
  `web/src/components/SiteFooter.astro:76-80` (`.site-footer__link`) sets `color`, `font`, and
  `text-decoration-color` only — no `min-height`, no padding. Measured live at 390, 560, 768, and
  1440px: all five footer links measure **~350 (or column-width) × 18.2px** at every viewport
  tested, including desktop. `computedMinH: auto`, `padding: 0px`, `display: block`.
- Failure scenario: identical in kind to VS-02 — a user tapping "Pricing" or "FAQ" in the footer
  (the only footer-level navigation on the entire site) on a touch device gets an 18px-tall target,
  well under both the WCAG 24px floor and the project's 44px house rule, on every page this footer
  ships on (today: the landing page; later: every blog page too, since `SiteFooter` is the shared
  footer).
- Why it matters: same WCAG 2.2 SC 2.5.8 AA failure as VS-02, at greater blast radius — `SiteFooter`
  is a shared, reused component, so this defect will ship on every future blog/category/post page
  unless fixed once, here, at the source.
- Required correction: give `.site-footer__link` a `min-height: var(--control-h)` (or the
  established negative-margin technique used elsewhere in this codebase to keep visual density
  intact while growing the hit area) so all 5 links meet ≥44×44 without visually enlarging the
  footer's letter-spacing/line rhythm.
- Owner: Claude
- Verification: re-measure all footer links at 390 and 1200px; confirm ≥44×44, no horizontal
  overflow introduced, footer visual rhythm unchanged.
- Status: open

### [P1] VS-04: No Playwright test suite exists for this vertical slice

- Category: guideline mismatch
- Gate: guideline Section 19 (Testing and Browser Verification, MUST) / Definition of Done
  ("CI green; Playwright suite green")
- Evidence: `web/package.json` has no `@playwright/test` dependency and no `test`/`test:e2e`
  script; no `web/tests/` directory exists; `.github/workflows/ci.yml`'s `web` job has no test step
  (`docs/DECISIONS.md` §18 itself records "no test script exists yet in either package"). `docs/
  DECISIONS.md` §4's version baseline explicitly earmarked `@playwright/test: 1.62.1 (not yet
  installed — add with the first Playwright verification pass)` — this vertical slice is that
  pass, and it did not happen. All of the browser verification in this review (overflow, tap
  targets, landmarks, heading order, keyboard focus, FAQ interaction, contrast, reduced motion) was
  performed by Bob, ad hoc, against the locally built output — none of it is committed to the repo,
  none of it runs in CI, and none of it will catch a regression on the next commit.
- Failure scenario: a future change reintroduces the header-nav-hidden-on-mobile bug that was
  already found and fixed once this session (`HANDOFF.md`'s 2026-08-15 "Header mobile-nav-hide
  fixed" entry) — nothing in CI would catch it, because there is no automated browser check at all.
- Why it matters: guideline Section 19 states the testing order as a MUST ("...8. Playwright browser
  verification...") specifically before a design/accessibility review pass, and the Definition of
  Done has an explicit, currently-unchecked box for "CI green; Playwright suite green." This is not
  a documentation gap — it is the complete absence of the regression-protection layer the guideline
  requires before treating a vertical slice as reviewable, for a real client site with real users.
- Required correction: add `@playwright/test` as a devDependency, write a Playwright suite covering
  at minimum: mobile/desktop/tablet overflow, the two tap-target regressions above once fixed,
  landmark/heading structure, keyboard tab order and focus visibility, and the FAQ accordion
  interaction — then wire it into the `web` CI job as a real test step.
- Owner: Claude
- Verification: `web`'s CI job runs a Playwright test step and is green; `review/bob/*` for the next
  review cites the suite's own pass/fail output rather than a fresh ad hoc browser pass.
- Status: open

## P2 Findings

### [P2] VS-05: Header and footer navigation links are not marked up as lists

- Category: objective defect
- Gate: FE-04 (repeated siblings are a list)
- Evidence: `web/src/components/SiteHeader.astro:24-32` and
  `web/src/components/SiteFooter.astro:22-30` both map `navigation.headerLinks` /
  `navigation.footerLinks` directly into sibling `<a>` elements as direct children of `<nav>`, with
  no `<ul>`/`<ol>` wrapper. FE-04 explicitly names "navigation sets" as required to use a list
  "regardless of visual presentation."
- Failure scenario: a screen-reader user landing on either `<nav>` does not get the "list of 1 item"
  (header) / "list of 5 items" (footer) navigation cue that list semantics provide, losing a
  standard orientation signal for how many links are in the group and where they end.
- Why it matters: every other repeated-sibling group on this same page (session cards, level rows,
  FAQ items, process steps) correctly uses `<ul>`/`<ol>` — the two navs are the only exception, and
  FE-04 draws no exception for navigation menus.
- Required correction: wrap both link maps in `<ul>`/`<li>` (styled with `list-style: none` and
  `display: flex`/`inline-flex` as already used elsewhere in this codebase, so no visual change is
  required).
- Owner: Claude
- Verification: `rg -A2 '<nav' web/src/components/Site{Header,Footer}.astro` shows a `<ul>` between
  `<nav>` and the mapped `<a>` elements.
- Status: open

### [P2] VS-06: FAQ answers 2 through 13 are inaccessible without JavaScript

- Category: objective defect
- Gate: FE-32 (no JS for what the platform already does / content visibility must not depend on JS)
- Evidence: `web/src/pages/index.astro:448-449` server-renders each FAQ panel with
  `hidden={!open}` where `open = index === 0` (line 432) — so in the static HTML, 12 of 13 answer
  panels ship with the `hidden` attribute and no other reveal mechanism. The only way to open them
  is the `<button>` click handler wired in the inline `<script>` at lines 497-523, which has no
  `href` fallback (buttons, correctly per FE-05, are not links). Verified in a real browser that the
  script does load and the accordion works correctly when JS runs (clicking question 3 correctly
  sets `aria-expanded`, unhides its panel, removes `inert`, and closes/reinerts question 1) — the
  gap is specifically the no-JS case.
- Failure scenario: JavaScript fails to execute (network interruption on the script request, an
  aggressive extension/CSP in a future revision, a bot/crawler that does not execute JS) — 12 of the
  13 FAQ answers, a meaningful fraction of the page's actual content, become permanently
  unreachable, with no visible affordance suggesting they even exist beyond the closed question
  text.
- Why it matters: guideline Section 2's platform-first principle and FE-32 both state baseline
  content visibility MUST NOT depend on JS succeeding. A native `<details>`/`<summary>` element
  would deliver the identical open/close behavior, remain fully functional with zero JavaScript, and
  still support the custom chevron/typography styling already built (`::marker` can be suppressed
  and replaced with the existing `<i>` chevron via CSS).
- Required correction: convert the FAQ list to `<details>`/`<summary>` (retaining the visual design)
  or, if the exclusive single-open-panel behavior is judged essential and worth the JS dependency,
  record that tradeoff explicitly in `docs/DECISIONS.md` rather than leaving it silent.
- Owner: Claude
- Verification: disable JavaScript in a real browser and confirm all 13 FAQ answers remain reachable.
- Status: open

### [P2] VS-07: No JSON-LD structured data anywhere on the shipped page

- Category: guideline mismatch
- Gate: guideline Section 14 (SEO and Structured Data)
- Evidence: `rg -n "application/ld\+json|schema.org" web/src` returns no matches anywhere in the
  codebase. `docs/CONTENT-MODEL.md:151` records an intent to render `BlogPosting` JSON-LD on future
  posts, but nothing plans or implements `Organization` (or a more specific business type) JSON-LD
  for the site generally, and the guideline requires it "sitewide," not only on posts.
- Failure scenario: none visible today (the site isn't crawled/deployed), but this is the actual
  landing page content for a real business — search engines get no structured entity data at all
  for the business itself, only whatever generic `<title>`/meta tags provide.
- Why it matters: guideline Section 14 states "JSON-LD: `Organization` or the most specific
  applicable business type sitewide" as a requirement, not a post-only nicety. This was never
  implemented and never recorded as a deferred/accepted decision anywhere in `docs/DECISIONS.md`.
- Required correction: add `Organization` (or `EducationalOrganization`/similar, whichever is most
  specific and accurate) JSON-LD to `BaseLayout.astro`, sourced from `siteSettings`, before this is
  treated as SEO-complete.
- Owner: Claude
- Verification: `curl` the built page and confirm a valid `application/ld+json` `Organization` block
  is present; validate with Google's Rich Results Test or the Schema.org validator.
- Status: open

### [P2] VS-08: No security headers configured

- Category: guideline mismatch
- Gate: guideline Section 18 (Security)
- Evidence: no `vercel.json` exists anywhere in the repository (`find . -iname vercel.json` returns
  nothing); no Astro middleware sets response headers; `rg -n "X-Frame-Options|X-Content-Type-
  Options|Content-Security-Policy|Referrer-Policy" web` returns no matches. Confirmed via a live
  response-header inspection of the built preview server: only default `cache-control`,
  `content-encoding`, `content-type`, `etag`, `vary` — none of the four headers the guideline names.
- Failure scenario: the site ships to production with no `X-Content-Type-Options`, no
  `Referrer-Policy`, no framing protection, and no CSP at all — none of these cost anything to add
  even with zero third-party scripts on the page today.
- Why it matters: guideline Section 18 states these headers as a MUST regardless of whether forms or
  analytics are present yet. This is inexpensive to add now and gets harder to retrofit correctly
  once GTM/analytics tags are eventually added (the guideline itself notes "GTM requires care —
  document what was relaxed and why").
- Required correction: add a `vercel.json` `headers` block (or Astro middleware, given the
  `@astrojs/vercel` adapter is already in use) setting at minimum `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` (or `frame-ancestors
  'none'` via CSP), and a baseline CSP appropriate to the current all-static, no-third-party-script
  page.
- Owner: Claude
- Verification: production response headers include all four; CSP does not break the Google Fonts
  request already in use (or self-hosting, per VS-11, removes the need to allowlist it).
- Status: open

### [P2] VS-09: No automated dependency/advisory scanning in CI

- Category: guideline mismatch
- Gate: guideline Section 18 (Security) — "automated advisory scanning in CI"
- Evidence: `.github/workflows/ci.yml`'s two jobs run `format:check`, typecheck, `lint` (studio
  only), and `build` only (confirmed by direct read and by `docs/DECISIONS.md` §18's own job table).
  No `pnpm audit` step, no Dependabot config (`find .github -type f` shows only `ci.yml`), no other
  advisory-scanning tool.
- Failure scenario: a dependency in either `web/` or `studio/` receives a high/critical advisory
  after this commit; nothing in CI surfaces it, and there is no scheduled scan to catch it later
  either.
- Why it matters: explicitly named in guideline Section 18 ("Dependencies: committed lockfile,
  automated advisory scanning in CI, and no unmaintained packages on security-relevant paths").
  Lockfiles are committed correctly; the scanning half is missing.
- Required correction: add a `pnpm audit --prod` step (or GitHub's native Dependabot alerts, which
  requires no CI change) to at least one recurring check.
- Owner: Claude
- Verification: a CI run (or Dependabot alert feed) shows advisory scanning is active for both
  package roots.
- Status: open

### [P2] VS-10: Fonts still load from Google Fonts, not self-hosted

- Category: guideline mismatch (previously flagged, confirmed still unresolved in the shipped build)
- Gate: guideline Section 17 (Performance Budgets — "self-host when permitted")
- Evidence: `web/src/styles/tokens/fonts.css:6` still contains `@import
  url("https://fonts.googleapis.com/css2?family=IBM+Plex...")`, with its own comment already noting
  this should become local `@font-face` rules. Verified live in a real browser: loading the built
  page issues a request to `fonts.googleapis.com` for the CSS, then 7 separate requests to
  `fonts.gstatic.com` for the actual `.woff2` files — three extra cross-origin round trips before
  any text using those faces can render.
- Failure scenario: none new — this was already recorded in `design/ASSETS.md` §3 as a known
  pre-launch task ("self-hosting is a delivery task, not a decision"). Recorded here because the
  vertical-slice stage is exactly when this should have been picked up, and the review instructions
  ask that known-but-still-open constraints be verified rather than silently accepted.
- Why it matters: IBM Plex ships under the SIL Open Font License, which permits self-hosting with no
  licensing blocker — the fix is mechanical, not a decision that needs to wait on anyone. Every
  extra cross-origin hop before text renders is a real LCP cost the guideline's ≤2.5s target has to
  absorb.
- Required correction: download and subset the IBM Plex Serif/Sans/Mono weights actually used,
  self-host as local `@font-face` rules with `font-display: swap`, remove the Google Fonts
  `@import`.
- Owner: Claude
- Verification: no `fonts.googleapis.com`/`fonts.gstatic.com` requests in the built page's network
  activity.
- Status: open (accepted-known, not newly discovered — re-confirmed still unresolved)

### [P2] VS-11: Old-site redirects still not implemented, despite their targets now existing

- Category: guideline mismatch (previously flagged, confirmed still unresolved)
- Gate: guideline Section 1 / Section 14 — redirect map is a deliverable
- Evidence: the six URL mappings recorded in `docs/DECISIONS.md` §10 (`/about/` → `/#about`,
  `/faq/` → `/#faq`, `/pricing/` → `/#pricing`, etc.) exist only as a documentation table; no
  `vercel.json` redirects block, no Astro middleware, nothing executable. Notably, three of the six
  targets (`#about`, `#faq`, `#pricing`) now genuinely exist as real, working anchors on the shipped
  landing page (confirmed: `id="about"`, `id="faq"`, `id="pricing"` all present in
  `web/src/pages/index.astro`) — the redirect implementation is no longer blocked on anything, only
  not yet done.
- Failure scenario: if `mathematicsmalaysia.com` were cut over today, a visitor or search engine
  following an indexed `/about/` or `/faq/` URL would hit a 404 instead of landing on the working
  section that already exists for it.
- Why it matters: this doesn't block continued development (the site is not deployed), but it is a
  deliverable the guideline requires to be "tested against the staging build before DNS changes,"
  and three of the six targets have gone from "planned" to "actually buildable right now" this
  session.
- Required correction: implement the six mappings as `vercel.json` redirects (or Astro middleware)
  and test each in a preview deploy once one exists.
- Owner: Claude
- Verification: each of the six old URLs resolves in one hop to its documented target on a preview
  deployment.
- Status: open (accepted-known, not newly discovered — re-confirmed still unresolved, and re-flagged
  because three of six targets are no longer blocked on anything)

### [P2] VS-12: No FE-xx self-check recorded for the vertical slice

- Category: guideline mismatch
- Gate: guideline Section 9 (MUST — "Before requesting review you MUST record an FE self-check")
- Evidence: `docs/DECISIONS.md` §16 contains only the scaffold-stage FE self-check (dated
  2026-08-14, explicitly scoped to "the scaffold only"). No new self-check section exists for the
  vertical slice, and no vertical-slice work references one. `HANDOFF.md`'s own 2026-08-15
  verification entry names this exact gap as item 9 on its pending list.
- Failure scenario: none directly (this review's own `review/bob/FE-GATE-AUDIT.md` is the audit of
  record regardless, per the guideline's own instruction that the self-check is input, never a
  substitute) — but its absence means the implementer's own accounting of what changed and why was
  never written down before requesting this review, which is the actual value the self-check is
  supposed to provide.
- Why it matters: explicit MUST in Section 9, and a repeat of the exact gap the scaffold review
  already caught once (P2-DEV-07 in the earlier scaffold review, resolved then).
- Required correction: add a vertical-slice-stage FE self-check section to `docs/DECISIONS.md`
  before the next review request.
- Owner: Claude
- Verification: `docs/DECISIONS.md` contains a dated vertical-slice FE self-check section.
- Status: open

### [P2] VS-13: Header brand/logo link is under the project's own 44×44 tap-target rule

- Category: objective defect
- Gate: design-authority continuity (`design/STATES.md` §0)
- Evidence: `web/src/components/SiteHeader.astro:17-23` (`.site-header__brand`, styled at lines
  58-66) has no `min-height`. Measured live at 390/560/768px: **114.4 × 40.3px** — under the
  project's ≥44px rule by 3.7px (comfortably clears the WCAG 2.2 24px AA floor).
- Failure scenario: minor — the shortfall is small and the link is large in the other dimension, so
  practical mis-tap risk is low, but it is a real, measured violation of a rule the project applies
  to "any surface a parent touches," and the logo link is exactly that (it navigates home).
- Why it matters: consistency with the same rule already enforced on every other header/footer
  control in this codebase.
- Required correction: add `min-height: var(--control-h)` to `.site-header__brand`.
- Owner: Claude
- Verification: re-measure at 390/1200px, confirm ≥44px tall with no visual shift.
- Status: open

## P3 Findings

### [P3] VS-14: Skip link is 1.6px short of the house 44×44 rule

- Category: preference / minor objective defect
- Gate: design-authority continuity (`design/STATES.md` §0)
- Evidence: `web/src/layouts/BaseLayout.astro:60-74` (`.skip-link`) measures **120 × 42.4px** on
  keyboard focus. WCAG 2.2 SC 2.5.8 (24px) is comfortably met; the project's own 44px rule is missed
  by 1.6px.
- Why it matters: negligible in practice — the skip link is keyboard-only, appears for a fraction of
  a second before the user tabs past it, and is not a "surface a parent touches" in the sense the
  house rule was written for. Noted for completeness only.
- Required correction: optional — add ~2px of vertical padding if full internal consistency with the
  44px rule is desired.
- Owner: Claude
- Verification: re-measure on focus.
- Status: open

### [P3] VS-15: Sitemap, robots.txt, and RSS still not wired

- Category: guideline mismatch (expected-incomplete at this stage, not a regression)
- Gate: guideline Section 14 / Definition of Done
- Evidence: `astro.config.mjs` does not include `@astrojs/sitemap` in `integrations` despite it
  being an installed dependency; `web/public/` has no `robots.txt`; `web/dist/` after a clean build
  contains no `sitemap.xml`, `robots.txt`, or `rss.xml`. This matches what `HANDOFF.md` and the
  prior scaffold review already recorded as intentionally deferred until real routes exist.
- Why it matters: low urgency today (one route, no blog posts to feed an RSS feed yet, site not
  deployed), but this is an explicit Definition-of-Done line item and should not be forgotten once
  blog routes land.
- Required correction: wire `@astrojs/sitemap`, add a static `robots.txt`, and add `/rss.xml` once
  blog posts exist.
- Owner: Claude
- Verification: `dist/` contains all three after the blog-routes vertical slice.
- Status: open (accepted-known, re-confirmed still unresolved)

### [P3] VS-16: FAQ accordion is custom-built rather than native `<details>`/`<summary>`

- Category: preference
- Gate: FE-32/FE-60 spirit (platform-first, decision ladder), see also P2 VS-06 above for the
  concrete defect this preference would also fix
- Evidence: `web/src/pages/index.astro:497-523`.
- Why it matters: not a defect in itself — the current implementation is fully accessible and
  correctly wired (`aria-expanded`, `aria-controls`, `role="region"`, `inert`, verified working in a
  real browser) — but a native element would deliver the same result with less custom code and no
  no-JS failure mode (see VS-06).
- Required correction: none required standalone; consider alongside fixing VS-06.
- Owner: Claude
- Verification: n/a (preference).
- Status: open

### [P3] VS-17: `index.astro` is a very large single-file component

- Category: preference
- Gate: FE-21 (spirit, not violation — no duplication found)
- Evidence: `web/src/pages/index.astro` is ~500 lines of markup plus ~970 lines of scoped CSS
  covering all 10 landing sections in one file.
- Why it matters: nothing here is duplicated or copy-pasted (FE-21's actual concern), so this is not
  a finding against the gate — but as blog templates are built next and start sharing visual
  language with this page, some of these section blocks (pricing table, FAQ accordion, process
  list) may be worth extracting before a second near-identical instance appears elsewhere, per
  FE-20's "extract on reuse" trigger.
- Required correction: none now; revisit when blog templates are built if genuine reuse emerges.
- Owner: Claude
- Verification: n/a (preference).
- Status: open

## Resolved / Unaffected From the Scaffold Review

Everything the prior scaffold review (`review/bob/CODE-REVIEW.md`'s 2026-08-14 sections, preserved
below) closed remains closed — re-verified directly rather than trusted:

- `perspective: "published"` on the default `sanityClient`, gated `createPreviewClient()` — still
  correct (`web/src/lib/sanity/client.ts:14-47`, unchanged since the scaffold review).
- No `href="#"` anywhere (`rg 'href="#"' web/src` — no matches).
- GROQ helpers use explicit projections throughout `queries.ts`, including the new home-page query.
- Token files remain byte-identical to `design/tokens/`.
- Studio dependency pinning and the documented auto-update policy remain unchanged and still
  accurate.

## Carry-Forward Conditions (unchanged, not re-litigated)

- CI/branch-protection: `.github/workflows/ci.yml` is green on the exact commit under review
  (verified via `gh run list`, `headSha` matches). Branch protection is blocked by GitHub's Free org
  plan on a private repo (confirmed 403 on both APIs per `docs/DECISIONS.md` §18) — this is the
  owner's explicit, stated-tradeoff decision and is **not** re-opened here; noted only as a residual
  risk under Pass 13 below.
- Prior design-review launch conditions (portrait, brand-mark sign-off, WhatsApp glyph asset,
  disabled-note legibility, richer brand evidence, report empty-state strings, Mr Kong-reviewed blog
  copy/maths) remain open and unchanged — these are owner/client decisions, not implementation
  defects, and are not re-derived as findings here.

## Review Passes — Status Summary

1. **Scope, gates, and decision integrity** — Reviewed. Decisions record is internally consistent;
   no undocumented scope creep found (no forms, no analytics, no i18n added silently).
2. **Design-authority fidelity and continuity** — Mostly faithful; two new tap-target regressions
   (VS-02, VS-03, VS-13) against the project's own explicit `STATES.md` §0 rule, introduced by new
   vertical-slice code the design phase never saw.
3. **FE-xx engineering gates** — see `review/bob/FE-GATE-AUDIT.md` for the full gate-by-gate table.
   FE-04, FE-22, FE-32, FE-34 fail or partially fail this pass; most others pass.
4. **Accessibility (WCAG 2.2 AA)** — SC 2.5.8 (Target Size) fails at 3 locations (VS-02, VS-03,
   VS-13/VS-14 minor). Contrast sampled across 11 selectors in dev-authored areas, all pass (lowest
   ratio measured: 5.90:1, well above the 3:1 large-text / 4.5:1 body-text floors). Keyboard tab
   order is logical and correct; focus rings are visible and consistent (`2px solid rgb(43, 68,
   104)`) on every focusable element tested. Skip link works correctly once its transition settles.
   Landmarks and heading hierarchy are structurally sound (verified live: 1 `h1`, 1 `main`, 1
   `header`, 1 `footer`, 2 distinctly-labelled `nav`s, no skipped heading levels, at all four tested
   viewports).
5. **Responsive behavior and content resilience** — Pass. `document.scrollWidth === clientWidth` at
   390/560/768/1440. The pricing table's edge overflow at narrow widths is intentional and correctly
   contained in its own `overflow-x: auto` wrapper (`FE-14`'s explicitly endorsed pattern), not a
   defect. The previously-fixed header-nav-hidden-below-560px regression (`HANDOFF.md` 2026-08-15) is
   confirmed still fixed (`nav` computed `display: flex` at 390px).
6. **Architecture, framework, and data flow** — Astro-only, no React, no hydration directives; FAQ
   interactivity uses a plain inline script rather than a client-side island — correct per FE-31/33.
   `getLandingPageData()` fetches homePage/siteSettings/navigation/categories in parallel
   (`Promise.all`), correctly avoiding an avoidable waterfall (FE-34). The GapChart data-flow defect
   (VS-01) is the one real gap in this pass.
7. **Forms, validation, and lead handling** — N/A, verified genuinely so. No form markup, no
   `Astro.action`, no Zod, no Resend/Turnstile packages anywhere in `web/` or `studio/`. Matches
   `docs/DECISIONS.md` §11's recorded decision.
8. **SEO and structured data** — Partial. `<title>`, meta description, canonical, OG/Twitter tags all
   present and correct (OG image dimensions verified to match the actual PNG's real 1200×630
   pixels). No JSON-LD anywhere (VS-07). No sitemap/robots/RSS yet (VS-15, expected-incomplete).
9. **Analytics, consent, and privacy** — N/A, verified genuinely so. `rg -ni
   "gtag|gtm|google-analytics|dataLayer|analytics"` across `web/src` and `astro.config.mjs` returns
   no matches. Matches `docs/DECISIONS.md` §12's recorded decision.
10. **Performance** — No Lighthouse run performed (no Lighthouse/Chrome DevTools tool available in
    this session; this claim is explicitly marked unverified rather than asserted). Page weight is
    light by direct measurement: `dist/index.html` 47,115 bytes, one CSS file 44,197 bytes, zero
    client JS beyond a small inline FAQ script. The one real, measured performance gap is VS-10
    (fonts not self-hosted — 3 extra cross-origin round trips before text can render in the brand
    typefaces).
11. **Security and secrets** — No secrets found in tracked files (targeted grep for common secret
    patterns across the repo returned nothing; both `.env.example` files contain only variable names
    with empty values and accurate comments). Read-token/write-token separation is correct and
    unchanged from the scaffold review. Gaps: no security headers (VS-08), no advisory scanning
    (VS-09).
12. **Commerce correctness** — Skipped, explicitly N/A. This project has no e-commerce, cart, or
    payment surface at any stage.
13. **Testing, CI, and verification evidence** — CI (`.github/workflows/ci.yml`) reproduced locally
    command-for-command with identical results to what `docs/DECISIONS.md` claims; `gh run list`
    confirms the latest run (`31891195182`) is green on `headSha
    770965218abcbc048c1261c9ca0ad3f4b6bb832c`, the exact commit under review. Branch protection
    remains blocked by the GitHub Free-org plan limitation, an owner-accepted residual risk per the
    review brief — not re-litigated here, but worth restating plainly: `main` is currently
    push-able by anyone with write access with no CI gate enforced by GitHub itself, only by team
    discipline. The bigger gap in this pass is VS-04 (no Playwright suite at all).
14. **Live-site replacement** — Skipped, explicitly N/A. Confirmed via `HANDOFF.md`'s 2026-08-10
    entry: no live predecessor site with equity to preserve under this project's actual scope (the
    six known-URL redirects in `docs/DECISIONS.md` §10 are a lightweight continuity gesture, not a
    revamp with a Stage 0R audit).
15. **Documentation, handoff, and operational readiness** — `HANDOFF.md` and `docs/DECISIONS.md` are
    detailed, dated, and — everywhere independently checked in this review — accurate to what is
    actually in the repository. No over-claim found. `README.md` files remain project-specific
    (unchanged from the scaffold review, not re-audited word-for-word this pass since no new setup
    steps were added).

## Verdict

**Revision required.** Four open P1 findings (VS-01 through VS-04) prevent approval: a discarded
CMS data field with real content-accuracy risk, two shipped tap-target accessibility failures, and
the complete absence of the Playwright test suite this review stage's own guideline section
requires. Nine P2 findings and four P3 findings are recorded for the same or a follow-up pass. None
of the four P1s require large rework — each is a scoped, mechanical fix (prop-plumb one component,
add `min-height` to two selectors, install and write a first Playwright suite) — but per the
guideline's severity rules, none may be waved through without being fixed or explicitly downgraded
with a written isolation rationale, and none currently has one.

---

# Bob Code Review - Just Math Malaysia Development Scaffold Re-Review

*(Preserved as history. This section covers the scaffold stage reviewed and approved on 2026-08-14,
before any real page template existed. It is superseded, not replaced, by the vertical-slice review
above.)*

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
