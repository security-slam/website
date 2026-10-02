# Security Policy

## Scope

This policy covers the source in this repository, its GitHub Actions workflows, and the site deployed at <https://securityslam.com>.
It does not cover third-party services the site links to or embeds.

## Reporting a Vulnerability

Do not report security vulnerabilities in public GitHub issues, pull requests, or discussions.

Report them privately through GitHub private vulnerability reporting:
[open a private report](https://github.com/security-slam/website/security/advisories/new).
You can also find it under the repository's **Security** tab, then **Report a vulnerability**.

Include what you found, where it is, and the steps to reproduce it.

## What Counts as a Vulnerability

Report it privately if you find cross-site scripting, a way to change site content without a merged pull request, exposed secrets, or a compromise of the build and deploy workflows.

Broken links, typos, and outdated content are bugs. Open a public issue for them.

Published advisories appear on the repository's Security tab and in the GitHub Advisory Database, which feeds OSV.

## Security Contact

Jason Meridth ([@jmeridth](https://github.com/jmeridth), jmeridth@gmail.com)

## Response

We do not promise a response timeframe.

## Secure Development

The project follows these practices:

- **Pinned actions.** Every GitHub Action in `.github/workflows/` is pinned to a full commit SHA, with the version in a trailing comment.
- **Hardened runners.** Every workflow job starts with `step-security/harden-runner` in audit mode.
- **Least-privilege tokens.** Every workflow sets `permissions: {}` at the top level. Each job grants only the scopes it needs, with a comment explaining each one.
- **Dependency updates.** Dependabot checks npm packages and GitHub Actions weekly, with a 7-day cooldown before it proposes a new release (`.github/dependabot.yml`).
- **Required build check.** The `build` job in `.github/workflows/ci.yaml` must pass before a pull request can merge. It installs with `npm ci --ignore-scripts`, then runs `npm run typecheck` and `npm run build`.
- **Protected main branch.** The `main` ruleset requires a pull request to change `main`, blocks force pushes and branch deletion, and allows only squash merges. Organization admins can bypass the ruleset when merging a pull request.
- **Two-factor authentication.** The `security-slam` GitHub organization requires 2FA for all members.

## Risk Handling

The maintainer triages every security report in a private GitHub security advisory.
The advisory holds the discussion, the severity assessment, and the fix until it is published.

The project records its threats and the controls that address them in two Gemara catalogs:

- [threat-catalog.yaml](threat-catalog.yaml)
- [capability-catalog.yaml](capability-catalog.yaml)

## Vulnerability Process

Jason Meridth triages all reports alone. We do not promise a response timeframe.

1. **Report.** The reporter submits a private report as described in [Reporting a Vulnerability](#reporting-a-vulnerability).
2. **Identify.** The maintainer reproduces the issue and assesses its impact in the advisory.
3. **Fix.** The maintainer develops the fix in the advisory's temporary private fork.
4. **Deploy.** The maintainer merges the fix to `main`. Every merge to `main` deploys the site.
5. **Disclose.** The maintainer publishes the advisory after the fix is live.
6. **Credit.** The published advisory credits the reporter, unless they ask to stay anonymous.

## Support Period and End of Life

Only the site currently deployed at <https://securityslam.com> receives security fixes.
Each merge to `main` deploys the site and publishes a release. Earlier releases receive no fixes; a fix ships in the next deploy.

If the site is retired, the maintainers archive this repository and state in the README that the project has ended.
