"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { siteConfig } from "../lib/site-config.generated";

/**
 * There's no landing/splash page - visiting the site's base URL should land straight in
 * content. `next.config`'s `redirects()` isn't available for `output: "export"` static sites
 * (no server to run it against), so this does the equivalent client-side: `next/navigation`'s
 * router already applies `basePath` automatically, same as `<Link>`, so `firstPageHref` here
 * needs no manual base-prefixing.
 */
export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.replace(siteConfig.firstPageHref);
    }, [router]);

    return (
        <noscript>
            <Link href={siteConfig.firstPageHref}>Continue to the docs</Link>
        </noscript>
    );
}
