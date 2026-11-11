import type { ContactInput } from "./contact";

/**
 * Email delivery for the contact form.
 * - "ses" (default): Amazon SES v2 using the AWS SDK default credential chain
 *   (on AWS Amplify, the app's SSR compute role).
 * - "resend": Resend REST API, kept as an alternative.
 */
type Provider = "ses" | "resend";

function provider(): Provider {
  return process.env.CONTACT_PROVIDER === "resend" ? "resend" : "ses";
}

/** True when every value needed to send real email is present. */
export function isEmailConfigured() {
  if (!process.env.CONTACT_FROM_EMAIL || !process.env.CONTACT_TO_EMAIL) return false;
  return provider() === "resend" ? Boolean(process.env.RESEND_API_KEY) : true;
}

/** Development-only mock: accepts messages without sending them. Never active in production. */
export function isDevMock() {
  return process.env.NODE_ENV !== "production" && process.env.CONTACT_DEV_MOCK === "true";
}

export function contactAvailability(): "live" | "mock" | "unavailable" {
  if (isEmailConfigured() && !isDevMock()) return "live";
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

type SendResult = { ok: boolean; status: number };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let sesClient: any;

async function sendWithSes(input: ContactInput): Promise<SendResult> {
  const { SESv2Client, SendEmailCommand } = await import("@aws-sdk/client-sesv2");
  sesClient ??= new SESv2Client({ region: process.env.CONTACT_AWS_REGION || process.env.AWS_REGION || "us-east-1" });
  const { subject, text } = buildEmail(input);
  try {
    await sesClient.send(
      new SendEmailCommand({
        FromEmailAddress: process.env.CONTACT_FROM_EMAIL,
        Destination: { ToAddresses: [process.env.CONTACT_TO_EMAIL!] },
        ReplyToAddresses: [input.email],
        Content: {
          Simple: {
            Subject: { Data: subject, Charset: "UTF-8" },
            Body: { Text: { Data: text, Charset: "UTF-8" } },
          },
        },
      }),
    );
    return { ok: true, status: 200 };
  } catch (e) {
    const status = (e as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode ?? 500;
    return { ok: false, status };
  }
}

async function sendWithResend(input: ContactInput): Promise<SendResult> {
  const { subject, text } = buildEmail(input);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.CONTACT_FROM_EMAIL, to: [process.env.CONTACT_TO_EMAIL], reply_to: input.email, subject, text }),
    cache: "no-store",
  });
  return { ok: res.ok, status: res.status };
}

export function sendContactEmail(input: ContactInput) {
  return provider() === "resend" ? sendWithResend(input) : sendWithSes(input);
}
