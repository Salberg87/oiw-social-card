"use client";

import { useState, useEffect } from "react";
import { UserForm } from "./user-form";
import { PreviewCard } from "./preview-card";
import type { ImageGeneratorState } from "../types";
import { motion } from "framer-motion";
import { fetchBackgrounds } from "../utils/backgrounds";
import { TOPICS, PLACEHOLDERS } from "../utils/constants";

const defaultState: ImageGeneratorState = {
  firstName: PLACEHOLDERS.name,
  lastName: "",
  title: PLACEHOLDERS.title,
  profileImage: null,
  croppedProfileImage: null,
  topics: [TOPICS[Math.floor(Math.random() * TOPICS.length)]],
  backgroundImage:
    "/GraphicAssets/backgrounds/OIW_GraphicAssets_16x9_02.01.png", // Default background
};

export function ImageGenerator() {
  const [formData, setFormData] = useState<ImageGeneratorState>(defaultState);
  const [backgrounds, setBackgrounds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBackgrounds = async () => {
      try {
        setIsLoading(true);
        const loadedBackgrounds = await fetchBackgrounds();
        setBackgrounds(loadedBackgrounds);
        if (loadedBackgrounds.length > 0) {
          setFormData((prev) => ({
            ...prev,
            backgroundImage: loadedBackgrounds[0],
          }));
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load backgrounds",
        );
        console.error("Error loading backgrounds:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBackgrounds();
  }, []);

  const handleFormChange = (newData: typeof formData) => {
    if (newData.firstName !== formData.firstName && backgrounds.length > 0) {
      // Create a deterministic index based on the name
      const total = newData.firstName
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      newData.backgroundImage = backgrounds[total % backgrounds.length];
    }
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
      <div className="text-center p-4" data-oid="8nwhdm2">
        <p className="text-red-600 mb-2" data-oid="sx_4c09">
          Error loading backgrounds: {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-[#0071e1] hover:underline"
          data-oid=":08sql5"
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
              className="text-xl sm:text-2xl font-semibold text-[#005338]"
              data-oid="1pzqql4"
            >
              Tell us about yourself
            </h2>
            <p className="text-[#005338]/80 text-base" data-oid="sd.9_b9">
              Fill in your details to create your personalized social card for
              Oslo Innovation Week 2025.
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
            className="text-xl sm:text-2xl font-semibold text-[#005338]"
            data-oid="hrr:..l"
          >
            Preview
          </h2>
          <p className="text-[#005338]/80 text-base" data-oid="zhua-6x">
            This is how your social card will look. Click the download button
            when you&apos;re ready to share!
          </p>
        </div>
        <div
          className="bg-[#005338]/5 backdrop-blur-sm p-2 sm:p-4 border border-[#0071e1]/10 overflow-hidden w-[700px] h-[700px] pl-px flex rounded-none"
          data-oid="iidc6cg"
        >
          <div
            className="max-w-[600px] mx-auto w-full h-full"
            data-oid="-8o0kj1"
          >
            {isLoading ? (
              <div
                className="flex items-center justify-center h-full"
                data-oid="6-n3w._"
              >
                <div
                  className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0071e1]"
                  data-oid="e1wht7m"
                ></div>
              </div>
            ) : (
              <PreviewCard formData={formData} data-oid="kz605qs" />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
