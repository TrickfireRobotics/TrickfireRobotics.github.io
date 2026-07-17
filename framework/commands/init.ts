import { existsSync } from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";
import { getScaffoldDir } from "../next/cachePaths.js";

export interface InitOptions {
    /** Scaffold over an existing docs/ and/or docs.config.ts instead of refusing. */
    force?: boolean;
}

export async function runInit(projectRoot: string, options: InitOptions = {}): Promise<void> {
    const scaffoldDir = getScaffoldDir();
    const docsDest = path.join(projectRoot, "docs");
    const configDest = path.join(projectRoot, "docs.config.ts");

    if (!options.force) {
        if (existsSync(docsDest)) {
            throw new Error(
                `${docsDest} already exists - refusing to overwrite. Re-run with --force to scaffold anyway.`
            );
        }
        if (existsSync(configDest)) {
            throw new Error(
                `${configDest} already exists - refusing to overwrite. Re-run with --force to scaffold anyway.`
            );
        }
    }

    await fs.cp(path.join(scaffoldDir, "docs"), docsDest, { recursive: true, force: true });
    await fs.cp(path.join(scaffoldDir, "docs.config.ts"), configDest, { force: true });

    console.log(`Created docs/ and docs.config.ts in ${projectRoot}`);
}
