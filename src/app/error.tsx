"use client";

import { Container } from "@/components/ui/Container";

export default function ErrorBoundary({ reset }: { reset: () => void }) {
  return (
    <Container className="py-[--spacing-section]">
      {/* TODO(content-agent): review this fallback copy. */}
      <h1 className="text-[length:--text-h1]">Something went wrong</h1>
      <p>
        This page could not be loaded. You can try it again without losing any
        information stored by AMH Wellness, because this website does not store
        eligibility answers.
      </p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </Container>
  );
}
