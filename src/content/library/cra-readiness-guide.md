---
title: "CRA Readiness Guide for Security Slam KubeCon EU 2026"
description: Guide to EU Cyber Resilience Act (CRA) readiness preparation
tags: [CRA Readiness, Supplemental Knowledge]
author: Roman Zhukov (Red Hat) + Madalin Neag (Linux Foundation)
---

## What This Is

This is a short guide that will help you to implement voluntary good security practice and improve the quality and robustness of your projects that are aligned with the [EU Cyber Resilience Act (CRA)](https://openssf.org/public-policy/eu-cyber-resilience-act/).

Open source developers and maintainers contribute essential digital infrastructure used across society. Many projects are created through voluntary effort for the common good, forming the foundation of modern software ecosystems.

To be absolutely clear: **you don’t have to do anything at all because of the CRA**, if you’re maintaining an open source project without commercial monetization or placing products on the EU market. This applies to *almost all* open source projects. The CRA does not impose obligations on individual open source developers or volunteer maintainers merely for publishing or maintaining code. It further clarifies that the regulation does not apply to natural or legal persons who contribute source code to free and open-source software that is not under their responsibility ([Recital 18](https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ:L_202402847#rct_18)).

However, you **may voluntarily choose** to implement widely accepted security best practices that align with modern secure development expectations and may assist downstream users who integrate your software into regulated products. Doing so will make your project more attractive for downstream consumers to use and contribute back to.

Under the CRA, manufacturers placing products with digital elements on the EU market are required to exercise due diligence when integrating software components, including third-party and open source components, as part of ensuring that their products meet the applicable cybersecurity requirements.

Open source maintainers are not responsible for performing this due diligence. This responsibility cannot be delegated upstream to open source maintainers or contributors, even when their software is used as part of a commercial product. However, voluntary transparency about project practices can make it easier for downstream users to perform their own legal responsibilities.

If your project is hosted by a steward such as the Linux Foundation, the [CRA Readiness badge](/library/cra-readiness) lists the few things your steward asks for. This guide covers the voluntary practices beyond that.

Read more:

- [Cyber Resilience Act (CRA) Brief Guide for Open Source Software (OSS) Developers](https://best.openssf.org/CRA-Brief-Guide-for-OSS-Developers).
- [CRA Readiness Guide for Maintainers and Developers](https://policy.openssf.org/CRA/maintainers.html)

Since there are no regulatory requirements for most open source projects, the term “CRA Readiness” in this guide is used only as a voluntary transparency indicator that may help users understand that the project follows recognized security and engineering practices. It is not a legal status, certification, or regulatory designation. It is a communication and transparency practice intended to support trust, security, and responsible downstream use.

Under the CRA, manufacturers placing products with digital elements on the EU market are required to exercise due diligence when integrating software components, including third-party and open source components, as part of ensuring that their products meet the applicable cybersecurity requirements.

Open source maintainers are not responsible for performing this due diligence. This responsibility cannot be delegated upstream to open source maintainers or contributors, even when their software is used as part of a commercial product. However, voluntary transparency about project practices can make it easier for downstream users to perform their own legal responsibilities.

Read more: 

- [Cyber Resilience Act (CRA) Brief Guide for Open Source Software (OSS) Developers](https://best.openssf.org/CRA-Brief-Guide-for-OSS-Developers).  
- [CRA Readiness Guide for Maintainers and Developers](https://policy.openssf.org/CRA/maintainers.html) 

Since there are no regulatory requirements for most open source projects, the term “CRA Readiness” in this guide is used only as a voluntary transparency indicator that may help users understand that the project follows recognized security and engineering practices. It is not a legal status, certification, or regulatory designation. It is a communication and transparency practice intended to support trust, security, and responsible downstream use.

# How To Approach “CRA Readiness”

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
| OSPS | Achieve Open Source Project Security Baseline (OSPS) Level 1, at minimum. NOTE: If you implemented all the above, you most likely almost achieved OSPS L1 already. | More details at [baseline.openssf.org](https://baseline.openssf.org). | \[You can publish or link to a [OSPS checklist](https://baseline.openssf.org/versions/2025-10-10-checklist.md)\] |

# How To Document “CRA Readiness”

Ideally, the CRA Readiness needs to be documented in both human-readable and machine-readable formats. Such documentation is intended solely for transparency and communication, **not regulatory compliance**. Publicly sharing this information should allow your downstream consumers and government officials to gain answers to their questions without needing to interrupt the project team.

## Human-readable (default option)

Simply create a file in your repo that contains the table (checklist) above. Link this file from your `README.md` for easy navigation. To avoid any misunderstanding, include a clear disclaimer stating:

> “*This project voluntarily documents its security practices.*
> *This information is provided “as is”, without warranties or guarantees. See the project’s license for more details.*
> *The maintainers and contributors:*
> \- *have no obligations under the EU CRA,*
> \- *are not Manufacturers, Importers, or Economic Operators,*
> \- *assume no financial, contractual, or legal liability,*
> \- *and do not provide CRA compliance assurances.*
> *Anyone incorporating this software into commercial products remains solely responsible for such products, including regulatory compliance, risk assessment, and vulnerability management.*”

The above statement can be complemented with the additional legal references ([Example can be found here](https://cra.orcwg.org/faq/maintainers/transparency/)).

Optionally, the good practice is to create a separate file ([Example of a CNCF project security self-assessment.md](https://github.com/cncf/toc/blob/e67e3e4e4396f131913cd226fc0fb0db04e7e67f/projects/k3s/self-assessment.md)) that compiles your project security posture, secure development processes, threat model and related details, where you can also add or link the Checklist Table above.

## Machine-readable (advanced option)

Convert the checklist table above into machine-readable format and add it to overall description of your security posture, for example in a format of [security-insights.YAML](https://github.com/ossf/security-insights-spec)

* [Example](https://github.com/kyverno/kyverno/blob/main/SECURITY-INSIGHTS.yml)

TIP: In the [LFX Insights](https://insights.linuxfoundation.org/) you can generate a YAML security file right from the interface (go to your project “Security & Best Practices” section).
![][image1]

Additionally, if your project is under The Linux Foundation’s umbrella, please follow the most recent guidance that can be found here [https://cra-lf-readiness.openssf.org/](https://cra-lf-readiness.openssf.org/) and publish a short CRA stewardship notice.

## Get Help and Next Steps

If you have any CRA-related questions, please ask them right away here: [OpenSSF Global Cyber Policy (GCP) Slack](https://openssf.slack.com/archives/C084A6XPX0F).

If you wish to further improve your project security posture and follow the spirit of the CRA, consider exploring:

* [Generate SBOMs](https://openssf.org/technical-initiatives/sbom-tools/)
* Consider implementing [Supply-chain Levels for Software Artifacts (SLSA)](https://slsa.dev/), start with Level 1
* Obtain an [OpenSSF Best Practices Badge](https://www.bestpractices.dev/en)
* Consider achieving [OSPS Level 2 and Level 3](https://baseline.openssf.org)
* Automate compliance with [Gemara](https://github.com/gemaraproj)
* Automate repo security with [Minder](https://openssf.org/projects/minder/)
* Implement continuous checks with [Scorecards](https://github.com/ossf/scorecard)

Remember \- all these activities are engineering improvements, not CRA requirements which should make your project more appealing and easier for downstream entities to integrate.

Open source maintainers already:

- Contribute critical infrastructure.
- Donate time and expertise
- And enable innovation across the digital economy

The intent of supporting CRA efforts across open source ecosystems is **to support, not burden**, maintainers and  contributors. Because we understand that practical support \- tooling, funding, coordination, and responsible downstream behavior \- is essential for sustainable cybersecurity.

[image1]: /library-images/insights-yaml-form.png
