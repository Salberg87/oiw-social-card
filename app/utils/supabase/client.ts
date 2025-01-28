import { createBrowserClient } from '@supabase/ssr'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Create a singleton instance
let client: ReturnType<typeof createBrowserClient> | null = null

export const createClient = () => {
    if (client) return client

    client = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    return client
} 