import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryCta, primaryNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

/**
 * TODO(design-agent): swap the wordmark for the supplied logo once Akila sends
 * vector artwork, and add an accessible mobile disclosure menu. Keep this a
 * Server Component — only the menu toggle needs to be a client leaf.
 */
export function SiteHeader() {
  return (
    <header className="border-b border-sand-200 bg-white/90 backdrop-blur">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-indigo-600">
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-6 text-sm">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink-700 transition-colors hover:text-indigo-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button href={primaryCta.href} className="hidden sm:inline-flex">
          {primaryCta.label}
        </Button>
      </Container>
    </header>
  );
}
