#!/usr/bin/env bash
set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

info()  { printf "${GREEN}[init]${NC} %s\n" "$*"; }
warn()  { printf "${YELLOW}[warn]${NC} %s\n" "$*"; }
error() { printf "${RED}[error]${NC} %s\n" "$*" >&2; exit 1; }

# ---------------------------------------------------------------------------
# Repo name
# ---------------------------------------------------------------------------
if remote=$(git remote get-url origin 2>/dev/null); then
    REPO_NAME=$(basename "$remote" .git)
else
    REPO_NAME=$(basename "$(pwd)")
fi
info "Repo: $REPO_NAME"

# ---------------------------------------------------------------------------
# package.json
# ---------------------------------------------------------------------------
if [[ -f package.json ]]; then
    if command -v node &>/dev/null; then
        CURRENT_NAME=$(node -e "console.log(JSON.parse(require('fs').readFileSync('package.json','utf8')).name)")
    else
        CURRENT_NAME=$(grep -m1 '"name"' package.json | sed 's/.*"name"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/')
    fi

    if [[ "$CURRENT_NAME" == "$REPO_NAME" ]]; then
        info "package.json already correct (name: $REPO_NAME)"
    else
        warn "package.json exists with name '$CURRENT_NAME', expected '$REPO_NAME' - skipping"
    fi
else
    cat > package.json <<EOF
{
    "name": "$REPO_NAME",
    "type": "module",
    "private": true,
    "scripts": {
        "docs:dev": "trickfire-docs dev",
        "docs:build": "trickfire-docs build"
    },
    "dependencies": {
        "trickfire-docs": "latest"
    }
}
EOF
    info "Created package.json"
fi

# ---------------------------------------------------------------------------
# pnpm-workspace.yaml
# ---------------------------------------------------------------------------
if [[ -f pnpm-workspace.yaml ]]; then
    warn "pnpm-workspace.yaml already exists - skipping. Make sure it includes:"
    warn "  allowBuilds: { esbuild: true, sharp: true }"
    warn "  minimumReleaseAgeExclude: [trickfire-docs]"
else
    cat > pnpm-workspace.yaml <<'EOF'
allowBuilds:
  esbuild: true
  sharp: true

minimumReleaseAgeExclude:
  - trickfire-docs
EOF
    info "Created pnpm-workspace.yaml"
fi

# ---------------------------------------------------------------------------
# .github/workflows/pages.yml
# ---------------------------------------------------------------------------
mkdir -p .github/workflows
cat > .github/workflows/pages.yml <<'EOF'
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
            - run: pnpm run docs:build

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
EOF
info "Created .github/workflows/pages.yml"

# ---------------------------------------------------------------------------
# .gitignore
# ---------------------------------------------------------------------------
GITIGNORE_ENTRIES=("node_modules/" "dist/" ".pnpm-store/" ".next-cache/")
GITIGNORE_ADDED=()
for entry in "${GITIGNORE_ENTRIES[@]}"; do
    if ! grep -qxF "$entry" .gitignore 2>/dev/null; then
        printf "%s\n" "$entry" >> .gitignore
        GITIGNORE_ADDED+=("$entry")
    fi
done
if [[ ${#GITIGNORE_ADDED[@]} -gt 0 ]]; then
    info "Appended to .gitignore: ${GITIGNORE_ADDED[*]}"
else
    info ".gitignore already up to date"
fi

# ---------------------------------------------------------------------------
# Install
# ---------------------------------------------------------------------------
info "Running pnpm install..."
pnpm install

# ---------------------------------------------------------------------------
# Scaffold (docs/ + docs.config.ts)
# ---------------------------------------------------------------------------
if [[ -d docs ]] || [[ -f docs.config.ts ]]; then
    warn "docs/ or docs.config.ts already exist - skipping scaffold"
    warn "To scaffold the starter docs/ and docs.config.ts anyway (existing files with the same names are overwritten, others are left alone), run:"
    warn "  pnpm exec trickfire-docs init --force"
else
    info "Scaffolding docs..."
    pnpm exec trickfire-docs init
fi

# ---------------------------------------------------------------------------
# Done
# ---------------------------------------------------------------------------
printf "\n"
info "Done. Next steps:"
printf "  1. Edit docs.config.ts - set name/description for your project\n"
printf "  2. Enable GitHub Pages in repo Settings → Pages → Source: GitHub Actions\n"
