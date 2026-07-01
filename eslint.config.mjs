import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: [
            "**/dist",
            "**/node_modules",
            "**/coverage",
            "**/.astro",
            "framework/internal",
            "commitlint.config.cjs",
            "framework/release.config.cjs",
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig
);
