# 🚀 Add Environment Variables to Vercel - Quick Guide

## The Issue
Your site works locally but not on Vercel because Vercel doesn't have the database credentials.

## ✅ Solution: Add Environment Variables

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Click on your **AZANIKA** project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add These 4 Variables

Click **"Add New"** for each variable:

#### 1. DATABASE_URL
```
postgresql://postgres.zupvjkpxjopiukxmcapm:LMii4o2GApNJpJ@aws-1-ap-south-1.pooler.supabase.com:5432/postgres
```
- Select: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

#### 2. JWT_SECRET
```
AZANIKA!2025SSK6969
```
- Select: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

#### 3. SUPABASE_URL
```
https://zupvjkpxjopiukxmcapm.supabase.co
```
- Select: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

#### 4. SUPABASE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cHZqa3B4am9waXVreG1jYXBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMzI1OTEsImV4cCI6MjA3NjYwODU5MX0.hfms4UZcoohEJ9f36SEt966wu97nxOD80yr2LeQ05Lo
```
- Select: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

### Step 3: Redeploy
After adding all variables:

**Option A: From Vercel Dashboard**
1. Go to **Deployments** tab
2. Click the **"..."** menu on latest deployment
3. Click **"Redeploy"**

**Option B: Push a New Commit**
```bash
git commit --allow-empty -m "Trigger Vercel redeploy"
git push origin main
```

### Step 4: Wait & Test
1. Wait 2-3 minutes for deployment to complete
2. Visit: `https://your-app.vercel.app/api/products`
3. Should see products JSON!
4. Visit: `https://your-app.vercel.app/products`
5. Products should load!

## 🎯 Quick Check

After deployment, test these URLs (replace with your domain):

```
✅ https://your-app.vercel.app/api/health
✅ https://your-app.vercel.app/api/products
✅ https://your-app.vercel.app/products
✅ https://your-app.vercel.app/admin/products
```

## 📊 Your Environment Variables Summary

| Variable | Value Location | Purpose |
|----------|---------------|---------|
| `DATABASE_URL` | Supabase → Settings → Database → Connection String | PostgreSQL connection |
| `JWT_SECRET` | Your chosen secret | Authentication tokens |
| `SUPABASE_URL` | Supabase → Settings → API → Project URL | Supabase project |
| `SUPABASE_KEY` | Supabase → Settings → API → anon/public | API access |

## ⚠️ Important Notes

1. **Check all 3 environments**: Production, Preview, Development
2. **No quotes needed**: Paste values directly (no `"` or `'`)
3. **Save after each**: Click Save button after adding each variable
4. **Redeploy required**: Changes only apply after redeployment

## 🐛 Still Not Working?

If products still don't load after adding variables and redeploying:

1. Check Vercel deployment logs:
   - Go to **Deployments** → Click latest deployment → **Functions** tab
   - Look for errors in the logs

2. Verify variables are set:
   - Go to **Settings** → **Environment Variables**
   - All 4 should be listed

3. Test API directly:
   - Visit: `https://your-app.vercel.app/api/products`
   - Should return JSON, not an error

---

**Once you add these variables and redeploy, your products will load!** 🎉
