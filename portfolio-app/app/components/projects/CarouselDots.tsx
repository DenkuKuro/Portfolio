import clsx from "clsx";

type CarouselDotsProps = {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  labels: string[];
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function CarouselDots({ count, active, onSelect, labels }: CarouselDotsProps) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="font-display text-[13px] tracking-[0.2em] text-gold-200">
        {pad(active + 1)}
      </span>
      <ul className="flex items-center">
        {Array.from({ length: count }, (_, i) => {
          const current = i === active;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-pressed={current}
                aria-label={`Show project ${i + 1}: ${labels[i]}`}
                className="group flex size-11 items-center justify-center"
              >
                <span
                  aria-hidden
                  className={clsx(
                    "size-2.5 rotate-45 border transition-[background-color,border-color,box-shadow] duration-300",
                    current
                      ? "border-gold-200 bg-gold-300 shadow-[0_0_12px_rgb(255_205_120/0.85)]"
                      : "border-gold-400/70 bg-ink group-hover:border-gold-200",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>
      <span aria-hidden className="font-display text-[13px] tracking-[0.2em] text-dim">
        {pad(count)}
      </span>
    </div>
  );
}
