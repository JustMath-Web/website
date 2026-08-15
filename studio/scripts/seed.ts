import {existsSync, readFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {createClient} from '@sanity/client'
import {
  defaultAuthor,
  defaultCategories,
  defaultHomePage,
  defaultNavigation,
  defaultSiteSettings,
} from '../../web/src/lib/content/defaultLandingData'

const API_VERSION = '2026-08-15'
const HOME_PAGE_ID = 'homePage'
const SITE_SETTINGS_ID = 'siteSettings'
const NAVIGATION_ID = 'navigation'

const fallbackCategoryRefToSlug: Record<string, string> = {
  'category-standard-1-6': 'standard-1-6',
  'category-form-1-3': 'form-1-3',
  'category-form-4-5': 'form-4-5',
  'category-add-maths': 'add-maths',
  'category-spm': 'spm',
  'category-igcse': 'igcse',
}

type Env = Record<string, string>
type JsonObject = Record<string, unknown>
type SeedDocument = {_type: string; _id?: string; [key: string]: unknown}
type IdentifiedSeedDocument = SeedDocument & {_id: string}

const scriptDir = dirname(fileURLToPath(import.meta.url))
const studioRoot = resolve(scriptDir, '..')
const repoRoot = resolve(studioRoot, '..')

function parseEnvFile(path: string): Env {
  if (!existsSync(path)) return {}

  return readFileSync(path, 'utf8')
    .split(/\r?\n/)
    .reduce<Env>((accumulator, line) => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) return accumulator

      const match = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(trimmed)
      if (!match) return accumulator

      let value = match[2].trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }

      accumulator[match[1]] = value
      return accumulator
    }, {})
}

function loadEnv(): Env {
  const fileEnv = [
    resolve(studioRoot, '.env'),
    resolve(studioRoot, '.env.local'),
    resolve(repoRoot, 'web/.env'),
    resolve(repoRoot, 'web/.env.local'),
  ].reduce<Env>(
    (accumulator, path) => ({
      ...accumulator,
      ...parseEnvFile(path),
    }),
    {},
  )
  const shellEnv = Object.fromEntries(
    Object.entries(process.env).filter(
      (entry): entry is [string, string] => typeof entry[1] === 'string',
    ),
  )

  return {...fileEnv, ...shellEnv}
}

function clone<T>(value: T): T {
  return structuredClone(value)
}

function stripUndefined<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => stripUndefined(item)) as T
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as JsonObject)
        .filter(([, item]) => item !== undefined)
        .map(([key, item]) => [key, stripUndefined(item)]),
    ) as T
  }

  return value
}

function withSlug(slug: string) {
  return {_type: 'slug', current: slug}
}

function withSeo(seo: object | undefined) {
  return seo ? {_type: 'seo', ...seo} : undefined
}

function withCta(cta: object | undefined) {
  return cta ? {_type: 'cta', ...cta} : undefined
}

function withSubSection(section: object | undefined) {
  return section ? {_type: 'subSection', ...section} : undefined
}

function categoryDocument(category: (typeof defaultCategories)[number]): SeedDocument {
  return stripUndefined({
    _type: 'category',
    title: category.title,
    slug: withSlug(category.slug.current),
    shortLabel: category.shortLabel,
    description: category.description,
    order: category.order,
    seo: withSeo(category.seo),
  }) as SeedDocument
}

function authorDocument(): SeedDocument {
  return stripUndefined({
    _type: 'author',
    name: defaultAuthor.name,
    slug: withSlug(defaultAuthor.slug.current),
    role: defaultAuthor.role,
    bio: defaultAuthor.bio,
    sameAs: defaultAuthor.sameAs,
  }) as SeedDocument
}

function siteSettingsDocument(): IdentifiedSeedDocument {
  return stripUndefined({
    _id: SITE_SETTINGS_ID,
    _type: 'siteSettings',
    ...clone(defaultSiteSettings),
    defaultSeo: withSeo(defaultSiteSettings.defaultSeo),
  }) as IdentifiedSeedDocument
}

function navigationDocument(): IdentifiedSeedDocument {
  return stripUndefined({
    _id: NAVIGATION_ID,
    _type: 'navigation',
    headerLinks: defaultNavigation.headerLinks.map((item) => ({
      _type: 'navItem',
      ...item,
    })),
    footerLinks: defaultNavigation.footerLinks.map((item) => ({
      _type: 'navItem',
      ...item,
    })),
  }) as IdentifiedSeedDocument
}

function homePageDocument(categoryIdsBySlug: Record<string, string>): IdentifiedSeedDocument {
  const page = clone(defaultHomePage)

  return stripUndefined({
    _id: HOME_PAGE_ID,
    _type: 'homePage',
    title: page.title,
    hero: {
      ...page.hero,
      cta: withCta(page.hero.cta),
    },
    trustItems: page.trustItems.map((item) => ({
      _type: 'statItem',
      ...item,
    })),
    problem: {
      ...page.problem,
      gapChartAnnotations: page.problem.gapChartAnnotations?.map((item) => ({
        _type: 'gapChartAnnotation',
        ...item,
      })),
    },
    sessions: {
      ...page.sessions,
      subSections: page.sessions.subSections.map((section) => withSubSection(section)),
      cta: withCta(page.sessions.cta),
    },
    levels: page.levels.map((level) => {
      const slug = level.category ? fallbackCategoryRefToSlug[level.category._ref] : undefined
      const categoryId = slug ? categoryIdsBySlug[slug] : undefined

      return {
        _type: 'levelBlock',
        ...level,
        category: categoryId ? {_type: 'reference', _ref: categoryId} : undefined,
      }
    }),
    levelsClosingStatement: page.levelsClosingStatement,
    about: {
      ...page.about,
      statPanel: withSubSection(page.about.statPanel),
    },
    pricing: {
      ...page.pricing,
      pricingRows: page.pricing.pricingRows.map((row) => ({
        _type: 'pricingRow',
        ...row,
      })),
      availability: withSubSection(page.pricing.availability),
      cta: withCta(page.pricing.cta),
    },
    processSteps: page.processSteps.map((step) => ({
      _type: 'processStep',
      ...step,
    })),
    faqs: page.faqs.map((faq) => ({
      _type: 'faqItem',
      ...faq,
    })),
    finalCta: {
      ...page.finalCta,
      cta: withCta(page.finalCta.cta),
    },
    seo: withSeo(page.seo),
  }) as IdentifiedSeedDocument
}

async function main() {
  const env = loadEnv()
  const dryRun = process.argv.includes('--dry-run')
  const projectId = env.PUBLIC_SANITY_PROJECT_ID ?? env.SANITY_STUDIO_PROJECT_ID ?? 'v4v0i7gl'
  const dataset = env.PUBLIC_SANITY_DATASET ?? env.SANITY_STUDIO_DATASET ?? 'production'
  const token = env.SANITY_API_WRITE_TOKEN ?? env.SANITY_AUTH_TOKEN

  if (!dryRun && !token) {
    throw new Error(
      'Missing SANITY_API_WRITE_TOKEN or SANITY_AUTH_TOKEN. Run `pnpm seed:dry-run` to verify without writing.',
    )
  }

  const client = dryRun
    ? null
    : createClient({
        projectId,
        dataset,
        apiVersion: API_VERSION,
        token,
        useCdn: false,
      })

  const upsertBySlug = async (
    type: 'category' | 'author',
    slug: string,
    document: SeedDocument,
  ) => {
    if (dryRun) return `dry-run-${type}-${slug}`

    const existing = await client!.fetch<{_id: string} | null>(
      '*[_type == $type && slug.current == $slug][0]{_id}',
      {type, slug},
    )

    if (existing?._id) {
      await client!.patch(existing._id).set(document).commit()
      return existing._id
    }

    const created = await client!.create(document)
    return created._id
  }

  const categoryIdsBySlug: Record<string, string> = {}

  for (const category of defaultCategories) {
    categoryIdsBySlug[category.slug.current] = await upsertBySlug(
      'category',
      category.slug.current,
      categoryDocument(category),
    )
  }

  const authorId = await upsertBySlug('author', defaultAuthor.slug.current, authorDocument())

  const singletons: IdentifiedSeedDocument[] = [
    siteSettingsDocument(),
    navigationDocument(),
    homePageDocument(categoryIdsBySlug),
  ]

  if (!dryRun) {
    const transaction = client!.transaction()
    for (const document of singletons) {
      transaction.createOrReplace(document)
    }
    await transaction.commit()
  }

  console.log(
    [
      dryRun ? 'Dry run complete. No Sanity writes were made.' : 'Seed complete.',
      `Project: ${projectId}`,
      `Dataset: ${dataset}`,
      `Categories: ${Object.keys(categoryIdsBySlug).length}`,
      `Author: ${authorId}`,
      `Singletons: ${singletons.map((document) => document._id).join(', ')}`,
    ].join('\n'),
  )
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
