import chokidar from "chokidar";
import fs from "node:fs/promises";
import path from "node:path";
import type { ResolvedDocsConfig } from "../config/resolve.js";

function generateIndexMdx(config: ResolvedDocsConfig): string {
    const cards = config.landing
        .map(
            (item) =>
                `  <LinkCard title=${JSON.stringify(item.title)} description=${JSON.stringify(item.description)} href=${JSON.stringify(item.link)} />`
        )
        .join("\n");

    return `---
title: ${JSON.stringify(config.name)}
description: ${JSON.stringify(config.description)}
template: splash
hero:
  title: ${JSON.stringify(config.name)}
  tagline: ${JSON.stringify(config.description)}
---

import { CardGrid, LinkCard } from '@astrojs/starlight/components';

<CardGrid>
${cards}
</CardGrid>
`;
}

function contentDocsDir(cacheRoot: string): string {
    return path.join(cacheRoot, "content", "docs");
}

/** One-shot copy of the consumer's docs/ folder + the generated landing page. */
export async function syncContentOnce(
    cacheRoot: string,
    docsSourceDir: string,
    config: ResolvedDocsConfig
): Promise<void> {
    const destDir = contentDocsDir(cacheRoot);
    await fs.rm(destDir, { recursive: true, force: true });
    await fs.mkdir(destDir, { recursive: true });
    await fs.cp(docsSourceDir, destDir, { recursive: true });
    await fs.writeFile(path.join(destDir, "index.mdx"), generateIndexMdx(config));
}

/**
 * Mirrors add/change/unlink events from the consumer's real docs/ folder into the cache,
 * so edits land as real file writes that Astro's own dev server picks up via its normal
 * HMR. Returns a function that stops watching.
 */
export function watchContent(cacheRoot: string, docsSourceDir: string): () => Promise<void> {
    const destDir = contentDocsDir(cacheRoot);

    const destPathFor = (sourcePath: string) =>
        path.join(destDir, path.relative(docsSourceDir, sourcePath));

    const watcher = chokidar.watch(docsSourceDir, { ignoreInitial: true });
    watcher.on("add", (sourcePath) => fs.cp(sourcePath, destPathFor(sourcePath)));
    watcher.on("change", (sourcePath) => fs.cp(sourcePath, destPathFor(sourcePath)));
    watcher.on("unlink", (sourcePath) => fs.rm(destPathFor(sourcePath), { force: true }));

    return () => watcher.close();
}
