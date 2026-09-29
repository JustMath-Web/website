The brand mark — use for every header, footer, avatar and report letterhead; never re-typeset the name by hand.

```jsx
<Logo size={26} />                          {/* site header lockup */}
<Logo variant="monogram" size={40} reversed /> {/* WhatsApp Business avatar */}
<Logo reversed size={24} />                 {/* dark footer */}
```

Variants: `lockup` (default — the mark, then Just Math with MALAYSIA justified beneath), `monogram`/`mark` (the mark alone — favicons, avatars, anywhere the lockup is too small), `wordmark`/`stacked` (type alone, where the mark already appears nearby). Minimum lockup size 18px; below that use the mark alone. The mark's stroke is drawn with `currentColor`, so `reversed` recolours it — never recolour it by hand, never set it in green, never use the original four-colour PNG. The dot is always ochre-500 (`ASSETS.md` §1c), on either ground.
