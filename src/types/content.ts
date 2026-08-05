/** Shared, serialisable content contracts for page and schema layers. */

export interface ArticleFrontmatter {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  topics: readonly string[];
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  attribution: string;
  consentConfirmed: boolean;
}

interface PricingItemBase {
  id: string;
  name: string;
  description: string;
  includes: readonly string[];
}

/**
 * Pricing cannot accidentally look confirmed: an amount is only available on
 * the explicitly confirmed branch after Akila signs it off.
 */
export type PricingItem = PricingItemBase &
  (
    | { pricingStatus: "unconfirmed" }
    | {
        pricingStatus: "confirmed";
        amountPence: number;
        currency: "GBP";
      }
  );
