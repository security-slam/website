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
  const navRef = React.useRef<HTMLElement>(null);

  // Close the open dropdown on an outside tap/click or Escape
  React.useEffect(() => {
    if (!openDropdown) return;
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenDropdown(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [openDropdown]);

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

  const linkClass = (active: boolean) => (active ? "site-nav-link is-active" : "site-nav-link");

  return (
    <header className="site-header">
      <section id="hero" className="site-header-inner">
        <div className="site-header-brand">
          <div className="site-header-logos">
            <a
              href="https://contribute.cncf.io/community/tags/security-and-compliance/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CNCF TAG Security & Compliance"
            >
              <img src={tagScLogoUrl} alt="CNCF TAG Security & Compliance" />
            </a>
            <Link to="/" aria-label={`${siteConfig.siteName} home`}>
              <img src={logoColorUrl} alt={siteConfig.siteName} />
            </Link>
          </div>
          <p className="site-tagline">{siteConfig.tagline}</p>
        </div>
        <nav className="site-nav" ref={navRef}>
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

              const isOpen = openDropdown === item.path;
              return (
                <div
                  key={item.path}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setOpenDropdown(item.path)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenDropdown(isOpen ? null : item.path)}
                    className={linkClass(isOpen || location.pathname === item.path)}
                  >
                    {item.label}
                    <span style={{ fontSize: "0.75rem" }}>▼</span>
                  </button>
                  {isOpen && (
                    <div className="site-nav-dropdown">
                      <div>
                        {visibleChildren.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={location.pathname === child.path ? "is-active" : undefined}
                            onClick={() => setOpenDropdown(null)}
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
              <Link key={item.path} to={item.path} className={linkClass(location.pathname === item.path)}>
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
          className="banner-show-btn"
          style={{
            position: "fixed",
            top: "0.5rem",
            left: "50%",
            background: "rgba(141, 232, 242, 0.3)",
            border: "none",
            color: "#000",
            cursor: "pointer",
            padding: "0.5rem",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
            WebkitAppearance: "none",
            zIndex: 1000,
            borderRadius: "0 0 8px 8px"
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
