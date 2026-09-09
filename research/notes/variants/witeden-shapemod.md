# WitEden shape-mod variant enumeration — session notes (Pass 4, Batch 2, Agent G)

## Open lead: possible unsuffixed "3x3x3 Mixup" product

TheCubicle's "Versions" selector, viewed live from both
`/products/witeden-oskar-3x3x3-mixup` and `/products/witeden-3x3x3-mixup-plus`, lists a
sibling entry named plainly **"3x3x3 Mixup"** at **$34.99** — the same price point as the
Oskar-credited variant and the 30-Degree Turn variant (both also $34.99).

This was not resolved to an independently distinct live URL/product this pass. Two readings
are equally plausible from the evidence gathered:

1. The selector is self-referencing — "3x3x3 Mixup" is simply the short display name the
   selector uses for whichever $34.99 product is currently being viewed (Oskar's actual title
   is "WitEden & Oskar 3x3x3 Mixup", so a truncated/generic short label in the selector chrome
   would explain this without a fifth product existing).
2. A genuine fifth, undifferentiated "3x3x3 Mixup" product exists (perhaps the base Mixup
   Cube concept sold without the "& Oskar" designer credit, at the same base price) that this
   pass's WitEden Mixup source set did not separately capture.

**Not acted on.** No model record was created or should be inferred from this note — model
enumeration is frozen for this lane. If a future pass can click through TheCubicle's own
"Versions" selector to a distinct URL for "3x3x3 Mixup" (unsuffixed), that is pass-3 (model
enumeration) territory to evaluate against DATA_MODEL §4.2, not a pass-4 variant call under
an existing model.

## Method note

All six WitEden 3x3-shaped models in this lane were assessed for variant differentiation by
re-fetching each live TheCubicle product page through `npm run wayback -- get` (the Wayback
`id_` raw form, tag-stripped) at the most recent available capture as of 2026-09-09, and
checking for: (a) colour/edition dropdown options, (b) a distinct edition/tier name, (c) any
description text implying a second sold configuration. None was found beyond stock body
colour (Black-only, or Black+White) in any case. WitEden's own manufacturer site was not found
to carry a live catalogue for these products at all this pass (consistent with pass 3's
finding); no community release thread was located either. Packaging photography was not
checked (no accessible source found).
