---
title: Configuration Reference
sidebar_position: 6
---

# Configuration Reference

`docs.config.ts` lives in the root of your member repo and is the only configuration file you need.

## Full example

```typescript
import { defineConfig } from "trickfire-docs";

export default defineConfig({
    name: "TrickFire CAN",
    description: "CAN bus driver and protocol library for TrickFire robots.",
    sidebar: [
        { label: "Getting Started", slug: "getting-started" },
        {
            label: "Reference",
            items: [
                { label: "API", slug: "reference/api" },
                { label: "FAQ", slug: "reference/faq" },
            ],
        },
    ],
    social: [
        {
            icon: "github",
            label: "GitHub",
            href: "https://github.com/TrickfireRobotics/trickfire-can",
        },
        { icon: "notion", label: "Notion", href: "https://notion.so/trickfire/..." },
    ],
});
```

## Fields

### `name` (required)

```typescript
name: string;
```

Display name for your project. Shown in the navbar Projects dropdown and in the site's landing page cards.

---

### `description` (required)

```typescript
description: string;
```

One-line description of the project. Shown on the docs homepage card for your project.

---

### `sidebar` (optional)

```typescript
sidebar?: SidebarItem[]
```

Explicit sidebar definition. When omitted, Docusaurus autogenerates the sidebar from your `docs/` file structure.

See [Sidebar Configuration](./sidebar-config) for full documentation.

**Types:**

```typescript
type SidebarItem = SidebarLinkItem | SidebarGroup;

interface SidebarLinkItem {
    label: string;
    slug?: string; // doc path (relative to docs/, no .md extension)
    link?: string; // external URL
}

interface SidebarGroup {
    label: string;
    items: SidebarItem[];
    collapsed?: boolean; // default: true
}
```

---

### `social` (optional)

```typescript
social?: SocialLink[]
```

Social/external links shown in your project's header or footer area.

```typescript
interface SocialLink {
    icon: string; // icon identifier (e.g. "github", "notion")
    label: string; // accessible label
    href: string; // URL
}
```

---

### `landing` (optional)

```typescript
landing?: LandingItem[]
```

Custom cards shown on your project's docs landing page.

```typescript
interface LandingItem {
    title: string;
    description: string;
    link: string;
}
```

---

### `advanced` (optional)

```typescript
advanced?: {
    docusaurus?: Record<string, unknown>;
}
```

Pass-through options merged into the Docusaurus plugin config for this project. Use this to enable Docusaurus features not exposed by `docs.config.ts`.

```typescript
advanced: {
    docusaurus: {
        showLastUpdateTime: true,
        editUrl: "https://github.com/TrickfireRobotics/my-repo/edit/main/",
    },
}
```

---

## TypeScript types

All types are exported from the `trickfire-docs` package:

```typescript
import type {
    DocsConfig,
    SidebarConfig,
    SidebarItem,
    SidebarLinkItem,
    SidebarGroup,
    SocialLinks,
    SocialLink,
    LandingItem,
    AdvancedConfig,
} from "trickfire-docs";
```
