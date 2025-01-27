declare module 'use-react-screenshot' {
    interface ScreenshotOptions {
        type?: string;
        quality?: number;
    }

    type TakeScreenshot = (node: HTMLElement) => Promise<string>;

    export function useScreenshot(options?: ScreenshotOptions): [string | null, TakeScreenshot];
} 