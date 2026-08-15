import React from "react";

export function Field({ label, hint, error, success, required = false, htmlFor, children, style, ...rest }) {
  /* Success is SLATE, never green. Green is reserved system-wide for controls that open
     WhatsApp; a green "looks good" message would break that promise. The check glyph means
     the state is never carried by colour alone. Precedence: error > success > hint. */
  const note = error
    ? { text: error, color: "var(--danger-600)", mark: "✕", role: "alert" }
    : success
      ? { text: success, color: "var(--slate-600)", mark: "✓", role: "status" }
      : hint
        ? { text: hint, color: "var(--text-muted)", mark: null, role: undefined }
        : null;
  return (
    <label htmlFor={htmlFor} style={{ display: "block", ...style }} {...rest}>
      <span style={{ display: "block", font: "var(--type-small)", fontWeight: "var(--weight-semibold)", color: "var(--ink-900)", marginBottom: 6 }}>
        {label}{required ? <span style={{ color: "var(--text-faint)", fontWeight: 400 }}> · required</span> : null}
      </span>
      {children}
      {note ? (
        <span role={note.role} style={{ display: "flex", gap: 6, marginTop: 6, font: "var(--type-small)", color: note.color }}>
          {note.mark ? <span aria-hidden="true">{note.mark}</span> : null}
          <span>{note.text}</span>
        </span>
      ) : null}
    </label>
  );
}
