/**
 * SceneRig.ts — SKELETON. Signatures and types are final; bodies are being implemented in a
 * follow-up commit (see the lane's "commit a skeleton first" instruction).
 *
 * Reusable renderer + lighting + environment + resize/dispose plumbing, decomposed into plain
 * factory functions (`createRenderer`, `createMuseumLightingRig`, `createStudioEnvironment`) that
 * a React Three Fiber page can call individually, plus a convenience `SceneRig` class that wires
 * them together for a plain (non-R3F) page such as this lane's vertical-slice candidate. Nothing
 * here imports React; `SceneRig` is a plain class R3F can wrap in a `useEffect`/ref, or ignore
 * entirely in favour of the factory functions plus its own `<Canvas>`.
 *
 * LIGHTING DESIGN — museum vitrine, not a three-point cliché. A conventional key/fill/back rig
 * floods an object evenly, which is exactly wrong for a specimen the museum wants to look
 * examined rather than merely lit: real vitrine lighting is a soft overhead wash (so a visitor
 * reads the object's form, not a light source) plus one or two low, angled *rim* lights that
 * throw a thin edge highlight to separate the object from its case backdrop, plus a faint warm
 * bounce off the plinth beneath it. This module builds exactly that: `key` (soft, warm,
 * overhead-front), `fill` (a hemisphere light approximating bounced gallery light off a pale
 * floor and cool ceiling, not a second hard light), `rimLeft`/`rimRight` (angled spotlights from
 * behind, the actual signature of vitrine lighting), and `bounce` (a faint point light below).
 *
 * COULD NOT VERIFY IN A BROWSER: light intensities/angles are chosen by domain reasoning about
 * exposure and are unverified against an actual render; `RoomEnvironment` + `PMREMGenerator`'s
 * exact API shape is asserted from three.js's documented behaviour at authoring time, not run.
 */

import * as THREE from 'three';

export interface MuseumLightingRig {
  readonly group: THREE.Group;
  readonly key: THREE.DirectionalLight;
  readonly fill: THREE.HemisphereLight;
  readonly rimLeft: THREE.SpotLight;
  readonly rimRight: THREE.SpotLight;
  readonly bounce: THREE.PointLight;
  /** Detaches and clears the rig's own group. Lights hold no GPU resources here (shadow maps are
   *  off by default; see the lane README for how a page opts a light into casting one). */
  dispose(): void;
}

/**
 * Builds the museum/studio lighting rig described above, scaled to `boundingRadius` (the
 * exhibit's approximate bounding-sphere radius, in the same units as `sizeMm`) so the same rig
 * definition reads correctly whether the exhibit is one 56mm cube or a wider exploded view.
 */
export function createMuseumLightingRig(boundingRadius?: number): MuseumLightingRig {
  throw new Error('SceneRig.createMuseumLightingRig: not yet implemented (skeleton commit)');
}

export interface StudioEnvironment {
  readonly texture: THREE.Texture;
  dispose(): void;
}

/**
 * A single, documented neutral studio environment (EXHIBITION_ARCHITECTURE §7: "a turntable and
 * an exploded view; neutral studio lighting with a single documented environment"), generated
 * via `RoomEnvironment` + `PMREMGenerator` rather than loading an HDRI asset — the archive has 0
 * media records, so this module depends on none. Assign the result to `scene.environment` for
 * physically-based reflections on glossy/UV-coated materials.
 */
export function createStudioEnvironment(renderer: THREE.WebGLRenderer): StudioEnvironment {
  throw new Error('SceneRig.createStudioEnvironment: not yet implemented (skeleton commit)');
}

export interface RendererOptions {
  readonly canvas?: HTMLCanvasElement;
  readonly antialias?: boolean;
  readonly alpha?: boolean;
  /** Caps `devicePixelRatio` (default 2) — a deliberate perf choice for a page that may render
   *  many exhibits at once; see this file's README section on performance. */
  readonly pixelRatioCap?: number;
}

/** A `WebGLRenderer` pre-configured with this project's colour management and tone mapping:
 *  sRGB output, ACES filmic tone mapping. Every page in the exhibition should share this
 *  configuration so a cube looks the same in every room. */
export function createRenderer(options?: RendererOptions): THREE.WebGLRenderer {
  throw new Error('SceneRig.createRenderer: not yet implemented (skeleton commit)');
}

export interface SceneRigOptions {
  readonly canvas?: HTMLCanvasElement;
  readonly boundingRadius?: number;
  readonly withEnvironment?: boolean;
  readonly pixelRatioCap?: number;
}

/**
 * Convenience wiring of `createRenderer` + a `Scene` + a `PerspectiveCamera` +
 * `createMuseumLightingRig` + (optionally) `createStudioEnvironment`, with resize and disposal
 * handled. A page adds its own content (e.g. `CubeGeometry.assembleCube(...).group`) to `.root`,
 * never directly to `.scene`, so the rig's own lighting group stays easy to find and remove.
 */
export class SceneRig {
  readonly renderer!: THREE.WebGLRenderer;
  readonly scene!: THREE.Scene;
  readonly camera!: THREE.PerspectiveCamera;
  readonly root!: THREE.Group;
  readonly lighting!: MuseumLightingRig;

  constructor(options?: SceneRigOptions) {
    throw new Error('SceneRig.constructor: not yet implemented (skeleton commit)');
  }

  setSize(_width: number, _height: number): void {
    throw new Error('SceneRig.setSize: not yet implemented (skeleton commit)');
  }

  /** Wires a `ResizeObserver` on `container` to call `setSize` automatically. No-op (and safe)
   *  in environments without `ResizeObserver`. */
  observeResize(_container: HTMLElement): void {
    throw new Error('SceneRig.observeResize: not yet implemented (skeleton commit)');
  }

  render(): void {
    throw new Error('SceneRig.render: not yet implemented (skeleton commit)');
  }

  /** `matchMedia('(prefers-reduced-motion: reduce)')`, guarded for non-browser environments.
   *  CameraStates.ts's `CameraChoreographer` reads this so a page does not have to re-derive it. */
  get prefersReducedMotion(): boolean {
    throw new Error('SceneRig.prefersReducedMotion: not yet implemented (skeleton commit)');
  }

  /** Disposes the renderer, the lighting rig and the environment this rig created. Never
   *  disposes exhibit content added to `.root` — that is CubeGeometry.ts's / materials.ts's own
   *  cache lifecycle, since content may be shared across many SceneRigs. */
  dispose(): void {
    throw new Error('SceneRig.dispose: not yet implemented (skeleton commit)');
  }
}
