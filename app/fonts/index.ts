import localFont from 'next/font/local'

// Load custom fonts
export const displayFont = localFont({
    src: [
        {
            path: './PP Editorial New/PPEditorialNew-UltralightItalic.otf',
            weight: '200',
            style: 'italic'
        },
        {
            path: './PP Editorial New/PPEditorialNew-Ultralight.otf',
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
            path: './Circular/CircularStd-Book.otf',
            weight: '400',
            style: 'normal'
        },
        {
            path: './Circular/CircularStd-BookItalic.otf',
            weight: '400',
            style: 'italic'
        },
        {
            path: './Circular/CircularStd-Medium.otf',
            weight: '500',
            style: 'normal'
        },
        {
            path: './Circular/CircularStd-Bold.otf',
            weight: '700',
            style: 'normal'
        },
        {
            path: './Circular/CircularStd-Black.otf',
            weight: '900',
            style: 'normal'
        }
    ],
    variable: '--font-body',
    display: 'swap',
})