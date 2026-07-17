import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: [
            "**/dist",
            "**/dist-cli",
            "**/node_modules",
            "**/coverage",
            "**/.astro",
            "**/.next-cache",
            "**/.next",
            "**/.source",
            "internal",
            "commitlint.config.cjs",
            "release.config.cjs",
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig
);
