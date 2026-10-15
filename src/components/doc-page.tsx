import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Markdown } from "@/components/markdown";

export function meta(title: string, description: string) {
  const t = `${title} | Security Slam`;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}

export function DocPage({ title, description, body, before, after, icon, sidebar }: { title: string; description?: string | undefined; body?: string | undefined; before?: ReactNode; after?: ReactNode; icon?: string | undefined; sidebar?: ReactNode }) {
  return (
    <div className="site-page">
      <SiteHeader />
      <main className={`content-page site-shell${sidebar ? " badge-article-layout" : ""}`}>
        {sidebar ? <aside className="badge-article-sidebar">{sidebar}</aside> : null}
        <div className="doc-content">
        <div className="doc-hero">
          {icon ? <img className="detail-badge" src={icon} alt="" /> : null}
          <div>
            {description ? <p className="section-kicker">{description}</p> : null}
            <h1>{title}</h1>
          </div>
        </div>
        {before}
        {body ? <Markdown>{body}</Markdown> : null}
        {after}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
