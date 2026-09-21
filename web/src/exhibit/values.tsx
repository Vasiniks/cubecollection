// Rendering one Value<T>.
//
// The one non-negotiable hierarchy rule (EXHIBITION_UX §2.7): confidence is a
// column, not a footnote glyph. UNCERTAIN and UNKNOWN are printed as words at
// the same type size as the value, never smaller and never greyed to the point
// of being skippable. A visitor must not be able to read a page and miss which
// claims are weak.

import { isSourceBacked, isConvention, isUnknown, type Value } from '../data/types.ts';

/** The words shown for each confidence level. Museum voice: precise, unhedged. */
const CONFIDENCE_LABEL: Record<string, string> = {
  confirmed: 'Confirmed',
  probable: 'Probable',
  reported: 'Reported',
  uncertain: 'Uncertain',
  disputed: 'Disputed',
  unknown: 'Unknown',
};

export function formatValue(v: Value<unknown>): string {
  // An unattested value still needs the same formatting as an attested one.
  // Reading it straight through String() printed "[object Object]" for the
  // structured fields — generation, dates — which is how a real record looked
  // on screen until this was fixed.
  const raw = isUnknown(v) ? v.unattestedValue : v.value;
  if (raw === null || raw === undefined) return '—';
  if (Array.isArray(raw)) return raw.join(', ');
  // Grouped, so a run size of 1111 reads as 1,111 rather than as a year.
  if (typeof raw === 'number') return raw.toLocaleString('en');
  if (typeof raw === 'object') {
    const o = raw as Record<string, unknown>;
    // A RawDate renders as its value plus its qualifier, because "before 2022"
    // and "2022" are different claims and must not both print as "2022".
    if ('value' in o) {
      const q = typeof o.qualifier === 'string' && o.qualifier !== 'exact' ? `${o.qualifier} ` : '';
      return `${q}${String(o.value)}`;
    }
    if ('label' in o && o.label !== undefined) return String(o.label);
    // A generation with no label still carries meaning: its ordinal and the
    // basis on which the archive assigned it.
    if ('ordinal' in o || 'basis' in o) {
      const parts = [
        o.ordinal !== undefined ? `generation ${String(o.ordinal)}` : null,
        o.basis !== undefined ? `by ${String(o.basis).replace(/_/g, ' ')}` : null,
      ].filter(Boolean);
      if (parts.length) return parts.join(', ');
    }
    return JSON.stringify(raw);
  }
  return String(raw);
}

/** The basis word, at full size. Never abbreviated to a glyph alone. */
export function BasisBadge({ value }: { value: Value<unknown> }) {
  if (isConvention(value)) {
    return (
      <span className="evidence-badge" data-evidence-kind="convention" title={value.conventionId}>
        <span className="evidence-badge__glyph" aria-hidden="true" />
        Rendering convention
      </span>
    );
  }
  if (isUnknown(value)) {
    return (
      <span className="evidence-badge" data-confidence="unknown">
        <span className="evidence-badge__glyph" aria-hidden="true" />
        {value.searched ? 'Researched, not found' : 'Not researched'}
      </span>
    );
  }
  return (
    <span className="evidence-badge" data-confidence={value.confidence}>
      <span className="evidence-badge__glyph" aria-hidden="true" />
      {CONFIDENCE_LABEL[value.confidence] ?? value.confidence}
    </span>
  );
}

/** One row of a specification table: value, basis, and the archive's own note. */
export function SpecRow({ term, value, from }: {
  term: string;
  value: Value<unknown>;
  from?: 'model' | 'variant';
}) {
  const note = isSourceBacked(value) || isUnknown(value) ? value.note : undefined;
  return (
    <tr className="spec__row" data-basis={value.basis}>
      <th scope="row" className="spec__term">{term}</th>
      <td className="spec__value">{formatValue(value)}</td>
      <td className="spec__basis"><BasisBadge value={value} /></td>
      <td className="spec__from">
        {from === 'model' ? 'inherited from the model' : from === 'variant' ? 'this configuration' : ''}
      </td>
      <td className="spec__note">
        {note}
        {isSourceBacked(value) && value.disputed && value.disputed.length > 0 && (
          <span className="spec__disputed">
            {' '}Sources disagree: {value.disputed.map((d) => formatValue({ basis: 'source-backed', value: d.value, confidence: d.confidence, sourceIds: d.sourceIds })).join(' / ')}.
            {value.adjudication ? ` ${value.adjudication}` : ''}
          </span>
        )}
      </td>
    </tr>
  );
}
