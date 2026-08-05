import { describe, expect, it } from "vitest";
import {
  MIN_ENQUIRY_COMPLETION_MS,
  validateEnquirySubmission,
} from "@/lib/enquiry";

const startedAt = 1_000_000;
const now = startedAt + MIN_ENQUIRY_COMPLETION_MS;
const validSubmission = {
  name: "  A Patient  ",
  email: "  patient@example.com  ",
  website: "",
  startedAt: String(startedAt),
};

describe("enquiry validation", () => {
  it("accepts and trims the two contact-request fields", () => {
    const result = validateEnquirySubmission(validSubmission, now);

    expect(result).toEqual({
      ok: true,
      data: {
        name: "A Patient",
        email: "patient@example.com",
      },
    });
  });

  it("returns typed field errors for invalid visible fields", () => {
    const result = validateEnquirySubmission(
      { ...validSubmission, name: "", email: "not-an-email" },
      now
    );

    expect(result.ok).toBe(false);
    if (!result.ok && result.reason === "invalid") {
      expect(result.fieldErrors.name).toBeTruthy();
      expect(result.fieldErrors.email).toBeTruthy();
    }
  });

  it("does not copy an unexpected free-text field into the validated payload", () => {
    const result = validateEnquirySubmission(
      {
        ...validSubmission,
        message: "Health information must not be delivered by email.",
      },
      now
    );

    expect(result).toEqual({
      ok: true,
      data: {
        name: "A Patient",
        email: "patient@example.com",
      },
    });
  });

  it("treats a filled honeypot as spam", () => {
    expect(
      validateEnquirySubmission({ ...validSubmission, website: "bot" }, now)
    ).toEqual({ ok: false, reason: "spam" });
  });

  it("treats implausibly fast and future-dated submissions as spam", () => {
    expect(
      validateEnquirySubmission(
        validSubmission,
        startedAt + MIN_ENQUIRY_COMPLETION_MS - 1
      )
    ).toEqual({ ok: false, reason: "spam" });

    expect(
      validateEnquirySubmission(
        { ...validSubmission, startedAt: String(now + 1) },
        now
      )
    ).toEqual({ ok: false, reason: "spam" });
  });

  it("rejects missing anti-spam metadata without throwing", () => {
    const result = validateEnquirySubmission(
      { ...validSubmission, startedAt: null },
      now
    );

    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.reason).toBe("invalid");
  });
});
