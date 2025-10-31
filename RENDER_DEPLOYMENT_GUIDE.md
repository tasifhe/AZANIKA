# 🚀 Deploy Backend to Render.com (FREE)

## Why Render.com?
- ✅ **100% FREE forever** (500 hours/month - enough for small apps)
- ✅ **No cold starts** like Vercel serverless
- ✅ **Persistent database connections** (better performance)
- ✅ **Auto-deploys** from GitHub
- ✅ **Easy setup** (5 minutes)

---

## Step 1: Sign Up for Render

1. Go to https://render.com
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (easiest option)
4. Authorize Render to access your repositories

---

## Step 2: Create a New Web Service

1. From Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your **AZANIKA** repository
3. Configure the service:

### Configuration Settings:
```
Name: azanika-backend
Root Directory: AZANIKA/server
Environment: Node
Region: Singapore (or closest to you)
Branch: main

Build Command: npm install && npm run build
Start Command: npm start
```

---

## Step 3: Add Environment Variables

In the Render dashboard, add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `postgresql://postgres.zupvjkpxjopiukxmcapm:LMii4o2GApNJpJ@aws-1-ap-south-1.pooler.supabase.com:5432/postgres` |
| `JWT_SECRET` | `AZANIKA!2025SSK6969` |
| `SUPABASE_URL` | `https://zupvjkpxjopiukxmcapm.supabase.co` |
| `SUPABASE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cHZqa3B4am9waXVreG1jYXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMzI1OTEsImV4cCI6MjA3NjYwODU5MX0.hfms4UZcoohEJ9f36SEt966wu97nxOD80yr2LeQ05Lo` |
| `FRONTEND_URL` | `https://azanika.vercel.app` |
| `CORS_ORIGIN` | `https://azanika.vercel.app` |
| `PORT` | `10000` |

---

## Step 4: Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Build your TypeScript code
   - Start your Express server
3. Wait 3-5 minutes for deployment to complete

---

## Step 5: Get Your Backend URL

After deployment completes, you'll get a URL like:
```
https://azanika-backend.onrender.com
```

**Test it:**
```
https://azanika-backend.onrender.com/api/products
```

---

## Step 6: Update Frontend to Use Render Backend

Update your frontend `.env.local`:

```bash
NEXT_PUBLIC_API_URL=https://azanika-backend.onrender.com/api
```

Then update in Vercel Dashboard:
1. Go to Vercel → AZANIKA project → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_API_URL` = `https://azanika-backend.onrender.com/api`
3. Redeploy your frontend

---

## ✅ Done!

Your backend is now hosted on Render.com for FREE and will work reliably!

### Benefits:
- ✅ No 500 errors
- ✅ Faster response times
- ✅ Proper database connection pooling
- ✅ Auto-restarts if crashes
- ✅ SSL/HTTPS enabled automatically
- ✅ Logs available in dashboard

---

## Troubleshooting

### If deployment fails:
1. Check Render logs for errors
2. Make sure `AZANIKA/server` folder has all files
3. Verify `package.json` has `build` and `start` scripts

### If you see 503 errors:
- Render free tier spins down after 15 minutes of inactivity
- First request after idle will take 30-60 seconds (cold start)
- After that, it stays awake and responds instantly

---

## Alternative: Railway (If you prefer)

If you want to use Railway instead:
1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select AZANIKA repository
5. Set root directory: `AZANIKA/server`
6. Add same environment variables
7. Railway gives $5/month free credit

**Both options work great!** Choose whichever you prefer.
