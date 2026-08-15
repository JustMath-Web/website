Long FAQ lists where a parent scans questions and opens one.

```jsx
<Accordion defaultOpen={0} items={[{q:"How long is each session?", a:"One hour a week…"}]} />
```

Hairline rules only — no cards, no chevrons, no shadows. The toggle is a plus whose two bars rotate into a minus, and the panel animates to its measured height over 240ms. Questions in sans medium, answers capped at 64ch.

The trigger carries `aria-expanded` + `aria-controls`; the panel is `role="region"` with `aria-labelledby`, and is `inert` while closed so a collapsed answer is neither tabbable nor read aloud. Pass a distinct `idPrefix` if two accordions share a page, or their generated ids collide.
