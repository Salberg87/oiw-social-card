"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { ImageGeneratorState } from "../types";
import { AlertCircle, Download } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import Image from "next/image";
import { TOPICS, PLACEHOLDERS } from "../utils/constants";
import { Button } from "./ui/button";
import { ImageUploader } from "./image-uploader";

const BACKGROUND_IMAGES = [
  "GraphicAssets/backgrounds/OIW_GraphicAssets_16x9_02.04.png",
  "GraphicAssets/backgrounds/OIW_GraphicAssets_16x9_02.05.png",
  "GraphicAssets/backgrounds/OIW_GraphicAssets_16x9_02.06.png",
] as const;

interface UserFormProps {
  formData: ImageGeneratorState;
  onChange: (data: ImageGeneratorState) => void;
  onImageUpload: (file: File | null, croppedImageUrl: string | null) => void;
  onChangeBackground: () => void;
  onDownload: () => void;
  isLoadingBackgrounds?: boolean;
}

export function UserForm({
  formData,
  onChange,
  onImageUpload,
  onChangeBackground,
  onDownload,
  isLoadingBackgrounds = false,
}: UserFormProps) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof ImageGeneratorState, string>>
  >({});

  const validateField = (name: keyof ImageGeneratorState, value: string) => {
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: "This field is required" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleChange = (name: keyof ImageGeneratorState, value: string) => {
    validateField(name, value);
    onChange({ ...formData, [name]: value });
  };

  return (
    <div className="space-y-8" data-oid="veel0:m">
      <div className="space-y-4 sm:space-y-6" data-oid="1qf6u0d">
        <div className="space-y-2" data-oid="a1ay16x">
          <Label
            htmlFor="firstName"
            className="text-[#005338] text-base sm:text-lg"
            data-oid="3wq2r2e"
          >
            Your Name
          </Label>
          <Input
            id="Name"
            placeholder={PLACEHOLDERS.name}
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className={`bg-white border-[#0071e1]/20 text-[#005338] placeholder:text-[#005338]/50 text-base sm:text-lg h-12 ${errors.firstName ? "border-red-500" : ""}`}
            data-oid="pm-c.v-"
          />

          {errors.firstName && (
            <p
              className="text-red-600 text-sm sm:text-base flex items-center"
              data-oid="t_f73bo"
            >
              <AlertCircle className="w-4 h-4 mr-1" data-oid="ngn-wkj" />
              {errors.firstName}
            </p>
          )}
        </div>
        <div className="space-y-2" data-oid="z:h:ya3">
          <Label
            htmlFor="title"
            className="text-[#005338] text-base sm:text-lg"
            data-oid="r2fu4y4"
          >
            Your Title
          </Label>
          <Input
            id="title"
            placeholder={PLACEHOLDERS.title}
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={`bg-white border-[#0071e1]/20 text-[#005338] placeholder:text-[#005338]/50 text-base sm:text-lg h-12 ${errors.title ? "border-red-500" : ""}`}
            data-oid="zl7.2kg"
          />

          {errors.title && (
            <p
              className="text-red-600 text-sm sm:text-base flex items-center"
              data-oid="c5zw.:5"
            >
              <AlertCircle className="w-4 h-4 mr-1" data-oid="w2f--qn" />
              {errors.title}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4" data-oid="lc_in33">
        <div className="space-y-2" data-oid="qw161s5">
          <h3
            className="font-medium text-[#005338] text-base sm:text-lg"
            data-oid="daqm_cz"
          >
            Talk Topic
          </h3>
          <p className="text-base text-[#005338]/80" data-oid="w4smq3.">
            Write what you&apos;d like to discuss with other attendees during
            Oslo Innovation Week. This will be displayed on your social tile to
            help facilitate meaningful connections.
          </p>
        </div>
        <div className="grid gap-4" data-oid=":.yfw4a">
          <Input
            maxLength={150}
            placeholder={PLACEHOLDERS.topic}
            value={formData.topics[0]}
            onChange={(e) => {
              const newTopics = [e.target.value];
              onChange({ ...formData, topics: newTopics });
            }}
            className="bg-white border-[#0071e1]/20 text-[#005338] placeholder:text-[#005338]/50 text-base sm:text-lg h-12"
            data-oid="dmv56nn"
          />
        </div>
      </div>

      <div className="space-y-4" data-oid="cai0k72">
        <div className="space-y-2" data-oid="xb-b1bb">
          <h3
            className="font-medium text-[#005338] text-base sm:text-lg"
            data-oid="8_z2.34"
          >
            Profile Picture
          </h3>
          <p className="text-base text-[#005338]/80" data-oid="d3yulee">
            Add your profile picture to make your social card more personal.
          </p>
        </div>
        <div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          data-oid="-l26dro"
        >
          <ImageUploader onImageUpload={onImageUpload} data-oid="v5nyvbb" />
          <Button
            variant="outline"
            onClick={onChangeBackground}
            className="bg-white border-[#0071e1]/20 text-[#005338] hover:bg-[#0071e1]/5 text-base h-12"
            disabled={isLoadingBackgrounds}
            data-oid="yk3vkac"
          >
            {isLoadingBackgrounds
              ? "Loading backgrounds..."
              : "Change Background"}
          </Button>
        </div>
      </div>

      <div className="pt-4" data-oid="de53qe:">
        <Button
          onClick={onDownload}
          className="w-full bg-[#0071e1] text-white hover:bg-[#0071e1]/90 text-base sm:text-lg h-12 sm:h-14"
          disabled={isLoadingBackgrounds}
          data-oid="ouchani"
        >
          <Download className="w-5 h-5 mr-2" data-oid="d9vs8uf" />
          Download Social Card
        </Button>
      </div>
    </div>
  );
}
