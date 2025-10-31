import { VercelRequest, VercelResponse } from '@vercel/node';
import pool from '../config/supabase';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

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
      // Get product by ID
      const result = await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      return res.status(200).json(result.rows[0]);
    } 
    
    else if (req.method === 'PUT') {
      // Update product
      const { 
        name, description, price, original_price, category, subcategory, 
        image_url, images, stock, in_stock, featured, rating, review_count,
        colors, sizes, tags
      } = req.body;
      
      const result = await pool.query(
        `UPDATE products 
         SET name = $1, description = $2, price = $3, original_price = $4,
             category = $5, subcategory = $6, image_url = $7, images = $8,
             stock = $9, in_stock = $10, featured = $11, rating = $12,
             review_count = $13, colors = $14, sizes = $15, tags = $16,
             updated_at = NOW()
         WHERE id = $17
         RETURNING *`,
        [
          name, description, price, original_price, category, subcategory,
          image_url, images, stock, in_stock, featured, rating, review_count,
          colors, sizes, tags, id
        ]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      return res.status(200).json(result.rows[0]);
    } 
    
    else if (req.method === 'DELETE') {
      // Delete product
      const result = await pool.query(
        'DELETE FROM products WHERE id = $1 RETURNING *',
        [id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      return res.status(200).json({ message: 'Product deleted successfully' });
    }
    
    else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Error in product API:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
