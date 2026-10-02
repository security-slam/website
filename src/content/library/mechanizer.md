---
title: "Mechanizer Badge"
description: "Automate baseline evaluation and publish the results for the project"
path: "/library/mechanizer"
badge: "Mechanizer"
weight: 4
---

## Challenge

Automate baseline evaluation and publish the results for the project

## Why?

Automation benefits everyone.

You get answers at a glance. Your regulated users get up-to-date information for their conformity assessments. Slam evaluators can verify progress without manual review.

More importantly, automation makes security sustainable. Manual checks get skipped. Automated checks keep running.

## How?

**First, create your Security Insights YAML file** (see the [Cleaner badge](/library/cleaner)) with basic information if you haven't already. You'll document your automated tooling there.

Two options for automated baseline evaluation:

- **Option 1**: LFX Insights Security & Best Practices Dashboard (recommended)
- **Option 2**: OSPS Baseline GitHub Action

_If your project isn't hosted on GitHub, reach out to Slam Organizers for an alternate evaluation path._

### Option 1: LFX Insights (Recommended)

Linux Foundation projects are typically already onboarded. If not, [submit a request](https://github.com/linuxfoundation/insights/discussions/categories/project-onboardings).

LFX Insights runs routine scans and keeps historical records. The platform includes features beyond security metrics that benefit your project.

This option evaluates a curated subset of baseline controls. Same scanner as Option 2, but LFX maintainers select which evaluations count toward your score. Takes longer to get approved, but faster to achieve 100% once you're in.

### Option 2: GitHub Action

Faster to get started. The OpenSSF maintains a [Privateer](https://privateerproj.com) plugin for scanning GitHub repos against baseline requirements.

You can run it locally using [pvtr-github-repo-scanner](https://github.com/ossf/pvtr-github-repo-scanner) or add it to CI with the [GitHub Action for OSPS Baseline](https://github.com/marketplace/actions/open-source-project-security-baseline-scanner).

This option evaluates all baseline controls that can be automatically verified. More comprehensive than LFX Insights, but requires zero failures to complete the badge.
