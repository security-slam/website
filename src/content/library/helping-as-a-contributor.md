---
title: Helping a Project When You're Not a Maintainer
description: How to find work a registered project needs, what you can do on each badge, and how to get it merged.
tags: [Getting Started]
weight: 2
author: Khuswant Rajpurohit, Kubescape
---

About half of the people registered for the Slam don't maintain a participating project. I'm one of them. I'm a triager on Kubescape, and in the first week I opened the badge issues, sent a few PRs, and watched other contributors arrive. This is what I'd tell myself on day one.

**The short version**

1. Pick a project from the [Participating Projects](/slam26/participating-projects) list and find out which badge it's on.
2. Say what you're taking on the issue before you start.
3. Send one small PR per task.
4. Write only what you can point to in the repo. Ask about the rest.
5. Leave settings, secrets and badge submission to the maintainers.

## Before you start

[Register](/slam26/register) yourself. Badges go to registered people who are named on a project's completion notice, and only work on a listed project counts.

Then check the project's [maturity level](/library/baseline-levels), because it decides how much is expected. For CNCF and OpenSSF projects, Sandbox means Baseline Level 1, Incubating means Level 2 and Graduated means Level 3. A doc that satisfies Level 1 can still leave gaps at Level 2.

## Find out where the project stands

Before changing anything, search the project's issues and pull requests for "Security Slam", "security-insights" and "OSPS", and skim its chat channel. You want to know which badge they're working on and who has what.

You may find nothing. Several registered projects I checked had no Slam issue yet. Don't open with a PR in that case. Open an issue that names the badge and lists what you'd change, then wait for a maintainer. I did that for Kubescape's Cleaner badge, and the PR merged the same day because nobody had to guess what it was for.

To see the gaps for yourself, run the [OSPS Baseline scanner](https://github.com/ossf/pvtr-github-repo-scanner) against the repo, or ask the `slam-status` [AI skill](/library/ai-skills). Either one gives you a list of what passes and what doesn't in a couple of minutes, which makes a far better first issue than "how can I help?".

## What you can do on each badge

Every badge has a part that anyone can do with a pull request and a part that needs a maintainer. Knowing the split saves you from starting something you can't finish.

**[Cleaner](/library/cleaner)** asks for a `security-insights.yml` that describes how the project handles security today.

- **You can:** draft the file from what's in the repo (the [editor](https://security-insights.openssf.org/editor/) helps), migrate an old one to the current schema, and validate it.
- **Needs a maintainer:** confirming the contacts, the core team list and any statement about practice.

**[Chronicler](/library/chronicler)** asks for the documentation the Baseline expects at the project's level.

- **You can:** compare the docs against the [documentation controls](/library/baseline-docs), fix what's stale, write what's missing, and link each doc from Security Insights.
- **Needs a maintainer:** anything that is a decision, such as response times, who has access and what review is required.

**[Inspector](/library/inspector)** asks for a security self-assessment or a Gemara threat assessment.

- **You can:** write the first draft from the code and docs, and mark what you couldn't verify.
- **Needs a maintainer:** reviewing it, answering the open questions and signing it off.

**[Mechanizer](/library/mechanizer)** asks for a Baseline scan that runs by itself on the default branch.

- **You can:** write the workflow file and add the scanner to Security Insights.
- **Needs a maintainer:** any token or secret, and the grc.store namespace if the project publishes there.

**[Defender](/library/defender)** asks for a passing Baseline result at the project's level, published on grc.store.

- **You can:** fix failed controls that live in files, write evidence for the controls the scanner can't check, and report scanner bugs upstream.
- **Needs a maintainer:** repository settings such as branch rules, required checks and secret scanning, plus the grc.store setup.

**[CRA Readiness](/library/cra-readiness)** asks for the CRA guidelines from the project's steward.

- **You can:** check the project against the [CRA Readiness Guide](/library/cra-readiness-guide) checklist and fix the documentation items.
- **Needs a maintainer:** MFA, branch protection and anything the steward has to confirm.

Cleaner comes first because the other badges keep adding to that file. Defender comes last because it depends on the four before it.

Two things I ran into here. On Chronicler, a lot of the work is finding docs that are quietly out of date: Kubescape's build page still asked for Go 1.19 while `go.mod` required 1.26. On Inspector, the badge page itself says a contributor can write the initial draft as long as the maintainers know it's a draft. That's what happened on Kubescape, and the draft was marked "Incomplete" with a `TODO(maintainer)` on every claim that needed confirming.

## Claim it first

One of our badge issues got a complete PR from someone who hadn't commented on it. The work was good, so we were lucky. The next day a second person asked to take the same issue.

What stopped that was splitting the next badge into [small numbered tasks](https://github.com/kubescape/kubescape/issues/4094), marking which ones were for contributors and which were maintainer-only, and asking people to comment with the task number before starting. Three contributors took three different tasks within a day. If the issue you find is one big block, proposing a split is a useful first comment.

## One task, one PR

Tasks get blocked by different things. On Kubescape, a workflow PR is waiting on a grc.store account that only a maintainer can set up, while a docs PR next to it needs nothing. In one PR, both would wait.

Small PRs are also easier to review, and review is where Slam work usually queues up.

Check where a file really lives, too. Kubescape's `SECURITY.md` and `CONTRIBUTING.md` are short pointers to a shared governance repository, which needs three approvals instead of one. A change there affects every repository in the organisation, so it deserves an issue of its own.

## Write what you can prove

Slam work is mostly writing down how a project handles security, so it's easy to write something that sounds right and isn't. Every claim should point to a file, a setting or a release you looked at. Open your own links: one of our PRs passed CI with a commit link that was one character too long.

When you don't know something, such as how quickly the project answers vulnerability reports or who can cut a release, don't choose for them. Ask on the issue and leave a `TODO(maintainer)` in the text.

The same goes for anything an AI tool drafts for you. The Slam's skills are useful for a first pass, but they guess where the repo is ambiguous, and a confident wrong statement in a security document is worse than a gap.

Before you call something done, run the scanner again. If a result surprises you, read its message before you trust it. A scan can report a control as failed because it couldn't reach a file, not because the file is wrong.

## Know what isn't yours

You never need a secret, a token or admin access to contribute. Branch rules, required checks, accounts on services like grc.store and submitting the finished badge belong to maintainers. If a task needs one of those, say so on the issue and pick up something else while you wait.

If you spot what looks like a real weakness, such as who is able to publish a release, keep it out of the public issue and use the private channel in the project's `SECURITY.md`.

## Other ways to help

Review other people's Slam PRs. Follow the links and check the claims against the repo. Maintainer time is the scarce thing, and a careful review saves it.

Keep questions on the issue instead of in direct messages, so the next person finds the answer.

If the scanner gets something wrong, report it to the scanner's project. That helps every project in the Slam, not just yours.

## Getting your badge

When a badge is finished, a maintainer submits it from the badge page and names the people who helped. Linking your PRs from the issue makes you easy to include. The Winter 2027 Slam closes on 12 March 2027.

Stuck? Ask in [#tag-security-and-compliance](https://cloud-native.slack.com/archives/C08JZ9YLAA3) on the CNCF Slack.
