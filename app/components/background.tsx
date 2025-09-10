import Image from "next/image";
import { useState } from "react";

interface BackgroundProps {
    index?: number;
    className?: string;
    width?: number;
    height?: number;
    onLoad?: () => void;
}

export function Background({
    index = 1,
    className = '',
    width = 1200,
    height = 1200,
    onLoad
}: BackgroundProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pad the index with leading zero if needed
    const paddedIndex = index.toString().padStart(2, '0');
    const fileName = `OIW_GraphicAssets_16x9_02.${paddedIndex}.png`;
    const backgroundUrl = `/assets/backgrounds/${fileName}`;
    const fallbackUrl = `/assets/backgrounds/OIW_GraphicAssets_16x9_02.01.png`;

    const handleLoad = () => {
        console.log('Background image loaded successfully');
        setIsLoading(false);
        onLoad?.();
    };

    const handleError = () => {
        console.error('Background image failed to load, using fallback');
        setError("Failed to load background, using fallback image");
        setIsLoading(false);
    };

    return (
        <div className={`fixed inset-0 -z-10 ${className}`} style={{ zIndex: -1 }}>
            <Image
                src={error ? fallbackUrl : backgroundUrl}
                alt={`Background ${index}`}
                fill
                className="object-cover"
                priority
                quality={100}
                onLoad={handleLoad}
                onError={handleError}
            />
            {isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#000037] to-[#2b005c] flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            {error && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#000037] to-[#2b005c] flex items-center justify-center">
                    <p className="text-white text-sm">Using fallback background</p>
                </div>
            )}
        </div>
    );
} 