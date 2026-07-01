import { defineConfig } from "trickfire-docs";

export default defineConfig({
    name: "My Project",
    description: "One-line description of what this project does.",
    landing: [
        {
            title: "Getting Started",
            description: "Preview the site locally and build it for production.",
            link: "/getting-started/",
        },
        {
            title: "Writing Content",
            description: "Frontmatter, Markdown features, and page conventions.",
            link: "/guides/writing-content/",
        },
        {
            title: "Organizing the Sidebar",
            description: "How pages map to the sidebar via docs.config.ts.",
            link: "/guides/organizing-sidebar/",
        },
        {
            title: "Configuration Reference",
            description: "All docs.config.ts fields.",
            link: "/reference/configuration/",
        },
    ],
    sidebar: [
        { label: "Getting Started", slug: "getting-started" },
        {
            label: "Guides",
            items: [
                { label: "Writing Content", slug: "guides/writing-content" },
                { label: "Organizing the Sidebar", slug: "guides/organizing-sidebar" },
            ],
        },
        {
            label: "Reference",
            items: [
                { label: "Configuration", slug: "reference/configuration" },
                { label: "FAQ", slug: "reference/faq" },
            ],
        },
    ],
});
