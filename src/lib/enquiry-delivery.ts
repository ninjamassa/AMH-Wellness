import { z } from "zod";
import type { EnquirySubmission } from "@/lib/enquiry";

const RESEND_EMAIL_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_TIMEOUT_MS = 5_000;

export interface ResendEnquiryConfig {
  apiKey: string;
  fromAddress: string;
  toAddress: string;
}

export type EnquiryDeliveryResult =
  | { ok: true }
  | { ok: false; reason: "provider-error" | "timeout" };

type Fetcher = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;

interface DeliveryOptions {
  fetcher?: Fetcher;
  idempotencyKey?: string;
  timeoutMs?: number;
}

const resendEnvironmentSchema = z.object({
  RESEND_API_KEY: z.string().trim().min(1),
  ENQUIRY_FROM_ADDRESS: z.string().trim().email(),
  ENQUIRY_TO_ADDRESS: z.string().trim().email(),
});

/**
 * Returns no configuration unless the provider key and both verified mailbox
 * addresses are present. Partial configuration must never look operational.
 */
export function resendConfigFromEnvironment(
  environment: Readonly<Record<string, string | undefined>>
): ResendEnquiryConfig | null {
  const parsed = resendEnvironmentSchema.safeParse(environment);
  if (!parsed.success) return null;

  return {
    apiKey: parsed.data.RESEND_API_KEY,
    fromAddress: parsed.data.ENQUIRY_FROM_ADDRESS,
    toAddress: parsed.data.ENQUIRY_TO_ADDRESS,
  };
}

/**
 * Sends a contact-request notification through Resend. Only name and email are
 * accepted by the contract. There is deliberately no arbitrary message field:
 * health-adjacent free text belongs in Semble, not email.
 */
export async function deliverEnquiryContact(
  contact: EnquirySubmission,
  config: ResendEnquiryConfig,
  options: DeliveryOptions = {}
): Promise<EnquiryDeliveryResult> {
  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const fetcher = options.fetcher ?? fetch;
  const idempotencyKey =
    options.idempotencyKey ?? `enquiry/${crypto.randomUUID()}`;

  try {
    const response = await fetcher(RESEND_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify({
        from: `AMH Wellness <${config.fromAddress}>`,
        to: [config.toAddress],
        reply_to: contact.email,
        subject: "New AMH Wellness contact request",
        text: [
          "A visitor has asked AMH Wellness to reply by email.",
          "",
          `Name: ${contact.name}`,
          `Email: ${contact.email}`,
          "",
          "No free-text message or health information was collected.",
        ].join("\n"),
      }),
      signal: controller.signal,
    });

    return response.ok
      ? { ok: true }
      : { ok: false, reason: "provider-error" };
  } catch (error: unknown) {
    if (
      controller.signal.aborted ||
      (error instanceof Error && error.name === "AbortError")
    ) {
      return { ok: false, reason: "timeout" };
    }

    return { ok: false, reason: "provider-error" };
  } finally {
    clearTimeout(timeout);
  }
}
