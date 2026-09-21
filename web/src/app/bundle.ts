// Reads the BUILT BUNDLE's manifest. Record loading belongs to src/data/
// (the archive -> exhibition adapter); this module deliberately knows only
// what the bundle claims about itself, so the shell can state its own
// provenance before any record is fetched.

export interface BundleMeta {
  built_at: string;
  generator: string;
  mode: 'publication' | 'research-preview';
  bundle: string;
  public_status_filter: string[];
  counts: { private: Record<string, number>; public: Record<string, number> };
  rendering_conventions: number;
  notes: string[];
}

export const BUNDLE_BASE = '/bundle';

export async function loadMeta(signal?: AbortSignal): Promise<BundleMeta> {
  const res = await fetch(`${BUNDLE_BASE}/meta.json`, signal ? { signal } : {});
  if (!res.ok) {
    throw new Error(
      `The exhibition could not read its bundle (${res.status}). ` +
      'Run `npm run build:preview` in the repository root, then `npm run sync` here.',
    );
  }
  return res.json() as Promise<BundleMeta>;
}

/**
 * Whether the exhibition is showing researched-but-unapproved records.
 * This is not a debug flag. A research preview must say so to the visitor:
 * the records in it are researched, not curator-approved, and presenting them
 * as settled would undo the distinction the build modes exist to keep.
 */
export const isResearchPreview = (m: BundleMeta): boolean => m.mode === 'research-preview';
