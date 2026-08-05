import type { FaqEntry } from "@/types/content";

export function FaqAccordion({ items }: { items: readonly FaqEntry[] }) {
  return (
    <div className="divide-y divide-sand-200 rounded-card border border-sand-200 bg-white px-5 shadow-card sm:px-7">
      {items.map((item) => (
        <details key={item.id} className="group">
          <summary className="flex min-h-touch cursor-pointer list-none items-center justify-between gap-5 py-5 font-semibold text-indigo-600 marker:content-none [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="flex size-8 shrink-0 items-center justify-center rounded-pill bg-indigo-50 text-xl font-normal text-indigo-600 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-calm)] group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-reading pb-6 pr-10 text-ink-500">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
