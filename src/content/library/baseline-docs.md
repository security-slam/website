---
title: Understand Baseline Documentation Controls
description: Quick start guide for OpenSSF Baseline documentation tasks
tags: [Chronicler, OSPS Baseline]
image: /project-logos/baseline.png
weight: 10
author: Satarupa Deb, Revanite
---

Ensuring that your project meets the security standards isn’t just about how secure your code is, it’s more about making sure that your users can safely use, verify and maintain your project.

You can see the requirements on the [Baseline Website](https://baseline.openssf.org/versions/2026-08-28.html) where they are organized by maturity level and category respectively.

Assuming you have already identified your project's Maturity Level, below is a look at the Documentation assessment requirements specific to each level.

## Level 1 Requirements

- `OSPS-DO-01.01`: When the project has made a release, the project documentation MUST include user guides for all basic functionality.
- `OSPS-DO-02.01`: When the project has made a release, the project documentation MUST include a guide for reporting defects.

## Level 2 Requirements

- `OSPS-DO-06.01`: When the project has made a release, the project documentation MUST include a description of how the project selects, obtains, and tracks its dependencies.
- `OSPS-DO-07.01`: The project documentation MUST include instructions on how to build the software, including required libraries, frameworks, SDKs, and dependencies.

## Level 3 Requirements

- `OSPS-DO-03.01`: When the project has made a release, the project documentation MUST contain instructions to verify the integrity and authenticity of the release assets.
- `OSPS-DO-03.02`: When the project has made a release, the project documentation MUST contain instructions to verify the expected identity of the person or process authoring the software release.
- `OSPS-DO-04.01`: When the project has made a release, the project documentation MUST include a descriptive statement about the scope and duration of support for each release.
- `OSPS-DO-05.01`: When the project has made a release, the project documentation MUST provide a descriptive statement when releases or versions will no longer receive security updates.

## Additional Tips

- Keep documentation close to your code, in the repository where users would usually expect it
- Use standard filenames like README.md, CONTRIBUTING.md, SUPPORT.md, SECURITY.md
- Always Update documentation with each release
- Make sure that  critical security information is highly visible
- Consider automation for machine-readable formats like OpenEoX wherever possible
- Meeting these documentation requirements isn't just about checking boxes, it's more  about building trust with your users and creating a sustainable, secure open source project.
