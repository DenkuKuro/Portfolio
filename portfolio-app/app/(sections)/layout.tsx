import Link from "next/link";
import SectionNav from "@/app/components/chrome/SectionNav";
import StickyHeader from "@/app/components/chrome/StickyHeader";
import Footer from "@/app/components/chrome/Footer";
import { profile } from "@/constants";

export default function SectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <StickyHeader>
        {/* Full name + centered tabs only fit side by side from 1360px; below that the tabs drop under the name */}
        <div className="grid grid-cols-1 items-center gap-x-6 gap-y-3 lg:max-[1359px]:justify-items-center min-[1360px]:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            className="justify-self-start py-2 font-display text-[16px] font-medium uppercase tracking-[0.3em] text-gold-200 text-glow transition-colors hover:text-gold-100 whitespace-nowrap lg:max-[1359px]:justify-self-center"
          >
            {profile.name}
          </Link>
          <div className="min-w-0 min-[1360px]:col-start-2">
            <SectionNav />
          </div>
        </div>
      </StickyHeader>

      <main className="flex flex-1 flex-col px-4 py-10 sm:px-8 lg:justify-center lg:px-[72px] lg:pb-6 lg:pt-2">
        {children}
      </main>

      <div className="px-4 pb-6 sm:px-8 lg:px-[72px] lg:pb-[30px]">
        <Footer />
      </div>
    </div>
  );
}
