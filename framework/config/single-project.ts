import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { SHARED_COLOR_MODE, NAVBAR_ICON_ITEMS } from "../shared-config.js";
import { createAssetsPlugin } from "./assets-plugin.js";

const _require = createRequire(import.meta.url);
const PRESET_CLASSIC_PATH = path.dirname(
    _require.resolve("@docusaurus/preset-classic/package.json")
);
// public/ sits one level above dist-cli/ in the framework package
const FRAMEWORK_PUBLIC_DIR = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "..",
    "public"
);

export interface SingleProjectOptions {
    projectRoot: string;
    sidebarsPath: string | null;
    name: string;
    description: string;
}

export function createSingleProjectConfig(options: SingleProjectOptions): Record<string, unknown> {
    const { projectRoot, sidebarsPath, name, description } = options;

    const docsDir = path.resolve(projectRoot, "docs");
    const trickfireDir = path.resolve(projectRoot, ".trickfire-docs");
    const customCssPath = path.join(trickfireDir, "custom.css");

    return {
        title: name,
        tagline: description,
        url: "http://localhost:3000",
        baseUrl: "/",
        onBrokenLinks: "warn",
        onBrokenMarkdownLinks: "warn",
        staticDirectories: [path.resolve(projectRoot, "public"), FRAMEWORK_PUBLIC_DIR],
        themeConfig: {
            colorMode: SHARED_COLOR_MODE,
            navbar: {
                title: "",
                logo: {
                    alt: "TrickFire Robotics",
                    src: "nav-logo.png",
                    srcDark: "nav-logo.png",
                    width: 80,
                    height: 30,
                },
                items: [...NAVBAR_ICON_ITEMS],
            },
        },
        presets: [
            [
                PRESET_CLASSIC_PATH,
                {
                    docs: {
                        path: docsDir,
                        routeBasePath: "/",
                        exclude: ["assets/**"],
                        ...(sidebarsPath && { sidebarPath: sidebarsPath }),
                    },
                    blog: false,
                    pages: false,
                    theme: { customCss: [customCssPath] },
                },
            ],
        ],
        plugins: [
            createAssetsPlugin([
                {
                    assetsDir: path.resolve(docsDir, "assets"),
                    publicPath: "/assets",
                    outSubPath: "assets",
                },
                {
                    assetsDir: path.resolve(projectRoot, "assets"),
                    publicPath: "/assets",
                    outSubPath: "assets",
                },
            ]),
        ],
    };
}
