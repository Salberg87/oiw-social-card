// List of available backgrounds
export const backgrounds = [
    "/GrapicAssets/backgrounds/OIW_GraphicAssets_16x9_02.01.png",
    "/GrapicAssets/backgrounds/OIW_GraphicAssets_16x9_02.02.png",
    "/GrapicAssets/backgrounds/OIW_GraphicAssets_16x9_02.03.png",
    "/GrapicAssets/backgrounds/OIW_GraphicAssets_16x9_02.04.png",
    "/GrapicAssets/backgrounds/OIW_GraphicAssets_16x9_02.05.png",
    "/GrapicAssets/backgrounds/OIW_GraphicAssets_16x9_02.06.png",
    "/GrapicAssets/backgrounds/OIW_GraphicAssets_16x9_02.07.png",
    "/GrapicAssets/backgrounds/OIW_GraphicAssets_16x9_02.08.png",
    "/GrapicAssets/backgrounds/OIW_GraphicAssets_16x9_02.09.png",
    "/GrapicAssets/backgrounds/OIW_GraphicAssets_16x9_02.10.png",
]

// Function to get a random background
export const getRandomBackground = (): string => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length)
    return backgrounds[randomIndex]
} 