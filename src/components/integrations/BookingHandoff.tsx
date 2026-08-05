"use client";

import { buttonClassName } from "@/components/ui/Button";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function BookingHandoff({
  bookingUrl,
  sourcePage,
}: {
  bookingUrl: string;
  sourcePage: string;
}) {
  return (
    <a
      href={bookingUrl}
      className={buttonClassName("primary")}
      onClick={() =>
        trackAnalyticsEvent({ name: "booking_handoff", sourcePage })
      }
    >
      Book your consultation with Akila
    </a>
  );
}
