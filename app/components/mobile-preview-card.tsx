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
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [imagesPreloaded, setImagesPreloaded] = useState(false);
    const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);
    const [logoImageLoaded, setLogoImageLoaded] = useState(false);
    const [profileImageLoaded, setProfileImageLoaded] = useState(!formData.croppedProfileImage);
    const [backgroundImageSrc, setBackgroundImageSrc] = useState<string | null>(null);
    const [logoImageSrc, setLogoImageSrc] = useState<string | null>(null);
    const [profileImageSrc, setProfileImageSrc] = useState<string | null>(null);
    const [preloadStatus, setPreloadStatus] = useState({
        background: false,
        logo: false,
        profile: !formData.croppedProfileImage
    });
    const [scale, setScale] = useState(1);

    // Keep the preview responsively scaled to fit its container (mobile)
    useEffect(() => {
        const updateScale = () => {
            if (!wrapperRef.current) return;
            const { clientWidth, clientHeight } = wrapperRef.current;
            const horizontalScale = clientWidth / 1200;
            const verticalScale = clientHeight / 1200;
            const newScale = Math.min(horizontalScale, verticalScale);
            setScale(Number.isFinite(newScale) && newScale > 0 ? newScale : 1);
        };

        updateScale();
        const ro = new ResizeObserver(updateScale);
        if (wrapperRef.current) ro.observe(wrapperRef.current);
        return () => {
            try { if (wrapperRef.current) ro.unobserve(wrapperRef.current); } catch {}
        };
    }, []);

    // Load and preprocess images for reliable rendering on mobile
    useEffect(() => {
        const loadImages = async () => {
            setImagesPreloaded(false);

            // Helper function to load an image and convert to data URL
            const loadImageAsDataUrl = async (src: string): Promise<string | null> => {
                try {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.crossOrigin = "anonymous"; // Important for CORS
                        img.onload = () => {
                            try {
                                // Create canvas and convert to data URL
                                const canvas = document.createElement('canvas');
                                canvas.width = img.width;
                                canvas.height = img.height;
                                const ctx = canvas.getContext('2d');
                                if (!ctx) {
                                    reject(new Error("Failed to get canvas context"));
                                    return;
                                }
                                ctx.drawImage(img, 0, 0);
                                const dataUrl = canvas.toDataURL('image/png');
                                resolve(dataUrl);
                            } catch (err) {
                                logger.error("Error converting image to data URL:", err);
                                reject(err);
                            }
                        };
                        img.onerror = (e) => {
                            logger.error("Error loading image:", e);
                            reject(e);
                        };
                        img.src = src;
                    });
                } catch (error) {
                    logger.error("Failed to load image as data URL:", error);
                    return null;
                }
            };

            // Load background image
            if (formData.backgroundImage) {
                try {
                    const dataUrl = await loadImageAsDataUrl(formData.backgroundImage);
                    if (dataUrl) {
                        setBackgroundImageSrc(dataUrl);
                        setBackgroundImageLoaded(true);
                        setPreloadStatus(prev => ({ ...prev, background: true }));
                        logger.log("Background image processed and loaded");
                    }
                } catch (error) {
                    logger.error("Failed to process background image:", error);
                    setPreloadStatus(prev => ({ ...prev, background: true })); // Mark as loaded anyway to prevent blocking
                }
            } else {
                setPreloadStatus(prev => ({ ...prev, background: true }));
            }

            // Load logo image
            if (formData.logoImage) {
                try {
                    const dataUrl = await loadImageAsDataUrl(formData.logoImage);
                    if (dataUrl) {
                        setLogoImageSrc(dataUrl);
                        setLogoImageLoaded(true);
                        setPreloadStatus(prev => ({ ...prev, logo: true }));
                        logger.log("Logo image processed and loaded");
                    }
                } catch (error) {
                    logger.error("Failed to process logo image:", error);
                    setPreloadStatus(prev => ({ ...prev, logo: true })); // Mark as loaded anyway to prevent blocking
                }
            } else {
                setPreloadStatus(prev => ({ ...prev, logo: true }));
            }

            // Load profile image if exists
            if (formData.croppedProfileImage) {
                try {
                    // For user-uploaded images, we can use them directly
                    // as they're already data URLs in most cases
                    if (formData.croppedProfileImage.startsWith('data:')) {
                        setProfileImageSrc(formData.croppedProfileImage);
                        setProfileImageLoaded(true);
                        setPreloadStatus(prev => ({ ...prev, profile: true }));
                        logger.log("Profile image loaded directly");
                    } else {
                        const dataUrl = await loadImageAsDataUrl(formData.croppedProfileImage);
                        if (dataUrl) {
                            setProfileImageSrc(dataUrl);
                            setProfileImageLoaded(true);
                            setPreloadStatus(prev => ({ ...prev, profile: true }));
                            logger.log("Profile image processed and loaded");
                        }
                    }
                } catch (error) {
                    logger.error("Failed to process profile image:", error);
                    setPreloadStatus(prev => ({ ...prev, profile: true })); // Mark as loaded anyway to prevent blocking
                }
            } else {
                setPreloadStatus(prev => ({ ...prev, profile: true }));
            }

            // Check if all images are loaded
            setTimeout(() => {
                const allLoaded = preloadStatus.background && preloadStatus.logo && preloadStatus.profile;
                if (allLoaded) {
                    logger.log("All images preloaded successfully");
                    setImagesPreloaded(true);
                }
            }, 500);
        };

        loadImages();
    }, [formData, preloadStatus]);

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
        <div ref={wrapperRef} className="relative w-full aspect-square overflow-hidden">
            <div
                ref={ref}
                className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px]"
                style={{
                    transform: `translate(-50%, -50%) scale(${isGenerating ? 1 : scale})`,
                    transformOrigin: "center center",
                    backgroundColor: "#1E0B2E",
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
        </div>
    );
} 