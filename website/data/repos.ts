import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export interface RepoCard {
    name: string;
    description: string;
    href: string;
}

export const GENERATED_REPOS_PATH = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "repos.generated.json"
);

/**
 * Reads the repo list written by fetchRepos.ts's prebuild step (wired into `website:dev`/
 * `website:build` in package.json). Returns an empty list if that step hasn't run yet - e.g.
 * `pnpm typecheck` in CI only needs this module to resolve, not real data.
 */
export function getRepos(): RepoCard[] {
    if (!fs.existsSync(GENERATED_REPOS_PATH)) return [];
    return JSON.parse(fs.readFileSync(GENERATED_REPOS_PATH, "utf-8")) as RepoCard[];
}
