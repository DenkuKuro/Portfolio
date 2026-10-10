import clsx from "clsx";
import type { ReactNode } from "react";

type LabelProps = {
  children: ReactNode;
  tone?: "gold" | "dim";
  as?: "p" | "span" | "h2" | "h3" | "dt";
  className?: string;
};

export default function Label({ children, tone = "gold", as: Tag = "p", className }: LabelProps) {
  return (
    <Tag
      className={clsx(
        "font-display text-[0.75rem] uppercase tracking-[0.28em]",
        tone === "gold" ? "text-gold-400" : "text-dim",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
