---
title: "Chronicler Badge"
description: "Complete all Baseline documentation tasks"
path: "/library/chronicler"
badge: "Chronicler"
weight: 2
---

## Challenge

Complete all Baseline documentation tasks

## Why?

We get it. Documentation doesn't _feel_ like security work. You're not hardening systems, you're not patching vulnerabilities, you're not implementing the latest cryptography.

But here's the truth that industry experts have learned the hard way: good security practice is always preceded by good documentation. We just want to be more structured about what that documentation includes.

Because this is how you:

- Communicate security expectations to contributors
- Demonstrate security practices to adopters and auditors
- Create institutional knowledge that survives team turnover
- Enable others to reproduce and verify your security claims
- Make intentional decisions instead of reactive ones

You can build a beautiful house... but if you don't lay a solid foundation, everything else will slowly deteriorate or it could suddenly crumble around you at any moment.

## How?

**First, create your Security Insights YAML file** (see the [Cleaner badge](/library/cleaner)) with basic information if you haven't already. You can complete that badge even without all your documentation in place yet.

The OSPS Baseline includes several [documentation-focused controls](https://baseline.openssf.org/versions/2026-02-19#documentation). To earn the Chronicler badge, you'll need to complete all of the requirements respective to your project's [maturity level](/library/baseline-levels).

If you're at Maturity Level 2 or 3, start with the lower levels and move up.

**Prefer a head start?** The Slam's [AI skills](/library/ai-skills) include a `chronicler` skill that checks your repository against the documentation controls for your maturity level and drafts what's missing. Treat its output as a first draft, not a finished doc: the skill makes guesses where your project is ambiguous, so read every file it writes and correct anything that doesn't describe what you actually do.

**As you create each piece of documentation, add its location to your Security Insights YAML file.** This makes it easy for evaluators and end-users to find all your security documentation in one place. Here are the different types of documentation you can have in your insights file - ([project level](https://github.com/ossf/security-insights/blob/main/spec/schema.md#projectdocumentation), [repository level](https://github.com/ossf/security-insights/blob/main/spec/schema.md#repositorydocumentation)).

While you're working, remember: A short, accurate doc is infinitely better than a comprehensive document that nobody maintains.
