/** @type {import("prettier").Config} */
const config = {
    plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
    overrides: [
        {
            files: "*.astro",
            options: {
                parser: "astro",
            },
        },
    ],
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "es5",
    printWidth: 100,
    endOfLine: "lf",
};

export default config;
