"use client";

import { usePathname } from "next/navigation";
import { trackAnalyticsEvent } from "@/lib/analytics";

export function WhatsAppLink({
  url,
  responseHours,
}: {
  url: string;
  responseHours: string;
}) {
  const pathname = usePathname();

  return (
    <div className="mt-4 rounded-control border border-sand-200 bg-sand-50 p-4">
      <a
        href={url}
        className="inline-flex min-h-touch items-center font-semibold text-indigo-600 underline underline-offset-4"
        onClick={() =>
          trackAnalyticsEvent({
            name: "whatsapp_click",
            sourcePage: pathname,
          })
        }
      >
        Message Akila on WhatsApp
      </a>
      <p className="mt-2 text-sm text-ink-500">Replies: {responseHours}.</p>
    </div>
  );
}
