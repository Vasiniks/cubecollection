/**
 * The landing page's curated featured objects.
 *
 * A fixed list of real record ids, not a random pick over all 511 variants:
 * an accidental stub with nothing attested would undercut the one thing the
 * landing page is trying to demonstrate. Every id below was selected by
 * measuring the archive — each has at least seven attestations, several of
 * them carrying the researcher's own note, and at least one tier 1 or tier 2
 * source. None of these records was edited to qualify.
 */
export const FEATURED: readonly { modelId: string; variantId: string }[] = [
  { modelId: 'gan-flagship-16', variantId: 'gan-flagship-16--maglev-max-dual-wr-limited-edition' },
  { modelId: 'moyu-aolong-v2', variantId: 'moyu-aolong-v2--limited-edition' },
  { modelId: 'gan-flagship-13', variantId: 'gan-flagship-13--kunlun-2022-winter-le' },
  { modelId: 'gan-flagship-12', variantId: 'gan-flagship-12--chan-2022-summer-le' },
  { modelId: 'gan-356-xs', variantId: 'gan-356-xs--vita-c-2020-summer-le' },
  { modelId: 'yj-mgc3-beta', variantId: 'yj-mgc3-beta--limited-edition' },
  { modelId: 'particula-gocube-x', variantId: 'particula-gocube-x--standard' },
  { modelId: 'gan-flagship-11', variantId: 'gan-flagship-11--kun-2020-winter-le' },
];

/** Rotates on load, so the landing page is not the same object every visit. */
export function pickFeatured(): { modelId: string; variantId: string } {
  const i = Math.floor(Math.random() * FEATURED.length);
  return FEATURED[i] ?? FEATURED[0]!;
}
