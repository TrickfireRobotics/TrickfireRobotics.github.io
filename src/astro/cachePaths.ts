import { existsSync } from "node:fs";
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
 * installed inside a consumer's node_modules/trickfire-docs/) and from src/ (dev, via tsx).
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
 * Generated Astro project lives inside our own package's install directory (not the
 * consumer's project root) so that `astro`/`@astrojs/starlight` resolve correctly via
 * Node's standard upward node_modules resolution, regardless of the consumer's package
 * manager hoisting behavior.
 */
export function getCacheRoot(): string {
    return path.join(getPackageRoot(), ".astro-cache");
}
