"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitEnquiry } from "@/app/contact/actions";
import type {
  EnquiryActionState,
  EnquiryField,
  EnquiryFieldErrors,
} from "@/lib/enquiry";

const initialState: EnquiryActionState = { status: "idle" };

function fieldError(
  errors: EnquiryFieldErrors | undefined,
  field: EnquiryField
): string | undefined {
  return errors?.[field];
}

export function EnquiryForm() {
  const startedAtRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState(
    submitEnquiry,
    initialState
  );
  const errors = state.status === "invalid" ? state.fieldErrors : undefined;

  // Set this after hydration; a server-render timestamp could be as old as the
  // static build and would make the timing check meaningless.
  useEffect(() => {
    if (startedAtRef.current !== null) {
      startedAtRef.current.value = String(Date.now());
    }
  }, []);

  return (
    <form action={formAction} noValidate>
      {/* TODO(design-agent): visually conceal this honeypot without making it keyboard-focusable. */}
      <div hidden aria-hidden="true">
        <label htmlFor="enquiry-website">Website</label>
        <input
          id="enquiry-website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>
      <input ref={startedAtRef} type="hidden" name="startedAt" defaultValue="" />

      <label htmlFor="enquiry-name">Name</label>
      <input
        id="enquiry-name"
        name="name"
        type="text"
        autoComplete="name"
        maxLength={100}
        aria-invalid={fieldError(errors, "name") ? true : undefined}
        aria-describedby={fieldError(errors, "name") ? "enquiry-name-error" : undefined}
        required
      />
      {fieldError(errors, "name") ? (
        <p id="enquiry-name-error">{fieldError(errors, "name")}</p>
      ) : null}

      <label htmlFor="enquiry-email">Email address</label>
      <input
        id="enquiry-email"
        name="email"
        type="email"
        autoComplete="email"
        maxLength={254}
        aria-invalid={fieldError(errors, "email") ? true : undefined}
        aria-describedby={fieldError(errors, "email") ? "enquiry-email-error" : undefined}
        required
      />
      {fieldError(errors, "email") ? (
        <p id="enquiry-email-error">{fieldError(errors, "email")}</p>
      ) : null}

      <label htmlFor="enquiry-message">Your question</label>
      <textarea
        id="enquiry-message"
        name="message"
        rows={6}
        maxLength={3_000}
        aria-invalid={fieldError(errors, "message") ? true : undefined}
        aria-describedby={fieldError(errors, "message") ? "enquiry-message-error" : undefined}
        required
      />
      {fieldError(errors, "message") ? (
        <p id="enquiry-message-error">{fieldError(errors, "message")}</p>
      ) : null}

      {state.status === "delivery-unavailable" ? (
        <p role="status">
          Online enquiry delivery is not connected yet. Your message has not
          been sent.
        </p>
      ) : null}

      <button type="submit" disabled={isPending}>
        {isPending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
