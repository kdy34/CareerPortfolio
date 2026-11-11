/** Shared by the client form and the server handler. */
export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 20, max: 4000 },
  bodyBytes: 8 * 1024,
} as const;

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;

export function validateContact(raw: Record<string, unknown>):
  | { ok: true; data: ContactInput }
  | { ok: false; errors: FieldErrors } {
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = s(raw.name).replace(/[\r\n]+/g, " ");
  const email = s(raw.email);
  const message = s(raw.message);
  const errors: FieldErrors = {};

  if (name.length < LIMITS.name.min) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name.max) errors.name = `Please keep your name under ${LIMITS.name.max} characters.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > LIMITS.email.max || !EMAIL_RE.test(email)) errors.email = "Please enter a valid email address, like name@example.com.";

  if (message.length < LIMITS.message.min) errors.message = `Please write at least ${LIMITS.message.min} characters so I have some context.`;
  else if (message.length > LIMITS.message.max) errors.message = `Please keep your message under ${LIMITS.message.max} characters.`;

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { name, email, message } };
}
