import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getSectionItemBySlug, projectSlug } from "../content/sections";
import { badgePages } from "../content/library";

export interface ProjectPageProps {
  section: string;
}

/** One project's results in one archived Slam: /<section>/<slam>/<project>. */
export const ProjectPage: React.FC<ProjectPageProps> = ({ section }) => {
  const { slug = "", project: projectParam = "" } = useParams<{ slug: string; project: string }>();
  const slam = getSectionItemBySlug(section, slug);
  const project = slam?.projects?.find((p) => projectSlug(p.name) === projectParam);

  if (!slam) return <Navigate to={`/${section}`} replace />;
  const slamPath = `/${section}/${slam.slug}`;
  if (!project) return <Navigate to={slamPath} replace />;

  const slamName = slam.title.replace(/^Security Slam\s+/, "");
  const badges = slam.badges ?? badgePages.map((p) => p.slug);
  const earned = new Set((project.completed ?? []).map((b) => b.toLowerCase()));
  const earnedCount = badges.filter((b) => earned.has(b)).length;
  const repos = project.repos?.length ? project.repos : [project.repoUrl];
  const rows: string[][] = [];
  for (let i = 0; i < badges.length; i += 3) rows.push(badges.slice(i, i + 3));

  return (
    <article className="content-article" style={{ maxWidth: "900px", margin: "0 auto", width: "100%" }}>
      <Link to={slamPath} className="project-back">
        All {slamName} projects
      </Link>

      <header className="project-head">
        <div className="project-logo">
          <img src={project.logoUrl} alt={`${project.name} logo`} />
        </div>
        <div>
          <h1 className="project-name">{project.name}</h1>
          <p className="project-champion">
            Security Champion
            <strong>{project.champion ?? "Unassigned"}</strong>
          </p>
        </div>
      </header>

      <section aria-labelledby="badges-heading" className="project-section">
        <h2 id="badges-heading">Badges</h2>
        <p className="project-summary">
          {earnedCount === 0
            ? `No badges earned in ${slamName}.`
            : `Earned ${earnedCount} of the ${badges.length} ${slamName} badges.`}
        </p>
        <div className="honeycomb">
          {rows.map((row, r) => (
            <div key={r} className="honeycomb-row">
              {row.map((badge) => {
                const label = badgePages.find((p) => p.slug === badge)?.badge ?? badge;
                const has = earned.has(badge);
                return (
                  <Link
                    key={badge}
                    to={`/library/${badge}`}
                    className={`honeycomb-cell${has ? " is-earned" : ""}`}
                    title={`${label}: ${has ? "earned" : "not earned"}`}
                  >
                    <img src={`/badge-icons/${badge}.png`} alt={`${label} badge, ${has ? "earned" : "not earned"}`} />
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="repos-heading" className="project-section">
        <h2 id="repos-heading">{repos.length === 1 ? "Repository" : "Repositories"}</h2>
        <ul className="project-repos">
          {repos.map((url) => (
            <li key={url}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url.replace(/^https?:\/\/(www\.)?/, "")}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
