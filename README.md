# OIW Social Card Generator

A Next.js application for generating social cards for Oslo Innovation Week 2025.

## Features

- Generate personalized social cards with:
  - User's name and title
  - Profile picture upload and cropping
  - Discussion topics
  - Dynamic backgrounds from Supabase storage
  - OIW logo integration

## Project Structure

```
my-app/
├── app/
│   ├── components/
│   │   ├── image-generator.tsx    # Main component for card generation
│   │   ├── preview-card.tsx       # Card preview component
│   │   ├── user-form.tsx         # Form for user input
│   │   └── image-uploader.tsx    # Image upload component
│   ├── utils/
│   │   ├── backgrounds.ts        # Background image handling
│   │   ├── logos.ts             # Logo handling
│   │   ├── storage.ts           # Supabase storage utilities
│   │   ├── constants.ts         # App constants
│   │   └── supabase/
│   │       ├── client.ts        # Supabase browser client
│   │       └── server.ts        # Supabase server client
│   └── types/
│       └── index.ts             # TypeScript type definitions
```

## Storage Structure

Supabase Storage Buckets:
- `backgrounds/` - Background images for cards
- `logos/` - OIW logo variations

## State Management

The `ImageGeneratorState` interface defines the core state:
```typescript
interface ImageGeneratorState {
    firstName: string;
    lastName: string;
    title: string;
    profileImage: File | null;
    croppedProfileImage: string | null;
    topics: string[];
    backgroundImage: string;
    logoImage: string;
}
```

## Asset Handling

- Images are optimized using Supabase's transformation features
- Backgrounds are converted to WebP format for better performance
- Logos are kept in PNG format to maintain transparency
- Client-side caching is implemented for better performance

## Environment Variables

Required environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
