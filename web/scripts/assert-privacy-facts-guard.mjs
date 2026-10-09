#!/usr/bin/env node
// Guards the privacy notice (docs/DECISIONS.md §49). Two parts:
//   1. unit cases for checkPrivacyFacts — the function the production build runs;
//   2. the real facts and the real page, checked as production would see them.
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { checkPrivacyFacts } from "../src/lib/content/assertPrivacyFacts.ts";
import { PRIVACY_FACTS } from "../src/lib/privacy.ts";

const good = {
	ownerName: "Example Sdn Bhd",
	contactEmail: "hello@mathematicsmalaysia.com",
	whatsappRetention: "12 months after the last message",
	analyticsRetention: "14 months",
	lastUpdated: "2026-10-09",
};
const prod = { DEPLOY_ENV: "production" };

// A finished set passes; anything unfinished fails in production only.
assert.equal(checkPrivacyFacts(good, prod).error, undefined);
assert.equal(
	checkPrivacyFacts({ ...good, ownerName: null }, {}).error,
	undefined,
	"non-production never blocks",
);
for (const [name, bad] of Object.entries({
	null: { ownerName: null },
	empty: { ownerName: "" },
	whitespace: { ownerName: "   " },
	bracket: { contactEmail: "[email]" },
	todo: { whatsappRetention: "TODO" },
	tbd: { analyticsRetention: "TBD" },
	xxx: { whatsappRetention: "xxx months" },
	badEmail: { contactEmail: "not-an-email" },
	badDate: { lastUpdated: "yesterday" },
})) {
	assert.ok(
		checkPrivacyFacts({ ...good, ...bad }, prod).error,
		`should reject: ${name}`,
	);
}

// The real facts, judged as production would.
const real = checkPrivacyFacts(PRIVACY_FACTS, prod);
assert.equal(real.error, undefined, real.error);

// The real page has both languages and every s.7(1) heading.
const page = readFileSync(
	new URL("../src/pages/privacy.astro", import.meta.url),
	"utf8",
);
for (const lang of ["en", "ms"]) {
	assert.ok(
		page.includes(`id="notice-${lang}" lang="${lang}"`),
		`missing ${lang} section`,
	);
	for (const id of [
		"who",
		"collect",
		"source",
		"rights",
		"recipients",
		"choices",
		"voluntary",
		"children",
		"retention",
		"changes",
	]) {
		assert.ok(
			page.includes(`id="${id}-${lang}"`),
			`missing heading ${id}-${lang}`,
		);
	}
}
console.log("privacy facts guard: ok");
