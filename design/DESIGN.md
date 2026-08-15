# DESIGN — Just Math Malaysia

The design-system spec for the landing page, the WhatsApp booking flow, and the monthly progress
report. Structure follows `WEB-DESIGN-CRAFT-STANDARD.md` §G. Companions: `STATES.md` (state matrix),
`COPY-GAPS.md` (copy classification), `ASSETS.md` (assets and licences), `readme.md` (the system's own
narrative reference).

**Route note — corrected 2026-08-11.** This package was authored on the belief that the project was
greenfield. **That was wrong: a predecessor site exists at `mathematicsmalaysia.com`** (WordPress /
Bricks), carrying a live logo. The Revamp route was therefore closer to correct than the
New-Website route this package later assumed.

What follows from that, stated plainly:

- **A Stage 0R site audit was never run.** The predecessor was discovered only after the package was
  written, and its homepage is bot-gated from some networks. What has been verified is narrow: the
  logo asset, the page title, and the platform. Capture inventory, copy inventory, diagnostic gate
  scores, equity inventory and continuity constraints (redirects, SEO landmarks, integrations) **do
  not exist**.
- **`MARKET-SCAN.md` has no Exhibit A.** The client's own site was never scored against the category
  conventions it scores competitors on.
- **Brand equity is real and unaudited.** See `ASSETS.md` §1.

The directions stage was also never run — see the CS-03 note in §11.

---

## 1. Brand personality & register

**Register: brand** — design is the product here; there is no application UI.

A serious independent practitioner. Calm, exact, plain. The site should read closer to a careful
accountant's or an architect's practice than to a school or an edtech startup.

The audience is **parents**, not children. This matters more than any other single fact: the entire
category (bright rounded sans, cartoon mascots, "unlock your potential") markets to children, and
this brand deliberately does not. "Just" carries three meanings at once and the design should know
it — *only* maths, *exactly* right, and *simply, don't panic*.

**Explicitly rejected registers:** edtech SaaS (gradient hero, floating dashboard, abstract 3D,
platform language) and tuition centre (primary colours, mascots, clip-art pencils and graduation
caps, exclamation marks, smiling stock children, achievement language).

## 2. Colour tokens

Monochrome first. Every value below is **derived** — no brand kit existed. Roles per CS-30:

**Dominant — ink.** Carries all text and every structural rule.

| Token | Value | Role |
| --- | --- | --- |
| Ink 900 | `#14161a` | Primary text, the mark, ink section grounds |
| Ink 700 | `#2c3037` | Body text |
| Ink 500 | `#5b626c` | Muted text (`--text-muted`) |
| **Ink 450** | **`#666d77`** | **Faint text floor (`--text-faint`) — lightest ink that clears 4.5:1 on both paper grounds** |
| Ink 400 → 200 | `#7b828c` → `#c9ccd2` | **Non-text only** — rules, bar fills, dividers |

**Ground — paper.** Warm off-white; two grounds per page maximum, alternating by section.

| Token | Value | Role |
| --- | --- | --- |
| Paper | `#fbfaf7` | Page ground |
| Paper 2 | `#f3f0e9` | Sunken/alternating section ground |
| Rule | `#e3dfd6` | Hairline — hairlines do the dividing, not shadows |

**Accent 1 — slate blue.** Links, focus rings, calm emphasis. `--slate-600 #2b4468`.

**Accent 2 — ochre.** Has a stated, separate job: *measurement and attention* — the unmeasured
stretch in the gap chart, level age bands, the exceptional pricing row, "needs practice" in reports.
Never used for links or general emphasis, so it never competes with slate.

| Token | Value | Role |
| --- | --- | --- |
| Ochre 600 | `#8f6114` | **Text value** — AA on paper (5.17:1), paper-2 (4.75:1) and ochre-100 (4.68:1) |
| Ochre 500 | `#b47b22` | **Non-text only** — rules, brackets, chart fills |
| Ochre 100 | `#f6eedd` | Attention row tint |

**Reserved — WhatsApp green.** `--wa-green #25d366` is the brand value; buttons fill with
`--wa-green-btn #0e7a3e` (hover `#0a6432`) so white label text clears 4.5:1 at 17px.

> **Green appears only on a control that opens WhatsApp.** Never a heading, badge, link, chart or
> hover state. If green is on the screen, tapping it opens WhatsApp — a promise the design keeps.

**Colour-world trace (CS-33).** The palette is not "warm because the brief felt warm". Ink on warm
paper is the materiality of the product itself: a written progress report on paper, worked examples
in an exercise book, a marked script. Green is not chosen at all — it is inherited from WhatsApp,
which *is* the booking system, so the design builds around it rather than fighting it.

**The text/non-text split is enforced.** Any ramp value lighter than the text floor is a non-text
value. Using `--ink-400` or `--ochre-500` as text reintroduces measured AA failures.

## 3. Type system

Serif states, sans explains, mono counts. Full argument per CS-20.

| Role | Family | Size / leading | Notes |
| --- | --- | --- | --- |
| Display | IBM Plex Serif SemiBold | 58px / 1.06 | −0.02em tracking |
| H1 / H2 / H3 | IBM Plex Serif SemiBold | 46 / 36 / 23px | |
| Lead | IBM Plex Sans Regular | 19px / 1.5 | `--text-muted` |
| Body | IBM Plex Sans Regular | 17px / 1.65 | **max 64ch** |
| Small | IBM Plex Sans | 14px / 1.5 | |
| Label / eyebrow | IBM Plex Sans SemiBold | 12px, 0.06em, uppercase | |
| **Chart annotation** | IBM Plex Mono | **11px (`--size-3xs`)** | **Data-viz only** — never body, control or form text |
| Figures | IBM Plex Mono Medium, tabular | contextual | Every fee, mark, phone number |

**Why these families.** A serif carries the "serious practitioner" register the brief asks for and is
the single clearest departure from a category that runs on rounded sans. Plex Serif specifically:
real weight with squared, barely-rounded terminals — it reads considered rather than decorative, and
it is licence-clean. The sans is its own sibling, so the pairing contrasts on the serif/sans axis
rather than on two similar sans faces. Mono is not a style choice: a maths tutor's numbers must align
in columns, so figures are tabular by default. **All three are substitutions** — see `ASSETS.md` §3.

**Locale.** EN + BM only, both Latin. No CJK fallback needed. Malay orthography is fully covered.

**Scale hierarchy (CS-21).** Display 58px against body 17px = **3.4×**, comfortably past the 2.5×
floor. Distinct roles: display, heading, lead, body, small, label, numeral — seven, against a
minimum of three. Body measure 64ch, inside the 45–75ch band.

## 4. Grid & layout

| Property | Value |
| --- | --- |
| Page container | **1120px** max width — inside the locked 1200px cap, no exception requested |
| Gutter | 24px (20px at mobile) |
| Section rhythm | 96px default, 64px tight, 129.6px fluid at desktop |
| Document column (reports) | 720px |
| Desktop breakpoint | 860px (`useDesktop`) |
| Reference widths | 390 · 768 · 1440, all verified |
| Radii | 3px badges · 5px controls · 6px cards · 0 on rules and tables · circles only for avatars |
| Elevation | 3 levels — `--shadow-1` resting, `--shadow-lift` hover on clickable cards only, `--shadow-2` under the sticky header. No shadow on static content. |

Full-bleed section backgrounds are permitted; inner content always aligns to the 1120px container.
Measured at 1440: every container is exactly 1120px, header included.

**Transparency:** exactly one use — the sticky header at 92% paper with a 10px backdrop blur.

## 5. Component inventory

States live in `STATES.md`. This is the inventory.

| Group | Components |
| --- | --- |
| Brand | `Logo`, `WhatsAppGlyph` |
| Core | `Button` (primary/secondary/quiet/ghost), `WhatsAppButton`, `Card`, `Badge`, `Callout` |
| Forms | `Field`, `Input`, `Select`, `Checkbox`, `RadioGroup` |
| Content | `SectionHeading`, `Stat`, `Testimonial`, `ProgressMeter`, `ScoreTable` |
| Feedback | `Accordion` |
| Navigation | `SiteHeader`, `SiteFooter` |
| Page-level (landing kit) | `Spine`, `GapChart`, `Marker`, `Eyebrow`, `Cta`, `GraphGround`, `Reveal` |
| Blog kit | `PostRow`, `CategoryRail`, `Pagination`, `Meta`, `Prose`, `TeX`, `Formula`, `Working`, `CommonMistake` |

**Intentional additions.** `WhatsAppButton` and `WhatsAppGlyph` exist to make the reserved-green rule
enforceable in code rather than by convention. `ProgressMeter` and `ScoreTable` exist because the
monthly report is a first-class product surface. `Accordion` exists for the 13-item FAQ.

**`Testimonial` is built but deliberately unused on the landing page** — there is no testimonials
section and no gap where one belongs.

## 6. Motion principles

| Motion | Duration | Purpose (CS-50) |
| --- | --- | --- |
| Hover / press | 120ms | **State** |
| Shadow / focus | 180ms | **State** |
| Reveal `rise` — 14px rise + fade, once | 640ms, 80–90ms stagger | **Hierarchy** — prose and headings; establishes reading order on arrival |
| Reveal `settle` — fade only, no travel | 780ms | **Rhythm** — the three full-bleed ink bands are compression moments, not sequence, so they settle in place instead of rising |
| Reveal `still` — no wrapper motion, always visible | — | **Deference** — containers whose own contents carry the motion (the gap chart) |
| Gap-chart bars growing from the baseline | 720ms, 34ms stagger | **Causality** — the bars *are* the argument being drawn |
| Accordion to measured height, plus→minus | 240ms | **State** |
| Card lift + hairline ink + index-chip invert | 120ms | **State** — signals clickability |

One curve: `cubic-bezier(.2,.6,.3,1)`. Fades and short distances only — no bounce, spring, scale-up
or parallax. **Every duration collapses to 0 under `prefers-reduced-motion`.**

**A reveal may only enhance content that is already visible.** Production HTML ships visible; the
hidden state is added by script after boot. `window.revealAll()` and a `beforeprint` flush guarantee
nothing can stay invisible in print, headless capture, or an assistive jump.

**Reveal variants are assigned by what a section does, never applied uniformly.** Measured in the
browser: 640ms `rise` on 41 prose blocks, 780ms `settle` on the 6 ink-band elements, 240ms on
accordion and hover state. The gap-chart wrapper renders at `opacity: 1` before any reveal fires.

## 7. Imagery & art direction

There is **one photograph on the entire site** — Mr Kong, 4:5, in About, and nowhere else. It does
not exist yet (`ASSETS.md` §2). Everywhere else, typography, spacing and restraint carry the page.

No photography, illustration, patterns, textures or gradients anywhere else. Where a competitor puts
a hero image, this brand puts a real artefact: a lesson note, a report card, a measured chart. If a
section feels empty the answer is better typographic hierarchy, never a placeholder image.

**Icon family:** Lucide at 1.5px stroke, ink only, 20–26px, never coloured, never badged, never
decorative — plus the official WhatsApp glyph inside WhatsApp controls only. One family, declared.

**Proof devices (CS-41):** specific verifiable numbers (24 years, 10 online, 500+ students, RM fees),
the real monthly report artefact, and the free assessment itself. No icon-grid "features" band, no
badges, no fabricated awards or logos.

## 8. Section inventory

Ten sections. Layout family per CS-11; no family appears more than twice.

| # | Section | Layout family | Ground | Rhythm role |
| --- | --- | --- | --- | --- |
| 1 | Hero | Left-anchored type + ruled spine | Paper | Opening statement |
| 2 | Trust bar | Ink band, 4 figures | **Ink** | Compression — first density shift |
| 3 | Problem | Prose + full-width data panel | Paper | The argument, drawn |
| 4 | Sessions | Numbered prose blocks | Paper 2 | Steady exposition |
| 5 | Levels | Full-width rows, sticky left column | Paper | Contents-page scan |
| 6 | About | Portrait + prose, ink stat panel inside | Paper 2 | The person; second density shift |
| 7 | Pricing | Data table | Paper | Densest object |
| 8 | How it works | Numbered steps | Paper 2 | Sequence |
| 9 | FAQ | Ruled accordion | Paper | Long tail |
| 10 | Close | Ink band, centred | **Ink** | Final compression |

### Blog templates (added 2026-08-12)

| Template | Layout family | Note |
| --- | --- | --- |
| Blog archive `/blog` | Ruled full-width rows + category rail | **Not a card grid** — the same decision the Levels section makes, and for the same reason: this brand has no imagery, so cards would be empty boxes with a title in them |
| Blog post `/blog/:slug` | Single 64ch measure column | Long-form prose, display formulas, the line-by-line `Working` block, one closing CTA |
| Category archive `/blog/level/:slug` | Same as archive, filtered | Categories are the **syllabus levels**, not invented topics |

**Maths.** Rendered with **KaTeX**. In production this must run at **build time** (remark-math +
rehype-katex, or a Portable Text serializer), so pages ship as static HTML with no client-side maths
JS — it matters for SEO and for a parent on a slow connection. `trust: false` and `strict` stay on:
the TeX source will be editor-authored, and those settings are what stop it emitting raw HTML.

**`Working` is the brand's differentiator made into a component.** The approved copy promises
*"Working is shown line by line"*; the component numbers each step and pairs it with the plain-language
reason — the part a textbook leaves out and a tutor says aloud.

Distinct families: type+spine, ink stat band, prose+data panel, numbered prose, full-width rows,
portrait+prose, table, numbered steps, accordion, centred ink close — **ten sections, ≥4 distinct
families, none more than twice.** No icon-card grid anywhere.

**Rhythm (CS-12):** three distinct section paddings measured at 1440 (129.6 / 100.8 / 64px), plus
three full-bleed ink bands against alternating paper grounds. **Alignment tension (CS-14):** hero
(left-anchored), levels (sticky-left/right-wide) and about (portrait/prose asymmetry) are all
non-centred — three sections, against a minimum of two.

## 9. Specificity inventory (CS-70)

Elements that could not be lifted onto a competitor's site unchanged:

1. **The gap chart.** Eleven Malaysian school years as a ruled scale with exactly three inked
   measurement points (Standard 4, Form 3, SPM) and an ochre bracket over Form 4–5. It encodes this
   tutor's specific argument about *when* maths is independently measured.
2. **The Learning Matrix dates.** "6 to 8 October", Year 4 from October 2026, Form 3 from 2027 —
   current Malaysian assessment policy, wrong for any other market and stale if policy changes.
3. **The IGCSE pricing row.** 90 minutes against everyone else's 60, with the stated reason that the
   international syllabus outruns an hour a week. A real operational decision, visible in the table.
4. **The 500-number panel.** The About section argues the student count is *small on purpose* —
   the inverse of the category's "500+ happy students" boast.
5. **The availability windows.** 3pm–6pm and 8pm–11pm weekdays, with the evening block explained by
   upper-secondary students not being free until after dinner, and afternoon-session schools called
   out as a genuine constraint.
6. **First-person singular throughout.** "I'll send the whiteboard link." One tutor writing to one
   parent — structurally impossible for a centre with staff.

**Swap test:** replace the logo and hand this page to a tuition centre and it collapses — the pricing
table has no per-teacher variation, the About section is one named person, the entire argument is
that one tutor sees patterns across all eleven years.

## 10. Differentiation fingerprint (CS-71)

| Field | Value |
| --- | --- |
| Composition system | Ruled measurement scale — hairline grid ground, sectional markers, contents-page rows |
| Hero pattern | Left-anchored serif display + inked eleven-year spine; single CTA, no image |
| Section rhythm | Paper/paper-2 alternation punctuated by three full-bleed ink compression bands |
| Palette logic | Monochrome ink-on-warm-paper, one reserved functional green, ochre confined to measurement |
| Type pairing | Serif display + sans body + tabular mono figures (one superfamily, three roles) |
| Aesthetic skill | `none` — no aesthetic skill drove execution |

**Ledger check.** `Setup_Instructions/Guidelines/Web-Design/DESIGN-FINGERPRINTS.md` (moved from
`Projects/Guidelines/` on 2026-08-11) exists and currently contains **no
rows**, so there is no prior package to collide with and the CS-71 comparison passes trivially. Per
the append-timing rule, this package's row is appended **only after** review approval — not now.

## 11. Craft-gate self-check

Andy never marks his own findings resolved. Two gates fail and need a decision.

| Gate | Verdict | Evidence |
| --- | --- | --- |
| CS-01 Sector established | **Pass** | `BRAND-INTAKE.md` + `SECTOR-PROFILE.md` sector lock — four fields recorded |
| CS-02 Market scan integrity | **Pass** | `MARKET-SCAN.md` — 5 real sites, each fetched live 2026-08-10, with quoted phrases; conventions synthesis + named slop trap |
| CS-03 Directions trace | **Not applicable — recorded** | No directions stage was run; the package was authored directly. See note below |
| CS-04 Profile completeness | **Pass** | `SECTOR-PROFILE.md` — all six questions answered, every answer source-tagged, 7 derived discovery questions |
| CS-10 Hero fingerprint | **Pass** | Left-anchored (not centred), multi-line lead, **one** button, no gradient — 0 of 4 tells |
| CS-11 Skeleton variety | **Pass** | §8 — 10 sections, ≥4 families, none >2, no icon-card grid |
| CS-12 Rhythm variance | **Pass** | 3 distinct paddings measured; 3 ink compression bands |
| CS-13 Nesting depth ≤2 | **Pass** | Measured max card depth = **1** |
| CS-14 Alignment tension | **Pass** | 3 non-centred sections |
| CS-15 Grid declaration | **Pass** | §4; measured 1120px containers at 1440 |
| **CS-16 Kicker density** | **Fail — recorded owner override** | 8 of 10 sections carry a kicker (80%; cap is 33%), 7 numbered `01`–`07`. Override approved by the project owner, 2026-08-10 — see below |
| CS-20 Typeface argument | **Pass** | §3 — non-default families, argued; substitution flagged |
| CS-21 Scale hierarchy | **Pass** | 3.4× display:body; 7 roles; 64ch measure |
| CS-30 Palette role logic | **Pass** | §2 — dominant/ground/2 accents each with a distinct job |
| CS-31 Gradient motivation | **Pass** | No decorative gradients; the hairline graph ground traces to the measurement motif; no gradient text |
| CS-32 Radius & shadow | **Pass** | 3 radii + pill; 3 elevations; **coloured side-stripes: 0** (fixed) |
| CS-33 Colour-world trace | **Pass** | §2 — traced to report/exercise-book materiality and to WhatsApp |
| CS-40 Art-direction map | **Pass** | `ASSETS.md` §2 — one slot, one entry, no slot-filler stock |
| CS-41 Proof-device fit | **Pass** | §7 — verifiable numbers + the real report artefact; no icon grid |
| CS-42 Illustration & icon | **Pass** | One declared family (Lucide) + official WhatsApp glyph; no illustration; no emoji |
| CS-43 No fake interfaces | **Pass** | Landing page depicts no UI; the booking mockup is internal (`ASSETS.md` §6) |
| CS-50 Motion purpose map | **Pass — fixed 2026-08-10** | Three reveal variants assigned by section role; measured 640/780/240ms in use; chart wrapper static. Was a uniform fade-up |
| CS-60 Cliché ban | **Pass** | Grep over all 38 derived strings — **0 hits** |
| CS-61 Heading rhythm | **Pass** | No template exceeds half: mixed imperative, question, and declarative forms |
| CS-70 Specificity + swap test | **Pass (self)** | §9 — 6 items; Bob runs the adversarial test |
| CS-71 Fingerprint | **Pass** | §10 — ledger empty, no collision; row appended post-approval |

### CS-03 — no directions stage

Recorded rather than claimed. Three distinct directions were never produced as before/after or
side-by-side comps; the package was authored straight through from the brief. The market scan now
exists and §5 of it records what the design inherits and rejects from each named competitor, which
is the *substance* CS-03 asks for — but it is a retrofit, not a directions stage, and Bob should
treat it as such.

**If a directions stage is required for approval, it has to be run** — that is a scoped piece of
work, not a documentation fix.

### CS-16 — the numbered kickers

Measured: kickers on **8 of 10 sections**, seven of them numbered `01`–`07`. The cap is one third.
The gate allows an exception where the approved direction documents kickers as a deliberate,
consistently executed system — but **no directions stage was ever run**, so that exception cannot
honestly be claimed.

There is a real argument for keeping them: this is a *measurement* brand, the numbering is the same
device as the ruled spine and the chart axis, and the sections do read as an ordered argument. That
argument is plausible, but it is a decision for the project owner and Bob, not for me.

**Decision — override recorded.**

| Field | Value |
| --- | --- |
| Gate | CS-16 · kicker & meta-label density |
| Measured | Kickers on 8 of 10 sections (cap: one third); 7 numbered `01`–`07` |
| Decision | **Override — keep the numbered kickers as a named system** |
| Approver | Charlie (project owner) |
| Date | 2026-08-10 |

**Grounds.** The numbering is not eyebrow scaffolding reached for because landing pages have
eyebrows. It is the same device as the ruled hero spine, the gap chart's axis, and the contents-page
level rows: this is a brand about *measurement*, and the section markers are one instance of the
single motif the whole page is built from. They are executed consistently — one `Marker` component,
one rule weight, one ordinal format — across every section that carries one.

The gate's exception normally requires an approved direction to document the system. No directions
stage was run here, so this override stands in its place and is recorded rather than assumed.

**Known weakness, stated plainly:** the sections form a narrative argument, not a numbered
*sequence* in the sense CS-16 has in mind (steps, stages, an ordered process). The How-it-works
steps are the only genuine sequence on the page. Bob may reasonably challenge this on that basis;
the override is the project owner's call, not a claim that the gate passes.

**Rejected alternatives:** dropping the numbers while keeping word kickers (loses the motif and
still leaves kickers on 80% of sections); cutting to three sections (breaks the consistency that
makes it a system rather than decoration).

### CS-50 — fixed, not overridden

**Was:** every block entered with the same 14px rise and fade at 640ms — the single uniform default
the gate names as a failure.

**Now:** three variants, assigned by what a section does, in `REVEAL_VARIANTS`:

| Variant | Motion | Applied to | Purpose |
| --- | --- | --- | --- |
| `rise` | 14px rise + fade, 640ms | Prose, headings, lists (41 blocks) | Hierarchy — reading order |
| `settle` | Fade only, no travel, 780ms | The three full-bleed ink bands (6 elements) | Rhythm — compression moments arrive, they don't march in |
| `still` | None; always visible | The gap-chart wrapper | Deference — the bars growing from the baseline are the motion |

The reveal now reinforces the section rhythm in §8 instead of flattening it, and the chart's own
causality motion no longer competes with a wrapper fade. Verified in-browser: durations 640 / 780 /
240ms all in use; chart wrapper at `opacity: 1` before any reveal fires; 0 elements stuck invisible
after a flush.

---

**CS-16 is an owner-recorded override; CS-50 was fixed.** Neither affects the six
craft/accessibility fixes verified on 2026-08-10, which are independent.
