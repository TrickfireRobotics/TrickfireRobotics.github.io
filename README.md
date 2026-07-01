> [!NOTE]
> Looking for the TrickFire website? The main TrickFire Robotics website [trickfirerobotics.com](https://trickfirerobotics.com/) lives at [github.com/TrickfireRobotics/TrickFire-Website](https://github.com/TrickfireRobotics/TrickFire-Website).

# TrickFire Docs

`trickfire-docs` is TrickFire Robotics' documentation framework - an Astro/Starlight-based tool other TrickFire repos install to generate and publish their own docs at `docs.trickfirerobotics.com/<repo-name>`. This repo is where it's built and published from.

This repo also servers `docs.trickfirerobotics.com` itself - more on that [below](#also-in-this-repo-the-docstrickfireroboticscom-portal).

## Using `trickfire-docs` in a project

### Install

```bash
pnpm add -D trickfire-docs
```

### Set up

```bash
pnpm trickfire-docs init
```

Creates a `docs/` folder (Markdown/MDX pages) and a `docs.config.ts` at the project root - site name, description, the 4 landing page cards, and the sidebar structure all live there. See the generated `docs/reference/configuration.md` for the full field reference.

The site's URL and base path (`docs.trickfirerobotics.com/<repo-name>`) are derived automatically from `package.json`'s `"name"` field - there's nothing to configure for that.

### Develop

```bash
pnpm trickfire-docs dev
```

Starts a local dev server with live reload. Edits under `docs/` hot-reload; changes to `docs.config.ts` require restarting the dev server.

### Build

```bash
pnpm trickfire-docs build
```

Outputs the static site to `dist/`.

## Publishing to docs.trickfirerobotics.com

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

## Migrating from a legacy docs setup

If the repo already has a self-contained `docs/` folder with its own `astro.config.mjs` and `package.json`, run this from the repo root to convert it to `trickfire-docs`:

```bash
cd path/to/repo
curl -fsSL https://raw.githubusercontent.com/TrickfireRobotics/TrickfireRobotics.github.io/refs/heads/main/migrate-docs.py | python3
```

The script moves `docs/content/docs/**` into `docs/`, generates `docs.config.ts`, adds `trickfire-docs` to `package.json` (creating one if the repo has none), and runs `pnpm install`. Fill in the `description` TODOs in `docs.config.ts` when done.

## Developing `trickfire-docs` itself

Because this package generates and drives a real Astro project from inside its own install location (`node_modules/trickfire-docs/.astro-cache/`), changes don't show up correctly under `pnpm link` - a symlink doesn't reproduce how a real consumer's package manager lays out `node_modules`. Test changes against a real, packed install instead:

```bash
pnpm check            # lint/format/typecheck everything (framework + portal)
pnpm test             # run the framework's tests
pnpm framework:build  # compile the framework to dist-cli/
npm pack              # produces trickfire-docs-<version>.tgz
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

Test with **both `npm` and `pnpm`** when changing anything that touches dependency resolution or the cache layout (`framework/astro/`). `npm`'s default hoisting is more forgiving and can hide bugs that only show up under `pnpm`'s strict, non-hoisted isolation - that's exactly how the `outDir`/dev-watch issues during initial development were found.

Delete the throwaway project and the `.tgz` when done; `.astro-cache/` inside this repo (if you ever run the CLI directly from source) is gitignored and safe to delete at any time.

## Releasing `trickfire-docs` to npm

Releases are fully automated via [semantic-release](https://semantic-release.gitbook.io/) (`.github/workflows/release.yml`, config in `release.config.cjs`) - there's no manual version bump or `npm publish` step. The release workflow only runs on pushes to `main` that touch the framework's own paths (`framework/`, `internal/`, `scaffold/`, `tsup.config.ts`, `vitest.config.ts`, `tsconfig.cli.json`, `release.config.cjs`) - a portal-only change won't trigger it. Once triggered, semantic-release:

1. Reads commit messages since the last release (relies on the [Conventional Commits](https://www.conventionalcommits.org/) enforced by commitlint) to decide whether a release is needed and what the next version is - `fix:` → patch, `feat:` → minor, a `BREAKING CHANGE:` footer → major. `chore:`/`docs:`/`style:`/etc. don't trigger a release on their own.
2. Publishes the new version to the public npm registry.
3. Tags the commit, creates a GitHub Release with generated notes, and commits the bumped `package.json`/`CHANGELOG.md` back to `main`.

If a push to `main` only contains non-releasing commit types, the workflow runs but semantic-release no-ops - nothing gets published.

**One-time setup required:** add an npm [automation token](https://docs.npmjs.com/creating-and-viewing-access-tokens) as the `NPM_TOKEN` repository secret (Settings → Secrets and variables → Actions). The workflow's `GITHUB_TOKEN` is automatic and just needs `contents: write` (already set) to push the version-bump commit and create releases.

To preview what the next release would look like without actually publishing:

```bash
pnpm release:dry-run
```

This README is also what gets published to npm alongside `trickfire-docs` and shown on its registry page, portal section included.

## Also in this repo: the docs.trickfirerobotics.com portal

GitHub serves an organization's `<org>.github.io` repository at the root of its GitHub Pages domain. By naming this repo `TrickfireRobotics.github.io` and pointing the custom domain at it, we own `docs.trickfirerobotics.com/` - which is also the base path every other repo's own docs (built with `trickfire-docs`, above) get served under. Rather than leave that root domain pointing at nothing, this repo also builds and deploys a small Astro site as the `docs.trickfirerobotics.com` landing page itself.

That site lives in `website/`, `public/`, and `astro.config.ts`, and is deployed by `.github/workflows/pages.yml` - unrelated to the `trickfire-docs` framework beyond sharing this repo and its toolchain.

```sh
pnpm install
pnpm website:dev      # start the portal's dev server at http://localhost:4321
pnpm website:build    # production build of the portal → dist/
pnpm website:preview  # preview the portal's production build locally
```

## Repo layout

One repo, one `package.json`, two things it produces:

- **`trickfire-docs`** (the main point of this repo) - `framework/`, `internal/`, `scaffold/`, `tsup.config.ts`, `vitest.config.ts`, `tsconfig.cli.json`, `release.config.cjs` - published to npm independently via `.github/workflows/release.yml` (only runs on changes to the paths listed above).
- **The portal site** (a side project living in this repo) - `website/`, `public/`, `astro.config.ts` - deployed by `.github/workflows/pages.yml`.

Both share the same `pnpm-lock.yaml`, ESLint/Prettier/commitlint config, and git hooks - there's nothing to separately install or configure. `tsconfig.cli.json` (framework, Node) and `tsconfig.json` (portal, Astro) stay separate since they target genuinely different runtimes; same for `tsup.config.ts`/`vitest.config.ts` vs `astro.config.ts`.
