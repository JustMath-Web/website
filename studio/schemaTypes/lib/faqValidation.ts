const TITLE_LEVELS = ['h2', 'h3', 'h4']
// H6 is not offered: titles stop at H4, so the one level below them stops at H5.
const QUESTION_LEVELS = ['h3', 'h4', 'h5']

interface FaqLike {
  titleLevel?: string
  questionLevel?: string
}

const rank = (level: string) => Number(level.slice(1))

/** `required()` accepts a string of only spaces; the page trims it and would render nothing. */
export function validateFaqText(value: unknown): true | string {
  return typeof value === 'string' && value.trim() ? true : 'Required.'
}

/**
 * The two heading settings must describe a real outline: a question is a direct child of the FAQ
 * title, so its level is exactly one deeper (FE-06). A skipped level inside that pair is not
 * something the surrounding article can repair, so it blocks Publish. Anything outside the offered
 * lists means the field was cleared or written by a script — the page would silently fall back, so
 * reject it here.
 */
export function validateFaqLevels(value: unknown): true | string {
  const faq = value as FaqLike | undefined
  if (!faq) return true
  if (!faq.titleLevel || !TITLE_LEVELS.includes(faq.titleLevel)) {
    return 'Choose a heading level for the FAQ title (H2–H4).'
  }
  if (!faq.questionLevel || !QUESTION_LEVELS.includes(faq.questionLevel)) {
    return 'Choose a heading level for the questions (H3–H5).'
  }
  const expected = rank(faq.titleLevel) + 1
  if (rank(faq.questionLevel) !== expected) {
    return `Questions must be exactly one level below the FAQ title: title ${faq.titleLevel.toUpperCase()} → questions H${expected}.`
  }
  return true
}

interface AnswerBlockLike {
  children?: {_type?: string; text?: string; latex?: string}[]
}

/**
 * `required().min(1)` only counts blocks, so one empty paragraph passes and the published
 * disclosure opens onto a blank panel. An answer needs at least one non-blank text run or inline
 * maths. A missing or empty array is left to `required()`/`min(1)`, not reported twice.
 */
export function validateFaqAnswer(value: unknown): true | string {
  if (!Array.isArray(value) || value.length === 0) return true
  const hasContent = (value as AnswerBlockLike[]).some((block) =>
    (block.children ?? []).some((child) =>
      child._type === 'mathInline' ? !!child.latex?.trim() : !!child.text?.trim(),
    ),
  )
  return hasContent ? true : 'Write an answer. A blank paragraph would open to an empty panel.'
}
