---
title: Threat Assessment Guide
description: Step-by-step guide to performing Gemara-compatible threat assessments
tags: [Inspector, Gemara]
author: Jennifer Power, Red Hat
---

## What This Is

This guide walks through a threat assessment using the [Gemara](https://gemara.openssf.org/) project, targeting **Gemara v1.6.0**, the current release.

**The basic idea:** Think of a project like a house. First, you identify what the house can do: its **capabilities** (e.g., "allow entry/exit", "store belongings"). Then, you identify **threats**, what could go wrong with those capabilities (e.g., "unauthorized entry through unlocked door", "theft of stored belongings").

In technical terms:
* **Capabilities** define what the technology can do. These form a primary component of the **attack surface** because every intended function represents a potential path for unintended use.
* **Threats** define specific ways those capabilities could be misused or exploited.

This exercise helps you systematically identify what could go wrong so you can build appropriate defenses.

**How a Gemara v1 assessment is laid out:** capabilities live in their own artifact, a **Capability Catalog**, and the threat catalog references it. So an assessment produces two files that reference each other. If you have seen pre-1.0 catalogs (the [walkthrough video](/library/threat-assessment-walkthrough) predates v1.0), these are the differences:

| Gemara v1 | Before v1.0 |
|-----------|-------------|
| `#CapabilityCatalog` holds `capabilities`; `#ThreatCatalog` holds `threats` only | Both lived in the threat catalog |
| One `imports` list, with each entry naming a `reference-id` and its `entries` | Separate `imported-capabilities` and `imported-threats` lists |
| `metadata.type` and `metadata.gemara-version` are required | Not present |
| `groups` are required when a catalog defines entries; every capability and threat carries a `group` | Optional / absent |

## Walkthrough

### Step 0: Define Scope

Select a component or technology to assess (service, API, infrastructure component, or technology stack).

**Leverage existing resources**: Gemara supports importing threats and capabilities from external catalogs so you don't have to start from scratch. The FINOS Common Cloud Controls (CCC) Core [catalog](https://github.com/finos/common-cloud-controls/releases/download/v2025.10/CCC.Core_v2025.10.yaml) defines well-vetted capabilities and threats that apply broadly across cloud services. These pre-built items can help accelerate your assessment.

We will explore how this is leveraged below as we dive into our container management tool example (i.e., `SEC.SLAM.CM.CAP` for capabilities and `SEC.SLAM.CM` for threats).

### Step 1: Setting Up Metadata

Each artifact declares its own scope and mapping references. Key fields:

| Field                             | What It Is                                                        | Why                                                                                    |
|-----------------------------------|-------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| `title`                           | Display name for the catalog (top-level field)                    | Human-readable label used in reports and tooling output                                |
| `metadata.id`                     | Identifier for this catalog                                       | Other artifacts point at this catalog by this value                                    |
| `metadata.type`                   | `CapabilityCatalog` or `ThreatCatalog`                            | Tells parsers which schema to apply; required in Gemara v1                                |
| `metadata.gemara-version`         | Spec version the artifact conforms to, here `"1.6.0"`             | Lets tooling pick the right schema and migration path                                  |
| `mapping-references` with `id: CCC` | A pointer to the CCC Core catalog release                       | Tells parsers where to resolve the imported capability and threat IDs used later       |
| `imports` (Steps 2 and 3)         | The specific entries pulled in from each mapping reference        | Brings in common capabilities and threats without redefining them                      |
| `groups`                          | Categories that entries in this catalog belong to                 | Required once a catalog defines capabilities or threats; keeps large catalogs readable |

The threat catalog adds one more mapping reference: a pointer to the capability catalog, so its threats can link to the capabilities defined there.

**Example (YAML): capability catalog metadata**

```yaml
title: Container Management Tool Capability Catalog
metadata:
  id: SEC.SLAM.CM.CAP
  type: CapabilityCatalog
  gemara-version: "1.6.0"
  version: "1.0.0"
  description: Capabilities of the container management tool under assessment
  author:
    id: example
    name: Example
    type: Human
  mapping-references:
    - id: CCC
      title: Common Cloud Controls Core
      version: v2025.10
      url: https://github.com/finos/common-cloud-controls/releases
      description: |
        Foundational repository of reusable security controls, capabilities,
        and threat models maintained by FINOS.
```

### Step 2: Identify Capabilities

Capabilities are the core functions or features within the scope. In Gemara v1 they go in the capability catalog.

**Start with the imported capabilities** you can leverage from FINOS CCC. Ask: "Which common cloud capabilities does this technology have?"

A container management tool actively reaches out to registries to pull images and configuration.
Since CCC Core already defines this as **CP29** (Active Ingestion), we import it rather than redefining it.
Image tags also function as version identifiers — the tool resolves a tag like `latest` or `v1.0` to a specific image.
CCC Core defines this as **CP18** (Resource Versioning), so we import that as well.

**Example (YAML)**

```yaml
imports:
  - reference-id: CCC
    entries:
      - reference-id: CCC.Core.CP29
        remarks: Active Ingestion
      - reference-id: CCC.Core.CP18
        remarks: Resource Versioning
```

**Then, define specific capabilities** unique to your target. Required fields:

| Field         | Required | Description                                                        |
|---------------|----------|--------------------------------------------------------------------|
| Capability ID | Yes      | Unique identifier. The schema enforces no pattern; this guide uses `ORG.PROJ.COMPONENT.CAP##` as a convention |
| Title         | Yes      | A clear, concise name that describes the capability                |
| Description   | Yes      | A specific explanation of what this capability does                |
| Group         | Yes      | The `id` of a group declared in this catalog's `groups` list       |

**Example (YAML)**

```yaml
groups:
  - id: image-management
    title: Image Management
    description: |
      Capabilities for retrieving, resolving, and running container images.
capabilities:
  - id: SEC.SLAM.CM.CAP01
    title: Image Retrieval by Tag
    description: |
      Ability to retrieve container images from registries using mutable tag names
      (e.g., 'latest', 'v1.0').
    group: image-management
```

### Step 3: Identify Threats

Threats are specific ways capabilities can be misused, exploited, or cause problems. For each capability, identify potential threats. These go in the threat catalog, which points back at the capability catalog through a mapping reference.

**Example (YAML): threat catalog mapping references**

```yaml
mapping-references:
  - id: CCC
    title: Common Cloud Controls Core
    version: v2025.10
    url: https://github.com/finos/common-cloud-controls/releases
    description: |
      Foundational repository of reusable security controls, capabilities,
      and threat models maintained by FINOS.
  - id: SEC.SLAM.CM.CAP
    title: Container Management Tool Capability Catalog
    version: "1.0.0"
    description: |
      Capabilities defined for the container management tool, exploited by
      the threats in this catalog.
```

**Check for imported threats first.** As with capabilities, review the CCC Core catalog for threats linked to the capabilities you imported.
If a threat fits your scope, import it. In this example, CCC Core defines **TH14** ("Older Resource Versions are Used") which is linked to **CP18**.
It applies because mutable image tags let the tool resolve to a stale or compromised version.

Imported threats and the capabilities you reference from the capability catalog share the single `imports` list:

**Example (YAML)**

```yaml
imports:
  - reference-id: CCC
    entries:
      - reference-id: CCC.Core.TH14
        remarks: Older Resource Versions are Used
  - reference-id: SEC.SLAM.CM.CAP
    entries:
      - reference-id: SEC.SLAM.CM.CAP01
        remarks: Image Retrieval by Tag
```

**Then, define specific threats** unique to your target. Required fields:

| Field             | Required | Description                                                                        |
|-------------------|----------|------------------------------------------------------------------------------------|
| Threat ID         | Yes      | Unique identifier. The schema enforces no pattern; this guide uses `ORG.PROJ.COMPONENT.THR##` as a convention                 |
| Title             | Yes      | A clear, concise name describing the threat                                        |
| Description       | Yes      | A specific explanation of what goes wrong and why it matters                       |
| Group             | Yes      | The `id` of a group declared in this catalog's `groups` list                       |
| Capabilities      | Yes      | Links this threat to the capability(ies) it exploits, by mapping reference         |

**Example (YAML)**

```yaml
groups:
  - id: image-integrity
    title: Image Integrity
    description: |
      Threats to the authenticity and provenance of container images the tool
      retrieves and runs.
threats:
  - id: SEC.SLAM.CM.THR01
    title: Container Image Tampering or Poisoning
    description: |
      Attackers may replace a legitimately published image tag with a malicious image
      by exploiting tag mutability in image registries, especially when the container
      management tool retrieves images by tag name rather than digest. This enables
      unauthorized access, data exfiltration, and system compromise.
    group: image-integrity
    capabilities:
      - reference-id: CCC
        entries:
          - reference-id: CCC.Core.CP29
          - reference-id: CCC.Core.CP18
      - reference-id: SEC.SLAM.CM.CAP
        entries:
          - reference-id: SEC.SLAM.CM.CAP01
```

### Step 4: Validate

The final capability catalog should look something like this:

```yaml
title: Container Management Tool Capability Catalog
metadata:
  id: SEC.SLAM.CM.CAP
  type: CapabilityCatalog
  gemara-version: "1.6.0"
  version: "1.0.0"
  description: Capabilities of the container management tool under assessment
  author:
    id: example
    name: Example
    type: Human
  mapping-references:
    - id: CCC
      title: Common Cloud Controls Core
      version: v2025.10
      url: https://github.com/finos/common-cloud-controls/releases
      description: |
        Foundational repository of reusable security controls, capabilities,
        and threat models maintained by FINOS.
imports:
  - reference-id: CCC
    entries:
      - reference-id: CCC.Core.CP29
        remarks: Active Ingestion
      - reference-id: CCC.Core.CP18
        remarks: Resource Versioning
groups:
  - id: image-management
    title: Image Management
    description: |
      Capabilities for retrieving, resolving, and running container images.
capabilities:
  - id: SEC.SLAM.CM.CAP01
    title: Image Retrieval by Tag
    description: |
      Ability to retrieve container images from registries using mutable tag names
      (e.g., 'latest', 'v1.0').
    group: image-management
```

And the final threat catalog like this:

```yaml
title: Container Management Tool Threat Catalog
metadata:
  id: SEC.SLAM.CM
  type: ThreatCatalog
  gemara-version: "1.6.0"
  version: "1.0.0"
  description: Threat catalog for container management tool security assessment
  author:
    id: example
    name: Example
    type: Human
  mapping-references:
    - id: CCC
      title: Common Cloud Controls Core
      version: v2025.10
      url: https://github.com/finos/common-cloud-controls/releases
      description: |
        Foundational repository of reusable security controls, capabilities,
        and threat models maintained by FINOS.
    - id: SEC.SLAM.CM.CAP
      title: Container Management Tool Capability Catalog
      version: "1.0.0"
      description: |
        Capabilities defined for the container management tool, exploited by
        the threats in this catalog.
imports:
  - reference-id: CCC
    entries:
      - reference-id: CCC.Core.TH14
        remarks: Older Resource Versions are Used
  - reference-id: SEC.SLAM.CM.CAP
    entries:
      - reference-id: SEC.SLAM.CM.CAP01
        remarks: Image Retrieval by Tag
groups:
  - id: image-integrity
    title: Image Integrity
    description: |
      Threats to the authenticity and provenance of container images the tool
      retrieves and runs.
threats:
  - id: SEC.SLAM.CM.THR01
    title: Container Image Tampering or Poisoning
    description: |
      Attackers may replace a legitimately published image tag with a malicious image
      by exploiting tag mutability in image registries, especially when the container
      management tool retrieves images by tag name rather than digest. This enables
      unauthorized access, data exfiltration, and system compromise.
    group: image-integrity
    capabilities:
      - reference-id: CCC
        entries:
          - reference-id: CCC.Core.CP29
          - reference-id: CCC.Core.CP18
      - reference-id: SEC.SLAM.CM.CAP
        entries:
          - reference-id: SEC.SLAM.CM.CAP01
```

**Validation commands:**

```bash
go install cuelang.org/go/cmd/cue@latest
cue vet -c -d '#CapabilityCatalog' github.com/gemaraproj/gemara@v1.6.0 your-capabilities.yaml
cue vet -c -d '#ThreatCatalog' github.com/gemaraproj/gemara@v1.6.0 your-threats.yaml
```

No output means the artifact is valid. Swap `@v1.6.0` for `@latest` to validate against the newest published schema.

## What's Next

Create a Gemara Control Catalog that maps security controls to the identified threats, providing a structured approach to defining mitigations. See the [Gemara Layer 2 schema documentation](https://gemara.openssf.org/model/05.2-Layer-2.html) for the full specification.
