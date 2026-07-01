> [!NOTE]
> Looking for the TrickFire website? This repo is only the docs portal. The main TrickFire Robotics website [trickfirerobotics.com](https://trickfirerobotics.com/) lives at [github.com/TrickfireRobotics/TrickFire-Website](https://github.com/TrickfireRobotics/TrickFire-Website).

# TrickfireRobotics.github.io

The central documentation portal for TrickFire Robotics, served at [docs.trickfirerobotics.com](https://docs.trickfirerobotics.com/) — and the home of `trickfire-docs`, the framework other TrickFire repos use to publish their own docs there.

## Why this repo name?

GitHub serves an organization's `<org>.github.io` repository at the root of its GitHub Pages domain. By naming this repo `TrickfireRobotics.github.io` and pointing the custom domain at it, we own `docs.trickfirerobotics.com/`. Every other repo in the organization can then deploy its own GitHub Pages site at a subpath of that domain — for example:

- `docs.trickfirerobotics.com/gazebo-simulations/` — from the `gazebo-simulations` repo
- `docs.trickfirerobotics.com/trickfire-urc/` — from the `trickfire-urc` repo

This gives us a unified docs domain without needing a reverse proxy.

## Repo layout

This is a pnpm workspace hosting two independent projects that just happen to share a "docs" domain and, for convenience, a single toolchain:

- **`website/`** — this portal site, served at [docs.trickfirerobotics.com](https://docs.trickfirerobotics.com/), deployed by `.github/workflows/pages.yml`.
- **`framework/`** — `trickfire-docs`, the Astro/Starlight-based docs framework other TrickFire repos install to generate their own `docs.trickfirerobotics.com/<repo-name>/` sites (documented below). Published to npm independently via `.github/workflows/release.yml` (only runs on changes under `framework/**`).

They share one `pnpm-lock.yaml`, ESLint config, Prettier config, commitlint rules, and git hooks — installing once at the repo root sets both up. Each still has its own `package.json`, build tooling, and CI jobs for its own build/test/deploy, since they produce genuinely different things (a static site vs. an npm package).

## Developing the portal

```sh
pnpm install
pnpm dev          # start the portal's dev server at http://localhost:4321
pnpm build        # production build of the portal → dist/
pnpm preview      # preview the portal's production build locally
pnpm check        # lint + format check + typecheck the whole workspace
```

## `trickfire-docs` — the docs framework

A documentation framework wrapping Astro and Starlight with a custom config for a clean and easy setup, published to npm from `framework/`.

### Using `trickfire-docs` in a project

#### Install

```bash
pnpm add -D trickfire-docs
```

#### Set up

```bash
pnpm trickfire-docs init
```

Creates a `docs/` folder (Markdown/MDX pages) and a `docs.config.ts` at the project root - site name, description, the 4 landing page cards, and the sidebar structure all live there. See the generated `docs/reference/configuration.md` for the full field reference.

The site's URL and base path (`docs.trickfirerobotics.com/<repo-name>`) are derived automatically from `package.json`'s `"name"` field - there's nothing to configure for that.

#### Develop

```bash
pnpm trickfire-docs dev
```

Starts a local dev server with live reload. Edits under `docs/` hot-reload; changes to `docs.config.ts` require restarting the dev server.

#### Build

```bash
pnpm trickfire-docs build
```

Outputs the static site to `dist/`.

### Publishing to docs.trickfirerobotics.com

`docs.trickfirerobotics.com` is the TrickFire Robotics organization's GitHub Pages site. Any other repo in the org that enables GitHub Pages (without setting its own custom domain) is automatically served at `docs.trickfirerobotics.com/<repo-name>/` - which is exactly the base path `trickfire-docs` already builds for.

To wire this up for a project:

1. In the repo's **Settings → Pages**, set **Source** to **GitHub Actions**. Leave the custom domain field empty.
2. Add `.github/workflows/docs.yml`:

```yaml
name: Deploy Docs

on:
    push:
        branches: [main]
        paths:
            - "docs/**"
            - "docs.config.ts"
    workflow_dispatch:

permissions:
    contents: read
    pages: write
    id-token: write

concurrency:
    group: pages
    cancel-in-progress: true

jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v6

            - uses: pnpm/action-setup@v6
              with:
                  version: latest

            - uses: actions/setup-node@v6
              with:
                  node-version: 22
                  cache: pnpm

            - run: pnpm install --frozen-lockfile
            - run: pnpm trickfire-docs build

            - uses: actions/upload-pages-artifact@v4
              with:
                  path: dist

    deploy:
        needs: build
        runs-on: ubuntu-latest
        environment:
            name: github-pages
            url: ${{ steps.deployment.outputs.page_url }}
        steps:
            - id: deployment
              uses: actions/deploy-pages@v4
```

Every push to `main` that touches `docs/` or `docs.config.ts` rebuilds and redeploys the site.

### Developing `trickfire-docs` itself

Because this package generates and drives a real Astro project from inside its own install location (`node_modules/trickfire-docs/.astro-cache/`), changes don't show up correctly under `pnpm link` - a symlink doesn't reproduce how a real consumer's package manager lays out `node_modules`. Test changes against a real, packed install instead:

```bash
pnpm check                # from the repo root: lint/format/typecheck the whole workspace
pnpm test && pnpm build   # from framework/: tests and compile this package
npm pack                  # from framework/: produces trickfire-docs-<version>.tgz
```

Then in a throwaway project (not inside this repo):

```bash
mkdir /tmp/test-consumer && cd /tmp/test-consumer
echo '{"name": "test-project", "private": true}' > package.json
npm install /path/to/trickfire-docs/trickfire-docs-<version>.tgz
# or: pnpm add /path/to/trickfire-docs/trickfire-docs-<version>.tgz

npx trickfire-docs init
npx trickfire-docs dev      # check hot reload works
npx trickfire-docs build    # check dist/ output
```

Test with **both `npm` and `pnpm`** when changing anything that touches dependency resolution or the cache layout (`src/astro/`). `npm`'s default hoisting is more forgiving and can hide bugs that only show up under `pnpm`'s strict, non-hoisted isolation - that's exactly how the `outDir`/dev-watch issues during initial development were found.

Delete the throwaway project and the `.tgz` when done; `.astro-cache/` inside this repo (if you ever run the CLI directly from source) is gitignored and safe to delete at any time.

### Releasing `trickfire-docs` to npm

Releases are fully automated via [semantic-release](https://semantic-release.gitbook.io/) (`.github/workflows/release.yml`, config in `framework/release.config.cjs`) - there's no manual version bump or `npm publish` step. The release workflow only runs on pushes to `main` that touch `framework/**`, and its checks/tests/build all run scoped to this package. Once triggered, semantic-release:

1. Reads commit messages since the last release (relies on the [Conventional Commits](https://www.conventionalcommits.org/) enforced by commitlint) to decide whether a release is needed and what the next version is - `fix:` → patch, `feat:` → minor, a `BREAKING CHANGE:` footer → major. `chore:`/`docs:`/`style:`/etc. don't trigger a release on their own.
2. Publishes the new version to the public npm registry.
3. Tags the commit, creates a GitHub Release with generated notes, and commits the bumped `package.json`/`CHANGELOG.md` back to `main`.

If a push to `main` only contains non-releasing commit types, the workflow runs but semantic-release no-ops - nothing gets published.

**One-time setup required:** add an npm [automation token](https://docs.npmjs.com/creating-and-viewing-access-tokens) as the `NPM_TOKEN` repository secret (Settings → Secrets and variables → Actions). The workflow's `GITHUB_TOKEN` is automatic and just needs `contents: write` (already set) to push the version-bump commit and create releases.

To preview what the next release would look like without actually publishing:

```bash
pnpm release:dry-run
```

This README is also what gets published to npm alongside `trickfire-docs` (copied into `framework/` at pack time - see `framework/package.json`'s `prepack` script), so the whole thing, portal section included, is what shows up on the npm registry page.
