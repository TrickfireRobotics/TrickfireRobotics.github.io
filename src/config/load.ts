import { createJiti } from "jiti";
import path from "node:path";
import type { DocsConfig } from "./schema.js";

export async function loadDocsConfig(projectRoot: string): Promise<DocsConfig> {
    const configPath = path.join(projectRoot, "docs.config.ts");
    const jiti = createJiti(import.meta.url);
    return jiti.import<DocsConfig>(configPath, { default: true });
}
