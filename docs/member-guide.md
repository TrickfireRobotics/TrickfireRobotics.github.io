---
title: Member Guide
sidebar_position: 3
---

# Member Guide

This guide is for TrickFire members who want to add documentation to an existing project repo.

## Prerequisites

- Node.js 20+ and pnpm installed
- A TrickFire project repo with write access
- Access to `TrickfireRobotics/trickfire-docs` (for the reusable CI workflow)

## Setup

### 1. Install the package

In your project repo:

```bash
pnpm add -D trickfire-docs
```

### 2. Scaffold docs files

```bash
pnpm trickfire-docs init
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
├── docs.config.ts
└── .github/workflows/
    └── docs.yml
```

It also appends `.trickfire/`, `.docusaurus/`, and `dist/` to your `.gitignore`.

### 3. Configure your project

Edit `docs.config.ts`:

```typescript
import { defineConfig } from "trickfire-docs";

export default defineConfig({
    name: "TrickFire CAN",
    description: "CAN bus driver and protocol library for TrickFire robots.",
});
```

`name` becomes the project title in the docs navbar dropdown. `description` shows on the docs homepage.

### 4. Write your docs

Replace the scaffold markdown files with real content. See [Writing Content](./writing-content) for the full guide.

Minimum viable docs:

- `docs/getting-started.md` — what the project is and how to get it running
- `docs/reference/` — API or configuration reference

### 5. Preview locally

```bash
pnpm trickfire-docs dev
```

This opens a local Docusaurus server for your project's docs only. Hot-reload is enabled — edits appear instantly.

### 6. Push to publish

Commit your `docs/` folder and `docs.config.ts`, then push to `main`.

The `.github/workflows/docs.yml` file runs automatically on push:

```yaml
on:
    push:
        branches: [main]
        paths:
            - "docs/**"
            - "docs.config.ts"
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

```bash
rm -rf /home/trickfire/trickfire-docs/content/<repo-name>
bash /home/trickfire/trickfire-docs/scripts/build.sh
```

The project will disappear from the site after the next build.
