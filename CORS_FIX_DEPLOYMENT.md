# 🔧 CORS Fix Deployment Guide

## Issue
CORS error: `Access-Control-Allow-Origin` header is missing from `https://azanika-backend.onrender.com`

## ✅ Fixes Applied (Already in Code)

1. **Enhanced CORS Configuration** in `AZANIKA/server/src/app.ts`
   - Added comprehensive origin matching
   - Support for Vercel preview deployments
   - Better preflight request handling
   - Extended cache for OPTIONS requests (24 hours)

2. **Updated Dependencies**
   - Fixed multer security vulnerability
   - Updated package-lock.json
   - Rebuilt TypeScript dist/ files

## 🚀 Deploy These Fixes to Render

### Option 1: Automatic Deployment (Recommended)
Render should automatically detect the pushed changes and redeploy. Check:

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Find your **azanika-backend** service
3. Check the "Events" tab - you should see a deployment in progress
4. Wait 3-5 minutes for deployment to complete

### Option 2: Manual Deployment
If automatic deployment didn't trigger:

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **azanika-backend** service
3. Click "Manual Deploy" → "Deploy latest commit"
4. Wait 3-5 minutes

### Option 3: Clear Build Cache (If still failing)
If CORS issues persist after redeployment:

1. Go to your service settings in Render
2. Click "Settings" tab
3. Scroll down to "Build & Deploy"
4. Click "Clear build cache & deploy"

## ✅ Verify Environment Variables in Render

Make sure these are set in your Render service:

```bash
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://postgres.zupvjkpxjopiukxmcapm:LMii4o2GApNJpJ@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
JWT_SECRET=AZANIKA!2025SSK6969
CLIENT_URL=https://azanika.vercel.app
SUPABASE_URL=https://zupvjkpxjopiukxmcapm.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cHZqa3B4am9waXVreG1jYXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMzI1OTEsImV4cCI6MjA3NjYwODU5MX0.hfms4UZcoohEJ9f36SEt966wu97nxOD80yr2LeQ05Lo
```

**IMPORTANT**: The `CLIENT_URL` variable must be set to `https://azanika.vercel.app`

## 🧪 Test CORS After Deployment

### Test 1: Direct API Call
```bash
curl -H "Origin: https://azanika.vercel.app" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://azanika-backend.onrender.com/api/products
```

You should see these headers in the response:
- `Access-Control-Allow-Origin: https://azanika.vercel.app`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH`
- `Access-Control-Allow-Credentials: true`

### Test 2: Browser Console
Open https://azanika.vercel.app and run in browser console:
```javascript
fetch('https://azanika-backend.onrender.com/api/products')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

Should return products array without CORS error.

## 📊 What Changed in CORS Configuration

### Before:
```typescript
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));
```

### After:
```typescript
const corsOptions = {
  origin: (origin, callback) => {
    // Dynamic origin checking with RegEx support
    // Allows Vercel preview deployments
    if (!origin || isAllowed(origin)) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Cache-Control',
    'Pragma'
  ],
  maxAge: 86400, // Cache preflight for 24 hours
};

app.use(cors(corsOptions));

// Additional OPTIONS handler for maximum compatibility
app.options('*', (req, res) => {
  // Set appropriate CORS headers
  res.header('Access-Control-Max-Age', '86400');
  res.status(200).end();
});
```

## ⏱️ Expected Timeline

- **Render detects push**: Immediate
- **Build & Deploy**: 3-5 minutes
- **CORS working**: Immediately after deployment
- **Full propagation**: 1-2 minutes after deployment

## 🔍 Troubleshooting

### If CORS error persists after 10 minutes:

1. **Check Render Logs**
   - Go to Render Dashboard → Your Service → Logs
   - Look for: `Allowed CORS origins:` in the logs
   - Verify `https://azanika.vercel.app` is in the list

2. **Verify Deployment**
   - Check that the latest commit is deployed
   - Look for successful build in "Events" tab

3. **Check Environment Variables**
   - Settings → Environment
   - Ensure `CLIENT_URL=https://azanika.vercel.app` is set

4. **Force Redeploy**
   - Settings → Clear build cache & deploy

5. **Check Vercel Domain**
   - Make sure your Vercel URL is exactly `https://azanika.vercel.app`
   - No trailing slash

## ✅ Success Indicators

You'll know CORS is fixed when:
- ✅ No CORS errors in browser console
- ✅ Products load on homepage
- ✅ API calls succeed
- ✅ Network tab shows status 200 (not CORS error)

## 📞 If Still Having Issues

Check these in order:
1. Is Render deployment successful? (Check Events tab)
2. Are environment variables set? (Check Settings → Environment)
3. Is the service running? (Check if API endpoint responds)
4. Are logs showing CORS errors? (Check Logs tab)

---

**Last Updated**: November 1, 2025
**Status**: CORS fixes committed and pushed to main branch
**Next Step**: Wait for Render automatic deployment (3-5 minutes)