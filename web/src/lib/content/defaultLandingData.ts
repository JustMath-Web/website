import type {
	Author,
	CategoryWithCount,
	HomePage,
	Navigation,
	SiteSettings,
} from "../sanity/types";

export const WHATSAPP_URL =
	"https://wa.me/60194728768?text=Hi%2C%20I%27d%20like%20to%20book%20the%20free%20maths%20assessment.%20My%20child%20is%20in%20___";

const CTA = {
	label: "Book a free maths assessment on WhatsApp",
	href: WHATSAPP_URL,
	kind: "whatsapp" as const,
};

const paragraphs = (...items: string[]) => items.join("\n\n");

const seo = {
	metaTitle: "Just Math Malaysia | One-to-one online maths tuition",
	metaDescription:
		"One-to-one online maths tuition with Mr Kong for Standard 1 to Form 5 and IGCSE, taught in English and Bahasa Melayu.",
	noindex: false,
};

export const defaultCategories: CategoryWithCount[] = [
	{
		_id: "category-standard-1-6",
		title: "Standard 1 to 6",
		slug: { current: "standard-1-6" },
		shortLabel: "Standard 1 to 6",
		description:
			"Primary maths foundations, number confidence, fractions, decimals, and word problems.",
		order: 10,
		seo,
		postCount: 0,
	},
	{
		_id: "category-form-1-3",
		title: "Form 1 to 3",
		slug: { current: "form-1-3" },
		shortLabel: "Form 1 to 3",
		description:
			"Lower secondary algebra, indices, equations, and the shift into abstraction.",
		order: 20,
		seo,
		postCount: 0,
	},
	{
		_id: "category-form-4-5",
		title: "Form 4 to 5",
		slug: { current: "form-4-5" },
		shortLabel: "Form 4 to 5",
		description: "SPM Modern Mathematics and upper secondary technique.",
		order: 30,
		seo,
		postCount: 0,
	},
	{
		_id: "category-add-maths",
		title: "Additional Mathematics",
		slug: { current: "add-maths" },
		shortLabel: "Add Maths",
		description:
			"Functions, quadratics, logarithms, trigonometry, calculus, and exam technique.",
		order: 40,
		seo,
		postCount: 0,
	},
	{
		_id: "category-spm",
		title: "SPM",
		slug: { current: "spm" },
		shortLabel: "SPM",
		description: "SPM Mathematics preparation and paper technique.",
		order: 50,
		seo,
		postCount: 0,
	},
	{
		_id: "category-igcse",
		title: "IGCSE",
		slug: { current: "igcse" },
		shortLabel: "IGCSE",
		description: "IGCSE Mathematics and IGCSE Additional Mathematics.",
		order: 60,
		seo,
		postCount: 0,
	},
];

export const defaultAuthor: Author = {
	_id: "author-mr-kong",
	name: "Mr Kong",
	slug: { current: "mr-kong" },
	role: "Tutor, Just Math Malaysia",
	bio: "Mr Kong teaches one-to-one online maths tuition for Standard 1 to Form 5 and IGCSE students across Malaysia, in English and Bahasa Melayu.",
};

export const defaultSiteSettings: SiteSettings = {
	siteName: "Just Math Malaysia",
	domain: "https://mathematicsmalaysia.com",
	phoneDisplay: "019 472 8768",
	whatsappNumber: "60194728768",
	whatsappMessage:
		"Hi, I'd like to book the free maths assessment. My child is in ___",
	primaryCtaLabel: CTA.label,
	headerCtaLabel: "Schedule Now",
	defaultSeo: seo,
};

export const defaultNavigation: Navigation = {
	headerLinks: [
		{
			_key: "header-blog",
			label: "Blog",
			href: "/blog/",
			kind: "internal",
		},
	],
	footerLinks: [
		{ _key: "footer-home", label: "Home", href: "/", kind: "internal" },
		{
			_key: "footer-pricing",
			label: "Pricing",
			href: "#pricing",
			kind: "fragment",
		},
		{ _key: "footer-faq", label: "FAQ", href: "#faq", kind: "fragment" },
		{ _key: "footer-blog", label: "Blog", href: "/blog/", kind: "internal" },
		{
			_key: "footer-call",
			label: "Call",
			href: "tel:+60194728768",
			kind: "tel",
		},
	],
};

export const defaultHomePage: HomePage = {
	_id: "homePage",
	title: "Home page",
	hero: {
		headline: "Know exactly where your child's maths stands",
		subheadline:
			"Twenty-four years teaching Malaysian maths, ten of them online. One tutor, one student, live on Google Meet. Standard 1 to Form 5, taught in English and Bahasa Melayu.",
		supportingLine:
			"Standard 1 to Form 5 and IGCSE. Online across Malaysia. No group classes.",
		cta: CTA,
		noteUnderButton: "Free, 30 minutes, no obligation to continue.",
	},
	trustItems: [
		{ _key: "trust-24", text: "24 years teaching maths" },
		{ _key: "trust-10", text: "10 years teaching online" },
		{ _key: "trust-500", text: "500+ students, taught one at a time" },
		{ _key: "trust-online", text: "Online across Malaysia, in English and BM" },
	],
	problem: {
		heading: "The school system checks your child's maths twice before SPM",
		body: paragraphs(
			"Here is when a Malaysian student's maths gets independently measured now.",
			"Year 4, from October 2026. The Examinations Board runs the new Learning Matrix nationally, and Mathematics is one of the four papers. The Ministry has been clear that it is a diagnostic rather than a ranking exercise, and that the point is to give schools time to intervene in Years 5 and 6.",
			"Form 3, from 2027. Same idea, five papers this time.",
			"Then SPM.",
			"That is the whole picture. Nothing in Standard 1, 2 or 3. Nothing in Standard 5 or 6. Nothing in Form 1, Form 2 or Form 4. And the longest unchecked stretch in the entire system is the one that matters most: from the Form 3 assessment to the SPM paper, your child sits Form 4 and Form 5 with no independent measure of their maths at all. Form 4 is also the year Additional Mathematics arrives and starts charging interest on every gap left over from earlier.",
			"School reports fill some of that space, and good teachers catch a lot. But a report card gives you a grade. It rarely tells you that your Form 2 student is struggling with algebraic fractions because they never understood a fraction as a division in the first place, six years earlier.",
			"That is a different question, and it takes someone sitting with the child for half an hour to answer it.",
		),
		independentChecksCount: 2,
		gapChartAnnotations: [
			{ _key: "gap-year-4", year: "S4", label: "OCT 2026" },
			{ _key: "gap-form-3", year: "F3", label: "FROM 2027" },
			{ _key: "gap-spm", year: "F5", label: "SPM" },
		],
	},
	sessions: {
		heading: "What a session actually looks like",
		body: paragraphs(
			"Every session is live on Google Meet, one tutor and your child. No recordings to work through alone, no worksheets emailed over and marked later, no class of twenty where the quiet ones stay quiet.",
			"The first ten minutes are usually the last session's homework, worked out loud. Not marked in silence. Worked out loud, so the mistake gets caught at the exact step where it happens. A child who writes the right answer for the wrong reason looks identical to a child who understands it, right up until the topic gets harder.",
			"Then new material, at whatever pace the child actually moves. If Standard 4 fractions are still shaky in Form 1, we go back and fix fractions. A centre working through a fixed syllabus on a fixed schedule cannot do that. It is not the tutor's fault, there are nineteen other students in the room.",
		),
		subSections: [
			{
				_key: "sessions-working",
				heading: "Every step, written out",
				body: "Working is shown line by line, every time, including the steps most people skip because they seem obvious. The steps that seem obvious to a teacher are usually the exact ones a struggling student cannot see. A student who watches a solution appear in three lines learns nothing. A student who watches it appear in eleven can reproduce it on their own.",
			},
			{
				_key: "sessions-online",
				heading: "Online is not a downgrade, and I have ten years of evidence",
				body: paragraphs(
					"I moved teaching online in 2016, four years before everyone else had to. Screen sharing and a shared digital whiteboard mean you see the working step by step in both directions, which for maths is closer to sitting beside someone than a classroom is, because in a classroom the student is looking at a board six metres away.",
					"No travel either. That is thirty to sixty minutes a day back, and for a Form 5 student in the middle of SPM year that is not a small thing.",
				),
			},
			{
				_key: "sessions-language",
				heading: "Taught in the language your child thinks in",
				body: "Sessions run in English or Bahasa Melayu, and switch mid-explanation when that is what it takes. A student who understands the maths but not the wording of the question does not have a maths problem, and treating it as one wastes everybody's time.",
			},
			{
				_key: "sessions-progress",
				heading: "How you see progress",
				body: 'At the end of every month you get a written progress summary: what was covered, what improved, what is still weak, what we are working on next. Not a WhatsApp message saying "she\'s doing well."',
			},
			{
				_key: "sessions-app",
				heading: "What a self-study app cannot do",
				body: "An app can tell you a question was answered wrongly. It cannot tell you why. The why is almost always a concept from two or three years earlier, and finding it is the job.",
			},
		],
		cta: CTA,
	},
	levels: [
		{
			_key: "level-standard",
			title: "Standard 1 to Standard 6",
			tagline: "Building number confidence before the gaps become invisible.",
			category: { _type: "reference", _ref: "category-standard-1-6" },
			bullets: [
				"Arithmetic fluency, place value, fractions and decimals, and word problems where the maths is easy but reading the question is not.",
				"Early maths anxiety, usually caused by a child being moved on before the previous idea was solid.",
				"If your child is in Year 4 this year, they sit the Learning Matrix maths paper on 6 to 8 October. An assessment now tells you what they will find out in October, with Years 5 and 6 still available to act on it.",
			],
		},
		{
			_key: "level-lower-secondary",
			title: "Form 1 to Form 3",
			tagline: "Where maths stops being arithmetic and starts being abstract.",
			category: { _type: "reference", _ref: "category-form-1-3" },
			bullets: [
				'Algebraic expressions, indices, linear equations, and the general shift from working with numbers to working with letters. This is where most students who "were always good at maths" first stall.',
				"Gaps from primary school surface here, and they surface quietly, as slightly lower marks rather than obvious failure.",
				"Form 3 ends with the stream decision. Whether Additional Mathematics is realistic in Form 4 depends on how solid the algebra is now, and that is worth knowing before the form gets signed.",
			],
		},
		{
			_key: "level-upper-secondary",
			title: "Form 4 and Form 5",
			tagline: "Modern Mathematics, Additional Mathematics, and the SPM paper.",
			category: { _type: "reference", _ref: "category-form-4-5" },
			bullets: [
				"Additional Mathematics: functions, quadratic equations, indices and logarithms, progressions, trigonometry, differentiation and integration. Every one of these sits on Form 1 to Form 3 algebra, which is why Add Maths punishes students who were carried through lower secondary.",
				"Modern Mathematics for SPM, including the topics students routinely drop marks on for reasons of technique rather than understanding.",
				"Exam technique and timing. Knowing the maths and finishing the paper are two different skills, and only one of them gets taught in school.",
				"If STPM, matrikulasi or a foundation programme is the plan after SPM, the maths grade requirement is worth checking early rather than in Form 5.",
			],
		},
		{
			_key: "level-igcse",
			title: "IGCSE",
			tagline: "Same tutor, different syllabus.",
			category: { _type: "reference", _ref: "category-igcse" },
			bullets: [
				"IGCSE Mathematics and IGCSE Additional Mathematics, taught to the international syllabus rather than translated across from SPM.",
				"International school students in the years below IGCSE are welcome. The maths underneath is the same maths, and the gaps show up in the same places.",
			],
		},
	],
	levelsClosingStatement:
		"Standard 1 through Form 5, and IGCSE. Teaching ends at SPM and IGCSE level. No STPM, matrikulasi, foundation or university mathematics, and I would rather tell you that now than take the booking.",
	about: {
		byline: "Mr Kong, Just Math Malaysia",
		heading: "Can one tutor teach a seven-year-old and an Add Maths student?",
		body: paragraphs(
			"It is a fair question, and most tutors cannot. The market splits: primary specialists on one side, SPM and Add Maths specialists on the other. Very few people teach both.",
			"I do, and that is the whole reason this works.",
			"Twenty-four years of teaching every level from Standard 1 to Form 5 means I have watched the same students grow up through it. I know which Standard 4 gap turns into which Form 5 failure, because I have taught both ends of it to the same child.",
			"A concrete example. A student who learned to divide fractions by flipping the second one, without ever understanding why, is fine in Standard 5. In Form 2 they hit algebraic fractions and the trick stops working. In Form 5 they hit integration by substitution and it collapses completely. Three different topics, three different school years, one root cause. A tutor who only teaches Form 4 and 5 sees the collapse and treats the symptom.",
			"The same goes the other way. When I teach a Standard 3 student, I already know which of today's shortcuts will cost them in eight years, so we do not take them.",
			"Ten of those twenty-four years have been online. I started teaching over video in 2016, well before the rest of the market had to, which means the online part of this is not an adaptation I made recently.",
			"Every concept gets explained with an example a student at that level can actually picture, and every calculation gets written out step by step. Not the shortened version a textbook gives. The full version, including the lines that look too obvious to write down.",
			"Every session is taught by me. There is no bench of part-time tutors, and your child will not be handed to someone else next month.",
		),
		yearsExperience: 24,
		studentsPerYear: 20,
		statPanel: {
			heading: "The 500 number, and why it is small on purpose",
			body: paragraphs(
				"Over 500 students in 24 years works out to about twenty a year.",
				"A tuition centre can put 500 students through in a single year, because it teaches them thirty at a time. Every one of my 500 sat in a session with nobody else in it. Different number, different unit.",
			),
		},
	},
	pricing: {
		heading: "One session a week, billed monthly",
		body: "Sessions are one hour, once a week, at the same slot each week. Fees are monthly and cover four sessions. Some months have a fifth, and that session is charged at the same rate.",
		pricingRows: [
			{
				_key: "price-standard",
				level: "Standard 1 to 6",
				sessionLength: "60 min",
				perMonth: "RM160",
				perSession: "RM40",
			},
			{
				_key: "price-form-1-3",
				level: "Form 1 to 3",
				sessionLength: "60 min",
				perMonth: "RM180",
				perSession: "RM45",
			},
			{
				_key: "price-modern",
				level: "Form 4 and 5, Modern Mathematics",
				sessionLength: "60 min",
				perMonth: "RM200",
				perSession: "RM50",
			},
			{
				_key: "price-add-maths",
				level: "Form 4 and 5, Additional Mathematics",
				sessionLength: "60 min",
				perMonth: "RM240",
				perSession: "RM60",
			},
			{
				_key: "price-igcse",
				level: "IGCSE Mathematics and Additional Mathematics",
				sessionLength: "90 min",
				perMonth: "RM360",
				perSession: "RM90",
			},
		],
		includedList: [
			"Four live one-to-one sessions on Google Meet, taught by me",
			"A written progress summary sent to you at the end of the month, covering what was taught, what improved and what is still weak",
			"Homework set and reviewed out loud in the following session, not marked in silence",
			"A learning plan built from the diagnostic assessment, not a generic syllabus",
			"Sessions taught in English or Bahasa Melayu, whichever your child follows better",
		],
		paymentNote: paragraphs(
			"Fees are paid before the first session of each month, by DuitNow or bank transfer. Rates shown apply for 2026 and are reviewed once a year.",
			"Before any of that, the 30-minute assessment is free and you are under no obligation to continue afterwards.",
		),
		availability: {
			heading: "Availability",
			body: paragraphs(
				"Monday to Friday, in two blocks: 3pm to 6pm, and 8pm to 11pm.",
				"The late block exists because Form 4 and Form 5 students are usually not free before then. The afternoon block is where most primary students sit.",
				"Slots go on a first come, first served basis, and once yours is agreed it stays yours every week. WhatsApp me for what is currently open.",
			),
		},
		availabilityTimeBlocks: [
			{ _key: "time-afternoon", range: "3pm to 6pm", label: "primary" },
			{
				_key: "time-evening",
				range: "8pm to 11pm",
				label: "upper secondary",
			},
		],
		cta: CTA,
	},
	processSteps: [
		{
			_key: "step-message",
			title: "Message me on WhatsApp",
			body: "Tell me what standard or form your child is in. That is all I need to get started.",
		},
		{
			_key: "step-assessment",
			title: "Free 30-minute assessment on Google Meet",
			body: "Your child works through problems with me while I watch how they think, not just whether they get the answer. You are welcome to sit in.",
		},
		{
			_key: "step-findings",
			title: "You get the findings",
			body: "I tell you what is solid, what is weak, and which earlier topic is causing the current problem. If I think your child does not need tutoring, I will say so.",
		},
		{
			_key: "step-slot",
			title: "Your weekly slot starts",
			body: "If you want to go ahead, we agree a slot from what is available, weekly and the same time each week. The first month's fee is settled before the first session, and we start on the plan from the assessment.",
		},
	],
	faqs: [
		{
			_key: "faq-session-length",
			question: "How long is each session, and how often?",
			answer:
				"One hour a week for Standard 1 to Form 5, at the same slot each week. IGCSE students take 90 minutes a week, because that syllabus moves faster and an hour does not keep up with it.",
		},
		{
			_key: "faq-weekends",
			question: "Do you teach on weekends?",
			answer:
				"Not at the moment. Sessions run Monday to Friday, in the two blocks above. If neither window works for your family, message me anyway and say so. I keep a note of who is waiting on a different time, and if that changes you will hear from me.",
		},
		{
			_key: "faq-schedule",
			question:
				"Can sessions fit around school and my child's existing tuition?",
			answer:
				"Slots run weekday afternoons from 3pm to 6pm and weekday evenings from 8pm to 11pm, and you keep the same weekly slot once it is agreed. The evening block was set up for upper secondary students who are not free until after dinner. If your child is in an afternoon school session, the 3pm to 6pm window will not work and the evening one is late for a younger child, so message me before booking an assessment and we will check there is a slot that fits. Because sessions are online there is no travel to schedule around either way.",
		},
		{
			_key: "faq-language",
			question: "What language do you teach in?",
			answer:
				"English or Bahasa Melayu, and I switch between them during a session when that is what helps. Some students follow the maths perfectly well but lose marks because the wording of the question is in the language they are weaker in. That is worth sorting out separately from the maths.",
		},
		{
			_key: "faq-seven",
			question:
				"My child is seven. Can they hold attention online for an hour?",
			answer:
				"Some can, many cannot, and I would rather say that plainly. For younger primary students I keep the pace changing every few minutes and use the whiteboard heavily so they are doing something rather than listening. If an hour is genuinely too long for your child, tell me at the assessment and we will look at shorter, more frequent sessions instead.",
		},
		{
			_key: "faq-syllabus",
			question: "Do you follow the school syllabus and textbook?",
			answer:
				"Yes. Teaching follows the national KSSR and KSSM syllabus, and I also teach the IGCSE syllabus for students in international schools. We work from your child's own school textbook and exercise book so what we do in a session lines up with what they see in class the next day. Where a gap from an earlier year is causing the current problem, we go back and fix that first, then return to the current chapter.",
		},
		{
			_key: "faq-stpm",
			question: "Do you teach STPM or pre-university maths?",
			answer:
				"No. Teaching goes up to SPM and IGCSE. After that you want someone who specialises in it, and I would rather say so than take the booking.",
		},
		{
			_key: "faq-assessment",
			question: "What actually happens in the free assessment?",
			answer:
				"Thirty minutes on Google Meet, your child and me. I give them problems starting slightly below their current level and work upward until we find where it breaks. I am watching their method, not just the answer, because a wrong method that happens to produce a right answer is the thing that causes trouble later. There is no test paper, no score, and nothing for your child to prepare.",
		},
		{
			_key: "faq-after",
			question: "What happens after the assessment?",
			answer:
				"I tell you what I found: which topics are solid, which are weak, and which earlier concept is causing the current difficulty. If tutoring makes sense I will tell you what I would work on and how long I think it takes. If I do not think your child needs tutoring, I will tell you that instead. There is no obligation either way and I do not follow up repeatedly.",
		},
		{
			_key: "faq-reschedule",
			question: "Can we reschedule a session?",
			answer:
				"Yes. Give me one week's notice and the session moves to another available slot that month, at no extra cost.",
		},
		{
			_key: "faq-payment",
			question: "How and when do I pay?",
			answer:
				"Monthly, before the first session of the month, by DuitNow or bank transfer. There is nothing to pay for the assessment, and nothing is charged until you have decided to go ahead. Fees are not taken in advance beyond the month you are in.",
		},
		{
			_key: "faq-progress",
			question: "How will I know if my child is improving?",
			answer:
				"At the end of every month I send you a written progress summary covering what was taught, what improved, what is still weak, and what comes next. You can also sit in on any session. If something is not working I will tell you before you have to ask.",
		},
		{
			_key: "faq-same-tutor",
			question: "Will the same tutor teach every session?",
			answer:
				"Yes. I teach every session myself. There are no assistant tutors and no substitutions.",
		},
	],
	finalCta: {
		heading: "Start with the 30 minutes",
		body: paragraphs(
			"The assessment is free, takes half an hour, and happens on Google Meet. At the end you will know where your child's maths actually stands and what is causing the problem.",
			"If the answer is that they are fine, I will tell you that and you will have spent thirty minutes finding out. Nobody will chase you afterwards.",
		),
		freeMinutes: 30,
		cta: CTA,
		smallNote:
			"Mr Kong, Just Math Malaysia. WhatsApp 019 472 8768. Taught online across Malaysia, in English and Bahasa Melayu.",
	},
	seo,
};
