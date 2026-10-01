# Website template

A config-driven React + Vite + TypeScript website template with a front page, blog, secondary article pages, and one or more HubSpot contact pages. Content and navigation are controlled from a single config file; styling uses CSS variables from a theme module.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Build for production with `npm run build`; output is in `dist/`.

## Customization

### Site identity and navigation

Edit **`src/config/site.ts`**:

- **`siteName`** and **`tagline`** — Used in the header hero and document title.
- **`nav`** — Array of `{ path, label }` for main navigation (e.g. Home, Blog, About, Contact). Add or remove entries; routes are generated from this and the other config arrays.
- **`footer`** — `copyrightText` and `links` (array of `{ href, label }`).

### Blog

In **`src/config/site.ts`**:

- **`blog.enabled`** — Set to `false` to hide blog routes and nav.
- **`blog.posts`** — Array of `{ slug, title, date, excerpt, body }`. Use `body` as plain HTML (e.g. `<p>...</p>`). Add or remove posts here; the blog index and post pages read from this. You can later switch to markdown by adding a loader (e.g. `vite-plugin-md` or `react-markdown`) and sourcing posts from files.

### Secondary articles (non-blog)

In **`src/config/site.ts`**, **`articles`** is an array of `{ path, title, body }`. Each `path` (e.g. `/about`, `/terms`) gets its own route and page. Use for About, Terms, Privacy, or any static content. Add the same paths to **`nav`** if you want them in the header.

### Contact pages and HubSpot forms

In **`src/config/site.ts`**, **`contactPages`** is an array of:

- **`path`** — URL path (e.g. `/contact`).
- **`title`** — Page heading.
- **`description`** — Optional intro text above the form.
- **`hubspot`** — Optional. When present, the page renders a HubSpot form:
  - **`portalId`** — Your HubSpot portal ID.
  - **`formId`** — The form’s GUID.
  - **`region`** — Hub region (e.g. `na1`, `eu1`).

Add multiple contact pages (e.g. `/contact`, `/apply`) with different titles and forms. Include each path in **`nav`** if desired. Replace the placeholder portal/form IDs in the template with your own; you can override HubSpot’s default styles in **`src/global.css`** or with scoped CSS if needed.

### Theme and global styles

- **`src/theme.tsx`** — Single default theme (cyan-style) that sets CSS variables (`--gf-color-*`, `--gf-space-*`, etc.). Edit the theme object to change colors, spacing, radii, shadows, and typography. The layout and components use these variables.
- **`src/global.css`** — Reset, layout, and base typography. Use it for theme-specific overrides (e.g. `.cyan-theme`) and responsive rules.

## Project structure

```
src/
  config/site.ts     # Site identity, nav, footer, blog, articles, contact pages
  theme.tsx          # Theme and CSS variables
  global.css         # Global layout and styles
  App.tsx            # Layout and config-driven routes
  main.tsx           # Entry; sets document title from config
  components/        # Header, Footer, BackgroundArcs, TextSection, SectionCard, HubSpotForm
  pages/             # HomePage, BlogIndexPage, BlogPostPage, ArticlePage, ContactPage
```

## Deployment

Run `npm run build` and deploy the `dist/` folder to any static host (e.g. Netlify, Vercel). **For GitHub Pages**, see **[DEPLOY.md](DEPLOY.md)** for base path setup, the included GitHub Actions workflow, SPA routing, and optional custom domain.

## License

- **Code** is licensed under the [Apache License 2.0](LICENSE).
- **Written content**, the Markdown files under `src/content/library/` and `src/content/slam26/`, is licensed under [Creative Commons Attribution 4.0 International](LICENSE-CONTENT) (CC-BY-4.0).
- **Third-party images**, such as the project logos, sponsor logos, and maintainer photos under `public/`, belong to their owners and are not covered by either license.
