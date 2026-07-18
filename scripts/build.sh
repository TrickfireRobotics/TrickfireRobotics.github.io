#!/usr/bin/env bash
# Rebuilds the Docusaurus site from all synced content.
# Run on the server by the deploy workflow and the sync-docs reusable workflow.
set -euo pipefail

REPO_DIR="/home/trickfire/trickfire-docs"

echo "[trickfire-docs] Build started at $(date)"

cd "$REPO_DIR"

# Pull latest framework code (src/, scripts/, package.json, etc.)
# content/ is gitignored and managed by sync jobs — git pull won't touch it.
git pull --ff-only origin main

# Install/update deps if the lock file changed
pnpm install --frozen-lockfile

# Build Docusaurus site
pnpm website:build

echo "[trickfire-docs] Build complete at $(date)"
echo "[trickfire-docs] Output: $REPO_DIR/build/"
