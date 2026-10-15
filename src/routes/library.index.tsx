import { createFileRoute, Link } from "@tanstack/react-router";
import { DocPage, meta } from "@/components/doc-page";
import { getDoc, libraryArticles } from "@/lib/content";

const doc = getDoc("library/index")!;

export const Route = createFileRoute("/library/")({
  head: () => meta(doc.data.title, doc.data.description),
  component: LibraryPage,
});

function LibraryPage() {
  const badgeDocs = libraryArticles.filter((a) => a.data.badge);
  const others = libraryArticles.filter((a) => !a.data.badge);
  return (
    <DocPage
      title={doc.data.title}
      description={doc.data.description}
      body={doc.body}
      after={
        <>
          <h2 className="doc-section-title">Badges</h2>
          <div className="badges-row">
            {badgeDocs.map((a) => (
              <Link key={a.slug} to="/library/$slug" params={{ slug: a.slug }} className="badge-card compact">
                <img src={`/badge-icons/${a.slug}.png`} alt={a.data.title} />
                <span className="badge-name">{a.data.badge}</span>
              </Link>
            ))}
          </div>
          <h2 className="doc-section-title">Resources</h2>
          <div className="article-grid">
            {others.map((a) => (
              <Link key={a.slug} to="/library/$slug" params={{ slug: a.slug }} className="article-card">
                <strong>{a.data.title}</strong>
                {a.data.description ? <span>{a.data.description}</span> : null}
              </Link>
            ))}
          </div>
        </>
      }
    />
  );
}
