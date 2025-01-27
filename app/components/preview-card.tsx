"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useScreenshot } from "use-react-screenshot";
import type { ImageGeneratorState } from "../types";

interface PreviewCardProps {
  formData: ImageGeneratorState;
}

export function PreviewCard({ formData }: PreviewCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [, takeScreenshot] = useScreenshot();

  const handleDownload = async () => {
    if (ref.current) {
      const image = await takeScreenshot(ref.current);
      if (image) {
        const link = document.createElement("a");
        link.href = image;
        link.download = "oiw-social-card.png";
        link.click();
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
      className="relative aspect-square overflow-hidden"
      data-oid="2r7_d--"
    >
      {/* Background Image */}
      {formData.backgroundImage && (
        <Image
          src={formData.backgroundImage}
          alt="Background"
          fill
          className="object-cover"
          priority
          data-oid="7._lrns"
        />
      )}

      {/* Content Container */}
      <div
        className="relative z-10 h-full p-12 flex flex-col"
        data-oid="d6a:mo0"
      >
        {/* Top Section */}
        <div className="flex flex-col items-start" data-oid="whozp_l">
          {/* I'm attending text */}
          <h1
            className="font-display text-4xl font-light text-[#F5F5DC] mb-6 pl-1"
            data-oid="8rk35pj"
          >
            I&apos;m{" "}
            <span className="italic" data-oid="ycegapl">
              attending
            </span>
          </h1>

          {/* OIW Logo and Topics Row */}
          <div
            className="flex items-start gap-8 w-full pl-1"
            data-oid="aweqgav"
          >
            {/* OIW Logo */}
            <div className="w-[200px]" data-oid="ufxdcvb">
              <Image
                src="/GrapicAssets/Logo/OIW25_Logo_Date_RGB_Cream.png"
                alt="Oslo Innovation Week 2025"
                width={200}
                height={66}
                className="w-full h-auto"
                priority
                data-oid=".ecz.xq"
              />
            </div>

            {/* Talk to me about */}
            <div className="flex-1" data-oid="w78jnfs">
              <p
                className="text-[#F5F5DC] mb-2 text-[24px] text-right"
                data-oid="0u9g-b6"
              >
                Talk to me about:
              </p>
              <div
                className="flex flex-wrap gap-2 justify-end"
                data-oid="7mjb4lk"
              >
                {formData.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 backdrop-blur-sm rounded-full text-[#F5F5DC] text-[24px] bg-[#1E0B2E]"
                    data-oid="jztpq8k"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section - Centered */}
        <div
          className="flex flex-col items-center mt-auto mb-4"
          data-oid="zgn_6ei"
        >
          {/* Profile Image */}
          {formData.croppedProfileImage ? (
            <div
              className="w-[200px] h-[200px] rounded-full overflow-hidden bg-gray-100 border-2 border-[#F5F5DC] mb-4"
              data-oid=":-0t545"
            >
              <Image
                src={formData.croppedProfileImage}
                alt="Profile"
                width={200}
                height={200}
                className="w-full h-full object-cover"
                data-oid="c_48s7b"
              />
            </div>
          ) : (
            <div
              className="w-[200px] h-[200px] rounded-full bg-gray-100 border-4 border-white/20 mb-4"
              data-oid="2:f4.uj"
            />
          )}

          {/* Text Content */}
          <div className="text-center space-y-2" data-oid="6nzx5a.">
            <div
              className="bg-[#1E0B2E] rounded-lg px-4 py-2"
              data-oid="rhay2cr"
            >
              <h2
                className="text-2xl font-semibold text-[#F5F5DC]"
                data-oid="hofzkwy"
              >
                {formData.firstName} {formData.lastName}
              </h2>
            </div>
            <div
              className="bg-[#1E0B2E] rounded-lg px-4 py-2"
              data-oid="d3bv-5e"
            >
              <p className="text-lg text-[#F5F5DC]" data-oid="djahq2:">
                {formData.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
