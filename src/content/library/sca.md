---
title: "Open Source and Enterprise SCA: Same Tools, Different Expectations"
description: Understanding SCA is essential to meet the OSPS-VM-05 control objective
tags: [OSPS Baseline]
image: /project-logos/baseline.png
author: Aaron Linskens, Sonatype
---

The OSPS Baseline control `OSPS-VM-05` states that projects must "Identify and address defects and security weaknesses in the project's imported code early in the development process, reducing the risk of shipping insecure software." And within the assessment requirements there are multiple mentions of software composition analysis (SCA). VM-05's assessment requirements apply at Maturity Level 3 only.

SCA is a foundational practice in modern software development. At its core, SCA helps identify vulnerabilities, license risks, and policy violations within open source dependencies.

As open source now comprises most software stacks, understanding dependency risk is no longer optional.

An enterprise security team and an open source project maintainer may both scan dependencies and review vulnerability reports. But the policies, thresholds, and enforcement models guiding those activities are fundamentally different.

## Enterprises: Risk Mitigation and Auditability

In enterprise environments, SCA operates within formal governance frameworks. Organizations face regulatory obligations, contractual commitments, and internal compliance standards. The goal is not only to detect vulnerabilities, but also to demonstrate due diligence.

Enterprise SCA programs typically emphasize:

* Regulatory alignment (e.g., NIST SSDF, ISO standards).  
* Documented policies and audit trails.  
* Defined severity thresholds.  
* Formal exception management.  
* Automated release gating.

Builds may be blocked if vulnerabilities exceed a defined severity. Security teams track metrics such as remediation timelines and open findings across portfolios. These controls reduce liability exposure and provide defensible documentation if an incident occurs.

For commercial software shipped at scale, this model makes sense.

## Open Source: Transparency and Sustainable Hygiene

Open source projects operate under different constraints. Many are community-driven and maintained by volunteers without dedicated security teams or compliance mandates.

For OSS maintainers, SCA should focus less on audit readiness and more on security hygiene and community trust.

Healthy projects prioritize:

* Transparent issue tracking.  
* Clear vulnerability disclosure processes.  
* Responsible dependency management.  
* Practical, sustainable remediation.

The objective is not to eliminate every vulnerability immediately, but to ensure that risks are visible, decisions are documented, and progress is made over time.

In open source, security is less about legal defensibility and more about ecosystem stewardship.

## Policy Thresholds: Clarity Over Rigidity

Security baseline initiatives increasingly encourage projects to document how they handle dependency risk. That includes defining:

* What severity levels require remediation.  
* Whether certain vulnerabilities block releases.  
* When suppressions are acceptable.

Without documented thresholds, SCA results can create confusion. Should a medium-severity issue delay a release? What if no fix exists? When is blocking appropriate?

Clear, published policy prevents these questions from becoming recurring debates in pull requests.

For example, a project could block merges for critical vulnerabilities with known exploits, require remediation plans for high-severity issues, and triage medium findings without halting releases. Unfixed vulnerabilities can be tracked and documented until resolved upstream.

The goal is not strict enforcement for its own sake but consistent, transparent decision-making.

## Blocking Policies and Contributor Experience

Enterprise pipelines often enforce strict, centralized controls. In open source repositories, blocking policies must balance security with contributor experience.

Overly aggressive gating can discourage participation. A contributor submitting a documentation fix should not be blocked by an unrelated transitive dependency issue.

OSS projects benefit from proportional enforcement, such as evaluating only newly introduced vulnerabilities, differentiating between direct and transitive dependencies, and applying stricter controls to release branches than development branches.

Security should raise standards without unnecessary barriers.

## Transparency Over Perfection

Enterprises often aim for zero high-severity vulnerabilities in production. Open source projects operate within shared ecosystems, where upstream fixes may take time.

What matters most is that vulnerabilities are visible, decisions are documented, remediation plans are clear, and the community is informed.

Transparency builds trust — even when remediation is incremental.

## Context Matters

SCA is not one-size-fits-all. Enterprises optimize for compliance and liability management. Open source projects optimize for collaboration, sustainability, and shared responsibility.

Treating these environments as identical risks, either overburdening maintainers or under-protecting regulated software supply chains.

The tools may be the same. The expectations should not be. Thoughtfully designed SCA policies — tailored to context — strengthen not only codebases, but also the trust that makes open source possible.
