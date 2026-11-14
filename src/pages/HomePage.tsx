import React from "react";
import { Link } from "react-router-dom";
import { TextSection } from "../components/TextSection";
import { SectionCard } from "../components/SectionCard";
import { Carousel } from "../components/Carousel";
import { PartnerLogos } from "../components/PartnerLogos";
import { BadgeNavigation } from "../components/BadgeNavigation";
import { HubSpotForm } from "../components/HubSpotForm";
import { carouselImages } from "../content/carousel";
import { getSectionItemByPath } from "../content/sections";

// The homepage form is the one on /slam26/register, so its IDs live in one place.
const registration = getSectionItemByPath("slam26", "/slam26/register")?.hubspot;

export const HomePage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%"
      }}
    >
      <div className="home-welcome-row">
        {carouselImages.length > 0 && (
          <div className="home-welcome-carousel">
            <Carousel
              images={carouselImages}
              autoAdvanceMs={5000}
              ariaLabel="Slam photos"
            />
          </div>
        )}
        <div className="home-welcome-text">
          <TextSection
            title="Securing Open Source at the Source"
            titleTag="h1"
            paragraphs={[
              "Run by the CNCF Technical Advisory Group for Security & Compliance, the Slam is a month-long community effort with a library of support resources, advisors on Slack, and plaques and badges for participating projects and contributors.",
              "This winter, the Slam is open to ANY open source project. You don't need to be a CNCF project, or even cloud native. If you maintain or contribute to open source software, you can participate.",
              "The Winter 2027 Security Slam runs February 15 – March 12, 2027. Registration is open now."
            ]}
            centered={false}
            maxWidth="700px"
            lastParagraphMargin="var(--gf-space-xl)"
          />
        </div>
      </div>

      <section
        style={{
          marginBottom: "var(--gf-space-xl)",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "var(--gf-space-md)" }}>Fall 2026 results</h2>
        <p
          style={{
            color: "var(--gf-color-text-subtle)",
            fontSize: "1.1rem",
            marginBottom: "var(--gf-space-lg)",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.7
          }}
        >
          Thirty projects from across the open source ecosystem took part in the Fall 2026 Slam. See which badges each one earned.
        </p>
        <Link
          to="/outcomes/fall-2026"
          style={{
            display: "inline-block",
            padding: "var(--gf-space-md) var(--gf-space-xl)",
            color: "var(--gf-color-accent)",
            fontWeight: 600,
            textDecoration: "none",
            border: "2px solid var(--gf-color-accent)",
            borderRadius: "var(--gf-radius-lg)"
          }}
        >
          Fall 2026 results
        </Link>
      </section>

      <section
        style={{
          marginBottom: "var(--gf-space-xl)",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "var(--gf-space-md)" }}>Registration is now open</h2>
        <p
          style={{
            color: "var(--gf-color-text-subtle)",
            fontSize: "1.1rem",
            marginBottom: "var(--gf-space-lg)",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.7
          }}
        >
          Open to ALL open source projects! Register for the Winter 2027 Slam to qualify for recognitions.
        </p>
        {registration && (
          <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "left" }}>
            <HubSpotForm {...registration} />
          </div>
        )}
      </section>

      <PartnerLogos />

      <section
        style={{
          marginBottom: "var(--gf-space-xl)",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "var(--gf-space-md)" }}>How the Slam works</h2>
        <p
          style={{
            color: "var(--gf-color-text-subtle)",
            fontSize: "1.1rem",
            marginBottom: "var(--gf-space-lg)",
            maxWidth: "700px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.7
          }}
        >
          No teams, no scoring, no prizes: just six shared objectives built around the OpenSSF Open Source Project Security Baseline. Projects that complete an objective earn a badge; projects that complete them all earn a plaque.
        </p>
        <Link
          to="/slam26"
          style={{
            display: "inline-block",
            padding: "var(--gf-space-md) var(--gf-space-xl)",
            color: "var(--gf-color-accent)",
            fontWeight: 600,
            textDecoration: "none",
            border: "2px solid var(--gf-color-accent)",
            borderRadius: "var(--gf-radius-lg)"
          }}
        >
          How it works
        </Link>
      </section>

      <BadgeNavigation />

    </div>
  );
};
