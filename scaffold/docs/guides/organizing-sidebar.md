---
title: Organizing the Sidebar
description: How pages map to the sidebar via docs.config.ts.
---

The sidebar's order, grouping, and per-group icons come from `docs.config.ts`, not the raw `docs/` folder listing:

```ts title="docs.config.ts"
sidebar: [
  {
    label: "Guides",
    icon: "BookOpen",
    items: [
      { label: "Writing Content", slug: "guides/writing-content" },
      { label: "Organizing the Sidebar", slug: "guides/organizing-sidebar" },
    ],
  },
],
```

Each `slug` is the page's path under `docs/`, without the file extension. Every page inside a group must physically live in the folder that group's items point at - `Guides` above requires both pages to live under `docs/guides/`, since the group's own folder is inferred from where its pages are. Nested groups work the same way, one folder deeper each level.

A page's sidebar label comes from `docs.config.ts` here, not the page's own frontmatter `title` - the two can differ if you want a shorter sidebar label than the page's full title.

A page that exists under `docs/` but isn't listed in `sidebar` is still built and reachable by direct link - it just won't appear in the nav.
