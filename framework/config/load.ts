import { createJiti } from "jiti";
import { existsSync } from "node:fs";
import path from "node:path";
import type { DocsConfig } from "./schema.js";

export async function loadDocsConfig(projectRoot: string): Promise<DocsConfig> {
    const configPath = path.join(projectRoot, "docs.config.ts");
    if (!existsSync(configPath)) {
        throw new Error(
            `No docs.config.ts found in ${projectRoot}.\n` +
                `Run \`trickfire-docs init\` to set up this repository, or run \`pnpm website:dev\` if you are in the trickfire-docs repo itself.`
        );
    }
    const jiti = createJiti(import.meta.url);
    return jiti.import<DocsConfig>(configPath, { default: true });
}
