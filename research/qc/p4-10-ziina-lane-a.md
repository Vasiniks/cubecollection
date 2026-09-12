# P4-10 — Ziina / Ziina Star manufacturer research — LANE A (second attempt)

## SCOPE
Ledger issue P4-10: who MANUFACTURES the "Ziina" / "Ziina Star" 3x3 speedcube brand (as opposed to
who sells it, who supplies a retailer, or under what name it is marketed). This is a second attempt
at Lane A; the first was killed by a session limit nine minutes in and produced only a skeleton
(no findings). This file supersedes that skeleton.

Out of scope (per task boundaries): creating any manufacturer/family/model/variant record, editing
the ledger itself, editing any existing source record. Only new `data/sources/ziina-*` or
`ziinastar-*` records and this file may be touched.

## BASE COMMIT
4873931 on main (worktree: agent-a70c2b95b2590828c)

## TARGETS
Untried avenues, in priority order (per task brief):
1. Packaging photography via SpeedCubeShop/TheCubicle/cubein.cn product images (highest value).
2. Chinese-language search for a native brand name (魔方 = cube).
3. 1688.com / Taobao supplier listings.
4. Specialist databases: speedsolving.com wiki, twistypuzzles.com museum.
5. Any first-party Ziina presence in any language.

## STATUS
DONE (this pass). All five task-brief avenues attempted. Conclusion: OUTCOME 4, UNRESOLVED.
See CONCLUSION section at the end of this file for the full statement and what would be needed.

NOTE ON THIS SCRATCHPAD: this session's scratchpad
(`/private/tmp/.../scratchpad/ziina/`) already contained image files (box-crop-full.png,
logo-crop.png, batch1/2/3 directories, a 1688 offer HTML) that predate my first tool call in
this transcript, at timestamps ~02:37-02:46 vs my first calls at ~06:07. These appear to be
artifacts of earlier work in this same session that is no longer in my visible context (not
files I can attribute to a verified fetch). I DID NOT cite any of those unlabeled files as
evidence. Where they pointed at something promising (the box logo), I independently re-fetched
the same or an equivalent product image fresh, from a known URL, and verified it myself before
citing it. Treat this note as a caution for any future continuation of this lane: don't trust
scratchpad files without a citable provenance, even if they look like useful crops.

## FINDINGS

### 1. Packaging photography (avenue 1) — box logo is a stylized wordmark, not a second identity
Examined TheCubicle's own product photo for "Ziina Space Magnetic 3x3" (fetched fresh from the
product JSON, native 900x600, verified by decode) at 5-8x enhanced crops.
- Small red corner badge (TM mark + star shape) is native ~30x30px — genuinely below the
  legibility floor. Enhancement attempted, unsuccessful. This is a resolution ceiling, not a
  finding of "nothing there."
- Larger legible text beside the badge reads "ZIINA STAR" — matches the known brand, no second
  name.
- Chinese text on the box: "星际" (interstellar) / "SPACE" / "磁力三阶" (magnetic 3rd-order) — a
  descriptive product-name translation, NOT a company or manufacturer name.
- The assembled cube's own center cap carries a hand-drawn "ZIINA STAR" logo with a star, printed
  directly on the mechanism (stronger than a vendor field, but still only the known brand name).
- No manufacturer/factory/regulatory block visible — but only the box's FRONT face was
  photographed; back/bottom panels (where such text usually lives on Chinese retail packaging)
  were simply never in frame. This is an incomplete inspection, not a completed negative.
Recorded as `ziina-star-packaging-photography-2026-09`. Conclusion: this avenue, as far as the
one available product photo permits, does NOT surface a distinct manufacturer name. It also does
not rule one out, since the panel most likely to carry it was never photographed by the retailer.

### 2. cubein.cn packaging (avenue 1, continued) — a Ziina-vendor product ships in an UNBRANDED box
cubein.cn's own JSON for "Ziina Heat Printed Calendar Cube" (vendor: Ziina Star; body copy: "Brand
Name: Ziina") includes a packaging photo (native 800x800) that TheCubicle never offered: a box
side panel. Findings:
- The box FRONT carries no "Ziina"/"Ziina Star" text or logo at all — just generic "SPEED CUBE"
  gradient/diamond graphics. This is a different box design entirely from TheCubicle's
  brand-specific "Ziina Star ... Space" box.
- The SIDE PANEL shows a standard CE/UKCA/recycling/choking-hazard label with matching
  Arabic-script text (Middle-East export) and "MADE IN CHINA" — but no legible company name,
  factory name, or address, even after 6-10x enhancement. Two small icon+text blocks remain
  genuinely unreadable at native resolution (legibility floor, not a confirmed blank).
- Eight other images show the assembled cube with plain, unmarked center caps (no logo) — unlike
  the branded "Space Magnetic" base cube, consistent with the archive's print-theme-vs-base-cube
  pattern already established.
WHY IT MATTERS: this is the first evidence that a "Ziina"-tagged product ships in packaging with
NO Ziina branding whatsoever. Consistent with either (a) per-retailer repackaging, or (b) a
storefront-level brand label over an unbranded/generic factory product (tilting toward the
OEM/private-label hypothesis) — this record does NOT adjudicate between them, it only preserves
the observation. Recorded as `ziina-cubein-calendar-cube-packaging-2026-09`.

### 3. Chinese-language search, 1688, twistypuzzles, specialist databases (avenues 2-4) — negative/blocked
- Chinese-language searches ("Ziina Star 魔方 厂家", "Ziina 魔方 1688") surfaced only the same
  English retailer listings already known, plus unrelated 1688 category pages and the UAE
  fintech's Wikipedia page. No native Chinese brand/company name found.
- twistypuzzles.com: the museum search CGI endpoint returned HTTP 403 (blocked, recorded as
  such, not as absence). A site-restricted web search found zero Ziina content of any kind —
  no museum entry, no forum thread.
- speedsolving.com wiki: a fresh site-restricted search still surfaces nothing beyond the
  already-known forum thread and unrelated method pages — consistent with the prior sweep's 404s.
- 1688.com: an offer id (2207525125403) already present in this session's scratchpad from
  earlier, unlabeled work was retried by both curl and WebFetch. BOTH hit 1688's anti-bot
  captcha interstitial. Whether that offer is even Ziina-related is UNKNOWN — recorded as
  blocked/unverified, explicitly not as a lead.
- METHODOLOGY CAVEAT recorded: a web-search tool's own synthesized answer asserted "CubeIn is
  listed as the manufacturer/distributor for Ziina Star" — this is a search-summary inference
  with NO supporting page in its own result set, contradicted by this archive's own evidence that
  CubeIn (cubein.cn) is a retailer/storefront. Explicitly rejected, not propagated.
Recorded as `ziina-secondary-avenues-sweep-2026-09`.

## EVIDENCE
- ziina-star-packaging-photography-2026-09 (data/sources/ziina-star-packaging-photography-2026-09.yml)
- ziina-cubein-calendar-cube-packaging-2026-09 (data/sources/ziina-cubein-calendar-cube-packaging-2026-09.yml)
- ziina-secondary-avenues-sweep-2026-09 (data/sources/ziina-secondary-avenues-sweep-2026-09.yml)

## CHANGES
- research/qc/p4-10-ziina-lane-a.md (this file)
- data/sources/ziina-star-packaging-photography-2026-09.yml
- data/sources/ziina-cubein-calendar-cube-packaging-2026-09.yml
- data/sources/ziina-secondary-avenues-sweep-2026-09.yml

## UNRESOLVED
- Who manufactures Ziina / Ziina Star: still open after all five task-brief avenues.
- No company name/address legible on any packaging examined; two small label icon-blocks on the
  cubein.cn box remain below the legibility floor even after enhancement — a genuine resolution
  ceiling on the two photos available, not a proof there is nothing to find.
- Whether the generic "SPEED CUBE" box at cubein.cn indicates OEM/private-label sourcing or is
  just that retailer's own repackaging choice is UNRESOLVED — a real observation, not a
  conclusion either way.
- 1688.com remains completely inaccessible to this research method (both curl and WebFetch
  blocked by the same anti-bot mechanism); the one offer id on hand is unverified as to subject.
- The two live community hypotheses (OEM rebrand of a MoYu MeiLong vs. independent maker copying
  the MeiLong 3M) are exactly as unsettled as when this lane started — nothing found this pass
  discriminates between them.

## NEXT (for any future continuation)
- If 1688/Taobao ever becomes reachable (a different network path, a logged-in session, or simply
  retrying later), check offer id 2207525125403 first, but verify its subject before citing it.
- If a higher-resolution photo of either box (TheCubicle's corner badge, or the two unread
  cubein.cn label icon-blocks) surfaces anywhere, re-attempt the same enhancement pipeline used
  here (Lanczos + contrast/sharpness) — the method works, it is only source resolution that
  limited this pass.
- Check the remaining cubein.cn product slugs not yet examined (ziina-11, ziina-3x3-cube-
  sticker-pattern-mod, ziina-8x8-world-map-flags-theme-speed-puzzle-cube, ziina-cloud-3x3,
  ziina-flower-cube-3x3-gid, ziina-halloween-33, ziina-heat-printed-poker-cube,
  ziina-periodic-table-8x8-4x4-3x3-speed-puzzle-cube, ziina-uv-printed-3x3-cube,
  ziina-world-map-flags-speed-puzzle-cube-series, zn-pt3) for any packaging shot with a legible
  manufacturer block — only one of eleven listings (the calendar cube) was checked this pass.

## CONCLUSION
**OUTCOME 4: UNRESOLVED.** Neither confirmed manufacturer nor confirmed OEM/private-label is
supported by the evidence gathered across this lane and the two prior sweeps it builds on.

What this pass adds to the record: packaging photography (the highest-priority untried avenue)
was worked at two independent retailers. Neither box carries a legible manufacturer/factory name.
One box (TheCubicle's "Space Magnetic") is a dedicated, brand-specific design with a "Ziina Star"
logo printed both on the box and on the cube's own center cap — first-party-ish evidence that
whoever assembles/packages that SKU treats "Ziina Star" as their own brand, at minimum in
presentation. The other (cubein.cn's calendar cube) ships in a completely generic, unbranded
"SPEED CUBE" box with only boilerplate CE/UKCA/MADE-IN-CHINA markings, no company name. That
divergence is itself new information: it shows the brand is not asserted uniformly across every
Ziina-tagged SKU's own packaging, which is more consistent with a distributor/label applied
inconsistently across a sourced product line than with a single manufacturer's controlled brand
presentation — but it is a single data point and does not rise to confirmation of either outcome.
Chinese-language search, 1688/Taobao, and both named specialist databases (speedsolving wiki,
twistypuzzles) added only negative or blocked results, none of them decisive.

WHAT WOULD BE NEEDED to reach outcome 1 (confirmed manufacturer) or outcome 2 (confirmed
OEM/private-label), stated exactly:
- For outcome 1: a first-party Ziina/Ziina Star web presence, storefront, or registration
  (business, trademark, or ICP filing) naming a company distinct from any known manufacturer AND
  tied to this product line by more than a vendor string — OR a legible manufacturer/factory
  block on ANY Ziina packaging (the two photos in hand do not have one, but only one to three
  box faces total have ever been photographed by any retailer found so far).
- For outcome 2: a mould-level physical match (not just a dimension or a single forum user's
  disassembly claim) between a Ziina/Ziina Star product and a specific, already-identified
  manufacturer's model - e.g., matching tooling marks, an identical core/spring assembly
  photographed and compared, or a first-party statement from MoYu (or another named
  manufacturer) acknowledging the OEM relationship, comparable in kind to camcuber's SCS-Pro
  statement already on file but naming Ziina specifically instead of the SCS Pro.
Neither exists in the evidence gathered by this lane or the two prior sweeps. Recommend the
ledger keep P4-10 at its current status; this lane found no basis to change the adjudication,
only to narrow what remains untried (back/bottom panels of unexamined SKUs, and 1688 access).
