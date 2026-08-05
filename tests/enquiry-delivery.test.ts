import { describe, expect, it, vi } from "vitest";
import {
  deliverEnquiryContact,
  resendConfigFromEnvironment,
} from "@/lib/enquiry-delivery";

const contact = {
  name: "A Patient",
  email: "patient@example.com",
};

const config = {
  apiKey: "test-api-key",
  fromAddress: "website@amhwellness.co.uk",
  toAddress: "admin@amhwellness.co.uk",
};

describe("enquiry delivery configuration", () => {
  it("stays disabled until every server-side Resend setting is present", () => {
    expect(resendConfigFromEnvironment({})).toBeNull();
    expect(
      resendConfigFromEnvironment({
        RESEND_API_KEY: "secret",
        ENQUIRY_FROM_ADDRESS: "not-an-email",
        ENQUIRY_TO_ADDRESS: "admin@amhwellness.co.uk",
      })
    ).toBeNull();
    expect(
      resendConfigFromEnvironment({
        RESEND_API_KEY: "secret",
        ENQUIRY_FROM_ADDRESS: "website@amhwellness.co.uk",
        ENQUIRY_TO_ADDRESS: "admin@amhwellness.co.uk",
      })
    ).toEqual({
      apiKey: "secret",
      fromAddress: "website@amhwellness.co.uk",
      toAddress: "admin@amhwellness.co.uk",
    });
  });
});

describe("Resend enquiry adapter", () => {
  it("sends only contact details, never an unexpected free-text field", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    const unsafeInput = {
      ...contact,
      message: "I am taking medication and weigh 90kg.",
    };

    const result = await deliverEnquiryContact(unsafeInput, config, {
      fetcher,
      idempotencyKey: "enquiry/test-request",
    });

    expect(result).toEqual({ ok: true });
    expect(fetcher).toHaveBeenCalledOnce();
    const [url, init] = fetcher.mock.calls[0] ?? [];
    expect(url).toBe("https://api.resend.com/emails");
    const request = init as RequestInit;
    expect(request.method).toBe("POST");
    expect(request.signal).toBeInstanceOf(AbortSignal);
    const body = String(request.body);
    expect(body).toContain("A Patient");
    expect(body).toContain("patient@example.com");
    expect(body).not.toContain("medication");
    expect(body).not.toContain("90kg");
  });

  it("returns a graceful provider failure without exposing response content", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(new Response("provider detail", { status: 429 }));

    await expect(
      deliverEnquiryContact(contact, config, { fetcher })
    ).resolves.toEqual({ ok: false, reason: "provider-error" });
  });

  it("aborts a slow external call and returns a graceful timeout", async () => {
    const fetcher = vi.fn(
      (_url: string | URL | Request, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            reject(new DOMException("Timed out", "AbortError"));
          });
        })
    );

    await expect(
      deliverEnquiryContact(contact, config, { fetcher, timeoutMs: 5 })
    ).resolves.toEqual({ ok: false, reason: "timeout" });
  });
});
