import React from "react";
import { WhatsAppGlyph } from "../brand/WhatsAppGlyph.jsx";

const SIZES = {
  sm: { height: "var(--control-h-sm)", padding: "8px 14px", fontSize: "var(--size-xs)", glyph: 16 },
  md: { height: "var(--control-h)", padding: "11px 20px", fontSize: "var(--size-sm)", glyph: 18 },
  lg: { height: "var(--control-h-lg)", padding: "14px clamp(16px,4vw,26px)", fontSize: "clamp(13.5px,4vw,19px)", glyph: 22 },
};

export function WhatsAppButton({ size = "md", full = false, phone = "60194728768", message = "Hi, I'd like to book the free maths assessment. My child is in ___", label = "Book a free maths assessment on WhatsApp", note, style, onClick, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size];
  const href = `https://wa.me/${String(phone).replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <span style={{ display: full ? "block" : "inline-block", width: full ? "100%" : undefined }}>
      <a
        href={href} target="_blank" rel="noreferrer" onClick={onClick}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => { setHover(false); setPress(false); }}
        onMouseDown={() => setPress(true)} onMouseUp={() => setPress(false)}
        style={{
          display: "flex", width: full ? "100%" : undefined, alignItems: "center", justifyContent: "center", gap: 10,
          /* The label wraps rather than forcing the button wider than its column. nowrap here
             made the intrinsic width of a long label push the page container past the viewport
             on a 390px phone — clipped, not scrollable, so it read as cut-off text. */
          minHeight: s.height, padding: s.padding, fontSize: s.fontSize, lineHeight: 1.25, textAlign: "center",
          whiteSpace: "normal", textWrap: "balance", minWidth: 0,
          fontFamily: "var(--font-sans)", fontWeight: "var(--weight-semibold)",
          background: hover ? "var(--wa-green-press)" : "var(--wa-green-btn)", color: "var(--white)",
          border: "1px solid rgba(20,22,26,.10)", borderRadius: "var(--radius-md)", textDecoration: "none",
          boxShadow: hover && !press ? "0 8px 20px -10px rgba(14,122,62,.6)" : "none",
          transform: press ? "translateY(1px)" : hover ? "translateY(-1px)" : "none",
          transition: "var(--transition-control), transform var(--dur-2) var(--ease-standard)",
          ...style,
        }}
        {...rest}
      >
        {/* flex-shrink:0 so a wrapping label can never squeeze the glyph out of shape.
            Note the glyph is NOT the only signal of destination — the label says "on WhatsApp",
            and the word carries it. That matters: it means the glyph can be removed if WhatsApp's
            brand rules require it, without the control becoming ambiguous. See ASSETS.md §4. */}
        <span style={{ display: "flex", flexShrink: 0 }}><WhatsAppGlyph size={s.glyph} /></span>
        {label}
      </a>
      {note ? <span style={{ display: "block", marginTop: 8, font: "var(--type-small)", color: "var(--text-muted)", textAlign: full ? "center" : "left" }}>{note}</span> : null}
    </span>
  );
}
