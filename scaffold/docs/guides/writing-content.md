---
title: Writing Content
description: Frontmatter, Markdown features, and page conventions.
---

Every page needs frontmatter with at least a `title`:

```md title="docs/guides/example.md"
---
title: Page Title
description: Shown in search results and social previews.
---

Your content here.
```

## Formatting

Standard Markdown works as expected - headings, lists, tables, links, and fenced code blocks with syntax highlighting:

```bash title="Terminal"
echo "code blocks support a title and language"
```

## Callouts

Files ending in `.mdx` can import and use components alongside regular Markdown - `Callout` highlights important information:

```mdx title="docs/guides/example.mdx"
import { Callout } from "fumadocs-ui/components/callout";

<Callout>A neutral callout for extra context.</Callout>

<Callout type="warn">A warning callout for things readers should be careful about.</Callout>
```

See [Fumadocs' built-in components](https://fumadocs.dev/docs/ui/mdx) for the full set (cards, tabs, steps, and more).
