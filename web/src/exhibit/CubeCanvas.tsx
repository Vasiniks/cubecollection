import { useEffect, useRef, useState } from 'react';
import {
  SceneRig, CameraChoreographer, createDefaultCameraStates, buildExhibitCube,
  type CubeVisualSpec, type CameraStateName,
} from '../three/index.ts';
import './CubeCanvas.css';

export interface CubeCanvasProps {
  spec: CubeVisualSpec;
  /** Which named camera state to sit in. Changing it animates the move. */
  cameraState?: CameraStateName;
  /** Accessible description of what is being shown, including its provenance. */
  label: string;
}

/**
 * Mounts one exhibit cube. The Three.js core stays framework-free (web/src/three);
 * this is the only React that touches it.
 *
 * A cube here is DRAWN, not photographed, and most of what it shows is a rendering
 * convention rather than an archival fact. The caller is responsible for displaying
 * the convention disclosures alongside it — see ConventionNotice.
 */
export function CubeCanvas({ spec, cameraState = 'hero', label }: CubeCanvasProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState<string | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let rig: SceneRig;
    try {
      rig = new SceneRig({ boundingRadius: 60, withEnvironment: true, pixelRatioCap: 2 });
    } catch (e) {
      // No WebGL. The exhibition must still work: the caller renders the
      // non-3D fallback when this fires.
      setFailed(e instanceof Error ? e.message : 'WebGL is unavailable.');
      return;
    }

    const exhibit = buildExhibitCube(spec);
    rig.root.add(exhibit.group);

    const states = createDefaultCameraStates(60);
    const choreographer = new CameraChoreographer({
      camera: rig.camera,
      reducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
    choreographer.snapTo(states[cameraState]);

    host.appendChild(rig.renderer.domElement);
    rig.observeResize(host);

    // Render on demand, not every frame. The object is static unless the camera
    // is moving or the canvas resized, and a permanent rAF loop on a still image
    // costs a laptop its battery for nothing. A museum label does not flicker
    // sixty times a second either.
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      choreographer.update(dt);
      rig.render();
      raf = choreographer.isTransitioning ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      last = performance.now();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // First paint, plus a redraw whenever the element is resized.
    rig.render();
    const ro = new ResizeObserver(() => { rig.render(); });
    ro.observe(host);

    // Any camera move restarts the loop; it stops itself when the move ends.
    wake();

    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      exhibit.dispose?.();
      rig.dispose();
      if (rig.renderer.domElement.parentNode === host) {
        host.removeChild(rig.renderer.domElement);
      }
    };
  }, [spec, cameraState]);

  if (failed) {
    return (
      <div className="cube-canvas cube-canvas--unavailable" role="img" aria-label={label}>
        <p>{label}</p>
        <p className="cube-canvas__reason">
          This browser cannot draw the object. Nothing is lost from the record: the
          cube was never photographed, only drawn, and everything it showed is
          described in words on this page.
        </p>
      </div>
    );
  }

  return <div className="cube-canvas" ref={hostRef} role="img" aria-label={label} />;
}
