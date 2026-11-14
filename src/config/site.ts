/**
 * Site configuration: single source of truth for identity, footer,
 * content sections, and contact pages. Edit this file to
 * customize content without changing component logic. Header nav is derived
 * from a fixed Home link plus enabled content sections (inNav !== false).
 */

export type FooterLink = {
  href: string;
  label: string;
};

export type HubSpotConfig = {
  portalId: string;
  formId: string;
  region: string;
};

export type ContactPageConfig = {
  path: string;
  title: string;
  description?: string;
  hubspot?: HubSpotConfig;
  /** When true, the form is hidden and formDisabledMessage is shown instead. */
  formDisabled?: boolean;
  formDisabledMessage?: string;
};

export type ContentSectionConfig = {
  enabled: boolean;
  label?: string;
  /** If true or omitted when enabled, section index appears in header nav. Set false to hide. */
  inNav?: boolean;
  /** When set, only these item slugs get routes; the section index and other items are off. */
  pages?: string[];
};

export type NavLink = {
  path: string;
  label: string;
  children?: NavLink[];
};

export type BannerConfig = {
  enabled: boolean;
  message: string;
  storageKey?: string;
};

export type SiteConfig = {
  siteName: string;
  tagline: string;
  preregistrationUrl?: string;
  participatingProjectsDefaultTab?: "projects" | "leaderboard";
  banner?: BannerConfig;
  footer: {
    copyrightText: string;
    links: FooterLink[];
  };
  contentSections: Record<string, ContentSectionConfig>;
  customNavLinks?: NavLink[];
  contactPages: ContactPageConfig[];
};

export const siteConfig: SiteConfig = {
  siteName: "Security Slam",
  tagline: "February 15 – March 12, 2027",
  preregistrationUrl: "",
  participatingProjectsDefaultTab: "projects",

  banner: {
    enabled: false,
    message: "The Security Slam is now live! Slam Library assets are still being uploaded and may be incomplete at this time.",
    storageKey: "slam26-banner-dismissed"
  },

  footer: {
    copyrightText: "",
    links: [
      { href: "https://contribute.cncf.io/community/tags/security-and-compliance/", label: "CNCF TAG Security & Compliance" },
      { href: "https://openssf.org", label: "OpenSSF" },
      { href: "https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america/", label: "KubeCon North America" }
    ]
  },

  // Content sections: add a directory under src/content/<key>/ and set enabled.
  // Index at /<key> (card grid), detail at /<key>/:slug or at item.path from frontmatter.
  // Section index appears in header nav when enabled and inNav !== false.
  contentSections: {
    slam26: { enabled: true, label: "Slam26", inNav: false, pages: ["register"] },
    library: { enabled: false, label: "Library", inNav: false },
    outcomes: { enabled: true, label: "Previous Outcomes", inNav: false },
    blog: { enabled: false, label: "Blog" }
  },

  // Header nav after the fixed Home link. The library and Slam explainer pages are spun down
  // between Slams; past results are previewed on the homepage instead.
  customNavLinks: [
    { path: "/slam26/register", label: "Register" }
  ],

  contactPages: [
    {
      path: "/slam26/submit-completion",
      title: "Submit Badge Completion",
      description: "This form is for project maintainers to report completion of Security Slam badges. This may be submitted multiple times to request personal badges for each contributor to the badge. The form should ONLY be submitted by maintainers; other results will be automatically ignored. Organizers will reach out to maintainers via email to confirm the submissions.",
      hubspot: {
        portalId: "243073831",
        formId: "5523a8f7-f60e-4ac9-8aed-225b6ebfd304",
        region: "na2"
      }
    }
  ]
};
