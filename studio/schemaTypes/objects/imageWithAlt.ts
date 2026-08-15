import {defineField, defineType} from 'sanity'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'intent',
      title: 'Intent',
      type: 'string',
      description: 'Informative images need alt text; decorative images render with empty alt.',
      options: {
        layout: 'radio',
        list: [
          {title: 'Informative', value: 'informative'},
          {title: 'Decorative', value: 'decorative'},
        ],
      },
      initialValue: 'informative',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      hidden: ({parent}) => parent?.intent === 'decorative',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {intent?: string} | undefined
          if (parent?.intent === 'informative' && !value) {
            return 'Required for an informative image.'
          }
          if (parent?.intent === 'decorative' && value) {
            return 'Decorative images must not carry alt text — remove it or switch intent to informative.'
          }
          return true
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
})
