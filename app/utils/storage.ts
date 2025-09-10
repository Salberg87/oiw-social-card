/**
 * Local asset management - no longer using Supabase storage
 * All assets are now served from the public directory
 */

/**
 * Default assets using local file paths
 * These match the assets stored in the public/assets directory
 */
export const DEFAULT_ASSETS = {
    backgrounds: [
        "/assets/backgrounds/OIW_GraphicAssets_16x9_01.01.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_01.02.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_01.03.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_01.04.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_01.05.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_01.06.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_01.07.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_01.08.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_01.09.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_01.10.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_02.01.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_02.02.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_02.03.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_02.04.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_02.05.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_02.06.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_02.07.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_02.08.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_02.09.png",
        "/assets/backgrounds/OIW_GraphicAssets_16x9_02.10.png",
    ],
    logos: [
        "/assets/logos/OIW25_Logo_Date_RGB_BrightRed.png",
        "/assets/logos/OIW25_Logo_Date_RGB_Cream.png",
        "/assets/logos/OIW25_Logo_Date_RGB_DarkBlue.png",
        "/assets/logos/OIW25_Logo_Date_RGB_ForestGreen.png",
        "/assets/logos/OIW25_Logo_Date_RGB_Purple.png",
        "/assets/logos/OIW25_Logo_Date_RGB_SharpGreen.png",
        "/assets/logos/OIW25_Logo_Date_RGB_SkyBlue.png",
        "/assets/logos/OIW25_Logo_Date_RGB_SoftPink.png",
        "/assets/logos/OIW25_Logo_RGB_BrightRed.png",
        "/assets/logos/OIW25_Logo_RGB_Cream.png",
        "/assets/logos/OIW25_Logo_RGB_DarkBlue.png",
        "/assets/logos/OIW25_Logo_RGB_ForestGreen.png",
        "/assets/logos/OIW25_Logo_RGB_Purple.png",
        "/assets/logos/OIW25_Logo_RGB_SharpGreen.png",
        "/assets/logos/OIW25_Logo_RGB_SkyBlue.png",
        "/assets/logos/OIW25_Logo_RGB_SoftPink.png",
        "/assets/logos/OIW25_Logo_Date_RGB_Black.png",
        "/assets/logos/OIW25_Logo_Date_RGB_White.png",
        "/assets/logos/OIW25_Logo_RGB_Black.png",
        "/assets/logos/OIW25_Logo_RGB_White.png",
    ]
};

/**
 * Direct URLs for assets - now using local paths
 * Used as a fallback and for initial loading
 */
export const DIRECT_URLS = {
    backgrounds: [
        "/assets/backgrounds/OIW_GraphicAssets_16x9_02.01.png"
    ],
    logos: [
        "/assets/logos/OIW25_Logo_Date_RGB_BrightRed.png"
    ]
};

/**
 * Configuration options for asset fetching and transformation
 */
interface FetchOptions {
    /** Image quality (1-100), defaults to 75 */
    quality?: number;
    /** Output format, either 'webp' for better compression or 'png' for transparency */
    format?: 'webp' | 'png';
    /** Optional width to resize the image */
    width?: number;
    /** Optional height to resize the image */
    height?: number;
}

/**
 * Fetches assets from local public directory
 * @param bucketName - Name of the asset type ('backgrounds' or 'logos')
 * @param options - Configuration for image transformation (not used for local files)
 * @returns Array of public URLs for the assets
 */
export async function fetchAssets(
    bucketName: 'backgrounds' | 'logos',
    options: FetchOptions = { quality: 75, format: 'webp' }
): Promise<string[]> {
    // Return the default assets directly since they're now local files
    return DEFAULT_ASSETS[bucketName];
}

/**
 * Gets an asset URL based on a seed value (like user's name)
 * @param seed - String to use for deterministic selection (e.g., user's name)
 * @param assets - Array of asset URLs to choose from
 * @param defaultAsset - Fallback asset URL if no valid selection can be made
 * @returns Selected asset URL
 */
export const getAssetBySeed = (
    seed: string | undefined,
    assets: string[],
    defaultAsset: string
): string => {
    if (!seed || assets.length === 0) {
        return defaultAsset;
    }
    const total = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return assets[total % assets.length];
};

/**
 * Gets a local asset URL - no longer using Supabase transformations
 * @param bucket - Asset type ('backgrounds' or 'logos')
 * @param path - File path within the asset directory
 * @param transformOptions - Not used for local files
 * @returns Local asset URL
 */
export const getPublicUrl = (
    bucket: string,
    path: string,
    transformOptions?: FetchOptions
) => {
    // Return local asset URL directly
    return `/assets/${bucket}/${path}`;
}; 