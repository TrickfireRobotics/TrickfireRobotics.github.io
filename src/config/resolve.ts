import fs from "node:fs/promises";
import path from "node:path";
import type { DocsConfig, SocialLinks } from "./schema.js";

const SITE_DOMAIN = "https://docs.trickfirerobotics.com";
const GITHUB_ORG = "TrickfireRobotics";

export interface ResolvedDocsConfig extends DocsConfig {
    site: string;
    base: string;
    social: SocialLinks;
}

async function readProjectName(projectRoot: string): Promise<string> {
    const pkgPath = path.join(projectRoot, "package.json");
    const raw = await fs.readFile(pkgPath, "utf-8");
    const pkg = JSON.parse(raw) as { name?: string };
    if (!pkg.name) {
        throw new Error(`package.json at ${pkgPath} is missing a "name" field`);
    }
    return pkg.name;
}

export async function resolveDocsConfig(
    projectRoot: string,
    config: DocsConfig
): Promise<ResolvedDocsConfig> {
    const repoName = await readProjectName(projectRoot);
    const defaultSocial: SocialLinks = [
        { icon: "github", label: "GitHub", href: `https://github.com/${GITHUB_ORG}/${repoName}` },
    ];

    return {
        ...config,
        site: SITE_DOMAIN,
        base: `/${repoName}`,
        social: config.social ?? defaultSocial,
    };
}
