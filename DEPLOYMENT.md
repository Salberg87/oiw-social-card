# Deployment Guide

This document provides detailed instructions for deploying the Oslo Innovation Week Social Card Generator to production environments.

## Deployment Options

The application can be deployed using several methods:

1. **Vercel** (Recommended)
2. **Netlify**
3. **Self-hosted**

## Vercel Deployment (Recommended)

### Prerequisites

- A [Vercel](https://vercel.com) account
- A [GitHub](https://github.com) account
- A [Supabase](https://supabase.com) project

### Steps

1. **Fork or clone the repository**

   ```bash
   git clone https://github.com/your-username/oiw-social-card.git
   cd oiw-social-card
   ```

2. **Push to your GitHub repository**

   ```bash
   git remote set-url origin https://github.com/your-username/oiw-social-card.git
   git push -u origin main
   ```

3. **Import your project to Vercel**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" > "Project"
   - Select your GitHub repository
   - Configure the project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: .next

4. **Configure environment variables**

   Add the following environment variables in the Vercel project settings:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=your_production_url
   ```

5. **Deploy**

   Click "Deploy" and wait for the build to complete.

### Continuous Deployment

Vercel automatically sets up continuous deployment from your GitHub repository:

- Commits to the `main` branch trigger a production deployment
- Pull requests trigger preview deployments

## Netlify Deployment

### Prerequisites

- A [Netlify](https://netlify.com) account
- A [GitHub](https://github.com) account
- A [Supabase](https://supabase.com) project

### Steps

1. **Fork or clone the repository**

   ```bash
   git clone https://github.com/your-username/oiw-social-card.git
   cd oiw-social-card
   ```

2. **Push to your GitHub repository**

   ```bash
   git remote set-url origin https://github.com/your-username/oiw-social-card.git
   git push -u origin main
   ```

3. **Import your project to Netlify**

   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Select your GitHub repository
   - Configure the build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

4. **Configure environment variables**

   Add the following environment variables in the Netlify site settings:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=your_production_url
   ```

5. **Deploy**

   Click "Deploy site" and wait for the build to complete.

## Self-hosted Deployment

### Prerequisites

- A server with Node.js 18+ installed
- A domain name (optional)
- A [Supabase](https://supabase.com) project

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/oiw-social-card.git
   cd oiw-social-card
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create environment variables**

   Create a `.env.local` file with the following variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=your_production_url
   ```

4. **Build the application**

   ```bash
   npm run build
   ```

5. **Start the production server**

   ```bash
   npm start
   ```

6. **Set up a process manager (recommended)**

   For production environments, it's recommended to use a process manager like PM2:

   ```bash
   npm install -g pm2
   pm2 start npm --name "oiw-social-card" -- start
   pm2 save
   pm2 startup
   ```

7. **Set up a reverse proxy (recommended)**

   For production environments, it's recommended to use a reverse proxy like Nginx:

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Set up SSL (recommended)**

   For production environments, it's recommended to use SSL with Let's Encrypt:

   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Supabase Configuration

Regardless of the deployment method, you need to configure Supabase properly:

1. **Create storage buckets**

   Create two storage buckets in your Supabase project:
   - `backgrounds` - for background images
   - `logos` - for logo variations

2. **Configure CORS**

   In your Supabase project settings, configure CORS to allow requests from your deployment URL:

   - Go to Project Settings > API > CORS
   - Add your deployment URL to the allowed origins (e.g., `https://your-domain.com`)

3. **Configure storage permissions**

   Set appropriate permissions for your storage buckets:
   - `backgrounds` - Public read access
   - `logos` - Public read access

## Post-Deployment Verification

After deploying, verify that:

1. The application loads correctly
2. Image upload works
3. Background selection works
4. The preview updates in real-time
5. The download functionality works

## Monitoring and Analytics

For production deployments, consider setting up:

1. **Error monitoring** with [Sentry](https://sentry.io)
2. **Performance monitoring** with [Vercel Analytics](https://vercel.com/analytics)
3. **Usage analytics** with [Google Analytics](https://analytics.google.com)

## Troubleshooting

### Common Issues

#### CORS Errors

If you see CORS errors in the browser console:
- Verify that your Supabase CORS settings include your deployment URL
- Check that the URL format matches exactly (including http/https)

#### Image Upload Issues

If image upload doesn't work:
- Check that your Supabase storage buckets are properly configured
- Verify that the storage permissions allow uploads
- Check the browser console for any errors

#### Build Errors

If the build fails:
- Check the build logs for specific errors
- Verify that all dependencies are installed
- Ensure that environment variables are properly set

## Deployment Checklist

Before deploying to production, ensure:

- [ ] All environment variables are properly set
- [ ] Supabase storage buckets are properly configured
- [ ] CORS settings are properly configured
- [ ] The application builds successfully locally
- [ ] All features work as expected in a staging environment
- [ ] Performance optimizations are in place
- [ ] Error handling is properly implemented
- [ ] Analytics are set up (if needed)
- [ ] Monitoring is set up (if needed)

## Rollback Procedure

If you need to rollback a deployment:

### Vercel

1. Go to your project in the Vercel dashboard
2. Navigate to the "Deployments" tab
3. Find the previous working deployment
4. Click the three dots menu and select "Promote to Production"

### Netlify

1. Go to your site in the Netlify dashboard
2. Navigate to the "Deploys" tab
3. Find the previous working deployment
4. Click the three dots menu and select "Publish deploy"

### Self-hosted

1. Use Git to checkout the previous working commit:
   ```bash
   git checkout <previous-commit-hash>
   ```
2. Rebuild and restart the application:
   ```bash
   npm run build
   pm2 restart oiw-social-card
   ``` 