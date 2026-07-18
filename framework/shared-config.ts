export const SHARED_COLOR_MODE = {
    defaultMode: "dark" as const,
    disableSwitch: true,
    respectPrefersColorScheme: false,
};

export const NAVBAR_ICON_ITEMS = [
    {
        href: "https://trickfirerobotics.com",
        position: "right" as const,
        className: "navbar-icon-link navbar-website-link",
        "aria-label": "Website",
    },
    {
        href: "https://github.com/TrickfireRobotics",
        position: "right" as const,
        className: "navbar-icon-link navbar-github-link",
        "aria-label": "GitHub",
    },
    {
        href: "https://www.notion.so/trickfire/invite/7f153eec8ed8ebe4608dc95892fce859540f8640",
        position: "right" as const,
        className: "navbar-icon-link navbar-notion-link",
        "aria-label": "Notion",
    },
] as const;
