import { describe, expect, it } from "vitest";
import { pricingLabel } from "@/lib/presentation";
import type { PricingItem } from "@/types/content";

describe("pricingLabel", () => {
  it("never exposes an amount for an unconfirmed price", () => {
    const item: PricingItem = {
      id: "consultation",
      name: "Consultation",
      description: "Placeholder description",
      includes: [],
      pricingStatus: "unconfirmed",
    };

    expect(pricingLabel(item)).toBe("Price awaiting confirmation");
  });

  it("formats a confirmed GBP amount for UK readers", () => {
    const item: PricingItem = {
      id: "consultation",
      name: "Consultation",
      description: "Placeholder description",
      includes: [],
      pricingStatus: "confirmed",
      amountPence: 12_950,
      currency: "GBP",
    };

    expect(pricingLabel(item)).toBe("£129.50");
  });
});
