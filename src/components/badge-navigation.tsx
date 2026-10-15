import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { badges } from "@/lib/security-slam-data";

export function BadgeNavigation({ currentSlug }: { currentSlug: string }) {
  return (
    <nav className="badge-navigation" aria-label="Badge objectives">
      {badges.map((badge) => (
        <Link
          key={badge.slug}
          to="/library/$slug"
          params={{ slug: badge.slug }}
          className="badge-navigation-link"
          aria-label={badge.name}
          aria-current={currentSlug === badge.slug ? "page" : undefined}
          title={badge.name}
        >
          <img src={`/badge-icons/${badge.slug}.png`} alt="" width={48} height={48} />
          <span className="badge-navigation-label">{badge.name}<ArrowUpRight size={14} aria-hidden="true" /></span>
        </Link>
      ))}
    </nav>
  );
}