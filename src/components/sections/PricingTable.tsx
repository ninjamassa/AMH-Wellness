import { pricingLabel } from "@/lib/presentation";
import type { PricingItem } from "@/types/content";

export function PricingTable({ items }: { items: readonly PricingItem[] }) {
  return (
    <ul className="grid gap-5 lg:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="flex flex-col rounded-card border border-sand-200 bg-white p-7 shadow-card"
        >
          <h2 className="text-h3">{item.name}</h2>
          <p
            className={
              item.pricingStatus === "confirmed"
                ? "mt-4 text-h2 font-semibold text-indigo-600"
                : "mt-4 rounded-control bg-sand-100 px-4 py-3 text-sm font-semibold text-ink-700"
            }
          >
            {pricingLabel(item)}
          </p>
          <p className="mt-4 text-ink-500">{item.description}</p>
          <div className="mt-6 border-t border-sand-200 pt-5">
            <h3 className="text-sm font-semibold text-indigo-600">Included</h3>
            <ul className="mt-3 space-y-3 text-sm text-ink-700">
              {item.includes.map((included) => (
                <li key={included} className="flex gap-3">
                  <span aria-hidden="true" className="font-semibold text-teal-700">
                    ✓
                  </span>
                  <span>{included}</span>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
