"use server";

import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Tell me your name.").max(100, "That name is a little long."),
  email: z.email("That email doesn't look right.").trim(),
  message: z.string().trim().min(10, "Leave a few more words.").max(5000, "Keep it under 5000 characters."),
});

type Fields = z.infer<typeof schema>;

export type ContactState = {
  status: "idle" | "error" | "success";
  message?: string;
  errors?: Partial<Record<keyof Fields, string>>;
  values?: Fields;
};

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot: humans never see this field. Pretend it worked so bots don't retry.
  if (formData.get("company")) return { status: "success" };

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof Fields;
      errors[field] ??= issue.message;
    }
    return { status: "error", errors, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO is not set");
    return { status: "error", message: "The messenger is away. Please email me directly instead.", values };
  }

  const { name, email, message } = parsed.data;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `${message}\n\n— ${name} <${email}>`,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  } catch (error) {
    console.error("Contact form: send failed", error);
    return { status: "error", message: "Your message couldn't be sent. Please try again in a moment.", values };
  }

  return { status: "success" };
}
