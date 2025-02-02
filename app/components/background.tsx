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
    const backgroundUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/backgrounds/${fileName}`;

    const handleLoad = () => {
        setIsLoading(false);
        onLoad?.();
    };

    return (
        <div className={`fixed inset-0 -z-10 ${className}`}>
            <Image
                src={backgroundUrl}
                alt={`Background ${index}`}
                fill
                className={`
                    object-cover
                    transition-opacity duration-100
                    ${isLoading ? 'opacity-0' : 'opacity-100'}
                `}
                priority
                quality={100}
                onLoad={handleLoad}
                onError={() => {
                    setError("Failed to load background");
                    setIsLoading(false);
                }}
            />
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-[#000037] border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            {error && (
                <p className="text-red-600 text-sm">{error}</p>
            )}
        </div>
    );
} 