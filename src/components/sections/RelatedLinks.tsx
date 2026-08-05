import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { InternalLink } from "@/lib/internal-links";

/** Search-led pathways that remain useful when a page is read out of sequence. */
export function RelatedLinks({ links }: { links: readonly InternalLink[] }) {
  return (
    <Container className="pb-[--spacing-section]">
      <nav aria-label="Related guidance">
        <h2 className="text-[length:--text-h3]">Related guidance</h2>
        <ul className="mt-4 space-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-teal-700 underline underline-offset-4 hover:text-teal-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
