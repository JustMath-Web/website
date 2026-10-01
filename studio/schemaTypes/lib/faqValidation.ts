const TITLE_LEVELS = ['h2', 'h3', 'h4']
const QUESTION_LEVELS = ['h3', 'h4', 'h5', 'h6']

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
 * The two heading settings must describe a real outline: a question is a child of the FAQ title,
 * so its level has to be deeper (WCAG 1.3.1). Anything outside the offered lists means the field
 * was cleared or written by a script — the page would silently fall back, so reject it here.
 */
export function validateFaqLevels(value: unknown): true | string {
  const faq = value as FaqLike | undefined
  if (!faq) return true
  if (!faq.titleLevel || !TITLE_LEVELS.includes(faq.titleLevel)) {
    return 'Choose a heading level for the FAQ title (H2–H4).'
  }
  if (!faq.questionLevel || !QUESTION_LEVELS.includes(faq.questionLevel)) {
    return 'Choose a heading level for the questions (H3–H6).'
  }
  if (rank(faq.questionLevel) <= rank(faq.titleLevel)) {
    return 'Questions must sit deeper than the FAQ title, e.g. title H2 → questions H3.'
  }
  return true
}

/**
 * Skipping a level (title H2, questions H4) is allowed — the surrounding post decides what is right
 * — but it leaves a gap in the outline, so it is a warning, not an error (FE-06).
 */
export function faqLevelSkipWarning(value: unknown): true | string {
  const faq = value as FaqLike | undefined
  if (!faq || validateFaqLevels(faq) !== true) return true
  return rank(faq.questionLevel as string) - rank(faq.titleLevel as string) > 1
    ? 'The questions skip a heading level below the title. Use the next level down unless the page around it needs this.'
    : true
}
