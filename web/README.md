# Just Math Malaysia — Web

Astro + Sanity frontend for the Just Math Malaysia informative site + blog. Built under
`Setup_Instructions/Guidelines/Web-Development/Web-Development-Guidelines/02-INFORMATIVE-BLOG.md`.

This is **one of two package roots** for this project — `../studio/` is the separate Sanity Studio.
They are not a pnpm workspace; each has its own lockfile and is installed/run independently.

## Stack

Astro 7 (TypeScript strict) · Tailwind CSS v4 · `@sanity/client` · static Cloudflare Pages
deployment. No React/UI framework island exists yet — see `docs/DECISIONS.md` at the project root
for the full stack decision record and every pinned version.

## Local setup

```sh
pnpm install
cp .env.example .env   # fill in values, see "Environment variables" below
pnpm dev                # http://localhost:4321
```

Requires Node 22.12.0 exactly and pnpm (see `package.json#engines` — pinned, not a minimum, to avoid
Cloudflare's build-tool auto-detection mis-parsing a version range; see `docs/DECISIONS.md` §34).

## Commands

| Command             | Action                                                               |
| :------------------ | :------------------------------------------------------------------- |
| `pnpm dev`          | Start the dev server                                                 |
| `pnpm build`        | Production build to `./dist/`                                        |
| `pnpm preview`      | Preview the production build locally                                 |
| `pnpm check`        | Astro/TypeScript typecheck (`astro check`)                           |
| `pnpm format`       | Format with Prettier (+ `prettier-plugin-tailwindcss` class sorting) |
| `pnpm format:check` | Check formatting without writing                                     |

## Environment variables

See `.env.example` for the authoritative list with inline explanations. Summary:

| Variable                   | Required                       | Notes                                                                                                                               |
| -------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `PUBLIC_SANITY_PROJECT_ID` | Yes                            | Exposed to the browser bundle (Astro `PUBLIC_` convention).                                                                         |
| `PUBLIC_SANITY_DATASET`    | Yes                            | Same as above.                                                                                                                      |
| `SANITY_API_READ_TOKEN`    | Only if the dataset is private | Server-only. Read/viewer scope only — never a write token here. Does **not** by itself enable draft reads (see below).              |
| `ENABLE_SANITY_PREVIEW`    | No                             | Must be the exact string `"true"`. Only meaningful together with the token, via `createPreviewClient()` — not wired to a route yet. |

**Perspective safety:** `src/lib/sanity/client.ts`'s default `sanityClient` always reads
`perspective: "published"`, whether or not a token is set. A token is purely an authentication
concern (needed if the dataset is private); it must never implicitly widen a production build to
include draft content. Draft/preview reads only ever go through the separate
`createPreviewClient()`, which requires both the token and `ENABLE_SANITY_PREVIEW=true`.

## Sanity connection

Project `v4v0i7gl`, dataset `production` (`docs/DECISIONS.md` §6). Schemas live in `../studio/`.
Query helpers and hand-authored result types live in `src/lib/sanity/` (`client.ts`, `queries.ts`,
`types.ts`, `image.ts`) — see `docs/DECISIONS.md` §4b for the plan to replace the hand-authored
types with generated Sanity TypeGen output.

## Design tokens

`src/styles/tokens/*.css` are byte-for-byte copies of `../design/tokens/*.css` (the Bob-reviewed,
contrast-verified design authority) — do not hand-edit them; regenerate from `../design/tokens/` if
the design package changes. `src/styles/global.css` wires them into Tailwind v4's `@theme inline`,
replacing Tailwind's default color/type/radius/shadow/easing scales entirely so only the brand's
actual token values are reachable as utility classes.

## What's verified vs. deferred

Verified as of the last scaffold pass: `pnpm build`, `pnpm check`, `pnpm format:check` all pass.

Not yet built: no real page templates beyond a token-wiring smoke check at `/`, no Playwright, no
CI, no seeded Sanity content, no redirects/sitemap/RSS wiring. See root `HANDOFF.md` for the current
session-by-session status and `docs/DECISIONS.md` for every recorded scaffold decision.

## Deploy

Target is Cloudflare Pages — connect this `web/` directory as the project root, set the
environment variables above per environment (especially `DEPLOY_ENV=production` only in the
production environment), and wire the Sanity publish webhook to a Cloudflare Pages deploy hook once
content exists. Not yet configured in this repo.
