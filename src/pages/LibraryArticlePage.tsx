import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "../components/markdownComponents";
import { getLibraryArticle, getArticlesByTag } from "../content/library";
import { SectionCard } from "../components/SectionCard";
import { LibraryArticleList } from "../components/LibraryArticleList";
import { BadgeNavigation } from "../components/BadgeNavigation";

export const LibraryArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getLibraryArticle(slug) : undefined;

  if (!article) {
    return <Navigate to="/library" replace />;
  }

  // Check if this is a badge page
  const isBadgePage = article.badge !== undefined;
  const badgeArticles = isBadgePage && article.badge
    ? getArticlesByTag(article.badge)
    : [];

  return (
    <article
      style={{
        maxWidth: isBadgePage ? "1200px" : "900px",
        margin: "0 auto",
        padding: "var(--gf-space-xl)",
        width: "100%"
      }}
    >
      {/* Badge-to-badge tab strip, then the icon, for badge pages */}
      {isBadgePage && <BadgeNavigation compact />}
      {isBadgePage && article.badge && (
        <div style={{ textAlign: "center", marginBottom: "var(--gf-space-lg)" }}>
          <img
            src={`/badge-icons/${article.slug}.png`}
            alt={`${article.badge} Badge`}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "contain"
            }}
          />
        </div>
      )}

      {/* Article image for regular articles */}
      {!isBadgePage && article.image && (
        <div style={{ textAlign: "center", marginBottom: "var(--gf-space-lg)" }}>
          <img
            src={article.image}
            alt={article.title}
            style={{
              maxWidth: "50%",
              height: "auto",
              objectFit: "contain"
            }}
          />
        </div>
      )}

      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "var(--gf-space-md)",
          color: "var(--gf-color-accent)",
          lineHeight: 1.2
        }}
      >
        {article.title}
      </h1>
      {article.author && (
        <p
          style={{
            color: "var(--gf-color-complement)",
            fontSize: "0.95rem",
            marginBottom: "var(--gf-space-lg)",
            fontStyle: "italic"
          }}
        >
          By {article.author}
        </p>
      )}
      {article.description && (
        <p
          style={{
            color: "var(--gf-color-text-subtle)",
            fontSize: "1.1rem",
            marginBottom: "var(--gf-space-lg)",
            lineHeight: 1.6
          }}
        >
          {article.description}
        </p>
      )}
      {article.videoUrl && (
        <div style={{ marginBottom: "var(--gf-space-xl)" }}>
          <video
            width="100%"
            controls
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              display: "block",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
          >
            <source src={article.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
      <div
        className="library-article-body"
        style={{
          color: "var(--gf-color-text)",
          lineHeight: 1.8,
          fontSize: "1.1rem",
          marginBottom: isBadgePage ? "var(--gf-space-2xl)" : "0"
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{article.body}</ReactMarkdown>
      </div>

      {/* Submit completion button for badge pages */}
      {isBadgePage && (
        <div
          style={{
            marginBottom: "var(--gf-space-2xl)",
            padding: "var(--gf-space-xl)",
            backgroundColor: "var(--gf-color-surface)",
            borderRadius: "var(--gf-radius-xl)",
            border: "2px solid var(--gf-color-accent)",
            textAlign: "center"
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "var(--gf-space-md)",
              color: "var(--gf-color-accent)"
            }}
          >
            Completed This Badge?
          </h3>
          <p
            style={{
              color: "var(--gf-color-text-subtle)",
              marginBottom: "var(--gf-space-lg)",
              lineHeight: 1.6
            }}
          >
            If you're a project maintainer and you've completed this badge, submit your completion for evaluation.
          </p>
          <Link
            to="/slam26/submit-completion"
            style={{
              display: "inline-block",
              padding: "var(--gf-space-md) var(--gf-space-xl)",
              backgroundColor: "var(--gf-color-accent)",
              color: "var(--gf-color-background)",
              borderRadius: "var(--gf-radius-lg)",
              fontWeight: 600,
              fontSize: "1.1rem",
              textDecoration: "none",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
            }}
          >
            Submit Badge Completion
          </Link>
        </div>
      )}

      {/* Display badge articles if this is a badge page, otherwise show explore more articles */}
      {isBadgePage && badgeArticles.length > 0 ? (
        <div style={{ marginTop: "var(--gf-space-xl)" }}>
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 600,
              marginBottom: "var(--gf-space-lg)",
              color: "var(--gf-color-accent)"
            }}
          >
            Resources
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--gf-space-lg)"
            }}
          >
            {badgeArticles.map((badgeArticle) => (
              <Link
                key={badgeArticle.slug}
                to={`/library/${badgeArticle.slug}`}
                style={{
                  textDecoration: "none",
                  color: "inherit"
                }}
              >
                <SectionCard
                  title={badgeArticle.title}
                  description={badgeArticle.description ?? ""}
                >
                  {badgeArticle.tags.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                        marginTop: "var(--gf-space-md)"
                      }}
                    >
                      {badgeArticle.tags.map((t) => (
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
        </div>
      ) : (
        <div style={{ marginTop: "var(--gf-space-2xl)", paddingTop: "var(--gf-space-xl)", borderTop: "1px solid var(--gf-color-border)" }}>
          <LibraryArticleList title="Explore More Articles" />
        </div>
      )}
    </article>
  );
};
