import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { profile } from "@/constants";

export const alt = `${profile.name} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const landscape = await readFile(join(process.cwd(), "public/bg/landscape.png"), "base64");
const landscapeSrc = `data:image/png;base64,${landscape}`;

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={landscapeSrc} alt="" width={1200} height={630} style={{ position: "absolute", objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(180deg, rgba(12,10,8,0.2), rgba(12,10,8,0.6))",
            color: "#f6e7c0",
          }}
        >
          <div style={{ fontSize: 88, letterSpacing: 24, textShadow: "0 0 26px rgba(255,205,120,0.6)" }}>
            {profile.name.toUpperCase()}
          </div>
          <div style={{ width: 640, height: 1, marginTop: 12, background: "#d8b56d" }} />
        </div>
      </div>
    ),
    size,
  );
}
