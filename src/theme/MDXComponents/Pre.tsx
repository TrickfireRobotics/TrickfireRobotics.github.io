import React, { useRef, useState, type ComponentProps } from "react";
import OriginalPre from "@theme-original/MDXComponents/Pre";
import CodeBlock from "@theme/CodeBlock";

function TfCodeBlock({
    title,
    children,
    ...preProps
}: ComponentProps<"pre"> & { title?: string }) {
    const bodyRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    function handleCopy() {
        const code = bodyRef.current?.querySelector("code");
        if (!code) return;
        navigator.clipboard.writeText(code.innerText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }

    return (
        <div className={`tf-cb${title ? " tf-cb--titled" : ""}`}>
            {title && <div className="tf-cb-title">{title}</div>}
            <div className="tf-cb-body" ref={bodyRef}>
                <pre {...preProps}>{children}</pre>
                <button
                    className={`tf-cb-copy${copied ? " copied" : ""}`}
                    onClick={handleCopy}
                    aria-label="Copy code"
                >
                    <span className="tf-cb-copy-default">Copy</span>
                    <span className="tf-cb-copy-done">Copied!</span>
                </button>
            </div>
        </div>
    );
}

export default function Pre({ children, ...rest }: ComponentProps<"pre">) {
    const restAny = rest as Record<string, unknown>;
    const className = (restAny.className as string) ?? "";

    // Shiki-processed pre — render with our custom wrapper, skip Docusaurus CodeBlock
    if (className.includes("shiki")) {
        const title = (restAny["data-shiki-title"] as string) || undefined;
        return (
            <TfCodeBlock title={title} {...rest}>
                {children}
            </TfCodeBlock>
        );
    }

    // Non-Shiki pre (e.g. MDX inline <CodeBlock>, unknown language fallback)
    if (React.isValidElement(children) && (children as React.ReactElement).type === "code") {
        const codeProps = (children as React.ReactElement).props as Record<string, unknown>;
        return <CodeBlock {...(codeProps as any)}>{codeProps.children as React.ReactNode}</CodeBlock>;
    }

    return <OriginalPre {...rest}>{children}</OriginalPre>;
}
