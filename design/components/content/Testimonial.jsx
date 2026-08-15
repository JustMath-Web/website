import React from "react";

export function Testimonial({ quote, name, detail, style, ...rest }) {
  return (
    <figure style={{ margin: 0, paddingTop: 22, borderTop: "3px solid var(--ink-900)", ...style }} {...rest}>
      <blockquote style={{ margin: 0, font: `var(--weight-regular) var(--size-md)/1.5 var(--font-serif)`, color: "var(--ink-900)" }}>{quote}</blockquote>
      <figcaption style={{ marginTop: 16, font: "var(--type-small)", color: "var(--text-muted)" }}>
        <span style={{ color: "var(--ink-900)", fontWeight: "var(--weight-semibold)" }}>{name}</span>
        {detail ? <span> · {detail}</span> : null}
      </figcaption>
    </figure>
  );
}
