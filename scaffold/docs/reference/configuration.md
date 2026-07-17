---
title: Configuration Reference
description: All docs.config.ts fields.
---

`docs.config.ts` lives at the project root, next to `package.json`:

```ts title="docs.config.ts"
import { defineConfig } from "trickfire-docs";

export default defineConfig({
    name: "My Project",
    description: "One-line description of the project.",
    sidebar: [
        {
            label: "Guides",
            icon: "BookOpen",
            items: [{ label: "Writing Content", slug: "guides/writing-content" }],
        },
    ],
});
```

| Field         | Required | Description                                                                                                                                                                          |
| ------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`        | Yes      | Site title, shown in the nav and browser tab.                                                                                                                                        |
| `description` | Yes      | One-line summary, used as the meta description.                                                                                                                                      |
| `sidebar`     | Yes      | Nav structure. Each group maps to a `docs/` folder and gets its own `meta.json`; an optional per-group `icon` is a [lucide-react](https://lucide.dev/icons) name, e.g. `"BookOpen"`. |
| `social`      | No       | Extra nav icons, appended after the fixed GitHub/Notion/TrickFire Robotics links every site always has.                                                                              |

The site URL and base path (`docs.trickfirerobotics.com/<repo-name>`) are derived automatically from `package.json`'s `"name"` field and aren't configurable here. Visiting the base URL redirects straight to the first page in `sidebar`.
