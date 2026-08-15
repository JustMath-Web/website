# ASSETS — Just Math Malaysia

What exists, what must be produced, and what may legally ship.

## 1. Brand marks — all derived, none brand-official

**A logo does exist** — this package was authored believing none did, and that was wrong. The live
site `mathematicsmalaysia.com` ships `site-logo-math-white.png`: a 350×100 raster of a 2×2 operator
cluster (**+ − × ÷**) beside "Just MA+H Online", in red `#ea222a`, cyan `#6cc3d9`, green `#84d063`
and yellow `#f9e105`.

**That is brand equity, and it is unaudited.** Parents may already recognise it. It also collides
with two system rules: it contains green (which the design reserves for controls that open
WhatsApp), and it is raster, so it cannot scale or reverse.

**Resolved 2026-08-11: the owner chose Option B** (§1b) — the operator cluster redrawn in brand ink.
It preserves the recognition, drops the child-facing palette, and keeps green meaning *this opens
WhatsApp*. The old four-colour PNG does not ship. The mark is still **derived, not brand-official**:
it is a redraw of the client's own mark, and the redraw needs the brand owner's sign-off.

| File | Use | Status |
| --- | --- | --- |
| `assets/monogram-operators.svg` | The mark — 2×2 operator cluster in ink | **Adopted 2026-08-11** |
| `assets/monogram-operators-invert.svg` | Reversed, for the dark footer and ink bands | **Adopted** |
| `assets/monogram-operators-square.svg` | Square, chunkier bars — favicon and WhatsApp avatar | **Adopted** |
| ~~`logo-wordmark.svg`, `logo-wordmark-reversed.svg`, `logo.svg`~~ | The old type-only wordmarks | **DELETED** — they used `class="w"`/`"m"` with no CSS in the package, so they rendered as default browser type in any `<img>`. `logo.svg` was also byte-identical to `logo-wordmark.svg`. The lockup is `<Logo />`, not a file |
| ~~`monogram-equals*.svg`~~ | The equals monogram | **DELETED** — retired in favour of the operator mark |

All three are pure geometry — eight rectangles and two circles — with no raster and no external
dependency, so they scale to any size and reverse without a second asset.

**Note for the build:** the landing page draws the mark inline in `PageHeader` rather than importing
`<Logo />`, because the header lockup is bespoke (the mark is sized to the type block's exact
height). The `Logo` component is the reusable form for every other surface. Both draw the same
geometry; if one changes, change the other.

## 1b. The live mark, and the three options

**Compare them:** `assets/mark-options.html`

| Option | What it is | Status |
| --- | --- | --- |
| **A** | The live `site-logo-math-white.png`, as-is | **Do not ship.** Raster (cannot scale or reverse); contains green `#84d063`, which breaks the reserved-green rule; and at 40px — a WhatsApp avatar — it collapses into an unreadable smear |
| **B** | `assets/monogram-operators.svg` + `-invert.svg` — the same 2×2 operator cluster redrawn as pure geometry in `ink-900` | **Recommended.** Keeps the recognition the live site has built, drops the child-facing colour, scales and reverses, and survives 40px |
| **C** | ~~the equals monogram authored from the brief~~ | **Not chosen — files deleted.** Quiet and well-made, but had no connection to what parents have already seen |

**Why B over C, having seen the predecessor.** The equals monogram was designed believing there was
no prior mark. That assumption was wrong, and it changes the argument: discarding a mark parents may
already recognise is an equity decision, not a style preference. Four operators also say
*arithmetic across every level*, which is the page's actual claim, where an equals sign says
correctness only.

**Decision recorded: B, by the project owner, 2026-08-11.** Wired into the header lockup, the
favicon and WhatsApp avatar, the `Logo` component and its `.d.ts`/prompt, the brand cards, the
booking kit avatar, `readme.md`, and the compiled bundle.

**Not decided here:** whether the operators ever appear in colour off-web (print, WhatsApp avatar).
On the site they must stay monochrome, or green stops meaning *this opens WhatsApp*.

## 2. Photography — one image, and it does not exist yet

| Slot | Spec | Status |
| --- | --- | --- |
| `#mrkong-portrait` (About section) | **4:5 portrait**, sticky at desktop. Serve ~800×1000 @1x and ~1600×2000 @2x. | **MISSING — blocks launch** |

This is the only photograph on the entire site, and it carries the page's central claim that a real
named person teaches every session. Currently an `<image-slot>` placeholder.

**Art direction** (per CS-40): plain documentary portrait of Mr Kong — natural light, warm, unfiltered,
at a desk or teaching position, looking to camera or at work. Not a studio headshot on white, not a
corporate posed shot, no shallow-depth "founder" portrait. It should look like a photograph of a
teacher, taken by someone who knows him.

**Explicitly banned across the whole site:** stock photography of children, classrooms, laptops,
handshakes, or "diverse team" imagery. Stock children would actively damage the page's argument. If
the portrait cannot be supplied, the section is rebuilt typographically — **a placeholder face is
never shipped.**

## 3. Type — substitution, confirmed and closed

| Family | Role | Licence | Status |
| --- | --- | --- | --- |
| IBM Plex Serif | Wordmark, display, headings | SIL OFL 1.1 — free for web and commercial use | **Confirmed** |
| IBM Plex Sans | Body, UI, labels | SIL OFL 1.1 | **Confirmed** |
| IBM Plex Mono | All figures, tabular | SIL OFL 1.1 | **Confirmed** |

No font binaries were supplied. Plex Serif was chosen for real weight with squared, barely-rounded
terminals — it matches the brief's serif direction and is licence-clean.

> ✅ **CONFIRMED 2026-08-11: keep IBM Plex.** The client has no licensed serif to supply, so the
> substitution is now the decision, not a placeholder. This closes the font condition. The three
> families stay as they are; if that ever changes they swap in `tokens/fonts.css` alone, because the
> type scale is expressed in tokens rather than hard-coded per component.

Currently loaded from Google Fonts by URL. **For production, self-host** — it removes a third-party
request, a PDPA consideration, and a render-blocking dependency. Subset to Latin; no CJK is needed
(EN + BM only).

## 4. Icons

| Set | Use | Licence | Status |
| --- | --- | --- | --- |
| Lucide | The handful of UI glyphs (`calendar`, `clock`, `file-text`, `check`, `arrow-right`), 1.5px stroke, ink only | ISC | OK — currently CDN, **vendor the ~5 used glyphs for production** |
| Simple Icons — WhatsApp | `assets/icons/whatsapp.svg`, official path, vendored | CC0 | OK |

**KaTeX** (MIT) renders the maths in blog posts — CSS plus its own woff2 fonts. **Self-host both for
production**; render at build time so no maths JS ships to the browser. It is the only dependency the
blog adds, and the only one that brings fonts other than IBM Plex.

One icon family only. Icons are never coloured, never in a circle or badge, never decorative. The
operator mark is geometry, not an icon — do not restyle, recolour or animate it.

**Emoji are never used as iconography.** Banned imagery, all of which competitors use: pencils,
graduation caps, lightbulbs, open books, owls, brains, abacuses, π, √, ∑, ∞, x², trophies, confetti,
cartoon children, mascots.

### WhatsApp trademark — checked against the official guidelines 2026-08-11

Source: WhatsApp Brand Resources (`whatsappbrand.com` → Meta Brand Resources). Rules that bear on
this design, quoted:

> "You shouldn't modify any colors in our logos."
> "Never use any of the WhatsApp logos to replace the word WhatsApp in a sentence."
> "Always capitalize the letters 'W' and 'A,' and never modify or abbreviate the word 'WhatsApp.'"
> "Avoid using the WhatsApp name or logos … as a verb."
> "DON'T use the WhatsApp Brand Resources in a way that implies partnership, sponsorship, or
> endorsement by WhatsApp or any of its affiliates."

| Check | Result |
| --- | --- |
| Logo replacing the word in a sentence | **Pass** — the glyph never stands in for the word; the CTA reads "…on WhatsApp" with the glyph alongside |
| Capitalisation | **Pass** — every visitor-facing instance is exactly "WhatsApp". (The two "Whatsapp Now" strings in `MARKET-SCAN.md` are verbatim quotes of a competitor's site — evidence, not our copy) |
| Implying endorsement | **Pass** — no partnership language, no WhatsApp branding beyond the control itself |
| Name used as a verb | **Fixed in two places, one flagged** — see below |
| **Logo colour** | **UNRESOLVED — needs the client's decision.** See below |

**Verb usage.** Two authored strings said "WhatsApp me" and were changed to **"Message on
WhatsApp"**: the `SiteHeader` default label and the `core.card.html` demo.

The third instance is **approved client copy** and was deliberately left alone —
*"WhatsApp me for what is currently open."* (Availability). The verbatim policy outranks a
third-party style preference, and this is a *should-avoid*, not a prohibition.
**[CLIENT DECISION: keep as written, or approve "Message me on WhatsApp for what is currently
open." as an override.]** Recommendation: keep it. It is how Malaysians actually speak, the risk is
negligible, and rewriting approved copy to satisfy a soft guideline is the worse trade.

**Logo colour — the one unresolved item.** `WhatsAppGlyph` renders `fill: currentColor` and the
button sets `color: var(--white)`, so **the glyph ships white**.

**Stated precisely** (per review): a white glyph is *not automatically disallowed* — Meta's kit
generally provides white/reversed variants and using one is legitimate. The problem is narrower and
factual: **this implementation programmatically tints a path** rather than using a supplied asset,
so we cannot claim the shipped mark is an approved variant. That is the gap.

The launch choice is therefore binary:

1. **Ship an official white/reversed asset** from Meta's WhatsApp brand kit, replacing the tinted
   path — and record which file was used, so the claim is evidenced rather than assumed.
2. **Drop the glyph.** Lossless: the label reads "on WhatsApp", so the word carries the destination.
   This was *not* an option under the older "…Now" label, when the glyph was the only signal.

A green glyph on a light button is **not** a third option — it breaks the reserved-green rule (green
means *this opens WhatsApp*) and the 4.5:1 label contrast `--wa-green-btn` exists to provide.

**Access note:** Meta's brand-resources page requires a login from some networks, so the kit's exact
variant list could not be enumerated here. Whoever resolves this must open the kit while signed in.

Nothing here blocks design review. It blocks launch only until option 1 or 2 is chosen.

## 4b. Share image (Open Graph) — designed 2026-08-11

| File | Use | Status |
| --- | --- | --- |
| `assets/og/og-default.html` | The 1200×630 source. Screenshot it to regenerate | **Done** |
| `assets/og/og-default.png` | The shipped image, 1200×630 | **Done** |

Typographic, built from the same tokens as the site — **no photograph needed**, which is why it could
be produced before the portrait exists.

**What it contains:** the wordmark; the page's own approved `<h1>` ("Know exactly where your child's
maths stands") — no copy was invented for the card; the measurement spine as eleven ticks with three
inked, unlabelled because at feed size the shape carries the idea and words would not; a one-line
claim; and the domain.

**Two brand rules it observes.** No green — green is reserved for controls that open WhatsApp, and a
share image is not a control. No photograph and no illustration, per §5.

**To regenerate:** open `og-default.html` at exactly 1200×630 and screenshot. Use device scale 2 for
a @2x asset if a platform wants one.

**In the build:** `<meta property="og:image">` and `<meta name="twitter:image">` need absolute URLs,
plus `og:image:width` 1200 / `og:image:height` 630 and a `twitter:card` of `summary_large_image`.
An `og:image:alt` should describe the card, not repeat the headline.

## 5. Constructed, not illustrated

Everything else on the page is built from type and plain geometry, with no asset pipeline:

| Element | How it is made |
| --- | --- |
| Measurement spine (hero) | Ruled type + 1px rules |
| Gap chart (Problem) | CSS grid, coloured blocks, one ochre bracket |
| Graph ground | Two CSS gradients, masked to fade — no image |
| Pricing table | A real `<table>` |
| Progress meter / score table (reports) | CSS |

**There is no illustration system and no illustration is to be commissioned.** This satisfies CS-42
by having exactly one declared icon family and no generator house style.

## 6. Not real interfaces

`ui_kits/booking/` renders a simulated WhatsApp conversation. It is an **internal design artifact**
showing the booking flow — it is not a page section and must never be published as a screenshot of
real software or presented as a product UI. The landing page contains no interface depictions at all.

## 7. Still required before launch

1. **The portrait** — the one blocking asset.
2. **Brand-owner sign-off** on the adopted operator redraw (§1b). The direction is decided; the execution is still derived.
3. **Self-hosted, subset font files.** The families are settled (§3) — this is a delivery task, not a decision: drop the Google Fonts URL and serve the Latin subset locally.
4. **Vendored Lucide glyphs** to drop the CDN.
5. ~~**Open Graph / share image**~~ — ✅ **done 2026-08-11**, see §4b. Remaining work is wiring the
   meta tags in the build, not design.
6. **WhatsApp brand-guideline confirmation** (§4).
