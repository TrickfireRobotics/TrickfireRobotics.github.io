import fs from "node:fs/promises";
import path from "node:path";
import type { ResolvedDocsConfig } from "../config/resolve.js";
import type { SidebarConfig, SidebarItem } from "../config/schema.js";
import { getInternalDir, linkDependencies } from "./cachePaths.js";

interface MetaFile {
    title?: string;
    icon?: string;
    defaultOpen?: boolean;
    pages: string[];
}

/**
 * Fumadocs ties folder title/icon/order to the physical `content/docs/` folder structure
 * (one meta.json per folder), unlike Starlight's sidebar, which was a purely virtual tree
 * independent of the docs/ file layout. A SidebarGroup's own folder is inferred from its first
 * usable child: a direct leaf's slug gives the folder outright; a nested subgroup's folder is
 * one level deeper than its enclosing group, so the enclosing group's folder is the *parent* of
 * whatever folder the subgroup resolves to (recursively, all the way down to a real leaf).
 * Every other item in the group is validated against that folder afterwards in planSidebar -
 * if there's no single physical folder meta.json could describe, this fails loudly instead of
 * guessing.
 */
function groupFolder(items: SidebarItem[]): string {
    for (const item of items) {
        if ("items" in item) {
            const subFolder = groupFolder(item.items);
            const parent = path.posix.dirname(subFolder);
            return parent === "." ? "" : parent;
        } else if (item.slug !== undefined) {
            const slug = item.slug.replace(/^\/+|\/+$/g, "");
            const dir = path.posix.dirname(slug);
            return dir === "." ? "" : dir;
        }
    }
    throw new Error(
        "A sidebar group has no leaf pages (only external `link` entries or nothing at all) - " +
            "Fumadocs needs at least one real page per group to know which docs/ folder it maps to."
    );
}

/** Recursively builds each folder's meta.json (keyed by its path relative to content/docs/, "" = root) and returns the `pages` ordering entries for the current directory. */
function planSidebar(items: SidebarItem[], dir: string, metas: Map<string, MetaFile>): string[] {
    return items.map((item) => {
        if (!("items" in item)) {
            if (item.slug === undefined) {
                if (item.link === undefined) {
                    throw new Error(`Sidebar item "${item.label}" has neither a slug nor a link.`);
                }
                return `[${item.label}](${item.link})`;
            }
            const slug = item.slug.replace(/^\/+|\/+$/g, "");
            const parent = path.posix.dirname(slug);
            const normalizedParent = parent === "." ? "" : parent;
            if (normalizedParent !== dir) {
                throw new Error(
                    `Sidebar item "${item.label}" (slug "${slug}") isn't directly inside the ` +
                        `"${dir || "docs/"}" folder implied by its position in the sidebar. Fumadocs ` +
                        "requires each sidebar level to match a real docs/ folder - move the file or " +
                        "adjust the sidebar."
                );
            }
            return path.posix.basename(slug);
        }

        const normalizedGroupDir = groupFolder(item.items);
        const expectedParent = path.posix.dirname(normalizedGroupDir || ".");
        const normalizedExpectedParent = expectedParent === "." ? "" : expectedParent;
        if (normalizedGroupDir === dir || normalizedExpectedParent !== dir) {
            throw new Error(
                `Sidebar group "${item.label}" doesn't map to a single docs/ subfolder one level ` +
                    `under "${dir || "docs/"}" - every page in it (and any nested groups) must live ` +
                    `directly inside one shared folder, e.g. docs/${item.label.toLowerCase()}/.`
            );
        }

        const nestedPages = planSidebar(item.items, normalizedGroupDir, metas);
        metas.set(normalizedGroupDir, {
            title: item.label,
            icon: item.icon,
            defaultOpen: item.collapsed === true ? false : undefined,
            pages: nestedPages,
        });
        return path.posix.basename(normalizedGroupDir);
    });
}

/** Writes one meta.json per docs/ folder implied by `sidebar`, into the already-synced content/docs/ tree. Must run after syncContent - it writes inside content/docs/, which syncContent wipes and repopulates from the consumer's real docs/ folder on every run. */
export async function writeMetaFiles(cacheRoot: string, sidebar: SidebarConfig): Promise<void> {
    const metas = new Map<string, MetaFile>();
    const rootPages = planSidebar(sidebar, "", metas);
    metas.set("", { pages: rootPages });

    const contentDocsDir = path.join(cacheRoot, "content", "docs");
    await Promise.all(
        [...metas.entries()].map(async ([dir, meta]) => {
            const dirPath = path.join(contentDocsDir, dir);
            await fs.mkdir(dirPath, { recursive: true });
            await fs.writeFile(path.join(dirPath, "meta.json"), JSON.stringify(meta, null, 4));
        })
    );
}

async function copyInternalAssets(cacheRoot: string): Promise<void> {
    const internalDir = getInternalDir();
    await Promise.all(
        [
            "app",
            "lib",
            "components",
            "styles",
            "public",
            "mdx-components.tsx",
            "source.config.ts",
            "postcss.config.mjs",
            "tsconfig.json",
            "next-env.d.ts",
        ].map((entry) =>
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

function generateNextConfigSource(config: ResolvedDocsConfig, isDev: boolean): string {
    const nextConfig = deepMerge(
        {
            output: "export",
            trailingSlash: true,
            images: { unoptimized: true },
            basePath: config.base,
            // Pointing this at the production domain in dev would make the dev server try to
            // load its own JS/CSS from the live prod site instead of localhost - only set it
            // for real builds, where `dist/` gets deployed to that domain.
            ...(isDev ? {} : { assetPrefix: `${config.site}${config.base}/` }),
            typescript: { ignoreBuildErrors: false },
        },
        config.advanced?.next ?? {}
    );

    return `import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = ${JSON.stringify(nextConfig, null, 4)};

export default withMDX(config);
`;
}

/** JSON-serializable subset of the resolved config the generated Next app needs at runtime (nav title, breadcrumb hrefs, social links, redirect target) - baked in as a plain data module instead of Vite/webpack-config JSON since it's consumed by real React components, not a framework config file. */
function generateSiteConfigSource(config: ResolvedDocsConfig): string {
    const siteConfig = {
        name: config.name,
        description: config.description,
        site: config.site,
        base: config.base,
        social: config.social,
        firstPageHref: `/${config.firstPageSlug}`,
    };
    return `// Generated by trickfire-docs - do not edit, this file is overwritten on every dev/build.
export const siteConfig = ${JSON.stringify(siteConfig, null, 4)} as const;
`;
}

/** Writes the bundled framework internals + generated next.config.js/site-config into the cache root. Content and meta.json come later, via syncContent + writeMetaFiles. */
export async function writeFumadocsProject(
    cacheRoot: string,
    config: ResolvedDocsConfig,
    options: { isDev: boolean }
): Promise<void> {
    await fs.mkdir(cacheRoot, { recursive: true });
    await copyInternalAssets(cacheRoot);
    await linkDependencies(cacheRoot);
    await fs.mkdir(path.join(cacheRoot, "lib"), { recursive: true });
    await fs.writeFile(
        path.join(cacheRoot, "lib", "site-config.generated.ts"),
        generateSiteConfigSource(config)
    );
    await fs.writeFile(
        path.join(cacheRoot, "next.config.mjs"),
        generateNextConfigSource(config, options.isDev)
    );
}
