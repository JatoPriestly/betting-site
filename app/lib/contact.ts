/** Single source for the admin WhatsApp contact used by the payout CTAs. */
export const WHATSAPP_NUMBER = "+237654720955";

/** Builds a wa.me deep link with a pre-filled (already localised) message. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}?text=${encodeURIComponent(message)}`;
}
