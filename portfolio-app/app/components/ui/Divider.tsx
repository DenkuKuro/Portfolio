import clsx from "clsx";

type DividerProps = {
  width?: "sm" | "md" | "lg";
  className?: string;
};

const lineWidth = {
  sm: "w-[5.625rem] sm:w-[7.5rem]",
  md: "w-[6.875rem] sm:w-[12.5rem]",
  lg: "w-[8.125rem] sm:w-[16.25rem] lg:w-[21.25rem]",
};

export function Star({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 14 14"
      className={clsx("size-3.5 shrink-0 drop-shadow-[0_0_0.375rem_rgb(255_205_120/0.7)]", className)}
    >
      <path d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z" fill="#f3d998" />
    </svg>
  );
}

// line — 4-point star — line
export default function Divider({ width = "md", className }: DividerProps) {
  return (
    <div aria-hidden className={clsx("flex items-center justify-center gap-3", className)}>
      <span className={clsx("h-px bg-linear-to-r from-transparent to-gold-400", lineWidth[width])} />
      <Star />
      <span className={clsx("h-px bg-linear-to-l from-transparent to-gold-400", lineWidth[width])} />
    </div>
  );
}
