# Railway Deployment Checklist

## Pre-Deployment ✅

- [x] Updated package.json with proper start script
- [x] Updated server.js for production environment
- [x] Created railway.json configuration
- [x] Created .env.example with required variables
- [x] Added Node.js version specification
- [x] Created Procfile for alternative deployment

## Required Environment Variables
Make sure to set these in Railway dashboard:

```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
NODE_ENV=production
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
FRONTEND_URL=https://your-vercel-app.vercel.app
```

## Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Railway deployment"
   git push origin main
   ```

2. **Deploy to Railway**
   - Go to https://railway.app
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository and `backend` folder
   - Add environment variables in Railway dashboard
   - Deploy!

3. **Get Your Railway URL**
   - Copy the generated Railway URL (e.g., `https://your-app.railway.app`)

4. **Update Frontend Environment**
   - In Vercel, update `VITE_API_URL` to your Railway URL + `/api`
   - Example: `VITE_API_URL=https://your-app.railway.app/api`

5. **Test Deployment**
   - Visit: `https://your-app.railway.app/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

## Post-Deployment

- [ ] Test health endpoint
- [ ] Update frontend environment variables
- [ ] Test API endpoints
- [ ] Monitor deployment logs
- [ ] Set up database (MongoDB Atlas)
- [ ] Test authentication flow
- [ ] Verify email functionality (if using Nodemailer)

## Troubleshooting

If deployment fails:
1. Check Railway deployment logs
2. Verify all environment variables are set
3. Ensure MongoDB connection is working
4. Check CORS configuration
5. Verify start script in package.json

## Next Steps After Deployment

1. Get Railway backend URL
2. Update Vercel frontend with new API URL
3. Test complete application flow
4. Set up monitoring and logging
5. Configure custom domain (optional)
