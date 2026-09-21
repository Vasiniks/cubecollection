// CubeCollection — bundle loader.
//
// SKELETON. See README.md "Lazy loading (load.ts)" for the chunking strategy this fills in.
//
// Loads a built bundle (dist/preview or dist/public — this module doesn't care which; it takes
// a base URL) with lazy, memoised, per-entity-file access, so a page that only needs one
// manufacturer's models does not pull all 269 models or all 511 variants into memory.
//
// This module does I/O (fetch) and therefore is NOT imported by adapter.ts or by adapter.test.ts
// — the adapter stays pure and this stays the only place that touches the network/filesystem.

import type {
  RawManufacturer, RawFamily, RawModel, RawVariant, RawSource,
} from './adapter.ts';

export interface BundleMeta {
  built_at: string;
  mode: string;
  bundle: string;
  public_status_filter: string[];
  counts: { public: Record<string, number>; private?: Record<string, number> };
  notes: string[];
}

export type EntityFile = 'manufacturer' | 'family' | 'model' | 'variant' | 'source' | 'person' | 'event';
export type IndexFile = 'by-manufacturer' | 'by-family' | 'by-model' | 'chronology';

/**
 * A bundle to read from. `baseUrl` points at a served `dist/preview/` or `dist/public/`
 * directory (e.g. '/preview' in dev, a CDN path in production). `fetchImpl` is injectable for
 * tests/SSR; defaults to the global `fetch`.
 */
export interface Bundle {
  baseUrl: string;
  fetchImpl?: typeof fetch;
}

export function createBundle(baseUrl: string, fetchImpl?: typeof fetch): Bundle {
  throw new Error('not implemented');
}

export async function loadMeta(bundle: Bundle): Promise<BundleMeta> {
  throw new Error('not implemented');
}

export async function loadIndex(bundle: Bundle, name: IndexFile): Promise<unknown> {
  throw new Error('not implemented');
}

export async function loadManufacturers(bundle: Bundle): Promise<RawManufacturer[]> {
  throw new Error('not implemented');
}

export async function loadFamilies(bundle: Bundle): Promise<RawFamily[]> {
  throw new Error('not implemented');
}

export async function loadModels(bundle: Bundle): Promise<RawModel[]> {
  throw new Error('not implemented');
}

export async function loadVariants(bundle: Bundle): Promise<RawVariant[]> {
  throw new Error('not implemented');
}

export async function loadSources(bundle: Bundle): Promise<RawSource[]> {
  throw new Error('not implemented');
}

// ---------------------------------------------------------------------------------------------
// Narrow accessors — combine an index file with a memoised entity-file fetch.
// ---------------------------------------------------------------------------------------------

export async function getManufacturer(bundle: Bundle, id: string): Promise<RawManufacturer | undefined> {
  throw new Error('not implemented');
}

export async function getModelsForManufacturer(bundle: Bundle, manufacturerId: string): Promise<RawModel[]> {
  throw new Error('not implemented');
}

export async function getVariantsForModel(bundle: Bundle, modelId: string): Promise<RawVariant[]> {
  throw new Error('not implemented');
}

export async function getModel(bundle: Bundle, id: string): Promise<RawModel | undefined> {
  throw new Error('not implemented');
}

export async function getSourcesByIds(bundle: Bundle, ids: Iterable<string>): Promise<Map<string, RawSource>> {
  throw new Error('not implemented');
}

/** Clears every memoised fetch for a bundle. Test-only escape hatch; the app never needs it. */
export function _clearCache(bundle: Bundle): void {
  throw new Error('not implemented');
}
