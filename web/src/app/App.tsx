import { useEffect, useState } from 'react';
import { loadMeta, isResearchPreview, type BundleMeta } from './bundle';
import { useRoute, href, navigate } from './router';
import { ConventionsPage } from './ConventionsPage';
import { VariantPage } from '../exhibit/VariantPage';
import { LandingPage } from '../exhibit/LandingPage';
import { MakersPage } from '../exhibit/MakersPage';
import { ModelPage } from '../exhibit/ModelPage';

export function App() {
  const route = useRoute();
  const [meta, setMeta] = useState<BundleMeta | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    loadMeta(ac.signal)
      .then(setMeta)
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        setError(e instanceof Error ? e.message : String(e));
      });
    return () => ac.abort();
  }, []);

  if (error) return <main data-testid="bundle-error"><p>{error}</p></main>;
  if (!meta) return <main data-testid="bundle-loading"><p>Opening the archive…</p></main>;

  return (
    <>
      {isResearchPreview(meta) && (
        <p className="preview-banner" data-testid="preview-banner" role="note">
          <span className="preview-banner__tag">Research preview</span>
          <span>
            These records are researched, not curator-approved. Nothing here has passed
            a curator's review, and each page states its own record status.
          </span>
        </p>
      )}
      {route.name === 'conventions' ? <ConventionsPage />
       : route.name === 'variant' ? <VariantPage modelId={route.modelId} variantId={route.id} />
       : route.name === 'home' ? <LandingPage />
       : route.name === 'makers' ? <MakersPage />
       : route.name === 'model' ? <ModelPage modelId={route.id} />
       : (
      <main data-testid="shell">
        <h1>CubeCollection</h1>
        <p>
          {meta.counts.public.manufacturer} makers, {meta.counts.public.model} models,{' '}
          {meta.counts.public.variant} variants, {meta.counts.public.source} sources,{' '}
          {meta.rendering_conventions} rendering conventions.
        </p>
        <p data-testid="route">route: {route.name}</p>
        <p>
          <a
            href={href({ name: 'conventions' })}
            onClick={(e) => { e.preventDefault(); navigate(href({ name: 'conventions' })); }}
          >
            How this exhibition draws what it cannot cite
          </a>
        </p>
        <ul>
          {[
            ['gan-flagship-16--maglev-max-dual-wr-limited-edition', 'GAN16 Maglev MAX (Dual-WR Limited Edition)'],
            ['gan-flagship-16--amyth-winter-limited-edition', 'Amyth — GAN16 Maglev MAX Winter Limited Edition'],
          ].map(([id, name]) => {
            const to = href({ name: 'variant', modelId: 'gan-flagship-16', id: id as string });
            return (
              <li key={id}>
                <a href={to} onClick={(e) => { e.preventDefault(); navigate(to); }}>{name}</a>
              </li>
            );
          })}
        </ul>
      </main>
      )}
    </>
  );
}
