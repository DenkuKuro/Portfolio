import Link from "next/link";
import { profile } from "@/constants";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between gap-4 font-display text-[0.6875rem] uppercase tracking-[0.3em] text-dim">
      <Link
        href="/"
        className="group flex min-h-11 items-center gap-3 transition-colors hover:text-gold-200"
      >
        <kbd className="border border-gold-400/50 px-2 py-1 font-display text-[0.625rem] tracking-[0.2em] text-gold-300 shadow-[inset_0_-2px_0_rgb(216_181_109/0.25)] pointer-coarse:hidden">
          Esc
        </kbd>
        <span>Back</span>
      </Link>
      <p>{profile.copyright}</p>
    </footer>
  );
}
