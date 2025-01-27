import { supabase } from '../lib/supabase'

// Cache the backgrounds once fetched
let cachedBackgrounds: string[] | null = null

// Function to fetch backgrounds from Supabase
export async function fetchBackgrounds(): Promise<string[]> {
    if (cachedBackgrounds) return cachedBackgrounds

    const { data, error } = await supabase
        .storage
        .from('backgrounds')
        .list('')

    if (error) {
        console.error('Error fetching backgrounds:', error)
        return []
    }

    // Get public URLs for each file
    const backgrounds = data
        .filter(file => file.name.endsWith('.png'))
        .map(file => {
            const { data: { publicUrl } } = supabase
                .storage
                .from('backgrounds')
                .getPublicUrl(file.name)
            return publicUrl
        })

    cachedBackgrounds = backgrounds
    return backgrounds
}

// Function to get a random background
export const getRandomBackground = async (): Promise<string> => {
    const backgrounds = await fetchBackgrounds()
    const randomIndex = Math.floor(Math.random() * backgrounds.length)
    return backgrounds[randomIndex]
}

// List of available backgrounds
export const BACKGROUNDS = [
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
];

// Function to get a background based on a seed (like user's name)
export const getBackground = (seed?: string): string => {
    if (!seed) {
        return BACKGROUNDS[0]; // Default to first background if no seed
    }
    // Create a deterministic index based on the seed
    const total = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return BACKGROUNDS[total % BACKGROUNDS.length];
};

// For backwards compatibility
export const getRandomBackgroundLegacy = (): string => {
    return BACKGROUNDS[0]; // Default to first background for now
}; 