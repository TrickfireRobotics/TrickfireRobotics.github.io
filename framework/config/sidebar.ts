import type { SidebarConfig, SidebarItem, SidebarGroup } from "./schema.js";

type DocItem = { type: "doc"; id: string; label: string };
type LinkItem = { type: "link"; href: string; label: string };
type CategoryItem = {
    type: "category";
    label: string;
    collapsed: boolean;
    items: DocusaurusSidebarItem[];
};
type DocusaurusSidebarItem = DocItem | LinkItem | CategoryItem;

function isGroup(item: SidebarItem): item is SidebarGroup {
    return "items" in item;
}

function convertItem(item: SidebarItem): DocusaurusSidebarItem {
    if (isGroup(item)) {
        return {
            type: "category",
            label: item.label,
            collapsed: item.collapsed ?? false,
            items: item.items.map(convertItem),
        };
    }
    if (item.link) {
        return { type: "link", href: item.link, label: item.label };
    }
    return { type: "doc", id: item.slug ?? item.label, label: item.label };
}

export function convertSidebar(sidebar: SidebarConfig): DocusaurusSidebarItem[] {
    return sidebar.map(convertItem);
}

export function getFirstDocSlug(items: SidebarConfig): string | null {
    for (const item of items) {
        if ("items" in item) {
            const first = getFirstDocSlug(item.items);
            if (first !== null) return first;
        } else if (!item.link) {
            return item.slug ?? item.label;
        }
    }
    return null;
}
