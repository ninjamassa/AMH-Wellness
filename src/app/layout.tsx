import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/schema/JsonLd";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AnalyticsConsent } from "@/components/integrations/AnalyticsConsent";
import { parseGaMeasurementId } from "@/lib/analytics";
import { buildGraph, clinicianSchema, organisationSchema, websiteSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.clinician.name }],
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#252767",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const graph = buildGraph(organisationSchema(), clinicianSchema(), websiteSchema());
  // TODO(human): Add the production GA4 measurement ID only after the privacy
  // policy and eligibility-outcome processing are approved, Akila's analytics
  // account is ready, and Enhanced Measurement's browser-history page views are
  // disabled in the GA web stream.
  const measurementId = parseGaMeasurementId(
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  );

  return (
    <html lang="en-GB" className={inter.variable}>
      <body>
        <JsonLd graph={graph} />
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        {measurementId === null ? null : (
          <AnalyticsConsent measurementId={measurementId} />
        )}
      </body>
    </html>
  );
}
