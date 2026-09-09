# Pass 4, Batch 2, Agent G — shape-mod and historic makers

Scope: 20 models across WitEden (6), MF8 (3), Calvin's Puzzle (3), Maru (4), Meffert's (1),
CubeTwist (1), Eastsheen (1), Cube4You (1).

## WitEden (6 models) — DONE

All six WitEden models are single-purchase-configuration shape mods described on TheCubicle's
own product pages (the manufacturer's own site carries no live 3x3x3 catalogue this pass found).
Method: re-fetched each live TheCubicle page via `npm run wayback -- get` to check for colour
options, edition names, or a second configuration, per the pass's differentiation-search
requirement — this is new evidence beyond what pass 3's sources captured (pass 3 did not check
colour-option dropdowns).

**Axes identified.** Stock body colour only (Black, or Black+White), in every case. No coating,
core, magnet, or maglev axis exists for any of these products (none use magnets; no source
anywhere mentions a core system). No separately named/marketed edition was found for any of the
six.

**Variants created (one `--standard` baseline per model, all `status: stub`):**
- `witeden-mixup-oskar--standard` — Black/White stock colours ($34.99), collapsed per GAN356 Air
  precedent. `scope_class: conditional` (inherited).
- `witeden-mixup-plus--standard` — Black/White stock colours ($38.99), collapsed. `conditional`.
- `witeden-mixup-edge-split--standard` — Black only ($39.99), no second colour. `conditional`.
- `witeden-mixup-30-degree-turn--standard` — Black only ($34.99), no second colour.
  `conditional`.
- `witeden-camouflage-3x3x3--standard` — Black/White stock colours ($21.99), collapsed.
  `reference_only`.
- `witeden-super-cube-3x3x3--standard` — Black/White stock colours ($14.99), collapsed.
  `reference_only`.

**Candidates rejected:**
- **Per-colour variants for Black/White stock options** on all four models that offer both —
  rejected under the anti-explosion rule; no source treats either colour as a separately named
  edition (unlike, e.g., a documented limited colourway). Same reasoning as the GAN356 Air
  precedent this pass reused directly.
- **A possible fifth "3x3x3 Mixup" (unsuffixed) model/variant** — TheCubicle's own "Versions"
  selector, viewed from both the Oskar and Plus product pages, lists a plain "3x3x3 Mixup" at
  $34.99 as a sibling entry. This was NOT resolved to an independent live product distinct from
  the four already-modelled designs (Oskar, Plus, Edge-Split, 30-Degree Turn) — it is most
  likely the selector's own short-name self-reference to whichever of the $34.99 variants
  (Oskar or 30-Degree Turn) is being viewed, since both share that exact price point, but this
  was not conclusively determined. **Recorded as a lead, not acted on** — see
  `research/notes/variants/witeden-shapemod.md`. If a fifth WitEden Mixup 3x3 product genuinely
  exists at that URL, it would need its own model record (pass 3 territory, frozen) before a
  variant could be created — flagged as an escalation, not resolved here.
- **A one-off customer-review-reported "wrong sticker colours" set** on the Oskar page — Tier 5
  (customer review), explicitly not treated as a marketed colourway.

**Sources added:** `thecubicle-witeden-mixup-plus-colors-2025`,
`thecubicle-witeden-oskar-mixup-colors-2022`, `thecubicle-witeden-mixup-edge-split-colors-2025`,
`thecubicle-witeden-mixup-30-degree-turn-colors-2025`, `thecubicle-witeden-camouflage-colors-2021`,
`thecubicle-witeden-super-3x3x3-colors-2022` — all Tier 2, `archive_url` preservation, fresh
Wayback captures fetched this pass specifically to check for variant differentiation (pass 3's
existing sources for this manufacturer did not check colour-option dropdowns).

**Escalation:** the unresolved "3x3x3 Mixup" (unsuffixed) naming question above — a possible
missed fifth model, not created because it could not be confirmed as a distinct product this
pass, and creating models is outside this lane's write scope regardless.

---

## MF8 (3 models) — DONE

Method: reused the pass-3 sources already documenting existence/mechanism, then performed a
fresh differentiation search on each model's own live/archived retailer product page(s)
specifically for colour options, edition names, and (for the two "Crazy" models) per-planet
naming, via `npm run wayback -- get` and a `speedcubeshop.com/products/mf8-crazy-3x3-plus-
planet-series-*` CDX prefix sweep.

**Axes identified.**
- `mf8-legend-v2`: stock body colour only (Black/White). No coating/magnet/core axis found.
- `mf8-crazy-3x3-planets` (the earlier, pre-"Plus" generation): a single purchasable colour
  ("Black"), with the individual planet received assigned at random per the product's own
  "Assorted"/"collect them all" framing — NOT a buyer-selectable colourway axis at this
  generation.
- `mf8-crazy-3x3-plus-planet-series` (the later generation): a genuine nine-way named
  "Version" colourway/pattern axis — Earth, Jupiter, Mars, Mercury, Neptune, Saturn, Uranus,
  Venus, and a plain "Black" — confirmed via SpeedCubeShop's own Version selector, with eight
  of the nine independently confirmed as standalone product slugs by a CDX prefix sweep. This
  is the direct DaYan Bermuda Triangle precedent: manufacturer-named colourways sold as
  configurations of one product line, not stock-colour noise.

**Variants created:**
- `mf8-legend-v2--standard` — Black/White stock colours collapsed. `scope_class: core`.
- `mf8-crazy-3x3-planets--standard` — one baseline; "Assorted"/randomised, not a selectable
  axis. `scope_class: conditional` (inherited).
- `mf8-crazy-3x3-plus-planet-series--earth/jupiter/mars/mercury/neptune/saturn/uranus/venus`
  (8 variants) — each a named, individually-priced, individually-slugged Version.
  `scope_class: conditional` (inherited) on each.
- `mf8-crazy-3x3-plus-planet-series--black` — the ninth Version option (plain, no-planet
  colourway), recorded at `uncertain` confidence throughout since this pass could not confirm
  it as an independent standalone product slug distinct from its appearance as the shared body
  colour of all eight planets inside the 8-piece bundle SKU — flagged in the record's own
  attestations, not silently upgraded.

**Candidates rejected:**
- **Per-planet variants for `mf8-crazy-3x3-planets` (the earlier generation)** — rejected. This
  generation's own retailer listing offers no buyer-facing planet choice; the planet is
  assigned randomly to a single "Assorted"/"Black" SKU. Treating a random-assortment product as
  nine potential variants would invent a choice the product never actually offered — same
  discipline as not inventing a run size.
- **A tenth "8-piece bundle" as its own variant** — rejected as `bundled_with`/packaging
  membership of the eight already-created planet variants (DATA_MODEL §4.1: bundle membership
  is not itself a variant-creating distinction), not a new product.
- **Splitting Black/White stock colours on `mf8-legend-v2`** — rejected under the anti-explosion
  rule, same reasoning as WitEden above.

**Sources added:** `thecubicle-mf8-legend-v2-colors-2024`,
`thecubicle-mf8-crazy-3x3-planets-assorted-color-2020`,
`speedcubeshop-mf8-crazy-3x3-plus-planet-versions-2025`,
`speedcubeshop-mf8-crazy-3x3-plus-planet-series-8-versions-2024` — all Tier 2, `archive_url`
preservation.

**Escalation:** none for MF8 beyond the `black` variant's own recorded uncertainty (see above),
which is carried in its attestations rather than escalated further — a future pass with a
direct standalone-slug capture for "Black" could raise it to `probable`.

---

## Calvin's Puzzle (3 models) — DONE

Method: reused pass-3 sources for mechanism/existence, then a fresh differentiation search on
each model's live/archived TheCubicle page(s) for colour/edition options.

**Axes identified.**
- `calvins-crazy-mirror-3x3x3`: the model record itself already identifies circle count
  (4 vs. 6) as the model's variant axis — TheCubicle sells this as two separate dedicated
  product pages, "4 Circles" and "6 Circles", each at one colour ("Black (Silver)") and one
  price ($48.99). Per DATA_MODEL §4.2 worked decision A, this is a configuration choice of one
  underlying design, i.e. variant-level, matching the pass-3 model record's own framing.
- `calvins-full-function-crazy-3x3`: single colour (Black), no other axis.
- `calvins-maze-300-cube`: single colour (Black), no other axis.

**Variants created:**
- `calvins-crazy-mirror-3x3x3--4-circles` and `--6-circles` — `edition.designation` set to "4
  Circles"/"6 Circles" respectively (the retailer's own bracketed configuration name) to
  distinguish the two records after the build's fingerprint check (rule 28) correctly flagged
  them as identical by config/colourway alone — resolved by attesting the one real
  distinguishing fact rather than leaving a false-positive duplicate flag. `scope_class:
  reference_only` (inherited).
- `calvins-full-function-crazy-3x3--standard` — Black-only baseline. `reference_only`.
- `calvins-maze-300-cube--standard` — Black-only baseline. `scope_class: conditional`
  (inherited). The model's own open `modified_from`/aftermarket-service question (is this
  really a decorated third-party base cube?) is explicitly NOT resolved here — no source
  identifies the specific base variant DATA_MODEL §4.3 would require, so it stays an ordinary
  model-level variant, per the model record's own instruction to leave this for a future pass.

**Candidates rejected:** none beyond the two rejected model-level questions already flagged by
pass 3 and re-noted above (not re-litigated this pass).

**Sources added:** `thecubicle-calvins-crazy-mirror-configs-2025`,
`thecubicle-calvins-full-function-crazy-colors-2025`, `thecubicle-calvins-maze-300-colors-2025`
— all Tier 2, `archive_url` preservation.

**Escalation:** none new. The pre-existing `modified_from` open question on
`calvins-maze-300-cube` is carried forward, not resolved, exactly as pass 3 left it.

---

## Maru (4 models) — DONE

Method: CDX prefix sweep of `thecubicle.com/products/maru*` (67 URLs, already run at pass 3)
supplied the sibling-page candidates; this pass re-fetched each candidate page via Wayback for
mechanism/colour detail and differentiation.

**Axes identified.**
- `maru-vx-3-original`: a genuine four-way magnet/core/maglev axis — base (no magnets), "M"
  (glued-in magnets), "Core M" (adds a corner/core system), "Core M MagLev" (adds MagLev,
  described as Maru's flagship 3x3). Stock "Stickerless"/"Black" colour options on each
  collapse into that configuration's own baseline (not split further).
- `maru-cx3-original`: Assembled vs. DIY-kit (an assembly-time choice per this lane's guidance,
  hence two variants of one model, not two models). A very large stock-colour set (12 on
  Assembled, 8 on DIY) including "Glow In The Dark" and "Transparent" collapses into each
  configuration's baseline — all peer options at one shared price with no separate names.
- `maru-3x3-original`: the plain base cube (Black/White stock colours, collapses) PLUS a
  genuinely distinct "Special Patterns" edition sold as **seven individually named sticker
  patterns** (4-Color, Grey Scale, Music Cube, Shepherd's Cube, Maze Cube, Yellow Maze Cube,
  Color-Blind Cube), each tied to one fixed body colour, at one shared price. Several patterns
  are described as functionally distinct (requiring different solving steps), not merely a
  different sticker colour — the direct DaYan Bermuda Triangle precedent.
- `maru-nano-original`: one DIY-kit configuration only (no assembled alternative found at
  either retailer), sold across many stock body colours (Red, Yellow, Blue, White, Black,
  Transparent, Transparent Blue) plus a "Luminous"/"Glow In The Dark" option. The
  glow-in-the-dark option was specifically weighed as a materials-distinction split candidate
  (DATA_MODEL rule 10) and rejected: it is priced and catalogued identically to the plain
  colours at both retailers checked, five years apart, with no separate marketing.

**Variants created (16 total):**
- `maru-vx-3-original--standard` (no magnets), `--m`, `--core-m`, `--core-m-maglev` (4).
- `maru-cx3-original--standard` (Assembled), `--diy-kit` (2).
- `maru-3x3-original--standard`, plus 7 Special Patterns variants:
  `--special-patterns-4-color`, `-grey-scale`, `-music-cube`, `-shepherds-cube`, `-maze-cube`,
  `-yellow-maze-cube`, `-color-blind-cube` (8).
- `maru-nano-original--standard` (1). `scope_class: conditional` (inherited).

All `scope_class: core` except the inherited-conditional Nano Cube.

**Candidates rejected:**
- **Splitting Stickerless/Black on each VX-3 magnet configuration** — rejected, stock
  application options at one price, no edition name (anti-explosion).
- **Splitting the 12/8-colour Assembled/DIY-kit CX3 sets, including Glow In The Dark and
  Transparent** — rejected on the same grounds; these are ordinary peer options in an
  undifferentiated colour list, unlike Maru's own genuinely distinct Special Patterns line.
- **Splitting "Luminous"/"Glow In The Dark" out of the Nano Cube's colour set** — rejected
  despite being a real materials difference (glow-in-the-dark plastic), because no source
  treats it as a separately named or separately priced product; recorded as a considered-and-
  rejected call in the variant's own header, not silently collapsed.
- **A "VX-3 Core M MagLev + Lube Service" tier** — rejected as a checkout-time service add-on
  (DATA_MODEL §4.3's own distinction), not a separately marketed edition.

**Sources added:** `thecubicle-maru-vx-3-m`, `thecubicle-maru-vx-3-core-m`,
`thecubicle-maru-vx-3-core-m-maglev`, `thecubicle-maru-cx3-diy-kit-2021`,
`thecubicle-maru-3x3-colors-2024`, `thecubicle-maru-nano-colors-2023` — all Tier 2,
`archive_url` preservation. (Two initially-created sources,
`thecubicle-maru-cx3-colors-2025` and `thecubicle-maru-3x3-special-patterns-list-2020`, were
found on validation to share their exact locator/capture with pre-existing sources
`thecubicle-maru-cx3` and `thecubicle-maru-3x3-special-patterns` respectively — rule 42 caught
this. Both were deleted and their citations consolidated onto the existing source ids, with the
additional detail folded into each variant's own attestation note instead of a duplicate source
file.)

**Escalation:** none. The `magnet_configuration: dual_layer` mapping for "Core M"/"Core M
MagLev" (a combined traditional-plus-corner/core magnet system) is recorded at `uncertain`
confidence in its own attestation as an interpretive mapping onto the vocabulary, since no
single vocabulary value names that exact combination — flagged there, not escalated further.

---

## Status

- [x] WitEden (6 models)
- [x] MF8 (3 models)
- [x] Calvin's Puzzle (3 models)
- [x] Maru (4 models)
- [ ] Meffert's (1 model)
- [ ] CubeTwist (1 model)
- [ ] Eastsheen (1 model)
- [ ] Cube4You (1 model)

## Machine-readable summary (placeholder, to be filled at end)

```yaml
models_assessed: []
variants_created: []
models_left_unassessed: []
candidates_rejected: []
escalations: []
```
