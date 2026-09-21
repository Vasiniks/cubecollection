import type { RawAttestation, RawAttestations } from '../data/adapter.ts';
import type { Confidence } from '../data/types.ts';

/**
 * The single claim the landing page leads with.
 *
 * Chosen from the record, never written for it: the archive's own note at the
 * best-attested pointer that has one. The exhibition adds no sentence of its
 * own here, because a landing page that paraphrases its evidence is exactly the
 * kind of page this archive exists to not be.
 */
export interface LeadClaim {
  pointer: string;
  note: string;
  confidence: Confidence;
  sourceIds: string[];
}

const RANK: Record<string, number> = {
  confirmed: 0, probable: 1, reported: 2, disputed: 3, uncertain: 4, unknown: 5,
};

export function leadClaim(attestations: RawAttestations | undefined): LeadClaim | null {
  const candidates = Object.entries(attestations ?? {})
    .filter((e): e is [string, RawAttestation & { note: string }] =>
      typeof e[1]?.note === 'string' && e[1].note.length > 0)
    // A note that merely records a negative search is not a lead claim; it is a
    // finding, and it belongs on the record page rather than the front door.
    .filter(([, a]) => a.confidence !== 'unknown');

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => {
    const r = (RANK[a[1].confidence ?? 'uncertain'] ?? 9) - (RANK[b[1].confidence ?? 'uncertain'] ?? 9);
    // Then the longest note, which in this archive is reliably the most
    // substantive one rather than a one-line cross-reference.
    return r || b[1].note.length - a[1].note.length;
  });

  const [pointer, att] = candidates[0]!;
  return {
    pointer,
    note: att.note,
    confidence: att.confidence ?? 'uncertain',
    sourceIds: [...(att.sources ?? []), ...(att.disputed ?? []).flatMap((d) => d.sources ?? [])],
  };
}
