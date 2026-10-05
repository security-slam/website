---
title: Meet the Baseline
description: This Slam is all about the OSPS Baseline, so let's make a quick introduction
image: /project-logos/baseline.png
tags: [Getting Started, OSPS Baseline]
weight: 0
author: Eddie Knight, Sonatype
---

Starting in 2022, the Security Slam was tightly coupled to the CNCF's CLOMonitor tooling, which ran a curated subset of OpenSSF Scorecard evaluations and supplemental CNCF-specific checks.

Because the evaluator was tightly coupled to the interests of CNCF leadership, and because there were rumors of CLOMonitor being sunset, the Slam organizers began fielding the idea of creating a security controls catalog for any open source project, independent of any automation requirements (like Scorecard) or organizational priorities (like CLOMonitor).

Without any need for politics or posturing, the OpenSSF rapidly welcomed the idea, and the _Open Source Project Security Baseline_ was founded as a Special Interest Group. In less than a year, the catalog was fleshed out with a handful of objectives and a variety of assessment requirements spread out across three maturity levels.

The project was quickly identified as a mechanism for supporting end user conformance with the EU's Cyber Resilience Act, but the catalog has stayed true to its original vision: security recommendations _by_ maintainers _for_ maintainers.

You can read more about the intent and outcomes in the [_Frequently Asked Questions_](https://baseline.openssf.org/faq.html) section of the Baseline website.

The website also features an [implementation guide for maintainers](https://baseline.openssf.org/maintainers.html).

The catalog is considered to be a living document, with both requirements and recommendations evolving to incorporate the evolving threat landscape, technical capabilities, and feedback from adopters. The catalog is released with a CalVer (Calendar Versioning) strategy so that you can always tell how recently your version of the catalog was updated.

While automated tools are emerging to evaluate Baseline conformance, they may sometimes be a version or two behind. From the Baseline maintainer's perspective, this isn't a problem: any progress on Baseline conformance is beneficial to a project, and any tools that help accomplish that are encouraged.

_One last note:_ You'll notice that most or all of the controls in the baseline follow a structure of `When X, Y MUST Z`. This may become a bit cumbersome to read at times, such as in cases where the control states `When Active...` (which basically translates to _always_). Community proposals are being considered with regards to updating this syntax, but in the meantime — don't hesitate to ask a Slam Advisor on Slack if something seems unclear.
