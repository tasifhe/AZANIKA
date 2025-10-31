# Railway Deployment Quick Checklist

## 🚀 Quick Deploy Steps

### 1. Create Railway Project
- Go to [railway.app](https://railway.app)
- Click "New Project" → "Deploy from GitHub repo"
- Select your AZANIKA repository

### 2. Configure Root Directory
- Go to Settings → Deploy
- Set Root Directory: `AZANIKA/server`

### 3. Add Environment Variables

Copy and paste these in Railway Variables tab (update with your values):

```bash
PORT=5000
NODE_ENV=production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.your-project.supabase.co:5432/postgres
JWT_SECRET=your_64_char_random_string
CORS_ORIGIN=https://your-app.vercel.app
```

### 4. Get Your Supabase Info
- **SUPABASE_URL**: Project Settings → API → Project URL
- **SUPABASE_KEY**: Project Settings → API → anon/public key
- **DATABASE_URL**: Project Settings → Database → Connection String (URI)

### 5. Generate JWT Secret
Run in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 6. Deploy & Get URL
- Railway deploys automatically
- Copy your URL: `https://your-app.up.railway.app`

### 7. Update Frontend
Add to Vercel environment variables:
```bash
NEXT_PUBLIC_API_URL=https://your-app.up.railway.app
```

### 8. Test
```bash
curl https://your-app.up.railway.app/health
curl https://your-app.up.railway.app/api/products
```

## ✅ Done!

Your backend is now live on Railway.

For detailed instructions, see [RAILWAY_DEPLOYMENT_GUIDE.md](./RAILWAY_DEPLOYMENT_GUIDE.md)
