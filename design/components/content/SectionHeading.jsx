import React from "react";

export function SectionHeading({ eyebrow, title, lead, align = "left", level = 2, style, ...rest }) {
  const H = `h${level}`;
  return (
    <div style={{ textAlign: align, maxWidth: align === "center" ? "var(--measure)" : undefined, marginInline: align === "center" ? "auto" : undefined, ...style }} {...rest}>
      {eyebrow ? <div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>{eyebrow}</div> : null}
      <H style={{ font: "var(--type-h2)", letterSpacing: "var(--tracking-tight)", color: "var(--ink-900)", margin: 0 }}>{title}</H>
      {lead ? <p style={{ marginTop: 14, marginBottom: 0, font: "var(--type-lead)", color: "var(--text-muted)", maxWidth: "var(--measure)" }}>{lead}</p> : null}
    </div>
  );
}
