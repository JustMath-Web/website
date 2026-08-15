/**
 * Hand-authored to match studio/schemaTypes exactly (field-for-field, including array `_key`s).
 * Replace with `sanity typegen generate` output once the cross-package typegen config described in
 * docs/DECISIONS.md §4b is wired. Until then, this file is the source of truth for query result
 * shapes — no `unknown` may reach a component (Bob P2-DEV-02, review/bob/CODE-REVIEW.md).
 */

export interface SanitySlug {
	current: string;
}

export interface SanityReference {
	_ref: string;
	_type: "reference";
}

export interface SanityImageAsset {
	_ref: string;
	_type: "reference";
}

export interface SanityImage {
	_type: "image";
	asset: SanityImageAsset;
	hotspot?: { x: number; y: number; height: number; width: number };
}

export interface Seo {
	metaTitle?: string;
	metaDescription?: string;
	ogImage?: SanityImage;
	ogImageAlt?: string;
	canonicalUrl?: string;
	noindex: boolean;
}

export interface ImageWithAlt {
	image: SanityImage;
	intent: "informative" | "decorative";
	alt: string;
	caption?: string;
}

export interface Cta {
	label: string;
	href: string;
	kind: "whatsapp" | "internal" | "external";
}

export interface NavItem {
	_key: string;
	label: string;
	href: string;
	kind: "internal" | "fragment" | "external" | "whatsapp" | "tel";
}

export interface Author {
	_id: string;
	name: string;
	slug: SanitySlug;
	role?: string;
	bio?: string;
	avatar?: ImageWithAlt;
	sameAs?: string[];
}

export interface Category {
	_id: string;
	title: string;
	slug: SanitySlug;
	shortLabel?: string;
	description?: string;
	order: number;
	seo?: Seo;
}

export interface CategoryWithCount extends Category {
	postCount: number;
}

export type ReviewStatus = "draft" | "needsMathReview" | "approvedByMrKong";

// --- Portable Text (post.body) — matches studio/schemaTypes/objects/portableTextObjects.ts -------

export interface PortableTextSpan {
	_key: string;
	_type: "span";
	text: string;
	marks?: string[];
}

export interface PortableTextLinkMark {
	_key: string;
	_type: "link";
	href: string;
}

export interface MathInline {
	_key: string;
	_type: "mathInline";
	latex: string;
}

export interface PortableTextBlock {
	_key: string;
	_type: "block";
	style: "normal" | "h2" | "h3" | "blockquote";
	listItem?: "bullet" | "number";
	level?: number;
	markDefs: PortableTextLinkMark[];
	children: (PortableTextSpan | MathInline)[];
}

export interface MathBlock {
	_key: string;
	_type: "mathBlock";
	latex: string;
	caption?: string;
}

export interface Working {
	_key: string;
	_type: "working";
	title?: string;
	steps: string[];
}

export interface CommonMistake {
	_key: string;
	_type: "commonMistake";
	mistake: string;
	correction: string;
}

export interface Callout {
	_key: string;
	_type: "callout";
	tone: "note" | "tip";
	body: string;
}

export interface PortableTextImage extends ImageWithAlt {
	_key: string;
	_type: "imageWithAlt";
}

export type PostBodyBlock =
	| PortableTextBlock
	| MathBlock
	| Working
	| CommonMistake
	| Callout
	| PortableTextImage;

/** Card/listing shape — archive and category-archive rows. No `body`. */
export interface PostSummary {
	_id: string;
	title: string;
	slug: SanitySlug;
	excerpt: string;
	author: Pick<Author, "_id" | "name" | "slug">;
	categories: Pick<Category, "_id" | "title" | "slug">[];
	publishedAt: string;
	updatedAt?: string;
	readingTimeMinutes?: number;
	reviewStatus: ReviewStatus;
}

/** Full post document. */
export interface Post extends PostSummary {
	body: PostBodyBlock[];
	sourceUrl?: string;
	seo?: Seo;
}

export interface SiteSettings {
	siteName: string;
	domain: string;
	phoneDisplay: string;
	whatsappNumber: string;
	whatsappMessage: string;
	primaryCtaLabel: string;
	headerCtaLabel: string;
	defaultSeo: Seo;
	ogDefaultImage?: SanityImage;
}

export interface Navigation {
	headerLinks: NavItem[];
	footerLinks: NavItem[];
}

export interface Redirect {
	from: string;
	to: string;
	permanent: boolean;
	note?: string;
}

// --- Home page — matches studio/schemaTypes/documents/homePage.ts + objects/homePageSections.ts --

export interface HeroSection {
	headline: string;
	subheadline: string;
	supportingLine: string;
	cta: Cta;
	noteUnderButton: string;
}

export interface StatItem {
	_key: string;
	text: string;
}

export interface GapChartAnnotation {
	_key: string;
	year?: string;
	label?: string;
}

export interface ProblemSection {
	heading: string;
	body: string;
	independentChecksCount: number;
	gapChartAnnotations?: GapChartAnnotation[];
}

/** Reused for sessions.subSections, about.statPanel, and pricing.availability. */
export interface SubSection {
	_key?: string;
	heading: string;
	body: string;
}

export interface SessionsSection {
	heading: string;
	body: string;
	subSections: SubSection[];
	cta?: Cta;
}

export interface LevelBlock {
	_key: string;
	title: string;
	tagline: string;
	bullets: string[];
	category?: SanityReference;
}

export interface AboutSection {
	byline: string;
	heading: string;
	body: string;
	yearsExperience: number;
	studentsPerYear: number;
	portrait?: ImageWithAlt;
	statPanel?: SubSection;
}

export interface PricingRow {
	_key: string;
	level: string;
	sessionLength: string;
	perMonth: string;
	perSession: string;
}

export interface TimeBlock {
	_key: string;
	range: string;
	label: string;
}

export interface PricingSection {
	heading: string;
	body: string;
	pricingRows: PricingRow[];
	includedList: string[];
	paymentNote: string;
	availability?: SubSection;
	availabilityTimeBlocks?: TimeBlock[];
	cta?: Cta;
}

export interface ProcessStep {
	_key: string;
	title: string;
	body: string;
}

export interface FaqItem {
	_key: string;
	question: string;
	answer: string;
}

export interface FinalCtaSection {
	heading: string;
	body: string;
	freeMinutes: number;
	cta: Cta;
	smallNote: string;
}

export interface HomePage {
	_id: "homePage";
	title: string;
	hero: HeroSection;
	trustItems: StatItem[];
	problem: ProblemSection;
	sessions: SessionsSection;
	levels: LevelBlock[];
	levelsClosingStatement: string;
	about: AboutSection;
	pricing: PricingSection;
	processSteps: ProcessStep[];
	faqs: FaqItem[];
	finalCta: FinalCtaSection;
	seo: Seo;
}
