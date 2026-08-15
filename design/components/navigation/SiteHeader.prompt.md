The site header. 76px tall, translucent paper with blur, hairline bottom rule.

```jsx
<SiteHeader links={[{href:"#how", label:"How it works"}, {href:"#fees", label:"Fees"}]} active="#how" onNavigate={setSection} />
```

Active link is marked with a 2px ink underline, never a pill or a colour fill. Exactly one WhatsApp button lives here.
