import {defineArrayMember, defineField, defineType} from 'sanity'

/** Trust bar item (docs/CONTENT-MODEL.md §3, homePage.trustItems). Plain lines, e.g. "24 years
 * teaching maths" or "Online across Malaysia, in English and BM" — not every line is a number, so
 * this stays a single text field rather than a forced number+label split. */
export const statItem = defineType({
  name: 'statItem',
  title: 'Trust bar item',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {select: {title: 'text'}},
})

/** Syllabus-level block (homePage.levels — see docs/CONTENT-MODEL.md §5 for the seed categories
 * these correspond to). Matches just-math-page-copy-final.md §5's four blocks. */
export const levelBlock = defineType({
  name: 'levelBlock',
  title: 'Level block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Standard 1 to Standard 6"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bullets',
      title: 'Bullets',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 2})],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'category',
      title: 'Linked category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'The blog syllabus-level category this block corresponds to.',
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'tagline'}},
})

/** How-it-works step (homePage.processSteps — exactly 4, renders as an ordered list). */
export const processStep = defineType({
  name: 'processStep',
  title: 'Process step',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Message me on WhatsApp"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {select: {title: 'title'}},
})

/** FAQ item (homePage.faqs — source of the displayed FAQ count; never hard-code the count). */
export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {select: {title: 'question'}},
})

/** Heading+body pair reused by homePage.sessions.subSections ("Why one-to-one" subheadings). */
export const subSection = defineType({
  name: 'subSection',
  title: 'Sub-section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {select: {title: 'heading'}},
})

/** Pricing table row (homePage.pricing.pricingRows — see just-math-page-copy-final.md §7). */
export const pricingRow = defineType({
  name: 'pricingRow',
  title: 'Pricing row',
  type: 'object',
  fields: [
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sessionLength',
      title: 'Session length',
      type: 'string',
      description: 'e.g. "60 min"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'perMonth',
      title: 'Per month',
      type: 'string',
      description: 'e.g. "RM160"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'perSession',
      title: 'Per session',
      type: 'string',
      description: 'e.g. "RM40"',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {level: 'level', perMonth: 'perMonth'},
    prepare: ({level, perMonth}) => ({title: level, subtitle: perMonth}),
  },
})
