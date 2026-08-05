"use client";

import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";
import { buttonClassName } from "@/components/ui/Button";
import {
  ANALYTICS_CONSENT_STORAGE_KEY,
  parseAnalyticsConsent,
  type AnalyticsConsent as ConsentChoice,
} from "@/lib/analytics";

function prepareGoogleTag(measurementId: string) {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    ((...args: unknown[]) => {
      window.dataLayer?.push(args);
    });

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_google_signals: false,
  });
}

export function AnalyticsConsent({ measurementId }: { measurementId: string }) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

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

      if (storedChoice === "accepted") prepareGoogleTag(measurementId);
      setChoice(storedChoice);
      setIsReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [measurementId]);

  function persistChoice(nextChoice: ConsentChoice) {
    try {
      window.localStorage.setItem(
        ANALYTICS_CONSENT_STORAGE_KEY,
        nextChoice
      );
    } catch {
      // Storage may be unavailable; the in-memory choice still controls this page.
    }

    if (nextChoice === "accepted") {
      prepareGoogleTag(measurementId);
      setChoice(nextChoice);
      setPreferencesOpen(false);
      return;
    }

    const wasAccepted = choice === "accepted";
    setChoice(nextChoice);
    setPreferencesOpen(false);
    if (wasAccepted) window.location.reload();
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
            check. It never includes measurements, health details or form text.
            Nothing is sent to Google unless you accept. Read the{" "}
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
