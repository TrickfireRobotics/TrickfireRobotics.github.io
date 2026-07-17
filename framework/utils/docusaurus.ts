import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";

export async function findDocusaurusBin(): Promise<string> {
    const require = createRequire(import.meta.url);
    const pkgJsonPath = require.resolve("@docusaurus/core/package.json");
    const pkgRoot = path.dirname(pkgJsonPath);
    const raw = await fs.readFile(pkgJsonPath, "utf-8");
    const pkg = JSON.parse(raw) as { bin?: Record<string, string> | string };
    const rel =
        typeof pkg.bin === "string" ? pkg.bin : (pkg.bin?.docusaurus ?? "bin/docusaurus.mjs");
    return path.join(pkgRoot, rel);
}
