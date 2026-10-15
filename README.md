# Security Slam website

[![OSPS Baseline](https://github.com/security-slam/website/actions/workflows/osps-baseline.yaml/badge.svg)](https://github.com/security-slam/website/actions/workflows/osps-baseline.yaml)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/15142/baseline)](https://www.bestpractices.dev/projects/15142/baseline-1)

Source for [securityslam.com](https://securityslam.com/), built with TanStack Start, React, TypeScript, and Tailwind CSS. TanStack Start provides file-based routing and server rendering; shared presentation data lives in browser-safe modules, and editorial content is written in Markdown under `src/content/`.

To report a bug or submit a change, see [CONTRIBUTING.md](CONTRIBUTING.md). To report a vulnerability, see [SECURITY.md](SECURITY.md). For the project's voluntary CRA (Cyber Resilience Act) readiness checklist, see [CRA-READINESS.md](CRA-READINESS.md).

## Quick start

Use the Node.js version in `.nvmrc` (Node.js 24) and npm:

```bash
npm ci
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Available scripts

- `npm run dev` starts the local development server.
- `npm run build` creates the production build with Vite and Nitro.
- `npm run preview` previews the production build locally.
- `npm test` runs the test suite.
- `npm run lint` runs ESLint.
- `npm run build:dev` builds using Vite's development mode.

## Routes and content

TanStack Start uses file-based routing. Add or update route modules in `src/routes/`; `src/routeTree.gen.ts` is generated and should not be edited by hand.

The current site includes:

- `/` — Security Slam 2026 homepage.
- `/library` and `/library/$slug` — badges and resource articles.
- `/slam26` and its nested pages — event information, registration, participating projects, and badge completion.
- `/outcomes` and `/outcomes/spring-2026` — previous Slam outcomes.

Most editorial content is Markdown in `src/content/`:

- `src/content/library/` contains the Slam Library index, badge pages, and articles.
- `src/content/slam26/` contains Security Slam 2026 pages.
- `src/content/outcomes/` contains previous outcomes.

Markdown files use YAML frontmatter. For example:

```markdown
---
title: "Cleaner Badge"
description: "Complete Security Insights YAML documentation for the project"
badge: "Cleaner"
weight: 1
---

Article content in Markdown.
```

Library filenames determine their slugs (for example, `src/content/library/cleaner.md` is available at `/library/cleaner`). The `index.md` file supplies the library landing-page content. A `badge` field marks a badge page; `weight` controls its display order. Articles can also use fields such as `image`, `author`, `videoUrl`, and `aliases`.

Set `youtubeId` in `src/content/slam26/index.md` to embed a YouTube video at the top of `/slam26`.

The content loaders are in `src/lib/content.ts`. Route-specific pages read their Markdown data there and render it through the shared document components in `src/components/`.

## Styling and shared data

- `src/styles.css` defines the global styles, Tailwind theme tokens, and responsive design.
- `src/lib/security-slam-data.ts` contains shared, browser-safe presentation data such as badge details, navigation items, carousel images, and partner logos.
- `src/components/` contains reusable site components and UI primitives.
- `public/` contains static assets such as images, logos, and badge icons.

## Project structure

```text
src/
  routes/                 # TanStack Start file-based routes
  components/             # Shared page components and UI
  content/                # Markdown pages and resources
  lib/
    content.ts            # Markdown content loader
    security-slam-data.ts # Browser-safe presentation data
  styles.css              # Global styles and Tailwind theme
  router.tsx              # TanStack Router setup
  start.ts                # TanStack Start middleware and CSRF setup
  server.ts               # Server entry and SSR error handling
public/                   # Static site assets
```

## Build and deployment

Run `npm run build` to create the production build. The Vite configuration uses Nitro's Cloudflare module preset; generated deployment output is written under `.output/`. Use `npm run preview` to inspect a production build locally. Deploy the generated Nitro output using the deployment process for the configured Cloudflare target.

The existing GitHub Pages workflow and `DEPLOY.md` still describe the previous SPA artifact path; they do not yet match this Nitro output. Update those deployment instructions before relying on the Pages workflow.

## License

- **Code** is licensed under the [Apache License 2.0](LICENSE).
- **Written content** in `src/content/library/` and `src/content/slam26/` is licensed under [Creative Commons Attribution 4.0 International](LICENSE-CONTENT) (CC-BY-4.0).
- **Third-party images**, including project logos, sponsor logos, and maintainer photos under `public/`, belong to their owners and are not covered by either license.
