# Bob FE Gate Audit — Vertical Slice Review

## 2026-10-07 — PR #124 web Sharp update at `5378405`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Indirect lockfile update; Sharp makes site images at build time | Pass with scope correction | Only `web/pnpm-lock.yaml` changes: optional `sharp` 0.35.4 → 0.35.5, platform packages, and bundled libvips 1.3.3 → 1.3.4. Site portrait/blog components use Sanity CDN URLs; no direct Sharp or `astro:assets` use found. Upstream releases checked. |
| FE-50 verification | Exact-head checks green; images build and show | Pass for PR scope | Actions run `37624842512` targets `5378405`: frozen install, audit, format, Astro check, build, guards, and Playwright pass; Studio and Workers Builds pass. Cloudflare commit preview home page and portrait JPEG return 200; JPEG is 600×750. The preview image is delivered by Sanity CDN, so it does not test Sharp transformation directly. |

Other FE gates were not reopened by this indirect lockfile update. **Scoped verdict: Approved** for Charlie's manual merge of exact head `5378405`.

---

## 2026-10-07 — PR #121 web smol-toml update at `de6f3c4`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Indirect lockfile update | Pass for PR scope | Only `web/pnpm-lock.yaml` changes: `smol-toml` 1.8.0 → 1.9.0, integrity, and Astro/internal-helper references. Upstream notes describe parser changes and the reviewed advisory identifies 1.9.0 as patched. |
| FE-50 verification | Exact-head checks green | Pass for PR scope | Actions run `37621687836` targets `de6f3c4`. Web frozen install, audit, format, Astro check, build, guards, and Playwright pass; Studio and Workers Builds also pass. Bob did not install or run the branch locally. |

Other FE gates were not reopened by this indirect lockfile update. **Scoped verdict: Approved** for Charlie's manual merge of exact head `de6f3c4`.

---

## 2026-10-07 — PR #123 Studio smol-toml update at `a2ec8bd`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Indirect lockfile update | Pass for PR scope | Only `studio/pnpm-lock.yaml` changes: `smol-toml` 1.8.0 → 1.9.0, integrity, and `@sanity/cli`/`@vercel/frameworks` references. Upstream notes describe parser changes and the reviewed advisory identifies 1.9.0 as patched. |
| FE-50 verification | Exact-head checks green | Pass for PR scope | Actions run `37610266372` targets `a2ec8bd`. Studio frozen install, audit, format, typecheck, lint, three validation guards, and `sanity build` pass; web and Workers Builds also pass. CI does not run `sanity deploy` or arbitrary TOML input checks; Bob did not install or run the branch locally. |

Other FE gates were not reopened by this indirect lockfile update. **Scoped verdict: Approved** for Charlie's manual merge of exact head `a2ec8bd`.

---

## 2026-10-07 — PR #122 Studio source-map-js update at `37d9026`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Indirect lockfile patch | Pass for PR scope | Only `studio/pnpm-lock.yaml` changes: `source-map-js` 1.2.1 → 1.2.2, integrity, and `css-tree`/`postcss` references. Upstream 1.2.2 fixes a browser CSP crash and indexed source-map denial of service; the reviewed advisory names 1.2.2 as patched. |
| FE-50 verification | Exact-head checks green | Pass for PR scope | Actions run `37608428092` targets `37d9026`. Studio frozen install, audit, format, typecheck, lint, three validation guards, and build pass; web and Workers Builds also pass. Bob did not run a local branch build. |

Other FE gates were not reopened by this indirect lockfile update. **Scoped verdict: Approved** for Charlie's manual merge of exact head `37d9026`.

---

## 2026-10-07 — PR #116 indirect devalue update at `28a5a51`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Indirect lockfile patch | Pass for PR scope | Only `web/pnpm-lock.yaml` changes: `devalue` 5.9.2 → 5.9.4 under Astro, with integrity and snapshot updated. Upstream 5.9.3/5.9.4 notes checked. |
| FE-50 verification | Exact-head checks green | Pass for PR scope | Actions run `37560261910` targets `28a5a51`; web frozen install, audit, format, check, build, guards, and Playwright pass. Studio and Workers Builds also pass. Bob did not run local checks at the PR head. |

Other FE gates were not reopened by this indirect lockfile update. **Scoped verdict: Approved** for Charlie's manual merge of exact head `28a5a51`.

---

## 2026-10-07 — PR #108 Portable Text renderer update at `1598a61`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Pinned renderer patch and lockfile | Pass for PR scope | Only web manifest and lockfile change: `astro-portabletext` 1.0.0 → 1.0.1. Upstream release notes describe an inbound-payload mutation fix. |
| FE-50 verification | Exact-head checks green | Pass for PR scope | Actions run `37556294193` targets `1598a61`; web frozen install, check, build, guards, and Playwright pass, as do Studio and Workers Builds. Fixture assertions cover all custom Portable Text blocks, maths, tables, and FAQ behavior. The commit preview also renders published table and FAQ blocks in real posts. Published math was not separately observed. |

Other FE gates were not reopened by this dependency-only update. **Scoped verdict: Approved** for Charlie's manual merge of exact head `1598a61`.

---

## 2026-10-07 — PR #106 web Prettier update at `6bc2ee3`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Pinned development-tool patch with lockfile | Pass for PR scope | Only web manifest and lockfile change: Prettier 3.9.6 → 3.9.9, including expected peer-resolution updates. Upstream 3.9.7–3.9.9 notes checked. |
| FE-50 verification | Exact-head checks green | Pass for PR scope | Actions run `37490311567` targets `6bc2ee3`; web frozen install, audit, `format:check`, Astro check, build, guards, and Playwright pass. Studio and Workers Builds also pass. Bob did not run local 3.9.9 checks because local Prettier remains 3.9.6. |

Other FE gates were not reopened by this formatter-only update. **Scoped verdict: Approved** for Charlie's manual merge of exact head `6bc2ee3`.

---

## 2026-10-06 — PR #104 web Sanity client update at `bdfe110`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Reported client 8.6.2 → 8.8.0 | Pass with version correction | Exact PR diff pins 8.9.0; lockfile also updates `eventsource` and `eventsource-parser`. Upstream 8.7.0, 8.8.0, and 8.9.0 release notes checked. |
| FE-50 verification | Exact-head checks green; real-content build concern raised | Pass for PR scope | Exact-head web CI frozen install, check, build, guards, and Playwright pass; Studio and Workers Builds pass. Cloudflare commit preview shows five published Sanity posts matching a direct dataset query, and a post page renders. A separate installed client 8.9.0 read-only query fetched a published post. CI alone uses fixture blog content, and Bob did not inspect the complete Cloudflare build log. |

Other FE gates were not reopened by this dependency-only update. **Scoped verdict: Approved** for Charlie's manual merge of exact head `bdfe110`.

---

## 2026-10-06 — PR #103 KaTeX update at `5d4d36a`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Pinned KaTeX patch and lockfile | Pass for PR scope | Only web manifest and lockfile change: KaTeX 0.18.7 → 0.18.9; upstream 0.18.8/0.18.9 notes checked. |
| FE-50 verification | Exact-head checks green | Pass for PR scope | Actions run `37446549439` targets `5d4d36a`; web frozen install, check, build, guards, and Playwright pass, as do Studio and Workers Builds. The fixture blog tests exercise math, MathML, CSS, fonts, tables, and FAQ answers. Bob did not run a local 0.18.9 build. |

Other FE gates were not reopened by this dependency-only update. **Scoped verdict: Approved** for Charlie's manual merge of exact head `5d4d36a`.

---

## 2026-10-06 — PR #101 Astro update at `eab0940`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Pinned Astro patch with lockfile | Pass for PR scope | Only web manifest and lockfile change: Astro 7.3.3 → 7.3.5, with expected transitive updates. Upstream 7.3.4/7.3.5 notes checked. |
| FE-50 verification | Exact-head checks green | Pass for PR scope | GitHub Actions run `37444266407` has head `eab0940`; web job passed frozen install, audit, format, check, build, guards, and Playwright. Studio and Workers Builds also pass. Local installed Astro is 7.3.3, so Bob did not claim a local 7.3.5 build. |

Other FE gates were not reopened by this dependency-only update. **Scoped verdict: Approved** for Charlie's manual merge of exact head `eab0940`.

---

## 2026-10-06 — PR #105 Studio tsx update at `32303c2`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Pinned tsx patch after rebase | Pass for PR scope | Only Studio manifest and lockfile change; dev dependency `tsx` 4.23.13 → 4.23.15, with integrity and peer-reference updates. Upstream patch release notes checked. |
| FE-50 verification | Exact-head CI green | Pass for PR scope | `web`, `studio`, and Workers Builds pass at `32303c2`; Studio CI runs frozen install, audit, format, typecheck, lint, three `tsx`-run validation guards, and build. Bob did not rerun locally. |

Other FE gates were not reopened by this development-tool update. **Scoped verdict: Approved** for Charlie's manual merge of exact head `32303c2`.

---

## 2026-10-06 — PR #107 Studio formatter update at `0322d56`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Pinned Prettier patch | Pass for PR scope | Only Studio manifest and lockfile change; dev dependency `prettier` 3.9.8 → 3.9.9. No runtime package or source changes. |
| FE-50 verification | Exact-head CI green | Pass for PR scope | `web`, `studio`, and Workers Builds pass at `0322d56`; Studio CI runs frozen install, critical audit, format check, typecheck, lint, three validation guards, and build. Bob did not rerun locally. |

Other FE gates were not reopened by this development-tool update. **Scoped verdict: Approved** for Charlie's manual merge of exact head `0322d56`.

---

## 2026-10-06 — PR #112 Studio lockfile update at `c94a1fc`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Dependabot indirect update | Pass for PR scope | Only `studio/pnpm-lock.yaml` changes; `dompurify` 3.4.14 → 3.4.16 with updated integrity and graph references. Cure53 release notes checked. |
| FE-50 verification | Exact-head CI green | Pass for PR scope | `web`, `studio`, and Workers Builds pass at `c94a1fc`; Studio CI runs frozen install, critical audit, format, typecheck, lint, three validation guards, and build. Bob did not rerun locally. |

No Studio source or editor-flow code changed, so other FE gates were not reopened. **Scoped verdict: Approved** for Charlie's manual merge of exact head `c94a1fc`.

---

## 2026-10-05 — PR #113 lockfile patch at `bb733eb`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Dependabot transitive patch | Pass for PR scope | Only `studio/pnpm-lock.yaml` changes; `brace-expansion` 5.0.9 → 5.0.12 under `minimatch`. GitHub advisory lists 5.0.9 affected and 5.0.10 patched. |
| FE-50 verification | Exact-head CI green | Pass for PR scope | `web`, `studio`, and Workers Builds pass at `bb733eb`; Studio CI runs frozen install, audit, format, typecheck, lint, three validation guards, and build. Bob did not rerun locally. |

No Studio source or editor behavior changed, so other FE gates were not reopened. **Scoped verdict: Approved** for Charlie's manual merge of exact head `bb733eb`.

---

## 2026-10-05 — PR #117 dependency update at `e0077e2`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-40 dependency control | Three pinned Sanity updates with lockfile | Pass for PR scope | Only `studio/package.json` and `studio/pnpm-lock.yaml` differ from `main`; direct versions are pinned. Upstream 6.17.0 and client 8.9.0 release notes checked. |
| FE-50 verification | Exact-head CI green | Pass for PR scope | `web`, `studio`, and Workers Builds succeed at `e0077e2`. Studio CI uses frozen install, audit, format, typecheck, lint, three validation guards, and build. Bob did not rerun locally. |
| §20 Studio redirect editor flow | Charlie reports invalid target blocked and valid target cleared | Pass on attributed manual evidence | `HANDOFF.md` records Charlie's local Studio 6.17.0 test on `e0077e2`, relayed by Andy; Bob did not witness the UI. The temporary draft was reportedly deleted without publication, and a later search found none. |

No other FE gate was reopened by the two-file dependency update. **Scoped verdict: Approved** for Charlie's manual merge of exact head `e0077e2`.

---

## 2026-10-03 — PR #119 merge and Studio report

GitHub confirms merge commit `6bc0f8a` of approved head `bbb1511`; local `main` matches `origin/main`. Andy reports a successful `pnpm deploy` with one schema deployed. Bob's read-only hosted Studio URL check reaches Sanity's auth flow and cannot inspect the signed-in editor rule. The pre-merge FE/CORE-20 approval remains valid. A P3 merge-log attribution error says Bob approved only `c56f045`, omitting Bob's explicit `bbb1511` re-review; Andy should correct the gitignored log. No new FE failure is established.

---

## 2026-10-03 — PR #119 merged-main head `bbb1511`

Only the already approved PR #118 §46 production-verification documentation was merged into #119 after the `c56f045` review. No validator/schema/test code changed. The §46–§48 ordering and current PR diff whitespace check pass; exact-head web, studio, and Workers Builds statuses pass. The prior independent one-hop, validation-parity, schema, and live-editor evidence conclusions remain applicable. **Scoped verdict: Approved** for Charlie's manual merge at `bbb1511`; hosted Studio deploy follows merge.

---

## 2026-10-03 — PR #119 final evidence at `c56f045`

The P2 own-host absolute-target bypass from `df7b9a6` is closed at `dad584b`: Studio and build both reject this site's apex/`www` full URLs and retain external `https://` URLs, with parity/guard cases. Bob independently ran both guards, direct probes, and Sanity schema validation (0 errors/warnings); the Studio guard needed an approved rerun after sandbox `tsx` IPC `EPERM`. §48 now records Charlie's local-Studio test at `dad584b` of invalid `/blog`, invalid own-host full URL, valid `/blog/`, blocked/cleared Publish state, and deletion of the unpublished draft. This is secondhand manual evidence, not Bob's UI observation. Exact-head `web`, `studio`, Workers Builds and PR diff whitespace checks pass. **Scoped verdict: Approved** for Charlie's manual merge; Studio deploy follows merge. No scoped FE/CORE-20 finding remains open.

---

## 2026-10-03 — PR #119 redirect-target rule at `df7b9a6`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| CORE-20 / §46 one-hop redirect behavior | Internal targets require `/` or a file extension | Partial; P2 gap | Relative `/blog` is blocked, but same-site `https://mathematicsmalaysia.com/blog` is accepted by Studio and emitted by the build; live `/blog` returns another 307. Treat apex/`www` URLs as internal or reject them with relative-path guidance. |
| §20 editorial flow | Studio blocks the new invalid target | Unverified | No live local-Studio `To /blog` error and blocked Publish observed at this head. Test after the source correction on the revised head, without publishing. |
| FE-22/23 validation parity | Studio and build match | Pass for tested table, incomplete inputs | Bob ran both guards; direct bypass probe showed both agree on accepting the same-site absolute URL. Add cases for apex and `www`. Schema validation: 0 errors, 0 warnings. |
| FE-50 checks | CI green | Pass for checked scope | Exact-head web, studio, Workers Builds pass; `git diff --check` passes. Bob did not independently run a Sanity-backed build. |

The static `/pricing/` rule taking precedence over a duplicate Sanity document is expected behavior; no production failure was demonstrated by that skip. **Scoped verdict: Blocked** pending revised source and live Studio evidence. Bob did not write Sanity, merge, or deploy.

---

## 2026-10-03 — PR #118 production evidence record at `adad45d`

Docs-only PR; `git diff --check` and exact-head `web`, `studio`, Workers Builds statuses pass. Bob directly verified one-hop 301 behavior for `/blogs`, `/blogs/`, `/pricing`, `/pricing/`, and `www` → apex. The previously open `/blogs/` coverage gap is closed. Read-only Sanity hook logs show success/200 at 09:38:20Z and 09:43:59Z, with detailed entries identifying `redirect` payloads. The current Cloudflare deployment ID and dashboard rule view were not obtained; the internal handoff records the www zone rule and the live effect was rechecked. **Scoped verdict: Approved** for the documentation PR. The separate forward-looking canonical-target P2 source guard remains open for Andy.

---

## 2026-10-03 — `/blogs/` source coverage

Production `/blogs/` returns 404; `/blogs` returns the corrected one-hop 301 to `/blog/`. Literal sources are distinct in the existing content/build model. Current Studio and merge validators allow a second exact `/blogs/` → `/blog/` rule; regex is not part of this editor flow and wildcard syntax is deliberately rejected. **P2 production coverage gap open** until Charlie adds and publishes the second exact redirect and Bob verifies the live response. No code or Sanity changes were made by Bob.

---

## 2026-10-03 — `/blogs` production retest

At 09:29:28 UTC `/blogs` still returned the old `301 /blog`. At 09:30:14 UTC HEAD and GET returned `301 /blog/`; a following GET reached `200` after one redirect. The concrete CORE-20 route failure is closed. The source guard still sees only explicit `_redirects` rules and can admit another noncanonical internal target, so the forward-looking P2 prevention finding remains open for Andy. Hook-to-build causality has not been matched in logs. Bob made only read-only HTTP requests.

---

## 2026-10-03 — PR #115 post-merge CORE-20 check

Production `/blogs` currently takes two redirects: `301 /blog`, then `307 /blog/`, then `200`. Bob verified with HEAD requests and a following GET. This fails the guideline/§46 one-hop rule. The merge guard inspects only explicit `_redirects` sources, while Cloudflare's default HTML handling canonicalizes the folder index path. **P2 production finding open:** change the Sanity target to `/blog/`, publish, and verify one `301` plus final `200`; Andy should guard future uncanonicalized internal targets. `/pricing` and `/pricing/` each returned one-hop `301 /#pricing`. User-reported webhook HTTP 200 entries are not linked to the `/blogs` publish, and Wrangler deployment listing was unavailable due to account authorization. The prior PR #115 pre-merge approval remains a dated, scoped verdict, not production sign-off.

---

## 2026-10-03 — PR #114 final evidence at `01a8a7a`

The only delta from `f27f83e` is the §47 Studio-test record. Exact-head `web`, `studio`, and Workers Builds checks pass; PR diff whitespace check passes. The source and browser gate results from `e8c905d` carry forward unchanged. §20 editorial-flow gate closes for this scoped pre-merge review on Charlie's reported local-Studio test at `f27f83e`: invalid H2/H4 and blank answer blocked Publish, valid H2/H3 with a real answer cleared errors, and the unpublished draft was deleted. Bob did not witness the UI; exact error text and post list contents were not supplied. **Scoped verdict: Approved** for Charlie's manual merge. A real published FAQ and VoiceOver/NVDA remain unverified.

---

## 2026-10-02 — PR #114 final cleanup at `f27f83e`

The only change since the independently checked `e8c905d` FAQ implementation is removal of a blank EOF line in `docs/DECISIONS.md`. `git diff --check 4eb2672...HEAD` passes. Exact-head GitHub `web`, `studio`, and Workers Builds statuses are successful; GitHub check-runs also confirms Workers Builds succeeded on the previous head despite its absence from `gh pr checks`. FE-06, FE-22/23, and FE-14/60/61 source/browser results below carry forward. §20 editorial-flow evidence is still missing: no local-Studio FAQ insert/edit/Publish-block check at this revision. **Scoped verdict: Blocked** on that evidence only. No open source finding or CI-status gap remains.

---

## 2026-10-02 — PR #114 correction delta at `e8c905d`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-06 Heading hierarchy | Questions exactly one level below title | Pass in source and browser fixture; live editor unverified | `faqValidation.ts` rejects skipped ranks; schema marks it an error; renderer derives question rank as title + 1; focused Playwright passes. |
| FE-22/23 Content validation | Blank answers blocked | Pass in source/guard; live editor unverified | `validateFaqAnswer` requires trimmed text or inline maths; required/minimum rule handles empty arrays. Studio guard passed independently. |
| FE-14/60/61 Contents navigation and decision integrity | FAQ titles appear in contents | Pass | Shared heading pass creates collision-safe ids only for rendered FAQ titles, matching §42. Post-heading guard and focused browser tests pass. The owner's prior contents decision stands. |
| FE-50 Checks | CI green | Partial evidence | Exact-head `web` and `studio` pass; Workers Builds status is absent. Bob's 14 focused browser tests, heading guard, FAQ guard, and schema validation (0/0) pass. PR diff check reports one blank EOF line in `docs/DECISIONS.md`. |
| §20 Editorial flow | New FAQ authoring and errors | Unverified | No live Studio insert/edit/publish-block check at this revised head. Use local Studio from PR head for one authorized temporary unpublished draft, then delete it. |

The three earlier source findings are closed. **Scoped verdict: Blocked** on the live Studio editorial-flow evidence. The missing Cloudflare status and minor diff whitespace need reconciliation. Bob did not write Sanity content, merge, or deploy.

---

## 2026-10-02 — PR #115 final-head evidence at `4a9dd00`

No FE implementation changed since the independently checked `5ebe9f2` head. `docs/DECISIONS.md` §46 adds Charlie's dated local-Studio test against the production dataset: an invalid trailing-space source showed an error and blocked Publish; valid values cleared the error and made Publish available; the unpublished draft was deleted and the redirect list checked. Bob did not witness the Studio UI or inspect an audit log. Exact-head `web`, `studio`, and Workers Builds checks pass; documentation-only diff check passes. The prior §20 editor-flow evidence blocker is closed for the scoped pre-merge gate. **Verdict: Approved.** Production HTTP and redirect-document webhook behavior remain post-merge operational checks.

---

## 2026-10-02 — PR #115 correction delta at `5ebe9f2`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| §20 Editorial publish flow | Studio blocks invalid redirects | Pass in source/tests; live form unverified | `redirect.ts:15,23-26` binds custom validators, with `context.document.from` for cross-field loop/length checks; Sanity's current docs support this context. Studio guard and web parity guard pass independently. No editor has observed an invalid Publish attempt in this form. |
| CORE-20 Redirect correctness | Unsupported source and overlong rules skipped; duplicate 301 wins | Pass for corrected pure function | Bob directly probed space/query/fragment/over-limit cases and reversed conflicting duplicate status; outputs match intended skip/301 policy. |
| FE-50 Verification | CI green; new tests | Pass for checked commands | Three exact-head checks pass; local web and studio redirect guards, Sanity schema validation (0/0), and diff check pass. Full Playwright suite and Sanity-backed build not independently rerun. |
| FE-61 Decision integrity | §46 webhook note corrected | Pass in record; redirect-specific trigger unverified | §46 now cites §35's end-to-end evidence and §39's current-project hook, and names the hook/deploy/HTTP post-merge check. Andy's latest CLI hook-list result was not independently observed by Bob. |

Prior four source/documentation findings are closed at this head. **Scoped verdict: Blocked** on the live Studio form/publish check requested for the earlier P1. Bob did not create a draft or deploy. The separate live redirect and redirect-specific webhook checks follow the user's merge, after an eligible review.

---

## 2026-10-02 — PR #115 Sanity redirect feature at `02b7e92`

Scoped delta audit against `02-INFORMATIVE-BLOG.md` v1.12.1; unchanged whole-site gates remain in prior sections.

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-24 Project-owned business logic | Pure merge, test-first guard | Pass for ownership and core test | `mergeRedirects.ts` is project-owned, and the new guard covers common valid/invalid cases. Provider-format and duplicate-status cases are missing. |
| §20 Editorial publish flow | Invalid rules skipped in build | **Fail, P1 task completion** | `studio/schemaTypes/documents/redirect.ts:8-29` permits values the build discards (`mergeRedirects.ts:47-67`); editor receives no publish error. |
| FE-22 Content ownership | Sanity redirects consumed at build | Pass for wiring, conditional on validation fix | `astro.config.mjs` registers integration; `astro:build:done` fetches published redirects and writes `dist/_redirects`. No authored redirects in page code. |
| FE-40/60 Dependency/architecture | Existing Astro and Sanity client; static output | Pass | No package added. Cloudflare documents `_redirects` in Workers Static Assets. Existing static file remains first and unmodified. |
| CORE-20 Redirect correctness | Duplicates and chains handled; Cloudflare syntax safe | Partial, P2 | Direct probes show query/fragment sources and a 1,207-character line counted as applied; same-source/same-target 301/302 tie changes with fetch order. |
| FE-50 Test/build quality | New guard and CI green | Pass for checked commands, coverage gap noted | Exact-head three CI checks pass. Bob reran `pnpm test:merge-redirects` and `git diff --check`; local `pnpm build` passed but lacked Sanity config env and kept static redirects. User's Sanity-backed build is reported, not independently reproduced. |
| FE-61 Decision integrity | Webhook status called unknown | P3 correction | §35 records real publish → hook → Cloudflare deploy → live content; §39 records one hook aimed at current project. Current redirect-specific event still needs checking. |

Read-only production baseline: `/pricing` 404; `/pricing/` 301 to `/#pricing` on 2026-10-02. This does not verify the unmerged rule. **Verdict: Revision required** for the editor validation P1. Provider-format and deterministic-status P2s remain, as does a P3 handoff correction. No merge/deploy or Sanity write by Bob.

---

## 2026-10-01 — PR #114 FAQ accordion at `2cd9106`

Scoped delta audit against `02-INFORMATIVE-BLOG.md` v1.12.1. Unchanged whole-site gates remain in the historical audit below.

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-01/02/04 Semantics | Named FAQ section, list of questions, native disclosure | Pass in source and Chromium | `FaqAccordion.astro:37-67` uses named section, list, and `details`/`summary`; the HTML Standard permits heading content in `summary`. VoiceOver/NVDA not tested. |
| FE-06 Heading hierarchy | Question deeper than title; skipped level warns | **Fail, P1** | `faqValidation.ts:36-45` warns but permits H3→H5; fixture and test publish/render that gap. Direct child questions should be one level deeper. See CODE-REVIEW. |
| FE-13/14 Styling and reflow | Project tokens, 390px overflow test | Pass at measured widths | Built Chromium page at 320/560/768/1024/1440px: document scroll width equals client width, FAQ summaries 54px high, visible 2px focus outline; reduced-motion open answers visible. |
| FE-20/22/23 Component and content model | Typed Studio object and Astro renderer | Partial, P2 | New domain component and types are appropriately scoped; `answer` min-one-array rule permits a blank block. |
| FE-30/31/32/33 Framework and JS | Native disclosure without hydration | Pass | Six FAQ Playwright tests pass, including JavaScript disabled and multiple-open behavior; no `client:*` directive or FAQ script added. |
| FE-40/41/42 Dependencies and registry | shadcn behavior without package | Pass | No dependency added; native `details` implements the requested multiple-open behavior. |
| FE-50 Verification | Three CI checks green; 70 Playwright tests reported | Pass for checked evidence | Exact-head `web`, `studio`, Cloudflare checks pass; Bob independently ran six FAQ browser tests, FAQ validator script, and diff check. Full 70-test suite and live Studio were not independently run. |
| FE-60/61 Scope and prior decisions | FAQ block only | Partial, P2 | `docs/DECISIONS.md` §42 says post contents covers H2–H4, but §46 excludes the FAQ title. An owner decision or contents integration is needed. |

**Verdict: Revision required.** FE-06 P1 is open. P2 answer validation and contents-list alignment remain, and live Studio insertion/validation has not been observed. No merge/deploy or production-dataset write by Bob.

---

## 2026-10-01 — PR #111 final-head evidence at `41c965c`

No FE implementation changed since the independently checked `0642c8e` head. `docs/DECISIONS.md` §45a adds dated manual UAT of the wrapper insert flow and two publish-blocking errors; Bob did not directly operate live Studio. The exact-head `web`, `studio`, and Cloudflare checks pass. The prior FE-01, FE-13/14, FE-22/23, FE-30–33, FE-40–42, and FE-50 results remain valid for this documentation-only change. The editor-flow evidence blocker is closed for the scoped pre-merge gate. **Verdict: Approved.** Production Studio deployment and a real authored-table render are later operational checks.

---

## 2026-10-01 — PR #111 caption-test delta at `0642c8e`

FE-50 verification evidence: **Pass for the test correction.** `assert-table-validation.ts:43-46` now calls `validateTableCaption` for one valid and five invalid values; Bob independently ran the script and it passed. Exact-head CI is green. No other FE gate changed in this one-file commit. The editor-feature verdict remains **Blocked** on live Studio wrapper evidence.

---

## 2026-10-01 — PR #111 caption follow-up at `6c5cf78`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-22/23 Content and typed validation | Caption now rejects whitespace | Pass in source | `validateTableCaption` trims and is attached to the `postTable.caption` field. Bob invoked it directly for invalid and valid values. Live Studio wrapper still unverified. |
| FE-50 Verification | CI and caption test green | CI pass; caption test claim unsupported | Three exact-head CI checks green. `assert-table-validation.ts` imports but never calls `validateTableCaption`; its success message overclaims. P2 in CODE-REVIEW. |
| FE-60/61 Scope | Focused correction | Pass | Only validator, schema binding, test script, and decision note changed. |

The scoped editor-feature gate remains **Blocked** on live wrapper evidence; the new P2 concerns test credibility, not the validator's direct behavior.

---

## 2026-10-01 — PR #111 wrapper delta at `0caa9d6`

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-01 Semantics | Column and optional row headers | Pass for tested fixture; live authoring unverified | `Table.astro:41-79` renders `<th scope="col">` and conditional `<th scope="row">`; four built-output Playwright tests pass. Nested Studio validation has not been exercised. |
| FE-13 Design tokens | Square frame | Pass | `Table.astro:88-93` removes the radius and retains project tokens. |
| FE-14 Overflow | 390px test passes | Pass at 390px exact head | The new built-output table test passes; other widths were measured on the prior head and are not claimed as rerun. |
| FE-22/23 Content and types | `postTable` wrapper and typed grid | Pass in source; UI unverified | `portableTextObjects.ts:261-307`, `types.ts:177-196`, `postBodyComponents.type.postTable`. |
| FE-30/31/32/33 Rendering | Server-rendered Astro | Pass | No client directive; no-JS table test passes. |
| FE-40/41/42 Dependencies | No new package | Pass | Dependency files unchanged; nested editor uses Sanity 6.16.0's existing table plugin. |
| FE-50 Checks | Green CI and schema validation | Pass for checked commands | Exact-head `web`, `studio`, Cloudflare green; Bob reran schema validation, table validation, four table browser tests, and diff check. |
| FE-60/61 Decision discipline | Wrapper chosen by owner | Pass pending live flow | Standard Studio fields in wrapper; whether the nested grid is usable has not been observed. |

The previous two P1 source/fixture failures are corrected. The caption field still permits whitespace-only values, recorded as an open P2 in CODE-REVIEW. This scoped gate is **Blocked** on live Studio wrapper evidence.

---

## 2026-10-01 — PR #111 table-feature delta at `12bab82`

This scoped audit reopens gates affected by the table feature. “Andy” reflects PR #111 and `docs/DECISIONS.md` §45; “Bob” reflects independent source and browser checks. Historical whole-site rows below remain intact.

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-01 Meaningful elements | Table, caption, column headers | Partial fail, P1 accessibility | `Table.astro:53-62` uses `<td>` for row labels; headerless editor state renders no `<th>`. See CODE-REVIEW P1s. |
| FE-13 Token values | Existing tokens | Pass on token use; P3 design mismatch | `Table.astro:74-114` uses project tokens; `--radius-lg` conflicts with `design/DESIGN.md:130`. |
| FE-14 No page overflow | 390px test passes | Pass at tested widths | Bob measured built page at 320/390/560/768/1440px: no page overflow; wide table scrolls internally and ArrowRight changes scrollLeft by 40px. |
| FE-20 Component extraction | New Table component | Pass | Domain-specific Portable Text renderer; no duplicate. |
| FE-22 Content separation | Structured CMS block | Pass | Sanity schema, typed data, `postBodyComponents.type.table`; no raw authored HTML. |
| FE-23 Typed API | `Table`/`TableCell` types | Pass | `types.ts:155-185`, `Table.astro:6-8`. |
| FE-30/31/32/33 Rendering | Static Astro, no hydration | Pass | Server-rendered nested Portable Text; no-JS test passed, no client directive. |
| FE-40/41/42 Dependencies | No new package or registry | Pass | Dependency files unchanged; Studio 6.16.0 built-in editor configured in `sanity.config.ts`. |
| FE-50 Typecheck, lint, build | CI green | Pass via exact-head CI | `web`, `studio`, Cloudflare checks passed at `12bab82`; local schema validation and three table tests passed. Bob did not rerun every CI command. |
| FE-51/52 Code quality | Focused component and comments | Pass for scope | `Table.astro` is 122 lines; comments explain nested rendering and keyboard scrolling. |
| FE-60/61 Decisions | Existing stack, narrow feature | Pass | No architecture or package change; owner chose option B. |

The P1s concern content semantics, not a failed build. Unchanged FE gates were not reopened in this ten-file PR review.

---

## 2026-09-29 — PR #110 final-head re-review at `f666a60`

The final follow-up changes only the design website kit and `docs/DECISIONS.md`;
the Astro implementation and prior FE results are unchanged. Exact-head
`web`, `studio`, and Cloudflare checks pass. Bob rendered the actual website
kit over localhost in Chrome and verified its header uses the new root-mark
SVG without console errors. The remaining design-authority P2 is closed;
no new FE gate failure was found in this scoped pass.

---

## 2026-09-29 — PR #110 third re-review at `5af1fd6`

The latest commit changes only the design reference package and its decision
record; the Astro implementation is unchanged. Exact-head `web`, `studio`,
and Cloudflare checks pass. The reusable design Logo's mask IDs are now
per-instance through `React.useId()`, closing the prior P3. The remaining
P2 is a design-authority mismatch in the website kit's inline old header
and its current-sounding README, not a newly failed FE gate in the live site.

---

## 2026-09-29 — PR #110 second re-review at `5ab15cb`

The latest commit changes the design reference package, documentation, and the
favicon evidence image; it does not change the Astro implementation audited
below. Exact-head `web`, `studio`, and Cloudflare checks pass. Bob inspected the
now-valid 16/32/64px comparison image and closed the visual-evidence P2.
The remaining P2 concerns stale design-kit entry points and generated output,
not a newly failed FE gate in the live website. A P3 duplicate-mask-ID issue
is recorded for the reusable design component in `CODE-REVIEW.md`.

---

## 2026-09-29 — PR #110 re-review at `80ec3cb`

The follow-up commit changes documentation and adds evidence images; it does not
change the Astro implementation audited below. Exact-head `web`, `studio`, and
Cloudflare checks pass. Bob inspected four header/footer crops at 1440px and 390px:
the logo remains visible and aligned. FE-14's CI overflow result remains Pass for
tested widths; these crops are visual evidence, not an independent page-wide
overflow measurement. `evidence-favicon-sizes.png` is entirely white, so the
claimed 16px/32px comparison is unverified; see `CODE-REVIEW.md`.

---

## 2026-09-29 — PR #110 scoped FE delta

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-13 Values from tokens | Existing palette and type tokens reused | Pass for PR scope | `LogoLockup.astro:6-8,57,97` uses `--paper`, ink, ochre, and medium-weight tokens. Standalone SVGs correctly use literal resolved colours without page CSS. |
| FE-14 No horizontal overflow | Screenshots and tests claim no overflow | Pass for tested CI widths; visual layout unverified by Bob | CI built-output Playwright suite passed 60 tests including 390/560/768/1440 overflow tests. Andy's header/footer screenshots are not attached; see the P2 evidence finding. |
| FE-50 Typed, lint-clean, buildable | Astro check, format, 60 tests pass | Pass for PR scope | Exact-head CI run `36515654302` passed web check, build, guardrails, and Playwright. Bob did not rerun locally. |
| FE-52 Comments explain why | Mask-ID and favicon geometry comments | Pass | `LogoLockup.astro:9-10` explains distinct IDs; `favicon.svg:3-5` explains thickened small-size form. |
| FE-60 Simplest sufficient decision | Inline SVG and existing tokens | Pass | No new dependency, renderer, global state, or client-side code. |

Other FE gates were not reopened in this five-file review. The old design-package
authority conflict is recorded in `CODE-REVIEW.md` as a P2 guideline/handoff item.

---

## 2026-09-29 — PR #109 post-deployment delta

Final PR head `e999115` added only a `docs/DECISIONS.md` wording correction. CI at
that head passed, and merge commit `b068915` is live. The scoped FE-50, FE-52, FE-53,
and FE-60 results below remain **Pass**: the deployed post stylesheet has zero
`data:font` references, and a same-origin KaTeX `.woff2` returns HTTP 200. No other
FE gate was re-audited in this production check.

---

## 2026-09-29 — PR #109 scoped FE delta

Only gates touched by the build configuration and regression test were rechecked. Prior
full-audit rows below remain historical; this is not a fresh whole-site FE audit.

| Gate | Andy self-check | Bob result | Evidence / disagreement |
| --- | --- | --- | --- |
| FE-50 Typed, lint-clean, buildable | Format, Astro check, build and 60 tests pass | Pass for PR scope | CI `web` passed at PR head `dc6c6eb`; workflow runs `pnpm format:check`, `pnpm check`, `pnpm build`, guardrails, and `pnpm test:e2e`. `studio` and Workers Builds also passed. No independent local rerun. |
| FE-52 Comments explain why | Config comment describes CSP and Vite behavior | Pass | `web/astro.config.mjs:36-39` gives the constraint and records the decision; it is not a redundant narration. |
| FE-53 Compiling is not completing | New regression test and live follow-up planned | Pass for pre-merge scope | `web/tests/e2e/blog.spec.ts:236-250` tests built CSS; CI reports 60 passed. Production font verification remains due after merge. |
| FE-60 Simplest sufficient decision | Keep same-origin font files and existing CSP | Pass | Vite build option in `web/astro.config.mjs:35-42`; no new dependency or security-policy expansion. |

No FE gate failure or disagreement was found in this diff. Other FE gates were not reopened.

---

## 2026-08-16 — Scoped re-review of the fix commit

Scope: re-check only the two gates the 2026-08-15 audit below failed outright (FE-04, FE-22) plus the
data-flow half of FE-34 and the P2 isolation-rationale gate FE-32 was recorded against, against fix
commit `05ab713` (`HEAD c1186435c7b96b0905f4988f2ca5c497540f9409`). Every other gate's 2026-08-15
result stands unchanged and is **not re-audited here** — the fix commit didn't touch the areas those
gates cover (forms, hydration, registry, dependency ladder, etc.).

| Gate | 2026-08-15 result | 2026-08-16 result | Evidence |
| --- | --- | --- | --- |
| FE-04 Repeated siblings are a list | **Fail** | **Pass** | `web/src/components/SiteHeader.astro` and `web/src/components/SiteFooter.astro` both now wrap their link maps in `<ul>/<li>` inside `<nav>`. Confirmed live in a real browser: header `<nav>` contains a `<ul>` with 1 `<li>`, footer `<nav>` contains a `<ul>` with 5 `<li>`, zero `<a>` elements as direct children of either `<nav>` anymore. Both `aria-label`s (`"Primary navigation"`, `"Footer navigation"`) unchanged. Link counts match the underlying data (1 header, 5 footer) — no duplicate/missing links introduced by the markup change. |
| FE-22 Content separated from presentation | **Fail** | **Pass** | `web/src/components/GapChart.astro` now takes `annotations?: GapChartAnnotation[]` as a real typed prop and is called as `<GapChart annotations={homePage.problem.gapChartAnnotations} />` in `web/src/pages/index.astro:147` — the field is no longer fetched-and-discarded. Confirmed live: the rendered chart's flag text (`OCT 2026` / `FROM 2027` / `SPM` at the correct stop indices) matches the fallback CMS data exactly, proving the full schema→query→prop→render chain actually executes, not just that the prop type-checks. The five other hardcoded figures Bob's 2026-08-15 pass flagged (`2`, `24`, `20`, `30`, the two time blocks) are now typed CMS fields (`problem.independentChecksCount`, `about.yearsExperience`, `about.studentsPerYear`, `finalCta.freeMinutes`, `pricing.availabilityTimeBlocks`), wired schema→query→types→fallback→seed→render for every one of the five — verified field-by-field, not spot-checked. See `review/bob/CODE-REVIEW.md`'s 2026-08-16 VS-01 section for the full per-field trace. |
| FE-34 Data flow and fetching discipline (fetch-then-discard half) | Partial (same root cause as FE-22) | Pass | The `gapChartAnnotations` fetch is now consumed, closing the specific "fetched but nothing reads it" defect FE-34 was partially failing on. `getLandingPageData()`'s `Promise.all` parallel-fetch discipline (the other half of FE-34, already passing) is unchanged. |
| FE-51 No dead weight (gapChartAnnotations-is-dead-weight half) | Partial (same root cause) | Pass | Same fix as FE-22/FE-34 above — the previously-dead GROQ projection is now live. The unrelated `@astrojs/sitemap`-unconfigured half of this gate's 2026-08-15 "Partial" rating is unchanged and unaffected (VS-15, still open, not touched by this commit). |
| FE-32 No JS for platform behavior (VS-06, the FAQ no-JS gap) | Partial fail, P2 isolation rationale (VS-06) | **Unchanged — still Partial fail** | Not in scope for this fix commit (VS-06 was not one of the five findings addressed) and not re-audited here. The new Playwright suite (VS-04) does add automated coverage of the FAQ's *with-JS* interaction (click + keyboard), but does not test the no-JS case, so it neither closes nor worsens VS-06. Recorded for completeness only — still open, still tracked as VS-06 in `review/bob/CODE-REVIEW.md`. |

### Scoped FE Result (2026-08-16)

**FE-04 and FE-22 now pass** (both were the only two gates failing outright on 2026-08-15); the
FE-34/FE-51 partial ratings whose root cause was the same discarded-field defect are now full passes
on that half. No gate that was passing on 2026-08-15 regressed — the fix commit's changes were
additive/corrective in the areas it touched (`GapChart`, header/footer nav markup, tap-target CSS,
new test infrastructure) and didn't disturb any other gate's evidence. All other gates keep their
2026-08-15 rating unchanged, including FE-32 (still Partial fail, VS-06, out of scope for this
commit) and everything marked N/A (still genuinely N/A — no blog routes, forms, or registry
components were added). This is a scoped update, not a re-audit of the full gate table; see the
2026-08-15 table below for every gate's full evidence.

---

Date: 2026-08-15

Scope: first vertical slice. Landing page renders from the real component tree
(`web/src/pages/index.astro` + `web/src/components/*` + `web/src/layouts/BaseLayout.astro`), fed by
`web/src/lib/content/landingData.ts` (Sanity-first, local-fallback). No blog routes exist yet. Most
gates that were correctly N/A at scaffold time (`review/bob/FE-GATE-AUDIT.md`'s 2026-08-14 section,
preserved below as history) are now assessable against real code and real browser behavior. No
vertical-slice FE self-check exists in `docs/DECISIONS.md` yet (flagged separately as finding
`VS-12` in `review/bob/CODE-REVIEW.md`) — this table is Bob's own independent assessment, not a
verification of a self-check that was never written.

Commit: `770965218abcbc048c1261c9ca0ad3f4b6bb832c`.

| Gate | Result | Evidence | Disagreement / follow-up |
| --- | --- | --- | --- |
| FE-01 Meaning, not appearance | Pass | Real semantic elements throughout: `header`, `nav`, `main`, `footer`, `section`, `figure`/`figcaption` (`GapChart.astro`), `table`/`thead`/`tbody`/`th scope`/`caption` (pricing table), `ul`/`ol` for repeated groups, `button type="button"` for the FAQ toggle, real `a href` everywhere. No click-handler-on-`div` pattern found. | — |
| FE-02 `<section>` accessible name | Pass | All 10 landing `<section>` elements have `aria-labelledby` pointing to a visible heading/label or `aria-label` directly (trust band: `aria-label="Teaching experience"`; FAQ/Levels: `aria-labelledby` to their `SectionMarker` label span, matching the design-authority decision recorded in `HANDOFF.md`'s 2026-08-11 "Dev-standard scope settled" entry). Verified in source, all 10 confirmed. | — |
| FE-03 `<article>` for standalone content | N/A | No blog archive/post routes exist yet. | Required once `/blog/[slug]/` lands. |
| FE-04 Repeated siblings are a list | **Fail** | Session cards, level rows, FAQ items, process steps, and the hero's spine list all correctly use `<ul>`/`<ol>`. **Header nav (`SiteHeader.astro:24-32`) and footer nav (`SiteFooter.astro:22-30`) do not** — both map link arrays directly into sibling `<a>` inside `<nav>` with no `<ul>` wrapper. | `review/bob/CODE-REVIEW.md` VS-05 (P2, isolation rationale: content remains reachable and correctly labelled, only the "list of N" screen-reader grouping cue is lost — not downgraded from the FE-04 default without reason, but the reason is stated). |
| FE-05 Links navigate, buttons act | Pass (hard gate) | Every `<a>` in the rendered page has a real `href` (`rg 'href="#"' web/src` — no matches); the FAQ toggle is a real `<button type="button">` with `aria-expanded`/`aria-controls`, not a link. Verified interactively in a real browser: click behavior, keyboard-Tab reachability, and visible focus ring all confirmed. | — |
| FE-06 Heading hierarchy | Pass | One `<h1>` (hero). Verified live in browser at 4 viewports: heading sequence is `H1, H2, H2, H3×5, H2×5, H3, H2, H3×2, H2, H3×4, H2` — no skipped levels, every H3 nests under a preceding H2, every return to H2 is a new top-level section. The FAQ and trust-band sections intentionally have no heading (per the recorded design decision), using `aria-label`/`aria-labelledby` on the section instead — consistent with FE-02's allowance. | — |
| FE-07 Complete landmarks | Pass | Verified live at 390/560/768/1440: exactly 1 `<main>`, 1 `<header>`, 1 `<footer>`, 2 `<nav>` elements with distinct accessible names (`"Primary navigation"`, `"Footer navigation"`). | — |
| FE-10 Layout method | Pass | Grid used for genuinely two-dimensional relationships (hero grid, session-card grid, level-row internal grid, process-step grid, footer's 3-column grid); Flexbox used for one-axis relationships (header inner row, trust-item internals, FAQ button row). No flex-faking-grid pattern found. | — |
| FE-11 Absolute positioning | Pass | Used only for decorative graph-paper overlays (`::before` grid backgrounds), visually-hidden utility clipping, and the fixed-position skip link (a legitimate overlay use case). No primary page structure depends on it. | — |
| FE-12 Sibling spacing uses gap | Pass | `gap` used throughout grid/flex containers (hero-grid, session-grid, dash-list, faq-list spacing via `padding`/`border` on list items rather than child margins, trust-grid, etc.). | — |
| FE-13 Values come from tokens | Pass | All color/typography/spacing/radius/shadow declarations reviewed resolve to `var(--...)` tokens. `clamp()` bounds for fluid type scale are legitimate arbitrary values for responsive sizing, not a token violation. `diff -rq design/tokens web/src/styles/tokens` remains clean (unchanged from scaffold). | — |
| FE-14 Mobile-first, no overflow | Pass | Verified live: `document.documentElement.scrollWidth === clientWidth` at 390/560/768/1440px — no page-level horizontal overflow at any tested width. The pricing `<table>` (`min-width: 620px`) extends past the viewport edge at 390/560px by design, but is correctly contained inside `.table-wrap { overflow-x: auto }`, the exact pattern FE-14 itself names as acceptable ("wide content... scrolls inside its own container, never the page body"). Confirmed the page body itself never scrolls horizontally despite the table's internal scroll. Confirmed the previously-fixed header-nav-hidden-below-560px regression (`HANDOFF.md` 2026-08-15 entry) has not regressed: `nav` computed `display: flex` at 390px. | — |
| FE-20 Extract on reuse | Pass | `SectionMarker`, `WhatsAppCta`, `LogoLockup`, `GapChart` are genuinely reused/domain-meaningful extractions. No premature generic-wrapper components found. | — |
| FE-21 No monoliths/duplicates | Pass, with a note | No duplicate or near-identical components found — the actual FE-21 concern is clean. `index.astro` itself is a large single file (~500 lines markup + ~970 lines scoped CSS covering all 10 sections), noted as `review/bob/CODE-REVIEW.md` VS-17 (P3 preference, not a rule violation). | Revisit extraction once blog templates might reuse pricing-table/FAQ-accordion patterns. |
| FE-22 Content separated from presentation | **Fail** | `web/src/components/GapChart.astro` has no `Props` interface at all and hardcodes the exact `stops`/`measured` values that `studio/schemaTypes/documents/homePage.ts:91-105`'s `problem.gapChartAnnotations` field, `web/src/lib/sanity/queries.ts:53`'s projection, and `web/src/lib/content/defaultLandingData.ts:170-174`'s fallback data all already model and fetch for exactly this purpose — the field is fetched then discarded. Several other on-page numeric figures (`24`, `2`, `20`, `30`, the availability time blocks) are likewise hardcoded literals in `index.astro` duplicating facts already present in editable prose/array fields. | `review/bob/CODE-REVIEW.md` VS-01 (P1, no isolation rationale offered — real content-accuracy risk once the dataset is seeded and edited). |
| FE-23 Explicit typed component APIs | Pass | Every component with dynamic content has a typed `interface Props` (`SiteHeader`, `SiteFooter`, `WhatsAppCta`, `SectionMarker`, `LogoLockup`). `GapChart`'s lack of any `Props` is the FE-22 defect above, not a typing gap — its API is honestly typed as "takes nothing," which is the actual bug. | — |
| FE-24 Business-logic components project-owned/tested | N/A | No forms, search, pagination, consent, or preview-gating runtime logic in this slice. The FAQ open/close toggle is a UI interaction, not "business logic" under the guideline's own listed examples. | Required once real business logic (forms, search) lands. |
| FE-30 One framework | Pass | `web/package.json` has Astro only; no React/Vue/Svelte anywhere in `web/`. | — |
| FE-31 Intentional hydration | Pass | `rg "client:" web/src` — zero matches. FAQ interactivity uses a plain inline `<script>` operating on real DOM nodes, not a hydrated island — the least aggressive approach possible, exceeding this gate's bar. | — |
| FE-32 No JS for platform behavior | **Partial fail** | Navigation, CTAs, and 1-of-13 FAQ answers work with no JS. **12 of 13 FAQ answer panels ship `hidden` in the static HTML** (`index.astro:432,448-449`) with no non-JS reveal path — content visibility for a meaningful fraction of the page depends on the inline script executing. | `review/bob/CODE-REVIEW.md` VS-06 (P2, isolation rationale: same-origin inline script with no external dependency, verified loading with zero console/network errors in this review's own testing — real-world failure probability is lower than a third-party-script scenario, but the guideline's MUST is still unmet as written). |
| FE-33 Astro islands discipline | Pass | No `@astrojs/react`, no island components, no client directives anywhere in `web/`. | — |
| FE-34 Data flow and fetching discipline | Partial | `getLandingPageData()` (`web/src/lib/content/landingData.ts:39-79`) correctly issues `Promise.all([...])` for homePage/siteSettings/navigation/categories — no avoidable waterfall. The `gapChartAnnotations` fetch-then-discard (see FE-22 above) is also a data-flow discipline defect: a field is fetched that no component ever reads. | Same root cause as FE-22 (VS-01); tracked once, not double-counted as a separate finding. |
| FE-40 Dependency ladder | Pass | No new unjustified dependencies added this slice. `@playwright/test` was explicitly earmarked in `docs/DECISIONS.md` §4 to be added "with the first Playwright verification pass" (this slice) and was not — tracked as a testing-process gap (VS-04), not a dependency-ladder violation. | — |
| FE-41 Registry discipline | N/A | No registry components used anywhere in `web/`. | — |
| FE-42 Registry provenance | N/A | Same as FE-41. | — |
| FE-50 Typed/lint-clean/buildable | Pass | Reproduced independently, not trusted from CI alone: `web`: `pnpm format:check`, `pnpm check` (0 errors/warnings/hints), `pnpm build` all clean. `studio`: `pnpm format:check`, `pnpm typecheck`, `pnpm lint`, `pnpm build` all clean (only the documented, accepted Sanity auto-update version-drift warning). | — |
| FE-51 No dead weight | Partial | `@astrojs/sitemap` remains installed but unconfigured (unchanged, still tracked as VS-15). The `gapChartAnnotations` GROQ projection is itself dead weight in the same sense — data fetched over the network on every build/request that nothing consumes (see FE-22/FE-34). | — |
| FE-52 Comments explain why | Pass | Comments in `client.ts`, `queries.ts`, `landingData.ts`, `defaultLandingData.ts` explain intent/constraint/history (citing prior Bob findings and design decisions by name), not restating what the code already says. | — |
| FE-53 Compiling is not completing | Pass | `HANDOFF.md`'s dated entries are candid about what is/isn't built at each stage; this review's independent re-verification of specific claims (dist byte size, FAQ count, redirect targets, CI run/commit match) found no over-claim. | — |
| FE-60 Decision ladder | Pass, with a note | Native HTML/CSS preferred throughout (Grid/Flex over positioning, scoped CSS over a component library, plain script over a client island for the FAQ). The one place the ladder arguably wasn't fully climbed: a custom button+script accordion where native `<details>`/`<summary>` (rung 1, native HTML) would satisfy the same requirement more simply and without the FE-32 gap (VS-16, P3 preference). | — |
| FE-61 Respect existing codebase | Pass | Builds directly on the approved scaffold's token/query/schema layers without rewriting them; the two-package layout and Sanity client split from the scaffold review are preserved unchanged. | — |

## Scoped FE Result

**Two gates fail outright for the vertical slice: FE-04 and FE-22.** One gate partially fails:
FE-32 (and, as the same root cause, FE-34's fetch-discipline half). Per the guideline's severity
rule, a failed `FE-xx` gate is P1 by default; FE-04 and FE-32 are recorded at P2 in
`review/bob/CODE-REVIEW.md` with a written isolation rationale each (VS-05, VS-06), consistent with
the rule that only named exceptions (FE-05, FE-24, FE-41) may never be downgraded — FE-22 has no
such rationale offered and stays at its default P1 (VS-01).

Gates marked N/A above (FE-03, FE-24, FE-41, FE-42) remain genuinely out of scope for this slice —
no blog routes, business logic, or registry components exist yet — and become hard gates for the
next vertical slice (blog routes) exactly as the scaffold audit predicted.

---

# Bob FE Gate Audit - Development Scaffold Re-Review

*(Preserved as history — scaffold stage, 2026-08-14, before any real page template existed.)*

Date: 2026-08-14

Scope: scaffold only. No real page templates, component tree, Portable Text renderer, seeded
content, browser suite, CI, or preview deployment exists yet. Claude's scaffold-stage FE self-check
now exists in `docs/DECISIONS.md:360-407`; Bob compared it against source and command evidence.

| Gate | Claude self-check | Bob result | Evidence | Disagreement / follow-up |
| --- | --- | --- | --- | --- |
| FE-01 Meaning, not appearance | Limited pass | Limited pass | Smoke page uses `main`, `h1`, `p`, and a labelled non-interactive swatch. | Re-audit once real templates exist. |
| FE-02 Named sections | N/A | N/A for scaffold | No production sections implemented. | Required for landing/blog sections. |
| FE-03 Article for standalone content | N/A | N/A for scaffold | No blog archive/detail route exists. | Required for post detail/listing slice. |
| FE-04 Repeated siblings are lists | N/A | N/A for scaffold | No repeated UI groups implemented. | Required for nav/archive/trust/FAQ/levels. |
| FE-05 Links navigate, buttons act | Fixed | Pass for scaffold | `web/src/pages/index.astro:25-31` is no longer an anchor; `rg 'href="#"' web/src` has no matches. | Re-audit real WhatsApp/link components. |
| FE-06 Heading hierarchy | Limited pass | Limited pass | Smoke page has one `h1`; no section/article hierarchy yet. | Re-audit real pages. |
| FE-07 Landmarks | Partial | Partial | Smoke page has one `main#main`; no header/footer/nav shell yet. | Required in first real shell. |
| FE-10 Layout method | N/A | N/A for scaffold | No real layouts implemented. | Re-audit real components. |
| FE-11 Absolute positioning | Pass | Pass for scaffold | No absolute-position layout dependence found in scaffold UI. | Re-audit real components. |
| FE-12 Sibling spacing uses gap | N/A | N/A for scaffold | No sibling group components yet. | Re-audit real components. |
| FE-13 Token values | Pass | Pass | `diff -rq design/tokens web/src/styles/tokens` is clean; copied token directory is ignored by Prettier. | Keep byte-verbatim token check in handoff evidence. |
| FE-14 Mobile-first/no overflow | Unverified | Unverified by scope | No Playwright/browser pass exists and no real responsive template exists. | Required in first vertical slice. |
| FE-20 Extract on reuse | N/A | N/A for scaffold | No web component tree implemented. | Re-audit once components exist. |
| FE-21 No monoliths/duplicates | N/A | N/A for scaffold | No component tree implemented. | Re-audit once components exist. |
| FE-22 Content separated from presentation | Pass for data layer | Pass for scaffold data layer | CMS schemas exist; `web/src/lib/sanity/types.ts` has explicit homepage and Portable Text result types. | Full pass requires components consuming content without casts. |
| FE-23 Explicit typed APIs | Partial | Partial/pass for scaffold | Query helper returns are explicit; TypeGen remains deferred and recorded in `docs/DECISIONS.md:125-132`. | Revisit TypeGen once real queries/routes exist. |
| FE-24 Business logic project-owned/tested | N/A | N/A for scaffold | No forms/search/pagination/redirect runtime logic implemented. | Tests required when runtime logic lands. |
| FE-30 One framework | Pass | Pass for `web` | Public site remains Astro-only; Studio React is isolated to Sanity Studio. | Keep React out of public site unless justified as an island. |
| FE-31 Hydration boundaries | Pass | Pass for scaffold | `rg "client:" web/src` found no hydration directives. | Re-audit future islands. |
| FE-32 No JS for platform behavior | Pass | Pass for scaffold | No client-side JS in the scaffold. | Re-audit mobile nav/FAQ/search. |
| FE-33 Astro islands discipline | Pass | Pass for scaffold | No `@astrojs/react`, no island components, no client directives. | Re-audit if interactive islands are added. |
| FE-34 Data fetching discipline | Fixed | Pass for scaffold | Default Sanity client is `published`; preview client is explicit and gated. GROQ helpers use explicit projections and avoid per-candidate category dereference filters. | Re-audit with real route data fetching. |
| FE-40 Dependency ladder/control | Pass | Pass with accepted risk | Studio versions are pinned; hosted Studio auto-update risk is documented in `docs/DECISIONS.md:142-164`. | Re-check before shared/public Studio handoff. |
| FE-41 Registry discipline | N/A | N/A for scaffold | No registry components found in app code. | Record provenance if any are added. |
| FE-42 Registry provenance | N/A | N/A for scaffold | No registry components found in app code. | Same as FE-41. |
| FE-50 Typed/lint-clean/buildable | Pass | Pass | `web` build/check/format pass; `studio` typecheck/lint/format/build pass. Studio build needed network escalation for Sanity CDN lookup. | Keep evidence current after vertical-slice changes. |
| FE-51 No dead weight | Partial | Partial | READMEs are now project-specific. `@astrojs/sitemap` is installed but not configured until real routes exist. | Verify sitemap setup once routes land. |
| FE-52 Comments explain why | Pass | Pass | Source comments explain why, and `docs/DECISIONS.md:121-128` now accurately describes the published/preview Sanity client split. | Keep decisions current when implementation changes. |
| FE-53 Compiling is not completing | Pass | Pass by scope note | `HANDOFF.md` and READMEs state scaffold limitations. | Do not treat scaffold as vertical-slice approval. |
| FE-60 Decision ladder | Pass | Pass | `docs/DECISIONS.md` records dependency decisions and auto-update posture. | Keep decisions current when implementation changes. |
| FE-61 Respect existing codebase | Pass | Pass | Existing two-package layout and design-review constraints were preserved. | Continue preserving design-author constraints. |

Scoped FE result: **Approved for the scaffold.** FE-05 and FE-34 are no longer failing. Gates marked
N/A or unverified are genuinely outside scaffold scope and become hard gates for the first real
vertical slice.
