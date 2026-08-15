import React from "react";

const SIZES = {
  sm: { height: "var(--control-h-sm)", padding: "0 14px", fontSize: "var(--size-xs)" },
  md: { height: "var(--control-h)", padding: "0 20px", fontSize: "var(--size-sm)" },
  lg: { height: "var(--control-h-lg)", padding: "0 28px", fontSize: "var(--size-base)" },
};

export function Button({ variant = "primary", size = "md", full = false, disabled = false, loading = false, loadingLabel = "Working…", as = "button", href, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  /* Loading keeps the original label rendered, so the control cannot change width and the
     layout cannot jump. The state is announced to assistive tech instead of spelled out
     visually — a spinner would be the only rotating thing in a brand whose motion is fades
     and short distances only. */
  const busy = loading && !disabled;
  const inert = disabled || busy;

  const skin = {
    primary: { background: hover && !inert ? "var(--ink-700)" : "var(--ink-900)", color: "var(--paper)", border: "1px solid var(--ink-900)" },
    secondary: { background: hover && !inert ? "var(--paper-2)" : "transparent", color: "var(--ink-900)", border: "1px solid var(--ink-900)" },
    quiet: { background: hover && !inert ? "var(--paper-2)" : "transparent", color: "var(--ink-700)", border: "1px solid var(--rule)" },
    ghost: { background: "transparent", color: hover ? "var(--ink-900)" : "var(--ink-700)", border: "1px solid transparent", padding: "0 4px", textDecoration: hover ? "underline" : "none", textUnderlineOffset: 3 },
  }[variant];

  const Tag = href ? "a" : as;
  return (
    <Tag
      href={busy ? undefined : href}
      aria-disabled={inert || undefined}
      aria-busy={busy || undefined}
      disabled={Tag === "button" ? inert : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: full ? "flex" : "inline-flex", width: full ? "100%" : undefined,
        alignItems: "center", justifyContent: "center", gap: 10,
        fontFamily: "var(--font-sans)", fontWeight: "var(--weight-semibold)", letterSpacing: "0.005em",
        borderRadius: "var(--radius-md)", cursor: disabled ? "not-allowed" : busy ? "progress" : "pointer",
        opacity: disabled ? 0.42 : busy ? 0.6 : 1, textDecoration: "none",
        pointerEvents: busy ? "none" : undefined,
        transform: press && !inert ? "translateY(1px)" : "none",
        transition: "var(--transition-control), transform var(--dur-1) var(--ease-standard)",
        ...SIZES[size], ...skin, ...style,
      }}
      {...rest}
    >
      {children}
      {busy ? (
        <span role="status" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
          {loadingLabel}
        </span>
      ) : null}
    </Tag>
  );
}
