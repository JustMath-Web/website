import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      initialValue: 'Just Math Malaysia',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'domain',
      title: 'Domain',
      type: 'url',
      initialValue: 'https://mathematicsmalaysia.com',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Phone (display)',
      type: 'string',
      initialValue: '019 472 8768',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp number',
      type: 'string',
      description: 'E.164 digits without +, e.g. 60194728768.',
      initialValue: '60194728768',
      validation: (Rule) => Rule.required().regex(/^[0-9]+$/, {name: 'digits only, no +'}),
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'WhatsApp prefilled message',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryCtaLabel',
      title: 'Primary in-page CTA label',
      type: 'string',
      initialValue: 'Book a free maths assessment on WhatsApp',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headerCtaLabel',
      title: 'Header CTA label',
      type: 'string',
      description: 'Owner decision — currently "Schedule Now" (docs/DECISIONS.md §11).',
      initialValue: 'Schedule Now',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ogDefaultImage',
      title: 'Default Open Graph image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
