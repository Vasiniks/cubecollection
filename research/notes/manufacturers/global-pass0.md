# Global Pass 0 — manufacturer universe discovery

Establishing the manufacturer universe for 2016–2026 3x3 speedcubes, beyond the completed GAN
pilot. **Recall first, canonicalisation second.**

Status: **discovery phase complete, canonicalisation delegated.** This note records method and
findings so the next researcher does not repeat the expensive part.

---

## Method — and why this one

Two channels were tried. The one that worked is worth stating plainly because it is cheap and
high-recall, and the obvious alternative is neither.

**What worked: enumerating retailers' archived collection URLs.**

```
npm run wayback -- prefix 'thecubicle.com/collections/'            --limit 25000
npm run wayback -- prefix 'speedcubeshop.com/collections/<letter>' --limit 4000   # swept a–z
```

260 and 386 distinct collection slugs respectively, saved beside the candidate file. **A
retailer's brand collections are a manufacturer list** — including brands the retailer no longer
carries, because the archive keeps URLs the live site has dropped. This is the same technique that
recovered eight delisted GAN limited editions in Pass 4.5, applied one layer up.

**What did not work: guessing official domains.** Fifteen plausible manufacturer domains were
checked; five had captures. A miss here means *the guess was wrong*, not that the company has no
site — an important distinction, and the reason those are recorded as `domains_guessed_no_hit`
rather than as absence of a website.

**A tooling limitation found and fixed.** `wayback list --from` on a heavily-crawled domain
(rubiks.com) timed out and reported a bare "fetch failed", which reads exactly like "this domain
has no captures" — the opposite of the truth. The HTTP timeout is now 90s and timeouts explain
themselves and suggest `nearest` instead. This mattered: the first domain sweep returned fifteen
false negatives, including rubiks.com, which has captures back to 1998.

---

## The most important finding: the seed list mixes two different things

The project seed list contains **Valk, MGC, WeiLong, TangLong** alongside MoYu, QiYi and YJ. Those
four are **product lines, not manufacturers**:

| Name | Belongs to | Evidence |
|---|---|---|
| Valk | QiYi | A line from QiYi's collaboration with Mats Valk — a person and a product line, not a company |
| MGC | YJ | A YJ product line |
| WeiLong | MoYu | TheCubicle's own slugs `moyu-weilong-wrm-v9` and `-v10` pair them |
| TangLong | MoYu | A MoYu product line |
| Tornado | QiYi / X-Man | Slugs `tornado-v3`, `tornado-v4` sit beside `x-man-designs` |

**Creating manufacturer records for these would fracture the archive at the wrong layer** — the
exact error the GAN pilot spent three passes learning to avoid, arriving one level higher. They are
recorded in the candidate file under `product_lines_not_manufacturers` so the next researcher meets
the warning before the temptation.

`Guhong` is the interesting case: historically a DaYan name, appearing at TheCubicle as
`guhong-pro-m-3x3` and at QiYi. If the name moved between companies, that is a genuine identity
finding worth documenting rather than a slug to file away.

---

## Candidate universe

Full detail in `research/staging/manufacturers/global-pass0-candidates.yml`. Summary:

| Group | Count | Character |
|---|---|---|
| Already canonical | 6 | GAN, its two sub-brands, three services |
| Strong candidates | 14 | Seen at both retailers and/or in the seed list |
| Probable sub-brands | 3 | X-Man Design, MFJS, Meilong |
| Product lines (not manufacturers) | 6 | The trap above |
| Long tail | ~30 | One retailer, or ambiguous between brand / product / house line |
| Service candidates | 2 | Angstrom Research, and the unresolved `FZ` |

**Two long-tail suspicions worth carrying forward.** `UniCube`, `Supernova` and `Cosmic` appear at
SpeedCubeShop with `-magnetic` / `-non-magnetic` splits that look like a **retailer's own product
tiering**, not independent manufacturers. And `Max`, `CubeHead` and `Angstrom` are probably
lubricant, creator and service brands respectively. Each needs checking before a record exists —
"appears in a retailer's brand list" is not "is a manufacturer".

**`FZ` is now doubly interesting.** It was an unresolved prefix from the GAN pass (`fz-gan13-*`,
`fz-gan15-*`), and TheCubicle also has an `fz-lubricants` collection. A lubricant line plus a
GAN-prefixed product line points at a *service*, not a manufacturer — but `fangshi` at
SpeedCubeShop keeps an alternative reading alive. Genuinely open.

---

## Limitations of this discovery

- **Two retailers, both English-language and both US-facing.** Brands sold only in China, or only
  through Chinese platforms, are systematically invisible to this method
- **No Chinese-language discovery yet.** Native names are absent throughout, and for several
  long-tail candidates the native name is probably the only way to resolve identity
- **Retailer collections skew recent.** A brand that died before a retailer's archive coverage
  began will not appear
- **No manufacturer has been canonicalised yet.** Every name above is a candidate

---

## Recommended next steps

1. Canonicalise the 14 strong candidates with real per-manufacturer evidence
2. Resolve the three probable sub-brand relationships from evidence, not from naming resemblance —
   MoYu's internal structure is not GAN's
3. Settle `FZ` and `FangShi`: one entity, two, or a service and a manufacturer
4. Test the UniCube / Supernova / Cosmic house-line suspicion
5. Chinese-language discovery, which is where the remaining recall is
6. Smart-cube companies as a named blind spot — `MsCube` is the only one found so far

---

## Addendum — smart-cube discovery, Guhong closure, SpeedCubeShop house lines (2026-09-02)

Continuing from the handoff above. Four findings this session, each written up at the point of
discovery rather than batched:

**Rubik's canonicalised.** `data/manufacturers/rubiks.yml` — a licensed brand, not a Chinese
manufacturer. Country recorded as GB (Rubik's Brand Limited, UK Companies House incorporation
2013-03-06), distinct from Hungary (product invention, 1974) and Canada (Spin Master, the 2021
acquirer). `founded` recorded as 1980 (product renamed "Rubik's Cube") with the other three dated
events preserved in prose rather than forced into a false multi-source dispute (rule 11 needs
distinct sources per candidate; three of four events here share one source).

**UniCube / Supernova / Cosmic resolved.** All three are SpeedCubeShop's own in-house setup-tier
names, applied across every manufacturer's products sitewide (same pattern as TheCubicle's
Cubicle Custom, one layer wider — three tiers times the whole catalogue, not two magnet variants
of one line as the pass-0 brief guessed). Confirmed via first-party SpeedCubeShop product pages
stating "Brand: SpeedCubeShop" in their own spec table on cubes physically made by GAN.
`data/manufacturers/speedcubeshop.yml` created, kind: service, founded 2009 (Cameron Brown,
originally California, later Nevada).

**Guhong lead closed — a methodology finding, not just a fact.** The pass-0 brief's suspicion
that "Guhong" moved from DaYan to QiYi rested entirely on a bare collection-tag slug
(`guhong-pro-m-3x3`) sitting near `x-man-designs` in an *alphabetised* list of retailer
collections. It doesn't: `guhong-pro-m-3x3` sorts under "g", `x-man-designs` under "x"; they were
never actually adjacent. TheCubicle's own **product** URLs (as opposed to collection tags) for
every GuHong-named cube found in captures spanning 2019-2026 are consistently prefixed
`dayan-guhong-*`, and no "QiYi Guhong" product was found anywhere. Closed: no identity movement.
**Worth flagging structurally**: this is the second time in this register that a slug-adjacency
argument looked like evidence and wasn't (Tornado's adjacency to `x-man-designs` also turned out
to be alphabetical coincidence, though Tornado's actual QiYi/X-Man attribution independently holds
up on direct product-naming evidence). Collection-tag co-location in an alphabetised list should
not be treated as relationship evidence going forward without checking the sort order first.

**Smart-cube blind spot substantially closed.** Two manufacturers added:

- **GiiKER** (`data/manufacturers/giiker.yml`) — Chinese smart-cube pioneer, founded 2012 per its
  own site, GiCUBE (2014) then SUPERCUBE (2018, "the world's first smart connected cube" per its
  own claim — a superlative, recorded as copy not fact). Sold under a "Xiaomi Giiker" name at some
  retailers, reflecting distribution through Xiaomi's ecosystem/crowdfunding platform rather than
  manufacture by Xiaomi; no separate Xiaomi manufacturer record created for that reason.
- **Particula** (`data/manufacturers/particula.yml`) — Israeli, GoCube is its own brand, and it is
  also **the manufacturing/production partner behind "Rubik's Connected"**, per its own funding-
  round press coverage ("will start production of... Rubiks Connected, in partnership with
  Rubiks"). This directly and usefully answers, for one specific Rubik's product line, the
  manufacturing-identity question `rubiks.yml` otherwise leaves `unknown` — cross-referenced in
  both records. Founding year disputed (2017 per Particula's own site vs. 2018/Netanya per press).

Not yet checked: whether GAN's own smart-cube line (referenced only in passing in
`thecubicle.yml`'s existing notes, "GAN ROBOT"/Bluetooth timer) needs its own smart-product
identity work — deferred, since GAN is already canonicalised as a manufacturer and any smart
sub-line is pass 2's concern (family/model), not a new pass-1 identity.

---

## Addendum 2 — long-tail sweep, MoreTry discovery, session close (2026-09-02)

Continuing the same session. Summary of the rest of the pass:

**Product-line traps confirmed with direct evidence, not slug adjacency.** Valk, MGC, WeiLong,
TangLong, and Tornado were re-confirmed against retailer product titles and manufacturer-owned
pages rather than resting on the collection-slug adjacency the original pass-0 brief used — see
the Guhong finding above for why adjacency alone was not trustworthy.

**HuDong resolved as a FanXin line, with an unresolved internal contradiction preserved.**
TheCubicle's own product page for "HuDong Light 3x3" contradicts itself: title and prose say
"FanXin HuDong" / "FanXin hardware", but the same page's structured "Manufacturer" spec field
reads "HuDong" alone. Recorded as a FanXin product line (the more informative reading) with the
contradiction flagged rather than silently resolved.

**A second PiCube-shaped service found: SAOCube.** Named and credited across DaYan, MoreTry,
MoYu, and QiYi/X-Man products at TheCubicle, the same "named third-party mod" pattern as PiCube.
One open question left deliberately unresolved: an apparently own-branded "SAOCube V56" 3x3 that
doesn't fit a pure-service reading and has no populated product description yet.

**MoreTry — a real, substantial manufacturer missing from the original two-retailer sweep
entirely.** 24 3x3 products plus an own-branded lubricant line at TheCubicle, independently named
on the Speedsolving wiki's manufacturer list, found only by following a product-naming lead
surfaced while investigating SAOCube. This is the clearest evidence this pass produced that the
pass-0 collection-URL sweep, while high-recall, is not exhaustive even at a single English-
language retailer — a manufacturer can be filed under a manufacturer-filter URL that was never
enumerated because no corresponding top-level collection page existed to sweep.

**Shape-mod / non-3x3 specialists canonicalised anyway.** Ninja (Ghost Cube), VeryPuzzle (Clover/
Geranium/Tuttminx shape mods and Minx+), HelloCube (Gear/Mirror/Flat Cube), and Calvin's Puzzle
(cuboids and shape mods) are all real, distinct manufacturers with essentially no WCA-legal 3x3
product seen this pass. Canonicalised per the "include broadly, decide scope later" instruction
rather than excluded for being out of core scope — each would need its own `scope_class:
conditional` justification at pass 2/4 if a specific product is ever admitted. "Geranium Puzzles"
resolved as a VeryPuzzle sub-line in the process (every product under that name still carries the
"VeryPuzzle" prefix).

**Chinese-language discovery, second round.** GuoGuan (国冠), MoJue (魔爵), and five further names
MoYu's own site lists alongside itself are corroborated by general Chinese-language search as
brands "built by MoYu Culture" — ruling out the "independent company" reading, but not resolving
sub_brand vs. product-line for any individual name (no independent storefront was found for
GuoGuan specifically on a targeted search). Left open rather than guessed.

**WebSearch budget exhausted mid-session.** This session's web-search allowance (200 calls) was
used up partway through the long-tail sweep. The remainder of the untouched candidates (Vin Cube,
Tingman, Kanyon, Celeritas, The Yoo Cubes, Zepuzzles, LBL Designs, Puzzle Pals, Swiftcubing
Designs, Cubing GG, AJ, Lee, HeShu, MoHuanShouSu, SenHuan, CubeLab, StuCube) were checked as far
as WebFetch and wayback allowed (individual Speedsolving wiki pages, TheCubicle manufacturer
filters) and, where nothing was found, annotated in the candidate file with what each specifically
needs rather than left bare — a session that resumes web search should start there.

**Net this session:** 19 new manufacturer records (rubiks, speedcubeshop, giiker, particula,
xinlexin, guojia, kungfu, haitun, ninja, verypuzzle, hellocube, saocube, moretry, zcube,
cube4you, calvins-puzzle — plus fanxin/qj canonicalised from the earlier handoff's remaining
queue), 24 new sources, and five structural findings (Guhong closed, UniCube/Supernova/Cosmic
resolved, HuDong resolved, Geranium Puzzles resolved, MoreTry discovered) written up at the point
each was established.

---

## Addendum 3 — second-layer discovery via product-title prefixes (2026-09-02)

Attacked the MoreTry-shaped gap directly, per instruction: enumerated
`thecubicle.com/products/` (11,740 captured URLs, 4,917 distinct slugs), took the first
hyphen-token of each, and reviewed the frequency table for brand-shaped prefixes absent from
the collection-URL sweep. High recall, cheap, reproducible.

**Canonicalised:** HuaMeng, ESCube (`kind: manufacturer`, real "Manufacturer" spec-table
fields), PBCube (`kind: sub_brand` of MoYu, stated directly by the retailer: "MoYu's
specialized sub-brand, PBCube"). **Resolved into thecubicle.yml:** Celeritas and MAX are two
further in-house Premium tuning-line names (an earlier 2023 navigation capture has 8 megamenu
items where the previously-cited capture has 6). **Resolved as out-of-scope:** Cubing GG is a
coaching/courses brand, not a manufacturer.

**MoYu's seven affiliated names, individually verdicted** (Priority 3): GuoGuan resolved
`sub_brand` via a dedicated Speedsolving wiki page stating the relationship directly. MoJue,
SenHuan, MoHuanShouSu, YanCheng recorded `sub_brand` at `confidence: uncertain` by structural
analogy (own product naming, no "moyu-" prefix) — the open question is stated in each record,
not silently resolved. Cong's Design and LeTao left unresolved, no record created — see the
backlog file's new `second_layer_candidates` section.

**Confirmed real but not yet canonicalised** (product-title evidence found, no product-page
fetch done yet): LBL Designs (aftermarket DIY kits — likely `kind: service`), Tingman (has a
real "Tingman Cube 3x3" plus live-event tickets — creator brand?), Lee and AJ (both resolve the
pass-0 "signature-credit" caution: genuine standalone shape-mod design brands with dozens of
SKUs each), Zepuzzles and Kanyon (novelty/shape-mod specialists), Vin Cube (4x4 only found so
far). Full detail and slug evidence in the backlog file.

**Not yet researched at all**, surfaced only as frequency-table hits with real product slugs
attached: WitEden, LeFun, Mefferts (historically important, pre-dates this archive's window),
Maru, CubeStyle, CubeTwist, LimCube, Eastsheen (historically important pre-2016 Taiwanese
brand), Adheron, NewIsland. Recorded in the backlog rather than left to be rediscovered by
re-running the sweep.

**Not attempted this session:** the equivalent `speedcubeshop.com/products/` prefix sweep,
smart-cube makers beyond GiiKER/Particula/PBCube, and Chinese-language discovery beyond what
MoYu's own site already yielded. Session's WebSearch budget was exhausted before this addendum
began (inherited from a prior session in the same environment); all evidence above comes from
`wayback` and `WebFetch` (Speedsolving wiki only — most individual wiki pages for these names
do not exist, confirmed by 404).
