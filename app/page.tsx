"use client";

import { ImageGenerator } from "./components/image-generator";
import Image from "next/image";
import { DIRECT_URLS } from "./utils/storage";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7ebda] rounded-none" data-oid="n9ufwmo">
      <main className="container mx-auto px-4 py-6 sm:py-12" data-oid="nvx4egw">
        <div className="mb-8 sm:mb-12 text-center" data-oid="2xqguc.">
          <Image
            src={DIRECT_URLS.logos[0]}
            alt="Oslo Innovation Week 2025"
            width={400}
            height={133}
            className="mx-auto mb-6 w-[280px] sm:w-[400px] h-auto"
            priority
            data-oid="vp5s76o"
            unoptimized
          />

          <h1
            className="text-[#000037] text-3xl sm:text-4xl font-light mb-6 sm:mb-4 px-2"
            data-oid="nweohhq"
          >
            Create Your Social Card
          </h1>
          <p
            className="text-[#000037]/80 max-w-2xl mx-auto text-base sm:text-lg px-2"
            data-oid="q2vooyh"
          >
            Share your presence at Oslo Innovation Week 2025 with a personalized
            social card. Add your photo, interests, and let&apos;s connect!
          </p>
        </div>
        <div
          className="bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-8 shadow-lg border border-[#0071e1]/10"
          data-oid="vkz157m"
        >
          <ImageGenerator data-oid="58mfk0s" />
        </div>
      </main>
    </div>
  );
}
