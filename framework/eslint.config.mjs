import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: [
            "dist",
            "node_modules",
            "commitlint.config.cjs",
            "release.config.cjs",
            "internal",
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    prettierConfig
);
