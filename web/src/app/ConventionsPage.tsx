import { useEffect, useState } from 'react';
import { loadConventions, type RenderingConvention } from './conventions';
import { href, navigate } from './router';
import './conventions.css';

function Field({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <dl className="convention__field">
      <dt>{term}</dt>
      <dd>{children}</dd>
    </dl>
  );
}

function Convention({ c }: { c: RenderingConvention }) {
  return (
    <article className="convention" aria-labelledby={`${c.id}-name`}>
      <header className="convention__identity">
        <h2 className="convention__name" id={`${c.id}-name`}>{c.label}</h2>
        <code className="convention__id">{c.id}</code>
        <p className="convention__reach">
          {c.applies_to.affected_records.toLocaleString('en')}
          <small>
            {c.applies_to.entity === 'variant' ? 'variants' : 'models'} drawn this way
            <span className="convention__measured">measured {c.applies_to.measured_on}</span>
          </small>
        </p>
      </header>

      <div className="convention__body">
        <span className="evidence-badge" data-evidence-kind="convention">
          <span className="evidence-badge__glyph" aria-hidden="true" />
          Rendering convention
        </span>

        <p className="convention__disclosure">{c.visitor_disclosure}</p>

        <Field term="Asserts nothing about">{c.asserts_nothing_about}</Field>
        <Field term="Why this default">{c.rationale}</Field>
        {c.convention_basis && (
          <Field term="What makes the choice defensible">{c.convention_basis}</Field>
        )}
        <Field term="If this convention were withdrawn">{c.if_removed}</Field>
        <Field term="Applies only when the archive is silent">
          <code className="convention__pointers">{c.applies_to.when_absent.join('  ·  ')}</code>
        </Field>
      </div>
    </article>
  );
}

export function ConventionsPage() {
  const [items, setItems] = useState<RenderingConvention[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ac = new AbortController();
    loadConventions(ac.signal)
      .then(setItems)
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        setError(e instanceof Error ? e.message : String(e));
      });
    return () => ac.abort();
  }, []);

  if (error) return <main className="conventions"><p>{error}</p></main>;
  if (!items) return <main className="conventions"><p>Reading the registry…</p></main>;

  return (
    <main className="conventions" data-testid="conventions">
      <nav className="conventions__return" aria-label="Return">
        <a
          href={href({ name: 'home' })}
          onClick={(e) => { e.preventDefault(); navigate(href({ name: 'home' })); }}
        >
          Back to the archive
        </a>
      </nav>

      <p className="conventions__eyebrow">How this exhibition draws what it cannot cite</p>

      <h1 className="conventions__claim">Every cube here is drawn, not photographed.</h1>

      <p className="conventions__standfirst">
        The archive records what its sources establish. It does not record what
        these cubes looked like — no face colour and no logo placement is
        documented for any of them. So the exhibition draws them, and each
        visual default it chose is written down below, with the number of
        records it stands in for and the claim it is careful not to make.
      </p>

      <p className="conventions__eyebrow">
        {items.length} convention{items.length === 1 ? '' : 's'} in force
      </p>

      {items.map((c) => <Convention key={c.id} c={c} />)}
    </main>
  );
}
