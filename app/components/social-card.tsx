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
import { toPng } from "html-to-image";
import { motion } from "framer-motion";
import { UserForm, SUGGESTIONS } from "./user-form";
import { Logo } from "./logo";
import { type ImageGeneratorState } from "../types/index";
import {
    fetchBackgrounds,
    getBackground,
    BACKGROUNDS,
} from "../utils/backgrounds";
import { fetchLogos, getLogo, LOGOS } from "../utils/logos";
import { TOPICS, PLACEHOLDERS } from "../utils/constants";

const defaultState: ImageGeneratorState = {
    profileImage: null,
    croppedProfileImage: null,
    topics: [SUGGESTIONS[0]],
    backgroundImage: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/backgrounds/OIW_GraphicAssets_16x9_02.01.png`,
    logoImage: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/logos/OIW25_Logo_Date_RGB_Cream.png`
};

export function SocialCard() {
    const [formData, setFormData] = useState<ImageGeneratorState>(defaultState);
    const [backgrounds, setBackgrounds] = useState<string[]>([]);
    const [logos, setLogos] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);
    const [renderContainer, setRenderContainer] = useState<HTMLElement | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.5);
    const previewContainerRef = useRef<HTMLDivElement>(null);
    const [category, setCategory] = useState<string>(SUGGESTIONS[0]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setRenderContainer(document.getElementById('render-container'));
    }, []);

    // Asset loading
    useEffect(() => {
        const loadAssets = async () => {
            try {
                setIsLoading(true);
                console.log("[DEBUG] Initial backgroundImage:", formData.backgroundImage);

                const [loadedBackgrounds, loadedLogos] = await Promise.all([
                    fetchBackgrounds().catch(() => []),
                    fetchLogos().catch(() => []),
                ]);

                console.log("[DEBUG] Loaded backgrounds:", loadedBackgrounds);

                // Update the available backgrounds array without changing the current background
                if (loadedBackgrounds.length > 0) {
                    setBackgrounds(loadedBackgrounds);

                    // Only set initial background if none is selected or if forced refresh
                    if (!formData.backgroundImage || formData.backgroundImage === "") {
                        console.log("[DEBUG] Setting initial background to:", loadedBackgrounds[0]);
                        setFormData((prev) => ({
                            ...prev,
                            backgroundImage: loadedBackgrounds[0]
                        }));
                    } else {
                        console.log("[DEBUG] Keeping existing background:", formData.backgroundImage);
                    }
                }

                // Update available logos without changing current logo
                if (loadedLogos.length > 0) {
                    setLogos(loadedLogos);

                    // Only set initial logo if none is selected
                    if (!formData.logoImage || formData.logoImage === "") {
                        console.log("[DEBUG] Setting initial logo to:", loadedLogos[0]);
                        setFormData((prev) => ({
                            ...prev,
                            logoImage: loadedLogos[0]
                        }));
                    } else {
                        console.log("[DEBUG] Keeping existing logo:", formData.logoImage);
                    }
                }
            } catch (err) {
                console.warn("Error loading assets, using default images:", err);
                // Don't set error state to avoid UI disruption
                // setError(err instanceof Error ? err.message : "Failed to load assets");
            } finally {
                setIsLoading(false);
            }
        };

        loadAssets();
    }, []);

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
    }, []);

    useEffect(() => {
        // Randomly select a suggestion after mount
        const randomIndex = Math.floor(Math.random() * SUGGESTIONS.length);
        setCategory(SUGGESTIONS[randomIndex]);
    }, []);

    // Form handlers
    const handleFormChange = (newData: ImageGeneratorState) => {
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
            console.warn("No backgrounds available to change to");
            return;
        }

        const currentIndex = backgrounds.indexOf(formData.backgroundImage);
        // If current background is not in the array, start from the first one
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % backgrounds.length;
        const nextBackground = backgrounds[nextIndex];

        console.log(`[DEBUG] Changing background: ${currentIndex} -> ${nextIndex}`);
        console.log(`[DEBUG] New background URL: ${nextBackground}`);

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
        if (!previewRef.current) return;

        try {
            setIsCapturing(true);
            setError(null);

            // Wait for all images to load
            await ensureAllImagesLoaded(previewRef.current);

            // Wait for next frame to ensure everything is rendered
            await new Promise(resolve => requestAnimationFrame(resolve));

            // Log the element being captured
            console.log('Capturing element:', previewRef.current);

            // Capture the image
            const image = await toPng(previewRef.current, {
                quality: 1.0,
                pixelRatio: 2,
                cacheBust: true,
                style: {
                    // Ensure the element is rendered during capture
                    visibility: 'visible',
                    opacity: '1'
                }
            });

            // Create download link
            const link = document.createElement("a");
            link.href = image;
            link.download = `oiw-social-card.png`;
            link.click();
        } catch (err) {
            console.error("Error generating image:", err);
            setError("Failed to generate image. Please try again.");
        } finally {
            setIsCapturing(false);
        }
    };

    useEffect(() => {
        const handleDownloadEvent = () => handleDownload();
        window.addEventListener("download-image", handleDownloadEvent);
        return () => window.removeEventListener("download-image", handleDownloadEvent);
    }, []);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
    };

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
        <>
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
                {/* Form Section */}
                <div className="w-full lg:w-[530px] flex-shrink-0">
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
                </div>

                {/* Preview Card Section */}
                <div className="w-full aspect-square lg:w-[500px] xl:w-[600px] relative mt-6 lg:mt-0" ref={previewContainerRef}>
                    {/* Visible Preview */}
                    <div className="relative w-full h-full overflow-hidden rounded-xl">
                        <div
                            className="absolute top-1/2 left-1/2 w-[1200px] h-[1200px]"
                            style={{
                                transform: `translate(-50%, -50%) scale(${scale})`,
                                transformOrigin: 'center center'
                            }}
                        >
                            <div className="w-full h-full relative">
                                <Image
                                    src={formData.backgroundImage}
                                    alt="Background"
                                    fill
                                    className="object-cover"
                                    priority
                                    unoptimized
                                    crossOrigin="anonymous"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                        console.error("[DEBUG] Image error loading:", formData.backgroundImage, e);
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
                                            <div className="w-[450px] h-[450px] rounded-full overflow-hidden bg-gray-100 border-4 border-[#F5F5DC]">
                                                <Image
                                                    src={formData.croppedProfileImage}
                                                    alt="Profile"
                                                    width={450}
                                                    height={450}
                                                    className="w-full h-full object-cover"
                                                    crossOrigin="anonymous"
                                                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                        console.error("[DEBUG] Profile image error:", e);
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
                                            {formData.topics.map((topic: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="px-8 py-4 backdrop-blur-sm rounded-full text-[#F5F5DC] text-[40px] bg-[#1E0B2E]"
                                                >
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

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
            {renderContainer && createPortal(
                <div
                    ref={previewRef}
                    className="w-[1200px] h-[1200px] bg-[#000037] pointer-events-none select-none"
                >
                    <div className="w-full h-full relative">
                        <Image
                            src={formData.backgroundImage}
                            alt="Background"
                            fill
                            className="object-cover"
                            priority
                            unoptimized
                            crossOrigin="anonymous"
                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                console.error("[DEBUG] Image error loading:", formData.backgroundImage, e);
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
                                    <div className="w-[450px] h-[450px] rounded-full overflow-hidden bg-gray-100 border-4 border-[#F5F5DC]">
                                        <Image
                                            src={formData.croppedProfileImage}
                                            alt="Profile"
                                            width={450}
                                            height={450}
                                            className="w-full h-full object-cover"
                                            crossOrigin="anonymous"
                                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                                console.error("[DEBUG] Profile image error:", e);
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
                                    {formData.topics.map((topic: string, index: number) => (
                                        <span
                                            key={index}
                                            className="px-8 py-4 backdrop-blur-sm rounded-full text-[#F5F5DC] text-[40px] bg-[#1E0B2E]"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>,
                renderContainer
            )}
        </>
    );
} 