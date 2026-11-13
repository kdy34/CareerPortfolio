"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { LIMITS, validateContact, type FieldErrors } from "@/lib/contact";

/**
 * mode:
 *  - live:        posts to /api/contact, provider configured
 *  - mock:        posts to /api/contact, server dev mock (nothing is sent)
 *  - preview:     no server; simulated in the browser for design review
 *  - unavailable: production without credentials; form is disabled
 */
export type ContactMode = "live" | "mock" | "preview" | "unavailable";
type Status = "idle" | "sending" | "success" | "error";

const empty = { name: "", email: "", message: "", company: "" };

export function ContactForm({ mode }: { mode: ContactMode }) {
  const uid = useId();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const disabled = mode === "unavailable";

  const set = (k: keyof typeof empty) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k as keyof FieldErrors]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending" || disabled) return;

    const check = validateContact(values);
    if (!check.ok) {
      setErrors(check.errors);
      const first = (["name", "email", "message"] as const).find((k) => check.errors[k]);
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    setErrorText("");
    try {
      let ok = false;
      let code = "";
      if (mode === "preview") {
        await new Promise((r) => setTimeout(r, 700));
        ok = !/#fail/i.test(values.message); // type #fail in a message to preview the failure state
      } else {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: FieldErrors };
        ok = res.ok && Boolean(data.ok);
        code = data.error ?? "";
        if (code === "invalid" && data.fields) setErrors(data.fields);
      }
      if (ok) {
        setStatus("success");
        setValues(empty);
      } else {
        setStatus("error");
        setErrorText(
          code === "rate_limited"
            ? "You have sent several messages in a short time. Please wait a few minutes and try again."
            : "Your message could not be sent. Please try again.",
        );
      }
    } catch {
      setStatus("error");
      setErrorText("Your message could not be sent. Please try again.");
    } finally {
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  const field = (k: keyof FieldErrors) => ({
    id: `${uid}-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined,
    disabled: disabled || status === "sending",
  });
  const Err = ({ k }: { k: keyof FieldErrors }) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="field-error">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form ref={formRef} className="contact-form" onSubmit={onSubmit} noValidate aria-describedby={`${uid}-mode`}>
      {mode !== "live" && (
        <p id={`${uid}-mode`} className={`form-mode mode-${mode}`}>
          {mode === "preview" && "Preview mode: nothing is sent from this page. Submissions are simulated so you can review each state. Include #fail in the message to see the error state."}
          {mode === "mock" && "Development mock: the server accepts messages but does not send email."}
          {mode === "unavailable" && "The contact form is not available yet. Please use the links on this page in the meantime."}
        </p>
      )}

      <div className="field-row">
        <div className="field">
          <label htmlFor={`${uid}-name`}>Name</label>
          <input {...field("name")} type="text" autoComplete="name" maxLength={LIMITS.name.max} value={values.name} onChange={set("name")} required />
          <Err k="name" />
        </div>
        <div className="field">
          <label htmlFor={`${uid}-email`}>Email</label>
          <input
            {...field("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            spellCheck={false}
            maxLength={LIMITS.email.max}
            value={values.email}
            onChange={set("email")}
            required
          />
          <Err k="email" />
        </div>
      </div>



      <div className="field">
        <label htmlFor={`${uid}-message`}>Message</label>
        <textarea {...field("message")} rows={6} maxLength={LIMITS.message.max} value={values.message} onChange={set("message")} required />
        <p className="field-hint mono" aria-live="off">
          {values.message.length} / {LIMITS.message.max}
        </p>
        <Err k="message" />
      </div>

      {/* Honeypot: hidden from people and assistive tech. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${uid}-company`}>Company</label>
        <input id={`${uid}-company`} name="company" type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={set("company")} />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={disabled || status === "sending"} aria-disabled={disabled || status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className={`form-status status-${status}`}>
        {status === "success" &&
          `Thanks for reaching out. Your message was received.${mode === "preview" ? " (Simulated: nothing was sent.)" : mode === "mock" ? " (Dev mock: no email was sent.)" : ""}`}
        {status === "error" && errorText}
      </div>
    </form>
  );
}
