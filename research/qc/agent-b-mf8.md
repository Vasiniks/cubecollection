# Agent B — MF8 Crazy 3x3x3 / MF8 Legend remediation research

Scope: Pass 2.5 remediation research only. No models or variants enumerated (Pass 3 frozen).
No `data/` files created or edited. This document is advisory; the main session creates any
source records.

## 0. Verification of the stated problem

Confirmed directly against the repository before researching:

- `data/families/mf8-crazy-3x3x3.yml` cites only `speedsolving-wiki-mf8-products`
  (`kind: wiki` → tier 4 per `vocab/source-kinds.yml`).
- `data/families/mf8-legend.yml` cites the same single tier-4 source.
- `scripts/validate.mjs` rule 15 (lines ~322-329): `scope_class: conditional` requires
  `scope_justification` **and** an attestation on `/scope_justification` citing at least one
  tier 1-3 source, matching `RESEARCH_SPEC.md` §2.2.
- `scope_class` is a **model/variant-level field** (`schema/model.schema.json`,
  `schema/variant.schema.json`) — it does not exist on the `family` schema. The family record
  itself will never trip rule 15; the risk is entirely inherited by models/variants Pass 3 has
  not yet written. This matters for the disposition below.
- Checked the eight sibling non-WCA families named in the brief
  (`maru-nano`, `calvins-crazy-3x3`, `calvins-crazy-mirror-3x3`,
  `calvins-bandaged-3x3-maze-300`, `witeden-mixup-3x3`, `witeden-super-3x3x3`,
  `witeden-camouflage-3x3`, `mefferts-kokonotsu`): each cites a `thecubicle-*` retailer source
  (`kind: retailer`, tier 2) with actual product copy — confirmed, this pattern is real and
  `mf8-crazy-3x3x3` is genuinely the outlier with zero tier 1-3 support.

## 1. Sources found

Used `npm run wayback -- prefix` over TheCubicle's and SpeedCubeShop's `/products/` paths (the
project's documented discovery technique), then `npm run wayback -- get` to pull and read full
page text. `twistypuzzles.com` returned HTTP 403 to both `WebFetch` and a direct `curl`, as the
brief warned — see §4.

### S1 — SpeedCubeShop, "Mf8 Crazy Planet Assortment 3x3x3" (earliest found, pre-dates archive window)

- URL: `http://www.speedcubeshop.com/products/mf8-crazy-planet-assortment-3x3x3`
- Archive: `https://web.archive.org/web/20151116012311/http://www.speedcubeshop.com:80/products/mf8-crazy-planet-assortment-3x3x3` (verified live, HTTP 200)
- Captured: 2015-11-16 (this is the earliest capture found; the live URL today redirects to
  SpeedCubeShop's generic homepage — the specific listing is dead, preservation rests entirely
  on this archive capture)
- Full page text pulled via `wayback get`; load-bearing excerpt:
  > "Mf8 Crazy Planet Assortment 3x3x3" — "This 3x3x3 is much more of a challenge since it is
  > the crazy version by mf8. The rotation of this puzzle is clicky and the layers lock into
  > place making this puzzle easier to manipulate. You can complete your collection by
  > collecting all of the planets!"
- Quality: **Tier 2** (`kind: retailer`, major established Western cube retailer). Marketing
  prose, not a structured spec table on this particular page, but it is first-party retailer
  description of the *mechanism* ("crazy version," i.e. non-standard cuts) and explicitly names
  the object a "3x3x3" — directly relevant to both the scope-legality question and the
  in-scope-puzzle-type question.
- Independence note: this is a *different retailer, different wording* from the
  Speedsolving-wiki source and from S2/S3 below — genuinely independent, not a copy.

### S2 — TheCubicle, "mf8 Crazy 3x3 Planets (Assorted)" (real spec table)

- URL: `https://www.thecubicle.com/products/mf8-crazy-3x3-planets-assorted`
- Archive: `https://web.archive.org/web/20200925205947/https://www.thecubicle.com/products/mf8-crazy-3x3-planets-assorted` (verified live, HTTP 200)
- Captured: 2020-09-25. **Currently still live** as of 2026-09-03 — verified directly (embedded
  product JSON on the live page reads `"name":"mf8 Crazy 3x3 Planets (Assorted) - Black"`), so
  this source has two independent access paths: the archive capture and the live page today.
- Product Specifications table on the page: `Manufacturer: mf8` / `Type: Cuboids` /
  `Added: 2018-10-14` / `Gross Weight: 145g`. Description calls it discontinued as of the 2020
  capture (later apparently restocked, given it is live again in 2026 — not asserted as fact
  here, just an observed discrepancy worth a future pass's attention).
- Quality: **Tier 2**, genuine structured spec table (manufacturer, weight fields present),
  not just marketing copy — this is exactly the class of source `source-kinds.yml`/`RESEARCH_SPEC.md`
  §3.1 describes as sufficient for `probable` alone.
- Caution carried forward from another agent's cross-agent finding this pass
  (`research/notes/pass2-source-independence.md` line ~949, "TheCubicle 'Added:' dates are not
  reliable per-product evidence" — the literal string `Added: 2018-09-11` and similar recur
  verbatim across unrelated products): **do not use the in-page `Added:` field as an
  introduction date.** Use the Wayback crawl timestamp (2020-09-25) only as an "existed by"
  upper bound, exactly as the sibling families already do.

### S3 — SpeedCubeShop, "Mf8 Crazy 3x3 Plus Planet Series (Earth)" (current-era continuation, real spec table)

- URL: `https://speedcubeshop.com/products/mf8-crazy-3x3-plus-planet-series-earth`
- Archive: `https://web.archive.org/web/20240918023540/https://speedcubeshop.com/products/mf8-crazy-3x3-plus-planet-series-earth` (verified live, HTTP 200)
- Captured: 2024-09-18. Live URL today soft-redirects to a generic "More Puzzles" page — dead,
  preservation rests on the archive capture.
- Product Details table: `Type: Shape Mod` / `Brand: Mf8` / `Size: 57 mm` / `Magnets: None`.
  Description: "Mf8 Crazy 3x3 Plus Planet Series (Earth) is a 3x3 with crazy cuts that vary by
  each version adding to the challenge. Collect the entire series!"
- Sibling captures confirm this "Planet Series" line was still being actively listed by
  SpeedCubeShop from 2023 through at least mid-2025 (`mf8-crazy-3x3-plus-planet-series-{mars,
  jupiter, mercury, neptune, saturn, uranus, venus}`, and separately `mf8-crazy-2x2-plus-*`
  variants), i.e. an MF8 "Crazy ... Plus" line has been in continuous or repeated retail
  circulation from at least 2015 (S1) through 2025 (this source and its siblings) — squarely
  inside the archive's approximately-2016-2026 window for most of that span, not just at the
  2010 origin point the wiki records.
- Quality: **Tier 2**, structured spec table, independent retailer and independent wording from
  S1/S2.

### S4 — TheCubicle, "MF8 Legend V2" (for the separate `mf8-legend` family)

- URL: `https://www.thecubicle.com/products/mf8-legend-v2`
- Archive: `https://web.archive.org/web/20200922074539/https://www.thecubicle.com/products/mf8-legend-v2` (verified live, HTTP 200)
- Captured: 2020-09-22. **Currently still live** as of 2026-09-03 — verified (embedded product
  JSON reads `"name":"MF8 Legend V2 - Black"`).
- Description: "The MF8 Legend V2 is the latest 3x3 speedcube by MF8. It measures 56mm across,
  and it feels smooth right out of the box. The tiles are embedded into the cube's design..."
  Product Specifications table: `Manufacturer: mf8` / `Type: 3x3` / `Added: 2018-09-11`
  (same caution as S2 — do not use as a date) / `Gross Weight: 100g` / `Dimensions: 56.0mm`.
- Quality: **Tier 2**, genuine spec table, and directly establishes the object as an *ordinary*
  ("latest 3x3 speedcube") mechanism — see disposition for `mf8-legend` below.

### Not usable / not pursued to a citation

- **MF8's own site.** `data/manufacturers/mf8.yml`'s own notes already record that no
  MF8-branded manufacturer site was confirmed in Pass 1, and that `china-magic-cube.com`
  (captures found 2010-2020, `hid=`/`bid=` catalogue paths) is an unconfirmed lead, not
  verified as MF8's own storefront. I did not find anything this pass that resolves that
  identity question, so I have not cited it. It remains what Pass 1 called it: a lead.
- `bbs.mf8-china.com` — the community forum, tier 3-4 at best per its own manufacturer record's
  characterisation, and I did not find a specific crazy-3x3x3 product thread worth citing as a
  lead beyond what the wiki already gives.
- **twistypuzzles.com museum.** Both `WebFetch` and a direct `curl` to
  `https://www.twistypuzzles.com/cgi-bin/puzzlesearch.cgi?...` returned **HTTP 403**, exactly as
  the brief anticipated. I could not identify the specific museum entry's URL/ID for an MF8
  Crazy 3x3x3 without a working search (the site's search endpoint is what is blocked; guessing
  a `museumdetail?id=` numeric ID by brute force was not attempted as out of proportion for this
  pass). **This is a "not found," not a "does not exist."** Recorded as the concrete next
  research action in §3.
- `WebSearch` was unavailable for the remainder of this session (budget exhausted at the very
  first query I attempted, session-wide) — I did not get to run open web searches for
  "MF8 Crazy 3x3x3 twistypuzzles" or similar. This is a real gap, not a finding of absence;
  flagged in §3 as a next action for whoever picks this up with search available.

## 2. Scope-and-legality analysis

**Is `mf8-crazy-3x3x3` actually in scope?** Yes, on the evidence now in hand — as `conditional`,
not `reference_only`.

- `RESEARCH_SPEC.md` §2.4 reserves `reference_only` for products **outside** the archive's
  approximately-2016-2026 window, kept only when a predecessor/successor name is needed for an
  in-scope lineage. The family record's only prior source (the 2010-dated wiki entry) made this
  look plausible — a 2010 product, entirely pre-window.
- But S1 (2015 listing), S2 (still listed 2018-2020+, and live again in 2026), and S3 plus its
  sibling "Planet Series" captures (2023-2025) establish that an MF8 "Crazy [...] Plus"
  3x3-mechanism product line was in **continuous or repeated retail circulation across most of
  the archive's window**, not confined to 2010. That satisfies §2.1's "discontinued and
  historical products **within that period**" — this is not a purely pre-2016 artifact needing
  lineage-only treatment.
- It is a 3×3×3 (both S1's and S2's product titles say so explicitly), which keeps it inside
  §2.4's "puzzles other than 3×3×3" exclusion boundary — it is not excluded on shape.
- It is almost certainly non-WCA-legal (every source that describes the mechanism — the wiki's
  "Crazy" naming, S1's "crazy version... layers lock into place," S3's "crazy cuts that vary by
  each version" — describes a non-standard-cut mechanism, the defining trait of the "Crazy" cube
  category). That places it under §2.2, `scope_class: conditional`, not core.
- **Caution for the next pass, not resolved here:** S1/S2 describe a "Crazy 3x3(x3) Planets"
  line and S3 describes a "Crazy 3x3 Plus Planet Series" — the naming shift ("3x3" vs "3x3
  Plus") may mark a genuinely different model generation (a different cut configuration) from
  the wiki's undifferentiated 2010 "MF8 Crazy 3x3x3 series" entry, or it may be the same product
  re-listed under updated retailer naming. I have **not** resolved which, and Pass 3 is frozen
  for this task — this is a lead for whoever enumerates models under this family, flagged
  explicitly so it isn't quietly collapsed into one model on the strength of a shared "Crazy"
  name (the same discipline QC applies to shared-source disputes).

**`mf8-legend`:** rule 15 does **not** bite here, and did not need to. S4's own retailer copy
describes it, in the retailer's own words, as "the latest 3x3 speedcube by MF8" with a plain
56mm/100g spec table — an ordinary WCA-format mechanism, not a gimmick. Models under this family
would get `scope_class: core` under §2.1, which carries no `scope_justification` /
tier-1-3-source requirement at all. The temporal question doesn't bite either: unlike the Crazy
line, nothing here suggested this family was pre-2016-only, and S4 now positively confirms a
2018-2020(+)-era retail presence for at least the V2 model.

## 3. Disposition

### `mf8-crazy-3x3x3` — **A. RESOLVABLE**

Legitimate tier 2 evidence exists (S1, S2, S3 above), from two independent retailers, with
independent wording, one of them (S2) carrying a genuine structured spec table. This clears
rule 15's evidentiary bar for scope_justification's required tier 1-3 source, **once a future
pass writes the actual `scope_justification` prose for whichever models it enumerates under
this family** — that prose-writing is a model-level act this pass does not perform (Pass 3 is
frozen). What this pass establishes is that the evidence to write it truthfully now exists and
does not need to be invented, deferred, or worked around.

Concrete significance basis available to that future justification (not written here, just
identified): a themed 8-variant "Planet" collector series sold continuously by at least two
major Western retailers across roughly a decade (2015-2025) is a documented collector market
per §2.2's own example language ("a documented collector market... is [significance]").

Proposed source records (for the main session to create verbatim if it agrees; I have not
created these — no `data/` writes were made this session):

```yaml
- id: speedcubeshop-mf8-crazy-planet-assortment-3x3x3-2015
  kind: retailer
  title: "Mf8 Crazy Planet Assortment 3x3x3 – SpeedCubeShop"
  publisher: "SpeedCubeShop"
  url: "http://www.speedcubeshop.com/products/mf8-crazy-planet-assortment-3x3x3"
  archive_url: "https://web.archive.org/web/20151116012311/http://www.speedcubeshop.com:80/products/mf8-crazy-planet-assortment-3x3x3"
  excerpt: |-
    "Mf8 Crazy Planet Assortment 3x3x3" — "This 3x3x3 is much more of a challenge since it is
    the crazy version by mf8. The rotation of this puzzle is clicky and the layers lock into
    place making this puzzle easier to manipulate. You can complete your collection by
    collecting all of the planets!"
  accessed: "2026-09-03"
  link_status: dead
  reliability_note: "Tier 2 retailer. Earliest capture found for this MF8 product line (2015-11,
    just before the archive's approximately-2016 floor); cited for the mechanism description and
    explicit '3x3x3' naming, not for a release date. Live URL today soft-redirects to
    SpeedCubeShop's homepage; preservation rests on this archive capture."
  supports: "family mf8-crazy-3x3x3 /description and /positioning (mechanism = non-standard
    cuts, i.e. non-WCA-legal), and as tier 1-3 evidence for a future model-level
    scope_justification"

- id: thecubicle-mf8-crazy-3x3-planets-assorted
  kind: retailer
  title: "mf8 Crazy 3x3 Planets (Assorted) – TheCubicle"
  publisher: "TheCubicle"
  url: "https://www.thecubicle.com/products/mf8-crazy-3x3-planets-assorted"
  archive_url: "https://web.archive.org/web/20200925205947/https://www.thecubicle.com/products/mf8-crazy-3x3-planets-assorted"
  excerpt: |-
    Product Specifications: "Manufacturer: mf8 / Type: Cuboids / Gross Weight: 145g." Page
    marked the item "discontinued indefinitely" as of this 2020 capture. (Note: the in-page
    "Added: 2018-10-14" field is not used as dating evidence — see reliability_note.)
  accessed: "2026-09-03"
  link_status: live
  reliability_note: "Tier 2 retailer, genuine structured spec table (manufacturer/type/weight
    fields present). The in-page 'Added:' date is NOT used as an introduction date: another
    agent this pass (research/notes/pass2-source-independence.md, ~line 949) found this literal
    field recurs verbatim across unrelated TheCubicle products and is not reliable per-product
    evidence. The 2020-09-25 Wayback crawl timestamp is usable only as an 'existed by' upper
    bound, consistent with every sibling non-WCA MF8/WitEden/Calvin's family this pass. The live
    URL was independently re-verified on 2026-09-03 and still resolves to this same product
    (embedded product JSON: 'mf8 Crazy 3x3 Planets (Assorted) - Black'), giving this source two
    independent access paths."
  supports: "family mf8-crazy-3x3x3 /description; tier 1-3 evidence for a future model-level
    scope_justification; and, once a model exists, a spec-table source for weight"

- id: speedcubeshop-mf8-crazy-3x3-plus-planet-series-earth-2024
  kind: retailer
  title: "Mf8 Crazy 3x3 Plus Planet Series (Earth) – SpeedCubeShop"
  publisher: "SpeedCubeShop"
  url: "https://speedcubeshop.com/products/mf8-crazy-3x3-plus-planet-series-earth"
  archive_url: "https://web.archive.org/web/20240918023540/https://speedcubeshop.com/products/mf8-crazy-3x3-plus-planet-series-earth"
  excerpt: |-
    "Mf8 Crazy 3x3 Plus Planet Series (Earth) is a 3x3 with crazy cuts that vary by each
    version adding to the challenge. Collect the entire series!" Product Details: "Type: Shape
    Mod / Brand: Mf8 / Size: 57 mm / Magnets: None."
  accessed: "2026-09-03"
  link_status: dead
  reliability_note: "Tier 2 retailer, structured spec table, independent wording from the 2015
    SpeedCubeShop and 2020 TheCubicle listings. Establishes continued/repeated retail
    circulation of an MF8 'Crazy...Plus' 3x3-mechanism line into 2024-2025 (sibling Wayback
    captures for the same 'Planet Series' line run 2023-2025), i.e. within the archive's window,
    not solely at the family's 2010 origin point. Flagged (see report body) as possibly a
    distinct model generation from the plain 'Crazy 3x3x3' the 2010 wiki entry names — not
    resolved this pass, Pass 3 is frozen. Live URL today soft-redirects to a generic catalogue
    page; preservation rests on this archive capture."
  supports: "family mf8-crazy-3x3x3 /description and /positioning; tier 1-3 evidence for a
    future model-level scope_justification; flags a model-boundary question for Pass 3"
```

If the main session creates these, `/description` (and possibly `/positioning`) on
`mf8-crazy-3x3x3` could reasonably move from `reported` (single tier-4 source) toward
`probable` (tier 2, nothing contradicting) for the mechanism/non-WCA-legal claim specifically —
I have not made that edit; it is the source-auditor/editor's call, not mine, and I have not
touched `data/`.

### `mf8-legend` — rule 15 does not apply; evidence improved anyway. **A. RESOLVABLE / not actually at risk.**

No conditional-admission problem exists for this family: it is an ordinary WCA-format 3x3, so
`scope_class: core` (not `conditional`) is the expected outcome for models under it, and rule 15
never triggers for `core`. S4 above is offered anyway as a genuine tier 2 improvement over the
family's current tier-4-only sourcing:

```yaml
- id: thecubicle-mf8-legend-v2
  kind: retailer
  title: "MF8 Legend V2 – TheCubicle"
  publisher: "TheCubicle"
  url: "https://www.thecubicle.com/products/mf8-legend-v2"
  archive_url: "https://web.archive.org/web/20200922074539/https://www.thecubicle.com/products/mf8-legend-v2"
  excerpt: |-
    "The MF8 Legend V2 is the latest 3x3 speedcube by MF8. It measures 56mm across, and it
    feels smooth right out of the box. The tiles are embedded into the cube's design, so they
    are very durable..." Product Specifications: "Manufacturer: mf8 / Type: 3x3 / Gross
    Weight: 100g / Dimensions: 56.0mm."
  accessed: "2026-09-03"
  link_status: live
  reliability_note: "Tier 2 retailer, genuine structured spec table. The in-page 'Added:
    2018-09-11' field is NOT used as an introduction date — this exact string recurs across
    unrelated TheCubicle products per this pass's standing cross-agent finding
    (research/notes/pass2-source-independence.md, ~line 949); the 2020-09-22 Wayback crawl
    timestamp is an 'existed by' upper bound only. Live URL independently re-verified on
    2026-09-03 (embedded product JSON: 'MF8 Legend V2 - Black'), giving two independent access
    paths."
  supports: "family mf8-legend /description and /positioning (ordinary WCA-format mechanism,
    supports scope_class: core once a model exists); model-level dimension/weight spec source"
```

## 4. Concrete next research actions (not performed this pass)

1. **twistypuzzles.com museum**, blocked at HTTP 403 for both `WebFetch` and `curl` from this
   environment. Needs a manual/browser session (or an environment with a different egress path)
   to search `https://www.twistypuzzles.com/` directly for an MF8 Crazy 3x3(x3) museum entry —
   likely the single best specialist-database source for this puzzle type if it exists, per the
   brief's own steer. Not attempted: brute-forcing numeric museum IDs.
2. **Open web search** for "MF8 Crazy 3x3x3" / "MF8 Crazy Cube history" — `WebSearch` was
   unavailable for the rest of this session (budget exhausted on the first attempt). This is
   the most likely route to a specialist collector writeup or a manufacturer-adjacent
   confirmation and should be re-run by whoever has search budget.
3. **MF8/china-magic-cube.com identity question** carried over from Pass 1 (`data/manufacturers/mf8.yml`):
   if `china-magic-cube.com` is ever confirmed as MF8's own storefront rather than a
   third-party Chinese retailer, its 2010-2016 captures would be the strongest available
   evidence for this family's actual origin date and would likely upgrade several attestations
   from `reported`/`uncertain`. Not resolved this pass; still a lead, not a source.
4. **Model-boundary lead** (§2 above): whether "MF8 Crazy 3x3x3" (2010, wiki), "MF8 Crazy 3x3
   Planets (Assorted)" (2018-2020, TheCubicle), and "MF8 Crazy 3x3 Plus Planet Series" (2023-2025,
   SpeedCubeShop) are the same model re-listed under shifting retailer naming, or genuinely
   distinct model generations (the "Plus" may denote an added cut/axis). Needs resolution before
   Pass 3 enumerates models under this family, to avoid collapsing distinct designs into one
   record or splitting one design into phantom variants.

## Machine-readable summary

```yaml
audit: agent-b-mf8
date: "2026-09-03"
records_reviewed:
  - data/families/mf8-crazy-3x3x3.yml
  - data/families/mf8-legend.yml
findings:
  - record: mf8-crazy-3x3x3
    problem_confirmed: true
    disposition: resolvable
    rule_15_cleared: "conditionally — tier 2 evidence now exists to support a future
      scope_justification; the justification prose and attestation itself are a Pass 3
      model-level act not performed this pass"
    scope_class_expected: conditional
    scope_in_archive_window: true
    scope_rationale: "wiki-only 2010 origin, but retail-attested continuous/repeated
      circulation 2015-2025 (S1/S2/S3) keeps it inside the ~2016-2026 window; reference_only
      not warranted"
    sources_found:
      - id_proposed: speedcubeshop-mf8-crazy-planet-assortment-3x3x3-2015
        tier: 2
        preservation: archive_url
        link_status: dead
      - id_proposed: thecubicle-mf8-crazy-3x3-planets-assorted
        tier: 2
        preservation: archive_url
        link_status: live
      - id_proposed: speedcubeshop-mf8-crazy-3x3-plus-planet-series-earth-2024
        tier: 2
        preservation: archive_url
        link_status: dead
    open_leads:
      - twistypuzzles.com museum entry (403, needs manual browser session)
      - open web search (session budget exhausted)
      - china-magic-cube.com identity as MF8's own site (unresolved from Pass 1)
      - model-boundary question: "Crazy 3x3x3" vs "Crazy 3x3 Planets" vs "Crazy 3x3 Plus
        Planet Series" — same model or distinct generations
  - record: mf8-legend
    problem_confirmed: false
    reason: "ordinary WCA-format mechanism per its own retailer copy; scope_class: core
      expected for models under it, rule 15 does not apply"
    disposition: resolvable
    sources_found:
      - id_proposed: thecubicle-mf8-legend-v2
        tier: 2
        preservation: archive_url
        link_status: live
data_writes_made: none
records_created: none
validate_status: "PASS — 0 errors, 0 warnings (baseline unchanged, no data/ edits this session)"
```
