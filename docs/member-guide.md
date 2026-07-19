---
title: Member Guide
sidebar_position: 3
---

# Member Guide

This guide is for TrickFire members who want to add documentation to an existing project repo.

## Prerequisites

- Node.js 20+
- A TrickFire project repo with write access
- Access to `TrickfireRobotics/trickfire-docs` (for the reusable CI workflow)

No package installation required — `trickfire-docs` is run via `npx` and never needs to be added to your project's dependencies.

## Setup

### 1. Scaffold docs files

In your project repo:

```shell-session
$ npx trickfire-docs init
```

This creates:

```
your-repo/
├── docs/
│   ├── getting-started.md
│   ├── guides/
│   │   ├── writing-content.md
│   │   └── organizing-sidebar.md
│   └── reference/
│       ├── configuration.md
│       └── faq.md
├── docs.config.json
└── .github/workflows/
    └── docs.yml
```

It also appends `.trickfire-docs/` and `dist/` to your `.gitignore`.

### 2. Configure your project

Edit `docs.config.json`:

```json
{
    "$schema": "https://docs.trickfirerobotics.com/docs.config.schema.json",
    "name": "TrickFire CAN",
    "description": "CAN bus driver and protocol library for TrickFire robots."
}
```

`name` becomes the project title in the docs navbar dropdown. `description` shows on the docs homepage.

VS Code will autocomplete and validate the config automatically thanks to the `$schema` field — no extensions needed.

### 3. Write your docs

Replace the scaffold markdown files with real content. See [Writing Content](./writing-content) for the full guide.

Minimum viable docs:

- `docs/getting-started.md` — what the project is and how to get it running
- `docs/reference/` — API or configuration reference

### 4. Preview locally

```shell-session
$ npx trickfire-docs dev
```

This starts a local Docusaurus server for your project's docs only. Hot-reload is enabled — edits to `docs/` appear instantly. The generated site files are kept in `.trickfire-docs/` (gitignored) and are managed entirely by the CLI.

### 5. Push to publish

Commit your `docs/` folder and `docs.config.json`, then push to `main`.

The `.github/workflows/docs.yml` file runs automatically on push:

```yaml
on:
    push:
        branches: [main]
        paths:
            - "docs/**"
            - "docs.config.json"
```

Within about a minute, your docs appear at `docs.trickfirerobotics.com/<your-repo-name>`.

## Updating your docs

Just edit files in `docs/` and push. The CI workflow handles everything.

## Custom URL slug

By default, your docs are published at `/<repo-name>`. If you want a different path segment, pass `repo-name` to the workflow:

```yaml
# .github/workflows/docs.yml
jobs:
    sync:
        uses: TrickfireRobotics/trickfire-docs/.github/workflows/sync-docs.yml@main
        with:
            repo-name: my-custom-slug
        secrets: inherit
```

## Removing a project's docs

Delete the content directory on the server:

```shell-session
$ rm -rf /home/trickfire/docs/content/<repo-name>
$ bash /home/trickfire/docs/scripts/build.sh
```

The project will disappear from the site after the next build.
