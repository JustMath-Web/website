import {seo} from './objects/seo'
import {imageWithAlt} from './objects/imageWithAlt'
import {cta} from './objects/cta'
import {navItem} from './objects/navItem'
import {
  mathInline,
  mathBlock,
  working,
  commonMistake,
  callout,
  youtubeEmbed,
} from './objects/portableTextObjects'
import {
  statItem,
  levelBlock,
  processStep,
  faqItem,
  subSection,
  pricingRow,
} from './objects/homePageSections'

import {homePage} from './documents/homePage'
import {post} from './documents/post'
import {category} from './documents/category'
import {author} from './documents/author'
import {siteSettings} from './documents/siteSettings'
import {navigation} from './documents/navigation'
import {redirect} from './documents/redirect'

export const schemaTypes = [
  // Shared objects (docs/CONTENT-MODEL.md §2)
  seo,
  imageWithAlt,
  cta,
  navItem,
  mathInline,
  mathBlock,
  working,
  commonMistake,
  callout,
  youtubeEmbed,

  // homePage-only objects
  statItem,
  levelBlock,
  processStep,
  faqItem,
  subSection,
  pricingRow,

  // Documents (docs/CONTENT-MODEL.md §1)
  homePage,
  post,
  category,
  author,
  siteSettings,
  navigation,
  redirect,
]
