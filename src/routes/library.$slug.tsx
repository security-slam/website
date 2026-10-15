import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { DocPage, meta } from "@/components/doc-page";
import { getArticle } from "@/lib/content";
import { BadgeNavigation } from "@/components/badge-navigation";

export const Route = createFileRoute("/library/$slug")({
  loader: ({ params }) => {
    const a = getArticle(params.slug);
    if (!a) throw notFound();
    return { slug: a.slug };
  },
  head: ({ params }) => {
    const a = getArticle(params.slug);
    return meta(a?.data.title ?? "Slam Library", a?.data.description ?? "Security Slam library resource");
  },
  component: ArticlePage,
  notFoundComponent: () => <DocPage title="Not found" after={<Link to="/library">Back to the Slam Library</Link>} />,
});

function ArticlePage() {
  const { slug } = Route.useLoaderData();
  const a = getArticle(slug);
  if (!a) return <DocPage title="Not found" after={<Link to="/library">Back to the Slam Library</Link>} />;
  const isBadge = Boolean(a.data.badge);
  const video = a.data.videoUrl as string | undefined;
  return (
    <DocPage
      title={a.data.title}
      description={a.data.description}
      icon={isBadge ? `/badge-icons/${a.slug}.png` : undefined}
      sidebar={isBadge ? <BadgeNavigation currentSlug={a.slug} /> : undefined}
      before={
        <>
          {a.data.image ? <img className="doc-image" src={a.data.image} alt="" /> : null}
          {video ? <div className="video-frame"><iframe src={video.replace("watch?v=", "embed/")} title={a.data.title} allowFullScreen /></div> : null}
        </>
      }
      body={a.body}
      after={
        isBadge ? (
          <section className="badge-submit" aria-labelledby="badge-submit-title">
            <h2 id="badge-submit-title">Completed This Badge?</h2>
            <p>If you're a project maintainer and you've completed this badge, submit your completion for evaluation.</p>
            <a className="badge-submit-button" href="/slam26/submit-completion" target="_blank" rel="noopener noreferrer">
              Submit Badge Completion <span className="sr-only">(opens in a new tab)</span>
            </a>
          </section>
        ) : undefined
      }
    />
  );
}
