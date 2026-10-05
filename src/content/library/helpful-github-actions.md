---
title: Helpful GitHub Actions
description: >-
  GitHub Actions that automate security assessments
  and validate security documentation for your
  open source projects.
tags:
  - Cleaner
  - Mechanizer
  - Helpful Tools
author: Jason Meridth, Chainguard
---

## OSPS Baseline Action

The [OSPS Baseline Action][osps-action] runs automated
security assessments against your repository using
controls defined in the OpenSSF
[Open Source Project Security (OSPS) Baseline][osps].
It evaluates your project's security posture and can
output results in YAML, JSON, or SARIF format, with
optional direct integration into GitHub's Security tab.

See the [README][osps-readme] for setup instructions
and configuration options.

## Security Insights Action

The [Security Insights Action][si-action] validates
your repository's `security-insights.yml` file against
the official [OSSF Security Insights][si-spec] CUE
schema. It automatically detects the schema version
from your file and validates accordingly.

See the [README][si-readme] for setup instructions
and configuration options.

[osps-action]: https://github.com/revanite-io/osps-baseline-action
[osps]: https://baseline.openssf.org/
[osps-readme]: https://github.com/revanite-io/osps-baseline-action#readme
[si-action]: https://github.com/revanite-io/security-insights-action
[si-spec]: https://github.com/ossf/security-insights
[si-readme]: https://github.com/revanite-io/security-insights-action#readme
