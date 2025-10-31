import { NextRequest, NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

export async function GET() {
  const pool = getPool();
  
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { 
        message: 'Error fetching products', 
        error: error.message,
        details: process.env.DATABASE_URL ? 'DB URL is set' : 'DB URL is missing'
      },
      { status: 500 }
    );
  } finally {
    await pool.end();
  }
}

export async function POST(request: NextRequest) {
  const pool = getPool();
  
  try {
    const body = await request.json();
    const { 
      name, description, price, original_price, category, subcategory, 
      image_url, images, stock, in_stock, featured, rating, review_count,
      colors, sizes, tags
    } = body;
    
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
    
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Error creating product', error: error.message },
      { status: 500 }
    );
  } finally {
    await pool.end();
  }
}
