"use client";

import { useState, useEffect } from "react";
import { UserForm } from "./user-form";
import { PreviewCard } from "./preview-card";
import { type ImageGeneratorState } from "../types/index";
import { motion } from "framer-motion";
import {
  fetchBackgrounds,
  getBackground,
  BACKGROUNDS,
} from "../utils/backgrounds";
import { fetchLogos, getLogo, LOGOS } from "../utils/logos";
import { TOPICS, PLACEHOLDERS } from "../utils/constants";

const defaultState: ImageGeneratorState = {
  profileImage: null,
  croppedProfileImage: null,
  topics: [TOPICS[Math.floor(Math.random() * TOPICS.length)]],
  backgroundImage: BACKGROUNDS[0],
  logoImage: LOGOS[0],
};

export function ImageGenerator() {
  const [formData, setFormData] = useState<ImageGeneratorState>(defaultState);
  const [backgrounds, setBackgrounds] = useState<string[]>([]);
  const [logos, setLogos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setIsLoading(true);
        const [loadedBackgrounds, loadedLogos] = await Promise.all([
          fetchBackgrounds(),
          fetchLogos(),
        ]);

        setBackgrounds(loadedBackgrounds);
        setLogos(loadedLogos);

        setFormData((prev) => ({
          ...prev,
          backgroundImage: loadedBackgrounds[0] || prev.backgroundImage,
          logoImage: loadedLogos[0] || prev.logoImage,
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load assets");
        console.error("Error loading assets:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssets();
  }, []);

  const handleFormChange = (newData: typeof formData) => {
    // Remove automatic background/logo changes based on name
    setFormData(newData);
  };

  const handleImageUpload = (
    file: File | null,
    croppedImageUrl: string | null,
  ) => {
    setFormData((prev) => ({
      ...prev,
      profileImage: file,
      croppedProfileImage: croppedImageUrl,
    }));
  };

  const handleChangeBackground = () => {
    if (backgrounds.length === 0) return;
    const currentIndex = backgrounds.indexOf(formData.backgroundImage);
    const nextIndex = (currentIndex + 1) % backgrounds.length;
    setFormData((prev) => ({
      ...prev,
      backgroundImage: backgrounds[nextIndex],
    }));
  };

  const handleDownload = () => {
    window.dispatchEvent(new Event("download-image"));
  };

  if (error) {
    return (
      <div className="text-center p-4" data-oid="xvoa_:m">
        <p className="text-red-600 mb-2" data-oid="wsw:u:v">
          Error loading assets: {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-[#0071e1] hover:underline"
          data-oid="k7jdp4d"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-oid="q6xdmim"
    >
      <motion.div
        className="space-y-6 sm:space-y-8"
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        data-oid="_68cudy"
      >
        <section className="space-y-4 sm:space-y-6" data-oid="hj8tbci">
          <div className="space-y-2" data-oid="p1yyu6w">
            <h2
              className="text-xl sm:text-2xl font-semibold text-[#000037]"
              data-oid="1pzqql4"
            >
              Create Your Social Card
            </h2>
            <p className="text-[#000037]/80 text-base" data-oid="sd.9_b9">
              Share your presence at Oslo Innovation Week 2025 with a
              personalized social card.
            </p>
          </div>

          {/* User Form */}
          <UserForm
            formData={formData}
            onChange={handleFormChange}
            onImageUpload={handleImageUpload}
            onChangeBackground={handleChangeBackground}
            onDownload={handleDownload}
            isLoadingBackgrounds={isLoading}
            data-oid="-jdz01g"
          />
        </section>
      </motion.div>

      {/* Preview Section */}
      <motion.div
        initial={{ x: 50 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="lg:sticky lg:top-8"
        data-oid="wtidglp"
      >
        <div className="mb-4 sm:mb-6 space-y-2" data-oid="u6yn.2u">
          <h2
            className="text-xl sm:text-2xl font-semibold text-[#000037]"
            data-oid="hrr:..l"
          >
            Preview
          </h2>
          <p className="text-[#000037]/80 text-base" data-oid="zhua-6x">
            This is how your social card will look. Click the download button
            when you&apos;re ready to share!
          </p>
        </div>
        {/* Preview Card Container */}
        <div className="flex justify-center items-center w-full overflow-hidden" data-oid="-8o0kj1">
          <div
            className="relative"
            style={{
              width: "600px",
              height: "600px",
            }}
          >
            <div
              className="origin-top-left"
              style={{
                transform: "scale(0.5)",
                width: "1200px",
                height: "1200px",
              }}
            >
              <PreviewCard formData={formData} />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
