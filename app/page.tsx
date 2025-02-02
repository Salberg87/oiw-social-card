"use client";

import { SocialCard } from "./components/social-card";
import { Logo } from "./components/logo";
import { Background } from "./components/background";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Background index={1} />
      <main className="container mx-auto px-2 py-4 sm:px-4 sm:py-6 md:py-12">
        <Logo variant="cream" className="mb-4 sm:mb-8 w-[140px] sm:w-[180px] md:w-[240px]" />
        <div className="w-full sm:w-auto bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg border border-[#000037]/5">
          <SocialCard />
        </div>
      </main>

      {/* Hidden render container for image generation */}
      <div id="render-container" className="fixed -left-[9999px] top-0 pointer-events-none" />
    </div>
  );
}
