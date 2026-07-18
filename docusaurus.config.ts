import { readdirSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Config } from "@docusaurus/types";
import type { Options as PresetOptions } from "@docusaurus/preset-classic";
import type { Options as DocsOptions } from "@docusaurus/plugin-content-docs";

const SITE_URL = "https://docs.trickfirerobotics.com";
const CONTENT_DIR = path.join(process.cwd(), "content");

interface RepoMeta {
    id: string;
    name: string;
    description: string;
}

function getRepoDirs(): string[] {
    if (!existsSync(CONTENT_DIR)) return [];
    return readdirSync(CONTENT_DIR, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name)
        .sort();
}

export default async function createConfig(): Promise<Config> {
    const repos = getRepoDirs();

    const repoMeta: RepoMeta[] = repos.map((repo) => {
        try {
            const cfgPath = path.join(CONTENT_DIR, repo, "docs.config.json");
            const cfg = JSON.parse(readFileSync(cfgPath, "utf-8")) as {
                name?: string;
                description?: string;
            };
            return {
                id: repo,
                name: cfg.name ?? repo,
                description: cfg.description ?? "",
            };
        } catch {
            return { id: repo, name: repo, description: "" };
        }
    });

    const frameworkDocsPlugin: NonNullable<Config["plugins"]>[number] = [
        "@docusaurus/plugin-content-docs",
        {
            id: "framework",
            path: "docs",
            routeBasePath: "trickfire-docs",
            sidebarPath: "./docs-sidebars.js",
        } satisfies DocsOptions,
    ];

    const docsPlugins: Config["plugins"] = repoMeta.map(({ id }) => [
        "@docusaurus/plugin-content-docs",
        {
            id,
            path: `content/${id}`,
            routeBasePath: id,
        } satisfies DocsOptions,
    ]);

    const projectDropdownItems = repoMeta.map(({ id, name }) => ({
        label: name,
        to: `/${id}/`,
    }));

    return {
        title: "TrickFire Robotics Docs",
        tagline: "Documentation for TrickFire Robotics projects",
        favicon: "favicon.ico",
        url: SITE_URL,
        baseUrl: "/",
        staticDirectories: ["public"],
        onBrokenLinks: "warn",
        onBrokenMarkdownLinks: "warn",
        customFields: {
            repos: repos,
            repoMeta,
        },
        future: {
            faster: {
                rspackBundler: true,
                rspackPersistentCache: true,
                swcJsLoader: true,
                swcJsMinimizer: true,
                swcHtmlMinimizer: true,
            },
        },
        themeConfig: {
            colorMode: {
                defaultMode: "dark",
                disableSwitch: true,
                respectPrefersColorScheme: false,
            },
            navbar: {
                title: "TrickFire Robotics",
                items: [
                    {
                        to: "/trickfire-docs/",
                        label: "Docs Framework",
                        position: "left" as const,
                    },
                    ...(projectDropdownItems.length > 0
                        ? [
                              {
                                  type: "dropdown",
                                  label: "Projects",
                                  position: "left" as const,
                                  items: projectDropdownItems,
                              },
                          ]
                        : []),
                    {
                        href: "https://github.com/TrickfireRobotics",
                        label: "GitHub",
                        position: "right" as const,
                    },
                    {
                        href: "https://www.notion.so/trickfire/invite/7f153eec8ed8ebe4608dc95892fce859540f8640",
                        label: "Notion",
                        position: "right" as const,
                    },
                ],
            },
            footer: {
                style: "dark",
                copyright: `TrickFire Robotics © ${new Date().getFullYear()}`,
            },
        },
        presets: [
            [
                "classic",
                {
                    docs: false,
                    blog: false,
                    theme: { customCss: ["./src/css/custom.css"] },
                } satisfies PresetOptions,
            ],
        ],
        plugins: [frameworkDocsPlugin, ...docsPlugins],
    };
}
