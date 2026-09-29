import React from "react";

/* The mark (ASSETS.md §1c, adopted 2026-09-29): a square-root sign whose lowest point is cut away
   in a circle — the gap from an earlier year — with the ochre dot in the cut, the fix. Superseded
   the 2×2 operator cluster (still in this file's git history, and in the retired
   monogram-operators*.svg files — ASSETS.md §1/§1b). The stroke uses currentColor so a single
   component serves ink-on-paper and paper-on-ink; the dot is always ochre-500, on either ground. */
function RootMark({ size = 40, title, ...rest }) {
  // aspect-ratio (not a computed height) so `size` can be a number or a CSS length like "2.05em" —
  // callers below pass both.
  // useId (not a prop) so two <Logo>s on one page never collide — a prop derived from `reversed`
  // gave every non-reversed instance the same id, an invalid duplicate SVG <mask id>.
  const cutId = `logo-mark-cut-${React.useId()}`;
  return (
    <svg viewBox="0 -4 124 108" width={size}
      role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : "true"}
      focusable="false" style={{ display: "block", flex: "none", aspectRatio: "124 / 108" }} {...rest}>
      <defs>
        <mask id={cutId} maskUnits="userSpaceOnUse" x="0" y="-4" width="124" height="108">
          <rect x="0" y="-4" width="124" height="108" fill="#fff" />
          <circle cx="40" cy="92" r="13.5" fill="#000" />
        </mask>
      </defs>
      <g mask={`url(#${cutId})`} fill="none" stroke="currentColor" strokeWidth="9"
        strokeLinejoin="round" strokeLinecap="round">
        <path d="M6 55 L22 46 L40 92" />
        <path d="M40 92 L62 8 L118 8" />
      </g>
      <circle cx="40" cy="92" r="7.5" fill="var(--ochre-500)" />
    </svg>
  );
}

/* Type half of the lockup: the name over the market, MALAYSIA justified to the name's width.
   `.lockup-fill` (tokens/base.css) does the letter-spreading and its Safari fallback. */
function Wordmark({ size }) {
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "stretch", fontSize: size, gap: "0.45em" }}>
      <span style={{ font: "var(--weight-semibold) 1em/1 var(--font-serif)", letterSpacing: "-0.02em" }}>Just Math</span>
      <span className="lockup-fill" style={{ font: "var(--weight-semibold) 0.6em/1 var(--font-sans)", letterSpacing: "0.24em", opacity: 0.72 }}>MALAYSIA</span>
    </span>
  );
}

export function Logo({ variant = "lockup", size = 24, color, reversed = false, title = "Just Math Malaysia", style, ...rest }) {
  const ink = color || (reversed ? "var(--paper)" : "var(--ink-900)");

  // Mark alone — favicon, avatar, anywhere the lockup would fall below its minimum width.
  if (variant === "monogram" || variant === "mark") {
    return (
      <span role="img" aria-label={title} title={title}
        style={{ display: "inline-flex", color: ink, ...style }} {...rest}>
        <RootMark size={size * 2} />
      </span>
    );
  }

  // Type only — no mark. For contexts where the mark already appears nearby.
  if (variant === "wordmark" || variant === "stacked") {
    return (
      <span role="img" aria-label={title} style={{ display: "inline-flex", color: ink, ...style }} {...rest}>
        <Wordmark size={size} />
      </span>
    );
  }

  /* Default lockup: mark left, stacked type right. The mark is sized to the type block's own
     height (1em + 0.45em gap + 0.6em ≈ 2.05em) so the two optically align at any scale. */
  return (
    <span role="img" aria-label={title}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.6em", fontSize: size, color: ink, ...style }} {...rest}>
      <RootMark size="2.05em" />
      <Wordmark size="1em" />
    </span>
  );
}
