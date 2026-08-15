import React from "react";

const LEVELS = {
  secure: { fill: "var(--ink-900)", label: "Secure" },
  building: { fill: "var(--slate-500)", label: "Building" },
  practise: { fill: "var(--ochre-500)", label: "Needs practice" },
};

export function ProgressMeter({ topic, level = "building", value, showLabel = true, emptyLabel = "Not assessed yet", style, ...rest }) {
  /* A topic that has not been taught or assessed yet is a real, common case — the first month
     of a new student. It shows an empty track rather than a zero-length bar, because zero
     would read as "assessed, and bad" instead of "no reading taken". */
  const empty = level === "none" || (value === null && !LEVELS[level]);
  const skin = LEVELS[level] || LEVELS.building;
  const pct = typeof value === "number" ? value : { secure: 88, building: 60, practise: 32 }[level];
  return (
    <div style={{ ...style }} {...rest}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 8 }}>
        <span style={{ font: "var(--type-body)", fontSize: "var(--size-sm)", color: empty ? "var(--text-muted)" : "var(--ink-900)" }}>{topic}</span>
        {showLabel ? <span style={{ font: "var(--type-small)", color: "var(--text-muted)" }}>{empty ? emptyLabel : skin.label}</span> : null}
      </div>
      {empty ? (
        <div style={{ height: 8, borderRadius: "var(--radius-sm)", border: "1px dashed var(--rule-strong)", background: "transparent" }} />
      ) : (
        <div style={{ height: 8, background: "var(--paper-3)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: skin.fill, transition: "width var(--dur-4) var(--ease-out)" }} />
        </div>
      )}
    </div>
  );
}
