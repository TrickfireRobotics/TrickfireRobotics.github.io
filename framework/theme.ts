import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
export const THEME_CSS = readFileSync(path.resolve(dir, "../src/css/custom.css"), "utf-8");
