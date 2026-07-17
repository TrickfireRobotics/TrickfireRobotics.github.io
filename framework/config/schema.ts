// These mirror Fumadocs' sidebar/meta.json shapes locally rather than importing them, since
// this file is loaded under plain `tsc`/`jiti` in the consumer's project, not inside a real
// Next.js build. framework/next/buildFumadocsProject.ts turns this into real meta.json files
// that Fumadocs itself then validates at build time.

export interface SidebarLinkItem {
    label: string;
    slug?: string;
    link?: string;
}

export interface SidebarGroup {
    label: string;
    items: SidebarItem[];
    /** Collapsed (closed) by default - Fumadocs' folders are expanded by default otherwise. */
    collapsed?: boolean;
    /**
     * Name of a lucide-react icon to show next to the group label (e.g. "BookOpen",
     * "Rocket", "Settings") - PascalCase, matching the component's export name. Browse the
     * full icon set at https://lucide.dev/icons.
     */
    icon?: string;
}

export type SidebarItem = SidebarLinkItem | SidebarGroup;
export type SidebarConfig = SidebarItem[];

export interface SocialLink {
    icon: string;
    label: string;
    href: string;
}

export type SocialLinks = SocialLink[];

export interface AdvancedConfig {
    /**
     * Extra Next.js config options, deep-merged over the framework's generated
     * next.config.js. Values must be JSON-serializable - they're written into a generated
     * config file, so functions/imports (e.g. a custom webpack plugin instance) won't
     * survive the round-trip.
     */
    next?: Record<string, unknown>;
}

export interface DocsConfig {
    /** Site name, shown in the nav and browser tab. */
    name: string;
    /** One-line summary, used as the hero tagline and meta description. */
    description: string;
    /** Sidebar nav structure - groups map to `docs/` folders, each with its own `meta.json`. */
    sidebar: SidebarConfig;
    /**
     * Extra nav icons, appended after the fixed GitHub (derived from package.json's
     * "name"), Notion, and TrickFire Robotics links that are always present.
     */
    social?: SocialLinks;
    /** Escape hatch for Next.js options this config doesn't otherwise expose. */
    advanced?: AdvancedConfig;
}

export function defineConfig(config: DocsConfig): DocsConfig {
    return config;
}
