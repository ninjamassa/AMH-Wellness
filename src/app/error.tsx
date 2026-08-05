"use client";

import { Container } from "@/components/ui/Container";
import { buttonClassName } from "@/components/ui/Button";

export default function ErrorBoundary({ reset }: { reset: () => void }) {
  return (
    <Container className="py-section">
      <h1 className="text-h1">Something went wrong</h1>
      <p className="mt-4 max-w-reading text-ink-500">
        This page could not be loaded. Please try again. If this happened during
        the eligibility check, remember that your measurements and health answers
        are not sent to or stored by AMH Wellness.
      </p>
      <button type="button" onClick={reset} className={buttonClassName("primary", "mt-7")}>
        Try again
      </button>
    </Container>
  );
}
