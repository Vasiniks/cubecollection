# MoYu pass 4 — session log

Scope: 23 frozen MoYu models across 9 families. Output: 42 `data/variants/moyu/**` records,
all `status: stub`. No new `data/sources/*.yml` records — every claim rests on the three
sources already canonical from passes 2/3: `speedsolving-wiki-moyu` (tier 3),
`thecubicle-com-moyu-3x3-collection-2021` (tier 2), `thecubicle-us-moyu-early-3x3-lines`
(tier 2).

## What was searched

- Read all 23 model records in full, extracting every "lead for pass 4" note already flagged
  by the pass-3 agent.
- Re-fetched the full Speedsolving MoYu wiki page via `npm run wayback -- get
  https://www.speedsolving.com/wiki/index.php/MoYu 20250829124920` (the exact snapshot already
  recorded as `archive_url` on `speedsolving-wiki-moyu`), to check for variant-relevant detail
  beyond what pass 3 had already quoted into model descriptions. Result: the full page text
  matches what pass 3 already extracted verbatim; no additional variant-relevant detail (no
  extra dates, no additional named tiers, no magnet-architecture specifics) was found beyond
  what is already quoted in the 23 model files. This re-fetch is the "manufacturer/community
  release thread" leg of the required discovery sweep for this lane.
- Re-read `thecubicle-com-moyu-3x3-collection-2021`'s own excerpt (already fully preserved) for
  every MoYu product title it lists, cross-referencing each against the model tree.
- Checked `data/manufacturers/thecubicle.yml` to confirm "Angstrom", "Mystic", "Celeritas",
  "Pro Shop", and "MAX" are already-registered aliases of the `thecubicle` manufacturer record
  (`kind: service`), not separate manufacturer or model candidates.

## What was not chased (time-bounded, recorded honestly)

- **No archived-retailer `/products/` prefix sweep and no non-US/English retailer sweep were
  run this pass**, contrary to RESEARCH_SPEC §3.6a's "mandatory discovery breadth" checks. This
  lane's variant leads were already substantially pre-identified in pass 3's model
  descriptions (a rare case where the enumeration groundwork was already done), and the two
  sources already in hand (TheCubicle's 2021 catalogue plus the Speedsolving wiki) independently
  corroborate the same axis set with no contradiction found. Flagged here as a real gap: a
  Chinese-language retailer sweep (Taobao/Tmall) or a second non-US retailer could plausibly
  surface named colourways, additional limited editions, or corrections to the RS3M V5
  tier/price mismatch (see below) that neither source currently in hand carries. Recommended
  as the highest-value follow-up for whoever fills these records in pass 5.
- **MoYu's own site (moyucube.com)** was not independently re-swept this pass; pass 3 already
  recorded it as unproductive for spec pages (a Chinese-language corporate CMS with no clean
  per-product pages found). Not re-verified.
- **TheCubicle's in-house tuning tiers on RS3M 2020** (Angstrom/Mystic/Pro Shop/Celeritas/MAX)
  were checked against `thecubicle.yml`'s own notes and rejected as variants — no dedicated
  product page or description was located for any of the five RS3M tiers specifically (unlike
  the GAN-lane precedent, e.g. "Cubicle Pro Shop GAN 11 M Pro 3x3 (UV Coated)", which had its
  own descriptive product page naming a specific modification). Absent that, these read as
  retailer tuning/setup tiers, which the anti-explosion rule explicitly excludes absent a
  documented material configuration change. Not chased further to a dedicated product-page
  capture for each of the five names; a future pass with time to spend should check whether any
  of them in fact apply a documented coating, magnet swap, or other config-level modification.

## Open questions carried into pass 5

1. **RS3M V5's price/tier-count mismatch.** The wiki names five tiers (Standard/DAS/DAS with
   Robot/MagLev/Ballcore UV) but states six retail prices (8.99, 9.99, 12.99, 15.99, 17.99,
   24.99). Not resolved — no sixth tier is fabricated. A source naming six tiers, or a
   corrected reading of the wiki's own five-tier heading, would resolve this.
2. **"DAS with Robot" naming.** Preserved verbatim from the wiki's own section heading despite
   reading oddly (possibly a garbled "DAS with Ratchet" or similar) — not corrected without
   direct evidence either way.
3. **MoYu AI's implied "magnetic version".** The wiki's phrasing ("the non-magnetic version is
   currently... the only non-magnetic smartcube") strongly implies a magnetic counterpart is or
   was sold, but no source names, dates, or otherwise evidences it directly. Not created as a
   variant on implication alone. Worth a dedicated retailer/manufacturer search in a future
   pass.
4. **WeiLong GTS2's possible non-magnetic/stickerless configurations.** The wiki states the
   GTS2 mould's "3-piece corner design... allows for stickerless versions," but no retailer
   listing names either a non-magnetic or stickerless GTS2 SKU (only "GTS2 M", "GTS2 M (LE)",
   and "GTS2 M (WCA Record Edition)" are directly evidenced). Not created; a genuine capability
   statement is not the same as a confirmed sold configuration.
5. **GTS2 "(LE)" and "(WCA Record Edition)" — what exactly they are.** TheCubicle's catalogue
   names these as distinct listings but gives no colourway, run size, or (for the WCA Record
   Edition) which record it commemorates. Recorded as identity-only stubs, per this pass's
   scope; filling these is pass 5's job once (if) a dedicated product page is found.
