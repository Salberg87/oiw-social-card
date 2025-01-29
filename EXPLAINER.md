# OIW Social Card Generator - Codebase Documentation

This document explains the structure and purpose of the different components in the OIW Social Card Generator application.

## Project Structure

```
my-app/
├── app/                    # Next.js app directory (main application code)
│   ├── components/        # React components
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions and constants
│   └── page.tsx          # Main application page
├── components/            # Shared UI components (shadcn/ui)
├── lib/                   # Utility libraries
└── public/               # Static assets
```

## Key Components

### Main Components

- `app/page.tsx`: Main application page that serves as the entry point
- `app/components/image-generator.tsx`: Core component for generating social cards
- `app/components/ImageUploader.tsx`: Handles image upload functionality
- `app/components/ImageCropper.tsx`: Provides image cropping capabilities
- `app/components/preview.tsx`: Renders the preview of the generated social card
- `app/components/user-form.tsx`: Form for user input and customization

### Utility Files

- `app/utils/constants.ts`: Application-wide constants
- `app/utils/backgrounds.ts`: Background configurations and options
- `lib/utils.ts`: Shared utility functions

### Type Definitions

- `app/types/use-react-screenshot.d.ts`: Types for screenshot functionality
- `app/types/dom-to-image-more.d.ts`: Types for DOM-to-image conversion

### UI Components (shadcn/ui)

- `components/ui/dialog.tsx`: Modal dialog component
- `components/ui/radio-group.tsx`: Radio button group component
- `components/ui/card.tsx`: Card component for structured content

## Features

1. **Image Upload & Processing**
   - User photo upload
   - Image cropping and adjustment
   - Background selection

2. **Social Card Generation**
   - Custom text input
   - Layout customization
   - Preview functionality
   - Image download

3. **User Interface**
   - Responsive design
   - Modern UI components
   - Interactive preview

## Application Workflow

1. **Initial Load**
   - User lands on the main page (`page.tsx`)
   - The OIW logo and welcome message are displayed
   - The image generator component is initialized

2. **Photo Upload Process**
   - User clicks on the upload area in `ImageUploader.tsx`
   - They can either drag & drop or select a photo
   - The image is validated for size and format
   - Selected image is passed to the cropper

3. **Image Customization**
   - `ImageCropper.tsx` displays the uploaded image
   - User can adjust the crop area to fit the desired composition
   - Cropping maintains aspect ratio for consistent card design

4. **User Information Input**
   - Through `user-form.tsx`, users input their:
     - Name
     - Role/Title
     - Talk to me about topic
   - Form validates input in real-time

5. **Card Customization**
   - Users can select from predefined background options
   - Background colors and patterns are managed in `backgrounds.ts`
   - Preview updates in real-time as changes are made

6. **Preview & Generation**
   - `preview.tsx` shows live preview of the social card
   - All elements (photo, text, background) are composed together
   - Users can make adjustments to any element at any time

7. **Final Export**
   - User clicks the download button
   - The card is generated as an image using screenshot functionality
   - Final image is downloaded to the user's device

## Technology Stack

- Next.js 14.2.16 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Image processing libraries

## TODO List

1. **Critical Issues**
   - [ ] Implement proper error handling for image upload failures
   - [ ] Add loading states for image processing
   - [ ] Optimize image compression for better performance

2. **User Experience**
   - [ ] Add tooltips for UI controls
   - [ ] Implement undo/redo functionality
   - [ ] Add keyboard shortcuts for common actions

3. **Performance**
   - [ ] Optimize image processing for large files
   - [ ] Implement lazy loading for components
   - [ ] Add caching for processed images

4. **Accessibility**
   - [ ] Add ARIA labels to all interactive elements
   - [ ] Improve keyboard navigation
   - [ ] Add screen reader support

5. **Testing**
   - [ ] Add unit tests for core components
   - [ ] Implement integration tests
   - [ ] Add end-to-end testing

6. **Documentation**
   - [ ] Add inline code documentation
   - [ ] Create user guide
   - [ ] Document API endpoints and data flow

7. **Security**
   - [ ] Implement file type validation
   - [ ] Add rate limiting for image processing
   - [ ] Secure image upload process

8. **Features**
   - [ ] Add more background options
   - [ ] Implement social sharing
   - [ ] Add template system for quick starts

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ``` 