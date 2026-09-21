// CubeCollection — bundle loader.
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

// ---------------------------------------------------------------------------------------------
// Memoisation. Keyed by bundle base URL and file name, so two Bundle objects over the same URL
// share one in-flight request. The PROMISE is cached, not the result: concurrent callers during
// the first fetch get the same request rather than racing several.
// ---------------------------------------------------------------------------------------------

const cache = new Map<string, Promise<unknown>>();

const key = (bundle: Bundle, file: string) => `${bundle.baseUrl}::${file}`;

function fetchJson<T>(bundle: Bundle, file: string): Promise<T> {
  const k = key(bundle, file);
  const hit = cache.get(k);
  if (hit) return hit as Promise<T>;
  const doFetch = bundle.fetchImpl ?? globalThis.fetch;
  const p = doFetch(`${bundle.baseUrl}/${file}`).then((res) => {
    if (!res.ok) {
      // Evict, so a transient failure does not poison every later read.
      cache.delete(k);
      throw new Error(`bundle: ${file} could not be read (${res.status}).`);
    }
    return res.json() as Promise<T>;
  }).catch((e: unknown) => {
    cache.delete(k);
    throw e;
  });
  cache.set(k, p);
  return p as Promise<T>;
}

export function createBundle(baseUrl: string, fetchImpl?: typeof fetch): Bundle {
  // Trailing slash stripped so the cache key for one bundle is stable whether a
  // caller passed '/bundle' or '/bundle/'.
  const base = baseUrl.replace(/\/+$/, '');
  return fetchImpl ? { baseUrl: base, fetchImpl } : { baseUrl: base };
}

export async function loadMeta(bundle: Bundle): Promise<BundleMeta> {
  return fetchJson<BundleMeta>(bundle, 'meta.json');
}

export async function loadIndex(bundle: Bundle, name: IndexFile): Promise<unknown> {
  return fetchJson<unknown>(bundle, `index/${name}.json`);
}

export async function loadManufacturers(bundle: Bundle): Promise<RawManufacturer[]> {
  return fetchJson<RawManufacturer[]>(bundle, 'manufacturer.json');
}

export async function loadFamilies(bundle: Bundle): Promise<RawFamily[]> {
  return fetchJson<RawFamily[]>(bundle, 'family.json');
}

export async function loadModels(bundle: Bundle): Promise<RawModel[]> {
  return fetchJson<RawModel[]>(bundle, 'model.json');
}

export async function loadVariants(bundle: Bundle): Promise<RawVariant[]> {
  return fetchJson<RawVariant[]>(bundle, 'variant.json');
}

export async function loadSources(bundle: Bundle): Promise<RawSource[]> {
  return fetchJson<RawSource[]>(bundle, 'source.json');
}

// ---------------------------------------------------------------------------------------------
// Narrow accessors
// ---------------------------------------------------------------------------------------------

export async function getManufacturer(bundle: Bundle, id: string): Promise<RawManufacturer | undefined> {
  return (await loadManufacturers(bundle)).find((m) => m.id === id);
}

export async function getModelsForManufacturer(bundle: Bundle, manufacturerId: string): Promise<RawModel[]> {
  return (await loadModels(bundle)).filter((m) => m.manufacturer_id === manufacturerId);
}

export async function getVariantsForModel(bundle: Bundle, modelId: string): Promise<RawVariant[]> {
  return (await loadVariants(bundle)).filter((v) => v.model_id === modelId);
}

export async function getModel(bundle: Bundle, id: string): Promise<RawModel | undefined> {
  return (await loadModels(bundle)).find((m) => m.id === id);
}

export async function getSourcesByIds(bundle: Bundle, ids: Iterable<string>): Promise<Map<string, RawSource>> {
  const want = new Set(ids);
  const out = new Map<string, RawSource>();
  if (want.size === 0) return out;
  for (const s of await loadSources(bundle)) {
    if (want.has(s.id)) out.set(s.id, s);
  }
  return out;
}

/** Clears every memoised fetch for a bundle. Test-only escape hatch; the app never needs it. */
export function _clearCache(bundle: Bundle): void {
  const prefix = `${bundle.baseUrl}::`;
  for (const k of [...cache.keys()]) if (k.startsWith(prefix)) cache.delete(k);
}
