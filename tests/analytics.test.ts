import { describe, expect, it } from "vitest";
import {
  analyticsEventPayload,
  articleReadThresholdReached,
  parseAnalyticsConsent,
  parseGaMeasurementId,
} from "@/lib/analytics";

describe("analytics privacy boundary", () => {
  it("parses only an explicit stored consent choice", () => {
    expect(parseAnalyticsConsent("accepted")).toBe("accepted");
    expect(parseAnalyticsConsent("declined")).toBe("declined");
    expect(parseAnalyticsConsent(null)).toBeNull();
    expect(parseAnalyticsConsent("yes")).toBeNull();
  });

  it("accepts only a GA4 web measurement ID", () => {
    expect(parseGaMeasurementId("G-ABC123DEF4")).toBe("G-ABC123DEF4");
    expect(parseGaMeasurementId("UA-12345-1")).toBeNull();
    expect(parseGaMeasurementId("")).toBeNull();
    expect(parseGaMeasurementId(undefined)).toBeNull();
  });

  it("emits only the documented safe parameters for eligibility", () => {
    const event = {
      name: "eligibility_completed",
      outcome: "review-needed",
      bmi: 31.4,
      weightKg: 92,
      message: "private",
    } as const;

    expect(analyticsEventPayload(event)).toEqual({
      name: "eligibility_completed",
      parameters: { outcome: "review-needed" },
    });
  });

  it("emits allowlisted source pages and article slugs without extra data", () => {
    expect(
      analyticsEventPayload({
        name: "booking_handoff",
        sourcePage: "/am-i-eligible?weight=90",
      })
    ).toEqual({
      name: "booking_handoff",
      parameters: { source_page: "/am-i-eligible" },
    });
    expect(
      analyticsEventPayload({
        name: "article_read",
        slug: "keeping-weight-off-after-stopping",
      })
    ).toEqual({
      name: "article_read",
      parameters: { slug: "keeping-weight-off-after-stopping" },
    });
  });

  it("fires an article-read threshold at 75% of the document", () => {
    expect(
      articleReadThresholdReached({
        scrollTop: 499,
        viewportHeight: 1_000,
        documentHeight: 2_000,
      })
    ).toBe(false);
    expect(
      articleReadThresholdReached({
        scrollTop: 500,
        viewportHeight: 1_000,
        documentHeight: 2_000,
      })
    ).toBe(true);
  });
});
