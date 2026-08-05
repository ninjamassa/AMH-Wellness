"use server";

import type { EnquiryActionState } from "@/lib/enquiry";
import { validateEnquirySubmission } from "@/lib/enquiry";

/**
 * The validation and anti-spam boundary for general enquiries. Delivery is
 * deliberately left to the integrations phase; returning an unavailable state
 * prevents the scaffold from claiming a message was sent when it was not.
 */
export async function submitEnquiry(
  _previousState: EnquiryActionState,
  formData: FormData
): Promise<EnquiryActionState> {
  const validation = validateEnquirySubmission(
    {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
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

  // TODO(integrations-agent): deliver validation.data without logging it.
  return { status: "delivery-unavailable" };
}
