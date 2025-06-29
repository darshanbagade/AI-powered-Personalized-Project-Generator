# Railway Backend Deployment Guide

## Prerequisites
1. Create a Railway account at https://railway.app
2. Install Railway CLI: `npm install -g @railway/cli`
3. Push your backend code to GitHub

## Deployment Steps

### Option 1: Deploy via Railway Dashboard (Recommended)

1. **Go to Railway Dashboard**
   - Visit https://railway.app
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `backend` folder as root directory

3. **Configure Environment Variables**
   Add these variables in Railway dashboard:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
   JWT_SECRET=your_super_secret_jwt_key_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   FRONTEND_URL=https://your-vercel-app.vercel.app
   NODE_ENV=production
   ```

4. **Deploy**
   - Railway will automatically detect Node.js and deploy
   - Check the deployment logs for any errors

### Option 2: Deploy via CLI

1. **Login to Railway**
   ```bash
   railway login
   ```

2. **Navigate to Backend Directory**
   ```bash
   cd backend
   ```

3. **Initialize Railway Project**
   ```bash
   railway init
   ```

4. **Add Environment Variables**
   ```bash
   railway variables set MONGO_URI="your_mongodb_uri"
   railway variables set JWT_SECRET="your_jwt_secret"
   railway variables set NODE_ENV="production"
   # Add other variables as needed
   ```

5. **Deploy**
   ```bash
   railway up
   ```

## Important Configuration

### MongoDB Setup
1. **Create MongoDB Atlas Account**: https://www.mongodb.com/atlas
2. **Create Cluster**: Free tier M0 cluster
3. **Get Connection String**: 
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
4. **Whitelist Railway IPs**: 
   - Go to Network Access in MongoDB Atlas
   - Add IP: `0.0.0.0/0` (allow all) for Railway

### Email Configuration (Nodemailer)
1. **Gmail Setup**:
   - Enable 2-factor authentication
   - Generate App Password: Google Account → Security → App passwords
   - Use App Password as `EMAIL_PASS`

### Environment Variables Reference
```
# Required
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-key-min-32-chars
NODE_ENV=production

# Email (if using Nodemailer)
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your-app-password

# CORS (Frontend URL)
FRONTEND_URL=https://your-vercel-domain.vercel.app

# Google OAuth (if implemented)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Post-Deployment

### 1. Update Frontend Environment Variables
In your Vercel frontend deployment, update:
```
VITE_API_URL=https://your-railway-app.railway.app/api
```

### 2. Test Your Deployment
- Visit: `https://your-railway-app.railway.app/health`
- Should return: `{"status":"OK","message":"Server is running"}`

### 3. Check Logs
- In Railway dashboard, go to your project
- Click on "Deployments" tab to view logs
- Monitor for any errors

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check if MONGO_URI is correctly set
   - Verify MongoDB Atlas allows connections from Railway
   - Ensure database user has correct permissions

2. **CORS Errors**
   - Update FRONTEND_URL environment variable
   - Make sure your Vercel domain is included in CORS origins

3. **Build/Start Errors**
   - Check Railway deployment logs
   - Verify all dependencies are in package.json
   - Ensure start script is correct: `"start": "node server.js"`

4. **Environment Variables Not Working**
   - Check variable names match exactly
   - Restart the Railway service after adding variables
   - Use Railway CLI: `railway variables` to list all variables

### Debugging Commands
```bash
# View deployment logs
railway logs

# Check environment variables
railway variables

# Open Railway shell
railway shell

# Restart service
railway service restart
```

## Domain and SSL
- Railway provides HTTPS by default
- Custom domain: Go to Settings → Domains in Railway dashboard
- SSL certificates are automatically managed

## Monitoring
- Railway provides basic metrics in the dashboard
- Set up external monitoring (Uptime Robot, etc.) for production
- Use Railway's built-in logging for debugging

## Scaling
- Railway automatically handles basic scaling
- For high traffic, consider upgrading to paid plans
- Monitor usage in Railway dashboard

## Security Best Practices
1. Use strong JWT secrets (min 32 characters)
2. Keep environment variables secure
3. Regularly update dependencies
4. Enable MongoDB Atlas IP whitelisting
5. Use HTTPS only in production
6. Implement rate limiting if needed
