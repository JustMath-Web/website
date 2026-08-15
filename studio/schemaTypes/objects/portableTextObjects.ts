import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * docs/CONTENT-MODEL.md §2 `portableBlock`. mathInline is an inline child object (renders inside
 * a sentence); mathBlock/working/commonMistake/callout/imageWithAlt are block-level array
 * members (siblings of paragraphs), matching how the post template actually composes a lesson
 * (prose, then a displayed equation, then worked steps, then a flagged mistake).
 */

export const mathInline = defineType({
  name: 'mathInline',
  title: 'Inline maths',
  type: 'object',
  fields: [
    defineField({
      name: 'latex',
      title: 'LaTeX',
      type: 'string',
      description: 'KaTeX source, e.g. x^2 + 1',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {latex: 'latex'},
    prepare: ({latex}) => ({title: `∫ ${latex ?? ''}`}),
  },
})

export const mathBlock = defineType({
  name: 'mathBlock',
  title: 'Displayed maths',
  type: 'object',
  fields: [
    defineField({
      name: 'latex',
      title: 'LaTeX',
      type: 'text',
      rows: 2,
      description: 'KaTeX source for a centred, displayed equation.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {latex: 'latex'},
    prepare: ({latex}) => ({title: `Displayed: ${latex ?? ''}`}),
  },
})

export const working = defineType({
  name: 'working',
  title: 'Working',
  type: 'object',
  description: 'Line-by-line worked steps — the design package shows every step, none skipped.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Working',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {steps: 'steps'},
    prepare: ({steps}) => ({title: `Working (${steps?.length ?? 0} steps)`}),
  },
})

export const commonMistake = defineType({
  name: 'commonMistake',
  title: 'Common mistake',
  type: 'object',
  fields: [
    defineField({
      name: 'mistake',
      title: 'The mistake',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'correction',
      title: 'The correction',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {mistake: 'mistake'},
    prepare: ({mistake}) => ({title: `Common mistake: ${mistake ?? ''}`}),
  },
})

export const callout = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          {title: 'Note', value: 'note'},
          {title: 'Tip', value: 'tip'},
        ],
      },
      initialValue: 'note',
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
  preview: {
    select: {tone: 'tone', body: 'body'},
    prepare: ({tone, body}) => ({title: `${tone ?? 'note'}: ${body ?? ''}`}),
  },
})

/**
 * Reusable Portable Text array config for `post.body`. Not a named schema `type` itself — Sanity
 * Portable Text arrays are configured inline, and wrapping this in an extra object type would
 * nest content beyond the standard convention.
 */
export const portableBodyOf = [
  defineArrayMember({
    type: 'block',
    styles: [
      {title: 'Normal', value: 'normal'},
      {title: 'H2', value: 'h2'},
      {title: 'H3', value: 'h3'},
      {title: 'Quote', value: 'blockquote'},
    ],
    lists: [
      {title: 'Bullet', value: 'bullet'},
      {title: 'Numbered', value: 'number'},
    ],
    marks: {
      decorators: [
        {title: 'Strong', value: 'strong'},
        {title: 'Emphasis', value: 'em'},
      ],
      annotations: [
        defineField({
          name: 'link',
          title: 'Link',
          type: 'object',
          fields: [
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',
              description: 'http(s), mailto:, or an internal path starting with /.',
              validation: (Rule) =>
                Rule.required().custom((value: string | undefined) => {
                  if (!value) return true
                  const isValid =
                    /^https?:\/\//.test(value) || /^mailto:/.test(value) || value.startsWith('/')
                  return isValid || 'Must be http(s), mailto:, or start with /.'
                }),
            }),
          ],
        }),
      ],
    },
    of: [defineArrayMember({type: 'mathInline'})],
  }),
  defineArrayMember({type: 'mathBlock'}),
  defineArrayMember({type: 'working'}),
  defineArrayMember({type: 'commonMistake'}),
  defineArrayMember({type: 'callout'}),
  defineArrayMember({type: 'imageWithAlt'}),
]
