import {defineField, defineType} from 'sanity'

export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    defineField({
      name: 'from',
      title: 'From',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((value: string | undefined) =>
          !value || value.startsWith('/') ? true : 'Must start with /',
        ),
    }),
    defineField({
      name: 'to',
      title: 'To',
      type: 'string',
      description:
        'Internal path (starting with /) or an https:// URL. No other scheme is allowed.',
      validation: (Rule) =>
        Rule.required().custom((value: string | undefined) => {
          if (!value) return true
          const isValid = value.startsWith('/') || value.startsWith('https://')
          return isValid || 'Must be an internal path starting with / or an https:// URL.'
        }),
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
