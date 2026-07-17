import type { BaseLayoutProps, LinkItemType } from "fumadocs-ui/layouts/shared";
import { SocialIcon } from "../components/SocialIcon";
import { siteConfig } from "./site-config.generated";

/**
 * Shared nav options for the single root layout - every TrickFire docs site's own repo
 * name/logo, plus its social links (GitHub/Notion/TrickFire, always present - see
 * framework/config/resolve.ts). The "back to portal" breadcrumb link lives in the sidebar
 * banner instead (see components/Breadcrumb.tsx) so it isn't nested inside the nav title's own
 * link. `siteConfig.base` is prepended by hand on the logo src - see components/Breadcrumb.tsx
 * for why (unoptimized static export images don't get `basePath` applied automatically).
 */
export function baseOptions(): BaseLayoutProps {
    const links: LinkItemType[] = siteConfig.social.map((link) => ({
        type: "icon",
        icon: <SocialIcon label={link.label} />,
        label: link.label,
        text: link.label,
        url: link.href,
    }));

    return {
        nav: {
            title: (
                <span className="flex items-center gap-2">
                    <img src={`${siteConfig.base}/nav-logo.png`} alt="" className="h-5 w-auto" />
                    {siteConfig.name}
                </span>
            ),
        },
        links,
    };
}
