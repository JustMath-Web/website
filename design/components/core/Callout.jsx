import React from "react";

export function Callout({ tone = "slate", title, children, style, ...rest }) {
  const skin = {
    slate: { background: "var(--slate-100)", accent: "var(--slate-600)" },
    ochre: { background: "var(--ochre-100)", accent: "var(--ochre-600)" },
    plain: { background: "var(--paper-2)", accent: "var(--ink-900)" },
  }[tone];
  return (
    <div style={{ background: skin.background, borderRadius: "var(--radius-lg)", padding: "20px 24px", ...style }} {...rest}>
      {title ? <div style={{ font: "var(--type-h3)", fontSize: "var(--size-base)", color: skin.accent, marginBottom: 6 }}>{title}</div> : null}
      <div style={{ font: "var(--type-body)", fontSize: "var(--size-sm)", color: "var(--ink-700)" }}>{children}</div>
    </div>
  );
}
