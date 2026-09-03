# Agent A — QiYi identity remediation (theqiyi-about-us blocker)

Scope: replace or downgrade the six (+two) attestations resting on `theqiyi-about-us`
(`kind: manufacturer_official`, confirmed by the main session to be an Amazon-affiliate page on
an 11-month-old domain). Research memo only — no `data/` edits made in this worktree.

**Headline finding**: a genuine, decade-old, ICP-registered Chinese corporate site —
`qiyitoys.net` — exists, is currently live, and independently states nearly every fact
`theqiyi-about-us` was relied on for, several in more detail and one materially differently
(the X-Man Design "independent designer" claim). This resolves essentially the whole blocker
with replacement tier-1 evidence, not just downgrades.

---

## A1 — Is `theqiyi.com` QiYi's, and is `qiyicube.com` currently QiYi's?

**Method**: `whois -h whois.verisign-grs.com <domain>` (registry-level, not proxied/redacted for
these) plus `npm run wayback -- list/prefix/get`.

**theqiyi.com**
- WHOIS: `Creation Date: 2025-10-10T17:02:25Z`, registrar **Unstoppable Domains Inc.**,
  nameservers Cloudflare. The domain is **11 months old** as of 2026-09-03.
- Wayback: `list https://theqiyi.com/` → **no captures**. `list
  https://theqiyi.com/about-us.html` → **exactly one capture, dated 2026-09-02** — the capture
  the main session itself triggered by fetching the page yesterday. There is no bulk-crawl or
  historical footprint at all, at any prior date.
- Live `curl -sI`: 200, served via Cloudflare, `last-modified: Wed, 03 Dec 2025`.
- Conclusion: **theqiyi.com cannot have been QiYi's site "since 1998" or at any point before
  October 2025.** It is a brand-new domain. Combined with the main session's Amazon Associates
  footer finding, the most plausible reading is an affiliate/SEO site built recently around the
  QiYi name, not a QiYi property that "changed hands" from something legitimate — there is
  nothing to have changed hands *from* on this domain.

**qiyicube.com**
- WHOIS: `Creation Date: 2025-09-02T01:58:23Z`, registrar **Dynadot Inc**, nameservers
  `*.aboveDomains.com`. Also **~1 year old**, registered five weeks before theqiyi.com.
- Wayback (`prefix https://qiyicube.com`, `list`): genuine content 2018-08-07 through
  2018-12-10 (WordPress/WooCommerce assets, `wp-content/themes/savoy`, `woocommerce` plugin
  files) — a real storefront in that window (see A2). Stray 2017 captures under the same
  hostname resolve to torrent-index content, i.e. the domain had at least one unrelated use
  before the WooCommerce store existed; not chased further as it predates the QiYi-relevant
  window and doesn't affect the 2018 storefront's validity.
- By **2024-03-21**, the site serves a domain-parking stub (`window.park = ...`,
  `abovedomains.com` parking script) — the domain had already lapsed by then.
- Live `curl`: currently serves an **AboveDomains "this domain may be for sale" parking page**
  (fetched 2026-09-03) — title `qiyicube.com`, `assets.abovedomains.com/javascript/forsale.min.js`.
- Conclusion: **qiyicube.com was genuinely QiYi's storefront in 2018 (confirmed, distinct
  finding from A2), lapsed at some point after that, sat parked by 2024, and was re-registered
  by an unrelated party in September 2025** — five weeks before theqiyi.com was registered by a
  different registrar. The near-simultaneous re-registration of both QiYi-adjacent domains in
  Sept–Oct 2025 is circumstantially consistent with domain-squatting/affiliate activity
  targeting the brand name, though I did not find direct evidence the two registrations are the
  same actor (different registrars) — flagged as a plausible but unconfirmed pattern, not
  asserted as fact.
- **`qiyicube-storefront-2018.yml` remains valid** as historical tier-1 evidence for its own
  2018 window; it is already correctly marked `link_status: dead`. No change needed there beyond
  what's noted in A7/A8.

## A2 — QiYi's real official web presence

**`qiyitoys.net`** — strong positive evidence of legitimacy, all found via `wayback.mjs`:
- WHOIS: `Creation Date: 2015-12-20T07:16:15Z`, registrar **Alibaba Cloud Computing (Beijing)
  Co., Ltd.** (a mainland Chinese registrar — consistent with a domestically-filed Chinese
  corporate site).
- Wayback: **continuous captures from 2016-07-04 to 2026-07-12** (40 distinct top-level
  captures; hundreds of subpages under `/category/`, `/detail/`, `/col.jsp` etc.), i.e. an
  actively maintained site for a decade, not a one-off page.
- Content: bilingual (Chinese/English) corporate site with a genuine CMS (session/AJAX
  endpoints — `login_h.jsp`, `mgClue_h.jsp` — typical of a real Chinese enterprise site
  builder, not a static template).
- Carries a **government ICP filing** `粤ICP备2021105271号` and a **public-security network
  filing** `粤公网安备44051502000649号` on every page — both are Chinese government-mandated
  registrations tied to a specific legal entity and administratively difficult to obtain/fake.
- States its own legal name in copyright: `©广东奇艺魔方格科教实业有限公司版权所有`
  ("Guangdong QiYi MoFangGe Science-Education Industrial Co., Ltd. All rights reserved").
- The 2016-07-04 capture already sells `X-Man Design风三阶` (X-Man Design "Feng"/Tornado 3x3)
  alongside 魔方格SQ-1, 斗牛三阶 (Bullfight), 雷霆三阶 (Thunderclap), 勇士 (Warrior), 启航三阶/四阶
  (Sail) — i.e. this domain was already the point of sale for both QiYi's own numbered range
  *and* X-Man Design products in 2016, ten years before the affiliate page.
- The `col.jsp?id=101` "About Us / Company History" page (present in the 2025-07-10 and
  2026-07-12 captures, content identical between them — i.e. current as of the most recent
  capture) is extraordinarily rich; full excerpt reproduced in A3–A6 below.

**Candidate comparison:**
| Domain | Registered | Continuous history | Government filings | Current content |
|---|---|---|---|---|
| `theqiyi.com` | 2025-10-10 | none before 2026-09-02 | none found | Amazon-affiliate page |
| `qiyicube.com` | re-registered 2025-09-02 (genuine use 2018–~2019) | broken (parked ~2024) | none found | "domain may be for sale" |
| `qiyitoys.net` | 2015-12-20 | 2016 → 2026, unbroken | ICP + public-security filings | active bilingual corporate site |

**Conclusion**: `qiyitoys.net` is, on all available evidence, **QiYi's genuine, current, and
long-standing official web presence**. It should replace `theqiyi.com` as the manufacturer's
`website` value (an actual field-value question, out of my write lane — flagged for the main
session in A7/A8). `qiyicube.com` was QiYi's own storefront in 2018 (a real historical fact,
already correctly captured by `qiyicube-storefront-2018`) but is **not** QiYi's site today and
should not be treated as a live `website` candidate.

**Disconfirmation attempted**: I looked for evidence `qiyitoys.net` might be an unrelated or
copycat operation — a decade of continuous crawl history under one of the world's largest
domain registrars for mainland China (Aliyun), a government ICP/public-security filing pair
(hard to obtain fraudulently and tied to a specific registered legal entity), a named deputy
general manager and phone/QQ/WeChat contact details, and a multi-year dated corporate history
with externally-checkable claims (see A5/A6) together make the "copycat" reading very unlikely.
I could not independently query China's MIIT ICP database to confirm the filing number resolves
to this exact entity name (see "Left undone" below — my `WebSearch` budget was exhausted
mid-task by prior session usage) — recorded as a residual gap, not treated as a weakness in the
finding itself, since the on-page evidence is already well beyond what `theqiyi-about-us` ever
had.

## A3 — Primary evidence for corporate identity

`qiyitoys.net`'s `col.jsp?id=101` page (2025-07-10 capture, content unchanged in the 2026-07-12
capture) states, in its own first-person "About Us" section:

> 广东奇艺魔方格科教实业有限公司成立于1998年，坐落在美丽的海滨城市，有着"玩具之都"之称的汕头市澄海区。公司厂房使用面积三万多平方米，是一家集研发、生产及销售为一体的专业魔方品牌公司…

("Guangdong QiYi MoFangGe Science-Education Industrial Co., Ltd. was established in 1998,
located in the coastal city known as the 'Toy Capital,' Shantou's Chenghai District. The
company's factory covers over 30,000 square metres, and is a professional cube-brand company
integrating R&D, production and sales…")

The `col.jsp?id=105` "Contact Us" page additionally gives:
- Legal entity + address: 广东奇艺魔方格科教实业有限公司, 汕头市澄海区莲下立德工业区园林3路3号,
  phone 0754-85160545, deputy general manager 胡叶枫 (Hu Yefeng).
- A second, older/related entity at a neighbouring address: 汕头市澄海区莲下奇艺塑料厂 ("Shantou
  Chenghai Lianxia QiYi Plastics Factory") — independently corroborating the "started as a
  plastic toy manufacturer" origin story without relying on the affiliate page for it.

**Correction to the existing record**: `data/manufacturers/qiyi.yml` currently lists the alias
`"GuangDong QiYi MoFangGe Science & Technology Industrial Co., Ltd."` (科技 = "science &
technology"). The genuine site's own self-stated name is **科教实业** ("Science-Education
Industrial"), not 科技. This is a small but real discrepancy — flagged for the main session; I
did not edit the file. It is possible both are informally-translated renderings of the same
Chinese name used by different retailers, but 科教 ≠ 科技 in Chinese and only one can be the
literal translation of the ICP-filed entity name.

**Country/location: `CN`, Shantou, Guangdong** — now confirmed via a second, independent,
tier-1, genuine first-party source. Confidence: **High**.

## A4 — X-Man Design's relationship to QiYi

The `col.jsp?id=101` company-history timeline (发展历程) has a dated entry:

> 2015 奇艺首席设计师张小静创立"XMD"品牌，即奇艺魔方格旗下的旗舰品牌，以"创新、专业、精益求精"的态度打造顶尖速拧魔方产品。

("2015 — QiYi's chief designer Zhang Xiaojing founded the 'XMD' brand, i.e. QiYi MoFangGe's own
flagship brand under it, building top-tier speedcubes with an attitude of 'innovation,
professionalism, relentless refinement.'")

And the homepage's "current sub-brands" statement (unchanged 2025→2026):

> 旗下现有4个子品牌，分别是"奇艺魔方"、"奇艺益智玩具"、"魔方格"和"X-MAN DESIGN"。

("[QiYi] currently has 4 sub-brands under it: 'QiYi Mofang' [QY Cube], 'QiYi Yizhi Toys' [QY
Toys], 'MoFangGe', and 'X-MAN DESIGN'.")

**This is stronger, first-party, genuine evidence for `kind: sub_brand` / `parent_id: qiyi` than
the affiliate page ever provided** — an explicit "旗下" (under its umbrella) framing, a founding
date, and a named internal founder.

**Contradiction to flag, not silently absorb**: `theqiyi-about-us` (the affiliate page) frames
X-Man as *"an independent designer known as X-Man"* — i.e. an outside collaborator. The genuine
`qiyitoys.net` history instead names **张小静 (Zhang Xiaojing) as QiYi's own in-house chief
designer (奇艺首席设计师)** who created XMD as an internal flagship line. These are materially
different claims about the same fact (outside collaborator vs. in-house staff designer). The
genuine, tier-1, ICP-registered source should be preferred; the affiliate page's "independent
designer" framing looks like marketing simplification or an actual error, not a corroborating
detail. Recommend the main session's replacement wording drop "independent designer" language
and record the designer's name (Zhang Xiaojing / 张小静) with a 2015 founding date instead — a
`notes`/`description` change I'm flagging, not making.

Confidence: **High** that X-Man Design is a QiYi sub-brand; **High** that the "independent
designer" characterization should be corrected.

## A5 — QiYi's founding date

`qiyitoys.net`'s About text states **成立于1998年 ("established in 1998")** directly and in its
own first-person corporate voice — independently corroborating the 1998 value without relying
on the affiliate page.

The **2008 pivot** detail also finds independent, genuine-source support. The company-history
timeline's first entry:

> 2008 以"打造高性价比、普及类魔方产品"作为品牌路线，让每一个玩家都能体验到速拧魔方带来的乐趣。

("2008 — adopted 'building cost-effective, mass-market cube products' as the brand's product
direction, so every player could experience the fun speedcubing brings.")

This is not verbatim identical to the affiliate page's "officially pivoted into speed cube
development and launched its dedicated cube brand in 2008," but it is the **same year and the
same substance** (a 2008 shift toward cube products as the brand's focus), from an independent,
genuine, tier-1 source. I read this as substantive corroboration, not mere coincidence of
wording (the two sources do not share phrasing, which argues against one having copied the
other).

The Speedsolving wiki's "founding date unknown" should be read as the wiki's own gap, not as
counter-evidence — it is tier 4 and states absence of knowledge, not a competing date.

Confidence: **High** for 1998 founding; **High** for 2008 as the year cube production became
the brand's stated direction (though I would keep this as a distinct "brand pivot" fact in
`notes`, not a second `founded` date, consistent with how the record already handles it).

## A6 — What this means for `qiyi-valk`

This is the most consequential finding. The company-history timeline has a dated 2016 entry:

> 2016 公司携手著名魔方选手 Mats Valk 创立专业速拧魔方品牌"The Valk"。2016年6月 Valk3上市，得到玩家的高度赞扬。

("2016 — the company [QiYi itself, 公司] partnered with well-known cuber Mats Valk to found the
professional speedcubing brand 'The Valk.' In June 2016, the Valk3 launched to high acclaim.")

This is a **direct, explicit, first-party, genuine-source statement that QiYi itself (公司,
"the company" — not X-Man Design) created and owns "The Valk"** as its own brand, with a dated
2016 founding and a specific June 2016 Valk3 launch date (which, notably, is *earlier* and more
specific than the "circa 2018" currently recorded in `qiyi-valk.yml`'s `introduced` field — a
lead for pass 2/3, not something I'm resolving here since it's a family-record edit).

The task brief is correct that the previous counter-evidence ("QiYi's own about-us page doesn't
mention Valk") came from the affiliate page and was accordingly weak. That specific omission is
now **independently reconfirmed** by the genuine `qiyitoys.net` homepage, which also lists only
4 current sub-brands and does not include Valk among them. But the *history* page's 2016 entry
is far more decisive than the omission ever was: it doesn't just fail to contradict `qiyi` as
`manufacturer_id`, it **directly states it**, distinctly and separately from the 2015 XMD entry
in the same timeline (two different timeline entries, two different creators — "QiYi's chief
designer" for XMD in 2015 vs. "the company" partnering with Mats Valk for Valk in 2016).

**Recommendation**: `qiyi-valk` `/manufacturer_id` should move from `uncertain` to
**`confirmed`** (a single tier-1 source stating it directly satisfies the confidence table's
"confirmed" bar), citing a new `qiyitoys-net-about-history` source, with the existing
Speedsolving-wiki/2018-storefront "two parallel listings" reasoning retained as corroborating
context in `description` rather than as the load-bearing evidence. This is a `data/families/`
edit outside my write lane — flagged for the main session or `model-researcher`, not made here.

Confidence: **High**.

## A7 — The eight affected attestations, one by one

| # | Record `/pointer` | Current confidence/sources | Replacement found | Recommendation |
|---|---|---|---|---|
| 1 | `qiyi` `/country` | confirmed, [theqiyi-about-us] only | Yes — qiyitoys-net-about-history states Shantou/Guangdong directly | Keep confirmed; swap/add source |
| 2 | `qiyi` `/founded` | confirmed, [theqiyi-about-us] only | Yes — qiyitoys-net-about-history states "成立于1998年" directly, + independent 2008-pivot corroboration | Keep confirmed; swap/add source |
| 3 | `qiyi` `/website` | confirmed, [theqiyi-about-us] only, value=`https://theqiyi.com/` | Yes, but the **value itself is wrong**, not just the source | Change value to `https://www.qiyitoys.net/`; confirmed; new source |
| 4 | `x-man-design` `/kind` | confirmed, [theqiyi-about-us] only | Yes — qiyitoys-net-about-history's "旗下现有4个子品牌...X-MAN DESIGN" + 2015 XMD founding entry, stronger than before | Keep confirmed; swap/add source; correct "independent designer" wording in notes |
| 5 | `x-man-tornado` `/positioning` | confirmed, [theqiyi-about-us] only | Yes — qiyitoys-net-homepage-current's "风三阶四代...为世界纪录而生" + history's "XMD 品牌发布年度旗舰三阶风二代/三代" (explicit 旗舰/"flagship") | Keep confirmed; swap/add source |
| 6 | `x-man-tornado` `/aliases` | confirmed, [theqiyi-about-us] only | Yes, and richer — 2016 capture already sells "X-Man Design风三阶"; native alias "风"/"风三阶" newly findable | Keep confirmed for existing aliases; flag native-alias addition as a pass-2/3 lead, not made here |
| 7 | `qiyi` `/kind` | confirmed, [theqiyi-about-us, qiyicube-storefront-2018] | Yes — qiyitoys-net-about-history's own "专业魔方品牌公司...研发、生产及销售" | Keep confirmed; qiyicube-storefront-2018 remains valid too; add qiyitoys-net-about-history |
| 8 | `x-man-design` `/parent_id` | confirmed, [theqiyi-about-us, qiyicube-storefront-2018] | Yes — same 2015 XMD entry: "即奇艺魔方格旗下的旗舰品牌" | Keep confirmed; qiyicube-storefront-2018 remains valid too; add qiyitoys-net-about-history |

Additionally, not in the original blocker list but directly affected:

| — | `qiyi-valk` `/manufacturer_id` | uncertain | Yes — direct 2016 "公司携手...Mats Valk创立...'The Valk'" entry | Upgrade to confirmed; new source (family-record edit, outside my lane) |

In every case where `theqiyi-about-us` was the sole support, a replacement tier-1, first-party,
genuine source now exists and in most cases is *stronger* than the original (dated timeline
entries with named individuals, rather than undated marketing prose). None of the eight needs to
be downgraded to `unknown` — this blocker is fixable by source substitution/addition, not by
loss of the underlying facts. `theqiyi-about-us` itself should probably be re-graded (not by me)
given its footer disclosure, thin domain history, and the one factual divergence found in A4.

## A8 — New source records to create (specification only; not created here)

**1. `qiyitoys-net-about-history`**
```yaml
id: qiyitoys-net-about-history
entity: source
kind: manufacturer_official
title: "About Us / Company History (发展历程) - QiYi MoFangGe"
publisher: "广东奇艺魔方格科教实业有限公司 (Guangdong QiYi MoFangGe Science-Education Industrial Co., Ltd.)"
url: "https://www.qiyitoys.net/col.jsp?id=101"
preservation_method: archive_url
archive_url: "https://web.archive.org/web/20250710215210/https://www.qiyitoys.net/col.jsp?id=101"
excerpt: |-
  "广东奇艺魔方格科教实业有限公司成立于1998年，坐落在美丽的海滨城市，有着"玩具之都"之称的汕头市澄
  海区...是一家集研发、生产及销售为一体的专业魔方品牌公司...旗下现有4个子品牌，分别是"奇艺魔方"、
  "奇艺益智玩具"、"魔方格"和"X-MAN DESIGN"。" Company history (发展历程): "2008 以'打造高性价比、
  普及类魔方产品'作为品牌路线..."; "2014 由资深企业家、公司总经理杜超宇先生创立'魔方格'品牌..."; "2015
  奇艺首席设计师张小静创立'XMD'品牌，即奇艺魔方格旗下的旗舰品牌..."; "2016 公司携手著名魔方选手 Mats
  Valk 创立专业速拧魔方品牌'The Valk'。2016年6月 Valk3上市..."; "2021 XMD 品牌升级...发布年度旗舰三阶
  风二代"; "2022 XMD 品牌发布年度旗舰三阶风三代。...Max Park使用风三代旗舰版...打破三阶世界纪录."
  Footer carries ICP filing 粤ICP备2021105271号 and public-security filing 粤公网安备44051502000649号,
  and copyright line "©广东奇艺魔方格科教实业有限公司 版权所有".
accessed: "2026-09-03"
language: zh
region: CN
link_status: live
last_checked: "2026-09-03"
reliability_note: |-
  Tier 1, first-party. Domain registered 2015-12-20 via Alibaba Cloud Computing (Beijing) Co.,
  Ltd. (WHOIS, checked 2026-09-03); continuous Wayback captures 2016-07-04 through 2026-07-12
  (this page's content unchanged between the 2025-07-10 and 2026-07-12 captures, i.e. current).
  Carries government ICP + public-security registrations tied to the stated legal entity name,
  a physical address, a named deputy general manager, and phone/QQ/WeChat contact details —
  see research/qc/agent-a-qiyi-remediation.md for the full legitimacy assessment. Preferred over
  theqiyi-about-us (an Amazon-affiliate page on a domain registered 2025-10-10 with no bulk
  crawl history) for every fact both sources address.
status: sourced
```
Supports: `qiyi` `/country`, `/founded`, `/kind`, `/aliases` (legal-name correction — see A3),
`x-man-design` `/kind`, `/parent_id`, `x-man-tornado` `/positioning`, `qiyi-valk`
`/manufacturer_id` (family record, outside my write lane).

**2. `qiyitoys-net-homepage-current`**
```yaml
id: qiyitoys-net-homepage-current
entity: source
kind: manufacturer_official
title: "QiYi MoFangGe — homepage (qiyitoys.net)"
publisher: "广东奇艺魔方格科教实业有限公司 (Guangdong QiYi MoFangGe Science-Education Industrial Co., Ltd.)"
url: "https://www.qiyitoys.net/"
preservation_method: archive_url
archive_url: "https://web.archive.org/web/20260712075333/https://www.qiyitoys.net/"
excerpt: |-
  Homepage banner: "风三阶四代 为世界纪录而生，让强者更强大" ("Tornado 4th generation — born for
  world records, making the strong stronger"). "旗下现有4个子品牌，分别是'奇艺魔方'、'奇艺益智玩具'、
  '魔方格'和'X-MAN DESIGN'。" X-Man Design's own line described as "旗舰竞速魔方产品" ("flagship
  competition speedcube products"). Footer: 粤公网安备44051502000649号 / ©广东奇艺魔方格科教实业
  有限公司 版权所有 / 粤ICP备2021105271号.
accessed: "2026-09-03"
language: zh
region: CN
link_status: live
last_checked: "2026-09-03"
reliability_note: "Tier 1, first-party. Same domain/legitimacy assessment as
  qiyitoys-net-about-history. This specific capture (2026-07-12) is the most recent available
  and is content-identical to the 2025-07-10 capture, establishing the sub-brand list and
  Tornado-flagship framing as QiYi's current (not merely historical) public position."
status: sourced
```
Supports: `qiyi` `/website` (as the replacement value's own evidence — flag the **value change**
itself for the main session, not just the source), `x-man-tornado` `/positioning`, `/aliases`.

**3. Optional — `qiyitoys-net-2016-catalogue`** (only if the main session wants a distinct,
dated 2016 anchor separate from the 2025/2026 captures, e.g. to push `x-man-tornado`
`introduced` earlier than the currently-recorded "circa 2018")
```yaml
id: qiyitoys-net-2016-catalogue
entity: source
kind: manufacturer_official
title: "QiYi MoFangGe (qiyitoys.net) — 2016 homepage catalogue"
publisher: "QiYi MoFangGe"
url: "http://www.qiyitoys.net/"
preservation_method: archive_url
archive_url: "https://web.archive.org/web/20160704184454/http://www.qiyitoys.net:80/"
excerpt: |-
  2016-07-04 capture. "经典产品" (classic products) list includes "X-Man Design风三阶" (¥100)
  alongside "魔方格SQ-1", "斗牛三阶 bull", "雷霆三阶 THUN", "启航三阶/四阶 SAIL", "勇士 WARRIOR
  3X3", "风云四阶 STOR". Footer: "汕头市澄海区莲下奇艺塑料厂 版權所有 ... © 2015 Copyright."
accessed: "2026-09-03"
language: zh
region: CN
link_status: dead
last_checked: "2026-09-03"
reliability_note: "Tier 1, first-party, earliest capture found of this domain (2016-07-04),
  predating theqiyi-about-us and qiyicube-storefront-2018 both. Shows X-Man Design products sold
  directly on QiYi's own site as early as mid-2016, and an earlier, less formal legal-entity
  name ('QiYi Plastics Factory') consistent with the plastics-manufacturer origin story."
status: sourced
```
Supports: `x-man-design` `/kind`/`/parent_id` (predates and independently corroborates), and is
a lead (not a resolution — outside my lane) for pushing `x-man-tornado` `/introduced` earlier
than "circa 2018."

**No broad taxonomy change is needed.** All three specified records use the existing
`manufacturer_official` source kind and slot into the existing `sources` arrays on the existing
attestations. The only non-source change implied is the **value** of `qiyi.website`
(`theqiyi.com` → `qiyitoys.net`), which is a manufacturer-record edit, not a schema/taxonomy
one.

---

## Left undone / residual gaps

- Could not query China's MIIT ICP public database directly to confirm `粤ICP备2021105271号`
  resolves to the exact entity name found on-page — `WebSearch` was already at its session
  budget limit when I reached this step (shared across parallel agents), and `WebFetch` to
  `web.archive.org` is blocked in this environment. This would be a valuable additional
  corroboration for a future pass but the on-page evidence (decade of continuous operation,
  dynamic CMS infrastructure, named staff/contacts, externally-datable history) is already well
  past the bar the existing `theqiyi-about-us` record was held to.
- Did not attempt to date-verify the Max Park world-record claims in the 2022/2023 history
  entries against WCA records — out of scope for this task (manufacturer-identity remediation
  only) and would require a source I have not located; flagged as a model/family-level lead, not
  resolved.
- Did not determine who currently controls `qiyicube.com` or `theqiyi.com`, beyond registrar/
  registration-date facts — irrelevant to the remediation (both are simply not QiYi's current
  site) but a residual "who is doing this" question if anyone wants to pursue it.
- `x-man-tornado` `/introduced` (currently "circa 2018") looks understated given the 2016
  qiyitoys.net catalogue capture already sells an X-Man Design Tornado-line product; I flagged
  this as a lead in A6/A8 rather than resolving it — it is a `data/families/` edit outside my
  write lane and outside this task's scope (manufacturer-identity only, no models/variants per
  the hard stop).

---

## Machine-readable summary

```yaml
remediation: agent-a-qiyi-identity
attestations:
  - record: manufacturers/qiyi
    pointer: /country
    current_confidence: confirmed
    recommended_confidence: confirmed
    replacement_source_id_or_null: qiyitoys-net-about-history
    confidence: High
  - record: manufacturers/qiyi
    pointer: /founded
    current_confidence: confirmed
    recommended_confidence: confirmed
    replacement_source_id_or_null: qiyitoys-net-about-history
    confidence: High
  - record: manufacturers/qiyi
    pointer: /website
    current_confidence: confirmed
    recommended_confidence: confirmed
    replacement_source_id_or_null: qiyitoys-net-homepage-current
    confidence: High
    note: "Value itself should change from https://theqiyi.com/ to https://www.qiyitoys.net/ — not just the source."
  - record: manufacturers/qiyi
    pointer: /kind
    current_confidence: confirmed
    recommended_confidence: confirmed
    replacement_source_id_or_null: qiyitoys-net-about-history
    confidence: High
    note: "qiyicube-storefront-2018 already co-supports this and remains valid; add, don't replace."
  - record: manufacturers/qiyi
    pointer: /aliases
    current_confidence: probable
    recommended_confidence: probable
    replacement_source_id_or_null: qiyitoys-net-about-history
    confidence: Medium
    note: "Legal-name alias discrepancy found: record has 'Science & Technology Industrial' (科技); genuine site says 'Science-Education Industrial' (科教实业). Flagged, not corrected."
  - record: manufacturers/x-man-design
    pointer: /kind
    current_confidence: confirmed
    recommended_confidence: confirmed
    replacement_source_id_or_null: qiyitoys-net-about-history
    confidence: High
  - record: manufacturers/x-man-design
    pointer: /parent_id
    current_confidence: confirmed
    recommended_confidence: confirmed
    replacement_source_id_or_null: qiyitoys-net-about-history
    confidence: High
    note: "qiyicube-storefront-2018 already co-supports this and remains valid; add, don't replace."
  - record: manufacturers/x-man-design
    pointer: /notes
    current_confidence: probable
    recommended_confidence: probable
    replacement_source_id_or_null: qiyitoys-net-about-history
    confidence: Medium
    note: "'independent designer known as X-Man' (affiliate page) contradicted by genuine source naming Zhang Xiaojing (张小静) as QiYi's own in-house chief designer, 2015. Recommend correcting wording, not just adding a source."
  - record: families/x-man-tornado
    pointer: /positioning
    current_confidence: confirmed
    recommended_confidence: confirmed
    replacement_source_id_or_null: qiyitoys-net-homepage-current
    confidence: High
  - record: families/x-man-tornado
    pointer: /aliases
    current_confidence: confirmed
    recommended_confidence: confirmed
    replacement_source_id_or_null: qiyitoys-net-2016-catalogue
    confidence: High
  - record: families/x-man-tornado
    pointer: /introduced
    current_confidence: reported
    recommended_confidence: reported
    replacement_source_id_or_null: null
    confidence: Low
    note: "Lead only, out of scope here: 2016 qiyitoys.net capture already sells an X-Man Design Tornado-line product, suggesting 'circa 2018' may be too late. Not resolved — family-record edit."
  - record: families/qiyi-valk
    pointer: /manufacturer_id
    current_confidence: uncertain
    recommended_confidence: confirmed
    replacement_source_id_or_null: qiyitoys-net-about-history
    confidence: High
    note: "2016 history entry: QiYi itself ('公司') partnered with Mats Valk to found 'The Valk' — direct, first-party, tier-1 statement. Family-record edit, outside this task's write lane."
sources_to_create:
  - id: qiyitoys-net-about-history
    kind: manufacturer_official
    url: "https://www.qiyitoys.net/col.jsp?id=101"
    archive_url: "https://web.archive.org/web/20250710215210/https://www.qiyitoys.net/col.jsp?id=101"
    preservation_method: archive_url
  - id: qiyitoys-net-homepage-current
    kind: manufacturer_official
    url: "https://www.qiyitoys.net/"
    archive_url: "https://web.archive.org/web/20260712075333/https://www.qiyitoys.net/"
    preservation_method: archive_url
  - id: qiyitoys-net-2016-catalogue
    kind: manufacturer_official
    url: "http://www.qiyitoys.net/"
    archive_url: "https://web.archive.org/web/20160704184454/http://www.qiyitoys.net:80/"
    preservation_method: archive_url
    optional: true
```
