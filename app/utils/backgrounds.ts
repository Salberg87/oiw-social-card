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
export const getRandomBackground = (): string => {
    return BACKGROUNDS[0]; // Default to first background for now
}; 