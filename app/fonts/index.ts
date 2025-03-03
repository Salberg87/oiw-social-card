import localFont from 'next/font/local'

// Load custom fonts
export const displayFont = localFont({
    src: [
        {
            path: './fonts/PP Editorial New/PPEditorialNew-UltralightItalic.otf',
            weight: '200',
            style: 'italic'
        },
        {
            path: './fonts/PP Editorial New/PPEditorialNew-Ultralight.otf',
            weight: '400',
            style: 'normal'
        }
    ],
    variable: '--font-display',
    display: 'swap',
})

export const bodyFont = localFont({
    src: [
        {
            path: './fonts/Circular/CircularStd-Book.otf',
            weight: '400',
            style: 'normal'
        },
        {
            path: './fonts/Circular/CircularStd-BookItalic.otf',
            weight: '400',
            style: 'italic'
        },
        {
            path: './fonts/Circular/CircularStd-Medium.otf',
            weight: '500',
            style: 'normal'
        },
        {
            path: './fonts/Circular/CircularStd-Bold.otf',
            weight: '700',
            style: 'normal'
        },
        {
            path: './fonts/Circular/CircularStd-Black.otf',
            weight: '900',
            style: 'normal'
        }
    ],
    variable: '--font-body',
    display: 'swap',
})