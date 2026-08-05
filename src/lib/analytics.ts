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

export interface AnalyticsPageInput {
  pathname: string;
  previousPath?: string;
  origin: string;
}

export interface AnalyticsPageViewPayload {
  page_location: string;
  page_referrer: string;
}

export interface GoogleConsentSettings {
  analytics_storage: "granted" | "denied";
  ad_storage: "denied";
  ad_user_data: "denied";
  ad_personalization: "denied";
}

export interface GoogleTagConfig extends AnalyticsPageViewPayload {
  allow_ad_personalization_signals: false;
  allow_google_signals: false;
  cookie_domain: "none";
  ignore_referrer: true;
  send_page_view: false;
}

export interface AnalyticsRevocationPlan {
  consent: GoogleConsentSettings;
  cookieNames: string[];
  disableProperty: `ga-disable-${string}`;
}

export interface AnalyticsConsentStorage {
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
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

export function writeAnalyticsConsent(
  storage: AnalyticsConsentStorage,
  choice: AnalyticsConsent
): boolean {
  try {
    storage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, choice);
    return true;
  } catch {
    // Remove a stale acceptance if the new preference cannot be persisted.
    try {
      storage.removeItem(ANALYTICS_CONSENT_STORAGE_KEY);
    } catch {
      // The in-memory denied state and GA kill switch still apply to this page.
    }
    return false;
  }
}

export function shouldReloadAfterAnalyticsWithdrawal({
  currentChoice,
  nextChoice,
  persisted,
}: {
  currentChoice: AnalyticsConsent | null;
  nextChoice: AnalyticsConsent;
  persisted: boolean;
}): boolean {
  return (
    currentChoice === "accepted" &&
    nextChoice === "declined" &&
    persisted
  );
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

const FALLBACK_ANALYTICS_ORIGIN = "https://amhwellness.co.uk";

export function sanitiseAnalyticsPath(value: string): string {
  if (!value.startsWith("/") || value.startsWith("//")) return "/";

  try {
    const pathname = new URL(value, FALLBACK_ANALYTICS_ORIGIN).pathname;
    return /^\/[a-z0-9/-]*$/.test(pathname) && pathname.length <= 120
      ? pathname
      : "/";
  } catch {
    return "/";
  }
}

function sanitiseAnalyticsOrigin(value: string): string {
  try {
    const url = new URL(value);
    if (
      (url.protocol === "https:" || url.protocol === "http:") &&
      url.username === "" &&
      url.password === ""
    ) {
      return url.origin;
    }
  } catch {
    // Use the public production origin if a caller supplies an invalid value.
  }

  return FALLBACK_ANALYTICS_ORIGIN;
}

export function analyticsPageViewPayload({
  pathname,
  previousPath,
  origin,
}: AnalyticsPageInput): AnalyticsPageViewPayload {
  const safeOrigin = sanitiseAnalyticsOrigin(origin);

  return {
    page_location: `${safeOrigin}${sanitiseAnalyticsPath(pathname)}`,
    page_referrer:
      previousPath === undefined
        ? ""
        : `${safeOrigin}${sanitiseAnalyticsPath(previousPath)}`,
  };
}

export function googleTagConfig({
  pathname,
  origin,
}: Omit<AnalyticsPageInput, "previousPath">): GoogleTagConfig {
  const page = analyticsPageViewPayload({ pathname, origin });

  return {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    cookie_domain: "none",
    ignore_referrer: true,
    page_location: page.page_location,
    page_referrer: "",
    send_page_view: false,
  };
}

export function deniedGoogleConsent(): GoogleConsentSettings {
  return {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
}

export function grantedAnalyticsConsent(): GoogleConsentSettings {
  return {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  };
}

function googleAnalyticsCookieNames(cookieHeader: string): string[] {
  const names = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim().split("=", 1)[0])
    .filter(
      (name): name is string =>
        name !== undefined && /^_ga(?:_[A-Za-z0-9]+)?$/.test(name)
    );

  return [...new Set(names)];
}

export function analyticsRevocationPlan(
  measurementId: string,
  cookieHeader: string
): AnalyticsRevocationPlan {
  return {
    consent: deniedGoogleConsent(),
    cookieNames: googleAnalyticsCookieNames(cookieHeader),
    disableProperty: `ga-disable-${measurementId}`,
  };
}

function safeSourcePage(value: string): string {
  return sanitiseAnalyticsPath(value);
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
  const page = analyticsPageViewPayload({
    pathname: window.location.pathname,
    origin: window.location.origin,
  });
  window.gtag("event", payload.name, {
    ...payload.parameters,
    ...page,
  });
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
