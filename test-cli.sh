#!/bin/bash
# This script is used to test the trickfire-docs package in a clean environment

set -euo pipefail

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "==> Building docs-framework package..."
pnpm install
pnpm framework:build
npm pack

echo "==> Creating example project..."
rm -rf .framework-test || true
mkdir .framework-test
cd .framework-test
touch package.json
echo '{"name": "framework-test", "version": "1.0.0"}' >package.json

echo "==> Initializing docs using init command..."
npm install ../trickfire-docs-*.tgz
npx trickfire-docs init

echo "==> Running trickfire-docs dev..."
npx trickfire-docs dev
