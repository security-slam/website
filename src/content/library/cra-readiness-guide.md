---
title: CRA Readiness Guide
description: Guide to EU Cyber Resilience Act (CRA) readiness preparation
tags: [CRA Readiness, Supplemental Knowledge]
author: Roman Zhukov (Red Hat) + Madalin Neag (Linux Foundation)
---

This is the short guide that will help you to implement voluntary good security practice and improve the quality and robustness of your projects that are aligned with the [EU CRA (Cyber Resilience Act)](https://openssf.org/public-policy/eu-cyber-resilience-act/). 

Open source developers and maintainers contribute essential digital infrastructure used across society. Many projects are created through voluntary effort for the common good, forming the foundation of modern software ecosystems.

To be absolutely clear:  **you don’t have to do anything at all because of the CRA**, if you’re maintaining an open source project without commercial monetization or placing products on the EU market.   
Which applies to \*almost all\* open source projects. The CRA does not impose obligations on individual open source developers or volunteer maintainers merely for publishing or maintaining code.  
 However, you **may voluntarily choose** to implement widely accepted security best practices that align with modern secure development expectations and may assist downstream users who integrate your software into regulated products. Read more: [Cyber Resilience Act (CRA) Brief Guide for Open Source Software (OSS) Developers](https://best.openssf.org/CRA-Brief-Guide-for-OSS-Developers). 

Since there are no regulatory requirements for most open source projects, we will be using the term “CRA Readiness” only as a voluntary transparency indicator that may help your users understand that you not only take security seriously, but also aim to adhere to the novel top-tier worldwide standards and policy.

## How To Approach “CRA Readiness”

There is currently no “official” CRA Readiness certification or standard for open source projects. There are a number of efforts underway on how to approach CRA Readiness, including [OpenSSF Global Cyber Policy Working Group](https://github.com/ossf/wg-globalcyberpolicy)(GCP), [OpenSSF Orbit WG](https://github.com/ossf/wg-orbit), [Open Source Project Security Baseline (OSPS)](https://github.com/ossf/security-baseline)  and others.

The following simplified CRA Readiness checklist represents minimal voluntary practices for your open source project that also makes sense from the good software engineering and open source security practices.

| Item | Description | Notes and Examples | Link to artefact |
| :---- | :---- | :---- | :---- |
| Cybersecurity and Vulnerability Management Policy | A published policy must, at a minimum, address: 1\) Secure development practices 2\) How project risks are handled 3\) Contact information for security and vulnerability questions 4\) The processes for vulnerability reporting,  identification, remediation, patching, coordinated disclosure 5\) End of line plan that defines the intended support period for addressing vulnerabilities  and the end-of-life process  | A publicly and clearly accessible file or a section. It may be in the project's official documentation, a contributor guide, or within an .md in the repo, e.g. part of SECURITY.md or security.txt [Example 1](https://github.com/kubevirt/kubevirt?tab=security-ov-file)  [Example 2](https://github.com/uxlfoundation/oneDNN?tab=security-ov-file)  [Example 3](https://github.com/nodejs/node?tab=security-ov-file) (advanced) [Example 4](https://github.com/tensorflow/tensorflow?tab=security-ov-file) (advanced) [Example 5](https://docs.djangoproject.com/en/dev/internals/security/) (external reference) [Example 6](https://www.python.org/dev/security/) (external reference) A publicly documented policy increases transparency but does not create legal obligations for maintainers. | \[Link to your Policy\] |
| Contributing Guidance | Contributing guidance (or how to join) should include explicit links to secure development practices. | CONTRIBUTING.md file is commonly used for this purpose, but it could be on the website or documentation page. [Example 1](https://gist.github.com/PurpleBooth/b24679402957c63ec426)  [Example 2](https://github.com/uxlfoundation/oneDNN?tab=contributing-ov-file) | \[link to your Contributing guidance\] |
| Release Documentation | If you do releases or tags, ensure corresponding documentation describing new functionality or user guides. It should include Security fixes, if any. | This could be in log files (e.g, CHANGELOG.md) or as a separate webpage, etc. [Example 1](https://github.com/kubevirt/kubevirt/releases/tag/v1.7.0) [Example 2](https://github.com/kyverno/kyverno/blob/main/CHANGELOG.md) [Example 3](https://github.com/uxlfoundation/oneDPL/blob/main/documentation/release_notes.rst) | \[Example link to the latest Release docs or Logs\] |
| Bug Reporting Guide | Document process for reporting issues/bugs/defects. This should be clearly distinguished from security reporting. | Can be in the same file as the contributing guide or included to the release process description.  [Example 1](https://github.com/kyverno/kyverno/blob/main/CONTRIBUTING.md) (part of CONTRIBUTING.md) [Example 2](https://github.com/nodejs/node/blob/main/doc/contributing/issues.md#submitting-a-bug-report) (part of ISSUES.md) | \[Link to the doc where you explain how to report non-security bugs\] |
| MFA Enforcement | If your project platform supports it, enable MFA for all contributors. This is a MUST for high-privileged roles such as admins. | [How to enable MFA in GitHub](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication) | \[A brief statement that you’ve done it on your platform, optionally \- how\] |
| Branch Protection | If your project platform supports it, enable branch protection in org or repo settings. | [Branch Protection in GitHub](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule) | \[A brief statement that you’ve done it on your platform, optionally \- how\] |
| Licence File | Repository should contain a clear LICENSE or COPYING file. | It’s strongly recommended for open source projects to use one of the commonly used licences, e.g from  [OSI Approved Licenses catalogue](https://opensource.org/licenses). [Example](https://github.com/kubevirt/kubevirt?tab=Apache-2.0-1-ov-file) A clear license also helps prevent misunderstanding regarding liability and responsibility boundaries. | \[Link to your licence file\] |
| OSPS | Achieve Open Source Project Security Baseline (OSPS) Level 1, at minimum. NOTE: If you implemented all the above, you most likely almost achieved OSPS L1 already. | More details at [baseline.openssf.org](http://baseline.openssf.org). | \[You can publish or link to a [OSPS checklist](https://baseline.openssf.org/versions/2025-10-10-checklist.md)\] |

## How To Document “CRA Readiness”

Ideally, the CRA Readiness needs to be documented in both human-readable and machine-readable formats. Such documentation is intended solely for transparency and communication, **not regulatory compliance**.

### Human-readable (default option)

Simply create a file in your repo that contains the table (checklist) above. Link this file from your [readme.md](http://readme.md) for easy navigation. To avoid any misunderstanding, include a clear disclaimer stating:  

> “*This project voluntarily documents its security practices.*  
*This information is provided “as is”, without warranties or guarantees.*  
*The maintainers and contributors:*

- *have no obligations under the EU CRA,*  
- *are not Manufacturers, Importers, or Economic Operators,*  
- *assume no financial, contractual, or legal liability,*  
- *and do not provide CRA compliance assurances.*  
  *Entities incorporating this software into commercial products remain solely responsible for regulatory compliance, risk assessment, and vulnerability management.*”

The above statement can be complemented with the additional legal references ([Example can be found here](https://cra.orcwg.org/faq/maintainers/transparency/)).

Optionally, the good practice is to create a separate file ([Example of a CNCF project security self-assessment.md](https://github.com/cncf/toc/blob/e67e3e4e4396f131913cd226fc0fb0db04e7e67f/projects/k3s/self-assessment.md)) that compiles your project security posture, secure development processes, threat model and related details, where you can also add or link the Checklist Table above.

### Machine-readable (advanced option)

Convert the checklist table above into machine-readable format and add it to overall description of your security posture, for example in a format of [security-insights.YAML](http://github.com/ossf/security-insights-spec)

* [Example](https://github.com/kyverno/kyverno/blob/main/SECURITY-INSIGHTS.yml)

TIP: In the [LFX Insights](https://insights.linuxfoundation.org/) you can generate a YAML security file right from the interface (go to your project “Security & Best Practices” section).  
![][image1]

## Get Help and Next Steps

If you have any CRA-related questions, please ask them right away here: [OpenSSF Global Cyber Policy (GCP) Slack](https://openssf.slack.com/archives/C084A6XPX0F).

If you wish to further improve your project security posture and follow the spirit of the CRA, consider exploring:

- [Generate SBOMs](https://openssf.org/technical-initiatives/sbom-tools/)  
- Consider implementing [Supply-chain Levels for Software Artifacts (SLSA)](https://slsa.dev/), start with Level 1  
- Obtain an [OpenSSF Best Practices Badge](https://www.bestpractices.dev/en)  
- Consider achieving [OSPS Level 2 and Level 3](http://baseline.openssf.org)  
- Automate compliance with [Gemara](https://github.com/gemaraproj)  
- Automate repo security with [Minder](https://openssf.org/projects/minder/)  
- Implement continuous checks with [Scorecards](https://github.com/ossf/scorecard)

Remember \- all these activities are engineering improvements, not CRA requirements.

Open source maintainers already:

- Contribute critical infrastructure.  
- Donate time and expertise  
- And enable innovation across the digital economy

[image1]: /library-images/insights-yaml-form.png