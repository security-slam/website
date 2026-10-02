import matter from "gray-matter";

export type LibraryArticle = {
  slug: string;
  title: string;
  description?: string;
  tags: string[];
  badge?: string;
  image?: string;
  author?: string;
  weight?: number;
  videoUrl?: string;
  body: string;
};

export type LibraryIndex = {
  title: string;
  description?: string;
  body: string;
};

type Frontmatter = {
  title: string;
  description?: string;
  tags: string[];
  badge?: string;
  image?: string;
  author?: string;
  weight?: number;
  videoUrl?: string;
};

const rawModules = import.meta.glob("./library/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true
});

function slugFromPath(path: string): string {
  const base = path.split("/").pop() ?? path;
  return base.replace(/\.md$/, "");
}

function getRawContent(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "default" in value) return String((value as { default: unknown }).default);
  return "";
}

const allItems: LibraryArticle[] = Object.entries(rawModules).map(
  ([path, raw]) => {
    const rawString = getRawContent(raw);
    const { data, content } = matter(rawString);
    const fm = data as Frontmatter;
    return {
      slug: slugFromPath(path),
      title: fm.title ?? "Untitled",
      description: fm.description,
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      badge: fm.badge,
      image: fm.image,
      author: fm.author,
      weight: fm.weight,
      videoUrl: fm.videoUrl,
      body: content
    };
  }
);

export const libraryIndex: LibraryIndex | undefined = (() => {
  const indexItem = allItems.find((a) => a.slug === "index");
  if (!indexItem) return undefined;
  return {
    title: indexItem.title,
    description: indexItem.description,
    body: indexItem.body
  };
})();

/** Badge (objective) pages, in display order. Set `weight` in frontmatter to order them. */
export const badgePages: LibraryArticle[] = allItems
  .filter((a) => a.badge)
  .sort((a, b) => (a.weight ?? Infinity) - (b.weight ?? Infinity));

export const libraryArticles: LibraryArticle[] = allItems
  .filter((a) => a.slug !== "index" && !a.badge)
  .sort((a, b) => {
    // Sort by weight first (lower numbers first, undefined goes to end)
    const weightA = a.weight ?? Infinity;
    const weightB = b.weight ?? Infinity;
    if (weightA !== weightB) {
      return weightA - weightB;
    }
    // Tiebreaker: alphabetical by title
    return a.title.localeCompare(b.title);
  });

export function getLibraryArticle(slug: string): LibraryArticle | undefined {
  return allItems.find((a) => a.slug === slug && a.slug !== "index");
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const a of libraryArticles) {
    for (const t of a.tags) set.add(t);
  }
  return Array.from(set).sort();
}

export function getArticlesByTag(tag: string): LibraryArticle[] {
  return libraryArticles
    .filter((a) => a.tags.includes(tag))
    .sort((a, b) => {
      // Sort by weight first (lower numbers first, undefined goes to end)
      const weightA = a.weight ?? Infinity;
      const weightB = b.weight ?? Infinity;
      if (weightA !== weightB) {
        return weightA - weightB;
      }
      // Tiebreaker: alphabetical by title
      return a.title.localeCompare(b.title);
    });
}
