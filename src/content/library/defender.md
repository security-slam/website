---
title: "Defender Badge"
description: "Achieve a passing baseline status for the project's maturity level"
path: "/library/defender"
badge: "Defender"
weight: 5
---

## Challenge

Reach a passing OSPS Baseline status for your project's maturity level, with the result published where anyone can check it. If you earned the Mechanizer badge, you already have the pipeline: the remaining work is closing every failed control until the published scan on grc.store reports a pass. Controls the scanner can't check on its own need documented evidence a reviewer can follow, linked from your Security Insights file. Link the grc.store result from your README.

## Why?

This is what we're all working toward in this Slam.

The culmination. The complete package. The _magnum opus_.

The Cleaner, Chronicler, Inspector, and Mechanizer badges are stepping stones. Each one builds capability and demonstrates progress. The Defender is where they add up to one public, verifiable statement: this project meets the Baseline at its maturity level, and here is the proof.

The Baseline is a minimum standard of what actually works in production open source projects, and any of our projects should be able to accomplish it with some dedicated effort.

The Defender badge lets you go up on a roof and shout about it when you finish.

## Recommendations

**First, create your Security Insights YAML file** (see the [Cleaner badge](/library/cleaner)) if you haven't already. It's where the evidence for this badge gets linked.

**Second, earn the [Mechanizer badge](/library/mechanizer).** The Defender is judged from the scan the Mechanizer publishes to grc.store. Without a live, recurring result there, evaluators have nothing to check.

From there, the badge is three steps.

### 1. Know your target

Pick your [maturity level](/library/baseline-levels) and stick with it. The scan reports every control it knows how to evaluate; the ones that count for this badge are the controls tagged with your level or below. Higher levels add controls, and the scanner covers fewer of them automatically, so Level 2 and 3 projects should expect more work in step 3.

### 2. Drive the failed controls to zero

Each published result lists every control the scanner evaluated and whether it passed. Work the failed list. At Level 1, most failures are documentation the [Chronicler badge](/library/chronicler) already covers, or repository settings: a branch ruleset, secret scanning, a license file, a security policy. Fix one, merge it, and let the next run confirm it. Every push to your default branch is another run, and you can trigger the workflow by hand when you don't want to wait.

### 3. Cover what the scanner can't see

Some Baseline controls at your level will never be evaluated automatically: how maintainers make decisions, how releases are reviewed, how dependencies are vetted. For each one, write down where and how the project meets it, and link that from your Security Insights file. A link to a real document, a settings page, or a release that shows the practice in action counts. A bare "yes" doesn't. Evaluators will follow the links.

### Show it

Add a link to your project's grc.store target page at the top of your README, next to whatever badges you already display:

```markdown
[OSPS Baseline results](https://grc.store/targets/<namespace>/<target>)
```

That link, a passing scan behind it, and Security Insights entries for the rest is what you submit for the badge.

**Prefer a head start?** The Slam's [AI skills](/library/ai-skills) include a `defender` skill that runs a gap analysis across the full Baseline for your maturity level. Use it to find the controls the scan doesn't cover and to draft the evidence for them. Treat its output as a first draft, not a finished submission: the skill makes guesses about which controls you've met, so check each claim against your repository before you link it from Security Insights. It has only been run at Maturity Level 1 so far, so expect rougher edges at Level 2 or 3.

### Getting There

This is a marathon, not a sprint. Work in small merges and watch the failed count fall with each run. You can start from day one of the Slam and submit whenever the published result passes.

The Defender badge will be waiting when you're ready.
