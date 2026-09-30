# Agent index: security-slam

This document is an index of the repository for AI agents. It describes the intent of each file and directory so agents can navigate and modify the codebase correctly.

## Project overview

Config-driven React + Vite + TypeScript website with a front page, blog, secondary article pages, and optional HubSpot contact pages. Content and navigation are driven by **`src/config/site.ts`**; styling uses CSS variables from **`src/theme.tsx`**. Routes are generated from config (home, blog index/post, articles, contact pages).

---

## Root

| File / directory | Intent |
|------------------|--------|
| **`index.html`** | HTML shell: root `<div id="root">`, viewport meta, document title placeholder. Vite entry; `main.tsx` is loaded as module. |
| **`package.json`** | Dependencies (React 19, react-router-dom 7, Vite 7) and scripts: `dev`, `build`, `preview`, `typecheck`. |
| **`.nvmrc`** | Node version used by CI, deploy, and local development. |
| **`vite.config.ts`** | Vite config: React SWC plugin, `base: "/"`, build output `dist/`. Change `base` for GitHub Pages project sites (see DEPLOY.md). |
| **`tsconfig.json`** | TypeScript compiler options for the project. |
| **`.gitignore`** | Git ignore rules (e.g. `node_modules`, `dist`). |
| **`README.md`** | Human-facing docs: quick start, customization (site config, blog, articles, contact, theme), project structure, deployment pointer. |
| **`DEPLOY.md`** | Deployment guide: GitHub Pages base path, SPA routing (404 fallback), GitHub Actions workflow, optional custom domain. |

---

## `.github/` — CI/CD

| Path | Intent |
|------|--------|
| **`.github/workflows/ci.yaml`** | GitHub Actions workflow: on PRs, pushes to `main`, and manual runs, the `build` job installs with Node from `.nvmrc` (`npm ci --ignore-scripts`), runs `npm run typecheck` and `npm run build`, and copies `index.html` → `404.html` for SPA routing. On `main` it also uploads `dist/` as the Pages artifact and the `deploy` job publishes it. `build` is the required status check. |
| **`.github/dependabot.yml`** | Weekly Dependabot updates for npm and GitHub Actions, minor/patch grouped, 7-day cooldown. |
| **`.github/CODEOWNERS`** | All files owned by `@security-slam/developers`. |

---

## `src/` — Application source

| Path | Intent |
|------|--------|
| **`main.tsx`** | App entry: mounts React root, sets document title from `siteConfig.siteName`, wraps app in `ThemeProvider`, imports `global.css`. |
| **`App.tsx`** | Root layout and routing: applies `useTheme()`, `BrowserRouter`, layout (header, main, footer), `BackgroundArcs`. Declares all `Routes` from config: `/` (HomePage), optional `/blog` and `/blog/:slug`, `articles` paths (ArticlePage), `contactPages` paths (ContactPage), catch-all redirect to `/`. |
| **`theme.tsx`** | Theme system: `AppTheme` type, default cyan theme object (colors, radii, shadows, spacing, typography), `ThemeProvider` that injects CSS variables (`--gf-color-*`, `--gf-space-*`, etc.), `useTheme()` hook. Edit here to change look site-wide. |
| **`global.css`** | Global styles: reset, layout, base typography, theme overrides (e.g. `.cyan-theme`), responsive rules. |
| **`vite-env.d.ts`** | TypeScript reference for Vite client types (e.g. `import.meta`). |

---

### `src/config/`

| Path | Intent |
|------|--------|
| **`site.ts`** | **Single source of truth** for site content and structure: types (`FooterLink`, `HubSpotConfig`, `ContactPageConfig`, `BlogConfig`, `ContentSectionConfig`, `SiteConfig`) and exported `siteConfig` (siteName, tagline, footer, blog, contentSections, contactPages). Header nav is derived from a fixed Home link plus enabled content sections (inNav). Edit this file to change identity, footer, content sections, and contact pages/forms without touching component logic. |

---

### `src/components/`

| Path | Intent |
|------|--------|
| **`Header.tsx`** | Site header: hero with site name and tagline from config, nav links from a fixed Home link plus `siteConfig.contentSections` (enabled, inNav) with active-state styling via `useLocation()`. |
| **`Footer.tsx`** | Site footer: copyright and links from `siteConfig.footer`. |
| **`BackgroundArcs.tsx`** | Full-viewport decorative background (fixed SVG arcs); no interaction, low z-index. |
| **`TextSection.tsx`** | Reusable content block: title, subtitle, list of paragraphs; props for centering, text shadow, max width, last paragraph margin. Used on home and elsewhere. |
| **`SectionCard.tsx`** | Card component: title, optional description, optional link; used for home-page section tiles. |
| **`HubSpotForm.tsx`** | Embeds a HubSpot form: accepts `portalId`, `formId`, `region`; loads HubSpot script and renders form container. Used by ContactPage when a contact page has `hubspot` config. |

---

### `src/pages/`

| Path | Intent |
|------|--------|
| **`HomePage.tsx`** | Landing page: `TextSection` hero plus grid of `SectionCard`s (e.g. Blog, About, Contact) linking to routes. Content is currently hardcoded; can be moved to config later. |
| **`BlogIndexPage.tsx`** | Blog listing: reads `siteConfig.blog.posts`, renders list with links to `/blog/:slug`. Shown only when `blog.enabled` is true. |
| **`BlogPostPage.tsx`** | Single post: uses `useParams()` for `slug`, finds post in `siteConfig.blog.posts`, renders title, date, and body (HTML). 404-style handling if slug missing. |
| **`ArticlePage.tsx`** | Static article: uses `useLocation().pathname` to find matching entry in `siteConfig.articles`, renders title and body (HTML). For About, Terms, Privacy, etc. |
| **`ContactPage.tsx`** | Contact page: uses current path to find entry in `siteConfig.contactPages`, renders title, optional description, and optional `HubSpotForm` when `hubspot` is set. |

---

## Conventions for agents

- **Content and structure**: Prefer changing **`src/config/site.ts`** for footer, content sections, and contact pages. Header nav is controlled by content sections (enabled, inNav); add or adjust content sections in site config to change nav. Avoid hardcoding the same in components unless adding a net-new concept.
- **Styling**: Use theme variables from **`theme.tsx`** (e.g. `var(--gf-color-accent)`) and global rules in **`global.css`**. New components should rely on these rather than ad-hoc colors/spacing.
- **Routes**: New routes require both a `Route` in **`App.tsx`** and corresponding config (e.g. `contentSections`, `contactPages`).
- **Build/deploy**: `npm run build` → `dist/`. For GitHub Pages project sites, set `base` in **`vite.config.ts`** and follow **DEPLOY.md** (including 404 handling; the workflow already copies `index.html` to `404.html`).
