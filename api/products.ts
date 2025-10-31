import { VercelRequest, VercelResponse } from '@vercel/node';
import pool from './config/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'GET') {
      // Get all products
      const result = await pool.query(
        'SELECT * FROM products ORDER BY created_at DESC'
      );
      return res.status(200).json(result.rows);
    } 
    
    else if (req.method === 'POST') {
      // Create a new product
      const { 
        name, description, price, original_price, category, subcategory, 
        image_url, images, stock, in_stock, featured, rating, review_count,
        colors, sizes, tags
      } = req.body;
      
      const result = await pool.query(
        `INSERT INTO products (
          name, description, price, original_price, category, subcategory,
          image_url, images, stock, in_stock, featured, rating, review_count,
          colors, sizes, tags
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
        RETURNING *`,
        [
          name, description, price, original_price, category, subcategory,
          image_url, images, stock, in_stock, featured, rating, review_count,
          colors, sizes, tags
        ]
      );
      return res.status(201).json(result.rows[0]);
    }
    
    else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Error in products API:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
