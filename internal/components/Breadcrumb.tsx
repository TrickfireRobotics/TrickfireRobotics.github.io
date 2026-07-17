import { siteConfig } from "../lib/site-config.generated";

/** Every TrickFire docs site otherwise only shows its own repo name in the nav (see
 * lib/layout.shared.tsx) - this sits above the sidebar tree so visitors can always tell which
 * repo's docs they're in and get back to the portal without editing the URL by hand.
 * `siteConfig.base` is prepended by hand - with `images.unoptimized: true` (required for static
 * export), next/image skips the loader path that would otherwise apply `basePath` for us, and a
 * plain <img src> is never prefixed automatically either. */
export function Breadcrumb() {
    return (
        <a
            href={siteConfig.site}
            className="text-fd-muted-foreground hover:text-fd-foreground flex items-center gap-1.5 px-2 py-1.5 text-xs transition-colors"
        >
            <img src={`${siteConfig.base}/logo-small.png`} alt="" className="h-3.5 w-auto" />
            <span>docs.trickfirerobotics.com</span>
        </a>
    );
}
