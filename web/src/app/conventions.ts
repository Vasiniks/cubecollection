// The rendering-convention registry, as published in the bundle.
//
// Shape mirrors schema/rendering-convention.schema.json. There is deliberately
// no sources / attestations / confidence field: a convention has nowhere to
// claim evidence, and that absence is load-bearing, not an omission.

import { BUNDLE_BASE } from './bundle';

export interface RenderingConvention {
  id: string;
  label: string;
  layer: 'rendering-convention';
  applies_to: {
    entity: 'variant' | 'model';
    when_absent: string[];
    affected_records: number;
    measured_on: string;
  };
  value: unknown;
  rationale: string;
  convention_basis?: string;
  asserts_nothing_about: string;
  visitor_disclosure: string;
  if_removed: string;
  introduced: string;
  supersedes?: string;
  note?: string;
}

export async function loadConventions(signal?: AbortSignal): Promise<RenderingConvention[]> {
  const res = await fetch(`${BUNDLE_BASE}/convention.json`, signal ? { signal } : {});
  if (!res.ok) throw new Error(`Could not read the convention registry (${res.status}).`);
  return res.json() as Promise<RenderingConvention[]>;
}
