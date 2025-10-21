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

// Get a single product by ID
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

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  const { 
    name, description, price, original_price, category, subcategory, 
    image_url, images, stock, in_stock, featured, rating, review_count,
    colors, sizes, tags
  } = req.body;
  
  try {
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
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { 
    name, description, price, original_price, category, subcategory, 
    image_url, images, stock, in_stock, featured, rating, review_count,
    colors, sizes, tags
  } = req.body;
  
  try {
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
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product by ID
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