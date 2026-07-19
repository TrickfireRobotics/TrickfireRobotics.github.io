import type { Highlighter } from "shiki";
import { visit } from "unist-util-visit";

type HastElement = {
    type: "element";
    tagName: string;
    properties: Record<string, unknown>;
    children: HastNode[];
};
type HastText = { type: "text"; value: string };
type HastNode = HastElement | HastText | { type: string; [k: string]: unknown };

function extractText(node: HastNode): string {
    if (node.type === "text") return (node as HastText).value;
    if ("children" in node && Array.isArray((node as HastElement).children)) {
        return (node as HastElement).children.map(extractText).join("");
    }
    return "";
}

function parseMeta(meta: string): { title: string | null } {
    const m = meta.match(/title="([^"]+)"/);
    return { title: m ? m[1] : null };
}

export function createRehypeShiki(highlighter: Highlighter, theme: string) {
    const loadedLangs = new Set(highlighter.getLoadedLanguages());

    return function rehypeShiki() {
        return (tree: HastNode) => {
            visit(tree as any, "element", (node: HastElement) => {
                if (node.tagName !== "pre") return;

                const codeEl = node.children.find(
                    (c): c is HastElement =>
                        c.type === "element" && (c as HastElement).tagName === "code"
                );
                if (!codeEl) return;

                const meta = (codeEl.properties?.dataMeta as string) ?? "";
                const { title } = parseMeta(meta);

                const classNames = (codeEl.properties?.className ?? []) as string[];
                const langClass = classNames.find((c: string) => c.startsWith("language-"));
                const lang = langClass ? langClass.slice("language-".length) : "text";

                const rawCode = extractText(codeEl);
                const safeLang = loadedLangs.has(lang as never) ? lang : "text";

                const shikiRoot = highlighter.codeToHast(rawCode, {
                    lang: safeLang,
                    theme,
                }) as { children: HastNode[] };

                const shikiPre = shikiRoot.children.find(
                    (c): c is HastElement =>
                        c.type === "element" && (c as HastElement).tagName === "pre"
                );
                if (!shikiPre) return;

                // Store title in a data attribute for the Pre component to pick up
                shikiPre.properties.dataShikiTitle = title ?? "";

                // Replace original node in-place with Shiki output
                node.properties = shikiPre.properties;
                node.children = shikiPre.children;
            });
        };
    };
}
