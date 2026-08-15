import React from "react";

export function Stat({ value, label, note, align = "left", style, ...rest }) {
  return (
    <div style={{ textAlign: align, ...style }} {...rest}>
      <div style={{ font: `var(--weight-semibold) var(--size-2xl)/1 var(--font-serif)`, color: "var(--ink-900)", letterSpacing: "var(--tracking-tight)" }}>{value}</div>
      <div style={{ marginTop: 8, font: "var(--type-small)", fontWeight: "var(--weight-semibold)", color: "var(--ink-900)" }}>{label}</div>
      {note ? <div style={{ marginTop: 4, font: "var(--type-small)", color: "var(--text-muted)" }}>{note}</div> : null}
    </div>
  );
}
