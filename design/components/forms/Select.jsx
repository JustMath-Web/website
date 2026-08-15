import React from "react";

export function Select({ options = [], invalid = false, disabled = false, placeholder, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <span style={{ position: "relative", display: "block", opacity: disabled ? 0.42 : 1 }}>
      <select
        disabled={disabled}
        aria-invalid={invalid || undefined}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{
          width: "100%", height: "var(--control-h)", padding: "0 38px 0 14px",
          font: "var(--type-body)", fontSize: "var(--size-sm)", color: "var(--ink-900)",
          background: "var(--white)", borderRadius: "var(--radius-md)", appearance: "none",
          cursor: disabled ? "not-allowed" : undefined,
          border: `1px solid ${invalid ? "var(--danger-600)" : focus ? "var(--ink-900)" : "var(--rule-strong)"}`,
          /* No `outline: none` — see Input.jsx. The ring supplements the global focus
             outline; it never replaces it. */
          boxShadow: focus && !disabled ? "var(--ring)" : "none",
          transition: "var(--transition-control)", ...style,
        }}
        {...rest}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((o) => {
          const value = typeof o === "string" ? o : o.value;
          const label = typeof o === "string" ? o : o.label;
          return <option key={value} value={value}>{label}</option>;
        })}
      </select>
      <svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" style={{ position: "absolute", right: 14, top: "50%", marginTop: -7, pointerEvents: "none" }}>
        <path d="M3 6l5 5 5-5" fill="none" stroke="var(--ink-600)" strokeWidth="1.6" />
      </svg>
    </span>
  );
}
