import "../styles/global.css";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Breadcrumb } from "../components/Breadcrumb";
import { baseOptions } from "../lib/layout.shared";
import { source } from "../lib/source";
import { siteConfig } from "../lib/site-config.generated";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: { default: siteConfig.name, template: `%s - ${siteConfig.name}` },
    description: siteConfig.description,
};

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={inter.variable} suppressHydrationWarning>
            <body className="flex min-h-screen flex-col">
                <RootProvider search={{ options: { type: "static" } }}>
                    <DocsLayout
                        tree={source.getPageTree()}
                        {...baseOptions()}
                        sidebar={{ banner: <Breadcrumb /> }}
                    >
                        {children}
                    </DocsLayout>
                </RootProvider>
            </body>
        </html>
    );
}
