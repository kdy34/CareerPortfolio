import type { ContactInput } from "./contact";

/** True when every value needed to send real email is present. */
export function isEmailConfigured() {
  return Boolean(
    process.env.CONTACT_PROVIDER === "resend" &&
      process.env.RESEND_API_KEY &&
      process.env.CONTACT_FROM_EMAIL &&
      process.env.CONTACT_TO_EMAIL,
  );
}

/** Development-only mock: accepts messages without sending them. Never active in production. */
export function isDevMock() {
  return process.env.NODE_ENV !== "production" && process.env.CONTACT_DEV_MOCK === "true";
}

export function contactAvailability(): "live" | "mock" | "unavailable" {
  if (isEmailConfigured()) return "live";
  if (isDevMock()) return "mock";
  return "unavailable";
}

function oneLine(v: string) {
  return v.replace(/[\r\n\t]+/g, " ").slice(0, 120);
}

/** Plain-text email. User content is never interpolated into HTML. */
export function buildEmail(input: ContactInput) {
  const subject = `[Portfolio] Message from ${oneLine(input.name)}`;
  const text = [
    `Name: ${oneLine(input.name)}`,
    `Email: ${input.email}`,
    "",
    input.message,
    "",
    "Sent from the contact form on your portfolio. Reply directly to respond.",
  ].join("\n");
  return { subject, text };
}

export async function sendWithResend(input: ContactInput): Promise<{ ok: boolean; status: number }> {
  const { subject, text } = buildEmail(input);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: input.email,
      subject,
      text,
    }),
    cache: "no-store",
  });
  return { ok: res.ok, status: res.status };
}
