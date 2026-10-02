import React from "react";
import { Link, useLocation } from "react-router-dom";
import { badgePages } from "../content/library";

type Props = {
  /** Smaller icons, no heading: used as a tab strip on badge pages. */
  compact?: boolean;
};

export const BadgeNavigation: React.FC<Props> = ({ compact = false }) => {
  const { pathname } = useLocation();
  const iconMax = compact ? "72px" : "180px";

  return (
    <section
      style={{
        marginBottom: compact ? "var(--gf-space-lg)" : "var(--gf-space-xl)",
        paddingTop: "var(--gf-space-md)",
        paddingBottom: "var(--gf-space-md)",
      }}
    >
      {!compact && (
        <h2 style={{ marginTop: 0, marginBottom: "var(--gf-space-lg)" }}>
          Learn about Each Badge
        </h2>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fit, minmax(${compact ? "90px" : "150px"}, 1fr))`,
          gap: compact ? "var(--gf-space-md)" : "var(--gf-space-xl)",
          maxWidth: "1400px",
          margin: "0 auto",
          justifyItems: "center",
        }}
      >
        {badgePages.map((page) => {
          const to = `/library/${page.slug}`;
          const active = pathname === to;
          return (
            <Link
              key={page.slug}
              to={to}
              aria-current={active ? "page" : undefined}
              className="scale-hover"
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: compact ? "var(--gf-space-xs)" : "var(--gf-space-md)",
                padding: compact ? "var(--gf-space-sm)" : 0,
                borderRadius: "var(--gf-radius-lg)",
                backgroundColor: active ? "var(--gf-color-accent-soft)" : "transparent",
                opacity: compact && !active ? 0.7 : 1,
              }}
            >
              <img
                src={`/badge-icons/${page.slug}.png`}
                alt={`${page.badge} Badge`}
                style={{ width: "100%", maxWidth: iconMax, height: "auto", objectFit: "contain" }}
              />
              <span
                style={{
                  fontSize: compact ? "0.85rem" : "1.1rem",
                  fontWeight: 600,
                  color: "var(--gf-color-text)",
                  textAlign: "center",
                }}
              >
                {page.badge}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
