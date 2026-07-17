import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { getPackageRoot } from "./cachePaths.js";

/**
 * Next has no clean embeddable JS API the way Astro's `dev()`/`build()` were (this framework
 * used to call those directly) - spawning its CLI entry as a child process is the standard way
 * to wrap it. Resolved via `require.resolve` (not a `node_modules/.bin/next` shim path) so this
 * works the same on every platform, using the same Node module resolution `cachePaths.ts`
 * already relies on to find trickfire-docs' own install root.
 */
function resolveNextBin(): string {
    const require = createRequire(import.meta.url);
    return require.resolve("next/dist/bin/next", { paths: [getPackageRoot()] });
}

/**
 * Runs `next <args>`, streaming its output straight through, and resolves/rejects with its exit
 * code. `cwd` matters beyond just where `next` itself resolves its project from - plugins like
 * fumadocs-mdx's `createMDX()` resolve their own config file (source.config.ts) relative to
 * `process.cwd()`, not the directory argument passed to `next`, so the child's cwd must be the
 * cache root too or it can't find it.
 */
export function runNext(args: string[], cwd: string): Promise<void> {
    const nextBin = resolveNextBin();
    return new Promise((resolve, reject) => {
        const child = spawn(process.execPath, [nextBin, ...args], { stdio: "inherit", cwd });
        child.on("error", reject);
        child.on("exit", (code) => {
            if (code === 0) resolve();
            else reject(new Error(`next ${args.join(" ")} exited with code ${code}`));
        });
    });
}
