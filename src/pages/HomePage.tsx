import React from "react";
import { Link } from "react-router-dom";
import { TextSection } from "../components/TextSection";
import { SectionCard } from "../components/SectionCard";
import { Carousel } from "../components/Carousel";
import { PartnerLogos } from "../components/PartnerLogos";
import { BadgeNavigation } from "../components/BadgeNavigation";
import { carouselImages } from "../content/carousel";

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
              "This fall, the Slam is open to ANY open source project. You don't need to be a CNCF project, or even cloud native. If you maintain or contribute to open source software, you can participate.",
              "The next Security Slam runs October 5 – November 6, 2026. Registration is open now."
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
          Open to ALL open source projects! Register now to qualify for recognitions.
        </p>
        <Link
          to="/slam26/register"
          style={{
            display: "inline-block",
            padding: "var(--gf-space-md) var(--gf-space-xl)",
            background: "linear-gradient(135deg, var(--gf-color-complement) 0%, #29bfc7 50%, #159aa1 100%)",
            color: "#fff",
            fontWeight: 600,
            textDecoration: "none",
            borderRadius: "var(--gf-radius-lg)",
            boxShadow: "var(--gf-shadow-surface)"
          }}
        >
          Register now
        </Link>
        <p style={{ marginTop: "var(--gf-space-lg)", color: "var(--gf-color-text-subtle)" }}>
          <Link to="/slam26/participating-projects" style={{ color: "var(--gf-color-accent)" }}>
            See the projects taking part this fall
          </Link>
        </p>
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
