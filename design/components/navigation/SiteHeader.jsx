import React from "react";
import { Logo } from "../brand/Logo.jsx";
import { WhatsAppButton } from "../core/WhatsAppButton.jsx";

export function SiteHeader({ links = [], active, onNavigate, phone = "60123456789", sticky = true, style, ...rest }) {
  return (
    <header style={{
      position: sticky ? "sticky" : "static", top: 0, zIndex: 20,
      background: "rgba(251,250,247,.88)", backdropFilter: "blur(8px)",
      borderBottom: "1px solid var(--rule)", ...style,
    }} {...rest}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", padding: "0 var(--gutter)", height: 76, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate("#top"); }} style={{ textDecoration: "none", display: "inline-flex" }}>
          <Logo size={24} />
        </a>
        <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {links.map((l) => (
            <a key={l.href} href={l.href}
              onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(l.href); } }}
              style={{
                font: "var(--type-body)", fontSize: "var(--size-sm)", textDecoration: "none",
                color: active === l.href ? "var(--ink-900)" : "var(--ink-600)",
                borderBottom: `2px solid ${active === l.href ? "var(--ink-900)" : "transparent"}`,
                paddingBottom: 2, transition: "var(--transition-control)",
              }}>{l.label}</a>
          ))}
          {/* Not "WhatsApp me" — WhatsApp's brand rules say don't use the name as a verb. */}
          <WhatsAppButton size="sm" phone={phone} label="Message on WhatsApp" />
        </nav>
      </div>
    </header>
  );
}
