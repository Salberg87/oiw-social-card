"use client";

import { useState } from "react";
import { UserForm } from "./user-form";
import { PreviewCard } from "./preview-card";
import type { ImageGeneratorState } from "../types";
import { motion } from "framer-motion";
import { getBackground, BACKGROUNDS } from "../utils/backgrounds";
import { TOPICS, PLACEHOLDERS } from "../utils/constants";

const defaultState: ImageGeneratorState = {
  firstName: PLACEHOLDERS.name,
  lastName: "",
  title: PLACEHOLDERS.title,
  profileImage: null,
  croppedProfileImage: null,
  topics: [TOPICS[Math.floor(Math.random() * TOPICS.length)]],
  backgroundImage: getBackground(),
};

export function ImageGenerator() {
  const [formData, setFormData] = useState<ImageGeneratorState>(defaultState);

  const handleFormChange = (newData: typeof formData) => {
    if (newData.firstName !== formData.firstName) {
      newData.backgroundImage = getBackground(newData.firstName);
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
    const currentIndex = BACKGROUNDS.indexOf(formData.backgroundImage);
    const nextIndex = (currentIndex + 1) % BACKGROUNDS.length;
    setFormData((prev) => ({
      ...prev,
      backgroundImage: BACKGROUNDS[nextIndex],
    }));
  };

  const handleDownload = () => {
    window.dispatchEvent(new Event("download-image"));
  };

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-oid="6zy0n3c"
    >
      <motion.div
        className="space-y-6 sm:space-y-8"
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        data-oid="7t9ysn-"
      >
        <section className="space-y-4 sm:space-y-6" data-oid="6x93fbo">
          <div className="space-y-2" data-oid="gcp9ah_">
            <h2
              className="text-xl sm:text-2xl font-semibold text-[#005338]"
              data-oid="d7ab02b"
            >
              Tell us about yourself
            </h2>
            <p className="text-[#005338]/80 text-base" data-oid="-tojwe6">
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
            data-oid="-hxau02"
          />
        </section>
      </motion.div>

      {/* Preview Section */}
      <motion.div
        initial={{ x: 50 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="lg:sticky lg:top-8"
        data-oid="het602u"
      >
        <div
          className="mb-4 sm:mb-6 space-y-2"
          data-oid="7jnu4as"
          key="olk-EBe6"
        >
          <h2
            className="text-xl sm:text-2xl font-semibold text-[#005338]"
            data-oid="m3xwpuw"
          >
            Preview
          </h2>
          <p className="text-[#005338]/80 text-base" data-oid="tqd.zyn">
            This is how your social card will look. Click the download button
            when you&apos;re ready to share!
          </p>
        </div>
        <div
          className="bg-[#005338]/5 backdrop-blur-sm p-2 sm:p-4 border border-[#0071e1]/10 overflow-hidden w-[700px] h-[700px] pl-px flex rounded-none"
          data-oid="9ckpe4a"
          key="olk-R7wq"
        >
          <div
            className="max-w-[600px] mx-auto w-full h-full"
            data-oid="y9pl.db"
          >
            <PreviewCard formData={formData} data-oid="2rsmk6r" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
