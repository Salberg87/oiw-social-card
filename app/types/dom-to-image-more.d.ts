declare module 'dom-to-image-more' {
    export interface DomToImageOptions {
        width?: number;
        height?: number;
        quality?: number;
        style?: {
            transform?: string;
            transformOrigin?: string;
        };
    }

    function toPng(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
    function toJpeg(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
    function toBlob(node: HTMLElement, options?: DomToImageOptions): Promise<Blob>;
    function toPixelData(node: HTMLElement, options?: DomToImageOptions): Promise<Uint8ClampedArray>;

    export default {
        toPng,
        toJpeg,
        toBlob,
        toPixelData
    };
} 