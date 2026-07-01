import { build } from "astro";
import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { getCacheRoot } from "../astro/cachePaths.js";
import { writeAstroProject } from "../astro/buildAstroConfig.js";
import { syncContentOnce } from "../astro/syncContent.js";
import { loadDocsConfig } from "../config/load.js";
import { resolveDocsConfig } from "../config/resolve.js";

export async function runBuild(projectRoot: string): Promise<void> {
    const docsSourceDir = path.join(projectRoot, "docs");
    if (!existsSync(docsSourceDir)) {
        throw new Error(
            `No docs/ folder found at ${docsSourceDir}. Run "trickfire-docs init" first.`
        );
    }

    const config = await loadDocsConfig(projectRoot);
    const resolved = await resolveDocsConfig(projectRoot, config);
    const cacheRoot = getCacheRoot();
    const finalOutDir = path.join(projectRoot, "dist");

    // Astro writes intermediate SSR/prerender chunks into outDir and resolves their own
    // runtime imports (e.g. "piccolore") relative to wherever outDir lives. Building
    // straight into the consumer's bare dist/ - outside any path that resolves to our
    // package's own dependencies - breaks under pnpm's strict, non-hoisted isolation.
    // Building into a staging dir inside the cache root (which DOES resolve correctly,
    // same as `root`) and copying the result out afterwards avoids that.
    const stagingOutDir = path.join(cacheRoot, ".output");

    await writeAstroProject(cacheRoot, resolved);
    await syncContentOnce(cacheRoot, docsSourceDir, resolved);

    await build({ root: cacheRoot, outDir: stagingOutDir, logLevel: "info" });

    await fs.rm(finalOutDir, { recursive: true, force: true });
    await fs.cp(stagingOutDir, finalOutDir, { recursive: true });
}
