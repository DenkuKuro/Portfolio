import clsx from "clsx";

type GemProps = {
  lit?: boolean;
  className?: string;
};

// 9px rotated square: portrait corners, timeline nodes, small ornaments.
export default function Gem({ lit = false, className }: GemProps) {
  return (
    <span
      aria-hidden
      className={clsx(
        "inline-block size-[0.5625rem] rotate-45 border border-gold-400",
        lit ? "bg-gold-300 shadow-[0_0_0.75rem_rgb(255_205_120/0.85)]" : "bg-ink",
        className,
      )}
    />
  );
}
