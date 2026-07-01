> [!NOTE]
> Looking for the TrickFire website? This repo is only the docs portal. The main TrickFire Robotics website [trickfirerobotics.com](https://trickfirerobotics.com/) lives at [github.com/TrickfireRobotics/TrickFire-Website](https://github.com/TrickfireRobotics/TrickFire-Website).

# TrickfireRobotics.github.io

The central documentation portal for TrickFire Robotics, served at [docs.trickfirerobotics.com](https://docs.trickfirerobotics.com/).

## Why this repo name?

GitHub serves an organization's `<org>.github.io` repository at the root of its GitHub Pages domain. By naming this repo `TrickfireRobotics.github.io` and pointing the custom domain at it, we own `docs.trickfirerobotics.com/`. Every other repo in the organization can then deploy its own GitHub Pages site at a subpath of that domain — for example:

- `docs.trickfirerobotics.com/gazebo-simulations/` — from the `gazebo-simulations` repo
- `docs.trickfirerobotics.com/trickfire-urc/` — from the `trickfire-urc` repo

This gives us a unified docs domain without needing a reverse proxy.

## Repo layout

This is a pnpm workspace hosting two independent projects that just happen to share a "docs" domain and, for convenience, a single toolchain:

- **Repo root** — this portal site, served at [docs.trickfirerobotics.com](https://docs.trickfirerobotics.com/), deployed by `.github/workflows/pages.yml`.
- **[`framework/`](framework/README.md)** — `trickfire-docs`, the Astro/Starlight-based docs framework other TrickFire repos install to generate their own `docs.trickfirerobotics.com/<repo-name>/` sites. Published to npm independently via `.github/workflows/release.yml` (only runs on changes under `framework/**`); see its own README for setup, development, and release details.

They share one `pnpm-lock.yaml`, ESLint config, Prettier config, commitlint rules, and git hooks — installing once at the repo root sets both up. Each still has its own `package.json`, build tooling, and CI jobs for its own build/test/deploy, since they produce genuinely different things (a static site vs. an npm package).

## Development

```sh
pnpm install
pnpm dev          # start the portal's dev server at http://localhost:4321
pnpm build        # production build of the portal → dist/
pnpm preview      # preview the portal's production build locally
pnpm check        # lint + format check + typecheck the whole workspace
```

To work on the docs framework itself, see [`framework/README.md`](framework/README.md).
