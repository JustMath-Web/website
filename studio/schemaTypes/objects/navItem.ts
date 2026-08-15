import {defineField, defineType} from 'sanity'

export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'Internal path (/blog/), fragment (#faq), external URL, tel:, or wa.me link.',
      validation: (Rule) =>
        Rule.required().custom((value, context) => {
          if (!value) return true
          const parent = context.parent as {kind?: string} | undefined
          switch (parent?.kind) {
            case 'internal':
              return value.startsWith('/') || 'Internal links must start with /.'
            case 'fragment':
              return value.startsWith('#') || 'Fragment links must start with #.'
            case 'external':
              return value.startsWith('https://') || 'External links must start with https://.'
            case 'whatsapp':
              return (
                value.startsWith('https://wa.me/') ||
                'WhatsApp links must start with https://wa.me/.'
              )
            case 'tel':
              return value.startsWith('tel:') || 'Telephone links must start with tel:.'
            default:
              return true
          }
        }),
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'Fragment', value: 'fragment'},
          {title: 'External', value: 'external'},
          {title: 'WhatsApp', value: 'whatsapp'},
          {title: 'Telephone', value: 'tel'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'href'},
  },
})
