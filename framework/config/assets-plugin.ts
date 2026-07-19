import { existsSync, cpSync } from "node:fs";
import path from "node:path";

export interface AssetEntry {
    assetsDir: string;
    publicPath: string; // URL prefix, e.g. "/assets" or "/robot/assets"
    outSubPath: string; // Path relative to outDir, e.g. "assets" or "robot/assets"
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createAssetsPlugin(entries: AssetEntry[]): () => any {
    return () => ({
        name: "trickfire-project-assets",
        getPathsToWatch() {
            return entries.map((e) => e.assetsDir).filter(existsSync);
        },
        configureWebpack() {
            const staticEntries = entries
                .filter((e) => existsSync(e.assetsDir))
                .map((e) => ({ directory: e.assetsDir, publicPath: e.publicPath }));
            // devServer is not in webpack's bundled types but Docusaurus merges it at runtime
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return (staticEntries.length ? { devServer: { static: staticEntries } } : {}) as any;
        },
        postBuild({ outDir }: { outDir: string }) {
            for (const { assetsDir, outSubPath } of entries) {
                if (!existsSync(assetsDir)) continue;
                cpSync(assetsDir, path.join(outDir, outSubPath), { recursive: true });
            }
        },
    });
}
