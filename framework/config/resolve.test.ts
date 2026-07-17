import { describe, expect, it } from "vitest";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { resolveDocsConfig } from "./resolve.js";
import type { DocsConfig } from "./schema.js";

const baseConfig: DocsConfig = {
    name: "Test Project",
    description: "A test project.",
    sidebar: [{ label: "Getting Started", slug: "getting-started" }],
};

async function makeProject(name: string): Promise<string> {
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), "trickfire-docs-test-"));
    await fs.writeFile(path.join(dir, "package.json"), JSON.stringify({ name }));
    return dir;
}

describe("resolveDocsConfig", () => {
    it("derives site and base from package.json's name", async () => {
        const dir = await makeProject("gazebo-simulations");
        const resolved = await resolveDocsConfig(dir, baseConfig);
        expect(resolved.site).toBe("https://docs.trickfirerobotics.com");
        expect(resolved.base).toBe("/gazebo-simulations");
    });

    it("always includes GitHub, Notion, and TrickFire Robotics in the nav", async () => {
        const dir = await makeProject("gazebo-simulations");
        const resolved = await resolveDocsConfig(dir, baseConfig);
        expect(resolved.social).toEqual([
            {
                icon: "github",
                label: "GitHub",
                href: "https://github.com/TrickfireRobotics/gazebo-simulations",
            },
            {
                icon: "external",
                label: "Notion",
                href: "https://www.notion.so/trickfire/invite/7f153eec8ed8ebe4608dc95892fce859540f8640",
            },
            {
                icon: "external",
                label: "TrickFire Robotics",
                href: "https://docs.trickfirerobotics.com",
            },
        ]);
    });

    it("appends user-provided social links after the fixed defaults", async () => {
        const dir = await makeProject("gazebo-simulations");
        const social = [{ icon: "discord", label: "Discord", href: "https://discord.gg/example" }];
        const resolved = await resolveDocsConfig(dir, { ...baseConfig, social });
        expect(resolved.social).toHaveLength(4);
        expect(resolved.social.at(-1)).toEqual(social[0]);
    });

    it("throws if package.json has no name field", async () => {
        const dir = await fs.mkdtemp(path.join(os.tmpdir(), "trickfire-docs-test-"));
        await fs.writeFile(path.join(dir, "package.json"), JSON.stringify({}));
        await expect(resolveDocsConfig(dir, baseConfig)).rejects.toThrow(/missing a "name" field/);
    });

    it("resolves firstPageSlug from a top-level link item", async () => {
        const dir = await makeProject("gazebo-simulations");
        const resolved = await resolveDocsConfig(dir, baseConfig);
        expect(resolved.firstPageSlug).toBe("getting-started");
    });

    it("resolves firstPageSlug depth-first through nested groups", async () => {
        const dir = await makeProject("gazebo-simulations");
        const sidebar: DocsConfig["sidebar"] = [
            {
                label: "Guides",
                items: [
                    {
                        label: "Nested",
                        items: [{ label: "Deep Page", slug: "guides/nested/deep-page" }],
                    },
                ],
            },
            { label: "Getting Started", slug: "getting-started" },
        ];
        const resolved = await resolveDocsConfig(dir, { ...baseConfig, sidebar });
        expect(resolved.firstPageSlug).toBe("guides/nested/deep-page");
    });

    it("falls back to a link item's href, with slashes trimmed", async () => {
        const dir = await makeProject("gazebo-simulations");
        const sidebar: DocsConfig["sidebar"] = [
            { label: "External-ish", link: "/getting-started/" },
        ];
        const resolved = await resolveDocsConfig(dir, { ...baseConfig, sidebar });
        expect(resolved.firstPageSlug).toBe("getting-started");
    });

    it("throws a clear error when the sidebar is empty", async () => {
        const dir = await makeProject("gazebo-simulations");
        await expect(resolveDocsConfig(dir, { ...baseConfig, sidebar: [] })).rejects.toThrow(
            /sidebar is empty/
        );
    });
});
