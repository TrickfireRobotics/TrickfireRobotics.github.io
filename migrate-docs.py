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

    # ---- Extract description from old index.mdx ----------------------------

    description: str | None = None

    index_mdx = old_content / "index.mdx"
    if index_mdx.exists():
        mdx = index_mdx.read_text()

        # tagline is the visible hero text; description is just the SEO meta field
        for field in ("tagline", "description"):
            m = re.search(rf"^\s*{field}:\s*(.+)$", mdx, re.MULTILINE)
            if m:
                description = m.group(1).strip().strip("\"'")
                break

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
            print("    removed  : docs/content/docs/index.mdx (base URL now redirects to the first sidebar page)")

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

    # ---- Fix image paths in migrated content ------------------------------
    # Old content lived at docs/content/docs/, 2 levels deeper than the new
    # docs/ root. Any relative image path pointing at docs/assets/ had 2 extra
    # "../" (e.g. "../../../assets/X" from docs/content/docs/cat/). Strip them.

    img_pat = re.compile(r'(!\[[^\]]*\]\()((?:\.\.\/){2,})(assets\/[^)]+\))')
    for md_file in docs_dir.rglob("*.md"):
        text = md_file.read_text()
        def _fix(m: re.Match) -> str:
            return m.group(1) + m.group(2)[6:] + m.group(3)
        new_text = img_pat.sub(_fix, text)
        if new_text != text:
            md_file.write_text(new_text)
            print(f"    fixed    : image paths in docs/{md_file.relative_to(docs_dir)}")

    # ---- Generate docs.config.ts ------------------------------------------

    desc = description or f"TODO: One-line description of {title}."
    sidebar_ts = js_to_ts_strings(sidebar_raw)

    config_src = textwrap.dedent(f"""\
        import {{ defineConfig }} from "trickfire-docs";

        export default defineConfig({{
            name: {json.dumps(title)},
            description: {json.dumps(desc)},
            sidebar: {sidebar_ts},
        }});
    """)

    config_dest.write_text(config_src)
    print("    created  : docs.config.ts")

    # ---- Create or update package.json ------------------------------------

    if pkg_json_path.exists():
        pkg = json.loads(pkg_json_path.read_text())
        pkg.setdefault("dependencies", {})["trickfire-docs"] = "latest"
        # Remove stale pnpm key if present — these settings moved to pnpm-workspace.yaml
        pkg.pop("pnpm", None)
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
        }
        pkg_json_path.write_text(json.dumps(pkg, indent=4) + "\n")
        print(f"    created  : package.json  (name={repo_name})")

    # ---- Write pnpm-workspace.yaml ----------------------------------------
    # pnpm 11 reads build-script approvals and supply-chain policy from
    # pnpm-workspace.yaml. allowBuilds approves build scripts per package;
    # minimumReleaseAgeExclude skips the release-age check for first-party packages.

    NEEDS_BUILD = ["esbuild", "sharp"]
    workspace_yaml = repo_root / "pnpm-workspace.yaml"

    def yaml_ensure_map_entry(content: str, key: str, field: str, value: str) -> str:
        """Ensure `field: value` exists under the `key:` map block."""
        entry = f"  {field}: {value}"
        if f"{field}: {value}" in content:
            return content
        # Update an existing placeholder for this field
        import re as _re
        content = _re.sub(rf"  {field}:.*", entry, content)
        if entry in content:
            return content
        # Append under the key block if it already exists
        if f"{key}:" in content:
            return content.replace(f"{key}:\n", f"{key}:\n{entry}\n", 1)
        return content + f"\n{key}:\n{entry}\n"

    def yaml_ensure_list_entry(content: str, key: str, value: str) -> str:
        entry = f"  - {value}"
        if value in content:
            return content
        if f"{key}:" in content:
            return content.replace(f"{key}:\n", f"{key}:\n{entry}\n", 1)
        return content + f"\n{key}:\n{entry}\n"

    if workspace_yaml.exists():
        content = workspace_yaml.read_text()
        for dep in NEEDS_BUILD:
            content = yaml_ensure_map_entry(content, "allowBuilds", dep, "true")
        content = yaml_ensure_list_entry(content, "minimumReleaseAgeExclude", "trickfire-docs")
        workspace_yaml.write_text(content)
        print("    updated  : pnpm-workspace.yaml")
    else:
        build_entries = "\n".join(f"  {d}: true" for d in NEEDS_BUILD)
        workspace_yaml.write_text(
            f"allowBuilds:\n{build_entries}\n"
            f"\nminimumReleaseAgeExclude:\n  - trickfire-docs\n"
        )
        print("    created  : pnpm-workspace.yaml")

    # Delete any stale lockfile so pnpm re-resolves against the updated policy.
    lockfile = repo_root / "pnpm-lock.yaml"
    if lockfile.exists():
        lockfile.unlink()
        print("    removed  : stale pnpm-lock.yaml")

    # ---- Install dependencies ---------------------------------------------

    print()
    print("==> Running pnpm install…")
    subprocess.run(["pnpm", "install"], cwd=repo_root, check=True)

    print()
    print("Migration complete.")
    print()
    print("TODOs in docs.config.ts:")
    print("  • Fill in the description field")
    print()
    print("To preview:")
    print("  pnpm exec trickfire-docs dev")


if __name__ == "__main__":
    main()
