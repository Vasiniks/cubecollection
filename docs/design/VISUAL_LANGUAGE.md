# CubeCollection — Visual Language

Phase III, Lane B. This document is the reasoning behind `web/src/styles/tokens.css` and
`web/src/styles/base.css`. It is not a mood board: every decision below is either derived from a
measured property of the archive (per `docs/EXHIBITION_ARCHITECTURE.md` and
`research/qc/RESEARCH_FINAL_HANDOFF.md`) or justified against the explicit aesthetic ban list in
this lane's brief.

---

## 1. The aesthetic target, restated as constraints

The brief asks for "museum / archival / industrial-design... Awwwards-calibre digital exhibition,
where the cube is the visual hero and the interface recedes." Translated into things a CSS file
can actually do:

- **The interface must have less visual weight than the object.** No card borders competing with
  the cube's own edges, no saturated UI chrome, no decorative color anywhere except the one place
  the archive has earned it (evidence).
- **"Museum" means restraint under real information density.** This archive has 616 sources, six
  confidence values, five source tiers, and per-variant spec tables — the opposite of a minimal
  portfolio site. The system has to carry real density (§3, §6) without becoming a dashboard.
- **"Industrial-design" means precision, not decoration.** Sharp edges, a visible grid, exact
  spacing steps — the same vocabulary as the objects being exhibited.
- **Every non-decorative visual distinction the archive makes must survive into the design system
  as a visual distinction**, not get flattened into one grey "unavailable" state. That is
  specifically confidence (§6) and rendering convention (§7), because §4.1 of
  `EXHIBITION_ARCHITECTURE.md` says the evidence-showing is the exhibition's whole proposition.

## 2. Palette

**Structure: warm neutral surfaces + warm neutral ink + one restrained accent, plus three
independent hue families reserved entirely for the evidence system.**

Surfaces are a warm off-white/stone family (`#faf9f5` → `#eae7dc`) rather than pure white or a
cool dashboard grey — closer to museum card stock and gallery wall paint than to a UI kit. Text
(`ink-900`…`ink-100`) is a warm near-black rather than `#000`, for the same reason printed ink is
never actually black.

**One accent, not a brand palette.** `--accent-500` (`#8a5a2b`, a museum brass/plaque bronze) is
used for links, active states, and focus rings — the things a visitor actually interacts with —
and nowhere else. A second, third, and fourth "brand" accent color was considered and rejected:
the brief bans "generic AI gradients" and decorative color, and a museum wayfinding system
conventionally uses exactly one accent metal tone (brass rails, brass plaque lettering) against
neutral stone and wood. One hue is also what keeps the confidence system (§6) legible — if the UI
itself used five accent hues, a five-value confidence scale would have nothing left to contrast
against.

**The "stage."** `--surface-stage` (`#14130f`) is a dedicated dark plane for the hero object
render, used in *both* color schemes — the cube sits on a near-black stage even on an otherwise
light page, the way object photography lights a product against a dark backdrop rather than a
white studio sweep. This is the one deliberate departure from "surfaces follow the theme," and
it's intentional: the plinth is not a page section, it's a stage.

Full color values and their measured contrast ratios are in §9.

## 3. Type scale

**Two families: a serif for editorial/display, a system sans for UI and body, a monospace for
data.** The serif (`ui-serif` / "New York" / Georgia stack) carries h1–h3 — the museum wall-text
voice, used for gallery titles and section heads, evoking a printed exhibition catalogue rather
than a web app. The sans carries everything functional: UI chrome, h4–h6 (which are *section
labels*, not editorial headlines — see the comment in `base.css`), and body copy, since long-form
reading and dense metadata both want a neutral, highly legible grotesk rather than a display face.
Mono is reserved for anything that is literally a record: accession-style identifiers, tier
labels, evidence badges (§6) — the archive's data, styled to look like data.

All three are **system font stacks**, so nothing here depends on a network font request, and
nothing breaks if one is unavailable. An optional upgrade path is documented but not wired up (no
`@font-face`, no font binary committed, per the hard constraint):

| Role | System stack (shipped) | Optional upgrade | Licence |
|---|---|---|---|
| Display | `ui-serif, "New York", "Iowan Old Style", Georgia, "Times New Roman", serif` | Source Serif 4 | SIL OFL 1.1 |
| Body/UI | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` | Inter | SIL OFL 1.1 |
| Mono | `ui-monospace, "SF Mono", "Cascadia Code", "Roboto Mono", Menlo, Consolas, monospace` | IBM Plex Mono | SIL OFL 1.1 |

Each system stack is also each webfont's natural fallback, so adding the `@font-face` later is a
pure enhancement, never a rewrite.

**Why a two-speed scale rather than one ratio.** A single modular ratio (say 1.25 or 1.333) across
ten steps forces a choice: tune it for the small end and the display sizes stay timid, or tune it
for drama at the top and the small steps become indistinguishable. This archive needs *both* ends
to do real work — dense metadata (tier labels, dates, accession-style identifiers) at the bottom,
and a genuinely monumental landing claim at the top (§6 of `EXHIBITION_ARCHITECTURE.md`: "one
claim, one object, one piece of evidence... in ten seconds"). So the scale compresses at the
bottom (10 → 12 → 14 → 16px, ~1.15–1.2×) for legible fine steps, and expands at the top (32 → 42 →
56 → 76 → 100px, ~1.3–1.34×) for real hierarchy jumps. This is a deliberate two-speed curve, not a
missed ratio.

| Token | Size | Use |
|---|---|---|
| `--text-100` | 10px | accession codes, tier labels |
| `--text-200` | 12px | caption / meta / `.evidence-badge` |
| `--text-300` | 14px | secondary UI |
| `--text-400` | 16px | body (base) |
| `--text-500` | 20px | lead paragraph |
| `--text-600` | 24px | H4 |
| `--text-700` | 32px | H3 |
| `--text-800` | 42px | H2 |
| `--text-900` | 56px | H1 / gallery title |
| `--text-950` | 76px | display |
| `--text-1000` | 100px | the landing page's one monumental claim |

Body copy is also capped at **68 characters** (`p { max-width: 68ch }` in `base.css`) regardless
of container width — an editorial-typesetting constraint, not a layout accident, because the
evidence drawer (§6) and provenance essays are meant to be *read*, not skimmed in a full-width
column.

## 4. Spacing, radii, elevation

**Spacing** is a 4px-grid scale that widens geometrically at the top (`--space-9`…`--space-12` =
96px…256px) specifically so the largest steps can hold real museum-gallery breathing room around
a single hero object — "spatial composition," not a dense thumbnail grid.

**Radii are deliberately small.** "Excessive rounded corners" is explicitly banned. `--radius-sm`
(2px) and `--radius-md` (4px) are edge-easing, not a rounded-card aesthetic; `--radius-pill` exists
*only* for the confidence/evidence chip (§6), because that is a functional metadata tag, not a
button trying to look friendly. Sharp edges read as vitrine glass and engraved plaques; heavy
rounding reads as an app.

**Elevation is mostly not shadow.** The brief bans glassmorphism and "card soup" — the token system
treats those as the same underlying mistake: using a floating-panel effect to do what tone and a
hairline border should do. `--elevation-1` is a 1px inset border in `--ink-100`, nothing else; most
surface separation in the system comes from `--surface-0/1/2` being three different tones, the way
a museum uses wall / plinth / vitrine-interior as three different materials rather than three
different drop shadows on the same wall color. Real shadow (`--elevation-2/3`) is reserved for
things that actually leave the page's plane — the evidence drawer, a modal — and
`--elevation-stage` is a distinct, heavier shadow modeling *object photography's* cast shadow
under the hero cube, not a UI affordance at all.

In dark mode, elevation comes from surfaces getting *lighter* as they rise
(`surface-0 < surface-1 < surface-2` in lightness, same ordering as light mode), because a drop
shadow does not read against a near-black background — the same convention Material Design's dark
theme uses, adopted here because it is physically honest about how shadow works, not for its own
sake.

## 5. Motion principles

**Two speeds and one signature move.** Feedback motion (`--duration-instant` 80ms,
`--duration-fast` 150ms) is fast enough to feel like the interface heard you and nothing else.
Structural motion (`--duration-base` 240ms, `--duration-slow` 400ms) covers panel/drawer opens and
cross-fades between exhibits. `--duration-deliberate` (700ms, paired with `--ease-emphasized`) is
reserved for one kind of moment only — an object arriving on its plinth, a genuine view transition
— and is not the default for routine interactions. That reservation *is* "museum pacing": a museum
doesn't animate every label, it lets the one object in the room move deliberately.

**Explicitly banned, and why:**

| Banned | Why |
|---|---|
| Spring/bounce/elastic easing | Reads as a consumer app, not an archival object; a plinth doesn't jiggle. |
| Scroll-jacking / parallax | Fights the "return path must be preserved" navigation requirement (§6 of the architecture doc) and disorients a visitor moving through five nesting levels (manufacturer → family → model → variant → source). |
| Autoplaying/looping animation | Nothing in the archive is decorative; nothing on the page should move without the visitor doing something. |
| Hover-triggered 3D tilt / gimmick transforms | Implies interactivity the object doesn't have, and undercuts the "this parametric render is an illustration, not a scan" honesty constraint in §7 of the architecture doc — a cube that wobbles on hover reads as a toy, not a specimen. |
| Skeleton shimmer loading states | A shimmering placeholder implies content is *about* to resolve into something specific; where the true state is `unknown` (§6), a shimmer is a small lie. Use a static, labeled placeholder instead. |
| Scroll-linked fade-everything | The default "content fades in as you scroll" template pattern — the thing that makes every site built this decade look the same. Reveal should be earned by genuine state change, not by scroll position. |

**Reduced motion is not an afterthought.** `base.css` §4 collapses the duration tokens themselves
under `prefers-reduced-motion: reduce`, so any rule written against `var(--duration-*)` is
automatically safe — no component needs its own media query. `scroll-behavior` also reverts to
`auto`.

## 6. The confidence system

This is the design system's actual center of gravity, because it's the thing nothing else in a
cube-photo gallery offers (`EXHIBITION_ARCHITECTURE.md` §1, §4.1). The vocabulary is fixed by
`vocab/confidence.yml` and cannot be redesigned, only given form:

| Value | Meaning (from `vocab/confidence.yml`) |
|---|---|
| `confirmed` | Tier 1 source, or two independent Tier 2 sources in agreement |
| `probable` | One Tier 2 source, uncontradicted |
| `reported` | Tier 3 source, uncontradicted and plausible |
| `uncertain` | Weak or single-source, or internally implausible |
| `disputed` | Credible sources disagree |
| `unknown` | Explicitly researched and not found — **not the same as an absent field** |

**Design commitment: three hue families, not one gradient.** An earlier draft used a single
lightness ramp (dark → light bronze) for all six values. It was rejected: `disputed` is not a
*weaker version* of `probable` — "credible sources disagree" is a qualitatively different claim
from "weakly sourced," and collapsing it onto the same ramp as `uncertain` would misrepresent the
archive's own distinction between a data problem and an editorial one. The shipped system instead
uses:

- **Warm bronze family** (`confirmed` → `uncertain`): the archive's own confident voice, varying
  in both hue-darkness and *fill amount* (see below) as it weakens.
  `probable` intentionally reuses `--accent-500` exactly — the ordinary, unremarkable "this is
  the archive speaking with reasonable confidence" case is the same tone as the interface's own
  accent, so it doesn't call special attention to itself.
- **Rust/oxide** (`disputed`): a genuinely different hue, because a conflict between sources is
  a different *kind* of fact.
- **Neutral grey, hollow** (`unknown`): explicitly not on the bronze ramp at all, so "not
  researched" can never be mistaken for "weakly researched." A dashed, unfilled stroke — absence
  as a shape, not just a paler color.

**Multi-channel encoding, so color is never load-bearing alone (WCAG 1.4.1).** Each glyph in
`.evidence-badge__glyph` differs by hue *and* fill amount *and* stroke style simultaneously:

```
confirmed   ● solid filled circle
probable    ◕ circle, conic-gradient pie fill ≈75%, bronze
reported    ◑ circle, conic-gradient pie fill ≈40%, lighter bronze
uncertain   ◌ circle, dotted outline only, no fill
disputed    ◐ circle, split into two flat colors (bronze/rust vs. neutral) — sources meeting and disagreeing
unknown     ○ circle, dashed outline only, no fill, neutral grey
```

A visitor with full color vision, a visitor with a color-vision deficiency, and a black-and-white
printout of the page all see six distinguishable states. And **the text label is never
visually hidden** — no `sr-only` pattern on `.evidence-badge__label`. The brief's own test case is
for *sighted* users ("a claim at uncertain must not look identical to one at confirmed"); an
accessible name on an otherwise color-only badge would satisfy a screen reader while still failing
that literal requirement, so the label stays visible text in the DOM's normal flow, always.

**Contrast strategy.** Rather than verify AA text-contrast for six different hues against every
surface they might sit on, the label text inside `.evidence-badge` is *always* `--ink-900` — one
already-verified ratio (16.85:1 on `--surface-0`, §9), reused for every confidence value. The
semantic hues are used only for the small glyph (a non-text UI component under WCAG 1.4.11, which
sets a 3:1 floor, not 4.5:1), and every one of them clears that floor against both surfaces it can
appear on (§9). This is also *why* three of the six values deliberately reuse or sit close to the
accent hue rather than each getting a maximally distinct color: the fill-amount and stroke-style
channels do the differentiation work that would otherwise require pushing lightness low enough to
fail contrast.

## 7. Rendering convention — a third category

`EXHIBITION_ARCHITECTURE.md` §10.4 identifies a case the confidence vocabulary doesn't cover at
all: face colors. The archive has *deliberately not recorded* the standard speedcube color scheme
(white/yellow, red/orange, blue/green) because it does not assert what it hasn't sourced — but the
recommended path (§10.4a) is to render that standard scheme anyway, as a documented convention, to
unblock all 511 public variants. That is not a weak confidence value. It isn't `uncertain` (there's
no claim being weakly asserted) and it isn't `unknown` (the value being *shown* is not absent — a
color is on screen). It's a third epistemic category: **"the exhibition chose to show you
something, and it is not evidence about this object."**

`--evidence-convention` is therefore a separate token in a separate hue family (`#4a5d6b`, cool
slate — the only cool hue in the entire palette, against an otherwise all-warm system), and its
glyph is a **different shape**, not just a different color: a hatched, rotated square, never a
circle. The reasoning is the same multi-channel logic as §6, pushed further — hue alone was judged
insufficient given how consequential this distinction is (§10.4's own condition: "the convention is
visible to the visitor... must not let a visitor believe the archive *sourced* that colour
arrangement"). A colorblind visitor, or one who has learned "circle = the confidence system," will
still see that the convention badge is not part of that system at all, because it is not a circle.

Usage contract: `data-evidence-kind="convention"` is a **separate attribute** from
`data-confidence`, never a seventh value stuffed into the confidence enum — the vocabulary itself
(`vocab/confidence.yml`) has six values and no more, and the design system should not invent a
value the schema doesn't have.

## 8. Dark mode ("Vitrine")

Both `prefers-color-scheme: light` (the default, "Gallery") and `dark` ("Vitrine") are supported,
plus a manual `[data-theme]` override on `:root` for a future toggle — the override block is a
byte-for-byte mirror of the media-query block, so a future toggle only ever needs to set an
attribute, never touch a token value.

Dark mode is **not a palette inversion.** Every surface, ink, accent, and confidence value in the
dark block is its own chosen and independently contrast-checked value (§9), not a computed
`invert()` of the light set — because "a gallery in daylight" and "a cube spotlit in a dark vitrine"
are two different, intentional environments, and an inverted palette tends to produce muddy
mid-tones that serve neither. The confidence hue *mapping* stays conceptually identical (same
three families, same fill-amount logic) so the two themes teach the same visual language, but the
concrete hex values differ because a color that clears 3:1 against `#faf9f5` does not clear 3:1
against `#121210` and vice versa.

## 9. Accessibility — contrast ratios as measured

All ratios below were computed from the shipped sRGB values using the WCAG 2.1 relative-luminance
formula (not estimated, not eyeballed).

**Body text (WCAG AA requires ≥4.5:1 for normal text):**

| Pair | Light mode | Dark mode |
|---|---|---|
| `ink-900` on `surface-0` | 16.85:1 | 16.29:1 |
| `ink-700` on `surface-0` | 9.38:1 | 10.94:1 |
| `ink-500` on `surface-0` (tertiary text) | 5.14:1 | 6.65:1 |
| `accent-500` on `surface-0` (link text) | 5.57:1 | 8.27:1 |

All four clear AA with margin; `ink-500` is the tightest and it is still used only for genuinely
tertiary metadata, never body copy. `ink-300`/`ink-100` are sub-AA by design and are restricted to
non-text decoration (hairlines, disabled borders) — they never carry text.

**Confidence/convention glyphs (WCAG 1.4.11 requires ≥3:1 for non-text UI components; these hues
are never used for text, see §6):**

| Token | vs. `surface-0` | vs. `surface-1` |
|---|---|---|
| `confidence-confirmed` | 8.58:1 | 7.99:1 |
| `confidence-probable` | 5.57:1 | — |
| `confidence-reported` | 3.60:1 | — |
| `confidence-uncertain` | 3.37:1 | 3.15:1 |
| `confidence-disputed` | 7.28:1 | — |
| `confidence-unknown` | 4.84:1 | 4.51:1 |
| `evidence-convention` | 6.49:1 | — |

Weakest is `confidence-uncertain` at 3.15:1 against `surface-1` — still above the 3:1 floor,
appropriately, since "uncertain" is meant to read as the most visually recessive confidence value
short of `unknown`.

**Dark mode confidence glyphs vs. `surface-0` (`#121210`):** `confirmed` 8.27:1, `probable` 6.23:1,
`reported` 4.94:1, `uncertain` 5.43:1, `disputed` 5.30:1, `unknown` 5.58:1, `convention` 5.86:1 —
all with more margin than their light-mode counterparts, because the dark surface is darker
relative to these lightened hues than the light surface is to the darker light-mode hues.

**Focus:** `:focus-visible` uses `--focus-ring` (= `--accent-500`), i.e. 5.57:1 / 8.27:1 against the
default surface — well past the 3:1 non-text minimum (WCAG 2.4.11), with a 2px outline and 2px
offset so it never merges with an element's own border.

**Motion:** `prefers-reduced-motion: reduce` collapses every duration token to near-zero and forces
`scroll-behavior: auto` (`base.css` §4), addressing WCAG 2.3.3 (Animation from Interactions) even
though that criterion is AAA, because the "museum pacing" motion this system uses (§5) is
exactly the kind of large, deliberate movement that criterion is written for.

## 10. Explicitly banned, and why

Restated from the brief, each with the specific mechanism this token/base layer uses to prevent it:

- **Generic AI gradients** — the palette has exactly one accent hue and it is a flat color, never a
  gradient background; the only gradients in the system are the `conic-gradient` pie fills inside
  confidence glyphs, which are functional (encoding a fraction), not decorative.
- **Glassmorphism everywhere** — no `backdrop-filter`, no translucent blurred panels anywhere in
  the token set; elevation is tone + hairline border (§4), not frosted glass.
- **Default dark-dashboard look** — dark mode is a warm near-black ("Vitrine"), not a cool
  `#0d1117`-style dev-tool grey, and it is one of two considered, independently designed themes,
  not the only theme.
- **Card soup** — `--radius-pill` is reserved for evidence chips only; there is no default
  "everything is a rounded-corner card with a shadow" rule anywhere in `base.css`.
- **Excessive rounded corners** — the largest radius token is 8px, reserved for large media
  containers/modal sheets; the default UI radius is 4px or less.
- **Gratuitous animation** — see the banned-motion table in §5.
- **Template hero sections** — out of scope for this lane (no components were built), but the type
  scale's monumental `--text-1000` step and the dedicated `--surface-stage` plane exist specifically
  so a hero can be *one object and one claim*, per `EXHIBITION_ARCHITECTURE.md` §6, rather than a
  headline-plus-stock-photo-plus-CTA-button template.

## 11. What is not finished

This lane's mandate was the token/base layer and this document, not components — the following are
explicitly out of scope for Lane B and are noted so the next lane doesn't assume they exist:

- **No component CSS.** No card, nav, drawer, or comparison-table styles — only the reset, base
  element defaults, and the evidence-badge utility, which the brief called out by name as required.
- **Webfont upgrade not wired up.** The optional Source Serif 4 / Inter / IBM Plex Mono path (§3)
  is documented but no `@font-face` was added and no font binary was committed, per the hard
  constraint against adding font assets in this lane.
- **A decorative "material" surface texture (subtle paper grain) was considered** for the
  paper/stage surfaces, as a way to make flat color read as tactile rather than as a flat digital
  fill. It was deliberately deferred rather than shipped: the only implementation available without
  an asset or a build step is an inline SVG `feTurbulence` data-URI, and it could not be visually
  verified from this environment. Shipping an unverified visual hack seemed worse than leaving the
  surfaces flat; the surface-tone system (§2, §4) and the dedicated dark "stage" plane already carry
  most of the "material-aware" intent without it.
- **No verification against the vertical slice.** `EXHIBITION_ARCHITECTURE.md` §9 names
  `gan-flagship-16` as the proof-of-concept object; this design system was built from the
  architecture and data-contract documents, not against a running page, since no frontend exists
  yet in this repository. The token names and the `.evidence-badge` markup contract in `base.css`
  §6 are written so that lane can consume them directly, but they have not been tried against real
  `dist/public` data.
- **No RTL/i18n pass.** Not mentioned in the brief and the archive is English-only today, but
  logical properties (`margin-block-end`, not `margin-bottom`) were used throughout in anticipation
  of it.
