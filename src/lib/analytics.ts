import type { EligibilityStatus } from "@/lib/eligibility";

export const ANALYTICS_CONSENT_STORAGE_KEY = "amh-analytics-consent-v1";

export type AnalyticsConsent = "accepted" | "declined";

export type AnalyticsEvent =
  | { name: "eligibility_started" }
  | { name: "eligibility_completed"; outcome: EligibilityStatus }
  | { name: "booking_handoff"; sourcePage: string }
  | { name: "enquiry_submitted"; sourcePage: string }
  | { name: "whatsapp_click"; sourcePage: string }
  | { name: "article_read"; slug: string };

export interface AnalyticsEventPayload {
  name: AnalyticsEvent["name"];
  parameters?: Readonly<Record<string, string>>;
}

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

export function parseAnalyticsConsent(
  value: string | null
): AnalyticsConsent | null {
  return value === "accepted" || value === "declined" ? value : null;
}

export function parseGaMeasurementId(
  value: string | undefined
): string | null {
  const measurementId = value?.trim().toUpperCase();
  if (measurementId === undefined) return null;
  return /^G-[A-Z0-9]{5,20}$/.test(measurementId)
    ? measurementId
    : null;
}

function safeSourcePage(value: string): string {
  if (!value.startsWith("/")) return "/";

  try {
    const pathname = new URL(value, "https://amhwellness.co.uk").pathname;
    return /^\/[a-z0-9/-]*$/.test(pathname) && pathname.length <= 120
      ? pathname
      : "/";
  } catch {
    return "/";
  }
}

function safeArticleSlug(value: string): string {
  return /^[a-z0-9-]{1,100}$/.test(value) ? value : "unknown";
}

/**
 * Explicitly maps each event to its permitted analytics fields. Never spread a
 * caller object here: measurements, contact details and free text must be
 * impossible to forward accidentally.
 */
export function analyticsEventPayload(
  event: AnalyticsEvent
): AnalyticsEventPayload {
  switch (event.name) {
    case "eligibility_started":
      return { name: event.name };
    case "eligibility_completed":
      return {
        name: event.name,
        parameters: { outcome: event.outcome },
      };
    case "booking_handoff":
    case "enquiry_submitted":
    case "whatsapp_click":
      return {
        name: event.name,
        parameters: { source_page: safeSourcePage(event.sourcePage) },
      };
    case "article_read":
      return {
        name: event.name,
        parameters: { slug: safeArticleSlug(event.slug) },
      };
  }
}

export function trackAnalyticsEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined" || window.gtag === undefined) return;

  const payload = analyticsEventPayload(event);
  window.gtag("event", payload.name, payload.parameters ?? {});
}

export function articleReadThresholdReached({
  scrollTop,
  viewportHeight,
  documentHeight,
}: {
  scrollTop: number;
  viewportHeight: number;
  documentHeight: number;
}): boolean {
  if (documentHeight <= 0) return false;
  return (scrollTop + viewportHeight) / documentHeight >= 0.75;
}
