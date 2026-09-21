import { useEffect, useState } from 'react';
import {
  createBundle, getModel, getVariantsForModel, loadSources, loadFamilies,
} from '../data/load.ts';
import { adaptModel, adaptVariant, type RawSource } from '../data/adapter.ts';
import type { ModelView, VariantView } from '../data/types.ts';
import { isUnknown } from '../data/types.ts';
import { SpecRow, SpecTable, BasisBadge, formatValue } from './values.tsx';
import { Cite } from './Cite.tsx';
import { href, navigate } from '../app/router.ts';
import './VariantPage.css';
import './ModelPage.css';

const bundle = createBundle('/bundle');

interface Loaded { model: ModelView; variants: VariantView[] }

export function ModelPage({ modelId }: { modelId: string }) {
  const [state, setState] = useState<Loaded | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    (async () => {
      const [raw, rawVariants, sources, families] = await Promise.all([
        getModel(bundle, modelId),
        getVariantsForModel(bundle, modelId),
        loadSources(bundle),
        loadFamilies(bundle),
      ]);
      if (!raw) throw new Error(`No model ${modelId} in this bundle.`);
      const byId = new Map<string, RawSource>(sources.map((s) => [s.id, s]));
      const familyName = families.find((f) => f.id === raw.family_id)?.name ?? null;
      const model = adaptModel(raw, { familyName, sourcesById: byId });
      const variants = rawVariants.map((v) => adaptVariant(v, { model: raw, sourcesById: byId }));
      if (live) setState({ model, variants });
    })().catch((e: unknown) => { if (live) setError(e instanceof Error ? e.message : String(e)); });
    return () => { live = false; };
  }, [modelId]);

  if (error) return <main className="model"><p>{error}</p></main>;
  if (!state) return <main className="model"><p>Opening the case…</p></main>;

  const { model, variants } = state;
  const sourceMap = new Map(model.evidenceTrail.map((e) => [e.sourceId, e]));
  const single = variants.length === 1;

  return (
    <main className="model" data-testid="model-page">
      <nav className="model__breadcrumb" aria-label="Breadcrumb">
        <a href={href({ name: 'makers' })}
           onClick={(e) => { e.preventDefault(); navigate(href({ name: 'makers' })); }}>
          Makers
        </a>
        <span aria-hidden="true"> / </span>
        <a href={href({ name: 'maker', id: model.manufacturerId })}
           onClick={(e) => { e.preventDefault(); navigate(href({ name: 'maker', id: model.manufacturerId })); }}>
          {model.manufacturerId}
        </a>
        {model.familyName && <><span aria-hidden="true"> / </span><span>{model.familyName}</span></>}
      </nav>

      <h1 className="model__name">{model.name}</h1>

      <p className="model__status">
        Record status: <strong>{model.status}</strong>
      </p>

      <SpecTable caption="What the archive establishes about this design, and on what basis.">
          <SpecRow sources={sourceMap} term="announced" value={model.announced} />
          <SpecRow sources={sourceMap} term="generation" value={model.generation} />
          <SpecRow sources={sourceMap} term="description" value={model.description} />
      </SpecTable>

      {/* The roster is why a visitor came this deep, so it is the dominant block —
          except on a single-configuration model, where a roster of one would be
          chrome pretending to be a choice. */}
      <section aria-labelledby="variants-h" className="model__variants">
        <h2 id="variants-h" className="model__section-title">
          {single ? 'One configuration' : `${variants.length} configurations`}
        </h2>
        {!single && (
          <p className="model__variants-note">
            One design, sold in more than one form. Each is a separate record because
            the manufacturer could build either from the same design by choosing
            different parts, materials or treatment at assembly.
          </p>
        )}
        <ul className="variant-roster">
          {variants.map((v) => {
            const to = href({ name: 'variant', modelId, id: v.id });
            const known = Object.values(v.resolvedSpecs).filter((s) => !isUnknown(s.value)).length;
            return (
              <li key={v.id} className="variant-card">
                <a href={to} onClick={(e) => { e.preventDefault(); navigate(to); }}>
                  <span className="variant-card__name">{v.name}</span>
                </a>
                <span className="variant-card__meta">
                  {v.evidenceTrail.length} citation{v.evidenceTrail.length === 1 ? '' : 's'}
                  {' · '}
                  {known} attested spec{known === 1 ? '' : 's'}
                  {' · '}status {v.status}
                </span>
                {!isUnknown(v.edition.designation) && (
                  <span className="variant-card__edition">
                    <BasisBadge value={v.edition.designation} />{' '}
                    {formatValue(v.edition.designation)}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {model.relationships.length > 0 && (
        <section aria-labelledby="rel-h">
          <h2 id="rel-h" className="model__section-title">Related designs</h2>
          <ul className="model__relationships">
            {model.relationships.map((r, i) => (
              <li key={`${r.type}-${r.targetId ?? i}`}>
                <span className="model__rel-type">{r.type.replace(/_/g, ' ')}</span>
                <span className="model__rel-target">
                  {r.targetId && r.targetEntity !== 'family'
                    ? <a href={href({ name: 'model', id: r.targetId })}
                         onClick={(e) => { e.preventDefault(); navigate(href({ name: 'model', id: r.targetId! })); }}>
                        {r.targetId}
                      </a>
                    : (r.targetId ?? '—')}
                </span>
                {!isUnknown(r.note) && <span className="model__rel-note">{formatValue(r.note)}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="mev-h">
        <h2 id="mev-h" className="model__section-title">
          Evidence on this design — {model.evidenceTrail.length} citation
          {model.evidenceTrail.length === 1 ? '' : 's'}
        </h2>
        {model.evidenceTrail.length === 0 ? (
          <p>No source is cited on this model record.</p>
        ) : (
          <ol className="evidence-list">
            {model.evidenceTrail.map((e) => (
              <li key={e.sourceId} className="evidence">
                <p className="evidence__title">
                  {e.url ? <Cite url={e.url}>{e.title}</Cite> : e.title}
                </p>
                <p className="evidence__meta">
                  Tier {e.tier} · {e.kind.replace(/_/g, ' ')}
                  {e.publisher ? ` · ${e.publisher}` : ''}
                  {e.missing ? ' · cited but not present in this bundle' : ''}
                </p>
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  );
}
