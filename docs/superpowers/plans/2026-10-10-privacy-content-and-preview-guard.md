# Typed Privacy Notice Content and Preview-Branch Guard Exception Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** (A) Move the bilingual privacy-notice prose out of `privacy.astro` into one typed, version-controlled content module (closes FE-22), and (B) let Cloudflare **preview** builds of a positively identified non-`main` branch skip the privacy-facts production guard so previews can be built and reviewed, while `main` and branch-less builds stay blocked.

**Architecture:** A new `web/src/lib/content/privacyNotice.ts` holds both languages as typed data (sections keyed by the ten Act 709 s.7(1) ids; text made of small typed "runs" so no raw HTML is ever injected). `privacy.astro` becomes a renderer. `checkPrivacyFacts` gains a branch-identity exception that reuses the existing `PRODUCTION_BRANCH` constant. The privacy page marks itself `noindex` and shows its draft note whenever the facts are incomplete.

**Tech Stack:** Astro 7 static site, TypeScript (strict), Node guard scripts (`node --experimental-strip-types`), Playwright against built `dist/`.

**Spec:** Charlie's decisions, 2026-10-10: "A" for FE-22 (typed content file in the repo) and the Cloudflare build log (builds `7d705be` and `66fcd2d` stop at `privacy-facts-guard` because Cloudflare previews run with `DEPLOY_ENV=production`). Bob's recommendations (2026-10-09/10): typed, version-controlled content; skip the guard only for a positively identified non-`main` branch; keep `main` and no-branch builds blocked; verify the preview's `noindex` behaviour. Governing guideline: `/Users/charlie/Documents/Projects/Setup_Instructions/Guidelines/04-Web-Development/Web-Development-Guidelines/02-INFORMATIVE-BLOG.md` (FE-22 and FE-06). Background: `docs/DECISIONS.md` §49 and `docs/superpowers/plans/2026-10-09-consent-banner-privacy-notice.md`.

## Global Constraints

- The notice text is **moved verbatim**. No word of English or Malay changes in this plan. Do not retype from memory; transform the existing markup in `web/src/pages/privacy.astro` (head `66fcd2d`).
- Owner facts and `copyApprovedOn` in `web/src/lib/privacy.ts` stay `null`. No fake value is ever committed. The privacy guards stay red on `main`-like builds until the owner supplies them.
- `web/public/_headers` does not change. No inline scripts. CSP unchanged.
- One `<h1>` on `/privacy/`; each language section keeps its `<h2>` and ten `<h3>` ids in the CURRENT page order (`who collect voluntary source recipients children rights choices retention changes`, suffix `-en` / `-ms`); `lang` attributes and `aria-labelledby` stay.
- Rendering never uses `set:html` or any raw-HTML path for notice text.
- "Positively identified non-`main` branch" means: `WORKERS_CI_BRANCH ?? CF_PAGES_BRANCH` (the same precedence `checkDeployEnv` uses) is a non-empty string that, after trimming whitespace and a leading `refs/heads/`, is **not** equal to `main` (compared case-insensitively). **Fail closed on conflict (Bob P1):** if BOTH `WORKERS_CI_BRANCH` and `CF_PAGES_BRANCH` are set and they differ after normalising, or EITHER one names `main`, the build is blocked. Anything else (no variable, empty, whitespace, `main`, `Main`, `refs/heads/main`, any conflict) stays blocked.
- **Preview access (Bob P1):** the Cloudflare build runs `npx wrangler versions upload`. That makes a **Version URL**, not an isolated preview. Version URLs are public unless protected by Cloudflare Access. `noindex` does not restrict access. Task 0 must pass before the first successful branch build.
- **Draft note (Bob P2):** the visible "Draft — not approved" note shows whenever `isPrivacyReleaseReady(PRIVACY_FACTS)` is false, not only when `copyApprovedOn` is null.
- Match surrounding code: tabs, double quotes, Prettier; header comments explain *why*.
- Do not merge or deploy. Charlie merges. Commit locally per task; push only when told.

## Review Focus

1. **Translation drift.** A section missing in one language, or different block / list-item counts between English and Malay. (Task 1 guard cases.)
2. **Typo in a fact token** (`{ fact: "ownerNam" }`) must be a compile error, not a blank in production. (Task 1: `pnpm check` plus a type-level test.)
3. **HTML injection / markup in copy.** Text containing `<`, `&` or quotes renders as text. (Task 1 test.)
4. **Branch-identity edge cases**: no variable, `""`, `"   "`, `main`, `Main`, `main `, `refs/heads/main`, a feature branch, both variables set and disagreeing (blocked, fail closed), either variable naming `main` (blocked). (Task 2 unit cases.)
5. **Local laptop build with `DEPLOY_ENV=production` and no branch** stays blocked (documented gap: a manual `wrangler deploy` still bypasses; unchanged).
6. **Preview exposure.** On a preview with unfinished facts the privacy page carries `<meta name="robots" content="noindex,nofollow">` and the visible "Draft — not approved" note; a skipped guard prints a loud warning in the build log. (Task 2 tests and log check.)
7. **No change to rendered words.** Rendered text of `/privacy/` before and after Task 1 is identical. (Task 1 baseline comparison, one-off, not committed.)

---

## File Structure

| File | Responsibility |
|---|---|
| `web/src/lib/content/privacyNotice.ts` (create) | Types (`Run`, `Block`, `NoticeSection`, `NoticeLanguage`, `SectionId`) and the data: `PRIVACY_NOTICE = { en, ms }`. The only place the prose lives. |
| `web/src/components/NoticeBlocks.astro` (create) | Renders `Block[]` to `<p>` / `<ul>`; resolves `{ fact }` runs from `PRIVACY_FACTS` and `siteSettings.phoneDisplay`. No raw HTML. |
| `web/src/pages/privacy.astro` (modify) | Layout, the single `<h1>`, the draft note, and two `<section>`s rendered from `PRIVACY_NOTICE`. `noindex` while not release-ready. |
| `web/src/lib/content/assertPrivacyFacts.ts` (modify) | Add `isPrivacyReleaseReady(facts)` and the branch-identity exception in `checkPrivacyFacts`. |
| `web/src/lib/content/assertDeployEnv.ts` (modify) | `export` the existing `PRODUCTION_BRANCH` constant (single source of truth). |
| `web/astro.config.mjs` (modify) | Hook prints a warning when the exception skips a guard that would have failed. |
| `web/scripts/assert-privacy-facts-guard.mjs` (modify) | Read ids and parity from the content module (not from `.astro` source); add branch-exception cases. |
| `web/tests/e2e/consent.spec.ts` (modify) | Page tests: injection safety, noindex meta + draft note while facts are null. |
| `docs/DECISIONS.md` (modify) | §49: FE-22 result, preview exception ruling, updated FE self-check rows. |

---

### Task 0: Preview access preflight (no code; blocks the first branch build)

**Owner:** Charlie (dashboard), Andy records. Claude never changes Cloudflare.

- [ ] **Step 1:** Charlie opens the Worker `justmathwebsite` in the Cloudflare dashboard: Settings → Domains & Routes → check whether **Preview URLs / Version URLs** are enabled, and whether **Cloudflare Access** protects them. Record the exact state (screenshot or words) in §49.
- [ ] **Step 2 (decision, only 2 options):** (a) turn Version URLs off or put Access in front of them, then the guard exception is safe to ship; or (b) accept a public, `noindex`, draft-labelled page for a short review window. Andy recommends (a). No branch build runs until Charlie chooses.
- [ ] **Step 3:** After the first successful branch build, run `curl -sI <version-url>/privacy/` and `curl -sI <version-url>/` and record: status, any `X-Robots-Tag`, any Access redirect. Bob checks the same.

---

### Task 1: Typed privacy-notice content module and renderer

**Files:**
- Create: `web/src/lib/content/privacyNotice.ts`, `web/src/components/NoticeBlocks.astro`
- Modify: `web/src/pages/privacy.astro`, `web/scripts/assert-privacy-facts-guard.mjs`
- Test: `web/scripts/assert-privacy-facts-guard.mjs` (content cases), `web/tests/e2e/consent.spec.ts`

**Interfaces:**
- Produces:
  ```ts
  export type SectionId =
  	| "who" | "collect" | "source" | "rights" | "recipients"
  	| "choices" | "voluntary" | "children" | "retention" | "changes";
  export type FactKey =
  	| "ownerName" | "contactEmail" | "phone" | "whatsappRetention"
  	| "analyticsRetention" | "lastUpdated";
  export type Run = string | { em: string } | { strong: string } | { fact: FactKey };
  export type Block = { p: Run[] } | { ul: Run[][] };
  export interface NoticeSection { id: SectionId; heading: string; blocks: Block[] }
  export interface NoticeLanguage {
  	lang: "en" | "ms";
  	title: string;            // the <h2>
  	preamble: Block[];        // "Last updated" line and the "other language below" pointer
  	sections: { [K in keyof typeof SECTION_IDS]: NoticeSection & { id: (typeof SECTION_IDS)[K] } }; // exact tuple: a missing, extra, misspelt or reordered section fails `pnpm check`
  }
  export const SECTION_IDS: readonly ["who","collect","voluntary","source","recipients","children","rights","choices","retention","changes"]; // current page order
  export const PRIVACY_NOTICE: { en: NoticeLanguage; ms: NoticeLanguage };
  ```
- Consumes: `PRIVACY_FACTS` (`web/src/lib/privacy.ts`), `siteSettings.phoneDisplay`.

- [ ] **Step 1: Record the baseline (one-off, not committed).** From `web/`, `pnpm build`, then save the visible text of `/privacy/` for both sections: a short Node + Playwright script that loads `dist/` via `node scripts/serve-dist.mjs 4321` and writes `main` `innerText` split by `#notice-en` / `#notice-ms` to `/tmp`-style scratch files (use the session scratchpad directory). Keep them until Step 7. This is the "no word changed" evidence.

- [ ] **Step 2: Write the failing guard cases** (append to `web/scripts/assert-privacy-facts-guard.mjs`; they import the module that does not exist yet):

  ```js
  import { PRIVACY_NOTICE, SECTION_IDS } from "../src/lib/content/privacyNotice.ts";

  function shape(block) {
  	return "p" in block ? "p" : `ul:${block.ul.length}`;
  }
  for (const lang of ["en", "ms"]) {
  	const n = PRIVACY_NOTICE[lang];
  	assert.equal(n.lang, lang, `${lang}: lang field`);
  	assert.deepEqual(n.sections.map((s) => s.id), [...SECTION_IDS], `${lang}: all ten ids, in order`);
  	// check the text runs only (never JSON.stringify: its own [] syntax would match)
  	const runs = [...n.preamble, ...n.sections.flatMap((s) => s.blocks)].flatMap((b) => ("p" in b ? b.p : b.ul.flat()));
  	for (const r of runs) {
  		const t = typeof r === "string" ? r : "em" in r ? r.em : "strong" in r ? r.strong : "";
  		assert.ok(!/\[[^\]]*\]/.test(t), `${lang}: bracketed placeholder text: ${t}`);
  		assert.ok(!/(TODO|TBD|FIXME)/i.test(t), `${lang}: placeholder word: ${t}`);
  		assert.ok(!/[<>]/.test(t), `${lang}: markup in copy: ${t}`);
  	}
  }
  // translation drift: same structure in both languages, section by section
  PRIVACY_NOTICE.en.sections.forEach((s, i) => {
  	const m = PRIVACY_NOTICE.ms.sections[i];
  	assert.deepEqual(s.blocks.map(shape), m.blocks.map(shape), `section ${s.id}: EN and MS block structure differ`);
  });
  ```

  Replace the old source-string id scan of `privacy.astro` (`id="${id}-${lang}"` checks) with these content-based checks, but **keep** a check that `privacy.astro` still contains `id="notice-en" lang="en"` and `id="notice-ms" lang="ms"` (layout ids stay in the page).

- [ ] **Step 3: Run to verify it fails.** `cd web && pnpm test:privacy-facts-guard` → FAIL (module not found).

- [ ] **Step 4: Create `privacyNotice.ts`.** Write the types above, then **transform** every paragraph, list and heading currently in `privacy.astro` into data. Rules: `{owner}` becomes `{ fact: "ownerName" }`, `{email}` becomes `{ fact: "contactEmail" }`, `{siteSettings.phoneDisplay}` becomes `{ fact: "phone" }`, retention values become `{ fact: "whatsappRetention" }` / `{ fact: "analyticsRetention" }` (the renderer picks the language's string), `{updated}` becomes `{ fact: "lastUpdated" }`; `<em>` becomes `{ em: "…" }`; `<strong>` becomes `{ strong: "…" }`. Keep every character of text, including the quotes around "we" and `Versi Bahasa Melayu di bawah. / A Bahasa Melayu version is below.` Export `SECTION_IDS` as a `const` tuple in the current page order; the `sections` mapped-tuple type makes a missing, extra or reordered section a compile error. Before Step 4, read the heading order from `privacy.astro` and make it match. Example of the data shape (first section, English only, for form; the real file carries all ten in both languages):

  ```ts
  who: {
  	id: "who",
  	heading: "Who we are",
  	blocks: [
  		{
  			p: [
  				"This website, mathematicsmalaysia.com, is run by ",
  				{ fact: "ownerName" },
  				', trading as Just Math Malaysia ("we"). You can contact us at ',
  				{ fact: "contactEmail" },
  				" or on WhatsApp ",
  				{ fact: "phone" },
  				".",
  			],
  		},
  	],
  },
  ```

  Add a type-level proof: a scratch file (not committed) that deletes one section must make `pnpm check` fail; report that result.

- [ ] **Step 5: Create `NoticeBlocks.astro`** and rewrite `privacy.astro`.

  ```astro
  ---
  import type { Block, FactKey, Run } from "../lib/content/privacyNotice";
  import { PRIVACY_FACTS } from "../lib/privacy";

  interface Props { blocks: Block[]; lang: "en" | "ms"; phone: string }
  const { blocks, lang, phone } = Astro.props;

  // A null fact only reaches a page in a non-production build; production refuses to build.
  const UNSET = "(not yet supplied)";

  function fact(key: FactKey): string {
  	switch (key) {
  		case "ownerName": return PRIVACY_FACTS.ownerName ?? UNSET;
  		case "contactEmail": return PRIVACY_FACTS.contactEmail ?? UNSET;
  		case "phone": return phone;
  		case "whatsappRetention": return PRIVACY_FACTS.whatsappRetention[lang] ?? UNSET;
  		case "analyticsRetention": return PRIVACY_FACTS.analyticsRetention[lang] ?? UNSET;
  		case "lastUpdated": return PRIVACY_FACTS.lastUpdated;
  	}
  }
  const isString = (r: Run): r is string => typeof r === "string";
  ---

  {blocks.map((b) =>
  	"p" in b ? (
  		<p>{b.p.map((r) => isString(r) ? r : "em" in r ? <em>{r.em}</em> : "strong" in r ? <strong>{r.strong}</strong> : fact(r.fact))}</p>
  	) : (
  		<ul>{b.ul.map((item) => <li>{item.map((r) => isString(r) ? r : "em" in r ? <em>{r.em}</em> : "strong" in r ? <strong>{r.strong}</strong> : fact(r.fact))}</li>)}</ul>
  	),
  )}
  ```

  `privacy.astro`: keep imports of the layout/header/footer, the draft note inside `<main>`, the single `<h1>` and the two `<section id="notice-en" lang="en" aria-labelledby="title-en">` / `notice-ms` wrappers. For each language render `<h2 id="title-…">{n.title}</h2>`, `<NoticeBlocks blocks={n.preamble} …/>`, then for each section `<h3 id={`${s.id}-${lang}`}>{s.heading}</h3>` and `<NoticeBlocks blocks={s.blocks} …/>`. Keep the existing scoped CSS. Keep the frontmatter comment saying the copy is a draft needing owner approval, native Malay check, GTM check and qualified advice.

- [ ] **Step 6: Add the page tests** (append to `consent.spec.ts`):

  ```ts
  test("/privacy/ renders notice text as text, never as markup", async ({ page }) => {
  	await page.goto("/privacy/");
  	const html = await page.locator("main").innerHTML();
  	expect(html).not.toMatch(/&lt;(script|img|iframe)/i); // nothing double-escaped from copy
  	expect(await page.locator("main script, main iframe, main img").count()).toBe(0);
  });
  ```

  And a unit-style case in the guard script that runs a fake `Run` with `"<script>alert(1)</script>"` through the same escape path is **not** needed (Astro escapes expressions); instead assert in the guard script that no string run in `PRIVACY_NOTICE` contains `<` or `>` — the content module must be plain text.

- [ ] **Step 7: Prove nothing changed in the words.** Rebuild, extract the same two texts as in Step 1, and `diff` them against the baseline. Expected: identical. Report the diff output (empty) in the task report. If anything differs, fix the content module, not the baseline.

- [ ] **Step 8: Run and commit.**

  Run each as its own command (never chain after the guard; it fails on purpose): `cd web && pnpm format:check && pnpm check && pnpm check:public`; then `pnpm test:e2e`; then separately `pnpm test:privacy-facts-guard` — it fails **only** at the real-facts assertion (owner facts null); all content cases pass. `pnpm test:e2e`: all pass (the existing `/privacy/` heading, h1, aria and overflow tests must pass unchanged).

  ```bash
  git add web/src/lib/content/privacyNotice.ts web/src/components/NoticeBlocks.astro web/src/pages/privacy.astro web/scripts/assert-privacy-facts-guard.mjs web/tests/e2e/consent.spec.ts
  git commit -m "refactor(privacy): move the bilingual notice into a typed content module (FE-22)

  Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
  ```

---

### Task 2: Preview-branch exception for the privacy-facts guard

**Files:**
- Modify: `web/src/lib/content/assertDeployEnv.ts` (export `PRODUCTION_BRANCH`), `web/src/lib/content/assertPrivacyFacts.ts`, `web/astro.config.mjs`, `web/src/pages/privacy.astro`, `web/scripts/assert-privacy-facts-guard.mjs`
- Test: `web/scripts/assert-privacy-facts-guard.mjs`, `web/tests/e2e/consent.spec.ts`

**Interfaces:**
- Consumes: `PRODUCTION_BRANCH` ("main") from `assertDeployEnv.ts`; `PrivacyFacts`.
- Produces:
  ```ts
  export function isPrivacyReleaseReady(facts: PrivacyFacts): boolean;           // true only if checkPrivacyFacts' own field rules all pass
  export function previewBranch(env: Record<string, string | undefined>): string | null; // the positively identified non-main branch, else null
  export function checkPrivacyFacts(facts, env): { error?: string; skippedForPreview?: string };
  ```

- [ ] **Step 1: Write the failing unit cases** (append to `assert-privacy-facts-guard.mjs`):

  ```js
  import { checkPrivacyFacts, previewBranch } from "../src/lib/content/assertPrivacyFacts.ts";

  const nullFacts = { ...good, ownerName: null };
  const P = (extra) => ({ DEPLOY_ENV: "production", ...extra });

  // blocked: no branch identity, or the production branch in any spelling
  for (const [label, env] of Object.entries({
  	noBranch: P({}),
  	emptyBranch: P({ WORKERS_CI_BRANCH: "" }),
  	spaces: P({ WORKERS_CI_BRANCH: "   " }),
  	main: P({ WORKERS_CI_BRANCH: "main" }),
  	Main: P({ WORKERS_CI_BRANCH: "Main" }),
  	mainSpace: P({ WORKERS_CI_BRANCH: "main " }),
  	refsMain: P({ WORKERS_CI_BRANCH: "refs/heads/main" }),
  	pagesMain: P({ CF_PAGES_BRANCH: "main" }),
  })) {
  	assert.ok(checkPrivacyFacts(nullFacts, env).error, `must stay blocked: ${label}`);
  	assert.equal(previewBranch(env), null, `not a preview: ${label}`);
  }
  // skipped: a positively identified non-main branch
  for (const [label, env] of Object.entries({
  	feature: P({ WORKERS_CI_BRANCH: "feat/consent-banner-privacy-notice" }),
  	pages: P({ CF_PAGES_BRANCH: "feat/x" }),
  	sameBoth: P({ WORKERS_CI_BRANCH: "feat/x", CF_PAGES_BRANCH: "feat/x" }),
  })) {
  	const r = checkPrivacyFacts(nullFacts, env);
  	assert.equal(r.error, undefined, `preview must not be blocked: ${label}`);
  	assert.ok(r.skippedForPreview, `preview skip must be reported: ${label}`);
  }
  // conflicting signals fail closed, in both directions
  for (const env of [
  	P({ WORKERS_CI_BRANCH: "feat/x", CF_PAGES_BRANCH: "main" }),
  	P({ WORKERS_CI_BRANCH: "main", CF_PAGES_BRANCH: "feat/x" }),
  	P({ WORKERS_CI_BRANCH: "feat/x", CF_PAGES_BRANCH: "feat/y" }),
  ]) {
  	assert.ok(checkPrivacyFacts(nullFacts, env).error, "conflicting branch signals must stay blocked");
  	assert.equal(previewBranch(env), null);
  }
  // a finished fact set on a preview is simply fine and is not reported as skipped
  assert.equal(checkPrivacyFacts(good, P({ WORKERS_CI_BRANCH: "feat/x" })).skippedForPreview, undefined);
  ```

  The existing **real-facts** assertion in the script keeps using an env with `DEPLOY_ENV=production` and **no** branch, so CI stays red exactly as intended.

- [ ] **Step 2: Run to verify it fails.** `pnpm test:privacy-facts-guard` → FAIL (`previewBranch` is not exported).

- [ ] **Step 3: Implement.** In `assertDeployEnv.ts` change `const PRODUCTION_BRANCH = "main";` to `export const PRODUCTION_BRANCH = "main";`. In `assertPrivacyFacts.ts` add:

  ```ts
  import { PRODUCTION_BRANCH } from "./assertDeployEnv.ts";

  /**
   * The branch Cloudflare is building, but only if it is positively a branch other than the
   * production one. Fails closed: no variable, an empty value, either variable naming the production
   * branch, or two variables that disagree all return null — those builds stay blocked.
   */
  export function previewBranch(env: Record<string, string | undefined>): string | null {
  	const norm = (v: string | undefined) => v?.trim().replace(/^refs\/heads\//, "").trim();
  	const w = norm(env.WORKERS_CI_BRANCH);
  	const p = norm(env.CF_PAGES_BRANCH);
  	const set = [w, p].filter((v): v is string => v !== undefined);
  	if (set.length === 0 || set.some((v) => v === "")) return null; // no or empty identity
  	if (set.some((v) => v.toLowerCase() === PRODUCTION_BRANCH)) return null; // either names main
  	if (set.length === 2 && set[0] !== set[1]) return null; // conflict
  	return set[0];
  }
  ```

  Then in `checkPrivacyFacts`, after the problems are collected and before returning the error: `if (problems.length > 0) { const branch = previewBranch(env); if (branch) return { skippedForPreview: `...` } }`, where the message names the branch and the problems. Add `isPrivacyReleaseReady(facts)` = `checkPrivacyFacts(facts, { DEPLOY_ENV: "production" }).error === undefined`. Update the file header comment: previews of a named non-main branch skip the guard; why; what stays blocked.

  `astro.config.mjs` hook: `const { error, skippedForPreview } = checkPrivacyFacts(...)`; if `skippedForPreview`, `console.warn` a **loud** multi-line warning (`[privacy-facts-guard] SKIPPED for preview branch "…": … This build must NOT be promoted to production.`); if `error`, throw as now.

  `privacy.astro`: pass `noindex={!isPrivacyReleaseReady(PRIVACY_FACTS)}` to `BaseLayout` (the prop already exists) and show the draft note whenever `!isPrivacyReleaseReady(PRIVACY_FACTS)` (replace the `copyApprovedOn === null` condition; add a unit-style case where `copyApprovedOn` is set but `contactEmail` is null: the note still shows).

- [ ] **Step 4: Add the page tests** (append to `consent.spec.ts`):

  ```ts
  test("/privacy/ is noindex and shows the draft note while owner facts are unfinished", async ({ page }) => {
  	await page.goto("/privacy/");
  	await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow");
  	await expect(page.locator(".draft-note")).toContainText("Draft");
  });
  ```

  (With the committed null facts this is the state the e2e build has. Add a comment: once the owner supplies every fact and `copyApprovedOn`, this test must be inverted by whoever finalises the notice; that edit is part of the release checklist in §49.)

- [ ] **Step 5: Run, then prove the build-level behaviour** (report the commands and output):
  - Run separately: `cd web && pnpm format:check && pnpm check && pnpm check:public`; `pnpm test:e2e`; `pnpm test:privacy-facts-guard` (fails only at the real-facts assertion).
  - `DEPLOY_ENV=production WORKERS_CI_BRANCH=feat/test PUBLIC_SANITY_PROJECT_ID=v4v0i7gl PUBLIC_SANITY_DATASET=production pnpm build` → **exits 0** and prints the SKIPPED warning (needs network; if blocked, say so and rely on the unit cases).
  - The same with `WORKERS_CI_BRANCH=main` → deployEnvGuard passes, **privacy guard fails the build** (exit 1).
  - The same with no `WORKERS_CI_BRANCH` → fails.
  - `grep -o 'name="robots"[^>]*' dist/privacy/index.html` shows `noindex,nofollow` for the skipped-preview build.

- [ ] **Step 6: Commit.**

  ```bash
  git add web/src/lib/content/assertDeployEnv.ts web/src/lib/content/assertPrivacyFacts.ts web/astro.config.mjs web/src/pages/privacy.astro web/scripts/assert-privacy-facts-guard.mjs web/tests/e2e/consent.spec.ts
  git commit -m "feat(privacy): let named non-main preview branches skip the privacy-facts guard

  Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
  ```

---

### Task 3: Record the decisions

**Files:** Modify `docs/DECISIONS.md` (§49 only, plus a dated note where §49 describes R13 and the FE self-check).

- [ ] **Step 1:** In §49 add ruling **R15 (2026-10-10, Charlie "A" + Bob's reading of the Cloudflare log):** Cloudflare previews build with `DEPLOY_ENV=production`; builds `7d705be` and `66fcd2d` stopped at `privacy-facts-guard` (observed in the Cloudflare build log, reported by Bob). The guard now skips only for a positively identified non-`main` branch (rules as in this plan's Global Constraints); `main` and branch-less builds stay blocked; a manual laptop `wrangler deploy` still bypasses (unchanged gap). A skipped build logs a loud warning and the privacy page is `noindex` with a visible draft note until every fact and `copyApprovedOn` are set. Record the Version URL fact (wrangler versions upload makes a Version URL that is public unless Access protects it) and the Task 0 result. Record what is **not** verified: whether Cloudflare adds `X-Robots-Tag` on Version URLs (the site's `_headers` has none).
- [ ] **Step 2:** Update the FE self-check row **FE-22** from OPEN to **pass** with this evidence: prose lives in `web/src/lib/content/privacyNotice.ts` (typed, version-controlled, reviewed in Git); `pnpm check` and the guard script cases; baseline text diff identical. Keep every other OPEN row open.
- [ ] **Step 3:** Update the sentence that says the production hook "keys on `DEPLOY_ENV=production` and does nothing otherwise" to add the branch exception. Run `cd web && pnpm format:check` (docs outside `web/` are not covered by CI; do not reformat the file). Commit: `docs(decisions): record the typed notice content and the preview-branch exception (§49 R15)`.

---

## Self-Review

- **Spec coverage:** A = typed content module, renderer, parity/structure guards, no-words-changed proof (Task 1); preview exception with positive branch identity, loud warning, `noindex`, draft note, build-level proof (Task 2); decisions recorded, FE-22 evidence (Task 3). Granular consent is not in this plan (stays open per Bob).
- **Placeholders:** none in code. The only deferred content is the owner facts, deliberately `null`.
- **Type consistency:** `SectionId`, `FactKey`, `Run`, `Block`, `NoticeSection`, `NoticeLanguage`, `PRIVACY_NOTICE`, `SECTION_IDS` are named identically in Tasks 1–2; `previewBranch`, `isPrivacyReleaseReady`, `checkPrivacyFacts` and `skippedForPreview` identically in Task 2 and the guard script.
- **Review Focus:** items 1–3 and 7 are owned by Task 1, 4–6 by Task 2; preview access is Task 0.

## Inputs this plan cannot supply

Owner facts, `copyApprovedOn`, the Malay native check, the Google Tag Manager / GA4 audit, qualified advice, and Charlie's decision on granular consent options. After the preview exception lands, someone must check the resulting preview URL's headers (`curl -sI <preview>/privacy/`) for `X-Robots-Tag`.
