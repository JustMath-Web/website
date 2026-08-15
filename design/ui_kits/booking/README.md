# Booking UI kit — the WhatsApp thread

The only booking surface. There is no calendar app, no account, no confirmation email.

- `index.html` — interactive: pick a reply and the thread advances to a confirmed lesson card.
- `Booking.jsx` — `Thread`, `Bubble`, `BookingCard`, plus the annotation column.

Notes:
- This is a **stylised representation** of the conversation, not a pixel recreation of the WhatsApp client. Generic thread chrome, brand ink header, `--wa-green-100` on the parent's own bubbles only.
- The tutor's avatar is `assets/monogram-operators-square.svg` at 40px — the size the mark was designed to survive.
- Message copy is the tone reference for anything written in the thread: a time, a price, what happens next.
