import React from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig, type NavLink } from "../config/site";

// Public assets are served at root (see vite publicDir)
const logoColorUrl = "/logo/logo-color.png";
const tagScLogoUrl = "/logo/tag_sc_logo-color.png";

export interface HeaderProps {
  showBannerButton?: boolean;
  onShowBanner?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  showBannerButton = false,
  onShowBanner
}) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  // Get sections handled by custom nav links (to avoid duplicates)
  const customNavPaths = (siteConfig.customNavLinks ?? []).map(link => link.path);

  const contentSectionNav: NavLink[] = Object.entries(siteConfig.contentSections)
    .filter(([section, config]) => {
      const sectionPath = `/${section}`;
      return config.enabled && config.inNav !== false && !customNavPaths.includes(sectionPath);
    })
    .map(([section, config]) => ({
      path: `/${section}`,
      label: config.label ?? section
    }));

  const customNav = siteConfig.customNavLinks ?? [];
  const fullNav: NavLink[] = [{ path: "/", label: "Home" }, ...contentSectionNav, ...customNav];

  const linkStyle = (path: string): React.CSSProperties => ({
    color: "var(--gf-color-text)",
    textDecoration: "none",
    padding: "0.5rem 1rem",
    borderRadius: "var(--gf-radius-lg)",
    transition: "background-color 0.2s",
    backgroundColor: location.pathname === path ? "var(--gf-color-accent-soft)" : "transparent"
  });

  return (
    <header
      className="site-header"
      style={{
        width: "100vw",
        margin: "0",
        padding: "var(--gf-space-md) var(--gf-space-xl)",
        boxSizing: "border-box"
      }}
    >
      <section
        id="hero"
        className="site-header-inner"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "var(--gf-space-md)",
          textAlign: "center"
        }}
      >
        <div
          className="site-header-brand"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--gf-space-md)"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--gf-space-xl)",
              flexWrap: "wrap"
            }}
          >
            <a
              href="https://contribute.cncf.io/community/tags/security-and-compliance/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block" }}
              aria-label="CNCF TAG Security & Compliance"
            >
              <img
                src={tagScLogoUrl}
                alt="CNCF TAG Security & Compliance"
                style={{
                  maxHeight: "80px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block"
                }}
              />
            </a>
            <Link
              to="/"
              style={{ display: "block" }}
              aria-label={`${siteConfig.siteName} home`}
            >
              <img
                src={logoColorUrl}
                alt={siteConfig.siteName}
                style={{
                  maxHeight: "80px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block"
                }}
              />
            </Link>
          </div>
          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--gf-color-text-subtle)",
              margin: 0,
              lineHeight: 1.4
            }}
          >
            {siteConfig.tagline}
          </p>
        </div>
        <nav
          style={{
            display: "flex",
            gap: "var(--gf-space-md)",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            position: "relative"
          }}
        >
          {fullNav.map((item) => {
            const hasChildren = item.children && item.children.length > 0;

            if (hasChildren) {
              // Filter out disabled sections from dropdown
              const visibleChildren = item.children!.filter(child => {
                // Check if this is a content section path
                const sectionMatch = child.path.match(/^\/([^/]+)/);
                if (sectionMatch) {
                  const sectionName = sectionMatch[1];
                  const sectionConfig = siteConfig.contentSections[sectionName];
                  // If it's a content section, only show if enabled
                  if (sectionConfig) {
                    return sectionConfig.enabled;
                  }
                }
                // If not a content section path, always show
                return true;
              });

              // Don't render dropdown if no visible children
              if (visibleChildren.length === 0) {
                return null;
              }

              return (
                <div
                  key={item.path}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setOpenDropdown(item.path)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    aria-expanded={openDropdown === item.path}
                    onClick={() => setOpenDropdown(openDropdown === item.path ? null : item.path)}
                    style={{
                      ...linkStyle(item.path),
                      border: "none",
                      background: openDropdown === item.path ? "var(--gf-color-accent-soft)" : "transparent",
                      cursor: "pointer",
                      fontSize: "inherit",
                      fontFamily: "inherit",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      outline: "none",
                      boxShadow: "none",
                      WebkitAppearance: "none"
                    }}
                  >
                    {item.label}
                    <span style={{ fontSize: "0.75rem" }}>▼</span>
                  </button>
                  {openDropdown === item.path && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        paddingTop: "0.25rem",
                        backgroundColor: "transparent",
                        minWidth: "200px",
                        zIndex: 1000
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: "var(--gf-color-surface)",
                          border: "1px solid var(--gf-color-accent)",
                          borderRadius: "var(--gf-radius-lg)",
                          boxShadow: "var(--gf-shadow-surface)",
                          overflow: "hidden"
                        }}
                      >
                        {visibleChildren.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            style={{
                              display: "block",
                              padding: "0.75rem 1rem",
                              color: "var(--gf-color-text)",
                              textDecoration: "none",
                              transition: "background-color 0.2s",
                              backgroundColor: location.pathname === child.path ? "var(--gf-color-accent-soft)" : "transparent"
                            }}
                            onMouseEnter={(e) => {
                              if (location.pathname !== child.path) {
                                e.currentTarget.style.backgroundColor = "var(--gf-color-accent-soft)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (location.pathname !== child.path) {
                                e.currentTarget.style.backgroundColor = "transparent";
                              }
                            }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                to={item.path}
                style={linkStyle(item.path)}
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.backgroundColor = "var(--gf-color-accent-soft)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.path) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </section>
      {showBannerButton && onShowBanner && (
        <button
          type="button"
          onClick={onShowBanner}
          aria-label="Show banner"
          style={{
            position: "fixed",
            top: "0.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(141, 232, 242, 0.3)",
            border: "none",
            color: "#000",
            cursor: "pointer",
            padding: "0.5rem",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease",
            outline: "none",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            WebkitAppearance: "none",
            zIndex: 1000,
            borderRadius: "0 0 8px 8px"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(-50%) scale(1.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(-50%) scale(1)";
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </header>
  );
};
