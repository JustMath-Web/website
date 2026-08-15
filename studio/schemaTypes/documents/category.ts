import {defineField, defineType} from 'sanity'
import {slugRule} from '../lib/slugValidation'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => slugRule(Rule, 'category'),
    }),
    defineField({
      name: 'shortLabel',
      title: 'Short label',
      type: 'string',
      description: 'Optional compact UI label.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional archive intro.',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Syllabus order — see the seed table in docs/CONTENT-MODEL.md §5.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  orderings: [
    {
      title: 'Syllabus order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
  },
})
