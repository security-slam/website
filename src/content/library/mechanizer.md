---
title: "Mechanizer Badge"
description: "Automate Baseline evaluation for the project"
path: "/library/mechanizer"
badge: "Mechanizer"
weight: 4
---

## Challenge

Make Baseline evaluation something that happens to your project on its own, not something a maintainer remembers to do. Wire either the OSPS Baseline scanner action or the grc.store publish workflow into your default branch so each run scans against the OSPS Baseline. A passing score is not required for this badge; a live, recurring scan is. Note the tooling in your Security Insights file.

## Why?

Automation benefits everyone.

You get answers at a glance. Your regulated users get up-to-date information for their conformity assessments. Slam evaluators can verify progress without manual review.

More importantly, automation makes security sustainable. Manual checks get skipped. Automated checks keep running.

## Recommendations

**First, create your Security Insights YAML file** (see the [Cleaner badge](/library/cleaner)) with basic information if you haven't already. You'll document your automated tooling there.

Both options below run the same scanner, the OpenSSF-maintained [Privateer](https://privateerproj.com) plugin for GitHub repositories, and either one earns the badge. Pick based on where you want the results to live.

_If your project isn't hosted on GitHub, reach out to Slam Organizers for an alternate evaluation path._

### Option 1: OSPS Baseline scanner action

Add the [GitHub Action for OSPS Baseline](https://github.com/marketplace/actions/open-source-project-security-baseline-scanner) to a workflow on your default branch. Results stay in your repository: as a workflow artifact, in the job log, or in the Security tab as SARIF. You can also run the scanner locally with [pvtr-github-repo-scanner](https://github.com/ossf/pvtr-github-repo-scanner).

This is the fastest way to get started. Nothing is published anywhere, so there are no rate limits: run it on every pull request if you like.

### Option 2: grc.store publish workflow

Call the [`revanite-io/pvtr-publish-results`](https://github.com/revanite-io/pvtr-publish-results) reusable workflow from your default branch. It runs the same scan and publishes each result to a public target page on grc.store.

The [Defender badge](/library/defender) requires this option, so if you're planning to go all the way, starting here saves a step. It takes more preparation: your project needs a namespace and a trusted-publisher binding on grc.store first, and the hub accepts one result per target every ten minutes, so trigger it on pushes to your default branch, releases, or a schedule, not on pull requests. [Set up your grc.store namespace and targets](/library/grc-store-setup) walks through the preparation.

**Prefer a head start?** The Slam's [AI skills](/library/ai-skills) include a `mechanizer` skill that sets up the Baseline scan workflow and then works through the failed controls with you. Treat its output as a first draft, not a finished pipeline: the skill makes guesses about your repository's setup, so review the workflow file and every proposed fix before you merge them. It won't change repository settings on its own, but it will ask you to.
