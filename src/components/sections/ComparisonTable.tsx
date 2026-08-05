import type { ReactNode } from "react";

export interface ComparisonRow {
  id: string;
  feature: string;
  first: ReactNode;
  second: ReactNode;
}

export function ComparisonTable({
  caption,
  firstColumn,
  secondColumn,
  rows,
}: {
  caption: string;
  firstColumn: string;
  secondColumn: string;
  rows: readonly ComparisonRow[];
}) {
  return (
    <div
      role="region"
      aria-label={`${caption}. Scroll horizontally to see the full comparison on a small screen.`}
      tabIndex={0}
      className="overflow-x-auto rounded-card border border-sand-200 bg-white shadow-card"
    >
      <table className="w-full min-w-[42rem] border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-indigo-50">
          <tr>
            <th scope="col" className="w-1/3 px-6 py-5 text-sm text-indigo-600">
              What to compare
            </th>
            <th scope="col" className="w-1/3 px-6 py-5 text-sm text-indigo-600">
              {firstColumn}
            </th>
            <th scope="col" className="w-1/3 px-6 py-5 text-sm text-indigo-600">
              {secondColumn}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-sand-200">
          {rows.map((row) => (
            <tr key={row.id}>
              <th scope="row" className="px-6 py-5 align-top font-semibold text-indigo-600">
                {row.feature}
              </th>
              <td className="px-6 py-5 align-top text-ink-700">{row.first}</td>
              <td className="px-6 py-5 align-top text-ink-700">{row.second}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
