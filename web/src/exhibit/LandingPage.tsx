import { useEffect, useState } from 'react';
import { createBundle, getModel, getVariantsForModel, loadSources, loadMeta } from '../data/load.ts';
import type { BundleMeta } from '../data/load.ts';
import type { RawVariant, RawModel, RawSource } from '../data/adapter.ts';
import { resolveCubeVisualSpec, type CubeVisualSpec } from '../three/types.ts';
import { LazyCube } from './LazyCube.tsx';
import { BasisBadge } from './values.tsx';
import { pickFeatured } from './featured.ts';
import { leadClaim, type LeadClaim } from './claim.ts';
import { href, navigate } from '../app/router.ts';
import './LandingPage.css';

const bundle = createBundle('/bundle');

interface Loaded {
  meta: BundleMeta;
  raw: RawVariant;
  model: RawModel | null;
  spec: CubeVisualSpec;
  claim: LeadClaim | null;
  claimSources: RawSource[];
  modelId: string;
}

export function LandingPage() {
  const [state, setState] = useState<Loaded | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    const pick = pickFeatured();
    (async () => {
      const [meta, variants, model, sources] = await Promise.all([
        loadMeta(bundle),
        getVariantsForModel(bundle, pick.modelId),
        getModel(bundle, pick.modelId),
        loadSources(bundle),
      ]);
      const raw = variants.find((v) => v.id === pick.variantId);
      if (!raw) throw new Error(`Featured record ${pick.variantId} is not in this bundle.`);
      const claim = leadClaim(raw.attestations);
      const byId = new Map(sources.map((s) => [s.id, s]));
      const claimSources = (claim?.sourceIds ?? [])
        .map((id) => byId.get(id)).filter((s): s is RawSource => Boolean(s));
      const spec = resolveCubeVisualSpec(raw as never, (model ?? undefined) as never,
        { applyStandardFaceScheme: true });
      if (live) setState({ meta, raw, model: model ?? null, spec, claim, claimSources, modelId: pick.modelId });
    })().catch((e: unknown) => {
      if (live) setError(e instanceof Error ? e.message : String(e));
    });
    return () => { live = false; };
  }, []);

  if (error) return <main className="landing"><p>{error}</p></main>;
  if (!state) return <main className="landing"><p className="landing__loading">Opening the archive…</p></main>;

  const { meta, raw, claim, claimSources, modelId } = state;
  const c = meta.counts.public;
  const to = href({ name: 'variant', modelId, id: raw.id });

  return (
    <main className="landing" data-testid="landing">
      <section className="landing__exhibit">
        <div className="landing__object">
          <LazyCube
            spec={state.spec}
            label={`A drawn representation of ${raw.name ?? raw.id}. Its colours and geometry are rendering conventions, not documented facts.`}
          />
        </div>

        <div className="landing__label">
          <p className="landing__thesis">
            This is a cube.<br />This is what is known about it.<br />This is how it is known.
          </p>

          <h1 className="landing__name">{raw.name ?? raw.id}</h1>

          {claim ? (
            <>
              <blockquote className="landing__claim">{claim.note}</blockquote>
              <p className="landing__claim-basis">
                <BasisBadge value={{
                  basis: 'source-backed', value: null,
                  confidence: claim.confidence, sourceIds: claim.sourceIds,
                }} />
                <span className="landing__claim-pointer">on <code>{claim.pointer}</code></span>
              </p>
              {claimSources.length > 0 && (
                <p className="landing__claim-source">
                  {claimSources.map((s) => (
                    <span key={s.id}>
                      {s.url
                        ? <a href={s.url} target="_blank" rel="noreferrer noopener">{s.title ?? s.id}</a>
                        : (s.title ?? s.id)}
                      {s.accessed ? `, accessed ${s.accessed}` : ''}
                    </span>
                  ))}
                </p>
              )}
            </>
          ) : (
            <p className="landing__claim">
              This record carries no adjudicated claim yet. That is itself the finding.
            </p>
          )}

          <p className="landing__more">
            <a href={to} onClick={(e) => { e.preventDefault(); navigate(to); }}>
              Everything the archive holds on this object
            </a>
          </p>
        </div>
      </section>

      <section className="landing__ways" aria-labelledby="ways-h">
        <h2 id="ways-h" className="landing__ways-title">Three ways in</h2>
        <ul className="landing__ways-list">
          <li>
            <a href={href({ name: 'makers' })}
               onClick={(e) => { e.preventDefault(); navigate(href({ name: 'makers' })); }}>
              <span className="landing__way-name">Browse</span>
              <span className="landing__way-note">
                Start with the makers, ordered by how much of each one is actually known.
              </span>
            </a>
          </li>
          <li>
            <a href={href({ name: 'conventions' })}
               onClick={(e) => { e.preventDefault(); navigate(href({ name: 'conventions' })); }}>
              <span className="landing__way-name">Interrogate</span>
              <span className="landing__way-note">
                Start with what the exhibition invented, and why.
              </span>
            </a>
          </li>
          <li className="landing__way--pending">
            <span className="landing__way-name">Trace</span>
            <span className="landing__way-note">
              Follow a lineage across generations. Not built yet.
            </span>
          </li>
        </ul>
      </section>

      <section className="landing__scale">
        <dl className="landing__counts">
          {([
            ['makers', c.manufacturer], ['families', c.family], ['models', c.model],
            ['configurations', c.variant], ['sources cited', c.source],
          ] as const).map(([label, n]) => (
            <div key={label} className="landing__count">
              <dt>{label}</dt>
              <dd>{(n ?? 0).toLocaleString('en')}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
