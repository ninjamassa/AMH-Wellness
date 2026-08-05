import { describe, expect, it } from "vitest";
import {
  createEmptyEligibilityDraft,
  eligibilityAnswersFromDraft,
  eligibilityStepErrors,
  isEligibilityStepComplete,
} from "@/lib/eligibility-flow";

const completeDraft = {
  age: "40",
  ukResident: true,
  heightCm: "170",
  weightKg: "90",
  hasWeightRelatedCondition: false,
  needsClinicalReview: false,
} as const;

describe("eligibility flow state", () => {
  it("starts with no answers selected", () => {
    expect(createEmptyEligibilityDraft()).toEqual({
      age: "",
      ukResident: null,
      heightCm: "",
      weightKg: "",
      hasWeightRelatedCondition: null,
      needsClinicalReview: null,
    });
  });

  it("only completes a step once its minimum answers are present", () => {
    const empty = createEmptyEligibilityDraft();

    expect(isEligibilityStepComplete("about-you", empty)).toBe(false);
    expect(
      isEligibilityStepComplete("about-you", {
        ...empty,
        age: "40",
        ukResident: true,
      })
    ).toBe(true);

    expect(isEligibilityStepComplete("measurements", empty)).toBe(false);
    expect(
      isEligibilityStepComplete("measurements", {
        ...empty,
        heightCm: "170",
        weightKg: "90",
      })
    ).toBe(true);

    expect(isEligibilityStepComplete("health-context", empty)).toBe(false);
    expect(
      isEligibilityStepComplete("health-context", {
        ...empty,
        hasWeightRelatedCondition: false,
        needsClinicalReview: false,
      })
    ).toBe(true);
  });

  it("returns field-specific errors for the current incomplete step", () => {
    const empty = createEmptyEligibilityDraft();

    expect(eligibilityStepErrors("about-you", empty)).toEqual({
      age: "Enter your age as a whole number.",
      ukResident: "Choose yes or no.",
    });
    expect(
      eligibilityStepErrors("measurements", {
        ...empty,
        heightCm: "170",
      })
    ).toEqual({ weightKg: "Enter your weight in kilograms." });
    expect(
      eligibilityStepErrors("health-context", {
        ...empty,
        hasWeightRelatedCondition: false,
      })
    ).toEqual({ needsClinicalReview: "Choose yes or no." });
  });

  it("converts a complete draft into the existing eligibility contract", () => {
    expect(eligibilityAnswersFromDraft(completeDraft)).toEqual({
      age: 40,
      ukResident: true,
      heightCm: 170,
      weightKg: 90,
      hasWeightRelatedCondition: false,
      needsClinicalReview: false,
    });
  });

  it("rejects incomplete or invalid numeric answers", () => {
    expect(
      eligibilityAnswersFromDraft({ ...completeDraft, heightCm: "" })
    ).toBeNull();
    expect(
      eligibilityAnswersFromDraft({ ...completeDraft, weightKg: "0" })
    ).toBeNull();
    expect(
      eligibilityAnswersFromDraft({ ...completeDraft, age: "17.5" })
    ).toBeNull();
    expect(
      eligibilityAnswersFromDraft({ ...completeDraft, age: "not-a-number" })
    ).toBeNull();
  });
});
