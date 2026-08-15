# Just Math Malaysia — Design System

**Just Math Malaysia** is a solo online maths tutor teaching Malaysian schoolchildren one to one, Form 1 through SPM (plus IGCSE). Four surfaces make up the whole business:

1. **Landing page** (`mathematicsmalaysia.com`) — one page whose only job is to move a parent into WhatsApp.
2. **WhatsApp booking flow** — the booking system. No calendar app, no account, no confirmation email.
3. **Written progress reports** — a one-page document sent to parents at the end of each month.
4. **The blog** (`/blog`) — information and SEO, filed by syllabus level, with worked maths in the posts.

The audience is **parents**, not children. The category (bright rounded sans-serif, cartoon mascots, "unlock your potential") markets to children; this brand deliberately does not.

## Sources

No codebase, Figma file, deck or font binaries were supplied. This system was built from a written brand brief (name, hierarchy, tonal meaning of "Just", serif direction, banned imagery, monogram options, three required deliverables). Everything here is authored from that brief — if a repo or Figma file exists, attach it and this system should be reconciled against it.

**Substitutions to review** (flagged, not decided):
- **Fonts** — no binaries provided. Using **IBM Plex Serif** (wordmark + display), **IBM Plex Sans** (UI, body), **IBM Plex Mono** (figures), loaded from Google Fonts in `tokens/fonts.css`. Plex Serif was chosen for real weight with squared, barely-rounded terminals. Send the licensed serif and it swaps in one file.
- **Icons** — no icon set provided. **Lucide** (CDN, 1.5px stroke) for the handful of UI glyphs. The **WhatsApp** glyph is the official Simple Icons path, vendored at `assets/icons/whatsapp.svg`.

## The mark

Three deliverables, all built from live type or plain geometry — no drawn imagery anywhere.

| Deliverable | File / component | Notes |
| --- | --- | --- |
| Lockup | `<Logo />` | The mark, then **Just Math** in serif with **MALAYSIA** justified beneath to the name's exact width |
| Mark | `assets/monogram-operators.svg` (+ `-invert`, `-square`) · `<Logo variant="monogram" />` | The **2×2 operator cluster**: + − × ÷ |
| Reversed | `<Logo reversed />` · `-invert.svg` | Paper on ink, for the dark footer and the ink bands |

**Why the operators.** The mark is **carried over from the live site**, not invented: `mathematicsmalaysia.com` has run a 2×2 operator cluster beside the name for years, and parents may already recognise it. Redrawing it in ink keeps that recognition while dropping the child-facing red/cyan/green/yellow. Four operators also say *arithmetic across every level* — the page's actual argument — where a single symbol says only one thing. It is pure geometry: eight rectangles and two circles, no drawn imagery, and it survives a 40px circular WhatsApp avatar.

**The equals sign was the earlier proposal and is retired.** It was authored from the written brief on the belief that no prior mark existed. That was wrong — see `ASSETS.md` §1b — and discarding a mark parents already know is an equity decision, not a style one. `1:1` was tested and rejected long before either: at 40px, a colon between two identical numerals reads as a clock time. It survives as a copy device (`<Stat value="1:1" />`), never as a mark.

**Hierarchy.** The mark leads; **Just Math** is dominant; MALAYSIA is subordinate — smaller, wide-tracked, justified to the name's width beneath it. The name is Just Math. Malaysia is the market. The mark is sized to the type block's full height (2.05em) so the two align optically at any scale.

**Never:** the mark in green (green means *this opens WhatsApp*) · the mark in any colour but ink-900 or paper · **the original four-colour PNG** · a rounded sans-serif setting · the mark over an image · the lockup below 150px wide (use the mark alone).

## Content fundamentals

**Voice: plain, exact, calm.** "Just" means three things at once and the writing should know it — *only* maths, *exactly* right, and *simply, don't panic*. Copy is written by one person to one parent.

- **Person.** First person singular, always: "I'll send the whiteboard link", never "we" or "our team". The parent is "you"; the child is named or "your child" — never "your little one".
- **Casing.** Sentence case everywhere. Uppercase appears only in eyebrows, badges and MALAYSIA in the wordmark. Never a shouty headline.
- **Sentence length.** Short. A time, a price, what happens next. Headlines get a full stop: "It's just maths." "Three steps, no forms to fill in."
- **Numbers are specific and verifiable.** "RM90 an hour", "34 out of 40", "11 years teaching SPM maths". Never "500+ happy students", never a percentage without its denominator.
- **Reassurance, never urgency.** "Usually replies the same day." Never "limited slots", "book now", countdown timers.
- **No emoji. Ever.** Not in the UI, not in the WhatsApp thread, not in reports.
- **No achievement language.** No "excellence", "mastery", "unlock", "potential", "journey", "transform". The brand's promise is competence and calm, not triumph.
- **Malaysian English, lightly.** RM for fees, Form 1–5 and SPM/KSSM/IGCSE as the syllabus vocabulary, Malaysian names and places in examples (Nurul, Encik Faizal, Ipoh, Shah Alam). No slang, no code-switching in body copy.
- **In reports:** describe the change, then the evidence, then one instruction. "Quadratics are secure — she solved the whole of Exercise 4.3 without prompting, which she couldn't do in February."

Sample copy that is on-brand: *"One tutor, one student, one hour a week."* · *"You pay for it afterwards, or not at all if it wasn't useful."* · *"Tell me before the morning of the lesson and there's no charge."*

## Visual foundations

**Colour.** Monochrome first. Ink `#14161a` on warm paper `#fbfaf7`; hairlines `#e3dfd6`. One decorative accent, **slate blue** (`--slate-600`), for links, focus rings and calm emphasis. One report accent, **ochre**, for "needs practice". Two grounds per page maximum: `--paper` and `--paper-2`, alternating by section.

**The text/non-text line in the ramps.** Every ramp splits at the point where a value stops clearing 4.5:1 as text, and the split is enforced, not advisory:

| Ramp | Text values | Non-text only |
| --- | --- | --- |
| Ink | `ink-900` … `ink-500`, plus **`ink-450` `#666d77`** — the lightest ink that clears AA on *both* paper grounds (5.01:1 on `--paper`, 4.59:1 on `--paper-2`) | `ink-400` and lighter — rules, bar fills, dividers, disabled marks |
| Ochre | **`ochre-600` `#8f6114`** — AA on paper (5.17:1), paper-2 (4.75:1) and its own `ochre-100` tint (4.68:1) | `ochre-500` — brackets, row rules, chart fills |

`--text-faint` resolves to `ink-450`. Reach for a raw `--ink-400` on a paper ground and the text fails AA — on the ink panels it is fine, which is the only place the kit still uses it. Dimming type with alpha follows the same rule: on `--ink-900`, paper below **.55 alpha** drops under 4.5:1.

**Nothing is signalled by colour or dimness alone.** The gap chart's measured years carry a full-height bar and semibold weight, not just brightness; the IGCSE price row states `90 min` in text, not just an ochre tint.

**Green is reserved.** `--wa-green #25d366` appears *only* on a control that opens WhatsApp, plus `--wa-green-100` on the parent's own bubbles in booking mockups. Buttons fill with the deepened `--wa-green-btn #0e7a3e` (hover `--wa-green-press #0a6432`) so white label text clears 4.5:1 at 17px. Never a heading, badge, link, chart, hover state or second brand colour. If green is on the screen, tapping it opens WhatsApp — that is a promise the design keeps.

**Type.** Serif states, sans explains. IBM Plex Serif SemiBold for the wordmark, display and headings (58 / 46 / 36 / 23px); IBM Plex Sans for body (17/1.65, max 64ch) and leads (19/1.5, `--text-muted`); IBM Plex Mono, tabular, for every figure — fees, marks, phone numbers — so columns align in reports. Eyebrows are 12px uppercase sans at 0.06em. Headings carry −0.02em tracking; MALAYSIA carries 0.28em.

**Layout.** 1120px page container, 24px gutter, 96px between sections (64px tight). Reports use a 720px column. Text is capped in characters, not pixels. The header is sticky at 76px; nothing else is fixed. Grid and flex with `gap` everywhere.

**Backgrounds and imagery.** No photography, no illustration, no patterns, no textures, no gradients — anywhere. The page is typographic; where a competitor puts a hero image, this brand puts a real artefact (a sample lesson note, a report card). If imagery is ever added it should be plain documentary photography, warm and unfiltered, never stock classroom stock.

**Borders, radii, cards.** Squared like the mark: 3px on badges, 5px on controls, 6px on cards, 0 on rules and tables; circles only for avatars. A card is white on a 1px `--rule` hairline — a 3px ink top rule marks a document-like block (report sections, lesson notes). No coloured left-border accent bars, ever.

**Elevation.** Hairlines do the dividing. `--shadow-1` on resting cards inside kits, `--shadow-lift` on hover for clickable cards only, `--shadow-2` under the sticky header. No shadow on static content.

**Transparency and blur.** Exactly one use: the sticky header at 88% paper with an 8px backdrop blur. Nothing else is translucent.

**Motion.** 120ms for hover and press, 180ms for shadow and focus, 240ms for a bubble arriving or a section revealing; one curve, `cubic-bezier(.2,.6,.3,1)`. Fades and short distances only — no bounce, no spring, no scale-up, no parallax. All durations collapse to 0 under `prefers-reduced-motion`.

**A reveal may only enhance something already visible.** Content must never *depend* on a scroll handler to become readable. In the production build this means the server-rendered HTML ships visible and a script adds the hidden state only once it runs — so a failed, slow or absent JS bundle degrades to a plain readable page rather than a blank one. The kit additionally exposes `window.revealAll()` and flushes on `beforeprint`, because print, headless capture and assistive jumps all surface blocks that scrolling never reached.

**States.** Hover darkens ink (`ink-900 → ink-700`) or tints paper (`transparent → paper-2`); it never lightens, never scales, never glows. Press nudges 1px down. Focus is a 2px slate outline at 2px offset, plus a 3px slate ring on form controls. Active nav is a 2px ink underline — never a pill, never a colour fill. Disabled is 42% opacity, no colour change.

**Tap targets.** 44px minimum on every surface a parent touches; 36px only for secondary desktop controls.

## Iconography

Icons are rare and functional. There is no icon font and no illustration system.

- **Set:** Lucide (CDN, `stroke-width: 1.5`), ink-900, 20–26px, never coloured, never in a circle or badge, never decorative. Typical usage: `calendar`, `clock`, `file-text`, `check`, `arrow-right`.
- **WhatsApp glyph:** `assets/icons/whatsapp.svg` (Simple Icons, official path) and `<WhatsAppGlyph />`. Only inside a control that opens WhatsApp.
- **The operator mark** is the only brand symbol. It is geometry (eight rectangles, two circles), not an icon — do not restyle it, outline it, recolour it, or animate it.
- **Emoji:** never. **Unicode as icons** (→, ·, ×): the middot is used as a separator in meta lines; nothing else.
- **Banned imagery** (every competitor uses them): pencils, graduation caps, lightbulbs, open books, owls, brains, abacuses, π, √, ∑, ∞, x². Also out: trophies, confetti, cartoon children, mascots.

## Index

**Foundations** — `styles.css` (the only file consumers link) imports:
`tokens/fonts.css` · `tokens/colors.css` · `tokens/typography.css` · `tokens/spacing.css` · `tokens/shape.css` · `tokens/motion.css` · `tokens/base.css`

**Assets** — `assets/monogram-operators.svg`, `monogram-operators-invert.svg`, `monogram-operators-square.svg` (favicon/avatar), `icons/whatsapp.svg`. Decision record: `assets/mark-options.html`

**Specimen cards** — `guidelines/*.card.html` (Brand, Colors, Type, Spacing groups)

**Components**

| Group | Components |
| --- | --- |
| `components/brand/` | **Logo**, **WhatsAppGlyph** |
| `components/core/` | **Button**, **WhatsAppButton**, **Card**, **Badge**, **Callout** |
| `components/forms/` | **Field**, **Input**, **Select**, **Checkbox**, **RadioGroup** |
| `components/content/` | **SectionHeading**, **Stat**, **Testimonial**, **ProgressMeter**, **ScoreTable** |
| `components/feedback/` | **Accordion** |
| `components/navigation/` | **SiteHeader**, **SiteFooter** |

*Intentional additions* (no source library existed, so the set was authored to the three surfaces): **WhatsAppButton** and **WhatsAppGlyph** exist to make the reserved-green rule enforceable in code; **ProgressMeter** and **ScoreTable** exist because reports are a first-class product surface, not an afterthought; **Accordion** exists for the landing page's thirteen-item FAQ.

**UI kits**

| Kit | Path | What it shows |
| --- | --- | --- |
| Website | `ui_kits/website/` | The full landing page — final client copy, mobile-first, five identical WhatsApp CTAs |
| Booking | `ui_kits/booking/` | The WhatsApp booking conversation, interactive, ending in a confirmation card |
| Reports | `ui_kits/reports/` | The monthly one-page parent report, two months, printable |

**Templates** — `templates/progress-report/` (Monthly progress report, editable starting point for consuming projects)

**Other** — `SKILL.md` (Agent Skills entry point), `thumbnail.html` (homepage tile)
