import fs from "node:fs/promises";
import { GENERATED_REPOS_PATH, type RepoCard } from "./repos.js";

const GITHUB_ORG = "TrickfireRobotics";
const PORTAL_DOMAIN = "https://docs.trickfirerobotics.com";

interface DocsManifest {
    name: string;
    description: string;
    base: string;
}

// Used when there's no network to reach the GitHub API at all (e.g. local offline dev), so
// `pnpm website:dev` still has something to render.
const FALLBACK_REPOS: RepoCard[] = [
    {
        name: "Gazebo Simulations",
        description:
            "Setup guides, simulation tutorials, and deep dives for the TrickFire ROS2/Gazebo simulation environment.",
        href: "/gazebo-simulations/",
    },
    {
        name: "URC Codebase",
        description: "Documentation for the TrickFire Robotics URC competition codebase.",
        href: "/trickfire-urc/",
    },
    {
        name: "AK Series Motor Library",
        description: "Documentation for the AK Series motor library.",
        href: "/ak-series-lib/",
    },
];

async function fetchOrgRepoNames(): Promise<string[]> {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const names: string[] = [];
    for (let page = 1; ; page++) {
        const res = await fetch(
            `https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=100&page=${page}`,
            { headers }
        );
        if (!res.ok) {
            throw new Error(
                `GitHub API returned ${res.status} ${res.statusText} listing org repos`
            );
        }
        const batch = (await res.json()) as { name: string }[];
        names.push(...batch.map((repo) => repo.name));
        if (batch.length < 100) break;
    }
    return names;
}

/**
 * `undefined` if this repo has no trickfire-docs site published, or the request otherwise
 * fails - both are the expected, common case for most org repos, so failures here are
 * swallowed per-repo rather than failing the whole build.
 */
async function fetchManifest(repoName: string): Promise<RepoCard | undefined> {
    try {
        const res = await fetch(`${PORTAL_DOMAIN}/${repoName}/docs-manifest.json`);
        if (!res.ok) return undefined;
        const manifest = (await res.json()) as DocsManifest;
        return {
            name: manifest.name,
            description: manifest.description,
            href: `${manifest.base}/`,
        };
    } catch {
        return undefined;
    }
}

async function writeRepos(repos: RepoCard[]): Promise<void> {
    await fs.writeFile(GENERATED_REPOS_PATH, JSON.stringify(repos, null, 4) + "\n");
}

async function main(): Promise<void> {
    let repoNames: string[];
    try {
        repoNames = await fetchOrgRepoNames();
    } catch (error) {
        // A real GitHub API error (bad response, rate limit, auth) is a signal worth failing
        // the build over. A network failure (no internet at all) instead falls back to a
        // small static list so `pnpm website:dev` stays usable offline.
        if (error instanceof TypeError) {
            console.warn(
                `[fetchRepos] No network access - using fallback repo list (${error.message})`
            );
            await writeRepos(FALLBACK_REPOS);
            return;
        }
        throw error;
    }

    const manifests = await Promise.all(repoNames.map(fetchManifest));
    const repos = manifests.filter((repo): repo is RepoCard => repo !== undefined);
    await writeRepos(repos);
    console.log(
        `[fetchRepos] ${repos.length} repo(s) with published docs out of ${repoNames.length} org repo(s).`
    );
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
});
