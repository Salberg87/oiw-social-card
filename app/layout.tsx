import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { displayFont, bodyFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oslo Innovation Week Social Card Generator",
  description:
    "Create your personalized social media card for Oslo Innovation Week 2025. Share your presence and connect with other attendees.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable}`}
      data-oid="m1397_8"
    >
      <body data-oid="y.zev82">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
