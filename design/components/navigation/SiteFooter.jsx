import React from "react";
import { Logo } from "../brand/Logo.jsx";

export function SiteFooter({ columns = [], note, phone = "+60 12-345 6789", email = "hello@mathematicsmalaysia.com", style, ...rest }) {
  return (
    <footer style={{ background: "var(--ink-900)", color: "var(--paper)", ...style }} {...rest}>
      <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", padding: "64px var(--gutter) 48px", display: "grid", gridTemplateColumns: "1.4fr repeat(auto-fit, minmax(140px, 1fr))", gap: 48 }}>
        <div>
          <Logo reversed size={22} />
          <p style={{ marginTop: 18, marginBottom: 0, font: "var(--type-small)", color: "var(--ink-300)", maxWidth: "34ch" }}>
            One tutor, one student. Online lessons across Malaysia.
          </p>
        </div>
        {columns.map((c) => (
          <div key={c.title}>
            <div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--ink-400)", marginBottom: 14 }}>{c.title}</div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
              {c.items.map((i) => (
                <li key={i.label}><a href={i.href || "#"} style={{ font: "var(--type-small)", color: "var(--paper)", textDecoration: "none", opacity: 0.86 }}>{i.label}</a></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--ink-400)", marginBottom: 14 }}>Get in touch</div>
          <div style={{ display: "grid", gap: 10, font: "var(--type-small)", color: "var(--paper)" }}>
            <span style={{ fontFamily: "var(--font-mono)" }}>{phone}</span>
            <a href={`mailto:${email}`} style={{ color: "var(--paper)", textDecoration: "none", opacity: 0.86 }}>{email}</a>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(251,250,247,.14)" }}>
        <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", padding: "20px var(--gutter)", font: "var(--type-small)", color: "var(--ink-400)" }}>
          {note || "© 2026 Just Math Malaysia"}
        </div>
      </div>
    </footer>
  );
}
