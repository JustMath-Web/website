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
		en: "both event data and user data are kept for 14 months, then Google deletes them automatically. We cannot identify or find one visitor's data, because it is not linked to your name, so we cannot delete it on request",
		ms: "data peristiwa dan data pengguna disimpan selama 14 bulan, kemudian Google memadamkannya secara automatik. Kami tidak dapat mengenal pasti atau mencari data seorang pelawat, kerana ia tidak dikaitkan dengan nama anda, jadi kami tidak dapat memadamkannya atas permintaan",
	},
	lastUpdated: "2026-10-09",
	copyApprovedOn: null,
};
