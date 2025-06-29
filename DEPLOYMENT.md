# Vercel Deployment Guide

## Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Create a Vercel account at https://vercel.com
3. Push your code to GitHub

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)
1. Go to https://vercel.com/dashboard
2. Click "Import Project"
3. Connect your GitHub repository
4. Select your repository
5. Configure the following settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. Add Environment Variables:
   - `VITE_API_URL`: Your backend API URL (e.g., https://your-backend.herokuapp.com/api)
   - `VITE_PYTHON_API_URL`: Your Python backend URL

7. Click "Deploy"

### Option 2: Deploy via CLI
1. Navigate to your project root directory
2. Run: `vercel`
3. Follow the prompts:
   - Link to existing project or create new one
   - Set the framework to "Vite"
   - Set the root directory to "frontend"
4. Configure environment variables in Vercel dashboard

## Backend Deployment

### Node.js Backend
Deploy your `backend` folder to:
- **Heroku**: https://heroku.com
- **Railway**: https://railway.app
- **Render**: https://render.com

### Python Backend
Deploy your `python backend` folder to:
- **Heroku** (with Python buildpack)
- **Railway**
- **PythonAnywhere**
- **Google Cloud Run**

## Environment Variables to Set in Vercel

```
VITE_API_URL=https://your-nodejs-backend-url.com/api
VITE_PYTHON_API_URL=https://your-python-backend-url.com
```

## Important Notes

1. **CORS Configuration**: Update your backend CORS settings to allow your Vercel domain
2. **Database**: Make sure your database is accessible from the internet
3. **API Keys**: Store sensitive keys in Vercel environment variables, not in code
4. **Build Errors**: Check the build logs in Vercel dashboard if deployment fails

## Troubleshooting

1. **Build Fails**: Check package.json dependencies and ensure all imports are correct
2. **API Calls Fail**: Verify environment variables are set correctly
3. **404 Errors**: Make sure your routing is configured for SPA (Single Page Application)

## Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Monitoring
- Check deployment logs in Vercel dashboard
- Use Vercel Analytics for performance monitoring
- Set up error tracking (Sentry, LogRocket, etc.)
