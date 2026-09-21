import { useEffect, useState } from 'react';
import { createBundle, loadManufacturers, loadModels, loadWithheld } from '../data/load.ts';
import type { Withheld } from '../data/load.ts';
import { adaptManufacturer } from '../data/adapter.ts';
import type { ManufacturerView } from '../data/types.ts';
import { isSourceBacked, isUnknown } from '../data/types.ts';
import { Trouble } from './Trouble.tsx';
import './Trouble.css';
import { href, navigate } from '../app/router.ts';
import './MakersPage.css';

const bundle = createBundle('/bundle');

type Tier = 'deep' | 'mid' | 'thin';

const TIER_COPY: Record<Tier, { title: string; note: string }> = {
  deep: {
    title: 'Deep',
    note: 'Sixteen models or more on file. Enough to read a lineage across generations.',
  },
  mid: {
    title: 'Mid',
    note: 'Four to fifteen models. A shape is visible; the gaps between generations are not yet filled.',
  },
  thin: {
    title: 'Thin',
    note: 'Three models or fewer. An archival card, not a gallery — and in most cases that is how much was found, not how much was made.',
  },
};

function makerName(m: ManufacturerView): string {
  const n = m.name;
  if (isSourceBacked(n)) return n.value;
  if (isUnknown(n) && n.unattestedValue !== undefined) return String(n.unattestedValue);
  return m.id;
}

/**
 * Zero models is not one thing.
 *
 * A modification service has no models by its nature — its work appears as
 * variants on other makers' models — so rendering it as an empty gallery would
 * turn a structural fact into a research hole. A manufacturer with no models is
 * a genuine gap: identity established, enumeration not done. The page has to say
 * which it is looking at.
 */
function zeroReading(m: ManufacturerView, withheld: Withheld): string | null {
  if (m.modelCount > 0) return null;
  // Withheld first: a maker whose only model is out of the exhibition's scope is
  // not an unresearched maker, and saying so would be a plain falsehood.
  const outOfScope = withheld.by_scope[m.id]?.['model'];
  if (outOfScope) {
    return `${outOfScope} model${outOfScope === 1 ? ' is' : 's are'} on file but outside the exhibition’s scope, so ${outOfScope === 1 ? 'it is' : 'they are'} not shown here. This is a curatorial boundary, not a gap in the research.`;
  }
  if (m.kind === 'service') {
    return 'A modification service. It makes no models of its own; its work appears as configurations of other makers’ cubes.';
  }
  if (m.kind === 'sub_brand') {
    return 'A sub-brand. No model has been attributed to it separately from its parent.';
  }
  return 'No model has been researched for this maker yet. Its identity is established; its catalogue is not.';
}

export function MakersPage() {
  const [makers, setMakers] = useState<ManufacturerView[] | null>(null);
  const [withheld, setWithheld] = useState<Withheld>({ by_scope: {}, by_status: {} });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    (async () => {
      const [raw, models, wh] = await Promise.all([
        loadManufacturers(bundle), loadModels(bundle), loadWithheld(bundle),
      ]);
      const counts = new Map<string, number>();
      for (const m of models) counts.set(m.manufacturer_id, (counts.get(m.manufacturer_id) ?? 0) + 1);
      const views = raw
        .map((r) => adaptManufacturer(r, { modelCount: counts.get(r.id) ?? 0 }))
        .sort((a, b) => b.modelCount - a.modelCount || a.id.localeCompare(b.id));
      if (live) { setWithheld(wh); setMakers(views); }
    })().catch((e: unknown) => { if (live) setError(e instanceof Error ? e.message : String(e)); });
    return () => { live = false; };
  }, []);

  if (error) return <main className="makers"><Trouble detail={error}>The roster could not be read.</Trouble></main>;
  if (!makers) return <main className="makers"><p>Reading the roster…</p></main>;

  const tiers: Record<Tier, ManufacturerView[]> = { deep: [], mid: [], thin: [] };
  for (const m of makers) tiers[m.curatorial.makerDepth.value].push(m);

  return (
    <main className="makers" data-testid="makers">
      <nav className="makers__return">
        <a href={href({ name: 'home' })} onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          Back to the archive
        </a>
      </nav>

      <h1 className="makers__title">{makers.length} makers</h1>
      <p className="makers__lede">
        Ordered by how much of each maker the archive actually holds, not alphabetically.
        Alphabetical order would set a maker with forty models beside one with a single
        card and imply they are equally known. They are not.
      </p>

      {/* Layer 2 of the three, and it says so. Grouping is the exhibition's
          reading of the archive, not a fact the archive asserts. */}
      <p className="makers__curatorial-note">
        <strong>These three groups are the exhibition’s judgement, not the archive’s.</strong>{' '}
        They are computed from one number — how many models are on file — using the
        thresholds recorded as <code>maker-depth-v1</code>. No maker is described here as
        large or small, only as well or thinly covered by this archive.
      </p>

      {(['deep', 'mid', 'thin'] as const).map((tier) => (
        <section key={tier} className="tier" aria-labelledby={`tier-${tier}`}>
          <h2 className="tier__title" id={`tier-${tier}`}>
            {TIER_COPY[tier].title}
            <span className="tier__count">{tiers[tier].length}</span>
          </h2>
          <p className="tier__note">{TIER_COPY[tier].note}</p>
          <ul className="tier__list" data-tier={tier}>
            {tiers[tier].map((m) => {
              const zero = zeroReading(m, withheld);
              return (
                <li key={m.id} className="maker" data-zero={zero ? 'true' : undefined}>
                  <a className="maker__name"
                     href={href({ name: 'maker', id: m.id })}
                     onClick={(e) => { e.preventDefault(); navigate(href({ name: 'maker', id: m.id })); }}>
                    {makerName(m)}
                  </a>
                  <span className="maker__count">
                    {m.modelCount === 0 ? 'no models' : `${m.modelCount} model${m.modelCount === 1 ? '' : 's'}`}
                  </span>
                  {zero && <span className="maker__zero">{zero}</span>}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
