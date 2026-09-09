import type { MetadataRoute } from "next";

import { routes } from "@/lib/routes";
import { site } from "@/data/site";

/**
 * sitemap.xml.
 *
 * Generated from lib/routes so it cannot drift out of sync with the nav, which
 * matters while the slug decision is still open: change the slugs there and
 * this follows automatically.
 *
 * Like robots.ts this is a Next metadata convention, prerendered to a static
 * file at build time. There is no runtime endpoint.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return Object.values(routes).map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
