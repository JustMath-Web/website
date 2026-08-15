const { Logo, Badge, Button, Card, WhatsAppButton } = window.JustMathDesignSystem_270e96;

/* A stylised representation of the booking conversation as a parent experiences it.
   Not a recreation of the WhatsApp client — generic thread chrome, brand colours. */

const SCRIPT = [
  { from: "parent", text: "Hi, I saw your site. My son is Form 4, Add Maths. He failed the last test." },
  { from: "tutor", text: "Thanks for messaging. Which chapters was the test on?" },
  { from: "parent", text: "Functions and quadratics I think." },
  { from: "tutor", text: "That's the usual pair. Two slots free this week — Tuesday 8pm or Saturday 10am. One hour, RM90, paid after." },
];

const CHOICES = [
  { id: "tue", label: "Tuesday 8pm", reply: "Tuesday 8pm works." },
  { id: "sat", label: "Saturday 10am", reply: "Saturday 10am please." },
  { id: "ask", label: "Ask something first", reply: "Before we book — is it on Zoom or something else?" },
];

const FOLLOWUP = {
  tue: [{ from: "tutor", text: "Booked — Tuesday 8pm. I'll send the whiteboard link an hour before. Nothing to install.", card: { day: "Tuesday", time: "8:00–9:00pm", who: "Form 4 · Additional Mathematics" } }],
  sat: [{ from: "tutor", text: "Booked — Saturday 10am. I'll send the whiteboard link an hour before. Nothing to install.", card: { day: "Saturday", time: "10:00–11:00am", who: "Form 4 · Additional Mathematics" } }],
  ask: [{ from: "tutor", text: "A shared whiteboard in the browser — nothing to install. I record nothing; you're welcome to sit in." }, { from: "tutor", text: "Tuesday 8pm or Saturday 10am, whichever suits." }],
};

function Bubble({ from, children }) {
  const mine = from === "parent";
  return (
    <div style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start" }}>
      <div style={{
        maxWidth: "78%", padding: "10px 14px", borderRadius: "var(--radius-lg)",
        background: mine ? "var(--wa-green-100)" : "var(--white)",
        border: "1px solid " + (mine ? "transparent" : "var(--rule)"),
        font: "var(--type-body)", fontSize: "var(--size-sm)", lineHeight: 1.5, color: "var(--ink-900)",
        boxShadow: "var(--shadow-1)",
      }}>{children}</div>
    </div>
  );
}

function BookingCard({ day, time, who }) {
  return (
    <div style={{ background: "var(--white)", border: "1px solid var(--rule)", borderTop: "3px solid var(--ink-900)", borderRadius: "var(--radius-lg)", padding: 16, boxShadow: "var(--shadow-1)", maxWidth: "82%" }}>
      <div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>Lesson confirmed</div>
      <div style={{ font: "var(--weight-semibold) var(--size-md)/1.25 var(--font-serif)", color: "var(--ink-900)" }}>{day} · {time}</div>
      <div style={{ font: "var(--type-small)", color: "var(--text-muted)", marginTop: 6 }}>{who}</div>
      <div style={{ display: "flex", gap: 16, marginTop: 14, font: "var(--type-small)", color: "var(--ink-700)", fontFamily: "var(--font-mono)" }}>
        <span>RM90</span><span>60 min</span><span>1:1</span>
      </div>
    </div>
  );
}

function Phone({ children }) {
  return (
    <div style={{ width: 390, background: "var(--paper)", border: "1px solid var(--rule-strong)", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-lift)", display: "flex", flexDirection: "column", height: 760 }}>
      {children}
    </div>
  );
}

function Thread() {
  const [step, setStep] = React.useState(0);
  const [messages, setMessages] = React.useState(SCRIPT);
  const [done, setDone] = React.useState(false);
  const choose = (c) => {
    const next = [...messages, { from: "parent", text: c.reply }, ...FOLLOWUP[c.id]];
    setMessages(next);
    setStep(step + 1);
    if (c.id !== "ask") setDone(true);
  };
  const reset = () => { setMessages(SCRIPT); setStep(0); setDone(false); };

  return (
    <Phone>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "var(--ink-900)", color: "var(--paper)" }}>
        <img src="../../assets/monogram-operators-invert.svg" width="40" height="40" alt="" style={{ borderRadius: "999px", border: "1px solid rgba(251,250,247,.2)" }} />
        <div>
          <div style={{ font: "var(--type-body)", fontSize: "var(--size-sm)", fontWeight: "var(--weight-semibold)" }}>Just Math Malaysia</div>
          <div style={{ font: "var(--type-small)", fontSize: 12, color: "var(--ink-300)" }}>Business account · typically replies same day</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "grid", gap: 10, alignContent: "start", background: "var(--paper-2)" }}>
        <div style={{ justifySelf: "center", font: "var(--type-small)", fontSize: 12, color: "var(--text-muted)", background: "var(--paper)", border: "1px solid var(--rule)", borderRadius: "var(--radius-pill)", padding: "3px 12px" }}>Today</div>
        {messages.map((m, i) => (
          <React.Fragment key={i}>
            <Bubble from={m.from}>{m.text}</Bubble>
            {m.card ? <BookingCard {...m.card} /> : null}
          </React.Fragment>
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--rule)", padding: 14, background: "var(--paper)" }}>
        {done ? (
          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ font: "var(--type-small)", color: "var(--text-muted)" }}>That's the whole booking flow — four messages, no forms.</div>
            <Button variant="quiet" size="sm" onClick={reset}>Replay the conversation</Button>
          </div>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            <div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-faint)" }}>Reply</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {CHOICES.map((c) => (
                <button key={c.id} onClick={() => choose(c)} style={{
                  font: "var(--type-body)", fontSize: "var(--size-xs)", fontFamily: "var(--font-sans)", fontWeight: "var(--weight-medium)",
                  height: 36, padding: "0 14px", cursor: "pointer", color: "var(--ink-900)",
                  background: "var(--white)", border: "1px solid var(--rule-strong)", borderRadius: "var(--radius-pill)",
                }}>{c.label}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Phone>
  );
}

function BookingKit() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "390px 1fr", gap: 56, alignItems: "start", maxWidth: 1040, margin: "0 auto", padding: "48px var(--gutter)" }}>
      <Thread />
      <div style={{ paddingTop: 12 }}>
        <Logo size={22} />
        <h2 style={{ marginTop: 28 }}>The booking flow is a conversation.</h2>
        <p style={{ font: "var(--type-body)", color: "var(--text-muted)", maxWidth: "44ch", marginTop: 14 }}>
          There is no calendar widget and no account. A parent messages, gets two times, picks one. The confirmation is a card in the thread.
        </p>
        <div style={{ display: "grid", gap: 14, marginTop: 28 }}>
          {[
            ["Entry", "Every green control on the site opens this thread with the message prefilled."],
            ["Avatar", "The operator mark, reversed, at 40px — the only place the mark appears in WhatsApp."],
            ["Tone", "Short lines. A time, a price, what happens next. No emoji, no exclamation marks."],
            ["Confirmation", "An ink-ruled card: day, time, level, fee, length. Nothing a parent has to remember."],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 16, paddingBottom: 14, borderBottom: "1px solid var(--rule)" }}>
              <span style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-faint)" }}>{k}</span>
              <span style={{ font: "var(--type-small)", color: "var(--ink-700)" }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28 }}><WhatsAppButton size="md" label="Start this thread" note="This is what the parent taps on the site." /></div>
      </div>
    </div>
  );
}

Object.assign(window, { BookingKit, Thread, Bubble, BookingCard });
