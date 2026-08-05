import type { PricingItem } from "@/types/content";

const gbpFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Makes the unconfirmed state explicit and only formats signed-off amounts. */
export function pricingLabel(item: PricingItem): string {
  if (item.pricingStatus === "unconfirmed") {
    return "Price awaiting confirmation";
  }

  return gbpFormatter.format(item.amountPence / 100);
}
