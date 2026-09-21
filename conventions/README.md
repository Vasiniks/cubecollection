# conventions/

Visual defaults the **exhibition** chose because the **archive** makes no claim.

Nothing in this directory is evidence. Nothing here is a historical fact about
any cube. Every entry exists precisely because a property was searched for and
not established.

This directory sits outside `data/` on purpose. The separation between what the
archive attests and what the museum drew is a file boundary, not a convention of
good behaviour.

- `rendering-conventions.yml` — the registry.
- Schema: `schema/rendering-convention.schema.json` (no `sources`, no
  `attestations`, no `confidence` — a convention has nowhere to claim evidence).
- Validator: `scripts/validate-conventions.mjs`, rules C1–C5, part of
  `npm run check`.
- Rationale and the consumer contract: `docs/RENDERING_CONVENTIONS.md`.

The dependency runs one way. The exhibition reads the archive; the archive never
reads the exhibition. Rule C5 fails the build if any record under `data/` so
much as names a `cv-` id.
