import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Singleton, explicit _id "homePage" (see studio/structure.ts). Fixed typed template matching the
 * approved design and just-math-page-copy-final.md — not a page builder (docs/CONTENT-MODEL.md §3).
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      initialValue: 'Home page',
      readOnly: true,
    }),

    // 1. Hero
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subheadline',
          title: 'Subheadline',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'supportingLine',
          title: 'Supporting line (small)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'cta',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'noteUnderButton',
          title: 'Note under button (small)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    // 2. Trust bar
    defineField({
      name: 'trustItems',
      title: 'Trust bar items',
      description:
        'Exactly 4. Accessible name defaults to "Teaching experience" (docs/CONTENT-MODEL.md §3).',
      type: 'array',
      of: [defineArrayMember({type: 'statItem'})],
      validation: (Rule) => Rule.required().length(4),
    }),

    // 3. Problem
    defineField({
      name: 'problem',
      title: 'Problem',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'text',
          rows: 8,
          description: 'Separate paragraphs with a blank line.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'independentChecksCount',
          title: 'Independent checks count (before SPM)',
          description:
            'Drives the large "N independent checks" callout beside the gap chart. Keep in sync with the heading wording ("checks...before SPM").',
          type: 'number',
          validation: (Rule) => Rule.required().integer().min(0),
        }),
        defineField({
          name: 'gapChartAnnotations',
          title: 'Gap-chart annotations',
          description:
            'Structured year/label pairs the gap chart plots directly — "year" must match one of the chart\'s fixed stop codes (S1-S6, F1-F5).',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'gapChartAnnotation',
              fields: [
                defineField({name: 'year', title: 'Year label', type: 'string'}),
                defineField({name: 'label', title: 'Annotation', type: 'string'}),
              ],
            }),
          ],
        }),
      ],
    }),

    // 4. Why one-to-one
    defineField({
      name: 'sessions',
      title: 'Why one-to-one',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'text',
          rows: 6,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subSections',
          title: 'Sub-sections',
          type: 'array',
          of: [defineArrayMember({type: 'subSection'})],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({name: 'cta', title: 'CTA', type: 'cta'}),
      ],
    }),

    // 5. Level blocks
    defineField({
      name: 'levels',
      title: 'Level blocks',
      description: 'Exactly the approved level blocks unless the owner approves a change.',
      type: 'array',
      of: [defineArrayMember({type: 'levelBlock'})],
      validation: (Rule) => Rule.required().length(4),
    }),
    defineField({
      name: 'levelsClosingStatement',
      title: 'Level blocks — closing statement',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    // 6. About the tutor
    defineField({
      name: 'about',
      title: 'About the tutor',
      type: 'object',
      fields: [
        defineField({
          name: 'byline',
          title: 'Byline (small)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'text',
          rows: 10,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'yearsExperience',
          title: 'Years of teaching experience',
          description: "Drives the large figure in the About section's portrait-fallback panel.",
          type: 'number',
          validation: (Rule) => Rule.required().integer().min(0),
        }),
        defineField({
          name: 'studentsPerYear',
          title: 'Students taught per year',
          description: "Drives the large figure in the About section's stat panel.",
          type: 'number',
          validation: (Rule) => Rule.required().integer().min(0),
        }),
        defineField({
          name: 'portrait',
          title: 'Portrait',
          type: 'imageWithAlt',
          description:
            'Launch blocker until supplied (root HANDOFF.md) — leave empty for the typographic fallback rather than shipping a stock/fake photo.',
        }),
        defineField({name: 'statPanel', title: 'Stat panel ("500 students")', type: 'subSection'}),
      ],
    }),

    // 7. Pricing
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'pricingRows',
          title: 'Pricing rows',
          type: 'array',
          of: [defineArrayMember({type: 'pricingRow'})],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'includedList',
          title: 'What is included',
          type: 'array',
          of: [defineArrayMember({type: 'string'})],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'paymentNote',
          title: 'Payment note',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required(),
        }),
        defineField({name: 'availability', title: 'Availability', type: 'subSection'}),
        defineField({
          name: 'availabilityTimeBlocks',
          title: 'Availability time blocks',
          description:
            'Drives the large time-range figures beside the availability copy, e.g. "3pm to 6pm" / "primary".',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'timeBlock',
              fields: [
                defineField({
                  name: 'range',
                  title: 'Time range',
                  type: 'string',
                  description: 'e.g. "3pm to 6pm"',
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                  description: 'e.g. "primary"',
                  validation: (Rule) => Rule.required(),
                }),
              ],
            }),
          ],
          validation: (Rule) => Rule.min(1),
        }),
        defineField({name: 'cta', title: 'CTA', type: 'cta'}),
      ],
    }),

    // 8. How it works
    defineField({
      name: 'processSteps',
      title: 'How it works — steps',
      description: 'Exactly 4. Renders as an ordered list.',
      type: 'array',
      of: [defineArrayMember({type: 'processStep'})],
      validation: (Rule) => Rule.required().length(4),
    }),

    // 9. FAQ
    defineField({
      name: 'faqs',
      title: 'FAQ',
      description:
        'The displayed count is computed from this array — never type the number into a component.',
      type: 'array',
      of: [defineArrayMember({type: 'faqItem'})],
      validation: (Rule) => Rule.required().min(1),
    }),

    // 10. Final CTA
    defineField({
      name: 'finalCta',
      title: 'Final CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body',
          type: 'text',
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'freeMinutes',
          title: 'Free assessment length (minutes)',
          description: 'Drives the large figure in the final CTA section, e.g. "30".',
          type: 'number',
          validation: (Rule) => Rule.required().integer().min(0),
        }),
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'cta',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'smallNote',
          title: 'Note under button (small)',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  preview: {
    prepare: () => ({title: 'Home page'}),
  },
})
