import { defineQuery } from "groq";
import { sanityClient } from "./client";
import type {
	Category,
	CategoryWithCount,
	HomePage,
	Navigation,
	Post,
	PostSummary,
	Redirect,
	SiteSettings,
} from "./types";

/**
 * docs/CONTENT-MODEL.md §4 publish rule: no production post ships unless reviewStatus is
 * approvedByMrKong. Sanity's own draft/publish state is a separate gate from this content field,
 * so public listing/detail queries must filter on it explicitly.
 */
const APPROVED_POST_FILTER = `_type == "post" && reviewStatus == "approvedByMrKong"`;

const seoProjection = `seo{metaTitle, metaDescription, ogImage, ogImageAlt, canonicalUrl, noindex}`;
const ctaProjection = `{label, href, kind}`;

const postSummaryProjection = `{
  _id,
  title,
  slug,
  excerpt,
  author->{_id, name, slug},
  categories[]->{_id, title, slug},
  publishedAt,
  updatedAt,
  readingTimeMinutes,
  reviewStatus
}`;

/**
 * Explicit field-for-field projections, not whole-document spreads (Bob P2-DEV-03,
 * review/bob/CODE-REVIEW.md) — every field here must match web/src/lib/sanity/types.ts exactly.
 * `_key` is required on every projected array-of-objects per docs/CONTENT-MODEL.md §11.
 */
const homePageQuery = defineQuery(`*[_id == "homePage"][0]{
  _id,
  title,
  hero{
    headline, subheadline, supportingLine,
    cta${ctaProjection},
    noteUnderButton
  },
  trustItems[]{_key, text},
  problem{
    heading, body,
    gapChartAnnotations[]{_key, year, label}
  },
  sessions{
    heading, body,
    subSections[]{_key, heading, body},
    cta${ctaProjection}
  },
  levels[]{_key, title, tagline, bullets, category},
  levelsClosingStatement,
  about{
    byline, heading, body,
    portrait{image, intent, alt, caption},
    statPanel{heading, body}
  },
  pricing{
    heading, body,
    pricingRows[]{_key, level, sessionLength, perMonth, perSession},
    includedList,
    paymentNote,
    availability{heading, body},
    cta${ctaProjection}
  },
  processSteps[]{_key, title, body},
  faqs[]{_key, question, answer},
  finalCta{
    heading, body,
    cta${ctaProjection},
    smallNote
  },
  ${seoProjection}
}`);

const siteSettingsQuery = defineQuery(`*[_id == "siteSettings"][0]{
  siteName, domain, phoneDisplay, whatsappNumber, whatsappMessage,
  primaryCtaLabel, headerCtaLabel,
  defaultSeo{metaTitle, metaDescription, ogImage, ogImageAlt, canonicalUrl, noindex},
  ogDefaultImage
}`);

const navigationQuery = defineQuery(`*[_id == "navigation"][0]{
  headerLinks[]{_key, label, href, kind},
  footerLinks[]{_key, label, href, kind}
}`);

const allPostsQuery = defineQuery(
	`*[${APPROVED_POST_FILTER}] | order(publishedAt desc) ${postSummaryProjection}`,
);

const postBySlugQuery =
	defineQuery(`*[${APPROVED_POST_FILTER} && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  body,
  author->{_id, name, slug},
  categories[]->{_id, title, slug},
  publishedAt,
  updatedAt,
  readingTimeMinutes,
  reviewStatus,
  sourceUrl,
  ${seoProjection}
}`);

const postSlugsQuery = defineQuery(
	`*[${APPROVED_POST_FILTER}]{"slug": slug.current}`,
);

const categoriesWithCountsQuery = defineQuery(`
  *[_type == "category"] | order(order asc) {
    _id, title, slug, shortLabel, description, order, ${seoProjection},
    "postCount": count(*[${APPROVED_POST_FILTER} && references(^._id)])
  }
`);

const categoryBySlugQuery =
	defineQuery(`*[_type == "category" && slug.current == $slug][0]{
  _id, title, slug, shortLabel, description, order, ${seoProjection}
}`);

/**
 * Resolves the category slug to its _id in one inner query, then filters posts by reference.
 * Bob P2-DEV-03: the previous `$slug in categories[]->slug.current` dereferenced every candidate
 * post's category references inside the filter predicate itself; this resolves the category once.
 */
const postsByCategorySlugQuery = defineQuery(
	`*[${APPROVED_POST_FILTER} && references(*[_type == "category" && slug.current == $slug][0]._id)] | order(publishedAt desc) ${postSummaryProjection}`,
);

const redirectsQuery = defineQuery(
	`*[_type == "redirect"]{from, to, permanent, note}`,
);

export async function getHomePage(): Promise<HomePage | null> {
	return sanityClient.fetch(homePageQuery);
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
	return sanityClient.fetch(siteSettingsQuery);
}

export async function getNavigation(): Promise<Navigation | null> {
	return sanityClient.fetch(navigationQuery);
}

export async function getAllPosts(): Promise<PostSummary[]> {
	return sanityClient.fetch(allPostsQuery);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
	return sanityClient.fetch(postBySlugQuery, { slug });
}

export async function getPostSlugs(): Promise<{ slug: string }[]> {
	return sanityClient.fetch(postSlugsQuery);
}

export async function getCategoriesWithCounts(): Promise<CategoryWithCount[]> {
	return sanityClient.fetch(categoriesWithCountsQuery);
}

export async function getCategoryBySlug(
	slug: string,
): Promise<Category | null> {
	return sanityClient.fetch(categoryBySlugQuery, { slug });
}

export async function getPostsByCategorySlug(
	slug: string,
): Promise<PostSummary[]> {
	return sanityClient.fetch(postsByCategorySlugQuery, { slug });
}

export async function getRedirects(): Promise<Redirect[]> {
	return sanityClient.fetch(redirectsQuery);
}
