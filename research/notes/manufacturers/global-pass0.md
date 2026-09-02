# Global Pass 0 — manufacturer universe discovery

Establishing the manufacturer universe for 2016–2026 3x3 speedcubes, beyond the completed GAN
pilot. **Recall first, canonicalisation second.**

Status: **discovery phase complete, canonicalisation delegated.** This note records method and
findings so the next researcher does not repeat the expensive part.

---

## Method — and why this one

Two channels were tried. The one that worked is worth stating plainly because it is cheap and
high-recall, and the obvious alternative is neither.

**What worked: enumerating retailers' archived collection URLs.**

```
npm run wayback -- prefix 'thecubicle.com/collections/'            --limit 25000
npm run wayback -- prefix 'speedcubeshop.com/collections/<letter>' --limit 4000   # swept a–z
```

260 and 386 distinct collection slugs respectively, saved beside the candidate file. **A
retailer's brand collections are a manufacturer list** — including brands the retailer no longer
carries, because the archive keeps URLs the live site has dropped. This is the same technique that
recovered eight delisted GAN limited editions in Pass 4.5, applied one layer up.

**What did not work: guessing official domains.** Fifteen plausible manufacturer domains were
checked; five had captures. A miss here means *the guess was wrong*, not that the company has no
site — an important distinction, and the reason those are recorded as `domains_guessed_no_hit`
rather than as absence of a website.

**A tooling limitation found and fixed.** `wayback list --from` on a heavily-crawled domain
(rubiks.com) timed out and reported a bare "fetch failed", which reads exactly like "this domain
has no captures" — the opposite of the truth. The HTTP timeout is now 90s and timeouts explain
themselves and suggest `nearest` instead. This mattered: the first domain sweep returned fifteen
false negatives, including rubiks.com, which has captures back to 1998.

---

## The most important finding: the seed list mixes two different things

The project seed list contains **Valk, MGC, WeiLong, TangLong** alongside MoYu, QiYi and YJ. Those
four are **product lines, not manufacturers**:

| Name | Belongs to | Evidence |
|---|---|---|
| Valk | QiYi | A line from QiYi's collaboration with Mats Valk — a person and a product line, not a company |
| MGC | YJ | A YJ product line |
| WeiLong | MoYu | TheCubicle's own slugs `moyu-weilong-wrm-v9` and `-v10` pair them |
| TangLong | MoYu | A MoYu product line |
| Tornado | QiYi / X-Man | Slugs `tornado-v3`, `tornado-v4` sit beside `x-man-designs` |

**Creating manufacturer records for these would fracture the archive at the wrong layer** — the
exact error the GAN pilot spent three passes learning to avoid, arriving one level higher. They are
recorded in the candidate file under `product_lines_not_manufacturers` so the next researcher meets
the warning before the temptation.

`Guhong` is the interesting case: historically a DaYan name, appearing at TheCubicle as
`guhong-pro-m-3x3` and at QiYi. If the name moved between companies, that is a genuine identity
finding worth documenting rather than a slug to file away.

---

## Candidate universe

Full detail in `research/staging/manufacturers/global-pass0-candidates.yml`. Summary:

| Group | Count | Character |
|---|---|---|
| Already canonical | 6 | GAN, its two sub-brands, three services |
| Strong candidates | 14 | Seen at both retailers and/or in the seed list |
| Probable sub-brands | 3 | X-Man Design, MFJS, Meilong |
| Product lines (not manufacturers) | 6 | The trap above |
| Long tail | ~30 | One retailer, or ambiguous between brand / product / house line |
| Service candidates | 2 | Angstrom Research, and the unresolved `FZ` |

**Two long-tail suspicions worth carrying forward.** `UniCube`, `Supernova` and `Cosmic` appear at
SpeedCubeShop with `-magnetic` / `-non-magnetic` splits that look like a **retailer's own product
tiering**, not independent manufacturers. And `Max`, `CubeHead` and `Angstrom` are probably
lubricant, creator and service brands respectively. Each needs checking before a record exists —
"appears in a retailer's brand list" is not "is a manufacturer".

**`FZ` is now doubly interesting.** It was an unresolved prefix from the GAN pass (`fz-gan13-*`,
`fz-gan15-*`), and TheCubicle also has an `fz-lubricants` collection. A lubricant line plus a
GAN-prefixed product line points at a *service*, not a manufacturer — but `fangshi` at
SpeedCubeShop keeps an alternative reading alive. Genuinely open.

---

## Limitations of this discovery

- **Two retailers, both English-language and both US-facing.** Brands sold only in China, or only
  through Chinese platforms, are systematically invisible to this method
- **No Chinese-language discovery yet.** Native names are absent throughout, and for several
  long-tail candidates the native name is probably the only way to resolve identity
- **Retailer collections skew recent.** A brand that died before a retailer's archive coverage
  began will not appear
- **No manufacturer has been canonicalised yet.** Every name above is a candidate

---

## Recommended next steps

1. Canonicalise the 14 strong candidates with real per-manufacturer evidence
2. Resolve the three probable sub-brand relationships from evidence, not from naming resemblance —
   MoYu's internal structure is not GAN's
3. Settle `FZ` and `FangShi`: one entity, two, or a service and a manufacturer
4. Test the UniCube / Supernova / Cosmic house-line suspicion
5. Chinese-language discovery, which is where the remaining recall is
6. Smart-cube companies as a named blind spot — `MsCube` is the only one found so far
