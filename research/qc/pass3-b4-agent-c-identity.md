# Pass 3 / Batch 4, Agent C — identity investigation

Scope: two cross-brand/cross-retailer product-identity questions left open by Batch 3. This is
not an enumeration pass; no families, models, or variants are created, renamed, merged, split,
or re-parented. Only source records (preserving decisive evidence) and precisely-worded,
**proposed** alias/relationship text are produced here, for the main session to apply verbatim
after review.

---

## Question 1 — ESCube naming ("ES3" vs "ESCube" vs "ES3 Air" vs "ESCube Air")

### 1. The claim as recorded

`data/models/escube/escube-air-v1.yml` header and description:

> **SpeedCubeShop names the product "ES3 Air 3x3"** — i.e. an *edition of ES3* — while
> **TheCubicle names it "ESCube Air"** — i.e. *its own line*... This is direct evidence in
> tension with the frozen escube-air / escube-es3 family split, which was made on the strength
> of TheCubicle's naming alone.

`data/families/escube-es3.yml` and `data/families/escube-air.yml` are two separate frozen
families, each with exactly one model (`escube-es3-v1`, `escube-air-v1`).

### 2. Evidence gathered

| # | Source | Tier | What it names the brand | What it names the two lines |
|---|---|---|---|---|
| A | TheCubicle, ES3 listing (`thecubicle-escube-es3-3x3-magnetic`, new this pass, capture 2025-04-15) | 2 | `Manufacturer: ESCube` (structured field) | Title: **"ESCube ES3 3x3 (Magnetic)"** |
| B | TheCubicle, Air listing (`thecubicle-escube-air-3x3-20-magnet-ball-core`, pre-existing) | 2 | `Manufacturer: ESCube` (structured field) | Title: **"ESCube Air 3x3 (20-Magnet Ball-Core)"** |
| C | SpeedCubeShop, ES3 debut listing (`speedcubeshop-es3-debut-brand-2025`, pre-existing) | 2 | "the debut release for the new brand, **ES Cube**!" (prose) | Title: **"ES3 3x3 (Magnetic)"** |
| D | SpeedCubeShop, Air listing (`speedcubeshop-es3-air-3x3-magnetic-20-magnet-ball-core`, pre-existing) | 2 | not stated on this page | Title: **"ES3 Air 3x3 (Magnetic, 20-Magnet Ball-Core)"** — "Air" nested under "ES3" |
| E | Cubelelo (India), ES3 listing (`cubelelo-es3-cube-3x3-magnetic`, new this pass, capture 2025-07-08) | 2 | `Brand: ES Cube` (structured field) | Title: **"ES3 Cube 3x3 (Magnetic)"** |

Three independent retailers, two different naming conventions:
- **TheCubicle**: brand = "ESCube" (one word), used as a prefix on *both* line titles ("ESCube
  ES3", "ESCube Air") — a parallel-siblings structure. TheCubicle's own product **URL slugs**
  are `escube-es3-3x3-magnetic` and `escube-air-3x3-20-magnet-ball-core` — i.e. even TheCubicle's
  own internal slug convention separates "escube" (brand) from "es3" / "air" (product), matching
  the other retailers' structure more closely than its display titles do.
- **SpeedCubeShop + Cubelelo** (2 of 3, independent, one US one India): brand = "ES Cube" (two
  words), and the debut line's own product name is literally "ES3" — meaning "ES3" is doing
  double duty as both a specific product name and (per SpeedCubeShop's "ES3 Air") the stem onto
  which the second line's name is built.

No independent ESCube-owned website, ESCube social account, or manufacturer-first-party
material was located this pass (WebSearch budget for this session was already exhausted before
this investigation began; DuckDuckGo HTML fetch returned only a CAPTCHA page; a
speedsolving.com wiki lookup for "ES3"/"ESCube" returned no captures). This question is
therefore adjudicated entirely on **retailer** evidence — no manufacturer statement was
available to settle it directly.

**Mechanism-level evidence (bears on the model question, not just naming):** TheCubicle's new
ES3 source (A) states the ES3 line uses a "Dual Adjustment System for tool-free tuning of
tension and spring compression... tension and spring compression are completely independent,"
matching SpeedCubeShop's "dual-adjustment core for independent spring compression & tension"
(source C) — now **two independent Tier 2 sources** agreeing on ES3's core mechanism (raises
`escube-es3-v1.yml /specs/core_system` from `probable` to eligible for `confirmed` per
DATA_MODEL rule 9; not applied by this agent, recommended below). The Air line's sources (B, D)
describe a **ball-core** mechanism instead. A dual-adjustment spring-compression core and a
ball-core are different underlying assemblies, not a parts/material choice at one assembly line
— this is exactly the kind of difference DATA_MODEL §4.2 treats as model-separating ("different
mouldings or different internal geometry are a new model, whatever the marketing says"). **This
confirms the existing model-level split (`escube-es3-v1` vs `escube-air-v1`) is correct** — the
open question is only whether they belong in one family or two.

### 3. Verdict

**Retailer normalisation — but pointing the other way than the archive currently assumes, and
surfacing a likely family-level mis-split (a finding, not something I have applied).**

Excluding the other three options:
- *Not* "the same model recorded twice under two names" — the dual-adjustment-core vs.
  ball-core mechanism difference is real and independently corroborated at two retailers each;
  these are correctly two separate **models**.
- *Not* "two genuinely distinct [lines/brands]" in the sense the frozen family split implies —
  every source, including TheCubicle's own URL slugs, treats "Air" as ESCube's/ES Cube's
  **second** product after "ES3," under one manufacturer identity, not as an unrelated brand.
- *Not* "an official naming difference" — no ESCube/ES Cube first-party source was found this
  pass to confirm the manufacturer itself uses two names; the evidence is 100% retailer-sourced.

What the evidence actually shows: **TheCubicle's title-level "ESCube" framing is the outlier**
(2 of 3 independent retailers instead use "ES Cube" as the brand and "ES3"/"ES3 Air" as a
single nested product-name lineage), and TheCubicle's own **URL slugs** already agree with that
structure even though its **display titles** don't. This reads as TheCubicle normalising its
own display titles to a single consistent "ESCube <Product>" pattern across its catalogue (the
same pattern TheCubicle uses for many small/budget brands), not as evidence of a real two-brand
split. Combined with the confirmed model-level mechanism difference, the likely correct
structure is **one family** (brand: ES Cube / ESCube) containing (at least) **two models**, "ES3"
and "Air" — structurally identical to how `particula-gocube` is one family containing Basic /
Edge / X. The current two-single-model-family split (`escube-es3`, `escube-air`) is very likely
an artifact of Batch 3 reading TheCubicle's title-level naming too literally.

### 4. Recommended action

**Families are frozen — no family change is made or should be inferred from this report.**
Precise, apply-verbatim proposals for the main session:

1. **Add a new source-corroboration line to `escube-es3-v1.yml`'s `/specs/core_system`
   attestation**, adding `thecubicle-escube-es3-3x3-magnetic` to its `sources` list and raising
   confidence from `probable` to `confirmed` (two independent Tier 2 sources agreeing per rule
   9: TheCubicle's "Dual Adjustment System... tension and spring compression... completely
   independent" vs. SpeedCubeShop's "dual-adjustment core for independent spring compression &
   tension").
2. **Add alias to `escube-es3-v1.yml`**: `"ES Cube ES3"` (from Cubelelo's `Brand: ES Cube` +
   product name "ES3 Cube"), with an attestation citing `cubelelo-es3-cube-3x3-magnetic` at
   `probable`.
3. **Add a cross-reference note (not a relationship — no vocab type fits a same-brand
   sibling-model claim within one family; see §5 below) to both `escube-es3-v1.yml` and
   `escube-air-v1.yml`** pointing at this report file and stating explicitly: "Naming-tension
   escalation resolved to 'retailer normalisation, majority evidence against TheCubicle's
   title-level split' — see `research/qc/pass3-b4-agent-c-identity.md` Question 1. Model-level
   split (ES3 vs Air) is independently confirmed correct by a dual-adjustment-core vs.
   ball-core mechanism difference; the open question is family-level only, and is NOT resolved
   or applied here because families are frozen."
4. **Escalate for human review, outside this agent's write lane**: whether `escube-es3` and
   `escube-air` should be merged into a single family (e.g. `escube` / `es-cube`) with two
   models, once families unfreeze. Do not act on this without a human decision — it is exactly
   the "recoverable by merge" case DATA_MODEL and RESEARCH_SPEC both flag, but merging families
   (unlike models) is outside every agent's current write lane and is a genuine schema/process
   question: **DATA_MODEL has no documented mechanism for "family A and family B, on review,
   turn out to be one family" once both are frozen with live model children.** This is a
   process gap worth flagging to whoever owns the freeze, not something this agent can resolve.
5. Two secondary, non-blocking findings surfaced along the way, recorded here rather than
   silently acted on:
   - TheCubicle's own "Added: 2025-04-08" date for the ES3/Standard configuration is *earlier*
     than the family record's `introduced: 2025-06 circa` (based only on SpeedCubeShop's capture
     date). A future pass could tighten `escube-es3`'s `/introduced` attestation with this date.
   - A cross-retailer numeric discrepancy on ES3's magnet-count table: SpeedCubeShop states
     48/64/76 total magnets for Standard/8-Core/20-Core; Cubelelo states 48/56/68 for the same
     three named configurations. Not adjudicated by this agent (variant-level, outside this
     agent's remit); flagged for whoever researches `escube-es3` variants.

### 5. Confidence and what would change the answer

**Confidence: Medium.** Based on a 2-of-3 independent-retailer naming majority plus one
internally-consistent slug/title split at the outlier retailer, with no manufacturer-first-party
source available to settle it directly (search-engine access was unavailable this session
beyond what's documented above). **What would change this**: any ESCube/ES Cube first-party
site, storefront (Taobao/1688/AliExpress official store), or manufacturer social account naming
its own brand and product lines explicitly — this would either confirm the "ES Cube brand / ES3
+ Air as its two lines" reading directly, or reveal a genuine manufacturer-declared "ESCube"
vs. "ES3" distinction this agent could not find.

---

## Question 2 — GoCube X ↔ Rubik's Connected X

### 1. The claim as recorded

Archive holds `particula-gocube-x` (family `particula-gocube`, manufacturer `particula`) and
`rubiks-connected-x` (family `rubiks-connected`, manufacturer `rubiks`) as separate models.
`rubiks-connected-x.yml` already records a `succeeds` relationship to `rubiks-connected-original`
at `confidence: uncertain`, explicitly not claiming any relationship to GoCube. Established
(not re-derived): Particula manufactures the Rubik's Connected line
(`tech-eu-particula-series-a-2021`).

### 2. Evidence gathered

**Particula's own 2021 three-way comparison** (`getgocube-com-2021-gocube-x-product`, Tier 1,
capture 2021-10-27) is the single most directly relevant piece of pre-existing evidence: a
"Compare cubes" table with columns **GoCube-X / Rubik's Connected / GoCube**, all three claiming
"Tracking accuracy: 0.001 sec" (a shared platform/app claim, not a hardware discriminator), but
with different "Look & Feel" values: *"Classic shape, Neon stickers"* [GoCube-X] vs. *"Classic
design, Stickers"* [Rubik's Connected, i.e. the pre-"X" original] vs. *"Premium, stickerless"*
[GoCube/Edge]. **Particula's own marketing in 2021 already treated GoCube-X and (the original)
Rubik's Connected as two distinct, differently-described products**, not as one item under two
names — though this predates "Connected X" specifically.

**New this pass — TheCubicle's continuity capture**
(`thecubicle-rubiks-connected-3x3-2020-2025-continuity`, Tier 2): TheCubicle's "Rubik's
Connected 3x3 Smart Cube" listing is unchanged — same title, same `Added: 2020-09-01` catalogue
date, same spec table (`57.0mm / 173g gross / 112.0g item / Magnetic`) — in captures from
2020-09-21 through 2025-06-14, i.e. **spanning the entire period during which Rubik's own site
switched its marketing name to "Connected X"** (rubiks.com's own page renamed by
2025-02-25, per the pre-existing `rubiks-com-connected-x-product-2025`). TheCubicle never
created a distinct "Connected X" listing this pass could find (a `thecubicle.com/products/rubiks*`
prefix sweep, 60 URLs, found none).

**New this pass — SpeedCubeShop sells both, concurrently, as separately-specified SKUs.** Two
current (2025) listings on the same retailer:

| Field | `speedcubeshop-rubiks-connected-3x3-magnetic-2025` ("Connected") | `speedcubeshop-rubiks-connectedx-3x3-2025` ("Connected X") |
|---|---|---|
| Title | "Rubik's Connected 3x3 (Magnetic) - Bluetooth Smart Cube" | "Rubik's ConnectedX 3x3 - Bluetooth Smart Cube" |
| Magnets (structured field) | **Moderate** | **None** |
| Power (description) | "USB charger" implied / no "no charging" claim; original TheCubicle copy explicitly: "comes with a USB charger" | **"Start solving right from the box, no charging required. Battery included."** |
| Brand (structured field) | GoCube | Spin Master |
| Size / Weight | 57 mm / 110 g | *(blank — not populated by SCS)* |
| Released | 2020-09-01 (matches TheCubicle's "Added" field to the day) | *(blank)* |
| Price (2025 capture) | $59.95 | $66.95 |

Both listings share a "Version: Connected X / Connected" selector cross-linking them — a
Shopify-theme convenience linking two separately-priced, separately-specified product pages,
**not** the kind of same-page configuration selector seen elsewhere in this archive for genuine
variant-level choices (contrast the ES3 "Version: 20-Magnet Ball-Core / 8-Magnet Ball-Core"
selector on *one* URL in Question 1 — here each "Version" is its own product page with its own
price and its own structured spec fields).

**New this pass — Particula's own current storefront omits both "X" names.** Particula's own
"All Cubes" collection (`particula-tech-com-allcubes-2024`, Tier 1, capture 2024-06-16) lists
only "GoCube Edge Full Pack," "GoCube 2×2," "Rubik's Connected" (no suffix), "GoCube Bundle
Pack," and "Rubik's Connected BOGO DEAL" — **no "GoCube-X" and no "Rubik's Connected X"**
anywhere in Particula's own direct-to-consumer catalogue at this date. This is consistent with
GoCube-X's own 2021 page framing it as a limited, sold-out-and-restocked budget batch
(`getgocube-com-2021-gocube-x-product`: "FIRST BATCH... SOLD OUT!... 2nd BATCH AVAILABLE") —
i.e. a discontinued-from-first-party-sale SKU still circulating via third-party retailers, not
a currently-manufactured flagship line. No dimension/weight figures for "Connected X" specifically
were found at any retailer or on Rubik's own marketing page (`rubiks-com-connected-x-product-2025`,
which contains no spec table at all, only marketing copy).

Non-US retailer check (Cubelelo, India, per task instruction): only the pre-"X" "Rubik's
Connected" was found (`cubelelo.com/products/rubiks-connected-3x3-magnetic`, capture
2022-05-19) — no "Connected X" listing located there. Recorded as a gap, not evidence of
absence.

### 3. Verdict

**Related products sharing a platform but differing in hardware.**

Excluding the other three options:
- *Not* "the same physical product marketed under two brands" — the one retailer (SpeedCubeShop)
  that sells both current "X"-suffixed products under one taxonomy gives them **different
  structured `Magnets` values** (`Moderate` vs `None`) — the same magnetic/non-magnetic
  discriminator this archive already used to help separate `particula-gocube-basic` from
  `particula-gocube-edge`, and non-magnetic + no-charging-required is exactly GoCube-X's own
  design pattern (CR1225 coin cell, non-magnetic) applied to a *different* brand's SKU, not
  proof of one identical unit. No size/weight figures for Connected X exist anywhere this pass
  to compare directly against GoCube-X's own 57.0mm/103.0g.
- *Not* "a successor or rebrand" — Particula's own 2021 marketing already distinguished
  GoCube-X from (the pre-"X") Rubik's Connected as two different products with two different
  "Look & Feel" descriptions; there is no chronology or first-party statement showing GoCube-X
  was discontinued *specifically in favour of* Rubik's Connected X, or vice versa — both "X"
  names instead look independently **absent from Particula's own current storefront** by 2024,
  while surviving only via Rubik's own marketing page and third-party retail stock.
  `rebrand_of` per DATA_MODEL §4.4 requires "a shared manufacturer statement, matching mold
  markings, or documented supply relationship" — none of that exists here, only a shared
  manufacturer (already established, and explicitly flagged by the task brief as insufficient
  alone) plus a shared naming convention ("X" = non-magnetic/budget tier) and a shared app
  platform.
- *Not* "genuinely distinct hardware" (in the sense of unrelated designs) — both share the same
  manufacturer, the same "X" naming convention *specifically denoting* a non-magnetic,
  non-rechargeable, budget configuration on **both** brand lines, and the same
  Bluetooth/app/"0.001 sec tracking" platform claims. That is too much structural overlap to
  call them unrelated.

The evidence best fits "related products, same manufacturer and platform philosophy (the 'X'
tier = non-magnetic + primary battery + budget price, applied independently to two brand
lines), without confirmed identical hardware." This mirrors the pattern already established
in-archive between "Rubik's Connected" (magnetic, ~57mm/110-112g) and "GoCube Edge" (magnetic,
60mm/125g, pillowed) — same manufacturer, same general tier concept, confirmed *different*
dimensions where dimensions are known. There is no reason to expect the "X" pair behaves
differently, and no evidence found this pass to confirm they are in fact identical.

### 4. Recommended action

**No relationship recorded between `particula-gocube-x` and `rubiks-connected-x` — record the
finding only.** Specifically:

1. **Do not add `rebrand_of`, `succeeds`, or any other relationship** between the two models.
   The evidence is suggestive of a shared platform, not decisive for any typed claim DATA_MODEL
   currently supports.
2. **Schema finding, not an obstacle worked around**: DATA_MODEL's relationship vocabulary
   (`succeeds`, `reissue_of`, `modified_from`, `smart_version_of`, `rebrand_of`, `bundled_with`,
   `commemorates`, `signature_of`/`collaboration_with`, `duplicate_of`, `merged_into`) has **no
   type for "shares a manufacturing platform / OEM design lineage across two brands without
   confirmed identical hardware."** `rebrand_of` is the closest but explicitly requires decisive
   identity evidence this case does not have, and `smart_version_of` is defined for
   mechanical↔electronic siblings within one line, not cross-brand platform siblings. This is a
   real gap for smart-cube archiving specifically (Particula's whole business model is
   licensing one platform to multiple brands), flagged here for whoever owns schema/vocab
   decisions rather than worked around.
3. **Propose (apply-verbatim) description addition to `rubiks-connected-x.yml`**, appended to
   its existing description, citing the two new SpeedCubeShop sources and the Particula
   storefront source: a short paragraph noting the SpeedCubeShop concurrent-listing evidence
   (Magnets: None vs. Moderate on the sibling "Connected" listing) and stating explicitly that
   this is recorded as a lead toward a possible shared-platform relationship with
   `particula-gocube-x`, **not** an asserted relationship, pending either (a) a hardware
   teardown/FCC-filing comparison, or (b) a first-party Particula/Rubik's statement.
4. **Propose (apply-verbatim) parallel description addition to `particula-gocube-x.yml`**,
   cross-referencing the same finding, for symmetry and discoverability.
5. No change to either family or manufacturer record.

### 5. Confidence and what would change the answer

**Confidence: Low-Medium (Unresolved on the "same hardware" sub-question specifically).** The
"related products, shared platform, un-confirmed identical hardware" verdict itself is
reasonably well supported (multiple converging structural facts: shared manufacturer, shared
"X" = non-magnetic/no-charge naming convention on both brands, shared app-platform claims,
absence of either from Particula's own current storefront). But **whether the two are literally
the same mould/PCB/battery assembly under different branding remains genuinely unresolved** —
no dimension, weight, FCC ID, teardown, or manufacturer statement was found for "Connected X"
specifically to compare against GoCube-X's known 57.0mm/103.0g/CR1225 figures.
**What would change this**: (a) a retailer or manufacturer spec table giving Connected X's own
dimensions/weight/battery-part-number for direct comparison against GoCube-X's; (b) an FCC ID
or teardown/community report identifying identical internal hardware; (c) a first-party
Particula or Rubik's statement describing Connected X as "the same cube as GoCube-X" or
similar; (d) conversely, a statement or spec showing materially different dimensions, which
would push the verdict toward "genuinely distinct hardware" instead.

---

## Machine-readable summary

```yaml
questions:
  - id: escube-naming
    verdict: retailer_normalisation
    confidence: medium
    recommended_action: >-
      No family change (frozen). Add thecubicle-escube-es3-3x3-magnetic as a second source on
      escube-es3-v1.yml's /specs/core_system attestation, raising confidence to confirmed. Add
      alias "ES Cube ES3" to escube-es3-v1.yml, sourced to cubelelo-es3-cube-3x3-magnetic at
      probable. Add a cross-reference note to both escube-es3-v1.yml and escube-air-v1.yml
      pointing to this report and stating the model-level split is confirmed correct
      (dual-adjustment core vs. ball-core) while the family-level naming tension is escalated,
      unresolved, and explicitly not actioned. Escalate to a human/process owner whether
      escube-es3 and escube-air should become one family with two models once families
      unfreeze.
    blocks_pass3: false
  - id: gocube-x-vs-connected-x
    verdict: related_products_shared_platform_differing_hardware
    confidence: low-medium
    recommended_action: >-
      No relationship recorded (no rebrand_of, no succeeds, no cross-family link) between
      particula-gocube-x and rubiks-connected-x — evidence is suggestive, not decisive. Add a
      description-only cross-reference paragraph to both particula-gocube-x.yml and
      rubiks-connected-x.yml, each citing speedcubeshop-rubiks-connected-3x3-magnetic-2025,
      speedcubeshop-rubiks-connectedx-3x3-2025, thecubicle-rubiks-connected-3x3-2020-2025-continuity,
      and particula-tech-com-allcubes-2024, stating this as an open lead toward a possible
      shared-platform relationship, not an asserted one. Flag to the schema/vocab owner that
      DATA_MODEL's relationship vocabulary has no type for a cross-brand shared-manufacturing-
      platform claim short of rebrand_of's decisive-evidence bar.
    blocks_pass3: false
```
