import { useEffect, useState } from 'react';
import { loadMeta, isResearchPreview, type BundleMeta } from './bundle';
import { useRoute } from './router';

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
        <p data-testid="preview-banner" role="note">
          Research preview — these records are researched, not curator-approved.
        </p>
      )}
      <main data-testid="shell">
        <h1>CubeCollection</h1>
        <p>
          {meta.counts.public.manufacturer} makers, {meta.counts.public.model} models,{' '}
          {meta.counts.public.variant} variants, {meta.counts.public.source} sources,{' '}
          {meta.rendering_conventions} rendering conventions.
        </p>
        <p data-testid="route">route: {route.name}</p>
      </main>
    </>
  );
}
