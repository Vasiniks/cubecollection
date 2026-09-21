import { Suspense, lazy } from 'react';
import type { CubeVisualSpec } from '../three/types.ts';
import './CubeCanvas.css';

// three.js is ~135 kB gzipped — more than the rest of the exhibition combined.
// Loading it before first paint would mean a visitor waits on the renderer
// before they can read a single word. Split out here, the wall label renders
// immediately and the object arrives on its plinth a moment later, which is
// also the right order to meet an exhibit in.
const CubeCanvas = lazy(() =>
  import('./CubeCanvas.tsx').then((m) => ({ default: m.CubeCanvas })));

/** The empty plinth, held at the object's exact size so nothing reflows. */
function Plinth({ label }: { label: string }) {
  return (
    <div className="cube-canvas cube-canvas--loading" role="img" aria-label={label}>
      <p className="cube-canvas__reason">Placing the object…</p>
    </div>
  );
}

export function LazyCube({ spec, label }: { spec: CubeVisualSpec; label: string }) {
  return (
    <Suspense fallback={<Plinth label={label} />}>
      <CubeCanvas spec={spec} label={label} />
    </Suspense>
  );
}
