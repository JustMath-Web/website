import React from "react";

/* The mark: the 2×2 operator cluster (+ − × ÷), carried over from the live site and redrawn as
   pure geometry so it scales, reverses and survives a 40px avatar. Drawn with currentColor so a
   single component serves ink-on-paper and paper-on-ink without a second asset. */
function OperatorMark({ size = 40, title, ...rest }) {
  return (
    <svg viewBox="0 0 160 160" width={size} height={size} fill="currentColor"
      role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : "true"}
      focusable="false" style={{ display: "block", flex: "none" }} {...rest}>
      {/* plus */}
      <rect x="22" y="40.5" width="44" height="7" />
      <rect x="40.5" y="22" width="7" height="44" />
      {/* minus */}
      <rect x="94" y="40.5" width="44" height="7" />
      {/* multiply */}
      <rect x="22" y="112.5" width="44" height="7" transform="rotate(45 44 116)" />
      <rect x="22" y="112.5" width="44" height="7" transform="rotate(-45 44 116)" />
      {/* divide */}
      <rect x="94" y="112.5" width="44" height="7" />
      <circle cx="116" cy="99" r="4.5" />
      <circle cx="116" cy="133" r="4.5" />
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
        <OperatorMark size={size * 2} />
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
      <OperatorMark size="2.05em" />
      <Wordmark size="1em" />
    </span>
  );
}
