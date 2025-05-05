/**
 * Utility functions for device detection
 */

"use client";

/**
 * Checks if the current device is a mobile device
 * @returns boolean indicating if the user is on a mobile device
 */
export function isMobileDevice(): boolean {
    if (typeof window === 'undefined') return false;

    // Check if using a mobile browser based on user agent
    const userAgent = window.navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

    // Additional check for screen size (typical mobile width)
    const isMobileWidth = window.innerWidth <= 768;

    return mobileRegex.test(userAgent) || isMobileWidth;
} 