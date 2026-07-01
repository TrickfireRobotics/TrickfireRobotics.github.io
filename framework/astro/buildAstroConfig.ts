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

function generateAstroConfigSource(config: ResolvedDocsConfig): string {
    return `import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
    site: ${JSON.stringify(config.site)},
    base: ${JSON.stringify(config.base)},
    srcDir: "./",
    vite: {
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
    integrations: [
        starlight({
            title: ${JSON.stringify(config.name)},
            description: ${JSON.stringify(config.description)},
            logo: {
                src: "./assets/nav-logo.png",
                alt: "TrickFire Robotics Logo",
                replacesTitle: true,
            },
            favicon: "/favicon.ico",
            social: ${JSON.stringify(config.social)},
            sidebar: ${JSON.stringify(config.sidebar)},
            components: {
                SocialIcons: "./components/SocialIcons.astro",
            },
            customCss: ["./styles/custom.css"],
        }),
    ],
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
