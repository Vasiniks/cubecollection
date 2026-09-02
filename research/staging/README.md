# research/staging/

Discovery findings that are **not yet canonical records**. Written by research agents while
upstream identities are still unresolved; reconciled into `data/` by the main agent.

Staging exists because Pass 2–4 discovery is worth doing in parallel with Pass 1, but a
`data/models/` record cannot resolve its `family_id` until families exist, and a family cannot
resolve `manufacturer_id` until the register does. Forcing records into `data/` early would
either fail validation or, worse, invent the identities they need.

## Shape

One YAML file per topic, not per record. Every finding carries its own evidence inline, so the
main agent can mint canonical `data/sources/` records during reconciliation without loss.

```yaml
staged_by: model-researcher
staged_on: "YYYY-MM-DD"
scope: "what this file covers"

findings:
  - candidate: "name as encountered"
    aliases: ["every other rendering seen"]
    confidence: reported          # the six values, exactly
    evidence:
      - url: "https://…"
        archive_url: "https://web.archive.org/…"   # or local_capture / excerpt
        publisher: "…"
        kind: manufacturer_official                # vocab/source-kinds.yml
        accessed: "YYYY-MM-DD"
        excerpt: "the sentence that carries the claim"
    open_questions:
      - "what remains unresolved, phrased as a question"

conflicts:
  - claim: "…"
    candidates:
      - { value: "…", sources: ["url"], confidence: reported }
      - { value: "…", sources: ["url"], confidence: reported }
    note: "why this is unresolved"

not_found:
  - "what was searched for and genuinely not found"
```

## Rules

- **`data/sources/` is written by `manufacturer-researcher` only during this wave.** Every
  other agent embeds source metadata inline here. One shared canonical lane with six
  concurrent writers is a lost edit waiting to happen.
- Staging files are not schema-validated. That is the point: a finding too uncertain to
  validate is exactly what belongs here.
- Nothing in staging is a fact until it is reconciled, sourced, and attested.
