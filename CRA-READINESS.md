# CRA Readiness

This project voluntarily documents its security practices using the Security Slam
[CRA Readiness checklist](https://securityslam.com/library/cra-readiness), aligned
with the EU [Cyber Resilience Act](https://openssf.org/public-policy/eu-cyber-resilience-act/).

## Disclaimer

> _This project voluntarily documents its security practices._
> _This information is provided "as is", without warranties or guarantees._
> _The maintainers and contributors:_
>
> - _have no obligations under the EU CRA,_
> - _are not Manufacturers, Importers, or Economic Operators,_
> - _assume no financial, contractual, or legal liability,_
> - _and do not provide CRA compliance assurances._
>
> _Entities incorporating this software into commercial products remain solely responsible for regulatory compliance, risk assessment, and vulnerability management._

For more context, see the ORC WG [maintainer transparency FAQ](https://cra.orcwg.org/faq/maintainers/transparency/).

## Checklist

Last reviewed: 2026-10-01

| Item | Description | Link to artifact |
| --- | --- | --- |
| Cybersecurity and Vulnerability Management Policy | Covers secure development practices, risk handling, security contact, the vulnerability reporting, remediation, and disclosure process, and the support period and end-of-life process. | [SECURITY.md](SECURITY.md) |
| Contributing Guidance | Contributing guide links to secure development practices. | [CONTRIBUTING.md](CONTRIBUTING.md) links to [Secure Development](SECURITY.md#secure-development) |
| Release Documentation | Release notes describe new functionality and security fixes. | [GitHub releases](https://github.com/security-slam/website/releases), published on every merge to `main` |
| Bug Reporting Guide | Process for reporting non-security bugs, separate from security reporting. | [Reporting Bugs](CONTRIBUTING.md#reporting-bugs) |
| MFA Enforcement | MFA is enabled for all contributors and required for admins. | The `security-slam` GitHub organization requires two-factor authentication for all members. |
| Branch Protection | Branch protection is enabled on the default branch. | The `main` ruleset requires a pull request and the `build` check, and blocks force pushes and branch deletion. See [Secure Development](SECURITY.md#secure-development). |
| License File | The repository contains a clear, OSI-approved license. | Code: [Apache-2.0](LICENSE). Content: [CC-BY-4.0](LICENSE-CONTENT). |
| OSPS Baseline | The project meets OSPS Baseline Level 1 or higher. | [OpenSSF Best Practices baseline-1 badge](https://www.bestpractices.dev/projects/15142/baseline-1) and the weekly [OSPS Baseline scan](https://github.com/security-slam/website/actions/workflows/osps-baseline.yaml) |
