"use client";

import { Container } from "@/components/ui/Container";
import { buttonClassName } from "@/components/ui/Button";

export default function ErrorBoundary({ reset }: { reset: () => void }) {
  return (
    <Container className="py-section">
      {/* TODO(content-agent): review this fallback copy. */}
      <h1 className="text-h1">Something went wrong</h1>
      <p className="mt-4 max-w-reading text-ink-500">
        This page could not be loaded. You can try it again without losing any
        information stored by AMH Wellness, because this website does not store
        eligibility answers.
      </p>
      <button type="button" onClick={reset} className={buttonClassName("primary", "mt-7")}>
        Try again
      </button>
    </Container>
  );
}
