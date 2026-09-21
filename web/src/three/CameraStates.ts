/**
 * CameraStates.ts
 *
 * Named camera states with smooth interpolation between them, as a first-class concept rather
 * than ad-hoc per-page lerping. Every exhibit page chooses among the same four named states —
 * `hero` (landing/gallery framing), `inspect` (closer, for reading surface detail), `exploded`
 * (pulled back to fit a piece-by-piece breakdown), `compare` (wide framing for two or more
 * exhibits side by side, per EXHIBITION_ARCHITECTURE §4.5's variant comparison interface) — so a
 * visitor's sense of "the camera moves like this in this museum" is consistent everywhere.
 *
 * `CameraChoreographer` drives a `THREE.PerspectiveCamera` between states over time, honouring
 * `prefers-reduced-motion` by snapping instead of animating, and allocates nothing per frame:
 * every scratch vector is created once in the constructor and reused in `update()`.
 */

import * as THREE from 'three';

export type CameraStateName = 'hero' | 'inspect' | 'exploded' | 'compare';

export interface CameraState {
  readonly name: CameraStateName;
  readonly position: THREE.Vector3;
  readonly target: THREE.Vector3;
  readonly fov: number;
}

/**
 * The four named states, scaled to `boundingRadius` (the exhibit's approximate bounding-sphere
 * radius, matching `SceneRig.createMuseumLightingRig`'s parameter so both are derived from the
 * same one number for a given exhibit). All states look at the origin; a page whose exhibit is
 * not centred there should move the exhibit, not these targets.
 */
export function createDefaultCameraStates(boundingRadius: number): Record<CameraStateName, CameraState> {
  const r = boundingRadius;
  return {
    // A slightly elevated three-quarter view — the "this is the object" establishing shot.
    hero: {
      name: 'hero',
      position: new THREE.Vector3(r * 2.2, r * 1.6, r * 2.6),
      target: new THREE.Vector3(0, 0, 0),
      fov: 32,
    },
    // Closer and slightly lower, narrower FOV, for reading surface/coating/colour detail.
    inspect: {
      name: 'inspect',
      position: new THREE.Vector3(r * 1.3, r * 0.7, r * 1.6),
      target: new THREE.Vector3(0, 0, 0),
      fov: 26,
    },
    // Pulled well back and slightly wider, to fit an exploded piece-by-piece breakdown without
    // any piece leaving frame.
    exploded: {
      name: 'exploded',
      position: new THREE.Vector3(r * 3.4, r * 2.6, r * 3.8),
      target: new THREE.Vector3(0, 0, 0),
      fov: 40,
    },
    // A more front-on, elevated framing suited to laying exhibits out side by side. Use
    // `compareCameraState` instead when the exact count of exhibits being compared is known.
    compare: {
      name: 'compare',
      position: new THREE.Vector3(0, r * 1.6, r * 4.4),
      target: new THREE.Vector3(0, 0, 0),
      fov: 40,
    },
  };
}

/**
 * A `compare` state that widens with the number of exhibits being laid out side by side, for
 * EXHIBITION_ARCHITECTURE §4.5's configuration-comparison interface (offered only for the 112
 * models with more than one recorded configuration; richest is `lefun-3x3-standard` at 14).
 * Distance and FOV both grow with `exhibitCount` so additional exhibits stay framed rather than
 * requiring the caller to lay them out more tightly.
 */
export function compareCameraState(boundingRadius: number, exhibitCount: number): CameraState {
  const count = Math.max(1, exhibitCount);
  const distance = boundingRadius * (2.6 + count * 0.9);
  const fov = Math.min(55, 30 + count * 4);
  return {
    name: 'compare',
    position: new THREE.Vector3(0, boundingRadius * 1.2, distance),
    target: new THREE.Vector3(0, 0, 0),
    fov,
  };
}

export type Easing = (t: number) => number;

export const easeInOutCubic: Easing = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export interface CameraChoreographerOptions {
  readonly camera: THREE.PerspectiveCamera;
  /** Defaults to a `matchMedia('(prefers-reduced-motion: reduce)')` check, guarded for
   *  non-browser environments. Pass `() => sceneRig.prefersReducedMotion` to share one check
   *  with a `SceneRig`. */
  readonly reducedMotion?: () => boolean;
  readonly easing?: Easing;
}

interface CameraSnapshot {
  readonly position: THREE.Vector3;
  readonly target: THREE.Vector3;
  fov: number;
}

/**
 * Drives a camera between named `CameraState`s with time-based, allocation-free interpolation.
 * Every vector used during `update()` (`from`, `to`, two scratch vectors, the tracked current
 * look-at target) is created once, in the constructor, and mutated in place thereafter — no
 * per-frame `new THREE.Vector3()`.
 */
export class CameraChoreographer {
  private readonly camera: THREE.PerspectiveCamera;
  private readonly easing: Easing;
  private readonly reducedMotion: () => boolean;

  private readonly from: CameraSnapshot = { position: new THREE.Vector3(), target: new THREE.Vector3(), fov: 35 };
  private readonly to: CameraSnapshot = { position: new THREE.Vector3(), target: new THREE.Vector3(), fov: 35 };
  private readonly scratchPosition = new THREE.Vector3();
  private readonly scratchTarget = new THREE.Vector3();
  /** The look-at point the camera is currently aimed at. Tracked separately because
   *  `THREE.Camera` has no getter for "what am I looking at", only `.lookAt()` to set it. */
  private readonly currentTarget = new THREE.Vector3();

  private elapsed = 0;
  private duration = 0;
  private active = false;
  private current: CameraStateName | null = null;

  constructor(options: CameraChoreographerOptions) {
    this.camera = options.camera;
    this.easing = options.easing ?? easeInOutCubic;
    this.reducedMotion = options.reducedMotion ?? (() => false);
  }

  /** Places the camera at a state immediately, with no animation. Use for first mount. */
  snapTo(state: CameraState): void {
    this.camera.position.copy(state.position);
    this.currentTarget.copy(state.target);
    this.camera.fov = state.fov;
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(this.currentTarget);
    this.current = state.name;
    this.active = false;
  }

  /**
   * Begins an interpolated transition to `state` over `durationSeconds`. Snaps instantly instead
   * when `reducedMotion()` is true or `durationSeconds` is non-positive — this is the only place
   * `prefers-reduced-motion` needs to be checked; callers never branch on it themselves.
   */
  transitionTo(state: CameraState, durationSeconds = 1.1): void {
    if (this.reducedMotion() || durationSeconds <= 0) {
      this.snapTo(state);
      return;
    }
    this.from.position.copy(this.camera.position);
    this.from.target.copy(this.currentTarget);
    this.from.fov = this.camera.fov;
    this.to.position.copy(state.position);
    this.to.target.copy(state.target);
    this.to.fov = state.fov;
    this.elapsed = 0;
    this.duration = durationSeconds;
    this.active = true;
    this.current = state.name;
  }

  /**
   * Advances the current transition by `deltaSeconds` (the frame delta, in seconds — e.g. from a
   * `THREE.Clock`). A no-op when no transition is active. Call once per rendered frame.
   */
  update(deltaSeconds: number): void {
    if (!this.active) return;
    this.elapsed += deltaSeconds;
    const t = this.duration <= 0 ? 1 : Math.min(1, this.elapsed / this.duration);
    const eased = this.easing(t);

    this.scratchPosition.lerpVectors(this.from.position, this.to.position, eased);
    this.scratchTarget.lerpVectors(this.from.target, this.to.target, eased);
    this.camera.position.copy(this.scratchPosition);
    this.currentTarget.copy(this.scratchTarget);
    this.camera.fov = THREE.MathUtils.lerp(this.from.fov, this.to.fov, eased);
    this.camera.updateProjectionMatrix();
    this.camera.lookAt(this.currentTarget);

    if (t >= 1) this.active = false;
  }

  get currentStateName(): CameraStateName | null {
    return this.current;
  }

  get isTransitioning(): boolean {
    return this.active;
  }
}
