import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { getScaffoldDir } from "../astro/cachePaths.js";

export async function runInit(projectRoot: string): Promise<void> {
    const scaffoldDir = getScaffoldDir();
    const docsDest = path.join(projectRoot, "docs");
    const configDest = path.join(projectRoot, "docs.config.ts");

    if (existsSync(docsDest)) {
        throw new Error(`${docsDest} already exists - refusing to overwrite.`);
    }
    if (existsSync(configDest)) {
        throw new Error(`${configDest} already exists - refusing to overwrite.`);
    }

    await fs.cp(path.join(scaffoldDir, "docs"), docsDest, { recursive: true });
    await fs.cp(path.join(scaffoldDir, "docs.config.ts"), configDest);

    console.log(`Created docs/ and docs.config.ts in ${projectRoot}`);
}
