import React from "react";
import { sponsorLogos } from "../content/sponsorLogos";

/** Static partner logos, always side by side. The scrolling LogoBar is kept for when there are more than a few. */
export const PartnerLogos: React.FC = () => {
  if (sponsorLogos.length === 0) return null;
  return (
    <section
      aria-label="Partners"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "var(--gf-space-xl)",
        padding: "var(--gf-space-lg) var(--gf-space-xl)",
        marginTop: "var(--gf-space-xl)",
        marginBottom: "var(--gf-space-xl)"
      }}
    >
      {sponsorLogos.map((src) => (
        <img
          key={src}
          src={src}
          alt="Partner"
          style={{ flex: "1 1 0", minWidth: 0, maxWidth: "320px", maxHeight: "80px", objectFit: "contain" }}
        />
      ))}
    </section>
  );
};
