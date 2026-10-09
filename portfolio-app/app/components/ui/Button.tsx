import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

type Variant = "gold" | "ghost";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 px-7 py-[15px] font-display text-[12px] uppercase leading-none tracking-[0.3em] transition-[box-shadow,border-color,color,background-color] duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  gold: "bg-gold-active border border-gold-300/60 text-gold-100 shadow-glow hover:border-gold-200 hover:shadow-[0_0_30px_rgb(214_170_90/0.55)]",
  ghost: "border border-gold-400/60 text-gold-300 hover:border-gold-300 hover:bg-gold-400/10 hover:text-gold-100",
};

type CommonProps = { variant?: Variant; className?: string; children: ReactNode };
type LinkProps = { href: string; external?: boolean } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type NativeProps = { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

function isLink(props: LinkProps | NativeProps): props is LinkProps {
  return props.href !== undefined;
}

// gold: active gradient; ghost: gold outline. Renders a Link/anchor when given href, otherwise a button.
export default function Button({ variant = "gold", className, children, ...rest }: CommonProps & (LinkProps | NativeProps)) {
  const classes = clsx(base, variants[variant], className);

  if (isLink(rest)) {
    const { href, external, ...anchor } = rest;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noreferrer" className={classes} {...anchor}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchor}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
