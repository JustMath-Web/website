#!/usr/bin/env node
/**
 * Weekly content-review watchdog. Two independent checks, one workflow:
 *
 *   1. CALENDAR  — items in .github/content-review.json that have fallen due.
 *   2. SOURCE    — has Lembaga Peperiksaan changed what it says about Matriks Pembelajaran?
 *
 * Why both. The calendar knows WHEN to look but not IF something changed; the source watch knows
 * something changed but not what it means for the page. The failure this guards against is the one
 * nothing else catches: the site's dated policy claims going stale silently. No test fails, no build
 * breaks, no alert fires — the page just quietly starts describing an exam that already happened.
 *
 * This script NEVER edits copy. It opens a GitHub issue and stops. Rewriting is a human decision —
 * see docs/DECISIONS.md §13a.
 *
 * Deliberately dependency-free: Node's built-in fetch, no third-party crawler, no API key, nothing
 * to expire or bill. The LP pages are server-rendered Joomla and their text is present in the raw
 * HTML (verified 2026-09-06), so JS rendering buys nothing here.
 */

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(HERE, "..", "..");
const CALENDAR = join(REPO_ROOT, ".github", "content-review.json");
const SNAPSHOT_DIR = join(REPO_ROOT, ".github", "content-review-snapshots");

/** Pages whose wording the site's claims depend on. Narrow on purpose — see WATCH_NOISE below. */
const WATCHED = [
	{
		id: "lp-matriks-pembelajaran",
		label: "Lembaga Peperiksaan — Matriks Pembelajaran",
		url: "https://lp.moe.gov.my/index.php/peperiksaan-pentaksiran/matriks-pembelajaran",
	},
];

/**
 * WATCH_NOISE: a whole-page hash on a government CMS fires on every unrelated edit — a new banner,
 * a rotated notice, a changed footer year. So the comparison runs over KEYWORD-MATCHING LINES ONLY.
 * That trades some recall (a change phrased without these words is missed) for a signal that is
 * actually worth reading. A watchdog nobody trusts gets muted, and a muted watchdog is worse than
 * none.
 */
const KEYWORDS =
	/matriks|pembelajaran|tahun\s*4|tingkatan\s*3|mpt4|matematik|jadual|instrumen/i;

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has("--dry-run");

function today() {
	return (process.env.REVIEW_TODAY || new Date().toISOString().slice(0, 10));
}

/** Strip markup to visible text, keep only on-topic lines, normalise whitespace. */
function extractSignal(html) {
	const text = html
		.replace(/<script[\s\S]*?<\/script>/gi, " ")
		.replace(/<style[\s\S]*?<\/style>/gi, " ")
		.replace(/<[^>]+>/g, "\n")
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&quot;/g, '"')
		.replace(/&#039;|&apos;/g, "'");
	const lines = text
		.split("\n")
		.map((l) => l.replace(/\s+/g, " ").trim())
		.filter((l) => l.length > 3 && KEYWORDS.test(l));
	return [...new Set(lines)].sort();
}

async function fetchSignal(url) {
	const res = await fetch(url, {
		headers: { "user-agent": "just-math-content-review-bot (+github actions)" },
		signal: AbortSignal.timeout(30_000),
	});
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return extractSignal(await res.text());
}

function readSnapshot(id) {
	const p = join(SNAPSHOT_DIR, `${id}.json`);
	if (!existsSync(p)) return null;
	try {
		return JSON.parse(readFileSync(p, "utf8"));
	} catch {
		return null;
	}
}

function writeSnapshot(id, lines) {
	mkdirSync(SNAPSHOT_DIR, { recursive: true });
	const body = {
		_comment:
			"Auto-maintained by .github/scripts/check-content-review.mjs. Do not hand-edit; " +
			"delete the file to reset the baseline.",
		capturedAt: new Date().toISOString(),
		hash: createHash("sha256").update(lines.join("\n")).digest("hex"),
		lines,
	};
	writeFileSync(join(SNAPSHOT_DIR, `${id}.json`), JSON.stringify(body, null, 2) + "\n");
}

// ---------------------------------------------------------------- check 1: calendar

function dueCalendarItems() {
	const cal = JSON.parse(readFileSync(CALENDAR, "utf8"));
	const now = today();
	return cal.items.filter((i) => !i.done && i.dueOn <= now);
}

function calendarIssue(item) {
	const lines = [
		`**Owner: ${item.owner}** · due ${item.dueOn}`,
		"",
		"### Why this matters now",
		item.why,
		"",
		"### The exact strings to re-check",
		...item.strings.map((s) => `- ${s}`),
	];
	if (item.decideAlso) {
		lines.push("", "### A decision, not just an edit", item.decideAlso);
	}
	lines.push(
		"",
		"### Where each one lives",
		...item.editIn.map((s) => `- ${s}`),
		"",
		"> **The live page is Sanity, not the repo.** Changing the repo alone does not change what",
		"> visitors see. Edit Sanity, then keep the repo source in step so the two do not drift.",
	);
	if (item.sources?.length) {
		lines.push("", "### Check against", ...item.sources.map((s) => `- ${s}`));
	}
	lines.push(
		"",
		"---",
		`When this is done, set \`"done": true\` on \`${item.id}\` in \`.github/content-review.json\`` +
			" with a dated note, and close this issue. Do not delete the entry — the record is the point.",
	);
	return { title: `[content review] ${item.title}`, body: lines.join("\n") };
}

// ---------------------------------------------------------------- check 2: source watch

async function sourceChanges() {
	const out = [];
	for (const w of WATCHED) {
		let now;
		try {
			now = await fetchSignal(w.url);
		} catch (err) {
			// A fetch failure is not a content change. Report it quietly rather than crying wolf,
			// but do not fail the run — a flaky government site must not become a red CI badge.
			console.warn(`WARN  could not fetch ${w.id}: ${err.message}`);
			continue;
		}
		const prev = readSnapshot(w.id);
		writeSnapshot(w.id, now);

		if (!prev) {
			console.log(`BASELINE  ${w.id}: captured ${now.length} lines (first run, no alert)`);
			continue;
		}
		const added = now.filter((l) => !prev.lines.includes(l));
		const removed = prev.lines.filter((l) => !now.includes(l));
		if (!added.length && !removed.length) {
			console.log(`OK  ${w.id}: unchanged (${now.length} lines)`);
			continue;
		}
		out.push({ watch: w, added, removed, since: prev.capturedAt });
	}
	return out;
}

function sourceIssue(change) {
	const cap = (arr, n = 25) =>
		arr.slice(0, n).map((l) => `- ${l}`).concat(arr.length > n ? [`- …and ${arr.length - n} more`] : []);
	return {
		title: `[content review] Source changed: ${change.watch.label}`,
		body: [
			`\`${change.watch.url}\` changed since ${change.since}.`,
			"",
			"Only lines mentioning Matriks Pembelajaran / Tahun 4 / Tingkatan 3 / Matematik / jadual /",
			"instrumen are compared, so this is on-topic rather than any edit to the page.",
			"",
			...(change.added.length ? ["### Added", ...cap(change.added), ""] : []),
			...(change.removed.length ? ["### Removed", ...cap(change.removed), ""] : []),
			"### What to do",
			"Read the page and decide whether anything the site claims is now wrong — the dates, the",
			"'four papers' / 'five papers' counts, the diagnostic-not-ranking framing, or the Form 3",
			"rollout year. **A change here does not mean the copy is wrong**; it means it is worth a look.",
			"",
			"If the copy needs changing, edit **Sanity first** (that is the live page), then the repo",
			"source. If nothing needs changing, just close this issue — the snapshot has already moved on.",
		].join("\n"),
	};
}

// ---------------------------------------------------------------- issue plumbing

async function openIssues(issues) {
	const token = process.env.GITHUB_TOKEN;
	const repo = process.env.GITHUB_REPOSITORY;
	if (!token || !repo) throw new Error("GITHUB_TOKEN and GITHUB_REPOSITORY are required");
	const api = `https://api.github.com/repos/${repo}/issues`;
	const headers = {
		authorization: `Bearer ${token}`,
		accept: "application/vnd.github+json",
		"content-type": "application/json",
	};

	// Never open the same issue twice. Matching on title keeps this idempotent across weekly runs.
	const existingRes = await fetch(`${api}?state=open&per_page=100`, { headers });
	const existing = existingRes.ok ? await existingRes.json() : [];
	const openTitles = new Set(existing.map((i) => i.title));

	for (const issue of issues) {
		if (openTitles.has(issue.title)) {
			console.log(`SKIP  already open: ${issue.title}`);
			continue;
		}
		const res = await fetch(api, {
			method: "POST",
			headers,
			body: JSON.stringify({ title: issue.title, body: issue.body }),
		});
		console.log(res.ok ? `OPENED  ${issue.title}` : `FAILED  ${issue.title}: HTTP ${res.status}`);
	}
}

// ---------------------------------------------------------------- main

const due = dueCalendarItems();
const changes = await sourceChanges();
const issues = [...due.map(calendarIssue), ...changes.map(sourceIssue)];

console.log(
	`\ncalendar: ${due.length} due · source: ${changes.length} changed · today ${today()}`,
);

if (!issues.length) {
	console.log("nothing to report");
} else if (DRY_RUN) {
	for (const i of issues) console.log(`\n--- WOULD OPEN ---\n${i.title}\n\n${i.body}\n`);
} else {
	await openIssues(issues);
}
