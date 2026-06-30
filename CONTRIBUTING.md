# Contributing to my-tool

Thanks for contributing. This doc covers the workflow, conventions, and gotchas you need to know before opening a PR.

If you haven't set up the project yet, start with the [Local Development section in README.md](README.md#local-development).

## Project Structure

```
my-tool/
├── src/
│   ├── cli.ts           # CLI entry point (the bin)
│   ├── greet.ts          # CLI logic, kept separate from argv parsing so it's testable
│   └── greet.test.ts     # Vitest unit tests
├── dist/                  # Build output - generated, do not edit or commit
└── tsup.config.ts         # Bundler config (adds the shebang, builds dist/cli.js)
```

> [!TIP]
> Keep CLI logic in plain, importable functions (like `greet.ts`) rather than inline in `cli.ts`. It's easier to unit test and reuse if the package later exposes a programmatic API alongside the CLI.

## Development Workflow

1. Branch off `main` using the naming convention below.
2. Make your changes.
3. Verify lint, formatting, and tests pass locally (`pnpm check && pnpm test`).
4. Open a pull request against `main` with a short description of what changed and why.

### Branch Naming

| Type          | Pattern                     | Example               |
| ------------- | --------------------------- | --------------------- |
| Feature       | `feat/<short-description>`  | `feat/json-output`    |
| Bug fix       | `fix/<short-description>`   | `fix/empty-arg-crash` |
| Chore / infra | `chore/<short-description>` | `chore/update-deps`   |

## Commit Messages

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/). A git hook enforces this automatically - bad commits are blocked before they land.

```
<type>: <short description>
```

| Type       | When to use                                     |
| ---------- | ----------------------------------------------- |
| `feat`     | New feature or behaviour                        |
| `fix`      | Bug fix                                         |
| `chore`    | Maintenance, deps, config - no behaviour change |
| `docs`     | Documentation only                              |
| `style`    | Formatting, whitespace - no logic change        |
| `refactor` | Code restructure with no feature or fix         |
| `perf`     | Performance improvement                         |
| `ci`       | CI/CD changes                                   |
| `revert`   | Reverts a previous commit                       |

The hook is installed automatically by `pnpm install` (via `prepare`). Use `git commit --no-verify` only in genuine emergencies.

## Code Style

ESLint and Prettier are configured and run in CI, plus on staged files at commit time via `lint-staged`.

```bash
pnpm lint          # ESLint
pnpm format:check  # Prettier check (no writes)
pnpm format        # auto-fix formatting
```

> [!TIP]
> In VS Code, install the ESLint and Prettier extensions and enable **Format on Save** - you won't need to run these manually.

## Pull Requests

- **Keep PRs focused** - one concern per PR.
- **Write a useful description** - explain what changed and why, not just what the diff shows.

## Publishing

```bash
pnpm build
npm pack                      # inspect the tarball contents before publishing
npm publish --access public
```

Bump `version` in `package.json` (following [semver](https://semver.org/)) before publishing a new release.
