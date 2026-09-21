// Rendering one Value<T>.
//
// The one non-negotiable hierarchy rule (EXHIBITION_UX §2.7): confidence is a
// column, not a footnote glyph. UNCERTAIN and UNKNOWN are printed as words at
// the same type size as the value, never smaller and never greyed to the point
// of being skippable. A visitor must not be able to read a page and miss which
// claims are weak.

import { useId, useState } from 'react';
import { isSourceBacked, isConvention, isUnknown, type Value, type EvidenceRef } from '../data/types.ts';
import { Cite } from './Cite.tsx';

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

/**
 * A specification table.
 *
 * `showFrom` controls the inheritance column. Only a variant's resolved specs can
 * be inherited from a model, so on a maker or model page that column is empty on
 * every row — a header over nothing, which reads as missing data rather than as
 * an inapplicable question.
 */
export function SpecTable({ caption, showFrom = false, children }: {
  caption: string;
  showFrom?: boolean;
  children: React.ReactNode;
}) {
  return (
    <table className="spec" data-show-from={showFrom ? 'true' : 'false'}>
      <caption className="spec__caption">{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Field</th>
          <th scope="col">Value</th>
          <th scope="col">Basis</th>
          {showFrom && <th scope="col">Source of the value</th>}
          <th scope="col">Note</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

/** One row of a specification table: value, basis, and the archive's own note.
 *
 *  When `sources` is supplied, the basis becomes a control that opens THIS
 *  claim's evidence beneath it. Evidence listed only at the foot of a page makes
 *  a visitor match a claim to a citation by eye; the point of this archive is
 *  that the two are attached. */
export function SpecRow({ term, value, from, showFrom = false, sources }: {
  term: string;
  value: Value<unknown>;
  from?: 'model' | 'variant';
  showFrom?: boolean;
  sources?: Map<string, EvidenceRef>;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const note = isSourceBacked(value) || isUnknown(value) ? value.note : undefined;
  // Deduplicated: a source cited both on the claim and inside its dispute is one
  // source, and listing it twice would overstate how much evidence there is —
  // which is the opposite of what this panel exists to do.
  const cited = isSourceBacked(value) ? [...new Set(value.sourceIds)] : [];
  const refs = sources ? cited.map((id) => sources.get(id)).filter((r): r is EvidenceRef => Boolean(r)) : [];
  const columns = showFrom ? 5 : 4;

  return (
    <>
    <tr className="spec__row" data-basis={value.basis}>
      <th scope="row" className="spec__term">{term}</th>
      <td className="spec__value">{formatValue(value)}</td>
      <td className="spec__basis">
        {refs.length > 0 ? (
          <button
            type="button"
            className="spec__basis-button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
          >
            <BasisBadge value={value} />
            <span className="spec__basis-hint">
              {open ? 'hide' : `${refs.length} source${refs.length === 1 ? '' : 's'}`}
            </span>
          </button>
        ) : <BasisBadge value={value} />}
      </td>
      {showFrom && (
        <td className="spec__from">
          {from === 'model' ? 'inherited from the model' : from === 'variant' ? 'this configuration' : ''}
        </td>
      )}
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
    {open && refs.length > 0 && (
      <tr className="spec__evidence-row" id={panelId}>
        <td colSpan={columns}>
          <ol className="claim-evidence">
            {refs.map((e) => (
              <li key={e.sourceId}>
                <p className="claim-evidence__title">
                  {e.url ? <Cite url={e.url}>{e.title}</Cite> : e.title}
                </p>
                <p className="claim-evidence__meta">
                  Tier {e.tier} · {e.kind.replace(/_/g, ' ')}
                  {e.publisher ? ` · ${e.publisher}` : ''}
                  {e.accessed ? ` · accessed ${e.accessed}` : ''}
                  {e.missing ? ' · cited but not present in this bundle' : ''}
                </p>
                {e.excerpt && <blockquote className="claim-evidence__excerpt">{e.excerpt}</blockquote>}
              </li>
            ))}
          </ol>
        </td>
      </tr>
    )}
    </>
  );
}
