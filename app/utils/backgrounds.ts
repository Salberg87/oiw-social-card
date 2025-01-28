import { fetchAssets, getAssetBySeed, DEFAULT_ASSETS } from './storage'

// Export the default backgrounds for backwards compatibility
export const BACKGROUNDS = DEFAULT_ASSETS.backgrounds;

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
    return BACKGROUNDS[0]; // Default to first background for now
}; 