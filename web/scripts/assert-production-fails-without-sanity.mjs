#!/usr/bin/env node
// CI guardrail for docs/DECISIONS.md §29's production-fetch-failure policy: a production build that
// cannot get real Sanity data must fail outright, never silently render an empty/placeholder blog
// state. Bob's PR #28 review flagged that this branch (web/src/lib/content/blogData.ts's
// resolveBlogSource()) was only ever verified by manually running the build locally -- this script
// makes that verification automatic and repeatable in CI, so a future regression (e.g. someone
// removing the throw, or breaking VERCEL_ENV detection) fails the build instead of going unnoticed.
//
// Runs a real `astro build` with VERCEL_ENV=production and no Sanity config (explicitly cleared, not
// just unset, in case CI's own environment ever gains Sanity secrets for an unrelated reason) and
// asserts it fails with the expected error -- not just "any" failure, so an unrelated build breakage
// doesn't get misread as this guardrail passing.

import { spawnSync } from "node:child_process";

const EXPECTED_MESSAGE_FRAGMENT = "Sanity is not configured";

const result = spawnSync("pnpm", ["exec", "astro", "build"], {
	encoding: "utf8",
	env: {
		...process.env,
		VERCEL_ENV: "production",
		PUBLIC_SANITY_PROJECT_ID: "",
		PUBLIC_SANITY_DATASET: "",
		USE_BLOG_FIXTURES: "",
	},
});

const output = `${result.stdout ?? ""}${result.stderr ?? ""}`;
const failedAsExpected =
	result.status !== 0 && output.includes(EXPECTED_MESSAGE_FRAGMENT);

if (failedAsExpected) {
	console.log(
		"OK: production build correctly failed without Sanity config (blogData.ts's production-never-fixtures guardrail is working).",
	);
	process.exit(0);
}

if (result.status === 0) {
	console.error(
		"FAIL: a production build with no Sanity config and no fixture flag succeeded -- it should have " +
			"failed. This means blogData.ts's production-fetch-failure policy (docs/DECISIONS.md §29) is " +
			"broken: production could now silently ship an empty/placeholder blog state instead of failing " +
			"loudly.",
	);
} else {
	console.error(
		`FAIL: the build failed, but not with the expected error ("${EXPECTED_MESSAGE_FRAGMENT}") -- ` +
			"this looks like an unrelated build breakage, not confirmation that the production guardrail " +
			"itself is working. Build output:\n" +
			output,
	);
}
process.exit(1);
