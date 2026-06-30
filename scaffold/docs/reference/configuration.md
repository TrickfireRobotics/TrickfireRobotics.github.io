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
    landing: [
        { title: "Getting Started", description: "...", link: "/getting-started/" },
        { title: "Guides", description: "...", link: "/guides/writing-content/" },
        { title: "Reference", description: "...", link: "/reference/configuration/" },
        { title: "FAQ", description: "...", link: "/reference/faq/" },
    ],
    sidebar: [
        {
            label: "Guides",
            items: [{ label: "Writing Content", slug: "guides/writing-content" }],
        },
    ],
});
```

| Field         | Required | Description                                                                                                                 |
| ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `name`        | Yes      | Site title, shown in the nav and browser tab.                                                                               |
| `description` | Yes      | One-line summary, used as the hero tagline and meta description.                                                            |
| `landing`     | Yes      | Cards shown on the landing page.                                                                                            |
| `sidebar`     | Yes      | Nav structure — same shape as [Starlight's sidebar config](https://starlight.astro.build/reference/configuration/#sidebar). |
| `social`      | No       | Defaults to this repo's GitHub link, derived from `package.json`'s `name`.                                                  |

The site URL and base path (`docs.trickfirerobotics.com/<repo-name>`) are derived automatically from `package.json`'s `"name"` field and aren't configurable here.
