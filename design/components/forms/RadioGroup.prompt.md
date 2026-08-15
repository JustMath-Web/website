Choices a parent should see all of at once: lesson length, weekday vs weekend.

```jsx
<RadioGroup name="slot" value={slot} onChange={setSlot} columns={2}
  options={[{value:"wk", label:"Weekday evening", note:"After 8pm"}, {value:"we", label:"Weekend morning"}]} />
```

Selected row goes ink border on sunken paper. No colour fills, no green.
