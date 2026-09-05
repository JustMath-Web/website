---
document_type: copy-deliverable
scope: "02 — SEO & keyword strategy"
provenance: ai-drafted
status: draft — reviewed by Bob, not yet client-approved
date: 2026-09-05
---

# SEARCH-STRATEGY — Just Math Malaysia

**Scope declaration (CW-10).** This document is **scope 02 only** — SEO and keyword strategy. It
does not draft, revise or propose site copy. The landing copy is client-authored and
verbatim-locked (`design/COPY-GAPS.md`: 213 strings, 174 carried verbatim, 38 derived, 0 replaced),
so the only strings this document touches are **derived metadata**, which sit in the 38 and were
never part of the approved source. Scope 01, 03 and 04 are not declared. Widening is a new,
recorded declaration.

**Why there is no claim ledger.** The copywriting practice has never been instantiated on this
project — there is no `CLAIM-LEDGER.md`, no prior scope declaration, no `VERBAL-IDENTITY.md`. Every
factual assertion here traces to either the Search Console export or the live legacy HTML, both
cited inline. That is the substitute, and it is weaker than a ledger; it is recorded as such.

---

## 1. Data adequacy — read this before using any number below

**Source.** Google Search Console, property `mathematicsmalaysia.com`, Search type Web, last 16
months, exported 2026-09-04. No country filter was applied at export; segmentation below is mine.

**Property totals: 37 clicks / 1,821 impressions across 16 months.** Malaysia: 26 clicks / 831
impressions / avg. position 15.41. Non-Malaysia: 11 clicks / 990 impressions — **54% of all
impressions are foreign**, and they rank better than Malaysian traffic does.

**The limitation that governs everything here.** `Queries.csv` contains 62 rows totalling **1 click
and 160 impressions**. Against the property totals, the visible query table accounts for **2.7% of
clicks and 8.8% of impressions**. The other 91% sits in queries Search Console withholds as too
rare to display.

This has a direct and important consequence:

> **A term's absence from the query table is NOT evidence that it received zero impressions.** It is
> evidence that the term fell below the anonymisation threshold. With 91% of impressions hidden, a
> term could have received a handful of impressions every month and still never appear.

That qualifies the "16-month zeros are the firmest findings" reading. The zeros are *directional*,
not dispositive, and §3 marks which ones carry weight and why.

**What this dataset CAN establish, robustly:**

- **Magnitude.** 831 Malaysian impressions over 16 months is ~52/month. This is a property-level
  total, not a sample. The domain has effectively no Malaysian search presence. Nothing in this
  document should be read as optimising an existing position; there is none to optimise.
- **Page-level distribution.** `Pages.csv` is not anonymised. Per-page clicks, impressions and CTR
  are solid (§2).
- **Country distribution.** `Countries.csv` is likewise complete.
- **Disconfirmation of large claims.** See the worked example in §2.

**What it CANNOT do:** rank the eleven candidate terms against one another, supply volume or
difficulty for any of them, or support a statement that any specific term has no demand. No
keyword-volume tool was available. Every ranking in §3 and §4 is therefore **inference from query
shape, competitor targeting and page-level evidence — labelled hypothesis where it is one.**

**One arithmetic caution.** `Pages.csv` sums to 2,032 impressions against the property's 1,821.
Search Console aggregates page and property totals differently; treat both as approximate at the
margin and do not compute percentages to more than two significant figures from them.

**Source verification.** Every figure quoted in this document was checked against the exported CSVs
by exact-line match, not transcribed by eye — 19 assertions across `Queries.csv`, `Pages.csv`,
`Countries.csv` and `Devices.csv`, all matching. One that looks like an error and is not:
`/pricing/` has an avg. position of **15.41**, identical to Malaysia's country-level **15.41**.
Both are verbatim from source (`Pages.csv` line 3, `Countries.csv` line 2). Coincidence, not a slip.

---

## 2. What the legacy site actually did — findings, not inference

These come from `Pages.csv` and the live HTML, and do not depend on the anonymised query table.

**`/pricing/` is the property's best-converting page, and it is being deleted.**
9 clicks / 111 impressions / **8.11% CTR — 4× the site-wide average of 2.03%** (37/1,821). That is
24% of every click the site has earned, from 6% of its impressions, and it is the only page other
than the home page with meaningful clicks. It 301s to `/#pricing` on the new site. Together with
`/about/` (82 impressions) and `/faq/` (62), that is 255 impressions — 14% of the property — on three
URLs that stop existing as pages.

**This is the single strongest measured signal in the dataset, and it argues for one specific
architecture change.** Everything else here is inference from query shape; this is observed
behaviour. People arrive at this domain looking for price specifically, and the client publishes a
complete price table — the one thing `SECTOR-PROFILE.md` Q2 ranks as table stakes that the category
mostly defers ("spmmath RM60/mo, tavis RM99/mo, algonova 'from RM48'"). A standalone `/pricing/`
page is the only architecture change this data actively supports.

This document does not reverse the one-pager — that is a design decision and a client call, not a
copy decision. But "recorded risk" understates it, and it should be decided before cutover rather
than after, because the redirect is cheap to change now and expensive to unwind once the 301 has
aged. Recorded in `docs/DECISIONS.md` §10a.

**Foreign traffic is on the home page, not the maths posts — disconfirmed by arithmetic.**
The hypothesis was that international impressions land on the calculus and algebra posts, implying
this domain's earned position is topic content rather than commercial content. It does not hold: the
United States alone accounts for 308 impressions, while **every legacy post and category page
combined totals 187**. Even if every one of those were American, the majority of US impressions
must be on the home page. The hypothesis is disconfirmed, and the "earned position is topic content"
conclusion does not follow from this data.

**The brand name collides with common English phrases.**
Visible queries include `just math`, `justmath`, `just maths`, `its just math`, `just mathematics`,
`just in math`, `just the math`, `only maths`, `math legacy` — 11 queries, 29 impressions, mostly at
positions 1–10. These rank well and convert nothing. *Hypothesis, unconfirmed:* this also explains
the strong foreign positions (South Korea: 129 impressions at avg. position 5.47). The visible 29
impressions cannot by themselves account for 129, and the export cannot cross-tabulate country
against query, so this is plausible and unproven. **Practical effect either way:** the property's
average position is flattered by phrase collisions, and should not be read as commercial traction.

**The site ranks for its own old vocabulary, which the new copy has dropped.**
`coaching` — 5 queries, 10 impressions, positions 5–39; `enrichment` — 3 queries, 4 impressions, and
the *only click in the entire visible table* (`maths enrichment class`, position 7). The legacy
title was "Expert Math Coaching and Programs". The approved copy uses neither word. This is not a
recommendation to reintroduce them — "coaching" and "enrichment" describe a different service from
one-to-one tuition — but it explains what little the domain currently ranks for.

---

## 3. The eleven candidate terms, each with its evidence trace

The list supplied for optimisation was: *Online Math Tuition · Malaysia · Primary · Form 1 · Form 2 ·
Form 3 · Form 4 · Form 5 · Mathematics · Modern Mathematics · Additional Mathematics.*

**Provenance of the list itself:** it is not a fresh brief. The legacy page's Squirrly schema carries
`keywords` = `online math form 1,online math form 2,online math form 3,online modern math form 4,`
`online modern math form 5,online add math form 4,online add math form 5`, and the live H1 is
`Maths Form 1, 2,3.` The list is the incumbent site's existing targeting, restated.

| Term | Visible GSC evidence | Reading | Home |
| --- | --- | --- | --- |
| **Online Math Tuition + Malaysia** | `math tuition in malaysia` 11 impr @ 41.3 · `math tuition` 11 @ 75.1 · `math tuition malaysia` 4 @ 73 · `online maths tuition malaysia` 2 @ 83 · `online maths tutor malaysia` 3 @ 35.3 · `maths tutor malaysia` 1 @ 94 | **Measured.** The head cluster is real and the site surfaces for it — at page 4 and worse. This is the only candidate with direct positive evidence. | **Landing — primary** |
| **Primary** | `primary`/`standard`/`darjah`: 0 visible. But `kids`/`junior`: 8 queries, 17 impr, positions 9.7–43 | **Measured vocabulary correction.** Parents search *kids*, not *primary*. `math classes for kids`, `maths tuition for kids`, `mathematics class for kids`, `junior math classes`. | Landing (secondary); `standard-1-6` blog |
| **Additional Mathematics** | 0 visible (`add math`, `additional`, `matematik` all zero) | **Weak zero — no content ever existed.** The legacy site had almost nothing on Add Maths, so the zero measures absence of *content*, not absence of *demand*. Competitor evidence is strong (Dass Maths, Warna Cemerlang, Home Tuition MY all target it). *Hypothesis: highest-value term after the head cluster.* | Landing (secondary) + own blog cluster |
| **Modern Mathematics** | 0 visible | Weak zero, same reasoning. Malaysia-specific SPM subject name; narrower than Add Maths. | Landing (secondary); `spm` blog |
| **Form 4 · Form 5** | 0 visible | Weak-to-moderate zero. Rarely searched bare; they pair with Add Maths/SPM. | Blog; landing mention only |
| **Form 1 · Form 2 · Form 3** | 0 visible — **and this is the strong zero** | **Strongest directional finding.** The legacy H1 was literally `Maths Form 1, 2,3.` and seven Squirrly keywords targeted `online math form 1–5`. After 16 months of active targeting, not one visible query contains "form". Targeting existed and returned nothing. Contrast with Add Maths, where no content existed to begin with. | **Blog only** (`form-1-3`) |
| **Mathematics** | `mathematics coaching` 3 · `mathematics school` 1 · `school mathematics` 1 — all wrong intent | Too broad and ambiguous. A search for the term surfaces degree portals (Mastersportal, Bachelorsportal). | **Not a target** |
| **Malaysia** (as modifier) | 8 queries, 36 impressions | Works only as a qualifier on a service term, never alone. | Modifier |

**Two vocabulary forks, both unresolved by this data:**

1. **"math" vs "maths".** The visible table contains both (`math tuition` 11 impr, `maths tutor
   malaysia` 1). Legacy site and domain use *math*; approved copy uses *maths* 32 times. The
   approved copy is immutable, so this is settled by policy, not preference — use *maths* in body,
   and let the title carry the brand string, which contains *Math*.
2. **English vs Bahasa Melayu.** `tuisyen`, `matematik`, `tingkatan`, `darjah`: **zero visible
   queries**. This is a *weak* zero — the site is English-only, so it could not have ranked for BM
   terms regardless. It says nothing about BM demand, which competitor evidence suggests is
   substantial (Aster Edu, Dass Maths and Mathspower all run BM pages). **Gated:** CW-82 requires a
   named BM sign-off owner, and none exists on this project. No BM string should be drafted until
   one is named. See §6.

---

## 4. Landing page

**Structural constraint.** The new site is one commercial page plus a blog; `/about/`, `/faq/` and
`/pricing/` all resolve to anchors. One page can carry one tight cluster. It cannot rank separately
for "add maths tuition online" and "primary maths tuition Malaysia" — that would need dedicated
service pages, which the current architecture does not have.

**Primary target:** `online maths tuition Malaysia` (+ *one-to-one* / *1-to-1*).
**Secondary, carried naturally by the approved copy:** Standard 1 to Form 5, Add Maths, SPM, IGCSE,
English/BM.

**Metadata — the only strings this document proposes changing, and they are NOT applied.**
`defaultLandingData.ts:21-23` is unchanged in PR #54 apart from an explanatory comment. Moving from
brand-first to keyword-first is a positioning decision for the client, not plumbing, so it is
proposed here and left for a separate approval. Do not read "post SEO fixed" as "metadata changed".

Current (`web/src/lib/content/defaultLandingData.ts`):
- Title: `Just Math Malaysia | One-to-one online maths tuition` — brand-first, for a brand with 29
  impressions of phrase-collision traffic and no commercial brand demand.
- Description: `One-to-one online maths tuition with Mr Kong for Standard 1 to Form 5 and IGCSE,
  taught in English and Bahasa Melayu.` — **contains no "Malaysia".**

Proposed:

```
Title:  Online Maths Tuition Malaysia | 1-to-1, Standard 1 to Form 5      (60 chars)
Desc:   One-to-one online maths tuition across Malaysia with Mr Kong.
        Standard 1 to Form 5, Add Maths and IGCSE, in English or BM.
        Free 30-minute assessment.                                       (149 chars)
```

Every element traces to the approved copy — "Standard 1 to Form 5 and IGCSE" (hero supporting line),
"across Malaysia" (trust bar), "English or BM" (trust bar), "Free, 30 minutes" (note under hero
button), "Mr Kong" (byline). Both strings were grepped against the `SECTOR-PROFILE.md` Q6 banned
list: zero hits.

**Not proposed: any change to the H1.** `Know exactly where your child's maths stands` carries no
keyword, but it is approved copy and the supporting line directly beneath it carries the terms
anyway. Changing it is a client decision with a poor cost/benefit.

**On the word "tuition".** It appears twice in the approved copy and neither instance describes the
service (`:181` a competitor tuition centre, `:262` a parent's existing tuition). The service is
called *tutor*/*tutoring* — precisely, `tutor` 7, `tutor's` 1, `tutors` 3, `tutoring` 3. The
semantic field is covered and this is a second-order issue. It is **recorded, not recommended**:
asking the client to reopen approved copy for a synonym is the lowest-value item available, and it
should not be raised before the higher-value work below has landed.

---

## 5. Blog

The six existing categories are the right architecture. Every topic below is drawn from an argument
the approved copy already makes, so none requires new client fact-approval.

| Category | Topics | Note |
| --- | --- | --- |
| `standard-1-6` | **Matriks Pembelajaran Tahun 4, 6–8 Oct 2026** | Time-boxed — see below |
| `form-1-3` | Algebraic fractions and the primary gap beneath them; why "always good at maths" students stall in Form 2; the Form 3 stream decision — is Add Maths realistic? | Where the strong zero says organic search is hard; write for the parent, not the SERP |
| `add-maths` | Why Add Maths punishes weak Form 1–3 algebra; chapter guides | Best commercial-adjacent cluster |
| `spm` / `form-4-5` | Technique-and-timing marks; post-SPM maths grade requirements | |
| `igcse` | How IGCSE maths differs from SPM | |

**The Learning Matrix post is time-boxed, and its value is NOT October rankings.** The exam is 6–8
October 2026.

*Assumption, not a recorded decision:* the project owner stated on 2026-09-05 that domain cutover is
expected before early October. **No committed cutover date exists in `docs/DECISIONS.md`.** §38 and
§40 record the *Cloudflare project* cutover (completed 2026-09-01), which is a different thing from
moving `mathematicsmalaysia.com` off WordPress — that has not happened, and until it does the new
site carries `robots.txt: Disallow: /` and a site-wide `X-Robots-Tag: noindex`.

**The dependency, stated plainly:** even on the optimistic assumption, this leaves days-to-weeks of
indexable life before the event, on a domain with ~52 Malaysian impressions a month and no
authority. Write the post because it is the strongest argument the site makes and because it is
re-usable for the Form 3 rollout in 2027 — **not** on any expectation that it ranks this year. If
cutover slips past early October, it is not urgent; it is next year's post, written early. `SECTOR-PROFILE.md` Q5 flags this content as dating policy with no named review
owner; that owner is still unnamed.

**Search Console coverage note.** Every topic above sits in the "weak zero" category — no content
ever existed, so no data exists. These are content decisions justified by the approved copy's own
arguments and by competitor coverage, not by measured demand.

---

## 6. Open items and owners

| Item | Owner | State |
| --- | --- | --- |
| Post/category metadata defects | dev | **Closed** — fixed and verified in this branch |
| Legacy URL inventory and redirect parity | dev | **Closed** — `DECISIONS.md` §10a, 19/19 URLs |
| GA4 `G-6EWT7G0LZS` / GTM `GTM-KP5SMKV` — confirm client-owned and reuse | client | Open — unblocks `DECISIONS.md` §12 |
| WhatsApp `010 658 0242` — retire, forward, or notice | client | Open — only conversion channel |
| BM expansion — name a sign-off owner (CW-82) | client | Open — **gates all BM drafting** |
| Learning Matrix content — name a policy review owner | client | Open |
| 404 page (none exists) | design + copy | Open — `DECISIONS.md` §10a |
| Re-pull Search Console 3 and 6 months post-cutover | Andy | Scheduled — this document's rankings are hypotheses until then |

**Validation step still owed.** Nothing in §3 or §4 has been validated against measured Malaysian
demand, because no dataset capable of that exists yet. The post-cutover re-pull is the step that
converts these from hypotheses into findings, and this document should be revised against it rather
than cited as settled.
