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
        "inline-block size-[9px] rotate-45 border border-gold-400",
        lit ? "bg-gold-300 shadow-[0_0_12px_rgb(255_205_120/0.85)]" : "bg-ink",
        className,
      )}
    />
  );
}
