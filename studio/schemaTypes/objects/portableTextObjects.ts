import {defineArrayMember, defineField, defineType} from 'sanity'
import {validateFaqAnswer, validateFaqLevels, validateFaqText} from '../lib/faqValidation'
import {
  validateTableCaption,
  validateTableFigureContent,
  validateTableHeader,
} from '../lib/tableValidation'

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

// Matches youtube.com/watch?v=, youtu.be/, and youtube.com/embed/ — captures the 11-character
// video ID. Deliberately not shared with web/'s frontend extraction logic (studio/ and web/ are
// separate packages, not a pnpm workspace) — this copy only needs to confirm the URL shape at
// author time, not reliably extract an ID, so a small independent regex is lower-risk than a
// cross-package import into Studio's own Vite-bundled schema.
const YOUTUBE_URL_PATTERN =
  /^https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)[A-Za-z0-9_-]{11}(?:[?&#].*)?$/

export const youtubeEmbed = defineType({
  name: 'youtubeEmbed',
  title: 'YouTube embed',
  type: 'object',
  description: 'Embeds a YouTube video at this point in the article body.',
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      description: 'A youtube.com/watch, youtu.be, or youtube.com/embed link.',
      validation: (Rule) =>
        Rule.required().custom((value: string | undefined) => {
          if (!value) return true
          return (
            YOUTUBE_URL_PATTERN.test(value) ||
            'Must be a youtube.com/watch, youtu.be, or youtube.com/embed URL.'
          )
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Video title',
      description:
        'Accessible title read out for the embedded player. Falls back to the caption, then a generic label, if left empty.',
      type: 'string',
    }),
  ],
  preview: {
    select: {url: 'url', caption: 'caption'},
    prepare: ({url, caption}) => ({title: `YouTube: ${caption || url || ''}`}),
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
 * The table grid, edited with Studio's built-in table editor (Studio v6.6.0+; switched on in
 * sanity.config.ts). The editor binds to this exact shape — `table` > `rows[]` of `row` >
 * `cells[]` of `cell` > `value[]` of blocks — so the names are not ours to change. `headerRows`
 * MUST stay declared: the editor strips undeclared fields, and without it the header-row toggle
 * silently does nothing. Cell text is plain `normal` blocks with bold/italic and inline maths only.
 *
 * The grid's own menu offers only Header row / Select table / Delete table, so it has nowhere to
 * put a caption or a row-header choice. Those live on `postTable`, which wraps this type.
 */
export const table = defineType({
  name: 'table',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({name: 'headerRows', title: 'Header rows', type: 'number'}),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'row',
          fields: [
            defineField({
              name: 'cells',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'cell',
                  fields: [
                    defineField({
                      name: 'value',
                      type: 'array',
                      of: [
                        defineArrayMember({
                          type: 'block',
                          styles: [{title: 'Normal', value: 'normal'}],
                          lists: [],
                          marks: {
                            decorators: [
                              {title: 'Strong', value: 'strong'},
                              {title: 'Emphasis', value: 'em'},
                            ],
                            annotations: [],
                          },
                          of: [defineArrayMember({type: 'mathInline'})],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  validation: (Rule) => Rule.custom(validateTableHeader),
  preview: {
    select: {rows: 'rows'},
    prepare: ({rows}) => ({title: 'Table grid', subtitle: `${rows?.length ?? 0} rows`}),
  },
})

/**
 * What editors insert into `post.body`: a required caption, the "first column labels the rows"
 * choice, and the table grid. The grid is a nested Portable Text field because Studio's table
 * editor only renders inside one (it needs the `block` member to be a Portable Text editor); the
 * `block` is configured with no formatting and validation requires exactly one grid and no text.
 */
export const postTable = defineType({
  name: 'postTable',
  title: 'Table',
  type: 'object',
  fields: [
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description:
        'Names the table for screen readers and shows above it. Say what the table shows, e.g. "Simplest form of common surds".',
      validation: (Rule) => Rule.custom(validateTableCaption),
    }),
    defineField({
      name: 'rowHeaders',
      title: 'First column labels the rows',
      type: 'boolean',
      description:
        'Tick when each row starts with a label (e.g. the name of a law). Leave off when the first column is ordinary data.',
      initialValue: false,
    }),
    defineField({
      name: 'content',
      title: 'Table',
      type: 'array',
      description: 'Use Insert → Table, then fill the grid. Only one grid, and no text outside it.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {decorators: [], annotations: []},
        }),
        defineArrayMember({type: 'table'}),
      ],
      validation: (Rule) => Rule.custom(validateTableFigureContent),
    }),
  ],
  preview: {
    select: {caption: 'caption', content: 'content'},
    prepare: ({caption, content}) => {
      const grid = (content ?? []).find((item: {_type: string}) => item._type === 'table') as
        {rows?: unknown[]} | undefined
      return {title: caption || 'Table (no caption)', subtitle: `${grid?.rows?.length ?? 0} rows`}
    },
  },
})

/** The one link annotation: http(s), mailto:, or an internal path. Shared by the body and FAQ answers. */
const linkAnnotation = defineField({
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
})

/**
 * FAQ accordion for `post.body`. `titleLevel` and `questionLevel` are the two heading settings:
 * the FAQ's own title, and — applied to every question — the questions. Rendered as native
 * <details> with no `name`, so any number of answers can be open at once (shadcn's `multiple`).
 */
export const faqAccordion = defineType({
  name: 'faqAccordion',
  title: 'FAQ accordion',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'FAQ title',
      type: 'string',
      description: 'The heading above the questions, e.g. "Common questions".',
      validation: (Rule) => Rule.custom(validateFaqText),
    }),
    defineField({
      name: 'titleLevel',
      title: 'FAQ title heading level',
      type: 'string',
      description: 'Pick the level that fits where this FAQ sits in the post.',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
        ],
      },
      initialValue: 'h2',
    }),
    defineField({
      name: 'questionLevel',
      title: 'Question heading level (all questions)',
      type: 'string',
      description:
        'Applies to every question. Must be exactly one level below the FAQ title (title H2 → H3, H3 → H4, H4 → H5).',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'H5', value: 'h5'},
        ],
      },
      initialValue: 'h3',
    }),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqEntry',
          title: 'Question',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.custom(validateFaqText),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [{title: 'Normal', value: 'normal'}],
                  lists: [
                    {title: 'Bullet', value: 'bullet'},
                    {title: 'Numbered', value: 'number'},
                  ],
                  marks: {
                    decorators: [
                      {title: 'Strong', value: 'strong'},
                      {title: 'Emphasis', value: 'em'},
                    ],
                    annotations: [linkAnnotation],
                  },
                  of: [defineArrayMember({type: 'mathInline'})],
                }),
              ],
              validation: (Rule) => Rule.required().min(1).custom(validateFaqAnswer),
            }),
          ],
          preview: {
            select: {title: 'question'},
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  validation: (Rule) => Rule.custom(validateFaqLevels).error(),
  preview: {
    select: {title: 'title', items: 'items'},
    prepare: ({title, items}) => ({
      title: title || 'FAQ (no title)',
      subtitle: `${items?.length ?? 0} questions`,
    }),
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
      {title: 'H4', value: 'h4'},
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
      annotations: [linkAnnotation],
    },
    of: [defineArrayMember({type: 'mathInline'})],
  }),
  defineArrayMember({type: 'mathBlock'}),
  defineArrayMember({type: 'working'}),
  defineArrayMember({type: 'commonMistake'}),
  defineArrayMember({type: 'callout'}),
  defineArrayMember({type: 'imageWithAlt'}),
  defineArrayMember({type: 'youtubeEmbed'}),
  defineArrayMember({type: 'postTable'}),
  defineArrayMember({type: 'faqAccordion'}),
]
