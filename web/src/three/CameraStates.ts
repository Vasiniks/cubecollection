/**
 * CameraStates.ts — SKELETON. Signatures and types are final; bodies are being implemented in a
 * follow-up commit (see the lane's "commit a skeleton first" instruction).
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
 * same one number for a given exhibit).
 */
export function createDefaultCameraStates(boundingRadius: number): Record<CameraStateName, CameraState> {
  throw new Error('CameraStates.createDefaultCameraStates: not yet implemented (skeleton commit)');
}

/**
 * A `compare` state that widens with the number of exhibits being compared, for
 * EXHIBITION_ARCHITECTURE §4.5's configuration-comparison interface (offered only for the 112
 * models with more than one recorded configuration).
 */
export function compareCameraState(boundingRadius: number, exhibitCount: number): CameraState {
  throw new Error('CameraStates.compareCameraState: not yet implemented (skeleton commit)');
}

export type Easing = (t: number) => number;

export const easeInOutCubic: Easing = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export interface CameraChoreographerOptions {
  readonly camera: THREE.PerspectiveCamera;
  /** Defaults to a `matchMedia('(prefers-reduced-motion: reduce)')` check, guarded for
   *  non-browser environments. Pass `() => sceneRig.prefersReducedMotion` to share one check
   *  with a `SceneRig`. */
  readonly reducedMotion?: () => boolean;
  readonly easing?: Easing;
}

/** Drives a camera between named `CameraState`s with time-based, allocation-free interpolation. */
export class CameraChoreographer {
  constructor(_options: CameraChoreographerOptions) {
    throw new Error('CameraChoreographer.constructor: not yet implemented (skeleton commit)');
  }

  /** Places the camera at a state immediately, no animation. Use for first mount. */
  snapTo(_state: CameraState): void {
    throw new Error('CameraChoreographer.snapTo: not yet implemented (skeleton commit)');
  }

  /** Begins an interpolated transition; snaps instantly under reduced motion or a
   *  non-positive duration. */
  transitionTo(_state: CameraState, _durationSeconds?: number): void {
    throw new Error('CameraChoreographer.transitionTo: not yet implemented (skeleton commit)');
  }

  /** Advances the current transition. Call once per rendered frame with the frame delta, in
   *  seconds. A no-op when no transition is active. */
  update(_deltaSeconds: number): void {
    throw new Error('CameraChoreographer.update: not yet implemented (skeleton commit)');
  }

  get currentStateName(): CameraStateName | null {
    throw new Error('CameraChoreographer.currentStateName: not yet implemented (skeleton commit)');
  }

  get isTransitioning(): boolean {
    throw new Error('CameraChoreographer.isTransitioning: not yet implemented (skeleton commit)');
  }
}
