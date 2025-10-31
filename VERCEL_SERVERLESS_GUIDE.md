# Vercel Serverless Backend Deployment Guide

## 🎉 Congratulations!

Your backend has been converted to **Vercel Serverless Functions**! This means:
- ✅ No CORS issues (same domain as frontend)
- ✅ Completely FREE hosting
- ✅ Auto-scales with your traffic
- ✅ Deploys automatically with your frontend
- ✅ Lightning-fast cold starts

## 📁 What Changed?

Your Express.js backend has been converted to serverless API routes:

```
api/
├── config/
│   └── supabase.ts          # Database connection
├── auth/
│   ├── login.ts             # POST /api/auth/login
│   └── register.ts          # POST /api/auth/register
├── products.ts              # GET /api/products (all), POST /api/products (create)
├── products/
│   └── [id].ts              # GET/PUT/DELETE /api/products/:id
├── orders.ts                # GET /api/orders (all), POST /api/orders (create)
└── orders/
    └── [id].ts              # GET/PUT/DELETE /api/orders/:id
```

## 🚀 Deployment Steps

### 1. Install Dependencies

```bash
npm install @vercel/node bcrypt jsonwebtoken @types/bcrypt @types/jsonwebtoken @types/pg
```

### 2. Update Environment Variables in Vercel

Go to your Vercel project → **Settings** → **Environment Variables** and add:

```bash
# Database
DATABASE_URL=your_supabase_postgres_connection_string

# JWT Secret (generate a secure random string)
JWT_SECRET=your_secure_jwt_secret_64_chars

# Supabase (optional, if using Supabase client)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
```

### 3. Update Frontend API URL

Update `src/lib/api.ts`:

```typescript
// Now your API is on the same domain!
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
```

### 4. Deploy to Vercel

```bash
# Commit your changes
git add .
git commit -m "Convert backend to Vercel serverless functions"
git push

# Vercel will automatically deploy!
```

Or manually deploy:
```bash
vercel --prod
```

## 📡 API Endpoints

After deployment, your API will be available at:

```
https://your-domain.vercel.app/api/products          # All products
https://your-domain.vercel.app/api/products/[id]     # Single product
https://your-domain.vercel.app/api/orders            # Orders
https://your-domain.vercel.app/api/orders/[id]       # Single order
https://your-domain.vercel.app/api/auth/login        # Login
https://your-domain.vercel.app/api/auth/register     # Register
```

## 🔧 Testing Locally

```bash
# Start development server
npm run dev

# Test API endpoints
curl http://localhost:3000/api/products
curl http://localhost:3000/api/auth/login -X POST -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"password"}'
```

## ✅ Advantages Over Railway/Render

| Feature | Vercel | Railway | Render |
|---------|--------|---------|--------|
| **Free Tier** | ✅ Generous | ⚠️ Limited | ⚠️ Cold starts |
| **Cold Starts** | ⚡ Fast | ⚡ Fast | 🐌 Slow (free tier) |
| **CORS** | ✅ Same domain | ❌ Need config | ❌ Need config |
| **Auto-deploy** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Scaling** | ✅ Instant | ⚠️ Manual | ⚠️ Manual |
| **Integration** | ✅ Same platform | ❌ Separate | ❌ Separate |

## 🎯 Next Steps

1. **Install dependencies**: `npm install`
2. **Update API URL**: Change `src/lib/api.ts` to use `/api`
3. **Add environment variables** in Vercel dashboard
4. **Push to GitHub** - Vercel auto-deploys
5. **Test your endpoints**

## 🔒 Security Notes

- JWT tokens expire in 24 hours
- Passwords are hashed with bcrypt
- CORS is enabled for all origins (you can restrict this)
- SSL is automatic on Vercel

## 📊 Monitoring

View your API logs in the Vercel dashboard:
- Go to your project → **Deployments** → Click on deployment → **Functions** tab
- Real-time logs and errors
- Performance metrics

## 🐛 Troubleshooting

### Database Connection Errors
- Verify `DATABASE_URL` is set correctly in Vercel
- Make sure Supabase allows connections from `0.0.0.0/0`

### Function Timeout
- Vercel free tier: 10s timeout
- Optimize slow queries
- Add database indexes

### Cold Starts
- First request after inactivity may be slower
- Subsequent requests are fast
- Pro plan has better performance

## 💰 Cost

**Completely FREE for most use cases!**
- 100GB bandwidth/month
- 1000 image optimizations
- Unlimited API requests (fair use)

---

**Your backend is now serverless and ready to scale!** 🎉
