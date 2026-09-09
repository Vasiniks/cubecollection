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

## Status

- [x] WitEden (6 models)
- [ ] MF8 (3 models)
- [ ] Calvin's Puzzle (3 models)
- [ ] Maru (4 models)
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
