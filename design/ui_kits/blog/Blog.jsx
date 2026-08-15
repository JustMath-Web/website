/* Blog surfaces — archive and single post.
   Shares PageHeader / SiteFooter / Section / Container with the website kit, so a reader moving
   from the landing page to a post never crosses a visual seam. */

const { WhatsAppButton } = window.JustMathDesignSystem_270e96;
const { T, SECTION_Y, useDesktop, Section, Container, GraphGround, Reveal, PageHeader, Cta } = window;

/* ── Syllabus categories ────────────────────────────────────────────────
   Categories are the syllabus itself, not invented topics. They reuse the measurement spine's
   vocabulary, so the blog is filed the way the rest of the site already thinks. */
const CATEGORIES = [
  { slug: "standard-1-6", label: "Standard 1–6", count: 12 },
  { slug: "form-1-3", label: "Form 1–3", count: 9 },
  { slug: "form-4-5", label: "Form 4–5", count: 14 },
  { slug: "add-maths", label: "Additional Mathematics", count: 8 },
  { slug: "spm", label: "SPM", count: 11 },
  { slug: "igcse", label: "IGCSE", count: 5 },
];

const POSTS = [
  { slug: "surds-form-4", cat: "Form 4–5", date: "2026-08-04", mins: 6,
    title: "Why surds trip up Form 4 students who were fine with indices",
    excerpt: "The rules look the same and they are not. Here is the exact point where the two diverge, and the three questions that expose it." },
  { slug: "learning-matrix-oct-2026", cat: "Standard 1–6", date: "2026-07-28", mins: 4,
    title: "The Learning Matrix maths paper, 6–8 October: what Year 4 parents actually need to know",
    excerpt: "It is diagnostic, not a ranking. What that means for your child, and what the result can and cannot tell you." },
  { slug: "quadratics-completing-square", cat: "Additional Mathematics", date: "2026-07-19", mins: 9,
    title: "Completing the square, shown line by line",
    excerpt: "Every step written out, including the one most textbooks skip — where the constant comes from and why it is halved." },
  { slug: "fractions-division", cat: "Standard 1–6", date: "2026-07-11", mins: 5,
    title: "A fraction is a division. Standard 3 is where that idea should land",
    excerpt: "Miss it here and Form 2 algebraic fractions become guesswork. A ten-minute check you can do at the kitchen table." },
];

const fmtDate = (iso) => new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

/* ── Shared bits ────────────────────────────────────────────────────── */

/* `stack` splits the line in two so a long category ("Additional Mathematics") cannot wrap and
   strand a separator on its own — which is exactly what an inline row does in a narrow column. */
function Meta({ cat, date, mins, invert, stack = false }) {
  const dim = invert ? "var(--ink-300)" : "var(--text-muted)";
  const mono = `var(--weight-medium) var(--size-2xs)/1.5 var(--font-mono)`;
  const catEl = (
    <span style={{ color: invert ? "var(--paper)" : "var(--ochre-600)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{cat}</span>
  );
  if (stack) {
    return (
      <div style={{ font: mono, color: dim, display: "grid", gap: 5, justifyItems: "start" }}>
        {catEl}
        <span style={{ whiteSpace: "nowrap" }}>
          <time dateTime={date}>{fmtDate(date)}</time>
          <span aria-hidden="true" style={{ paddingInline: 7 }}>·</span>
          {mins} min read
        </span>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, font: mono, color: dim }}>
      {catEl}
      <span aria-hidden="true">·</span>
      <time dateTime={date}>{fmtDate(date)}</time>
      <span aria-hidden="true">·</span>
      <span>{mins} min read</span>
    </div>
  );
}

/* Archive rows, not a card grid — the same decision the Levels section makes, for the same
   reason: this brand has no imagery, so cards would be empty boxes with a title in them. */
function PostRow({ post, wide }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ borderTop: "1px solid var(--rule)", paddingBlock: "clamp(26px,3.4vw,40px)" }}>
      {/* `start` so the meta aligns to the title's first line rather than floating to the middle
          of a three-line headline. */}
      <a href={`/blog/${post.slug}`} style={{ display: "grid", gridTemplateColumns: wide ? "minmax(0,1fr) minmax(0,1.9fr)" : "1fr", gap: wide ? "clamp(28px,4vw,64px)" : 14, alignItems: "start", textDecoration: "none", color: "inherit" }}>
        <Meta cat={post.cat} date={post.date} mins={post.mins} stack={wide} />
        <div>
          <h2 style={{ margin: 0, font: `var(--weight-semibold) clamp(22px,2.6vw,31px)/1.22 var(--font-serif)`, letterSpacing: "-0.02em", color: "var(--ink-900)", textDecoration: hover ? "underline" : "none", textUnderlineOffset: 4, textDecorationThickness: 1, maxWidth: "26ch", textWrap: "balance" }}>
            {post.title}
          </h2>
          <p style={{ margin: "12px 0 0", font: `var(--weight-regular) ${T.body}/1.6 var(--font-sans)`, color: "var(--text-body)", maxWidth: "56ch" }}>
            {post.excerpt}
          </p>
        </div>
      </a>
    </article>
  );
}

function CategoryRail({ active = "all" }) {
  const all = [{ slug: "all", label: "Everything", count: CATEGORIES.reduce((n, c) => n + c.count, 0) }, ...CATEGORIES];
  return (
    <nav aria-label="Filter by syllabus level" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "clamp(26px,3vw,36px)" }}>
      {all.map((c) => {
        const on = c.slug === active;
        return (
          <a key={c.slug} href={c.slug === "all" ? "/blog" : `/blog/level/${c.slug}`}
            aria-current={on ? "page" : undefined}
            style={{
              /* 44, not 36: the package allows 36 only for secondary DESKTOP controls, and these
                 are how a parent navigates the blog on a phone. */
              display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, paddingInline: 14,
              border: `1px solid ${on ? "var(--ink-900)" : "var(--rule-strong)"}`,
              background: on ? "var(--ink-900)" : "transparent",
              color: on ? "var(--paper)" : "var(--ink-700)",
              borderRadius: "var(--radius-md)", textDecoration: "none",
              font: `var(--weight-medium) var(--size-xs)/1 var(--font-sans)`,
              transition: "var(--transition-control)",
            }}>
            {c.label}
            <span style={{ font: `var(--weight-medium) var(--size-2xs)/1 var(--font-mono)`, color: on ? "var(--ink-300)" : "var(--text-faint)" }}>{c.count}</span>
          </a>
        );
      })}
    </nav>
  );
}

function Pagination({ page = 1, pages = 4 }) {
  const link = (n, label, disabled) => (
    <a key={label} href={disabled ? undefined : `/blog?page=${n}`} aria-disabled={disabled || undefined}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 44, minHeight: 44,
        paddingInline: 10, textDecoration: "none", borderRadius: "var(--radius-md)",
        font: `var(--weight-medium) var(--size-sm)/1 var(--font-mono)`,
        color: disabled ? "var(--text-faint)" : n === page ? "var(--paper)" : "var(--ink-700)",
        background: n === page ? "var(--ink-900)" : "transparent",
        border: `1px solid ${n === page ? "var(--ink-900)" : "var(--rule)"}`,
        pointerEvents: disabled ? "none" : undefined,
      }}
      aria-current={n === page ? "page" : undefined}>{label}</a>
  );
  return (
    <nav aria-label="Pagination" style={{ display: "flex", gap: 8, marginTop: "clamp(36px,4vw,56px)", borderTop: "1px solid var(--rule)", paddingTop: "clamp(24px,3vw,32px)" }}>
      {link(page - 1, "Previous", page === 1)}
      {Array.from({ length: pages }, (_, i) => link(i + 1, String(i + 1)))}
      {link(page + 1, "Next", page === pages)}
    </nav>
  );
}

/* ── Maths ──────────────────────────────────────────────────────────────
   Rendered with KaTeX. In production this runs at BUILD time (remark-math + rehype-katex in
   Astro, or a Portable Text serializer), so pages ship as static HTML with no client-side maths
   JS — which matters for SEO and for a parent on a slow connection. */
/* The TeX source comes in as the `tex` PROP, never as children: a string literal written as a JSX
   child gets wrapped by the preview host's source instrumentation and arrives as an object, which
   KaTeX then faithfully renders as the words "[object Object]". A prop is passed through untouched.
   Production (Astro/Portable Text) has no such instrumentation, but the prop API is clearer anyway. */
function TeX({ tex, children, block = false }) {
  const src = typeof tex === "string" ? tex : typeof children === "string" ? children : String(tex ?? children ?? "");
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    /* `trust: false` + `strict` are the security-relevant settings: they stop \htmlClass, \url
       and friends from emitting raw HTML, so a TeX string written by a CMS editor cannot become
       an XSS vector — KaTeX escapes everything else. Keep both when this moves to a Portable Text
       serializer, where the input really is editor-authored rather than hardcoded as it is here.

       Rendered into a ref rather than via dangerouslySetInnerHTML: the preview host instruments
       JSX props, which mangles that prop, and a ref is unaffected. */
    try {
      window.katex.render(src, el, {
        displayMode: block, throwOnError: false, trust: false, strict: "ignore",
      });
    } catch (e) {
      el.textContent = src;
    }
  }, [src, block]);
  return <span ref={ref} style={{ display: block ? "block" : "inline" }} />;
}

/* `tex` as a prop, never children — same instrumentation reason as TeX above. */
function Formula({ tex, children }) {
  return (
    <div style={{ margin: "clamp(24px,3vw,32px) 0", paddingBlock: "clamp(16px,2vw,22px)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)", textAlign: "center", fontSize: "clamp(17px,2.2vw,21px)", color: "var(--ink-900)", overflowX: "auto" }}>
      <TeX tex={tex ?? children} block />
    </div>
  );
}

/* The brand's actual differentiator, made into a component: "Working is shown line by line."
   Steps align on the relation symbol, and each carries its own plain-language reason — which is
   the thing a textbook leaves out and a tutor says out loud. */
function Working({ title = "Working, line by line", steps = [] }) {
  return (
    <figure style={{ margin: "clamp(28px,3.4vw,40px) 0", border: "1px solid var(--rule)", borderTop: "3px solid var(--ink-900)", borderRadius: "var(--radius-lg)", background: "var(--white)", padding: "clamp(20px,2.6vw,30px)" }}>
      <figcaption style={{ font: `var(--weight-semibold) var(--size-2xs)/1 var(--font-sans)`, letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 18 }}>{title}</figcaption>
      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 14 }}>
        {steps.map((s, i) => (
          <li key={i} style={{ display: "grid", gridTemplateColumns: "auto minmax(0,1fr)", gap: "clamp(12px,2vw,20px)", alignItems: "baseline" }}>
            <span aria-hidden="true" style={{ font: `var(--weight-medium) var(--size-2xs)/1.4 var(--font-mono)`, color: "var(--text-faint)" }}>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <div style={{ fontSize: "clamp(16px,1.9vw,19px)", color: "var(--ink-900)", overflowX: "auto" }}><TeX tex={s.tex} block /></div>
              {s.why ? <p style={{ margin: "6px 0 0", font: `var(--weight-regular) ${T.small}/1.55 var(--font-sans)`, color: "var(--text-muted)", maxWidth: "52ch" }}>{s.why}</p> : null}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* A named aside for the mistake a tutor sees every week. Ochre = attention, per the token rules —
   never green, which belongs to WhatsApp. */
function CommonMistake({ children }) {
  return (
    <aside style={{ margin: "clamp(26px,3vw,36px) 0", background: "var(--ochre-100)", borderTop: "1px solid var(--ochre-500)", borderBottom: "1px solid var(--ochre-500)", padding: "clamp(18px,2.4vw,26px)" }}>
      <p style={{ margin: "0 0 6px", font: `var(--weight-semibold) var(--size-2xs)/1 var(--font-sans)`, letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--ochre-600)" }}>Where this goes wrong</p>
      <div style={{ font: `var(--weight-regular) ${T.body}/1.65 var(--font-sans)`, color: "var(--text-body)", maxWidth: "58ch" }}>{children}</div>
    </aside>
  );
}

/* Long-form prose. The landing page has no equivalent — it is all short blocks — so this is the
   first place the system defines h2/h3 rhythm, lists and links inside running text. */
function Prose({ children }) {
  return <div className="prose" style={{ maxWidth: "64ch" }}>{children}</div>;
}

Object.assign(window, { CATEGORIES, POSTS, fmtDate, Meta, PostRow, CategoryRail, Pagination, TeX, Formula, Working, CommonMistake, Prose });
