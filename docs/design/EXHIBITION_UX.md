# CubeCollection — exhibition UX and information architecture

Written 2026-09-21, as the developer-facing specification that follows from
`docs/EXHIBITION_ARCHITECTURE.md`. That document establishes the concept — makers as spine, three
entry paths, evidence as a primary exhibit, an honest `unknown`. This document is the spec a
developer builds screens from: routes, layouts, states, copy, and the one vertical slice that
proves the chain before anything else is built. It consumes `dist/public` only, per
`EXHIBITION_ARCHITECTURE.md` §8, and invents no archival content — every example below is a real
record from `data/`, named as such.

Status: in progress. Sections are being filled in order; §9 (open items) tracks what is not yet
written.

---

## 1. Route map

*Skeleton.* Every URL the exhibition serves, grouped by the three entry paths plus the evidence
and unknowns systems that cut across them. Full table with data dependencies and entry/exit
points to follow.

---

## 2. Page specifications

*Skeleton.* For each route in §1: first thing seen, reading order, content hierarchy, what is
interactive, empty/unknown handling, loading state. ASCII wireframes at key levels
(maker → family → model → variant → evidence).

---

## 3. Navigation model

*Skeleton.* How a visitor descends manufacturer → family → model → variant → evidence and returns
without losing place — breadcrumb behaviour, back-button semantics, and what persists across a
descent (the evidence drawer, the current entry-path context).

---

## 4. The three entry paths, made concrete

*Skeleton.* Browse (by maker, the default), Trace (by lineage or mechanism), Interrogate (by
evidence, challenging a claim) — concrete starting screens, concrete first clicks, using real
families and disputes already in the archive (e.g. the GAN founding-date dispute, the MoYu WeiLong
numbering gap, ledger item P4-7's catalogue-artefact date).

---

## 5. The `unknown` experience

*Skeleton.* The hardest part. Distinguishes, on screen, three things the archive's own vocabulary
already distinguishes in data — `unknown` (searched, not found), absent (not yet researched), and
a declared rendering convention (§10.4 of the architecture doc, the standard face-colour scheme)
— using the real blocker set computed by `scripts/build.mjs` (`renderBlockers`): face colours
undocumented on all 511 public variants, logo placement on all 511, geometry profile on all 511,
body plastic colour on 489 of 511.

---

## 6. Microcopy

*Skeleton.* The actual strings: confidence labels, unknown states, the rendering-convention
disclosure, dispute framing. Museum voice — precise, unhedged, never apologetic, never salesy.

---

## 7. Responsive behaviour

*Skeleton.* Desktop / tablet / mobile per page type, and what mobile sacrifices (the evidence
drawer's persistence model changes first).

---

## 8. Accessibility

*Skeleton.* Keyboard path per page, focus order, reduced-motion alternative, and the non-WebGL
fallback — which, per the architecture doc §7, is not a hypothetical: 0 of 511 public variants are
`render_ready` today, so the fallback *is* the current experience for the entire archive, not an
edge case.

---

## 9. The vertical slice

*Skeleton.* One model, end to end. Candidates checked against the real data in `data/variants/`:
`gan-flagship-16` has 8 variant files, `dayan-guhong-pro-m` has 6. Chosen: `gan-flagship-16` — see
§9 for the full justification, including why its specific 8 variants are an unusually good fit for
demonstrating confidence variance and the `unknown` experience, not just variant count.

---

## Open items

Tracked here so a killed session leaves an honest state. Empty once §1–9 are complete in full.

- [ ] §1 route map — full table
- [ ] §2 page specs — all routes, wireframes
- [ ] §3 navigation model
- [ ] §4 entry paths made concrete
- [ ] §5 unknown experience
- [ ] §6 microcopy
- [ ] §7 responsive behaviour
- [ ] §8 accessibility
- [ ] §9 vertical slice full spec
