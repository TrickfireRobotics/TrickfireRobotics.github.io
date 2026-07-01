import { runBuild } from "./commands/build.js";
import { runDev } from "./commands/dev.js";
import { runInit } from "./commands/init.js";

const [, , command] = process.argv;
const projectRoot = process.cwd();

async function main(): Promise<void> {
    switch (command) {
        case "dev":
            await runDev(projectRoot);
            break;
        case "build":
            await runBuild(projectRoot);
            break;
        case "init":
            await runInit(projectRoot);
            break;
        default:
            console.error("Usage: trickfire-docs <dev|build|init>");
            process.exit(1);
    }
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
});
