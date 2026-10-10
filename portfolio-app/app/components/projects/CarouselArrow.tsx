import clsx from "clsx";
import type { CSSProperties } from "react";

type CarouselArrowProps = {
  direction: "prev" | "next";
  onClick: () => void;
  small?: boolean;
  className?: string;
  style?: CSSProperties;
};

// 56px rotated square (40px when small) with an upright chevron, in a hit area that fits its diagonal.
export default function CarouselArrow({ direction, onClick, small = false, className, style }: CarouselArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      className={clsx("group flex shrink-0 items-center justify-center", small ? "size-14" : "size-20", className ?? "relative")}
      style={style}
    >
      <span
        aria-hidden
        className={clsx(
          "absolute rotate-45 border border-gold-400/70 bg-ink/85 transition-[border-color,box-shadow,background-color] duration-200 group-hover:border-gold-200 group-hover:bg-gold-700/60 group-hover:shadow-glow",
          small ? "size-10" : "size-14",
        )}
      />
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={clsx("relative text-gold-200", small ? "size-5" : "size-6")}
      >
        <path d={direction === "prev" ? "m14.5 6-6 6 6 6" : "m9.5 6 6 6-6 6"} />
      </svg>
    </button>
  );
}
