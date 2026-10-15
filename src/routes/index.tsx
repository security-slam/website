import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { PhotoCarousel } from "@/components/photo-carousel";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { badges, partnerLogos } from "@/lib/security-slam-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Security Slam 2026 | Securing Open Source at the Source" },
      { name: "description", content: "Join the Security Slam from October 5 – November 6, 2026 and help secure open source at the source." },
      { property: "og:title", content: "Security Slam 2026 | Securing Open Source at the Source" },
      { property: "og:description", content: "Join the Security Slam from October 5 – November 6, 2026 and help secure open source at the source." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="site-page">
      <SiteHeader />

      <main>
        <section className="hero-section">
          <div className="hero-grid-overlay" aria-hidden="true" />
          <div className="site-shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span /> October 5 – November 6, 2026</p>
              <h1>Securing Open Source at the Source</h1>
              <div className="hero-paragraphs">
                <p>Run by the CNCF Technical Advisory Group for Security &amp; Compliance, the Slam is a month-long community effort with a library of support resources, advisors on Slack, and plaques and badges for participating projects and contributors.</p>
                <p>This fall, the Slam is open to ANY open source project. You don&apos;t need to be a CNCF project, or even cloud native. If you maintain or contribute to open source software, you can participate.</p>
                <p>The next Security Slam runs October 5 – November 6, 2026. Registration is open now.</p>
              </div>
              <div className="hero-actions">
                <Button asChild variant="campaign" size="campaign">
                  <Link to="/library">Objectives <ArrowRight /></Link>
                </Button>
                <Button asChild variant="campaignOutline" size="campaign">
                  <Link to="/slam26">How it works</Link>
                </Button>
              </div>
            </div>
            <PhotoCarousel />
          </div>
        </section>

        <section className="registration-band">
          <div className="site-shell registration-inner">
            <div>
              <p className="section-kicker">Registration</p>
              <h2>Registration is now open</h2>
              <p>Open to ALL open source projects! Register now to qualify for recognitions.</p>
            </div>
            <Button asChild variant="campaign" size="campaign">
              <Link to="/slam26/register">Register now <ArrowRight /></Link>
            </Button>
          </div>
        </section>

        <section className="partner-band" aria-label="Partners">
          <div className="site-shell partner-inner">
            {partnerLogos.map((logo) => <img key={logo} src={logo} alt="Partner" />)}
          </div>
        </section>

        <section className="how-section">
          <div className="site-shell how-grid">
            <div>
              <p className="section-kicker">The Security Slam</p>
              <h2>How the Slam works</h2>
            </div>
            <div className="how-copy">
              <p>No teams, no scoring, no prizes: just six shared objectives built around the OpenSSF Open Source Project Security Baseline. Projects that complete an objective earn a badge; projects that complete them all earn a plaque.</p>
              <Button asChild variant="campaignOutline" size="campaign">
                <Link to="/slam26">How it works <ArrowRight /></Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="badges-section">
          <div className="site-shell">
            <div className="badges-heading">
              <p className="section-kicker">Six shared objectives</p>
              <h2>Learn about Each Badge</h2>
            </div>
            <div className="badges-row">
              {badges.map((badge, index) => (
                <Link key={badge.slug} to="/library/$slug" params={{ slug: badge.slug }} className="badge-card compact">
                  <span className="badge-number">0{index + 1}</span>
                  <img src={`/badge-icons/${badge.slug}.png`} alt={`${badge.name} Badge`} />
                  <span className="badge-name">{badge.name}</span>
                  <span className="badge-link">View objective <ArrowRight /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
