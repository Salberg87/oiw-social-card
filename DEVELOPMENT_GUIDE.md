# OIW Social Card Generator - Development Guide

This guide provides detailed information for developers who want to contribute to the Oslo Innovation Week Social Card Generator project.

## Development Environment Setup

### Prerequisites

- Node.js 18+ (LTS version recommended)
- npm 9+ or yarn 1.22+
- Git
- A code editor (VS Code recommended)
- A Supabase account and project

### Initial Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/oiw-social-card.git
cd oiw-social-card
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Start the development server**

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

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

## Development Workflow

### Branching Strategy

We follow a simplified Git Flow branching strategy:

- `main`: Production-ready code
- `dev`: Development branch where features are integrated
- Feature branches: Created from `dev` for new features or bug fixes

### Creating a New Feature

1. Create a new branch from `dev`:

```bash
git checkout dev
git pull
git checkout -b feature/your-feature-name
```

2. Implement your feature or fix
3. Commit your changes with meaningful commit messages:

```bash
git add .
git commit -m "feat: add your feature description"
```

4. Push your branch to GitHub:

```bash
git push -u origin feature/your-feature-name
```

5. Create a Pull Request to merge your changes into the `dev` branch

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect the meaning of the code (formatting, etc.)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `chore`: Changes to the build process or auxiliary tools

Example: `feat: add image cropping functionality`

## Code Style and Linting

We use ESLint and Prettier to maintain code quality and consistency:

- Run linting:

```bash
npm run lint
# or
yarn lint
```

- Format code:

```bash
npm run format
# or
yarn format
```

## Component Development Guidelines

### Creating New Components

1. Create a new file in the appropriate directory:
   - UI components: `app/components/ui/`
   - Feature components: `app/components/`

2. Use TypeScript for type safety:

```tsx
import React from 'react';

interface MyComponentProps {
  title: string;
  description?: string;
}

export function MyComponent({ title, description }: MyComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
```

3. Use Tailwind CSS for styling:

```tsx
<div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-xl font-bold text-gray-800">{title}</h2>
  {description && <p className="mt-2 text-gray-600">{description}</p>}
</div>
```

### State Management

- Use React hooks for state management
- Keep state as close to where it's used as possible
- Lift state up when needed by multiple components
- Use context sparingly and only when state needs to be accessed by many components

### Performance Considerations

- Memoize expensive calculations with `useMemo`
- Memoize callback functions with `useCallback`
- Use the React DevTools Profiler to identify performance bottlenecks
- Implement proper loading states for asynchronous operations
- Use code splitting for large components

## Working with Supabase

### Storage Buckets

The application uses two Supabase storage buckets:

- `backgrounds`: For background images
- `logos`: For logo variations

### Storage Utility Functions

The `app/utils/storage.ts` file provides utility functions for working with Supabase storage:

- `uploadImage`: Uploads an image to Supabase storage
- `getImageUrl`: Gets the URL of an image from Supabase storage
- `listImages`: Lists all images in a storage bucket
- `deleteImage`: Deletes an image from Supabase storage

## Testing

### Running Tests

```bash
npm test
# or
yarn test
```

### Writing Tests

We use Jest and React Testing Library for testing:

```tsx
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders the title', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders the description when provided', () => {
    render(<MyComponent title="Test Title" description="Test Description" />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('does not render the description when not provided', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });
});
```

## Building for Production

```bash
npm run build
# or
yarn build
```

To preview the production build locally:

```bash
npm start
# or
yarn start
```

## Deployment

The application is deployed to Vercel. The deployment process is automated through GitHub integration:

- Commits to the `main` branch trigger a production deployment
- Commits to the `dev` branch trigger a preview deployment
- Pull Requests trigger preview deployments

## Troubleshooting

### Common Issues

#### Image Upload Issues

- Check that the Supabase storage buckets are properly configured
- Verify that the CORS settings allow uploads from your development URL
- Check the browser console for any errors

#### Styling Issues

- Make sure Tailwind CSS is properly configured
- Check for conflicting class names
- Verify that the component is using the correct classes

#### Build Errors

- Check for TypeScript errors
- Verify that all dependencies are installed
- Clear the Next.js cache: `rm -rf .next`

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Framer Motion Documentation](https://www.framer.com/motion)

## Getting Help

If you need help or have questions, please:

1. Check the existing documentation
2. Look for similar issues in the GitHub repository
3. Create a new issue with a detailed description of your problem

## Contributing to Documentation

Documentation is as important as code. If you find something missing or unclear:

1. Create a new branch
2. Update the documentation
3. Submit a Pull Request

Thank you for contributing to the OIW Social Card Generator project! 