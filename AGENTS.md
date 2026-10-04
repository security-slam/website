# Agent index: security-slam

This document is an index of the repository for AI agents. It describes the intent of each file and directory so agents can navigate and modify the codebase correctly.

## Project overview

React + Vite + TypeScript single-page app for [securityslam.com](https://securityslam.com/). Site settings come from **`src/config/site.ts`**. Page content comes from Markdown files under **`src/content/`**, parsed at build time with `gray-matter`. Styling uses CSS variables from **`src/theme.tsx`**. Routes: home, the library (`/library`, `/library/:slug`), each enabled content section (`/<key>`, `/<key>/:slug`, and frontmatter `path`s), and each contact page.

---

## Root

| File / directory | Intent |
|------------------|--------|
| **`index.html`** | HTML shell: root `<div id="root">`, viewport and theme-color metas, description and Open Graph tags for link previews, document title. Vite entry; `main.tsx` is loaded as module. |
| **`package.json`** | Dependencies (React 19, react-router-dom 7, react-markdown, remark-gfm, gray-matter, buffer; dev: Vite 8, TypeScript 7) and scripts: `dev`, `build`, `preview`, `typecheck`. |
| **`.nvmrc`** | Node version used by CI, deploy, and local development. |
| **`Makefile`** | `make run` starts the dev server (`npm run dev`). |
| **`vite.config.ts`** | Vite config: React SWC plugin, `base: "/"`, build output `dist/`. Change `base` for GitHub Pages project sites (see DEPLOY.md). |
| **`tsconfig.json`** | TypeScript compiler options for the project. |
| **`.gitignore`** | Git ignore rules (e.g. `node_modules`, `dist`). |
| **`README.md`** | Human-facing docs: quick start, `siteConfig` keys, content sections, contact pages, adding a library article, theme, project structure, deployment pointer, licensing. |
| **`CONTRIBUTING.md`** | How to report bugs and submit changes (PR against `main`, required `build` check). |
| **`SECURITY.md`** | Vulnerability reporting through GitHub private vulnerability reporting; security contact. |
| **`DEPLOY.md`** | Deployment guide: GitHub Pages base path, SPA routing (404 fallback), GitHub Actions workflow, optional custom domain. |
| **`BANNER-INSTRUCTIONS.md`** | How to enable, edit, and reset the site banner (`siteConfig.banner`). |
| **`LICENSE`** / **`LICENSE-CONTENT`** | Apache-2.0 for code; CC-BY-4.0 for Markdown content under `src/content/library/` and `src/content/slam26/`. |
| **`security-insights.yml`** | OpenSSF Security Insights v2 metadata. Validate with `cue vet` against the schema for its `schema-version`. |
| **`threat-catalog.yaml`** / **`capability-catalog.yaml`** | Gemara threat and capability catalogs for the site's self-assessment. |
| **`public/`** | Static assets served from the site root: badge icons, logos, project logos, library images, maintainer photos. |

---

## `.github/` — CI/CD

| Path | Intent |
|------|--------|
| **`.github/workflows/ci.yaml`** | GitHub Actions workflow: on PRs, pushes to `main`, and manual runs, the `build` job installs with Node from `.nvmrc` (`npm ci --ignore-scripts`), runs `npm run typecheck` and `npm run build`, and copies `index.html` → `404.html` for SPA routing. On `main` it also uploads `dist/` as the Pages artifact and the `deploy` job publishes it. `build` is the required status check. |
| **`.github/workflows/mark-ready-when-ready.yaml`** | Runs `kenyonj/mark-ready-when-ready`: a same-repo draft PR labeled `mark-ready-when-ready` is marked ready for review once its checks pass, and the label is removed. |
| **`.github/workflows/osps-baseline.yaml`** | Weekly, on pushes to `main`, and on manual runs: scans the repo against the OSPS Baseline (`osps-baseline-2026-08` catalog) with `revanite-io/osps-baseline-action`, uploads failed controls as SARIF, and uploads results as an artifact. Uses an octo-sts token, never runs on pull requests. |
| **`.github/chainguard/osps-baseline.sts.yaml`** | octo-sts trust policy: issues a read-only token only to `osps-baseline.yaml` running on `main`. octo-sts reads it from the default branch. |
| **`.github/dependabot.yml`** | Weekly Dependabot updates for npm and GitHub Actions, minor/patch grouped, 7-day cooldown. |
| **`.github/CODEOWNERS`** | All files owned by `@security-slam/developers`. |

---

## `src/` — Application source

| Path | Intent |
|------|--------|
| **`main.tsx`** | App entry: imports `polyfills.ts` first, sets document title from `siteConfig.siteName`, mounts React root, wraps app in `ThemeProvider`, imports `global.css`. |
| **`polyfills.ts`** | Sets `globalThis.Buffer` so `gray-matter` works in the browser. |
| **`App.tsx`** | Root layout and routing: applies `useTheme()`, wraps in `AudioProvider` and `BrowserRouter`, renders `BackgroundArcs`, optional `Banner`, `Header`, main, `Footer`. Routes: `/` (HomePage); `/library` and `/library/:slug` (LibraryPage, LibraryArticlePage) when `contentSections.library` is enabled; for every other enabled content section, `/<key>` (SectionIndexPage), each item's frontmatter `path`, and `/<key>/:slug` (SectionItemPage); each `contactPages` path (ContactPage); catch-all redirect to `/`. All routes except `/` are gated behind the dev-preview flag (see `DevConsole.tsx`). |
| **`theme.tsx`** | Theme system: `AppTheme` type, the single `slam` theme object (colors, radii, shadows, spacing, typography), `ThemeProvider` that injects CSS variables (`--gf-color-*`, `--gf-space-*`, etc.), `useTheme()` hook. Edit here to change look site-wide. |
| **`global.css`** | Global styles: reset, layout, base typography, `.slam-theme` overrides, responsive rules. |
| **`vite-env.d.ts`** | TypeScript reference for Vite client types (e.g. `import.meta`). |

---

### `src/config/`

| Path | Intent |
|------|--------|
| **`site.ts`** | **Single source of truth** for site settings. Types: `FooterLink`, `HubSpotConfig`, `ContactPageConfig`, `ContentSectionConfig`, `NavLink`, `BannerConfig`, `SiteConfig`. `siteConfig` keys: `siteName`, `tagline`, `preregistrationUrl?`, `participatingProjectsDefaultTab?`, `banner?`, `footer`, `contentSections`, `customNavLinks?`, `contactPages`. Header nav is a fixed Home link, then enabled content sections with `inNav !== false`, then `customNavLinks`. |

---

### `src/content/`

| Path | Intent |
|------|--------|
| **`library.ts`** | Loads every `library/**/*.md` with `gray-matter`. Slug is the filename. Frontmatter: `title`, `description`, `tags`, `badge`, `image`, `author`, `weight`, `videoUrl`, `aliases` (former slugs, redirected in `App.tsx`). Exports `libraryIndex` (from `index.md`), `libraryArticles` (excludes `index` and any file with `badge`, sorted by `weight` then title), `getLibraryArticle`, `getAllTags`, `getArticlesByTag`. |
| **`library/`** | Library Markdown. `index.md` is the `/library` intro. Files with `badge:` are badge pages (`chronicler.md`, `cleaner.md`, `cra-readiness.md`, `defender.md`, `inspector.md`, `mechanizer.md`). Everything else is an article at `/library/<filename>`. |
| **`sections.ts`** | Loads `*/**/*.md` and groups by directory name (the section key). Frontmatter: `title`, `description`, `path`, `hubspot`, `audioUrl`, `sectionAudio`, `projects`, `badges`. Exports `getSectionItems`, `getSectionIndexItem`, `getSectionListItems`, `getSectionItemBySlug`, `getSectionItemByPath`. |
| **`slam26/`** | Slam26 section Markdown: `index.md`, `participating-projects.md`, `register.md`. |
| **`outcomes/`** | Previous Outcomes section: `index.md` links past transparency reports; one archive page per finished Slam (e.g. `spring-2026.md`) with the final `projects` list and a `badges` list of the slugs that Slam used. |
| **`carousel.ts`** | Image list for the home page carousel (`public/slam-photos/`). |
| **`sponsorLogos.ts`** | Logo list for the home page logo bar (`public/logo/sponsor-logos/`). |

---

### `src/contexts/`

| Path | Intent |
|------|--------|
| **`AudioContext.tsx`** | `AudioProvider` and `useAudio()`: shared state so only one narration plays at a time. |

---

### `src/components/`

| Path | Intent |
|------|--------|
| **`Header.tsx`** | Site header: logo (alt text from `siteName`), tagline, nav from a fixed Home link, enabled content sections (`inNav !== false`), and `customNavLinks` (with dropdowns for `children` that close on outside click or Escape); active-state styling via `useLocation()`. Layout and hover styles live in `global.css` (`.site-header*`, `.site-nav*`). Optional button to re-show a dismissed banner. |
| **`Footer.tsx`** | Site footer: optional pre-registration link (`preregistrationUrl`), copyright, and links from `siteConfig.footer`. |
| **`Banner.tsx`** | Dismissible top banner driven by `siteConfig.banner`. |
| **`DevConsole.tsx`** | Backtick-toggled terminal overlay. Typing `dev-preview` + Enter sets the `dev-preview` localStorage flag, `disable-preview` clears it; `App.tsx` redirects every route except `/` to home until it is set. |
| **`BackgroundArcs.tsx`** | Full-viewport decorative background (static SVG arcs); no interaction, low z-index. |
| **`ScrollToTop.tsx`** | Scrolls to top on route change. |
| **`TextSection.tsx`** | Reusable content block: title, subtitle, list of paragraphs; props for centering, text shadow, max width, last paragraph margin, and `titleTag` (`h1` on the home hero). |
| **`SectionCard.tsx`** | Card component: title, optional description; used for section and library listings. |
| **`Carousel.tsx`** | Image carousel on the home page. |
| **`PartnerLogos.tsx`** | Static side-by-side partner logos on the home page, from `sponsorLogos`. |
| **`LogoBar.tsx`** | Auto-scrolling sponsor logo marquee. Not currently rendered; kept for when there are more logos than fit in a row. |
| **`BadgeNavigation.tsx`** | Row of badge icons linking to `/library/<badge>`. |
| **`LibraryArticleList.tsx`** | Library article grid with a tag filter (non-badge tags) driven by the `tag` query param. |
| **`ProjectCard.tsx`** / **`Leaderboard.tsx`** | Participating project display for section items with `projects` frontmatter. |
| **`AudioPlayer.tsx`** | Narration player for `audioUrl` and `sectionAudio`. |
| **`HubSpotForm.tsx`** | Embeds a HubSpot form from `portalId`, `formId`, `region`. Used by ContactPage and SectionItemPage. |
| **`markdownComponents.tsx`** | `react-markdown` component overrides shared by Markdown-rendering pages. |

---

### `src/pages/`

| Path | Intent |
|------|--------|
| **`HomePage.tsx`** | Landing page: carousel, hero text, registration, partner logos, How the Slam works, and the badge row. Past reports live under `/outcomes`. |
| **`LibraryPage.tsx`** | `/library`: `libraryIndex` intro, badge navigation, and the filterable article list. |
| **`LibraryArticlePage.tsx`** | `/library/:slug`: one library article or badge page. Badge pages show the badge icon, a submit-completion link, and articles tagged with the badge name. |
| **`SectionIndexPage.tsx`** | `/<key>` for a non-library content section: `index.md` content plus cards for the other items. |
| **`SectionItemPage.tsx`** | One content section item, found by slug or frontmatter `path`. Renders Markdown, optional HubSpot form, optional projects or leaderboard. |
| **`ContactPage.tsx`** | Finds the `siteConfig.contactPages` entry for the current path; renders title, description, and the HubSpot form or `formDisabledMessage`. |

---

## Conventions for agents

- **Content and structure**: Change **`src/config/site.ts`** for identity, banner, footer, content sections, nav links, and contact pages. Add pages as Markdown under **`src/content/<section>/`** rather than hardcoding them in components.
- **Library articles**: Add `src/content/library/<slug>.md` with frontmatter. See README "Adding a library article".
- **Styling**: Use theme variables from **`theme.tsx`** (e.g. `var(--gf-color-accent)`) and global rules in **`global.css`**. New components should rely on these rather than ad-hoc colors/spacing.
- **Routes**: Enabled content sections and contact pages get routes automatically. A net-new page type needs a `Route` in **`App.tsx`**.
- **Build/deploy**: `npm run build` → `dist/`. Every push to `main` deploys to GitHub Pages. For GitHub Pages project sites, set `base` in **`vite.config.ts`** and follow **DEPLOY.md**.
