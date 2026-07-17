import { createRequire } from "node:module";
import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

function findPackageRoot(startDir: string): string {
    let dir = startDir;
    while (!existsSync(path.join(dir, "package.json"))) {
        const parent = path.dirname(dir);
        if (parent === dir) {
            throw new Error(`Could not locate trickfire-docs package root from ${startDir}`);
        }
        dir = parent;
    }
    return dir;
}

/**
 * The installed trickfire-docs package's own root - not the consumer project's root.
 * Resolved relative to this file's own location so it works both from dist-cli/ (built,
 * installed inside a consumer's node_modules/trickfire-docs/) and from framework/ (dev, via tsx).
 */
export function getPackageRoot(): string {
    const here = path.dirname(fileURLToPath(import.meta.url));
    return findPackageRoot(here);
}

export function getInternalDir(): string {
    return path.join(getPackageRoot(), "internal");
}

export function getScaffoldDir(): string {
    return path.join(getPackageRoot(), "scaffold");
}

/**
 * Generated Next.js project lives inside the *consumer's* project root, NOT inside
 * node_modules/trickfire-docs/ the way the previous Astro-based framework's cache root did.
 * Turbopack (Next's default bundler as of Next 16, used for both `dev` and `build`) refuses to
 * treat a project as first-party application code when its root directory has `node_modules`
 * as an ancestor path segment - every route write panics with a generic
 * "Expected process result to be a module" internal error, confirmed by reproducing it with a
 * from-scratch, zero-dependency Next app in the same location and watching it disappear the
 * moment the project moved outside node_modules/. See linkDependencies() below for how
 * next/react/fumadocs-* still resolve correctly from this new location.
 */
export function getCacheRoot(projectRoot: string): string {
    return path.join(projectRoot, ".next-cache");
}

/**
 * Packages the generated Next project's own source imports directly (see internal/) - each
 * gets its own symlink into `<cacheRoot>/node_modules/`, individually resolved via Node's own
 * resolution algorithm from trickfire-docs' package root. This works regardless of the
 * consumer's package manager hoisting behavior (flat/hoisted under npm, strict/nested under
 * pnpm) because it asks Node where each package actually landed rather than assuming a single
 * shared node_modules directory - and because a symlink target's own further `require()`/
 * `import` calls resolve relative to the symlink's real (target) location, every one of these
 * packages' own transitive dependencies keep resolving correctly too, without needing to be
 * listed here individually.
 */
const CONSUMER_FACING_DEPENDENCIES = [
    "next",
    "react",
    "react-dom",
    "fumadocs-core",
    "fumadocs-ui",
    "fumadocs-mdx",
    "lucide-react",
    "tailwindcss",
    "@tailwindcss/postcss",
    "typescript",
    "@types/react",
    "@types/react-dom",
    "@types/node",
];

/**
 * Finds `<some node_modules dir>/<pkg>` by walking the same ancestor node_modules candidates
 * Node's own resolver would search from `fromDir`, rather than resolving a specific file inside
 * the package. Some packages restrict their `exports` map to only a few subpaths (blocking
 * `require.resolve(pkg + "/package.json")`) and type-only packages like `@types/node` have no
 * `main` entry to resolve at all - walking node_modules directories directly sidesteps both.
 */
function findPackageDir(pkg: string, fromDir: string): string {
    const require = createRequire(`${fromDir}/`);
    for (const candidate of require.resolve.paths(pkg) ?? []) {
        const packageDir = path.join(candidate, ...pkg.split("/"));
        if (existsSync(path.join(packageDir, "package.json"))) return packageDir;
    }
    throw new Error(`Could not resolve "${pkg}" from ${fromDir} - is it installed?`);
}

/** Symlinks each of CONSUMER_FACING_DEPENDENCIES into `<cacheRoot>/node_modules/`, pointing at wherever it actually resolves from trickfire-docs' own package root. */
export async function linkDependencies(cacheRoot: string): Promise<void> {
    const packageRoot = getPackageRoot();
    const nodeModulesDir = path.join(cacheRoot, "node_modules");
    await fs.mkdir(nodeModulesDir, { recursive: true });

    await Promise.all(
        CONSUMER_FACING_DEPENDENCIES.map(async (pkg) => {
            const target = findPackageDir(pkg, packageRoot);
            const linkPath = path.join(nodeModulesDir, pkg);
            await fs.mkdir(path.dirname(linkPath), { recursive: true });
            await fs.rm(linkPath, { force: true, recursive: true });
            await fs.symlink(target, linkPath, "dir");
        })
    );
}
