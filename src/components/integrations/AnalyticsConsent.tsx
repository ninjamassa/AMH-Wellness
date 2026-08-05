"use client";

import Script from "next/script";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { buttonClassName } from "@/components/ui/Button";
import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  analyticsPageViewPayload,
  analyticsRevocationPlan,
  deniedGoogleConsent,
  googleTagConfig,
  grantedAnalyticsConsent,
  parseAnalyticsConsent,
  shouldReloadAfterAnalyticsWithdrawal,
  type AnalyticsConsent as ConsentChoice,
  writeAnalyticsConsent,
} from "@/lib/analytics";

function setGoogleTagDisabled(disableProperty: string, disabled: boolean) {
  Object.defineProperty(window, disableProperty, {
    configurable: true,
    value: disabled,
    writable: true,
  });
}

function expireGoogleAnalyticsCookies(cookieNames: readonly string[]) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const expires =
    "; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax";

  for (const name of cookieNames) {
    document.cookie = `${name}=${expires}${secure}`;

    const hostname = window.location.hostname;
    const domains = new Set([hostname]);
    if (
      hostname === "amhwellness.co.uk" ||
      hostname.endsWith(".amhwellness.co.uk")
    ) {
      domains.add("amhwellness.co.uk");
    }

    for (const domain of domains) {
      document.cookie = `${name}=${expires}; Domain=${domain}${secure}`;
    }
  }
}

function prepareGoogleTag(measurementId: string, pathname: string) {
  setGoogleTagDisabled(`ga-disable-${measurementId}`, false);
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    ((...args: unknown[]) => {
      window.dataLayer?.push(args);
    });

  window.gtag("consent", "default", deniedGoogleConsent());
  window.gtag("consent", "update", grantedAnalyticsConsent());
  window.gtag("js", new Date());
  window.gtag(
    "config",
    measurementId,
    googleTagConfig({ pathname, origin: window.location.origin })
  );
}

function revokeGoogleTag(measurementId: string) {
  const plan = analyticsRevocationPlan(measurementId, document.cookie);

  // Google requires an explicit denied update when a visitor withdraws.
  window.gtag?.("consent", "update", plan.consent);
  setGoogleTagDisabled(plan.disableProperty, true);
  expireGoogleAnalyticsCookies(plan.cookieNames);
  document.getElementById("amh-google-analytics")?.remove();
  window.gtag = undefined;
}

export function AnalyticsConsent({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const initialPath = useRef(pathname);
  const previousTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      let storedChoice: ConsentChoice | null = null;
      try {
        storedChoice = parseAnalyticsConsent(
          window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY)
        );
      } catch {
        storedChoice = null;
      }

      if (storedChoice === "accepted") {
        prepareGoogleTag(measurementId, initialPath.current);
      } else if (storedChoice === "declined") {
        const plan = analyticsRevocationPlan(measurementId, document.cookie);
        setGoogleTagDisabled(plan.disableProperty, true);
        expireGoogleAnalyticsCookies(plan.cookieNames);
      }
      setChoice(storedChoice);
      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [measurementId]);

  useEffect(() => {
    if (choice !== "accepted") {
      previousTrackedPath.current = null;
      return;
    }
    if (previousTrackedPath.current === pathname) return;

    const previousPath = previousTrackedPath.current ?? undefined;
    const origin = window.location.origin;
    window.gtag?.(
      "config",
      measurementId,
      googleTagConfig({ pathname, origin })
    );
    window.gtag?.(
      "event",
      "page_view",
      analyticsPageViewPayload({ pathname, previousPath, origin })
    );
    previousTrackedPath.current = pathname;
  }, [choice, measurementId, pathname]);

  function persistChoice(nextChoice: ConsentChoice) {
    const persisted = writeAnalyticsConsent(
      window.localStorage,
      nextChoice
    );

    if (nextChoice === "accepted") {
      prepareGoogleTag(measurementId, pathname);
      setChoice(nextChoice);
      setPreferencesOpen(false);
      return;
    }

    const wasAccepted = choice === "accepted";
    if (wasAccepted) revokeGoogleTag(measurementId);
    setChoice(nextChoice);
    setPreferencesOpen(false);
    if (
      shouldReloadAfterAnalyticsWithdrawal({
        currentChoice: choice,
        nextChoice,
        persisted,
      })
    ) {
      window.location.reload();
    }
  }

  if (!isReady) return null;

  return (
    <>
      {choice === "accepted" ? (
        <Script
          id="amh-google-analytics"
          src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
          strategy="afterInteractive"
        />
      ) : null}

      {choice === null || preferencesOpen ? (
        <section
          aria-label="Analytics preferences"
          className="fixed inset-x-4 bottom-4 z-[var(--z-menu)] mx-auto max-w-3xl rounded-card border border-indigo-200 bg-white p-5 shadow-raised sm:p-6"
        >
          <h2 className="text-h3">Optional analytics</h2>
          <p className="mt-3 text-sm text-ink-700">
            Analytics helps us understand where people leave the eligibility
            check. It never includes your measurements, individual answers,
            contact details or form text. If you finish the check, we record
            only the broad result shown to you. Nothing is sent to Google unless
            you accept. Read the{" "}
            <Link
              href="/privacy-policy"
              className="underline underline-offset-4 hover:text-indigo-600"
            >
              privacy policy
            </Link>
            .
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => persistChoice("accepted")}
              className={buttonClassName("primary")}
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={() => persistChoice("declined")}
              className={buttonClassName("ghost")}
            >
              Use essential only
            </button>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setPreferencesOpen(true)}
          className="fixed bottom-4 left-4 z-[var(--z-menu)] min-h-touch rounded-pill border border-sand-200 bg-white px-4 py-2 text-sm font-semibold text-indigo-600 shadow-card"
        >
          Analytics settings
        </button>
      )}
    </>
  );
}
