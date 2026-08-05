import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { InternalLink } from "@/lib/internal-links";

/** Search-led pathways that remain useful when a page is read out of sequence. */
export function RelatedLinks({ links }: { links: readonly InternalLink[] }) {
  return (
    <Container className="pb-section">
      <nav aria-label="Related guidance">
        <h2 className="text-h3">Related guidance</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex min-h-touch items-center justify-between gap-4 rounded-control border border-sand-200 bg-white px-5 py-3 font-medium text-teal-700 shadow-card transition-[color,background-color,border-color] duration-[var(--duration-fast)] hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
              >
                <span>{link.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
