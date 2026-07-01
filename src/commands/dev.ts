import { dev } from "astro";
import { existsSync } from "node:fs";
import path from "node:path";
import { getCacheRoot } from "../astro/cachePaths.js";
import { writeAstroProject } from "../astro/buildAstroConfig.js";
import { syncContentOnce, watchContent } from "../astro/syncContent.js";
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
    const cacheRoot = getCacheRoot();

    await writeAstroProject(cacheRoot, resolved);
    await syncContentOnce(cacheRoot, docsSourceDir, resolved);
    const stopWatching = watchContent(cacheRoot, docsSourceDir);

    const server = await dev({ root: cacheRoot, logLevel: "info" });

    const shutdown = async () => {
        await stopWatching();
        await server.stop();
        process.exit(0);
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
}
