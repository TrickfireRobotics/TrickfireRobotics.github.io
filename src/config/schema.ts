// Starlight ships its config types as raw TypeScript that references Astro's
// virtual modules (astro:content, virtual:starlight/*) - those only resolve
// inside a real Astro/Vite project, not under plain `tsc`. So these mirror
// Starlight's documented sidebar/social shapes locally instead of importing
// them; Starlight's own schema still validates the generated astro.config.mjs
// at build time regardless.

export interface SidebarLinkItem {
    label: string;
    slug?: string;
    link?: string;
    badge?: string;
}

export interface SidebarGroup {
    label: string;
    items: SidebarItem[];
    collapsed?: boolean;
    badge?: string;
}

export type SidebarItem = SidebarLinkItem | SidebarGroup;
export type SidebarConfig = SidebarItem[];

export interface SocialLink {
    icon: string;
    label: string;
    href: string;
}

export type SocialLinks = SocialLink[];

export interface LandingItem {
    title: string;
    description: string;
    link: string;
}

export interface DocsConfig {
    /** Site name, shown in the nav and browser tab. */
    name: string;
    /** One-line summary, used as the hero tagline and meta description. */
    description: string;
    /** Cards shown on the auto-generated landing page. */
    landing: LandingItem[];
    /** Sidebar nav structure - same shape as Starlight's `sidebar` config. */
    sidebar: SidebarConfig;
    /**
     * Extra nav icons, appended after the fixed GitHub (derived from package.json's
     * "name"), Notion, and TrickFire Robotics links that are always present.
     */
    social?: SocialLinks;
}

export function defineConfig(config: DocsConfig): DocsConfig {
    return config;
}
