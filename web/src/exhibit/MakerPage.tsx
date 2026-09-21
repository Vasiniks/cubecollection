import { useEffect, useState } from 'react';
import {
  createBundle, loadManufacturers, loadModels, loadFamilies, loadVariants,
  loadSources, loadWithheld,
} from '../data/load.ts';
import type { Withheld } from '../data/load.ts';
import { adaptManufacturer, adaptModel, type RawSource } from '../data/adapter.ts';
import type { ManufacturerView, ModelView } from '../data/types.ts';
import { isUnknown, isSourceBacked } from '../data/types.ts';
import { SpecRow, SpecTable, formatValue } from './values.tsx';
import { href, navigate } from '../app/router.ts';
import './MakerPage.css';

const bundle = createBundle('/bundle');

interface ModelRow { view: ModelView; variantCount: number; familyName: string | null }
interface Loaded { maker: ManufacturerView; models: ModelRow[]; withheld: Withheld }

export function MakerPage({ manufacturerId }: { manufacturerId: string }) {
  const [state, setState] = useState<Loaded | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    (async () => {
      const [makers, models, families, variants, sources, withheld] = await Promise.all([
        loadManufacturers(bundle), loadModels(bundle), loadFamilies(bundle),
        loadVariants(bundle), loadSources(bundle), loadWithheld(bundle),
      ]);
      const raw = makers.find((m) => m.id === manufacturerId);
      if (!raw) throw new Error(`No maker ${manufacturerId} in this bundle.`);
      const byId = new Map<string, RawSource>(sources.map((s) => [s.id, s]));
      const mine = models.filter((m) => m.manufacturer_id === manufacturerId);
      const vCount = new Map<string, number>();
      for (const v of variants) vCount.set(v.model_id, (vCount.get(v.model_id) ?? 0) + 1);
      const famName = new Map(families.map((f) => [f.id, f.name ?? f.id]));
      const maker = adaptManufacturer(raw, { modelCount: mine.length, sourcesById: byId });
      const rows: ModelRow[] = mine
        .map((m) => ({
          view: adaptModel(m, { familyName: famName.get(m.family_id ?? '') ?? null, sourcesById: byId }),
          variantCount: vCount.get(m.id) ?? 0,
          familyName: famName.get(m.family_id ?? '') ?? null,
        }))
        .sort((a, b) => b.variantCount - a.variantCount || a.view.name.localeCompare(b.view.name));
      if (live) setState({ maker, models: rows, withheld });
    })().catch((e: unknown) => { if (live) setError(e instanceof Error ? e.message : String(e)); });
    return () => { live = false; };
  }, [manufacturerId]);

  if (error) return <main className="maker-room"><p>{error}</p></main>;
  if (!state) return <main className="maker-room"><p>Opening the room…</p></main>;

  const { maker, models, withheld } = state;
  const name = isSourceBacked(maker.name) ? maker.name.value
    : isUnknown(maker.name) && maker.name.unattestedValue !== undefined
      ? String(maker.name.unattestedValue) : maker.id;
  const outOfScope = withheld.by_scope[maker.id]?.['model'] ?? 0;
  const depth = maker.curatorial.makerDepth;

  // Grouped by family, because a family is the archive's own grouping — unlike
  // the depth tier on /makers, which is the exhibition's.
  const byFamily = new Map<string, ModelRow[]>();
  for (const r of models) {
    const k = r.familyName ?? 'Not assigned to a family';
    const list = byFamily.get(k) ?? [];
    list.push(r);
    byFamily.set(k, list);
  }

  return (
    <main className="maker-room" data-testid="maker-page">
      <nav className="maker-room__breadcrumb" aria-label="Breadcrumb">
        <a href={href({ name: 'makers' })}
           onClick={(e) => { e.preventDefault(); navigate(href({ name: 'makers' })); }}>
          Makers
        </a>
      </nav>

      <h1 className="maker-room__name">{name}</h1>
      {!isUnknown(maker.nativeName) && (
        <p className="maker-room__native">{formatValue(maker.nativeName)}</p>
      )}

      <p className="maker-room__depth">
        <span className="maker-room__depth-value">{depth.label}</span>
        <span className="maker-room__depth-basis">
          the exhibition’s grouping, from {depth.computedFrom} ({depth.frameworkId})
        </span>
      </p>

      <SpecTable caption="What the archive establishes about this maker, and on what basis.">
          <SpecRow term="name" value={maker.name} />
          <SpecRow term="native name" value={maker.nativeName} />
          <SpecRow term="country" value={maker.country} />
          <SpecRow term="founded" value={maker.founded} />
      </SpecTable>

      {outOfScope > 0 && (
        <p className="maker-room__withheld">
          {outOfScope} further model record{outOfScope === 1 ? '' : 's'} exist{outOfScope === 1 ? 's' : ''}{' '}
          for this maker but sit{outOfScope === 1 ? 's' : ''} outside the exhibition’s scope, so
          {outOfScope === 1 ? ' it is' : ' they are'} not listed below. A curatorial boundary,
          not a gap in the research.
        </p>
      )}

      <section aria-labelledby="models-h">
        <h2 id="models-h" className="maker-room__section-title">
          {models.length === 0
            ? 'No models shown'
            : `${models.length} model${models.length === 1 ? '' : 's'}`}
        </h2>

        {models.length === 0 ? (
          <p className="maker-room__empty">
            {maker.kind === 'service'
              ? 'This is a modification service. It makes no models of its own; its work appears as configurations of other makers’ cubes.'
              : maker.kind === 'sub_brand'
                ? 'A sub-brand. No model has been attributed to it separately from its parent.'
                : 'No model has been researched for this maker yet. Its identity is established; its catalogue is not.'}
          </p>
        ) : (
          [...byFamily.entries()].map(([family, rows]) => (
            <div key={family} className="family-group">
              <h3 className="family-group__name">{family}</h3>
              <ul className="model-list">
                {rows.map(({ view, variantCount }) => {
                  const to = href({ name: 'model', id: view.id });
                  return (
                    <li key={view.id} className="model-row">
                      <a href={to} onClick={(e) => { e.preventDefault(); navigate(to); }}>
                        {view.name}
                      </a>
                      <span className="model-row__meta">
                        {variantCount === 0
                          ? 'no configurations on file'
                          : `${variantCount} configuration${variantCount === 1 ? '' : 's'}`}
                        {' · '}
                        {isUnknown(view.announced) ? 'undated' : formatValue(view.announced)}
                        {' · '}status {view.status}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
