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
import { AlertCircle, Download, Upload } from "lucide-react";
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
    <div className="space-y-6" data-oid="veel0:m">
      <div className="space-y-3" data-oid="lc_in33">
        <div className="space-y-1" data-oid="qw161s5">
          <h3
            className="font-medium text-[#000037] text-base sm:text-lg"
            data-oid="daqm_cz"
          >
            What Would You Like to Discuss?
          </h3>
          <p className="text-base text-[#000037]/80" data-oid="w4smq3.">
            Add a topic you're passionate about to connect with like-minded attendees at Oslo Innovation Week.
          </p>
        </div>
        <div className="flex justify-start" data-oid=":.yfw4a">
          <Input
            maxLength={150}
            placeholder={PLACEHOLDERS.topic}
            value={formData.topics[0]}
            onChange={(e) => {
              const newTopics = [e.target.value];
              onChange({ ...formData, topics: newTopics });
            }}
            className="bg-white border-[#000037]/20 text-[#000037] placeholder:text-[#000037]/50 text-base sm:text-lg h-12 w-[400px]"
            data-oid="dmv56nn"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <h3 className="font-medium text-[#000037] text-base sm:text-lg">
            Personalize Your Card
          </h3>
          <p className="text-base text-[#000037]/80">
            Make it yours by adding your photo and choosing a background style.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
          <ImageUploader
            onImageUpload={onImageUpload}
            triggerButton={
              <Button
                variant="outline"
                className="bg-white border-[#000037] border text-[#000037] hover:bg-[#000037] hover:text-white transition-colors text-base h-12 w-48"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Image
              </Button>
            }
          />
          <Button
            variant="outline"
            onClick={onChangeBackground}
            className="bg-white border-[#000037] border text-[#000037] hover:bg-[#000037] hover:text-white transition-colors text-base h-12 w-48"
            disabled={isLoadingBackgrounds}
          >
            {isLoadingBackgrounds ? "Loading..." : "Change Background"}
          </Button>
        </div>
      </div>

      <div className="pt-4 flex justify-start">
        <Button
          onClick={onDownload}
          className="bg-[#000037] text-white hover:bg-white hover:text-[#000037] hover:border-[#000037] hover:border text-base h-12 w-[400px]"
          disabled={isLoadingBackgrounds}
        >
          <Download className="w-5 h-5 mr-2" />
          Download Social Card
        </Button>
      </div>
    </div>
  );
}
