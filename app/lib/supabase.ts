import { createBrowserClient } from '@supabase/ssr'

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseKey) {
    throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Create a singleton Supabase client for the browser
export const createClient = () => {
    return createBrowserClient(
        'https://lohpyvtniqesxzjxhvby.supabase.co',
        supabaseKey,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true
            },
            global: {
                headers: {
                    'Authorization': `Bearer ${supabaseKey}`
                }
            }
        }
    )
}

export const supabase = createClient()

// Export URL and key for other uses if needed
export const SUPABASE_URL = 'https://lohpyvtniqesxzjxhvby.supabase.co'
export const SUPABASE_ANON_KEY = supabaseKey 