/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
export default {
    docs: [
        "index",
        "architecture",
        "member-guide",
        "writing-content",
        "sidebar-config",
        "configuration",
        {
            type: "category",
            label: "Deployment",
            collapsed: false,
            items: ["deployment/index", "deployment/server-setup", "deployment/cloudflare-tunnel"],
        },
    ],
};
