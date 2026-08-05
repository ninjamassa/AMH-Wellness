import { describe, expect, it } from "vitest";
import {
  analyticsPageViewPayload,
  analyticsRevocationPlan,
  analyticsEventPayload,
  articleReadThresholdReached,
  googleTagConfig,
  parseAnalyticsConsent,
  parseGaMeasurementId,
  sanitiseAnalyticsPath,
  shouldReloadAfterAnalyticsWithdrawal,
  writeAnalyticsConsent,
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

  it("disables automatic page views and supplies only a sanitised location", () => {
    expect(
      googleTagConfig({
        pathname: "/contact?weight=90#private",
        origin: "https://amhwellness.co.uk/?campaign=private",
      })
    ).toEqual({
      allow_ad_personalization_signals: false,
      allow_google_signals: false,
      cookie_domain: "none",
      ignore_referrer: true,
      page_location: "https://amhwellness.co.uk/contact",
      page_referrer: "",
      send_page_view: false,
    });
  });

  it("builds page views from pathnames without query, hash or external referrer", () => {
    expect(
      analyticsPageViewPayload({
        pathname: "/mounjaro?dose=unknown#answer",
        previousPath: "/contact?message=private",
        origin: "https://amhwellness.co.uk",
      })
    ).toEqual({
      page_location: "https://amhwellness.co.uk/mounjaro",
      page_referrer: "https://amhwellness.co.uk/contact",
    });
    expect(
      analyticsPageViewPayload({
        pathname: "/support-after-injections",
        origin: "https://amhwellness.co.uk",
      })
    ).toEqual({
      page_location: "https://amhwellness.co.uk/support-after-injections",
      page_referrer: "",
    });
    expect(sanitiseAnalyticsPath("//tracker.example/private")).toBe("/");
    expect(sanitiseAnalyticsPath("javascript:private")).toBe("/");
  });

  it("builds an explicit denied revocation plan for GA identifiers only", () => {
    expect(
      analyticsRevocationPlan(
        "G-ABC123DEF4",
        "_ga=one; session=keep; _ga_ABC123=two; _ga=duplicate"
      )
    ).toEqual({
      consent: {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      },
      cookieNames: ["_ga", "_ga_ABC123"],
      disableProperty: "ga-disable-G-ABC123DEF4",
    });
  });

  it("does not reload into stale acceptance when an opt-out cannot be stored", () => {
    let storedChoice: string | null = "accepted";
    const storage = {
      setItem() {
        throw new Error("storage unavailable");
      },
      removeItem() {
        storedChoice = null;
      },
    };

    const persisted = writeAnalyticsConsent(storage, "declined");

    expect(persisted).toBe(false);
    expect(storedChoice).toBeNull();
    expect(
      shouldReloadAfterAnalyticsWithdrawal({
        currentChoice: "accepted",
        nextChoice: "declined",
        persisted,
      })
    ).toBe(false);
    expect(
      shouldReloadAfterAnalyticsWithdrawal({
        currentChoice: "accepted",
        nextChoice: "declined",
        persisted: true,
      })
    ).toBe(true);
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
