import type { Metadata } from "next";
import SectionTitle from "@/app/components/chrome/SectionTitle";
import Panel from "@/app/components/ui/Panel";
import Gem from "@/app/components/ui/Gem";
import { experience } from "@/constants";
import { getSection } from "@/lib/sections";

const section = getSection("experience");

export const metadata: Metadata = { title: section.title, description: section.description };

export default function Experience() {
  return (
    <>
      <SectionTitle section={section} />

      <Panel className="w-full max-w-[67.5rem] animate-rise px-5 py-8 [animation-delay:80ms] sm:px-10 sm:py-10">
        <ol className="relative">
          {/* Rail runs through the node column and fades downward */}
          <span
            aria-hidden
            className="absolute bottom-2 left-[1.3438rem] top-2 w-px bg-linear-to-b from-gold-400 via-gold-400/50 to-transparent"
          />
          {experience.map((job) => (
            <li
              key={`${job.company}-${job.title}`}
              className="relative grid grid-cols-[2.75rem_1fr] gap-y-1 pb-9 last:pb-0 lg:grid-cols-[2.75rem_10.625rem_1fr]"
            >
              <div className="flex justify-center pt-[0.4375rem] lg:row-span-2">
                <Gem lit={job.current} />
              </div>

              <div className="col-start-2 lg:pr-6">
                <p className="font-display text-[0.75rem] uppercase tracking-[0.2em] text-dim">{job.date}</p>
                {job.current && <p className="mt-1 font-body text-[1.125rem] italic text-gold-300">Now</p>}
              </div>

              <div className="col-start-2 lg:col-start-3 lg:row-span-2 lg:row-start-1">
                <h2 className="font-display text-[1.1875rem] font-medium tracking-[0.08em] text-gold-200">{job.title}</h2>
                <p className="font-body text-[1.1875rem] italic text-muted">
                  {job.company} · {job.location}
                </p>
                <ul className="mt-3 space-y-2">
                  {job.description.map((point) => (
                    <li key={point} className="flex gap-3 font-body text-[1.1875rem] leading-normal text-parchment-200">
                      <span aria-hidden className="mt-[0.6875rem] size-[0.375rem] shrink-0 rotate-45 bg-gold-500" />
                      <span>{point.replace(/\s+/g, " ")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </Panel>
    </>
  );
}
