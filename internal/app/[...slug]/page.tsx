import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponents } from "../../mdx-components";
import { source } from "../../lib/source";

interface Params {
    slug: string[];
}

export default async function Page(props: { params: Promise<Params> }) {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) notFound();

    const MDX = page.data.body;

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody>
                <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    // The root "/" route is handled by app/page.tsx's redirect instead - a non-optional
    // catch-all here can't match zero segments, so drop any empty-slug entry `source` produces.
    return source.generateParams().filter((params) => params.slug.length > 0);
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
    const params = await props.params;
    const page = source.getPage(params.slug);
    if (!page) notFound();

    return {
        title: page.data.title,
        description: page.data.description,
    };
}
