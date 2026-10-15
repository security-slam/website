import { createFileRoute } from "@tanstack/react-router";
import { DocPage, meta } from "@/components/doc-page";
import { ProjectTable } from "@/components/project-table";
import { getDoc } from "@/lib/content";

const doc = getDoc("slam26/participating-projects")!;

export const Route = createFileRoute("/slam26/participating-projects")({
  head: () => meta(doc.data.title, doc.data.description),
  component: () => (
    <DocPage title={doc.data.title} description={doc.data.description} body={doc.body}
      after={doc.data.projects?.length ? <ProjectTable projects={doc.data.projects} badges={doc.data.badges} /> : null} />
  ),
});
