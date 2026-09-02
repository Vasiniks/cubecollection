# GAN pilot — schema audit

**In progress.** RESEARCH_SPEC.md §7.3 places the audit at the end of the pilot; this file is
opened at Pass 1 so findings are recorded when they surface rather than reconstructed later.
No finding here has been acted on. Each is a proposed schema or rule change for a human to
decide, after the pilot completes.

## Status

| Pass | State |
|---|---|
| 1 — manufacturer register | **complete.** 6 manufacturers, 19 sources, all checks green |
| 2 — family enumeration | **complete.** 11 families, 31 sources, all checks green. Awaiting the human gate before Pass 3 |
| 3 — model enumeration | **complete.** 47 models across all 11 families, 84 sources, all checks green |
| 4 — variant enumeration | **complete.** 90 variants across all 47 models, 97 sources, 251 records. One accepted lint warning |
| 4.5 — structural cleanup | **complete.** F7 closed, GAN16 ui resolved, Air UM re-tested, variants audited, F6 migration planned, LE queue resolved, 4 models dated. 275 records |
| 5–9 | not started |

---

## F1 — Source tier is a property of the source, but appropriateness is a property of the claim

**Severity: material. Surfaced by:** the rule-9 fix on `data/manufacturers/thecubicle.yml`.

Three facts about TheCubicle — country, founding, website — were attested `confirmed` on its own
About page, which was classified `kind: retailer` (tier 2). Rule 9 correctly rejected that: one
tier-2 source cannot establish `confirmed`.

The fix reclassified the source to `kind: manufacturer_official` (tier 1). **That is correct as
far as it goes.** TheCubicle is a `manufacturer` record in this archive (`kind: service`), and an
organisation's own page is primary evidence for facts about itself. It matches the precedent
already set by `gancube-brand-story-about-us` and `picubeshop-about-us`.

But the tier now attaches to the **source record**, not to the claim. `thecubicle-about-us` is
tier 1 for TheCubicle's own corporate facts and would be tier 2 at best — tier 4 for anything
comparative — if cited for a fact about GAN or about a product. Nothing prevents that second use,
and rule 9 would accept it as tier-1 corroboration.

RESEARCH_SPEC §3.3 already states the principle in prose ("manufacturer material is tier 1 for its
own specifications and tier 4 for comparative or superlative claims"). Nothing enforces it.

**Options for a human:**

1. Add an optional `tier_for` qualifier on an attestation's source reference, letting a claim
   state the tier it is relying on rather than inheriting the source's global tier
2. Add a `subject` field to `source`, naming the entity the source is primary *about*, and have
   rule 9 treat tier 1 as tier 3 when the cited claim is about a different entity
3. Leave it to the `source-auditor` human gate and accept that the rule is approximate

Option 2 is mechanically checkable and cheap. Option 1 is more precise but puts the judgement at
every call site.

---

## F2 — No manufacturer-level predecessor relationship

**Severity: material. Surfaced by:** the GANSPUZZLE / GAN identity question.

Pass 1 established, from a 2011 archived capture of the predecessor brand's own site, that a
`GANSPUZZLE` brand states its own founding in 2010, before the 2014 incorporation that three
tier-1 GAN pages give. Whether GANSPUZZLE and GAN are one continuous organisation or a
predecessor/successor pair is unresolved and may stay that way.

The schema cannot express the second reading. `manufacturer` carries `parent_id`, which is
containment for sub-brands, and no `relationships` array — so `succeeds`, `rebrand_of`, and
`reissue_of` are unavailable at manufacturer level. The relationship vocabulary already contains
the right types; only the field is missing.

The current record handles this honestly by recording GANSPUZZLE as an alias and documenting the
uncertainty in `notes` and a four-candidate `disputed` block. That is the correct behaviour under
the present schema, and it is lossy: a reader querying the data cannot find the relationship,
only prose.

**Option for a human:** add `relationships` to `manufacturer.schema.json`, reusing
`common/relationship`. Cheap, and `validate.mjs` already resolves relationship targets
generically. Deferred rather than done, because a schema change mid-pilot is exactly what §7.3
says to decide at the end, with the whole picture.

---

## F3 — Rule 9 has no notion of source independence

**Severity: advisory. Surfaced by:** repeated near-misses across the register.

Rule 9 accepts "two independent tier 1–2 sources" but can only count distinct source ids. Two
retailer pages carrying the same copied manufacturer spec table satisfy it mechanically while
being one source in fact.

This is stated as a human gate (DATA_MODEL §7.6) and is the `source-auditor`'s central job, and
the independence map that role produces has not yet been built for this domain — the auditor
agent has been cut off by session limits on every attempt so far. Until it exists, `confirmed`
claims resting on two tier-2 sources should be treated as provisional.

No schema change proposed. Recorded so the gap is visible.

---

## F4 — `positioning` is time-varying, but the schema stores one value

**Severity: material. Surfaced by:** `data/families/gan-356.yml`.

That family is recorded `positioning: mainline`. Its own description establishes, from GAN's
tier-1 technology-history page, that the line was GAN's **flagship** through 2018–2019 and was
displaced from that position around 2020 when a separately numbered line began.

Both facts are true of different periods. The schema has a single `positioning` enum with no
temporal dimension, so the current state is stored as data and the history survives only as
prose. A reader querying the archive for "what was GAN's flagship line in 2018" cannot find it;
a reader reading the description can.

This is the same shape as F2 — a fact the archive genuinely knows, flattened into a field that
cannot hold it, recoverable only by reading. It will recur: positioning changes are normal in a
manufacturer's range, and this is the first family examined.

**Options for a human:**

1. Make `positioning` an array of `{ value, from, to?, source }` periods, mirroring how
   `legality.historical[]` already handles exactly this problem for WCA status
2. Keep the scalar as "current positioning" and add an optional `positioning_history[]`
3. Accept the loss and rely on `description`

Option 1 has precedent inside this schema already, which is an argument for consistency: the
same problem was solved once and should not be solved twice in different shapes.

---

## F5 — Rule 29 flagged every single-model family as a possible duplicate *(fixed)*

**Severity: material. Surfaced by:** Pass 3. **Already fixed**, recorded because the reasoning
matters more than the patch.

Rule 29 flags a name that identifies more than one record. After Pass 3 it produced six
warnings, all of one shape: a family and its own only model answering to the same name —
`gan-357` / `gan-357-original`, `gan-v100` / `gan-v100-maglev`,
`monster-go-smart-cube-series` / `monster-go-3ai`, and three more.

None is a duplicate. **A single-model family simply *is* that product**, and the family name and
the model name being identical is the normal case, not a collision. The rule was comparing names
globally without knowing that one record contained the other.

Left alone this would have put six permanent false positives into a human-review queue — and a
queue that is always red stops being read, which is exactly the failure QC identified for the
self-test's stale assertion (F-series precedent, `research/qc/gan-2026-09-01.md` M8). The cost is
not the noise; it is that the seventh warning, the real one, would have been skipped with the six.

**Fix applied.** `check-duplicates.mjs` now walks the containment chain
(`specimen → variant → model → family → manufacturer`) and exempts a name shared *within one
lineage*, reporting the count as a note instead. A collision between unrelated records still
fires. A fail-fixture record (`zz-collider`) and two self-test assertions now guard both
directions: that lineage names are not flagged, and that the exemption does not swallow a genuine
cross-lineage collision.

---

## F6 — Stock body colours were collapsed, and the archive cannot currently render a cube

**Severity: blocking for Phase B. Surfaced by:** Pass 4. **Not fixed** — this is a decision for
the archivist, and it is the most consequential open question in the pilot.

Pass 4 recorded one `standard` variant per model covering all ordinary stock body colours
(Black / White / Primary / stickerless), listing the available colours in prose. Named,
marketed colourways — Love Pink, Crystal Blue, Christmas Edition, AQUALIS, Minions — each got
their own variant. The agent flagged the call itself as a tension rather than smoothing it over,
which is why it is reviewable.

**The case against the call.** DATA_MODEL §4.1 lists "colourway or sticker type" as a
required-difference axis, and §4.1's *not-a-variant* list — region, retailer naming, price,
bundles, batch changes, lubrication — does not include stock colour. Under the materiality test
("would a collector consider it a different object to own"), a black cube and a stickerless cube
plainly are. The rule as written says split.

**The case for it.** A stock colour chosen from a dropdown on one product page, never named and
never marketed, sits closer to a purchasing option than to a colourway. Splitting multiplies the
record count several-fold for differences the manufacturer itself does not name.

**What tips it.** The build reports what this costs:

| `colorway.completeness` | variants |
|---|---|
| no colourway block at all | 69 |
| `partial` | 20 |
| `none` | 1 |
| **`renderable`** | **0 of 90** |

PRODUCT.md's stated direction is an exhibition that renders cubes procedurally, and the
colourway schema was expanded specifically for it. The archive currently cannot distinguish or
draw any ordinary GAN cube by colour — the single most visible attribute a speedcube has. The
collapse was decided in a pass that did not yet hold the colourway data needed to judge it.

**Recommendation: reverse the collapse, but not by re-running Pass 4.** Do it inside Pass 5's
colourway fill. Splitting now would create three near-empty records where one partial record
stands; splitting *while* filling per-face colour, body plastic and finish produces three
complete ones. The collapse was applied consistently across every model, so it is mechanically
reversible — each `standard` variant already names its stock colours in prose.

---

## F7 — `signature_of` and `commemorates` cannot be used at all

**Severity: material. Surfaced by:** Pass 4.

`data/people/` and `data/events/` are empty, so no variant can point at a person or an event.
Pass 4 produced a record that needs both: the GAN356 Air UM Max Park Signature Edition, run size
639, numbered 50001–50639, commemorating a 6.39-second world-record average — the run size *is*
the record. It carries `edition.types: [limited, signature, commemorative]` correctly, and then
has nowhere to point.

The information survives in `significance` prose. As with F2 and F4, a fact the archive genuinely
knows is held only as text: a reader cannot query for every signature edition, or for everything
commemorating a given record.

**What a human should do.** Create `person` and `event` records as their own small pass — they are
cheap, the schemas exist and are unused, and every signature or commemorative edition found from
here on will need them.

---

## F8 — `collaboration_with` cannot hold a licensed property *(partially fixed)*

**Severity: material. Surfaced by:** the Pass 4.5 structural audit. **Option 3 shipped.**

Three variants carry `edition.types: [collaboration, …]` with an empty `collaboration_with`:
`gan-v100-maglev--minions-edition`, `gan-i4--maglev-minions-edition`, and
`gan-i-carry-4--minions-edition`. A fourth, `gan-ui-16-maglev-max--minions-edition`, was added in
the cleanup and has the same shape.

The records are not at fault. `collaboration_with` resolves to a `person` or a `manufacturer`, and
the collaborator here is **a licensed entertainment property** — neither a person nor an
organisation that makes cubes. GAN's own navigation treats "Minions" as a distinct product line
spanning V100, i4, i Carry 4 and GAN16 ui, so the collaboration is real, cross-line, and
structurally invisible.

The archive can therefore say a product is a collaboration but not what it is a collaboration
*with*, for the entire class of licensed-IP editions — which in this domain is most of them.

**Options for a human:**

1. Allow `collaboration_with` to resolve to a `manufacturer` record with `kind: collaborator`,
   created for the **rightsholder** once a source names it. Cheapest, uses existing machinery, and
   `kind: collaborator` already exists for exactly this shape of entity. Requires sourcing the
   licensor, which no source held currently names
2. Add a `property` or `franchise` entity for licensed IP. Most accurate, most new surface
3. Add a free-text `collaboration_name` beside the reference, so the name survives even when the
   organisation behind it is unknown

**Option 3 was applied.** `edition.collaboration_name` now holds the collaborating party's name
verbatim, and the four Minions variants carry `"Minions"` with an attestation. The fact is kept
rather than lost to an empty reference.

**Option 1 remains the right long-term shape** and is not blocked: when a source names the
rightsholder, add a `manufacturer` record with `kind: collaborator` and populate
`collaboration_with` beside the name. The two are complementary. `collaboration_with` stays empty
today rather than pointing at a fabricated entity.

---

## F9 — There is no field for "who serviced this cube", only "who coated it" *(fixed)*

**Severity: material. Surfaced by:** the Pass 4.5 structural audit. **Resolved.**

`gan-356-air--um-max-park-signature` records `config.coating_applied_by: cubicle-labs` on a product
that **has no coating**. The service performed was a tuning setup — specific lubricants, yellow GES
nuts, looser tensions — and `coating_applied_by` is the only field in the schema that names a
servicer, so it was pressed into duty for a service it does not describe.

This is my own design error, not the researcher's. §4.3 assumed aftermarket products are
*coated* products. The domain's aftermarket is broader: coatings, magnet swaps, core mods, and —
most commonly — setup and tuning, which changes no material at all.

It matters now because the pilot's largest remaining gap is aftermarket coverage, and the evidence
already held (PiCube magnet/ball-core mods, TheCubicle Signature Series tuning) is **mostly not
coating work**. Enumerating it against the current schema would either misuse `coating_applied_by`
across dozens of records or lose the servicer entirely.

**Options for a human:**

1. Add `config.serviced_by` (a `manufacturer` reference) and `config.service_description`, and
   narrow `coating_applied_by` to what its name says. `modified_from` already carries the
   derivation; this carries the identity
2. Rename `coating_applied_by` to `applied_by` and broaden its documented meaning. One-line change,
   but it makes an existing field mean something new, which is worse for a record written last week
   and read in five years

**Resolution — neither option exactly.** A single `serviced_by` field could not represent several
modifications on one cube, which is the normal case. What shipped instead:

- **`config.coating_applied_by` removed.** One record used it, so migration cost was one file — and
  it would never have been cheaper. Keeping it beside a servicer field would have put one fact in
  two places, which is the drift this archive exists to avoid
- **A `service` object added to `variant`:** `serviced_by` (a `manufacturer` with `kind: service` —
  no new entity class needed), `program` for the servicer's own name for the line, and
  `modifications[]`, one entry per distinct piece of work, typed against a new
  `vocab/service-modifications.yml`
- **Coating stays in `config.coating`.** It is what the object *is*, whoever applied it. Coating by
  a service is `config.coating: aftermarket` plus a `modifications[].kind: coating` entry
- **Rule 39** requires `service` and `modified_from` together in both directions, and requires an
  attestation on `serviced_by` where a service exists
- **The Max Park record migrated:** a tuning-and-lubrication service, now recorded as two typed
  modifications instead of a coating field on an uncoated cube

The division that made it work: **`config` records what the object is; `service` records what was
done to it and by whom.** Getting that boundary right made the rest fall out.

Deliberately not built: cost, turnaround, warranty, per-modification pricing. This is an archive,
not a CRM.

---

## F10 — The fingerprint could not tell two aftermarket products apart *(fixed)*

**Severity: material. Surfaced by:** the first four aftermarket records, immediately. **Fixed.**

Rule 28 fired the moment the PiCube mods were created: `gan-flagship-16--picube-20-magnet-ball-core-mod`
and `gan-flagship-16--max-picube-20-magnet-ball-core-mod` produced **one fingerprint for two real
products**.

Both are the same modification by the same servicer, with the same coating, on the same model. They
differ only in **which base variant they were built from** — one on GAN16 MagLev UV, one on GAN16
MagLev MAX UV — and the base variant was not a fingerprint input. Everything the fingerprint looked
at was identical, because everything it looked at genuinely was.

**An aftermarket product's identity includes what it was made from and who made it.** The
fingerprint now includes the `modified_from` target and `service.serviced_by`.

The change was free: `fingerprint` is derived and rule 37 forbids authoring it, so no stored value
existed to migrate. A fixture pair now differs *only* in `modified_from` target and must not
collide, so the gap cannot silently return.

**Worth noting about method.** This was predicted when Pass 4 launched — that the first large
variant set would be the real test of whether the fingerprint discriminated finely enough, and that
finding out at a hundred records beats finding out at ten thousand. It failed at 104. The duplicate
queue did exactly what it exists for, and the answer was to sharpen the fingerprint rather than to
invent a distinction between the records.

A second warning fired alongside it and was **not** a schema problem: four products shared an alias
because the servicer's *program* name had been put in `aliases`. A program is not a product name,
and `service.program` already held it. Removing the duplicate was the fix — not suppressing rule 29.

---

## A note on `unknown` versus absent, carried into Pass 5

Pass 3 produced two conventions for the same situation. The 37 `gan` models leave
`model.specs` **absent** — nobody looked, which is accurate for a pass that was told not to fill
specifications. The 10 `monster-go` and `swift-block` models record explicit
`confidence: unknown` attestations on those same fields — someone looked and found nothing.

Both are defensible and the coverage report is reading them correctly. But they are different
claims about the same pass, and when Pass 5 fills specifications the `gan` models need the same
treatment or the coverage figures will keep comparing two different things. Not a schema problem;
a consistency item for the pass that fills them.

---

## What went right, and should not be changed

- **The `disputed` block did exactly what it exists for.** The founding-date question turned out
  to be four candidate events across four dates, not a two-way conflict. Every candidate is
  retained with its own sources, confidence, and a note on what that source actually supports.
  The main field keeps the best-attested value and says explicitly that this is not an
  adjudication. No schema change needed; the mechanism held under real ambiguity.
- **`confidence: unknown` on absent fields worked.** Swift Block's country and website are now
  recorded as searched-for and not found, rather than silently missing — which is the distinction
  the coverage report depends on.
- **A contested boundary was recorded with its counter-evidence rather than smoothed over.**
  `gan-flagship-series` names the alternative reading it rejects, records that GAN's own tier
  labelling is unstable across captures, and points at the notes log before its boundary is
  treated as settled. That is the behaviour §4.2 asks for, and it is what makes the call
  reviewable instead of merely asserted.
- **Rule 9 blocked a real over-claim** rather than a nuisance one. Three facts were marked
  `confirmed` on evidence that did not support it. The rule fired, and the fix improved the record.
