---
title: Writing Content
sidebar_position: 4
---

# Writing Content

Docs are written in Markdown (MDX). Docusaurus extends standard Markdown with a few extras covered below.

## Frontmatter

Every file can have a YAML frontmatter block at the top:

```markdown
---
title: My Page Title
description: A short summary shown in search results.
sidebar_position: 2
---
```

| Field              | Purpose                                                                    |
| ------------------ | -------------------------------------------------------------------------- |
| `title`            | Page title shown in the browser tab and sidebar. Defaults to the first H1. |
| `description`      | Meta description for search engines.                                       |
| `sidebar_position` | Controls sort order within its folder. Lower = higher.                     |

## Headings

Use `#` for the page title (H1) and `##`/`###` for sections. Only one H1 per page.

```markdown
# Page Title

## Section

### Subsection
```

## Links

**To another doc in your project:**

```markdown
[Getting Started](./getting-started)
[See the FAQ](./reference/faq)
```

Use relative paths without the `.md` extension. Docusaurus validates these at build time and warns on broken links.

**To an external URL:**

```markdown
[GitHub](https://github.com/TrickfireRobotics)
```

## Images

Place images in `docs/assets/` and reference them relatively:

```markdown
![Wiring diagram](./assets/wiring.png)
```

SVG files work the same way.

## Code blocks

Fenced code blocks with a language tag get syntax highlighting:

````markdown
```python
import can

bus = can.Bus(interface='socketcan', channel='can0')
msg = can.Message(arbitration_id=0x123, data=[0x01, 0x02])
bus.send(msg)
```
````

Supported language tags include `python`, `typescript`, `bash`, `yaml`, `json`, `c`, `cpp`, and many more.

**Show a filename:**

````markdown
```python title="examples/send_message.py"
# ...
```
````

**Highlight specific lines:**

````markdown
```python {3-5}
import can

bus = can.Bus(...)
msg = can.Message(...)
bus.send(msg)
```
````

## Admonitions

Callout boxes for notes, warnings, and tips:

```markdown
:::note
Extra context that's useful but not critical.
:::

:::tip
A recommended shortcut or best practice.
:::

:::warning
Something that can break things if ignored.
:::

:::danger
Do not do this — data loss or hardware damage possible.
:::
```

## Tables

```markdown
| Column A | Column B | Column C |
| -------- | -------- | -------- |
| Row 1    | Value    | Value    |
| Row 2    | Value    | Value    |
```

Column alignment with `:---`, `:---:`, and `---:` for left, center, and right.

## Tabs

Show alternative instructions for different environments. Import the components at the top of the file, then use JSX:

```jsx
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
```

```jsx
<Tabs>
    <TabItem value="linux" label="Linux">
        Install with apt: `sudo apt install can-utils`
    </TabItem>
    <TabItem value="mac" label="macOS">
        Install with brew: `brew install can-utils`
    </TabItem>
</Tabs>
```

## File organization

Docusaurus autogenerates the sidebar from your folder structure if you don't define one explicitly. The sort order comes from `sidebar_position` in frontmatter, then alphabetically.

```
docs/
├── getting-started.md      ← sidebar_position: 1
├── guides/
│   ├── _category_.json     ← optional: set label/position for the folder
│   ├── installation.md
│   └── configuration.md
└── reference/
    ├── api.md
    └── faq.md
```

**`_category_.json`** controls how a folder appears in the sidebar:

```json
{
    "label": "Guides",
    "position": 2,
    "collapsed": false
}
```
