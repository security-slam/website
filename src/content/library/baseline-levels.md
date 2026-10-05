---
title: Understand Baseline Maturity Levels
description: Start here if you haven't selected your project's Maturity Level
tags: [Chronicler, OSPS Baseline]
image: /project-logos/baseline.png
weight: 1
author: Satarupa Deb, Revanite
---

The baseline uses three maturity levels, allowing projects to implement security measures appropriate to their risk profile and user base.

1. `Level 1` is for all projects, it can be code or non-code, can have any number of maintainers. It is the starting point for all projects that have made a release and covers all the fundamental security practices every project should have
1. `Level 2` is specifically for any code project that have a small number of consistent users and at least 2 maintainers. It builds on the foundation of  Level 1 with additional controls. It is appropriate for all projects that have a regular usage and are being developed collaboratively.
1. `Level 3` is for any code project that has a large and consistent user base. It is mainly for projects that are being widely adopted by enterprises and other organisations. These projects  are essential as they provide critical infrastructure or handle sensitive data.

In the OSPS Baseline documentation, each control contains an objective and one or more assessment requirements. These requirements are granular testable statements, and each is tagged with its applicable maturity level(s).

## How to Find your level

Try asking yourself these questions:

- Who are your users? If it is a small hobby project that can help the community in some way start with level 1, if you are building for an enterprise level 3 is a must.
- How mature is your project? If it’s a fairly new repo, start at level 1, if it's stable and has a set of releases with a roadmap, you might want to bump it to level 2 or level 3.
- What is the downstream impact of a security incident ? If a vulnerability in your project can compromise  hundreds downstream projects you need level 3, if the scale is small, then either level 1 or level 2, can be fine.
- Are you asking the community to trust you? If your project handles sensitive data, handles credentials and payments, then level 3 is a must.

You don’t have to do everything at once. Identify your level and you can build on top of that.

Many projects have a high self-opinion of their security hygiene, but the OSPS Baseline reveals gaps. In these cases they have documentation but it’s outdated and incomplete. They might have security policies but users are unable to locate them in their project repo.

As you start with your baseline documentation, always remember that these levels are not arbitrary bureaucracy but a ladder, as you climb higher your projects become more maintainable, trustworthy and more secure.

## Viewing Maturity Levels in the Baseline Catalog

When you click into a specific control on the baseline website, scroll down below an assessment requirement to see which maturity level(s) it applies to. You'll see badges or labels indicating:

- "Maturity Level 1"
- "Maturity Level 2"
- "Maturity Level 3"

While navigating you might find some controls that show multiple levels (Maturity Level 1, Maturity Level 2, Maturity Level 3), this means that they apply across all three levels, while others might only show Maturity Level 3, this indicates that they are only required for the highest maturity projects.

## Harnessing Maturity Levels in Automated Tools

The various tools also have different levels of automated coverage.

- **OSPS Baseline Scanner for GitHub Repos** (the scanner action and the grc.store publish workflow run the same scanner): Has the most coverage for level 1, and less for higher levels
- **LFX Insights Security & Best Practices Dashboard**: Partial coverage for Level 1, none for higher levels
- **Best Practices Badge (Baseline Badge)**: Complete coverage for all three levels, self-reported rather than scanned

As an aside, the current OSPS Baseline release is [2026-08-28](https://baseline.openssf.org/versions/2026-08-28). The scanner behind the Mechanizer and Defender badges evaluates that release; other tools may lag a version behind.
