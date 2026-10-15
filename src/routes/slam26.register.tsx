import { createFileRoute } from "@tanstack/react-router";
import { DocPage, meta } from "@/components/doc-page";
import { HubSpotForm, type HubSpotConfig } from "@/components/hubspot-form";
import { getDoc } from "@/lib/content";

const doc = getDoc("slam26/register");
if (!doc) throw new Error("Registration content is missing");
const hs = doc.data.hubspot as HubSpotConfig;

export const Route = createFileRoute("/slam26/register")({
  head: () => meta(doc.data.title, doc.data.description),
  component: RegisterPage,
});

function RegisterPage() {
  if (!doc) return <DocPage title="Registration unavailable" />;
  return <DocPage title={doc.data.title} description={doc.data.description} body={doc.body} after={<HubSpotForm config={hs} />} />;
}
