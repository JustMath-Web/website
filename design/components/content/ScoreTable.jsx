import React from "react";

export function ScoreTable({ columns = [], rows = [], caption, emptyLabel = "No marks recorded yet — this month sets the baseline.", style, ...rest }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", font: "var(--type-body)", fontSize: "var(--size-sm)", ...style }} {...rest}>
      {caption ? <caption style={{ textAlign: "left", font: "var(--type-small)", color: "var(--text-muted)", paddingBottom: 10 }}>{caption}</caption> : null}
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th key={c} style={{ textAlign: i === 0 ? "left" : "right", font: "var(--type-label)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-muted)", padding: "0 0 10px", borderBottom: "1px solid var(--ink-900)" }}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* The first report of a new student has no prior marks. An explicit line is honest;
            an empty table body reads as a rendering fault. */}
        {rows.length === 0 ? (
          <tr>
            <td colSpan={Math.max(columns.length, 1)} style={{ padding: "16px 0", borderBottom: "1px solid var(--rule)", font: "var(--type-small)", color: "var(--text-muted)" }}>
              {emptyLabel}
            </td>
          </tr>
        ) : null}
        {rows.map((r, ri) => (
          <tr key={ri}>
            {r.map((cell, ci) => (
              <td key={ci} style={{
                padding: "12px 0", borderBottom: "1px solid var(--rule)",
                textAlign: ci === 0 ? "left" : "right", color: ci === 0 ? "var(--ink-900)" : "var(--ink-700)",
                fontFamily: ci === 0 ? "var(--font-sans)" : "var(--font-mono)",
                fontVariantNumeric: "tabular-nums",
              }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
