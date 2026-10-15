import { parse } from "yaml";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Doc = { slug: string; data: any; body: string };

const raw = import.meta.glob("/src/content/**/*.md", { query: "?raw", import: "default", eager: true }) as Record<string, string>;

function parseDoc(path: string, text: string): Doc {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const data = m ? (parse(m[1] ?? "") ?? {}) : {};
  return { slug: path.replace("/src/content/", "").replace(/\.md$/, ""), data, body: m ? (m[2] ?? "") : text };
}

const docs = Object.entries(raw).map(([p, t]) => parseDoc(p, t));

export function getDoc(slug: string): Doc | undefined {
  return docs.find((d) => d.slug === slug);
}

export const libraryArticles = docs
  .filter((d) => d.slug.startsWith("library/") && d.slug !== "library/index")
  .map((d) => ({ ...d, slug: d.slug.replace("library/", "") }))
  .sort((a, b) => (a.data.weight ?? 99) - (b.data.weight ?? 99) || String(a.data.title).localeCompare(String(b.data.title)));

export function getArticle(slug: string) {
  return libraryArticles.find((a) => a.slug === slug || (a.data.aliases ?? []).includes(slug));
}
