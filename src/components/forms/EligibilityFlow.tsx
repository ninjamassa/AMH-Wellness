"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import type { EligibilityOutcome } from "@/lib/eligibility";
import { assessEligibility } from "@/lib/eligibility";
import {
  createEmptyEligibilityDraft,
  eligibilityAnswersFromDraft,
  ELIGIBILITY_STEPS,
  isEligibilityStepComplete,
  type EligibilityDraft,
} from "@/lib/eligibility-flow";

type NumericField = "age" | "heightCm" | "weightKg";
type BooleanField =
  | "ukResident"
  | "hasWeightRelatedCondition"
  | "needsClinicalReview";

export interface EligibilityFlowProps {
  relatedConditions: readonly string[];
}

interface BooleanQuestionProps {
  name: BooleanField;
  legend: string;
  value: boolean | null;
  onChange: (field: BooleanField, value: boolean) => void;
  description?: string;
}

function BooleanQuestion({
  name,
  legend,
  value,
  onChange,
  description,
}: BooleanQuestionProps) {
  const descriptionId = description ? `${name}-description` : undefined;

  return (
    <fieldset aria-describedby={descriptionId}>
      <legend>{legend}</legend>
      {description ? <p id={descriptionId}>{description}</p> : null}
      <label>
        <input
          type="radio"
          name={name}
          checked={value === true}
          onChange={() => onChange(name, true)}
          required
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          name={name}
          checked={value === false}
          onChange={() => onChange(name, false)}
          required
        />
        No
      </label>
    </fieldset>
  );
}

export function EligibilityFlow({ relatedConditions }: EligibilityFlowProps) {
  const [draft, setDraft] = useState<EligibilityDraft>(() =>
    createEmptyEligibilityDraft()
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [outcome, setOutcome] = useState<EligibilityOutcome | null>(null);
  const step = ELIGIBILITY_STEPS[stepIndex] ?? "about-you";
  const isComplete = isEligibilityStepComplete(step, draft);

  function updateNumericField(field: NumericField, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function updateBooleanField(field: BooleanField, value: boolean) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isComplete) return;

    const isLastStep = stepIndex === ELIGIBILITY_STEPS.length - 1;
    if (!isLastStep) {
      setStepIndex((current) => current + 1);
      return;
    }

    const answers = eligibilityAnswersFromDraft(draft);
    if (answers !== null) setOutcome(assessEligibility(answers));
  }

  function startAgain() {
    setDraft(createEmptyEligibilityDraft());
    setStepIndex(0);
    setOutcome(null);
  }

  if (outcome !== null) {
    return (
      <section aria-live="polite" aria-labelledby="eligibility-result">
        <h2 id="eligibility-result">{outcome.headline}</h2>
        <p>Your calculated BMI is {outcome.bmi}.</p>
        <p>{outcome.detail}</p>
        <Button href={outcome.nextStep.href}>{outcome.nextStep.label}</Button>
        <button type="button" onClick={startAgain}>
          Start again
        </button>
      </section>
    );
  }

  return (
    <section aria-labelledby="eligibility-check-heading">
      <h2 id="eligibility-check-heading">Eligibility check</h2>
      <p aria-live="polite">
        Step {stepIndex + 1} of {ELIGIBILITY_STEPS.length}
      </p>

      {/* TODO(content-agent): refine the form labels without adding fields. */}
      <form onSubmit={handleSubmit}>
        {step === "about-you" ? (
          <fieldset>
            <legend>About you</legend>
            <label htmlFor="eligibility-age">Age</label>
            <input
              id="eligibility-age"
              name="age"
              type="number"
              inputMode="numeric"
              min="1"
              step="1"
              value={draft.age}
              onChange={(event) => updateNumericField("age", event.target.value)}
              required
            />
            <BooleanQuestion
              name="ukResident"
              legend="Do you live in the UK?"
              value={draft.ukResident}
              onChange={updateBooleanField}
            />
          </fieldset>
        ) : null}

        {step === "measurements" ? (
          <fieldset>
            <legend>Your measurements</legend>
            <label htmlFor="eligibility-height">Height in centimetres</label>
            <input
              id="eligibility-height"
              name="heightCm"
              type="number"
              inputMode="decimal"
              min="1"
              step="0.1"
              value={draft.heightCm}
              onChange={(event) =>
                updateNumericField("heightCm", event.target.value)
              }
              required
            />
            <label htmlFor="eligibility-weight">Weight in kilograms</label>
            <input
              id="eligibility-weight"
              name="weightKg"
              type="number"
              inputMode="decimal"
              min="1"
              step="0.1"
              value={draft.weightKg}
              onChange={(event) =>
                updateNumericField("weightKg", event.target.value)
              }
              required
            />
          </fieldset>
        ) : null}

        {step === "health-context" ? (
          <fieldset>
            <legend>Health context</legend>
            <BooleanQuestion
              name="hasWeightRelatedCondition"
              legend="Do you have a weight-related health condition?"
              description={`Examples include ${relatedConditions.join(", ")}.`}
              value={draft.hasWeightRelatedCondition}
              onChange={updateBooleanField}
            />
            <BooleanQuestion
              name="needsClinicalReview"
              /* TODO(human): Akila must confirm this clinical-review question and its triggers before launch. */
              legend="Is there anything in your health history you would like Akila to review before you book?"
              value={draft.needsClinicalReview}
              onChange={updateBooleanField}
            />
          </fieldset>
        ) : null}

        {stepIndex > 0 ? (
          <button
            type="button"
            onClick={() => setStepIndex((current) => current - 1)}
          >
            Back
          </button>
        ) : null}
        <button type="submit" disabled={!isComplete}>
          {stepIndex === ELIGIBILITY_STEPS.length - 1
            ? "See my result"
            : "Continue"}
        </button>
      </form>
    </section>
  );
}
