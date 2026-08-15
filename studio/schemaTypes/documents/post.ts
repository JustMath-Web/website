import {defineField, defineType} from 'sanity'
import {portableBodyOf} from '../objects/portableTextObjects'
import {slugRule} from '../lib/slugValidation'

export const post = defineType({
  name: 'post',
  title: 'Post',
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
      validation: (Rule) => slugRule(Rule, 'post'),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.required().max(220).warning('Excerpts over 220 characters may be truncated.'),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: portableBodyOf,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as {reviewStatus?: string} | undefined
          if (doc?.reviewStatus === 'approvedByMrKong' && (!value || value.length === 0)) {
            return 'Body is required before a post can be marked approvedByMrKong.'
          }
          return true
        }),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as {reviewStatus?: string} | undefined
          if (doc?.reviewStatus === 'approvedByMrKong' && !value) {
            return 'Published date is required before a post can be marked approvedByMrKong.'
          }
          return true
        }),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
    }),
    defineField({
      name: 'readingTimeMinutes',
      title: 'Reading time (minutes)',
      type: 'number',
      description: 'Leave empty to compute at build time.',
      validation: (Rule) => Rule.integer().min(1),
    }),
    defineField({
      name: 'reviewStatus',
      title: 'Review status',
      type: 'string',
      description:
        'No production post ships unless approvedByMrKong (docs/CONTENT-MODEL.md §4) — this is separate from Sanity publish state.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Needs maths review', value: 'needsMathReview'},
          {title: 'Approved by Mr Kong', value: 'approvedByMrKong'},
        ],
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'For posts refreshed from the old WordPress site (docs/CONTENT-MODEL.md §10).',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    select: {title: 'title', reviewStatus: 'reviewStatus', media: 'seo.ogImage'},
    prepare: ({title, reviewStatus, media}) => ({
      title,
      subtitle: reviewStatus,
      media,
    }),
  },
})
