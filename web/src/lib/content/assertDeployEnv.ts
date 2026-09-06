/**
 * Cross-check that the production sentinel is actually set on production deploys.
 *
 * **The gap this closes.** Every production guard in this codebase is gated on
 * `DEPLOY_ENV === "production"` — the blog's never-render-fixtures rules (`docs/DECISIONS.md`
 * §28/§29) and the landing content guard (§28a). `DEPLOY_ENV` is set in the **Cloudflare dashboard**,
 * not in this repo. If it is ever renamed, cleared, or lost in a project migration, every one of
 * those guards silently degrades to fallback behaviour and **the build still goes green** — shipping
 * fixture copy to the live site while reporting success.
 *
 * `assert-production-fails-without-sanity.mjs` protects against *code* breaking the detection.
 * Nothing protected against the *variable* being absent. That is the same shape as the other
 * unversioned external controls this project has been bitten by: a Search Console meta tag that was
 * the only proof of ownership, and a Sanity husk no repo check could see.
 *
 * **The cross-check.** Cloudflare Workers Builds injects `WORKERS_CI_BRANCH` ("the branch-name from
 * the push event") on every build, and it cannot be forgotten because Cloudflare sets it, not a
 * human. If that says we are building `main` — the production branch — but `DEPLOY_ENV` does not say
 * `production`, the two disagree and the build fails rather than quietly shipping unguarded.
 */

/** The branch whose deploys are production. */
const PRODUCTION_BRANCH = "main";

export interface DeployEnvCheckResult {
	/** Fatal disagreement — the caller should throw. */
	error?: string;
	/** Non-fatal oddity worth printing. */
	warning?: string;
}

/**
 * Pure so it can be asserted in CI without spawning builds. `env` is passed in rather than read from
 * `process.env` for the same reason.
 */
export function checkDeployEnv(
	env: Record<string, string | undefined>,
): DeployEnvCheckResult {
	const ciBranch = env.WORKERS_CI_BRANCH ?? env.CF_PAGES_BRANCH;
	const deployEnv = env.DEPLOY_ENV;

	// Not a Cloudflare build (local dev, GitHub Actions). Nothing to cross-check against — those
	// environments are expected to have no DEPLOY_ENV and to use fallback data.
	if (!ciBranch) return {};

	if (ciBranch === PRODUCTION_BRANCH && deployEnv !== "production") {
		return {
			error:
				`Cloudflare is building "${PRODUCTION_BRANCH}" but DEPLOY_ENV is ` +
				`${deployEnv === undefined ? "not set" : `"${deployEnv}"`}, not "production".\n\n` +
				"Every production guard in this codebase is gated on that variable — the blog's " +
				"never-render-fixtures rules (docs/DECISIONS.md §28/§29) and the landing content " +
				"guard (§28a). With it unset they all silently degrade to fallback behaviour, and " +
				"this build would have shipped fixture copy to the live site while reporting " +
				"success.\n\n" +
				"Fix: set DEPLOY_ENV=production on the Cloudflare production environment for this " +
				"Worker. This check exists because that variable lives in a dashboard, not in this " +
				"repo, and nothing else would have told you it was gone.",
		};
	}

	if (ciBranch !== PRODUCTION_BRANCH && deployEnv === "production") {
		return {
			warning:
				`DEPLOY_ENV=production while Cloudflare is building "${ciBranch}", not ` +
				`"${PRODUCTION_BRANCH}". This preview will enforce production rules — it will fail ` +
				"on incomplete Sanity content rather than falling back. Not dangerous, but probably " +
				"not intended.",
		};
	}

	return {};
}
