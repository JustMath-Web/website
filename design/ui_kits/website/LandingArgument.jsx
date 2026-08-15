/* Sections 3–5: the argument. */

const PROBLEM_PARAS = [
  "Here is when a Malaysian student’s maths gets independently measured now.",
  "Year 4, from October 2026. The Examinations Board runs the new Learning Matrix nationally, and Mathematics is one of the four papers. The Ministry has been clear that it is a diagnostic rather than a ranking exercise, and that the point is to give schools time to intervene in Years 5 and 6.",
  "Form 3, from 2027. Same idea, five papers this time.",
  "Then SPM.",
  "That is the whole picture. Nothing in Standard 1, 2 or 3. Nothing in Standard 5 or 6. Nothing in Form 1, Form 2 or Form 4. And the longest unchecked stretch in the entire system is the one that matters most: from the Form 3 assessment to the SPM paper, your child sits Form 4 and Form 5 with no independent measure of their maths at all. Form 4 is also the year Additional Mathematics arrives and starts charging interest on every gap left over from earlier.",
  "School reports fill some of that space, and good teachers catch a lot. But a report card gives you a grade. It rarely tells you that your Form 2 student is struggling with algebraic fractions because they never understood a fraction as a division in the first place, six years earlier.",
  "That is a different question, and it takes someone sitting with the child for half an hour to answer it.",
];

const MEASURED = { "Standard 4": "OCT 2026", "Form 3": "FROM 2027", "Form 5": "SPM" };

function Problem() {
  const wide = useDesktop();
  return (
    <Section id="problem" ruled>
      <Container>
        <Reveal><Marker n="01" label="The gap" /></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "minmax(0,1.08fr) minmax(0,1fr)" : "1fr", gap: wide ? "clamp(44px,6vw,88px)" : 40, alignItems: "start", marginTop: "clamp(24px,3vw,36px)" }}>
          <div style={{ position: wide ? "sticky" : "static", top: 92 }}>
            <Reveal>
              <H2 measure="19ch">The school system checks your child’s maths twice before SPM</H2>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 18, marginTop: "clamp(26px,3.2vw,40px)" }}>
                <Figure value="2" size={T.figure} />
                <span style={{ font: `var(--weight-regular) ${T.small}/1.45 var(--font-sans)`, color: "var(--text-muted)", maxWidth: "16ch", paddingBottom: "0.6em" }}>
                  independent checks in eleven years of schooling
                </span>
              </div>
            </Reveal>
            {/* still: the bars growing from the baseline are the motion here — a wrapper
                fade-up would compete with the thing it is meant to reveal. */}
            <Reveal variant="still"><GapChart style={{ marginTop: "clamp(26px,3.2vw,40px)" }} /></Reveal>
          </div>
          <Reveal delay={80}><Prose paras={PROBLEM_PARAS} /></Reveal>
        </div>
      </Container>
    </Section>
  );
}

const WHY_OPENING = [
  "Every session is live on Google Meet, one tutor and your child. No recordings to work through alone, no worksheets emailed over and marked later, no class of twenty where the quiet ones stay quiet.",
  "The first ten minutes are usually the last session’s homework, worked out loud. Not marked in silence. Worked out loud, so the mistake gets caught at the exact step where it happens. A child who writes the right answer for the wrong reason looks identical to a child who understands it, right up until the topic gets harder.",
  "Then new material, at whatever pace the child actually moves. If Standard 4 fractions are still shaky in Form 1, we go back and fix fractions. A centre working through a fixed syllabus on a fixed schedule cannot do that. It is not the tutor’s fault, there are nineteen other students in the room.",
];

const WHY_PARTS = [
  { h: "Every step, written out", p: ["Working is shown line by line, every time, including the steps most people skip because they seem obvious. The steps that seem obvious to a teacher are usually the exact ones a struggling student cannot see. A student who watches a solution appear in three lines learns nothing. A student who watches it appear in eleven can reproduce it on their own."] },
  { h: "Online is not a downgrade, and I have ten years of evidence", p: ["I moved teaching online in 2016, four years before everyone else had to. Screen sharing and a shared digital whiteboard mean you see the working step by step in both directions, which for maths is closer to sitting beside someone than a classroom is, because in a classroom the student is looking at a board six metres away.", "No travel either. That is thirty to sixty minutes a day back, and for a Form 5 student in the middle of SPM year that is not a small thing."] },
  { h: "Taught in the language your child thinks in", p: ["Sessions run in English or Bahasa Melayu, and switch mid-explanation when that is what it takes. A student who understands the maths but not the wording of the question does not have a maths problem, and treating it as one wastes everybody’s time."] },
  { h: "How you see progress", p: ["At the end of every month you get a written progress summary: what was covered, what improved, what is still weak, what we are working on next. Not a WhatsApp message saying “she’s doing well.”"] },
  { h: "What a self-study app cannot do", p: ["An app can tell you a question was answered wrongly. It cannot tell you why. The why is almost always a concept from two or three years earlier, and finding it is the job."] },
];

/* Modern card: hairline that inks on hover, index chip, lift. */
function WhyCard({ index, title, paras, feature, wide }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        position: "relative", height: "100%", background: "var(--white)",
        border: `1px solid ${hover ? "var(--ink-900)" : "var(--rule)"}`,
        borderRadius: "var(--radius-lg)", padding: "clamp(22px,2.8vw,34px)", overflow: "hidden",
        boxShadow: hover ? "var(--shadow-lift)" : "var(--shadow-1)",
        transform: hover ? "translateY(-3px)" : "none",
        transition: "transform var(--dur-3) var(--ease-standard), box-shadow var(--dur-3) var(--ease-standard), border-color var(--dur-2) var(--ease-standard)",
      }}
    >
      <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--ink-900)", transform: hover ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform var(--dur-4) var(--ease-out)" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 30, height: 24, padding: "0 8px",
          borderRadius: "var(--radius-sm)", background: hover ? "var(--ink-900)" : "var(--surface-sunken)",
          font: `var(--weight-semibold) 12px/1 var(--font-mono)`, letterSpacing: "0.02em",
          color: hover ? "var(--paper)" : "var(--ink-500)", transition: "var(--transition-control)",
        }}>{index}</span>
        <span aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--rule)" }} />
      </div>
      <H3 style={{ fontSize: feature ? "clamp(20px,2.4vw,28px)" : "clamp(18px,2vw,22px)" }}>{title}</H3>
      <Prose paras={paras} size={feature ? T.body : T.small} style={{ marginTop: 14, maxWidth: "48ch" }} />
    </div>
  );
}

function WhyOneToOne() {
  const wide = useDesktop();
  return (
    <Section id="sessions" ground="sunken">
      <Container>
        <Reveal><Marker n="02" label="One to one" /></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "minmax(0,.9fr) minmax(0,1.1fr)" : "1fr", gap: wide ? "clamp(44px,6vw,88px)" : 32, alignItems: "start", marginTop: "clamp(24px,3vw,36px)" }}>
          <Reveal><H2 measure="15ch">What a session actually looks like</H2></Reveal>
          <Reveal delay={80}><Prose paras={WHY_OPENING} size={T.lead} measure="56ch" /></Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "repeat(6,1fr)" : "1fr", gap: wide ? "clamp(20px,2.4vw,32px)" : 20, marginTop: "clamp(48px,6vw,88px)" }}>
          {WHY_PARTS.map((s, i) => (
            <Reveal key={s.h} delay={(i % 3) * 90} style={{ gridColumn: wide ? (i < 2 ? "span 3" : "span 2") : undefined }}>
              <WhyCard index={String(i + 1).padStart(2, "0")} title={s.h} paras={s.p} feature={i < 2} wide={wide} />
            </Reveal>
          ))}
        </div>
        <Reveal><Cta align="center" style={{ marginTop: "clamp(44px,5.5vw,72px)" }} /></Reveal>
      </Container>
    </Section>
  );
}

const LEVELS = [
  {
    range: "Standard 1–6",
    span: "Ages 7 to 12",
    dek: "Building number confidence before the gaps become invisible.",
    items: [
      "Arithmetic fluency, place value, fractions and decimals, and word problems where the maths is easy but reading the question is not.",
      "Early maths anxiety, usually caused by a child being moved on before the previous idea was solid.",
      "If your child is in Year 4 this year, they sit the Learning Matrix maths paper on 6 to 8 October. An assessment now tells you what they will find out in October, with Years 5 and 6 still available to act on it.",
    ],
  },
  {
    range: "Form 1–3",
    span: "Lower secondary",
    dek: "Where maths stops being arithmetic and starts being abstract.",
    items: [
      "Algebraic expressions, indices, linear equations, and the general shift from working with numbers to working with letters. This is where most students who “were always good at maths” first stall.",
      "Gaps from primary school surface here, and they surface quietly, as slightly lower marks rather than obvious failure.",
      "Form 3 ends with the stream decision. Whether Additional Mathematics is realistic in Form 4 depends on how solid the algebra is now, and that is worth knowing before the form gets signed.",
    ],
  },
  {
    range: "Form 4–5",
    span: "SPM years",
    dek: "Modern Mathematics, Additional Mathematics, and the SPM paper.",
    items: [
      "Additional Mathematics: functions, quadratic equations, indices and logarithms, progressions, trigonometry, differentiation and integration. Every one of these sits on Form 1 to Form 3 algebra, which is why Add Maths punishes students who were carried through lower secondary.",
      "Modern Mathematics for SPM, including the topics students routinely drop marks on for reasons of technique rather than understanding.",
      "Exam technique and timing. Knowing the maths and finishing the paper are two different skills, and only one of them gets taught in school.",
      "If STPM, matrikulasi or a foundation programme is the plan after SPM, the maths grade requirement is worth checking early rather than in Form 5.",
    ],
  },
  {
    range: "IGCSE",
    span: "International syllabus",
    dek: "Same tutor, different syllabus.",
    items: [
      "IGCSE Mathematics and IGCSE Additional Mathematics, taught to the international syllabus rather than translated across from SPM.",
      "International school students in the years below IGCSE are welcome. The maths underneath is the same maths, and the gaps show up in the same places.",
    ],
  },
];

function Levels() {
  const wide = useDesktop();
  return (
    <Section id="levels" ruled>
      <Container>
        <Reveal><Marker n="03" label="Levels taught" /></Reveal>
        <div style={{ marginTop: "clamp(28px,3.4vw,44px)" }}>
          {LEVELS.map((l, i) => (
            <Reveal key={l.range} style={{
              display: "grid", gridTemplateColumns: wide ? "minmax(0,.72fr) minmax(0,1.28fr)" : "1fr",
              gap: wide ? "clamp(32px,5vw,80px)" : 20,
              paddingBlock: "clamp(30px,4vw,52px)",
              borderTop: `${i === 0 ? 3 : 1}px solid ${i === 0 ? "var(--ink-900)" : "var(--rule-strong)"}`,
              alignItems: "start",
            }}>
              <div style={{ position: wide ? "sticky" : "static", top: 92 }}>
                <div style={{ font: `var(--weight-medium) ${T.micro}/1 var(--font-mono)`, color: "var(--text-faint)", marginBottom: 12 }}>{String(i + 1).padStart(2, "0")} / 04</div>
                <div style={{ font: `var(--weight-semibold) clamp(28px,4vw,50px)/0.98 var(--font-serif)`, letterSpacing: "-0.035em", color: "var(--ink-900)" }}>{l.range}</div>
                <div style={{ marginTop: 10, font: `var(--weight-medium) ${T.small}/1.3 var(--font-mono)`, color: "var(--ochre-600)", letterSpacing: "0.01em" }}>{l.span}</div>
              </div>
              <div>
                <P size={T.lead} measure="38ch" style={{ color: "var(--ink-900)", fontFamily: "var(--font-serif)", lineHeight: 1.34 }}>{l.dek}</P>
                <List items={l.items} style={{ marginTop: 24, maxWidth: "58ch" }} />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal style={{ marginTop: "clamp(36px,4.5vw,64px)" }}>
          <div style={{ background: "var(--surface-sunken)", borderRadius: "var(--radius-lg)", padding: "clamp(28px,4vw,52px)" }}>
            <p style={{ font: `var(--weight-regular) clamp(20px,2.9vw,34px)/1.32 var(--font-serif)`, letterSpacing: "-0.022em", color: "var(--ink-900)", margin: 0, maxWidth: "40ch", textWrap: "pretty" }}>
              Standard 1 through Form 5, and IGCSE. Teaching ends at SPM and IGCSE level. No STPM, matrikulasi, foundation or university mathematics, and I would rather tell you that now than take the booking.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

Object.assign(window, { Problem, WhyOneToOne, WhyCard, Levels });
