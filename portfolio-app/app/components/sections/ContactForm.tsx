"use client";

import { useActionState, useState } from "react";
import clsx from "clsx";
import Button from "@/app/components/ui/Button";
import Label from "@/app/components/ui/Label";
import { Star } from "@/app/components/ui/Divider";
import { sendMessage, type ContactState } from "@/app/(sections)/contact/actions";

type Copy = { replyNote: string; sentTitle: string; sentBody: string };

const initialState: ContactState = { status: "idle" };

const inputClass =
  "mt-2 w-full border border-gold-400/40 bg-ink/50 px-4 py-3 font-body text-[19px] text-parchment placeholder:text-dim/60 transition-colors focus:border-gold-300 focus:outline-none focus-visible:outline-2 focus-visible:outline-gold-300 aria-invalid:border-gold-500";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id}>
        <Label as="span">{label}</Label>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 font-body text-[18px] italic text-gold-400">
          {error}
        </p>
      )}
    </div>
  );
}

function Form({ copy, onSent }: { copy: Copy; onSent: () => void }) {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center py-8 text-center" role="status">
        <Star className="size-12" />
        <h2 className="mt-5 font-display text-[26px] font-medium uppercase tracking-[0.3em] text-gold-100 text-glow">
          {copy.sentTitle}
        </h2>
        <p className="mt-3 font-body text-[20px] italic text-muted">{copy.sentBody}</p>
        <Button variant="ghost" className="mt-8" onClick={onSent}>
          Write Another
        </Button>
      </div>
    );
  }

  const errors = state.errors ?? {};
  const describe = (field: keyof typeof errors) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
            aria-invalid={!!errors.name}
            aria-describedby={describe("name")}
            className={inputClass}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={state.values?.message}
          aria-invalid={!!errors.message}
          aria-describedby={describe("message")}
          className={clsx(inputClass, "resize-y")}
        />
      </Field>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {state.message && (
        <p role="alert" className="font-body text-[19px] italic text-gold-300">
          {state.message}
        </p>
      )}

      <div className="flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-body text-[18px] italic text-dim">{copy.replyNote}</p>
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send Message"}
        </Button>
      </div>
    </form>
  );
}

export default function ContactForm({ copy }: { copy: Copy }) {
  // Remounting the form resets the action state for "Write Another".
  const [round, setRound] = useState(0);
  return <Form key={round} copy={copy} onSent={() => setRound((r) => r + 1)} />;
}
