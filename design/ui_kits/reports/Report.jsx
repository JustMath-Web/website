const { Logo, Badge, Card, Callout, ProgressMeter, ScoreTable, Button, SectionHeading } = window.JustMathDesignSystem_270e96;

const MONTHS = {
  "March 2026": {
    summary: "A good month. Quadratics are secure — she solved the whole of Exercise 4.3 without prompting, which she couldn't do in February. Surds are the weak spot and they will come up in the mid-year paper, so that's where we'll spend April.",
    topics: [["Quadratic equations", "secure"], ["Simultaneous equations", "secure"], ["Indices and logarithms", "building"], ["Surds", "practise"]],
    scores: [["Chapter 3 test", 34, 40], ["Chapter 4 test", 28, 40], ["Homework returned", 7, 8]],
    attendance: [["Lessons held", 4], ["Attended", 4], ["Rescheduled", 0]],
    next: "Ten minutes of surds, three times a week. Exercise 5.1, questions 1–8. She does not need more quadratics practice.",
  },
  "February 2026": {
    summary: "Slower month — two lessons landed in the school test week. Quadratics moved from shaky to workable. She still writes the second line before the first; we're working on setting out.",
    topics: [["Quadratic equations", "building"], ["Simultaneous equations", "building"], ["Indices and logarithms", "practise"], ["Surds", "practise"]],
    scores: [["Chapter 3 test", 24, 40], ["Homework returned", 5, 8]],
    attendance: [["Lessons held", 4], ["Attended", 3], ["Rescheduled", 1]],
    next: "Set out every line, even the obvious ones. Exercise 4.2 again, slowly.",
  },
};

function Letterhead({ month }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: 22, borderBottom: "3px solid var(--ink-900)" }}>
      <Logo size={22} />
      <div style={{ textAlign: "right" }}>
        <div style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-muted)" }}>Progress report</div>
        <div style={{ font: "var(--type-body)", fontSize: "var(--size-sm)", fontFamily: "var(--font-mono)", color: "var(--ink-900)", marginTop: 4 }}>{month}</div>
      </div>
    </div>
  );
}

function Block({ title, children, style }) {
  return (
    <section style={{ ...style }}>
      <h3 style={{ font: "var(--type-label)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 14 }}>{title}</h3>
      {children}
    </section>
  );
}

function Report({ month }) {
  const d = MONTHS[month];
  return (
    <article style={{ background: "var(--white)", border: "1px solid var(--rule)", borderRadius: "var(--radius-lg)", padding: 56, maxWidth: "var(--doc-max)", boxShadow: "var(--shadow-1)" }}>
      <Letterhead month={month} />
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 20, margin: "28px 0 8px" }}>
        <h2 style={{ margin: 0 }}>Nurul binti Azman</h2>
        <Badge tone="slate">Form 3 · KSSM</Badge>
      </div>
      <p style={{ font: "var(--type-small)", color: "var(--text-muted)", marginBottom: 34 }}>Tuesdays, 8:00–9:00pm · online, one to one</p>

      <Block title="How this month went" style={{ marginBottom: 34 }}>
        <p style={{ font: "var(--type-body)", margin: 0, maxWidth: "var(--measure)" }}>{d.summary}</p>
      </Block>

      <Block title="Topics" style={{ marginBottom: 34 }}>
        <div style={{ display: "grid", gap: 14 }}>
          {d.topics.map(([t, l]) => <ProgressMeter key={t} topic={t} level={l} />)}
        </div>
      </Block>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr .7fr", gap: 34, marginBottom: 34 }}>
        <Block title="Marks"><ScoreTable columns={["Assessment", "Score", "Out of"]} rows={d.scores} /></Block>
        <Block title="Attendance"><ScoreTable columns={["", ""]} rows={d.attendance} /></Block>
      </div>

      <Callout tone="ochre" title="To practise before the next report">{d.next}</Callout>

      <p style={{ font: "var(--type-small)", color: "var(--text-muted)", marginTop: 34, marginBottom: 0, paddingTop: 20, borderTop: "1px solid var(--rule)" }}>
        Questions about any of this? Message me — it's usually quicker than email.
      </p>
    </article>
  );
}

function ReportKit() {
  const [month, setMonth] = React.useState("March 2026");
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 48, maxWidth: 1120, margin: "0 auto", padding: "48px var(--gutter)", alignItems: "start" }}>
      <Report month={month} />
      <div style={{ width: 260, position: "sticky", top: 48 }}>
        <SectionHeading eyebrow="Reports" title="One page. Every month." />
        <p style={{ font: "var(--type-small)", color: "var(--text-muted)", marginTop: 14 }}>
          Sent at the end of each month. Same four blocks every time so a parent can compare months at a glance.
        </p>
        <div style={{ display: "grid", gap: 8, marginTop: 24 }}>
          {Object.keys(MONTHS).map((m) => (
            <Button key={m} variant={m === month ? "primary" : "quiet"} size="sm" full onClick={() => setMonth(m)}>{m}</Button>
          ))}
        </div>
        <div style={{ marginTop: 24 }}><Button variant="secondary" size="sm" full onClick={() => window.print()}>Print / save as PDF</Button></div>
      </div>
    </div>
  );
}

Object.assign(window, { ReportKit, Report, Letterhead, Block });
