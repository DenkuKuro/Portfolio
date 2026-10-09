import type { Metadata } from "next";
import { Suspense } from "react";
import SectionTitle from "@/app/components/chrome/SectionTitle";
import Panel from "@/app/components/ui/Panel";
import Inventory from "@/app/components/sections/Inventory";
import { projects } from "@/constants";
import { getSection } from "@/lib/sections";

const section = getSection("projects");

export const metadata: Metadata = { title: section.title, description: section.description };

export default function Projects() {
  return (
    <>
      <SectionTitle section={section} />

      <Panel className="w-full max-w-[1180px] animate-rise px-5 py-8 [animation-delay:80ms] sm:px-10 sm:py-10">
        {/* Inventory reads ?item= on the client; the fallback keeps the panel's height in the static shell */}
        <Suspense fallback={<div className="min-h-[360px]" />}>
          <Inventory projects={projects} />
        </Suspense>
      </Panel>
    </>
  );
}
