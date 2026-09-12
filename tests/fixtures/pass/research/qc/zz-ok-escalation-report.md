# Fixture report — a correctly linked escalation

SYNTHETIC FIXTURE — not archive data. This is the shape check-escalations.mjs wants: a finding
that is escalated, declared in a machine-readable block, and carrying an id the ledger holds.

NOTE THE INDENTATION. The parser requires each entry to begin with whitespace, which is easy to
get wrong — this fixture got it wrong first and the block silently parsed as zero entries.

escalations:
  - [P98-1] A fixture finding, filed against an issue that exists.
  - [NOTFINDING] A run condition rather than an archive defect.
