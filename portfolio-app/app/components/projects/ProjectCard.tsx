import Image from "next/image";
import clsx from "clsx";
import Button from "@/app/components/ui/Button";
import Label from "@/app/components/ui/Label";
import ImagePlaceholder from "@/app/components/icons/ImagePlaceholder";
import type { Project } from "@/constants";
import type { Slot } from "./carousel-math";

const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
  slot: Slot;
  isActive: boolean;
  width: number;
  imageHeight: number;
  dragX: number;
  animate: boolean;
  onSelect: () => void;
};

export default function ProjectCard({ project, index, total, slot, isActive, width, imageHeight, dragX, animate, onSelect }: ProjectCardProps) {
  const { details, source } = project.links ?? {};

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-active={isActive || undefined}
      aria-label={`${index + 1} of ${total}: ${project.name}`}
      className={clsx(
        "relative col-start-1 row-start-1 self-start justify-self-center",
        animate && "transition-[transform,opacity,visibility] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
      )}
      style={{
        width,
        transform: `translateX(${slot.x + dragX}px) scale(${slot.scale})`,
        opacity: slot.opacity,
        zIndex: slot.z,
        visibility: slot.visible ? "visible" : "hidden",
      }}
    >
      <article
        aria-hidden={!isActive}
        inert={!isActive}
        className={clsx(
          "relative border bg-ink/82 shadow-panel transition-[border-color,box-shadow] duration-400",
          isActive ? "border-gold-300/85 shadow-glow" : "border-gold-400/38",
        )}
      >
        <span
          aria-hidden
          className="absolute left-1/2 top-0 z-10 size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold-400/70 bg-ink"
        />

        <div data-card-image className="relative overflow-hidden border-b border-gold-400/40" style={{ height: imageHeight }}>
          {project.image ? (
            <Image
              src={project.image.src}
              alt={project.image.alt}
              fill
              sizes="(max-width: 767px) 86vw, 520px"
              priority={index === 0}
              draggable={false}
              className="object-cover object-top"
            />
          ) : (
            <ImagePlaceholder />
          )}
          <span className="absolute left-3 top-3 border border-gold-400/50 bg-ink/85 px-2.5 py-1 font-display text-[12px] tracking-[0.2em] text-gold-200">
            {numerals[index] ?? index + 1}
          </span>
        </div>

        <div className="flex flex-col gap-1.5 px-5 pb-4 pt-3.5 sm:px-7">
          <Label tone="dim">
            {project.type} · <span className="text-muted">{project.status}</span>
          </Label>
          <h2 className="font-display text-[22px] font-medium uppercase leading-tight tracking-[0.14em] text-gold-100 text-glow sm:text-[24px]">
            {project.name}
          </h2>
          <p className="line-clamp-2 font-body [@media(max-height:820px)]:line-clamp-1 text-[19px] leading-snug text-parchment-200">{project.description}</p>

          <ul aria-label="Built with" className="mt-0.5 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="border border-gold-400/40 bg-ink/40 px-2 py-0.5 font-display text-[11px] uppercase tracking-[0.14em] text-gold-300"
              >
                {tech}
              </li>
            ))}
          </ul>

          {(details || source) && (
            <div className="mt-2 flex flex-wrap gap-3">
              {details && (
                <Button href={details} external>
                  View Details
                </Button>
              )}
              {source && (
                <Button href={source} external variant={details ? "ghost" : "gold"}>
                  Source
                </Button>
              )}
            </div>
          )}
        </div>
      </article>

      {/* Sibling of the inert article, so side cards stay clickable */}
      {!isActive && slot.visible && (
        <button
          type="button"
          onClick={onSelect}
          aria-label={`Show ${project.name}`}
          className="absolute inset-0 cursor-pointer transition-colors hover:bg-gold-300/5"
        />
      )}
    </div>
  );
}
