# Railway Backend Deployment Guide

## Overview
This guide walks you through deploying your AZANIKA backend to Railway.

## Prerequisites
- Railway account (sign up at https://railway.app)
- GitHub repository connected
- Supabase database setup

## Step 1: Create a New Railway Project

1. Go to https://railway.app and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your AZANIKA repository
5. Railway will automatically detect your backend

## Step 2: Configure Root Directory

Since your backend is in `AZANIKA/server/`, you need to set the root directory:

1. In your Railway project, go to **Settings**
2. Under **"Deploy"**, find **"Root Directory"**
3. Set it to: `AZANIKA/server`
4. Click **"Update"**

## Step 3: Set Environment Variables

In Railway, go to the **Variables** tab and add these environment variables:

### Required Variables:

```bash
# Server Configuration
PORT=5000
NODE_ENV=production

# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT].supabase.co:5432/postgres

# JWT Secret (Generate a secure random string)
JWT_SECRET=your_super_secure_jwt_secret_key_here

# CORS (Add your Vercel frontend URL)
CORS_ORIGIN=https://your-app.vercel.app
```

### Optional Variables (if using):

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Step 4: Get Your Database URL from Supabase

1. Go to your Supabase project
2. Click **Settings** → **Database**
3. Under **Connection string**, select **URI**
4. Copy the connection string (it will look like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.your-project.supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with your actual database password

## Step 5: Generate a JWT Secret

Generate a secure JWT secret using Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Or use an online generator like: https://randomkeygen.com/

## Step 6: Deploy

1. After setting all environment variables, Railway will automatically deploy
2. Wait for the build to complete (usually 2-3 minutes)
3. Once deployed, Railway will provide you with a URL like: `https://your-app.up.railway.app`

## Step 7: Verify Deployment

Test your backend endpoints:

```bash
# Health check
curl https://your-app.up.railway.app/health

# Test products endpoint
curl https://your-app.up.railway.app/api/products
```

## Step 8: Update Frontend Configuration

Update your frontend (`src/lib/api.ts`) to use the Railway backend URL:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-app.up.railway.app';
```

Then add this to your Vercel environment variables:

```bash
NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
```

## Step 9: Configure CORS

Update the CORS configuration in your backend to allow your Vercel frontend:

```typescript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

## Railway Configuration Files

The following files help optimize your Railway deployment:

### `railway.json` (Already created)
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm install && npm run build"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## Monitoring and Logs

1. **View Logs**: In Railway, go to the **Deployments** tab to see real-time logs
2. **Metrics**: Check the **Metrics** tab for CPU, memory, and network usage
3. **Health Checks**: Railway automatically monitors your `/health` endpoint

## Common Issues and Solutions

### Issue: Build Fails

**Solution**: Ensure your `package.json` has the correct build script:
```json
"scripts": {
  "build": "tsc",
  "start": "node dist/app.js"
}
```

### Issue: Database Connection Error

**Solution**: 
1. Verify your `DATABASE_URL` is correct
2. Check Supabase allows connections from Railway (it should by default)
3. Make sure your database password doesn't contain special characters that need escaping

### Issue: CORS Errors

**Solution**: 
1. Add your Vercel frontend URL to `CORS_ORIGIN` environment variable
2. Update the CORS middleware in `app.ts`

### Issue: Port Not Found

**Solution**: Railway automatically provides the `PORT` environment variable. Your code already handles this:
```typescript
const PORT = process.env.PORT || 5000;
```

## Database Seeding

To seed your database with initial products:

1. In Railway, go to the **Settings** tab
2. Under **Deploy**, find **"Custom Start Command"**
3. Temporarily change it to: `npm run seed && npm start`
4. Or run manually in the Railway CLI: `railway run npm run seed`

## Custom Domain (Optional)

1. In Railway, go to **Settings** → **Networking**
2. Click **"Generate Domain"** for a custom `railway.app` subdomain
3. Or add your own custom domain

## Backup Strategy

Railway automatically backs up your deployments, but for your database:

1. Use Supabase's built-in backup features
2. Set up regular database backups in Supabase
3. Consider using Supabase's Point-in-Time Recovery (PITR) feature

## Cost Optimization

Railway offers:
- **Free Tier**: $5/month credit (good for small apps)
- **Pro Plan**: $20/month (more resources and priority support)

Tips:
1. Monitor your usage in the Railway dashboard
2. Set up spending limits under **Settings**
3. Scale resources based on actual traffic

## CI/CD

Railway automatically deploys when you push to your connected branch:

1. Push changes to GitHub
2. Railway detects the push
3. Automatically builds and deploys
4. Rollback available if issues occur

## Next Steps

1. ✅ Deploy backend to Railway
2. ✅ Set up environment variables
3. ✅ Test all API endpoints
4. ✅ Update frontend with Railway URL
5. ✅ Deploy frontend to Vercel
6. ✅ Test full application flow
7. ✅ Set up monitoring and alerts
8. ✅ Configure custom domain (optional)

## Support

- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Supabase Docs: https://supabase.com/docs

---

**Your Railway Backend URL**: Replace this with your actual URL after deployment
```
https://your-app.up.railway.app
```
