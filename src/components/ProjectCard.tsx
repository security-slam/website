import React from "react";
import { Link } from "react-router-dom";

export interface ProjectCardProps {
  name: string;
  champion?: string;
  repoUrl: string;
  logoUrl: string;
  /** Internal route; when set the card links here instead of to the repo. */
  to?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  champion,
  repoUrl,
  logoUrl,
  to
}) => {
  const style: React.CSSProperties = {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    flexDirection: "column",
    borderRadius: "var(--gf-radius-xl)",
    overflow: "hidden",
    border: "1px solid var(--gf-color-border-strong)",
    boxShadow: "var(--gf-shadow-surface)"
  };
  const body = (
    <>
      {/* Logo section with white background */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "var(--gf-space-xl)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "180px"
        }}
      >
        <img
          src={logoUrl}
          alt={`${name} logo`}
          style={{
            maxWidth: "100%",
            maxHeight: "140px",
            objectFit: "contain"
          }}
        />
      </div>

      {/* Info section with dark grey background */}
      <div
        style={{
          backgroundColor: "var(--gf-color-surface)",
          padding: "var(--gf-space-xl)",
          flex: 1
        }}
      >
        <h3
          style={{
            marginTop: 0,
            marginBottom: "var(--gf-space-sm)",
            color: "var(--gf-color-text)",
            fontSize: "1.3rem"
          }}
        >
          {name}
        </h3>
        {champion && (
          <p
            style={{
              margin: 0,
              color: "var(--gf-color-text-subtle)",
              fontSize: "1rem"
            }}
          >
            Security Champion: <strong>{champion}</strong>
          </p>
        )}
      </div>
    </>
  );
  return to ? (
    <Link to={to} className="link-card" style={style}>{body}</Link>
  ) : (
    <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="link-card" style={style}>
      {body}
    </a>
  );
};
