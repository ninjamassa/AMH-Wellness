"use server";

import type { EnquiryActionState } from "@/lib/enquiry";
import { validateEnquirySubmission } from "@/lib/enquiry";
import {
  deliverEnquiryContact,
  resendConfigFromEnvironment,
} from "@/lib/enquiry-delivery";

/**
 * The validation and anti-spam boundary for contact requests. The external
 * provider receives only name and email; free text and health data are not part
 * of this action's contract and are never logged.
 */
export async function submitEnquiry(
  _previousState: EnquiryActionState,
  formData: FormData
): Promise<EnquiryActionState> {
  const validation = validateEnquirySubmission(
    {
      name: formData.get("name"),
      email: formData.get("email"),
      website: formData.get("website"),
      startedAt: formData.get("startedAt"),
    },
    Date.now()
  );

  if (!validation.ok) {
    if (validation.reason === "invalid") {
      return {
        status: "invalid",
        fieldErrors: validation.fieldErrors,
      };
    }

    // Do not reveal which anti-spam check was triggered.
    return { status: "delivery-unavailable" };
  }

  // TODO(human): Confirm Resend, verify the sending domain, and provide both
  // mailbox addresses before treating online contact delivery as available.
  const config = resendConfigFromEnvironment(process.env);
  if (config === null) return { status: "delivery-unavailable" };

  const delivery = await deliverEnquiryContact(validation.data, config);
  return delivery.ok
    ? { status: "success" }
    : { status: "delivery-unavailable" };
}
