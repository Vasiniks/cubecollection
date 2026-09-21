# Phase III Architecture Review — Lane E (Hostile Reviewer)

Status: COMPLETE.

Scope: attack the Phase III exhibition/rendering-convention work (data adapter,
three.js convention resolver, exhibit UI, design tokens) and report defects.
Read-only lane. Two transient control tests were written under
`web/src/*/_control_check.test.ts` to reproduce suspected bugs, run, and then
deleted; one transient edit was made to `web/src/exhibit/VariantPage.tsx` to
prove a type-safety gap under `tsc`, then reverted. `git status` is clean of
unintended changes (an incidental `.impeccable/` hook-cache directory created
by the editor tooling was also removed). `web/node_modules` was installed
(gitignored, not tracked) solely so `tsc --noEmit` and the full test suite
could actually run rather than being asserted from reading.

Every finding below is tagged **CONFIRMED** (reproduced with a command, a
control test, or an exact independent recomputation) or **SUSPECTED**
(reasoned from code but not executed).

## Commands run and actual results

| Command | Result |
|---|---|
| `npm run check` (root) | **PASS** — 0 errors across schemas, validate, conventions (C1–C5), lint (30 advisory warnings, pre-existing), duplicates, escalations, build, privacy, selftest, coverage. Full log captured. |
| `node scripts/build.mjs` (publication mode) | PASS, 0 public records (every record is `stub`/`drafted`/`sourced`; none `published` — matches docs). |
| `npm run build:preview` (root) | PASS, `dist/preview`: 511 public variants, 1575 public records. |
| `npm test` (web/) | **19/19 pass**, 0 failures. |
| `npx tsc --noEmit` (web/, after `npm install --cache $TMPDIR/npm-cache`) | **PASS**, 0 errors. |
| Control test: `resolveCubeVisualSpec` on a face with `color_name` set, no `color_normalized` | CONFIRMED bug — see Claim 2. |
| Control test: `adaptVariant` face attested at `color_name` pointer | CONFIRMED bug — see Claim 5. |
| Control test: `adaptVariant` body colour with only `plastic_color_normalized` | CONFIRMED gap — see Claim 5. |
| Control edit: remove `as never` casts in `VariantPage.tsx` | CONFIRMED a real `tsc` type error was being suppressed — see "Type-safety gap" below. |
| Independent recomputation of every count in `docs/RENDERING_CONVENTIONS.md` §1 and `conventions/rendering-conventions.yml`, via `scripts/lib/archive.mjs` primitives | **All correct**, exact matches — see "Counts" below. |
| Independent recomputation of 28 WCAG contrast ratios cited in `web/src/styles/tokens.css` | **All correct** to 2 decimal places — see Claim 8. |
| `git diff --stat <pre-Phase-III commit> HEAD -- data/` | **Empty** — zero files under `data/` touched anywhere in the Phase III commit range. See Claim 4. |

---

## Claim-by-claim verdicts

### 1. A convention can never be presented as an archival fact

**Mostly holds, with one CONFIRMED exception.**

The type-level design is sound and does what it claims: `Value<T>`
(`web/src/data/types.ts`) and `Provenance<T>` (`web/src/three/provenance.ts`)
are discriminated unions where `SourceBackedValue`/`SourceBacked` is the only
variant with `confidence`/`sourceIds`, and `ConventionValue`/`Convention` has
no such fields — the type checker, not a runtime `if`, forbids reading a
confidence off a convention. `tsc --noEmit` passes clean, confirming this
holds throughout the current codebase.

**CONFIRMED exception**, found by control test: in
`web/src/three/types.ts::resolveCubeVisualSpec`, a face documented with
`color_name` but no `color_normalized` hex is **not** surfaced as `unknown`
(as the `applyStandardFaceScheme: false` branch correctly does) — it is
silently replaced by the WCA convention colour, tagged `kind: 'convention'`,
carrying `STANDARD_SCHEME_RATIONALE`'s text: *"the archive deliberately does
not record face colours for any of its 511 public variants."* That sentence
is untrue for this specific record: the archive does have a name for this
face's colour. The archival fact (a colour name) is discarded and a museum
default is substituted in its place with a disclosure that denies the
record has any colour information at all. Reproduced:

```
U face provenance: {"kind":"convention","value":{"colorHex":"#F5F5F0"}, ...}
CONFIRMED: color_name-only face silently became a CONVENTION value, hex= #F5F5F0
```

Currently dormant: zero variants in the archive populate `colorway.faces` at
all (confirmed by direct grep and by independent recomputation, see
"Counts"), so this exact path has never fired against real data. It will fire
the moment any researcher records a face colour by name without also
normalizing it to hex — a schema-legal, plausible state (`color_name` is
optional and independent of `color_normalized`).

### 2. The archive always wins over a convention

**VIOLATED in the three.js resolver. Holds trivially in the data adapter (which never applies a convention at all).**

`web/src/data/adapter.ts::adaptVariant()` never calls
`standardFaceColorConvention()` — confirmed by reading and by grep; the
convention application is opt-in and unused by the adapter, so "archive wins"
holds there only because no convention ever competes.

`scripts/validate-conventions.mjs`'s `when_absent` check operates at
**record/pointer granularity** (`/colorway/faces` — the whole array either
resolves or it doesn't). `web/src/three/types.ts::resolveCubeVisualSpec`
applies the convention at **per-face granularity**, independently for each of
the six faces. These two granularities silently diverge the moment a record
documents *some but not all* faces. Reproduced by control test: a variant
with only face `U` documented (`#123456`) still gets faces `D`–`R` filled in
with the WCA convention, even though `/colorway/faces` is non-empty for that
record (meaning `scripts/validate-conventions.mjs`'s C3 re-measurement would
no longer count that record in `cv-face-colours-wca-standard`'s
`affected_records`, while the renderer still shows five convention-coloured
faces on it):

```
U (documented): {"kind":"source-backed","value":{"colorHex":"#123456"},"from":"variant"}
D (undocumented, same record): {"kind":"convention", ...}
CONFIRMED: per-face convention fallback fires even though /colorway/faces is
non-empty for this record (registry when_absent is array-level).
```

Combined with Claim 1's finding (a `color_name`-only face silently becomes a
convention value even though the archive *does* have something to say about
that face), this means "the archive always wins" is true today only because
the archive currently says literally nothing about any face on any variant.
The precedence rule is enforced by **prose and by accidental total silence in
the data**, not by code that would still get it right once partial face data
exists. This is exactly the kind of finding the task asked me to distinguish
from a merely theoretical worry: the divergence is architecturally live, not
speculative — I made it fire with a five-line fixture.

Severity: **Medium-High** (latent; zero current-data impact; would silently
mislabel real archived colour claims as inventions the moment colourway
research on faces begins, with no test or CI rule positioned to catch it —
`conventions.test.ts` only checks the six flat hex constants, not this
resolution logic).

### 3. `affected_records` is trustworthy

**Correct today, and I recomputed every figure independently to make sure — but the measuring function's granularity does not match the renderer's, per Claim 2's finding, so it can and will diverge.**

I did not merely re-read the YAML; I recomputed each count from scratch using
`scripts/lib/archive.mjs`'s own `pointerGet`/`loadRecords` (the same
primitives `validate-conventions.mjs` uses), independent of the checked-in
YAML values:

```
total variants: 527
face colours (any face) documented: 0      (registry: 527 affected — matches)
logo placement documented: 0               (registry: 527 affected — matches)
geometry profile documented: 0             (registry: 527 affected — matches)
body plastic colour documented: 22         (registry: 505 affected = 527-22 — matches)
surface application documented: 122        (registry: 405 affected = 527-122 — matches)
size_mm documented: 236                    (RENDERING_CONVENTIONS.md's own footnote — matches)
application distribution: stickerless 78, stickered 22, printed 15, hybrid 4,
  inlaid 2, unknown 1                      (doc: "78 ... 22 stickered, 15
                                             printed, 4 hybrid, 2 inlaid, 1
                                             explicitly unknown" — EXACT match)
application confidence: uncertain 70       (doc: "70 of those 122... uncertain" — matches)
size_mm mode 56 (freq 75), median 56, range 15-188  (doc: exact match)
```

`npm run conventions` (`scripts/validate-conventions.mjs`) also passed clean
(C1–C5, 0 errors) against the live archive, confirming the registry's
declared `affected_records` for all six conventions matches a fresh C3
re-measurement right now.

`renderBlockers()` in `scripts/lib/archive.mjs` and the C3 `measure()`
function in `validate-conventions.mjs` **agree today** (both effectively
reduce to "is `colorway.faces` non-empty," since no face entry anywhere has
even a bare `{face: 'U'}` with no colour). But they measure different
predicates: `renderBlockers()` filters by `color_name || color_normalized`
per face (field-level completeness), while the registry's `when_absent`
check (used by C3) only asks whether the `/colorway/faces` array pointer
resolves to something non-empty (record-level presence). A colorway entry
recording only `{face: 'U', material: 'sticker'}` (schema-legal: only `face`
is required) would make `/colorway/faces` "present" per C3 — removing that
variant from `cv-face-colours-wca-standard`'s count — while
`colorwayCompleteness()`/`renderBlockers()` would still correctly say the
face colour is undocumented. **Verdict: trustworthy for the archive as it
exists today; not structurally guaranteed to stay trustworthy, and the
resolver (Claim 2) already diverges from the registry's own accounting
model.**

### 4. No record status was changed to make the exhibition work

**CONFIRMED, via git history, not commit messages.**

```
git diff --stat <commit before "docs: exhibition UX section 3"> HEAD -- data/
-> empty output
git diff <same range> -- data/ | grep -c "^[+-]  *status:"
-> 0
```

Zero files under `data/` were touched by any commit in the entire Phase III
chain (from the first exhibition-planning doc commit through
`14d3b33`, plus this lane's own work). `npm run build` (publication mode)
independently confirms all 527 variants remain `stub` today (0 public
records emitted), matching the documented pre-Phase-III state exactly.

### 5. The adapter never fabricates, never raises confidence, never drops a dispute

**The 15 `adapter.test.ts` assertions genuinely hold for the paths they test.** I tried to find a counter-example specifically around `disputed`, `unattestedValue`, and `searched`, and did — but in a narrower spot than those tests cover: the per-array-item attestation *pointer* the adapter looks up, not the confidence/disputed logic itself.

**CONFIRMED (control test): a genuinely-sourced face colour can be reported as `searched: false` ("never examined").**
`web/src/data/adapter.ts::adaptVariant()`'s face loop always queries the
attestation map at `/colorway/faces/{idx}/color_normalized`, even when the
raw value it is carrying came from `color_name` (`rec?.color_normalized ??
rec?.color_name`). If a researcher attests the colour at
`/colorway/faces/{idx}/color_name` (the pointer that actually matches the
populated field), the adapter looks at the wrong key, finds nothing, and
reports:

```
U face Value: {"basis":"unknown","searched":false,"unattestedValue":"black"}
CONFIRMED: searched=false even though an attestation exists at
/colorway/faces/0/color_name
```

This is a real degradation, not just an unattested-content case the
`UnknownValue.unattestedValue` design already anticipates: the archive DID
cite a source for this value, and the adapter reports the opposite of that —
"nobody has looked yet" — which is precisely the distinction Claim 5 says
must never collapse. Currently dormant (no variant attests a face colour by
either pointer today).

**CONFIRMED (control test) related gap: a body colour recorded only as
`plastic_color_normalized` (no `plastic_color_name`) is dropped entirely,
not even surfaced as `unattestedValue`.**
`adaptVariant()`'s `body.plasticColor` reads and attests only
`/colorway/body/plastic_color_name`; `plastic_color_normalized` is never
read anywhere in `adapter.ts`. In real data this is currently harmless — all
22 documented body colours use `plastic_color_name` and none use
`plastic_color_normalized` (verified by grep across `data/variants/`) — but
a confirmed, sourced hex-only body colour would vanish without a trace:

```
plasticColor Value: {"basis":"unknown","searched":false}
CONFIRMED: a confirmed, sourced plastic_color_normalized value is dropped
entirely (not even carried as unattestedValue).
```

Everything else I tried to break — disputed-preservation, confidence
non-promotion, the searched/never-searched split for scalar fields, model→
variant inheritance not reaching sibling variants, missing-source handling —
held. `adapter.test.ts`'s own "every variant in the real bundle" test
(`sourceBackedFaces === 0`, `renderable === 0`) also passed against the real
preview bundle, which is a genuine, non-tautological check.

### 6. The three convention values in code match the registry (guarded)

**Bevel, size, and the six hex codes in `web/src/three/types.ts` are correctly guarded by `conventions.test.ts` and currently match. A second, unguarded duplicate exists in `web/src/data/adapter.ts`.**

`web/src/data/adapter.ts` has its own `STANDARD_FACE_COLORS` constant
(mirroring the same six hexes). **CONFIRMED: it is not guarded by any
test.** `adapter.test.ts` only asserts that `STANDARD_FACE_COLOR_CONVENTION_ID`
resolves to a real registry entry and that the shape carries no
confidence/sourceIds — it never compares the actual hex *values* against the
published registry the way `conventions.test.ts` does for
`web/src/three/types.ts::STANDARD_SCHEME_HEX`. Today the two copies agree
(`#F5F5F0`/`#E6C200`/`#00843D`/`#0051BA`/`#E8620C`/`#C41E3A` in both), but
nothing in CI would catch it if they drifted.

Worse: `adapter.ts`'s entire `standardFaceColorConvention()` /
`STANDARD_FACE_COLORS` / `STANDARD_FACE_COLOR_CONVENTION_ID` cluster is
**dead code outside its own test file** (confirmed by grep — no app or
exhibit code imports it; `README.md` itself says "Nothing in `adaptVariant()`
calls it"). It is a second, redundant, unguarded implementation of the same
convention that `web/src/three/types.ts` already implements and does guard.
Two independent hand-copies of an archival-visual-default value in one
codebase, one guarded and one not, is exactly the drift risk Claim 6 asks
about.

Also unguarded: `STANDARD_SCHEME_RATIONALE`, `DEFAULT_BEVEL_RATIONALE`, and
`DEFAULT_SIZE_RATIONALE` in `three/types.ts` are hand-written prose
paraphrases of the registry's `rationale`/`visitor_disclosure` text
(including specific figures like "227 of the 511 public variants" and "511
public variants"). No test compares this prose to the registry. In practice
this is lower-risk than it looks because (see "Dead code" below) none of this
prose is ever actually shown to a visitor.

### 7. The UI invents no disclosure wording

**Holds for the two places that display convention text** — `ConventionsPage.tsx` and `VariantPage.tsx`'s convention list both read `visitor_disclosure`, `asserts_nothing_about`, `rationale`, `convention_basis`, and `if_removed` directly off the fetched registry (`app/conventions.ts::loadConventions()`), verbatim, with no paraphrasing. `values.tsx`'s `BasisBadge`/`CONFIDENCE_LABEL` are plain, fixed vocabulary words ("Confirmed", "Researched, not found", "Rendering convention") that match `vocab/confidence.yml`'s value set — not invented, if terse.

**Related but distinct gap, CONFIRMED by code trace:** `VariantPage.tsx`'s
`inForce` filter, which decides *which* convention notices to show on a given
variant's page, treats the six conventions inconsistently:

```js
const inForce = conventions.filter((c) =>
  ['cv-face-colours-wca-standard', 'cv-geometry-generic-3x3', 'cv-logo-omitted'].includes(c.id)
  || (c.id === 'cv-body-plastic-neutral' && isUnknown(view.colorway.body.plasticColor))
  || (c.id === 'cv-size-56mm-fallback' && !view.resolvedSpecs.size_mm)
  || (c.id === 'cv-surface-stickerless-fallback' && isUnknown(view.colorway.application)));
```

Three conventions (`cv-body-plastic-neutral`, `cv-size-56mm-fallback`,
`cv-surface-stickerless-fallback`) are correctly gated per-record via
`isUnknown(...)`/presence checks. The other three
(`cv-face-colours-wca-standard`, `cv-geometry-generic-3x3`,
`cv-logo-omitted`) are **unconditionally always shown**, on the hardcoded
assumption that face colour, geometry profile, and logo placement are
undocumented on *every* variant. That assumption is true for 527/527 today
(confirmed above), but the moment any single variant gets a documented face
colour, logo placement, or geometry profile, this specific variant's page
would keep showing "the archive does not document this cube's colours" (or
logo/geometry equivalents) — a false disclosure, not an invented one, but a
disclosure the code no longer checks the truth of. This does not use
invented *wording* (Claim 7's literal text still holds), but it is the same
family of failure the six-convention system exists to prevent, applied to
the *decision of when to show the notice* rather than the notice's content.

### 8. Lane B's accessibility claims

**CONFIRMED, fully.** I recomputed 28 of the contrast ratios cited in
`web/src/styles/tokens.css`'s comments (both light "Gallery" and dark
"Vitrine" themes; ink/surface, accent, all six confidence hues, and the
convention slate hue) from the actual shipped hex values, using the WCAG 2.1
relative-luminance formula independently in Python — not the four the task
required a minimum of. Every single one matched the comment to two decimal
places; none were rounded favourably or wrong. Sample:

```
ink-900 vs surface-0 (light)         claimed=16.85  actual=16.85  OK
confidence-uncertain vs surface-1     claimed= 3.15  actual= 3.15  OK
evidence-convention vs surface-0      claimed= 6.49  actual= 6.49  OK
DARK accent-500 vs surface-0          claimed= 8.27  actual= 8.27  OK
```

I also checked the "confidence hues are never used as text colour" claim
across the **entire** `web/src` tree (not just `base.css`, in case a page
component overrode it): every reference to `--confidence-*` or
`--evidence-convention` across `tokens.css`, `base.css`,
`app/conventions.css`, and `exhibit/VariantPage.css` is a `background`,
`border`, or `border-left` — never a `color:` (text) property. The
`.evidence-badge` label text is hardcoded to `--ink-900` regardless of
`data-confidence`, exactly as claimed. This claim holds without
qualification.

---

## Additional hunts

### Counts

**CONFIRMED second instance of the "wrong denominator/count" error class the brief said had already been fixed once.**

`web/src/three/CubeGeometry.ts` line 18–19 states: *"`size_mm` is documented
for only 50 of 511 public variants (EXHIBITION_ARCHITECTURE §4.4)."* This is
wrong. I built the actual `dist/preview` bundle (511 public variants) and
counted `resolved_specs.size_mm` presence directly:

```
preview variant count: 511
size_mm documented (resolved_specs): 227
```

227, not 50 — a 4.5x understatement. The "50" figure is real, but it is a
*different* statistic than "documented": it is `EXHIBITION_ARCHITECTURE.md`
§4.4's count of variants that **directly override** `size_mm` at the variant
level (excluding model-inherited values) — confirmed by counting
`resolved_specs.size_mm.from === 'variant'` in the same bundle, which gives
exactly 50. `web/src/three/types.ts` (line 169) already carries the
*corrected* figure — "`size_mm` resolves for 227 of the 511 public variants
(236 of 527 across the whole archive)" — so this is the same conflation the
task said had been fixed once, recurring in a second file that cites the same
underlying number.

Every other numeric claim I checked was correct: all figures in
`docs/RENDERING_CONVENTIONS.md` §1, all six `affected_records`/`measured_on`
values in `conventions/rendering-conventions.yml`, `docs/EXHIBITION_ARCHITECTURE.md`
§10.2/§10.3's 511/489/256 figures, and the 227-of-511/236-of-527 pair
everywhere else it appears (`provenance.ts`, `data/README.md`,
`docs/design/EXHIBITION_UX.md`, `docs/design/VISUAL_LANGUAGE.md`) — all
independently recomputed and matched exactly. I did not find a third
instance.

### Documentation overclaim: "control-tested by mutation"

**CONFIRMED false as written.** `docs/EXHIBITION_ARCHITECTURE.md` §11.2:
*"Enforced by `scripts/validate-conventions.mjs` rules C1–C5, all
control-tested by mutation."* `scripts/selftest.mjs` — the repository's
actual mutation-testing harness, whose own header states "Proves the rules
actually fire" via engineered fail-fixtures — contains **zero** references to
`validate-conventions.mjs` or to rules C1–C5 (confirmed by grep; it only
covers `validate.mjs`/`lint-semantic.mjs` rules 1–52-ish). No other fixture
directory or test file mutation-tests the convention validator anywhere in
the repository. The rules genuinely run and genuinely would fail the build on
a real violation (I traced the logic and it is sound), but the specific,
checkable claim that they are "control-tested by mutation" is not true of
anything currently committed.

### Dead code / unreachable branches

- `web/src/three/provenance.ts::provenanceLabel()` is exported and
  documented as "what a UI layer shows a visitor," but is never imported or
  called anywhere in `web/src` outside its own module.
- `DEFAULT_SIZE_RATIONALE` (`three/types.ts`) is defined but never passed to
  `convention(...)` or read anywhere — `resolveCubeVisualSpec`'s `sizeMm`
  field is only ever `sourceBacked` or `unknown('not_researched')`, **never**
  `convention`, even though the module's own header and `CubeGeometry.ts`'s
  header both describe the 56mm fallback as "a labelled convention value."
  The actual 56mm substitution happens two layers downstream, in
  `CubeGeometry.ts::geometryInputsFromSpec()`, via a bare
  `resolveValue(spec.sizeMm, DEFAULT_SIZE_MM)` numeric fallback that carries
  no provenance tag at all — `GeometryInputs.sizeMmProvenanceKind` reports
  `'unknown'` for a cube that is, in fact, being drawn at a specific labelled
  convention size. This is an architecture inconsistency between `bevel`
  (correctly always wrapped as `convention(DEFAULT_BEVEL, ...)`) and `sizeMm`
  (never wrapped as a convention at all).
- `GeometryInputs.sizeMmProvenanceKind` / `bevelProvenanceKind`
  (`CubeGeometry.ts`) are computed by `geometryInputsFromSpec()` but the
  module's only caller, `three/index.ts::buildExhibitCube()`, destructures
  only `{ sizeMm, bevel }` and discards both provenance-kind fields —
  confirmed by grep, nothing downstream ever reads them.
- `materials.ts::faceColorProvenance()`'s `if (!face.value.colorHex) { ... }`
  branch is unreachable: every non-`unknown` `Provenance<FaceColorSpec>` that
  `resolveCubeVisualSpec` can produce already has `colorHex` populated (the
  `sourceBacked` branch only fires when a hex exists; the `convention` branch
  always injects the WCA hex). The guard exists but the producer it guards
  against can't currently generate the case it checks for.
- `web/src/data/adapter.ts`'s `standardFaceColorConvention()` cluster — see
  Claim 6.

### `facesAgree()` collapse correctness

**CONFIRMED it can collapse rows that genuinely differ**, by extracting and
running its exact comparison key against two hand-built fixtures:

```
Case A (unattestedValue ignored) facesAgree = true  -> expected false
Case B (disputed[] contents ignored) facesAgree = true -> expected false
```

The key function —
`` `${basis}|${'value' in v ? JSON.stringify(v.value) : ''}|${'confidence' in v ? v.confidence : ''}|${'searched' in v ? v.searched : ''}` ``
— never inspects `unattestedValue`, `disputed[]`, `note`, or `sourceIds`. So:
six `unknown` faces where one carries a real (if unattested) archived colour
name and the other five carry nothing at all produce the *same* key (`basis`
and `searched` match; `unattestedValue` is invisible to the key) and collapse
to one row, silently hiding the one face that actually has content. Likewise
six `source-backed, confidence: disputed` faces with completely different
sets of disputed alternative colours collapse to one row showing only face
`U`'s alternatives, hiding the other five. Currently dormant — with zero
faces populated today, all six keys are identically `unknown|||false` and
the collapse is correct by accident, not by design. The comment above the
function ("collapsed ONLY when all six genuinely agree") overstates what the
code actually checks.

### Error paths

- **Missing bundle files** (404 from `fetch`): `load.ts::fetchJson()` throws
  a descriptive `Error` and evicts the cache entry so a transient failure
  doesn't poison future reads; both `App.tsx` and every page catch it and
  render a plain-text error state (`data-testid="bundle-error"`, etc.) rather
  than crashing or showing a blank page. Reasonable and honest.
- **Absent record id**: both `VariantPage.tsx` and `LandingPage.tsx`
  explicitly check `if (!raw) throw new Error(...)` after the bundle fetch
  resolves, converting a `.find()` miss into a clear, page-scoped error
  message rather than rendering `undefined` fields. Reasonable.
- **Cited source not in the bundle**: `buildEvidenceTrail()` marks the
  reference `missing: true` rather than throwing or silently dropping it, and
  `VariantPage.tsx` explicitly renders "cited but not present in this
  bundle" for that entry. This is the one error path I tried hardest to
  break and it holds up well — it is honest in exactly the direction the
  project cares about (never hides a citation gap).
- **Minor gap, CONFIRMED by reading `App.tsx`/`router.ts`**: routes
  `makers`, `maker`, `model`, and `notFound` are all unimplemented and fall
  through to the *same* generic placeholder shell (hardcoded example links,
  a route-name debug line). A genuinely broken/mistyped URL
  (`route.name === 'notFound'`) is visually indistinguishable from a
  legitimate but not-yet-built page (`route.name === 'makers'`) — there is no
  dedicated "page not found" state. Low severity (the whole shell is
  explicitly a placeholder), but worth flagging since a visitor cannot tell
  "not built yet" from "you mistyped the URL."

### Type-safety gap between the two adapters (found while chasing Claim 1/2)

**CONFIRMED by a transient control edit, then reverted.** `VariantPage.tsx`
and `LandingPage.tsx` both call:

```ts
resolveCubeVisualSpec(raw as never, (model ?? undefined) as never, { applyStandardFaceScheme: true })
```

`raw` is a `RawVariant` from `web/src/data/adapter.ts` (loose, `string`-typed
`colorway.application`); `resolveCubeVisualSpec` expects an `ArchiveVariant`
from `web/src/three/types.ts` (narrow `ColorwayApplication` union). I removed
the `as never` casts and re-ran `tsc --noEmit`:

```
src/exhibit/VariantPage.tsx(54,42): error TS2379: Argument of type
'RawVariant' is not assignable to parameter of type 'ArchiveVariant' ...
  Type 'string' is not assignable to type 'ColorwayApplication'.
```

Confirmed real, then reverted the file exactly. This means the one place
where archive-bundle data actually crosses into the three.js provenance
system does so through a blanket type-erasure cast, not a narrow, justified
one — the "type checker forbids fabrication by accident" story that
`provenance.ts`'s own header makes does not extend to this integration
point. Nothing about this indicates current runtime misbehaviour (both
`RawVariant.colorway.application` and `ColorwayApplication`'s value sets
happen to agree today), but there is no compiler backstop if they diverge.

---

## Defect list, by severity

**Medium-High**
1. Claim 2 — per-face convention application in `resolveCubeVisualSpec`
   diverges from the registry's record-level `affected_records` accounting
   the moment any variant has partial face documentation. Reproduced.
2. Claim 1/2 — a face documented by `color_name` only is silently replaced by
   the WCA convention colour, with a disclosure that falsely claims the
   archive documents nothing about this face. Reproduced.

**Medium**
3. Claim 5 — `adapter.ts`'s face-colour attestation lookup always queries the
   `color_normalized` pointer even when the raw value came from `color_name`,
   so a genuinely sourced face colour can report `searched: false`.
   Reproduced.
4. Claim 6 — `web/src/data/adapter.ts::STANDARD_FACE_COLORS` is an unguarded
   duplicate of an already-guarded value in `three/types.ts`, and is dead
   code outside its own test.
5. `facesAgree()` in `VariantPage.tsx` can collapse six face rows that differ
   in `unattestedValue`, `disputed[]`, `note`, or `sourceIds`. Reproduced.
   Currently dormant.
6. `VariantPage.tsx`'s `inForce` filter hardcodes three of six conventions as
   always-shown instead of gating them on that record's own documentation
   state, unlike the other three. Would produce a false disclosure the
   moment any one of face colour/logo/geometry gets documented anywhere.
7. `docs/EXHIBITION_ARCHITECTURE.md` §11.2's claim that C1–C5 are
   "control-tested by mutation" is false — confirmed zero such coverage
   exists.
8. `web/src/three/CubeGeometry.ts`'s "50 of 511" size-documentation figure is
   wrong (true figure: 227 of 511) — a second instance of an error class the
   brief said was already fixed once elsewhere.

**Low**
9. Claim 5 — `adapter.ts::adaptVariant()`'s body-plastic-colour field only
   ever reads `plastic_color_name`; a body documented solely via
   `plastic_color_normalized` would be dropped without a trace (not even
   `unattestedValue`). Zero current instances.
10. Dead code: `provenanceLabel()`, `DEFAULT_SIZE_RATIONALE`,
    `GeometryInputs.{sizeMm,bevel}ProvenanceKind`, and
    `materials.ts::faceColorProvenance()`'s unreachable `!colorHex` branch.
11. `sizeMm` is never wrapped as a `Provenance.convention` even when its
    56mm fallback is in effect, unlike `bevel`, which always is — an
    architecture inconsistency, not a visible bug (nothing currently reads
    the discarded provenance-kind field).
12. `VariantPage.tsx`/`LandingPage.tsx` bridge two independently-typed raw
    bundle-record shapes via `as never`, suppressing a real type mismatch
    (confirmed by control edit) rather than reconciling the two types.
13. Router (`app/router.ts`/`App.tsx`): no distinct 404 state; a mistyped URL
    and an unimplemented page render identically.
14. `web/src/data/README.md` states the adapter's convention id as
    `'wca-standard-color-scheme-v1'`; the actual exported constant is
    `STANDARD_FACE_COLOR_CONVENTION_ID = 'cv-face-colours-wca-standard'`
    (matching the real registry id, which the code gets right — only the
    prose in the README is stale).

**Holds / no defect found (worth recording as much as the defects)**
- Claim 4 fully holds, confirmed via git history across the entire Phase III
  commit range, not commit messages.
- Claim 8 fully holds — every recomputed contrast ratio and the
  confidence-hues-never-text-colour rule checked out exactly, codebase-wide.
- The evidence-trail "missing source" path is honest and well-built.
- `npm run check`, `npm test`, and `tsc --noEmit` all pass cleanly today —
  the codebase is not in a broken state; every defect above is a latent
  divergence risk or a currently-dormant logic gap, not a live production
  failure, with the two Claim-1/2 exceptions being the most serious because
  they actively misrepresent provenance the moment triggered, and are
  trivially triggerable by ordinary future research (a face colour named but
  not yet normalized to hex).

## Could not verify

- No browser is available in this environment (explicitly disallowed by the
  lane brief). `CubeCanvas.tsx`'s actual rendered appearance, WebGL-failure
  fallback rendering, `RoundedBoxGeometry`'s real material-group order at
  runtime, and the canvas-generated "unknown" hatch texture were read and
  reasoned about but not visually verified — the code's own comments already
  disclose this same limitation ("COULD NOT VERIFY IN A BROWSER") in
  `CubeGeometry.ts` and `materials.ts`.
- Screen-reader/keyboard behaviour of `.evidence-badge`, focus order, and the
  reduced-motion CSS path were read (and the reduced-motion collapse-to-0.01ms
  technique is sound on paper) but not exercised with real assistive
  technology.
- I did not attempt to run `npm run dev`/`vite preview` (the brief explicitly
  forbids binding a listening socket in this sandbox), so no live rendering
  of `VariantPage`/`LandingPage`/`ConventionsPage` against a served bundle
  was observed — only their logic, traced and unit-tested.

---

## Resolution — what was done about these findings

Appended by the main session on 2026-09-21, after working through the report.
Every item below was independently reproduced before being changed.

### Fixed

| Finding | Fix |
|---|---|
| `resolveCubeVisualSpec` applied the standard scheme to a face documented by `color_name` only, under a disclosure saying the archive documents nothing | A face the archive named but never normalised is no longer silent: it renders in the unknown treatment and is not counted as a convention. Test written first and watched to fail (`web/src/three/faces.test.ts`). |
| `VariantPage` hardcoded 3 of 6 conventions as always in force | All six are gated on the record's actual state, mirroring the registry's `when_absent` rule. |
| `facesAgree()` collapsed faces differing in `note` / `sourceIds` / `unattestedValue` / `disputed[]` | Compares the whole value now, not a chosen subset of fields. |
| Adapter looked up face attestations at `/color_normalized` even when the value came from `/color_name` | The pointer follows the value's actual origin. |
| `CubeGeometry.ts` carried a second `"50 of 511"` | Corrected to 227, the measured figure. |
| §11.2 claimed C1–C5 were "control-tested by mutation" with no automated coverage | All five are now control-tested in `scripts/selftest.mjs`, inside `npm run check`. §11.2 rewritten, and the previous overclaim named rather than quietly replaced. |
| `as never` casts bridged two raw-record shapes and suppressed a real `tsc` error | `web/src/exhibit/bridge.ts` narrows at the boundary; an unrecognised vocabulary value becomes `unknown` rather than passing through. |
| No 404 route state | Added, with its own copy — a bad URL is a different claim from a missing record — and three ways out. Adding it made the leftover debug shell provably unreachable, so it was removed. |
| `adapter.ts::STANDARD_FACE_COLORS` unguarded | Guarded by a test against the published registry before this review landed; control-tested by drifting the adapter's white. |

### Accepted, not changed

- **Per-face convention application vs record-level `affected_records` accounting.**
  Real and correctly identified. The registry counts records; the renderer decides
  per face. Today they agree because no face is documented anywhere, so the
  divergence is latent. Reconciling it properly means deciding whether a
  partially-documented variant is "covered" by the face-colour convention at all,
  which is a curatorial question rather than a bug to patch. Left open and named
  here rather than settled by preference.
- **`standardFaceColorConvention()` unused by any page.** It is deliberate opt-in
  API — the adapter never applies a convention on its own, and this is how a
  future curatorial layer would ask for one. Now guarded by a test, so the
  drift risk the finding identified is closed even though the function stays.
- **Remaining dead code** (`provenanceLabel()`, discarded `GeometryInputs`
  provenance-kind fields, an unreachable branch in `materials.ts`). Harmless,
  and not worth churning lane C's modules for in this pass.

### Not verifiable by that lane

The review could not run a browser. Everything it marked "could not verify" on
those grounds has since been exercised in Chrome by the main session: the object
renders, the convention gating behaves, the 404 resolves, and there is no
horizontal overflow at 390, 768 or 1440 px.
