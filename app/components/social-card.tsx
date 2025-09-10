/**
 * @fileoverview SocialCard Component
 * 
 * A unified component that combines form management and preview rendering
 * for the OIW social card generator.
 */

"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { toPng, toJpeg } from "html-to-image";
import { motion } from "framer-motion";
import { UserForm } from "./user-form";
import { Logo } from "./logo";
import { type ImageGeneratorState } from "../types/index";
import {
    fetchBackgrounds,
    getBackground,
    BACKGROUNDS,
} from "../utils/backgrounds";
import { fetchLogos, getLogo, LOGOS } from "../utils/logos";
import { ImagePreview } from "./image-preview";
import { Skeleton } from "./ui/skeleton";
import { logger } from "../utils/logger";
import { isMobile } from "../utils/device-detection";
import { MobilePreviewCard } from "./mobile-preview-card";

const defaultState: ImageGeneratorState = {
    profileImage: null,
    croppedProfileImage: null,
    topic: "",
    backgroundImage: "/assets/backgrounds/OIW_GraphicAssets_16x9_02.01.png",
    logoImage: "/assets/logos/OIW25_Logo_Date_RGB_Cream.png"
};

// Prefetch key images for improved performance
export const preloadBackgrounds = () => {
    const imageUrls = BACKGROUNDS?.length > 0 ?
        BACKGROUNDS.slice(0, 3) : // Only prefetch first 3 backgrounds
        [defaultState.backgroundImage];

    imageUrls.forEach(url => {
        const imgElement = document.createElement('img');
        imgElement.src = url;
    });
};

export function SocialCard() {
    const [formData, setFormData] = useState<ImageGeneratorState>(defaultState);
    const [backgrounds, setBackgrounds] = useState<string[]>([]);
    const [logos, setLogos] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDownloading, setIsDownloading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [renderContainer, setRenderContainer] = useState<HTMLElement | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.5);
    const previewContainerRef = useRef<HTMLDivElement>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [bgImageLoaded, setBgImageLoaded] = useState(false);
    const [profileImageLoaded, setProfileImageLoaded] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [bgImageError, setBgImageError] = useState(false);

    // Set mounted state for hydration safety
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Fallback timeout for background image loading
    useEffect(() => {
        if (isMounted && !bgImageLoaded && !bgImageError) {
            const timeout = setTimeout(() => {
                console.log('Background image loading timeout, forcing load state');
                setBgImageLoaded(true);
                setIsLoading(false);
            }, 5000); // 5 second timeout

            return () => clearTimeout(timeout);
        }
    }, [isMounted, bgImageLoaded, bgImageError]);

    // Mobile detection after mount to prevent hydration mismatch
    useEffect(() => {
        if (isMounted) {
            setIsMobileView(isMobile());

            const handleResize = () => {
                setIsMobileView(isMobile());
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [isMounted]);

    useEffect(() => {
        if (isMounted) {
            setRenderContainer(document.getElementById('render-container'));
            // Preload key backgrounds for better performance
            preloadBackgrounds();
        }
    }, [isMounted]);

    // Asset loading
    useEffect(() => {
        const loadAssets = async () => {
            try {
                setIsLoading(true);
                logger.log("Starting to load assets...");

                const [loadedBackgrounds, loadedLogos] = await Promise.all([
                    fetchBackgrounds().catch(() => []),
                    fetchLogos().catch(() => []),
                ]);

                logger.log("Loaded backgrounds:", loadedBackgrounds);
                logger.log("Loaded logos:", loadedLogos);

                // Update the available backgrounds array without changing the current background
                if (loadedBackgrounds.length > 0) {
                    setBackgrounds(loadedBackgrounds);

                    // Only set initial background if none is selected or if forced refresh
                    if (!formData.backgroundImage || formData.backgroundImage === "") {
                        setFormData((prev) => ({
                            ...prev,
                            backgroundImage: loadedBackgrounds[0]
                        }));
                    }
                }

                // Update available logos without changing current logo
                if (loadedLogos.length > 0) {
                    setLogos(loadedLogos);

                    // Only set initial logo if none is selected
                    if (!formData.logoImage || formData.logoImage === "") {
                        setFormData((prev) => ({
                            ...prev,
                            logoImage: loadedLogos[0]
                        }));
                    }
                }
            } catch (err) {
                logger.error("Error loading assets:", err);
                // Don't set error state to avoid UI disruption
            } finally {
                // Loading state is managed by image loading callbacks now
            }
        };

        if (isMounted) {
            loadAssets();
        }
    }, [isMounted]);

    useEffect(() => {
        const updateScale = () => {
            if (previewContainerRef.current) {
                const container = previewContainerRef.current;
                const containerWidth = container.offsetWidth;
                const containerHeight = container.offsetHeight;

                // Calculate scale based on container size
                // We want to fit 1200x1200 into the container while maintaining aspect ratio
                const horizontalScale = containerWidth / 1200;
                const verticalScale = containerHeight / 1200;

                // Use the smaller scale to ensure it fits both dimensions
                const newScale = Math.min(horizontalScale, verticalScale);
                setScale(newScale);
            }
        };

        // Initial calculation
        if (isMounted) {
            updateScale();

            // Update on resize
            const resizeObserver = new ResizeObserver(updateScale);
            if (previewContainerRef.current) {
                resizeObserver.observe(previewContainerRef.current);
            }

            // Cleanup
            return () => {
                if (previewContainerRef.current) {
                    resizeObserver.unobserve(previewContainerRef.current);
                }
            };
        }
    }, [isMounted]);

    // Form handlers
    const handleFormChange = (newData: ImageGeneratorState) => {
        logger.log("Form data changed:", newData);
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
        if (backgrounds.length === 0) {
            logger.warn("No backgrounds available to change to");
            return;
        }

        const currentIndex = backgrounds.indexOf(formData.backgroundImage);
        // If current background is not in the array, start from the first one
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % backgrounds.length;
        const nextBackground = backgrounds[nextIndex];

        if (nextBackground) {
            setFormData((prev) => ({
                ...prev,
                backgroundImage: nextBackground
            }));
        }
    };

    const ensureAllImagesLoaded = async (element: HTMLElement) => {
        const images = element.getElementsByTagName('img');
        const imagePromises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
            });
        });
        await Promise.all(imagePromises);
    };

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            // Set up render container
            const container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.width = '1200px';
            container.style.height = '1200px';
            container.style.top = '-9999px';
            container.style.left = '-9999px';
            document.body.appendChild(container);
            setRenderContainer(container);

            // Slight delay to ensure portal renders
            setTimeout(async () => {
                try {
                    if (!previewRef.current) {
                        setError("Preview element not found");
                        setIsDownloading(false);
                        return;
                    }

                    setIsCapturing(true);

                    // Wait for images to load
                    await ensureAllImagesLoaded(previewRef.current);

                    // Use appropriate image format and quality based on device
                    const imageFormat = isMobileView ? 'webp' : 'jpeg';
                    const initialQuality = isMobileView ? 0.75 : 0.85;

                    // Generate image with optimized settings for the device
                    let dataUrl;
                    if (imageFormat === 'webp') {
                        dataUrl = await toPng(previewRef.current, {
                            quality: initialQuality,
                            pixelRatio: isMobileView ? 1.5 : 1
                        });
                    } else {
                        dataUrl = await toJpeg(previewRef.current, {
                            quality: initialQuality,
                            pixelRatio: 1
                        });
                    }

                    // Create a function to check file size and adjust quality if needed
                    const checkFileSize = async (url: string, quality: number, format: 'webp' | 'jpeg'): Promise<string> => {
                        // Convert data URL to blob to check size
                        const response = await fetch(url);
                        const blob = await response.blob();
                        const fileSizeInMB = blob.size / (1024 * 1024);

                        logger.log(`Generated image size: ${fileSizeInMB.toFixed(2)}MB`);

                        // If file is too large and quality can still be reduced
                        if (fileSizeInMB > 3 && quality > 0.5) {
                            // Reduce quality and try again
                            const newQuality = quality - 0.1;
                            logger.log(`Reducing quality to ${newQuality.toFixed(2)}`);

                            let newDataUrl;
                            if (format === 'webp') {
                                newDataUrl = await toPng(previewRef.current!, {
                                    quality: newQuality,
                                    pixelRatio: isMobileView ? 1.5 : 1
                                });
                            } else {
                                newDataUrl = await toJpeg(previewRef.current!, {
                                    quality: newQuality,
                                    pixelRatio: 1
                                });
                            }

                            return checkFileSize(newDataUrl, newQuality, format);
                        }

                        return url;
                    };

                    // Check and adjust file size if needed
                    const optimizedDataUrl = await checkFileSize(dataUrl, initialQuality, imageFormat as 'webp' | 'jpeg');

                    const link = document.createElement('a');
                    link.download = `oiw-social-card.${imageFormat === 'webp' ? 'png' : 'jpg'}`;
                    link.href = optimizedDataUrl;
                    link.click();

                    // Clean up
                    document.body.removeChild(container);
                    setRenderContainer(null);
                    setIsCapturing(false);
                    setIsDownloading(false);
                } catch (err) {
                    logger.error("Error generating image", err);
                    setError("Failed to generate image");
                    setIsCapturing(false);
                    setIsDownloading(false);
                }
            }, 100);
        } catch (err) {
            logger.error("Error in download process", err);
            setError("Failed to start download process");
            setIsDownloading(false);
        }
    };

    useEffect(() => {
        const handleDownloadEvent = () => handleDownload();
        window.addEventListener("download-image", handleDownloadEvent);
        return () => window.removeEventListener("download-image", handleDownloadEvent);
    }, [isMounted, isMobileView]); // Include dependencies to update the handler

    const previewClasses = "relative w-full aspect-square overflow-hidden rounded-xl";

    if (error) {
        return (
            <div className="text-center p-4">
                <p className="text-red-600 mb-2">Error loading assets: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="text-[#0071e1] hover:underline"
                >
                    Try again
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            {isMobileView && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-3 mb-3 text-sm text-amber-700">
                    Please take a screenshot of the preview image or use a desktop device for the best experience.
                </div>
            )}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
                {/* Form Section */}
                <div className="w-full lg:w-[380px] flex-shrink-0">
                    <UserForm
                        formData={formData}
                        onChange={handleFormChange}
                        onImageUpload={handleImageUpload}
                        onChangeBackground={handleChangeBackground}
                        onDownload={handleDownload}
                        isLoadingBackgrounds={isLoading || isCapturing}
                    />
                    {error && (
                        <p className="text-red-600 text-sm mt-2">{error}</p>
                    )}

                    {/* Mobile device notification */}
                    {isMounted && isMobileView && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm">
                            <p className="font-medium">You're using a mobile device</p>
                            <p>We've optimized image generation for your device. For best results, consider using a desktop browser.</p>
                        </div>
                    )}
                </div>

                {/* Preview Card Section */}
                <div className={previewClasses} ref={previewContainerRef}>
                    {/* Mobile Preview Card */}
                    {isMounted && isMobileView ? (
                        <MobilePreviewCard formData={formData} />
                    ) : (
                        /* Desktop Preview */
                        <div className="relative w-full h-full overflow-hidden rounded-xl">
                            <div
                                className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px]"
                                style={{
                                    transform: `translate(-50%, -50%) scale(${scale})`,
                                    transformOrigin: 'center center'
                                }}
                            >
                                <div className="w-full h-full relative">
                                    {!bgImageLoaded && (
                                        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                                    )}
                                    {bgImageError && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#000037] to-[#2b005c]"></div>
                                    )}
                                    <Image
                                        src={formData.backgroundImage}
                                        alt="Background"
                                        fill
                                        sizes="100vw"
                                        className={`object-cover transition-opacity duration-300 ${bgImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                                        priority={true}
                                        quality={isMobileView ? 75 : 90} // Lower quality for mobile
                                        crossOrigin="anonymous"
                                        onLoad={() => {
                                            console.log('Background image loaded successfully');
                                            setBgImageLoaded(true);
                                            setIsLoading(false);
                                        }}
                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                            console.error('Background image failed to load:', e);
                                            setBgImageError(true);
                                            setIsLoading(false);
                                            setBgImageLoaded(true); // Show fallback content
                                            setError("Failed to load background image");
                                        }}
                                    />
                                    <div className="relative z-10 w-full h-full p-[80px] flex flex-col">
                                        <div className="flex justify-between items-start mb-auto">
                                            <h1 className="font-display text-[120px] font-light text-[#F5F5DC] leading-none">
                                                I&apos;m{" "}
                                                <span className="italic">attending</span>
                                            </h1>
                                            <div className="w-[350px]">
                                                <Image
                                                    src={formData.logoImage}
                                                    alt="Oslo Innovation Week 2025"
                                                    width={350}
                                                    height={115}
                                                    className="w-full h-auto"
                                                    priority={true}
                                                    unoptimized={true}
                                                    crossOrigin="anonymous"
                                                    onLoad={() => console.log('Logo image loaded successfully')}
                                                    onError={(e) => console.error('Logo image failed to load:', e)}
                                                />
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
                                                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                            setProfileImageLoaded(true); // Show fallback content
                                                            setError("Failed to load profile image");
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-[450px] h-[450px] rounded-full bg-gray-100 border-4 border-white/20" />
                                            )}
                                        </div>

                                        <div className="text-center">
                                            <p className="text-[#F5F5DC] text-[48px] font-light mb-4">
                                                Talk to me about:
                                            </p>
                                            <div className="flex flex-wrap gap-4 justify-center">
                                                {formData.topic && (
                                                    <span
                                                        className="bg-[#000037] px-5 py-2 rounded-full text-[#F5F5DC] font-medium text-[36px]"
                                                    >
                                                        {formData.topic}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {isCapturing && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-xl">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-[#000037] border-t-transparent rounded-full animate-spin" />
                                <p className="text-[#000037] font-medium text-sm sm:text-base">Generating image...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Render Portal */}
            {renderContainer && isMounted && createPortal(
                <div
                    ref={previewRef}
                    className="w-[1200px] h-[1200px] bg-[#000037] pointer-events-none select-none"
                >
                    {isMobileView ? (
                        <MobilePreviewCard formData={formData} />
                    ) : (
                        <div className="w-full h-full relative">
                            <Image
                                src={formData.backgroundImage}
                                alt="Background"
                                fill
                                sizes="100vw"
                                className="object-cover"
                                priority={true}
                                quality={isMobileView ? 75 : 90}
                                crossOrigin="anonymous"
                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    setError("Failed to load background image");
                                }}
                            />
                            <div className="relative z-10 w-full h-full p-[80px] flex flex-col">
                                <div className="flex justify-between items-start mb-auto">
                                    <h1 className="font-display text-[120px] font-light text-[#F5F5DC] leading-none">
                                        I&apos;m{" "}
                                        <span className="italic">attending</span>
                                    </h1>
                                    <div className="w-[350px]">
                                        <Image
                                            src={formData.logoImage}
                                            alt="Oslo Innovation Week 2025"
                                            width={350}
                                            height={115}
                                            className="w-full h-auto"
                                            priority={true}
                                            unoptimized={true}
                                            crossOrigin="anonymous"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-center mb-20">
                                    {formData.croppedProfileImage ? (
                                        <div className="w-[450px] h-[450px] rounded-full overflow-hidden bg-gray-100 border-4 border-[#F5F5DC]">
                                            <Image
                                                src={formData.croppedProfileImage}
                                                alt="Profile"
                                                width={450}
                                                height={450}
                                                className="w-full h-full object-cover"
                                                crossOrigin="anonymous"
                                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                    setError("Failed to load profile image");
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-[450px] h-[450px] rounded-full bg-gray-100 border-4 border-white/20" />
                                    )}
                                </div>

                                <div className="text-center">
                                    <p className="text-[#F5F5DC] text-[48px] font-light mb-4">
                                        Talk to me about:
                                    </p>
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        {formData.topic && (
                                            <span
                                                className="bg-[#000037] px-5 py-2 rounded-full text-[#F5F5DC] font-medium text-[36px]"
                                            >
                                                {formData.topic}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>,
                renderContainer
            )}
        </div>
    );
} 