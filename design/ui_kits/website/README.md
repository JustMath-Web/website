# Website UI kit — mathematicsmalaysia.com landing page

One page, ten sections, one action. Copy is final and set verbatim from the client's deck.

- `index.html` — the page. Mobile-first; desktop switches at 860px via `useDesktop`.
- `LandingShell.jsx` — fluid scale (`T`, `SECTION_Y`), primitives, `GraphGround`, `Spine`, `Marker`, the single `Cta`, header, hero, trust bar.
- `LandingArgument.jsx` — Problem, What a session looks like, the four level blocks.
- `LandingClose.jsx` — About, Pricing, How it works, FAQ, final CTA, `Landing`.

## The visual system

**One motif: the measurement spine.** The eleven years of Malaysian schooling as a ruled scale. In the hero every stop is inked — that is the argument, one tutor across the whole span. In the Problem section the same scale becomes `GapChart`: an ink panel where three tall paper bars are the measured points, eight stubs are the years nobody checks, and an ochre bracket marks the Form 4–5 stretch. Bars grow from the baseline when the panel scrolls into view. Pure geometry, no illustration.

**Graph ground.** A 48px hairline grid from two CSS gradients, masked to fade downward, on the hero, the trust band, the gap chart, the 500-number panel and the close.

**Numerals are the loud element.** Tabular IBM Plex Mono at −0.045em: `2` at up to 132px in Problem, `24 / 10 / 500+` reversed in the ink trust band, `20` in the 500-number panel, `13` over the FAQ, `01–04` on levels and steps, `30` opening the close, `3pm–6pm` / `8pm–11pm` in Availability, and every fee. The trust-bar figures are static text — no count-up animation, per the brief.

**Motion.** `Reveal` fades and lifts each block 14px on first scroll-in (640ms, staggered 80–90ms across siblings); `useInView` drives the chart bars. Both run off `useReveal` — one shared passive scroll/rAF sweep, not per-element `IntersectionObserver`s. An observer only fires on a state *change*, so an element that jumps from below the fold to above it in a single scroll step never intersects and would stay invisible; a sweep reveals anything whose top has passed the fold regardless. Everything collapses under `prefers-reduced-motion`.

**CTA contrast.** The label is white, so the button fills with `--wa-green-btn #0e7a3e` (hover `#0a6432`) — 5.4:1 against white at the 17px mobile label size. `#25d366` remains the documented brand green.

**Interaction detail.** The FAQ animates to its measured height with a plus whose bars rotate into a minus. Session cards lift 3px on hover, their hairline inks, the index chip inverts and a 3px rule wipes across the top.

**Three ink bands set the rhythm** — trust bar, the 500-number panel inside About, and the close — plus the gap chart. Between them paper and sunken alternate. Sections are numbered `01`–`07` with a `Marker` rule.

**Levels are full-width rows, not a 2×2 card grid.** Sticky left column with the range in large serif and the age band in ochre mono; bullets run wide on the right. Reads as a contents page.

## On component libraries

21st.dev and Astryx were reviewed and deliberately not used. 21st.dev ships React + Tailwind + shadcn source; Astryx is React + StyleX. Neither runs in this page's environment (no bundler, no Tailwind, no StyleX), and both aesthetics — shimmer buttons, gradient heroes, animated counters — are the edtech-SaaS look the brief rules out. What was taken from them is interaction convention only: scroll reveal, measured-height accordion, and progressive bar reveal, all reimplemented against these tokens.

## Constraints held

**Five CTAs, one treatment.** Hero, sessions, pricing, FAQ, close — all through `Cta` → `WhatsAppButton`, identical label ("Book a free maths assessment on WhatsApp"), same `wa.me/60194728768` link and prefilled text. The label is allowed to wrap on narrow phones rather than shrink below a comfortable tap-label size. The four section CTAs are centred; only the hero's sits left, under its left-aligned copy. The header carries **no** button; a sixth green control would break the promise. It shows the number as a `tel:` link in ink.

The label now reads "…on WhatsApp", so the **word** carries the destination and the glyph reinforces it. (This line previously said the glyph was the *sole* signal — that was true of the older "…Now" label and is no longer the case. It matters, because it means the glyph could be removed if WhatsApp's brand rules required it: see `ASSETS.md` §4.)

**Green is only the CTA.** Ochre carries emphasis (the measured dates, the IGCSE row, level age bands); ink and hairlines carry everything else.

**No testimonials band, and no hole where one would sit.** Levels closes on its own sunken full-measure statement, then About follows.

**The pricing table stays a table.** Fixed 38/16/23/23%, ink header band, tabular mono figures that never wrap, first column wraps. Readable at 320px with no horizontal scroll. The IGCSE row — the one that differs, the highest-margin one — is marked by an ochre row tint, a 1px ochre rule above and below the full row, and a semibold ochre `90 min`. Still one table, so the five prices stay directly comparable. It is deliberately **not** a coloured left edge — the brand bans accent bars on one side, and a full-width rule reads as "this row is the exception" rather than as decoration. The `90 min` figure carries the difference in text, so the tint is never the only signal.

**One photograph.** `<image-slot id="mrkong-portrait">` in About, 4:5, sticky, with the byline set as a ruled caption beneath. No other image anywhere.

**The lockup is the operator mark + stacked type.** The header draws the mark inline (sized to `2.05em`, the exact height of the type block) then sets `Just Math` in serif with `MALAYSIA` justified beneath to the name's width; the close signs off "Mr Kong, Just Math Malaysia". The mark is carried over from the live site and redrawn in ink — owner decision, 2026-08-11, `ASSETS.md` §1b. The header draws it inline rather than importing `<Logo />` because the sizing is bespoke; both draw the same geometry, so a change to one must be made in the other.
