"use client";

import { useId, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { external, site } from "@/data/site";

/*
  ============================================================================
  FRONTEND ONLY. THIS FORM DOES NOT SEND ANYTHING.
  ============================================================================

  There is no API route, no server action, no email service and no third-party
  form provider behind this component, by design: this project is frontend
  only. Validation runs in the browser and that is the entire extent of it.

  Because a form that silently swallows a message is worse than no form at all,
  a valid submission does NOT show a fake "thanks, we'll be in touch" state.
  It says plainly that the form is not connected and hands over the two
  channels that do work, with what the visitor typed left in place so they can
  copy it.

  BEFORE LAUNCH this must either be wired to a real endpoint or removed. It is
  a shell for whoever does the wiring, not a finished feature.
  ============================================================================
*/

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const baseId = useId();
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) {
      next.email = "Please enter an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = "That does not look like an email address.";
    }
    if (!values.message.trim()) next.message = "Please add a short message.";
    return next;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    setSubmitted(Object.keys(found).length === 0);
  };

  const field = (name: keyof Errors) => ({
    id: `${baseId}-${name}`,
    name,
    value: values[name],
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${baseId}-${name}-error` : undefined,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setValues((v) => ({ ...v, [name]: event.target.value })),
  });

  /* Labels sit above their input, errors below it. Placeholders are never
     used as labels. Border is line-strong at 3.45:1, which clears the 3:1
     non-text minimum for a control boundary. */
  const inputClass = (invalid?: string) =>
    cn(
      "w-full rounded-pill border bg-paper px-5 py-3 text-ink",
      "placeholder:text-muted",
      "transition-colors duration-[var(--dur-base)] ease-out-expo",
      invalid ? "border-ink" : "border-line-strong hover:border-ink",
    );

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor={`${baseId}-name`} className="text-sm text-muted">
          Name
        </label>
        <input {...field("name")} type="text" className={inputClass(errors.name)} />
        {errors.name ? (
          <p id={`${baseId}-name-error`} className="text-sm text-ink">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${baseId}-email`} className="text-sm text-muted">
          Email
        </label>
        <input
          {...field("email")}
          type="email"
          autoComplete="email"
          className={inputClass(errors.email)}
        />
        {errors.email ? (
          <p id={`${baseId}-email-error`} className="text-sm text-ink">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${baseId}-message`} className="text-sm text-muted">
          What do you want to record?
        </label>
        <textarea
          {...field("message")}
          rows={4}
          className={cn(inputClass(errors.message), "rounded-field")}
        />
        {errors.message ? (
          <p id={`${baseId}-message-error`} className="text-sm text-ink">
            {errors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" variant="ink" className="self-start">
        Send
      </Button>

      {/* Honest result state. Not a fake success message. */}
      {submitted ? (
        <div
          role="status"
          className="border border-line-strong px-5 py-4 text-sm text-ink"
        >
          <p className="font-medium">This form is not connected yet.</p>
          <p className="mt-2 text-muted">
            Nothing was sent. Your message is still in the box above, so you can
            copy it. To reach the studio now, use{" "}
            <a
              href={external.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
            >
              WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>{" "}
            or email{" "}
            <a
              href={external.email}
              className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
            >
              {site.email}
            </a>
            .
          </p>
        </div>
      ) : null}
    </form>
  );
}
