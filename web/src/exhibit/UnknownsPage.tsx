import { useEffect, useState } from 'react';
import { createBundle, loadVariants, loadModels, loadManufacturers } from '../data/load.ts';
import type { RawAttestations } from '../data/adapter.ts';
import { Trouble } from './Trouble.tsx';
import './Trouble.css';
import { href, navigate } from '../app/router.ts';
import './UnknownsPage.css';

const bundle = createBundle('/bundle');

interface MakerRow { id: string; name: string; attested: number; searched: number }
interface Loaded { blockers: [string, number][]; variantCount: number; makers: MakerRow[]; totals: { attested: number; searched: number } }

/** Splits one attestation map into "the archive says something" and "the archive
 *  says it looked and found nothing". Absence — the question never asked — is a
 *  third category and is deliberately not counted; see the page copy. */
function tally(att: RawAttestations | undefined, out: { attested: number; searched: number }) {
  for (const a of Object.values(att ?? {})) {
    if (a.confidence === 'unknown') out.searched += 1;
    else out.attested += 1;
  }
}

export function UnknownsPage() {
  const [state, setState] = useState<Loaded | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    (async () => {
      const [variants, models, makers] = await Promise.all([
        loadVariants(bundle), loadModels(bundle), loadManufacturers(bundle),
      ]);

      // Render blockers, counted rather than hardcoded: a constant baked in at
      // build time is a number that can quietly stop being true.
      const blockerCount = new Map<string, number>();
      for (const v of variants) {
        for (const b of v.representation?.procedural?.blockers ?? []) {
          const key = b.split(':')[0] ?? b;
          blockerCount.set(key, (blockerCount.get(key) ?? 0) + 1);
        }
      }

      const modelOwner = new Map(models.map((m) => [m.id, m.manufacturer_id]));
      const per = new Map<string, { attested: number; searched: number }>();
      const get = (id: string) => {
        let e = per.get(id);
        if (!e) { e = { attested: 0, searched: 0 }; per.set(id, e); }
        return e;
      };
      for (const v of variants) {
        const owner = v.lineage?.manufacturer_id ?? modelOwner.get(v.model_id);
        if (owner) tally(v.attestations, get(owner));
      }
      for (const m of models) tally(m.attestations, get(m.manufacturer_id));

      const names = new Map(makers.map((m) => [m.id, m.name ?? m.id]));
      const rows: MakerRow[] = [...per.entries()]
        .map(([id, c]) => ({ id, name: names.get(id) ?? id, ...c }))
        .filter((r) => r.attested + r.searched > 0)
        .sort((a, b) => (b.attested + b.searched) - (a.attested + a.searched));

      const totals = rows.reduce((acc, r) => ({
        attested: acc.attested + r.attested, searched: acc.searched + r.searched,
      }), { attested: 0, searched: 0 });

      if (live) {
        setState({
          blockers: [...blockerCount.entries()].sort((a, b) => b[1] - a[1]),
          variantCount: variants.length,
          makers: rows,
          totals,
        });
      }
    })().catch((e: unknown) => { if (live) setError(e instanceof Error ? e.message : String(e)); });
    return () => { live = false; };
  }, []);

  if (error) return <main className="unknowns"><Trouble detail={error}>The gaps could not be counted.</Trouble></main>;
  if (!state) return <main className="unknowns"><p>Counting the gaps…</p></main>;

  const { blockers, variantCount, makers, totals } = state;

  return (
    <main className="unknowns" data-testid="unknowns">
      <nav className="unknowns__return">
        <a href={href({ name: 'home' })} onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          Back to the archive
        </a>
      </nav>

      <p className="unknowns__eyebrow">What this archive does not know</p>
      <h1 className="unknowns__claim">The gaps are the exhibit.</h1>

      <p className="unknowns__standfirst">
        An archive that only showed what it had found would be a catalogue of its own
        luck. These are the questions this one asked and could not answer, and the
        questions it has not yet asked — counted from the published bundle, not
        estimated.
      </p>

      <section aria-labelledby="blockers-h">
        <h2 id="blockers-h" className="unknowns__section-title">
          Why no cube here can be drawn from the record
        </h2>
        <ul className="blockers">
          {blockers.map(([name, n]) => (
            <li key={name} className="blocker">
              <span className="blocker__count">{n}</span>
              <span className="blocker__of">of {variantCount}</span>
              <span className="blocker__name">{name}</span>
              <span className="blocker__bar" aria-hidden="true">
                <span style={{ inlineSize: `${(n / variantCount) * 100}%` }} />
              </span>
            </li>
          ))}
        </ul>
        <p className="unknowns__note">
          Every configuration in the bundle carries at least three of these, so every
          object the exhibition draws is mostly convention.{' '}
          <a href={href({ name: 'conventions' })}
             onClick={(e) => { e.preventDefault(); navigate(href({ name: 'conventions' })); }}>
            Each convention is named and reasoned here.
          </a>
        </p>
      </section>

      <section aria-labelledby="split-h">
        <h2 id="split-h" className="unknowns__section-title">
          Answered, and asked-but-unanswered
        </h2>

        <p className="unknowns__note">
          Across the published bundle the archive carries <strong>{totals.attested.toLocaleString('en')}</strong>{' '}
          attestations that say something, and <strong>{totals.searched.toLocaleString('en')}</strong>{' '}
          that record a search which found nothing. The second number is the one most
          archives never publish.
        </p>

        {/* The honest limit of this page, stated rather than hidden. */}
        <p className="unknowns__caveat">
          A third category is missing here, and cannot be counted: the questions never
          asked. An absent field leaves no record of itself, so this page can show the
          ratio between answered and searched-in-vain, but not how much was never
          examined at all. Treat these bars as a measure of effort, not of coverage.
        </p>

        <ol className="maker-bars">
          {makers.map((m) => {
            const total = m.attested + m.searched;
            return (
              <li key={m.id} className="maker-bar">
                <a className="maker-bar__name"
                   href={href({ name: 'maker', id: m.id })}
                   onClick={(e) => { e.preventDefault(); navigate(href({ name: 'maker', id: m.id })); }}>
                  {m.name}
                </a>
                <span className="maker-bar__track" aria-hidden="true">
                  <span className="maker-bar__attested" style={{ inlineSize: `${(m.attested / total) * 100}%` }} />
                  <span className="maker-bar__searched" style={{ inlineSize: `${(m.searched / total) * 100}%` }} />
                </span>
                <span className="maker-bar__figures">
                  {m.attested.toLocaleString('en')} answered · {m.searched.toLocaleString('en')} searched, not found
                </span>
              </li>
            );
          })}
        </ol>
      </section>
    </main>
  );
}
