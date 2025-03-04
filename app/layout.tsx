import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { displayFont, bodyFont } from "./fonts";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Oslo Innovation Week Social Card Generator",
  description:
    "Create your personalized social media card for Oslo Innovation Week 2025. Share your presence and connect with other attendees.",
  other: {
    'nextjs-font-optimization': 'true',
  }
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
      <head>
        {/* No need for manual preload links as Next.js handles font optimization */}
      </head>
      <body data-oid="y.zev82">
        {children}
        <SpeedInsights />

        {/* This is a placeholder script - replace with actual analytics in production */}
        {/* 
        <Script
          src="https://cdn.your-analytics-provider.com/script.js"
          strategy="lazyOnload"
        />
        */}
      </body>
    </html>
  );
}
