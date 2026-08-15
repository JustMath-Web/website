/* Shared scale, primitives and page chrome — Just Math Malaysia landing page.
   Visual motif: a measurement spine (the levels of Malaysian schooling as a ruled scale),
   oversized tabular numerals, and a hairline graph ground. No imagery. */

const { WhatsAppButton } = window.JustMathDesignSystem_270e96;

const PHONE = "60194728768";
const MESSAGE = "Hi, I'd like to book the free maths assessment. My child is in ___";
const CTA_LABEL = "Book a free maths assessment on WhatsApp";

const T = {
  hero: "clamp(38px,7.6vw,84px)",
  h2: "clamp(28px,4.4vw,52px)",
  h3: "clamp(19px,2.3vw,26px)",
  lead: "clamp(17px,2vw,22px)",
  body: "clamp(16px,1.7vw,18px)",
  small: "14px",
  micro: "12px",
  figure: "clamp(52px,11vw,132px)",
  figureMid: "clamp(38px,6vw,72px)",
  figureSm: "clamp(28px,4vw,44px)",
};
const SECTION_Y = "clamp(64px,9vw,132px)";

function useDesktop(min = 860) {
  const [wide, setWide] = React.useState(() => window.innerWidth >= min);
  React.useEffect(() => {
    const mq = window.matchMedia(`(min-width:${min}px)`);
    const on = () => setWide(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [min]);
  return wide;
}

/* Hairline graph ground — 48px major, built from gradients. Decorative only. */
function GraphGround({ invert = false, opacity = 1, major = 48 }) {
  const line = invert ? "rgba(251,250,247,.09)" : "rgba(20,22,26,.055)";
  return (
    <div aria-hidden="true" style={{
      position: "absolute", inset: 0, pointerEvents: "none", opacity,
      backgroundImage: `linear-gradient(${line} 1px,transparent 1px),linear-gradient(90deg,${line} 1px,transparent 1px)`,
      backgroundSize: `${major}px ${major}px`,
      maskImage: "linear-gradient(180deg,#000 0%,#000 62%,transparent 100%)",
      WebkitMaskImage: "linear-gradient(180deg,#000 0%,#000 62%,transparent 100%)",
    }} />
  );
}

function Section({ id, ground = "paper", ruled = false, graph = false, children, style }) {
  const bg = { paper: "var(--paper)", sunken: "var(--surface-sunken)", ink: "var(--ink-900)" }[ground];
  return (
    <section id={id} style={{ position: "relative", background: bg, paddingBlock: SECTION_Y, borderTop: ruled ? "1px solid var(--rule)" : undefined, overflow: "hidden", ...style }}>
      {graph ? <GraphGround invert={ground === "ink"} /> : null}
      <div style={{ position: "relative" }}>{children}</div>
    </section>
  );
}

function Container({ children, style }) {
  return <div style={{ maxWidth: "var(--page-max)", margin: "0 auto", paddingInline: "clamp(20px,5vw,24px)", ...style }}>{children}</div>;
}

/* Numbered section marker — the editorial spine of the page. */
function Marker({ n, label, invert = false, style }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, ...style }}>
      {/* ink-400 only survives on the ink panels; on paper the marker takes the AA-safe faint. */}
      <span style={{ font: `var(--weight-semibold) ${T.micro}/1 var(--font-mono)`, color: invert ? "var(--ink-400)" : "var(--text-faint)", letterSpacing: "0.04em" }}>{n}</span>
      <span aria-hidden="true" style={{ width: 28, height: 1, background: invert ? "rgba(251,250,247,.3)" : "var(--rule-strong)" }} />
      <span style={{ font: `var(--weight-semibold) ${T.micro}/1 var(--font-sans)`, letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: invert ? "var(--ink-300)" : "var(--text-muted)" }}>{label}</span>
    </div>
  );
}

function Eyebrow({ children, invert = false, style }) {
  return <div style={{ font: `var(--weight-semibold) ${T.micro}/1 var(--font-sans)`, letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: invert ? "var(--ink-400)" : "var(--text-muted)", ...style }}>{children}</div>;
}

function H2({ children, invert = false, measure = "20ch", style }) {
  return <h2 style={{ font: `var(--weight-semibold) ${T.h2}/1.06 var(--font-serif)`, letterSpacing: "-0.028em", color: invert ? "var(--paper)" : "var(--ink-900)", margin: 0, maxWidth: measure, textWrap: "balance", ...style }}>{children}</h2>;
}

function H3({ children, style }) {
  return <h3 style={{ font: `var(--weight-semibold) ${T.h3}/1.22 var(--font-serif)`, letterSpacing: "-0.018em", color: "var(--ink-900)", margin: 0, maxWidth: "34ch", ...style }}>{children}</h3>;
}

function P({ children, size = T.body, muted = false, invert = false, measure = "var(--measure)", style }) {
  return <p style={{ font: `var(--weight-regular) ${size}/1.62 var(--font-sans)`, color: invert ? "var(--ink-300)" : muted ? "var(--text-muted)" : "var(--text-body)", maxWidth: measure, margin: 0, ...style }}>{children}</p>;
}

function Prose({ paras, size = T.body, invert = false, measure = "var(--measure)", style }) {
  return <div style={{ display: "grid", gap: "1.1em", ...style }}>{paras.map((t, i) => <P key={i} size={size} invert={invert} measure={measure}>{t}</P>)}</div>;
}

/* Oversized tabular figure. The page's one loud element. */
function Figure({ value, label, size = T.figureSm, invert = false, align = "start", style }) {
  return (
    <div style={{ ...style }}>
      <div style={{ font: `var(--weight-semibold) ${size}/0.86 var(--font-mono)`, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.045em", color: invert ? "var(--paper)" : "var(--ink-900)", textAlign: align }}>{value}</div>
      {label ? <div style={{ marginTop: 14, font: `var(--weight-regular) ${T.small}/1.4 var(--font-sans)`, color: invert ? "var(--ink-300)" : "var(--text-muted)", maxWidth: "20ch", textAlign: align }}>{label}</div> : null}
    </div>
  );
}

function Bullet({ children }) {
  return (
    <li style={{ display: "grid", gridTemplateColumns: "18px 1fr", gap: 14, alignItems: "start" }}>
      <span aria-hidden="true" style={{ height: 1, background: "var(--ink-300)", marginTop: "0.8em" }} />
      <span style={{ font: `var(--weight-regular) ${T.body}/1.6 var(--font-sans)`, color: "var(--text-body)" }}>{children}</span>
    </li>
  );
}

function List({ items, style }) {
  return <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 15, maxWidth: "var(--measure)", ...style }}>{items.map((t, i) => <Bullet key={i}>{t}</Bullet>)}</ul>;
}

/* ── Reveal engine ─────────────────────────────────────────────────────
   One shared passive scroll/rAF sweep rather than per-element observers.
   IntersectionObserver only fires on a state CHANGE, so an element that moves
   from below the viewport to above it in a single scroll step (flick scroll,
   anchor jump, any step taller than the element's box) never intersects and
   would stay invisible forever. A sweep has no such blind spot: anything whose
   top has passed the fold is revealed, whether it was ever on screen or not. */

const REVEAL_QUEUE = new Set();
let REVEAL_BOUND = false;

function revealSweep() {
  const fold = window.innerHeight - 40;
  REVEAL_QUEUE.forEach((entry) => {
    const el = entry.el;
    if (!el || !el.isConnected) { REVEAL_QUEUE.delete(entry); return; }
    if (el.getBoundingClientRect().top < fold) { REVEAL_QUEUE.delete(entry); entry.reveal(); }
  });
}

/* Escape hatch: flush the whole queue regardless of scroll position. A print stylesheet,
   a headless capture and an assistive jump can all surface a block that scrolling never
   reached — nothing may stay at opacity 0 down those paths. Exposed on window so a capture
   tool can call it before shooting a full-page screenshot. */
function revealAll() {
  REVEAL_QUEUE.forEach((entry) => { REVEAL_QUEUE.delete(entry); entry.reveal(); });
}

function bindReveal() {
  if (REVEAL_BOUND) return;
  REVEAL_BOUND = true;
  window.addEventListener("scroll", revealSweep, { passive: true });
  window.addEventListener("resize", revealSweep, { passive: true });
  window.addEventListener("beforeprint", revealAll);
  const mq = window.matchMedia && window.matchMedia("print");
  if (mq && mq.addEventListener) mq.addEventListener("change", (e) => { if (e.matches) revealAll(); });
}

function useReveal() {
  const ref = React.useRef(null);
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) { setOn(true); return; }
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight - 40) { setOn(true); return; }
    const entry = { el, reveal: () => setOn(true) };
    REVEAL_QUEUE.add(entry);
    bindReveal();
    const raf = requestAnimationFrame(revealSweep);
    return () => { REVEAL_QUEUE.delete(entry); cancelAnimationFrame(raf); };
  }, []);
  return [ref, on];
}

/* 14px rise + fade, once. */
/* Motion is assigned by what a section DOES, not applied uniformly. A single fade-up on
   everything flattens the section rhythm the layout works to establish. */
const REVEAL_VARIANTS = {
  /* Prose, headings, lists — a short rise establishes reading order on arrival. */
  rise:   { y: 14, dur: 640 },
  /* The full-bleed ink bands are compression moments, not sequence. They settle in place
     with no travel, slower, so the rhythm shift is felt in the motion as well as the layout. */
  settle: { y: 0,  dur: 780 },
  /* Containers whose own contents carry the motion (the gap chart's bars). The wrapper
     stays still and always visible so it never competes with what it holds. */
  still:  { y: 0,  dur: 0 },
};

function Reveal({ children, delay = 0, variant = "rise", y, style }) {
  const v = REVEAL_VARIANTS[variant] || REVEAL_VARIANTS.rise;
  const [ref, on] = useReveal();
  const shown = v.dur === 0 ? true : on;
  const dist = y != null ? y : v.y;
  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown || !dist ? "none" : `translateY(${dist}px)`,
      transition: v.dur
        ? `opacity ${v.dur}ms var(--ease-out) ${delay}ms, transform ${v.dur}ms var(--ease-out) ${delay}ms`
        : "none",
      ...style,
    }}>{children}</div>
  );
}

/* Same engine, for elements that animate their own contents (the chart bars). */
function useInView() {
  return useReveal();
}

/* ── The measurement spine ──────────────────────────────────────────────
   One motif, two jobs: in the hero it shows the full span one tutor covers;
   in the Problem section the same scale becomes a chart of what gets measured. */

const STOPS = [
  "Standard 1", "Standard 2", "Standard 3", "Standard 4", "Standard 5", "Standard 6",
  "Form 1", "Form 2", "Form 3", "Form 4", "Form 5",
];

/* ── The gap chart ─────────────────────────────────────────────────────
   Eleven school years on one axis. Three tall bars are the measured points;
   the rest are stubs. A bracket marks the Form 4–5 stretch with no measure. */

const SHORT = ["S1", "S2", "S3", "S4", "S5", "S6", "F1", "F2", "F3", "F4", "F5"];

function GapChart({ style }) {
  const [ref, on] = useInView();
  const marks = { 3: "OCT 2026", 8: "FROM 2027", 10: "SPM" };
  const gapStart = 9, gapEnd = 10;
  return (
    <div ref={ref} style={{ position: "relative", background: "var(--ink-900)", borderRadius: "var(--radius-lg)", padding: "clamp(22px,3vw,34px)", overflow: "hidden", ...style }}>
      <GraphGround invert opacity={0.8} major={32} />
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: "clamp(20px,2.6vw,30px)" }}>
          <span style={{ font: `var(--weight-semibold) ${T.micro}/1 var(--font-sans)`, letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--ink-400)" }}>When maths is measured</span>
          <span style={{ font: `var(--weight-semibold) ${T.micro}/1 var(--font-mono)`, color: "var(--ochre-500)", letterSpacing: "0.04em" }}>3 POINTS · 11 YEARS</span>
        </div>

        {/* date flags */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(11,1fr)", gap: 3, alignItems: "end", height: 30 }}>
          {SHORT.map((_, i) => (
            <span key={i} style={{
              font: `var(--weight-semibold) var(--size-3xs)/1.2 var(--font-mono)`, color: "var(--ochre-500)",
              letterSpacing: "0.02em", textAlign: "center", whiteSpace: "nowrap",
              opacity: marks[i] && on ? 1 : 0, transition: `opacity 500ms var(--ease-out) ${420 + i * 26}ms`,
            }}>{marks[i] ? marks[i].replace(" ", "\u00a0") : ""}</span>
          ))}
        </div>

        {/* bars */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(11,1fr)", gap: 3, alignItems: "end", height: "clamp(96px,14vw,150px)", borderBottom: "2px solid var(--paper)" }}>
          {SHORT.map((_, i) => {
            const tall = !!marks[i];
            return (
              <div key={i} style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", height: "100%" }}>
                <span style={{
                  width: "100%", maxWidth: tall ? 34 : 22,
                  height: on ? (tall ? "100%" : "14%") : 0,
                  background: tall ? "var(--paper)" : "rgba(251,250,247,.22)",
                  transition: `height 720ms var(--ease-out) ${i * 34}ms`,
                }} />
              </div>
            );
          })}
        </div>

        {/* axis labels */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(11,1fr)", gap: 3, marginTop: 10 }}>
          {SHORT.map((s, i) => (
            <span key={s} style={{
              font: `var(--weight-${marks[i] ? "semibold" : "regular"}) var(--size-2xs)/1 var(--font-mono)`,
              /* .55 alpha over ink-900 = 5.92:1. The measured years stay distinguishable by
                 full paper + semibold + a full-height bar, never by dimness alone. */
              color: marks[i] ? "var(--paper)" : "rgba(251,250,247,.55)", textAlign: "center",
            }}>{s}</span>
          ))}
        </div>

        {/* the unmeasured stretch */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(11,1fr)", gap: 3, marginTop: 14 }}>
          <div style={{ gridColumn: `${gapStart + 1} / ${gapEnd + 2}`, borderTop: "1px solid var(--ochre-500)", paddingTop: 8 }}>
            <span style={{ display: "block", font: `var(--weight-medium) var(--size-3xs)/1.3 var(--font-mono)`, color: "var(--ochre-500)", textAlign: "center", letterSpacing: "0.02em" }}>NO MEASURE</span>
          </div>
        </div>
        <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid rgba(251,250,247,.18)", font: `var(--weight-regular) ${T.small}/1.5 var(--font-sans)`, color: "var(--ink-300)" }}>
          Standard 1, 2, 3, 5, 6 and Form 1, 2, 4 are never independently measured. Form 3 to SPM is the longest unchecked stretch — and the one Additional Mathematics arrives in.
        </div>
      </div>
    </div>
  );
}

function Spine({ marks = {}, dim = false, footer, invert = false, style }) {
  const ink = invert ? "var(--paper)" : "var(--ink-900)";
  const faint = invert ? "rgba(251,250,247,.34)" : "var(--ink-300)";
  const rule = invert ? "rgba(251,250,247,.18)" : "var(--rule)";
  return (
    <div style={{ ...style }}>
      <div style={{ display: "grid" }}>
        {STOPS.map((s, i) => {
          const m = marks[s];
          const on = !dim || !!m;
          return (
            <div key={s} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center", paddingBlock: 9, borderBottom: i === STOPS.length - 1 ? undefined : `1px solid ${rule}` }}>
              <span aria-hidden="true" style={{ width: m ? 26 : 12, height: m ? 3 : 1, background: on ? ink : faint, flex: "none" }} />
              <span style={{ font: `var(--weight-${m ? "semibold" : "regular"}) clamp(13px,1.5vw,15px)/1.2 var(--font-sans)`, color: on ? ink : faint, letterSpacing: m ? "-0.005em" : 0 }}>{s}</span>
              {m ? <span style={{ font: `var(--weight-medium) ${T.micro}/1.25 var(--font-mono)`, color: invert ? "var(--ink-300)" : "var(--ochre-600)", textAlign: "right", whiteSpace: "nowrap" }}>{m}</span> : <span />}
            </div>
          );
        })}
      </div>
      {footer ? <div style={{ marginTop: 16, paddingTop: 14, borderTop: `2px solid ${ink}`, font: `var(--weight-regular) ${T.small}/1.45 var(--font-sans)`, color: invert ? "var(--ink-300)" : "var(--text-muted)" }}>{footer}</div> : null}
    </div>
  );
}

/* The one CTA treatment. Five uses, identical every time. */
function Cta({ note, align = "start", style }) {
  return (
    <div style={{ display: "grid", justifyItems: align, maxWidth: 470, marginInline: align === "center" ? "auto" : undefined, ...style }}>
      <WhatsAppButton full size="lg" phone={PHONE} message={MESSAGE} label={CTA_LABEL} />
      {note ? <span style={{ marginTop: 12, font: `var(--weight-regular) ${T.small}/1.5 var(--font-sans)`, color: "var(--text-muted)", textAlign: align === "center" ? "center" : "left" }}>{note}</span> : null}
    </div>
  );
}

function PageHeader() {
  const wide = useDesktop();
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(251,250,247,.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--rule)" }}>
      <Container style={{ minHeight: 62, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        {/* The lockup (owner decisions, 2026-08-11): operator mark + stacked type.
            MALAYSIA sits beneath the name, justified to exactly the width of "Just Math" —
            `stretch` gives the lower line the block's width, which the serif line defines, and
            text-align-last: justify spreads the tracking to fill it, so the edges align at any
            viewport width rather than at one hand-tuned size. */}
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.6em", fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>
          {/* The operator mark, carried over from the live site and redrawn in ink (ASSETS.md §1b).
              Sized to 2.05em — the exact height of the type block beside it (1em + 0.45em + 0.6em) —
              so mark and type optically align at every viewport width. */}
          <svg viewBox="0 0 160 160" width="2.05em" height="2.05em" fill="var(--ink-900)" aria-hidden="true" focusable="false" style={{ display: "block", flex: "none" }}>
            <rect x="22" y="40.5" width="44" height="7" />
            <rect x="40.5" y="22" width="7" height="44" />
            <rect x="94" y="40.5" width="44" height="7" />
            <rect x="22" y="112.5" width="44" height="7" transform="rotate(45 44 116)" />
            <rect x="22" y="112.5" width="44" height="7" transform="rotate(-45 44 116)" />
            <rect x="94" y="112.5" width="44" height="7" />
            <circle cx="116" cy="99" r="4.5" />
            <circle cx="116" cy="133" r="4.5" />
          </svg>
        <span style={{
          display: "inline-flex", flexDirection: "column", alignItems: "stretch",
          /* The type block's single scale control. Everything below is in em, so the whole lockup
             scales from this one value and the proportions never drift. */
          fontSize: "1em",
          gap: "0.45em",
        }}>
          {/* nowrap: the lockup must never break across lines, however tight the header gets. */}
          <span style={{ font: "var(--weight-semibold) 1em/1 var(--font-serif)", letterSpacing: "-0.02em", color: "var(--ink-900)", whiteSpace: "nowrap" }}>Just Math</span>
          {/* .lockup-fill carries the justification and its Safari fallback — see tokens/base.css.
              It must stay a class, not inline style, because the fallback needs @supports. */}
          <span className="lockup-fill" style={{
            font: "var(--weight-semibold) 0.6em/1 var(--font-sans)", letterSpacing: "0.24em", color: "var(--ink-500)",
          }}>MALAYSIA</span>
        </span>
        </span>
        {/* Owner override 2026-08-12: the header now carries a WhatsApp control instead of the
            `tel:` number. The system previously banned a header button ("a sixth green control
            would break the promise") — but the promise is *green means this opens WhatsApp*, and a
            sixth green control that opens WhatsApp keeps it. What it does change: the CTA is now
            persistent, because the header is sticky, and the tap-to-call path is gone.
            The "Blog" link is the only route to the blog; without it the archive is unreachable. */}
        <span style={{ display: "inline-flex", alignItems: "center", gap: "clamp(12px,2.5vw,22px)" }}>
          {/* Bob P2, 2026-08-14: minHeight alone gave "Blog" a 36.6px-wide hit area — the package
              rule is a 44px hit area, not 44px tall, so width needs the same floor. minWidth +
              centered text grows the box symmetrically; the negative inline margin folds that
              growth back into the header's own gap instead of shifting the CTA button. */}
          <a href="/blog" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            minHeight: 44, minWidth: 44, marginInline: -4,
            font: "var(--weight-medium) var(--size-xs)/1 var(--font-sans)", color: "var(--ink-700)",
            textDecoration: "none", whiteSpace: "nowrap",
          }}>Blog</a>
          {/* Owner label choice 2026-08-12: "Schedule Now". Two consequences recorded rather than
              silently absorbed — see ASSETS.md §4 and COPY-GAPS.md §2g:
              1. "Now" is urgency language, which the brand voice rules ban outright ("Reassurance,
                 never urgency"; "book now" is on the banned list). Every other CTA on the site
                 avoids it.
              2. The label no longer names the destination, so the WhatsApp glyph becomes the ONLY
                 signal of where the button leads — which makes the glyph non-removable again and
                 re-opens the pending glyph-asset question. */}
          {/* size="md" = --control-h 44px. "sm" (36px) is reserved for secondary DESKTOP
              controls, and this is the primary conversion control on a phone. */}
          <WhatsAppButton size="md" phone={PHONE} message={MESSAGE}
            label="Schedule Now"
            style={{ whiteSpace: "nowrap" }} />
        </span>
      </Container>
    </header>
  );
}

function Hero() {
  const wide = useDesktop();
  return (
    <Section id="top" graph style={{ paddingBlock: "clamp(44px,7vw,104px)" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "minmax(0,1.55fr) minmax(0,.95fr)" : "1fr", gap: wide ? "clamp(48px,6vw,96px)" : 44, alignItems: "start" }}>
          <div>
            <Reveal>
              <Eyebrow style={{ marginBottom: "clamp(20px,2.6vw,30px)" }}>Standard 1 to Form 5 · IGCSE · one to one</Eyebrow>
              <h1 style={{ font: `var(--weight-semibold) ${T.hero}/0.98 var(--font-serif)`, letterSpacing: "-0.038em", color: "var(--ink-900)", margin: 0, maxWidth: "15ch", textWrap: "balance" }}>
                Know exactly where your child’s maths stands
              </h1>
            </Reveal>
            <Reveal delay={90}>
              <P size={T.lead} measure="44ch" style={{ marginTop: "clamp(22px,2.8vw,32px)" }}>
                Twenty-four years teaching Malaysian maths, ten of them online. One tutor, one student, live on Google Meet. Standard 1 to Form 5, taught in English and Bahasa Melayu.
              </P>
              <P size={T.small} muted measure="44ch" style={{ marginTop: 14 }}>
                Standard 1 to Form 5 and IGCSE. Online across Malaysia. No group classes.
              </P>
            </Reveal>
            <Reveal delay={180}>
              <Cta note="Free, 30 minutes, no obligation to continue." style={{ marginTop: "clamp(30px,3.6vw,44px)" }} />
            </Reveal>
          </div>
          <Reveal delay={240} style={{ borderTop: "3px solid var(--ink-900)", paddingTop: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, marginBottom: 14 }}>
              <Eyebrow>Every level, one tutor</Eyebrow>
              <span style={{ font: `var(--weight-semibold) ${T.micro}/1 var(--font-mono)`, color: "var(--text-faint)" }}>11 YEARS</span>
            </div>
            {/* Approved copy, verbatim from "Block four — IGCSE". The earlier derived version
                dropped "rather than translated across from SPM", which is the whole point of the
                sentence — it is what separates a native IGCSE syllabus from a converted one. */}
            <Spine footer="IGCSE Mathematics and IGCSE Additional Mathematics, taught to the international syllabus rather than translated across from SPM." />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

const TRUST = [
  { value: "24", label: "years teaching maths" },
  { value: "10", label: "years teaching online" },
  { value: "500+", label: "students, taught one at a time" },
];

function TrustBar() {
  const wide = useDesktop();
  return (
    <section style={{ position: "relative", background: "var(--ink-900)", overflow: "hidden", paddingBlock: "clamp(36px,5vw,64px)" }}>
      <GraphGround invert />
      <Container style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: wide ? "repeat(4,1fr)" : "repeat(2,1fr)", gap: wide ? 0 : "clamp(28px,6vw,40px)", rowGap: wide ? 0 : 34 }}>
          {TRUST.map((t, i) => (
            <Reveal key={t.value} variant="settle" delay={i * 80} style={{ paddingInline: wide ? (i === 0 ? "0 24px" : "clamp(20px,2.4vw,32px)") : 0, borderLeft: wide && i > 0 ? "1px solid rgba(251,250,247,.18)" : undefined }}>
              <Figure invert value={t.value} label={t.label} size={T.figureSm} />
            </Reveal>
          ))}
          <Reveal variant="settle" delay={240} style={{ paddingInline: wide ? "clamp(20px,2.4vw,32px)" : 0, borderLeft: wide ? "1px solid rgba(251,250,247,.18)" : undefined, display: "flex", alignItems: "center", gridColumn: wide ? undefined : "span 2" }}>
            <span style={{ font: `var(--weight-regular) clamp(17px,2vw,21px)/1.3 var(--font-serif)`, color: "var(--paper)", maxWidth: "20ch", letterSpacing: "-0.01em" }}>
              Online across Malaysia, in English and BM
            </span>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

Object.assign(window, { PHONE, MESSAGE, CTA_LABEL, T, SECTION_Y, useDesktop, useReveal, useInView, revealSweep, revealAll, Reveal, GraphGround, Section, Container, Marker, Eyebrow, H2, H3, P, Prose, Figure, Bullet, List, STOPS, SHORT, Spine, GapChart, Cta, PageHeader, Hero, TrustBar });
