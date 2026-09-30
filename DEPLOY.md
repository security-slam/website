# Deploying to GitHub Pages

This project is a single-page app (SPA) with client-side routing. To run it on GitHub Pages you need to:

1. Set the correct **base path** (so assets load under `https://<user>.github.io/<repo>/`).
2. Serve **`index.html` for all routes** so the SPA handles `/blog`, `/about`, etc. (GitHub Pages does not do this by default; the workflow below copies `index.html` to `404.html` so missing paths fall back to the app).

## 1. Set the base path

For a **project site** (e.g. `https://<username>.github.io/security-slam/`), the app must be served under the repo name.

Edit **`vite.config.ts`** and set `base` to your repository path (leading and trailing slashes):

```ts
export default defineConfig({
  plugins: [react()],
  base: "/security-slam/",   // Use your actual repo name
  build: {
    outDir: "dist"
  }
});
```

If the repo is `my-website`, use `base: "/my-website/"`.

For a **user or organization site** (e.g. `https://<username>.github.io/`), use `base: "/"` and skip the trailing path in the URL when opening the site.

## 2. Deploy with GitHub Actions (recommended)

A workflow is included that builds the app and deploys the `dist/` folder to GitHub Pages.

1. **Push the repo** (including `.github/workflows/ci.yaml`) to GitHub.

2. **Enable GitHub Pages** in the repo:
   - **Settings** → **Pages**.
   - Under **Build and deployment**, set **Source** to **GitHub Actions**.

3. **Trigger a deploy**: push to the default branch (e.g. `main`) or run the **CI** workflow from the **Actions** tab. Pull requests run the `build` job only; deploys happen from `main`.

4. After the run finishes, the site is available at:
   - Project site: `https://<username>.github.io/<repo>/`
   - User/org site: `https://<username>.github.io/`

The workflow:

- Uses the Node version in `.nvmrc`, runs `npm ci --ignore-scripts`, `npm run typecheck`, and `npm run build`.
- Copies `dist/index.html` to `dist/404.html` so unknown paths (e.g. `/blog/welcome`) return the SPA and React Router can handle them.
- Uploads `dist/` as the Pages artifact and deploys via `deploy-pages`.

## 3. Manual deploy (alternative)

If you prefer not to use Actions:

1. Set `base` in `vite.config.ts` as in step 1.

2. Build locally:
   ```bash
   npm run build
   ```

3. Copy the SPA fallback so routing works:
   ```bash
   cp dist/index.html dist/404.html
   ```

4. Deploy the contents of `dist/`:
   - **Option A**: Push `dist/` to a `gh-pages` branch (e.g. with [gh-pages](https://www.npmjs.com/package/gh-pages): `npx gh-pages -d dist`).
   - **Option B**: In **Settings** → **Pages**, choose **Deploy from a branch**, select the branch and the folder that contains `dist/` (e.g. `/ (root)` if you push only the built files).

5. In **Settings** → **Pages**, set the branch (and folder) to the one that holds the built site.

## 4. Custom domain (optional)

To use a custom domain (e.g. `www.example.com`):

1. Add a **CNAME** file in the built output with the domain (one line). The Actions workflow does not add one by default; you can add a step that writes it into `dist/` before upload, or add `CNAME` to `public/` so it is copied into `dist` during build.
2. In the repo **Settings** → **Pages**, under **Custom domain**, enter the domain and save.
3. Configure DNS with your provider (CNAME or A records as instructed by GitHub).

After the first deploy, allow a few minutes for the site to appear. If assets fail to load, double-check that `base` in `vite.config.ts` matches your Pages URL path (e.g. `/<repo>/` for a project site).
