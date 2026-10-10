import Link from "next/link";
import SectionNav from "@/app/components/chrome/SectionNav";
import StickyHeader from "@/app/components/chrome/StickyHeader";
import Footer from "@/app/components/chrome/Footer";
import { profile } from "@/constants";

export default function SectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <StickyHeader>
        {/* Full name + centered tabs sit side by side from lg (the 75% desktop scale leaves room); below that the tabs drop under the name */}
        <div className="grid grid-cols-1 items-center gap-x-6 gap-y-3 lg:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="justify-self-start py-2 font-display text-[1rem] font-medium uppercase tracking-[0.3em] text-gold-200 text-glow transition-colors hover:text-gold-100 whitespace-nowrap"
          >
            {profile.name}
          </Link>
          <div className="min-w-0 lg:col-start-2">
            <SectionNav />
          </div>
        </div>
      </StickyHeader>

      <main className="flex flex-1 flex-col px-4 py-10 sm:px-8 lg:justify-center lg:px-[4.5rem] lg:pb-6 lg:pt-2">
        {children}
      </main>

      <div className="px-4 pb-6 sm:px-8 lg:px-[4.5rem] lg:pb-[1.875rem]">
        <Footer />
      </div>
    </div>
  );
}
