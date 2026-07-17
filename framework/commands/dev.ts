import { existsSync } from "node:fs";
import path from "node:path";
import { getCacheRoot } from "../next/cachePaths.js";
import { writeFumadocsProject, writeMetaFiles } from "../next/buildFumadocsProject.js";
import { syncContentOnce, watchContent } from "../next/syncContent.js";
import { runNext } from "../next/runNext.js";
import { loadDocsConfig } from "../config/load.js";
import { resolveDocsConfig } from "../config/resolve.js";

export async function runDev(projectRoot: string): Promise<void> {
    const docsSourceDir = path.join(projectRoot, "docs");
    if (!existsSync(docsSourceDir)) {
        throw new Error(
            `No docs/ folder found at ${docsSourceDir}. Run "trickfire-docs init" first.`
        );
    }

    const config = await loadDocsConfig(projectRoot);
    const resolved = await resolveDocsConfig(projectRoot, config);
    const cacheRoot = getCacheRoot(projectRoot);

    await writeFumadocsProject(cacheRoot, resolved, { isDev: true });
    await syncContentOnce(cacheRoot, docsSourceDir, resolved.sidebar);
    await writeMetaFiles(cacheRoot, resolved.sidebar);
    const stopWatching = watchContent(cacheRoot, docsSourceDir, resolved.sidebar);

    // `next dev` (spawned below) inherits our terminal, so Ctrl+C reaches it directly via the
    // OS's normal foreground process-group signal delivery - no manual SIGINT plumbing needed,
    // same as any other CLI-wrapping-CLI dev tool.
    try {
        await runNext(["dev", cacheRoot], cacheRoot);
    } finally {
        await stopWatching();
    }
}
