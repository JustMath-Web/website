import {defineField, defineType} from 'sanity'

const APPROVED_WHATSAPP_URL =
  'https://wa.me/60194728768?text=Hi%2C%20I%27d%20like%20to%20book%20the%20free%20maths%20assessment.%20My%20child%20is%20in%20___'

export const cta = defineType({
  name: 'cta',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      initialValue: 'Book a free maths assessment on WhatsApp',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'url',
      initialValue: APPROVED_WHATSAPP_URL,
      validation: (Rule) =>
        Rule.required()
          .uri({allowRelative: true, scheme: ['http', 'https']})
          .custom((value, context) => {
            const parent = context.parent as {kind?: string} | undefined
            if (parent?.kind === 'whatsapp' && value !== APPROVED_WHATSAPP_URL) {
              return 'WhatsApp CTAs must use the owner-approved link unless a change is explicitly approved (docs/DECISIONS.md §11).'
            }
            return true
          }),
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'WhatsApp', value: 'whatsapp'},
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
        ],
      },
      initialValue: 'whatsapp',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
