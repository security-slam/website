import React from "react";
import { Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SectionCard } from "../components/SectionCard";
import { BadgeNavigation } from "../components/BadgeNavigation";
import { AudioPlayer } from "../components/AudioPlayer";
import { markdownComponents } from "../components/markdownComponents";
import { siteConfig } from "../config/site";
import {
  getSectionIndexItem,
  getSectionListItems
} from "../content/sections";

export interface SectionIndexPageProps {
  section: string;
}

export const SectionIndexPage: React.FC<SectionIndexPageProps> = ({ section }) => {
  const config = siteConfig.contentSections[section];
  if (!config?.enabled) {
    return <Navigate to="/" replace />;
  }

  const indexItem = getSectionIndexItem(section);
  const listItems = getSectionListItems(section);
  const title = config.label ?? section;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%"
      }}
    >
      {indexItem ? (
        <article
          className="content-article"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            paddingTop: 0,
            paddingBottom: 0,
            width: "100%"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "var(--gf-space-md)", marginBottom: "var(--gf-space-md)", flexWrap: "wrap" }}>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                margin: 0,
                color: "var(--gf-color-accent)",
                lineHeight: 1.2
              }}
            >
              {indexItem.title}
            </h1>
            {indexItem.audioUrl && (
              <AudioPlayer src={indexItem.audioUrl} label="Narrate Page" />
            )}
          </div>
          {indexItem.description && (
            <p
              style={{
                color: "var(--gf-color-text-subtle)",
                fontSize: "1.1rem",
                marginBottom: "var(--gf-space-lg)",
                lineHeight: 1.6
              }}
            >
              {indexItem.description}
            </p>
          )}
          {indexItem.youtubeId && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(indexItem.youtubeId)}`}
              title={`${indexItem.title} video`}
              allow="encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              style={{
                display: "block",
                width: "100%",
                aspectRatio: "16 / 9",
                border: 0,
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                marginBottom: "var(--gf-space-xl)"
              }}
            />
          )}
          <div
            className="library-article-body"
            style={{
              color: "var(--gf-color-text)",
              lineHeight: 1.8,
              fontSize: "1.1rem",
              marginBottom: listItems.length > 0 ? "var(--gf-space-2xl)" : 0
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                ...markdownComponents,
                h2: ({ children, ...props }) => {
                  const headingText = typeof children === 'string' ? children : children?.toString() || '';
                  const audioUrl = indexItem.sectionAudio?.[headingText];
                  return (
                    <h2 {...props} style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "var(--gf-space-sm)" }}>
                      <span>{children}</span>
                      {audioUrl && <AudioPlayer src={audioUrl} label="Narrate Section" inline />}
                    </h2>
                  );
                }
              }}
            >
              {indexItem.body}
            </ReactMarkdown>
          </div>
        </article>
      ) : (
        <>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: 700,
              marginBottom: "var(--gf-space-md)",
              color: "var(--gf-color-accent)",
              lineHeight: 1.2
            }}
          >
            {title}
          </h1>
          {listItems.length === 0 && (
            <p
              style={{
                color: "var(--gf-color-text-subtle)",
                fontSize: "1.25rem",
                marginBottom: "var(--gf-space-xl)",
                lineHeight: 1.6
              }}
            >
              Add markdown files under <code>src/content/{section}/</code> to add or change items.
            </p>
          )}
        </>
      )}

      {/* Add BadgeNavigation for slam26 section */}
      {section === "slam26" && <BadgeNavigation />}

      {listItems.length > 0 && (
        <>
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              marginBottom: "var(--gf-space-md)",
              color: "var(--gf-color-text)",
              lineHeight: 1.3
            }}
          >
            {indexItem ? "More" : title}
          </h2>
          <div className="past-reports-grid">
            {listItems.map((item) => {
              const href = item.path ?? `/${section}/${item.slug}`;
              return (
                <Link
                  key={item.slug}
                  to={href}
                  style={{
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <SectionCard
                    title={item.title}
                    description={item.description ?? ""}
                  />
                </Link>
              );
            })}
          </div>
        </>
      )}

      {!indexItem && listItems.length === 0 && (
        <p style={{ color: "var(--gf-color-text-subtle)" }}>No items yet.</p>
      )}
    </div>
  );
};
