# Pass 2.6 targeted family-gap sweep — Agent B: HaiTun "ZhanLang V1" (P3-T4)

Branch `p26-b`. Adjudication only. **No family, model, or variant record created, renamed,
merged, split, or re-parented.** Families remain frozen at 122, variants at 104.

---

## 1. The question

P3-T4 (`research/qc/pass2-remediation-ledger.yml`): Cubezz.com carries "HAITUN ZhanLang V1"
with a structured `Manufacturer: HAITUN CUBE` field. No family in the archive covers it. Is
this a genuinely missing family, something less, or something else entirely?

## 2. Verification of the single existing source

Re-fetched `https://cubezz.com/Buy-7601-HAITUN+ZhanLang+V1+3x3x3+Speed+Cube+Standard+Version.html`
live. Confirmed: the page's own structured Specifications block reads "Brand: HAITUN CUBE" (not
free text, not a mis-parse — a labeled field identical in format to every other Cubezz listing
checked this pass). Title "HAITUN ZhanLang V1 3x3x3 Speed Cube Standard Version," SKU
`HT3ZLV1S`-pattern (Flagship SKU confirmed `HT3ZLV12`), 56×56×56mm, 79g (Standard) / 80g
(Flagship), US$15.99 (Standard, was $20.79) / $18.99 (Flagship). Related-products rail lists the
companion Flagship listing and unrelated top-sellers (AoLong V2, WeiLong WR). The existing
`data/sources/cubezz-haitun-zhanlang-v1-standard.yml` record accurately reflects this; no
correction needed.

**This part of the escalation is confirmed real** — the listing exists, is first-party retailer
structured data, and does name a "HAITUN CUBE" manufacturer. The open question was never
whether the listing is real; it is whether it names a *distinct product line*.

## 3. Corroboration sweep — every channel tried, and its outcome

| Channel | Method | Outcome |
|---|---|---|
| TheCubicle | `npm run wayback -- prefix thecubicle.com/products/haitun` (9 URLs, re-confirmed) | **Negative for ZhanLang.** All 9 URLs are Waverider (V1 flagship/standard/limited-edition/adjustment-tool; V2 flagship/pioneer/standard/ultimate). Separately tried `thecubicle.com/products/zhanlang*` and `.../haitun-zhanlang*` prefixes directly — **`no captures`**, both. |
| SpeedCubeShop | CDX prefix `speedcubeshop.com/products/haitun*` (18 URLs) | **Negative for ZhanLang.** All 18 URLs are Waverider V1 flagship/standard only (no V2 found in this sweep). `speedcubeshop.com/products/zhanlang*` prefix — CDX returned `[]`, confirmed clean (not a timeout: got an explicit 200 with an empty array on a retry after one transient connection failure). |
| Kewbz | CDX domain filter `urlkey:.*haitun.*` and `.*zhanlang.*` | **Negative for HaiTun ZhanLang.** Kewbz carries only `haitun-waverider-v1-3m-flagship` and `-standard` (5 total captures, 2024–2025). The only "zhanlang" hits on Kewbz are two 2021 captures of an unrelated product, **"MoYu ZhanLang 2x2 Magnetic"** — a different manufacturer entirely. |
| Cubelelo (non-US/English retailer, §3.6a) | CDX prefix `cubelelo.com/products/haitun*`, `.../zhanlang*`, `.../waverider*` | **Negative, all three.** Cubelelo does not carry HaiTun under any name found. |
| TheCubeShop | CDX domain filter `urlkey:.*haitun.*` | **Negative.** No HaiTun listings found under any name. |
| Cubezz.com (the source retailer itself) | CDX domain filter `urlkey:.*haitun.*` and `.*zhanlang.*`, full domain, collapsed | **Positive, and decisive — see §4.** Surfaced `HAITUN ZhanLang V1` (7600/7601), `HAITUN ZhanLang V2` (8597/8598/8599, captured 2026-02-08), and `HAITUN Waverider V2` (8597/8598, captured 2026-05-10; 8663 "Supreme Edition," captured 2026-06-13) — **the same three product IDs (8597/8598/8599) under both names**, at different capture dates. Also surfaced an unrelated **"SENHUAN ZhanLang" 2x2 line** (2019–2026 captures, product IDs 5718–5722) — a third, entirely unrelated manufacturer using "ZhanLang" as a product name. |
| First-party HaiTun domain | DNS resolution attempts on `haitun.cn`, `haituncube.com`, `haitun-cube.com`, `haituncube.cn`, `haitun.com` | **Negative — genuine, not inconclusive.** All five returned `curl` exit 6 ("could not resolve host"), i.e. the domains do not exist, not a timeout. No first-party HaiTun source was found this pass, consistent with the manufacturer record's existing finding. |
| Speedsolving forum | WebFetch on search URL | **Inconclusive, recorded as such.** The forum's search page requires JS the fetcher can't execute; no thread content was retrieved either way. Not treated as a negative result — just not searched successfully. Discovery-only channel regardless; would never be load-bearing. |
| WebSearch (general) | — | **Not available this session** — the session's WebSearch budget was already exhausted before this lane started. All searching in this report was done via `scripts/wayback.mjs`, direct CDX queries, and WebFetch on specific known URLs. Flagged honestly rather than silently worked around. |

**`corroborating_retailers_found`: 0** for "ZhanLang" as an independent product line. Every
retailer besides Cubezz that carries HaiTun at all (TheCubicle, SpeedCubeShop, Kewbz) carries it
**exclusively** under the "Waverider" name.

## 4. The decisive finding: ZhanLang and Waverider V2 are the same Cubezz listing, renamed in place

This is the finding that resolves the question, and it did not come from a new external source —
it came from reading Cubezz's *own* crawl history for the specific product IDs already in the
archive.

The existing source `cubezz-haitun-waverider-v2-standard` (a live fetch, 2026-09-04) cites
`cubezz.com/Buy-8599-HAITUN+Waverider+V2...Standard...html`: "Manufacturer: HAITUN CUBE (also
referenced as Dolphin)... Dimensions: 56x56x56 millimeters / Weight: 71 grams."

The Wayback Machine's own crawl of **the identical product ID 8599**, captured 2026-02-08 —
three weeks before that generation's TheCubicle debut — carries this title instead: **"HAITUN
ZhanLang V2 3x3x3 Speed Cube Standard Version."** Its own spec block: "Brand: HAITUN CUBE
(Dolphin) / Size: 56*56*56 mm / Weight: 71 g" — **identical figures, identical parenthetical
"Dolphin" gloss**, same product ID. Preserved as `cubezz-haitun-zhanlang-v2-standard-2026`
(archive_url).

The pairing is even tighter for product ID 8598 (the Flagship tier), because Cubezz's own SKU
survives the rename unchanged:

- **2026-02-08** (`cubezz-haitun-zhanlang-v2-flagship-2026`): "HAITUN ZhanLang V2 3x3x3 Speed
  Cube Flagship Version." SKU `HTO02C`. "Brand: HAITUN CUBE (Dolphin) / Size: 56*56*56 mm /
  Weight: 72 g."
- **2026-05-10** (`cubezz-haitun-waverider-v2-flagship-2026`): "HAITUN Waverider V2 3x3x3 Speed
  Cube Flagship Version." **Same SKU `HTO02C`, same product ID 8598, same 56×56×56mm/72g/"HAITUN
  CUBE (Dolphin)" spec block.** Its own Related-Top-Sellers rail lists "HAITUN ZhanLang V1 3x3x3
  Speed Cube Flagship Version" as a related item on the same storefront.
- **Live-checked 2026-09-07**: the *original ZhanLang-titled URL* for product 8598 still returns
  HTTP 200 and now serves the Waverider-titled content, same SKU. Cubezz's routing keys on the
  numeric product ID; the URL's descriptive slug is cosmetic and was never updated after the
  title changed store-side.

The 2026-02-08 ZhanLang V2 pages also carry the manufacturer's own tagline, absent from the
later Waverider-titled pages: **"'ZhanLang' - cut through the waves."** — a direct semantic
gloss tying the Chinese-derived name to exactly the "wave" imagery of the English name
"Waverider." This is not two products that happen to share specs; it is one product whose
retail name was translated/standardized over time, read by a retailer that initially imported
the original name and later switched to the export brand name once it became the retailer's own
"Waverider" naming for the V2 generation aligned with TheCubicle's usage.

**V1 was never observed renamed** — Cubezz still lists 7600/7601 as "ZhanLang V1" as of this
session's live check (2026-09-07), and no Cubezz "Waverider V1" URL was found in any CDX sweep.
But the V1 feature copy corroborates the same identity independently of the ID/SKU proof: Cubezz's
ZhanLang V1 Standard/Flagship pages describe "flexible single/dual magnetic positioning,
6-level magnetic adjustable" and "8-level elastic adjustable" — numerically identical to
TheCubicle's own Waverider V1 Standard/Flagship copy ("8 tensions, 8 elasticities, and 6 magnet
strengths"; Flagship's "dynamic magnet positioning system" via extra foot magnets vs Standard's
"traditional corner-edge magnets" — matching Cubezz's dual-vs-single magnetic-positioning
distinction between the same two tier names). Weights are close but not identical (Cubezz 79g/
80g vs TheCubicle item-weight 81.0g/82.0g Standard/Flagship) — a ~2g gap consistent with ordinary
retailer scale variance on the same physical product, not a design difference; not treated as
decisive on its own, only as a second, independent line of agreement layered on top of the
ID/SKU proof already established for V2.

## 5. Is "HAITUN CUBE" on this listing the same entity as the archive's `haitun` manufacturer?

Yes, confidently. Every ZhanLang and Waverider listing checked on Cubezz uses the identical
"HAITUN CUBE" (V1) / "HAITUN CUBE (Dolphin)" (V2) manufacturer field, and V2's ID/SKU-matched
rename directly links the ZhanLang-titled listings to the same product IDs the existing archive
record already attributes to `haitun-waverider-v2`. No second "HaiTun"-branded entity is in
play.

## 6. Does HaiTun have other products beyond Waverider?

**No new ones found.** The "SENHUAN ZhanLang" 2x2 line and "MoYu ZhanLang" 2x2 (both found
incidentally via the CDX substring sweep) belong to two entirely different, already-known
manufacturers and have nothing to do with HaiTun — their presence actually *undermines* the
idea that "ZhanLang" is a HaiTun-specific brand identity: it is a generic Chinese product-name
element (plausibly related to "cutting through waves," per Cubezz's own tagline — a lead, not an
asserted transliteration) that at least three unrelated manufacturers (SenHuan, MoYu, HaiTun)
have each independently used for a different product. `data/manufacturers/haitun.yml`'s existing
statement that "Waverider appears to be HaiTun's entire product range" is **not contradicted** by
anything found this pass — ZhanLang is not a second product range, it is the same one.

## 7. Classification

**C — alias / rebrand.** "ZhanLang" is not a distinct family (A), not a distinct model or tier
under the frozen family (B — it maps onto the *same* generations and the *same* tier names
Standard/Flagship/Pioneer already recorded), and it is not merely insufficient evidence (D) —
the evidence is unusually strong and points to a definite answer, just not the one the original
escalation guessed. It is Cubezz's own (probably earlier, possibly closer-to-source) name for
exactly the product already recorded as `haitun-waverider-v1` and `haitun-waverider-v2`.

**Why not A:** zero independent retailers corroborate "ZhanLang" as a name at all; the one
retailer that does carry it also carries — under the *same product IDs* — the name already on
record. A missing family requires evidence of a *different* product; here the evidence points
the opposite way, at the same product under two labels.

**Why not B:** B would apply if ZhanLang were a genuinely separate configuration/tier of the
Waverider design (e.g., an unrecorded fifth tier). It isn't — it occupies the identical tier
slots (V1 Standard/Flagship; V2 Standard/Pioneer/Flagship) already in the model records, at the
identical product IDs for V2.

**Why not D:** D is the right call when evidence is genuinely too thin to decide. Here it
resolved decisively once the existing sources' own product IDs were cross-checked against
Cubezz's crawl history — an unusually clean resolution for this class of question.

**Confidence: `probable`.** The V2 same-ID/same-SKU rename is about as strong as retailer
evidence gets and would support `confirmed` on its own merits, but confirmed requires either a
tier 1 source or two independent tier 2 sources — this is one retailer's internal history
corroborated by *inference* (feature-copy matching) rather than a second retailer independently
naming "ZhanLang," so `probable` is the honest ceiling per the archive's own confidence table.
The V1 identity claim (never directly ID-matched, only feature/tier-name matched) is somewhat
weaker than the V2 claim but is not treated separately here since both generations share one
manufacturer identity already established at `probable`.

**What would change this:** a first-party HaiTun source stating the ZhanLang/Waverider naming
relationship directly (→ `confirmed`); or a second retailer independently using "ZhanLang" for
the *same* generation without an ID/SKU tie (would leave the current finding intact but add a
true second data point); or evidence that Cubezz's ID 8599 was reassigned to an unrelated new
product rather than renamed in place (would undermine the whole finding — not found; the SKU
match on 8598 rules this out for that tier, and 8599's exact spec match makes an unrelated
reassignment implausible).

## 8. No family, model, or variant proposal

Because this resolves to "same product, different retailer-era name," there is nothing to
propose as a **new** record. The correct downstream action — **not taken here**, since this
lane's write lane does not extend to the frozen family/model files, and the instructions for
this lane are explicit that no family/model/variant may be created, renamed, merged, split, or
re-parented — would be for a future pass (or a human reviewer) to add `"ZhanLang"` /
`"HaiTun ZhanLang"` to the `aliases` list already present on `data/families/haitun-waverider.yml`
and, if desired, a per-generation alias note on `haitun-waverider-v1` / `-v2`, citing the four
sources listed in §9. This is a small, low-risk, additive edit (an alias, not a re-parent) and
is recorded here as a ready-to-execute recommendation rather than executed, since editing
frozen-family records was out of scope for this adjudication lane.

## 9. Sources created this pass

- `data/sources/cubezz-haitun-zhanlang-v2-standard-2026.yml` (archive_url, product ID 8599,
  2026-02-08 capture)
- `data/sources/cubezz-haitun-zhanlang-v2-flagship-2026.yml` (archive_url, product ID 8598, SKU
  HTO02C, 2026-02-08 capture)
- `data/sources/cubezz-haitun-waverider-v2-flagship-2026.yml` (archive_url, product ID 8598, SKU
  HTO02C, 2026-05-10 capture — the paired "after" state proving the rename)

No existing source file was modified. `data/sources/cubezz-haitun-zhanlang-v1-standard.yml` and
`data/sources/cubezz-haitun-waverider-v2-standard.yml` were re-verified against live content and
found accurate as written; left untouched.

`npm run validate` — PASS, 0 errors, 0 warnings, run after these three additions.

---

```yaml
name: haitun-zhanlang
classification: C
confidence: probable
decisive_evidence: >-
  Cubezz.com product IDs 8597/8598/8599 were crawled under the title "HAITUN ZhanLang V2" on
  2026-02-08 and under "HAITUN Waverider V2" on 2026-05-10 (product 8598 additionally matched
  by an unchanged retailer SKU, HTO02C, across both captures) — the same listing renamed in
  place, not two products. TheCubicle, SpeedCubeShop, and Kewbz each carry HaiTun exclusively
  under the "Waverider" name and never "ZhanLang."
corroborating_retailers_found: 0
first_party_source_found: false
```
