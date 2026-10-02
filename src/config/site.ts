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
};

export type PastSlamReport = {
  href: string;
  label: string;
  description?: string;
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
  pastSlamReports: PastSlamReport[];
};

export const siteConfig: SiteConfig = {
  siteName: "Security Slam",
  tagline: "October 5 – November 6, 2026",
  preregistrationUrl: "",
  participatingProjectsDefaultTab: "leaderboard",

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
      { href: "https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/", label: "KubeCon Europe" }
    ]
  },

  // Content sections: add a directory under src/content/<key>/ and set enabled.
  // Index at /<key> (card grid), detail at /<key>/:slug or at item.path from frontmatter.
  // Section index appears in header nav when enabled and inNav !== false.
  contentSections: {
    slam26: { enabled: true, label: "Slam26", inNav: false },
    library: { enabled: true, label: "Library", inNav: false },
    blog: { enabled: false, label: "Blog" }
  },

  // Header nav. The six objectives are one click from every page (Spring feedback: hard to find).
  customNavLinks: [
    {
      path: "/library",
      label: "Objectives",
      children: [
        { path: "/library/cleaner", label: "Cleaner" },
        { path: "/library/chronicler", label: "Chronicler" },
        { path: "/library/inspector", label: "Inspector" },
        { path: "/library/mechanizer", label: "Mechanizer" },
        { path: "/library/defender", label: "Defender" },
        { path: "/library/cra-readiness", label: "CRA Readiness" }
      ]
    },
    { path: "/slam26", label: "How it works" },
    { path: "/slam26/participating-projects", label: "Projects" },
    { path: "/slam26/register", label: "Register" }
  ],

  contactPages: [
    {
      path: "/contact",
      title: "Contact",
      description: "Send a message using the form below. Replace the placeholder HubSpot portal and form IDs in site config with your own to connect a real form.",
      hubspot: {
        portalId: "0000000",
        formId: "00000000-0000-0000-0000-000000000000",
        region: "na1"
      }
    },
    {
      path: "/slam26/submit-completion",
      title: "Submit Badge Completion",
      description: "This form is for project maintainers to report completion of Slam26 badges. This may be submitted multiple times to request personal badges for each contributor to the badge. The form should ONLY be submitted by maintainers; other results will be automatically ignored. Organizers will reach out to maintainers via email to confirm the submissions.",
      formDisabled: true,
      formDisabledMessage: "The Spring Security Slam has ended and submissions are now closed. New form coming for fall security slam.",
      hubspot: {
        portalId: "243073831",
        formId: "5523a8f7-f60e-4ac9-8aed-225b6ebfd304",
        region: "na2"
      }
    }
  ],

  pastSlamReports: [
    { href: "https://www.cncf.io/reports/security-slam-2023/", label: "Security Slam 2023" },
    { href: "https://www.cncf.io/reports/lightning-round-at-security-slam-2023/", label: "Lightning Round at Security Slam 2023" },
    { href: "https://www.cncf.io/reports/security-slam-north-america-2022/", label: "Security Slam North America 2022" },
    { href: "https://www.cncf.io/reports/security-slam-2025/", label: "Security Slam 2025" },
    { href: "https://www.cncf.io/reports/slam26-spring-transparency-report/", label: "Slam26 Spring Transparency Report" }
  ]
};
