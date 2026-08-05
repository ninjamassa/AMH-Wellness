const NEUTRAL_WHATSAPP_MESSAGE =
  "Hello, I have a general question about AMH Wellness.";

export function parseHostedBookingUrl(
  value: string | undefined
): string | null {
  if (value === undefined || value.trim() === "") return null;

  try {
    const url = new URL(value.trim());
    if (
      url.protocol !== "https:" ||
      url.username !== "" ||
      url.password !== ""
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

export function buildWhatsAppUrl({
  enabled,
  number,
}: {
  enabled: boolean;
  number: string;
}): string | null {
  if (!enabled) return null;

  const digits = number.replace(/\D/g, "");
  if (!/^\d{8,15}$/.test(digits)) return null;

  const url = new URL(`https://wa.me/${digits}`);
  url.searchParams.set("text", NEUTRAL_WHATSAPP_MESSAGE);
  return url.toString();
}
