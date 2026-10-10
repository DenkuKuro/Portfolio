import Divider from "@/app/components/ui/Divider";
import type { Section } from "@/constants";

export default function SectionTitle({ section }: { section: Section }) {
  return (
    <header className="flex animate-rise flex-col items-center text-center">
      <h1 className="mt-2 font-display text-[32px] font-medium uppercase tracking-[0.2em] text-gold-100 text-glow lg:text-[50px] lg:tracking-[0.35em] lg:-mr-[0.35em]">
        {section.heading}
      </h1>
      <Divider className="mt-3" />
    </header>
  );
}
