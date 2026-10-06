---
title: Helpful GitHub Actions
description: >-
  Run Privateer's OSPS Baseline scan in GitHub Actions
  and read the results, and validate your Security
  Insights file on every pull request.
tags:
  - Cleaner
  - Mechanizer
  - Helpful Tools
author: Jason Meridth, Chainguard
---

## OSPS Baseline Action

The [OSPS Baseline Action][osps-action] runs [Privateer][privateer] with the OpenSSF [GitHub repository scanner][scanner] against your repository and reports how it measures up to the [OSPS Baseline][osps]. This is Option 1 of the [Mechanizer badge](/library/mechanizer): results stay in your repository, nothing is published anywhere, and a failing scan still earns the badge.

Setup takes three steps: create a token, add the workflow, and run it.

### 1. Create a scanner token

The scanner reads repository settings such as branch protection and secret scanning through the GitHub API. The built-in `GITHUB_TOKEN` can't read those settings, so the action needs a token of its own.

Create a [fine-grained personal access token][fg-pat] with these settings:

- **Resource owner:** the account or organization that owns the repository
- **Repository access:** only the repository you're scanning
- **Repository permissions:** read-only access to Actions, Administration, Code scanning alerts, and Contents (GitHub adds Metadata automatically)

Then add it to the repository as an Actions secret named `PVTR_GITHUB_TOKEN` (**Settings → Secrets and variables → Actions → New repository secret**).

If the scan reports settings you'd expect it to read as Needs Review, fall back to a classic token with the `public_repo` scope (`repo` for a private repository), stored under the same name. Use it only as a fallback: `public_repo` also grants write access to every public repository you can push to.

Some organizations require an admin to approve fine-grained tokens before they work. If your organization has the [octo-sts][octo-sts] GitHub App installed, you can skip the stored secret: the workflow trades its OIDC identity for a short-lived, read-only token instead. This site's own [scan workflow][site-workflow] and [trust policy][site-policy] show how.

### 2. Add the workflow

Save this as `.github/workflows/osps-baseline.yml` on your default branch:

```yaml
name: OSPS Baseline

on:
  schedule:
    - cron: "0 9 * * 1" # Weekly, Mondays 09:00 UTC
  push:
    branches: [main]
  workflow_dispatch:

permissions: {}

concurrency:
  group: ${{ github.workflow }}
  cancel-in-progress: false

jobs:
  assess:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    permissions:
      contents: read
      security-events: write # Upload failed controls to the Security tab
    steps:
      - name: Checkout
        uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
        with:
          persist-credentials: false

      - name: OSPS Baseline scan
        uses: revanite-io/osps-baseline-action@1af7ff8b44af83f120b20cc5f63b877286849257 # v1.5.2
        with:
          owner: ${{ github.repository_owner }}
          repo: ${{ github.event.repository.name }}
          token: ${{ secrets.PVTR_GITHUB_TOKEN }}
          catalog: "osps-baseline-2026-08"
          upload-sarif: "true"
          fail-on-error: "true"

      - name: Upload results
        if: always()
        uses: actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a # v7.0.1
        with:
          name: osps-baseline-results-${{ github.run_number }}
          path: evaluation_results/
          retention-days: 30
```

A few notes on that file:

- **Change `main`** if your default branch has another name.
- **Keep `catalog` set.** It selects the Baseline version, and the action's built-in default is older than the one the Slam uses.
- **The actions are pinned to commit SHAs**, so a moved tag can't change what runs with your token. Dependabot can keep the pins current.
- **Pull requests are optional.** Add a `pull_request` trigger if you want to check fixes before they merge. GitHub doesn't pass secrets to pull requests from forks, so those runs fail at the scan step. Never use `pull_request_target`: it hands your token to code from a fork.

### 3. Run it and read the results

Start the first scan from the **Actions** tab (select **OSPS Baseline**, then **Run workflow**), or with the GitHub CLI:

```bash
gh workflow run osps-baseline.yml
gh run watch
```

Each control comes back with one of three results:

- **Passed:** the scanner verified the control.
- **Failed:** the scanner found the control unmet. These are your to-do list for the [Defender badge](/library/defender).
- **Needs Review:** the scanner couldn't decide on its own, often because the token can't see an organization-level setting such as multi-factor authentication. A person makes the final call.

The results show up in three places:

- **The run's summary page** lists every control and its result. Start here.
- **The Security tab** (**Security → Code scanning**) shows one alert per failed control. An alert closes on its own once a later scan stops reporting that failure. When nothing fails, nothing is uploaded, and the summary page is the only view.
- **The `osps-baseline-results-<run number>` artifact** holds the full results file for 30 days.

With `fail-on-error: "true"`, the job turns red whenever a control fails. A red job means the scan found gaps, not that the workflow is broken. Set it to `"false"` to keep the job green and read the results from the summary.

If the scan step errors before it reports any results, re-run it once. The scanner makes many API calls and occasionally trips on one. If it keeps failing, check that the secret name matches and that the token hasn't expired.

The scan covers Baseline Maturity Level 1, which is all Mechanizer needs. To claim the badge, list the scanner in your Security Insights file as the [Mechanizer page](/library/mechanizer) shows, then submit from that page. The [`mechanizer` AI skill](/library/ai-skills) can set all of this up and work through the failed controls with you.

## Security Insights Action

The [Security Insights Action][si-action] validates
your repository's `security-insights.yml` file against
the official [OSSF Security Insights][si-spec] CUE
schema. It automatically detects the schema version
from your file and validates accordingly.

See the [README][si-readme] for setup instructions
and configuration options.

[osps-action]: https://github.com/revanite-io/osps-baseline-action
[privateer]: https://privateerproj.com
[scanner]: https://github.com/ossf/pvtr-github-repo-scanner
[osps]: https://baseline.openssf.org/
[fg-pat]: https://github.com/settings/personal-access-tokens/new
[octo-sts]: https://github.com/octo-sts/app
[site-workflow]: https://github.com/security-slam/website/blob/main/.github/workflows/osps-baseline.yaml
[site-policy]: https://github.com/security-slam/website/blob/main/.github/chainguard/osps-baseline.sts.yaml
[si-action]: https://github.com/revanite-io/security-insights-action
[si-spec]: https://github.com/ossf/security-insights
[si-readme]: https://github.com/revanite-io/security-insights-action#readme
