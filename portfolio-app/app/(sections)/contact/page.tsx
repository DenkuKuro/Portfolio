import type { Metadata } from "next";
import SectionTitle from "@/app/components/chrome/SectionTitle";
import Panel from "@/app/components/ui/Panel";
import Label from "@/app/components/ui/Label";
import ContactForm from "@/app/components/sections/ContactForm";
import { contactIcons } from "@/app/components/icons";
import { contactCopy, contactLinks } from "@/constants";
import { getSection } from "@/lib/sections";

const section = getSection("contact");

export const metadata: Metadata = { title: section.title, description: section.description };

export default function Contact() {
  return (
    <>
      <SectionTitle section={section} />

      <Panel className="grid w-full max-w-[66.25rem] animate-rise gap-10 px-5 py-8 [animation-delay:80ms] sm:px-10 sm:py-10 lg:grid-cols-[23.75rem_1fr] lg:gap-12">
        <div>
          <Label as="h2">{contactCopy.label}</Label>
          <p className="mt-3 font-body text-[1.25rem] italic text-muted">{contactCopy.availability}</p>

          <ul className="mt-6">
            {contactLinks.map((link) => {
              const Icon = contactIcons[link.kind];
              const body = (
                <>
                  <span className="flex size-10 shrink-0 items-center justify-center border border-gold-400/40">
                    <Icon className="size-5 text-gold-300" />
                  </span>
                  <span className="min-w-0">
                    <Label as="span" tone="dim" className="block">
                      {link.label}
                    </Label>
                    <span className="block truncate font-body text-[1.1875rem] text-parchment-200 transition-colors group-hover:text-gold-200">{link.value}</span>
                  </span>
                </>
              );
              return (
                <li key={link.kind} className="border-b border-gold-400/15 last:border-b-0">
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="group flex min-h-11 items-center gap-4 py-3"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 py-3">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative border-gold-400/20 lg:border-l lg:pl-12">
          <ContactForm copy={contactCopy} />
        </div>
      </Panel>
    </>
  );
}
