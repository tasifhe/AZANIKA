# 🚀 Quick Migration to Supabase (Best Free Database)

## Why Supabase?

✅ **500MB database** (vs 512MB MongoDB)
✅ **1GB file storage** (for product images!)
✅ **Built-in authentication** (ready to use)
✅ **Realtime subscriptions** (instant updates)
✅ **Auto-generated REST API**
✅ **5GB bandwidth**
✅ **Better free tier overall**

---

## Step 1: Create Supabase Account (2 minutes)

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub
4. Create new project:
   - Project name: `azanika-db`
   - Database password: **Generate and SAVE**
   - Region: Choose closest to you
   - Click "Create new project" (takes ~2 minutes)

---

## Step 2: Setup Database Schema (1 minute)

1. In Supabase Dashboard, click **SQL Editor** in left menu
2. Click **New Query**
3. Copy and paste this SQL:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category VARCHAR(100),
  subcategory VARCHAR(100),
  image_url TEXT,
  images TEXT[], -- Array for multiple images
  stock INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  colors TEXT[],
  sizes TEXT[],
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  avatar TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  shipping_address JSONB NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'Pending',
  payment_method VARCHAR(100),
  payment_status VARCHAR(50) DEFAULT 'pending',
  tracking_number VARCHAR(100),
  notes TEXT,
  order_date TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  selected_color VARCHAR(50),
  selected_size VARCHAR(50)
);

-- Indexes for performance
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_date ON orders(order_date DESC);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_stock ON products(stock);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for auto-updating timestamps
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert some demo products
INSERT INTO products (name, description, price, original_price, category, subcategory, image_url, images, stock, featured, rating, review_count, colors, sizes, tags) VALUES
('Elegant Pearl Statement Necklace', 'A stunning multi-layered pearl necklace', 89.99, 129.99, 'jewelry', 'necklaces', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80', ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80', 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&q=80'], 25, true, 4.8, 124, ARRAY['White', 'Cream', 'Rose Gold'], NULL, ARRAY['elegant', 'pearl', 'statement']),
('Vintage Leather Crossbody Bag', 'Handcrafted genuine leather crossbody bag', 149.99, 199.99, 'bags', 'crossbody', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80', ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80'], 15, true, 4.9, 89, ARRAY['Brown', 'Black', 'Tan'], NULL, ARRAY['vintage', 'leather', 'crossbody']),
('Delicate Gold Chain Bracelet', 'Minimalist 18k gold-plated chain bracelet', 39.99, 59.99, 'jewelry', 'bracelets', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80', ARRAY['https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80'], 50, true, 4.7, 203, ARRAY['Gold', 'Silver', 'Rose Gold'], NULL, ARRAY['minimalist', 'gold', 'bracelet']);
```

4. Click **Run** (bottom right)
5. You should see "Success. No rows returned"

---

## Step 3: Get Connection String

1. Go to **Project Settings** (gear icon) → **Database**
2. Scroll to **Connection string**
3. Select **Connection pooling** tab
4. Copy the connection string
5. Replace `cin>>Pass69;` with your database password

Example:
```
postgresql://postgres.abcdefgh:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

---

## Step 4: Update Backend Code

### Install PostgreSQL Driver

```bash
cd AZANIKA/server
npm install pg
```

### Update .env File

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres.xxx:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
JWT_SECRET=your_super_secure_random_string
CLIENT_URL=http://localhost:3000
```

### Create Database Connection File

Create `AZANIKA/server/src/config/supabase.ts`:

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection
pool.on('connect', () => {
  console.log('Connected to Supabase PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
```

### Update Controllers to Use PostgreSQL

**Example: Products Controller**

`AZANIKA/server/src/controllers/products.ts`:

```typescript
import { Request, Response } from 'express';
import pool from '../config/supabase';

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    res.status(200).json(result.rows);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Create product
export const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, category, image_url, stock } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO products (name, description, price, category, image_url, stock)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, description, price, category, image_url, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, price, category, image_url, stock } = req.body;
  try {
    const result = await pool.query(
      `UPDATE products 
       SET name = $1, description = $2, price = $3, category = $4, 
           image_url = $5, stock = $6, updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [name, description, price, category, image_url, stock, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
```

---

## Step 5: Test Locally

```bash
# Start backend
cd AZANIKA/server
npm run dev

# Should see: "Connected to Supabase PostgreSQL database"
```

Test API:
```bash
# Get all products
curl http://localhost:5000/api/products

# Should return the demo products
```

---

## Step 6: Deploy

Your Supabase database is already live! Just deploy your backend:

1. Update Render environment variables:
   - `DATABASE_URL` = Your Supabase connection string

2. Deploy frontend to Vercel as usual

---

## 🎁 Bonus Features with Supabase

### 1. Built-in File Storage (FREE 1GB)

Store product images directly in Supabase:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// Upload image
const { data, error } = await supabase.storage
  .from('product-images')
  .upload('product1.jpg', file);
```

### 2. Built-in Auth

```typescript
// Sign up user
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});
```

### 3. Realtime Updates

```typescript
// Listen to order changes
supabase
  .channel('orders')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'orders' },
    (payload) => {
      console.log('Order changed:', payload);
    }
  )
  .subscribe();
```

---

## 🆚 Supabase vs MongoDB Atlas

| Feature | Supabase | MongoDB Atlas |
|---------|----------|---------------|
| **Storage** | 500MB | 512MB |
| **File Storage** | 1GB included | Need external service |
| **Auth** | Built-in | Need to build |
| **Realtime** | Built-in | Need to build |
| **API** | Auto-generated | Need to build |
| **Queries** | SQL (powerful) | NoSQL |
| **Learning Curve** | Easy (SQL) | Moderate (MongoDB) |
| **Free Tier** | Very generous | Limited |

**Verdict: Supabase wins for startups! 🏆**

---

## 📚 Resources

- Supabase Docs: https://supabase.com/docs
- PostgreSQL Tutorial: https://www.postgresqltutorial.com
- Supabase JavaScript Client: https://supabase.com/docs/reference/javascript

---

## ✅ Checklist

- [ ] Created Supabase account
- [ ] Created project and saved password
- [ ] Ran SQL schema in SQL Editor
- [ ] Copied connection string
- [ ] Installed `pg` package
- [ ] Created `config/supabase.ts`
- [ ] Updated controllers to use PostgreSQL
- [ ] Updated `.env` with DATABASE_URL
- [ ] Tested locally
- [ ] Deployed backend with new connection string

**You're done! Enjoy your better free database! 🎉**
