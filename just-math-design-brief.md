# Paste this into Claude Design first

Design a single-page landing page for a solo mathematics tutor in Malaysia. Copy is final and attached separately. Do not rewrite it, do not shorten it, and do not invent replacement text. Design around it.

**Who this is for.** Malaysian parents, roughly 30 to 50, buying tuition for a child aged 5 to 17. Traffic will be overwhelmingly mobile and every conversion is a WhatsApp message, not a form submission. Design mobile first and treat desktop as the secondary case.

**What the business is.** One tutor, 24 years teaching, 10 of them online. Every session is live one-to-one on Google Meet. There is no centre, no team, no app. The page's central argument is that one person teaching every level from Standard 1 to Form 5 sees patterns a specialist cannot.

**The two looks to avoid.**

Not edtech SaaS. No gradient hero, no floating dashboard mockup, no abstract 3D shapes, no "platform" language in the visual grammar. There is no product here, only a person.

Not a tuition centre. No bright primary colours, no cartoon mascots, no clip-art pencils or graduation caps, no exclamation marks, no photographs of smiling children at laptops. Stock photography of children would actively damage a page whose whole claim is that a real named person teaches every session.

Aim instead at something closer to a serious independent practitioner. Calm, typographic, confident, a little editorial. A good accountant or architect's site, not a school's.

**There is exactly one photograph and no logo yet.** A single portrait of the tutor sits in the About section and nowhere else. Everywhere else, typography, spacing and restraint carry the page. Assume zero imagery beyond what you can construct from type and simple geometry. If a section feels empty, the answer is better typographic hierarchy rather than a placeholder image.

**Numbers should be a design feature.** This is a maths tutor. 24 years, 10 years online, 500+ students, the prices, the session lengths. Choose a typeface with strong numerals and let the figures be large and confident. This is the one place the page is allowed to be loud.

**Colour.** Five buttons on this page open WhatsApp, so WhatsApp green is effectively part of the identity whether or not it gets chosen deliberately. Build the palette around it rather than fighting it. A deep ink or charcoal for text, a warm off-white ground rather than pure white, green reserved exclusively for the CTA buttons so that green always means "this opens WhatsApp." No other element should use it.

**Structure, in order.** Hero, trust bar of four items, problem, why one-to-one, four level blocks, about the tutor, pricing, how it works in four steps, FAQ accordion of thirteen items, final CTA.

**Naming.** The tutor appears as Mr Kong, in a small byline above the About section and in the footer. He is never part of the logo. The business is Just Math Malaysia; Mr Kong signs it.

**Three things that will trip you up.**

There is no testimonials section, and that is deliberate. Do not leave a band where one obviously belongs, and do not add placeholder quotes.

The pricing table has five rows and four columns, including a session-length column where one row differs from the other four. It is the densest object on the page and the row that differs is the highest-margin one, so it must stay readable on a narrow phone. Do not collapse it into cards that hide the comparison.

Five CTAs appear on the page and all carry identical text. Give them one consistent treatment so they read as the same repeated action rather than five different offers.

**Build target is Bricks Builder with AutomaticCSS.** Favour a fluid type and spacing scale, standard section-container-content nesting, and layouts that resolve to simple flex or grid. Avoid anything that would need bespoke CSS to reproduce.
