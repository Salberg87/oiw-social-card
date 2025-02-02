import { fetchAssets, getAssetBySeed, DEFAULT_ASSETS } from './storage'

// Export the default backgrounds using Supabase URL
export const BACKGROUNDS = [
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/backgrounds/OIW_GraphicAssets_16x9_02.01.png`
];

// Function to fetch backgrounds
export async function fetchBackgrounds(): Promise<string[]> {
    return fetchAssets('backgrounds');
}

// Function to get a background based on a seed (like user's name)
export const getBackground = (seed?: string, backgrounds: string[] = BACKGROUNDS): string => {
    return getAssetBySeed(seed, backgrounds, BACKGROUNDS[0]);
};

// For backwards compatibility
export const getRandomBackgroundLegacy = (): string => {
    return BACKGROUNDS[0];
}; 