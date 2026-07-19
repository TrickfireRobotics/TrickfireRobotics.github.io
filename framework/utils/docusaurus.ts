import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

async function ensureSymlink(linkPath: string, target: string): Promise<void> {
    try {
        await fs.symlink(target, linkPath, "dir");
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === "EEXIST") {
            const existing = await fs.readlink(linkPath).catch(() => null);
            if (existing !== target) {
                await fs.unlink(linkPath);
                await fs.symlink(target, linkPath, "dir");
            }
        } else {
            throw err;
        }
    }
}

const _require = createRequire(import.meta.url);

function resolvePackageDir(name: string): string {
    try {
        return path.dirname(_require.resolve(`${name}/package.json`));
    } catch {
        // Package doesn't export ./package.json — walk up from the main entry
        let dir = path.dirname(_require.resolve(name));
        while (true) {
            if (existsSync(path.join(dir, "package.json"))) return dir;
            const parent = path.dirname(dir);
            if (parent === dir) throw new Error(`Cannot find package dir for: ${name}`);
            dir = parent;
        }
    }
}

export async function findDocusaurusBin(): Promise<string> {
    const pkgJsonPath = _require.resolve("@docusaurus/core/package.json");
    const pkgRoot = path.dirname(pkgJsonPath);
    const raw = await fs.readFile(pkgJsonPath, "utf-8");
    const pkg = JSON.parse(raw) as { bin?: Record<string, string> | string };
    const rel =
        typeof pkg.bin === "string" ? pkg.bin : (pkg.bin?.docusaurus ?? "bin/docusaurus.mjs");
    return path.join(pkgRoot, rel);
}

/**
 * Symlinks react, react-dom, and @mdx-js/react into siteNodeModules so that
 * Docusaurus's resolveSitePkg() can find them regardless of how the member
 * repo's package manager laid out its node_modules.
 *
 * Uses _require.resolve() to find the actual package paths in trickfire-docs's
 * own dependency tree (works with pnpm's .pnpm/ layout). Stale symlinks from
 * previous runs are removed and recreated if the target has changed.
 */
export async function ensureSiteNodeModules(siteNodeModules: string): Promise<void> {
    const links: Array<[string, string]> = [
        [path.join(siteNodeModules, "react"), resolvePackageDir("react")],
        [path.join(siteNodeModules, "react-dom"), resolvePackageDir("react-dom")],
        [path.join(siteNodeModules, "@mdx-js", "react"), resolvePackageDir("@mdx-js/react")],
    ];

    for (const [linkPath, target] of links) {
        await fs.mkdir(path.dirname(linkPath), { recursive: true });
        await ensureSymlink(linkPath, target);
    }
}
