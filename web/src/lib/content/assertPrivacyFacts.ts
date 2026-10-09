/**
 * Refuses a production build whose privacy notice would carry an unfinished owner fact.
 *
 * Lives in an Astro build hook (see `astro.config.mjs`), not in a package script or only in CI,
 * for the same reason `deployEnvGuard` does: Cloudflare's build command is set in a dashboard, so a
 * check wired anywhere else could be bypassed. Non-production builds (previews, local) are never
 * blocked, so the notice can be reviewed on a preview before the facts are final.
 *
 * The hook runs at `astro:build:done`, after the other production checks, so it never hides their
 * failures. The build still fails, so nothing is published (docs/DECISIONS.md §49, ruling R13).
 */
export interface BilingualFact {
	en: string | null;
	ms: string | null;
}

export interface PrivacyFacts {
	ownerName: string | null;
	contactEmail: string | null;
	whatsappRetention: BilingualFact;
	analyticsRetention: BilingualFact;
	lastUpdated: string;
	/** Date the owner approved the notice AND the banner wording. Null until then. */
	copyApprovedOn: string | null;
}

const PLACEHOLDER =
	/\[|\]|\bTODO\b|\bTBD\b|\bTBC\b|\bFIXME\b|\bxxx+\b|\blorem\b|\bplaceholder\b|\bn\/a\b|\bto be (confirmed|decided)\b|\?\?\?/i;

function checkText(
	label: string,
	value: string | null | undefined,
	problems: string[],
) {
	if (value === null || value === undefined || value.trim().length < 3) {
		problems.push(`${label} is unset or empty`);
	} else if (PLACEHOLDER.test(value)) {
		problems.push(`${label} looks like placeholder text`);
	}
}

/** A real calendar date written YYYY-MM-DD (rejects 9999-99-99 and 2026-02-30). */
function isRealDate(value: string): boolean {
	const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
	if (!m) return false;
	const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
	const date = new Date(Date.UTC(y, mo - 1, d));
	return (
		date.getUTCFullYear() === y &&
		date.getUTCMonth() === mo - 1 &&
		date.getUTCDate() === d
	);
}

export function checkPrivacyFacts(
	facts: PrivacyFacts,
	env: NodeJS.ProcessEnv,
): { error?: string } {
	if (env.DEPLOY_ENV !== "production") return {};
	const problems: string[] = [];
	checkText("ownerName", facts.ownerName, problems);
	checkText("contactEmail", facts.contactEmail, problems);
	checkText("whatsappRetention.en", facts.whatsappRetention?.en, problems);
	checkText("whatsappRetention.ms", facts.whatsappRetention?.ms, problems);
	checkText("analyticsRetention.en", facts.analyticsRetention?.en, problems);
	checkText("analyticsRetention.ms", facts.analyticsRetention?.ms, problems);
	const email = facts.contactEmail?.trim();
	if (email && !/^[^@\s]+@[^@\s.]+(\.[^@\s.]+)*\.[A-Za-z]{2,}$/.test(email)) {
		problems.push("contactEmail is not an e-mail address");
	}
	if (!isRealDate(facts.lastUpdated ?? "")) {
		problems.push("lastUpdated must be a real date, YYYY-MM-DD");
	}
	if (!facts.copyApprovedOn || !isRealDate(facts.copyApprovedOn)) {
		problems.push(
			"copyApprovedOn must be a real date, YYYY-MM-DD: it records that the owner approved the notice AND the banner wording after the Google Tag Manager container check and a native Malay review",
		);
	}
	if (problems.length === 0) return {};
	return {
		error:
			"The privacy notice cannot ship with unfinished owner facts:\n  - " +
			problems.join("\n  - ") +
			"\nFix: fill them in `src/lib/privacy.ts` with the owner's real values.",
	};
}
