import { createClient } from './supabase/client'
import { FileObject } from '@supabase/storage-js'

// Cache for assets
const assetCache: Record<string, string[]> = {
    backgrounds: [],
    logos: []
};

// Default assets as fallback
export const DEFAULT_ASSETS = {
    backgrounds: [
        "/GraphicAssets/backgrounds/OIW_GraphicAssets_16x9_02.01.png",
        "/GraphicAssets/backgrounds/OIW_GraphicAssets_16x9_02.02.png",
        "/GraphicAssets/backgrounds/OIW_GraphicAssets_16x9_02.03.png",
        "/GraphicAssets/backgrounds/OIW_GraphicAssets_16x9_02.04.png",
        "/GraphicAssets/backgrounds/OIW_GraphicAssets_16x9_02.05.png",
        "/GraphicAssets/backgrounds/OIW_GraphicAssets_16x9_02.06.png",
        "/GraphicAssets/backgrounds/OIW_GraphicAssets_16x9_02.07.png",
        "/GraphicAssets/backgrounds/OIW_GraphicAssets_16x9_02.08.png",
        "/GraphicAssets/backgrounds/OIW_GraphicAssets_16x9_02.09.png",
        "/GraphicAssets/backgrounds/OIW_GraphicAssets_16x9_02.10.png",
    ],
    logos: [
        "/GraphicAssets/Logo/OIW25_Logo_Date_RGB_Cream.png"
    ]
};

interface FetchOptions {
    quality?: number;
    format?: 'webp' | 'png';
    width?: number;
    height?: number;
}

// Function to fetch assets from a specific bucket
export async function fetchAssets(
    bucketName: 'backgrounds' | 'logos',
    options: FetchOptions = { quality: 75, format: 'webp' }
): Promise<string[]> {
    // Return cached assets if available
    if (assetCache[bucketName].length > 0) return assetCache[bucketName];

    try {
        const supabase = createClient();

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
            console.error(`Error listing ${bucketName}:`, listError);
            return DEFAULT_ASSETS[bucketName];
        }

        // Get public URLs for all PNG files
        const urls = await Promise.all(
            (files as FileObject[])
                .filter(file => file.name.endsWith('.png'))
                .map(async (file: FileObject) => {
                    const { data } = supabase
                        .storage
                        .from(bucketName)
                        .getPublicUrl(file.name, {
                            transform: {
                                ...options,
                                quality: options.quality || 75,
                                format: options.format || 'webp'
                            }
                        });
                    return data.publicUrl;
                })
        );

        // Cache the results
        assetCache[bucketName] = urls.length > 0 ? urls : DEFAULT_ASSETS[bucketName];
        return assetCache[bucketName];
    } catch (error) {
        console.error(`Error in fetch${bucketName}:`, error);
        return DEFAULT_ASSETS[bucketName];
    }
}

// Function to get an asset based on a seed
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