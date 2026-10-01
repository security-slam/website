# Contributing

Thanks for helping improve the Security Slam website.

## Reporting Bugs

Open a [GitHub issue](https://github.com/security-slam/website/issues/new). Include:

- The page URL where you saw the problem
- Your browser and operating system
- Steps to reproduce it
- What you expected to happen and what happened instead
- A screenshot, if the problem is visual

Do not report security vulnerabilities in public issues. Follow [SECURITY.md](SECURITY.md) instead.

## Submitting Changes

1. Fork the repository, or create a branch if you have write access.
2. Make your change. See [README.md](README.md) for how the site config, content, and pages fit together.
3. Run the same checks CI runs, using the Node version in `.nvmrc`:

   ```bash
   npm ci
   npm run typecheck
   npm run build
   ```

4. Open a pull request against `main`.

See [Secure Development](SECURITY.md#secure-development) for the security practices your change runs through.

The `build` check in `.github/workflows/ci.yaml` must pass before a pull request can merge. It runs `npm ci --ignore-scripts`, `npm run typecheck`, and `npm run build`.

Every merge to `main` deploys the site to GitHub Pages.
