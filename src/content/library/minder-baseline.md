---
title: Baseline using Minder
description: Using OpenSSF Minder to assess and remediate OSPS Baseline requirements 
image: /project-logos/minder.png
tags: [Helpful Tools, OSPS Baseline]
weight: 0
author: Evan Anderson, Custcodian
---

[OpenSSF Minder](https://mindersec.dev/) is an open source hosted platform for implementing supply chain security checks and remediations (fixes).  Minder is built on a flexible rule engine based on the [Rego language from Open Policy Agent](https://www.openpolicyagent.org/docs/policy-language), which allows users to define their own checks and supply chain policy.

The OpenSSF Minder project [publishes a set of rules and profiles](https://github.com/mindersec/minder-rules-and-profiles/tree/main/security-baseline) to evaluate repositories against the [Level 1 assessment requirements](https://baseline.openssf.org/versions/2026-08-28#level-1).  Using Minder can provide an easy way to assess and possibly fix issues highlighted by the rules.

The published rules implement the current 2026-08-28 Baseline release.

## Syncing and Applying OSPS Baseline Rules

To sync and apply the OSPS Baseline rules to your GitHub repositories through the [Custcodian hosted Minder instance](https://custcodian.dev/hosted/):

1. Clone the minder rules repository:
    ```bash
    git clone https://github.com/mindersec/minder-rules-and-profiles.git
    ```

2. [Install](https://docs.mindersec.dev/getting_started/install_cli) and
   [configure](https://docs.mindersec.dev/getting_started/login) the minder
   CLI tool.

3. [Install Minder on your GitHub organization, and associate it with your
   Minder project](https://docs.mindersec.dev/getting_started/enroll_provider).

4. [Register specific repositories you want to assess](https://docs.mindersec.dev/getting_started/register_repos).

5. From the `minder-rules-and-profiles` repository, apply the Baseline profile
   and rules using Minder:
    ```bash
    minder apply -f security-baseline
    ```

## Additional information

For more information on the OpenSSF Security Baseline, visit:
https://baseline.openssf.org/

For more information on OpenSSF Minder, visit:
https://mindersec.dev/