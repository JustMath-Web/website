// Ambient declarations for the static scripts in public/ (consent.js, analytics.js). They are plain
// browser scripts, not modules, so what they share through `window` is declared here. Checked by
// `pnpm check:public` (tsconfig.public.json); docs/DECISIONS.md §49.

type ConsentChoice = "accepted" | "rejected";

interface JmConsent {
	/** The stored choice, or null when none (or an invalid or old-version record) exists. */
	get(): ConsentChoice | null;
	set(choice: ConsentChoice): void;
}

interface Window {
	jmConsent?: JmConsent;
	/** Entries are GTM start events (objects) or gtag() `arguments` objects. */
	dataLayer?: Array<IArguments | Record<string, unknown>>;
}

interface WindowEventMap {
	"jm-consent": CustomEvent<ConsentChoice>;
}
