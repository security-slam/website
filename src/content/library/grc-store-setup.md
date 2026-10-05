---
title: Set Up Your grc.store Namespace and Targets
description: Step-by-step guide to getting a project onto grc.store under its steward's enterprise, so the Mechanizer workflow has somewhere to publish results.
tags: [Mechanizer, Defender, Helpful Tools]
weight: 5
author: Eddie Knight, Revanite
---

The [Mechanizer badge](/library/mechanizer) publishes your OSPS Baseline scan to [grc.store](https://grc.store), and the [Defender badge](/library/defender) is judged from what lands there. Before the first scan can publish, your project needs a place on grc.store that it controls. This guide walks through getting one.

Reading grc.store needs no account. Publishing evaluation results does, and the results have to land under a namespace your project controls. When your steward, a foundation or the company that employs the maintainers, holds an enterprise account, setup is four steps. Most of them happen once per project; only the trusted-publisher binding repeats per repository.

## 1. Get an account inside your steward's enterprise

Your account has to be managed by the enterprise before the enterprise can put you on one of its namespaces. There are three ways in, and every one of them starts on the enterprise side.

- **Invited as a new user.** An enterprise admin invites your email address. You receive a sign-up link, and following it creates your account as part of the enterprise. There is no second step.
- **Invited as an existing user.** If you already have an account, the invitation appears under pending invitations in your user menu. Accept it there. If another enterprise still manages your account, leave that one first; *My namespaces* shows which enterprise manages you.
- **Requesting access through the enterprise's link.** An enterprise can hand out `/request-access?via=<enterprise>`. A request made through it goes to that enterprise's admins as well as the hub admins, and approval creates your account already inside the enterprise. Use an email address you read, since the sign-up link goes there. If you already have an account, approval sends you an enterprise invitation to accept instead.

If you don't know who the enterprise admins are, ask whoever at your steward handles project onboarding. The hub can't tell you.

## 2. Get a namespace for your project

A namespace is the `<namespace>` in every coordinate and URL published under it, and it is the unit of publish rights. One per project is the usual shape. The slug can't change after creation, so use the name the project is known by.

Who creates it depends on your role in the enterprise.

- **Enterprise admin or owner:** open *Create namespace* and pick the enterprise under *Owned by*. The namespace is created as enterprise-owned with you as its first namespace admin, and every enterprise admin can administer it from then on.
- **Enterprise member:** ask an enterprise admin to create the namespace and add you to it as a namespace admin. That is the supported path for now.

Ownership is the point of doing it this way. An enterprise-owned namespace belongs to the steward and outlives any one maintainer. A namespace you create under *Me* is personal: the enterprise never owns it, even while it manages your account. If your project's artifacts already live under a personal namespace, a hub admin can move the namespace into the enterprise on request, through the request-access form or your usual contact. Self-service transfers aren't available yet.

Enterprise admins can administer a namespace without gaining publish rights; publishing needs namespace membership or a trusted-publisher binding. For results that is fine, because results are published by CI, not by people, and the next step is what gives CI that right.

## 3. Bind each repository as a trusted publisher

Evaluation results are only accepted from the [`revanite-io/pvtr-publish-results`](https://github.com/revanite-io/pvtr-publish-results) reusable workflow, running in a repository your namespace trusts. Nobody runs `pvtr publish` or `grcli publish` for results by hand.

On the namespace admin page, open *Trusted publishers* and add each repository that will publish, as `owner/repo`. The optional git ref, for example `refs/heads/main`, restricts publishing to one branch; leave it empty to allow any branch. Repeat for every repository in the project.

The binding maps the repository's GitHub Actions identity to the namespace. The workflow authenticates with its OIDC token, so there is no secret to store or rotate. Trusted publishers are bound to the namespace, not to individual targets: binding a repository lets it publish results about itself.

## 4. Targets: the first run creates them

A target is the thing a result describes, at `<namespace>/<target-id>`. For a GitHub repository you don't need to create one by hand. Call the publish workflow from the bound repository with the target coordinate you want. The hub compares the OIDC token's repository claim against the target URI, and the first successful run registers the target and marks it verified. After that, every run lands a new log in the target's history at `https://grc.store/targets/<namespace>/<target-id>`. That is the URL to link from your README for the Defender badge.

Manual registration, in the *Targets* section of the namespace admin area, is for targets that aren't GitHub repositories: a service or a domain. Those take a slug id, an entity type, and an `https://` subject URI, and nothing can be published against them until you prove ownership with the one-time challenge shown to org owners, by DNS TXT record or a hosted file.

## Checklist for a project with several repositories

1. Each maintainer who needs to administer the namespace joins the enterprise, once.
2. An enterprise admin creates one enterprise-owned namespace for the project, once.
3. A namespace admin adds every publishing repository as a trusted publisher.
4. Each repository calls the publish workflow by tag, on pushes to the default branch, on releases, or on a schedule. Not on pull requests: the hub stores one log per target and catalog every ten minutes and refuses the rest with `rate_limited`.

What the workflow needs in its config, and how the hub checks the result, is covered in the [Mechanizer badge](/library/mechanizer) page and the publish workflow's README.
