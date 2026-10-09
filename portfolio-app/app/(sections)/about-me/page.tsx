import type { Metadata } from "next";
import Image from "next/image";
import SectionTitle from "@/app/components/chrome/SectionTitle";
import Panel from "@/app/components/ui/Panel";
import Label from "@/app/components/ui/Label";
import Button from "@/app/components/ui/Button";
import Gem from "@/app/components/ui/Gem";
import { profile } from "@/constants";
import { getSection, sectionHref } from "@/lib/sections";
import { selfie } from "@/public";

const section = getSection("about-me");

export const metadata: Metadata = { title: section.title, description: section.description };

export default function AboutMe() {
  return (
    <>
      <SectionTitle section={section} />

      <div className="flex w-full animate-rise flex-col items-center gap-10 [animation-delay:80ms] lg:flex-row lg:items-start lg:justify-center lg:gap-14">
        <figure className="flex w-[240px] shrink-0 flex-col items-center gap-5 lg:w-[330px]">
          <div className="relative w-full border border-gold-400/70 p-2 shadow-panel">
            <Gem className="absolute -left-[5px] -top-[5px]" />
            <Gem className="absolute -right-[5px] -top-[5px]" />
            <Gem className="absolute -bottom-[5px] -left-[5px]" />
            <Gem className="absolute -bottom-[5px] -right-[5px]" />
            <div className="relative aspect-[330/410] overflow-hidden border border-gold-400/35">
              <Image
                src={selfie}
                alt={profile.portraitAlt}
                fill
                sizes="(min-width: 1024px) 330px, 240px"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="text-center font-body text-[19px] italic leading-snug text-muted">
            {profile.quote}
          </figcaption>
        </figure>

        <Panel className="w-full max-w-[780px] px-6 py-8 sm:px-10 sm:py-9">
          <Label as="h2">Status</Label>
          <dl className="mt-4">
            {profile.status.map((row) => (
              <div
                key={row.label}
                className="grid gap-1 border-b border-gold-400/15 py-2.5 last:border-b-0 sm:grid-cols-[190px_1fr] sm:gap-4"
              >
                <Label as="dt" tone="dim" className="pt-1">
                  {row.label}
                </Label>
                <dd className="font-body text-[20px] leading-snug text-parchment">{row.value}</dd>
              </div>
            ))}
          </dl>

          <Label as="h2" className="mt-8">
            Lore
          </Label>
          <div className="mt-3 space-y-4">
            {profile.lore.map((paragraph) => (
              <p key={paragraph} className="font-body text-[20px] leading-normal text-parchment-200">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={profile.resume} external>
              Download Résumé
            </Button>
            <Button href={sectionHref("experience")} variant="ghost">
              View Experience →
            </Button>
          </div>
        </Panel>
      </div>
    </>
  );
}
