"use client";

import { useRef, useState, type FormEvent } from "react";
import { BookingHandoff } from "@/components/integrations/BookingHandoff";
import {
  EligibilityProgress,
  EligibilityStepFields,
} from "@/components/forms/EligibilityFields";
import { Button, buttonClassName } from "@/components/ui/Button";
import type { EligibilityOutcome } from "@/lib/eligibility";
import { assessEligibility } from "@/lib/eligibility";
import {
  createEmptyEligibilityDraft,
  eligibilityAnswersFromDraft,
  eligibilityStepErrors,
  ELIGIBILITY_STEPS,
  isEligibilityStepComplete,
  type EligibilityDraft,
} from "@/lib/eligibility-flow";
import { trackAnalyticsEvent } from "@/lib/analytics";

type NumericField = "age" | "heightCm" | "weightKg";
type BooleanField =
  | "ukResident"
  | "hasWeightRelatedCondition"
  | "needsClinicalReview";

export interface EligibilityFlowProps {
  relatedConditions: readonly string[];
  bookingUrl: string | null;
}

const outcomeStyles: Record<EligibilityOutcome["status"], string> = {
  eligible: "border-teal-200 bg-teal-50",
  "review-needed": "border-indigo-200 bg-indigo-50",
  "not-eligible": "border-sand-200 bg-white",
};

export function EligibilityFlow({
  relatedConditions,
  bookingUrl,
}: EligibilityFlowProps) {
  const hasTrackedStart = useRef(false);
  const [draft, setDraft] = useState<EligibilityDraft>(() =>
    createEmptyEligibilityDraft()
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [outcome, setOutcome] = useState<EligibilityOutcome | null>(null);
  const step = ELIGIBILITY_STEPS[stepIndex] ?? "about-you";
  const errors = eligibilityStepErrors(step, draft);

  function trackStartOnce() {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackAnalyticsEvent({ name: "eligibility_started" });
  }

  function updateNumericField(field: NumericField, value: string) {
    trackStartOnce();
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function updateBooleanField(field: BooleanField, value: boolean) {
    trackStartOnce();
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isEligibilityStepComplete(step, draft)) {
      setShowErrors(true);
      return;
    }

    const isLastStep = stepIndex === ELIGIBILITY_STEPS.length - 1;
    if (!isLastStep) {
      setShowErrors(false);
      setStepIndex((current) => current + 1);
      return;
    }

    const answers = eligibilityAnswersFromDraft(draft);
    if (answers !== null) {
      const nextOutcome = assessEligibility(answers);
      setOutcome(nextOutcome);
      trackAnalyticsEvent({
        name: "eligibility_completed",
        outcome: nextOutcome.status,
      });
    }
  }

  function startAgain() {
    setDraft(createEmptyEligibilityDraft());
    setStepIndex(0);
    setShowErrors(false);
    setOutcome(null);
  }

  if (outcome !== null) {
    return (
      <section
        aria-live="polite"
        aria-labelledby="eligibility-result"
        className={`rounded-card border p-6 shadow-card sm:p-9 ${outcomeStyles[outcome.status]}`}
      >
        <p className="text-sm font-semibold text-teal-700">Your eligibility check</p>
        <h2 id="eligibility-result" className="mt-2 text-h2">{outcome.headline}</h2>
        <p className="mt-5 font-semibold text-ink-700">Your calculated BMI is {outcome.bmi}.</p>
        <p className="mt-3 max-w-reading text-ink-500">{outcome.detail}</p>
        {outcome.status === "eligible" && bookingUrl === null ? (
          <p className="mt-4 rounded-control border border-indigo-200 bg-white/70 px-4 py-3 text-sm text-indigo-700">
            Online booking is being connected. You can ask Akila to contact you
            without sending health information through this website.
          </p>
        ) : null}
        <div className="mt-7 flex flex-wrap gap-4">
          {outcome.status === "eligible" ? (
            bookingUrl === null ? (
              <Button href="/contact">Ask Akila to contact you</Button>
            ) : (
              <BookingHandoff
                bookingUrl={bookingUrl}
                sourcePage="/am-i-eligible"
              />
            )
          ) : (
            <Button href={outcome.nextStep.href}>{outcome.nextStep.label}</Button>
          )}
          <button type="button" onClick={startAgain} className={buttonClassName("ghost")}>
            Start again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="eligibility-check-heading"
      className="mx-auto max-w-2xl rounded-card border border-sand-200 bg-white p-6 shadow-card sm:p-9"
    >
      <h2 id="eligibility-check-heading" className="text-h2">Eligibility check</h2>
      <p className="mt-2 text-sm text-ink-500" aria-live="polite">
        Step {stepIndex + 1} of {ELIGIBILITY_STEPS.length}
      </p>
      <div className="mt-6">
        <EligibilityProgress step={step} />
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-10">
        <EligibilityStepFields
          step={step}
          draft={draft}
          errors={errors}
          showErrors={showErrors}
          relatedConditions={relatedConditions}
          onNumericChange={updateNumericField}
          onBooleanChange={updateBooleanField}
        />

        <div className="mt-9 flex flex-wrap-reverse justify-end gap-3 border-t border-sand-200 pt-6">
          {stepIndex > 0 ? (
            <button
              type="button"
              onClick={() => {
                setShowErrors(false);
                setStepIndex((current) => current - 1);
              }}
              className={buttonClassName("ghost")}
            >
              Back
            </button>
          ) : null}
          <button type="submit" className={buttonClassName("primary")}>
            {stepIndex === ELIGIBILITY_STEPS.length - 1 ? "See my result" : "Continue"}
          </button>
        </div>
      </form>
    </section>
  );
}
