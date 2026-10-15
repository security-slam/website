import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { DocPage, meta } from "@/components/doc-page";
import { getDoc } from "@/lib/content";

const doc = getDoc("slam26/index")!;

export const Route = createFileRoute("/slam26")({
  head: () => meta("How it works", doc.data.description),
  component: Slam26,
});

function Slam26() {
  const matches = useMatches();
  if (matches[matches.length - 1]?.routeId !== "/slam26") return <Outlet />;
  return (
    <div className="slam26-page"><DocPage
      title={doc.data.title}
      description={doc.data.description}
      before={
        <div className="video-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${doc.data.youtubeId}`}
            title="Security Slam 2026"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      }
      body={doc.body}
    /></div>
  );
}
