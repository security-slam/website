---
title: "Kusari Inspector"
description: "Automated software supply chain security analysis tooling"
tags: ["Helpful Tools", "Defender"]
aliases: [tools-kusari-inspector]
author: Ben Cotton, Kusari
---

[Kusari Inspector](http://kusari.dev/developers) is a software supply chain analysis tool.
It provides feedback in pull requests or from a command-line interface to catch a variety
of software supply chain security issues in your code and in direct and transitive dependencies, including:

* Credentials and other secrets
* Typosquatted dependency names
* Common code weaknesses via static analysis
* Direct and transitive dependencies
* Known vulnerabilities, including severity (CVSS), likelihood of exploit (EPSS), and known exploited vulnerabilities
* GitHub workflow security issues
* DockerFile security issues
* Terraform security issues
* Helm Chart security issues

Kusari Inspector is provided for free to all CNCF and OpenSSF Projects.

Using Kusari Inspector can help you meet the following [OSPS Baseline](https://baseline.openssf.org) controls:

* OSPS-AC-04
* OSPS-BR-01
* OSPS-BR-07
* OSPS-QA-02
* OSPS-VM-05
* OSPS-VM-06

Documentation is available at [docs.kusari.cloud](https://docs.kusari.cloud/Inspector).
For questions or feedback, visit [kusaridev/community](https://github.com/kusaridev/community/discussions).
