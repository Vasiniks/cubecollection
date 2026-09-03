# Global pass 2 — family enumeration across the manufacturer register

Resuming after a prior run completed MoYu (9 families: `moyu-weilong`, `-aolong`,
`-huanying`, `-tanglong`, `-rs3m`, `-ai`, `-hualong`, `-dianma`, `-liying`). That work is not
redone here. This file is the consolidated per-manufacturer reasoning log the prior run did not
produce, per the instruction that accompanied this resumed session. Updated per manufacturer as
work proceeds, not at the end.

Method note: `theqiyi.com`'s own CDX index has essentially no bulk crawl coverage beyond the
single `about-us.html` page already captured in pass 1 (`npm run wayback -- prefix
theqiyi.com` and `matchType=domain` both return zero rows even though the exact URL resolves via
`list`/`nearest` — a live/on-demand capture that has not yet propagated into the bulk CDX index,
not evidence the domain has no other content). `qiyicube.com`'s own bulk crawl is dominated by a
WordPress theme's static assets and, later, unrelated torrent-spam squatting — not usable for
discovery. Retailer collection prefix crawls (TheCubicle's `/collections/qiyi-mofangge` and
`/collections/x-man-designs`) plus the Speedsolving wiki's own product-history section carried
this manufacturer's discovery instead.

---

## QiYi (+ X-Man Design sub-brand) — 11 families

**Candidates considered:** Bullfight, Thunderclap (V1/V2/V3), Sail (+ Big Sail, Sail W),
Warrior (W/S/M/M Pro/Plus), MS, MP, M Pro (+ Elite/V2/Smart Cube), QiMeng (+ Plus/V3), Valk
(2/3/4/5), Black Mamba, X-Man Tornado (V3/V4/AI), X-Man XT3, X-Man Volt.

**Accepted (11):** `qiyi-bullfight`, `qiyi-thunderclap`, `qiyi-sail`, `qiyi-warrior`, `qiyi-ms`,
`qiyi-mp`, `qiyi-m-pro`, `qiyi-qimeng`, `qiyi-valk`, `x-man-tornado`, `x-man-xt3`.

**Rejected/excluded:**
- **X-Man Volt** — checked directly (`thecubicle-x-man-volt-v2-collection-2019`); the
  retailer's own category navigation files it under Square-1, not 3x3. Out of scope entirely,
  not a family.
- **Black Mamba** — a single wiki mention ("QiYi Black Mamba V3... the 3rd version of the Black
  Mamba line of puzzles from QiYi (although these puzzles were before QiYi was a good
  speedcubing company)") with no retailer corroboration and explicitly framed as pre-dating
  QiYi's speedcube era. Not chased further this pass on a significance basis — flagged as an
  open lead, not created as a family, so it is not silently lost.

**Kept deliberately separate rather than merged (the boundary calls that matter most here):**
- **Bullfight vs. Thunderclap.** The wiki frames Thunderclap as "an improved version of the
  Bullfight" — a stated succession between two *different* names, not one continuous line. Kept
  as two families with the relationship documented in prose (no `successor_family_id` set,
  since that field describes a family superseding another of the *same* manufacturer's line in
  a stronger sense than this evidence supports — flagged for a human to consider setting it
  directly).
- **QiYi MP (2021) vs. QiYi M Pro (2023+).** Visually similar names, no source states a
  succession, and MP does not appear in TheCubicle's 2024-2025 collection captures while M Pro
  does. Kept separate per the standing "when the evidence is unclear, split" instruction rather
  than assume MP was renamed to M Pro.
- **QiYi Smart Cube 3x3 folded into `qiyi-m-pro`, not split out.** Unlike GAN (whose smart lines
  carry their own persisting collection names — i Series, i Carry, ui Series — and were kept as
  separate families in the GAN pilot), QiYi's Smart Cube has no separately-named persisting
  collection evidence, and the wiki explicitly describes M Pro Elite as "the non smart version
  of the Qiyi Smartcube" with "the same adjustment system" — same design generation, smart vs.
  mechanical variant. This is the opposite call from GAN's smart-line split, made deliberately
  because the underlying evidence differs, not by default.
- **X-Man Tornado vs. X-Man XT3.** Genuinely separate X-Man Design lines: XT3 is explicitly
  marketed by the retailer as flagship-*adjacent but cheaper* than Tornado ("gives you flagship
  features without the flagship price"), and customer reviews disagree about whether it shares
  tooling with Tornado V3 — evidence pass 3 will need, not resolved here.

**The single most uncertain boundary call this pass: `qiyi-valk`'s `manufacturer_id`.** Set to
`qiyi`, not `x-man-design`, on the strength of two sources (the Speedsolving wiki's own
"Sub-Brands" heading listing X-Man Design and TheValk as parallel entries, and a 2018 QiYi
storefront page title naming "The Valk, MoFangGe, X-Man Design" as three separate items) against
QiYi's *current* (2026) first-party "family of brands" page, which lists X-Man Design but omits
Valk by name entirely. No source states the relationship directly either way. Recorded at
`confidence: uncertain` on the `/manufacturer_id` attestation — **a human should look at this
directly** before pass 3 opens on Valk, since a wrong manufacturer_id here would misattribute an
entire flagship lineage.

**Historical/discontinued families preserved:** `qiyi-bullfight` (2015, single generation, not
found in any 2024-2025 retailer capture — likely long discontinued) and `qiyi-mp` (2021, single
generation, also absent from 2024-2025 captures) are both kept as their own records per the
standing instruction that absence from a current catalogue is not evidence a family never
existed.

**Unresolved gaps for pass 3 / a future pass:**
- Exact Tornado-line launch date (recorded circa 2018 from indirect evidence only).
- Whether `qiyi-warrior`'s implied "original Warrior" (predating Warrior W, per the wiki's own
  phrasing) is itself a distinct, undocumented early generation.
- QiMeng's native Chinese name and launch date — deliberately left unrecorded rather than
  supplied from unsourced recall (see the family record's own note on this).
- Whether Bullfight/Thunderclap or MP/M Pro should carry a `successor_family_id` once a
  stronger source is found (schema supports it; evidence found this pass does not clear the
  bar).

**Sources created this session (QiYi/X-Man):** `speedsolving-wiki-qiyi-products`,
`thecubicle-qiyi-mofangge-collection-2025`, `thecubicle-x-man-designs-collection-2025`,
`thecubicle-x-man-volt-v2-collection-2019`, `thecubicle-x-man-xt3-v1-3x3-flagship-product`,
`thecubicle-products-valk-prefix-2025`. All tier 2 (retailer) except the wiki source (tier 4).
Reused from pass 1 without modification: `theqiyi-about-us`, `qiyicube-storefront-2018`,
`speedsolving-wiki-qiyi`.

---

## YJ

*(in progress)*

---

## DaYan

*(not yet started)*

---

## MFJS

*(not yet started)*
