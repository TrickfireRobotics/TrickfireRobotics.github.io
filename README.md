> [!NOTE]
> Looking for the TrickFire website? This repo is only the docs portal. The main TrickFire Robotics website ([trickfirerobotics.com](https://trickfirerobotics.com/)) lives at [github.com/TrickfireRobotics/TrickFire-Website](https://github.com/TrickfireRobotics/TrickFire-Website).

# TrickfireRobotics.github.io

The central documentation portal for TrickFire Robotics, served at [docs.trickfirerobotics.com](https://docs.trickfirerobotics.com/).

## Why this repo name?

GitHub serves an organization's `<org>.github.io` repository at the root of its GitHub Pages domain. By naming this repo `TrickfireRobotics.github.io` and pointing the custom domain at it, we own `docs.trickfirerobotics.com/`. Every other repo in the organization can then deploy its own GitHub Pages site at a subpath of that domain — for example:

- `docs.trickfirerobotics.com/gazebo-simulations/` — from the `gazebo-simulations` repo
- `docs.trickfirerobotics.com/trickfire-urc/` — from the `trickfire-urc` repo

This gives us a unified docs domain without needing a reverse proxy.

## Development

```sh
npm install
npm run dev      # start dev server at http://localhost:4321
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```
