# Security Slam website

[![OSPS Baseline](https://github.com/security-slam/website/actions/workflows/osps-baseline.yaml/badge.svg)](https://github.com/security-slam/website/actions/workflows/osps-baseline.yaml)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/15142/baseline)](https://www.bestpractices.dev/projects/15142/baseline-1)

Source for [securityslam.com](https://securityslam.com/), a React + Vite + TypeScript single-page app. Site settings live in `src/config/site.ts`. Page content lives in Markdown files under `src/content/`. Styling uses CSS variables from `src/theme.tsx`.

To report a bug or submit a change, see [CONTRIBUTING.md](CONTRIBUTING.md). To report a vulnerability, see [SECURITY.md](SECURITY.md). For the project's voluntary CRA (Cyber Resilience Act) readiness checklist, see [CRA-READINESS.md](CRA-READINESS.md).

## Quick start

Use the Node version in `.nvmrc`.

```bash
npm ci
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). `make run` also starts the dev server.

Other scripts:

- `npm run typecheck` runs `tsc --noEmit`.
- `npm run build` builds the site into `dist/`.
- `npm run preview` serves the built `dist/` locally.

## Site config

Edit `src/config/site.ts`. `siteConfig` has these keys:

- **`siteName`**: sets the document title and the header logo alt text.
- **`tagline`**: text shown under the header logo.
- **`preregistrationUrl`** (optional): when set, the footer shows a pre-registration link.
- **`participatingProjectsDefaultTab`** (optional): `"projects"` or `"leaderboard"`. Picks the default tab on content pages that list participating projects.
- **`banner`** (optional): `{ enabled, message, storageKey }`. When `enabled` is true, a dismissible banner appears at the top. `storageKey` is the `localStorage` key that remembers the dismissal.
- **`footer`**: `copyrightText` and `links` (an array of `{ href, label }`).
- **`contentSections`**: a map of section key to `{ enabled, label, inNav }`. See [Content sections](#content-sections).
- **`customNavLinks`** (optional): extra header links as `{ path, label, children }`. `children` renders a dropdown.
- **`contactPages`**: an array of contact pages. See [Contact pages](#contact-pages).
- **`pastSlamReports`**: an array of `{ href, label, description }` links shown on the home page.

### Header navigation

The header always shows a Home link. It then adds each content section where `enabled` is true and `inNav` is not `false`, followed by `customNavLinks`. A section whose path also appears in `customNavLinks` is not repeated.

### Content sections

Each key in `contentSections` maps to a directory under `src/content/<key>/`. When a section is enabled:

- `/<key>` renders the section index. If the directory has an `index.md`, its title, description, and body appear at the top.
- `/<key>/<slug>` renders `src/content/<key>/<slug>.md`.
- A Markdown file with a `path` in its frontmatter is also served at that path.

`src/content/sections.ts` loads these files. Frontmatter fields: `title`, `description`, `path`, `hubspot`, `audioUrl`, `sectionAudio`, and `projects`.

The `library` section is the exception. It has its own pages and loader. See [Adding a library article](#adding-a-library-article).

The site currently configures three sections: `slam26` (enabled), `library` (enabled), and `blog` (disabled, and `src/content/blog/` does not exist yet).

### Contact pages

`contactPages` is an array of:

- **`path`**: URL path, such as `/contact`.
- **`title`**: page heading.
- **`description`** (optional): intro text above the form.
- **`hubspot`** (optional): `{ portalId, formId, region }`. When set, the page embeds that HubSpot form.
- **`formDisabled`** (optional): when true, the page hides the form and shows `formDisabledMessage` instead.

Each entry gets its own route.

## Adding a library article

Library articles are Markdown files in `src/content/library/`. `src/content/library.ts` loads every `.md` file in that directory at build time.

1. Create `src/content/library/<slug>.md`. The filename becomes the URL: `/library/<slug>`.
2. Add frontmatter:

   ```markdown
   ---
   title: "Your article title"
   description: "One-line summary shown on the article card"
   tags: [OSPS Baseline, Helpful Tools]
   image: /project-logos/example.png
   author: Your Name, Your Organization
   weight: 10
   ---

   Article body in Markdown.
   ```

   - `title` is required. Without it the article shows "Untitled".
   - `tags` must be a list. Tags other than badge names appear as filters on `/library`.
   - `image` is a path under `public/`. Put the file there first.
   - `weight` is optional. Lower numbers sort first. Articles without a weight sort last, then alphabetically by title.
   - `videoUrl` is optional. When set, the article embeds an MP4 video player.
3. Write the body in Markdown. The page renders it with `react-markdown` and `remark-gfm`, so GitHub-style tables and task lists work.
4. Run `npm run dev` and open `/library/<slug>` to check it.

To list an article on a badge page, add the badge name to `tags`, for example `tags: [Chronicler]`. The badge page at `/library/chronicler` lists every article tagged `Chronicler`.

Two kinds of files in this directory are not articles:

- `index.md` supplies the title, description, and intro text for `/library`.
- A file with a `badge` field in its frontmatter is a badge page. Badge pages are left out of the article list and show the badge icon from `public/badge-icons/<badge>.png`.

## Theme and global styles

- **`src/theme.tsx`**: defines the single `slam` theme and sets CSS variables (`--gf-color-*`, `--gf-space-*`, and others). Edit the theme object to change colors, spacing, radii, shadows, and typography.
- **`src/global.css`**: reset, layout, base typography, `.slam-theme` overrides, and responsive rules.

## Project structure

```
src/
  config/site.ts       # siteConfig: identity, banner, footer, sections, nav links, contact pages
  content/             # Markdown content and the loaders that read it
    library/           # Library articles and badge pages
    library.ts         # Library loader
    slam26/            # Slam26 section pages
    sections.ts        # Loader for every other content section
  contexts/            # AudioContext for page narration
  theme.tsx            # Theme and CSS variables
  global.css           # Global layout and styles
  App.tsx              # Layout and config-driven routes
  main.tsx             # Entry; sets document title from config
  components/          # Header, Footer, Banner, cards, HubSpotForm, and other shared UI
  pages/               # HomePage, ContactPage, LibraryPage, LibraryArticlePage,
                       # SectionIndexPage, SectionItemPage
```

A blog, if enabled, goes through `SectionIndexPage` and `SectionItemPage` like any other content section.

## Deployment

Run `npm run build` and deploy the `dist/` folder to any static host (e.g. Netlify, Vercel). **For GitHub Pages**, see **[DEPLOY.md](DEPLOY.md)** for base path setup, the included GitHub Actions workflow, SPA routing, and optional custom domain.

## License

- **Code** is licensed under the [Apache License 2.0](LICENSE).
- **Written content**, the Markdown files under `src/content/library/` and `src/content/slam26/`, is licensed under [Creative Commons Attribution 4.0 International](LICENSE-CONTENT) (CC-BY-4.0).
- **Third-party images**, such as the project logos, sponsor logos, and maintainer photos under `public/`, belong to their owners and are not covered by either license.
