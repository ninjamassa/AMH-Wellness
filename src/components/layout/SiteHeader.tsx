import Image from "next/image";
import Link from "next/link";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryCta, primaryNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-[var(--z-header)] border-b border-sand-200 bg-white/95 shadow-card backdrop-blur">
      <Container className="flex min-h-20 items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="inline-flex min-h-touch shrink-0 items-center gap-2.5 whitespace-nowrap text-lg font-semibold tracking-tight text-indigo-600"
        >
          <Image
            src="/Logo-favicon.webp"
            alt=""
            width={477}
            height={504}
            className="h-10 w-auto"
          />
          <span>{siteConfig.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-1 text-sm">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-touch items-center whitespace-nowrap rounded-control px-3 text-ink-700 transition-colors duration-[var(--duration-fast)] ease-[var(--ease-calm)] hover:bg-indigo-50 hover:text-indigo-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden shrink-0 md:block">
          <Button href={primaryCta.href}>{primaryCta.label}</Button>
        </div>

        <MobileNavigation siteName={siteConfig.name} />
      </Container>
    </header>
  );
}
