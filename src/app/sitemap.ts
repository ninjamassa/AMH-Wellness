import type { MetadataRoute } from "next";
import { pages } from "@/lib/patient-journey";
import { siteConfig } from "@/lib/site-config";

/**
 * Generated from the page specs, so it can never drift from the routes that
 * actually exist. Priority follows how close a page is to a booking.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return pages.map((page) => ({
    url: new URL(page.route, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: page.group === "trust" ? "yearly" : "monthly",
    priority:
      page.route === "/"
        ? 1
        : page.flagship
          ? 0.9
          : page.group === "core" || page.group === "treatment"
            ? 0.8
            : page.group === "resources"
              ? 0.6
              : 0.3,
  }));
}
