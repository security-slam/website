---
title: Let's Make a Threat Catalog
description: Come learn with me as I start drafting a new Gemara threat assessment
tags: [Inspector, Gemara]
author: Eddie Knight
videoUrl: https://www.dropbox.com/scl/fi/versnlv0rxbfofuj6pibv/Let-s-Make-a-Threat-Catalog.mp4?rlkey=ozrrgnc7gj57b1nq87ggd5bji&st=yar7cpw4&raw=1
---

If you're not sure how to approach the _Inspector_ badge, this is how I started. I have some familiarity with the process, but it's been a while since I've done it, so in this video I talk through all the different considerations I have while starting from scratch with a new threat assessment.

This isn't an end-to-end walkthrough, but I anticipate it'll be a good kickstart for folks who follow along with their own projects.

Below are the final artifacts.

I've included some threats that are already mitigated. This allows me to reference these as known-threats when I create additional documentation, a self-assessment document, or a more complete threat model.

Note that for completion of the security slam badge, we do _not_ need to go as far as to do a comprehensive assessment. The point is to kickstart something that can be extended later.

**Updated for Gemara v1.5.0.** The video shows capabilities and threats in a single file, which is how earlier versions of the schema worked. In v1.5.0 capabilities live in their own Capability Catalog and the threat catalog points at it through a mapping reference, so each of the two scopes below is now a pair of artifacts. The `imported-capabilities` and `imported-threats` lists have also been merged into one `imports` list, `metadata.type` and `metadata.gemara-version` are required, and every capability and threat belongs to a declared `group`. See the [Threat Assessment Guide](/library/threat-assessment-guide) for the field-by-field walkthrough.

## Initial Privateer SDK Capabilities

```yaml
title: Privateer SDK Capability Catalog
metadata:
  id: PrivProj.SDK.CAP
  type: CapabilityCatalog
  gemara-version: "1.5.0"
  version: 2026.Feb.28
  description: Capabilities of the Privateer SDK, assessed for threats in PrivProj.SDK
  author:
    id: pvtr-maintainers
    name: Privateer Maintainer Group
    type: Human

groups:
  - id: distribution
    title: Distribution
    description: Capabilities covering how the SDK is versioned, released, and consumed.
  - id: plugin-framework
    title: Plugin Framework
    description: Capabilities that plugin authors build on, including interfaces and evaluation logic.
  - id: configuration
    title: Configuration
    description: Capabilities for managing settings and environment data across Privateer and its plugins.

capabilities:
  - id: PrivProj.SDK.CP01
    title: Go Package
    description: Privateer SDK is a go package, version controlled and released via GitHub and distributed by pkg.go.dev
    group: distribution
  - id: PrivProj.SDK.CP02
    title: Plugin Development Kit
    description: Provides the foundational logic required for building the base of any Privateer plugin
    group: plugin-framework
  - id: PrivProj.SDK.CP03
    title: Shared Plugin Interfaces
    description: Standardizes data structures across diverse plugin implementations
    group: plugin-framework
  - id: PrivProj.SDK.CP04
    title: Configuration Management
    description: Manages plugin settings, environment variables, and configuration logic for Privateer (core) and plugins
    group: configuration
  - id: PrivProj.SDK.CP05
    title: Evaluation Framework
    description: Orchestrates assessment logic to ensure consistent machine-readable validation
    group: plugin-framework
```

## Initial Privateer SDK Threats

```yaml
title: Privateer SDK Self-Assessment
metadata:
  id: PrivProj.SDK
  type: ThreatCatalog
  gemara-version: "1.5.0"
  version: 2026.Feb.28
  description: Threat catalog for Privateer SDK Self-Assessment
  author:
    id: pvtr-maintainers
    name: Privateer Maintainer Group
    type: Human
  mapping-references:
    - id: CCC
      title: Common Cloud Controls Core
      version: v2025.10
      url: https://github.com/finos/common-cloud-controls/releases/download/v2025.10/CCC.Core_v2025.10.yaml
      description: |
        Foundational repository of reusable security controls, capabilities,
        and threat models maintained by FINOS.
    - id: PrivProj.SDK.CAP
      title: Privateer SDK Capability Catalog
      version: 2026.Feb.28
      description: Capabilities of the Privateer SDK that the threats below exploit.

imports:
  - reference-id: PrivProj.SDK.CAP
    entries:
      - reference-id: PrivProj.SDK.CP01
      - reference-id: PrivProj.SDK.CP02
      - reference-id: PrivProj.SDK.CP03
      - reference-id: PrivProj.SDK.CP05

groups:
  - id: supply-chain
    title: Supply Chain
    description: Threats to the integrity of the SDK source, its dependencies, and its releases.
  - id: interface-stability
    title: Interface Stability
    description: Threats arising from changes to shared interfaces and evaluation logic.

threats:
  - id: PrivProj.SDK.TH01
    title: Source Repository is Compromised
    description: |
      Access control failures on the source repository may result in distribution of compromised code,
      which will then compromise all downstream users.
    group: supply-chain
    capabilities:
      - reference-id: PrivProj.SDK.CAP
        entries:
          - reference-id: PrivProj.SDK.CP01
          - reference-id: PrivProj.SDK.CP02
  - id: PrivProj.SDK.TH02
    title: Undetected Breaking Changes Disrupt Downstream Plugins
    description: |
      Syntactic or behavioral modifications to core interfaces or evaluation logic may disrupt
      compatibility for existing plugins, leading to silent validation failures or logic errors
      in security assessments.
    group: interface-stability
    capabilities:
      - reference-id: PrivProj.SDK.CAP
        entries:
          - reference-id: PrivProj.SDK.CP02
          - reference-id: PrivProj.SDK.CP03
          - reference-id: PrivProj.SDK.CP05
  - id: PrivProj.SDK.TH03
    title: Supply Chain Contamination via Dependencies
    description: |
      The use of unvetted, unpinned, or compromised third-party Go modules can
      introduce vulnerabilities or malicious logic into the SDK and derived plugins.
    group: supply-chain
    capabilities:
      - reference-id: PrivProj.SDK.CAP
        entries:
          - reference-id: PrivProj.SDK.CP01
```

## Initial Privateer CLI Capabilities

```yaml
title: Privateer CLI Capability Catalog
metadata:
  id: PrivProj.CLI.CAP
  type: CapabilityCatalog
  gemara-version: "1.5.0"
  version: 2026.Feb.28
  description: Capabilities of the Privateer CLI, assessed for threats in PrivProj.CLI
  author:
    id: pvtr-maintainers
    name: Privateer Maintainer Group
    type: Human
  mapping-references:
    - id: CCC
      title: Common Cloud Controls Core
      version: v2025.10
      url: https://github.com/finos/common-cloud-controls/releases/download/v2025.10/CCC.Core_v2025.10.yaml
      description: |
        Foundational repository of reusable security controls, capabilities,
        and threat models maintained by FINOS.

imports:
  - reference-id: CCC
    entries:
      - reference-id: CCC.Core.CP10
        remarks: Log Publication (Privateer doesn't send logs, but does write to io and file)
      - reference-id: CCC.Core.CP28
        remarks: Command-line Interface

groups:
  - id: configuration
    title: Configuration
    description: Capabilities for ingesting and managing user configuration, variables, and secrets.
  - id: plugin-lifecycle
    title: Plugin Lifecycle
    description: Capabilities for discovering, generating, and executing plugins.
  - id: output
    title: Output
    description: Capabilities that control where logs and evaluation results are written.

capabilities:
  - id: PrivProj.CLI.CP01
    title: User Configuration Ingestion
    description: |
      Accepts CLI inputs and reads user-provided YAML configuration files to determine
      runtime behavior for the core CLI and selected plugins
    group: configuration
  - id: PrivProj.CLI.CP02
    title: Multi-plugin Variable Handling
    description: Manages configuration variables and secrets for all plugins that are executed
    group: configuration
  - id: PrivProj.CLI.CP03
    title: Plugin Enumeration
    description: |
      Detects plugins available on the local filesystem by searching a well-known
      or user-defined location
    group: plugin-lifecycle
  - id: PrivProj.CLI.CP04
    title: Plugin Execution
    description: |
      Executes one or more plugins as independent sub-processes and directs output
      to the terminal or filesystem
    group: plugin-lifecycle
  - id: PrivProj.CLI.CP05
    title: Plugin Generation
    description: |
      Automates the generation of plugin scaffolding from Gemara Control Catalogs
      using the `generate-plugin` command
    group: plugin-lifecycle
  - id: PrivProj.CLI.CP06
    title: Configurable Log Output
    description: Allows users to adjust the verbosity and location of log outputs
    group: output
  - id: PrivProj.CLI.CP07
    title: Configurable Result Output
    description: Allows users to configure the output location for runtime execution results
    group: output
```

## Initial Privateer CLI Threats

```yaml
title: Privateer CLI Self Assessment
metadata:
  id: PrivProj.CLI
  type: ThreatCatalog
  gemara-version: "1.5.0"
  version: 2026.Feb.28
  description: Threat catalog for Privateer CLI
  author:
    id: pvtr-maintainers
    name: Privateer Maintainer Group
    type: Human
  mapping-references:
    - id: CCC
      title: Common Cloud Controls Core
      version: v2025.10
      url: https://github.com/finos/common-cloud-controls/releases/download/v2025.10/CCC.Core_v2025.10.yaml
      description: |
        Foundational repository of reusable security controls, capabilities,
        and threat models maintained by FINOS.
    - id: PrivProj.CLI.CAP
      title: Privateer CLI Capability Catalog
      version: 2026.Feb.28
      description: Capabilities of the Privateer CLI that the threats below exploit.

imports:
  - reference-id: CCC
    entries:
      - reference-id: CCC.Core.TH07
        remarks: Logs are Tampered With or Deleted
      - reference-id: CCC.Core.TH16
        remarks: Publications are Disabled
  - reference-id: PrivProj.CLI.CAP
    entries:
      - reference-id: PrivProj.CLI.CP01
      - reference-id: PrivProj.CLI.CP02
      - reference-id: PrivProj.CLI.CP03
      - reference-id: PrivProj.CLI.CP04
      - reference-id: PrivProj.CLI.CP05
      - reference-id: PrivProj.CLI.CP07

groups:
  - id: plugin-execution
    title: Plugin Execution
    description: Threats arising from how plugins are discovered, generated, and run.
  - id: data-protection
    title: Data Protection
    description: Threats to the confidentiality of configuration data, secrets, and results.

threats:
  - id: PrivProj.CLI.TH01
    title: Plugin Binary Hijacking
    description: |
      Privateer discovers plugins in local directories. If an attacker gains write access to
      the plugin path, they can place a malicious binary that Privateer will execute.
      This may be used to feed inaccurate data into the victim's security scans,
      and/or compromise the target resource.
    group: plugin-execution
    capabilities:
      - reference-id: PrivProj.CLI.CAP
        entries:
          - reference-id: PrivProj.CLI.CP03
          - reference-id: PrivProj.CLI.CP04
  - id: PrivProj.CLI.TH02
    title: Config Secrets are Unintentionally Accessed by a Different Plugin
    description: |
      Privateer manages all variables, including secrets, in the same process. If users are running
      multiple plugins from different authors or contexts, sensitive variables intended for one
      context may become accessible to another plugin executed in the same run.
    group: data-protection
    capabilities:
      - reference-id: PrivProj.CLI.CAP
        entries:
          - reference-id: PrivProj.CLI.CP01
          - reference-id: PrivProj.CLI.CP02
  - id: PrivProj.CLI.TH03
    title: Sensitive Data Exposure via Insecure Configuration Permissions
    description: |
      Configuration files containing resource identifiers or sensitive metadata are stored on
      the local filesystem. In shared or improperly isolated environments, insecure file
      permissions can lead to the unauthorized exposure of these artifacts.
    group: data-protection
    capabilities:
      - reference-id: PrivProj.CLI.CAP
        entries:
          - reference-id: PrivProj.CLI.CP01
          - reference-id: PrivProj.CLI.CP07
  - id: PrivProj.CLI.TH04
    title: Unintentional Plugin Enumeration
    description: |
      If an attacker gains the ability to run Privateer CLI, even in a sandbox or ephemeral environment,
      and even without access to configuration data, they may be able to infer the contents of the
      victim's production environment by enumerating Privateer plugins.
    group: plugin-execution
    capabilities:
      - reference-id: PrivProj.CLI.CAP
        entries:
          - reference-id: PrivProj.CLI.CP03
  - id: PrivProj.CLI.TH05
    title: Insecure Defaults in Generated Scaffolding
    description: |
      If the templates used by the `generate-plugin` command contain insecure default settings or
      vulnerable boilerplate, all new plugins generated by the CLI will inherit these flaws,
      scaling the vulnerability across the ecosystem.
    group: plugin-execution
    capabilities:
      - reference-id: PrivProj.CLI.CAP
        entries:
          - reference-id: PrivProj.CLI.CP05
  - id: PrivProj.CLI.TH06
    title: Scaffolding Template Poisoning
    description: |
      Compromise of the `plugin-generator-templates` allows an attacker to inject malicious code or
      dependencies into the wireframes used by `generate-plugin`, tainting all new service packs at
      the time of creation.
    group: plugin-execution
    capabilities:
      - reference-id: PrivProj.CLI.CAP
        entries:
          - reference-id: PrivProj.CLI.CP05
```

## Validating

```bash
go install cuelang.org/go/cmd/cue@latest
cue vet -c -d '#CapabilityCatalog' github.com/gemaraproj/gemara@v1.5.0 capabilities.yaml
cue vet -c -d '#ThreatCatalog' github.com/gemaraproj/gemara@v1.5.0 threats.yaml
```

No output means the artifact is valid.
