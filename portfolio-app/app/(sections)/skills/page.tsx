import type { Metadata } from "next";
import SectionTitle from "@/app/components/chrome/SectionTitle";
import Panel from "@/app/components/ui/Panel";
import { schoolIcons } from "@/app/components/icons";
import { skills } from "@/constants";
import { getSection } from "@/lib/sections";

const section = getSection("skills");

export const metadata: Metadata = { title: section.title, description: section.description };

export default function Skills() {
  return (
    <>
      <SectionTitle section={section} />

      <div className="grid w-full max-w-[78.75rem] animate-rise gap-8 [animation-delay:80ms] md:grid-cols-2 lg:grid-cols-3 lg:px-[1.125rem]">
        {skills.map((school) => {
          const Icon = schoolIcons[school.id];
          return (
            <Panel as="section" key={school.id} className="flex flex-col items-center px-8 pb-8 pt-10">
              <div className="flex size-16 items-center justify-center">
                <div className="flex size-11 rotate-45 items-center justify-center border border-gold-400/70 shadow-glow">
                  <Icon className="size-6 -rotate-45 text-gold-300" />
                </div>
              </div>
              <h2 className="mt-4 font-display text-[1.1875rem] font-medium uppercase tracking-[0.28em] text-gold-200">
                {school.title}
              </h2>
              <ul className="mt-6 w-full">
                {school.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-3 border-b border-gold-400/15 py-2.5 font-body text-[1.25rem] text-parchment-200 last:border-b-0"
                  >
                    <span aria-hidden className="size-[0.375rem] shrink-0 rotate-45 bg-gold-500" />
                    {skill}
                  </li>
                ))}
              </ul>
            </Panel>
          );
        })}
      </div>
    </>
  );
}
