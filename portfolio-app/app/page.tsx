import TitleMenu from "@/app/components/menu/TitleMenu";
import Divider from "@/app/components/ui/Divider";
import { profile } from "@/constants";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-center px-4 pb-20 pt-16">
      <header className="flex animate-rise flex-col items-center text-center">
        {/* Names wrap onto two lines on narrow screens instead of shrinking */}
        <h1 className="flex flex-wrap justify-center gap-x-[0.6em] font-display text-[clamp(40px,6.4vw,92px)] font-medium uppercase leading-[1.1] tracking-[0.3em] text-gold-100 text-glow">
          <span className="-mr-[0.3em]">{profile.firstName}</span>{" "}
          <span className="-mr-[0.3em]">{profile.lastName}</span>
        </h1>
        <Divider width="lg" className="mt-2" />
      </header>

      <div className="mt-12 animate-rise [animation-delay:120ms]">
        <TitleMenu />
      </div>

      <div className="mt-10 flex animate-rise flex-col items-center gap-4 [animation-delay:200ms]">
        <Divider width="sm" />
        <p className="font-body text-[20px] italic text-muted">{profile.welcome}</p>
      </div>

      <p className="absolute inset-x-0 bottom-6 text-center font-display text-[11px] uppercase tracking-[0.3em] text-dim">
        {profile.copyright}
      </p>
    </main>
  );
}
