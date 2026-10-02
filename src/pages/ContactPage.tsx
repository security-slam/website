import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { siteConfig } from "../config/site";
import { HubSpotForm } from "../components/HubSpotForm";

export const ContactPage: React.FC = () => {
  const location = useLocation();
  const contact = siteConfig.contactPages.find((c) => c.path === location.pathname);

  if (!contact) {
    return <Navigate to="/" replace />;
  }

  const targetId = `hubspot-form-${contact.path.replace(/\//g, "-").replace(/^-/, "") || "contact"}`;

  return (
    <div
      className="content-article"
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        width: "100%"
      }}
    >
      <section
        id="header"
        style={{
          marginBottom: "var(--gf-space-xl)",
          textAlign: "center"
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: "var(--gf-space-md)",
            color: "var(--gf-color-accent)",
            lineHeight: 1.2
          }}
        >
          {contact.title}
        </h1>
        {contact.description && (
          <p
            style={{
              color: "var(--gf-color-text-subtle)",
              fontSize: "1.25rem",
              lineHeight: 1.7,
              maxWidth: "800px",
              margin: "0 auto"
            }}
          >
            {contact.description}
          </p>
        )}
      </section>

      {contact.formDisabled ? (
        <section
          id="form-disabled-notice"
          style={{
            padding: "var(--gf-space-xl)",
            backgroundColor: "var(--gf-color-surface)",
            borderRadius: "var(--gf-radius-xl)",
            boxShadow: "var(--gf-shadow-surface)",
            backdropFilter: "var(--gf-glass-blur)",
            WebkitBackdropFilter: "var(--gf-glass-blur)",
            border: "1px solid var(--gf-color-border-strong)",
            textAlign: "center"
          }}
        >
          <p
            style={{
              color: "var(--gf-color-accent)",
              fontSize: "1.25rem",
              fontWeight: 600,
              margin: 0
            }}
          >
            {contact.formDisabledMessage ?? "This form is currently closed."}
          </p>
        </section>
      ) : contact.hubspot ? (
        <section
          id="contact-form"
          style={{
            padding: "var(--gf-space-xl)",
            backgroundColor: "var(--gf-color-surface)",
            borderRadius: "var(--gf-radius-xl)",
            boxShadow: "var(--gf-shadow-surface)",
            backdropFilter: "var(--gf-glass-blur)",
            WebkitBackdropFilter: "var(--gf-glass-blur)",
            border: "1px solid var(--gf-color-border-strong)"
          }}
        >
          <HubSpotForm
            portalId={contact.hubspot.portalId}
            formId={contact.hubspot.formId}
            region={contact.hubspot.region}
            targetId={targetId}
          />
        </section>
      ) : (
        <section
          style={{
            padding: "var(--gf-space-xl)",
            backgroundColor: "var(--gf-color-surface)",
            borderRadius: "var(--gf-radius-xl)",
            border: "1px solid var(--gf-color-border-strong)",
            textAlign: "center",
            color: "var(--gf-color-text-subtle)"
          }}
        >
          <p>
            No form configured. Add <code>hubspot</code> with portalId, formId,
            and region to this contact page in <code>src/config/site.ts</code>.
          </p>
        </section>
      )}
    </div>
  );
};
