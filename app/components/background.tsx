import Image from "next/image";

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
    // Pad the index with leading zero if needed
    const paddedIndex = index.toString().padStart(2, '0');
    const fileName = `OIW_GraphicAssets_16x9_02.${paddedIndex}.png`;
    const backgroundUrl = `/assets/backgrounds/${fileName}`;

    const handleLoad = () => {
        console.log('Background image loaded successfully');
        onLoad?.();
    };

    const handleError = () => {
        console.error('Background image failed to load');
    };

    return (
        <div className={`fixed inset-0 -z-10 ${className}`} style={{ zIndex: -1 }}>
            <Image
                src={backgroundUrl}
                alt={`Background ${index}`}
                fill
                className="object-cover"
                priority
                quality={100}
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
} 