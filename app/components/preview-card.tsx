"use client";

/**
 * @fileoverview PreviewCard Component - FINAL VERSION (LOCKED)
 *
 * This is the final, approved version of the OIW social card preview.
 * Layout specifications:
 * - Left-aligned "I'm attending" text and OIW logo at the top
 * - Centered 250x250px profile image
 * - Centered "Talk to me about" section at the bottom
 * - Consistent spacing and typography
 *
 * DO NOT modify this component without explicit approval.
 */

import { useRef, useEffect } from "react";
import Image from "next/image";
import { toPng } from "html-to-image";
import type { ImageGeneratorState } from "../types/index";

interface PreviewCardProps {
  formData: ImageGeneratorState;
}

export function PreviewCard({ formData }: PreviewCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (ref.current) {
      try {
        const image = await toPng(ref.current, {
          quality: 1.0,
          cacheBust: true,
          width: 1200,
          height: 1200,
        });
        const link = document.createElement("a");
        link.href = image;
        link.download = `oiw-social-card.png`;
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
      }
    }
  };

  // Add event listener for download
  useEffect(() => {
    const handleDownloadEvent = () => handleDownload();
    window.addEventListener("download-image", handleDownloadEvent);
    return () =>
      window.removeEventListener("download-image", handleDownloadEvent);
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-[1200px] h-[1200px] bg-[#1E0B2E]"
      data-oid="2r7_d--"
    >
      {/* Background Image */}
      {formData.backgroundImage && (
        <div
          className="absolute inset-0 next-image-container"
          data-oid="rvfh1cg"
        >
          <Image
            src={formData.backgroundImage}
            alt="Background"
            width={1200}
            height={1200}
            className="object-cover w-full h-full"
            priority
            data-oid="7._lrns"
            unoptimized
          />
        </div>
      )}

      {/* Content Container */}
      <div
        className="relative z-10 h-full p-[80px] flex flex-col"
        data-oid="d6a:mo0"
      >
        {/* Top Section - Logo and Attending */}
        <div className="w-full mb-[80px]" data-oid="whozp_l">
          {/* I'm attending text */}
          <h1
            className="font-display text-[100px] font-light text-[#F5F5DC] mb-8"
            data-oid="8rk35pj"
          >
            I&apos;m{" "}
            <span className="italic" data-oid="ycegapl">
              attending
            </span>
          </h1>

          {/* OIW Logo */}
          <div className="w-[300px]" data-oid="ufxdcvb">
            <Image
              src="/GraphicAssets/Logo/OIW25_Logo_Date_RGB_Cream.png"
              alt="Oslo Innovation Week 2025"
              width={300}
              height={98}
              className="w-full h-auto"
              priority
              data-oid=".ecz.xq"
            />
          </div>
        </div>

        {/* Profile Image - Centered */}
        <div className="flex flex-col items-center mb-[80px]" data-oid="zgn_6ei">
          {formData.croppedProfileImage ? (
            <div
              className="w-[450px] h-[450px] rounded-full overflow-hidden bg-gray-100 border-4 border-[#F5F5DC]"
              data-oid=":-0t545"
            >
              <Image
                src={formData.croppedProfileImage}
                alt="Profile"
                width={450}
                height={450}
                className="w-full h-full object-cover"
                data-oid="c_48s7b"
              />
            </div>
          ) : (
            <div
              className="w-[450px] h-[450px] rounded-full bg-gray-100 border-4 border-white/20"
              data-oid="2:f4.uj"
            />
          )}
        </div>

        {/* Talk to me about - Above Profile Section */}
        <div className="w-full text-center mb-[40px] mt-[-40px]" data-oid="w78jnfs">
          <p
            className="text-[#F5F5DC] text-[48px] font-light mb-4"
            data-oid="0u9g-b6"
          >
            Talk to me about:
          </p>
          <div
            className="flex flex-wrap gap-4 justify-center"
            data-oid="7mjb4lk"
          >
            {formData.topics.map((topic: string, index: number) => (
              <span
                key={index}
                className="px-8 py-4 backdrop-blur-sm rounded-full text-[#F5F5DC] text-[40px] bg-[#1E0B2E]"
                data-oid="jztpq8k"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
