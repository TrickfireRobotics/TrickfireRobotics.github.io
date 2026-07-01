#!/usr/bin/env python3
"""
migrate-docs.py — converts an old standalone Astro/Starlight docs/ setup to trickfire-docs

Old layout:
  docs/
    astro.config.mjs        (Astro + Starlight config)
    content/docs/**/*.md    (the actual pages)
    assets/, components/, styles/, public/, ...
  (no docs.config.ts at repo root)

New layout (trickfire-docs framework):
  docs.config.ts            (created by this script)
  package.json              (created or updated with trickfire-docs dep)
  docs/
    **/*.md                 (pages, moved from docs/content/docs/)

Usage:
  cd path/to/repo
  python3 migrate-docs.py
"""

import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import textwrap
from pathlib import Path


def die(msg: str) -> None:
    print(f"Error: {msg}", file=sys.stderr)
    sys.exit(1)


def extract_sidebar(src: str) -> str:
    idx = src.find("sidebar: [")
    if idx == -1:
        return "[]"
    pos = idx + len("sidebar: ")
    depth = 0
    for i, c in enumerate(src[pos:], pos):
        if c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                return src[pos : i + 1]
    return "[]"


def js_to_ts_strings(js: str) -> str:
    """Replace JS single-quoted strings with double-quoted ones."""
    return re.sub(
        r"'([^'\\]*(?:\\.[^'\\]*)*)'",
        lambda m: '"' + m.group(1).replace('"', '\\"') + '"',
        js,
    )


def build_landing(sidebar_raw: str) -> list[dict]:
    group_pat = re.compile(
        r'\{\s*label:\s*[\'"]([^\'"]+)[\'"][^{}]*items:\s*\[', re.DOTALL
    )
    slug_pat = re.compile(r"slug:\s*['\"]([^'\"]+)['\"]")

    landing = []
    for gm in group_pat.finditer(sidebar_raw):
        label = gm.group(1)
        slug_m = slug_pat.search(sidebar_raw[gm.end() :])
        slug = slug_m.group(1) if slug_m else label.lower().replace(" ", "-")
        landing.append({
            "title": label,
            "description": f"TODO: Add a description for {label}.",
            "link": f"/{slug}/",
        })

    # Fallback: top-level link items
    if not landing:
        for lm in re.finditer(
            r'\{\s*label:\s*[\'"]([^\'"]+)[\'"][^{}]*slug:\s*[\'"]([^\'"]+)[\'"]',
            sidebar_raw,
        ):
            landing.append({
                "title": lm.group(1),
                "description": "TODO: Add a description.",
                "link": f"/{lm.group(2)}/",
            })
            if len(landing) >= 4:
                break

    if not landing:
        landing = [{
            "title": "Getting Started",
            "description": "TODO: Add a description.",
            "link": "/getting-started/",
        }]

    return landing[:4]


def format_landing_ts(items: list[dict]) -> str:
    lines = ["["]
    for item in items:
        lines.append("        {")
        lines.append(f"            title: {json.dumps(item['title'])},")
        lines.append(f"            description: {json.dumps(item['description'])},")
        lines.append(f"            link: {json.dumps(item['link'])},")
        lines.append("        },")
    lines.append("    ]")
    return "\n".join(lines)


def main() -> None:
    repo_root = Path(os.getcwd()).resolve()

    docs_dir      = repo_root / "docs"
    config_mjs    = docs_dir / "astro.config.mjs"
    old_content   = docs_dir / "content" / "docs"
    config_dest   = repo_root / "docs.config.ts"
    pkg_json_path = repo_root / "package.json"

    print(f"==> Migrating: {repo_root}")

    # ---- Pre-flight checks ------------------------------------------------

    if not config_mjs.exists():
        die("docs/astro.config.mjs not found — not an old-style docs repo?")
    if not old_content.is_dir():
        die("docs/content/docs/ not found — unexpected structure.")
    if config_dest.exists():
        die("docs.config.ts already exists — already migrated?")

    # ---- Parse old astro.config.mjs ---------------------------------------

    src = config_mjs.read_text()

    title_m = re.search(r"title:\s*['\"]([^'\"]+)['\"]", src)
    title = title_m.group(1) if title_m else "My Project"

    sidebar_raw = extract_sidebar(src)

    print(f"    title    : {title}")

    # ---- Determine repo/package name --------------------------------------

    repo_name = ""
    if pkg_json_path.exists():
        repo_name = json.loads(pkg_json_path.read_text()).get("name", "")
    if not repo_name:
        base_m = re.search(r"base:\s*['\"]/?([^'\"]+)['\"]", src)
        repo_name = base_m.group(1).strip("/") if base_m else repo_root.name

    print(f"    repo name: {repo_name}")

    # ---- Identify user assets to preserve ---------------------------------
    # Framework provides these; everything else in assets/ and public/ is user content.
    FRAMEWORK_FILES = {"nav-logo.png", "favicon.ico", "logo-small.png"}

    user_assets: dict[Path, Path] = {}  # dest (relative to docs_dir) -> source
    for subdir in ("assets", "public"):
        src_dir = docs_dir / subdir
        if src_dir.is_dir():
            for entry in src_dir.iterdir():
                if entry.name not in FRAMEWORK_FILES:
                    user_assets[Path(subdir) / entry.name] = entry

    # ---- Migrate content --------------------------------------------------

    tmp = Path(tempfile.mkdtemp(prefix="tf_docs_migrate_"))
    try:
        tmp_content = tmp / "content"
        shutil.copytree(old_content, tmp_content)

        old_index = tmp_content / "index.mdx"
        if old_index.exists():
            old_index.unlink()
            print("    removed  : docs/content/docs/index.mdx (framework regenerates it)")

        # Stash user assets into temp dir before docs/ is deleted
        tmp_assets = tmp / "assets_stash"
        for rel, src_path in user_assets.items():
            dest = tmp_assets / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src_path, dest)

        print("    removing : old docs/ infrastructure…")
        shutil.rmtree(docs_dir)

        shutil.copytree(tmp_content, docs_dir)

        for rel in user_assets:
            src_path = tmp_assets / rel
            dest = docs_dir / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src_path, dest)
            print(f"    kept     : docs/{rel}")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)

    # ---- Generate docs.config.ts ------------------------------------------

    landing = build_landing(sidebar_raw)
    sidebar_ts = js_to_ts_strings(sidebar_raw)

    config_src = textwrap.dedent(f"""\
        import {{ defineConfig }} from "trickfire-docs";

        export default defineConfig({{
            name: {json.dumps(title)},
            description: "TODO: One-line description of {title}.",
            landing: {format_landing_ts(landing)},
            sidebar: {sidebar_ts},
        }});
    """)

    config_dest.write_text(config_src)
    print("    created  : docs.config.ts")

    # ---- Create or update package.json ------------------------------------

    NEEDS_BUILD = ["esbuild", "sharp"]

    if pkg_json_path.exists():
        pkg = json.loads(pkg_json_path.read_text())
        pkg.setdefault("dependencies", {})["trickfire-docs"] = "latest"
        pkg.setdefault("pnpm", {}).setdefault("onlyBuiltDependencies", [])
        for dep in NEEDS_BUILD:
            if dep not in pkg["pnpm"]["onlyBuiltDependencies"]:
                pkg["pnpm"]["onlyBuiltDependencies"].append(dep)
        pkg_json_path.write_text(json.dumps(pkg, indent=4) + "\n")
        print("    updated  : package.json (added trickfire-docs dependency)")
    else:
        pkg = {
            "name": repo_name,
            "type": "module",
            "private": True,
            "scripts": {
                "docs:dev": "trickfire-docs dev",
                "docs:build": "trickfire-docs build",
            },
            "dependencies": {
                "trickfire-docs": "latest",
            },
            "pnpm": {
                "onlyBuiltDependencies": NEEDS_BUILD,
            },
        }
        pkg_json_path.write_text(json.dumps(pkg, indent=4) + "\n")
        print(f"    created  : package.json  (name={repo_name})")

    # ---- Install dependencies ---------------------------------------------

    print()
    print("==> Running pnpm install…")
    subprocess.run(["pnpm", "install"], cwd=repo_root, check=True)

    print()
    print("Migration complete.")
    print()
    print("TODOs in docs.config.ts:")
    print("  • Fill in the description field")
    print("  • Update landing card descriptions")
    print()
    print("To preview:")
    print("  pnpm exec trickfire-docs dev")


if __name__ == "__main__":
    main()
