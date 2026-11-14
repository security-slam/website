import React from "react";
import { Link } from "react-router-dom";
import { TextSection } from "../components/TextSection";
import { Carousel } from "../components/Carousel";
import { PartnerLogos } from "../components/PartnerLogos";
import { carouselImages } from "../content/carousel";
import { getSectionListItems } from "../content/sections";

const SEASONS = ["winter", "spring", "summer", "fall"];

/** Archive files are named <season>-<year>; newest Slam sorts first. */
export function slamOrder(slug: string): number {
  const [season, year] = slug.split("-");
  return Number(year) * 10 + SEASONS.indexOf(season);
}
console.assert(slamOrder("winter-2027") > slamOrder("fall-2026") && slamOrder("fall-2026") > slamOrder("spring-2026"));

const pastSlams = getSectionListItems("outcomes")
  .filter((item) => item.projects?.length)
  .sort((a, b) => slamOrder(b.slug) - slamOrder(a.slug));

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
            lastParagraphMargin="var(--gf-space-lg)"
          />
          <Link to="/slam26/register" className="home-cta btn-lift">
            Register for Winter 2027
          </Link>
        </div>
      </div>

      {pastSlams.length > 0 && (
        <section aria-labelledby="past-slams-heading" className="home-outcomes">
          <h2 id="past-slams-heading">Previous outcomes</h2>
          <div className="home-outcomes-grid">
            {pastSlams.map((slam) => {
              const projects = slam.projects ?? [];
              const earned = projects.reduce((n, p) => n + (p.completed?.length ?? 0), 0);
              const logos = [...new Set(projects.map((p) => p.logoUrl))].slice(0, 8);
              return (
                <Link
                  key={slam.slug}
                  to={slam.path ?? `/outcomes/${slam.slug}`}
                  className="home-outcome-card link-card"
                >
                  <h3>{slam.title.replace(/^Security Slam /, "")}</h3>
                  <p className="home-outcome-stats">
                    <span><strong>{projects.length}</strong> projects</span>
                    <span><strong>{earned}</strong> badges earned</span>
                  </p>
                  <div className="home-outcome-logos" aria-hidden="true">
                    {logos.map((src) => (
                      <img key={src} src={src} alt="" loading="lazy" />
                    ))}
                  </div>
                  <span className="home-outcome-more">See every project →</span>
                </Link>
              );
            })}
          </div>
          <p className="home-outcomes-older">
            Earlier Slams are covered in the <Link to="/outcomes">CNCF transparency reports</Link>.
          </p>
        </section>
      )}

      <PartnerLogos />
    </div>
  );
};
