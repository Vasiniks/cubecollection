import { useEffect, useState } from 'react';
import { loadMeta, isResearchPreview, type BundleMeta } from './bundle';
import { useRoute, href, navigate } from './router';
import { Trouble, NoSuchRoom } from '../exhibit/Trouble';
import '../exhibit/Trouble.css';
import { ConventionsPage } from './ConventionsPage';
import { VariantPage } from '../exhibit/VariantPage';
import { LandingPage } from '../exhibit/LandingPage';
import { MakersPage } from '../exhibit/MakersPage';
import { ModelPage } from '../exhibit/ModelPage';
import { MakerPage } from '../exhibit/MakerPage';
import { UnknownsPage } from '../exhibit/UnknownsPage';

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

  if (error) {
    return (
      <main data-testid="bundle-error">
        <Trouble detail={error}>The exhibition could not read its bundle.</Trouble>
      </main>
    );
  }
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
       : route.name === 'maker' ? <MakerPage manufacturerId={route.id} />
       : route.name === 'unknowns' ? <UnknownsPage />
       : route.name === 'notFound' ? (
         <main className="makers">
           <NoSuchRoom path={route.path} />
           <p className="trouble__ways">
             <a href={href({ name: 'makers' })}
                onClick={(e) => { e.preventDefault(); navigate(href({ name: 'makers' })); }}>
               The makers
             </a>
             <a href={href({ name: 'unknowns' })}
                onClick={(e) => { e.preventDefault(); navigate(href({ name: 'unknowns' })); }}>
               What is not known
             </a>
             <a href={href({ name: 'home' })}
                onClick={(e) => { e.preventDefault(); navigate('/'); }}>
               Back to the archive
             </a>
           </p>
         </main>
       ) : null}
    </>
  );
}
