/* Sections 6–10: the tutor, the price, the process, the questions, the close. */

const ABOUT_PARAS = [
  "It is a fair question, and most tutors cannot. The market splits: primary specialists on one side, SPM and Add Maths specialists on the other. Very few people teach both.",
  "I do, and that is the whole reason this works.",
  "Twenty-four years of teaching every level from Standard 1 to Form 5 means I have watched the same students grow up through it. I know which Standard 4 gap turns into which Form 5 failure, because I have taught both ends of it to the same child.",
  "A concrete example. A student who learned to divide fractions by flipping the second one, without ever understanding why, is fine in Standard 5. In Form 2 they hit algebraic fractions and the trick stops working. In Form 5 they hit integration by substitution and it collapses completely. Three different topics, three different school years, one root cause. A tutor who only teaches Form 4 and 5 sees the collapse and treats the symptom.",
  "The same goes the other way. When I teach a Standard 3 student, I already know which of today’s shortcuts will cost them in eight years, so we do not take them.",
  "Ten of those twenty-four years have been online. I started teaching over video in 2016, well before the rest of the market had to, which means the online part of this is not an adaptation I made recently.",
  "Every concept gets explained with an example a student at that level can actually picture, and every calculation gets written out step by step. Not the shortened version a textbook gives. The full version, including the lines that look too obvious to write down.",
  "Every session is taught by me. There is no bench of part-time tutors, and your child will not be handed to someone else next month.",
];

function About() {
  const wide = useDesktop();
  return (
    <Section id="about" ground="sunken">
      <Container>
        <Reveal><Marker n="04" label="The tutor" /></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "minmax(0,300px) minmax(0,1fr)" : "1fr", gap: wide ? "clamp(40px,5.5vw,80px)" : 30, alignItems: "start", marginTop: "clamp(24px,3vw,36px)" }}>
          <Reveal style={{ position: wide ? "sticky" : "static", top: 92 }}>
            <div style={{ width: "100%", aspectRatio: "4 / 5", maxWidth: wide ? undefined : 320, border: "1px solid var(--rule-strong)", background: "var(--white)" }}>
              <image-slot id="mrkong-portrait" shape="rect" fit="cover" placeholder="Portrait of Mr Kong — at the desk where he teaches, screen and writing setup visible"></image-slot>
            </div>
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "2px solid var(--ink-900)", display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <span style={{ font: `var(--weight-semibold) clamp(15px,1.7vw,18px)/1.2 var(--font-serif)`, color: "var(--ink-900)" }}>Mr Kong</span>
              <span style={{ font: `var(--weight-semibold) 10px/1 var(--font-sans)`, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-500)" }}>Just Math Malaysia</span>
            </div>
          </Reveal>
          <div>
            <Reveal><H2 measure="21ch">Can one tutor teach a seven-year-old and an Add Maths student?</H2></Reveal>
            <Reveal delay={80}><Prose paras={ABOUT_PARAS} measure="60ch" style={{ marginTop: "clamp(24px,3vw,36px)" }} /></Reveal>
            <Reveal variant="settle" style={{ marginTop: "clamp(40px,5vw,68px)" }}>
            <div style={{ background: "var(--ink-900)", borderRadius: "var(--radius-lg)", padding: "clamp(26px,3.4vw,44px)", position: "relative", overflow: "hidden" }}>
              <GraphGround invert />
              <div style={{ position: "relative" }}>
                <h3 style={{ font: `var(--weight-semibold) ${T.h3}/1.22 var(--font-serif)`, letterSpacing: "-0.018em", color: "var(--paper)", margin: 0, maxWidth: "30ch" }}>
                  The 500 number, and why it is small on purpose
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: wide ? "auto minmax(0,1fr)" : "1fr", gap: wide ? "clamp(32px,4vw,56px)" : 24, alignItems: "start", marginTop: "clamp(24px,3vw,36px)" }}>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 14, borderRight: wide ? "1px solid rgba(251,250,247,.2)" : undefined, paddingRight: wide ? "clamp(28px,3.4vw,48px)" : 0, paddingBottom: wide ? 0 : 20, borderBottom: wide ? undefined : "1px solid rgba(251,250,247,.2)" }}>
                    <Figure invert value="20" size={T.figureMid} />
                    <span style={{ font: `var(--weight-regular) ${T.small}/1.4 var(--font-sans)`, color: "var(--ink-300)", maxWidth: "8ch", paddingBottom: "0.5em" }}>students a year</span>
                  </div>
                  <Prose invert measure="50ch" paras={[
                    "Over 500 students in 24 years works out to about twenty a year.",
                    "A tuition centre can put 500 students through in a single year, because it teaches them thirty at a time. Every one of my 500 sat in a session with nobody else in it. Different number, different unit.",
                  ]} />
                </div>
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

const ROWS = [
  { level: "Standard 1 to 6", session: "60 min", month: "RM160", each: "RM40" },
  { level: "Form 1 to 3", session: "60 min", month: "RM180", each: "RM45" },
  { level: "Form 4 and 5, Modern Mathematics", session: "60 min", month: "RM200", each: "RM50" },
  { level: "Form 4 and 5, Additional Mathematics", session: "60 min", month: "RM240", each: "RM60" },
  { level: "IGCSE Mathematics and Additional Mathematics", session: "90 min", month: "RM360", each: "RM90", differs: true },
];

const INCLUDED = [
  "Four live one-to-one sessions on Google Meet, taught by me",
  "A written progress summary sent to you at the end of the month, covering what was taught, what improved and what is still weak",
  "Homework set and reviewed out loud in the following session, not marked in silence",
  "A learning plan built from the diagnostic assessment, not a generic syllabus",
  "Sessions taught in English or Bahasa Melayu, whichever your child follows better",
];

function PriceTable() {
  const th = { font: `var(--weight-semibold) 10px/1.25 var(--font-sans)`, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--paper)", background: "var(--ink-900)", padding: "10px 8px", verticalAlign: "bottom" };
  const td = { padding: "clamp(13px,1.6vw,20px) 8px", borderBottom: "1px solid var(--rule)", verticalAlign: "middle" };
  const num = { font: `var(--weight-semibold) clamp(15px,2.1vw,25px)/1 var(--font-mono)`, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.04em", color: "var(--ink-900)", textAlign: "right", whiteSpace: "nowrap" };
  const edge = { borderTop: "1px solid var(--ochre-500)", borderBottom: "1px solid var(--ochre-500)" };
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
      <colgroup><col style={{ width: "38%" }} /><col style={{ width: "16%" }} /><col style={{ width: "23%" }} /><col style={{ width: "23%" }} /></colgroup>
      <thead>
        <tr>
          <th style={{ ...th, textAlign: "left", paddingLeft: 12 }}>Level</th>
          <th style={{ ...th, textAlign: "right" }}>Session</th>
          <th style={{ ...th, textAlign: "right" }}>Per month</th>
          <th style={{ ...th, textAlign: "right", paddingRight: 12 }}>Per session</th>
        </tr>
      </thead>
      <tbody>
        {ROWS.map((r) => (
          /* The row that differs is marked by a full-width ochre rule above and below plus the
             ochre tint — never a coloured left-edge bar, which the brand rules ban outright.
             The 90-minute figure carries the meaning in text, so the tint is never load-bearing. */
          <tr key={r.level} style={{ background: r.differs ? "var(--ochre-100)" : undefined }}>
            <td style={{ ...td, paddingLeft: 12, ...(r.differs ? edge : null), font: `var(--weight-regular) clamp(13px,1.6vw,17px)/1.35 var(--font-sans)`, color: "var(--ink-900)" }}>{r.level}</td>
            <td style={{ ...td, ...(r.differs ? edge : null), font: `var(--weight-${r.differs ? "semibold" : "regular"}) clamp(12px,1.5vw,15px)/1.2 var(--font-mono)`, color: r.differs ? "var(--ochre-600)" : "var(--text-muted)", textAlign: "right", whiteSpace: "nowrap" }}>{r.session}</td>
            <td style={{ ...td, ...(r.differs ? edge : null), ...num }}>{r.month}</td>
            <td style={{ ...td, ...(r.differs ? edge : null), ...num, paddingRight: 12, fontSize: "clamp(13px,1.7vw,19px)", color: "var(--ink-500)" }}>{r.each}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Pricing() {
  const wide = useDesktop();
  return (
    <Section id="pricing">
      <Container>
        <Reveal><Marker n="05" label="Fees" /></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "minmax(0,.85fr) minmax(0,1.15fr)" : "1fr", gap: wide ? "clamp(40px,5.5vw,80px)" : 28, alignItems: "end", marginTop: "clamp(24px,3vw,36px)" }}>
          <Reveal><H2 measure="14ch">One session a week, billed monthly</H2></Reveal>
          <Reveal delay={80}><P size={T.lead} measure="52ch">
            Sessions are one hour, once a week, at the same slot each week. Fees are monthly and cover four sessions. Some months have a fifth, and that session is charged at the same rate.
          </P></Reveal>
        </div>
        <Reveal style={{ marginTop: "clamp(32px,4vw,52px)" }}>
          <PriceTable />
          <P size={T.small} muted style={{ marginTop: 16, maxWidth: "56ch" }}>
            IGCSE runs at 90 minutes because the international syllabus moves faster than the national one and an hour a week does not keep pace with it.
          </P>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "minmax(0,1.15fr) minmax(0,.85fr)" : "1fr", gap: wide ? "clamp(40px,5vw,76px)" : 36, marginTop: "clamp(44px,5.5vw,80px)" }}>
          <Reveal>
            <H3 style={{ fontSize: "clamp(18px,2vw,22px)" }}>Every month includes:</H3>
            <List items={INCLUDED} style={{ marginTop: 22 }} />
            <Prose paras={[
              "Fees are paid before the first session of each month, by DuitNow or bank transfer. Rates shown apply for 2026 and are reviewed once a year.",
              "Before any of that, the 30-minute assessment is free and you are under no obligation to continue afterwards.",
            ]} size={T.small} style={{ marginTop: 26 }} />
          </Reveal>
          <Reveal delay={100} style={{ alignSelf: "start" }}>
          <div style={{ border: "1px solid var(--rule-strong)", borderTop: "3px solid var(--ink-900)", borderRadius: "var(--radius-lg)", padding: "clamp(24px,3vw,36px)", background: "var(--white)" }}>
            <H3 style={{ fontSize: "clamp(18px,2vw,22px)" }}>Availability</H3>
            <div style={{ display: "grid", gap: 2, marginTop: 22 }}>
              <div style={{ font: `var(--weight-medium) ${T.micro}/1.2 var(--font-mono)`, color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Monday to Friday</div>
              {[["3pm", "6pm", "primary"], ["8pm", "11pm", "upper secondary"]].map(([a, b, who]) => (
                <div key={a} style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, paddingBlock: 10, borderBottom: "1px solid var(--rule)" }}>
                  <span style={{ font: `var(--weight-semibold) clamp(21px,2.9vw,32px)/1.1 var(--font-mono)`, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.045em", color: "var(--ink-900)", whiteSpace: "nowrap" }}>{a}–{b}</span>
                  <span style={{ font: `var(--weight-regular) ${T.micro}/1.2 var(--font-sans)`, color: "var(--text-muted)" }}>{who}</span>
                </div>
              ))}
            </div>
            <Prose paras={[
              "Monday to Friday, in two blocks: 3pm to 6pm, and 8pm to 11pm.",
              "The late block exists because Form 4 and Form 5 students are usually not free before then. The afternoon block is where most primary students sit.",
              "Slots go on a first come, first served basis, and once yours is agreed it stays yours every week. WhatsApp me for what is currently open.",
            ]} size={T.small} style={{ marginTop: 20 }} />
          </div>
          </Reveal>
        </div>
        <Reveal><Cta align="center" style={{ marginTop: "clamp(44px,5.5vw,72px)" }} /></Reveal>
      </Container>
    </Section>
  );
}

const STEPS = [
  { h: "Message me on WhatsApp", p: "Tell me what standard or form your child is in. That is all I need to get started." },
  { h: "Free 30-minute assessment on Google Meet", p: "Your child works through problems with me while I watch how they think, not just whether they get the answer. You are welcome to sit in." },
  { h: "You get the findings", p: "I tell you what is solid, what is weak, and which earlier topic is causing the current problem. If I think your child does not need tutoring, I will say so." },
  { h: "Your weekly slot starts", p: "If you want to go ahead, we agree a slot from what is available, weekly and the same time each week. The first month’s fee is settled before the first session, and we start on the plan from the assessment." },
];

function HowItWorks() {
  const wide = useDesktop();
  return (
    <Section id="how" ground="sunken">
      <Container>
        <Reveal><Marker n="06" label="How it works" /></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "repeat(4,minmax(0,1fr))" : "1fr", gap: wide ? "clamp(24px,2.8vw,40px)" : 0, marginTop: "clamp(28px,3.4vw,48px)" }}>
          {STEPS.map((s, i) => (
            <Reveal key={s.h} delay={i * 90} style={{ position: "relative", paddingTop: 26, borderTop: "3px solid var(--ink-900)", paddingBottom: wide ? 0 : 28 }}>
              <span aria-hidden="true" style={{ position: "absolute", top: -3, left: 0, width: 3, height: 14, background: "var(--ink-900)" }} />
              <div style={{ font: `var(--weight-semibold) ${T.figureMid}/0.86 var(--font-mono)`, letterSpacing: "-0.05em", color: "var(--ink-900)" }}>{String(i + 1).padStart(2, "0")}</div>
              <H3 style={{ marginTop: 18, fontSize: "clamp(17px,1.9vw,21px)" }}>{s.h}</H3>
              <P size={T.small} style={{ marginTop: 10 }}>{s.p}</P>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const FAQ = [
  { q: "How long is each session, and how often?", a: "One hour a week for Standard 1 to Form 5, at the same slot each week. IGCSE students take 90 minutes a week, because that syllabus moves faster and an hour does not keep up with it." },
  { q: "Do you teach on weekends?", a: "Not at the moment. Sessions run Monday to Friday, in the two blocks above. If neither window works for your family, message me anyway and say so. I keep a note of who is waiting on a different time, and if that changes you will hear from me." },
  { q: "Can sessions fit around school and my child’s existing tuition?", a: "Slots run weekday afternoons from 3pm to 6pm and weekday evenings from 8pm to 11pm, and you keep the same weekly slot once it is agreed. The evening block was set up for upper secondary students who are not free until after dinner. If your child is in an afternoon school session, the 3pm to 6pm window will not work and the evening one is late for a younger child, so message me before booking an assessment and we will check there is a slot that fits. Because sessions are online there is no travel to schedule around either way." },
  { q: "What language do you teach in?", a: "English or Bahasa Melayu, and I switch between them during a session when that is what helps. Some students follow the maths perfectly well but lose marks because the wording of the question is in the language they are weaker in. That is worth sorting out separately from the maths." },
  { q: "My child is seven. Can they hold attention online for an hour?", a: "Some can, many cannot, and I would rather say that plainly. For younger primary students I keep the pace changing every few minutes and use the whiteboard heavily so they are doing something rather than listening. If an hour is genuinely too long for your child, tell me at the assessment and we will look at shorter, more frequent sessions instead." },
  { q: "Do you follow the school syllabus and textbook?", a: "Yes. Teaching follows the national KSSR and KSSM syllabus, and I also teach the IGCSE syllabus for students in international schools. We work from your child’s own school textbook and exercise book so what we do in a session lines up with what they see in class the next day. Where a gap from an earlier year is causing the current problem, we go back and fix that first, then return to the current chapter." },
  { q: "Do you teach STPM or pre-university maths?", a: "No. Teaching goes up to SPM and IGCSE. After that you want someone who specialises in it, and I would rather say so than take the booking." },
  { q: "What actually happens in the free assessment?", a: "Thirty minutes on Google Meet, your child and me. I give them problems starting slightly below their current level and work upward until we find where it breaks. I am watching their method, not just the answer, because a wrong method that happens to produce a right answer is the thing that causes trouble later. There is no test paper, no score, and nothing for your child to prepare." },
  { q: "What happens after the assessment?", a: "I tell you what I found: which topics are solid, which are weak, and which earlier concept is causing the current difficulty. If tutoring makes sense I will tell you what I would work on and how long I think it takes. If I do not think your child needs tutoring, I will tell you that instead. There is no obligation either way and I do not follow up repeatedly." },
  { q: "Can we reschedule a session?", a: "Yes. Give me one week’s notice and the session moves to another available slot that month, at no extra cost." },
  { q: "How and when do I pay?", a: "Monthly, before the first session of the month, by DuitNow or bank transfer. There is nothing to pay for the assessment, and nothing is charged until you have decided to go ahead. Fees are not taken in advance beyond the month you are in." },
  { q: "How will I know if my child is improving?", a: "At the end of every month I send you a written progress summary covering what was taught, what improved, what is still weak, and what comes next. You can also sit in on any session. If something is not working I will tell you before you have to ask." },
  { q: "Will the same tutor teach every session?", a: "Yes. I teach every session myself. There are no assistant tutors and no substitutions." },
];

/* Fallback used only if the design-system Accordion is not on window. It MUST carry the same
   accessibility contract as `components/feedback/Accordion.jsx` — a fallback that silently
   drops aria-controls / region / inert is worse than no fallback, because the page still
   renders and the loss is invisible. Keep the two in step. */
function PlainAccordion({ items, defaultOpen = 0, idPrefix = "faq" }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [hover, setHover] = React.useState(-1);
  return (
    <div style={{ borderTop: "1px solid var(--rule)" }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const btnId = `${idPrefix}-q-${i}`;
        const panelId = `${idPrefix}-a-${i}`;
        const bar = { position: "absolute", top: "50%", left: "50%", background: "var(--ink-600)", transition: "transform var(--dur-3) var(--ease-standard)" };
        return (
          <div key={i} style={{ borderBottom: "1px solid var(--rule)" }}>
            <button id={btnId} onClick={() => setOpen(isOpen ? -1 : i)} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)} aria-expanded={isOpen} aria-controls={panelId}
              style={{ display: "flex", width: "100%", gap: 16, alignItems: "flex-start", justifyContent: "space-between", background: "none", border: 0, padding: "20px 0", cursor: "pointer", textAlign: "left", font: `var(--weight-medium) clamp(16px,1.7vw,19px)/1.4 var(--font-sans)`, color: hover === i || isOpen ? "var(--ink-900)" : "var(--ink-700)", transition: "color var(--dur-1) var(--ease-standard)" }}>
              <span>{it.q}</span>
              <span aria-hidden="true" style={{ position: "relative", flex: "none", width: 15, height: 15, marginTop: 5 }}>
                <span style={{ ...bar, width: "100%", height: 2, transform: `translate(-50%,-50%) rotate(${isOpen ? 180 : 0}deg)` }} />
                <span style={{ ...bar, width: 2, height: "100%", transform: `translate(-50%,-50%) rotate(${isOpen ? 270 : 0}deg)` }} />
              </span>
            </button>
            <div id={panelId} role="region" aria-labelledby={btnId} inert={isOpen ? undefined : ""}
              style={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "opacity var(--dur-3) var(--ease-standard)" }}>
              <P size={T.body} style={{ marginBottom: 24 }}>{it.a}</P>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Faq() {
  const Accordion = (window.JustMathDesignSystem_270e96 || {}).Accordion || PlainAccordion;
  const wide = useDesktop();
  return (
    <Section id="faq">
      <Container>
        <Reveal><Marker n="07" label="Questions" /></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "minmax(0,270px) minmax(0,1fr)" : "1fr", gap: wide ? "clamp(40px,5vw,80px)" : 26, alignItems: "start", marginTop: "clamp(24px,3vw,36px)" }}>
          <Reveal style={{ position: wide ? "sticky" : "static", top: 92 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
              <Figure value="13" size={T.figureMid} />
              <span style={{ font: `var(--weight-regular) ${T.small}/1.4 var(--font-sans)`, color: "var(--text-muted)", maxWidth: "12ch", paddingBottom: "0.5em" }}>things parents ask before booking</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Accordion items={FAQ} defaultOpen={0} />
            <Cta align="center" style={{ marginTop: "clamp(36px,4.5vw,60px)" }} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function FinalCta() {
  return (
    <Section id="start" ground="ink" graph>
      <Container style={{ maxWidth: 800, textAlign: "center" }}>
        <Reveal variant="settle">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 14, marginBottom: "clamp(20px,2.6vw,32px)" }}>
          <span style={{ font: `var(--weight-semibold) ${T.figureMid}/0.86 var(--font-mono)`, letterSpacing: "-0.05em", color: "var(--paper)" }}>30</span>
          <span style={{ font: `var(--weight-regular) ${T.small}/1.3 var(--font-sans)`, color: "var(--ink-300)" }}>minutes, free</span>
        </div>
        <H2 invert measure="16ch" style={{ marginInline: "auto" }}>Start with the 30 minutes</H2>
        <Prose invert size={T.lead} measure="52ch" paras={[
          "The assessment is free, takes half an hour, and happens on Google Meet. At the end you will know where your child’s maths actually stands and what is causing the problem.",
          "If the answer is that they are fine, I will tell you that and you will have spent thirty minutes finding out. Nobody will chase you afterwards.",
        ]} style={{ marginTop: 24, justifyItems: "center", textAlign: "center", marginInline: "auto" }} />
        <Cta align="center" style={{ marginTop: "clamp(32px,4vw,48px)" }} />
        <p style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid rgba(251,250,247,.18)", font: `var(--weight-regular) ${T.small}/1.6 var(--font-sans)`, color: "var(--ink-300)", maxWidth: "46ch", marginInline: "auto" }}>
          Mr Kong, Just Math Malaysia. WhatsApp 019 472 8768. Taught online across Malaysia, in English and Bahasa Melayu.
        </p>
        </Reveal>
      </Container>
    </Section>
  );
}

function Landing() {
  return (
    <div>
      <PageHeader />
      <Hero />
      <TrustBar />
      <Problem />
      <WhyOneToOne />
      <Levels />
      <About />
      <Pricing />
      <HowItWorks />
      <Faq />
      <FinalCta />
    </div>
  );
}

Object.assign(window, { About, Pricing, PriceTable, HowItWorks, Faq, FinalCta, Landing, PlainAccordion });
