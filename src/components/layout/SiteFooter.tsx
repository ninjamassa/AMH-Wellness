import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { footerNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const { clinician, contact, legalName, companyNumber, regulatory } = siteConfig;

  return (
    <footer className="mt-[--spacing-section] border-t border-sand-200 bg-white">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="text-lg font-semibold text-indigo-600">{siteConfig.name}</p>
            <p className="mt-3 max-w-xs text-sm text-ink-500">{siteConfig.tagline}</p>
            <p className="mt-4 text-sm text-ink-500">
              <Link href={siteConfig.social.instagram} className="hover:text-indigo-600">
                {siteConfig.social.instagramHandle}
              </Link>
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-sm font-semibold text-indigo-600">{group.heading}</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-ink-500 transition-colors hover:text-indigo-600"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-sand-200 pt-8 text-sm text-ink-500">
          <p>
            All consultations are with {clinician.name} {clinician.credentials},{" "}
            {clinician.jobTitle}, registered with the General Pharmaceutical Council
            (registration {clinician.gphcNumber}). {regulatory.cqcStatus} with the Care
            Quality Commission.
          </p>
          <p className="mt-3">
            We aim to reply{" "}
            {contact.responseHours.map((h) => `${h.days}, ${h.hours}`).join(", and ")}.
            Enquiries: {contact.email}
          </p>
          <p className="mt-3">
            {legalName} is registered in England &amp; Wales, company number{" "}
            {companyNumber}. Information on this site is general and doesn&apos;t replace a
            personal consultation — see our{" "}
            <Link href="/medical-disclaimer" className="underline hover:text-indigo-600">
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
