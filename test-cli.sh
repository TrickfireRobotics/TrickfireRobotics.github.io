#!/bin/bash
# This script is used to test the trickfire-docs package in a clean environment

set -euo pipefail

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

pnpm install
pnpm framework:build
npm pack
rm -rf .framework-test || true
mkdir .framework-test
cd .framework-test
touch package.json
echo '{"name": "framework-test", "version": "1.0.0"}' >package.json
npm install ../trickfire-docs-*.tgz
npx trickfire-docs init
npx trickfire-docs build
