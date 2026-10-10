/**
 * The bilingual privacy notice as typed data (docs/DECISIONS.md §49). Plain text only: runs are
 * strings, emphasis or named facts, never markup. `NoticeBlocks.astro` renders them; Astro escapes
 * every string. DRAFT COPY, not approved for publication: it needs owner approval, a native Malay
 * check, a GTM container check (advertising-features wording) and qualified advice.
 */

/** The ten headings, in the order the page shows them. */
export const SECTION_IDS = [
	"who",
	"collect",
	"voluntary",
	"source",
	"recipients",
	"children",
	"rights",
	"choices",
	"retention",
	"changes",
] as const;

type SectionIds = typeof SECTION_IDS;

export type SectionId = SectionIds[number];

export type FactKey =
	| "ownerName"
	| "contactEmail"
	| "phone"
	| "whatsappRetention"
	| "analyticsRetention"
	| "lastUpdated";

export type Run =
	string | { em: string } | { strong: string } | { fact: FactKey };

export type Block = { p: Run[] } | { ul: Run[][] };

export interface NoticeSection<Id extends SectionId = SectionId> {
	id: Id;
	heading: string;
	blocks: Block[];
}

/** Homomorphic over the tuple, so each position must hold exactly the section id at that position. */
type SectionsFor<T extends readonly SectionId[]> = {
	[K in keyof T]: NoticeSection<T[K]>;
};

export interface NoticeLanguage {
	lang: "en" | "ms";
	/** The language section's h2. */
	title: string;
	/** The "last updated" line and, in English, the pointer to the other language. */
	preamble: Block[];
	/** An exact tuple: a missing, extra, misspelt or reordered section fails `pnpm check`. */
	sections: SectionsFor<SectionIds>;
}

const en: NoticeLanguage = {
	lang: "en",
	title: "Privacy Notice — Just Math Malaysia",
	preamble: [
		{ p: ["Last updated: ", { fact: "lastUpdated" }] },
		{
			p: [
				{
					em: "Versi Bahasa Melayu di bawah. / A Bahasa Melayu version is below.",
				},
			],
		},
	],
	sections: [
		{
			id: "who",
			heading: "Who we are",
			blocks: [
				{
					p: [
						"This website, mathematicsmalaysia.com, is run by ",
						{ fact: "ownerName" },
						', trading as Just Math Malaysia ("we"). You can contact us at ',
						{ fact: "contactEmail" },
						" or on WhatsApp ",
						{ fact: "phone" },
						".",
					],
				},
			],
		},
		{
			id: "collect",
			heading: "What we collect and why",
			blocks: [
				{
					ul: [
						[
							{ em: "When you message us on WhatsApp:" },
							" your WhatsApp number and name, and what you write (for example your child's school year). We use this to reply, to book a free assessment, and to arrange lessons. WhatsApp is run by Meta under its own privacy terms.",
						],
						[
							{ em: "When you visit this website:" },
							" ",
							{ strong: "only if you accept" },
							" (see the cookie choice), we use Google Tag Manager and Google Analytics to count visits and understand how the site is used. Google may also use this data for its advertising features. Google Analytics and these advertising features load ",
							{ strong: "only if you accept" },
							". If you accept, Google sets cookies or similar identifiers in your browser, and receives your IP address and details of your device and visit. This helps us improve the lessons and the site.",
						],
						[
							{
								em: "Our hosting provider (Cloudflare) and our content provider (Sanity)",
							},
							" process technical data such as your IP address so that pages and images load safely.",
						],
						[
							"Blog posts that contain a YouTube video load that video from YouTube's privacy-enhanced domain as you scroll to it. This does not depend on your cookie choice. YouTube's own terms apply.",
						],
					],
				},
			],
		},
		{
			id: "voluntary",
			heading: "Giving us information is voluntary",
			blocks: [
				{
					p: [
						{ strong: "This website itself has no forms or accounts." },
						" Through WhatsApp we may ask for your child's school year and level, and what help you want. Please do not send more than you need to. Giving us this information is ",
						{ strong: "voluntary" },
						". If you choose not to, we may not be able to reply properly or book a lesson.",
					],
				},
			],
		},
		{
			id: "source",
			heading: "Where the data comes from",
			blocks: [
				{
					p: [
						"WhatsApp details and what you write come from you. Visit data comes from your browser and device. It is collected by Google's tags on this website ",
						{ strong: "only after you accept" },
						" the cookie choice.",
					],
				},
			],
		},
		{
			id: "recipients",
			heading: "Who may receive your data",
			blocks: [
				{
					p: [
						"Google, Cloudflare, Sanity, Meta (WhatsApp) and YouTube, as described above. Some of them are outside Malaysia. We do not sell your data.",
					],
				},
			],
		},
		{
			id: "children",
			heading: "Children",
			blocks: [
				{
					p: [
						"Our lessons are booked by parents or guardians, and the information about a child (such as school year) is given by the parent or guardian. If you are under 18, please ask a parent or guardian before you contact us. If we learn that we hold a child's personal data without a parent's or guardian's consent, we will delete it.",
					],
				},
			],
		},
		{
			id: "rights",
			heading: "Your rights",
			blocks: [
				{
					p: [
						"You can ask to see, correct, or delete the data we hold about you, or withdraw your consent, by contacting us at ",
						{ fact: "contactEmail" },
						".",
					],
				},
			],
		},
		{
			id: "choices",
			heading: "Your choices",
			blocks: [
				{
					p: [
						'You can block or delete cookies in your browser settings. You can change your choice at any time using "Cookie settings" in the footer. Your choice not to give data may mean we cannot reply to you.',
					],
				},
			],
		},
		{
			id: "retention",
			heading: "How long we keep it",
			blocks: [
				{
					p: [
						"WhatsApp enquiries: ",
						{ fact: "whatsappRetention" },
						". Analytics: set in Google Analytics, ",
						{ fact: "analyticsRetention" },
						".",
					],
				},
			],
		},
		{
			id: "changes",
			heading: "Changes",
			blocks: [
				{ p: ["We will update this page and its date if this changes."] },
			],
		},
	],
};

const ms: NoticeLanguage = {
	lang: "ms",
	title: "Notis Privasi — Just Math Malaysia",
	preamble: [{ p: ["Dikemas kini: ", { fact: "lastUpdated" }] }],
	sections: [
		{
			id: "who",
			heading: "Siapa kami",
			blocks: [
				{
					p: [
						"Laman web ini, mathematicsmalaysia.com, dikendalikan oleh ",
						{ fact: "ownerName" },
						', berniaga sebagai Just Math Malaysia ("kami"). Hubungi kami di ',
						{ fact: "contactEmail" },
						" atau WhatsApp ",
						{ fact: "phone" },
						".",
					],
				},
			],
		},
		{
			id: "collect",
			heading: "Data yang kami kumpul dan sebabnya",
			blocks: [
				{
					ul: [
						[
							{ em: "Apabila anda menghantar mesej WhatsApp:" },
							" nombor dan nama WhatsApp anda, serta apa yang anda tulis (contohnya tahun persekolahan anak anda). Kami gunakan untuk membalas, menempah penilaian percuma dan mengatur kelas. WhatsApp dikendalikan oleh Meta di bawah terma privasinya sendiri.",
						],
						[
							{ em: "Apabila anda melawat laman web ini:" },
							" ",
							{ strong: "hanya jika anda bersetuju" },
							" (lihat pilihan kuki), kami menggunakan Google Tag Manager dan Google Analytics untuk mengira lawatan dan memahami cara laman web digunakan. Google juga boleh menggunakan data ini untuk ciri pengiklanannya. Google Analytics dan ciri pengiklanan ini ",
							{ strong: "hanya dimuatkan jika anda bersetuju" },
							". Jika anda bersetuju, Google menetapkan kuki atau pengecam serupa dalam pelayar anda, dan menerima alamat IP serta maklumat peranti dan lawatan anda. Ini membantu kami menambah baik kelas dan laman web.",
						],
						[
							{
								em: "Penyedia hosting (Cloudflare) dan penyedia kandungan (Sanity)",
							},
							" memproses data teknikal seperti alamat IP anda supaya halaman dan imej dimuatkan dengan selamat.",
						],
						[
							"Catatan blog yang mengandungi video YouTube memuatkan video itu daripada domain mod privasi dipertingkat YouTube apabila anda menatal ke arahnya. Ini tidak bergantung pada pilihan kuki anda. Terma YouTube sendiri terpakai.",
						],
					],
				},
			],
		},
		{
			id: "voluntary",
			heading: "Memberi maklumat adalah sukarela",
			blocks: [
				{
					p: [
						{ strong: "Laman web ini sendiri tiada borang atau akaun." },
						" Melalui WhatsApp, kami mungkin bertanya tahun dan tahap persekolahan anak anda serta bantuan yang anda perlukan. Sila jangan hantar lebih daripada yang perlu. Memberi maklumat ini adalah ",
						{ strong: "sukarela" },
						". Jika anda memilih untuk tidak memberi, kami mungkin tidak dapat membalas dengan sewajarnya atau menempah kelas.",
					],
				},
			],
		},
		{
			id: "source",
			heading: "Dari mana data datang",
			blocks: [
				{
					p: [
						"Butiran WhatsApp dan apa yang anda tulis datang daripada anda. Data lawatan datang daripada pelayar dan peranti anda. Ia dikumpul oleh tag Google di laman web ini ",
						{ strong: "hanya selepas anda bersetuju" },
						" dengan pilihan kuki.",
					],
				},
			],
		},
		{
			id: "recipients",
			heading: "Siapa yang boleh menerima data anda",
			blocks: [
				{
					p: [
						"Google, Cloudflare, Sanity, Meta (WhatsApp) dan YouTube, seperti dihuraikan di atas. Sebahagian berada di luar Malaysia. Kami tidak menjual data anda.",
					],
				},
			],
		},
		{
			id: "children",
			heading: "Kanak-kanak",
			blocks: [
				{
					p: [
						"Kelas ditempah oleh ibu bapa atau penjaga, dan maklumat tentang kanak-kanak (seperti tahun persekolahan) diberi oleh ibu bapa atau penjaga. Jika anda berumur di bawah 18 tahun, sila minta kebenaran ibu bapa atau penjaga sebelum menghubungi kami. Jika kami mendapati kami menyimpan data peribadi kanak-kanak tanpa kebenaran ibu bapa atau penjaga, kami akan memadamkannya.",
					],
				},
			],
		},
		{
			id: "rights",
			heading: "Hak anda",
			blocks: [
				{
					p: [
						"Anda boleh meminta untuk melihat, membetulkan atau memadam data yang kami simpan, atau menarik balik persetujuan, dengan menghubungi ",
						{ fact: "contactEmail" },
						".",
					],
				},
			],
		},
		{
			id: "choices",
			heading: "Pilihan anda",
			blocks: [
				{
					p: [
						'Anda boleh menyekat atau memadam kuki dalam tetapan pelayar. Anda boleh menukar pilihan pada bila-bila masa melalui "Tetapan kuki" di bahagian bawah. Jika anda tidak memberi data, kami mungkin tidak dapat membalas anda.',
					],
				},
			],
		},
		{
			id: "retention",
			heading: "Tempoh simpanan",
			blocks: [
				{
					p: [
						"Pertanyaan WhatsApp: ",
						{ fact: "whatsappRetention" },
						". Analitik: ditetapkan dalam Google Analytics, ",
						{ fact: "analyticsRetention" },
						".",
					],
				},
			],
		},
		{
			id: "changes",
			heading: "Perubahan",
			blocks: [
				{
					p: [
						"Kami akan mengemas kini halaman ini dan tarikhnya jika ada perubahan.",
					],
				},
			],
		},
	],
};

export const PRIVACY_NOTICE: { en: NoticeLanguage; ms: NoticeLanguage } = {
	en,
	ms,
};
