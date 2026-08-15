# COPY-GAPS — Just Math Malaysia

Every visitor-facing string in the landing kit, classified against the approved source
`just-math-page-copy-final.md`. Method: all 213 unique visible text nodes were extracted from the
rendered page and normalised (case, curly quotes, dashes, punctuation) before matching, so wrapping
and typographic substitution never register as a copy change.

**Result: 213 unique strings · 174 carried verbatim · 38 derived · 0 replaced.**

## 1. Section classification

The client supplied final, approved copy. Nothing was rewritten, shortened, or re-ordered.

| # | Section | Classification | Note |
| --- | --- | --- | --- |
| 1 | Hero | **carry-over (verbatim)** | headline, lead, note |
| 2 | Trust bar | **carry-over** | four figures; labels derived (§2) |
| 3 | Problem | **carry-over** | plus the gap-chart annotations (§2) |
| 4 | Why one-to-one / sessions | **carry-over** | five numbered blocks |
| 5 | Level blocks | **carry-over** | range labels + age bands derived (§2) |
| 6 | About the tutor | **carry-over** | incl. the 500-number panel |
| 7 | Pricing | **carry-over** | table headers derived (§2) |
| 8 | How it works | **carry-over** | four steps |
| 9 | FAQ | **carry-over** | all 13 Q&A pairs |
| 10 | Final CTA | **carry-over** | |
| — | CTA button label | **override, approved** | see §3 |

No section is classified *revise* or *replace*. There is no testimonials section, deliberately, and
none was added.

## 2. Derived microcopy — 38 strings

Strings the layout introduced that are not in the approved copy. None invents a claim, price,
policy, guarantee or legal term. **CS-60 cliché check: 0 hits.**

### 2a. Structural labels — no factual content (22)

Navigational and tabular furniture. Safe to change without client involvement.

| String(s) | Where | Kind |
| --- | --- | --- |
| `03` `04` `05` `06` `07` | Section markers | Ordinal marker |
| `Questions` · `Levels taught` · `Every level, one tutor` | Section kickers | Kicker |
| `Level` · `Session` · `Per month` · `Per session` | Pricing table | Column header |
| `When maths is measured` | Gap chart | Chart title |
| `S1`–`S6`, `F1`–`F5` | Gap chart axis | Axis label |
| `Standard 1–6` · `Form 1–3` · `Form 4–5` | Level blocks | Range label |
| `Standard 2` | Spine | Scale label |

### 2b. Data-viz annotation — derived from approved claims (7)

Each restates something the approved copy already asserts. Trace given; no new facts.

| String | Trace to approved copy |
| --- | --- |
| `NO MEASURE` | "…never independently measured" (Problem) |
| `3 POINTS · 11 YEARS` | The three measured points named in Problem, across Standard 1–Form 5 |
| `11 YEARS` | Standard 1 to Form 5 = eleven school years |
| `independent checks in eleven years of schooling` | As above, restated as the Stat label |
| `OCT 2026` | "…they sit the Learning Matrix maths paper on 6 to 8 October" |
| `Standard 1, 2, 3, 5, 6 and Form 1, 2, 4 are never independently measured. Form 3 to SPM is the longest unchecked stretch — and the one Additional Mathematics arrives in.` | Condenses the Problem section's own argument |
| `minutes, free` · `students a year` | Stat-component labels under approved figures |

### 2c. Needs client confirmation before build (3)

These add information the approved copy does not state. **Do not ship unconfirmed.**

| String | Status |
| --- | --- |
| `Ages 7 to 12` (and the other level age bands) | ✅ **CONFIRMED correct** — client, 2026-08-11. No longer a gap |
| ~~`Plus IGCSE Mathematics and Additional Mathematics, taught to the international syllabus.`~~ | ✅ **RESOLVED by reverting to approved copy** — see §2e. No confirmation needed |
| `13 things parents ask before booking` | ⚠️ **Still open — a build rule, not a wording question.** The count is right today, but if a question is added or removed the string silently becomes false. **Bind it to the FAQ array length at build time; never hard-code it.** |

## 2e. Derived copy reverted to approved source — 2026-08-11

The IGCSE line was derived microcopy that **weakened an approved claim**, and it was replaced with
the approved sentence verbatim rather than sent to the client for confirmation.

| | Text |
| --- | --- |
| **Approved copy** (Block four — IGCSE, bullet 1) | "IGCSE Mathematics and IGCSE Additional Mathematics, taught to the international syllabus **rather than translated across from SPM**." |
| **What the page had shipped** | "Plus IGCSE Mathematics and Additional Mathematics, taught to the international syllabus." |

Three changes had crept in: `Plus` was prepended, the second `IGCSE` was dropped from "IGCSE
Additional Mathematics", and — the one that matters — **the clause "rather than translated across
from SPM" was cut.** That clause is the entire point of the sentence: it distinguishes a natively
taught international syllabus from a converted Malaysian one. Losing it turned a differentiator into
a subject list.

**This is the verbatim policy doing its job.** The approved sentence is now restored in source and in
`_ds_bundle.js`. It needed no client decision, because the client had already written it.

## 2d. Component state strings — added 2026-08-10

Default strings introduced when the component state gaps were closed. They are **component
defaults, overridable per use**, and none appears on the landing page today — the page has no forms
and the report kit passes its own data.

| String | Component | Kind | Note |
| --- | --- | --- | --- |
| `Working…` | `Button` `loadingLabel` | Derived | Screen-reader only (`role="status"`); the visible label never changes |
| `Not assessed yet` | `ProgressMeter` `emptyLabel` | Derived | Shown for a topic with no reading taken |
| `No marks recorded yet — this month sets the baseline.` | `ScoreTable` `emptyLabel` | Derived | The first report of every new student |

**[CLIENT TO CONFIRM]** the two report strings — they appear in a document sent to parents, so the
wording is Mr Kong's voice, not a system default. The `Button` string is never seen visually.

## 2f. Accessible-name strings — added 2026-08-11

The development craft standard (FE-02) requires every `<section>` to carry an accessible name. Two of
the three headless sections reuse text already on the page, so they introduce **no new copy**:

| Section | Accessible name | Source |
| --- | --- | --- |
| Levels | "Levels taught" | Existing visible kicker — `aria-labelledby` |
| FAQ | "Questions" | Existing visible kicker — `aria-labelledby` |
| Trust bar | `Teaching experience` | **New derived string** — screen-reader only (`aria-label`); the band has no kicker and no heading |

Only the third is new, and it is never displayed. **[CLIENT MAY OVERRIDE: the trust-bar label is
announced to screen-reader users as the section's name — plain and factual is the intent.]**

## 2g. Header CTA label — owner override, 2026-08-12

The header CTA reads **"Schedule Now"** (owner instruction). Two conflicts recorded rather than
silently absorbed:

1. **"Now" is urgency language, which this brand bans.** `readme.md` voice rules: *"Reassurance,
   never urgency"*, and **"book now"** is on the banned list — the same list `MARKET-SCAN.md` §3
   built from the competitors this brand is defined against. Every other CTA on the site avoids it.
2. **The label no longer names the destination.** The five in-page CTAs read "…on WhatsApp", so the
   word carries it; here the glyph is the only signal — which makes the glyph **non-removable** and
   re-opens the pending WhatsApp glyph-asset question (`ASSETS.md` §4).

**Alternatives that keep the brand voice:** "Schedule a session" · "Schedule on WhatsApp" ·
"Book the free assessment". **[OWNER: confirm "Schedule Now" stands, or pick one of these.]**

## 2h. Blog copy — ALL PLACEHOLDER, none approved

**Nothing in `ui_kits/blog/` is client copy.** Every string was authored to demonstrate the
templates, and it includes **factual mathematical and syllabus claims** that no one has checked:

| Item | Status |
| --- | --- |
| The surds article, in full — headings, prose, worked steps, the "ten-minute check" | **Placeholder.** Authored, not supplied. The maths is believed correct but is unreviewed |
| 4 post titles, excerpts, dates, read times | **Placeholder** |
| Category names and post counts (12, 9, 14, 8, 11, 5) | **Placeholder** — the six syllabus levels are real; the counts are invented |
| Archive heading "Where maths goes wrong, and what to do about it" and its lead | **Placeholder** |
| Section labels: "Notes", "Where this goes wrong", "Working, line by line" | **Derived** — these are template furniture and would survive real content |

**Do not ship any of it.** The template furniture in the last row is the only part intended to
persist. Real posts are written by Mr Kong; **maths in a published post must be checked by him**,
because an error in a worked example on a tutor's own site is worse than no post at all.

## 3. Approved overrides

| Original | Replacement | Approver | Date |
| --- | --- | --- | --- |
| `Book a free maths assessment Now` | `Book a free maths assessment on WhatsApp` | Charlie (project owner) | 2026-08-10 |

Rationale recorded at the time: the label now names the destination, so a parent knows where the
button leads before tapping. All five CTAs carry this identical label; the WhatsApp glyph inside the
button reinforces it. The stale label was also removed from the `WhatsAppButton` component default
and from the compiled bundle, so no surface can reintroduce it.

## 4. Build-time rules

1. **Approved copy is verbatim.** Layout adapts to copy. Wrapping, hyphenation, responsive breaks
   and CSS casing are not copy changes; editing words is.
2. **The five CTAs share one string.** Define it once and reference it; never re-type it.
3. **Nothing in §2c ships until confirmed**, and `13` must be computed, not typed.
4. Any new display string a richer layout introduces is derived microcopy and belongs in §2 of this
   file before it reaches a page.
