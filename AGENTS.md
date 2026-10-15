# Agent guide

This file gives coding agents a concise map of the Security Slam website and the conventions that keep its routes and content working. For local setup and user-facing project information, see [README.md](README.md).

## Project overview

The site is built with React, TypeScript, TanStack Start, TanStack Router, and Tailwind CSS. Routes use TanStack's file-based routing in `src/routes/`. Editorial pages are Markdown under `src/content/`; shared, browser-safe presentation data belongs in `src/lib/security-slam-data.ts`.

## Repository map

| Path                            | Purpose                                                                                    |
| ------------------------------- | ------------------------------------------------------------------------------------------ |
| `src/routes/`                   | File-based route modules and the root document/layout.                                     |
| `src/routeTree.gen.ts`          | Generated TanStack route tree; do not edit manually.                                       |
| `src/router.tsx`                | Creates the router and its React Query context.                                            |
| `src/start.ts`                  | TanStack Start request middleware, including error handling and CSRF protection.           |
| `src/server.ts`                 | Server entry and SSR error-response handling.                                              |
| `src/content/`                  | Markdown content and content-specific data modules.                                        |
| `src/lib/content.ts`            | Loads Markdown used by route pages.                                                        |
| `src/lib/security-slam-data.ts` | Browser-safe shared presentation data, such as badges, partner logos, and carousel images. |
| `src/components/`               | Shared site components, document rendering, and UI primitives.                             |
| `src/styles.css`                | Global styles, Tailwind theme tokens, and responsive styles.                               |
| `public/`                       | Static images, logos, badge icons, and other site assets.                                  |
| `vite.config.ts`                | Vite, Tailwind, TanStack Start, React, path aliases, and Nitro build configuration.        |
| `.github/workflows/`            | CI, security baseline, release, and repository automation workflows.                       |

## Routes

Each route module in `src/routes/` uses `createFileRoute`. The current site includes:

| Route module                        | URL                              |
| ----------------------------------- | -------------------------------- |
| `index.tsx`                         | `/`                              |
| `library.index.tsx`                 | `/library`                       |
| `library.$slug.tsx`                 | `/library/:slug`                 |
| `slam26.tsx`                        | `/slam26`                        |
| `slam26.participating-projects.tsx` | `/slam26/participating-projects` |
| `slam26.register.tsx`               | `/slam26/register`               |
| `slam26.submit-completion.tsx`      | `/slam26/submit-completion`      |
| `outcomes.tsx`                      | `/outcomes`                      |
| `outcomes.spring-2026.tsx`          | `/outcomes/spring-2026`          |

Use the documented TanStack file-route naming conventions in `src/routes/README.md`. Add real route modules for new linked paths; do not rely on client-only fallback behavior. Preserve the root route's `<Outlet />` in `src/routes/__root.tsx` so child routes render.

## Content and rendering

- Markdown for library articles and badge pages lives in `src/content/library/`. `src/lib/content.ts` loads it at build time and `src/routes/library.$slug.tsx` renders individual entries.
- `src/content/library/index.md` supplies the library landing content. Other filenames provide route slugs; `badge` frontmatter identifies badge pages and `weight` controls ordering.
- Slam26 pages live in `src/content/slam26/`; past outcomes live in `src/content/outcomes/`.
- Use YAML frontmatter for page metadata such as `title` and `description`. Keep reusable presentation data in browser-safe modules; do not import server-only modules into client-rendered components.
- Render document pages through the shared document layout in `src/components/doc-page.tsx`. Use its optional `sidebar` for badge navigation so badge articles keep the same content rendering and page structure.
- Keep route-specific composition in route modules and share reusable presentation through components in `src/components/`.

## Styling and assets

Use the existing Tailwind theme tokens and shared styles in `src/styles.css`. Prefer existing shared components and UI primitives over duplicate implementations. Store static assets in `public/` and reference them with site-root paths.

## Development and validation

Use the Node.js version specified by `.nvmrc`. Common commands:

```sh
npm ci
npm run dev
npm test
npm run lint
npm run build
npm run preview
```

Run the smallest relevant test or check for a change, then build when route, configuration, or deployment behavior is affected. `npm run typecheck` is referenced by the current CI workflow and contribution guide but is not currently declared in `package.json`; check the scripts before relying on it.

## Build and deployment

`vite.config.ts` enables Nitro with the `cloudflare-module` preset for production builds. `npm run build` writes deployable output under `.output/`; `npm run preview` can be used to inspect a build locally.

The existing `.github/workflows/ci.yaml` and `DEPLOY.md` still describe the former GitHub Pages SPA build, `dist/` artifact, and `404.html` fallback. They do not match the current Nitro output. Do not change the README, CI, or deployment guide to imply those paths work with the current build; update and verify the deployment pipeline as a separate, coordinated change.
