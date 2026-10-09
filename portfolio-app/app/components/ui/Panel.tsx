import clsx from "clsx";
import type { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

export default function Panel({ children, className, as: Tag = "div" }: PanelProps) {
  return (
    <Tag
      className={clsx(
        "relative border border-gold-400/38 bg-panel shadow-panel backdrop-blur-[2px]",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute left-1/2 top-0 size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold-400/70 bg-ink"
      />
      {children}
    </Tag>
  );
}
