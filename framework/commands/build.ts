import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { getCacheRoot } from "../next/cachePaths.js";
import { writeFumadocsProject, writeMetaFiles } from "../next/buildFumadocsProject.js";
import { syncContentOnce } from "../next/syncContent.js";
import { runNext } from "../next/runNext.js";
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
    const cacheRoot = getCacheRoot(projectRoot);
    const finalOutDir = path.join(projectRoot, "dist");

    await writeFumadocsProject(cacheRoot, resolved, { isDev: false });
    await syncContentOnce(cacheRoot, docsSourceDir, resolved.sidebar);
    await writeMetaFiles(cacheRoot, resolved.sidebar);

    // `output: "export"` (set in the generated next.config.mjs) makes `next build` emit a
    // static site into <cacheRoot>/out/ instead of a server bundle.
    await runNext(["build", cacheRoot], cacheRoot);

    const stagingOutDir = path.join(cacheRoot, "out");
    await fs.rm(finalOutDir, { recursive: true, force: true });
    await fs.cp(stagingOutDir, finalOutDir, { recursive: true });

    // GitHub Pages runs Jekyll by default, which ignores any file/folder starting with "_" -
    // including Next's own _next/ build assets - unless this marker is present.
    await fs.writeFile(path.join(finalOutDir, ".nojekyll"), "");

    // Lets the portal (website/data/fetchRepos.ts) discover this site and its metadata by
    // probing docs.trickfirerobotics.com/<repo>/docs-manifest.json, instead of a hardcoded list.
    const manifest = {
        name: resolved.name,
        description: resolved.description,
        base: resolved.base,
    };
    await fs.writeFile(
        path.join(finalOutDir, "docs-manifest.json"),
        JSON.stringify(manifest, null, 4)
    );
}
