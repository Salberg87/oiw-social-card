# Deployment Guide for Oslo Innovation Week Social Card Generator

This guide provides step-by-step instructions for deploying the Oslo Innovation Week Social Card Generator to production.

## Prerequisites

Before deploying, make sure you have:

1. A Supabase account and project set up with storage buckets
2. A Vercel account (recommended for deployment)
3. Environment variables documented in ENV_SETUP.md
4. Access to the project's GitHub repository

## Pre-Deployment Checklist

- [ ] All console.log statements replaced with logger utility
- [ ] Environment variables configured
- [ ] Assets uploaded to Supabase
- [ ] Performance tested on both desktop and mobile
- [ ] Browser compatibility verified (Chrome, Firefox, Safari, Edge)
- [ ] CDN optimization for assets completed

## CDN Optimization (Required)

Optimize your Supabase storage buckets to function as a CDN for improved asset delivery:

1. **Run the CDN optimization script**
   ```bash
   npm run cdn:optimize
   ```
   This script will:
   - Update bucket settings for optimal CDN usage
   - Configure cache control headers for all assets
   - Optimize transform settings for different devices

2. **Verify CDN settings**
   - Check the Supabase dashboard to ensure buckets are properly configured
   - Each asset should have appropriate cache-control headers

## Deployment Steps with Vercel (Recommended)

1. **Push to GitHub**
   - Ensure all changes are committed and pushed to your GitHub repository

2. **Connect to Vercel**
   - Log in to your Vercel account
   - Click "Add New" > "Project"
   - Select the GitHub repository
   - Configure project settings:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: `npm run preproduction` (includes CDN optimization)
     - Output Directory: .next

3. **Configure Environment Variables**
   - Add the following environment variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     NEXT_PUBLIC_APP_URL=https://your-production-domain.com
     ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application

5. **Verify Deployment**
   - Once deployment is complete, click on the generated URL
   - Test the application's functionality
   - Check for any console errors
   - Verify that assets load correctly and are served from CDN

## Manual Deployment (Alternative)

If not using Vercel, follow these steps for manual deployment:

1. **Optimize CDN and Build the Application**
   ```bash
   npm run preproduction
   ```

2. **Configure Environment Variables**
   - Set the necessary environment variables on your hosting platform

3. **Start the Server**
   ```bash
   npm start
   ```

## Post-Deployment

1. **Monitor Application**
   - Set up monitoring tools (Vercel Analytics recommended)
   - Check error logs periodically

2. **Performance Testing**
   - Run Lighthouse tests on the deployed site
   - Test on various devices and network conditions
   - Verify CDN performance with browser developer tools (Network tab)

3. **Update DNS (if needed)**
   - If using a custom domain, configure DNS settings according to your hosting provider's instructions

## Troubleshooting Common Issues

- **Missing Assets**: Ensure Supabase storage buckets are public and accessible
- **Environment Variable Errors**: Verify all environment variables are correctly set
- **Build Failures**: Check build logs for specific errors
- **Client-Side Errors**: Use browser DevTools to identify JS errors
- **CDN Issues**: Check network panel to ensure assets are using proper cache headers

## Rollback Plan

If deployment issues occur:

1. Revert to the last known working commit
2. Redeploy from that commit
3. Investigate issues in a development environment

## Maintenance

- Regularly update dependencies
- Monitor Supabase storage usage
- Check for performance regressions
- Review CDN cache hit rates in Supabase dashboard 