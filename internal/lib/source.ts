import { docs } from "collections/server";
import { loader } from "fumadocs-core/source";
import { icons } from "lucide-react";
import { createElement } from "react";

// No `/docs` URL prefix - each TrickFire repo's site is 100% docs content under its own
// GitHub Pages base path (e.g. docs.trickfirerobotics.com/<repo>/getting-started/), same
// structure the previous Starlight-based framework used.
export const source = loader({
    baseUrl: "/",
    source: docs.toFumadocsSource(),
    icon(icon) {
        if (!icon) return;
        // `icon` strings come from docs.config.ts's sidebar `icon` field (see
        // framework/config/schema.ts) - PascalCase lucide-react component names.
        if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
    },
});
