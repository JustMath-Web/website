/* The two blog page templates: archive and single post. */

const { SiteFooter } = window.JustMathDesignSystem_270e96;

function PageShell({ children }) {
  return (
    <React.Fragment>
      <PageHeader />
      <main id="main">{children}</main>
      <footer style={{ background: "var(--ink-900)", color: "var(--ink-300)", paddingBlock: "clamp(40px,5vw,64px)", marginTop: "clamp(48px,6vw,88px)" }}>
        <Container>
          <p style={{ margin: 0, font: `var(--weight-regular) ${T.small}/1.6 var(--font-sans)`, maxWidth: "56ch" }}>
            Mr Kong, Just Math Malaysia. WhatsApp 019 472 8768. Taught online across Malaysia, in English and Bahasa Melayu.
          </p>
        </Container>
      </footer>
    </React.Fragment>
  );
}

/* ── Archive ────────────────────────────────────────────────────────── */

function BlogArchive() {
  const wide = useDesktop();
  return (
    <PageShell>
      <Section id="top" graph>
        <Container>
          <Reveal>
            <p style={{ margin: 0, font: `var(--weight-semibold) ${T.micro}/1 var(--font-sans)`, letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-muted)" }}>Notes</p>
            <h1 style={{ margin: "14px 0 0", font: `var(--weight-semibold) clamp(34px,5vw,58px)/1.06 var(--font-serif)`, letterSpacing: "-0.022em", color: "var(--ink-900)", maxWidth: "18ch", textWrap: "balance" }}>
              Where maths goes wrong, and what to do about it
            </h1>
            <p style={{ margin: "20px 0 0", font: `var(--weight-regular) ${T.lead}/1.5 var(--font-sans)`, color: "var(--text-muted)", maxWidth: "52ch" }}>
              Written for parents, filed by syllabus level. No revision hacks, no exam countdowns — just the
              places the same mistakes keep appearing, and how to tell if your child is making one.
            </p>
          </Reveal>
          <Reveal delay={80}><CategoryRail active="all" /></Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal variant="still">
            <div style={{ borderBottom: "1px solid var(--rule)" }}>
              {POSTS.map((p) => <PostRow key={p.slug} post={p} wide={wide} />)}
            </div>
            <Pagination page={1} pages={4} />
          </Reveal>
        </Container>
      </Section>
    </PageShell>
  );
}

/* ── Single post ────────────────────────────────────────────────────── */

const P = ({ children }) => (
  <p style={{ margin: "0 0 clamp(18px,2.2vw,26px)", font: `var(--weight-regular) ${T.body}/1.68 var(--font-sans)`, color: "var(--text-body)" }}>{children}</p>
);
const H2 = ({ children }) => (
  <h2 style={{ margin: "clamp(38px,4.4vw,56px) 0 clamp(14px,1.8vw,20px)", font: `var(--weight-semibold) clamp(24px,2.8vw,34px)/1.2 var(--font-serif)`, letterSpacing: "-0.02em", color: "var(--ink-900)", maxWidth: "22ch", textWrap: "balance" }}>{children}</h2>
);
const H3 = ({ children }) => (
  <h3 style={{ margin: "clamp(28px,3.2vw,38px) 0 10px", font: `var(--weight-semibold) clamp(19px,2.1vw,23px)/1.3 var(--font-serif)`, letterSpacing: "-0.015em", color: "var(--ink-900)" }}>{children}</h3>
);

function BlogPost() {
  const wide = useDesktop();
  const post = POSTS[0];
  return (
    <PageShell>
      <Section id="top" graph style={{ paddingBottom: 0 }}>
        <Container>
          <Reveal>
            {/* 44x44 hit area per crumb — the package rule is a 44px hit area on any surface a
                parent touches, not 44px tall; 24 (the bare WCAG floor) does not satisfy it either
                way. Bob P2, 2026-08-14: "Notes" measured 36x44 — minHeight without minWidth. The
                negative block margin keeps the row as tight as a line of text; the negative inline
                margin does the same on the cross axis so the added width doesn't push the "/" and
                the next crumb rightward. */}
            <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", font: `var(--weight-medium) var(--size-2xs)/1 var(--font-mono)`, color: "var(--text-muted)", marginBottom: 22 }}>
              <a href="/blog" style={{ color: "inherit", display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 44, minWidth: 44, marginBlock: -10, marginInline: -4 }}>Notes</a>
              <span aria-hidden="true" style={{ paddingInline: 8 }}>/</span>
              <a href="/blog/level/form-4-5" style={{ color: "inherit", display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 44, minWidth: 44, marginBlock: -10, marginInline: -4 }}>{post.cat}</a>
            </nav>
            <h1 style={{ margin: 0, font: `var(--weight-semibold) clamp(30px,4.4vw,50px)/1.08 var(--font-serif)`, letterSpacing: "-0.022em", color: "var(--ink-900)", maxWidth: "20ch", textWrap: "balance" }}>
              {post.title}
            </h1>
            <div style={{ marginTop: 20 }}><Meta cat={post.cat} date={post.date} mins={post.mins} /></div>
            <p style={{ margin: "24px 0 0", font: `var(--weight-regular) ${T.lead}/1.55 var(--font-sans)`, color: "var(--text-muted)", maxWidth: "54ch" }}>
              {post.excerpt}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section style={{ paddingTop: "clamp(30px,3.6vw,44px)" }}>
        <Container>
          <Reveal variant="still">
            <Prose>
              <P>
                A student who can simplify <TeX tex={"2^3 \\times 2^4"} /> without hesitating will often stall
                completely on <TeX tex={"\\sqrt{8} \\times \\sqrt{2}"} />. The rules look like siblings. They are not,
                and the difference is worth ten minutes at the kitchen table.
              </P>

              <H2>The rule that does carry over</H2>
              <P>
                Multiplication behaves. Surds multiply the way indices do, because a surd <em>is</em> an index —
                a power of one half:
              </P>
              <Formula tex={"\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}"} />
              <P>So the example above resolves cleanly, and most students get there:</P>
              <Formula tex={"\\sqrt{8} \\times \\sqrt{2} = \\sqrt{16} = 4"} />

              <H2>The rule that does not</H2>
              <P>
                Addition is where it breaks. Because <TeX tex={"\\sqrt{a} + \\sqrt{b} \\neq \\sqrt{a+b}"} />, and a
                student who has spent a year adding indices will do it anyway.
              </P>

              <CommonMistake>
                Writing <TeX tex={"\\sqrt{9} + \\sqrt{16} = \\sqrt{25} = 5"} />. It is 3 + 4 = 7. If your child does
                this once, it is a slip; if they do it twice, they have generalised the multiplication rule and
                the whole topic needs revisiting before the exam.
              </CommonMistake>

              <H2>Simplifying, line by line</H2>
              <P>
                Here is the working I would write out with a student, with the reason for each line — the part a
                textbook leaves out.
              </P>

              <Working steps={[
                { tex: "\\sqrt{72} + \\sqrt{50}", why: "Nothing can be added yet — the numbers under the roots differ." },
                { tex: "= \\sqrt{36 \\times 2} + \\sqrt{25 \\times 2}", why: "Split each number so one factor is the largest perfect square that divides it." },
                { tex: "= 6\\sqrt{2} + 5\\sqrt{2}", why: "The perfect squares come out; the 2 stays under the root." },
                { tex: "= 11\\sqrt{2}", why: "Now they add — same surd, so they behave like 6x + 5x." },
              ]} />

              <P>
                That last line is the whole point. Surds add when they match, exactly like algebraic terms, and
                the job of every step before it is to make them match.
              </P>

              <H3>A ten-minute check</H3>
              <P>
                Ask for <TeX tex={"\\sqrt{18} + \\sqrt{8}"} />. A student who answers <TeX tex={"5\\sqrt{2}"} />
                understands it. A student who answers <TeX tex={"\\sqrt{26}"} /> has the misconception above, and
                it will cost marks in Paper 1.
              </P>
            </Prose>
          </Reveal>

          <Reveal style={{ marginTop: "clamp(44px,5vw,72px)", maxWidth: "64ch" }}>
            <div style={{ borderTop: "3px solid var(--ink-900)", paddingTop: "clamp(22px,2.6vw,30px)" }}>
              <p style={{ margin: "0 0 18px", font: `var(--weight-regular) ${T.body}/1.6 var(--font-sans)`, color: "var(--text-body)", maxWidth: "48ch" }}>
                If this is where your child is stuck, the free assessment will find out in half an hour whether it
                is surds specifically or the index rules underneath them.
              </p>
              <Cta note="Free, 30 minutes, no obligation to continue." />
            </div>
          </Reveal>
        </Container>
      </Section>
    </PageShell>
  );
}

Object.assign(window, { PageShell, BlogArchive, BlogPost });
