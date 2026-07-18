---
title: Architecture
sidebar_position: 2
---

# Architecture

## System overview

```
┌─────────────────────────────────────────────────────────────────┐
│  Member repos (GitHub)                                          │
│                                                                 │
│  trickfire-can/          trickfire-gui/       ak-series-lib/    │
│  ├── docs/               ├── docs/            ├── docs/         │
│  ├── docs.config.ts      ├── docs.config.ts   └── docs.config.ts│
│  └── .github/workflows/  └── .github/workflows/                 │
│      docs.yml (push)         docs.yml (push)                    │
└──────────────────────┬──────────────────────────────────────────┘
                       │ GitHub Actions (reusable workflow)
                       │ workflow_call → sync-docs.yml
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│  Debian server  /srv/trickfire-docs/                            │
│                                                                 │
│  content/                    ← synced by member CIs            │
│  ├── trickfire-can/                                             │
│  │   ├── docs/                                                  │
│  │   └── docs.config.ts                                         │
│  ├── trickfire-gui/                                             │
│  └── ak-series-lib/                                             │
│                                                                 │
│  build/                      ← output of docusaurus build       │
│  scripts/build.sh            ← git pull + pnpm install + build  │
│  docusaurus.config.ts        ← reads content/ dirs dynamically  │
└──────────────────────┬──────────────────────────────────────────┘
                       │ nginx (localhost:80)
                       │
                  ┌────┴────┐
                  │cloudflared│  ← outbound tunnel, no open ports
                  └────┬────┘
                       │ Cloudflare network
                       ▼
              docs.trickfirerobotics.com
```

## Components

### trickfire-docs repo

This repository (`TrickfireRobotics/trickfire-docs`) serves two roles:

1. **npm package** — the `trickfire-docs` CLI that member repos install. It provides `trickfire-docs init`, `trickfire-docs dev`, and `trickfire-docs build`.
2. **Docusaurus site** — the actual docs website. The `docusaurus.config.ts` at the root reads `content/` at build time and registers one `@docusaurus/plugin-content-docs` instance per repo.

### Member repos

Any TrickFire project that installs `trickfire-docs` as a dev dependency. After running `trickfire-docs init`, the repo contains:

- `docs/` — markdown files
- `docs.config.ts` — project name, description, and optional sidebar
- `.github/workflows/docs.yml` — fires on push to `main`, calls the reusable sync workflow

Member repos never need to update their CI workflow. All changes to the sync logic happen in `sync-docs.yml` inside this repo.

### Debian server

Hosts everything at `/srv/trickfire-docs/`. The self-hosted Actions runner (label: `docs`) runs directly on this machine, giving sync jobs direct filesystem access without SSH transfers.

**Directory layout on server:**

```
/srv/trickfire-docs/
├── content/              ← gitignored, populated by sync jobs
│   ├── .gitkeep
│   └── <repo-name>/
│       ├── docs/
│       └── docs.config.ts
├── build/                ← Docusaurus output, served by nginx
├── scripts/
│   └── build.sh
├── src/, docusaurus.config.ts, package.json, …  ← from git
└── node_modules/
```

### GitHub Actions

Two workflow types:

| Workflow         | File                       | Trigger                         |
| ---------------- | -------------------------- | ------------------------------- |
| Member sync      | `sync-docs.yml` (reusable) | Called by each member repo's CI |
| Framework deploy | `deploy.yml`               | Push to `main` in this repo     |

Both workflows run on the `[self-hosted, docs]` runner and call `scripts/build.sh` at the end.

### Cloudflare tunnel

A `cloudflared` daemon on the server opens an outbound tunnel to Cloudflare's network. No inbound ports need to be opened in the server firewall. Cloudflare terminates TLS and proxies traffic to nginx on `localhost:80`.

## Data flow: doc update

1. Developer pushes changes to `docs/` in a member repo.
2. GitHub Actions triggers `docs.yml` in that repo.
3. `docs.yml` calls `sync-docs.yml@main` in this repo.
4. The self-hosted runner on the server runs:
    - `rsync docs/ /srv/trickfire-docs/content/<repo>/`
    - `cp docs.config.ts /srv/trickfire-docs/content/<repo>/`
    - `bash /srv/trickfire-docs/scripts/build.sh`
5. `build.sh` runs `git pull`, `pnpm install`, `pnpm website:build`.
6. Docusaurus reads all dirs in `content/`, loads each `docs.config.ts` via jiti, registers a docs plugin per repo, and outputs a static site to `build/`.
7. nginx serves `build/` to incoming requests from the Cloudflare tunnel.

## Data flow: framework update

1. A change to the Docusaurus site itself (theme, config, `src/`) is merged to `main`.
2. `deploy.yml` runs on the self-hosted runner.
3. `build.sh` pulls the latest framework code and rebuilds.
4. `content/` is untouched — it's gitignored and survives the pull.
