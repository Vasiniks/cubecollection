/**
 * A link out to a source.
 *
 * Every citation in the exhibition leaves the site, and a link that silently
 * opens a new tab is a small trap for anyone not watching the viewport. The
 * destination is announced rather than implied.
 */
export function Cite({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <a href={url} target="_blank" rel="noreferrer noopener">
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
