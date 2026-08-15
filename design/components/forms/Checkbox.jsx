import React from "react";

export function Checkbox({ label, description, checked, defaultChecked, onChange, disabled = false, invalid = false, error, style, ...rest }) {
  return (
    <label style={{ display: "block", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.42 : 1, ...style }}>
      <span style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <input type="checkbox" checked={checked} defaultChecked={defaultChecked} onChange={onChange} disabled={disabled}
          aria-invalid={invalid || !!error || undefined}
          style={{
            width: 18, height: 18, marginTop: 2, accentColor: "var(--ink-900)", borderRadius: "var(--radius-sm)", flex: "none",
            /* The native box will not take a border colour reliably, so an invalid checkbox is
               ringed with a box-shadow — NOT an outline. Using outline here would overwrite the
               global :focus-visible outline and make keyboard focus vanish on a valid checkbox. */
            boxShadow: invalid || error ? "0 0 0 2px var(--danger-600)" : undefined,
          }} {...rest} />
        <span>
          <span style={{ display: "block", font: "var(--type-body)", fontSize: "var(--size-sm)", color: "var(--ink-900)" }}>{label}</span>
          {description ? <span style={{ display: "block", marginTop: 2, font: "var(--type-small)", color: "var(--text-muted)" }}>{description}</span> : null}
        </span>
      </span>
      {error ? <span style={{ display: "block", marginTop: 6, marginLeft: 30, font: "var(--type-small)", color: "var(--danger-600)" }}>{error}</span> : null}
    </label>
  );
}
