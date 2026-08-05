import { z } from "zod";

export const MIN_ENQUIRY_COMPLETION_MS = 1_500;

export const ENQUIRY_FIELDS = ["name", "email", "message"] as const;
export type EnquiryField = (typeof ENQUIRY_FIELDS)[number];

export interface EnquirySubmission {
  name: string;
  email: string;
  message: string;
}

export type EnquiryFieldErrors = Partial<Record<EnquiryField, string>>;

export type EnquiryActionState =
  | { status: "idle" }
  | { status: "invalid"; fieldErrors: EnquiryFieldErrors }
  | { status: "delivery-unavailable" };

export type EnquiryValidationResult =
  | { ok: true; data: EnquirySubmission }
  | {
      ok: false;
      reason: "invalid";
      fieldErrors: EnquiryFieldErrors;
    }
  | { ok: false; reason: "spam" };

const enquirySubmissionSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .max(254, "Email address is too long")
    .email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(1, "Enter your question")
    .max(3_000, "Message is too long"),
  website: z.string(),
  startedAt: z
    .union([z.string(), z.number()])
    .transform((value) => Number(value))
    .pipe(z.number().finite().int().positive()),
});

function visibleFieldErrors(error: z.ZodError): EnquiryFieldErrors {
  const fieldErrors: EnquiryFieldErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (
      (field === "name" || field === "email" || field === "message") &&
      fieldErrors[field] === undefined
    ) {
      fieldErrors[field] = issue.message;
    }
  }

  return fieldErrors;
}

/**
 * Validates the exact payload accepted by the enquiry action. There are no
 * health fields here: the website is not a clinical record system.
 */
export function validateEnquirySubmission(
  input: unknown,
  nowMs: number
): EnquiryValidationResult {
  const parsed = enquirySubmissionSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      reason: "invalid",
      fieldErrors: visibleFieldErrors(parsed.error),
    };
  }

  const elapsedMs = nowMs - parsed.data.startedAt;
  if (
    parsed.data.website.trim() !== "" ||
    elapsedMs < MIN_ENQUIRY_COMPLETION_MS
  ) {
    return { ok: false, reason: "spam" };
  }

  return {
    ok: true,
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      message: parsed.data.message,
    },
  };
}
