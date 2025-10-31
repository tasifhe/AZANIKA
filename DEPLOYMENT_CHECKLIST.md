# ✅ Vercel Serverless Deployment Checklist

## Before Deployment

- [x] ✅ Serverless API routes created in `/api` folder
- [x] ✅ Dependencies installed (`@vercel/node`, `bcrypt`, `jsonwebtoken`, etc.)
- [x] ✅ Frontend API URL updated to `/api`
- [x] ✅ `vercel.json` configuration added
- [ ] ⏳ Environment variables added to Vercel

## Environment Variables Needed

Add these in **Vercel Dashboard → Settings → Environment Variables**:

### Required Variables:

```bash
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres
```
👆 Get from: Supabase → Settings → Database → Connection string

```bash
JWT_SECRET=generate_a_secure_random_64_character_string
```
👆 Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

```bash
SUPABASE_URL=https://your-project.supabase.co
```
👆 Get from: Supabase → Settings → API → Project URL

```bash
SUPABASE_KEY=your_supabase_anon_public_key
```
👆 Get from: Supabase → Settings → API → anon/public key

## Deployment Steps

### 1. Generate JWT Secret

Run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```
Copy the output 👆

### 2. Add Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your AZANIKA project
3. Click **Settings** → **Environment Variables**
4. Add all 4 variables listed above
5. Set them for: **Production**, **Preview**, and **Development**

### 3. Deploy

```bash
# Commit your changes
git add .
git commit -m "Add Vercel serverless backend"
git push origin main
```

✨ **Vercel will automatically deploy!**

### 4. Test After Deployment

Visit these URLs (replace `your-app` with your actual Vercel domain):

```bash
# Health check
✅ https://your-app.vercel.app/api/health

# Products
✅ https://your-app.vercel.app/api/products

# Single product (replace with actual ID)
✅ https://your-app.vercel.app/api/products/[product-id]
```

## Verification

After deployment, check:

- [ ] ⏳ API health endpoint returns 200 OK
- [ ] ⏳ Products page loads with data
- [ ] ⏳ Admin dashboard works
- [ ] ⏳ Login/Register functions
- [ ] ⏳ No CORS errors in browser console

## Troubleshooting

### If products don't load:

1. Open browser DevTools (F12) → Console tab
2. Check for errors
3. Go to Vercel Dashboard → Deployments → Functions tab
4. Check function logs for errors

### If database connection fails:

1. Verify `DATABASE_URL` in Vercel environment variables
2. Check Supabase allows connections (should be default)
3. Test connection string format

### If JWT errors occur:

1. Make sure `JWT_SECRET` is set in Vercel
2. Should be 64+ characters long
3. No special characters that need escaping

## Quick Commands

```bash
# Test locally
npm run dev

# Build for production (optional, Vercel does this)
npm run build

# Check for errors
npm run lint
```

## 📊 Monitoring

After deployment, monitor your API:

1. **Vercel Dashboard** → Your Project → **Functions**
   - View execution times
   - See error rates
   - Check invocation count

2. **Logs**
   - Real-time logs in Vercel
   - Filter by function name
   - Search for errors

## 🎯 Success Criteria

✅ All checkboxes above are marked  
✅ API health endpoint returns 200  
✅ Products load on website  
✅ Admin dashboard functions properly  
✅ No console errors  
✅ Fast response times (<1s)  

## 🎉 Done!

Once all checkboxes are ✅, your backend is fully deployed on Vercel Serverless!

---

**Need help?** See:
- [VERCEL_SERVERLESS_GUIDE.md](./VERCEL_SERVERLESS_GUIDE.md) - Detailed guide
- [BACKEND_MIGRATION_COMPLETE.md](./BACKEND_MIGRATION_COMPLETE.md) - Migration summary
