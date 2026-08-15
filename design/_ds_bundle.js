/* @ds-bundle: {"format":4,"namespace":"JustMathDesignSystem_270e96","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"WhatsAppGlyph","sourcePath":"components/brand/WhatsAppGlyph.jsx"},{"name":"ProgressMeter","sourcePath":"components/content/ProgressMeter.jsx"},{"name":"ScoreTable","sourcePath":"components/content/ScoreTable.jsx"},{"name":"SectionHeading","sourcePath":"components/content/SectionHeading.jsx"},{"name":"Stat","sourcePath":"components/content/Stat.jsx"},{"name":"Testimonial","sourcePath":"components/content/Testimonial.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Callout","sourcePath":"components/core/Callout.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"WhatsAppButton","sourcePath":"components/core/WhatsAppButton.jsx"},{"name":"Accordion","sourcePath":"components/feedback/Accordion.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/RadioGroup.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"e1b21d8d1ffd","components/brand/WhatsAppGlyph.jsx":"d44593f0bd2f","components/content/ProgressMeter.jsx":"5bdadce3f8c4","components/content/ScoreTable.jsx":"4f22c46be35a","components/content/SectionHeading.jsx":"85e7a9ec8532","components/content/Stat.jsx":"342537f3f4c6","components/content/Testimonial.jsx":"c75c23ff0673","components/core/Badge.jsx":"7e6145c45016","components/core/Button.jsx":"90f38323ae9b","components/core/Callout.jsx":"8a809621a374","components/core/Card.jsx":"bf87a13679e5","components/core/WhatsAppButton.jsx":"5c534c5ca80c","components/feedback/Accordion.jsx":"3842a6bbb0dd","components/forms/Checkbox.jsx":"a5b7546b9f39","components/forms/Field.jsx":"e36126335b9e","components/forms/Input.jsx":"6864915e4bd7","components/forms/RadioGroup.jsx":"91a1ea861622","components/forms/Select.jsx":"46effbc650bc","components/navigation/SiteFooter.jsx":"2c743798752f","components/navigation/SiteHeader.jsx":"a8d9763f8673","ui_kits/booking/Booking.jsx":"8b87ca71036b","ui_kits/reports/Report.jsx":"2bf59622f267","ui_kits/website/LandingArgument.jsx":"7889cea22cc6","ui_kits/website/LandingClose.jsx":"f68d9e5c6df0","ui_kits/website/LandingShell.jsx":"dcf91071036b","ui_kits/website/image-slot.js":"fff26d081c8d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.JustMathDesignSystem_270e96 = window.JustMathDesignSystem_270e96 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const WORDMARK = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.42em",
  lineHeight: 1,
  whiteSpace: "nowrap"
};
function OperatorMark({ size = 40, title, ...rest }) {
  return /* @__PURE__ */ React.createElement(
    "svg",
    {
      viewBox: "0 0 160 160",
      width: size,
      height: size,
      fill: "currentColor",
      role: title ? "img" : void 0,
      "aria-label": title,
      "aria-hidden": title ? void 0 : "true",
      focusable: "false",
      style: { display: "block", flex: "none" },
      ...rest
    },
    /* @__PURE__ */ React.createElement("rect", { x: "22", y: "40.5", width: "44", height: "7" }),
    /* @__PURE__ */ React.createElement("rect", { x: "40.5", y: "22", width: "7", height: "44" }),
    /* @__PURE__ */ React.createElement("rect", { x: "94", y: "40.5", width: "44", height: "7" }),
    /* @__PURE__ */ React.createElement("rect", { x: "22", y: "112.5", width: "44", height: "7", transform: "rotate(45 44 116)" }),
    /* @__PURE__ */ React.createElement("rect", { x: "22", y: "112.5", width: "44", height: "7", transform: "rotate(-45 44 116)" }),
    /* @__PURE__ */ React.createElement("rect", { x: "94", y: "112.5", width: "44", height: "7" }),
    /* @__PURE__ */ React.createElement("circle", { cx: "116", cy: "99", r: "4.5" }),
    /* @__PURE__ */ React.createElement("circle", { cx: "116", cy: "133", r: "4.5" })
  );
}
function Wordmark({ size }) {
  return /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", flexDirection: "column", alignItems: "stretch", fontSize: size, gap: "0.45em" } }, /* @__PURE__ */ React.createElement("span", { style: { font: "var(--weight-semibold) 1em/1 var(--font-serif)", letterSpacing: "-0.02em" } }, "Just Math"), /* @__PURE__ */ React.createElement("span", { className: "lockup-fill", style: { font: "var(--weight-semibold) 0.6em/1 var(--font-sans)", letterSpacing: "0.24em", opacity: 0.72 } }, "MALAYSIA"));
}
function Logo({ variant = "lockup", size = 24, color, reversed = false, title = "Just Math Malaysia", style, ...rest }) {
  const ink = color || (reversed ? "var(--paper)" : "var(--ink-900)");
  if (variant === "monogram" || variant === "mark") {
    return /* @__PURE__ */ React.createElement(
      "span",
      {
        role: "img",
        "aria-label": title,
        title,
        style: { display: "inline-flex", color: ink, ...style },
        ...rest
      },
      /* @__PURE__ */ React.createElement(OperatorMark, { size: size * 2 })
    );
  }
  if (variant === "wordmark" || variant === "stacked") {
    return /* @__PURE__ */ React.createElement("span", { role: "img", "aria-label": title, style: { display: "inline-flex", color: ink, ...style }, ...rest }, /* @__PURE__ */ React.createElement(Wordmark, { size }));
  }
  return /* @__PURE__ */ React.createElement(
    "span",
    {
      role: "img",
      "aria-label": title,
      style: { display: "inline-flex", alignItems: "center", gap: "0.6em", fontSize: size, color: ink, ...style },
      ...rest
    },
    /* @__PURE__ */ React.createElement(OperatorMark, { size: "2.05em" }),
    /* @__PURE__ */ React.createElement(Wordmark, { size: "1em" })
  );
}

Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/WhatsAppGlyph.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PATH = "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";
function WhatsAppGlyph({
  size = 20,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "currentColor",
    "aria-hidden": "true",
    focusable: "false",
    style: {
      flex: "none",
      display: "block",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("path", {
    d: PATH
  }));
}
Object.assign(__ds_scope, { WhatsAppGlyph });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/WhatsAppGlyph.jsx", error: String((e && e.message) || e) }); }

// components/content/ProgressMeter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LEVELS = {
  secure: {
    fill: "var(--ink-900)",
    label: "Secure"
  },
  building: {
    fill: "var(--slate-500)",
    label: "Building"
  },
  practise: {
    fill: "var(--ochre-500)",
    label: "Needs practice"
  }
};
function ProgressMeter({ topic, level = "building", value, showLabel = true, emptyLabel = "Not assessed yet", style, ...rest }) {
  const empty = level === "none" || value === null && !LEVELS[level];
  const skin = LEVELS[level] || LEVELS.building;
  const pct = typeof value === "number" ? value : { secure: 88, building: 60, practise: 32 }[level];
  return /* @__PURE__ */ React.createElement("div", { style: { ...style }, ...rest }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { font: "var(--type-body)", fontSize: "var(--size-sm)", color: empty ? "var(--text-muted)" : "var(--ink-900)" } }, topic), showLabel ? /* @__PURE__ */ React.createElement("span", { style: { font: "var(--type-small)", color: "var(--text-muted)" } }, empty ? emptyLabel : skin.label) : null), empty ? /* @__PURE__ */ React.createElement("div", { style: { height: 8, borderRadius: "var(--radius-sm)", border: "1px dashed var(--rule-strong)", background: "transparent" } }) : /* @__PURE__ */ React.createElement("div", { style: { height: 8, background: "var(--paper-3)", borderRadius: "var(--radius-sm)", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { width: `${pct}%`, height: "100%", background: skin.fill, transition: "width var(--dur-4) var(--ease-out)" } })));
}

Object.assign(__ds_scope, { ProgressMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ProgressMeter.jsx", error: String((e && e.message) || e) }); }

// components/content/ScoreTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ScoreTable({ columns = [], rows = [], caption, emptyLabel = "No marks recorded yet \u2014 this month sets the baseline.", style, ...rest }) {
  return /* @__PURE__ */ React.createElement("table", { style: { width: "100%", borderCollapse: "collapse", font: "var(--type-body)", fontSize: "var(--size-sm)", ...style }, ...rest }, caption ? /* @__PURE__ */ React.createElement("caption", { style: { textAlign: "left", font: "var(--type-small)", color: "var(--text-muted)", paddingBottom: 10 } }, caption) : null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, columns.map((c, i) => /* @__PURE__ */ React.createElement("th", { key: c, style: { textAlign: i === 0 ? "left" : "right", font: "var(--type-label)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-muted)", padding: "0 0 10px", borderBottom: "1px solid var(--ink-900)" } }, c)))), /* @__PURE__ */ React.createElement("tbody", null, rows.length === 0 ? /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("td", { colSpan: Math.max(columns.length, 1), style: { padding: "16px 0", borderBottom: "1px solid var(--rule)", font: "var(--type-small)", color: "var(--text-muted)" } }, emptyLabel)) : null, rows.map((r, ri) => /* @__PURE__ */ React.createElement("tr", { key: ri }, r.map((cell, ci) => /* @__PURE__ */ React.createElement("td", { key: ci, style: {
    padding: "12px 0",
    borderBottom: "1px solid var(--rule)",
    textAlign: ci === 0 ? "left" : "right",
    color: ci === 0 ? "var(--ink-900)" : "var(--ink-700)",
    fontFamily: ci === 0 ? "var(--font-sans)" : "var(--font-mono)",
    fontVariantNumeric: "tabular-nums"
  } }, cell))))));
}

Object.assign(__ds_scope, { ScoreTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ScoreTable.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  level = 2,
  style,
  ...rest
}) {
  const H = `h${level}`;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      maxWidth: align === "center" ? "var(--measure)" : undefined,
      marginInline: align === "center" ? "auto" : undefined,
      ...style
    }
  }, rest), eyebrow ? /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: 12
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement(H, {
    style: {
      font: "var(--type-h2)",
      letterSpacing: "var(--tracking-tight)",
      color: "var(--ink-900)",
      margin: 0
    }
  }, title), lead ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      marginBottom: 0,
      font: "var(--type-lead)",
      color: "var(--text-muted)",
      maxWidth: "var(--measure)"
    }
  }, lead) : null);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/content/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Stat({
  value,
  label,
  note,
  align = "left",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--weight-semibold) var(--size-2xl)/1 var(--font-serif)`,
      color: "var(--ink-900)",
      letterSpacing: "var(--tracking-tight)"
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      font: "var(--type-small)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--ink-900)"
    }
  }, label), note ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      font: "var(--type-small)",
      color: "var(--text-muted)"
    }
  }, note) : null);
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Stat.jsx", error: String((e && e.message) || e) }); }

// components/content/Testimonial.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Testimonial({
  quote,
  name,
  detail,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      paddingTop: 22,
      borderTop: "3px solid var(--ink-900)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      font: `var(--weight-regular) var(--size-md)/1.5 var(--font-serif)`,
      color: "var(--ink-900)"
    }
  }, quote), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 16,
      font: "var(--type-small)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-900)",
      fontWeight: "var(--weight-semibold)"
    }
  }, name), detail ? /*#__PURE__*/React.createElement("span", null, " \xB7 ", detail) : null));
}
Object.assign(__ds_scope, { Testimonial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Testimonial.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: {
    background: "var(--paper-2)",
    color: "var(--ink-700)",
    border: "1px solid var(--rule)"
  },
  ink: {
    background: "var(--ink-900)",
    color: "var(--paper)",
    border: "1px solid var(--ink-900)"
  },
  slate: {
    background: "var(--slate-100)",
    color: "var(--slate-700)",
    border: "1px solid transparent"
  },
  ochre: {
    background: "var(--ochre-100)",
    color: "var(--ochre-600)",
    border: "1px solid transparent"
  }
};
function Badge({
  tone = "neutral",
  uppercase = false,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 24,
      padding: "0 9px",
      borderRadius: "var(--radius-sm)",
      font: "var(--type-small)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: uppercase ? "var(--tracking-wide)" : 0,
      textTransform: uppercase ? "uppercase" : "none",
      fontSize: uppercase ? "var(--size-2xs)" : "var(--size-xs)",
      whiteSpace: "nowrap",
      ...TONES[tone],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: "var(--control-h-sm)",
    padding: "0 14px",
    fontSize: "var(--size-xs)"
  },
  md: {
    height: "var(--control-h)",
    padding: "0 20px",
    fontSize: "var(--size-sm)"
  },
  lg: {
    height: "var(--control-h-lg)",
    padding: "0 28px",
    fontSize: "var(--size-base)"
  }
};
function Button({ variant = "primary", size = "md", full = false, disabled = false, loading = false, loadingLabel = "Working\u2026", as = "button", href, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const busy = loading && !disabled;
  const inert = disabled || busy;
  const skin = {
    primary: { background: hover && !inert ? "var(--ink-700)" : "var(--ink-900)", color: "var(--paper)", border: "1px solid var(--ink-900)" },
    secondary: { background: hover && !inert ? "var(--paper-2)" : "transparent", color: "var(--ink-900)", border: "1px solid var(--ink-900)" },
    quiet: { background: hover && !inert ? "var(--paper-2)" : "transparent", color: "var(--ink-700)", border: "1px solid var(--rule)" },
    ghost: { background: "transparent", color: hover ? "var(--ink-900)" : "var(--ink-700)", border: "1px solid transparent", padding: "0 4px", textDecoration: hover ? "underline" : "none", textUnderlineOffset: 3 }
  }[variant];
  const Tag = href ? "a" : as;
  return /* @__PURE__ */ React.createElement(
    Tag,
    {
      href: busy ? void 0 : href,
      "aria-disabled": inert || void 0,
      "aria-busy": busy || void 0,
      disabled: Tag === "button" ? inert : void 0,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => {
        setHover(false);
        setPress(false);
      },
      onMouseDown: () => setPress(true),
      onMouseUp: () => setPress(false),
      style: {
        display: full ? "flex" : "inline-flex",
        width: full ? "100%" : void 0,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--weight-semibold)",
        letterSpacing: "0.005em",
        borderRadius: "var(--radius-md)",
        cursor: disabled ? "not-allowed" : busy ? "progress" : "pointer",
        opacity: disabled ? 0.42 : busy ? 0.6 : 1,
        textDecoration: "none",
        pointerEvents: busy ? "none" : void 0,
        transform: press && !inert ? "translateY(1px)" : "none",
        transition: "var(--transition-control), transform var(--dur-1) var(--ease-standard)",
        ...SIZES[size],
        ...skin,
        ...style
      },
      ...rest
    },
    children,
    busy ? /* @__PURE__ */ React.createElement("span", { role: "status", style: { position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" } }, loadingLabel) : null
  );
}

Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Callout.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Callout({
  tone = "slate",
  title,
  children,
  style,
  ...rest
}) {
  const skin = {
    slate: {
      background: "var(--slate-100)",
      accent: "var(--slate-600)"
    },
    ochre: {
      background: "var(--ochre-100)",
      accent: "var(--ochre-600)"
    },
    plain: {
      background: "var(--paper-2)",
      accent: "var(--ink-900)"
    }
  }[tone];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: skin.background,
      borderRadius: "var(--radius-lg)",
      padding: "20px 24px",
      ...style
    }
  }, rest), title ? /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-h3)",
      fontSize: "var(--size-base)",
      color: skin.accent,
      marginBottom: 6
    }
  }, title) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body)",
      fontSize: "var(--size-sm)",
      color: "var(--ink-700)"
    }
  }, children));
}
Object.assign(__ds_scope, { Callout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Callout.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  plain: {
    background: "var(--surface-card)",
    border: "1px solid var(--rule)"
  },
  sunken: {
    background: "var(--surface-sunken)",
    border: "1px solid transparent"
  },
  outline: {
    background: "transparent",
    border: "1px solid var(--ink-900)"
  },
  invert: {
    background: "var(--ink-900)",
    border: "1px solid var(--ink-900)",
    color: "var(--paper)"
  }
};
function Card({
  tone = "plain",
  padding = 28,
  lift = false,
  rule = false,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderRadius: "var(--radius-lg)",
      padding,
      ...TONES[tone],
      borderTop: rule ? "3px solid var(--ink-900)" : undefined,
      boxShadow: lift && hover ? "var(--shadow-lift)" : lift ? "var(--shadow-1)" : "none",
      transition: "box-shadow var(--dur-2) var(--ease-standard)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/WhatsAppButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: "var(--control-h-sm)",
    padding: "8px 14px",
    fontSize: "var(--size-xs)",
    glyph: 16
  },
  md: {
    height: "var(--control-h)",
    padding: "11px 20px",
    fontSize: "var(--size-sm)",
    glyph: 18
  },
  lg: {
    height: "var(--control-h-lg)",
    padding: "14px clamp(16px,4vw,26px)",
    fontSize: "clamp(13.5px,4vw,19px)",
    glyph: 22
  }
};
function WhatsAppButton({
  size = "md",
  full = false,
  phone = "60194728768",
  message = "Hi, I'd like to book the free maths assessment. My child is in ___",
  label = "Book a free maths assessment on WhatsApp",
  note,
  style,
  onClick,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size];
  const href = `https://wa.me/${String(phone).replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: full ? "block" : "inline-block",
      width: full ? "100%" : undefined
    }
  }, /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: "_blank",
    rel: "noreferrer",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: "flex",
      width: full ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      minHeight: s.height,
      padding: s.padding,
      fontSize: s.fontSize,
      lineHeight: 1.25,
      textAlign: "center",
      whiteSpace: "normal",
      textWrap: "balance",
      minWidth: 0,
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--weight-semibold)",
      background: hover ? "var(--wa-green-press)" : "var(--wa-green-btn)",
      color: "var(--white)",
      border: "1px solid rgba(20,22,26,.10)",
      borderRadius: "var(--radius-md)",
      textDecoration: "none",
      boxShadow: hover && !press ? "0 8px 20px -10px rgba(14,122,62,.6)" : "none",
      transform: press ? "translateY(1px)" : hover ? "translateY(-1px)" : "none",
      transition: "var(--transition-control), transform var(--dur-2) var(--ease-standard)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: { display: "flex", flexShrink: 0 }
  }, React.createElement(__ds_scope.WhatsAppGlyph, {
    size: s.glyph
  })), label), note ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 8,
      font: "var(--type-small)",
      color: "var(--text-muted)",
      textAlign: full ? "center" : "left"
    }
  }, note) : null);
}
Object.assign(__ds_scope, { WhatsAppButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/WhatsAppButton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Accordion.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Height-animated panel: measures its content, transitions to that height. */
function Panel({ open, id, labelledBy, children }) {
  const inner = React.useRef(null);
  const [h, setH] = React.useState(0);
  React.useEffect(() => {
    if (!inner.current) return;
    setH(open ? inner.current.scrollHeight : 0);
  }, [open, children]);
  return (
    /* `inert` rather than `hidden` when closed: height:0 + overflow:hidden alone leaves the
       answer focusable and readable by a screen reader, but `hidden` sets display:none and
       would kill the measured-height animation. `inert` removes it from tab order and the
       accessibility tree while leaving layout — and therefore the transition — intact. */
    /* @__PURE__ */ React.createElement(
      "div",
      {
        id,
        role: "region",
        "aria-labelledby": labelledBy,
        inert: open ? void 0 : "",
        style: { height: h, opacity: open ? 1 : 0, overflow: "hidden", transition: "height var(--dur-3) var(--ease-standard), opacity var(--dur-3) var(--ease-standard)" }
      },
      /* @__PURE__ */ React.createElement("div", { ref: inner }, children)
    )
  );
}

function Cross({
  open
}) {
  const bar = {
    position: "absolute",
    top: "50%",
    left: "50%",
    background: "var(--ink-600)",
    transition: "transform var(--dur-3) var(--ease-standard)"
  };
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "relative",
      flex: "none",
      width: 15,
      height: 15,
      marginTop: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      width: "100%",
      height: 2,
      transform: `translate(-50%,-50%) rotate(${open ? 180 : 0}deg)`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...bar,
      width: 2,
      height: "100%",
      transform: `translate(-50%,-50%) rotate(${open ? 270 : 0}deg)`
    }
  }));
}
function Accordion({ items = [], defaultOpen = 0, idPrefix = "faq", style, ...rest }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [hover, setHover] = React.useState(-1);
  return /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid var(--rule)", ...style }, ...rest }, items.map((it, i) => {
    const isOpen = open === i;
    const btnId = `${idPrefix}-q-${i}`;
    const panelId = `${idPrefix}-a-${i}`;
    return /* @__PURE__ */ React.createElement("div", { key: i, style: { borderBottom: "1px solid var(--rule)" } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        id: btnId,
        onClick: () => setOpen(isOpen ? -1 : i),
        onMouseEnter: () => setHover(i),
        onMouseLeave: () => setHover(-1),
        "aria-expanded": isOpen,
        "aria-controls": panelId,
        style: {
          display: "flex",
          width: "100%",
          gap: 16,
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: "none",
          border: 0,
          padding: "20px 0",
          cursor: "pointer",
          textAlign: "left",
          font: "var(--weight-medium) clamp(16px,1.7vw,19px)/1.4 var(--font-sans)",
          color: hover === i || isOpen ? "var(--ink-900)" : "var(--ink-700)",
          transition: "color var(--dur-1) var(--ease-standard)"
        }
      },
      /* @__PURE__ */ React.createElement("span", null, it.q),
      /* @__PURE__ */ React.createElement(Cross, { open: isOpen })
    ), /* @__PURE__ */ React.createElement(Panel, { open: isOpen, id: panelId, labelledBy: btnId }, /* @__PURE__ */ React.createElement("p", { style: { font: "var(--weight-regular) clamp(15px,1.6vw,17px)/1.62 var(--font-sans)", color: "var(--text-body)", maxWidth: "var(--measure)", margin: "0 0 24px" } }, it.a)));
  }));
}

Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({ label, description, checked, defaultChecked, onChange, disabled = false, invalid = false, error, style, ...rest }) {
  return /* @__PURE__ */ React.createElement("label", { style: { display: "block", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.42 : 1, ...style } }, /* @__PURE__ */ React.createElement("span", { style: { display: "flex", gap: 12, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "checkbox",
      checked,
      defaultChecked,
      onChange,
      disabled,
      "aria-invalid": invalid || !!error || void 0,
      style: {
        width: 18,
        height: 18,
        marginTop: 2,
        accentColor: "var(--ink-900)",
        borderRadius: "var(--radius-sm)",
        flex: "none",
        /* The native box will not take a border colour reliably, so an invalid checkbox is
           ringed with a box-shadow — NOT an outline. Using outline here would overwrite the
           global :focus-visible outline and make keyboard focus vanish on a valid checkbox. */
        boxShadow: invalid || error ? "0 0 0 2px var(--danger-600)" : void 0
      },
      ...rest
    }
  ), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { style: { display: "block", font: "var(--type-body)", fontSize: "var(--size-sm)", color: "var(--ink-900)" } }, label), description ? /* @__PURE__ */ React.createElement("span", { style: { display: "block", marginTop: 2, font: "var(--type-small)", color: "var(--text-muted)" } }, description) : null)), error ? /* @__PURE__ */ React.createElement("span", { style: { display: "block", marginTop: 6, marginLeft: 30, font: "var(--type-small)", color: "var(--danger-600)" } }, error) : null);
}

Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({ label, hint, error, success, required = false, htmlFor, children, style, ...rest }) {
  const note = error ? { text: error, color: "var(--danger-600)", mark: "\u2715", role: "alert" } : success ? { text: success, color: "var(--slate-600)", mark: "\u2713", role: "status" } : hint ? { text: hint, color: "var(--text-muted)", mark: null, role: void 0 } : null;
  return /* @__PURE__ */ React.createElement("label", { htmlFor, style: { display: "block", ...style }, ...rest }, /* @__PURE__ */ React.createElement("span", { style: { display: "block", font: "var(--type-small)", fontWeight: "var(--weight-semibold)", color: "var(--ink-900)", marginBottom: 6 } }, label, required ? /* @__PURE__ */ React.createElement("span", { style: { color: "var(--text-faint)", fontWeight: 400 } }, " \xB7 required") : null), children, note ? /* @__PURE__ */ React.createElement("span", { role: note.role, style: { display: "flex", gap: 6, marginTop: 6, font: "var(--type-small)", color: note.color } }, note.mark ? /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true" }, note.mark) : null, /* @__PURE__ */ React.createElement("span", null, note.text)) : null);
}

Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Input({ invalid = false, disabled = false, multiline = false, rows = 4, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  const Tag = multiline ? "textarea" : "input";
  return /* @__PURE__ */ React.createElement(
    Tag,
    {
      rows: multiline ? rows : void 0,
      disabled,
      "aria-invalid": invalid || void 0,
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      style: {
        width: "100%",
        height: multiline ? void 0 : "var(--control-h)",
        padding: multiline ? "12px 14px" : "0 14px",
        font: "var(--type-body)",
        fontSize: "var(--size-sm)",
        lineHeight: multiline ? 1.55 : void 0,
        color: "var(--ink-900)",
        /* Disabled dims without changing hue — the brand rule is 42% opacity, no colour shift. */
        background: "var(--white)",
        borderRadius: "var(--radius-md)",
        opacity: disabled ? 0.42 : 1,
        cursor: disabled ? "not-allowed" : void 0,
        border: `1px solid ${invalid ? "var(--danger-600)" : focus ? "var(--ink-900)" : "var(--rule-strong)"}`,
        /* No `outline: none`. The slate ring is an enhancement on top of the global
           :focus-visible outline, never a replacement for it — box-shadow is dropped in
           forced-colors mode, and the outline is what survives there. */
        boxShadow: focus && !disabled ? "var(--ring)" : "none",
        resize: multiline ? "vertical" : void 0,
        transition: "var(--transition-control)",
        ...style
      },
      ...rest
    }
  );
}

Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/RadioGroup.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function RadioGroup({ name, options = [], value, onChange, columns = 1, disabled = false, invalid = false, style, ...rest }) {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      role: "radiogroup",
      "aria-invalid": invalid || void 0,
      "aria-disabled": disabled || void 0,
      style: { display: "grid", gridTemplateColumns: `repeat(${columns},1fr)`, gap: 10, opacity: disabled ? 0.42 : 1, ...style },
      ...rest
    },
    options.map((o) => {
      const val = typeof o === "string" ? o : o.value;
      const label = typeof o === "string" ? o : o.label;
      const note = typeof o === "string" ? null : o.note;
      const on = value === val;
      const off = disabled || typeof o === "object" && o.disabled;
      return /* @__PURE__ */ React.createElement("label", { key: val, style: {
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        padding: "12px 14px",
        cursor: off ? "not-allowed" : "pointer",
        opacity: !disabled && off ? 0.42 : 1,
        background: on ? "var(--paper-2)" : "var(--white)",
        borderRadius: "var(--radius-md)",
        border: `1px solid ${invalid && !on ? "var(--danger-600)" : on ? "var(--ink-900)" : "var(--rule-strong)"}`,
        transition: "var(--transition-control)"
      } }, /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "radio",
          name,
          value: val,
          checked: on,
          disabled: off,
          onChange: () => onChange && onChange(val),
          style: { width: 16, height: 16, marginTop: 3, accentColor: "var(--ink-900)", flex: "none" }
        }
      ), /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("span", { style: { display: "block", font: "var(--type-body)", fontSize: "var(--size-sm)", color: "var(--ink-900)" } }, label), note ? /* @__PURE__ */ React.createElement("span", { style: { display: "block", marginTop: 2, font: "var(--type-small)", color: "var(--text-muted)" } }, note) : null));
    })
  );
}

Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({ options = [], invalid = false, disabled = false, placeholder, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return /* @__PURE__ */ React.createElement("span", { style: { position: "relative", display: "block", opacity: disabled ? 0.42 : 1 } }, /* @__PURE__ */ React.createElement(
    "select",
    {
      disabled,
      "aria-invalid": invalid || void 0,
      onFocus: () => setFocus(true),
      onBlur: () => setFocus(false),
      style: {
        width: "100%",
        height: "var(--control-h)",
        padding: "0 38px 0 14px",
        font: "var(--type-body)",
        fontSize: "var(--size-sm)",
        color: "var(--ink-900)",
        background: "var(--white)",
        borderRadius: "var(--radius-md)",
        appearance: "none",
        cursor: disabled ? "not-allowed" : void 0,
        border: `1px solid ${invalid ? "var(--danger-600)" : focus ? "var(--ink-900)" : "var(--rule-strong)"}`,
        /* No `outline: none` — see Input.jsx. The ring supplements the global focus
           outline; it never replaces it. */
        boxShadow: focus && !disabled ? "var(--ring)" : "none",
        transition: "var(--transition-control)",
        ...style
      },
      ...rest
    },
    placeholder ? /* @__PURE__ */ React.createElement("option", { value: "" }, placeholder) : null,
    options.map((o) => {
      const value = typeof o === "string" ? o : o.value;
      const label = typeof o === "string" ? o : o.label;
      return /* @__PURE__ */ React.createElement("option", { key: value, value }, label);
    })
  ), /* @__PURE__ */ React.createElement("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", width: "14", height: "14", style: { position: "absolute", right: 14, top: "50%", marginTop: -7, pointerEvents: "none" } }, /* @__PURE__ */ React.createElement("path", { d: "M3 6l5 5 5-5", fill: "none", stroke: "var(--ink-600)", strokeWidth: "1.6" })));
}

Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SiteFooter({
  columns = [],
  note,
  phone = "+60 12-345 6789",
  email = "hello@mathematicsmalaysia.com",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      background: "var(--ink-900)",
      color: "var(--paper)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      padding: "64px var(--gutter) 48px",
      display: "grid",
      gridTemplateColumns: "1.4fr repeat(auto-fit, minmax(140px, 1fr))",
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    reversed: true,
    size: 22
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 18,
      marginBottom: 0,
      font: "var(--type-small)",
      color: "var(--ink-300)",
      maxWidth: "34ch"
    }
  }, "One tutor, one student. Online lessons across Malaysia.")), columns.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.title
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--ink-400)",
      marginBottom: 14
    }
  }, c.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "grid",
      gap: 10
    }
  }, c.items.map(i => /*#__PURE__*/React.createElement("li", {
    key: i.label
  }, /*#__PURE__*/React.createElement("a", {
    href: i.href || "#",
    style: {
      font: "var(--type-small)",
      color: "var(--paper)",
      textDecoration: "none",
      opacity: 0.86
    }
  }, i.label)))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--ink-400)",
      marginBottom: 14
    }
  }, "Get in touch"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 10,
      font: "var(--type-small)",
      color: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, phone), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${email}`,
    style: {
      color: "var(--paper)",
      textDecoration: "none",
      opacity: 0.86
    }
  }, email)))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(251,250,247,.14)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      padding: "20px var(--gutter)",
      font: "var(--type-small)",
      color: "var(--ink-400)"
    }
  }, note || "© 2026 Just Math Malaysia")));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SiteHeader({ links = [], active, onNavigate, phone = "60123456789", sticky = true, style, ...rest }) {
  return /* @__PURE__ */ React.createElement("header", { style: {
    position: sticky ? "sticky" : "static",
    top: 0,
    zIndex: 20,
    background: "rgba(251,250,247,.88)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid var(--rule)",
    ...style
  }, ...rest }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "var(--page-max)", margin: "0 auto", padding: "0 var(--gutter)", height: 76, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24 } }, /* @__PURE__ */ React.createElement("a", { href: "#top", onClick: (e) => {
    e.preventDefault();
    onNavigate && onNavigate("#top");
  }, style: { textDecoration: "none", display: "inline-flex" } }, /* @__PURE__ */ React.createElement(Logo, { size: 24 })), /* @__PURE__ */ React.createElement("nav", { style: { display: "flex", alignItems: "center", gap: 28 } }, links.map((l) => /* @__PURE__ */ React.createElement(
    "a",
    {
      key: l.href,
      href: l.href,
      onClick: (e) => {
        if (onNavigate) {
          e.preventDefault();
          onNavigate(l.href);
        }
      },
      style: {
        font: "var(--type-body)",
        fontSize: "var(--size-sm)",
        textDecoration: "none",
        color: active === l.href ? "var(--ink-900)" : "var(--ink-600)",
        borderBottom: `2px solid ${active === l.href ? "var(--ink-900)" : "transparent"}`,
        paddingBottom: 2,
        transition: "var(--transition-control)"
      }
    },
    l.label
  )), /* @__PURE__ */ React.createElement(WhatsAppButton, { size: "sm", phone, label: "Message on WhatsApp" }))));
}

Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/booking/Booking.jsx
try { (() => {
const {
  Logo,
  Badge,
  Button,
  Card,
  WhatsAppButton
} = window.JustMathDesignSystem_270e96;

/* A stylised representation of the booking conversation as a parent experiences it.
   Not a recreation of the WhatsApp client — generic thread chrome, brand colours. */

const SCRIPT = [{
  from: "parent",
  text: "Hi, I saw your site. My son is Form 4, Add Maths. He failed the last test."
}, {
  from: "tutor",
  text: "Thanks for messaging. Which chapters was the test on?"
}, {
  from: "parent",
  text: "Functions and quadratics I think."
}, {
  from: "tutor",
  text: "That's the usual pair. Two slots free this week — Tuesday 8pm or Saturday 10am. One hour, RM90, paid after."
}];
const CHOICES = [{
  id: "tue",
  label: "Tuesday 8pm",
  reply: "Tuesday 8pm works."
}, {
  id: "sat",
  label: "Saturday 10am",
  reply: "Saturday 10am please."
}, {
  id: "ask",
  label: "Ask something first",
  reply: "Before we book — is it on Zoom or something else?"
}];
const FOLLOWUP = {
  tue: [{
    from: "tutor",
    text: "Booked — Tuesday 8pm. I'll send the whiteboard link an hour before. Nothing to install.",
    card: {
      day: "Tuesday",
      time: "8:00–9:00pm",
      who: "Form 4 · Additional Mathematics"
    }
  }],
  sat: [{
    from: "tutor",
    text: "Booked — Saturday 10am. I'll send the whiteboard link an hour before. Nothing to install.",
    card: {
      day: "Saturday",
      time: "10:00–11:00am",
      who: "Form 4 · Additional Mathematics"
    }
  }],
  ask: [{
    from: "tutor",
    text: "A shared whiteboard in the browser — nothing to install. I record nothing; you're welcome to sit in."
  }, {
    from: "tutor",
    text: "Tuesday 8pm or Saturday 10am, whichever suits."
  }]
};
function Bubble({
  from,
  children
}) {
  const mine = from === "parent";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: mine ? "flex-end" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "78%",
      padding: "10px 14px",
      borderRadius: "var(--radius-lg)",
      background: mine ? "var(--wa-green-100)" : "var(--white)",
      border: "1px solid " + (mine ? "transparent" : "var(--rule)"),
      font: "var(--type-body)",
      fontSize: "var(--size-sm)",
      lineHeight: 1.5,
      color: "var(--ink-900)",
      boxShadow: "var(--shadow-1)"
    }
  }, children));
}
function BookingCard({
  day,
  time,
  who
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--white)",
      border: "1px solid var(--rule)",
      borderTop: "3px solid var(--ink-900)",
      borderRadius: "var(--radius-lg)",
      padding: 16,
      boxShadow: "var(--shadow-1)",
      maxWidth: "82%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: 10
    }
  }, "Lesson confirmed"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--weight-semibold) var(--size-md)/1.25 var(--font-serif)",
      color: "var(--ink-900)"
    }
  }, day, " \xB7 ", time), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-muted)",
      marginTop: 6
    }
  }, who), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 16,
      marginTop: 14,
      font: "var(--type-small)",
      color: "var(--ink-700)",
      fontFamily: "var(--font-mono)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "RM90"), /*#__PURE__*/React.createElement("span", null, "60 min"), /*#__PURE__*/React.createElement("span", null, "1:1")));
}
function Phone({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      background: "var(--paper)",
      border: "1px solid var(--rule-strong)",
      borderRadius: 14,
      overflow: "hidden",
      boxShadow: "var(--shadow-lift)",
      display: "flex",
      flexDirection: "column",
      height: 760
    }
  }, children);
}
function Thread() {
  const [step, setStep] = React.useState(0);
  const [messages, setMessages] = React.useState(SCRIPT);
  const [done, setDone] = React.useState(false);
  const choose = c => {
    const next = [...messages, {
      from: "parent",
      text: c.reply
    }, ...FOLLOWUP[c.id]];
    setMessages(next);
    setStep(step + 1);
    if (c.id !== "ask") setDone(true);
  };
  const reset = () => {
    setMessages(SCRIPT);
    setStep(0);
    setDone(false);
  };
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "14px 16px",
      background: "var(--ink-900)",
      color: "var(--paper)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/monogram-operators-square.svg",
    width: "40",
    height: "40",
    alt: "",
    style: {
      borderRadius: "999px",
      border: "1px solid rgba(251,250,247,.2)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body)",
      fontSize: "var(--size-sm)",
      fontWeight: "var(--weight-semibold)"
    }
  }, "Just Math Malaysia"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-small)",
      fontSize: 12,
      color: "var(--ink-300)"
    }
  }, "Business account \xB7 typically replies same day"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: 16,
      display: "grid",
      gap: 10,
      alignContent: "start",
      background: "var(--paper-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: "center",
      font: "var(--type-small)",
      fontSize: 12,
      color: "var(--text-muted)",
      background: "var(--paper)",
      border: "1px solid var(--rule)",
      borderRadius: "var(--radius-pill)",
      padding: "3px 12px"
    }
  }, "Today"), messages.map((m, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement(Bubble, {
    from: m.from
  }, m.text), m.card ? /*#__PURE__*/React.createElement(BookingCard, m.card) : null))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--rule)",
      padding: 14,
      background: "var(--paper)"
    }
  }, done ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-muted)"
    }
  }, "That's the whole booking flow \u2014 four messages, no forms."), /*#__PURE__*/React.createElement(Button, {
    variant: "quiet",
    size: "sm",
    onClick: reset
  }, "Replay the conversation")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--text-faint)"
    }
  }, "Reply"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, CHOICES.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    onClick: () => choose(c),
    style: {
      font: "var(--type-body)",
      fontSize: "var(--size-xs)",
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--weight-medium)",
      height: 36,
      padding: "0 14px",
      cursor: "pointer",
      color: "var(--ink-900)",
      background: "var(--white)",
      border: "1px solid var(--rule-strong)",
      borderRadius: "var(--radius-pill)"
    }
  }, c.label))))));
}
function BookingKit() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "390px 1fr",
      gap: 56,
      alignItems: "start",
      maxWidth: 1040,
      margin: "0 auto",
      padding: "48px var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement(Thread, null), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 22
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 28
    }
  }, "The booking flow is a conversation."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      color: "var(--text-muted)",
      maxWidth: "44ch",
      marginTop: 14
    }
  }, "There is no calendar widget and no account. A parent messages, gets two times, picks one. The confirmation is a card in the thread."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 14,
      marginTop: 28
    }
  }, [["Entry", "Every green control on the site opens this thread with the message prefilled."], ["Avatar", "The operator mark, reversed, at 40px — the only place the mark appears in WhatsApp."], ["Tone", "Short lines. A time, a price, what happens next. No emoji, no exclamation marks."], ["Confirmation", "An ink-ruled card: day, time, level, fee, length. Nothing a parent has to remember."]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "grid",
      gridTemplateColumns: "120px 1fr",
      gap: 16,
      paddingBottom: 14,
      borderBottom: "1px solid var(--rule)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--text-faint)"
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-small)",
      color: "var(--ink-700)"
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(WhatsAppButton, {
    size: "md",
    label: "Start this thread",
    note: "This is what the parent taps on the site."
  }))));
}
Object.assign(window, {
  BookingKit,
  Thread,
  Bubble,
  BookingCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/booking/Booking.jsx", error: String((e && e.message) || e) }); }

// ui_kits/reports/Report.jsx
try { (() => {
const {
  Logo,
  Badge,
  Card,
  Callout,
  ProgressMeter,
  ScoreTable,
  Button,
  SectionHeading
} = window.JustMathDesignSystem_270e96;
const MONTHS = {
  "March 2026": {
    summary: "A good month. Quadratics are secure — she solved the whole of Exercise 4.3 without prompting, which she couldn't do in February. Surds are the weak spot and they will come up in the mid-year paper, so that's where we'll spend April.",
    topics: [["Quadratic equations", "secure"], ["Simultaneous equations", "secure"], ["Indices and logarithms", "building"], ["Surds", "practise"]],
    scores: [["Chapter 3 test", 34, 40], ["Chapter 4 test", 28, 40], ["Homework returned", 7, 8]],
    attendance: [["Lessons held", 4], ["Attended", 4], ["Rescheduled", 0]],
    next: "Ten minutes of surds, three times a week. Exercise 5.1, questions 1–8. She does not need more quadratics practice."
  },
  "February 2026": {
    summary: "Slower month — two lessons landed in the school test week. Quadratics moved from shaky to workable. She still writes the second line before the first; we're working on setting out.",
    topics: [["Quadratic equations", "building"], ["Simultaneous equations", "building"], ["Indices and logarithms", "practise"], ["Surds", "practise"]],
    scores: [["Chapter 3 test", 24, 40], ["Homework returned", 5, 8]],
    attendance: [["Lessons held", 4], ["Attended", 3], ["Rescheduled", 1]],
    next: "Set out every line, even the obvious ones. Exercise 4.2 again, slowly."
  }
};
function Letterhead({
  month
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      paddingBottom: 22,
      borderBottom: "3px solid var(--ink-900)"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    size: 22
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "Progress report"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: "var(--type-body)",
      fontSize: "var(--size-sm)",
      fontFamily: "var(--font-mono)",
      color: "var(--ink-900)",
      marginTop: 4
    }
  }, month)));
}
function Block({
  title,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...style
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "var(--type-label)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: 14
    }
  }, title), children);
}
function Report({
  month
}) {
  const d = MONTHS[month];
  return /*#__PURE__*/React.createElement("article", {
    style: {
      background: "var(--white)",
      border: "1px solid var(--rule)",
      borderRadius: "var(--radius-lg)",
      padding: 56,
      maxWidth: "var(--doc-max)",
      boxShadow: "var(--shadow-1)"
    }
  }, /*#__PURE__*/React.createElement(Letterhead, {
    month: month
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 20,
      margin: "28px 0 8px"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0
    }
  }, "Nurul binti Azman"), /*#__PURE__*/React.createElement(Badge, {
    tone: "slate"
  }, "Form 3 \xB7 KSSM")), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-muted)",
      marginBottom: 34
    }
  }, "Tuesdays, 8:00\u20139:00pm \xB7 online, one to one"), /*#__PURE__*/React.createElement(Block, {
    title: "How this month went",
    style: {
      marginBottom: 34
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body)",
      margin: 0,
      maxWidth: "var(--measure)"
    }
  }, d.summary)), /*#__PURE__*/React.createElement(Block, {
    title: "Topics",
    style: {
      marginBottom: 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 14
    }
  }, d.topics.map(([t, l]) => /*#__PURE__*/React.createElement(ProgressMeter, {
    key: t,
    topic: t,
    level: l
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.3fr .7fr",
      gap: 34,
      marginBottom: 34
    }
  }, /*#__PURE__*/React.createElement(Block, {
    title: "Marks"
  }, /*#__PURE__*/React.createElement(ScoreTable, {
    columns: ["Assessment", "Score", "Out of"],
    rows: d.scores
  })), /*#__PURE__*/React.createElement(Block, {
    title: "Attendance"
  }, /*#__PURE__*/React.createElement(ScoreTable, {
    columns: ["", ""],
    rows: d.attendance
  }))), /*#__PURE__*/React.createElement(Callout, {
    tone: "ochre",
    title: "To practise before the next report"
  }, d.next), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-muted)",
      marginTop: 34,
      marginBottom: 0,
      paddingTop: 20,
      borderTop: "1px solid var(--rule)"
    }
  }, "Questions about any of this? Message me \u2014 it's usually quicker than email."));
}
function ReportKit() {
  const [month, setMonth] = React.useState("March 2026");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 48,
      maxWidth: 1120,
      margin: "0 auto",
      padding: "48px var(--gutter)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(Report, {
    month: month
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 260,
      position: "sticky",
      top: 48
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    eyebrow: "Reports",
    title: "One page. Every month."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-small)",
      color: "var(--text-muted)",
      marginTop: 14
    }
  }, "Sent at the end of each month. Same four blocks every time so a parent can compare months at a glance."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 8,
      marginTop: 24
    }
  }, Object.keys(MONTHS).map(m => /*#__PURE__*/React.createElement(Button, {
    key: m,
    variant: m === month ? "primary" : "quiet",
    size: "sm",
    full: true,
    onClick: () => setMonth(m)
  }, m))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    full: true,
    onClick: () => window.print()
  }, "Print / save as PDF"))));
}
Object.assign(window, {
  ReportKit,
  Report,
  Letterhead,
  Block
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/reports/Report.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/LandingArgument.jsx
try { (() => {
/* Sections 3–5: the argument. */

const PROBLEM_PARAS = ["Here is when a Malaysian student’s maths gets independently measured now.", "Year 4, from October 2026. The Examinations Board runs the new Learning Matrix nationally, and Mathematics is one of the four papers. The Ministry has been clear that it is a diagnostic rather than a ranking exercise, and that the point is to give schools time to intervene in Years 5 and 6.", "Form 3, from 2027. Same idea, five papers this time.", "Then SPM.", "That is the whole picture. Nothing in Standard 1, 2 or 3. Nothing in Standard 5 or 6. Nothing in Form 1, Form 2 or Form 4. And the longest unchecked stretch in the entire system is the one that matters most: from the Form 3 assessment to the SPM paper, your child sits Form 4 and Form 5 with no independent measure of their maths at all. Form 4 is also the year Additional Mathematics arrives and starts charging interest on every gap left over from earlier.", "School reports fill some of that space, and good teachers catch a lot. But a report card gives you a grade. It rarely tells you that your Form 2 student is struggling with algebraic fractions because they never understood a fraction as a division in the first place, six years earlier.", "That is a different question, and it takes someone sitting with the child for half an hour to answer it."];
const MEASURED = {
  "Standard 4": "OCT 2026",
  "Form 3": "FROM 2027",
  "Form 5": "SPM"
};
function Problem() {
  const wide = useDesktop();
  return /*#__PURE__*/React.createElement(Section, {
    id: "problem",
    ruled: true
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Marker, {
    n: "01",
    label: "The gap"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "minmax(0,1.08fr) minmax(0,1fr)" : "1fr",
      gap: wide ? "clamp(44px,6vw,88px)" : 40,
      alignItems: "start",
      marginTop: "clamp(24px,3vw,36px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: wide ? "sticky" : "static",
      top: 92
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(H2, {
    measure: "19ch"
  }, "The school system checks your child\u2019s maths twice before SPM"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 18,
      marginTop: "clamp(26px,3.2vw,40px)"
    }
  }, /*#__PURE__*/React.createElement(Figure, {
    value: "2",
    size: T.figure
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-regular) ${T.small}/1.45 var(--font-sans)`,
      color: "var(--text-muted)",
      maxWidth: "16ch",
      paddingBottom: "0.6em"
    }
  }, "independent checks in eleven years of schooling"))), /*#__PURE__*/React.createElement(Reveal, {
    variant: "still"
  }, /*#__PURE__*/React.createElement(GapChart, {
    style: {
      marginTop: "clamp(26px,3.2vw,40px)"
    }
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement(Prose, {
    paras: PROBLEM_PARAS
  })))));
}
const WHY_OPENING = ["Every session is live on Google Meet, one tutor and your child. No recordings to work through alone, no worksheets emailed over and marked later, no class of twenty where the quiet ones stay quiet.", "The first ten minutes are usually the last session’s homework, worked out loud. Not marked in silence. Worked out loud, so the mistake gets caught at the exact step where it happens. A child who writes the right answer for the wrong reason looks identical to a child who understands it, right up until the topic gets harder.", "Then new material, at whatever pace the child actually moves. If Standard 4 fractions are still shaky in Form 1, we go back and fix fractions. A centre working through a fixed syllabus on a fixed schedule cannot do that. It is not the tutor’s fault, there are nineteen other students in the room."];
const WHY_PARTS = [{
  h: "Every step, written out",
  p: ["Working is shown line by line, every time, including the steps most people skip because they seem obvious. The steps that seem obvious to a teacher are usually the exact ones a struggling student cannot see. A student who watches a solution appear in three lines learns nothing. A student who watches it appear in eleven can reproduce it on their own."]
}, {
  h: "Online is not a downgrade, and I have ten years of evidence",
  p: ["I moved teaching online in 2016, four years before everyone else had to. Screen sharing and a shared digital whiteboard mean you see the working step by step in both directions, which for maths is closer to sitting beside someone than a classroom is, because in a classroom the student is looking at a board six metres away.", "No travel either. That is thirty to sixty minutes a day back, and for a Form 5 student in the middle of SPM year that is not a small thing."]
}, {
  h: "Taught in the language your child thinks in",
  p: ["Sessions run in English or Bahasa Melayu, and switch mid-explanation when that is what it takes. A student who understands the maths but not the wording of the question does not have a maths problem, and treating it as one wastes everybody’s time."]
}, {
  h: "How you see progress",
  p: ["At the end of every month you get a written progress summary: what was covered, what improved, what is still weak, what we are working on next. Not a WhatsApp message saying “she’s doing well.”"]
}, {
  h: "What a self-study app cannot do",
  p: ["An app can tell you a question was answered wrongly. It cannot tell you why. The why is almost always a concept from two or three years earlier, and finding it is the job."]
}];

/* Modern card: hairline that inks on hover, index chip, lift. */
function WhyCard({
  index,
  title,
  paras,
  feature,
  wide
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      height: "100%",
      background: "var(--white)",
      border: `1px solid ${hover ? "var(--ink-900)" : "var(--rule)"}`,
      borderRadius: "var(--radius-lg)",
      padding: "clamp(22px,2.8vw,34px)",
      overflow: "hidden",
      boxShadow: hover ? "var(--shadow-lift)" : "var(--shadow-1)",
      transform: hover ? "translateY(-3px)" : "none",
      transition: "transform var(--dur-3) var(--ease-standard), box-shadow var(--dur-3) var(--ease-standard), border-color var(--dur-2) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: "var(--ink-900)",
      transform: hover ? "scaleX(1)" : "scaleX(0)",
      transformOrigin: "left",
      transition: "transform var(--dur-4) var(--ease-out)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 30,
      height: 24,
      padding: "0 8px",
      borderRadius: "var(--radius-sm)",
      background: hover ? "var(--ink-900)" : "var(--surface-sunken)",
      font: `var(--weight-semibold) 12px/1 var(--font-mono)`,
      letterSpacing: "0.02em",
      color: hover ? "var(--paper)" : "var(--ink-500)",
      transition: "var(--transition-control)"
    }
  }, index), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      flex: 1,
      height: 1,
      background: "var(--rule)"
    }
  })), /*#__PURE__*/React.createElement(H3, {
    style: {
      fontSize: feature ? "clamp(20px,2.4vw,28px)" : "clamp(18px,2vw,22px)"
    }
  }, title), /*#__PURE__*/React.createElement(Prose, {
    paras: paras,
    size: feature ? T.body : T.small,
    style: {
      marginTop: 14,
      maxWidth: "48ch"
    }
  }));
}
function WhyOneToOne() {
  const wide = useDesktop();
  return /*#__PURE__*/React.createElement(Section, {
    id: "sessions",
    ground: "sunken"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Marker, {
    n: "02",
    label: "One to one"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "minmax(0,.9fr) minmax(0,1.1fr)" : "1fr",
      gap: wide ? "clamp(44px,6vw,88px)" : 32,
      alignItems: "start",
      marginTop: "clamp(24px,3vw,36px)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(H2, {
    measure: "15ch"
  }, "What a session actually looks like")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement(Prose, {
    paras: WHY_OPENING,
    size: T.lead,
    measure: "56ch"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "repeat(6,1fr)" : "1fr",
      gap: wide ? "clamp(20px,2.4vw,32px)" : 20,
      marginTop: "clamp(48px,6vw,88px)"
    }
  }, WHY_PARTS.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.h,
    delay: i % 3 * 90,
    style: {
      gridColumn: wide ? i < 2 ? "span 3" : "span 2" : undefined
    }
  }, /*#__PURE__*/React.createElement(WhyCard, {
    index: String(i + 1).padStart(2, "0"),
    title: s.h,
    paras: s.p,
    feature: i < 2,
    wide: wide
  })))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Cta, {
    align: "center",
    style: {
      marginTop: "clamp(44px,5.5vw,72px)"
    }
  }))));
}
const LEVELS = [{
  range: "Standard 1–6",
  span: "Ages 7 to 12",
  dek: "Building number confidence before the gaps become invisible.",
  items: ["Arithmetic fluency, place value, fractions and decimals, and word problems where the maths is easy but reading the question is not.", "Early maths anxiety, usually caused by a child being moved on before the previous idea was solid.", "If your child is in Year 4 this year, they sit the Learning Matrix maths paper on 6 to 8 October. An assessment now tells you what they will find out in October, with Years 5 and 6 still available to act on it."]
}, {
  range: "Form 1–3",
  span: "Lower secondary",
  dek: "Where maths stops being arithmetic and starts being abstract.",
  items: ["Algebraic expressions, indices, linear equations, and the general shift from working with numbers to working with letters. This is where most students who “were always good at maths” first stall.", "Gaps from primary school surface here, and they surface quietly, as slightly lower marks rather than obvious failure.", "Form 3 ends with the stream decision. Whether Additional Mathematics is realistic in Form 4 depends on how solid the algebra is now, and that is worth knowing before the form gets signed."]
}, {
  range: "Form 4–5",
  span: "SPM years",
  dek: "Modern Mathematics, Additional Mathematics, and the SPM paper.",
  items: ["Additional Mathematics: functions, quadratic equations, indices and logarithms, progressions, trigonometry, differentiation and integration. Every one of these sits on Form 1 to Form 3 algebra, which is why Add Maths punishes students who were carried through lower secondary.", "Modern Mathematics for SPM, including the topics students routinely drop marks on for reasons of technique rather than understanding.", "Exam technique and timing. Knowing the maths and finishing the paper are two different skills, and only one of them gets taught in school.", "If STPM, matrikulasi or a foundation programme is the plan after SPM, the maths grade requirement is worth checking early rather than in Form 5."]
}, {
  range: "IGCSE",
  span: "International syllabus",
  dek: "Same tutor, different syllabus.",
  items: ["IGCSE Mathematics and IGCSE Additional Mathematics, taught to the international syllabus rather than translated across from SPM.", "International school students in the years below IGCSE are welcome. The maths underneath is the same maths, and the gaps show up in the same places."]
}];
function Levels() {
  const wide = useDesktop();
  return /*#__PURE__*/React.createElement(Section, {
    id: "levels",
    ruled: true
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Marker, {
    n: "03",
    label: "Levels taught"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "clamp(28px,3.4vw,44px)"
    }
  }, LEVELS.map((l, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: l.range,
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "minmax(0,.72fr) minmax(0,1.28fr)" : "1fr",
      gap: wide ? "clamp(32px,5vw,80px)" : 20,
      paddingBlock: "clamp(30px,4vw,52px)",
      borderTop: `${i === 0 ? 3 : 1}px solid ${i === 0 ? "var(--ink-900)" : "var(--rule-strong)"}`,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: wide ? "sticky" : "static",
      top: 92
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--weight-medium) ${T.micro}/1 var(--font-mono)`,
      color: "var(--text-faint)",
      marginBottom: 12
    }
  }, String(i + 1).padStart(2, "0"), " / 04"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--weight-semibold) clamp(28px,4vw,50px)/0.98 var(--font-serif)`,
      letterSpacing: "-0.035em",
      color: "var(--ink-900)"
    }
  }, l.range), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      font: `var(--weight-medium) ${T.small}/1.3 var(--font-mono)`,
      color: "var(--ochre-600)",
      letterSpacing: "0.01em"
    }
  }, l.span)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(P, {
    size: T.lead,
    measure: "38ch",
    style: {
      color: "var(--ink-900)",
      fontFamily: "var(--font-serif)",
      lineHeight: 1.34
    }
  }, l.dek), /*#__PURE__*/React.createElement(List, {
    items: l.items,
    style: {
      marginTop: 24,
      maxWidth: "58ch"
    }
  }))))), /*#__PURE__*/React.createElement(Reveal, {
    style: {
      marginTop: "clamp(36px,4.5vw,64px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-lg)",
      padding: "clamp(28px,4vw,52px)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      font: `var(--weight-regular) clamp(20px,2.9vw,34px)/1.32 var(--font-serif)`,
      letterSpacing: "-0.022em",
      color: "var(--ink-900)",
      margin: 0,
      maxWidth: "40ch",
      textWrap: "pretty"
    }
  }, "Standard 1 through Form 5, and IGCSE. Teaching ends at SPM and IGCSE level. No STPM, matrikulasi, foundation or university mathematics, and I would rather tell you that now than take the booking.")))));
}
Object.assign(window, {
  Problem,
  WhyOneToOne,
  WhyCard,
  Levels
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/LandingArgument.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/LandingClose.jsx
try { (() => {
/* Sections 6–10: the tutor, the price, the process, the questions, the close. */

const ABOUT_PARAS = ["It is a fair question, and most tutors cannot. The market splits: primary specialists on one side, SPM and Add Maths specialists on the other. Very few people teach both.", "I do, and that is the whole reason this works.", "Twenty-four years of teaching every level from Standard 1 to Form 5 means I have watched the same students grow up through it. I know which Standard 4 gap turns into which Form 5 failure, because I have taught both ends of it to the same child.", "A concrete example. A student who learned to divide fractions by flipping the second one, without ever understanding why, is fine in Standard 5. In Form 2 they hit algebraic fractions and the trick stops working. In Form 5 they hit integration by substitution and it collapses completely. Three different topics, three different school years, one root cause. A tutor who only teaches Form 4 and 5 sees the collapse and treats the symptom.", "The same goes the other way. When I teach a Standard 3 student, I already know which of today’s shortcuts will cost them in eight years, so we do not take them.", "Ten of those twenty-four years have been online. I started teaching over video in 2016, well before the rest of the market had to, which means the online part of this is not an adaptation I made recently.", "Every concept gets explained with an example a student at that level can actually picture, and every calculation gets written out step by step. Not the shortened version a textbook gives. The full version, including the lines that look too obvious to write down.", "Every session is taught by me. There is no bench of part-time tutors, and your child will not be handed to someone else next month."];
function About() {
  const wide = useDesktop();
  return /*#__PURE__*/React.createElement(Section, {
    id: "about",
    ground: "sunken"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Marker, {
    n: "04",
    label: "The tutor"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "minmax(0,300px) minmax(0,1fr)" : "1fr",
      gap: wide ? "clamp(40px,5.5vw,80px)" : 30,
      alignItems: "start",
      marginTop: "clamp(24px,3vw,36px)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    style: {
      position: wide ? "sticky" : "static",
      top: 92
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      aspectRatio: "4 / 5",
      maxWidth: wide ? undefined : 320,
      border: "1px solid var(--rule-strong)",
      background: "var(--white)"
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: "mrkong-portrait",
    shape: "rect",
    fit: "cover",
    placeholder: "Portrait of Mr Kong \u2014 at the desk where he teaches, screen and writing setup visible"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 12,
      borderTop: "2px solid var(--ink-900)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-semibold) clamp(15px,1.7vw,18px)/1.2 var(--font-serif)`,
      color: "var(--ink-900)"
    }
  }, "Mr Kong"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-semibold) 10px/1 var(--font-sans)`,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: "var(--ink-500)"
    }
  }, "Just Math Malaysia"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(H2, {
    measure: "21ch"
  }, "Can one tutor teach a seven-year-old and an Add Maths student?")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement(Prose, {
    paras: ABOUT_PARAS,
    measure: "60ch",
    style: {
      marginTop: "clamp(24px,3vw,36px)"
    }
  })), /*#__PURE__*/React.createElement(Reveal, {
    variant: "settle",
    style: {
      marginTop: "clamp(40px,5vw,68px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--ink-900)",
      borderRadius: "var(--radius-lg)",
      padding: "clamp(26px,3.4vw,44px)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement(GraphGround, {
    invert: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: `var(--weight-semibold) ${T.h3}/1.22 var(--font-serif)`,
      letterSpacing: "-0.018em",
      color: "var(--paper)",
      margin: 0,
      maxWidth: "30ch"
    }
  }, "The 500 number, and why it is small on purpose"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "auto minmax(0,1fr)" : "1fr",
      gap: wide ? "clamp(32px,4vw,56px)" : 24,
      alignItems: "start",
      marginTop: "clamp(24px,3vw,36px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 14,
      borderRight: wide ? "1px solid rgba(251,250,247,.2)" : undefined,
      paddingRight: wide ? "clamp(28px,3.4vw,48px)" : 0,
      paddingBottom: wide ? 0 : 20,
      borderBottom: wide ? undefined : "1px solid rgba(251,250,247,.2)"
    }
  }, /*#__PURE__*/React.createElement(Figure, {
    invert: true,
    value: "20",
    size: T.figureMid
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-regular) ${T.small}/1.4 var(--font-sans)`,
      color: "var(--ink-300)",
      maxWidth: "8ch",
      paddingBottom: "0.5em"
    }
  }, "students a year")), /*#__PURE__*/React.createElement(Prose, {
    invert: true,
    measure: "50ch",
    paras: ["Over 500 students in 24 years works out to about twenty a year.", "A tuition centre can put 500 students through in a single year, because it teaches them thirty at a time. Every one of my 500 sat in a session with nobody else in it. Different number, different unit."]
  })))))))));
}
const ROWS = [{
  level: "Standard 1 to 6",
  session: "60 min",
  month: "RM160",
  each: "RM40"
}, {
  level: "Form 1 to 3",
  session: "60 min",
  month: "RM180",
  each: "RM45"
}, {
  level: "Form 4 and 5, Modern Mathematics",
  session: "60 min",
  month: "RM200",
  each: "RM50"
}, {
  level: "Form 4 and 5, Additional Mathematics",
  session: "60 min",
  month: "RM240",
  each: "RM60"
}, {
  level: "IGCSE Mathematics and Additional Mathematics",
  session: "90 min",
  month: "RM360",
  each: "RM90",
  differs: true
}];
const INCLUDED = ["Four live one-to-one sessions on Google Meet, taught by me", "A written progress summary sent to you at the end of the month, covering what was taught, what improved and what is still weak", "Homework set and reviewed out loud in the following session, not marked in silence", "A learning plan built from the diagnostic assessment, not a generic syllabus", "Sessions taught in English or Bahasa Melayu, whichever your child follows better"];
function PriceTable() {
  const th = {
    font: `var(--weight-semibold) 10px/1.25 var(--font-sans)`,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--paper)",
    background: "var(--ink-900)",
    padding: "10px 8px",
    verticalAlign: "bottom"
  };
  const td = {
    padding: "clamp(13px,1.6vw,20px) 8px",
    borderBottom: "1px solid var(--rule)",
    verticalAlign: "middle"
  };
  const num = {
    font: `var(--weight-semibold) clamp(15px,2.1vw,25px)/1 var(--font-mono)`,
    fontVariantNumeric: "tabular-nums",
    letterSpacing: "-0.04em",
    color: "var(--ink-900)",
    textAlign: "right",
    whiteSpace: "nowrap"
  };
  const edge = {
    borderTop: "1px solid var(--ochre-500)",
    borderBottom: "1px solid var(--ochre-500)"
  };
  return /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      tableLayout: "fixed"
    }
  }, /*#__PURE__*/React.createElement("colgroup", null, /*#__PURE__*/React.createElement("col", {
    style: {
      width: "38%"
    }
  }), /*#__PURE__*/React.createElement("col", {
    style: {
      width: "16%"
    }
  }), /*#__PURE__*/React.createElement("col", {
    style: {
      width: "23%"
    }
  }), /*#__PURE__*/React.createElement("col", {
    style: {
      width: "23%"
    }
  })), /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      textAlign: "left",
      paddingLeft: 12
    }
  }, "Level"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      textAlign: "right"
    }
  }, "Session"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      textAlign: "right"
    }
  }, "Per month"), /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      textAlign: "right",
      paddingRight: 12
    }
  }, "Per session"))), /*#__PURE__*/React.createElement("tbody", null, ROWS.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.level,
    style: {
      background: r.differs ? "var(--ochre-100)" : undefined
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      paddingLeft: 12,
      ...(r.differs ? edge : null),
      font: `var(--weight-regular) clamp(13px,1.6vw,17px)/1.35 var(--font-sans)`,
      color: "var(--ink-900)"
    }
  }, r.level), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      ...(r.differs ? edge : null),
      font: `var(--weight-${r.differs ? "semibold" : "regular"}) clamp(12px,1.5vw,15px)/1.2 var(--font-mono)`,
      color: r.differs ? "var(--ochre-600)" : "var(--text-muted)",
      textAlign: "right",
      whiteSpace: "nowrap"
    }
  }, r.session), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      ...(r.differs ? edge : null),
      ...num
    }
  }, r.month), /*#__PURE__*/React.createElement("td", {
    style: {
      ...td,
      ...(r.differs ? edge : null),
      ...num,
      paddingRight: 12,
      fontSize: "clamp(13px,1.7vw,19px)",
      color: "var(--ink-500)"
    }
  }, r.each)))));
}
function Pricing() {
  const wide = useDesktop();
  return /*#__PURE__*/React.createElement(Section, {
    id: "pricing"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Marker, {
    n: "05",
    label: "Fees"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "minmax(0,.85fr) minmax(0,1.15fr)" : "1fr",
      gap: wide ? "clamp(40px,5.5vw,80px)" : 28,
      alignItems: "end",
      marginTop: "clamp(24px,3vw,36px)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(H2, {
    measure: "14ch"
  }, "One session a week, billed monthly")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement(P, {
    size: T.lead,
    measure: "52ch"
  }, "Sessions are one hour, once a week, at the same slot each week. Fees are monthly and cover four sessions. Some months have a fifth, and that session is charged at the same rate."))), /*#__PURE__*/React.createElement(Reveal, {
    style: {
      marginTop: "clamp(32px,4vw,52px)"
    }
  }, /*#__PURE__*/React.createElement(PriceTable, null), /*#__PURE__*/React.createElement(P, {
    size: T.small,
    muted: true,
    style: {
      marginTop: 16,
      maxWidth: "56ch"
    }
  }, "IGCSE runs at 90 minutes because the international syllabus moves faster than the national one and an hour a week does not keep pace with it.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "minmax(0,1.15fr) minmax(0,.85fr)" : "1fr",
      gap: wide ? "clamp(40px,5vw,76px)" : 36,
      marginTop: "clamp(44px,5.5vw,80px)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(H3, {
    style: {
      fontSize: "clamp(18px,2vw,22px)"
    }
  }, "Every month includes:"), /*#__PURE__*/React.createElement(List, {
    items: INCLUDED,
    style: {
      marginTop: 22
    }
  }), /*#__PURE__*/React.createElement(Prose, {
    paras: ["Fees are paid before the first session of each month, by DuitNow or bank transfer. Rates shown apply for 2026 and are reviewed once a year.", "Before any of that, the 30-minute assessment is free and you are under no obligation to continue afterwards."],
    size: T.small,
    style: {
      marginTop: 26
    }
  })), /*#__PURE__*/React.createElement(Reveal, {
    delay: 100,
    style: {
      alignSelf: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--rule-strong)",
      borderTop: "3px solid var(--ink-900)",
      borderRadius: "var(--radius-lg)",
      padding: "clamp(24px,3vw,36px)",
      background: "var(--white)"
    }
  }, /*#__PURE__*/React.createElement(H3, {
    style: {
      fontSize: "clamp(18px,2vw,22px)"
    }
  }, "Availability"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 2,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--weight-medium) ${T.micro}/1.2 var(--font-mono)`,
      color: "var(--text-muted)",
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      marginBottom: 8
    }
  }, "Monday to Friday"), [["3pm", "6pm", "primary"], ["8pm", "11pm", "upper secondary"]].map(([a, b, who]) => /*#__PURE__*/React.createElement("div", {
    key: a,
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 12,
      paddingBlock: 10,
      borderBottom: "1px solid var(--rule)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-semibold) clamp(21px,2.9vw,32px)/1.1 var(--font-mono)`,
      fontVariantNumeric: "tabular-nums",
      letterSpacing: "-0.045em",
      color: "var(--ink-900)",
      whiteSpace: "nowrap"
    }
  }, a, "\u2013", b), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-regular) ${T.micro}/1.2 var(--font-sans)`,
      color: "var(--text-muted)"
    }
  }, who)))), /*#__PURE__*/React.createElement(Prose, {
    paras: ["Monday to Friday, in two blocks: 3pm to 6pm, and 8pm to 11pm.", "The late block exists because Form 4 and Form 5 students are usually not free before then. The afternoon block is where most primary students sit.", "Slots go on a first come, first served basis, and once yours is agreed it stays yours every week. WhatsApp me for what is currently open."],
    size: T.small,
    style: {
      marginTop: 20
    }
  })))), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Cta, {
    align: "center",
    style: {
      marginTop: "clamp(44px,5.5vw,72px)"
    }
  }))));
}
const STEPS = [{
  h: "Message me on WhatsApp",
  p: "Tell me what standard or form your child is in. That is all I need to get started."
}, {
  h: "Free 30-minute assessment on Google Meet",
  p: "Your child works through problems with me while I watch how they think, not just whether they get the answer. You are welcome to sit in."
}, {
  h: "You get the findings",
  p: "I tell you what is solid, what is weak, and which earlier topic is causing the current problem. If I think your child does not need tutoring, I will say so."
}, {
  h: "Your weekly slot starts",
  p: "If you want to go ahead, we agree a slot from what is available, weekly and the same time each week. The first month’s fee is settled before the first session, and we start on the plan from the assessment."
}];
function HowItWorks() {
  const wide = useDesktop();
  return /*#__PURE__*/React.createElement(Section, {
    id: "how",
    ground: "sunken"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Marker, {
    n: "06",
    label: "How it works"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "repeat(4,minmax(0,1fr))" : "1fr",
      gap: wide ? "clamp(24px,2.8vw,40px)" : 0,
      marginTop: "clamp(28px,3.4vw,48px)"
    }
  }, STEPS.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: s.h,
    delay: i * 90,
    style: {
      position: "relative",
      paddingTop: 26,
      borderTop: "3px solid var(--ink-900)",
      paddingBottom: wide ? 0 : 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      top: -3,
      left: 0,
      width: 3,
      height: 14,
      background: "var(--ink-900)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--weight-semibold) ${T.figureMid}/0.86 var(--font-mono)`,
      letterSpacing: "-0.05em",
      color: "var(--ink-900)"
    }
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement(H3, {
    style: {
      marginTop: 18,
      fontSize: "clamp(17px,1.9vw,21px)"
    }
  }, s.h), /*#__PURE__*/React.createElement(P, {
    size: T.small,
    style: {
      marginTop: 10
    }
  }, s.p))))));
}
const FAQ = [{
  q: "How long is each session, and how often?",
  a: "One hour a week for Standard 1 to Form 5, at the same slot each week. IGCSE students take 90 minutes a week, because that syllabus moves faster and an hour does not keep up with it."
}, {
  q: "Do you teach on weekends?",
  a: "Not at the moment. Sessions run Monday to Friday, in the two blocks above. If neither window works for your family, message me anyway and say so. I keep a note of who is waiting on a different time, and if that changes you will hear from me."
}, {
  q: "Can sessions fit around school and my child’s existing tuition?",
  a: "Slots run weekday afternoons from 3pm to 6pm and weekday evenings from 8pm to 11pm, and you keep the same weekly slot once it is agreed. The evening block was set up for upper secondary students who are not free until after dinner. If your child is in an afternoon school session, the 3pm to 6pm window will not work and the evening one is late for a younger child, so message me before booking an assessment and we will check there is a slot that fits. Because sessions are online there is no travel to schedule around either way."
}, {
  q: "What language do you teach in?",
  a: "English or Bahasa Melayu, and I switch between them during a session when that is what helps. Some students follow the maths perfectly well but lose marks because the wording of the question is in the language they are weaker in. That is worth sorting out separately from the maths."
}, {
  q: "My child is seven. Can they hold attention online for an hour?",
  a: "Some can, many cannot, and I would rather say that plainly. For younger primary students I keep the pace changing every few minutes and use the whiteboard heavily so they are doing something rather than listening. If an hour is genuinely too long for your child, tell me at the assessment and we will look at shorter, more frequent sessions instead."
}, {
  q: "Do you follow the school syllabus and textbook?",
  a: "Yes. Teaching follows the national KSSR and KSSM syllabus, and I also teach the IGCSE syllabus for students in international schools. We work from your child’s own school textbook and exercise book so what we do in a session lines up with what they see in class the next day. Where a gap from an earlier year is causing the current problem, we go back and fix that first, then return to the current chapter."
}, {
  q: "Do you teach STPM or pre-university maths?",
  a: "No. Teaching goes up to SPM and IGCSE. After that you want someone who specialises in it, and I would rather say so than take the booking."
}, {
  q: "What actually happens in the free assessment?",
  a: "Thirty minutes on Google Meet, your child and me. I give them problems starting slightly below their current level and work upward until we find where it breaks. I am watching their method, not just the answer, because a wrong method that happens to produce a right answer is the thing that causes trouble later. There is no test paper, no score, and nothing for your child to prepare."
}, {
  q: "What happens after the assessment?",
  a: "I tell you what I found: which topics are solid, which are weak, and which earlier concept is causing the current difficulty. If tutoring makes sense I will tell you what I would work on and how long I think it takes. If I do not think your child needs tutoring, I will tell you that instead. There is no obligation either way and I do not follow up repeatedly."
}, {
  q: "Can we reschedule a session?",
  a: "Yes. Give me one week’s notice and the session moves to another available slot that month, at no extra cost."
}, {
  q: "How and when do I pay?",
  a: "Monthly, before the first session of the month, by DuitNow or bank transfer. There is nothing to pay for the assessment, and nothing is charged until you have decided to go ahead. Fees are not taken in advance beyond the month you are in."
}, {
  q: "How will I know if my child is improving?",
  a: "At the end of every month I send you a written progress summary covering what was taught, what improved, what is still weak, and what comes next. You can also sit in on any session. If something is not working I will tell you before you have to ask."
}, {
  q: "Will the same tutor teach every session?",
  a: "Yes. I teach every session myself. There are no assistant tutors and no substitutions."
}];
function PlainAccordion({ items, defaultOpen = 0, idPrefix = "faq" }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [hover, setHover] = React.useState(-1);
  return /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid var(--rule)" } }, items.map((it, i) => {
    const isOpen = open === i;
    const btnId = `${idPrefix}-q-${i}`;
    const panelId = `${idPrefix}-a-${i}`;
    const bar = { position: "absolute", top: "50%", left: "50%", background: "var(--ink-600)", transition: "transform var(--dur-3) var(--ease-standard)" };
    return /* @__PURE__ */ React.createElement("div", { key: i, style: { borderBottom: "1px solid var(--rule)" } }, /* @__PURE__ */ React.createElement(
      "button",
      {
        id: btnId,
        onClick: () => setOpen(isOpen ? -1 : i),
        onMouseEnter: () => setHover(i),
        onMouseLeave: () => setHover(-1),
        "aria-expanded": isOpen,
        "aria-controls": panelId,
        style: { display: "flex", width: "100%", gap: 16, alignItems: "flex-start", justifyContent: "space-between", background: "none", border: 0, padding: "20px 0", cursor: "pointer", textAlign: "left", font: `var(--weight-medium) clamp(16px,1.7vw,19px)/1.4 var(--font-sans)`, color: hover === i || isOpen ? "var(--ink-900)" : "var(--ink-700)", transition: "color var(--dur-1) var(--ease-standard)" }
      },
      /* @__PURE__ */ React.createElement("span", null, it.q),
      /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true", style: { position: "relative", flex: "none", width: 15, height: 15, marginTop: 5 } }, /* @__PURE__ */ React.createElement("span", { style: { ...bar, width: "100%", height: 2, transform: `translate(-50%,-50%) rotate(${isOpen ? 180 : 0}deg)` } }), /* @__PURE__ */ React.createElement("span", { style: { ...bar, width: 2, height: "100%", transform: `translate(-50%,-50%) rotate(${isOpen ? 270 : 0}deg)` } }))
    ), /* @__PURE__ */ React.createElement(
      "div",
      {
        id: panelId,
        role: "region",
        "aria-labelledby": btnId,
        inert: isOpen ? void 0 : "",
        style: { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0, overflow: "hidden", transition: "opacity var(--dur-3) var(--ease-standard)" }
      },
      /* @__PURE__ */ React.createElement(P, { size: T.body, style: { marginBottom: 24 } }, it.a)
    ));
  }));
}

function Faq() {
  const Accordion = (window.JustMathDesignSystem_270e96 || {}).Accordion || PlainAccordion;
  const wide = useDesktop();
  return /*#__PURE__*/React.createElement(Section, {
    id: "faq"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Marker, {
    n: "07",
    label: "Questions"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "minmax(0,270px) minmax(0,1fr)" : "1fr",
      gap: wide ? "clamp(40px,5vw,80px)" : 26,
      alignItems: "start",
      marginTop: "clamp(24px,3vw,36px)"
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    style: {
      position: wide ? "sticky" : "static",
      top: 92
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Figure, {
    value: "13",
    size: T.figureMid
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-regular) ${T.small}/1.4 var(--font-sans)`,
      color: "var(--text-muted)",
      maxWidth: "12ch",
      paddingBottom: "0.5em"
    }
  }, "things parents ask before booking"))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 80
  }, /*#__PURE__*/React.createElement(Accordion, {
    items: FAQ,
    defaultOpen: 0
  }), /*#__PURE__*/React.createElement(Cta, {
    align: "center",
    style: {
      marginTop: "clamp(36px,4.5vw,60px)"
    }
  })))));
}
function FinalCta() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "start",
    ground: "ink",
    graph: true
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      maxWidth: 800,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    variant: "settle"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "center",
      gap: 14,
      marginBottom: "clamp(20px,2.6vw,32px)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-semibold) ${T.figureMid}/0.86 var(--font-mono)`,
      letterSpacing: "-0.05em",
      color: "var(--paper)"
    }
  }, "30"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-regular) ${T.small}/1.3 var(--font-sans)`,
      color: "var(--ink-300)"
    }
  }, "minutes, free")), /*#__PURE__*/React.createElement(H2, {
    invert: true,
    measure: "16ch",
    style: {
      marginInline: "auto"
    }
  }, "Start with the 30 minutes"), /*#__PURE__*/React.createElement(Prose, {
    invert: true,
    size: T.lead,
    measure: "52ch",
    paras: ["The assessment is free, takes half an hour, and happens on Google Meet. At the end you will know where your child’s maths actually stands and what is causing the problem.", "If the answer is that they are fine, I will tell you that and you will have spent thirty minutes finding out. Nobody will chase you afterwards."],
    style: {
      marginTop: 24,
      justifyItems: "center",
      textAlign: "center",
      marginInline: "auto"
    }
  }), /*#__PURE__*/React.createElement(Cta, {
    align: "center",
    style: {
      marginTop: "clamp(32px,4vw,48px)"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 28,
      paddingTop: 24,
      borderTop: "1px solid rgba(251,250,247,.18)",
      font: `var(--weight-regular) ${T.small}/1.6 var(--font-sans)`,
      color: "var(--ink-300)",
      maxWidth: "46ch",
      marginInline: "auto"
    }
  }, "Mr Kong, Just Math Malaysia. WhatsApp 019 472 8768. Taught online across Malaysia, in English and Bahasa Melayu."))));
}
function Landing() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHeader, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(TrustBar, null), /*#__PURE__*/React.createElement(Problem, null), /*#__PURE__*/React.createElement(WhyOneToOne, null), /*#__PURE__*/React.createElement(Levels, null), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(Pricing, null), /*#__PURE__*/React.createElement(HowItWorks, null), /*#__PURE__*/React.createElement(Faq, null), /*#__PURE__*/React.createElement(FinalCta, null));
}
Object.assign(window, {
  About,
  Pricing,
  PriceTable,
  HowItWorks,
  Faq,
  FinalCta,
  Landing,
  PlainAccordion
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/LandingClose.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/LandingShell.jsx
try { (() => {
/* Shared scale, primitives and page chrome — Just Math Malaysia landing page.
   Visual motif: a measurement spine (the levels of Malaysian schooling as a ruled scale),
   oversized tabular numerals, and a hairline graph ground. No imagery. */

const {
  WhatsAppButton
} = window.JustMathDesignSystem_270e96;
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
  figureSm: "clamp(28px,4vw,44px)"
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
function GraphGround({
  invert = false,
  opacity = 1,
  major = 48
}) {
  const line = invert ? "rgba(251,250,247,.09)" : "rgba(20,22,26,.055)";
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      opacity,
      backgroundImage: `linear-gradient(${line} 1px,transparent 1px),linear-gradient(90deg,${line} 1px,transparent 1px)`,
      backgroundSize: `${major}px ${major}px`,
      maskImage: "linear-gradient(180deg,#000 0%,#000 62%,transparent 100%)",
      WebkitMaskImage: "linear-gradient(180deg,#000 0%,#000 62%,transparent 100%)"
    }
  });
}
function Section({
  id,
  ground = "paper",
  ruled = false,
  graph = false,
  children,
  style
}) {
  const bg = {
    paper: "var(--paper)",
    sunken: "var(--surface-sunken)",
    ink: "var(--ink-900)"
  }[ground];
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      position: "relative",
      background: bg,
      paddingBlock: SECTION_Y,
      borderTop: ruled ? "1px solid var(--rule)" : undefined,
      overflow: "hidden",
      ...style
    }
  }, graph ? /*#__PURE__*/React.createElement(GraphGround, {
    invert: ground === "ink"
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, children));
}
function Container({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--page-max)",
      margin: "0 auto",
      paddingInline: "clamp(20px,5vw,24px)",
      ...style
    }
  }, children);
}

/* Numbered section marker — the editorial spine of the page. */
function Marker({
  n,
  label,
  invert = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-semibold) ${T.micro}/1 var(--font-mono)`,
      color: invert ? "var(--ink-400)" : "var(--text-faint)",
      letterSpacing: "0.04em"
    }
  }, n), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 28,
      height: 1,
      background: invert ? "rgba(251,250,247,.3)" : "var(--rule-strong)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-semibold) ${T.micro}/1 var(--font-sans)`,
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: invert ? "var(--ink-300)" : "var(--text-muted)"
    }
  }, label));
}
function Eyebrow({
  children,
  invert = false,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--weight-semibold) ${T.micro}/1 var(--font-sans)`,
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: invert ? "var(--ink-400)" : "var(--text-muted)",
      ...style
    }
  }, children);
}
function H2({
  children,
  invert = false,
  measure = "20ch",
  style
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      font: `var(--weight-semibold) ${T.h2}/1.06 var(--font-serif)`,
      letterSpacing: "-0.028em",
      color: invert ? "var(--paper)" : "var(--ink-900)",
      margin: 0,
      maxWidth: measure,
      textWrap: "balance",
      ...style
    }
  }, children);
}
function H3({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("h3", {
    style: {
      font: `var(--weight-semibold) ${T.h3}/1.22 var(--font-serif)`,
      letterSpacing: "-0.018em",
      color: "var(--ink-900)",
      margin: 0,
      maxWidth: "34ch",
      ...style
    }
  }, children);
}
function P({
  children,
  size = T.body,
  muted = false,
  invert = false,
  measure = "var(--measure)",
  style
}) {
  return /*#__PURE__*/React.createElement("p", {
    style: {
      font: `var(--weight-regular) ${size}/1.62 var(--font-sans)`,
      color: invert ? "var(--ink-300)" : muted ? "var(--text-muted)" : "var(--text-body)",
      maxWidth: measure,
      margin: 0,
      ...style
    }
  }, children);
}
function Prose({
  paras,
  size = T.body,
  invert = false,
  measure = "var(--measure)",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "1.1em",
      ...style
    }
  }, paras.map((t, i) => /*#__PURE__*/React.createElement(P, {
    key: i,
    size: size,
    invert: invert,
    measure: measure
  }, t)));
}

/* Oversized tabular figure. The page's one loud element. */
function Figure({
  value,
  label,
  size = T.figureSm,
  invert = false,
  align = "start",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: `var(--weight-semibold) ${size}/0.86 var(--font-mono)`,
      fontVariantNumeric: "tabular-nums",
      letterSpacing: "-0.045em",
      color: invert ? "var(--paper)" : "var(--ink-900)",
      textAlign: align
    }
  }, value), label ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      font: `var(--weight-regular) ${T.small}/1.4 var(--font-sans)`,
      color: invert ? "var(--ink-300)" : "var(--text-muted)",
      maxWidth: "20ch",
      textAlign: align
    }
  }, label) : null);
}
function Bullet({
  children
}) {
  return /*#__PURE__*/React.createElement("li", {
    style: {
      display: "grid",
      gridTemplateColumns: "18px 1fr",
      gap: 14,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      height: 1,
      background: "var(--ink-300)",
      marginTop: "0.8em"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-regular) ${T.body}/1.6 var(--font-sans)`,
      color: "var(--text-body)"
    }
  }, children));
}
function List({
  items,
  style
}) {
  return /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "grid",
      gap: 15,
      maxWidth: "var(--measure)",
      ...style
    }
  }, items.map((t, i) => /*#__PURE__*/React.createElement(Bullet, {
    key: i
  }, t)));
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
  REVEAL_QUEUE.forEach(entry => {
    const el = entry.el;
    if (!el || !el.isConnected) {
      REVEAL_QUEUE.delete(entry);
      return;
    }
    if (el.getBoundingClientRect().top < fold) {
      REVEAL_QUEUE.delete(entry);
      entry.reveal();
    }
  });
}
function revealAll() {
  REVEAL_QUEUE.forEach(entry => {
    REVEAL_QUEUE.delete(entry);
    entry.reveal();
  });
}
function bindReveal() {
  if (REVEAL_BOUND) return;
  REVEAL_BOUND = true;
  window.addEventListener("scroll", revealSweep, {
    passive: true
  });
  window.addEventListener("resize", revealSweep, {
    passive: true
  });
  window.addEventListener("beforeprint", revealAll);
  const mq = window.matchMedia && window.matchMedia("print");
  if (mq && mq.addEventListener) mq.addEventListener("change", e => {
    if (e.matches) revealAll();
  });
}
function useReveal() {
  const ref = React.useRef(null);
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
      setOn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    if (el.getBoundingClientRect().top < window.innerHeight - 40) {
      setOn(true);
      return;
    }
    const entry = {
      el,
      reveal: () => setOn(true)
    };
    REVEAL_QUEUE.add(entry);
    bindReveal();
    const raf = requestAnimationFrame(revealSweep);
    return () => {
      REVEAL_QUEUE.delete(entry);
      cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, on];
}

/* 14px rise + fade, once. */
const REVEAL_VARIANTS = {
  rise: { y: 14, dur: 640 },
  settle: { y: 0, dur: 780 },
  still: { y: 0, dur: 0 }
};
function Reveal({
  children,
  delay = 0,
  variant = "rise",
  y,
  style
}) {
  const v = REVEAL_VARIANTS[variant] || REVEAL_VARIANTS.rise;
  const [ref, on] = useReveal();
  const shown = v.dur === 0 ? true : on;
  const dist = y != null ? y : v.y;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      opacity: shown ? 1 : 0,
      transform: shown || !dist ? "none" : `translateY(${dist}px)`,
      transition: v.dur ? `opacity ${v.dur}ms var(--ease-out) ${delay}ms, transform ${v.dur}ms var(--ease-out) ${delay}ms` : "none",
      ...style
    }
  }, children);
}

/* Same engine, for elements that animate their own contents (the chart bars). */
function useInView() {
  return useReveal();
}

/* ── The measurement spine ──────────────────────────────────────────────
   One motif, two jobs: in the hero it shows the full span one tutor covers;
   in the Problem section the same scale becomes a chart of what gets measured. */

const STOPS = ["Standard 1", "Standard 2", "Standard 3", "Standard 4", "Standard 5", "Standard 6", "Form 1", "Form 2", "Form 3", "Form 4", "Form 5"];

/* ── The gap chart ─────────────────────────────────────────────────────
   Eleven school years on one axis. Three tall bars are the measured points;
   the rest are stubs. A bracket marks the Form 4–5 stretch with no measure. */

const SHORT = ["S1", "S2", "S3", "S4", "S5", "S6", "F1", "F2", "F3", "F4", "F5"];
function GapChart({
  style
}) {
  const [ref, on] = useInView();
  const marks = {
    3: "OCT 2026",
    8: "FROM 2027",
    10: "SPM"
  };
  const gapStart = 9,
    gapEnd = 10;
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: "relative",
      background: "var(--ink-900)",
      borderRadius: "var(--radius-lg)",
      padding: "clamp(22px,3vw,34px)",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement(GraphGround, {
    invert: true,
    opacity: 0.8,
    major: 32
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 12,
      marginBottom: "clamp(20px,2.6vw,30px)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-semibold) ${T.micro}/1 var(--font-sans)`,
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--ink-400)"
    }
  }, "When maths is measured"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-semibold) ${T.micro}/1 var(--font-mono)`,
      color: "var(--ochre-500)",
      letterSpacing: "0.04em"
    }
  }, "3 POINTS \xB7 11 YEARS")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(11,1fr)",
      gap: 3,
      alignItems: "end",
      height: 30
    }
  }, SHORT.map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      font: `var(--weight-semibold) var(--size-3xs)/1.2 var(--font-mono)`,
      color: "var(--ochre-500)",
      letterSpacing: "0.02em",
      textAlign: "center",
      whiteSpace: "nowrap",
      opacity: marks[i] && on ? 1 : 0,
      transition: `opacity 500ms var(--ease-out) ${420 + i * 26}ms`
    }
  }, marks[i] ? marks[i].replace(" ", "\u00a0") : ""))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(11,1fr)",
      gap: 3,
      alignItems: "end",
      height: "clamp(96px,14vw,150px)",
      borderBottom: "2px solid var(--paper)"
    }
  }, SHORT.map((_, i) => {
    const tall = !!marks[i];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        height: "100%"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: "100%",
        maxWidth: tall ? 34 : 22,
        height: on ? tall ? "100%" : "14%" : 0,
        background: tall ? "var(--paper)" : "rgba(251,250,247,.22)",
        transition: `height 720ms var(--ease-out) ${i * 34}ms`
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(11,1fr)",
      gap: 3,
      marginTop: 10
    }
  }, SHORT.map((s, i) => /*#__PURE__*/React.createElement("span", {
    key: s,
    style: {
      font: `var(--weight-${marks[i] ? "semibold" : "regular"}) var(--size-2xs)/1 var(--font-mono)`,
      color: marks[i] ? "var(--paper)" : "rgba(251,250,247,.55)",
      textAlign: "center"
    }
  }, s))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(11,1fr)",
      gap: 3,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: `${gapStart + 1} / ${gapEnd + 2}`,
      borderTop: "1px solid var(--ochre-500)",
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: `var(--weight-medium) var(--size-3xs)/1.3 var(--font-mono)`,
      color: "var(--ochre-500)",
      textAlign: "center",
      letterSpacing: "0.02em"
    }
  }, "NO MEASURE"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      paddingTop: 14,
      borderTop: "1px solid rgba(251,250,247,.18)",
      font: `var(--weight-regular) ${T.small}/1.5 var(--font-sans)`,
      color: "var(--ink-300)"
    }
  }, "Standard 1, 2, 3, 5, 6 and Form 1, 2, 4 are never independently measured. Form 3 to SPM is the longest unchecked stretch \u2014 and the one Additional Mathematics arrives in.")));
}
function Spine({
  marks = {},
  dim = false,
  footer,
  invert = false,
  style
}) {
  const ink = invert ? "var(--paper)" : "var(--ink-900)";
  const faint = invert ? "rgba(251,250,247,.34)" : "var(--ink-300)";
  const rule = invert ? "rgba(251,250,247,.18)" : "var(--rule)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid"
    }
  }, STOPS.map((s, i) => {
    const m = marks[s];
    const on = !dim || !!m;
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      style: {
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 12,
        alignItems: "center",
        paddingBlock: 9,
        borderBottom: i === STOPS.length - 1 ? undefined : `1px solid ${rule}`
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        width: m ? 26 : 12,
        height: m ? 3 : 1,
        background: on ? ink : faint,
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: `var(--weight-${m ? "semibold" : "regular"}) clamp(13px,1.5vw,15px)/1.2 var(--font-sans)`,
        color: on ? ink : faint,
        letterSpacing: m ? "-0.005em" : 0
      }
    }, s), m ? /*#__PURE__*/React.createElement("span", {
      style: {
        font: `var(--weight-medium) ${T.micro}/1.25 var(--font-mono)`,
        color: invert ? "var(--ink-300)" : "var(--ochre-600)",
        textAlign: "right",
        whiteSpace: "nowrap"
      }
    }, m) : /*#__PURE__*/React.createElement("span", null));
  })), footer ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 14,
      borderTop: `2px solid ${ink}`,
      font: `var(--weight-regular) ${T.small}/1.45 var(--font-sans)`,
      color: invert ? "var(--ink-300)" : "var(--text-muted)"
    }
  }, footer) : null);
}

/* The one CTA treatment. Five uses, identical every time. */
function Cta({
  note,
  align = "start",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      justifyItems: align,
      maxWidth: 470,
      marginInline: align === "center" ? "auto" : undefined,
      ...style
    }
  }, /*#__PURE__*/React.createElement(WhatsAppButton, {
    full: true,
    size: "lg",
    phone: PHONE,
    message: MESSAGE,
    label: CTA_LABEL
  }), note ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 12,
      font: `var(--weight-regular) ${T.small}/1.5 var(--font-sans)`,
      color: "var(--text-muted)",
      textAlign: align === "center" ? "center" : "left"
    }
  }, note) : null);
}
function PageHeader() {
  const wide = useDesktop();
  return /* @__PURE__ */ React.createElement("header", { style: { position: "sticky", top: 0, zIndex: 20, background: "rgba(251,250,247,.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid var(--rule)" } }, /* @__PURE__ */ React.createElement(Container, { style: { minHeight: 62, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: "0.6em", fontSize: "clamp(1rem, 2vw, 1.25rem)" } }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 160 160", width: "2.05em", height: "2.05em", fill: "var(--ink-900)", "aria-hidden": "true", focusable: "false", style: { display: "block", flex: "none" } }, /* @__PURE__ */ React.createElement("rect", { x: "22", y: "40.5", width: "44", height: "7" }), /* @__PURE__ */ React.createElement("rect", { x: "40.5", y: "22", width: "7", height: "44" }), /* @__PURE__ */ React.createElement("rect", { x: "94", y: "40.5", width: "44", height: "7" }), /* @__PURE__ */ React.createElement("rect", { x: "22", y: "112.5", width: "44", height: "7", transform: "rotate(45 44 116)" }), /* @__PURE__ */ React.createElement("rect", { x: "22", y: "112.5", width: "44", height: "7", transform: "rotate(-45 44 116)" }), /* @__PURE__ */ React.createElement("rect", { x: "94", y: "112.5", width: "44", height: "7" }), /* @__PURE__ */ React.createElement("circle", { cx: "116", cy: "99", r: "4.5" }), /* @__PURE__ */ React.createElement("circle", { cx: "116", cy: "133", r: "4.5" })), /* @__PURE__ */ React.createElement("span", { style: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "stretch",
    /* The type block's single scale control. Everything below is in em, so the whole lockup
       scales from this one value and the proportions never drift. */
    fontSize: "1em",
    gap: "0.45em"
  } }, /* @__PURE__ */ React.createElement("span", { style: { font: "var(--weight-semibold) 1em/1 var(--font-serif)", letterSpacing: "-0.02em", color: "var(--ink-900)", whiteSpace: "nowrap" } }, "Just Math"), /* @__PURE__ */ React.createElement("span", { className: "lockup-fill", style: {
    font: "var(--weight-semibold) 0.6em/1 var(--font-sans)",
    letterSpacing: "0.24em",
    color: "var(--ink-500)"
  } }, "MALAYSIA"))), /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: "clamp(12px,2.5vw,22px)" } }, /* @__PURE__ */ React.createElement("a", { href: "/blog", style: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
    minWidth: 44,
    marginInline: -4,
    font: "var(--weight-medium) var(--size-xs)/1 var(--font-sans)",
    color: "var(--ink-700)",
    textDecoration: "none",
    whiteSpace: "nowrap"
  } }, "Blog"), /* @__PURE__ */ React.createElement(
    WhatsAppButton,
    {
      size: "md",
      phone: PHONE,
      message: MESSAGE,
      label: "Schedule Now",
      style: { whiteSpace: "nowrap" }
    }
  ))));
}


function Hero() {
  const wide = useDesktop();
  return /*#__PURE__*/React.createElement(Section, {
    id: "top",
    graph: true,
    style: {
      paddingBlock: "clamp(44px,7vw,104px)"
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "minmax(0,1.55fr) minmax(0,.95fr)" : "1fr",
      gap: wide ? "clamp(48px,6vw,96px)" : 44,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Eyebrow, {
    style: {
      marginBottom: "clamp(20px,2.6vw,30px)"
    }
  }, "Standard 1 to Form 5 \xB7 IGCSE \xB7 one to one"), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: `var(--weight-semibold) ${T.hero}/0.98 var(--font-serif)`,
      letterSpacing: "-0.038em",
      color: "var(--ink-900)",
      margin: 0,
      maxWidth: "15ch",
      textWrap: "balance"
    }
  }, "Know exactly where your child\u2019s maths stands")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 90
  }, /*#__PURE__*/React.createElement(P, {
    size: T.lead,
    measure: "44ch",
    style: {
      marginTop: "clamp(22px,2.8vw,32px)"
    }
  }, "Twenty-four years teaching Malaysian maths, ten of them online. One tutor, one student, live on Google Meet. Standard 1 to Form 5, taught in English and Bahasa Melayu."), /*#__PURE__*/React.createElement(P, {
    size: T.small,
    muted: true,
    measure: "44ch",
    style: {
      marginTop: 14
    }
  }, "Standard 1 to Form 5 and IGCSE. Online across Malaysia. No group classes.")), /*#__PURE__*/React.createElement(Reveal, {
    delay: 180
  }, /*#__PURE__*/React.createElement(Cta, {
    note: "Free, 30 minutes, no obligation to continue.",
    style: {
      marginTop: "clamp(30px,3.6vw,44px)"
    }
  }))), /*#__PURE__*/React.createElement(Reveal, {
    delay: 240,
    style: {
      borderTop: "3px solid var(--ink-900)",
      paddingTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Every level, one tutor"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-semibold) ${T.micro}/1 var(--font-mono)`,
      color: "var(--text-faint)"
    }
  }, "11 YEARS")), /*#__PURE__*/React.createElement(Spine, {
    footer: "IGCSE Mathematics and IGCSE Additional Mathematics, taught to the international syllabus rather than translated across from SPM."
  })))));
}
const TRUST = [{
  value: "24",
  label: "years teaching maths"
}, {
  value: "10",
  label: "years teaching online"
}, {
  value: "500+",
  label: "students, taught one at a time"
}];
function TrustBar() {
  const wide = useDesktop();
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      background: "var(--ink-900)",
      overflow: "hidden",
      paddingBlock: "clamp(36px,5vw,64px)"
    }
  }, /*#__PURE__*/React.createElement(GraphGround, {
    invert: true
  }), /*#__PURE__*/React.createElement(Container, {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: wide ? "repeat(4,1fr)" : "repeat(2,1fr)",
      gap: wide ? 0 : "clamp(28px,6vw,40px)",
      rowGap: wide ? 0 : 34
    }
  }, TRUST.map((t, i) => /*#__PURE__*/React.createElement(Reveal, {
    key: t.value,
    variant: "settle",
    delay: i * 80,
    style: {
      paddingInline: wide ? i === 0 ? "0 24px" : "clamp(20px,2.4vw,32px)" : 0,
      borderLeft: wide && i > 0 ? "1px solid rgba(251,250,247,.18)" : undefined
    }
  }, /*#__PURE__*/React.createElement(Figure, {
    invert: true,
    value: t.value,
    label: t.label,
    size: T.figureSm
  }))), /*#__PURE__*/React.createElement(Reveal, {
    variant: "settle",
    delay: 240,
    style: {
      paddingInline: wide ? "clamp(20px,2.4vw,32px)" : 0,
      borderLeft: wide ? "1px solid rgba(251,250,247,.18)" : undefined,
      display: "flex",
      alignItems: "center",
      gridColumn: wide ? undefined : "span 2"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `var(--weight-regular) clamp(17px,2vw,21px)/1.3 var(--font-serif)`,
      color: "var(--paper)",
      maxWidth: "20ch",
      letterSpacing: "-0.01em"
    }
  }, "Online across Malaysia, in English and BM")))));
}
Object.assign(window, {
  PHONE,
  MESSAGE,
  CTA_LABEL,
  T,
  SECTION_Y,
  useDesktop,
  useReveal,
  useInView,
  revealSweep,
  revealAll,
  Reveal,
  GraphGround,
  Section,
  Container,
  Marker,
  Eyebrow,
  H2,
  H3,
  P,
  Prose,
  Figure,
  Bullet,
  List,
  STOPS,
  SHORT,
  Spine,
  GapChart,
  Cta,
  PageHeader,
  Hero,
  TrustBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/LandingShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The sidecar is a SIBLING of the HTML file that uses this component: the
 * read is a document-relative fetch, and the host resolves the bridge's
 * sidecar writes into the previewed file's directory to match (same
 * contract as design_canvas.jsx). Pages in the same directory share one
 * sidecar; keep slot ids distinct across them.
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  // color:inherit (not a fixed near-black): the placeholder chrome —
  // empty-state icon/caption (currentColor) and the dashed ring — must
  // read on dark decks too, and the slide's own text color is the one
  // color guaranteed to contrast with the slide background. The soft
  // look comes from opacity on those parts, not from a baked-in alpha.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.empty .cap,.empty .sub{opacity:.75}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(127,127,127,.08)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px}' + '.empty:hover .sub{opacity:1}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed currentColor;' + '  opacity:.35;transition:border-color .12s,opacity .12s}' + ':host([data-over]) .ring{border-color:#c96442;opacity:1}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' +
  // Replacement in flight: after a src swap the browser keeps painting
  // the PREVIOUS image until the new one decodes, so a Replace would
  // flash the old photo and then pop. Hide the stale frame (visibility,
  // not display — _applyView geometry still applies) and spin until the
  // new image reports in (load/error clears data-swapping).
  ':host([data-swapping]) .frame img{visibility:hidden}' + '.loading{position:absolute;inset:0;display:none;align-items:center;' + '  justify-content:center;pointer-events:none}' + ':host([data-swapping]) .loading{display:flex}' + '.loading::after{content:"";width:22px;height:22px;border-radius:50%;' + '  border:2px solid rgba(127,127,127,.25);border-top-color:currentColor;' + '  animation:om-slot-spin .7s linear infinite}' + '@keyframes om-slot-spin{to{transform:rotate(360deg)}}' +
  // Reduced motion: the static two-tone ring still reads as "working".
  '@media (prefers-reduced-motion:reduce){.loading::after{animation:none}}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // Print must ship just the image too: the hover-gated controls can be
  // mid-hover when print() fires, and the credit chip is screen chrome —
  // the same rule the capture window gets, keyed on print media instead
  // of the host's data-om-exporting mark (the print path sets no mark).
  '@media print{.ctl,.credit{display:none !important}}' +
  // No export-window mask rules here on purpose: the export capture
  // releases the replacement mask by REMOVING data-swapping (the
  // shadow-root pass in pages/export/shared.ts HIDE_EXPORT_CHROME_SCRIPT)
  // — attribute removal works in every engine (:host-context is
  // Chromium-only), is scoped by construction to slots actually
  // mid-swap, and hides the spinner through the same gate. A masked img
  // would otherwise be silently dropped from PPTX decks (the capture
  // walk skips visibility:hidden imgs).
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="loading" part="loading"></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      // Encode-in-flight marker (the owning _ingest generation): while set,
      // the same-src "nothing in flight" clear in _render must not fire —
      // the stored value still points at the OLD image until the encode
      // lands, so that clear would unmask the stale image mid-replace.
      this._swapGen = 0;
      // Render-owned swap in flight: set when _render assigns a new src,
      // cleared only by the img's own load/error (or the empty branch).
      // img.complete CANNOT stand in for this — setting src only QUEUES
      // the current-request swap (a microtask), so synchronously after an
      // assignment, complete still reports the OLD settled request. The
      // pick path does exactly that: the host sets src, credit, and
      // credit-href back-to-back in one task, and renders #2/#3 would
      // read the stale complete === true and drop the mask one render
      // after it was set.
      this._loadPending = false;
      // See _render's empty branch: a transient attribution-error wipe of a
      // showing image must make the follow-up render a replacement (spinner),
      // not a first fill (blank frame).
      this._hidShowing = false;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      // load/error also release the replacement-in-flight mask (via the
      // single discipline in _releaseMask): the swap is only revealed once
      // the new image can actually paint (on error the frame shows its
      // background, same as a fresh slot with a broken src).
      this._img.addEventListener('load', () => {
        this._loadPending = false;
        this._releaseMask(true);
        this._applyView();
      });
      this._img.addEventListener('error', () => {
        this._loadPending = false;
        this._releaseMask(true);
      });
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }

    // A src write is a newer intent for this slot's content — the host
    // pick path (setImageSlotImage) or an agent edit — so it must win
    // over any encode still in flight from an earlier drop: left live,
    // that encode lands later, passes _ingest's gen guard, and its
    // setSlot silently overwrites the pick (the stored value shadows
    // src in _render). Bumping _gen kills the encode before its own
    // _swapGen clear runs, so clear the dead claim here too — otherwise
    // _releaseMask (gated on !_swapGen) never fires and the pick's
    // spinner is stranded. src ONLY: the pick sets credit/credit-href
    // in the same task, and clearing _swapGen on those would let the
    // same-src branch unmask the old image mid-encode.
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'src' && oldVal !== newVal) {
        this._gen++;
        this._swapGen = 0;
      }
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      // Replacing a shown image: surface the swap through the encode too,
      // not just the decode — otherwise the old photo sits there with no
      // feedback while the canvas re-encode runs. An empty slot keeps its
      // placeholder (no spinner) until the encode lands, as before.
      // _swapGen guards the mask against re-renders DURING the encode
      // (pointerenter, ResizeObserver, another slot's store write): the
      // stored value still resolves to the old image there, so _render's
      // same-src clear would otherwise unmask it mid-replace.
      if (this.hasAttribute('data-filled')) {
        this.setAttribute('data-swapping', '');
        this._swapGen = gen;
      }
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        // Clear BEFORE setSlot: its synchronous re-render must see no
        // pending encode, so a byte-identical re-upload (same data URL, no
        // load event coming) still clears the mask via the complete branch.
        this._swapGen = 0;
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._swapGen = 0;
        // Reveal the kept old image — unless another replacement (a
        // remote pick's src swap) is still in flight, in which case the
        // mask stays until THAT image settles (its load/error releases).
        this._releaseMask();
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // The single release discipline for the replacement-in-flight mask
    // (data-swapping). The mask comes off only when BOTH hold:
    //  - no encode is pending (_swapGen) — mid-encode the stored value
    //    still resolves to the old image, so any reveal paints it;
    //  - the frame img has settled on its current src — an unsettled src
    //    means some replacement is still in flight (e.g. a remote pick),
    //    whoever started it, and revealing would paint the previous
    //    frame. The load/error listeners pass settled=true (the event IS
    //    the settlement signal, per spec complete is true by then);
    //    other callers rely on the complete flag (covers loaded AND
    //    failed).
    // Every release path funnels through here EXCEPT _render's empty
    // branch (the img is being cleared — nothing will ever settle).
    _releaseMask(settled) {
      if (!this._swapGen && !this._loadPending && (settled || this._img.complete)) {
        this.removeAttribute('data-swapping');
      }
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        const prev = this._img.getAttribute('src');
        if (prev !== url) {
          // Replacing an already-shown image: mark the swap BEFORE setting
          // src so the stale frame is never revealed (see the data-swapping
          // stylesheet rules). First fill (prev empty) keeps the existing
          // placeholder-until-load behavior — no spinner. _hidShowing
          // covers the pick path's transient attribution-error wipe: prev
          // is gone, but an image WAS showing, so this is a replacement.
          if (prev || this._hidShowing) this.setAttribute('data-swapping', '');
          // Mark the swap BEFORE assigning src: complete keeps reporting
          // the old settled request until the browser's
          // update-the-image-data microtask runs, so same-task re-renders
          // (the pick path's credit/credit-href setAttributes) need this
          // flag, not complete, to know a load is in flight.
          this._loadPending = true;
          this._img.src = url;
          this._ghost.src = url;
        } else {
          // Same-src re-render — release if settled, so an ingest-set
          // spinner can't stick after a byte-identical re-upload (same
          // data URL, no further load event ever fires).
          this._releaseMask();
        }
        this._hidShowing = false;
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this.removeAttribute('data-swapping');
        // The src is being removed — no load/error will ever fire for it.
        this._loadPending = false;
        // A transient attribution-error wipe of a showing image happens on
        // the pick path: the host sets src one setAttribute before credit,
        // so render N hides the old image (attrError) and render N+1
        // restores a URL. Remember the wipe so that restore renders as a
        // replacement (spinner), not a first fill (blank frame).
        this._hidShowing = attrError && !!this._img.getAttribute('src');
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/image-slot.js", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.WhatsAppGlyph = __ds_scope.WhatsAppGlyph;

__ds_ns.ProgressMeter = __ds_scope.ProgressMeter;

__ds_ns.ScoreTable = __ds_scope.ScoreTable;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Testimonial = __ds_scope.Testimonial;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Callout = __ds_scope.Callout;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.WhatsAppButton = __ds_scope.WhatsAppButton;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

})();
