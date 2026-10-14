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
		en: "event data is kept for 14 months. User data is also kept for 14 months, and that period restarts when the same visitor returns. Google deletes expired data once a month. Reports built from combined data are not affected. We cannot normally find one visitor's data, because it is not linked to your name",
		ms: "data peristiwa disimpan selama 14 bulan. Data pengguna juga disimpan selama 14 bulan, dan tempoh itu bermula semula apabila pelawat yang sama kembali. Google memadamkan data yang telah tamat tempoh sekali sebulan. Laporan yang dibina daripada data gabungan tidak terjejas. Kami biasanya tidak dapat mencari data seorang pelawat, kerana ia tidak dikaitkan dengan nama anda",
	},
	lastUpdated: "2026-10-13",
	copyApprovedOn: "2026-10-13",
	adviserReviewedOn: null,
	nativeMalayReviewedOn: null,
};
