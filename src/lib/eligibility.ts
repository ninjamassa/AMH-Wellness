import { siteConfig } from "./site-config";

/**
 * Akila's stated criteria: BMI over 30, or over 27 with at least one
 * weight-related condition. Pure functions, unit-tested, so the rule can't
 * drift between the form and anything that re-checks it later.
 *
 * Design note: nobody gets a dead end. A "no" still offers a route forward —
 * partly because it's the decent thing to do, partly because she may come back
 * in six months, and partly because Akila wants lead information either way.
 */

export interface EligibilityAnswers {
  heightCm: number;
  weightKg: number;
  age: number;
  ukResident: boolean;
  hasWeightRelatedCondition: boolean;
  /** Anything that needs a conversation rather than an automatic yes. */
  needsClinicalReview: boolean;
}

export type EligibilityStatus = "eligible" | "review-needed" | "not-eligible";

export interface EligibilityOutcome {
  status: EligibilityStatus;
  bmi: number;
  /** Headline shown to her. Written to be human, never clinical-cold. */
  headline: string;
  /** The explanation underneath. */
  detail: string;
  /** Where she goes next. Never nowhere. */
  nextStep: { label: string; href: string };
}

export function calculateBmi(heightCm: number, weightKg: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export function assessEligibility(answers: EligibilityAnswers): EligibilityOutcome {
  const { minAge, bmiThreshold, bmiThresholdWithCondition } = siteConfig.eligibility;
  const bmi = calculateBmi(answers.heightCm, answers.weightKg);

  if (answers.age < minAge) {
    return {
      status: "not-eligible",
      bmi,
      headline: "This service is for adults aged 18 and over",
      detail:
        "We're not able to treat under-18s. Your GP is the best place to start — they can talk you through options that are right for your age.",
      nextStep: { label: "Read our guidance instead", href: "/blog" },
    };
  }

  if (!answers.ukResident) {
    return {
      status: "not-eligible",
      bmi,
      headline: "We can only treat patients living in the UK",
      detail:
        "Our prescriptions are dispensed by a registered UK pharmacy, so we can only deliver within the UK.",
      nextStep: { label: "Read our guidance instead", href: "/blog" },
    };
  }

  if (answers.needsClinicalReview) {
    return {
      status: "review-needed",
      bmi,
      headline: "Let's have a conversation first",
      detail:
        "Based on your answers, Akila would like to talk through your health history with you before deciding whether this is the right service for you. That's a good sign, not a bad one — it's exactly the kind of thing that gets missed elsewhere.",
      nextStep: { label: "Send Akila a message", href: "/contact" },
    };
  }

  const threshold = answers.hasWeightRelatedCondition
    ? bmiThresholdWithCondition
    : bmiThreshold;

  if (bmi >= threshold) {
    return {
      status: "eligible",
      bmi,
      headline: "Good news — you're likely to be eligible",
      detail:
        "Your next step is a one-to-one video consultation with Akila. She'll go through your health history properly and you'll agree a plan together. Nothing is prescribed until that conversation has happened.",
      nextStep: { label: "Book your consultation", href: "/how-it-works" },
    };
  }

  return {
    status: "not-eligible",
    bmi,
    headline: "This service isn't the right fit right now",
    detail:
      "Treatment is licensed for a BMI of 30 and over, or 27 and over alongside a weight-related health condition. That doesn't mean there's nothing that would help — our nutrition guidance is free to read, and your GP can advise on other options.",
    nextStep: { label: "Read our nutrition guidance", href: "/blog/protein-and-nutrition-on-injections" },
  };
}
