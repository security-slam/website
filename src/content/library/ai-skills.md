---
title: Earn your Security Slam badges with AI Skills
description: Agent Skills for Claude Code, Codex, and other AI agents that draft your Security Insights file and walk you through every badge. Early preview, review everything they produce.
tags: [Cleaner, Chronicler, Inspector, Mechanizer, Defender, CRA Readiness, Helpful Tools, Getting Started]
weight: 1
author: Jason Meridth, Revanite
---

Security Slam has a set of AI agent skills that walk your project through every badge, from the first `security-insights.yml` to a passing OSPS Baseline result published on grc.store. Install them, ask "where does this repo stand in the Security Slam?", and you get a status table and the one badge to work on next.

The skills follow the open [Agent Skills](https://agentskills.io) standard, so they work with Claude Code, Codex, GitHub Copilot, Cursor, Gemini CLI, and other compatible agents. They are an early preview: we built and tested them in Claude Code on four real repositories, and ran the status check in Codex, which produced the same report. Everything they write is a draft for you to review.

## Install

In Claude Code, install them from the `security-slam` plugin marketplace:

```
/plugin marketplace add security-slam/skills
/plugin install security-slam-skills@security-slam
```

In any other agent, install them with [`skills`](https://github.com/vercel-labs/skills):

```
npx skills add security-slam/skills
```

To pick up a new release later, run `claude plugins update security-slam-skills@security-slam` for Claude Code or `npx skills update` for other agents.

## Start with the status check

Open your agent in the repository you want to check and ask:

> Where does this repo stand in the Security Slam?

That runs `slam-status`. It takes about thirty seconds, writes nothing, and reports where you stand on all six badges with one recommended next step. Run it again whenever you want to know what to do next.

## One skill per badge

| Skill | What it helps you do |
| --- | --- |
| `slam-status` | Check a repo against all six badges and get one recommended next step. Read-only. |
| `cleaner` | Write and validate a Security Insights file from what's actually in your repo. |
| `chronicler` | Close the OSPS Baseline documentation controls for your maturity level. |
| `inspector` | Write a Gemara threat assessment or an OSPS self-assessment. |
| `mechanizer` | Wire the OSPS Baseline scan into your default branch, as the scanner action or the grc.store publish workflow, and work through the failed controls. |
| `defender` | Run a full Baseline gap analysis, drive the published grc.store result to a pass, and draft Security Insights evidence for the controls the scanner can't check. |
| `cra` | Document voluntary EU Cyber Resilience Act readiness, with the required disclaimer. |

Your agent picks a skill when your request matches its description, so "help me earn the Cleaner badge" or "set up the Baseline scan" is enough. You can also name one: "use the chronicler skill", or `/cleaner` in Claude Code.

If you're not following the status check's recommendation, start with `cleaner`. Every other badge adds links to the Security Insights file it creates, so the rest go faster once that file exists.

## What to expect from a run

Each skill follows the same shape: it audits your repository against the badge requirements, reports the gaps with evidence, drafts only what you confirm, and ends with a submission checklist for the badge.

Expect questions. The skills never invent facts, so contacts, support windows, dependency policies, and maturity levels come from you or from your repo. When a skill can't find something, it asks rather than guessing.

Expect to say yes before anything changes. Turning on secret scanning or tightening a branch ruleset changes your project, so the skill shows the exact change and waits for your approval. Nothing is committed or pushed for you.

Expect validated output. Security Insights files pass `cue vet` against the official schema, Gemara catalogs pass against a pinned Gemara release, and every workflow action gets pinned to a commit SHA checked against its release tag.

Still read everything. The skills make guesses where your repository is ambiguous, and a security checklist is only worth something if it's true. Treat each file as a first draft and correct anything that doesn't describe what you actually do.

## Organizations with a shared `.github` repo

If your projects inherit their security policy or contributing guide from an org-level `.github` repository, make the changes there once. The skills follow a repository's pointer to the org-level Security Insights file and count the inherited evidence.

## What we haven't tested yet

Four repositories are a small sample. These paths have never run:

- OSPS Baseline Level 2 and 3, including release signing, SBOMs, and release verification docs
- Projects that publish container images or registry packages
- The prose self-assessment option in `inspector`, and its hand-off to the gemara-ai plugin
- Projects hosted outside GitHub
- Agents other than Claude Code and Codex, and every skill except `slam-status` outside Claude Code

If you run the skills on one of these and something goes wrong, please [file an issue](https://github.com/security-slam/skills/blob/main/CONTRIBUTING.md#reporting-bugs). That's the fastest way for the skills to get better.
