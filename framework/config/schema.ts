export interface SidebarLinkItem {
    label: string;
    slug?: string;
    link?: string;
}

export interface SidebarGroup {
    label: string;
    items: SidebarItem[];
    collapsed?: boolean;
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

export interface AdvancedConfig {
    docusaurus?: Record<string, unknown>;
}

export interface DocsConfig {
    name: string;
    description: string;
    sidebar?: SidebarConfig;
    landing?: LandingItem[];
    social?: SocialLinks;
    advanced?: AdvancedConfig;
}
