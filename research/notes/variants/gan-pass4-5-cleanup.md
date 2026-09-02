# Pass 4.5 — structural cleanup

Local cleanup and targeted evidence, run directly rather than by a specialist agent. No broad
crawl. Scope: close F7, resolve the GAN16 ui gap, re-test the Air UM boundary, audit the variant
layer structurally, and plan the F6 migration without executing it.

**Records at start:** 251. **At end of cleanup:** 259.

---

## 1. F7 — closed for every case currently evidenced

`data/people/` and `data/events/` were empty, so `signature_of` and `commemorates` were unusable
archive-wide. Both directories are now populated, and every edition that needed them points
somewhere.

| Record | Basis |
|---|---|
| `person/max-park` | Named by TheCubicle as the speedcuber whose record a GAN signature edition replicates. Role only — the source mentions a biographical pamphlet but does not quote it, and an unquoted pamphlet is not evidence of its contents. No WCA id: none found, and inferring one would be fabrication |
| `person/xuanyi-geng` | "Team GAN's superstar", holder of the two records a GAN limited edition commemorates. No `native_name`: the source says a Chinese signature appears on the packaging but does not reproduce the characters |
| `event/wr-3x3-average-6-39-max-park` | The record the Max Park edition commemorates. **Date `unknown`** — the source says only "recent", and deriving a date from an undated listing's archive capture would invent one |
| `event/wr-3x3-single-3-05-geng` | 3.05s single, competition named "Shenyang Spring 2025". Precision held at `year`: the season word is part of the competition's name, not a claim about the month |
| `event/wr-3x3-average-3-84-geng` | 3.84s average, "Beijing Winter 2026", described as then-current |

Wired into `gan-356-air--um-max-park-signature` (`signature_of`, `commemorates`) and
`gan-flagship-16--maglev-max-dual-wr-limited-edition` (`signature_of`, `commemorates` × 2).

**One edition type was changed.** The Dual-WR record gains `signature` in `edition.types`. The
source states the collector's case displays Geng's signature and the postcard is "signed by Geng
himself". Asserting `edition.signature_of` while omitting the type would leave the record
internally incoherent. The change is attested and noted in the record itself, not made silently.

**The Max Park run size is worth recording as a fact about the archive, not just the product:**
639 units, numbered 50001–50639, commemorating a 6.39-second average. The run size encodes the
record. That is exactly the kind of detail an archive exists to keep and a catalogue discards.

---

## 2. GAN16 ui Maglev MAX — resolved

### Verdict: **"underlying design changes"**

Model created: **`gan-ui-16-maglev-max`**, family `gan-ui-series`, manufacturer `gan`.

Evidence and reasoning:

- GAN's own site navigation places the product under the **"GAN ui Series"** heading, and the
  source records it as *"distinct from the mechanical 'GAN16 Maglev' listing"*. The manufacturer
  draws this boundary; the archive follows it.
- It is therefore **not** a variant of `gan-flagship-16`. Attaching it there because the name
  contains "GAN16" was the specific error Pass 4 was warned against, and Pass 4 correctly refused
  to make it — staging the problem instead of fabricating a parent.
- It is also not a configuration of any existing `gan-ui-series` model. All four
  (`gan-ui-12-freeplay`, `-12-maglev`, `-12-sp`, `-mini-freeplay`) are built on a GAN12 or Mini
  shell. A different numbered shell generation is a different underlying design, not a different
  part chosen at assembly.
- The evidentiary basis matches the one on which all four existing ui models were created:
  GAN's own listing and naming. Creating this one on a weaker basis would be inconsistent;
  refusing to create it while holding a tier-1 source for its existence would leave the archive
  knowingly incomplete.

**Not established, recorded as open rather than asserted:** that this model uses the GAN16
mechanical shell. That is inferred from the name and the family pattern; no source states it. **No
`smart_version_of` relationship was created**, because asserting an unsourced derivation is
precisely what this archive refuses to do.

### Two variants, both from evidence already held

`--standard` and `--minions-edition`. The second was found *inside an existing source*: the V100
Minions product page's captured navigation names "GAN16 ui Maglev MAX Minions Edition" as a
sibling. **No new source was needed.** That is worth noting about method — the archive's own
sources contained an unexploited product, which suggests re-reading held excerpts is a cheaper
discovery route than fetching new pages.

`limited` was deliberately **not** claimed for the Minions variant. Its V100 sibling carries it,
but nothing in evidence says this product is a limited run, and inheriting an edition type from a
sibling is inference dressed as fact.

**No variants needed migrating.** Pass 4 created nothing under a wrong parent — the audit
confirms zero misplacements.

---

## 3. GAN356 Air UM — Pass 3's decision preserved

### Verdict: **"same underlying design, sold configuration differs"**

Pass 3 treated Air UM as a configuration of `gan-356-air`, not a separate model. Pass 4
instantiated `gan-356-air--um` and `--um-max-park-signature` on that basis. **That decision stands.**

Re-tested against the Pass 4 evidence rather than assumed:

- GAN's own brand story calls the Air UM "the first mass-produced magnetic flagship cube" — a
  statement about **magnets**, which are parts chosen at assembly, not about tooling or geometry.
- TheCubicle's Max Park listing describes "the Air UM's speed and freedom of turning" as
  characteristics tuned by lube and nut choice. Again configuration, not design.
- No source consulted states a shell, mould, or internal-geometry difference between Air and
  Air UM.

Under §4.2's test — *could the manufacturer produce both from one design by choosing different
parts at assembly?* — the answer on the evidence held is yes. Magnets added to a shared shell is
the textbook variant case.

**The distinctive name, the signature edition and the stated run size were explicitly not treated
as evidence of a design difference.** They are evidence that the product was marketed distinctly,
which is what `edition` and `variant` exist to record.

**Residual uncertainty, recorded not resolved:** no source positively affirms the shells are
identical either. The decision rests on absence of contrary evidence plus the manufacturer's own
framing. A teardown comparison or a GAN spec sheet would settle it; neither was found.

---

## 4. Structural audit — 92 variants

| Check | Result |
|---|---|
| Dangling model/family/manufacturer references | 0 (rule 2 enforces) |
| Dangling person/event references | 0 |
| Models with zero variants | 0 — was 1 (`gan-ui-16-maglev-max`), now closed |
| Variants misplaced by the GAN16 ui issue | 0 |
| Derived fields authored | 0 (rules 37/38 enforce) |
| `signature`/`commemorative` types without a reference | 0 — was 2, now wired |
| `collaboration` types without `collaboration_with` | **3** — see F8, a schema gap not a record error |
| Aftermarket records | **1** — see F9 and §7 |
| Variants with zero attestations | 2, and **both are correct** — see below |

**The two "no attestation" records are right, and my audit check was wrong.**
`swift-block-355-maglev--standard` and `monster-go-352-m--standard` assert nothing of their own:
size, weight and maglev are attested at model level and inherited under rule 6's inheritance
clause. A variant that makes no independent claim needs no attestation. Recorded because a future
audit will re-flag this and should not "fix" it.

---

## 5. F6 — colourway migration plan (planned, deliberately not executed)

The question: 69 of 90 variants had no colourway block, 0 were renderable, and stock body colours
were consolidated into one `standard` variant per model.

**The schema supports deferred splitting cleanly.** Verified rather than assumed:

1. **Fingerprints will not collide.** `colorway.designation` and `colorway.application` are both
   fingerprint inputs, so `--black`, `--white` and `--stickerless` siblings produce distinct
   fingerprints automatically. No artificial distinctions needed — which matters, because
   manufacturing distinctions to satisfy a detector is explicitly forbidden.
2. **Ids are immutable, and that is fine here.** Retain each existing `--standard` id for the
   configuration GAN treats as default, and add siblings alongside it. No deprecation, no
   `merged_into` churn, no inbound links broken. `former_ids[]` exists if a rename proves
   unavoidable.
3. **`colorway.completeness` is derived**, so it recomputes on the next build with no migration
   step.

**What must move from prose into structure**, per split variant: `colorway.designation`
(verbatim manufacturer name), `application`, `body.plastic_color_name` and `translucency` and
`finish`, `faces[]` in U/D/F/B/L/R notation, and `logo.placement` — the last being what lifts a
record from `face_complete` to `render_ready`.

**On whether stock colours are separately marketed — the evidence currently says no.** Named
colourways (Love Pink, Crystal Blue, Evergreen, Flora Blue) each got their **own GAN product
page**, preserved as "for display only, not for sale" museum pages. Stock colours appear as
options within one page. That asymmetry is real evidence, and it is why the consolidation was not
unreasonable.

**Recommendation, unchanged:** split during the colourway-fill pass, not before. Splitting now
creates three near-empty records where one partial record stands; splitting *while* filling
produces three complete ones. **Do not create empty per-colour records in the interim.**

**Should remain consolidated regardless:** any model where the only difference is a retailer's
colour naming rather than GAN's, and any case where a colour option is not evidenced as
separately purchasable.

---

## 6. Limited-edition leads — ranked

Twelve named GAN "Limited Edition" colourways are declared in GAN's own nav category
(`gancube-cn-patents-technologies`) with no dedicated citation. Ranked for future work:

| # | Lead | Why it ranks |
|---|---|---|
| 1 | **GAN13 KUNLUN** and **GAN11 Kun** | Two products a decade-spanning archive can use to test whether GAN reuses a naming theme across generations — a lineage question, not just a colourway. Also Chinese-market names, so they test the domestic-source route the archive under-uses |
| 2 | **GAN330 X ShanHeSheJiTu** | The only lead naming a **GAN330**, a designation absent from all 48 models. Either a missing model or a keychain-class product Pass 3 excluded. Highest structural value: it may change the model tree, not just add a variant |
| 3 | **GAN14 Maglev Galaxy** / **GAN14 Maglev Pro Aurora** | Two named colourways on one generation, one of them on a "Pro" tier — tests both the colourway axis and the unresolved thin-tier-name question in one product |
| 4 | **EmeraldoX** | Name follows none of GAN's conventions and attaches to no known model. Likely either a collaboration or a mis-transcription; either answer is informative |
| 5 | **Vita Cube** / **Antique Rhyme** | Non-numeric names suggesting a themed sub-line rather than per-generation editions. Would reveal whether GAN ran a themed LE programme the family layer does not yet represent |

Deprioritised: GAN12 Cheering, GAN12 Chan, GAN11 Summer, GAN13 Coloré — each looks like a
single-generation seasonal colourway, individually cheap to add later and structurally
uninformative.

---

## 7. Aftermarket — the real structural deficiency

**One** aftermarket variant is instantiated against a substantially larger evidenced body. DATA_MODEL
§4.3 and the pilot's own required-case list both name retailer customisations, so this is the
largest gap in the pilot's coverage of its own brief.

Already-held evidence, unexploited: `thecubicle-gan-v100-maglev-uv-picube-mod` documents a PiCube
20-magnet ball-core mod of GAN V100 MagLev, **and its own excerpt names sibling PiCube mods for
GAN12 MagLev, GAN16 MagLev, and GAN16 MagLev MAX.** As with the Minions discovery, the evidence is
in hand and unused.

**Next best research target, in order:** the PiCube collection page (four products already named,
one source fetch), then TheCubicle's Signature Series (Matty's, Tymon's, Leo's — a systematic line
where each product names its base cube and its servicer).

---

## 8. Two schema gaps found by this audit

Recorded in `docs/pilot-audit.md` as **F8** and **F9**. Both are cases where a fact the archive
holds cannot be represented, and both were found by asking what the *records* needed rather than
what the schema offered.

---

## 9. Targeted evidence pass — the limited-edition queue, resolved

**The aftermarket pass was deliberately not run.** F9 establishes that the schema has no field for
"who serviced this cube" — `coating_applied_by` is coating-specific and was already being misused
for a tuning service. The evidenced aftermarket backlog (PiCube magnet and ball-core mods,
TheCubicle's Signature Series) is *mostly not coating work*. Enumerating it now would either
misuse that field across dozens of records or lose the servicer entirely, and every record would
need migrating once `serviced_by` exists. Budget went to unblocked work instead.

### Method: enumerate the storefront's whole history, not search for names

`npm run wayback -- prefix 'gancube.com/products/' --limit 3000` returned **152 distinct product
slugs GAN's storefront has ever carried.** Filtering for edition-shaped slugs resolved the entire
twelve-lead queue at once — without searching for a single edition name, because the archive's own
URL history *is* the product list.

### Two leads resolved as out of scope

`gan330-antique-rhyme` and `gan330-keychain-ten-years-edition` show GAN330 is a **keychain line**,
filed by GAN under Accessories. That confirms Pass 3's exclusion was right, and resolves both the
"GAN330 X ShanHeSheJiTu" and "Antique Rhyme" leads — neither is a 3x3.

### Eight editions recovered and instantiated

Each from GAN's own product page, each with an archive capture verified by direct fetch:

| Variant | Model | GAN's own title |
|---|---|---|
| `--kun-2020-winter-le` | `gan-flagship-11` | 2020 Winter Limited Edition GAN11 M Pro Kun |
| `--vita-c-2020-summer-le` | `gan-356-xs` | 2020 Summer Limited Edition GAN356 X S Vita C |
| `--chan-2022-summer-le` | `gan-flagship-12` | 2022 Summer Limited Edition GAN12 Maglev Chan |
| `--kunlun-2022-winter-le` | `gan-flagship-13` | 2022 Winter Limited Edition GAN13 Maglev Kunlun |
| `--colore-2023-summer-le` | `gan-flagship-13` | 2023 Summer Limited Edition GAN13 Maglev Coloré |
| `--galaxy-winter-le-uv` | `gan-flagship-14` | Galaxy — GAN14 Maglev Winter Limited Edition_UV Coated |
| `--pro-aurora-summer-le` | `gan-flagship-14` | Aurora — GAN14 Maglev Pro Summer Limited Edition |
| `--emeraldox-summer-le` | `gan-flagship-15` | EmeraldoX — GAN15 Maglev Summer Limited Edition |

Five carry GAN's own **"(For display only, not for sale)"** — the manufacturer retaining a delisted
page as a record. That is first-party evidence of discontinuation, recorded as `probable` because
it establishes the product is not currently sold, not when it stopped.

Three lead names were resolved to different products than assumed: "Vita Cube" is **GAN356 X S
Vita C**; "GAN12 Cheering" and "GAN12 Chan" are not one product — the limited edition is **Chan**,
and `gan-cheering` is a separate slug entirely; "GAN11 Kun" is **GAN11 M Pro Kun**.

### G3 partially closed — four models now carry an honest lower bound

A dated limited edition proves its model existed by that date. Four models gain
`released` with **`qualifier: before`**, which the Date type exists for:

`gan-flagship-11` before 2020 · `gan-356-xs` before 2020 · `gan-flagship-12` before 2022 ·
`gan-flagship-13` before 2022

These are **bounds, not release dates**, and each record says so in its own `note` so no later
reader mistakes one for a launch. Independently, the GAN11 bound corroborates Pass 2's "circa 2020"
introduction for the flagship family from a completely different direction.

### Not instantiated, and why

`gan-i-carry-4-ssl-limited`, `maglev-cube-winter-edition`, `gan-cheering`, the two
`gan356-m-e-golden-*-new-year-edition` slugs (near-identical, likely one product under two slugs —
an alias case needing resolution, not two records), and
`gan356-i-carry-4-smart-cube-chinese-new-year-edition`. All are real GAN slugs and all are worth a
follow-up; none was fetched this pass, and creating records from slugs alone would be inferring
products from URLs.
