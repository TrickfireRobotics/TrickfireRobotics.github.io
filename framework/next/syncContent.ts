import chokidar from "chokidar";
import fs from "node:fs/promises";
import path from "node:path";
import type { SidebarConfig } from "../config/schema.js";

function contentDocsDir(cacheRoot: string): string {
    return path.join(cacheRoot, "content", "docs");
}

/** Depth-first collection of every leaf `slug` -> configured `label`, so synced copies can carry the configured label as frontmatter `title` (Fumadocs has no separate per-page label - see withTitleOverride below). */
function buildLabelMap(
    sidebar: SidebarConfig,
    map: Map<string, string> = new Map()
): Map<string, string> {
    for (const item of sidebar) {
        if ("items" in item) {
            buildLabelMap(item.items, map);
        } else if (item.slug !== undefined) {
            map.set(item.slug.replace(/^\/+|\/+$/g, ""), item.label);
        }
    }
    return map;
}

function slugFor(docsSourceDir: string, sourcePath: string): string {
    return path
        .relative(docsSourceDir, sourcePath)
        .replace(/\.mdx?$/i, "")
        .split(path.sep)
        .join("/");
}

/**
 * Fumadocs derives a page's sidebar label from its frontmatter `title`, not from any nav
 * config - unlike Starlight, which let docs.config.ts's sidebar `label` differ from the page's
 * own title. Overriding `title` in the synced copy (never the consumer's real file) preserves
 * that same "label lives in docs.config.ts" contract without touching consumer content.
 */
function withTitleOverride(content: string, label: string): string {
    const titleLine = `title: ${JSON.stringify(label)}`;
    const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(content);
    if (!match) {
        return `---\n${titleLine}\n---\n\n${content}`;
    }
    const body = match[1];
    const newBody = /^title:.*$/m.test(body)
        ? body.replace(/^title:.*$/m, titleLine)
        : `${titleLine}\n${body}`;
    return (
        content.slice(0, match.index) +
        `---\n${newBody}\n---` +
        content.slice(match.index + match[0].length)
    );
}

// docs/assets/ holds static reference files (PDFs, raw markdown notes, images) that are not
// Fumadocs content pages - skip them so they don't get treated as (or override the title of) docs.
const isAsset = (docsSourceDir: string, sourcePath: string) =>
    path.relative(docsSourceDir, sourcePath).split(path.sep)[0] === "assets";

const isContentFile = (sourcePath: string) => /\.mdx?$/i.test(sourcePath);

async function copyContentFile(
    docsSourceDir: string,
    destDir: string,
    sourcePath: string,
    labelMap: Map<string, string>
): Promise<void> {
    const destPath = path.join(destDir, path.relative(docsSourceDir, sourcePath));
    await fs.mkdir(path.dirname(destPath), { recursive: true });
    if (!isContentFile(sourcePath)) {
        await fs.cp(sourcePath, destPath);
        return;
    }
    const raw = await fs.readFile(sourcePath, "utf-8");
    const label = labelMap.get(slugFor(docsSourceDir, sourcePath));
    await fs.writeFile(destPath, label !== undefined ? withTitleOverride(raw, label) : raw);
}

/** One-shot copy of the consumer's docs/ folder into the cache. */
export async function syncContentOnce(
    cacheRoot: string,
    docsSourceDir: string,
    sidebar: SidebarConfig
): Promise<void> {
    const destDir = contentDocsDir(cacheRoot);
    await fs.rm(destDir, { recursive: true, force: true });
    await fs.mkdir(destDir, { recursive: true });
    const labelMap = buildLabelMap(sidebar);

    async function walk(dir: string): Promise<void> {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
            const entryPath = path.join(dir, entry.name);
            if (isAsset(docsSourceDir, entryPath)) continue;
            if (entry.isDirectory()) {
                await walk(entryPath);
            } else {
                await copyContentFile(docsSourceDir, destDir, entryPath, labelMap);
            }
        }
    }
    await walk(docsSourceDir);
}

/**
 * Mirrors add/change/unlink events from the consumer's real docs/ folder into the cache, so
 * edits land as real file writes that Next's own dev server picks up via its normal HMR/content
 * watcher. The cache root lives inside node_modules/ (see cachePaths.ts) - outside the
 * consumer's own project - so Next has no way to see consumer edits without this bridge.
 * Returns a function that stops watching.
 */
export function watchContent(
    cacheRoot: string,
    docsSourceDir: string,
    sidebar: SidebarConfig
): () => Promise<void> {
    const destDir = contentDocsDir(cacheRoot);
    const labelMap = buildLabelMap(sidebar);
    const destPathFor = (sourcePath: string) =>
        path.join(destDir, path.relative(docsSourceDir, sourcePath));

    const watcher = chokidar.watch(docsSourceDir, { ignoreInitial: true });
    watcher.on("add", (sourcePath) => {
        if (!isAsset(docsSourceDir, sourcePath)) {
            void copyContentFile(docsSourceDir, destDir, sourcePath, labelMap);
        }
    });
    watcher.on("change", (sourcePath) => {
        if (!isAsset(docsSourceDir, sourcePath)) {
            void copyContentFile(docsSourceDir, destDir, sourcePath, labelMap);
        }
    });
    watcher.on("unlink", (sourcePath) => {
        if (!isAsset(docsSourceDir, sourcePath)) fs.rm(destPathFor(sourcePath), { force: true });
    });

    return () => watcher.close();
}
