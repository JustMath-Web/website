# STATES — component / state matrix

The development guideline refuses to invent missing states, so this file is the authority: if a
state is not defined here, it does not exist and must be raised rather than improvised.

Every entry below was read from the component source or measured in the browser — nothing is
aspirational.

## 0. Global rules

| Rule | Value | Where |
| --- | --- | --- |
| Focus (all focusables) | `outline: 2px solid var(--focus-ring)` at `outline-offset: 2px` | `tokens/base.css` — `:focus-visible` |
| Focus is never removed | **No shipping `outline: none` focus suppression** — no focus-removing `outline` declaration in any component or in `_ds_bundle.js` | **grep for the declaration form `outline: "none"` run 2026-08-11: 0 in sources, 0 in `_ds_bundle.js`.** The literal string still appears in code comments and in the correction note below, which is prose, not a declaration |
| Disabled | `opacity: .42`, `cursor: not-allowed`, `aria-disabled`, **no colour change** | `Button.jsx` |
| Press | `translateY(1px)`, 120ms | `Button`, `WhatsAppButton` |
| Hover | darkens ink or tints paper — never lightens, scales or glows | brand rule, `readme.md` |
| Tap target | ≥44×44px on any surface a parent touches; 36px only for secondary desktop controls | `--control-h` = 44px — see §2.6 for the width clarification |
| Reduced motion | every duration collapses to 0 | `tokens/motion.css` media query |
| Transition | `var(--transition-control)` — background, colour, border, shadow | `tokens/motion.css` |

**Reduced-motion caveat:** because `motion.css` redefines `--dur-1…4` to `0ms` inside the media
query, the transition tokens keep working and simply resolve to zero duration. Do not "fix" this by
removing transitions.

### Correction — the focus claim was false when first written (Bob P1, fixed 2026-08-10)

This table previously read *"No `outline: none` anywhere in the package — verified by grep"*. **That
grep was never run, and the claim was untrue.** `Input.jsx` and `Select.jsx` both carried
`outline: "none"`, and the `Checkbox` invalid state set `outline` in a ternary whose default branch
was `"none"` — which overwrote the global `:focus-visible` outline and could make keyboard focus on a
valid checkbox disappear entirely.

**Fixed:** all three now rely on the global outline. The slate ring on `Input`/`Select` is an
*enhancement layered on top of* focus, never a replacement — `box-shadow` is dropped in forced-colors
mode, where the outline is the only thing that survives. The `Checkbox` invalid ring is now a
`box-shadow`, so it cannot collide with focus.

The row above now states a grep that was actually executed, with its result.

**Precision, per review:** the claim is scoped to the *declaration*, not the string. `outline: none`
still appears as literal text in code comments and in this note. What does not appear anywhere is a
declaration that suppresses focus. Wording this loosely is how the original false claim happened —
"no `outline: none` anywhere" was broader than anything that had been measured, and it read as true
until someone grepped. State the measurement, not the impression of it.

## 0.1 Production contract — page landmarks (Bob P2)

The kits are prototypes rendered into a single `<div id="root">`, so they do not carry page
landmarks. **The production build must**, and these are requirements, not suggestions:

| Requirement | Detail |
| --- | --- |
| `<main>` | Exactly one, wrapping everything between the site header and footer. The prototype's `<Section>` stack goes inside it |
| Skip link | First focusable element in the DOM: "Skip to content" → `#main`, visually hidden until focused, then rendered as a normal focusable control against the paper ground |
| `<header>` / `<footer>` | Already semantic in `SiteHeader` / `SiteFooter`; keep them as page landmarks, not `<div>`s |
| Heading order | One `<h1>` (the hero), no skipped levels — the prototype already measures `H1,H2,H2,H3…` with no gaps; preserve it |
| Section labelling | Each `<section>` with an `id` takes `aria-labelledby` pointing at its own heading, so the landmark list is navigable |
| `lang` | `<html lang="en">`; any Bahasa Melayu passage inside gets `lang="ms"` on its element |

The skip link is the one landmark item a developer cannot infer from the prototype, because the
prototype has nothing to skip past.

## 0.2 Development contract — semantics the design decides, not the developer

`Web-Development/WEB-DEV-CRAFT-STANDARD.md` §A makes semantic structure a hard gate. Semantics
follow from **what a thing means**, which is a design decision — so they are answered here rather
than left for the build. Everything else in that standard (layout method, architecture, framework,
dependencies, code quality) is engineering and correctly stays out of the design package.

### FE-02 — every `<section>` needs an accessible name

Measured on the prototype: **three sections carry no heading**, because the design deliberately uses
a kicker instead of a visible `<h2>` there. Resolution, so no one has to invent copy:

| Section | Resolution |
| --- | --- |
| **Levels** | `aria-labelledby` → the existing **"Levels taught"** kicker. No new copy |
| **FAQ** | `aria-labelledby` → the existing **"Questions"** kicker. No new copy |
| **Trust bar** (the ink band after the hero) | Has no kicker and no heading — it is four figures. Use `aria-label="Teaching experience"`. **This is the only new string**, logged in `COPY-GAPS.md` §2f |

Give each kicker an `id` and point `aria-labelledby` at it. Do **not** add visible headings to these
three — the absence is deliberate, and a heading would change the design's rhythm.

### FE-04 — repeated siblings are lists

These render as lists in production regardless of their visual treatment:

| Content | Element | Note |
| --- | --- | --- |
| Four trust figures | `<ul>` | Unordered |
| Four level blocks | `<ul>` | Unordered — Standard 1–6 … IGCSE is a range, not a sequence |
| **Four "how it works" steps** | **`<ol>`** | **Ordered** — this is a real sequence and the only one on the page |
| Thirteen FAQ items | `<ul>` | Unordered |
| "Every month includes" bullets | `<ul>` | Already a list |
| Pricing rows | `<table>` | Already a real table — keep it |

### FE-05 — links navigate, buttons act

Already correct in the prototype; preserve it:

- **Five CTAs → `<a href="https://wa.me/…">`.** They change the destination, so they are links, never buttons.
- **Header phone → `<a href="tel:…">`.**
- **Thirteen FAQ toggles → `<button type="button">`.** They act on the page.

### FE-06 / FE-07 — already satisfied

One `<h1>` (the hero), heading order `H1,H2,H2,H3…` with no skipped levels, verified in-browser.
Landmarks are specified in §0.1 above.

### FE-33 — the framework consequence already recorded

Astro is the page framework with React only for islands, so the reveal contract in §4 is not
optional: server-rendered HTML ships visible, and the hidden state is added by script after boot.

## 1. Matrix

`✓` implemented · `—` N/A with reason · `!` **missing, must be designed before build**

| Component | Hover | Focus | Active/Press | Disabled | Loading | Error | Success | Empty | Selected/Open |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Button** | ✓ ink-900→ink-700 (primary); paper-2 tint (secondary/quiet); underline (ghost) | ✓ global | ✓ 1px down | ✓ .42 opacity | ✓ `loading` — see §2.1 | — not a form control | — | — | — |
| **WhatsAppButton** | ✓ `--wa-green-btn`→`--wa-green-press` + lift 1px + shadow | ✓ global | ✓ 1px down | — never disabled: it is a link to WhatsApp, always available | — navigates away, no async state | — | — | — | — |
| **Card** | ✓ `--shadow-lift` + hairline inks, **clickable cards only** | ✓ global when interactive | — | — | — | — | — | — | — |
| **Accordion** | ✓ hairline inks | ✓ global | — | — | — | — | — | — | ✓ `aria-expanded` + **`aria-controls`** → panel `id`; panel is `role="region"` + `aria-labelledby`, and **`inert` when closed** so a collapsed answer is neither focusable nor read out; measured-height open, plus→minus rotation |
| **Input** | — pointer hover carries no meaning on a text field | ✓ global + 3px slate ring | — | ✓ .42 opacity, `disabled` | — | ✓ `invalid` + `aria-invalid`, danger border | ✓ via `Field success` | — placeholder only | — |
| **Select** | — | ✓ global + 3px slate ring | — | ✓ .42 opacity, `disabled` | — | ✓ `invalid` + `aria-invalid` | ✓ via `Field success` | — | ✓ native |
| **Checkbox** | — | ✓ global | — | ✓ .42 opacity | — | ✓ `invalid` / `error` — 2px danger **box-shadow ring** (never `outline`) + message | ✓ via `Field success` | — | ✓ `checked` |
| **RadioGroup** | — | ✓ global | — | ✓ group `disabled`, **and per-option `disabled`** | — | ✓ `invalid` — danger border on unselected options | ✓ via `Field success` | — | ✓ `checked` |
| **Field** (label + help + error wrapper) | — | — wrapper, not focusable | — | — | — | ✓ `error` — danger + ✕ + `role="alert"` | ✓ `success` — **slate** + ✓ + `role="status"` | — | — |
| **SiteHeader** | ✓ nav link ink darkens | ✓ global | — | — | — | — | — | — | ✓ active nav = 2px ink underline, never a pill or fill |
| **SiteFooter** | ✓ link underline thickens | ✓ global | — | — | — | — | — | — | — |
| **Logo / WhatsAppGlyph** | — decorative/brand marks | — | — | — | — | — | — | — | — |
| **Badge · Callout · Stat · SectionHeading · Testimonial** | — static content | — | — | — | — | — | — | — | — |
| **ProgressMeter** | — | — | — | — | — | — | — | ✓ `level="none"` — dashed empty track, "Not assessed yet" | — |
| **ScoreTable** | — | — | — | — | — | — | — | ✓ `rows=[]` — stated line, not a blank body | — |

## 2. The four gaps — closed 2026-08-10

All previously-`!` cells are implemented in source **and** in `_ds_bundle.js`, and verified by
rendering them on a bundle-driven surface. Design decisions worth knowing:

### 2.1 Button loading

`loading` sets `aria-busy="true"`, disables the control, and switches the cursor to `progress` at
60% opacity. **The visible label does not change**, so the control cannot change width and the
layout cannot jump. The state is announced through a visually-hidden `role="status"` carrying
`loadingLabel` (default "Working…").

**No spinner.** A rotating element would be the only spin in a brand whose motion vocabulary is
fades and short distances; the announcement plus the dim carries the state instead.

### 2.2 Disabled on Input / Select / RadioGroup

All now match the global rule: **42% opacity, no colour change**, `cursor: not-allowed`, and the
native `disabled` attribute so the control is genuinely inert, not just styled. `RadioGroup` also
supports **per-option** `disabled` — a single slot can be unavailable without switching off the
group, which is the real case here ("Afternoon 3pm–6pm — full this term").

### 2.3 Error and success

- **Error** — `Field` renders danger colour, a `✕` glyph and `role="alert"`. `Input`/`Select` take
  `invalid` (danger border + `aria-invalid`). `Checkbox` takes `invalid`/`error`: because a native
  checkbox will not take a border colour reliably, it is ringed with a **2px danger `box-shadow`**
  and captioned. **Not an `outline`** — `outline` is reserved for `:focus-visible`, and using it here
  is exactly the bug that made checkbox focus disappear (see the correction note in §0).
  `RadioGroup` takes `invalid`.
- **Success — deliberately SLATE, never green.** This is the one place the brand's reserved-green
  rule collides with convention: a green "looks good" message would break the promise that *green
  means this opens WhatsApp*. Success uses `--slate-600` plus a `✓` glyph, so it is never carried by
  colour alone. Precedence in `Field`: **error > success > hint**.

### 2.4 Empty states for the report components

- `ProgressMeter` with `level="none"` renders a **dashed empty track** and "Not assessed yet",
  rather than a zero-length bar — zero would read as *assessed, and bad*, instead of *no reading
  taken*.
- `ScoreTable` with `rows=[]` renders a stated line ("No marks recorded yet — this month sets the
  baseline.") instead of an empty `<tbody>`, which reads as a rendering fault.

Both are the **first report of every new student**, not edge cases.

### 2.5 Known and accepted: disabled text contrast

Measured on the proof render: disabled option text falls to **2.71:1**, and a disabled option's
explanatory note to **1.88:1**, because the brand's disabled rule is a flat 42% opacity.

**This is not a WCAG failure** — SC 1.4.3 exempts text that is part of an inactive user-interface
component. It is recorded here so it is not "fixed" by accident and not re-raised as a defect.

**But it is a real legibility question**, and it is the owner's call: when a disabled option carries
the *reason* it is unavailable ("Full this term"), that reason is the one thing the parent most needs
to read. **Recommendation:** render a disabled option's `note` outside the dimmed wrapper at
`--text-muted`, so the control dims but its explanation stays readable. Not implemented — it changes
the "disabled dims uniformly" visual logic, which is a brand decision rather than a bug fix.

### 2.6 Tap-target rule clarified: 44×44, not 44 tall (Bob P2, closed 2026-08-14)

The global rule (§0) reads "≥44px" without saying which dimension. Two inline text links were built
to that ambiguity: `--control-h` (height) was satisfied but width was left to the text, and Bob
measured the header **"Blog"** link at 36.6×44 and the post breadcrumb **"Notes"** at 36×44.

**Resolved in favour of the stricter reading: 44×44, not 44 tall.** The rule already exists to exceed
the WCAG 2.5.8 floor (24px, which has its own exemption for links inline in a sentence) — carving a
second, quieter exemption for short text links would undo the reason the stricter rule exists at all.
No exception was recorded; the links were fixed instead.

**Fix:** `minWidth: 44` + `justifyContent: "center"`, with a matching negative `margin` (inline for
row-flex controls, block for the breadcrumb — already established in §2.5's sibling fix) so the
enlarged hit area folds back into the surrounding whitespace instead of shifting neighbouring
elements. Applied to:

- Header **"Blog"** link (`LandingShell.jsx`, `PageHeader`) — now 44×44 at both 390px and 1200px;
  `WhatsAppButton` (44 height already, natural width 169.6px) unaffected.
- Post breadcrumb **"Notes"** (`BlogPages.jsx`, `BlogPost`) — now 44×44. The category crumb
  (`Form 4–5` etc.) already exceeded 44px naturally, so `minWidth` has no visible effect there — it
  is future-proofing for any shorter category name.

**Verified in-browser**, not asserted: both links measured 44×44 at 390 and 1200; `scrollWidth ===
clientWidth` on both the landing and post pages (no overflow introduced); screenshot confirms the
breadcrumb still reads as one tight line — the enlarged hit box is invisible, only the tap area grew.

Patched in source and spliced into `_ds_bundle.js` (`PageHeader` only — `BlogPages.jsx` was never in
the bundle to begin with; grep-verified rather than assumed from an earlier status note that implied
otherwise).

## 3. Deliberate non-states

Recorded so nobody "fixes" them later:

- **The WhatsApp button is never disabled and never loads.** It is an outbound link. Giving it a
  pending state would imply the site is doing something it is not.
- **No hover on text inputs.** Hover on a field communicates nothing; focus does the work.
- **No hover state on static content components.** Hover means "this is clickable" in this system,
  so applying it decoratively would break that promise.
- **Active nav is an underline, never a pill or colour fill** — a filled nav item would read as a
  button, and the only filled control in this brand opens WhatsApp.

## 4. Scroll and sticky behaviour

| Element | Behaviour |
| --- | --- |
| Site header | Sticky at top, 62px min-height, `rgba(paper,.92)` + 10px backdrop blur — the single permitted use of transparency |
| About portrait | Sticky within its column at desktop only |
| Level blocks | Sticky left column (range + age band) at desktop; static at mobile |
| Section reveals | 14px rise + fade, once, on first scroll-in; **content is visible by default and must remain so if the script never runs** |
| Gap-chart bars | Grow from the baseline when the panel enters view |
| `window.revealAll()` | Flushes every pending reveal; also bound to `beforeprint` |
