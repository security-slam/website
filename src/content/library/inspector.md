---
title: "Inspector Badge"
description: "Complete a Gemara-compatible threat assessment or OSPS Self Assessment"
path: "/library/inspector"
badge: "Inspector"
weight: 3
---

## Challenge

Document what your project does and how it could be attacked, in one of two formats. Option 1 is a machine-readable Gemara threat catalog of capabilities and the threats to each. Option 2 is a written OSPS Self Assessment covering scope, governance, controls, incident response, and dependencies. Commit whichever you choose to the repository and reference it from your Security Insights file so adopters and evaluators can find it.

## Why?

You can't defend what you don't fully understand. And you can't fully understand anything without a bit of critical thinking. A security assessment provides that.

Security self-assessments can be done without any special knowledge, guiding you to think systematically about what your project does, what could go wrong, and what matters most to protect. This becomes the foundation for making informed decisions about where to invest your limited security resources.

When you complete a self-assessment, you're not just checking a box. You're building institutional knowledge that helps:

- New contributors understand security considerations without tribal knowledge
- Adopters evaluate risk and make informed decisions about using your project
- Your team prioritize security work based on actual threat models rather than guesswork
- Auditors and security researchers quickly grasp your attack surface

## How?

**First, create your Security Insights YAML file** (see the [Cleaner badge](/library/cleaner)) with basic information if you haven't already.

There are two options for completing this badge. Pick the approach that makes the most sense for your project.

**Prefer a head start?** The Slam's [AI skills](/library/ai-skills) include an `inspector` skill that drafts either option from what it finds in your repository. Treat its output as a first draft, not a finished assessment: the skill makes guesses about what your project does and what could go wrong with it, so check every capability and threat against what you actually know. The Gemara path has been run on real projects; the prose self-assessment path has not been tested yet, so expect rougher edges there.

To support the upcoming `v1` release of the Gemara schemas, the completion form for this badge will ask you for a short piece of feedback if you choose Option #2 instead.

If you're a contributor with less than complete understanding of the project you're supporting, you can still help by contributing the wireframe or an initial draft of the assessment content.

**After completing your self-assessment, add the link to your Security Insights YAML file** so evaluators and adopters can easily find it.

### Option 1: Gemara Threat Assessment

[Gemara](https://gemara.openssf.org/) is a structured format for documenting capabilities (what your project does) and threats (what could go wrong with those capabilities).

This is a hyper-robust subset of a complete _Open Source Project Security Assessment_ (Option 2).

This approach is especially valuable if you want to provide regulated end users with machine-readable threat documentation.

The basic workflow:

1. **Define your scope**: Select a component or technology to assess
2. **Identify capabilities**: What can this component do? (e.g., "pull container images", "resolve version tags")
3. **Identify threats**: For each capability, what could go wrong? (e.g., "attacker replaces image tag with malicious version")
4. **Validate your YAML**: Use Gemara tooling to ensure your threat catalog is well-formed

Gemara supports importing pre-defined capabilities and threats from catalogs like FINOS Common Cloud Controls, so you don't have to start from scratch.

Check out the [Threat Assessment Guide](/library/threat-assessment-guide) in the Slam Library for a complete walkthrough with examples.

### Option 2: OSPS Self Assessment

OpenSSF maintains a documentation project on the topic of Security Assessments: https://github.com/ossf/security-assessments

The self-assessment section covers:

- Project overview and scope
- Development practices and governance
- Security controls and threat considerations
- Incident response and vulnerability management
- Dependencies and supply chain practices
