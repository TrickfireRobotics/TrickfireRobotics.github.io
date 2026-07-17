import { defineConfig } from "trickfire-docs";

export default defineConfig({
    name: "My Project",
    description: "One-line description of what this project does.",
    sidebar: [
        { label: "Getting Started", slug: "getting-started" },
        {
            label: "Guides",
            icon: "BookOpen",
            items: [
                { label: "Writing Content", slug: "guides/writing-content" },
                { label: "Organizing the Sidebar", slug: "guides/organizing-sidebar" },
            ],
        },
        {
            label: "Reference",
            icon: "Settings",
            items: [
                { label: "Configuration", slug: "reference/configuration" },
                { label: "FAQ", slug: "reference/faq" },
            ],
        },
    ],
});
