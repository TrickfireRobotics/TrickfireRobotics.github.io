import fs from "node:fs/promises";
import path from "node:path";
import type { DocsConfig, SidebarConfig, SocialLinks } from "./schema.js";

const SITE_DOMAIN = "https://docs.trickfirerobotics.com";
const GITHUB_ORG = "TrickfireRobotics";

// Always present in the nav, identical across every TrickFire docs site.
const FIXED_SOCIAL: SocialLinks = [
    {
        icon: "external",
        label: "Notion",
        href: "https://www.notion.so/trickfire/invite/7f153eec8ed8ebe4608dc95892fce859540f8640",
    },
    { icon: "external", label: "TrickFire Robotics", href: SITE_DOMAIN },
];

export interface ResolvedDocsConfig extends DocsConfig {
    site: string;
    base: string;
    social: SocialLinks;
    /** Slug of the first leaf page in the sidebar - the base path redirects here so visitors land in content, not a splash page. */
    firstPageSlug: string;
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

/** Depth-first walk of the sidebar for the first leaf link's `slug` (or `link`, with slashes trimmed). */
function findFirstPageSlug(sidebar: SidebarConfig): string | undefined {
    for (const item of sidebar) {
        if ("items" in item) {
            const nested = findFirstPageSlug(item.items);
            if (nested !== undefined) return nested;
        } else if (item.slug !== undefined) {
            return item.slug.replace(/^\/+|\/+$/g, "");
        } else if (item.link !== undefined) {
            return item.link.replace(/^\/+|\/+$/g, "");
        }
    }
    return undefined;
}

export async function resolveDocsConfig(
    projectRoot: string,
    config: DocsConfig
): Promise<ResolvedDocsConfig> {
    const repoName = await readProjectName(projectRoot);
    const githubSocial: SocialLinks[number] = {
        icon: "github",
        label: "GitHub",
        href: `https://github.com/${GITHUB_ORG}/${repoName}`,
    };

    const firstPageSlug = findFirstPageSlug(config.sidebar);
    if (firstPageSlug === undefined) {
        throw new Error(
            "docs.config.ts's sidebar is empty - add at least one link so there's a page to redirect to."
        );
    }

    return {
        ...config,
        site: SITE_DOMAIN,
        base: `/${repoName}`,
        social: [githubSocial, ...FIXED_SOCIAL, ...(config.social ?? [])],
        firstPageSlug,
    };
}
