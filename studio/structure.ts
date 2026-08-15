import type {StructureResolver} from 'sanity/structure'

/**
 * docs/CONTENT-MODEL.md §10. homePage, siteSettings and navigation are singletons — each gets a
 * fixed-id list item instead of the default create-new-document list.
 */
const SINGLETON_TYPES = new Set(['homePage', 'siteSettings', 'navigation'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site')
        .child(
          S.list()
            .title('Site')
            .items([
              S.listItem()
                .title('Home page')
                .id('homePage')
                .child(S.document().schemaType('homePage').documentId('homePage')),
              S.listItem()
                .title('Site settings')
                .id('siteSettings')
                .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
              S.listItem()
                .title('Navigation')
                .id('navigation')
                .child(S.document().schemaType('navigation').documentId('navigation')),
              S.divider(),
              S.documentTypeListItem('redirect').title('Redirects'),
            ]),
        ),
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ]),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          !SINGLETON_TYPES.has(item.getId() ?? '') &&
          !['redirect', 'post', 'category', 'author'].includes(item.getId() ?? ''),
      ),
    ])
