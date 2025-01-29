import { createBrowserClient } from '@supabase/ssr'

/**
 * Validate required environment variables for Supabase configuration
 */
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

/**
 * Singleton instance of the Supabase client
 * This ensures we only create one client instance throughout the application
 */
let client: ReturnType<typeof createBrowserClient> | null = null

/**
 * Creates or returns an existing Supabase client for browser-side operations
 * Uses environment variables for configuration and maintains a singleton pattern
 * @returns Supabase client instance
 */
export const createClient = () => {
    if (client) return client

    client = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    return client
} 