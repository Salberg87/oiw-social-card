"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Logo } from "./logo";
import { Skeleton } from "./ui/skeleton";
import { type ImageGeneratorState } from "../types/index";

interface ImagePreviewProps {
    formData: ImageGeneratorState;
    scale?: number;
    onImageLoad?: () => void;
    isPreviewMode?: boolean;
}

export function ImagePreview({
    formData,
    scale = 1,
    onImageLoad,
    isPreviewMode = false
}: ImagePreviewProps) {
    const [bgImageLoaded, setBgImageLoaded] = useState(false);
    const [profileImageLoaded, setProfileImageLoaded] = useState(false);

    // Notify parent when all images are loaded
    useEffect(() => {
        if (bgImageLoaded && (profileImageLoaded || !formData.croppedProfileImage)) {
            onImageLoad?.();
        }
    }, [bgImageLoaded, profileImageLoaded, formData.croppedProfileImage, onImageLoad]);

    const previewStyles = isPreviewMode
        ? {
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: 'center center'
        }
        : {};

    const previewClasses = isPreviewMode
        ? "absolute top-1/2 left-1/2 w-[1200px] h-[1200px]"
        : "w-full h-full";

    return (
        <div className={previewClasses} style={previewStyles}>
            <div className="w-full h-full relative">
                {!bgImageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}
                <Image
                    src={formData.backgroundImage}
                    alt="Background"
                    fill
                    sizes="100vw"
                    className={`object-cover transition-opacity duration-300 ${bgImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    priority={true}
                    quality={90}
                    crossOrigin="anonymous"
                    onLoad={() => {
                        setBgImageLoaded(true);
                    }}
                    onError={() => {
                        setBgImageLoaded(true); // Show fallback content
                    }}
                />
                <div className="relative z-10 w-full h-full p-[80px] flex flex-col">
                    <div className="flex justify-between items-start mb-auto">
                        <h1 className="font-display text-[120px] font-light text-[#F5F5DC] leading-none">
                            I&apos;m{" "}
                            <span className="italic">attending</span>
                        </h1>
                        <div className="w-[350px]">
                            <Logo variant="cream" width={350} height={115} />
                        </div>
                    </div>

                    <div className="flex justify-center mb-20">
                        {formData.croppedProfileImage ? (
                            <div className="w-[450px] h-[450px] rounded-full overflow-hidden bg-gray-100 border-4 border-[#F5F5DC] relative">
                                {!profileImageLoaded && (
                                    <Skeleton className="absolute inset-0 w-full h-full rounded-full" />
                                )}
                                <Image
                                    src={formData.croppedProfileImage}
                                    alt="Profile"
                                    width={450}
                                    height={450}
                                    className={`w-full h-full object-cover transition-opacity duration-300 ${profileImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                    crossOrigin="anonymous"
                                    onLoad={() => setProfileImageLoaded(true)}
                                    onError={() => {
                                        setProfileImageLoaded(true); // Show fallback content
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="w-[450px] h-[450px] rounded-full bg-gray-100 border-4 border-white/20" />
                        )}
                    </div>

                    <div className="flex flex-col items-center gap-5">
                        <div className="flex gap-2 flex-wrap justify-center">
                            {formData.topics && formData.topics.map((topic, index) => (
                                <span
                                    key={`topic-${index}`}
                                    className="bg-[#F5F5DC] px-5 py-2 rounded-full text-[#000037] font-medium text-[36px]"
                                >
                                    {topic}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 