# Contributing

## Setup

```sh
pnpm install
```

Node 22 (see `.nvmrc`) and pnpm are required.

This repo produces two things - the `docs.trickfirerobotics.com` portal site and the `trickfire-docs` npm package - sharing one `package.json`, lockfile, and toolchain. See the [README](README.md#repo-layout) for how the two are laid out and which commands belong to which.

## Before you commit

```sh
pnpm check   # lint + format check + typecheck everything
pnpm test    # framework tests
```

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `chore:`, `docs:`, etc.) - this is enforced by commitlint via a git hook, and it's what drives the framework's automated npm releases (see the README's [Releasing section](README.md#releasing-trickfire-docs-to-npm)). A pre-commit hook also runs lint-staged automatically, so most formatting/lint issues get fixed for you on commit.

## Opening a PR

- Keep PRs focused on one concern - don't mix portal and framework changes unless they're genuinely related.
- Make sure `pnpm check` and `pnpm test` pass.
- Note in the PR description whether the change touches the portal, the framework, or both.

That's it - nothing else is required. Ask in an issue or PR if anything here is unclear.
