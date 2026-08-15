import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      validation: (Rule) =>
        Rule.max(60).warning('Titles over 60 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.max(160).warning(
          'Descriptions over 160 characters may be truncated in search results.',
        ),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'ogImageAlt',
      title: 'Open Graph image alt text',
      type: 'string',
      hidden: ({parent}) => !parent?.ogImage,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {ogImage?: unknown} | undefined
          if (parent?.ogImage && !value) {
            return 'Required when an Open Graph image is set.'
          }
          return true
        }),
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL override',
      type: 'url',
      description: 'Leave empty unless this page must point to a different canonical URL.',
    }),
    defineField({
      name: 'noindex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
