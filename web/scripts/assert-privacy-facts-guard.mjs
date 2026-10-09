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
	whatsappRetention: {
		en: "12 months after the last message",
		ms: "12 bulan selepas mesej terakhir",
	},
	analyticsRetention: { en: "14 months", ms: "14 bulan" },
	lastUpdated: "2026-10-09",
	copyApprovedOn: "2026-10-10",
};
const prod = { DEPLOY_ENV: "production" };

// A finished set passes; anything unfinished fails in production only.
assert.equal(checkPrivacyFacts(good, prod).error, undefined);
assert.equal(
	checkPrivacyFacts({ ...good, ownerName: null }, {}).error,
	undefined,
	"non-production never blocks",
);

// Each case breaks ONE thing and the error must name that field.
const cases = {
	"ownerName null": [{ ownerName: null }, "ownerName"],
	"contactEmail null": [{ contactEmail: null }, "contactEmail"],
	"whatsappRetention.en null": [
		{ whatsappRetention: { ...good.whatsappRetention, en: null } },
		"whatsappRetention.en",
	],
	"whatsappRetention.ms null": [
		{ whatsappRetention: { ...good.whatsappRetention, ms: null } },
		"whatsappRetention.ms",
	],
	"analyticsRetention.en null": [
		{ analyticsRetention: { ...good.analyticsRetention, en: null } },
		"analyticsRetention.en",
	],
	"analyticsRetention.ms null": [
		{ analyticsRetention: { ...good.analyticsRetention, ms: null } },
		"analyticsRetention.ms",
	],
	"ownerName undefined": [{ ownerName: undefined }, "ownerName"],
	"ownerName 2 chars": [{ ownerName: "ab" }, "ownerName"],
	"ownerName whitespace": [{ ownerName: "   " }, "ownerName"],
	"bracket in ownerName": [{ ownerName: "[owner name]" }, "ownerName"],
	"bracket in en retention": [
		{ whatsappRetention: { ...good.whatsappRetention, en: "[12] months" } },
		"whatsappRetention.en",
	],
	"mixed-case Todo": [
		{ analyticsRetention: { ...good.analyticsRetention, ms: "Todo" } },
		"analyticsRetention.ms",
	],
	"N/A": [{ ownerName: "N/A" }, "ownerName"],
	TBC: [{ ownerName: "TBC" }, "ownerName"],
	"to be confirmed": [{ ownerName: "To be confirmed" }, "ownerName"],
	"???": [{ ownerName: "???" }, "ownerName"],
	"bad date": [{ lastUpdated: "yesterday" }, "lastUpdated"],
	"impossible date": [{ lastUpdated: "2026-02-30" }, "lastUpdated"],
	"9999-99-99": [{ lastUpdated: "9999-99-99" }, "lastUpdated"],
	"bad email": [{ contactEmail: "not-an-email" }, "contactEmail is not"],
	"a@b.x email": [{ contactEmail: "a.b@c.x" }, "contactEmail is not"],
	"copyApprovedOn null": [{ copyApprovedOn: null }, "copyApprovedOn"],
	"copyApprovedOn impossible": [
		{ copyApprovedOn: "2026-13-01" },
		"copyApprovedOn",
	],
};
for (const [name, [bad, field]] of Object.entries(cases)) {
	const { error } = checkPrivacyFacts({ ...good, ...bad }, prod);
	assert.ok(error, `should reject: ${name}`);
	assert.ok(
		error.includes(field),
		`${name}: error should name ${field}, got: ${error}`,
	);
	const lines = error.split("\n").filter((l) => l.startsWith("  - "));
	assert.equal(
		lines.length,
		1,
		`${name}: should isolate one problem, got ${lines.length}`,
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
