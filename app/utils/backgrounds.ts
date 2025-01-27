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
]

// Function to get a random background
export const getRandomBackground = (): string => {
    const randomIndex = Math.floor(Math.random() * BACKGROUNDS.length)
    return BACKGROUNDS[randomIndex]
} 