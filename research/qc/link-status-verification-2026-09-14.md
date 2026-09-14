# `link_status` — 40 never-checked sources, verified 2026-09-14

Audit sweep #3 has reported `link_status never checked : 40 of 597` for some time. That field is
not decoration: a source whose URL has silently died is the archive's documented worst failure
mode in miniature — the claim stays correct while the evidence behind it stops being reachable.

## Result

| outcome | n | action |
|---|---|---|
| **confirmed live** (HTTP 200, no redirect off the product path) | **22** | `link_status: live`, `last_checked: 2026-09-14` |
| rate-limited (HTTP 429) | 16 | left `unchecked` |
| blocked (HTTP 403, lightake.com) | 1 | left `unchecked` |
| one 404 observed but **not re-verifiable** | 1 | left `unchecked` — see below |

`unchecked` went 40 → 18. Nothing was marked dead.

## The two traps, both tested rather than assumed

**1. Bot-blocking read as death.** Shopify storefronts commonly answer non-browser clients with
403/429, and treating that as `dead` would have silently falsified 17 records. Controls settled
it before anything was written: a real handle (`qiyi-m-pro-3x3`) returned **200** and a
fabricated one (`definitely-not-a-real-product-xyz123`) returned **404**, so this user agent is
not blocked and a 404 from this host is meaningful. The 429s appeared only *after* sustained
requests — they are my own rate-limiting, not the site's opinion of those products. A retry pass
at 6-second spacing still returned 429 for all 16, so the limit is windowed rather than
per-request, and those records stay `unchecked`. **Rate-limited is `blocked`, which is neither
`live` nor `dead`.**

**2. A redirect that returns 200 while the product is gone.** A dead product handle that
redirects to the storefront homepage answers 200, and a status-code-only check would record it
as live. Every one of the 22 was therefore checked with `--location` and its **effective URL
compared against its original product path**. All 22 stayed on their own path; none had moved.
Had any landed on a homepage it would have been `altered` or `dead`, not `live`.

## The one 404, deliberately not acted on

`speedcubeshop-cubetwist-brand-page-2014` (`http://speedcubeshop.com/cubetwist`) returned a clean
**404** on the first pass. Three re-verification attempts, spaced, all returned **429** — the
same host had by then rate-limited this IP, so the observation could not be confirmed.

**One unconfirmed observation is not enough to mark a source dead**, so it was left `unchecked`.
It is the highest-value item in this queue for the next session: a brand page from 2014 is
exactly the kind of URL that does die, and the record already carries an `archive_url`
(`20140630024505`), so its evidence survives regardless of the answer.

## Scope not covered

This checked only the 40 records whose status had *never* been established. The **374** already
marked `live` were not re-checked, and some of those observations are months old. A staleness
pass over them is a separate and larger job; the honest position is that `live` in this archive
means "live when last checked", which is why `last_checked` sits beside it.
