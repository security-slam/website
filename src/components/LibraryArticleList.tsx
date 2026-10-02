import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SectionCard } from "./SectionCard";
import { getAllTags, libraryArticles, type LibraryArticle } from "../content/library";

export interface LibraryArticleListProps {
  title?: string;
}

export const LibraryArticleList: React.FC<LibraryArticleListProps> = ({
  title = "Explore More Articles"
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTag = searchParams.get("tag");
  const tags = getAllTags();

  const hasFilter = selectedTag !== null && selectedTag !== "";
  const articlesToShow = hasFilter
    ? libraryArticles.filter((a) => a.tags.includes(selectedTag!))
    : libraryArticles;
  const showEmptyFilter = hasFilter && articlesToShow.length === 0;
  const showEmptyLibrary = !hasFilter && libraryArticles.length === 0;

  const setTagFilter = (tag: string | null) => {
    if (tag === null) {
      searchParams.delete("tag");
    } else {
      searchParams.set("tag", tag);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const badgeTags = ["Defender", "Chronicler", "Cleaner", "Inspector", "Mechanizer"];
  const nonBadgeTags = tags.filter((tag) => !badgeTags.includes(tag));

  return (
    <div>
      {title && (
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 600,
            marginBottom: "var(--gf-space-lg)",
            color: "var(--gf-color-accent)"
          }}
        >
          {title}
        </h2>
      )}

      {/* Tag filter circles for non-badge tags */}
      {nonBadgeTags.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--gf-space-lg)",
            justifyContent: "center",
            marginBottom: "var(--gf-space-xl)"
          }}
        >
          {nonBadgeTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setTagFilter(tag)}
              className="tag-circle"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "var(--gf-color-accent-soft)",
                border: "2px solid var(--gf-color-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "var(--gf-space-sm)",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(232, 121, 249, 0.4)"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--gf-color-accent)",
                    textAlign: "center",
                    lineHeight: 1.2
                  }}
                >
                  {tag}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Article list */}
      {showEmptyLibrary || showEmptyFilter ? (
        <p style={{ color: "var(--gf-color-text-subtle)" }}>
          {showEmptyLibrary
            ? "No library articles yet."
            : "No articles match this filter."}
        </p>
      ) : (
        <>
          {hasFilter && selectedTag && (
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                marginBottom: "var(--gf-space-md)",
                color: "var(--gf-color-accent)"
              }}
            >
              {selectedTag}
            </h3>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--gf-space-lg)"
            }}
          >
            {articlesToShow.map((article) => (
              <Link
                key={article.slug}
                to={`/library/${article.slug}`}
                style={{
                  textDecoration: "none",
                  color: "inherit"
                }}
              >
                <SectionCard
                  title={article.title}
                  description={article.description ?? ""}
                >
                  {article.tags.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginTop: "var(--gf-space-md)"
                      }}
                    >
                      {article.tags.map((t) => (
                        <span
                          key={t}
                          style={{
                            fontSize: "0.8rem",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "var(--gf-radius-lg)",
                            backgroundColor: "var(--gf-color-accent-soft)",
                            color: "var(--gf-color-accent)"
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </SectionCard>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
