import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WhatsAppLink } from "@/components/integrations/WhatsAppLink";
import { buildWhatsAppUrl } from "@/lib/integrations";
import { footerNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const { clinician, contact, legalName, companyNumber, regulatory } = siteConfig;
  const whatsappUrl = buildWhatsAppUrl({
    enabled: contact.whatsappEnabled,
    number: contact.whatsappNumber,
  });
  const responseHours = contact.responseHours
    .map((entry) => `${entry.days}, ${entry.hours}`)
    .join(", and ");

  return (
    <footer className="mt-section border-t border-sand-200 bg-white">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="text-lg font-semibold text-indigo-600">{siteConfig.name}</p>
            <p className="mt-3 max-w-xs text-sm text-ink-500">{siteConfig.tagline}</p>
            <p className="mt-3 text-sm text-ink-500">
              <Link
                href={siteConfig.social.instagram}
                className="inline-flex min-h-touch items-center underline decoration-sand-200 underline-offset-4 transition-colors duration-[var(--duration-fast)] hover:text-indigo-600"
              >
                {siteConfig.social.instagramHandle}
              </Link>
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-sm font-semibold text-indigo-600">{group.heading}</h2>
              <ul className="mt-2 text-sm">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-touch items-center text-ink-500 transition-colors duration-[var(--duration-fast)] hover:text-indigo-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 max-w-reading border-t border-sand-200 pt-8 text-sm text-ink-500">
          <p>
            All consultations are with {clinician.name} {clinician.credentials},{" "}
            {clinician.jobTitle}, registered with the General Pharmaceutical Council
            (registration {clinician.gphcNumber}). CQC registration is{" "}
            {regulatory.cqcStatus.toLowerCase()}.
          </p>
          <p className="mt-3">
            Akila handles contact requests during {responseHours}.{" "}
            <Link
              href="/contact"
              className="inline-flex min-h-touch items-center underline underline-offset-4 hover:text-indigo-600"
            >
              Ask Akila to reply by email
            </Link>
            .
          </p>
          {whatsappUrl === null ? null : (
            <WhatsAppLink
              url={whatsappUrl}
              responseHours={responseHours}
            />
          )}
          <p className="mt-3">
            {legalName} is registered in England &amp; Wales, company number{" "}
            {companyNumber}. Information on this site is general and doesn&apos;t replace a
            personal consultation — see our{" "}
            <Link
              href="/medical-disclaimer"
              className="inline-flex min-h-touch items-center underline underline-offset-4 hover:text-indigo-600"
            >
              medical disclaimer
            </Link>
            .
          </p>
          <p className="mt-6">
            © {new Date().getFullYear()} {legalName}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
