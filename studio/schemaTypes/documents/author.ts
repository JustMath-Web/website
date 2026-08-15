import {defineArrayMember, defineField, defineType} from 'sanity'
import {slugRule} from '../lib/slugValidation'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => slugRule(Rule, 'author'),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g. "Tutor, Just Math Malaysia"',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({name: 'avatar', title: 'Avatar', type: 'imageWithAlt'}),
    defineField({
      name: 'sameAs',
      title: 'Same as (profile URLs)',
      type: 'array',
      of: [defineArrayMember({type: 'url'})],
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role'},
  },
})
