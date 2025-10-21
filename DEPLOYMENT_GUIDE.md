# 🚀 Free Deployment Guide for AZANIKA E-Commerce

Complete guide to deploy your full-stack e-commerce website for **FREE**!

## 📋 Overview

- **Frontend**: Vercel (Free tier)
- **Backend**: Render or Railway (Free tier)
- **Database**: Choose one:
  - **Supabase** (FREE - 500MB, PostgreSQL, Best Option!) ⭐
  - **PlanetScale** (FREE - 5GB, MySQL, Great Performance)
  - **Neon** (FREE - 3GB, PostgreSQL, Generous Limits)
  - MongoDB Atlas (FREE - 512MB, limited)
- **Payment**: Stripe (Free for testing, pay-per-transaction in production)
- **Images**: Cloudinary or Uploadthing (Free tier)

---

## 🗄️ Step 1: Deploy Database (Choose Your Option)

### Option A: Supabase (RECOMMENDED ⭐)
**Best free tier: 500MB database + 1GB file storage + Auth + Realtime**

#### 1.1 Create Supabase Account

1. Go to [Supabase](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub
4. Create new project:
   - Name: `azanika-db`
   - Database Password: Generate strong password (SAVE THIS!)
   - Region: Choose closest to users
   - Plan: FREE

#### 1.2 Get Connection String

```bash
1. Go to Project Settings → Database
2. Copy "Connection string" under "Connection pooling"
3. Replace [YOUR-PASSWORD] with your database password

Example:
postgresql://postgres.[project-ref]:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

#### 1.3 Setup Database Schema

```sql
-- In Supabase SQL Editor, run these commands:

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID,
  customer_name VARCHAR(255),
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  order_date TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_products_category ON products(category);
```

#### 1.4 Backend Configuration

Update your backend to use PostgreSQL:
```bash
npm install pg
```

---

### Option B: PlanetScale (Great Alternative)
**5GB storage, MySQL, Excellent performance**

#### 1.1 Create PlanetScale Account

1. Go to [PlanetScale](https://planetscale.com)
2. Sign up with GitHub
3. Create database:
   - Name: `azanika`
   - Region: Choose closest
   - Plan: Hobby (FREE)

#### 1.2 Get Connection String

```bash
1. Go to your database → "Connect"
2. Select "Prisma" or "General"
3. Copy connection string:

mysql://[username]:[password]@[host]/azanika?sslaccept=strict
```

#### 1.3 Backend Configuration

```bash
npm install mysql2
```

---

### Option C: Neon (PostgreSQL, Generous Free Tier)
**3GB storage, PostgreSQL, Auto-scaling**

#### 1.1 Create Neon Account

1. Go to [Neon](https://neon.tech)
2. Sign up with GitHub
3. Create project:
   - Name: `azanika-db`
   - Region: Choose closest
   - Plan: FREE (3GB)

#### 1.2 Get Connection String

```bash
1. Dashboard → Connection Details
2. Copy "Connection string"

postgresql://[user]:[password]@[host]/[dbname]?sslmode=require
```

---

### Option D: MongoDB Atlas (Original Option)

**If you still prefer MongoDB (512MB limit)**

### 1.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free"
3. Sign up with Google/Email
4. Create a free M0 Cluster (512MB storage)

### 1.2 Configure Database

```bash
1. Choose Cloud Provider: AWS
2. Region: Choose closest to your users
3. Cluster Tier: M0 Sandbox (FREE)
4. Cluster Name: azanika-cluster
5. Click "Create Cluster"
```

### 1.3 Setup Database Access

```bash
# Database Access:
1. Click "Database Access" in left menu
2. Add New Database User
   - Username: azanika_admin
   - Password: Generate secure password (SAVE THIS!)
   - User Privileges: Read and write to any database

# Network Access:
1. Click "Network Access"
2. Add IP Address
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, restrict to your server IPs
```

### 1.4 Get Connection String

```bash
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy connection string:
   mongodb+srv://azanika_admin:<password>@azanika-cluster.xxxxx.mongodb.net/azanika?retryWrites=true&w=majority

4. Replace <password> with your actual password
5. Save this for backend deployment
```

---

## � Database Comparison

| Feature | Supabase ⭐ | PlanetScale | Neon | MongoDB Atlas |
|---------|------------|-------------|------|---------------|
| **Storage** | 500MB | 5GB | 3GB | 512MB |
| **Type** | PostgreSQL | MySQL | PostgreSQL | MongoDB |
| **Rows/Docs** | Unlimited | 1B rows | Unlimited | Limited |
| **Connections** | 500 | 1000 | Unlimited | 500 |
| **Bandwidth** | 5GB | 1TB reads | 5GB | Limited |
| **Extras** | Auth, Storage, Realtime | Branching, Insights | Auto-scaling | Cloud backup |
| **Best For** | All-in-one | High traffic | Serverless | Document store |

**Recommendation:** Use **Supabase** for the best free tier with most features! ⭐

---

## �🖥️ Step 2: Deploy Backend (Render - FREE)

### 2.1 Prepare Backend for Deployment

```bash
# Navigate to server directory
cd AZANIKA/server

# Create .env file with production values
# (Don't commit this file!)
```

Create `AZANIKA/server/.env`:
```env
PORT=5000
NODE_ENV=production

# Choose based on your database:
# For Supabase/Neon (PostgreSQL):
DATABASE_URL=postgresql://postgres:[password]@[host]:6543/postgres

# For PlanetScale (MySQL):
DATABASE_URL=mysql://[username]:[password]@[host]/azanika

# For MongoDB Atlas:
MONGODB_URI=mongodb+srv://[username]:[password]@[host]/azanika

JWT_SECRET=your_super_secure_random_string_min_32_chars
CLIENT_URL=https://your-app-name.vercel.app
```

### 2.2 Deploy to Render

1. **Push Code to GitHub**
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/AZANIKA.git
git push -u origin main
```

2. **Create Render Account**
   - Go to [Render.com](https://render.com)
   - Sign up with GitHub

3. **Create New Web Service**
```bash
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - Name: azanika-backend
   - Region: Choose closest region
   - Branch: main
   - Root Directory: AZANIKA/server
   - Runtime: Node
   - Build Command: npm install && npm run build
   - Start Command: npm start
   - Plan: Free
```

4. **Add Environment Variables**
```bash
In Render Dashboard → Environment:
- PORT: 5000
- NODE_ENV: production
- MONGODB_URI: (your MongoDB Atlas connection string)
- JWT_SECRET: (generate secure random string)
- CLIENT_URL: https://your-app.vercel.app
```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Your API will be at: `https://azanika-backend.onrender.com`

⚠️ **Note**: Free tier sleeps after 15 minutes of inactivity. First request may take 30-60 seconds to wake up.

---

## 🌐 Step 3: Deploy Frontend (Vercel - FREE)

### 3.1 Prepare Frontend

Create `.env.local` in root directory:
```env
NEXT_PUBLIC_API_URL=https://azanika-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://your-app-name.vercel.app
```

### 3.2 Deploy to Vercel

1. **Install Vercel CLI (Optional)**
```bash
npm install -g vercel
```

2. **Deploy via Vercel Dashboard**
   - Go to [Vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:

```bash
Framework Preset: Next.js
Root Directory: ./ (or leave empty if root)
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

3. **Add Environment Variables**
```bash
NEXT_PUBLIC_API_URL=https://azanika-backend.onrender.com/api
NEXT_PUBLIC_SITE_URL=https://your-app-name.vercel.app
```

4. **Deploy**
   - Click "Deploy"
   - Your site will be live in 2-3 minutes
   - Custom domain at: `https://your-project.vercel.app`

---

## 💳 Step 4: Setup Stripe Payment (FREE for testing)

### 4.1 Create Stripe Account

1. Go to [Stripe.com](https://stripe.com)
2. Sign up for free
3. Activate your account

### 4.2 Get API Keys

```bash
1. Go to Developers → API Keys
2. Copy:
   - Publishable key (starts with pk_test_)
   - Secret key (starts with sk_test_)
```

### 4.3 Add to Environment Variables

**Backend (.env on Render)**:
```env
STRIPE_SECRET_KEY=sk_test_your_secret_key
```

**Frontend (.env.local on Vercel)**:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

---

## 🖼️ Step 5: Setup Image Storage (Optional - Cloudinary FREE)

### 5.1 Create Cloudinary Account

1. Go to [Cloudinary.com](https://cloudinary.com)
2. Sign up (FREE: 25GB storage, 25GB bandwidth/month)

### 5.2 Get Credentials

```bash
Dashboard → Account Details:
- Cloud Name
- API Key
- API Secret
```

### 5.3 Add to Backend Environment

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## ✅ Step 6: Verify Deployment

### 6.1 Test Backend

```bash
# Test health endpoint
curl https://azanika-backend.onrender.com/health

# Should return: {"status":"OK","message":"Server is running"}
```

### 6.2 Test Frontend

```bash
1. Visit: https://your-app.vercel.app
2. Check homepage loads
3. Test product browsing
4. Test cart functionality
```

### 6.3 Test Admin Dashboard

```bash
1. Go to: https://your-app.vercel.app/admin/login
2. Login with demo credentials:
   Email: admin@azanika.com
   Password: admin123
3. Verify dashboard loads
```

---

## 🔧 Post-Deployment Configuration

### Update CORS

In `AZANIKA/server/src/app.ts`, update CORS to allow your Vercel domain:

```typescript
app.use(cors({
  origin: [
    'https://your-app.vercel.app',
    'http://localhost:3000' // for local development
  ],
  credentials: true
}));
```

Redeploy backend after this change.

---

## 💰 FREE Tier Limits

| Service | Free Tier Limits |
|---------|-----------------|
| **Vercel** | 100GB bandwidth/month, Unlimited sites |
| **Render** | 750 hours/month, Sleeps after 15min inactive |
| **MongoDB Atlas** | 512MB storage, Shared RAM |
| **Stripe** | Unlimited test transactions, 2.9% + 30¢ per live transaction |
| **Cloudinary** | 25GB storage, 25GB bandwidth/month |

---

## 🚨 Important Notes

### Render Free Tier Sleep
- Free backend sleeps after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up
- Solution: Use a free service like [UptimeRobot](https://uptimerobot.com) to ping your API every 5 minutes

### MongoDB Atlas
- 512MB limit (enough for ~1000 products and orders)
- Upgrade to M10 ($0.08/hour) when needed

### Security
- Change admin credentials immediately
- Use strong JWT_SECRET (32+ random characters)
- Enable rate limiting in production
- Never commit .env files

---

## 📱 Custom Domain (Optional but FREE)

### For Vercel:
```bash
1. Go to your project settings
2. Domains → Add Domain
3. Follow instructions to configure DNS
4. Free SSL certificate automatically
```

### For Render:
```bash
1. Custom domains available on free tier
2. Project Settings → Custom Domain
3. Add CNAME record: your-domain.com → your-app.onrender.com
```

---

## 🔄 Continuous Deployment

Both Vercel and Render automatically redeploy when you push to GitHub:

```bash
git add .
git commit -m "Update features"
git push origin main
# Automatically deploys to Vercel and Render!
```

---

## 🆘 Troubleshooting

### Backend not connecting to database
```bash
- Check MongoDB Atlas Network Access allows 0.0.0.0/0
- Verify connection string is correct
- Check database user has read/write permissions
```

### Frontend can't reach backend
```bash
- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS settings on backend
- Ensure backend is deployed and running
```

### Render service sleeping
```bash
- Setup UptimeRobot to ping https://your-api.onrender.com/health every 5 minutes
- This keeps your free service awake
```

---

## 🎉 You're Live!

Your complete e-commerce site is now running 100% FREE with:
- ✅ Professional frontend on Vercel
- ✅ Scalable backend API on Render  
- ✅ Cloud database on MongoDB Atlas
- ✅ Payment processing with Stripe
- ✅ Admin dashboard for managing orders & inventory
- ✅ Automatic deployments from GitHub
- ✅ SSL certificates (HTTPS)
- ✅ CDN for fast loading worldwide

**Total Cost: $0/month** (until you exceed free tier limits)

---

## 📈 When to Upgrade

Upgrade when you reach:
- **Vercel**: 100GB bandwidth/month (about 30k-50k visits)
- **Render**: Need always-on service or more CPU/RAM
- **MongoDB**: 512MB storage (about 1000 orders)
- **Stripe**: When processing real payments (2.9% + 30¢ per transaction)

Estimated cost for small business: **$15-25/month**
