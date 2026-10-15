import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { DocPage, meta } from "@/components/doc-page";
import { getDoc } from "@/lib/content";

const doc = getDoc("outcomes/index")!;

export const Route = createFileRoute("/outcomes")({
  head: () => meta(doc.data.title, doc.data.description),
  component: Page,
});

function Page() {
  const matches = useMatches();
  if (matches[matches.length - 1]?.routeId !== "/outcomes") return <Outlet />;
  return <DocPage title={doc.data.title} description={doc.data.description} body={doc.body} />;
}
