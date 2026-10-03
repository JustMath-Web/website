import {defineField, defineType} from 'sanity'
import {validateRedirectFrom, validateRedirectTo} from '../lib/redirectValidation'

export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    defineField({
      name: 'from',
      title: 'From',
      type: 'string',
      description:
        'The old address, starting with / — for example /pricing. No spaces, no wildcards, no ? or #.',
      validation: (Rule) => Rule.required().custom((value) => validateRedirectFrom(value)),
    }),
    defineField({
      name: 'to',
      title: 'To',
      type: 'string',
      description:
        'Internal path starting with / and ending with / (for example /blog/), or an https:// URL. A file such as /logo.png is fine without the final /. For another website use its full https:// address; for this site always use a path, not the full address. No other scheme is allowed.',
      validation: (Rule) =>
        Rule.required().custom((value, context) =>
          validateRedirectTo(value, (context.document as {from?: unknown} | undefined)?.from),
        ),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent (301)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'text',
      rows: 2,
      description: 'Optional reason or source.',
    }),
  ],
  preview: {
    select: {from: 'from', to: 'to'},
    prepare: ({from, to}) => ({title: from, subtitle: `→ ${to}`}),
  },
})
