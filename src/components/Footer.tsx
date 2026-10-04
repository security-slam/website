import React from "react";
import { siteConfig } from "../config/site";

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        padding: "var(--gf-space-lg)",
        borderTop: "1px solid var(--gf-color-border-strong)",
        backgroundColor: "var(--gf-color-surface)",
        backdropFilter: "var(--gf-glass-blur)",
        WebkitBackdropFilter: "var(--gf-glass-blur)",
        marginTop: "auto"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          textAlign: "center",
          color: "var(--gf-color-text-subtle)",
          fontSize: "0.875rem"
        }}
      >
        {siteConfig.footer.copyrightText ? (
          <p>{siteConfig.footer.copyrightText}</p>
        ) : null}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "var(--gf-space-md)",
            marginTop: siteConfig.footer.copyrightText ? "var(--gf-space-md)" : 0,
            flexWrap: "wrap"
          }}
        >
          {siteConfig.preregistrationUrl ? (
            <a
              href={siteConfig.preregistrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Pre-register
            </a>
          ) : null}
          {siteConfig.footer.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
