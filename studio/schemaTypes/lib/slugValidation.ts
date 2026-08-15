import type {SlugRule, SlugValue, ValidationContext} from 'sanity'

const LOWERCASE_HYPHENATED = /^[a-z0-9]+(-[a-z0-9]+)*$/

/**
 * docs/CONTENT-MODEL.md requires post/category slugs to be lowercase-hyphenated and unique. The
 * default `slug` field only requires a non-empty value (Bob P2-DEV-04, review/bob/CODE-REVIEW.md).
 * Format is checked synchronously; uniqueness queries the dataset for another published or draft
 * document of the same `_type` with the same `slug.current`, excluding this document's own
 * draft/published pair.
 */
export function slugRule(rule: SlugRule, documentType: string) {
  return rule.required().custom(async (slug: SlugValue | undefined, context: ValidationContext) => {
    if (!slug?.current) return true
    if (!LOWERCASE_HYPHENATED.test(slug.current)) {
      return 'Slug must be lowercase letters, numbers, and single hyphens only (e.g. form-1-3).'
    }

    const id = context.document?._id.replace(/^drafts\./, '') ?? ''
    const client = context.getClient({apiVersion: '2026-08-14'})
    const duplicateId = await client.fetch<string | null>(
      `*[_type == $type && slug.current == $slug && !(_id in [$id, "drafts." + $id])][0]._id`,
      {type: documentType, slug: slug.current, id},
    )

    return duplicateId ? 'This slug is already used by another document of the same type.' : true
  })
}
