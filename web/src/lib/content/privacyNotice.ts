/**
 * The bilingual privacy notice as typed data (docs/DECISIONS.md §49). Plain text only: runs are
 * strings, emphasis or named facts, never markup. `NoticeBlocks.astro` renders them; Astro escapes
 * every string. DRAFT COPY, not approved for publication: it needs owner approval, a native Malay
 * check (the Malay is a plain translation), a GTM container check (advertising-features wording) and qualified advice.
 */

/** The thirteen headings, in the order the page shows them. */
export const SECTION_IDS = [
	"who",
	"collect",
	"voluntary",
	"source",
	"recipients",
	"law",
	"children",
	"rights",
	"choices",
	"retention",
	"security",
	"links",
	"changes",
] as const;

type SectionIds = typeof SECTION_IDS;

export type SectionId = SectionIds[number];

export type FactKey =
	| "ownerName"
	| "phone"
	| "whatsappRetention"
	| "analyticsRetention"
	| "lastUpdated";

export type Run =
	| string
	| { em: string; strong?: never; fact?: never }
	| { strong: string; em?: never; fact?: never }
	| { fact: FactKey; em?: never; strong?: never };

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

export interface NoticeLanguage<L extends "en" | "ms" = "en" | "ms"> {
	lang: L;
	/** The language section's h2. */
	title: string;
	/** The "last updated" line and, in English, the pointer to the other language. */
	preamble: Block[];
	/** An exact tuple: a missing, extra, misspelt or reordered section fails `pnpm check`. */
	sections: SectionsFor<SectionIds>;
}

const en: NoticeLanguage<"en"> = {
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
						', trading as Just Math Malaysia ("we"). You can contact us on WhatsApp ',
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
							" we use Google Tag Manager and Google Analytics to count visits and understand how the site is used. Google may also use this data for its advertising features. Google sets cookies or similar identifiers in your browser, and receives your IP address and details of your device and visit. ",
							{ strong: "By using this website you agree to this." },
							' You can opt out at any time with the "Cookies / Kuki" button on every page, or under "Your choices" below. This helps us improve the lessons and the site.',
						],
						[
							{
								em: "Our hosting provider (Cloudflare) and our content provider (Sanity)",
							},
							" process technical data such as your IP address so that pages and images load safely.",
						],
						[
							"Blog posts that contain a YouTube video load that video from YouTube's privacy-enhanced domain as you scroll to it. This does not depend on your opt-out. YouTube's own terms apply.",
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
						"WhatsApp details and what you write come from you. Visit data comes from your browser and device. Google's tags on this website collect it unless you have ",
						{ strong: "opted out" },
						".",
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
			id: "law",
			heading: "When the law requires it",
			blocks: [
				{
					p: ["We may share your data if the law or a court requires it."],
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
						"You can ask to see, correct, or delete the data we hold about you, or withdraw your consent, by contacting us on WhatsApp ",
						{ fact: "phone" },
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
						'You can opt out of Google Analytics and its advertising features at any time with the "Cookies / Kuki" button on every page (or "Cookie settings" in the footer), and opt back in the same way. Opting out stops Google Analytics and its advertising features in that browser, and this website deletes the Google cookies it can reach. Your choice is saved in that browser only, in local storage and in a small first-party cookie named jm-consent-v1, so you need to make it again in each browser or device you use. If your browser blocks saving, the opt-out lasts for that tab only. You can also block or delete cookies in your browser settings. Your choice not to give data may mean we cannot reply to you.',
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
			id: "security",
			heading: "Security",
			blocks: [
				{
					p: [
						"This website uses HTTPS. No way of sending or storing data is completely secure, so we cannot promise absolute security.",
					],
				},
			],
		},
		{
			id: "links",
			heading: "Links to other sites",
			blocks: [
				{
					p: [
						"This website links to other sites, such as WhatsApp and YouTube. We do not control them. Please read their privacy notices.",
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

const ms: NoticeLanguage<"ms"> = {
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
						', berniaga sebagai Just Math Malaysia ("kami"). Hubungi kami di WhatsApp ',
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
							" kami menggunakan Google Tag Manager dan Google Analytics untuk mengira lawatan dan memahami cara laman web digunakan. Google juga boleh menggunakan data ini untuk ciri pengiklanannya. Google menetapkan kuki atau pengecam serupa dalam pelayar anda, dan menerima alamat IP serta maklumat peranti dan lawatan anda. ",
							{ strong: "Dengan menggunakan laman web ini, anda bersetuju." },
							' Anda boleh menarik diri pada bila-bila masa dengan butang "Cookies / Kuki" pada setiap halaman, atau di bawah "Pilihan anda" di bawah. Ini membantu kami menambah baik kelas dan laman web.',
						],
						[
							{
								em: "Penyedia hosting (Cloudflare) dan penyedia kandungan (Sanity)",
							},
							" memproses data teknikal seperti alamat IP anda supaya halaman dan imej dimuatkan dengan selamat.",
						],
						[
							"Catatan blog yang mengandungi video YouTube memuatkan video itu daripada domain mod privasi dipertingkat YouTube apabila anda menatal ke arahnya. Ini tidak bergantung pada tindakan anda menarik diri. Terma YouTube sendiri terpakai.",
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
						"Butiran WhatsApp dan apa yang anda tulis datang daripada anda. Data lawatan datang daripada pelayar dan peranti anda. Tag Google di laman web ini mengumpulnya melainkan anda telah ",
						{ strong: "menarik diri" },
						".",
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
			id: "law",
			heading: "Apabila undang-undang memerlukannya",
			blocks: [
				{
					p: [
						"Kami boleh berkongsi data anda jika undang-undang atau mahkamah memintanya.",
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
						"Anda boleh meminta untuk melihat, membetulkan atau memadam data yang kami simpan, atau menarik balik persetujuan, dengan menghubungi kami di WhatsApp ",
						{ fact: "phone" },
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
						'Anda boleh menarik diri daripada Google Analytics dan ciri pengiklanannya pada bila-bila masa dengan butang "Cookies / Kuki" pada setiap halaman (atau "Tetapan kuki" di bahagian bawah), dan memilih semula dengan cara yang sama. Menarik diri menghentikan Google Analytics dan ciri pengiklanannya dalam pelayar itu, dan laman web ini memadam kuki Google yang boleh dicapainya. Pilihan anda disimpan dalam pelayar itu sahaja, dalam storan setempat dan dalam kuki pihak pertama kecil bernama jm-consent-v1, jadi anda perlu membuatnya semula dalam setiap pelayar atau peranti yang anda gunakan. Jika pelayar anda menyekat penyimpanan, penarikan diri ini hanya untuk tab itu. Anda juga boleh menyekat atau memadam kuki dalam tetapan pelayar. Jika anda tidak memberi data, kami mungkin tidak dapat membalas anda.',
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
			id: "security",
			heading: "Keselamatan",
			blocks: [
				{
					p: [
						"Laman web ini menggunakan HTTPS. Tiada cara menghantar atau menyimpan data yang selamat sepenuhnya, jadi kami tidak boleh menjamin keselamatan mutlak.",
					],
				},
			],
		},
		{
			id: "links",
			heading: "Pautan ke laman lain",
			blocks: [
				{
					p: [
						"Laman web ini mempunyai pautan ke laman lain, seperti WhatsApp dan YouTube. Kami tidak mengawal laman tersebut. Sila baca notis privasi mereka.",
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

export const PRIVACY_NOTICE = { en, ms } satisfies {
	en: NoticeLanguage<"en">;
	ms: NoticeLanguage<"ms">;
};
