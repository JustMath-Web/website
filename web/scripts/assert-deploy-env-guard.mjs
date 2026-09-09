#!/usr/bin/env node
// CI guardrail for the DEPLOY_ENV cross-check (src/lib/content/assertDeployEnv.ts).
//
// Why this exists. Every production guard in this codebase is gated on DEPLOY_ENV === "production",
// and that variable is set in the CLOUDFLARE DASHBOARD, not in this repo. If it is renamed, cleared
// or lost in a project migration, the blog's never-render-fixtures rules (docs/DECISIONS.md §28/§29)
// and the landing content guard (§28a) all silently degrade to fallback behaviour and the build goes
// green — shipping fixture copy to the live site while reporting success.
//
// assert-production-fails-without-sanity.mjs protects against CODE breaking the detection. This
// protects against the VARIABLE being absent, which nothing else did.

import { strict as assert } from "node:assert";

const { checkDeployEnv } =
	await import("../src/lib/content/assertDeployEnv.ts");

// THE REGRESSION THAT MATTERS: Cloudflare deploying main with the sentinel gone.
const lost = checkDeployEnv({ WORKERS_CI_BRANCH: "main" });
assert.ok(
	lost.error,
	"building main with DEPLOY_ENV unset must fail the build",
);
assert.match(
	lost.error,
	/not set/,
	"the error should say the variable is not set",
);
assert.match(
	lost.error,
	/DEPLOY_ENV=production/,
	"the error must say how to fix it",
);

// Renamed/typo'd to something plausible but wrong.
assert.ok(
	checkDeployEnv({ WORKERS_CI_BRANCH: "main", DEPLOY_ENV: "prod" }).error,
	'DEPLOY_ENV="prod" is not "production" and must fail',
);

// The correct production deploy passes.
assert.deepEqual(
	checkDeployEnv({ WORKERS_CI_BRANCH: "main", DEPLOY_ENV: "production" }),
	{},
	"a correctly configured production deploy must pass cleanly",
);

// A preview deploy without the sentinel is normal, not an error.
assert.deepEqual(
	checkDeployEnv({ WORKERS_CI_BRANCH: "some-feature" }),
	{},
	"preview branches without DEPLOY_ENV are expected",
);

// Production rules on a preview branch: odd, worth saying, not fatal.
const inverted = checkDeployEnv({
	WORKERS_CI_BRANCH: "some-feature",
	DEPLOY_ENV: "production",
});
assert.ok(inverted.warning, "production rules on a preview branch should warn");
assert.ok(!inverted.error, "...but must not fail the build");

// Not a Cloudflare build at all (local, GitHub Actions): nothing to cross-check.
assert.deepEqual(
	checkDeployEnv({}),
	{},
	"a non-Cloudflare build must be a no-op",
);
assert.deepEqual(
	checkDeployEnv({ DEPLOY_ENV: "production" }),
	{},
	"no CI branch means no cross-check, even with DEPLOY_ENV set",
);

// The legacy Pages variable still works, since the project migrated from Pages (DECISIONS §32).
assert.ok(
	checkDeployEnv({ CF_PAGES_BRANCH: "main" }).error,
	"CF_PAGES_BRANCH should be honoured as a fallback source of the branch name",
);

console.log(
	"OK: deploy-env guard fails a main deploy with a missing or wrong DEPLOY_ENV, passes a correct " +
		"one, and stays silent off Cloudflare.",
);
