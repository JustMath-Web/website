---
document_type: copy-deliverable
scope: "Localisation — Bahasa Melayu, landing page only"
provenance: ai-drafted
status: plan — decisions resolved 2026-09-05; draft copy in COPY-DRAFT-MS.md awaiting proofread
date: 2026-09-05
---

# LOCALISATION — Bahasa Melayu

Craft standard §G.6 deliverable. **This is a plan and a decision record, not the BM copy.** No BM
string in this document is cleared to ship; §5 sets out what must happen first.

## 1. Decisions taken

| Decision | Value | Rationale |
| --- | --- | --- |
| Scope | **Landing page only** | The BM demand hypothesis is unmeasured (§2). Landing-only is the smallest change that makes it testable. |
| Timing | **After cutover, as a discrete release** | Cutover already carries five things testable only in production; BM would make eight, and confounds the baseline measurement. |
| URL | `/ms/` subpath on the same domain | Keeps one property, one Search Console history, one analytics stream. |
| Language | Bahasa Melayu (Malaysia) | Per approved copy: sessions run "in English or Bahasa Melayu". |
| Sign-off owner | **Charlie** (confirmed 2026-09-05) | Closes CW-82's named-reader requirement. Method resolved 2026-09-05 — separate proofreading session, recorded as self-review (§5.2). |

**Why the blog is excluded.** Extending to the blog turns an untested hypothesis into a permanent
process obligation: every future post would need a BM version or an explicit English-only state,
forever, decided before the site has been indexed once. If BM proves out, extending is a normal next
step. If it does not, the cost was one page.

**Why not a partial page.** Translating the hero, levels, pricing and FAQ while leaving the Problem
and About prose in English produces a visibly mixed-language page. `SECTOR-PROFILE.md` Q1 puts
register and trust at the centre of what this copy does; a half-translated page reads as unfinished
and is the only option that creates a quality problem rather than a scope one.

## 2. The evidence position — stated plainly

**There is none.** `tuisyen`, `matematik`, `tingkatan` and `darjah` all return zero visible queries
across 16 months (`SEARCH-STRATEGY.md` §3). That is a **weak zero**: the site is English-only, so it
could not have ranked for BM terms regardless. It is not evidence of absence of demand — and it is
not evidence of demand either. Competitor behaviour is the only support (Aster Edu, Dass Maths and
Mathspower all run BM pages), and that is inference.

**Do not wait for data before shipping.** This is the trap in a weak zero: the post-cutover re-pull
*cannot* say anything about BM demand, because BM query data cannot exist without BM pages.
**Shipping the page is the experiment.** Sequence: cutover → let the English baseline settle a few
weeks → ship BM as a discrete, attributable release → read it at the following re-pull.

## 3. Provenance — this is a new class on this site

Every English visitor-facing string is **client-authored** (`COPY-GAPS.md`: 213 strings, 174
verbatim, 38 derived, 0 replaced). **Every BM string will be `✍️ AI-drafted`** — the first
substantial body of AI-authored visitor-facing copy on this site.

That is a category change, not an increment. It must be recorded in `COPY-GAPS.md` as a **separate
class** with its own count, never folded into the existing 213, so a later reader can tell at a
glance which language on this site was written by whom.

## 4. Transcreation decisions (CW-80/81)

Several strings cannot survive literal translation. Each needs a recorded decision and a reason.
**These are worked proposals for review, not approved strings.**

### 4.1 Hero headline — the hardest one

> EN: **Know exactly where your child's maths stands**

A literal rendering (*"Tahu dengan tepat di mana kedudukan matematik anak anda"*) is grammatical but
flat, and "kedudukan" carries a ranking sense — actively wrong for a page whose central argument is
that the system measures too rarely and that a *grade* is not a *diagnosis*.

| Option | BM | Note |
| --- | --- | --- |
| A | **Tahu di mana sebenarnya tahap matematik anak anda** | "tahap" (level of mastery) not "kedudukan" (rank); "sebenarnya" carries the English "exactly". **Recommended.** |
| B | Ketahui tahap sebenar matematik anak anda | Tighter, slightly more formal; loses the "exactly" emphasis. |
| C | Di mana sebenarnya tahap matematik anak anda? | Question form; more conversational, but the EN hero is a statement and the register is deliberately calm rather than probing. |

**Recommendation: A** — and note that "tahap" is also the word Lembaga Peperiksaan itself uses for
Learning Matrix reporting (*"tahap penguasaan"*), which aligns the page with the vocabulary parents
will meet on the result slip.

> **APPROVED 2026-09-05 (Charlie): Option A.** `Tahu di mana sebenarnya tahap matematik anak anda`

### 4.2 Terms that must NOT be translated

| Keep in English/as-is | Why |
| --- | --- |
| SPM, IGCSE, KSSR, KSSM | Official names; translating them would be wrong, not localised |
| Additional Mathematics / Add Maths | **RESOLVED 2026-09-05:** *Matematik Tambahan (Add Maths)* on first mention, then *Matematik Tambahan*. |
| Modern Mathematics | *Matematik Moden* — same pattern, same resolution. |
| Google Meet, WhatsApp, DuitNow | Product names |
| "Standard 1 to Form 5" | *Darjah 1 hingga Tingkatan 5* — the standard BM school-level terms, and the ones a BM-reading parent uses. **Approved 2026-09-05.** |
| Mr Kong | **RESOLVED 2026-09-05 (Charlie): keep `Mr Kong`.** My recommendation was *Cikgu Kong* on register grounds; the owner chose brand consistency across both language versions, which is a legitimate trade and is the client's call on his own name. Recorded as an owner decision against the drafter's recommendation, not as an oversight. |

### 4.3 Register

The English voice is first-person singular, plain, and deliberately unhurried. BM must match:
**"saya"**, not the corporate "kami" — there genuinely is one person, and "kami" would silently
contradict the page's central claim. Avoid the tuition-advertising register the category defaults to
(exclamation marks, *jom*, *terbaik*, *cemerlang*); `SECTOR-PROFILE.md` Q6's banned list applies in
translation, not just in English.

### 4.4 Prices, numbers, dates

Unchanged: RM figures, session lengths, "24 years", "500+", the fee table. Numbers are the page's
proof device (Q2) and must read identically in both languages so they can be checked against each
other.

## 5. Conditions before any BM string is drafted

All four are open. **None is cutover-blocking** — which is part of the argument for BM following
cutover: it gives these room to be done properly rather than compressed into the riskiest week.

1. **Provenance class registered — DONE 2026-09-05.** `design/COPY-GAPS.md` now carries a
   "Provenance class 2" block, kept separate from the 213 English strings.
2. **CW-82 review method — RESOLVED 2026-09-05.** Charlie proofreads the BM in a **separate
   session**, against the drafted file. Recorded honestly: this is **self-review**, because the same
   person approves the English source. A separate session gives it fresh eyes on the text rather
   than on the reasoning that produced it, which is a real improvement over reviewing inline here —
   but it is not independent review and this record does not claim it is.
3. **Transcreation decisions recorded** per §4, with the three marked "decision needed" resolved.
4. **Technical contract agreed** — §6.

## 6. Technical contract

- **Routing:** `/ms/` subpath. English stays at `/`.
- **SEO:** `/ms/` inherits the **per-field** SEO contract fixed in PR #54 — Studio value, then
  derived, then `defaultSeo` last. It must not reintroduce object-level fallback, or the BM page
  will silently ship the English page's title.
- **hreflang is reciprocal, and this touches the English pages.** `/` gains
  `<link rel="alternate" hreflang="ms" href="…/ms/">` when BM lands, `/ms/` carries the `en`
  counterpart, and one of them carries `x-default`. **Plan it as one change, not two** — the English
  pages are therefore not frozen after cutover. Reciprocal-hreflang failures are silent: nothing
  errors, the pages simply do not pair.
- **Sitemap:** `/ms/` must be included; verify the Astro sitemap integration emits it.
- **`lang` attribute:** `<html lang="ms-MY">` on the BM page. The English pages are `en-MY`.
- **Language switcher:** needed, and its own label is a copy decision (`Bahasa Melayu` / `English`,
  not flags — a flag is a country, not a language).
- **Analytics:** no change needed. Same property, same container, same hostname gate.

## 7. Open items

| Item | Owner | State |
| --- | --- | --- |
| Resolve the three §4.2 "decision needed" terms | Charlie | **Resolved 2026-09-05** |
| Approve or amend the §4.1 hero recommendation | Charlie | **Approved 2026-09-05** — Option A |
| Define the CW-82 review method (§5.2) | Charlie | **Resolved 2026-09-05** — separate proofreading session |
| Proofread `COPY-DRAFT-MS.md` | Charlie | **Open — gates shipping** |
| Tighten the "6 to 8 October" date in BOTH languages | Charlie | **Done 2026-09-05** — English and BM both now read 7 October |
| Register the provenance class in `COPY-GAPS.md` | Andy | **Done 2026-09-05** |
| Draft the BM landing copy | Andy | **Drafted 2026-09-05** — `COPY-DRAFT-MS.md`, awaiting proofread |
| Build `/ms/` route + reciprocal hreflang | dev | Not started — after cutover, per §1 |
