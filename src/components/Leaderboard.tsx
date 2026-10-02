import React, { useState } from "react";
import { ProjectInfo } from "../content/sections";
import { badgePages } from "../content/library";

export interface LeaderboardProps {
  projects: ProjectInfo[];
  /** Badge slugs to show as tabs. Defaults to every library badge page. */
  badges?: string[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ projects, badges }) => {
  // Tabs are {slug, label}; `completed` in project frontmatter holds slugs.
  const tabs = (badges ?? badgePages.map((p) => p.slug)).map((slug) => ({
    slug,
    label: badgePages.find((p) => p.slug === slug)?.badge ?? slug,
  }));
  const [activeTab, setActiveTab] = useState(tabs[0]?.slug ?? "");

  // Filter projects that have completed the active badge
  const completedProjects = projects.filter(
    (project) =>
      project.completed &&
      project.completed.some(
        (badge) => badge.toLowerCase() === activeTab.toLowerCase()
      )
  );

  return (
    <div
      style={{
        marginTop: "var(--gf-space-2xl)",
        marginBottom: "var(--gf-space-2xl)",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "var(--gf-space-lg)",
          color: "var(--gf-color-accent)",
          textAlign: "center",
        }}
      >
        Badge Leaderboard
      </h2>
      <p
        style={{
          textAlign: "center",
          color: "var(--gf-color-text-subtle)",
          marginBottom: "var(--gf-space-xl)",
          fontSize: "1.1rem",
        }}
      >
        See which projects have completed each badge
      </p>

      {/* Badge Tabs */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "var(--gf-space-lg)",
          justifyContent: "center",
          marginBottom: "var(--gf-space-2xl)",
          paddingTop: "var(--gf-space-md)",
          paddingBottom: "var(--gf-space-md)",
        }}
      >
        {tabs.map(({ slug: badge, label }) => {
          const count = projects.filter(
            (p) =>
              p.completed &&
              p.completed.some((b) => b.toLowerCase() === badge.toLowerCase())
          ).length;
          const isActive = activeTab === badge;

          return (
            <button
              key={badge}
              onClick={() => setActiveTab(badge)}
              className="scale-hover"
              style={{
                padding: "var(--gf-space-sm)",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "var(--gf-space-sm)",
                position: "relative",
                minWidth: isActive ? "140px" : "100px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100px",
                  height: "100px",
                }}
              >
                <img
                  src={`/badge-icons/${badge}.png`}
                  alt={`${label} Badge`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: isActive ? "none" : "grayscale(50%) opacity(0.7)",
                    transition: "filter 0.2s ease",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "-12px",
                    right: "-12px",
                    backgroundColor: "var(--gf-color-accent)",
                    color: "var(--gf-color-background)",
                    padding: "4px 8px",
                    borderRadius: "var(--gf-radius-lg)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    minWidth: "24px",
                    textAlign: "center",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {count}
                </span>
              </div>
              {isActive && (
                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "var(--gf-color-text)",
                    textAlign: "center",
                  }}
                >
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Completed Projects Grid */}
      {completedProjects.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "var(--gf-space-xl)",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {completedProjects.map((project, index) => (
            <a
              key={index}
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "var(--gf-space-lg)",
                backgroundColor: "var(--gf-color-surface)",
                borderRadius: "var(--gf-radius-xl)",
                border: "2px solid var(--gf-color-border-strong)",
                boxShadow: "var(--gf-shadow-surface)",
              }}
            >
              <div
                style={{
                  backgroundColor: "#ffffff",
                  padding: "var(--gf-space-md)",
                  borderRadius: "var(--gf-radius-lg)",
                  marginBottom: "var(--gf-space-md)",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "120px",
                }}
              >
                <img
                  src={project.logoUrl}
                  alt={`${project.name} logo`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  textAlign: "center",
                  color: "var(--gf-color-text)",
                }}
              >
                {project.name}
              </h3>
            </a>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "var(--gf-space-2xl)",
            color: "var(--gf-color-text-subtle)",
            fontSize: "1.1rem",
            backgroundColor: "var(--gf-color-surface)",
            borderRadius: "var(--gf-radius-xl)",
            border: "2px dashed var(--gf-color-border)",
          }}
        >
          <p style={{ margin: 0 }}>
            No projects have completed the {tabs.find((t) => t.slug === activeTab)?.label ?? activeTab} badge yet.
          </p>
          <p
            style={{
              margin: "var(--gf-space-md) 0 0 0",
              fontSize: "0.95rem",
            }}
          >
            Be the first to complete this badge!
          </p>
        </div>
      )}
    </div>
  );
};
