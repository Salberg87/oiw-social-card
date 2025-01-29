# Oslo Innovation Week Social Card Generator

A modern web application for creating personalized social media cards for Oslo Innovation Week 2025 attendees. Built with Next.js, Supabase, and TypeScript.

![Oslo Innovation Week](public/GraphicAssets/Logo/OIW25_Logo_Date_RGB_Cream.png)

## Features

- 🎨 Dynamic background selection
- 📸 Profile image upload with cropping
- 💬 Topic selection for networking
- 🔄 Real-time preview
- 🖼️ High-quality image generation
- 📱 Responsive design
- 🚀 Optimized image delivery via Supabase CDN

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Storage**: [Supabase Storage](https://supabase.com/storage)
- **Image Processing**: Supabase Image Transformation API
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Supabase account and project

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

1. Create two storage buckets in your Supabase project:
   - backgrounds - for background images
   - logos - for logo variations

2. Set appropriate CORS and security policies:
   - Enable public access for both buckets
   - Configure image transformations

### Development

Run the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
my-app/
├── app/                    # Next.js app directory
│   ├── components/        # React components
│   ├── lib/              # Library code
│   ├── types/            # TypeScript types
│   ├── utils/            # Utility functions
│   └── page.tsx          # Main page
├── public/               # Static assets
│   └── GraphicAssets/    # Images and logos
└── ...config files
```

## Key Components

### ImageGenerator
The main component that orchestrates the social card generation process. It manages:
- Form state
- Asset loading
- Background selection
- Image preview

### UserForm
Handles user input including:
- Name and title entry
- Topic selection
- Profile image upload
- Background customization

### PreviewCard
Renders the final social card with:
- Real-time updates
- Responsive layout
- Optimized image display

## Asset Management

The application uses Supabase Storage for asset management with:
- Automatic WebP conversion for backgrounds
- High-quality PNG preservation for logos
- Client-side caching
- Fallback to local assets

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Oslo Innovation Week team
- Supabase team for their excellent storage solution
- Next.js team for the amazing framework
-