import fs from "node:fs/promises";
import path from "node:path";
import type { ResolvedDocsConfig } from "../config/resolve.js";
import { getInternalDir } from "./cachePaths.js";

async function copyInternalAssets(cacheRoot: string): Promise<void> {
    const internalDir = getInternalDir();
    await Promise.all(
        ["content.config.ts", "components", "styles", "public", "assets", "env.d.ts"].map((entry) =>
            fs.cp(path.join(internalDir, entry), path.join(cacheRoot, entry), { recursive: true })
        )
    );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Recursively merges plain objects; arrays and primitives in `override` win outright. */
function deepMerge(
    base: Record<string, unknown>,
    override: Record<string, unknown>
): Record<string, unknown> {
    const result: Record<string, unknown> = { ...base };
    for (const [key, value] of Object.entries(override)) {
        const existing = result[key];
        result[key] =
            isPlainObject(existing) && isPlainObject(value) ? deepMerge(existing, value) : value;
    }
    return result;
}

function generateAstroConfigSource(config: ResolvedDocsConfig): string {
    const viteConfig = deepMerge(
        {
            // Without an explicit inline config, Vite's PostCSS support auto-discovers
            // postcss.config.* by walking up the filesystem - which picks up whatever config
            // the *consuming* repo's root happens to have (e.g. for its own Tailwind setup),
            // even though this framework's own styles never need one.
            css: { postcss: { plugins: [] } },
            server: {
                watch: {
                    // The generated project lives inside node_modules/trickfire-docs/ so that
                    // astro/@astrojs/starlight resolve correctly (see cachePaths.ts) - but Vite
                    // ignores node_modules/** by default for its dev-server watcher, which would
                    // otherwise silently break content hot-reload. Un-ignore just this path.
                    ignored: ["!**/node_modules/trickfire-docs/**"],
                },
            },
        },
        config.advanced?.vite ?? {}
    );

    const starlightConfig = deepMerge(
        {
            title: config.name,
            description: config.description,
            logo: {
                src: "./assets/nav-logo.png",
                alt: "TrickFire Robotics Logo",
                replacesTitle: true,
            },
            favicon: "/favicon.ico",
            social: config.social,
            sidebar: config.sidebar,
            components: {
                SocialIcons: "./components/SocialIcons.astro",
            },
            customCss: ["./styles/custom.css"],
            expressiveCode: {
                // Shiki bundles the "dotenv" grammar but doesn't alias it to the "env" tag
                // that ```env fences in docs almost always use, so it silently falls back
                // to plain text.
                shiki: { langAlias: { env: "dotenv" } },
            },
        },
        config.advanced?.starlight ?? {}
    );

    return `import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
    site: ${JSON.stringify(config.site)},
    base: ${JSON.stringify(config.base)},
    srcDir: "./",
    vite: ${JSON.stringify(viteConfig, null, 4)},
    integrations: [starlight(${JSON.stringify(starlightConfig, null, 4)})],
});
`;
}

/** Writes the bundled framework internals + a generated astro.config.mjs into the cache root. */
export async function writeAstroProject(
    cacheRoot: string,
    config: ResolvedDocsConfig
): Promise<void> {
    await fs.mkdir(cacheRoot, { recursive: true });
    await copyInternalAssets(cacheRoot);
    await fs.writeFile(path.join(cacheRoot, "astro.config.mjs"), generateAstroConfigSource(config));
}
