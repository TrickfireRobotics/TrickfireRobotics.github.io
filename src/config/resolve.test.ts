import { describe, expect, it } from "vitest";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { resolveDocsConfig } from "./resolve.js";
import type { DocsConfig } from "./schema.js";

const baseConfig: DocsConfig = {
    name: "Test Project",
    description: "A test project.",
    landing: [],
    sidebar: [],
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

    it("defaults social to a GitHub link derived from the repo name", async () => {
        const dir = await makeProject("gazebo-simulations");
        const resolved = await resolveDocsConfig(dir, baseConfig);
        expect(resolved.social).toEqual([
            {
                icon: "github",
                label: "GitHub",
                href: "https://github.com/TrickfireRobotics/gazebo-simulations",
            },
        ]);
    });

    it("respects an explicit social override", async () => {
        const dir = await makeProject("gazebo-simulations");
        const social = [{ icon: "discord", label: "Discord", href: "https://discord.gg/example" }];
        const resolved = await resolveDocsConfig(dir, { ...baseConfig, social });
        expect(resolved.social).toBe(social);
    });

    it("throws if package.json has no name field", async () => {
        const dir = await fs.mkdtemp(path.join(os.tmpdir(), "trickfire-docs-test-"));
        await fs.writeFile(path.join(dir, "package.json"), JSON.stringify({}));
        await expect(resolveDocsConfig(dir, baseConfig)).rejects.toThrow(/missing a "name" field/);
    });
});
