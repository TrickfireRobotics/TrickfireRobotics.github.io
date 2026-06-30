# TrickFire Documentation Framework

This is a documentation framework wrapping Astro and Starlight with a custom config for a clean and easy setup.

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

## Developing `trickfire-docs` itself

Because this package generates and drives a real Astro project from inside its own install location (`node_modules/trickfire-docs/.astro-cache/`), changes don't show up correctly under `pnpm link` - a symlink doesn't reproduce how a real consumer's package manager lays out `node_modules`. Test changes against a real, packed install instead:

```bash
pnpm check && pnpm test && pnpm build   # lint/format/typecheck/tests/compile this package
npm pack                                 # produces trickfire-docs-<version>.tgz
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
