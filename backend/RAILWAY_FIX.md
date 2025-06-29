# Quick Fix for Railway Deployment

## The Problem
Railway's Nixpacks couldn't determine which application to build because your repository contains multiple folders (frontend/, backend/, python backend/).

## Quick Solutions

### Option 1: Deploy Backend Separately (Recommended)

1. **Create a new repository for backend only**:
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Backend for Railway"
   # Create new repo on GitHub, then:
   git remote add origin https://github.com/yourusername/backend-repo.git
   git push -u origin main
   ```

2. **Deploy the new repository** to Railway

### Option 2: Use Railway Root Directory Setting

1. In Railway dashboard, go to your project
2. Go to Settings → Service Settings
3. Set **Root Directory** to `backend`
4. Click "Redeploy"

### Option 3: Railway CLI with Specific Directory

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy from backend directory
cd backend
railway init
railway up
```

## Environment Variables to Set in Railway

Based on your .env file, set these in Railway dashboard:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
JWT_SECRET_KEY=your_jwt_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
SENDER_EMAIL=your_email@gmail.com
SMTP_USER=your_smtp_user_here
SMTP_PASS=your_smtp_password_here
GROQ_API_KEY=your_groq_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_KEY2=your_gemini_api_key_2_here
RAPIDAPI_KEY=your_rapidapi_key_here
NODE_ENV=production
PORT=5000
```

**Important**: Copy the actual values from your local .env file and paste them in Railway dashboard.

## MongoDB Setup for Production

1. **Create MongoDB Atlas account**: https://www.mongodb.com/atlas
2. **Create a cluster** (free tier is fine)
3. **Get connection string**:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password
   - Example: `mongodb+srv://username:password@cluster0.abc123.mongodb.net/personalprivacydashboard`

## Next Steps After Deployment

1. Get your Railway URL (e.g., `https://your-app.railway.app`)
2. Update your frontend's `VITE_API_URL` environment variable in Vercel
3. Test the deployment at: `https://your-app.railway.app/health`
