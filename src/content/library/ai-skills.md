---
title: Earn your Security Slam badges with AI Skills
description: Agent Skills for Claude Code, Codex, and other AI agents that draft your Security Insights file and walk you through every badge. Early preview, review everything they produce.
tags: [Cleaner, Chronicler, Inspector, Mechanizer, Defender, CRA Readiness, Helpful Tools, Getting Started]
weight: 1
author: Jason Meridth, Revanite
---

Security Slam now has a set of AI agent skills that walk your project through every badge, from the first `security-insights.yml` to a passing OSPS Baseline result published on grc.store. Install them, ask "where does this repo stand in the Security Slam?", and you get a status table and the one badge to work on next.

The skills follow the open [Agent Skills](https://agentskills.io) standard, so they work with Claude Code, Codex, GitHub Copilot, Cursor, Gemini CLI, and other compatible agents. We built and tested them in Claude Code, then ran `slam-status` in Codex, which produced the same report.

The skills are an early preview. We tested them on four real repositories, two of our own and two from the Privateer project. That testing found bugs in the skills, in our CI, and in three upstream projects. This post covers what the skills do, what happened when we ran them on ourselves, and what we haven't tested yet.

## What you get

There are seven skills: one per project badge, plus a status check.

| Skill | What it helps you do |
| --- | --- |
| `slam-status` | Check a repo against all six badges and get one recommended next step. Read-only. |
| `cleaner` | Write and validate a Security Insights file from what's actually in your repo. |
| `chronicler` | Close the OSPS Baseline documentation controls for your maturity level. |
| `inspector` | Write a Gemara threat assessment or an OSPS self-assessment. |
| `mechanizer` | Wire the OSPS Baseline scan into your default branch, as the scanner action or the grc.store publish workflow, and work through the failed controls. |
| `defender` | Run a full Baseline gap analysis, drive the published grc.store result to a pass, and draft Security Insights evidence for the controls the scanner can't check. |
| `cra` | Document voluntary EU Cyber Resilience Act readiness, with the required disclaimer. |

In Claude Code, install them from the `security-slam` plugin marketplace:

```
/plugin marketplace add security-slam/skills
/plugin install security-slam-skills@security-slam
```

In any other agent, install them with [`skills`](https://github.com/vercel-labs/skills):

```
npx skills add security-slam/skills
```

Then open your agent in your repo and ask "Where does this repo stand in the Security Slam?"

## Rules the skills follow

A security checklist is only worth something if it's true. So the skills follow a few rules:

- **They never invent facts.** Contacts, support windows, dependency policies, and maturity levels come from you or from your repo. When a skill can't find something, it asks.
- **They never change settings on their own.** Turning on secret scanning or tightening a branch ruleset changes your project, so the skill shows the exact change and waits for your yes.
- **They validate their output.** Security Insights files pass `cue vet` against the official schema, Gemara catalogs pass against a pinned Gemara release, and every workflow action gets pinned to a commit SHA checked against its release tag.

## We ran them on real projects first

Before asking anyone else to use these skills, we used them on four repositories:

| Repository | What it is | Result |
| --- | --- | --- |
| [security-slam/skills](https://github.com/security-slam/skills) | The skills themselves: Markdown and YAML | All six skills run at Baseline Level 1 |
| [security-slam/website](https://github.com/security-slam/website) | securityslam.com: a TypeScript site deployed on every merge | All six skills run at Baseline Level 1 |
| [privateerproj/pvtr](https://github.com/privateerproj/pvtr) | The Privateer CLI: a Go program that ships release binaries | All six skills run at Baseline Level 1 |
| [privateerproj/privateer-sdk](https://github.com/privateerproj/privateer-sdk) | The Privateer plugin SDK: a Go library | All six skills run at Baseline Level 1 |

Each skill ran in a fresh Claude Code session, the same way you'd run it. We also installed the skills in Codex with `npx skills` and asked it the same status question on the Privateer SDK. Codex picked `slam-status` on its own and matched Claude Code's report. The website started with no license, no security policy, and a README that described code that no longer existed. It finished with all of those fixed and a Baseline scan on every push to `main` reporting zero failed controls, run as the scanner action. None of the four repositories publishes to grc.store yet, so under the Slam's own rules none holds a Defender result; that is the next step for all four.

The Privateer repositories tested something different: an organization that shares its security policy and contributing guide from a central `.github` repository. We made those changes once, in the org repository, and both projects picked them up. That run also found a gap: `slam-status` didn't follow a repository's pointer to the org-level Security Insights file, so it could under-report inherited evidence. [v0.0.9](https://github.com/security-slam/skills/releases/tag/v0.0.9) fixed it.

## What dogfooding caught

The skills found real problems in themselves. Releases v0.0.2 through v0.0.10 fixed them as we found them. A few examples:

- **`cleaner` and `chronicler` filled in the wrong Security Insights field.** The OSPS Baseline scanner reads only `detailed-guide` for the user guide control, and the skills used `quickstart-guide`. The first real scan failed on it. We traced it to the scanner's source and fixed the skills.
- **`chronicler` misquoted the Baseline.** It said two documentation controls applied regardless of releases. The Baseline says otherwise. The skill now carries each control's condition word for word.
- **`mechanizer` guessed instead of checking.** Its setup notes assumed a repository's OIDC subject format from its age. On the website, the skill noticed the guess was wrong, asked the GitHub API instead, and got it right. We changed the notes to always ask the API.
- **`cra` refused a list of practices it couldn't prove.** On the Privateer SDK, we handed the skill a list of secure development practices that included commit sign-off and a CI hardening action. The skill checked the repository, found neither, and left both out of the readiness document.
- **`cra` learned from the Linux Foundation [CRA Stewards Playbook](https://policy.openssf.org/CRA/stewards-playbook.html).** The playbook asks a security policy to state its scope and what counts as a vulnerability. The Slam badge doesn't require either, so the skill recommends them, and requires them only when the Linux Foundation is the project's steward. All four repositories added both anyway.
- **`inspector` found real weaknesses in our own CI.** Its threat assessment of our release pipeline showed that a manual run could release from any branch and that a scheduled job ran unpinned third-party code next to a write token. We fixed both before publishing the assessment.

## Fixes that went upstream

Running the skills for real also surfaced bugs in tools the Slam depends on:

- **OSPS Baseline GitHub Action:** failed controls never reached the GitHub Security tab when the action was set to fail the build, and two-digit counts showed up wrong in the summary. Both are fixed in [v1.5.2](https://github.com/revanite-io/osps-baseline-action/releases/tag/v1.5.2).
- **OSPO reusable workflows:** a release that collided with an existing tag left an orphaned draft release behind. Fixed in [v2.1.1](https://github.com/github-community-projects/ospo-reusable-workflows/releases/tag/v2.1.1).
- **Release Drafter:** a project's first release published with "No changes". In [RFC #1779](https://github.com/release-drafter/release-drafter/issues/1779), a maintainer pointed us to the `from` input added in v7.8.0, which sets a comparison baseline. Using it surfaced a misleading "no comparison baseline" warning, which our fix removed in [v7.9.0](https://github.com/release-drafter/release-drafter/releases/tag/v7.9.0) ([#1789](https://github.com/release-drafter/release-drafter/pull/1789)). The OSPO reusable workflow change that uses `from` for first releases shipped in [v2.2.0](https://github.com/github-community-projects/ospo-reusable-workflows/releases/tag/v2.2.0) ([#206](https://github.com/github-community-projects/ospo-reusable-workflows/pull/206)).

## What we haven't tested yet

This is an early preview, and four repositories are a small sample. These paths have never run:

- OSPS Baseline Level 2 and 3, including release signing, SBOMs, and release verification docs. Privateer ships binaries, but we only took it to Level 1.
- Projects that publish container images or registry packages
- The prose self-assessment option in `inspector`, and its hand-off to the gemara-ai plugin
- Projects hosted outside GitHub
- Agents other than Claude Code and Codex, and every skill except `slam-status` outside Claude Code

If you run the skills on one of these and something goes wrong, please [file an issue](https://github.com/security-slam/skills/blob/main/CONTRIBUTING.md#reporting-bugs). That's the fastest way for the skills to get better, and it's how all ten releases so far happened.

## Try it

Install the skills, open your project in your agent, and ask where it stands in the Security Slam. That runs `slam-status`, which takes about thirty seconds, writes nothing, and tells you where to start.