/**
 * What a visitor sees when a page cannot load.
 *
 * Every page used to print the raw JavaScript error message, which tells a
 * visitor nothing they can act on and reads like a broken machine rather than a
 * closed room. The museum voice applies here too: say what happened, say
 * whether the record is at fault, and give a way onward.
 *
 * The technical detail is kept, but demoted — a curator debugging a bundle
 * still needs it, and hiding it would be its own kind of dishonesty.
 */
export function Trouble({ detail, children }: { detail: string; children?: React.ReactNode }) {
  return (
    <div className="trouble" role="alert">
      <p className="trouble__lede">
        {children ?? 'This room could not be opened.'}
      </p>
      <p className="trouble__reassure">
        Nothing is wrong with the record itself — this is the exhibition failing
        to read its own bundle. The archive is plain YAML and JSON and can be read
        without a browser.
      </p>
      <p className="trouble__detail"><code>{detail}</code></p>
    </div>
  );
}

/** A record the bundle does not contain. Not an error: a boundary. */
export function NotHere({ what, detail }: { what: string; detail?: string }) {
  return (
    <div className="trouble" role="alert">
      <p className="trouble__lede">{what} is not in this bundle.</p>
      <p className="trouble__reassure">
        That may mean it was never researched, or that it sits outside the
        exhibition&rsquo;s scope and was deliberately withheld from this build.
        The two are different, and this page cannot tell which applies — see
        the maker&rsquo;s own room, which can.
      </p>
      {detail && <p className="trouble__detail"><code>{detail}</code></p>}
    </div>
  );
}
