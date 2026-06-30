# my-tool

Example CLI package scaffold - a minimal template for building and publishing a TypeScript-based npm CLI tool.

## Tech Stack

| Layer           | Choice                                        |
| --------------- | --------------------------------------------- |
| Language        | [TypeScript](https://www.typescriptlang.org/) |
| Bundler         | [tsup](https://tsup.egoist.dev/)              |
| Tests           | [Vitest](https://vitest.dev/)                 |
| Package manager | [`pnpm`](https://pnpm.io/)                    |

## Usage

```bash
npx my-tool <name>
```

## Local Development

```bash
pnpm install
pnpm dev <name>     # run the CLI from source via tsx, no build step
```

### Building

```bash
pnpm build          # bundles src/cli.ts -> dist/cli.js
node dist/cli.js <name>
```

### Checks

```bash
pnpm lint           # ESLint
pnpm format:check   # Prettier check (no writes)
pnpm format         # auto-fix formatting
pnpm typecheck      # tsc --noEmit
pnpm check          # lint + format:check + typecheck
pnpm test           # Vitest
```

### Testing the packed tarball

Before publishing, verify the package as a real consumer would install it:

```bash
pnpm build
npm pack
npm install /path/to/my-tool-<version>.tgz   # in a throwaway project
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full development workflow.
