"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import type { CSSProperties } from "react";
import landscape from "@/public/bg/landscape.png";

// Fixed positions so server and client render the same markup.
const embers = [
  { left: 4, delay: 0, duration: 16, size: 3, sway: 40 },
  { left: 11, delay: 6, duration: 19, size: 2, sway: -25 },
  { left: 17, delay: 2.5, duration: 14, size: 2, sway: 30 },
  { left: 24, delay: 9, duration: 21, size: 3, sway: -40 },
  { left: 31, delay: 4, duration: 17, size: 2, sway: 20 },
  { left: 38, delay: 12, duration: 15, size: 2, sway: -30 },
  { left: 45, delay: 1, duration: 20, size: 3, sway: 35 },
  { left: 52, delay: 7.5, duration: 18, size: 2, sway: -20 },
  { left: 59, delay: 3, duration: 16, size: 2, sway: 45 },
  { left: 66, delay: 10, duration: 22, size: 3, sway: -35 },
  { left: 72, delay: 5, duration: 15, size: 2, sway: 25 },
  { left: 78, delay: 13, duration: 19, size: 2, sway: -45 },
  { left: 84, delay: 0.5, duration: 17, size: 3, sway: 30 },
  { left: 89, delay: 8, duration: 20, size: 2, sway: -25 },
  { left: 94, delay: 11, duration: 16, size: 2, sway: 20 },
  { left: 98, delay: 4.5, duration: 18, size: 3, sway: -30 },
];

const mist =
  "radial-gradient(ellipse 18% 9% at 12% 46%, rgb(255 244 225 / 0.55), transparent 70%)," +
  "radial-gradient(ellipse 22% 7% at 34% 58%, rgb(255 244 225 / 0.45), transparent 70%)," +
  "radial-gradient(ellipse 16% 8% at 62% 50%, rgb(255 244 225 / 0.5), transparent 70%)," +
  "radial-gradient(ellipse 20% 6% at 84% 62%, rgb(255 244 225 / 0.4), transparent 70%)";

export default function Backdrop() {
  const isTitle = usePathname() === "/";

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div
        className={clsx(
          "absolute inset-0 transition-[filter] duration-[600ms] ease-out",
          isTitle ? "blur-0 brightness-100" : "blur-[0.5625rem] brightness-[0.78]",
        )}
      >
        <div className="absolute inset-0 scale-105 animate-breathe">
          <Image
            src={landscape}
            alt=""
            fill
            preload
            placeholder="blur"
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Drifting mist: two copies side by side so the -50% loop is seamless */}
        <div
          className="absolute inset-y-0 left-0 w-[200%] animate-drift opacity-25"
          style={{ backgroundImage: mist, backgroundSize: "50% 100%" }}
        />
        <div
          className="absolute inset-y-0 left-0 w-[200%] animate-drift-slow opacity-15 blur-xl"
          style={{ backgroundImage: mist, backgroundSize: "50% 100%", backgroundPosition: "30% 8%" }}
        />
      </div>

      {/* Title shade: keeps the menu readable while the landscape stays sharp */}
      <div
        className={clsx(
          "absolute inset-0 bg-[linear-gradient(180deg,rgb(12_10_8/0.25)_0%,rgb(12_10_8/0.1)_40%,rgb(12_10_8/0.55)_100%)] transition-opacity duration-[600ms]",
          isTitle ? "opacity-100" : "opacity-0",
        )}
      />
      {/* Section shade: radial vignette behind the panels */}
      <div
        className={clsx(
          "absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(12_10_8/0.3)_0%,rgb(12_10_8/0.92)_100%)] transition-opacity duration-[600ms]",
          isTitle ? "opacity-0" : "opacity-100",
        )}
      />

      <div className="absolute inset-x-0 bottom-0 h-full">
        {embers.map((e, i) => (
          <span
            key={i}
            className="absolute bottom-[-0.625rem] rounded-full bg-gold-300 shadow-[0_0_0.375rem_rgb(255_205_120/0.8)] animate-ember"
            style={
              {
                left: `${e.left}%`,
                width: e.size,
                height: e.size,
                animationDelay: `${e.delay}s`,
                "--ember-duration": `${e.duration}s`,
                "--ember-sway": `${e.sway}px`,
                "--ember-opacity": e.size > 2 ? 0.75 : 0.5,
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
