/**
 * Owner facts the privacy notice needs and this repo cannot know. They are NOT invented
 * (docs/DECISIONS.md §49). `checkPrivacyFacts` fails the production build, and
 * `assert-privacy-facts-guard.mjs` fails CI, while any is null, empty or placeholder text.
 */
import type { PrivacyFacts } from "./content/assertPrivacyFacts.ts";

export const PRIVACY_FACTS: PrivacyFacts = {
	ownerName: "Mr Kong",
	whatsappRetention: {
		en: "we keep them until you ask us to delete them, and we do not delete them automatically",
		ms: "kami menyimpannya sehingga anda meminta kami memadamnya, dan kami tidak memadamnya secara automatik",
	},
	analyticsRetention: {
		en: "event data is kept for 2 months and user data for 14 months. The 14 months restart when the same visitor returns. Google then deletes the data automatically. We cannot normally find one visitor's data, because it is not linked to your name",
		ms: "data peristiwa disimpan selama 2 bulan dan data pengguna selama 14 bulan. Tempoh 14 bulan bermula semula apabila pelawat yang sama kembali. Google kemudian memadamkan data secara automatik. Kami biasanya tidak dapat mencari data seorang pelawat, kerana ia tidak dikaitkan dengan nama anda",
	},
	lastUpdated: "2026-10-09",
	copyApprovedOn: null,
};
