"use client";

import { useState, useRef } from "react";
import type { ImageGeneratorState } from "../types";
import { Download, Upload } from "lucide-react";

import { Button } from "./ui/button";
import { ImageUploader } from "./image-uploader";
import { Input } from "./ui/input";

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
  const [isDownloading, setIsDownloading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (value: string) => {
    onChange({ ...formData, topic: value });
  };

  const handleDownloadWrapper = async () => {
    try {
      setIsDownloading(true);
      await onDownload();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2 sm:space-y-3">
        <div className="space-y-1">
          <h3 className="font-medium text-[#000037] text-base sm:text-lg">
            What Would You Like to Discuss?
          </h3>
          <p className="text-sm sm:text-base text-[#000037]/80">
            Add a topic you're passionate about to connect with like-minded attendees at Oslo Innovation Week.
          </p>
        </div>
        <div className="flex justify-start relative">
          <Input
            ref={inputRef}
            type="text"
            maxLength={150}
            value={formData.topic || ''}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            role="textbox"
            aria-autocomplete="none"
            onChange={(e) => handleInputChange(e.target.value)}
            className="bg-white border-[#000037]/20 text-[#000037] placeholder:text-[#000037]/50 text-sm sm:text-base h-10 sm:h-12 w-full sm:w-[400px] focus:border-[#0071e1] focus:ring-2 focus:ring-[#0071e1] transition-colors"
            aria-label="Topic"
            placeholder="Enter your topic..."
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none'
            }}
            list="none"
            data-lpignore="true"
            data-form-type="other"
          />
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div className="space-y-1">
          <h3 className="font-medium text-[#000037] text-base sm:text-lg">
            Personalize Your Card
          </h3>
          <p className="text-sm sm:text-base text-[#000037]/80">
            Make it yours by adding your photo and choosing a background style.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-start">
          <ImageUploader
            onImageUpload={onImageUpload}
            triggerButton={
              <Button
                variant="outline"
                className="bg-white border-[#000037] border text-[#000037] hover:bg-[#000037] hover:text-white transition-colors text-sm sm:text-base h-10 sm:h-12 w-full sm:w-48"
              >
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Upload Image
              </Button>
            }
          />
          <Button
            variant="outline"
            onClick={onChangeBackground}
            className="bg-white border-[#000037] border text-[#000037] hover:bg-[#000037] hover:text-white transition-colors text-sm sm:text-base h-10 sm:h-12 w-full sm:w-48"
            disabled={isLoadingBackgrounds}
          >
            {isLoadingBackgrounds ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-[#000037] border-t-transparent rounded-full animate-spin mr-2" />
                Loading...
              </div>
            ) : (
              "Change Background"
            )}
          </Button>
        </div>
      </div>

      <div className="pt-2 sm:pt-4 flex justify-start">
        <Button
          onClick={handleDownloadWrapper}
          className="bg-[#000037] text-white hover:bg-white hover:text-[#000037] hover:border-[#000037] hover:border text-sm sm:text-base h-10 sm:h-12 w-full sm:w-[400px]"
          disabled={isLoadingBackgrounds || isDownloading}
        >
          {isDownloading ? (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Generating...
            </div>
          ) : (
            <>
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Download Social Card
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
