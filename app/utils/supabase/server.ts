import { createServerClient } from '@supabase/ssr'

export const createClient = async () => {
    return createServerClient(
        'https://lohpyvtniqesxzjxhvby.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            // Skip cookie handling for now since we're not using auth
            cookies: {
                get: () => undefined,
                set: () => { },
                remove: () => { },
            },
        }
    )
} 