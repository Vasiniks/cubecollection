# research/

Working output from the research agents. Nothing here is archive data; `data/` is.

| Directory | Owner | Contents |
|---|---|---|
| `notes/` | every research agent, in its own subdirectory | Session logs: what was searched, what was not found, what leads remain |
| `pricing/` | `pricing-researcher` | Pricing proposals, one file per variant, awaiting a human fold into the variant record |
| `media/` | `media-researcher` | Media proposals, one file per variant, awaiting the same |
| `audits/` | `source-auditor` | Source-quality audits |
| `qc/` | `research-qc` | Quality-control reports |

## Why pricing and media are sidecars

Pricing observations and media entries live *inside* variant records, but variant records are
owned by `variant-researcher`, which may be running at the same time. Two agents writing one
file is a lost edit.

So those two agents propose instead of write. A human reads the proposal, folds it into the
variant record, and runs `npm run validate`. Sidecars are not schema-validated on their own —
which is precisely why a human folds them rather than a script.

A folded sidecar can be deleted, or kept as a record of what was proposed and when.
