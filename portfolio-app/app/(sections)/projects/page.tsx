import type { Metadata } from "next";
import { Suspense } from "react";
import SectionTitle from "@/app/components/chrome/SectionTitle";
import ProjectCarousel from "@/app/components/projects/ProjectCarousel";
import { projects } from "@/constants";
import { getSection } from "@/lib/sections";

const section = getSection("projects");

export const metadata: Metadata = { title: section.title, description: section.description };

export default function Projects() {
  return (
    <>
      <SectionTitle section={section} />

      {/* The carousel reads ?item= on the client; the fallback keeps its height in the static shell */}
      <Suspense fallback={<div className="min-h-[40rem]" />}>
        <ProjectCarousel projects={projects} />
      </Suspense>
    </>
  );
}
