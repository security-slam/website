import { badges as allBadges } from "@/lib/security-slam-data";

// `lastCompleted` (YYYY-MM-DD) is optional and used only for ordering — never rendered.
type Project = { name: string; advisor?: string; repoUrl?: string; logoUrl?: string; completed?: string[]; lastCompleted?: string | Date };

const dateValue = (d?: string | Date) => {
  if (!d) return Number.POSITIVE_INFINITY;
  const t = new Date(d).getTime();
  return Number.isNaN(t) ? Number.POSITIVE_INFINITY : t;
};

// Most badges first; ties go to whoever reached that count earliest; then alphabetical.
const sortProjects = (list: Project[]) =>
  [...list].sort(
    (a, b) =>
      (b.completed?.length ?? 0) - (a.completed?.length ?? 0) ||
      dateValue(a.lastCompleted) - dateValue(b.lastCompleted) ||
      a.name.localeCompare(b.name),
  );

export function ProjectTable({ projects: input, badges }: { projects: Project[]; badges?: string[] }) {
  const projects = sortProjects(input);
  const badgeList = badges?.length ? badges : allBadges.map((b) => b.slug);
  const total = badgeList.length;
  const awarded = projects.reduce((n, p) => n + (p.completed?.length ?? 0), 0);
  const fullyCompleted = projects.filter((p) => (p.completed?.length ?? 0) === total && total > 0).length;


  return (
    <>
      <dl className="project-stats" aria-label="Badge progress summary">
        <div className="project-stat">
          <dt>Participating Projects</dt>
          <dd>{projects.length}</dd>
        </div>
        <div className="project-stat">
          <dt>Badges Awarded</dt>
          <dd>{awarded}</dd>
        </div>
        <div className="project-stat">
          <dt>Fully Completed</dt>
          <dd>{fullyCompleted}</dd>
        </div>
      </dl>
      <div className="project-grid">
        {projects.map((p) => {
          const count = p.completed?.length ?? 0;
          return (
            <div key={p.name} className="project-card">
              <div className="project-head">
                {p.logoUrl ? <img src={p.logoUrl} alt="" /> : null}
                <div>
                  {p.repoUrl ? <a href={p.repoUrl} target="_blank" rel="noreferrer"><strong>{p.name}</strong></a> : <strong>{p.name}</strong>}
                  {p.advisor ? <span>Advisor: {p.advisor}</span> : null}
                </div>
                <span className={`project-count${count === total && total > 0 ? " complete" : ""}`}>
                  <span aria-hidden="true">{count}/{total}</span>
                  <span className="sr-only">{count} of {total} badges earned</span>
                </span>
              </div>
              <div className="project-badges">
                {badgeList.map((b) => (
                  <img key={b} src={`/badge-icons/${b}.png`} alt={b} title={b} className={p.completed?.includes(b) ? "" : "dim"} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
