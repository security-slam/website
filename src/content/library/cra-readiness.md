---
title: "CRA Readiness Badge"
description: "Implement the CRA guidelines provided by the project steward"
path: "/library/cra-readiness"
badge: "CRA Readiness"
weight: 6
---

## Challenge

Implement the CRA guidelines provided by your project's steward. For Linux Foundation projects, that guidance is [LF-Supported Projects and CRA Readiness](https://openssf.org/wp-content/uploads/2026/09/LF-Supported-Projects-and-CRA-Readiness-2026-09-10.pdf), and this page walks through it. If your project has a different steward, follow its guidance instead and submit that.

## Why?

The EU Cyber Resilience Act (CRA) puts obligations on manufacturers who ship software commercially, and it gives open source stewards a lighter set of duties to support the projects they host. The Linux Foundation acts as steward for the projects it supports, and asks each one for a few small things in return: say whether the project is in scope, say how to report a vulnerability, and know when to escalate.

None of this is a legal obligation on maintainers. It is the minimum that lets your steward do its job, and most of it is a few lines of text in files you already have.

## Recommendations

This badge is four steps, and most projects stop after the first one.

### 1. Decide whether the CRA applies

Does your project release software that is intended for use in commercial products? For open source, the steward requirements only apply to software intended for commercial activities.

**If the answer is no**, either because the project doesn't release software or because nothing it releases is meant for commercial products, add one sentence to your `SECURITY.md` and you're done:

```markdown
We do not anticipate this project being used in commercial products. See [LF-Supported Projects and CRA Readiness](https://openssf.org/wp-content/uploads/2026/09/LF-Supported-Projects-and-CRA-Readiness-2026-09-10.pdf) for more information.
```

Your submission is the link to that `SECURITY.md`.

**If the answer is yes**, continue.

### 2. Publish a CRA stewardship statement

Add the steward's statement to your `SECURITY.md` (or similarly named file), verbatim:

```markdown
CRA stewardship: This project is supported under the Linux Foundation CRA stewardship framework, as described at https://www.linuxfoundation.org/security. Security vulnerabilities should be reported through the mechanisms described below, which we will coordinate with our CRA steward. For actively exploited vulnerabilities and severe incidents that may require CRA escalation, please use the project's emergency security reporting mechanisms as appropriate.
```

Below it, describe exactly how maintainers want to receive vulnerability reports from the community. We'll check `SECURITY.md` for the statement and for a reporting process that matches what you actually run.

### 3. Record your vulnerability reporting channel in Security Insights

Keep an accessible, private reporting mechanism open. GitHub private vulnerability reporting is recommended where supported. Then record it in the `project.vulnerability-reporting` block of your `security-insights.yml` (see the [Cleaner badge](/library/cleaner)):

```yaml
project:
  vulnerability-reporting:
    reports-accepted: true
    bug-bounty-available: false
    policy: https://github.com/<org>/<repo>/blob/main/SECURITY.md
    contact:
      name: <security contact or mailgroup>
      primary: true
      email: <address>
    comment: >-
      Report vulnerabilities through GitHub private vulnerability reporting:
      https://github.com/<org>/<repo>/security/advisories/new
```

We'll check that `reports-accepted` is true, that `policy` points at the `SECURITY.md` from step 2, and that the contact or comment describes a working channel.

### 4. Document the steward escalation policy in CONTRIBUTING.md

Add a short section to your `CONTRIBUTING.md` so maintainers know when to involve the steward. It should say that the project escalates two kinds of event to the LF steward at `steward@linuxfoundation.org`:

- **Actively exploited vulnerabilities:** a vulnerability where the project has reliable evidence that a malicious actor has exploited it.
- **Severe incidents:** a security compromise of the project's own IT infrastructure.

Ordinary vulnerabilities with no evidence of exploitation are not escalation events. Remediation should never wait on the escalation decision.

Your submission is the links to `SECURITY.md`, `security-insights.yml`, and `CONTRIBUTING.md`.

### Further reading

The [CRA Readiness Guide](/library/cra-readiness-guide) covers the voluntary good practices that go beyond what the steward asks for, and the OpenSSF's [EU Cyber Resilience Act](https://openssf.org/public-policy/eu-cyber-resilience-act/) page has the background. Completing the [Defender badge](/library/defender) remains the best preparation for the rest.
