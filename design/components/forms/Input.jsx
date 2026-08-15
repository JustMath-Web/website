import React from "react";

export function Input({ invalid = false, disabled = false, multiline = false, rows = 4, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const Tag = multiline ? "textarea" : "input";
  return (
    <Tag
      rows={multiline ? rows : undefined}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      style={{
        width: "100%", height: multiline ? undefined : "var(--control-h)", padding: multiline ? "12px 14px" : "0 14px",
        font: "var(--type-body)", fontSize: "var(--size-sm)", lineHeight: multiline ? 1.55 : undefined, color: "var(--ink-900)",
        /* Disabled dims without changing hue — the brand rule is 42% opacity, no colour shift. */
        background: "var(--white)", borderRadius: "var(--radius-md)",
        opacity: disabled ? 0.42 : 1, cursor: disabled ? "not-allowed" : undefined,
        border: `1px solid ${invalid ? "var(--danger-600)" : focus ? "var(--ink-900)" : "var(--rule-strong)"}`,
        /* No `outline: none`. The slate ring is an enhancement on top of the global
           :focus-visible outline, never a replacement for it — box-shadow is dropped in
           forced-colors mode, and the outline is what survives there. */
        boxShadow: focus && !disabled ? "var(--ring)" : "none", resize: multiline ? "vertical" : undefined,
        transition: "var(--transition-control)", ...style,
      }}
      {...rest}
    />
  );
}
