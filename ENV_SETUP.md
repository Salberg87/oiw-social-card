# Environment Variables Setup

This document outlines the environment variables required for the Oslo Innovation Week Social Card Generator.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Environment Variables for Production

For production deployment, set these variables in your hosting platform (e.g., Vercel):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Application Settings
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
NODE_ENV=production
```

## Setting Up Supabase

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Navigate to Project Settings > API
4. Copy the URL and anon key to your environment variables
5. Create two storage buckets:
   - `backgrounds` - for background images
   - `logos` - for logo variations
6. Set storage buckets to public (under Settings)

## Verifying Environment Variables

Before deploying, run the application locally with the correct environment variables to ensure everything works as expected:

```bash
npm run dev
```

The application should start without any environment variable errors in the console. 