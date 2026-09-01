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
  defineArrayMember({type: 'youtubeEmbed'}),
]
