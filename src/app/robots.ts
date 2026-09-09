import type { MetadataRoute } from "next";

import { site } from "@/data/site";

/**
 * robots.txt.
 *
 * A Next metadata convention, not an API route: it is evaluated at build time
 * and emitted as a static /robots.txt. Nothing runs at request time.
 */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
