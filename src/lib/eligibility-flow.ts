import type { EligibilityAnswers } from "./eligibility";

export const ELIGIBILITY_STEPS = [
  "about-you",
  "measurements",
  "health-context",
] as const;

export type EligibilityStep = (typeof ELIGIBILITY_STEPS)[number];

/**
 * Browser-only form state. Numeric inputs remain strings while someone is
 * typing so clearing an input never turns into an accidental zero.
 */
export interface EligibilityDraft {
  age: string;
  ukResident: boolean | null;
  heightCm: string;
  weightKg: string;
  hasWeightRelatedCondition: boolean | null;
  needsClinicalReview: boolean | null;
}

export type EligibilityField = keyof EligibilityDraft;
export type EligibilityStepErrors = Partial<Record<EligibilityField, string>>;

export function createEmptyEligibilityDraft(): EligibilityDraft {
  return {
    age: "",
    ukResident: null,
    heightCm: "",
    weightKg: "",
    hasWeightRelatedCondition: null,
    needsClinicalReview: null,
  };
}

function positiveNumber(value: string): number | null {
  if (value.trim() === "") return null;

  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

function positiveInteger(value: string): number | null {
  const number = positiveNumber(value);
  return number !== null && Number.isInteger(number) ? number : null;
}

export function isEligibilityStepComplete(
  step: EligibilityStep,
  draft: EligibilityDraft
): boolean {
  switch (step) {
    case "about-you":
      return positiveInteger(draft.age) !== null && draft.ukResident !== null;
    case "measurements":
      return (
        positiveNumber(draft.heightCm) !== null &&
        positiveNumber(draft.weightKg) !== null
      );
    case "health-context":
      return (
        draft.hasWeightRelatedCondition !== null &&
        draft.needsClinicalReview !== null
      );
  }
}

/**
 * Patient-facing validation for the currently visible step. Keeping this pure
 * makes the inline messages consistent with the completeness gate without
 * duplicating or changing any clinical eligibility rule.
 */
export function eligibilityStepErrors(
  step: EligibilityStep,
  draft: EligibilityDraft
): EligibilityStepErrors {
  const errors: EligibilityStepErrors = {};

  switch (step) {
    case "about-you":
      if (positiveInteger(draft.age) === null) {
        errors.age = "Enter your age as a whole number.";
      }
      if (draft.ukResident === null) {
        errors.ukResident = "Choose yes or no.";
      }
      return errors;
    case "measurements":
      if (positiveNumber(draft.heightCm) === null) {
        errors.heightCm = "Enter your height in centimetres.";
      }
      if (positiveNumber(draft.weightKg) === null) {
        errors.weightKg = "Enter your weight in kilograms.";
      }
      return errors;
    case "health-context":
      if (draft.hasWeightRelatedCondition === null) {
        errors.hasWeightRelatedCondition = "Choose yes or no.";
      }
      if (draft.needsClinicalReview === null) {
        errors.needsClinicalReview = "Choose yes or no.";
      }
      return errors;
  }
}

/**
 * Converts transient input state into the existing pure eligibility contract.
 * Returning null keeps invalid drafts away from assessEligibility entirely.
 */
export function eligibilityAnswersFromDraft(
  draft: EligibilityDraft
): EligibilityAnswers | null {
  if (
    !ELIGIBILITY_STEPS.every((step) =>
      isEligibilityStepComplete(step, draft)
    )
  ) {
    return null;
  }

  const age = positiveInteger(draft.age);
  const heightCm = positiveNumber(draft.heightCm);
  const weightKg = positiveNumber(draft.weightKg);

  if (
    age === null ||
    heightCm === null ||
    weightKg === null ||
    draft.ukResident === null ||
    draft.hasWeightRelatedCondition === null ||
    draft.needsClinicalReview === null
  ) {
    return null;
  }

  return {
    age,
    ukResident: draft.ukResident,
    heightCm,
    weightKg,
    hasWeightRelatedCondition: draft.hasWeightRelatedCondition,
    needsClinicalReview: draft.needsClinicalReview,
  };
}
