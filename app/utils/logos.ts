import { fetchAssets, getAssetBySeed, DEFAULT_ASSETS } from './storage'

// Export the default logos for backwards compatibility
export const LOGOS = DEFAULT_ASSETS.logos;

// Function to fetch logos
export async function fetchLogos(): Promise<string[]> {
    return fetchAssets('logos');
}

// Function to get a logo based on a seed (like user's name)
export const getLogo = (seed?: string, logos: string[] = LOGOS): string => {
    return getAssetBySeed(seed, logos, LOGOS[0]);
}; 