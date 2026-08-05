import type { Metadata } from "next";
import { siteConfig } from "./site-config";

export interface PageSeoInput {
  title: string;
  description: string;
  path: string;
  /** Rarely needed — everything on this site should be indexable. */
  noindex?: boolean;
  ogImage?: string;
}

/**
 * Builds page metadata with a canonical URL. Every page must call this —
 * duplicate or missing canonicals are the most common technical SEO defect
 * on small clinical sites.
 */
export function buildMetadata({
  title,
  description,
  path,
  noindex = false,
  ogImage = "/og-default.png",
}: PageSeoInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
        },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: new URL(ogImage, siteConfig.url).toString(), width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/**
 * Answer-first summary block. AEO/GEO depends on a direct, extractable answer
 * within the first ~60 words of a page, before any narrative.
 */
export interface AnswerBlock {
  question: string;
  answer: string;
}
