import matter from "gray-matter";

export type SectionItemHubSpot = {
  portalId: string;
  formId: string;
  region: string;
};

export type ProjectInfo = {
  name: string;
  advisor: string;
  repoUrl: string;
  logoUrl: string;
  completed?: string[];
};

export type SectionItem = {
  slug: string;
  title: string;
  description?: string;
  path?: string;
  /** When set, the section item page renders a HubSpot form (e.g. for registration). */
  hubspot?: SectionItemHubSpot;
  /** Full page audio narration URL */
  audioUrl?: string;
  /** Section audio narration URLs keyed by section header text */
  sectionAudio?: Record<string, string>;
  /** List of participating projects */
  projects?: ProjectInfo[];
  /** Badge slugs to show on the leaderboard; defaults to every library badge page. Set on archived pages. */
  badges?: string[];
  body: string;
};

type Frontmatter = {
  title: string;
  description?: string;
  path?: string;
  hubspot?: SectionItemHubSpot;
  audioUrl?: string;
  sectionAudio?: Record<string, string>;
  projects?: ProjectInfo[];
  badges?: string[];
};

const rawModules = import.meta.glob("./*/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});

function slugFromPath(filePath: string): string {
  const base = filePath.split("/").pop() ?? filePath;
  return base.replace(/\.md$/, "");
}

function getRawContent(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "default" in value) return String((value as { default: unknown }).default);
  return "";
}

function sectionFromPath(filePath: string): string {
  const parts = filePath.split("/");
  return parts[1] ?? "";
}

const bySection: Record<string, SectionItem[]> = {};

for (const [path, raw] of Object.entries(rawModules)) {
  const section = sectionFromPath(path);
  if (!section) continue;
  const rawString = getRawContent(raw);
  const { data, content } = matter(rawString);
  const fm = data as Frontmatter;
  const slug = slugFromPath(path);
  const item: SectionItem = {
    slug,
    title: fm.title ?? "Untitled",
    description: fm.description,
    path: fm.path,
    hubspot: fm.hubspot,
    audioUrl: fm.audioUrl,
    sectionAudio: fm.sectionAudio,
    projects: fm.projects,
    badges: fm.badges,
    body: content
  };
  if (!bySection[section]) bySection[section] = [];
  bySection[section].push(item);
}

for (const arr of Object.values(bySection)) {
  arr.sort((a, b) => (a.path ?? a.slug).localeCompare(b.path ?? b.slug));
}

export function getSectionItems(sectionName: string): SectionItem[] {
  return bySection[sectionName] ?? [];
}

/** Section landing page: item from index.md in the section directory, if present. */
export function getSectionIndexItem(sectionName: string): SectionItem | undefined {
  return getSectionItems(sectionName).find((item) => item.slug === "index");
}

/** Section items to list as links (all items except index.md). */
export function getSectionListItems(sectionName: string): SectionItem[] {
  return getSectionItems(sectionName).filter((item) => item.slug !== "index");
}

export function getSectionItemBySlug(sectionName: string, slug: string): SectionItem | undefined {
  return getSectionItems(sectionName).find((item) => item.slug === slug);
}

export function getSectionItemByPath(sectionName: string, path: string): SectionItem | undefined {
  return getSectionItems(sectionName).find((item) => item.path === path);
}
