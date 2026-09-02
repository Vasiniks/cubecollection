# Fixtures

Synthetic records used only by `scripts/selftest.mjs`. **None of this is archive data.**

Every id is prefixed `zz-` and every value is invented to make a specific rule fire. The
fixtures are loaded through `CC_DATA_ROOT`, never from `data/`, and never reach a bundle.

- `pass/` — an internally consistent miniature archive that must validate clean. It exercises
  model to variant inheritance, an override, a full colourway, a conditional-scope admission,
  an aftermarket `modified_from`, a `rebrand_of`, a private specimen, an `archivist_paid`
  price, media with unclear rights, and all three preservation methods.
- `fail/` — records engineered to trip named rules. The self-test asserts each rule fires.
