/**
 * SceneRig.ts
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
 * exact API shape and the `three/examples/jsm/environments/RoomEnvironment.js` import path are
 * asserted from three.js's documented behaviour at authoring time, not run.
 */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// ================================================================== lighting

export interface MuseumLightingRig {
  readonly group: THREE.Group;
  readonly key: THREE.DirectionalLight;
  readonly fill: THREE.HemisphereLight;
  readonly rimLeft: THREE.SpotLight;
  readonly rimRight: THREE.SpotLight;
  readonly bounce: THREE.PointLight;
  /** Detaches and clears the rig's own group. Lights hold no GPU resources here (shadow maps are
   *  off by default; a page that wants one should enable it on the returned light directly and
   *  dispose its shadow map itself — this rig does not assume that cost for every exhibit). */
  dispose(): void;
}

/**
 * Builds the museum/studio lighting rig described in this file's header, scaled to
 * `boundingRadius` (the exhibit's approximate bounding-sphere radius, in the same units as
 * `sizeMm`) so the same rig definition reads correctly whether the exhibit is one 56mm cube or a
 * wider exploded view. All lights point at the origin; a page whose exhibit is not centred at
 * the origin should move the whole rig's `.group`, not the individual lights.
 */
export function createMuseumLightingRig(boundingRadius = 100): MuseumLightingRig {
  const r = boundingRadius;
  const group = new THREE.Group();
  group.name = 'museum-lighting-rig';

  // Soft overhead-front key: a vitrine's diffuse overhead spot, not a hard three-point key.
  const key = new THREE.DirectionalLight(0xfff4e6, 2.2);
  key.position.set(r * 0.6, r * 1.4, r * 0.9);
  key.target.position.set(0, 0, 0);
  key.castShadow = false;

  // Sky/ground fill approximating bounced gallery light off a pale floor and a cool ceiling.
  const fill = new THREE.HemisphereLight(0xdfe9ff, 0xdad2c2, 0.6);

  // Two low, angled rim/edge lights from behind — the actual signature of vitrine lighting: they
  // separate the object from its backdrop with a thin edge highlight rather than flooding it,
  // which a three-point key/fill/back setup does not reproduce.
  const rimLeft = new THREE.SpotLight(0xbfd4ff, 1.4, 0, Math.PI / 6, 0.4, 1.2);
  rimLeft.position.set(-r * 1.3, r * 0.5, -r * 1.1);
  rimLeft.target.position.set(0, 0, 0);

  const rimRight = new THREE.SpotLight(0xffe9c7, 1.1, 0, Math.PI / 6, 0.4, 1.2);
  rimRight.position.set(r * 1.3, r * 0.4, -r * 1.0);
  rimRight.target.position.set(0, 0, 0);

  // A faint warm bounce off "the plinth" beneath the object.
  const bounce = new THREE.PointLight(0xffedd6, 0.35, r * 6, 2);
  bounce.position.set(0, -r * 0.6, r * 0.2);

  group.add(key, key.target, fill, rimLeft, rimLeft.target, rimRight, rimRight.target, bounce);

  return {
    group,
    key,
    fill,
    rimLeft,
    rimRight,
    bounce,
    dispose() {
      group.clear();
    },
  };
}

// ================================================================== environment

export interface StudioEnvironment {
  readonly texture: THREE.Texture;
  dispose(): void;
}

/**
 * A single, documented neutral studio environment (EXHIBITION_ARCHITECTURE §7: "a turntable and
 * an exploded view; neutral studio lighting with a single documented environment"), generated
 * via `RoomEnvironment` + `PMREMGenerator` rather than loading an HDRI asset — the archive has 0
 * media records, so this module depends on none. Assign the result to `scene.environment` for
 * physically-based reflections on glossy/UV-coated materials. The returned render target's
 * texture is safe to share across every `SceneRig` in the exhibition; only dispose it once,
 * on final teardown.
 */
export function createStudioEnvironment(renderer: THREE.WebGLRenderer): StudioEnvironment {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const renderTarget = pmrem.fromScene(new RoomEnvironment(), 0.04);
  pmrem.dispose();
  return {
    texture: renderTarget.texture,
    dispose() {
      renderTarget.dispose();
    },
  };
}

// ================================================================== renderer

export interface RendererOptions {
  readonly canvas?: HTMLCanvasElement;
  readonly antialias?: boolean;
  readonly alpha?: boolean;
  /** Caps `devicePixelRatio` (default 2) — a deliberate perf choice for a page that may render
   *  many exhibits at once; see README.md's performance section. */
  readonly pixelRatioCap?: number;
}

/** A `WebGLRenderer` pre-configured with this project's colour management and tone mapping:
 *  sRGB output, ACES filmic tone mapping. Every page in the exhibition should share this
 *  configuration so a cube looks the same in every room. */
export function createRenderer(options: RendererOptions = {}): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    canvas: options.canvas,
    antialias: options.antialias ?? true,
    alpha: options.alpha ?? false,
    powerPreference: 'high-performance',
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
  renderer.setPixelRatio(Math.min(options.pixelRatioCap ?? 2, devicePixelRatio || 1));
  return renderer;
}

// ================================================================== the rig

export interface SceneRigOptions {
  readonly canvas?: HTMLCanvasElement;
  readonly boundingRadius?: number;
  readonly withEnvironment?: boolean;
  readonly pixelRatioCap?: number;
}

/**
 * Convenience wiring of `createRenderer` + a `Scene` + a `PerspectiveCamera` +
 * `createMuseumLightingRig` + (optionally) `createStudioEnvironment`, with resize and disposal
 * handled. A page adds its own content (e.g. `CubeGeometry.assembleCube(...).group`, or the
 * `index.ts` convenience `buildExhibitCube(spec).group`) to `.root`, never directly to `.scene`,
 * so the rig's own lighting group stays easy to find and remove.
 */
export class SceneRig {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene: THREE.Scene;
  readonly camera: THREE.PerspectiveCamera;
  /** Where a page adds its exhibit content. */
  readonly root: THREE.Group;
  readonly lighting: MuseumLightingRig;

  private environment: StudioEnvironment | undefined;
  private resizeObserver: ResizeObserver | undefined;
  private disposed = false;

  constructor(options: SceneRigOptions = {}) {
    this.renderer = createRenderer({
      ...(options.canvas !== undefined ? { canvas: options.canvas } : {}),
      ...(options.pixelRatioCap !== undefined ? { pixelRatioCap: options.pixelRatioCap } : {}),
    });

    this.scene = new THREE.Scene();
    // A neutral museum-wall dark; a page is free to override scene.background.
    this.scene.background = new THREE.Color(0x111214);

    this.camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100000);

    this.root = new THREE.Group();
    this.root.name = 'exhibit-root';
    this.scene.add(this.root);

    this.lighting = createMuseumLightingRig(options.boundingRadius ?? 100);
    this.scene.add(this.lighting.group);

    if (options.withEnvironment) {
      this.environment = createStudioEnvironment(this.renderer);
      this.scene.environment = this.environment.texture;
    }
  }

  setSize(width: number, height: number): void {
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / Math.max(1, height);
    this.camera.updateProjectionMatrix();
  }

  /** Wires a `ResizeObserver` on `container` to call `setSize` automatically. No-op (and safe)
   *  in environments without `ResizeObserver`. */
  observeResize(container: HTMLElement): void {
    if (typeof ResizeObserver === 'undefined') return;
    this.resizeObserver?.disconnect();
    this.resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) this.setSize(width, height);
    });
    this.resizeObserver.observe(container);
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  /** `matchMedia('(prefers-reduced-motion: reduce)')`, guarded for non-browser environments.
   *  CameraStates.ts's `CameraChoreographer` reads this so a page does not have to re-derive it. */
  get prefersReducedMotion(): boolean {
    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;
  }

  /** Disposes the renderer, the lighting rig and the environment this rig created. Never
   *  disposes exhibit content added to `.root` — that is CubeGeometry.ts's / materials.ts's own
   *  cache lifecycle, since content may be shared across many SceneRigs. */
  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.resizeObserver?.disconnect();
    this.lighting.dispose();
    this.environment?.dispose();
    this.renderer.dispose();
  }
}
