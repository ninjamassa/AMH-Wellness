import { describe, expect, it } from "vitest";
import {
  buildWhatsAppUrl,
  parseHostedBookingUrl,
} from "@/lib/integrations";

describe("hosted integration configuration", () => {
  it("accepts only an HTTPS hosted booking URL without credentials", () => {
    expect(
      parseHostedBookingUrl("https://booking.example.com/amh")
    ).toBe("https://booking.example.com/amh");
    expect(parseHostedBookingUrl("http://booking.example.com/amh")).toBeNull();
    expect(parseHostedBookingUrl("javascript:alert(1)")).toBeNull();
    expect(
      parseHostedBookingUrl("https://user:secret@booking.example.com/amh")
    ).toBeNull();
    expect(parseHostedBookingUrl(undefined)).toBeNull();
  });
});

describe("WhatsApp boundary", () => {
  it("returns no link while the operational flag is off", () => {
    expect(
      buildWhatsAppUrl({
        enabled: false,
        number: "447521565393",
      })
    ).toBeNull();
  });

  it("builds an HTTPS wa.me link with a neutral message when enabled", () => {
    const url = buildWhatsAppUrl({
      enabled: true,
      number: "+44 7521 565393",
    });

    expect(url).not.toBeNull();
    const parsed = new URL(url ?? "https://invalid.example");
    expect(parsed.origin).toBe("https://wa.me");
    expect(parsed.pathname).toBe("/447521565393");
    expect(parsed.searchParams.get("text")).toBe(
      "Hello, I have a general question about AMH Wellness."
    );
  });
});
