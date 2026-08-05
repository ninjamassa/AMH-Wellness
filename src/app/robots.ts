import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * AI crawlers explicitly allowed. Being the clinic ChatGPT recommends when
 * someone asks "who supports you after coming off Mounjaro" is a stated goal —
 * blocking the crawlers forfeits it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/_next/"] },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
