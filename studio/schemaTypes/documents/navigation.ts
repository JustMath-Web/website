import {defineArrayMember, defineField, defineType} from 'sanity'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'headerLinks',
      title: 'Header links',
      type: 'array',
      of: [defineArrayMember({type: 'navItem'})],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer links',
      type: 'array',
      of: [defineArrayMember({type: 'navItem'})],
    }),
  ],
  preview: {
    prepare: () => ({title: 'Navigation'}),
  },
})
