/**
 * Production-safe logging utility
 * 
 * This utility prevents console logs from appearing in production
 * while maintaining them in development environments
 */

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Logs messages only in development environment
 */
export const logger = {
    log: (...args: any[]) => {
        if (isDevelopment) {
            console.log(...args);
        }
    },

    info: (...args: any[]) => {
        if (isDevelopment) {
            console.info(...args);
        }
    },

    warn: (...args: any[]) => {
        if (isDevelopment) {
            console.warn(...args);
        }
        // In production, you could optionally log warnings to a monitoring service
    },

    error: (...args: any[]) => {
        // Always log errors, but could be sent to monitoring in production
        console.error(...args);
    }
}; 