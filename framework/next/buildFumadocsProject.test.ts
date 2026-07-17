import { describe, expect, it } from "vitest";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { writeMetaFiles } from "./buildFumadocsProject.js";
import type { SidebarConfig } from "../config/schema.js";

async function makeCacheRoot(): Promise<string> {
    return fs.mkdtemp(path.join(os.tmpdir(), "trickfire-docs-meta-test-"));
}

async function readMeta(cacheRoot: string, dir: string): Promise<unknown> {
    const raw = await fs.readFile(
        path.join(cacheRoot, "content", "docs", dir, "meta.json"),
        "utf-8"
    );
    return JSON.parse(raw);
}

describe("writeMetaFiles", () => {
    it("writes a root meta.json ordering top-level pages and folders", async () => {
        const cacheRoot = await makeCacheRoot();
        const sidebar: SidebarConfig = [
            { label: "Getting Started", slug: "getting-started" },
            {
                label: "Guides",
                icon: "BookOpen",
                items: [{ label: "Writing Content", slug: "guides/writing-content" }],
            },
        ];
        await writeMetaFiles(cacheRoot, sidebar);
        expect(await readMeta(cacheRoot, "")).toEqual({ pages: ["getting-started", "guides"] });
    });

    it("writes a group's meta.json with title/icon and its own pages order", async () => {
        const cacheRoot = await makeCacheRoot();
        const sidebar: SidebarConfig = [
            {
                label: "Guides",
                icon: "BookOpen",
                items: [
                    { label: "Writing Content", slug: "guides/writing-content" },
                    { label: "Organizing the Sidebar", slug: "guides/organizing-sidebar" },
                ],
            },
        ];
        await writeMetaFiles(cacheRoot, sidebar);
        expect(await readMeta(cacheRoot, "guides")).toEqual({
            title: "Guides",
            icon: "BookOpen",
            defaultOpen: undefined,
            pages: ["writing-content", "organizing-sidebar"],
        });
    });

    it("maps `collapsed: true` to `defaultOpen: false`", async () => {
        const cacheRoot = await makeCacheRoot();
        const sidebar: SidebarConfig = [
            {
                label: "Guides",
                collapsed: true,
                items: [{ label: "Writing Content", slug: "guides/writing-content" }],
            },
        ];
        await writeMetaFiles(cacheRoot, sidebar);
        const meta = (await readMeta(cacheRoot, "guides")) as { defaultOpen?: boolean };
        expect(meta.defaultOpen).toBe(false);
    });

    it("writes nested subgroups one folder level deeper each time", async () => {
        const cacheRoot = await makeCacheRoot();
        const sidebar: SidebarConfig = [
            {
                label: "Guides",
                items: [
                    {
                        label: "Advanced",
                        items: [{ label: "Deep Page", slug: "guides/advanced/deep-page" }],
                    },
                ],
            },
        ];
        await writeMetaFiles(cacheRoot, sidebar);
        expect(await readMeta(cacheRoot, "guides")).toMatchObject({ pages: ["advanced"] });
        expect(await readMeta(cacheRoot, "guides/advanced")).toMatchObject({
            title: "Advanced",
            pages: ["deep-page"],
        });
    });

    it("encodes an external `link` item using Fumadocs' link syntax", async () => {
        const cacheRoot = await makeCacheRoot();
        const sidebar: SidebarConfig = [
            { label: "Getting Started", slug: "getting-started" },
            { label: "Changelog", link: "https://github.com/example/repo/releases" },
        ];
        await writeMetaFiles(cacheRoot, sidebar);
        expect(await readMeta(cacheRoot, "")).toEqual({
            pages: ["getting-started", "[Changelog](https://github.com/example/repo/releases)"],
        });
    });

    it("throws when a leaf page doesn't live in the folder implied by its sidebar position", async () => {
        const cacheRoot = await makeCacheRoot();
        const sidebar: SidebarConfig = [
            {
                label: "Guides",
                items: [
                    { label: "A", slug: "guides/a" },
                    { label: "B", slug: "other-folder/b" },
                ],
            },
        ];
        await expect(writeMetaFiles(cacheRoot, sidebar)).rejects.toThrow(/isn't directly inside/);
    });

    it("throws when a nested group's pages don't live one folder level deeper than its parent", async () => {
        const cacheRoot = await makeCacheRoot();
        const sidebar: SidebarConfig = [
            {
                label: "Guides",
                items: [
                    { label: "A", slug: "guides/a" },
                    // "Sub"'s own page sits in `guides/` itself, not a dedicated subfolder.
                    { label: "Sub", items: [{ label: "B", slug: "guides/b" }] },
                ],
            },
        ];
        await expect(writeMetaFiles(cacheRoot, sidebar)).rejects.toThrow(/doesn't map/);
    });

    it("throws when a group has no real pages to infer a folder from", async () => {
        const cacheRoot = await makeCacheRoot();
        const sidebar: SidebarConfig = [
            {
                label: "Empty",
                items: [{ label: "External Only", link: "https://example.com" }],
            },
        ];
        await expect(writeMetaFiles(cacheRoot, sidebar)).rejects.toThrow(/no leaf pages/);
    });
});
