import { createFileRoute } from "@tanstack/react-router";
import { DocPage, meta } from "@/components/doc-page";
import { ProjectTable } from "@/components/project-table";
import { getDoc } from "@/lib/content";

const doc = getDoc("outcomes/spring-2026")!;

export const Route = createFileRoute("/outcomes/spring-2026")({
  head: () => meta(doc.data.title, doc.data.description),
  component: () => (
    <DocPage title={doc.data.title} description={doc.data.description} body={doc.body}
      after={<ProjectTable projects={doc.data.projects ?? []} badges={doc.data.badges ?? []} />} />
  ),
});
