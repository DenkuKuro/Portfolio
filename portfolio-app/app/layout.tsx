import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import Backdrop from "@/app/components/backdrop/Backdrop";
import { profile } from "@/constants";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s — ${profile.firstName}`,
    default: `${profile.name} — Portfolio`,
  },
  description: `${profile.name} — portfolio, experience, projects and contact.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ isolation: "isolate" }}>
        <Backdrop />
        {children}
      </body>
    </html>
  );
}
