"use client";

import { useState, useCallback, useRef } from "react";
import { Upload, X } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import ReactCrop, {
  type Crop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface ImageUploaderProps {
  onImageUpload: (file: File | null, croppedImageUrl: string | null) => void;
  triggerButton?: React.ReactNode;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      1, // square aspect ratio
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export function ImageUploader({
  onImageUpload,
  triggerButton,
}: ImageUploaderProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [isOpen, setIsOpen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (!selectedImage || !crop) {
      // Silent fail - don't show errors to end users in production
      return;
    }

    const canvas = document.createElement("canvas");
    const size = 1200; // Increased output size for better quality
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      // Silent fail - don't show errors to end users in production
      return;
    }

    // Calculate the crop dimensions
    if (!imageRef.current) {
      return;
    }

    const image = imageRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Ensure we're using the correct scaling factors
    const cropX = (crop.x / 100) * image.naturalWidth;
    const cropY = (crop.y / 100) * image.naturalHeight;
    const cropWidth = (crop.width / 100) * image.naturalWidth;
    const cropHeight = (crop.height / 100) * image.naturalHeight;

    // Draw the cropped image with proper anti-aliasing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Fill with background color first to avoid transparency issues
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    // Draw the cropped image
    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      size,
      size
    );

    // Add a warning if the image resolution is too low
    if (cropWidth < 800 || cropHeight < 800) {
      // Log warning but don't show to user in production
      console.warn("Image resolution may be too low for optimal quality");
      // TODO: Show a warning to the user via UI
    }

    // Convert to base64 and pass to parent
    const base64Image = canvas.toDataURL("image/png", 1.0);
    onImageUpload(selectedFile, base64Image);
    setIsOpen(false);
  };

  const handleRemove = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setCrop(undefined);
    onImageUpload(null, null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} data-oid=".24wfka">
      <DialogTrigger asChild data-oid="fxuvmp6">
        {triggerButton || (
          <Button
            variant="outline"
            className="bg-white border-[#0071e1]/20 text-[#000037] hover:bg-[#0071e1]/5 text-base w-full sm:w-auto h-12"
            data-oid="spk1b0u"
          >
            <Upload className="w-5 h-5 mr-2" data-oid="_e9:st." />
            Upload Image
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[600px] w-[calc(100%-32px)] p-4 sm:p-6 bg-[#f7ebda] mx-4 sm:mx-auto"
        data-oid="g9.pftx"
      >
        <DialogHeader className="space-y-2 sm:space-y-3" data-oid="ec1rj0r">
          <DialogTitle
            className="text-[#000037] text-lg sm:text-2xl"
            data-oid="d51i_oa"
          >
            Upload & Crop Image
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4" data-oid="_q7csge">
          {!selectedImage ? (
            <Card
              className="border-2 border-dashed border-[#0071e1]/20 rounded-lg p-4 sm:p-6 text-center bg-white/50"
              data-oid="yq2_1wx"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                data-oid="yl27c-v"
              />

              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
                data-oid="6vabi6j"
              >
                <Upload
                  className="w-10 h-10 sm:w-12 sm:h-12 mb-3 text-[#000037]"
                  data-oid="ssndw0g"
                />
                <p
                  className="text-base sm:text-lg text-[#000037]"
                  data-oid="f3n.cvc"
                >
                  Upload Profile Picture
                </p>
                <p
                  className="text-sm sm:text-base text-[#000037]/60 mt-2"
                  data-oid="12szl-7"
                >
                  PNG, JPG, JPEG (max. 5MB)
                </p>
              </label>
            </Card>
          ) : (
            <div className="space-y-4" data-oid="4zrher3">
              <div className="max-w-full overflow-hidden" data-oid="w0kgopt">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  aspect={1}
                  circularCrop
                  data-oid="83jlh6r"
                >
                  <img
                    ref={imageRef}
                    src={selectedImage}
                    alt="Upload"
                    className="max-h-[200px] sm:max-h-[300px] w-auto mx-auto"
                    onLoad={onImageLoad}
                    data-oid="il1_l6m"
                  />
                </ReactCrop>
              </div>
              <div
                className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4"
                data-oid="wieu3kt"
              >
                <Button
                  onClick={handleCrop}
                  className="bg-[#000037] text-white hover:bg-[#000037]/90 text-base h-10 sm:h-12"
                  data-oid="p8_md-5"
                >
                  Apply Crop
                </Button>
                <Button
                  variant="outline"
                  onClick={handleRemove}
                  className="bg-white border-red-500/20 text-red-600 hover:bg-red-50 text-base h-10 sm:h-12"
                  data-oid="8:iuos-"
                >
                  <X className="h-5 w-5 mr-2" data-oid="x6c5m4." />
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
