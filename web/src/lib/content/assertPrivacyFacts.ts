/**
 * Refuses a production build whose privacy notice would carry an unfinished owner fact.
 *
 * Lives in an Astro build hook (see `astro.config.mjs`), not in a package script or only in CI,
 * for the same reason `deployEnvGuard` does: Cloudflare's build command is set in a dashboard, so a
 * check wired anywhere else could be bypassed. Non-production builds (previews, local) are never
 * blocked, so the notice can be reviewed on a preview before the facts are final.
 */
export interface PrivacyFacts {
	ownerName: string | null;
	contactEmail: string | null;
	whatsappRetention: string | null;
	analyticsRetention: string | null;
	lastUpdated: string;
}

const PLACEHOLDER =
	/\[|\]|\bTODO\b|\bTBD\b|\bFIXME\b|\bxxx+\b|\blorem\b|\bplaceholder\b/i;
const FACT_KEYS = [
	"ownerName",
	"contactEmail",
	"whatsappRetention",
	"analyticsRetention",
] as const;

export function checkPrivacyFacts(
	facts: PrivacyFacts,
	env: NodeJS.ProcessEnv,
): { error?: string } {
	if (env.DEPLOY_ENV !== "production") return {};
	const problems: string[] = [];
	for (const key of FACT_KEYS) {
		const value = facts[key];
		if (value === null || value === undefined || value.trim().length < 3) {
			problems.push(`${key} is unset or empty`);
		} else if (PLACEHOLDER.test(value)) {
			problems.push(`${key} looks like placeholder text`);
		}
	}
	const email = facts.contactEmail?.trim();
	if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
		problems.push("contactEmail is not an e-mail address");
	}
	if (!/^\d{4}-\d{2}-\d{2}$/.test(facts.lastUpdated)) {
		problems.push("lastUpdated must be YYYY-MM-DD");
	}
	if (problems.length === 0) return {};
	return {
		error:
			"The privacy notice cannot ship with unfinished owner facts:\n  - " +
			problems.join("\n  - ") +
			"\nFix: fill them in `src/lib/privacy.ts` with the owner's real values.",
	};
}
