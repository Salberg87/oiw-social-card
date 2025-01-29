import { fetchAssets, getAssetBySeed, DEFAULT_ASSETS } from './storage'

// Export the default logos for backwards compatibility
export const LOGOS = DEFAULT_ASSETS.logos;

// Function to fetch logos
export async function fetchLogos(): Promise<string[]> {
    return fetchAssets('logos', {
        quality: 90, // Higher quality for logos
        format: 'png' // Keep PNG format for logos to maintain transparency
    });
}

// Function to get a logo based on a seed (like user's name)
export const getLogo = (seed?: string, logos: string[] = LOGOS): string => {
    return getAssetBySeed(seed, logos, LOGOS[0]);
}; 