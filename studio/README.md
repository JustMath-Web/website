# Just Math Malaysia — Studio

Sanity Studio (content editing environment) for the Just Math Malaysia informative site + blog.
Built under
`Setup_Instructions/Guidelines/Web-Development/Web-Development-Guidelines/02-INFORMATIVE-BLOG.md`.

This is **one of two package roots** for this project — `../web/` is the separate Astro frontend
that reads from this Studio's dataset. They are not a pnpm workspace; each has its own lockfile and
is installed/run independently. Per `docs/DECISIONS.md` §5, Studio is deliberately **not**
brand-designed — it uses Sanity's default UI, since it's internal single-user tooling.

## Local setup

```sh
pnpm install
pnpm dev   # http://localhost:3333
```

Requires Node ≥20.19 (see `package.json#engines` is unset — matches whatever `sanity` itself
requires; Node ≥22.12 as used elsewhere in this project is safe).

## Commands

| Command                             | Action                                  |
| ----------------------------------- | --------------------------------------- |
| `pnpm dev`                          | Local Studio dev server                 |
| `pnpm build`                        | Production build to `./dist/`           |
| `pnpm deploy`                       | Deploy the hosted Studio (`sanity.io`)  |
| `pnpm typecheck`                    | `tsc --noEmit`                          |
| `pnpm lint`                         | ESLint (`@sanity/eslint-config-studio`) |
| `pnpm seed:dry-run`                 | Validate seed data without writing      |
| `pnpm seed`                         | Seed the target Sanity dataset          |
| `pnpm format` / `pnpm format:check` | Prettier                                |

## Sanity project

| Setting                 | Value                                           |
| ----------------------- | ----------------------------------------------- |
| Project ID              | `v4v0i7gl`                                      |
| Dataset                 | `production`                                    |
| Manage/deploy dashboard | `https://www.sanity.io/manage/project/v4v0i7gl` |

No `.env` file is required for local Studio development — `sanity.config.ts` hardcodes the project
ID/dataset (they are not secrets), and Studio auth is per-user via `sanity login`.

## Seed content

The first vertical slice includes a Studio-owned seed script:

```sh
pnpm seed:dry-run
SANITY_API_WRITE_TOKEN=... pnpm seed
```

`pnpm seed` creates or updates:

- Singleton documents with explicit IDs: `homePage`, `siteSettings`, and `navigation`.
- Syllabus categories found by slug, using Sanity-generated IDs for newly created documents.
- The default author, found by slug `mr-kong`.

The script reuses `../web/src/lib/content/defaultLandingData.ts` so the local fallback page and
seeded Sanity documents stay aligned with the approved landing-page copy. A write token is required
for the real seed; `.env.example` documents the expected variable name without storing a secret.

## Studio access

Editors need a Sanity account invited to this project (`sanity.io/manage` → project → Members) with
an appropriate role — do not grant broad Administrator access merely to avoid an editor-role seat
cost (guideline Section 4, Q9). Grant access to individual identities; never a shared login.

## Schema

All document types and shared objects are defined in `schemaTypes/`, matching
`../docs/CONTENT-MODEL.md` field-for-field:

- **Documents:** `homePage`, `post`, `category`, `author`, `siteSettings`, `navigation`, `redirect`
  (`schemaTypes/documents/`).
- **Shared/home-page objects:** `seo`, `imageWithAlt`, `cta`, `navItem`, the Portable Text custom
  types (`mathInline`, `mathBlock`, `working`, `commonMistake`, `callout`), and the home-page-only
  section objects (`schemaTypes/objects/`).
- **Desk structure:** `structure.ts` gives `homePage`/`siteSettings`/`navigation` fixed singleton
  entries (no "create new" for those types) and groups content under Site/Blog.
- Slug fields (`post`, `category`, `author`) enforce lowercase-hyphenated format and uniqueness via
  `schemaTypes/lib/slugValidation.ts`.

## Auto-updates

`sanity.cli.ts` has `autoUpdates: true` — the **hosted** Studio always runs Sanity's latest release
on its update channel, independent of the locally pinned `sanity` package version in
`package.json`. This is a deliberate, documented decision (`docs/DECISIONS.md` §4d), not an
oversight — see that section for the risk, test cadence, and rollback path.

## What's verified vs. deferred

Verified as of the last scaffold pass: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, and
`pnpm build` all pass (network access to `sanity-cdn.com` is required for `pnpm build`).

Not yet done: the seed script exists, but the real dataset seed still requires a private write token;
no `sanity-typegen.json` is wired yet (see root `docs/DECISIONS.md` §4b), Studio not yet deployed to
a hosted URL.
