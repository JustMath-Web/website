Wraps every control so labels, hints and errors stay consistent.

```jsx
<Field label="Which form is your child in?" hint="Form 1 to Form 5, or IGCSE year." htmlFor="form">
  <Select id="form" options={["Form 1", "Form 2", "Form 3"]} />
</Field>
```

Labels are sentence case and ask a real question. `required` renders a quiet "· required" rather than a red asterisk.
