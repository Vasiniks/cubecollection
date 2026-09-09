# Pass 4 Batch 2 — Agent E — Smart cubes & modern brands

Status: COMPLETE

## Scope
- `data/models/giiker/` (3 models)
- `data/models/particula/` (3 models)
- `data/models/rubiks/` (5 models)
- `data/models/moretry/` (5 models)

All 16 models assessed. `npm run check` passes: 0 errors, 23 advisory warnings (all
pre-existing, none introduced by this session — verified by diff against the baseline lint
output before and after this session's commits).

No new sources were created this session. All variants are backed by sources already gathered
at pass 2/3 (`data/sources/*.yml`). This session's `WebSearch` tool returned "session search
budget exhausted" on the first call, and `WebFetch` was unable to reach `web.archive.org` at
all — both attempted early (GiiKER Cuber-collaboration lookup) and neither usable afterward.
All research in this report is therefore drawn from the existing source corpus only; anywhere
that was insufficient is recorded as a lead, not filled by invention.

---

## GiiKER (3 models → 3 variants)

| Model | Variant created | Notes |
|---|---|---|
| `giiker-m3-3x3` | `giiker-m3-3x3--standard` | Only surviving source (TheCubicle 2020) checked for a second SKU; none found. |
| `giiker-supercube-i3` | `giiker-supercube-i3--standard` | No product page survives anywhere for the bare "i3"; existence rests on GiiKER's own history page alone. Baseline recorded at reduced (`uncertain`) confidence, matching the model's own evidentiary ceiling. |
| `giiker-supercube-i3s` | `giiker-supercube-i3s--standard` | GiiKER's own page (2022 and 2026 captures) and TheCubicle's listing checked; one configuration each. Colourway (`bright`/`stickered`) and `smart.connectivity: Bluetooth v. 4.0` recorded from TheCubicle's own copy. |

**Candidates rejected:** none — no second configuration was found for any GiiKER model to reject.

**Axes identified:** GiiKER carries no documented colourway/edition axis beyond stock
descriptions ("classic color scheme on black plastic" for M3; "bright vibrant stickers" for
i3S, already the basis of the i3/i3S model split). Smart capability (`smart.is_smart`,
`connectivity`) recorded where sourced.

---

## Particula (3 models → 3 variants)

| Model | Variant created | Notes |
|---|---|---|
| `particula-gocube-basic` | `particula-gocube-basic--standard` | GoCube's own page for SKU GC33A checked; no colour/tier selector, no dimensions/weight anywhere sourced. |
| `particula-gocube-edge` | `particula-gocube-edge--standard` | "Full Pack" / "Fam Pack" are packaging bundles (DATA_MODEL §4.1 excludes bundle differences) — carried as `aliases`, not split into variants. `colorway.application: stickerless` and `smart.connectivity: Bluetooth 5.0` recorded. |
| `particula-gocube-x` | `particula-gocube-x--standard` | "New Neon Colors" is the stock look, not a named edition — collapsed into baseline per the GAN356 Air stock-colour precedent. `magnet_configuration: none` and coin-cell battery recorded. |

**Candidates rejected:** "GoCube Edge Full Pack" and "GoCube Edge Fam Pack" as separate
variants — rejected as bundle memberships of `particula-gocube-edge--standard`, per DATA_MODEL
§4.1 and the model record's own prior reasoning (`getgocube-com-2019-fullpack-bundle` states the
box "Includes – GoCube EDGE" plus accessories, i.e. the same cube, packaged).

---

## Rubik's (5 models → 11 variants)

### `rubiks-classic-cube` — 7 variants

The family record (`data/families/rubiks-classic.yml`) flagged, at pass 2, that Rubik's own
site carries a large number of separately-URLed special/material/commemorative editions of this
one mechanism, and left their enumeration explicitly to pass 4. This pass enumerated the six
that have a citable source with real product content:

| Variant | Basis |
|---|---|
| `--standard` | Base current SKU: stickerless tiles, "Improved Play" mechanism (already an undated `model.revisions` entry). |
| `--phantom` | Thermochromic tiles ("Touch the tiles to reveal the Phantom's colors with the heat of your touch"). |
| `--crystal` | Transparent-plastic body. |
| `--retro` | 50th-anniversary commemorative ("classic boxy edges, slower turning, stickers, gold side... retro plastic display case"). `edition.types: [commemorative, anniversary]`. |
| `--re-cube` | 100% recycled plastic — a manufacturer-distinguished material (rule 10). |
| `--coach-cube` | Peel-away numbered teaching stickers; resolves to a standard cube once solved (confirms same mechanism, variant not model). |
| `--impossible` | Angle-dependent iridescent tiles. |

All six use the single bundled source `rubiks-com-classic-special-editions-2024` (tier 1, six
Wayback captures bundled into one source record at pass 2).

**Candidates rejected — for lack of any citable source, not for lack of materiality:**
Rubik's Disney 3x3, the licensed "Cuber" collaborations (Batman, Iron Man, Spider-Man, Hulk,
Black Panther, Hello Kitty), the Mercedes-AMG Petronas F1 Team Cube, and a "Wednesday Cube" —
all named only in the family record's own prose as having been found via a `rubiks.com/products`
CDX prefix sweep at pass 2, with no source file (URL, excerpt, or archive capture) ever created
for any of them individually. I could not create a source this session (WebSearch budget
exhausted; WebFetch cannot reach web.archive.org), so these remain **leads, not variants**. All
of them are almost certainly real, in-scope products (each would independently satisfy rule 7
edition-designation or rule 8 collaboration/commemorative status), and are strong candidates for
the next agent with working web access.

**Escalation:** `rubiks-classic-cube--impossible`'s `/scope_class` attestation flags that the
family record itself raised a possible WCA-legality question for this colourway (apparent
colour depends on viewing angle). Per this batch's instruction that a variant's `scope_class`
must match its model's, I did not reclassify it `conditional` unilaterally — the model itself
is `core` and only a human or a future pass with authority over the model record should decide
whether this colourway (or Phantom) needs its own `conditional` treatment.

**Escalation (schema/write-lane gap):** `--retro`'s `edition.commemorates` should point at an
`event` record for Rubik's 50th anniversary; no such event exists in `data/events/`, and
creating one is outside this pass's write lane (`data/variants/**`, `data/sources/*.yml` only).
Recorded in the fact (`edition.types: [commemorative, anniversary]`) but the relational link is
left unresolved — a gap for whoever next works `data/events/`.

### `rubiks-connected-original` and `rubiks-connected-x` — 1 variant each

Per the launch brief: **GoCube X and Rubik's Connected X remain related-but-not-proven-identical,
with no `rebrand_of`** — respected; nothing found this pass changes that, and no cross-model
relationship was added.

- `rubiks-connected-original--standard`: SpeedCubeShop's "Connected (Magnetic)" listing and
  TheCubicle's long-running, unrenamed "Rubik's Connected 3x3" listing (which persisted
  unchanged through the period rubiks.com itself switched to "Connected X" branding) read
  together as this generation. `magnet_strength: Moderate`, `size_mm: 57.0`, `weight_g: 112.0`
  recorded (SpeedCubeShop's close-but-not-identical 110g figure noted, not treated as a formal
  dispute — ordinary cross-retailer rounding, consistent with how gross-vs-item weight is
  handled elsewhere in this archive).
- `rubiks-connected-x--standard`: SpeedCubeShop's structured field states `Magnets: None` for
  this generation (contrasted directly against the "original"'s `Magnets: Moderate` on the
  sibling listing — the same discriminator pass 3 used to keep these as separate models).
  `smart.companion_app: "Rubik's Connected App"` recorded, named directly on Rubik's own page.

**Release dates deliberately NOT recorded** for either: SpeedCubeShop's own "Released:
2020-09-01" field and TheCubicle's "Added: 2020-09-01" field agree to the day, but both are
structured catalogue fields, not prose dated statements, and this exact family of "Added" dates
elsewhere in this batch (GiiKER, MoreTry) has already been shown to be a catalogue-onboarding
artifact rather than a genuine release date. Left unset per the brief's explicit instruction.

### `rubiks-speed-magnetic` and `rubiks-speed-original` — 1 variant each

- `rubiks-speed-magnetic--standard`: Rubik's own dedicated product page checked for a second
  tier; none found. `config.lubrication` records the factory pre-lubrication fact directly
  (not treated as grounds for a separate variant, per DATA_MODEL §4.1).
- `rubiks-speed-original--standard`: only evidence is a bare 2017 category-navigation label; no
  product page survives to check for differentiation. Recorded at `uncertain`.

---

## MoreTry (5 models → 9 variants)

| Model | Variant(s) created |
|---|---|
| `moretry-tianma-x3-v1` | `--standard` |
| `moretry-tianma-x3-v2` | `--standard` (existence-only; thinnest evidence in the family) |
| `moretry-tianma-x3-v3` | `--standard` |
| `moretry-tianma-x3-v4` | `--standard` |
| `moretry-tianma-x3-plus` | `--standard`, `--dual-magnetic-frosted`, `--triple-magnetic-frosted`, `--super-maglev-frosted`, `--zcube-edition` |

**MoreTry TianMa X3+ ZCUBE Edition — the assessment the brief asked for.** Cubelelo's own page
(`cubelelo-moretry-tianma-x3-zcube-edition`) names it "MoreTry Tianma X3 + ZCUBE Edition 3x3
(Magnetic)," describes it as "Co-Engineered by MORETRY and ZCUBE for Ultimate Speed and Style,"
and states "Exclusive ZCUBE Edition – Limited Style + Packaging." **Assessed as a genuine,
separately-marketed co-branded edition** — real edition designation, collaboration framing, and
distinct style/packaging together, well past the anti-explosion bar of a bare retailer SKU (this
is one Cubelelo product ID under one name, not the HaiTun ZhanLang pattern of one SKU under two
names months apart). Created as `moretry-tianma-x3-plus--zcube-edition` with
`edition.types: [collaboration, limited]` and `edition.collaboration_with: [zcube]` (an existing
manufacturer record).

**Materiality/attachment escalation on the same record:** the source's own URL and title do not
use "X3+"/"plus" (`moretry-tianma-x3-zcube-edition-3x3-magentic`), so the source alone does not
establish which base generation it is built on. I attached it to `moretry-tianma-x3-plus`
because the frozen pass-3 model record for that model already lists "a 'ZCube Edition'
collaboration" among the SKUs it found in its own (unpreserved) discovery sweep — I followed
that prior classification rather than override it on a shorter excerpt, but flagged the
ambiguity explicitly in the attestation (`confidence: uncertain` on `/model_id`) rather than
silently inheriting it. **Flagged for review**: if a future pass with fuller page access finds
this is actually built on V1-V4 stock or is genuinely indeterminate, it should be re-homed.

**X3+ magnet-tier variants.** Cubelelo's own page for "MoreTry Tianma X3+ (Frosted)" states the
line is "offered in three magnet variants: Dual Magnetic (balanced corner-edge magnets), Triple
Magnetic (added internal magnet layers), and Super MagLev (magnetic levitation instead of
springs)." Although sold as a checkout-time selector on one listing, DATA_MODEL §4.1 requires a
new variant whenever magnet configuration differs, independent of how it is sold — created as
three separate variants. TheCubicle's own generic "X3+ V3" page (no magnet tier named) is kept
as a fourth, separate `--standard` baseline rather than conflated with one of the three, because
no source establishes which (if any) of the three tiers it corresponds to — recorded as an open
overlap question, not resolved by guesswork.

**Candidates rejected:**

1. **Cubezz's "Double/Triple/Super Magnetic" naming for the base (non-"+") TianMa X3 line**
   (`cubezz-moretry-tianma-x3-magnetic-variants`) — plausibly corresponds to the V1 (plain
   corner/edge = "Double") / V3 (adds base magnets = "Triple") / V4 (MagLev = "Super")
   progression already modelled as separate models, but no source states this correspondence
   directly, and Cubezz's own listing is a bare search-result snippet with no dimensions or
   weight to cross-check. **Not** created as new variants, and **not** added as aliases (an
   alias would itself be an unevidenced identity claim). Recorded as a lead: a future pass with
   access to Cubezz's own detail pages (not just its search results) or dimension/weight
   comparison could resolve this cleanly.
2. **"MoreTry TianMa X3 V3 3x3 Limited Edition"** — known to exist only as a bare URL slug
   mentioned in the frozen `moretry-tianma-x3-v3` model record's own prose
   (`moretry-tianma-x3-v3-3x3-limited-edition`); no source record (excerpt, capture, or even a
   bare URL-only stub) exists anywhere in `data/sources/` for it, and this session could not
   reach the live web to create one. **Not created.** Flagged as a lead — the single highest-
   value one left in this family, since "Limited Edition" language almost certainly clears the
   materiality bar on its own.
3. **TheCubicle's "Track" naming** ("Triple-Track Magnetic Frosted," "Double-Track Magnetic
   Frosted," "Single-Track Magnetic Frosted") and **a UV-coated tier**, both mentioned only in
   the frozen `moretry-tianma-x3-plus` model record's own prose, again with no source file
   anywhere in `data/sources/` giving a URL or excerpt. Not created for the same reason as above.
   These plausibly duplicate the Cubelelo-sourced Dual/Triple/Super-MagLev tiers under a
   different retailer's naming convention (three tiers either way), but nothing sources that
   correspondence either — flagged as a lead, not merged, not invented.

---

## Escalations (summary)

1. `rubiks-classic-cube--impossible` (and, by the same reasoning, potentially `--phantom`): a
   possible WCA-legality question the family record itself raised, not resolved at variant
   level per this batch's scope_class-must-match-model rule. Needs a human or model-level
   decision.
2. `rubiks-classic-cube--retro`: `edition.commemorates` cannot be populated — no `event` record
   for Rubik's 50th anniversary exists, and creating one is outside this pass's write lane.
3. `moretry-tianma-x3-plus--zcube-edition`: model-attachment held at `uncertain`; the source
   itself doesn't confirm it belongs to the "+" line specifically. Followed the frozen model
   record's own prior classification rather than guess independently.
4. Four named Rubik's classic editions (Disney 3x3, the licensed Cuber collaborations, the
   Mercedes-AMG Petronas F1 Team Cube, the Wednesday Cube) and three MoreTry leads (Cubezz's
   magnet-tier naming, the V3 Limited Edition, TheCubicle's "Track"-named tiers / UV tier) are
   real, sourced-in-name-only leads that could not be converted into variants this session for
   lack of live web access. All are listed above with enough detail (source-adjacent context,
   URLs where known) for the next pass to pick up directly.

## Sources added this session

None. All variants cite sources already present in `data/sources/` from passes 2-3.

## Validation

`npm run check` — 0 errors, 23 advisory warnings, all pre-existing (verified none were newly
introduced: the 23 warnings are the same set present before this session's first commit).

---

## Machine-readable summary

```yaml
models_assessed:
  - giiker-m3-3x3
  - giiker-supercube-i3
  - giiker-supercube-i3s
  - particula-gocube-basic
  - particula-gocube-edge
  - particula-gocube-x
  - rubiks-classic-cube
  - rubiks-connected-original
  - rubiks-connected-x
  - rubiks-speed-magnetic
  - rubiks-speed-original
  - moretry-tianma-x3-v1
  - moretry-tianma-x3-v2
  - moretry-tianma-x3-v3
  - moretry-tianma-x3-v4
  - moretry-tianma-x3-plus

variants_created:
  - giiker-m3-3x3--standard
  - giiker-supercube-i3--standard
  - giiker-supercube-i3s--standard
  - particula-gocube-basic--standard
  - particula-gocube-edge--standard
  - particula-gocube-x--standard
  - rubiks-classic-cube--standard
  - rubiks-classic-cube--phantom
  - rubiks-classic-cube--crystal
  - rubiks-classic-cube--retro
  - rubiks-classic-cube--re-cube
  - rubiks-classic-cube--coach-cube
  - rubiks-classic-cube--impossible
  - rubiks-connected-original--standard
  - rubiks-connected-x--standard
  - rubiks-speed-magnetic--standard
  - rubiks-speed-original--standard
  - moretry-tianma-x3-v1--standard
  - moretry-tianma-x3-v2--standard
  - moretry-tianma-x3-v3--standard
  - moretry-tianma-x3-v4--standard
  - moretry-tianma-x3-plus--standard
  - moretry-tianma-x3-plus--dual-magnetic-frosted
  - moretry-tianma-x3-plus--triple-magnetic-frosted
  - moretry-tianma-x3-plus--super-maglev-frosted
  - moretry-tianma-x3-plus--zcube-edition

models_left_unassessed: []

candidates_rejected:
  - candidate: "GoCube Edge Full Pack / Fam Pack as separate variants"
    reason: "packaging bundle of the same cube, DATA_MODEL §4.1; recorded as aliases"
  - candidate: "Rubik's Disney 3x3"
    reason: "named only in family-record prose; no source file exists; no web access this session"
  - candidate: "Rubik's licensed 'Cuber' collaborations (Batman, Iron Man, Spider-Man, Hulk, Black Panther, Hello Kitty)"
    reason: "same as above"
  - candidate: "Rubik's Mercedes-AMG Petronas F1 Team Cube"
    reason: "same as above"
  - candidate: "Rubik's Wednesday Cube"
    reason: "same as above"
  - candidate: "Cubezz Double/Triple/Super Magnetic naming of base TianMa X3 as new variants or aliases of V1/V3/V4"
    reason: "plausible correspondence to V1/V3/V4 but no source states it directly; bare search-result snippet, no dimensions to cross-check"
  - candidate: "MoreTry TianMa X3 V3 Limited Edition"
    reason: "known only as a URL slug in another record's prose; no source content exists; no web access this session"
  - candidate: "MoreTry TianMa X3+ Triple/Double/Single-Track Magnetic Frosted tiers, UV-coated tier"
    reason: "named only in frozen model-record prose; no source file exists; plausibly duplicates the Cubelelo-sourced Dual/Triple/Super-MagLev tiers under different naming, not merged without evidence"

escalations:
  - "rubiks-classic-cube--impossible (and possibly --phantom): family record raises a WCA-legality question not resolved at variant level per this batch's scope_class-must-match-model instruction; needs a model-level or human decision."
  - "rubiks-classic-cube--retro: edition.commemorates cannot be populated; no event record exists for Rubik's 50th anniversary and data/events/ is outside this pass's write lane."
  - "moretry-tianma-x3-plus--zcube-edition: model attachment held at uncertain; source's own URL/title do not confirm it is a '+'-line product; followed the frozen model record's prior classification rather than guessing independently."
  - "This session's WebSearch tool reported its search budget exhausted on the first query, and WebFetch could not reach web.archive.org at all. All work here is therefore built entirely from the existing data/sources/ corpus; several real, named leads (listed under candidates_rejected) could not be converted into sourced variants purely for lack of working web-research tools this session, not for lack of materiality."
```
