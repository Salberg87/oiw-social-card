import { createClient } from './supabase/client'
import { FileObject } from '@supabase/storage-js'

/**
 * Cache for storing fetched asset URLs to minimize API calls
 * Organized by bucket name for efficient access
 */
const assetCache: Record<string, string[]> = {
    backgrounds: [],
    logos: []
};

/**
 * Default assets to use as fallback when Supabase storage is unavailable
 * These should match the assets stored in the public directory
 */
export const DEFAULT_ASSETS = {
    backgrounds: [
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/backgrounds/OIW_GraphicAssets_16x9_02.01.png`,
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/backgrounds/OIW_GraphicAssets_16x9_02.02.png`,
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/backgrounds/OIW_GraphicAssets_16x9_02.03.png`,
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/backgrounds/OIW_GraphicAssets_16x9_02.04.png`,
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/backgrounds/OIW_GraphicAssets_16x9_02.05.png`,
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/backgrounds/OIW_GraphicAssets_16x9_02.06.png`,
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/backgrounds/OIW_GraphicAssets_16x9_02.07.png`,
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/backgrounds/OIW_GraphicAssets_16x9_02.08.png`,
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/backgrounds/OIW_GraphicAssets_16x9_02.09.png`,
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/backgrounds/OIW_GraphicAssets_16x9_02.10.png`,
    ],
    logos: [
        "/GraphicAssets/Logo/OIW25_Logo_Date_RGB_Cream.png"
    ]
};

/**
 * Direct URLs for assets in Supabase storage
 * Used as a fallback and for initial loading
 */
export const DIRECT_URLS = {
    backgrounds: [
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/backgrounds/OIW_GraphicAssets_16x9_02.01.png`
    ],
    logos: [
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/logos/OIW25_Logo_Date_RGB_BrightRed.png`
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
 * Fetches assets from a specified Supabase storage bucket
 * @param bucketName - Name of the bucket ('backgrounds' or 'logos')
 * @param options - Configuration for image transformation
 * @returns Array of public URLs for the assets
 */
export async function fetchAssets(
    bucketName: 'backgrounds' | 'logos',
    options: FetchOptions = { quality: 75, format: 'webp' }
): Promise<string[]> {
    // Return cached assets if available
    if (assetCache[bucketName].length > 0) return assetCache[bucketName];

    try {
        const supabase = createClient();
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log(`Fetching assets from ${bucketName} bucket...`);

        // Get the list of files from the bucket
        const { data: files, error: listError } = await supabase
            .storage
            .from(bucketName)
            .list('', {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' }
            });

        if (listError) {
            console.warn(`Error listing ${bucketName}, falling back to direct URLs:`, listError);
            // Store direct URLs in cache to prevent repeated failed attempts
            assetCache[bucketName] = DIRECT_URLS[bucketName];
            return DIRECT_URLS[bucketName];
        }

        if (!files || files.length === 0) {
            console.warn(`No files found in ${bucketName} bucket, using direct URLs`);
            // Store direct URLs in cache to prevent repeated failed attempts
            assetCache[bucketName] = DIRECT_URLS[bucketName];
            return DIRECT_URLS[bucketName];
        }

        // Get public URLs for all PNG files
        const urls = await Promise.all(
            (files as FileObject[])
                .filter(file => file.name.endsWith('.png'))
                .map(async (file: FileObject) => {
                    try {
                        const { data } = supabase
                            .storage
                            .from(bucketName)
                            .getPublicUrl(file.name);

                        console.log(`[DEBUG] Loaded ${bucketName} file: ${file.name} -> ${data.publicUrl}`);
                        return data.publicUrl;
                    } catch (error) {
                        console.error(`Error getting URL for ${file.name}:`, error);
                        return null;
                    }
                })
        );

        // Filter out any null values from errors
        const validUrls = urls.filter(Boolean) as string[];

        if (validUrls.length === 0) {
            console.warn(`No valid URLs found for ${bucketName}, using direct URLs`);
            assetCache[bucketName] = DIRECT_URLS[bucketName];
            return DIRECT_URLS[bucketName];
        }

        // Cache the valid URLs
        assetCache[bucketName] = validUrls;
        console.log(`[DEBUG] Successfully loaded ${validUrls.length} ${bucketName}:`, validUrls);
        return validUrls;
    } catch (error) {
        console.error(`Error fetching ${bucketName}:`, error);
        return DIRECT_URLS[bucketName];
    }
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

export const getPublicUrl = (
    bucket: string,
    path: string,
    transformOptions?: FetchOptions
) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;

    console.log("[DEBUG] getPublicUrl - Base URL:", baseUrl);

    if (!transformOptions) {
        console.log("[DEBUG] getPublicUrl - Final URL (no transform):", baseUrl);
        return baseUrl;
    }

    const { width, height, quality, format } = transformOptions;

    const transformQuery = new URLSearchParams();
    if (width) transformQuery.append("width", width.toString());
    if (height) transformQuery.append("height", height.toString());
    if (quality) transformQuery.append("quality", quality.toString());
    if (format) transformQuery.append("format", format);

    const queryString = transformQuery.toString();

    const finalUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;
    console.log("[DEBUG] getPublicUrl - Final URL (with transform):", finalUrl);

    return finalUrl;
}; 