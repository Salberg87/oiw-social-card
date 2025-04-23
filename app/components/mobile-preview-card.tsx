"use client";

/**
 * Mobile-optimized version of the PreviewCard component
 * Uses more reliable rendering techniques for mobile devices
 */

import { useRef, useEffect, useState } from "react";
import { toPng } from "html-to-image";
import type { ImageGeneratorState } from "../types/index";
import { logger } from "../utils/logger";

interface MobilePreviewCardProps {
    formData: ImageGeneratorState;
}

export function MobilePreviewCard({ formData }: MobilePreviewCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [imagesPreloaded, setImagesPreloaded] = useState(false);
    const [preloadStatus, setPreloadStatus] = useState({
        background: false,
        logo: false,
        profile: formData.croppedProfileImage ? false : true // True if no profile image
    });

    // Pre-load all images before generating the card
    useEffect(() => {
        const preloadImages = async () => {
            setImagesPreloaded(false);
            const updatedStatus = { ...preloadStatus };

            // Preload background image
            if (formData.backgroundImage) {
                try {
                    await new Promise((resolve, reject) => {
                        const img = new Image();
                        img.onload = () => {
                            updatedStatus.background = true;
                            setPreloadStatus(prev => ({ ...prev, background: true }));
                            resolve(img);
                        };
                        img.onerror = (e) => {
                            logger.error("Error preloading background:", e);
                            reject(e);
                        };
                        img.src = formData.backgroundImage;
                    });
                    logger.log("Background image preloaded successfully");
                } catch (error) {
                    logger.error("Failed to preload background image:", error);
                }
            } else {
                updatedStatus.background = true;
                setPreloadStatus(prev => ({ ...prev, background: true }));
            }

            // Preload logo image
            if (formData.logoImage) {
                try {
                    await new Promise((resolve, reject) => {
                        const img = new Image();
                        img.onload = () => {
                            updatedStatus.logo = true;
                            setPreloadStatus(prev => ({ ...prev, logo: true }));
                            resolve(img);
                        };
                        img.onerror = (e) => {
                            logger.error("Error preloading logo:", e);
                            reject(e);
                        };
                        img.src = formData.logoImage;
                    });
                    logger.log("Logo image preloaded successfully");
                } catch (error) {
                    logger.error("Failed to preload logo image:", error);
                }
            } else {
                updatedStatus.logo = true;
                setPreloadStatus(prev => ({ ...prev, logo: true }));
            }

            // Preload profile image
            if (formData.croppedProfileImage) {
                try {
                    await new Promise((resolve, reject) => {
                        const img = new Image();
                        img.onload = () => {
                            updatedStatus.profile = true;
                            setPreloadStatus(prev => ({ ...prev, profile: true }));
                            resolve(img);
                        };
                        img.onerror = (e) => {
                            logger.error("Error preloading profile image:", e);
                            reject(e);
                        };
                        img.src = formData.croppedProfileImage!;
                    });
                    logger.log("Profile image preloaded successfully");
                } catch (error) {
                    logger.error("Failed to preload profile image:", error);
                }
            } else {
                updatedStatus.profile = true;
                setPreloadStatus(prev => ({ ...prev, profile: true }));
            }

            // Set overall preloaded state when all images are ready
            const allPreloaded = updatedStatus.background && updatedStatus.logo && updatedStatus.profile;
            if (allPreloaded) {
                logger.log("All images preloaded successfully");
                setImagesPreloaded(true);
            }
        };

        preloadImages();
    }, [formData]);

    const generateImage = async () => {
        if (!ref.current) return null;

        try {
            // Wait to ensure all assets are fully rendered
            await new Promise(resolve => setTimeout(resolve, 500));

            const options = {
                quality: 1.0,
                cacheBust: true,
                width: 1200,
                height: 1200,
                pixelRatio: 2, // Higher pixel ratio for better quality
                canvasWidth: 1200,
                canvasHeight: 1200,
                skipAutoScale: true,
                style: {
                    // Force background rendering
                    backgroundColor: "#1E0B2E",
                },
            };

            return await toPng(ref.current, options);
        } catch (error) {
            logger.error("Error generating image:", error);
            return null;
        }
    };

    // Fallback image generation (inline SVG + Canvas)
    const generateFallbackImage = async () => {
        if (!ref.current) return null;

        try {
            // Create a canvas element
            const canvas = document.createElement('canvas');
            canvas.width = 1200;
            canvas.height = 1200;
            const ctx = canvas.getContext('2d');

            if (!ctx) return null;

            // Fill background with solid color
            ctx.fillStyle = '#1E0B2E';
            ctx.fillRect(0, 0, 1200, 1200);

            // Draw text elements
            ctx.fillStyle = '#F5F5DC';
            ctx.font = '120px serif';
            ctx.fillText("I'm attending", 80, 150);

            // Circle for profile image
            ctx.beginPath();
            ctx.arc(600, 450, 225, 0, 2 * Math.PI);
            ctx.fillStyle = '#F5F5DC';
            ctx.strokeStyle = '#F5F5DC';
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.fillStyle = 'white';
            ctx.fill();

            // Draw "Talk to me about" text
            ctx.fillStyle = '#F5F5DC';
            ctx.font = '48px sans-serif';
            ctx.fillText("Talk to me about:", 400, 750);

            // Draw topic pill
            ctx.fillStyle = '#1E0B2E';
            ctx.beginPath();
            const topicText = formData.topic || 'My interests';
            const textWidth = ctx.measureText(topicText).width;
            const pillWidth = textWidth + 80;
            ctx.roundRect(600 - pillWidth / 2, 800, pillWidth, 80, 40);
            ctx.fill();

            // Draw topic text
            ctx.fillStyle = '#F5F5DC';
            ctx.font = '40px sans-serif';
            ctx.fillText(topicText, 600 - textWidth / 2, 850);

            return canvas.toDataURL('image/png');
        } catch (error) {
            logger.error("Error generating fallback image:", error);
            return null;
        }
    };

    const handleDownload = async () => {
        if (isGenerating) return;

        try {
            setIsGenerating(true);

            // Try the normal method first
            let imageUrl = await generateImage();

            // If that fails, use the fallback method
            if (!imageUrl && retryCount < 2) {
                logger.log("Primary image generation failed, trying fallback...");
                setRetryCount(prev => prev + 1);
                imageUrl = await generateFallbackImage();
            }

            if (imageUrl) {
                const link = document.createElement("a");
                link.href = imageUrl;
                link.download = `oiw-social-card.png`;
                link.click();
            } else {
                alert("We couldn't generate your social card. Please try again on a desktop device.");
            }
        } catch (error) {
            logger.error("Error in download process:", error);
            alert("There was an error generating your image. Please try again or use a desktop device.");
        } finally {
            setIsGenerating(false);
        }
    };

    // Add event listener for download
    useEffect(() => {
        const handleDownloadEvent = () => handleDownload();
        window.addEventListener("download-image", handleDownloadEvent);
        return () =>
            window.removeEventListener("download-image", handleDownloadEvent);
    }, [retryCount]); // Include retryCount in dependencies to update the handler

    return (
        <div
            ref={ref}
            className="relative w-[1200px] h-[1200px]"
            style={{
                backgroundColor: "#1E0B2E", // Fallback background color
                backgroundImage: formData.backgroundImage ? `url(${formData.backgroundImage})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Display loading indicator if images aren't preloaded */}
            {!imagesPreloaded && (
                <div className="absolute inset-0 bg-[#1E0B2E] flex items-center justify-center z-20">
                    <div className="text-center text-white">
                        <div className="mb-4 text-2xl">Loading assets...</div>
                        <div className="w-64 bg-gray-700 rounded-full h-4 overflow-hidden">
                            <div
                                className="bg-white h-full transition-all"
                                style={{
                                    width: `${(Object.values(preloadStatus).filter(Boolean).length / 3) * 100}%`
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Content Container */}
            <div className="relative z-10 h-full p-[80px] flex flex-col">
                {/* Top Section - Logo and Attending */}
                <div className="w-full mb-[80px] flex items-center justify-between">
                    {/* I'm attending text */}
                    <h1 className="font-display text-[120px] font-light text-[#F5F5DC] mb-8 leading-none">
                        I&apos;m <span className="italic">attending</span>
                    </h1>

                    {/* OIW Logo - Using img tag instead of Next.js Image */}
                    <div className="w-[350px]">
                        <img
                            src={formData.logoImage}
                            alt="Oslo Innovation Week 2025"
                            width={350}
                            height={115}
                            className="w-full h-auto"
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </div>

                {/* Profile Image - Centered */}
                <div className="flex flex-col items-center mb-[80px]">
                    {formData.croppedProfileImage ? (
                        <div
                            className="w-[450px] h-[450px] rounded-full overflow-hidden bg-gray-100 border-4 border-[#F5F5DC]"
                            style={{
                                backgroundImage: `url(${formData.croppedProfileImage})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                    ) : (
                        <div className="w-[450px] h-[450px] rounded-full bg-gray-100 border-4 border-white/20" />
                    )}
                </div>

                {/* Talk to me about - Above Profile Section */}
                <div className="w-full text-center mb-[40px] mt-[-40px]">
                    <p className="text-[#F5F5DC] text-[48px] font-light mb-4">
                        Talk to me about:
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {formData.topic && (
                            <span
                                className="px-8 py-4 backdrop-blur-sm rounded-full text-[#F5F5DC] text-[40px] bg-[#1E0B2E]"
                            >
                                {formData.topic}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 