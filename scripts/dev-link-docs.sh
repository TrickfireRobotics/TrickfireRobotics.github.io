#!/bin/bash

set -euo pipefail

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

printf "==> Enter your project path: "
read filename

PROJECT_DIR=$(realpath $filename)

if [ ! -d "$PROJECT_DIR" ]; then
    echo "Path is not an existing directory"
    exit 1
fi

if [ ! -d "$PROJECT_DIR/docs" ]; then
    echo "Project does not contain a docs/ directory"
    exit 1
fi

if [ ! -f "$PROJECT_DIR/docs.config.json"]; then
    echo "Project does not contain docs.config.json"
    exit 1
fi

echo "yipee"
