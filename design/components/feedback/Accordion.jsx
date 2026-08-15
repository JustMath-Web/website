import React from "react";

/* Height-animated panel: measures its content, transitions to that height. */
function Panel({ open, id, labelledBy, children }) {
  const inner = React.useRef(null);
  const [h, setH] = React.useState(0);
  React.useEffect(() => {
    if (!inner.current) return;
    setH(open ? inner.current.scrollHeight : 0);
  }, [open, children]);
  return (
    /* `inert` rather than `hidden` when closed: height:0 + overflow:hidden alone leaves the
       answer focusable and readable by a screen reader, but `hidden` sets display:none and
       would kill the measured-height animation. `inert` removes it from tab order and the
       accessibility tree while leaving layout — and therefore the transition — intact. */
    <div
      id={id} role="region" aria-labelledby={labelledBy} inert={open ? undefined : ""}
      style={{ height: h, opacity: open ? 1 : 0, overflow: "hidden", transition: "height var(--dur-3) var(--ease-standard), opacity var(--dur-3) var(--ease-standard)" }}
    >
      <div ref={inner}>{children}</div>
    </div>
  );
}

/* Plus that rotates into a minus. Two bars, no icon font. */
function Cross({ open }) {
  const bar = { position: "absolute", top: "50%", left: "50%", background: "var(--ink-600)", transition: "transform var(--dur-3) var(--ease-standard)" };
  return (
    <span aria-hidden="true" style={{ position: "relative", flex: "none", width: 15, height: 15, marginTop: 5 }}>
      <span style={{ ...bar, width: "100%", height: 2, transform: `translate(-50%,-50%) rotate(${open ? 180 : 0}deg)` }} />
      <span style={{ ...bar, width: 2, height: "100%", transform: `translate(-50%,-50%) rotate(${open ? 270 : 0}deg)` }} />
    </span>
  );
}

export function Accordion({ items = [], defaultOpen = 0, idPrefix = "faq", style, ...rest }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [hover, setHover] = React.useState(-1);
  return (
    <div style={{ borderTop: "1px solid var(--rule)", ...style }} {...rest}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const btnId = `${idPrefix}-q-${i}`;
        const panelId = `${idPrefix}-a-${i}`;
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--rule)" }}>
            <button
              id={btnId}
              onClick={() => setOpen(isOpen ? -1 : i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              style={{
                display: "flex", width: "100%", gap: 16, alignItems: "flex-start", justifyContent: "space-between",
                background: "none", border: 0, padding: "20px 0", cursor: "pointer", textAlign: "left",
                font: "var(--weight-medium) clamp(16px,1.7vw,19px)/1.4 var(--font-sans)",
                color: hover === i || isOpen ? "var(--ink-900)" : "var(--ink-700)",
                transition: "color var(--dur-1) var(--ease-standard)",
              }}
            >
              <span>{it.q}</span>
              <Cross open={isOpen} />
            </button>
            <Panel open={isOpen} id={panelId} labelledBy={btnId}>
              <p style={{ font: "var(--weight-regular) clamp(15px,1.6vw,17px)/1.62 var(--font-sans)", color: "var(--text-body)", maxWidth: "var(--measure)", margin: "0 0 24px" }}>{it.a}</p>
            </Panel>
          </div>
        );
      })}
    </div>
  );
}
