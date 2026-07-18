import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { loadDocsConfig } from "../config/load.js";
import { resolveDocsConfig } from "../config/resolve.js";
import { generateFiles } from "../config/generate.js";
import { ensureSiteNodeModules, findDocusaurusBin } from "../utils/docusaurus.js";
import { THEME_CSS } from "../theme.js";

export async function runDev(projectRoot: string): Promise<void> {
    const raw = await loadDocsConfig(projectRoot);
    const config = await resolveDocsConfig(projectRoot, raw);
    const { config: configJs, sidebars } = generateFiles(config, projectRoot);

    const trickfireDir = path.join(projectRoot, ".trickfire");
    await fs.mkdir(trickfireDir, { recursive: true });

    await fs.writeFile(path.join(trickfireDir, "custom.css"), THEME_CSS, "utf-8");
    await fs.writeFile(path.join(trickfireDir, "docusaurus.config.js"), configJs, "utf-8");
    if (sidebars) {
        await fs.writeFile(path.join(trickfireDir, "sidebars.js"), sidebars, "utf-8");
    }

    // Symlink react / react-dom / @mdx-js/react into the project root's
    // node_modules so Docusaurus's resolveSitePkg() (which uses siteDir=cwd)
    // can find them regardless of how the member repo's package manager lays
    // out its node_modules.
    await ensureSiteNodeModules(path.join(projectRoot, "node_modules"));

    const bin = await findDocusaurusBin();

    await new Promise<void>((resolve, reject) => {
        const child = spawn(
            process.execPath,
            [bin, "start", "--config", ".trickfire/docusaurus.config.js"],
            { cwd: projectRoot, stdio: "inherit" }
        );
        child.on("close", (code) => {
            if (code === 0 || code === null) resolve();
            else reject(new Error(`docusaurus exited with code ${code}`));
        });
        child.on("error", reject);
    });
}
