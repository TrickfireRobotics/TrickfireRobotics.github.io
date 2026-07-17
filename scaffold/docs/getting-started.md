---
title: Getting Started
description: Write your first page and preview it locally.
---

This site is built with [`trickfire-docs`](https://github.com/TrickfireRobotics/trickfire-docs). Pages live in the `docs/` folder as Markdown (or MDX) files - add, edit, or delete files there and the sidebar/site rebuild automatically.

## Preview locally

```bash title="Terminal"
pnpm trickfire-docs dev
```

This starts a local dev server with live reload. Edit any file under `docs/` and the browser updates automatically.

## Build for production

```bash title="Terminal"
pnpm trickfire-docs build
```

Outputs the static site to `dist/`.

> Changes to `docs.config.ts` (site name, description, sidebar) require restarting the dev server - only content edits under `docs/` hot-reload.
