import React from "react";

const TONES = {
  neutral: { background: "var(--paper-2)", color: "var(--ink-700)", border: "1px solid var(--rule)" },
  ink: { background: "var(--ink-900)", color: "var(--paper)", border: "1px solid var(--ink-900)" },
  slate: { background: "var(--slate-100)", color: "var(--slate-700)", border: "1px solid transparent" },
  ochre: { background: "var(--ochre-100)", color: "var(--ochre-600)", border: "1px solid transparent" },
};

export function Badge({ tone = "neutral", uppercase = false, children, style, ...rest }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, height: 24, padding: "0 9px",
      borderRadius: "var(--radius-sm)", font: "var(--type-small)", fontWeight: "var(--weight-medium)",
      letterSpacing: uppercase ? "var(--tracking-wide)" : 0, textTransform: uppercase ? "uppercase" : "none",
      fontSize: uppercase ? "var(--size-2xs)" : "var(--size-xs)", whiteSpace: "nowrap",
      ...TONES[tone], ...style,
    }} {...rest}>{children}</span>
  );
}
