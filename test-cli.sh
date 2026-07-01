#!/bin/bash
# This script is used to test the trickfire-framework package in a clean environment

set -euo pipefail

pnpm install
pnpm framework:build
npm pack
rm -rf .framework-test || true
mkdir .framework-test
cd .framework-test
touch package.json
echo '{"name": "framework-test", "version": "1.0.0"}' >package.json
npm install ../trickfire-docs-*.tgz
