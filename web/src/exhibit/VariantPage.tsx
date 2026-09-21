import { useEffect, useState } from 'react';
import { createBundle, getModel, getVariantsForModel, loadSources } from '../data/load.ts';
import { adaptVariant, type RawVariant, type RawModel, type RawSource } from '../data/adapter.ts';
import { resolveCubeVisualSpec, type CubeVisualSpec } from '../three/types.ts';
import type { VariantView } from '../data/types.ts';
import { isUnknown } from '../data/types.ts';
import { LazyCube } from './LazyCube.tsx';
import { SpecRow, SpecTable, BasisBadge } from './values.tsx';
import { loadConventions, type RenderingConvention } from '../app/conventions.ts';
import { href, navigate } from '../app/router.ts';
import './VariantPage.css';

const bundle = createBundle('/bundle');

interface Loaded {
  view: VariantView;
  raw: RawVariant;
  model: RawModel | null;
  spec: CubeVisualSpec;
  conventions: RenderingConvention[];
}

/** True when every face carries the same basis and the same value, so one row
 *  can stand for all six without hiding a difference. */
function facesAgree(faces: VariantView['colorway']['faces']): boolean {
  const first = faces[0];
  if (!first || faces.length !== 6) return false;
  const key = (v: typeof first.color) =>
    `${v.basis}|${'value' in v ? JSON.stringify(v.value) : ''}|${'confidence' in v ? v.confidence : ''}|${'searched' in v ? v.searched : ''}`;
  const k = key(first.color);
  return faces.every((f) => key(f.color) === k);
}

export function VariantPage({ modelId, variantId }: { modelId: string; variantId: string }) {
  const [state, setState] = useState<Loaded | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    (async () => {
      const [variants, model, conventions, allSources] = await Promise.all([
        getVariantsForModel(bundle, modelId),
        getModel(bundle, modelId),
        loadConventions(),
        loadSources(bundle),
      ]);
      const raw = variants.find((v) => v.id === variantId);
      if (!raw) throw new Error(`No variant ${variantId} in this bundle.`);
      const sourcesById = new Map<string, RawSource>(allSources.map((s) => [s.id, s]));
      const view = adaptVariant(raw, { model: model ?? null, sourcesById });
      // The 3D spec is built with the standard-scheme convention applied, because
      // no face colour is documented for any cube. The convention notices below
      // are what keep that from reading as a fact.
      const spec = resolveCubeVisualSpec(raw as never, (model ?? undefined) as never, {
        applyStandardFaceScheme: true,
      });
      if (live) setState({ view, raw, model: model ?? null, spec, conventions });
    })().catch((e: unknown) => {
      if (live) setError(e instanceof Error ? e.message : String(e));
    });
    return () => { live = false; };
  }, [modelId, variantId]);

  if (error) return <main className="variant"><p>{error}</p></main>;
  if (!state) return <main className="variant"><p>Opening the case…</p></main>;

  const { view, conventions } = state;
  // The record's own trail, indexed so each claim can show just its sources.
  const sourceMap = new Map(view.evidenceTrail.map((e) => [e.sourceId, e]));
  const inForce = conventions.filter((c) =>
    ['cv-face-colours-wca-standard', 'cv-geometry-generic-3x3', 'cv-logo-omitted'].includes(c.id)
    || (c.id === 'cv-body-plastic-neutral' && isUnknown(view.colorway.body.plasticColor))
    || (c.id === 'cv-size-56mm-fallback' && !view.resolvedSpecs.size_mm)
    || (c.id === 'cv-surface-stickerless-fallback' && isUnknown(view.colorway.application)));

  const evidenceCount = view.evidenceTrail.length;

  return (
    <main className="variant" data-testid="variant-page">
      <nav className="variant__breadcrumb" aria-label="Breadcrumb">
        <a href={href({ name: 'home' })} onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          Archive
        </a>
        <span aria-hidden="true"> / </span>
        <span>{view.lineage.familyName ?? view.lineage.manufacturerId}</span>
        <span aria-hidden="true"> / </span>
        <a href={href({ name: 'model', id: view.modelId })}
           onClick={(e) => { e.preventDefault(); navigate(href({ name: 'model', id: view.modelId })); }}>
          {view.lineage.modelName ?? view.modelId}
        </a>
      </nav>

      <p className="variant__status">
        Record status: <strong>{view.status}</strong>
        {view.status === 'stub' && ' — researched, not yet reviewed by a curator.'}
      </p>

      <div className="variant__stage">
        <LazyCube
          spec={state.spec}
          label={`A drawn representation of ${view.name}. Its colours, piece geometry and surface are rendering conventions, not documented facts.`}
        />
      </div>

      <h1 className="variant__name">{view.name}</h1>

      {/* The object's honesty label, immediately under the object — not in a footer. */}
      <section className="variant__conventions" aria-labelledby="conv-h">
        <h2 id="conv-h" className="variant__section-title">What you are looking at</h2>
        <p className="variant__lede">
          This object was drawn, not photographed. The archive documents almost nothing
          about how this cube looked, so most of what you see is a rendering convention
          the exhibition chose — each one is named below.
        </p>
        <ul className="variant__convention-list">
          {inForce.map((c) => (
            <li key={c.id} className="variant__convention">
              <BasisBadge value={{ basis: 'convention', value: null, conventionId: c.id }} />
              <p className="variant__convention-text">{c.visitor_disclosure}</p>
              <p className="variant__convention-denial">
                <span className="variant__denial-label">Asserts nothing about</span>{' '}
                {c.asserts_nothing_about}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="spec-h">
        <h2 id="spec-h" className="variant__section-title">Specification</h2>
        <SpecTable
          showFrom
          caption="Every row carries the basis of its claim. A weak claim is printed as plainly as a strong one."
        >
            {Object.entries(view.resolvedSpecs).map(([field, spec]) => (
              <SpecRow key={field} showFrom sources={sourceMap} term={field.replace(/_/g, ' ')} value={spec.value} from={spec.from} />
            ))}
            <SpecRow showFrom sources={sourceMap} term="edition name" value={view.edition.name} />
            <SpecRow showFrom sources={sourceMap} term="edition types" value={view.edition.types} />
            <SpecRow showFrom sources={sourceMap} term="limited" value={view.edition.limited.isLimited} />
            <SpecRow showFrom sources={sourceMap} term="run size" value={view.edition.limited.runSize} />
            <SpecRow showFrom sources={sourceMap} term="colourway designation" value={view.colorway.designation} />
            <SpecRow showFrom sources={sourceMap} term="surface application" value={view.colorway.application} />
            <SpecRow showFrom sources={sourceMap} term="body plastic colour" value={view.colorway.body.plasticColor} />
            <SpecRow showFrom sources={sourceMap} term="logo placement" value={view.colorway.logo.placement} />
            {/* The archive documents no face colour on any cube, so six rows all
                reading the same thing is noise rather than detail. They are
                collapsed ONLY when all six genuinely agree; the moment one face
                is researched, the rows separate again and the difference shows. */}
            {facesAgree(view.colorway.faces)
              ? <SpecRow showFrom sources={sourceMap} term="face colours (all six)" value={view.colorway.faces[0]!.color} />
              : view.colorway.faces.map((f) => (
                  <SpecRow key={f.face} showFrom sources={sourceMap} term={`face ${f.face}`} value={f.color} />
                ))}
        </SpecTable>
      </section>

      <section aria-labelledby="ev-h" className="variant__evidence">
        <h2 id="ev-h" className="variant__section-title">
          Evidence — {evidenceCount} citation{evidenceCount === 1 ? '' : 's'}
        </h2>
        {evidenceCount === 0 ? (
          <p>No source is cited on this record or the model it inherits from.</p>
        ) : (
          <ol className="evidence-list">
            {view.evidenceTrail.map((e) => (
              <li key={e.sourceId} className="evidence">
                <p className="evidence__title">
                  {e.url ? <a href={e.url} rel="noreferrer noopener" target="_blank">{e.title}</a> : e.title}
                </p>
                <p className="evidence__meta">
                  Tier {e.tier} · {e.kind.replace(/_/g, ' ')}
                  {e.publisher ? ` · ${e.publisher}` : ''}
                  {e.accessed ? ` · accessed ${e.accessed}` : ''}
                  {e.missing ? ' · cited but not present in this bundle' : ''}
                </p>
                {e.excerpt && <blockquote className="evidence__excerpt">{e.excerpt}</blockquote>}
              </li>
            ))}
          </ol>
        )}
      </section>

      <nav className="variant__return">
        <a href={href({ name: 'conventions' })}
           onClick={(e) => { e.preventDefault(); navigate(href({ name: 'conventions' })); }}>
          Every rendering convention in force
        </a>
      </nav>
    </main>
  );
}
