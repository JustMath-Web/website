# GTM and GA4 audit, with consent-state browser test

Date: 2026-10-11. Read-only: nothing in GTM or GA4 was published or changed. Done by Andy (Claude) in the
Chrome profile "Chrome - Google Tools", with Charlie's go-ahead. Reviewed by: pending (Bob).

## 1. Published GTM container

| Item | Value |
|---|---|
| Container | `GTM-KP5SMKV` (account "Just Math", site `mathematicsmalaysia.com`) |
| Published version | **Version 4, Live, Latest.** Published 2026-09-21 by `clientwebmanagement@gmail.com` |
| Version 4 contents | 2 tags, 2 triggers, 1 variable (plus built-in variables). No custom templates |
| Version 4 change | Tag "GA4" deleted; tag "GA4 \| G-6EWT7G0LZS" added |
| Draft workspace | 0 pending changes (Workspace 5) |
| Earlier versions | 3 (2026-09-05), 2 and 1 (2023-03-08, `charliekong.work@gmail.com`) |

### Tags

| Tag | Type | Fires on | Sends to | Consent settings shown |
|---|---|---|---|---|
| `GA4 \| G-6EWT7G0LZS` | Google tag | Triggers "All Pages" (page view) and "Initialization - All Pages" | Tag ID `{{GA4 \| G-6EWT7G0LZS}}` = `G-6EWT7G0LZS` | None (no "Additional consent" or built-in override shown in the version view) |
| `WA Click` | Google Analytics: GA4 Event, event name `wa_click` | Trigger "WA Click" | Measurement ID `{{GA4 \| G-6EWT7G0LZS}}` = `G-6EWT7G0LZS` | None shown |

### Triggers

| Trigger | Type | Condition | Used by |
|---|---|---|---|
| All Clicks | All Elements | none set | no tag (0) |
| WA Click | Click - Just Links | Click URL contains `wa.me` | tag `WA Click` |

Variable: `GA4 | G-6EWT7G0LZS` (Constant) = `G-6EWT7G0LZS`.

Limit: the GTM version view shows no per-tag consent configuration. That is not proof that none exists
(Google tags carry built-in consent checks); the browser test in section 3 is the evidence that matters.

## 2. GA4 property "Just Math Website" (account "Just Math", property 294653675)

| Setting | Observed |
|---|---|
| Web stream | "Just Math Malaysia", `https://mathematicsmalaysia.com/`, stream 3068959153, Measurement ID `G-6EWT7G0LZS`, receiving traffic in the past 48 hours. Matches the container |
| Data retention | Event data **14 months**; user data **14 months**; "Reset on new user activity" **ON** |
| **Google signals data collection** | **ON, allowed in 307 of 307 regions** |
| **Ads personalization** (Advanced settings) | **Allowed in 307 of 307 regions** |
| Granular location and device data collection | ON |
| User-provided data collection (beta) | Not turned on (button reads "Turn on") |
| User-ID collection | Not examined beyond the page text; no User-ID is sent by this site's tags |
| Google Ads links | None ("No links yet") |
| User Data Collection Acknowledgement | Acknowledged |
| Not examined | Consent settings page, Data filters, Data sharing, BigQuery, Search Console link |

The other GA4 property in Charlie's login ("Charlie Kong - GA4", `G-HMMVPEH6L8`) is for `charliekong.me` and is
unrelated to this site.

## 3. Browser test of the three consent states

Method: PR #126 head `8ea9ec3` built (`dist/`), served on this machine, the hostname
`mathematicsmalaysia.com` mapped to the local server with Chromium's `--host-resolver-rules`, because the
tag loader only runs on that hostname. A fresh browser context per state. The real GTM container and the real
GA4 property were contacted. The script is in the appendix.

Not covered: the production `Content-Security-Policy` in `web/public/_headers` was not applied by the local
server, so a request listed below could still be blocked in production; this must be re-run on the live site
after the banner ships. Headless Chromium from Malaysia.

| State | Banner | Google requests | Cookies |
|---|---|---|---|
| 1. Fresh visit, no choice | visible | **none** | **none** |
| 2. Reject, then reload | hidden; `jm-consent-v1` = rejected | **none** | **none** |
| 3. Accept | hidden; `jm-consent-v1` = accepted | 5 (below) | `_ga` and `_ga_6EWT7G0LZS`, domain `.mathematicsmalaysia.com`, expiry 2027-11-15 |
| 4. Accept, then Reject via footer "Cookie settings" | hidden; rejected | the Accept-state requests, plus one further `page_view` (see 3b) | **Depends on timing, see 3b: `_ga_6EWT7G0LZS` survived Reject in 8 of 8 slower runs** |

State 3 requests:

1. `GET https://www.googletagmanager.com/gtm.js?id=GTM-KP5SMKV`
2. `GET https://www.googletagmanager.com/gtag/js?id=G-6EWT7G0LZS`
3. `POST https://analytics.google.com/g/collect` (`tid=G-6EWT7G0LZS`, `gcs=G111` = analytics and ad storage granted, `npa=0` = ads personalization allowed)
4. `POST https://stats.g.doubleclick.net/g/collect` (`tid=G-6EWT7G0LZS`)
5. `GET https://www.google.com.my/ads/ga-audiences` (`tid=G-6EWT7G0LZS`)

### 3b. Follow-up on the Accept then Reject state (added after Bob's review of `e6b31cf`)

Request timing (context-level capture; Reject about 9 s after Accept):

| Time | Event |
|---|---|
| 1.2 s | After Accept: `page_view` to `analytics.google.com/g/collect`, `gcs=G111`; also the two advertising requests |
| 5.6 s | **The footer "Cookie settings" link was clicked (this only opens the banner): a second `page_view` is sent** (`_s=2`, same `sid`, `seg=1`, `gcs=G111`, consent still granted) |
| 9.6 s | Reject clicked; no Google request is recorded after it in this run or the other two runs |

So the extra `collect` Bob asked about is **not sent by Reject**. It is sent when the footer link is
clicked, while consent is still granted. Its cause is not verified (Enhanced measurement page-change
detection is a candidate). Limit: Playwright may not see beacons sent during page unload, so "no request
after Reject" is observed, not proven.

**A real withdrawal defect was found.** After Reject, `_ga` is cleared but `_ga_6EWT7G0LZS` (expiry
2027-11-15) **remains, and stays on the next page load** (still rejected). Results of 8 runs each:

| Reject timing | Cookies left after Reject |
|---|---|
| about 9 s after Accept, with the footer-click `page_view` sent first | `_ga_6EWT7G0LZS` in **8 of 8** runs |
| about 1 s after Accept, no extra `page_view` | none in 8 of 8 runs |

`consent.js` clears every cookie matching `_ga*`, `_gid*`, `_gat*`, `_gcl*` and then reloads, so the cookie
is being written again after the clear (a likely cause: the Google tag writes its session cookie while the
page unloads). That cause is not verified. It means "Reject clears Google cookies" is not reliably true
today. Not fixed in this audit.

## 4. What this means for the notice (findings, not legal conclusions)

1. **The banner does what it says before a choice**: no Google request and no cookie. **After Reject**
   (no previous Accept) the same holds. **After Accept then Reject, a Google cookie can remain** (3b).
2. **After Accept, the site contacts advertising endpoints, not only analytics**: `stats.g.doubleclick.net`
   and `google.com.my/ads/ga-audiences`. GA4 has Google signals and ads personalization ON in all 307
   regions, and `analytics.js` grants `ad_storage`, `ad_user_data` and `ad_personalization` on Accept
   (`gcs=G111`, `npa=0`). **The banner and notice already say Google may use the data for its advertising
   features, in English and Malay** (`ConsentBanner.astro`, `privacyNotice.ts`); an earlier draft of this
   audit wrongly said they describe analytics only. What is open: whether that wording is complete for what
   was observed, and **whether turning off the two GA4 settings would stop these requests is not proven**,
   because the site itself sends the Ads consent signals (Google's 2026 guidance separates those from the
   Google signals setting). GA4 settings are unchanged.
3. **Verified cookie list for the Accept state**: `_ga` and `_ga_6EWT7G0LZS` only, about 13 months
   (Chromium's cap on the observed expiry). `_gid`, `_gat*`, `_gcl*` were not observed.
4. The WhatsApp link tag `wa_click` was not tested by clicking `wa.me`.
5. **Test traffic**: the Accept runs sent a few real test page views to the live GA4 property from a headless
   browser in Malaysia. They do not matter for the notice.

## Appendix: test script (first test; the follow-up scripts differ only in timing and logging)

```js
import { chromium } from "/Users/charlie/Documents/Projects/Personal/Math-wt-privacy/web/node_modules/.pnpm/playwright-core@1.63.0/node_modules/playwright-core/index.mjs";
const URL = "http://mathematicsmalaysia.com/";
const GOOGLE = /googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net|google\.com(\.my)?\/(ads|pagead)\/|googleadservices\.com|g\.co/;
async function run(label, steps) {
	const browser = await chromium.launch({ args: ["--host-resolver-rules=MAP mathematicsmalaysia.com 127.0.0.1:4321"] });
	const ctx = await browser.newContext();
	const page = await ctx.newPage();
	const reqs = [];
	page.on("request", (r) => { if (GOOGLE.test(r.url())) reqs.push(r.method() + " " + r.url().replace(/(\?.{0,140}).*/, "$1")); });
	await page.goto(URL, { waitUntil: "networkidle" });
	await steps(page);
	await page.waitForTimeout(4000);
	const cookies = (await ctx.cookies()).map((c) => `${c.name} (${c.domain}, expires ${c.expires > 0 ? new Date(c.expires * 1000).toISOString().slice(0, 10) : "session"})`);
	const ls = await page.evaluate(() => localStorage.getItem("jm-consent-v1"));
	const banner = await page.locator("#consent-banner").isVisible().catch(() => false);
	console.log(`\n=== ${label} ===\nbanner visible: ${banner}\nlocalStorage jm-consent-v1: ${ls}\nGoogle requests (${reqs.length}):\n${reqs.map((r) => "  " + r).join("\n") || "  none"}\ncookies (${cookies.length}):\n${cookies.map((c) => "  " + c).join("\n") || "  none"}`);
	await browser.close();
}
await run("1. fresh visit, no choice made", async () => {});
await run("2. Reject", async (p) => { await p.locator('#consent-banner [data-consent="reject"]').click(); await p.reload({ waitUntil: "networkidle" }); });
await run("3. Accept", async (p) => { await p.locator('#consent-banner [data-consent="accept"]').click(); await p.waitForLoadState("networkidle"); });
await run("4. Accept then Reject (via footer Cookie settings)", async (p) => { await p.locator('#consent-banner [data-consent="accept"]').click(); await p.waitForTimeout(3000); await p.locator("[data-consent-open]").click(); await p.locator('#consent-banner [data-consent="reject"]').click(); await p.waitForLoadState("networkidle"); });
```
