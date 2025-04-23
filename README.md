# Oslo Innovation Week Social Card Generator

A modern web application for creating personalized social media cards for Oslo Innovation Week 2025 attendees. Built with Next.js, Supabase, and TypeScript.

![Oslo Innovation Week](public/GraphicAssets/Logo/OIW25_Logo_Date_RGB_Cream.png)

## 🚀 Live Demo

Visit the live application: [oiwsocial.vercel.app](https://oiwsocial.vercel.app)

## ✨ Features

- 🎨 Dynamic background selection with multiple design options
- 📸 Profile image upload with interactive cropping
- 💬 Topic selection for networking and event engagement
- 🔄 Real-time preview of your personalized social card
- 🖼️ High-quality image generation for social media sharing
- 📱 Fully responsive design that works on all devices
- 🚀 Optimized image delivery via Supabase CDN
- ⚡ Performance-optimized for fast loading and rendering

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Storage**: [Supabase Storage](https://supabase.com/storage)
- **Image Processing**: Supabase Image Transformation API
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Deployment**: [Vercel](https://vercel.com)

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Supabase account and project

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/oiw-social-card.git
cd oiw-social-card
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Supabase Setup

1. Create two storage buckets in your Supabase project:
   - `backgrounds` - for background images
   - `logos` - for logo variations

2. Set appropriate CORS and security policies:
   - Enable public access for both buckets
   - Configure image transformations with the following settings:
     - Allow WebP conversion
     - Set maximum dimensions to 1200x1200
     - Enable quality optimization

### Development

Run the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Production Build

Create a production build:
```bash
npm run build
```

Run the production build locally:
```bash
npm start
```

## 📂 Project Structure

```
oiw-social-card/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   │   ├── ui/             # UI components (shadcn/ui)
│   │   ├── social-card.tsx # Main social card generator
│   │   ├── user-form.tsx   # User input form
│   │   ├── image-preview.tsx # Preview component
│   │   └── ...
│   ├── utils/              # Utility functions
│   │   ├── backgrounds.ts  # Background configurations
│   │   ├── logos.ts        # Logo configurations 
│   │   └── storage.ts      # Supabase storage utilities
│   ├── types/              # TypeScript types
│   ├── fonts/              # Custom font definitions
│   └── page.tsx            # Main page
├── lib/                    # Library code
├── public/                 # Static assets
│   └── GraphicAssets/      # Images and logos
└── ...config files
```

## 🧩 Key Components

### SocialCard
The main component that orchestrates the social card generation process. It manages:
- Form state and validation
- Asset loading and caching
- Background selection and rendering
- Image preview and generation

### UserForm
Handles user input including:
- Name and title entry
- Topic selection with predefined options
- Profile image upload and validation
- Background customization options

### ImagePreview
Renders the final social card with:
- Real-time updates as user makes changes
- Responsive layout that adapts to screen size
- Optimized image display with proper loading states
- Visual feedback during processing

### ImageUploader
Manages the image upload process:
- Drag and drop functionality
- File type validation
- Size restrictions
- Integration with image cropping

## 🖼️ Asset Management

The application uses Supabase Storage for asset management with:
- Automatic WebP conversion for backgrounds
- High-quality PNG preservation for logos
- Client-side caching for improved performance
- Fallback to local assets when offline

## 🔧 Performance Optimizations

The application includes several performance optimizations:
- Lazy loading of non-critical components
- Image optimization with Next.js Image component
- Font optimization with proper loading strategies
- Code splitting for reduced bundle size
- Caching of static assets
- Skeleton loading states for improved perceived performance

## 🧪 Testing

Run tests with:
```bash
npm test
```

The project uses:
- Jest for unit testing
- React Testing Library for component testing
- Cypress for end-to-end testing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and follow the code style guidelines.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Oslo Innovation Week team for their vision and support
- Supabase team for their excellent storage solution
- Next.js team for the amazing framework
- The open source community for the tools and libraries used in this project