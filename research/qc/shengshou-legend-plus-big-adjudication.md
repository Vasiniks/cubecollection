# ShengShou Legend Plus Big 3x3 (18 cm) — adjudication

Main session, 2026-09-14. Base `b2ab3d0`. Lane L was launched for this and died on a weekly
usage limit after committing only a method skeleton; the adjudication was run in main instead.
**No taxonomy change was made. 54 / 132 / 269 stands.**

## The candidate

Surfaced by ShengShou depth lane I through an unscoped SpeedCubeShop CDX prefix sweep. One
source: `speedcubeshop-shengshou-legend-plus-big-18cm-2025`, capture `20250712130444`, now
delisted (live `.json` 404 on 2026-09-12). Its own words:

> "ShengShou Legend Plus Big 3x3 - 18cm is **a fantastic decoration and a fully functional speed
> cube**! While the large size makes this cube harder to handle, the turning is smooth, and the
> screw/spring core allows for corner cutting!"

Details table: Type 3x3, Brand ShengShou, Magnets None, **Size 180 mm, Weight 920 g**,
"Released: 2024-11-04", one option (Stickerless).

## Verdict

**Structurally a distinct model; by precedent a `reference_only` one; NOT admissible yet.**

Of the five candidate outcomes this is outcome 1 in structure and outcome 2's neighbour in
scope, with admission blocked on two separate grounds. Recommendation to the taxonomy owner:
**do not admit during the freeze. If the taxonomy opens, admit as a model under
`shengshou-legend` with `scope_class: reference_only`** — conditional on P4-16 and on a second
source, both below.

### 1. §4.2 tooling test: a distinct design, not a variant

Could ShengShou produce this and an existing Legend model from one design by choosing parts,
materials or treatment at assembly? **No.** A 180 mm cube cannot come from a 56.5 mm or 70 mm
mould. The archive has already applied exactly this reasoning twice, and both precedents point
the same way:

- `shengshou-legend-big` (70 mm) was split to its own model **on the tooling clause alone**, even
  though TheCubicle states it shares "the same internal mechanism as the original" — a 13.5 mm
  jump sufficed.
- `qiyi-warrior-plus` (188 mm) was recorded as "a distinct mould from any standard-size Warrior
  model ... un-producible from the same tooling."

A 124 mm jump from the Big Legend is not a closer call than either. **Outcome 4 is ruled out**:
this is neither a variant of `shengshou-legend-big` nor that model under another name — the name
collision is real (both are "Big" Legends) but the sizes are 70 mm and 180 mm.

### 2. Scope: the precedent says `reference_only`, not `conditional`

The closest adjudicated product is `qiyi-warrior-plus`, and its reasoning transfers almost
word for word. It is recorded `reference_only` because its retailer framing — "use it as
furniture" — "is novelty marketing, not a documented historical or competitive claim, so it does
not clear the RESEARCH_SPEC 2.2 bar for `scope_class: conditional`."

This listing's framing is the same kind of claim: **"a fantastic decoration."** No tier 1–3
source attests any historical, competitive or collector significance. The consistent
treatment is therefore `reference_only`. `conditional` would require evidence nobody has found.

**No WCA-legality claim is made here in either direction** — none is sourced, and this archive
does not infer legality from size.

### 3. Why admission is blocked anyway

- **P4-16 is `needs_human_decision`** on precisely this class. `reference_only` is written down
  in RESEARCH_SPEC 2.4 for *out-of-window lineage stubs*, but has been applied by four lanes to
  *in-window products that are neither WCA-legal nor documented as significant*. Warrior Plus,
  QiMeng Plus and ShengShou Crazy are all in the second group. Admitting a fourteenth such
  record would extend an undocumented policy before the owner has ruled on it.
- **The evidence is one retailer page, now delisted.** A taxonomy change on a single tier-2
  source from one publisher is thin by this archive's own standard. The second-retailer check
  (TheCubicle and Cubelelo prefixes) **could not run**: the Internet Archive was offline for this
  session, confirmed by a control query against a known-archived URL returning the same
  "Temporarily Offline" page. That is **blocked, not negative.**

## Adversarial tests — what would make this look like a model while not being one?

**(a) Is 920 g a packaged weight?** This is the archive's best-documented error class (rule 45).
SpeedCubeShop labels the field just "Weight", so the label settles nothing, and an in-archive
comparison of SCS "Weight:" fields turned up only two pairs, one of them circular — too thin to
trust. It was settled by physics instead, against the precedent's **verified** figures:
`qiyi-warrior-plus` is 188 mm with **Item Weight 981.0 g** and **Gross Weight 1200 g** on one spec
table.

| scaled from 188 mm to 180 mm | exponent 2 (shell) | exponent 3 (solid) |
|---|---|---|
| from the item weight, 981 g | 899 g | 861 g |
| from the gross weight, 1200 g | 1100 g | 1053 g |

920 g sits against the item range and 130–180 g below the gross range. **It reads as an item
weight.** Caveat stated: two manufacturers, two constructions, so this is plausibility and
not measurement — which is exactly why no weight should be *recorded* from this until a table
labelled "Item Weight" is found.

**(b) Is 180 mm a box dimension?** No. A box holding a cube is larger than the cube, and the
product title itself says "18cm" independently of the table.

**(c) Is it a display object rather than a puzzle?** The same sentence that says "decoration"
says "fully functional speed cube", and the copy describes turning and corner cutting. It is a
functioning 3x3 marketed as a novelty — the Warrior Plus shape exactly. This is what moves it to
`reference_only` rather than out of scope entirely.

**(d) Is "Legend Plus Big" mechanically a Legend at all?** **Unknown.** Nothing states it shares
the Legend's mechanism; "screw/spring core" names a generic adjustment class, not a lineage. This
does not change the verdict — it is a model either way — but it does mean the **family
attachment** to `shengshou-legend` rests on the name, and should be held at `uncertain` if ever
admitted.

**(e) Is "Released: 2024-11-04" a release date?** **Not treated as one.** It is SpeedCubeShop's own
Product Details field, not one of TheCubicle's four documented `Added:` artefacts, but no second
source corroborates it and no investigation of what that SCS field records has been done. It
would enter a record at `uncertain` at most.

## What would change the verdict

- A tier 1–3 source attesting significance → `conditional` instead of `reference_only`.
- A ShengShou statement that it shares the Legend mechanism → raises the family attachment.
- A P4-16 ruling that in-window novelty products belong somewhere other than `reference_only` →
  the scope follows that ruling, and Warrior Plus should move with it.
- A second retailer listing — run the TheCubicle and Cubelelo `shengshou-legend*` CDX prefixes
  when the Internet Archive is back.

escalations:
  - [P4-9] topic: "ShengShou Legend Plus Big 3x3 - 18cm (180mm, 920g)"
    kind: model candidate, adjudicated, not admitted
    detail: "Distinct model under the DATA_MODEL 4.2 tooling test; reference_only by the
      qiyi-warrior-plus precedent. Admission blocked on P4-16 and on single-source evidence."
