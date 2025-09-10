/**
 * Utility functions for device detection
 */

// Check if the current device is a mobile device based on user agent
export function isMobileDevice(): boolean {
    // Only run on client side
    if (typeof window === 'undefined') {
        return false;
    }

    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // Regular expression for mobile devices
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    return mobileRegex.test(userAgent);
}

// Check if the screen size is mobile-sized (max-width: 768px)
export function isMobileScreen(): boolean {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.innerWidth <= 768;
}

// Combined check for mobile device or screen size
export function isMobile(): boolean {
    return isMobileDevice() || isMobileScreen();
} 