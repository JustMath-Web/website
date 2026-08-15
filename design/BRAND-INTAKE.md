# BRAND-INTAKE — Just Math Malaysia

What was supplied, what was derived, and what may not be treated as brand-official.

## 1. Input classification

| Input | Status | Notes |
| --- | --- | --- |
| `just-math-page-copy-final.md` | **Approved copy — verbatim** | Client-final. Never rewritten; see `COPY-GAPS.md` |
| `just-math-design-brief.md` | **Approved brief** | Positioning, anti-references, structure, naming |
| Written brand brief (name hierarchy, "Just" tonal meaning, serif direction, banned imagery, monogram options) | **Referenced, not in the repo** | `readme.md` was authored from it. **It is richer than the on-disk brief** — locate it or reconstruct it, otherwise its decisions are unverifiable |
| Brand kit (logo, fonts, colours) | **Does not exist** | No kit was ever supplied |
| Font binaries | **Not supplied** | See §3 |
| Photography | **Not supplied** | One portrait required; `ASSETS.md` §2 |
| Existing site | **`mathematicsmalaysia.com` — EXISTS** | WordPress/Bricks. Discovered 2026-08-11, after this package was written. **Not audited** — see `DESIGN.md` route note |

**There is no approved brand kit.** Everything visual in this package is therefore **derived**, and
no token below may be described as brand-official until the brand owner signs it off.

## 2. Colour tokens — all derived

Verified for contrast at the sizes they are actually used (measured in-browser, effective background
after alpha compositing).

| Token | Value | Status | Verification |
| --- | --- | --- | --- |
| `--ink-900` | `#14161a` | Derived | Primary text; 16.9:1 on paper |
| `--ink-700` | `#2c3037` | Derived | Body text |
| `--ink-500` | `#5b626c` | Derived | Muted; 5.90:1 on paper |
| `--ink-450` | `#666d77` | Derived | **Text floor** — 5.01:1 on paper, 4.59:1 on paper-2 |
| `--ink-400` and lighter | `#7b828c` → | Derived | **Non-text only** — fails AA as text |
| `--paper` / `--paper-2` | `#fbfaf7` / `#f3f0e9` | Derived | Two grounds maximum |
| `--rule` | `#e3dfd6` | Derived | Hairline |
| `--slate-600` | `#2b4468` | Derived | Accent 1 — links, focus |
| `--ochre-600` | `#8f6114` | Derived | **Text value** — AA on paper, paper-2 and ochre-100 |
| `--ochre-500` | `#b47b22` | Derived | **Non-text only** — rules, brackets, fills |
| `--wa-green` | `#25d366` | **Third-party** | WhatsApp's own brand colour — see §5 |
| `--wa-green-btn` / `-press` | `#0e7a3e` / `#0a6432` | Derived | Deepened so white label text clears 4.5:1 at 17px |

**Whole-page verification:** 0 contrast failures across 234 text nodes at 390 / 768 / 1440, plus the
reports (42) and booking (25) kits.

## 3. Type — substitution, unresolved

No font binaries were supplied. **IBM Plex Serif / Sans / Mono** (SIL OFL 1.1) stand in and are
licence-clean, so the package can ship as-is. If a licensed serif is intended, supply it — it swaps
in `tokens/fonts.css` alone. Full detail in `ASSETS.md` §3.

## 4. Marks — derived, unapproved

**Three SVG marks exist** — `monogram-operators.svg`, `-invert.svg`, `-square.svg`. They are a
**redraw of the client's own live mark** (the 2×2 operator cluster on `mathematicsmalaysia.com`),
not an invention: adopted by owner decision 2026-08-11. The six earlier marks — three type-only
wordmarks and three equals monograms — were deleted; see `ASSETS.md` §1.

**The redraw is still derived, and not brand-official.** The direction is the client's; this
execution needs the brand owner's sign-off.

The landing page and the report letterhead draw the mark **inline** rather than importing `<Logo />`,
because their sizing is bespoke. All three draw the same geometry — change one, change the others.

## 5. Third-party marks

`--wa-green #25d366` and `assets/icons/whatsapp.svg` are **WhatsApp's**, not this brand's. They are
used nominatively to signal a real destination, which is why green is reserved system-wide to
controls that open WhatsApp. Subject to WhatsApp's brand guidelines — **[CLIENT TO CONFIRM]**
(`ASSETS.md` §4). Lucide icons are ISC; the WhatsApp glyph path is Simple Icons, CC0.

## 6. External-processing record

Per the prompt's rule 13, this records what client material left the machine.

| Action | Client material sent externally? | Detail |
| --- | --- | --- |
| Competitor research (`MARKET-SCAN.md`) | **No** | Public competitor URLs fetched. Queries were generic sector terms — no client name, copy, or brand material was included |
| Live-site capture | **Not performed** | A live site exists but was never captured or audited. Only the logo asset and page title were read |
| Image generation | **Not used** | No external generation tool was used for any asset |
| Font loading | Yes, at runtime | IBM Plex is fetched from Google Fonts by the prototype. **Self-host for production** — it removes a third-party request and a PDPA consideration |
| Design hosting | Yes | The package is synced to the user's own Claude Design project, which is the client's own workspace |

**No client copy, brand asset, or identifying detail has been sent to any external generation tool.**
If that becomes necessary, authorization must be obtained and recorded here first.

## 7. Open approvals

1. **Brand owner:** sign off the adopted operator mark. It is a **redraw of the client's own live mark**, not an invention — but the redraw itself is derived and still needs approval.
2. **Brand owner:** confirm the font substitution, or supply the licensed serif.
3. **Client:** WhatsApp brand-guideline check (§5).
4. **Client:** the three derived copy strings in `COPY-GAPS.md` §2c.
5. **Client:** supply the portrait, or approve a typographic rebuild of About.
6. **Locate the original written brand brief** (§1) so `readme.md`'s decisions become verifiable
   rather than asserted.
