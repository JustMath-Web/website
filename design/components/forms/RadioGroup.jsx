import React from "react";

export function RadioGroup({ name, options = [], value, onChange, columns = 1, disabled = false, invalid = false, style, ...rest }) {
  return (
    <div role="radiogroup" aria-invalid={invalid || undefined} aria-disabled={disabled || undefined}
      style={{ display: "grid", gridTemplateColumns: `repeat(${columns},1fr)`, gap: 10, opacity: disabled ? 0.42 : 1, ...style }} {...rest}>
      {options.map((o) => {
        const val = typeof o === "string" ? o : o.value;
        const label = typeof o === "string" ? o : o.label;
        const note = typeof o === "string" ? null : o.note;
        const on = value === val;
        /* A single option can be unavailable (a slot already taken) without the group being off. */
        const off = disabled || (typeof o === "object" && o.disabled);
        return (
          <label key={val} style={{
            display: "flex", gap: 10, alignItems: "flex-start", padding: "12px 14px",
            cursor: off ? "not-allowed" : "pointer", opacity: !disabled && off ? 0.42 : 1,
            background: on ? "var(--paper-2)" : "var(--white)", borderRadius: "var(--radius-md)",
            border: `1px solid ${invalid && !on ? "var(--danger-600)" : on ? "var(--ink-900)" : "var(--rule-strong)"}`,
            transition: "var(--transition-control)",
          }}>
            <input type="radio" name={name} value={val} checked={on} disabled={off} onChange={() => onChange && onChange(val)}
              style={{ width: 16, height: 16, marginTop: 3, accentColor: "var(--ink-900)", flex: "none" }} />
            <span>
              <span style={{ display: "block", font: "var(--type-body)", fontSize: "var(--size-sm)", color: "var(--ink-900)" }}>{label}</span>
              {note ? <span style={{ display: "block", marginTop: 2, font: "var(--type-small)", color: "var(--text-muted)" }}>{note}</span> : null}
            </span>
          </label>
        );
      })}
    </div>
  );
}
