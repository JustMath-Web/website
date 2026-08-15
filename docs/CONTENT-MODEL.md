# Content Model — Just Math Malaysia

Date started: 2026-08-14

This content model supports the approved Astro + Sanity v1 scope: landing page, blog archive,
syllabus-level category archives, blog posts, RSS, redirects, navigation, and site settings.

Principles:

- Model content meaning, not visual layout.
- Use fixed typed templates for approved pages. Do not add a freeform page builder in v1.
- Keep design-derived labels visible in code/docs; do not present derived brand decisions as
  official client brand standards.
- Let Sanity generate ordinary document IDs. Use explicit IDs only for singletons.

## 1. Document Types

| Type | Purpose | Route impact |
| --- | --- | --- |
| `homePage` | Singleton content for `/` | `/` |
| `post` | Blog article | `/blog/[slug]/` |
| `category` | Syllabus-level category | `/blog/level/[slug]/` |
| `author` | Author profile, initially Mr Kong | Used on posts and JSON-LD |
| `siteSettings` | Singleton contact, SEO, domain, social, WhatsApp config | Sitewide |
| `navigation` | Singleton header/footer menu labels and links | Sitewide |
| `redirect` | Known old-site redirects and future migration redirects | Build/deploy config source |

## 2. Shared Objects

### `seo`

Used by `homePage`, `post`, `category`, and `siteSettings.defaultSeo`.

| Field | Type | Validation / notes |
| --- | --- | --- |
| `metaTitle` | `string` | Max 60 warning |
| `metaDescription` | `text` | Max 160 warning |
| `ogImage` | `image` | Optional; falls back to default OG image |
| `ogImageAlt` | `string` | Required when `ogImage` is informative |
| `canonicalUrl` | `url` | Optional override only |
| `noindex` | `boolean` | Default false |

### `imageWithAlt`

| Field | Type | Validation / notes |
| --- | --- | --- |
| `image` | `image` | Hotspot enabled |
| `intent` | `string` | Radio: `informative`, `decorative` |
| `alt` | `string` | Required when intent is `informative`; empty when decorative |
| `caption` | `string` | Optional |

### `cta`

For typed page CTA references, not arbitrary marketing variations.

| Field | Type | Validation / notes |
| --- | --- | --- |
| `label` | `string` | Default in-page CTA: `Book a free maths assessment on WhatsApp` |
| `href` | `url` | Must be the approved WhatsApp URL unless owner approves a change |
| `kind` | `string` | Radio: `whatsapp`, `internal`, `external` |

### `portableBlock`

Portable Text for blog body.

Allowed block styles:

- Normal paragraph
- `h2`
- `h3`
- Blockquote

Allowed list styles:

- Bullet
- Numbered

Allowed decorators/annotations:

- Strong
- Emphasis
- Link with valid `http`, `https`, `mailto`, or internal route reference

Allowed custom objects:

- `mathInline`
- `mathBlock`
- `working`
- `commonMistake`
- `callout`
- `imageWithAlt`

No raw HTML object is allowed.

## 3. `homePage` Singleton

Explicit ID: `homePage`.

The home page should be typed around the approved design sections, not a reorderable page builder.
Most v1 content can be seeded from approved copy and then edited in Sanity only where safe.

| Field | Type | Validation / notes |
| --- | --- | --- |
| `title` | `string` | Internal Studio title |
| `hero` | `object` | Headline, subheadline, support line, CTA, small note |
| `trustItems` | `array` of `statItem` | Exactly 4 |
| `problem` | `object` | Heading, body copy, gap-chart annotations as structured data |
| `sessions` | `object` | Heading, body, sub-sections |
| `levels` | `array` of `levelBlock` | Exactly the approved level blocks unless owner approves a change |
| `about` | `object` | Byline, heading, body, portrait image slot, stat panel |
| `pricing` | `object` | Heading, body, pricing rows, included list, availability copy |
| `processSteps` | `array` of `processStep` | Exactly 4; renders as ordered list |
| `faqs` | `array` of `faqItem` | Source of the displayed FAQ count |
| `finalCta` | `object` | Heading, body, CTA, small note |
| `seo` | `seo` | Page SEO |

Implementation notes:

- FAQ count is computed from `faqs.length`; never type `13` into a component.
- Trust bar accessible name defaults to `Teaching experience` unless changed by owner.
- `levels` and `faqs` use the existing kicker text for section labelling per `design/STATES.md`.
- The portrait is missing; do not publish a fake image. If unavailable, use an owner-approved
  typographic About fallback.

## 4. `post`

Ordinary documents: generated `_id`.

| Field | Type | Validation / notes |
| --- | --- | --- |
| `title` | `string` | Required |
| `slug` | `slug` | Required, unique among posts, lowercase hyphenated |
| `excerpt` | `text` | Required, max 220 warning |
| `body` | Portable Text | Required before publish |
| `author` | `reference` to `author` | Required |
| `categories` | `array` of references to `category` | At least 1 |
| `publishedAt` | `datetime` | Required before publish |
| `updatedAt` | `datetime` | Optional |
| `readingTimeMinutes` | `number` | Can be computed at build; if editable, integer min 1 |
| `reviewStatus` | `string` | Radio: `draft`, `needsMathReview`, `approvedByMrKong` |
| `sourceUrl` | `url` | Optional, for refreshed old WordPress posts |
| `seo` | `seo` | Optional with fallbacks |

Publish rule:

- No production post ships unless `reviewStatus` is `approvedByMrKong`.
- The design package's sample surds article is placeholder and must not ship as approved content.

Structured data:

- Render `BlogPosting` JSON-LD with headline, author, published/updated dates, image if available,
  and canonical URL.

## 5. `category`

Ordinary documents: generated `_id`, seeded once.

Route: `/blog/level/[slug]/`.

| Field | Type | Validation / notes |
| --- | --- | --- |
| `title` | `string` | Required |
| `slug` | `slug` | Required, unique |
| `shortLabel` | `string` | Optional compact UI label |
| `description` | `text` | Optional archive intro |
| `order` | `number` | Required for syllabus order |
| `seo` | `seo` | Optional |

Seed categories:

| Title | Slug | Order |
| --- | --- | --- |
| Standard 1–6 | `standard-1-6` | 10 |
| Form 1–3 | `form-1-3` | 20 |
| Form 4–5 | `form-4-5` | 30 |
| Additional Mathematics | `add-maths` | 40 |
| SPM | `spm` | 50 |
| IGCSE | `igcse` | 60 |

Category archive layout:

- Reuses blog archive layout.
- Applies active `CategoryRail` state.
- Uses a filtered post list.
- Heading/kicker are derived from the category title and archive template, not a new design.

## 6. `author`

Ordinary documents: generated `_id`; seed Mr Kong.

| Field | Type | Validation / notes |
| --- | --- | --- |
| `name` | `string` | Required |
| `slug` | `slug` | Required |
| `role` | `string` | Example: `Tutor, Just Math Malaysia` |
| `bio` | `text` | Optional |
| `avatar` | `imageWithAlt` | Optional |
| `sameAs` | `array` of `url` | Optional |

No public author archive in v1 unless more authors are added.

## 7. `siteSettings` Singleton

Explicit ID: `siteSettings`.

| Field | Type | Validation / notes |
| --- | --- | --- |
| `siteName` | `string` | `Just Math Malaysia` |
| `domain` | `url` | `https://mathematicsmalaysia.com` |
| `phoneDisplay` | `string` | `019 472 8768` |
| `whatsappNumber` | `string` | E.164 digits without `+`: `60194728768` |
| `whatsappMessage` | `text` | Approved prefilled message |
| `primaryCtaLabel` | `string` | In-page CTA label |
| `headerCtaLabel` | `string` | Owner decision; currently `Schedule Now` |
| `defaultSeo` | `seo` | Required |
| `ogDefaultImage` | `image` or `file` | Optional if local file remains code-owned |

The WhatsApp glyph decision is not a CMS field. It is an implementation/asset decision: official
white/reversed asset or no glyph.

## 8. `navigation` Singleton

Explicit ID: `navigation`.

| Field | Type | Validation / notes |
| --- | --- | --- |
| `headerLinks` | `array` of `navItem` | Includes Blog |
| `footerLinks` | `array` of `navItem` | Footer/site links |

`navItem` fields:

| Field | Type | Validation / notes |
| --- | --- | --- |
| `label` | `string` | Required |
| `href` | `string` | Required; valid internal path, fragment, or external URL |
| `kind` | `string` | `internal`, `fragment`, `external`, `whatsapp`, `tel` |

Links navigate and buttons act. WhatsApp CTAs are anchors.

## 9. `redirect`

Ordinary documents may be useful long-term, but the initial known redirects can also live in code for
simplicity. If modelled in Sanity, use:

| Field | Type | Validation / notes |
| --- | --- | --- |
| `from` | `string` | Required, starts with `/` |
| `to` | `string` | Required, internal path or external URL |
| `permanent` | `boolean` | Default true |
| `note` | `text` | Optional reason/source |

Initial redirect inventory:

| From | To | Status |
| --- | --- | --- |
| `/about/` | `/#about` | 301 |
| `/faq/` | `/#faq` | 301 |
| `/pricing/` | `/#pricing` | 301 |
| `/blog/` | `/blog/` | Keep live; no redirect if route exists |
| `/category/algebra/` | `/blog/level/form-1-3/` | 301 initial |
| `/differentiation-using-the-first-principle/` | `/blog/level/add-maths/` | 301 initial; revise to refreshed post URL if imported |
| `/mastering-algebra/` | `/blog/level/form-1-3/` | 301 initial; revise to refreshed post URL if imported |

The two old post URLs have concrete first-slice redirect targets above. Content-review them before
writing fresh posts; if they are refreshed into new posts, revise the redirects one-to-one to the
new post slugs.

## 10. Studio Structure

Recommended Studio desk groups:

- Site
  - Home page
  - Site settings
  - Navigation
  - Redirects
- Blog
  - Posts
  - Categories
  - Authors

Use singleton structure items for `homePage`, `siteSettings`, and `navigation`.

## 11. Query Requirements

Frontend GROQ utilities should provide:

- `getHomePage()`
- `getSiteSettings()`
- `getNavigation()`
- `getAllPosts()`
- `getPostBySlug(slug)`
- `getPostSlugs()`
- `getCategoriesWithCounts()`
- `getCategoryBySlug(slug)`
- `getPostsByCategorySlug(slug)`
- `getRedirects()`, if redirects are Sanity-backed

Array projections must include `_key` for Portable Text/custom arrays.

Use `defineQuery` from `groq` and typed helper functions. No unchecked `any` content reaches
components.

## 12. Fixtures And Seeding

Seed or fixture content allowed for development:

- Site settings with approved WhatsApp number/message.
- Six categories.
- Mr Kong author.
- Home page content from `just-math-page-copy-final.md`.
- One or two placeholder posts only in development/preview, clearly marked
  `reviewStatus: needsMathReview`.

Production rule:

- Placeholder blog content must not ship.
- Placeholder category post counts must not ship.
- Report empty-state strings must be confirmed before parent-facing report use.
