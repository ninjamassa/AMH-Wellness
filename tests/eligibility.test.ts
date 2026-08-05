import { describe, expect, it } from "vitest";
import { assessEligibility, calculateBmi } from "@/lib/eligibility";

const base = {
  heightCm: 170,
  weightKg: 90,
  age: 40,
  ukResident: true,
  hasWeightRelatedCondition: false,
  needsClinicalReview: false,
};

describe("calculateBmi", () => {
  it("computes BMI to one decimal place", () => {
    expect(calculateBmi(170, 90)).toBe(31.1);
  });

  it("returns 0 for invalid input rather than NaN or Infinity", () => {
    expect(calculateBmi(0, 90)).toBe(0);
    expect(calculateBmi(170, 0)).toBe(0);
  });
});

describe("assessEligibility", () => {
  it("passes an adult UK resident above BMI 30", () => {
    expect(assessEligibility(base).status).toBe("eligible");
  });

  it("applies the lower threshold when a weight-related condition is present", () => {
    const answers = { ...base, weightKg: 80, hasWeightRelatedCondition: true };
    expect(calculateBmi(170, 80)).toBe(27.7);
    expect(assessEligibility(answers).status).toBe("eligible");
  });

  it("declines the same BMI without a weight-related condition", () => {
    expect(assessEligibility({ ...base, weightKg: 80 }).status).toBe("not-eligible");
  });

  it("declines under-18s", () => {
    expect(assessEligibility({ ...base, age: 17 }).status).toBe("not-eligible");
  });

  it("declines non-UK residents", () => {
    expect(assessEligibility({ ...base, ukResident: false }).status).toBe("not-eligible");
  });

  it("routes clinical flags to a conversation rather than an auto-decline", () => {
    expect(assessEligibility({ ...base, needsClinicalReview: true }).status).toBe(
      "review-needed"
    );
  });

  /**
   * Akila does not want people who feel dismissed. Every outcome, including the
   * declines, must offer somewhere to go next — this is a product rule, so it
   * gets a test.
   */
  it("never leaves anyone at a dead end", () => {
    const cases = [
      base,
      { ...base, age: 17 },
      { ...base, ukResident: false },
      { ...base, weightKg: 80 },
      { ...base, needsClinicalReview: true },
    ];
    for (const answers of cases) {
      const outcome = assessEligibility(answers);
      expect(outcome.nextStep.href.length).toBeGreaterThan(1);
      expect(outcome.nextStep.label.length).toBeGreaterThan(0);
      expect(outcome.headline.length).toBeGreaterThan(0);
      expect(outcome.detail.length).toBeGreaterThan(0);
    }
  });

  it("never phrases a decline as a personal failing", () => {
    const harsh = /\b(you failed|too heavy|not heavy enough|rejected|denied|unqualified)\b/i;
    const outcome = assessEligibility({ ...base, weightKg: 80 });
    expect(harsh.test(outcome.headline + outcome.detail)).toBe(false);
  });
});
