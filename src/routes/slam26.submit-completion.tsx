import { createFileRoute } from "@tanstack/react-router";
import { DocPage, meta } from "@/components/doc-page";
import { HubSpotForm } from "@/components/hubspot-form";

const title = "Submit Badge Completion";
const description =
  "This form is for project maintainers to report completion of Slam26 badges. This may be submitted multiple times to request personal badges for each contributor to the badge. The form should ONLY be submitted by maintainers; other results will be automatically ignored. Organizers will reach out to maintainers via email to confirm the submissions.";
const config = { portalId: "243073831", formId: "5523a8f7-f60e-4ac9-8aed-225b6ebfd304", region: "na2" };

export const Route = createFileRoute("/slam26/submit-completion")({
  head: () => meta(title, "Project maintainers report completion of Security Slam 2026 badges."),
  component: () => <DocPage title={title} description={description} after={<HubSpotForm config={config} />} />,
});
