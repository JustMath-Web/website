import React from "react";

const TONES = {
  plain: { background: "var(--surface-card)", border: "1px solid var(--rule)" },
  sunken: { background: "var(--surface-sunken)", border: "1px solid transparent" },
  outline: { background: "transparent", border: "1px solid var(--ink-900)" },
  invert: { background: "var(--ink-900)", border: "1px solid var(--ink-900)", color: "var(--paper)" },
};

export function Card({ tone = "plain", padding = 28, lift = false, rule = false, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: "var(--radius-lg)", padding, ...TONES[tone],
        borderTop: rule ? "3px solid var(--ink-900)" : undefined,
        boxShadow: lift && hover ? "var(--shadow-lift)" : lift ? "var(--shadow-1)" : "none",
        transition: "box-shadow var(--dur-2) var(--ease-standard)",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
