import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [params.id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { message: 'Error fetching product', error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { 
      name, description, price, original_price, category, subcategory, 
      image_url, images, stock, in_stock, featured, rating, review_count,
      colors, sizes, tags
    } = body;
    
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
        colors, sizes, tags, params.id
      ]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { message: 'Error updating product', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [params.id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { message: 'Error deleting product', error: error.message },
      { status: 500 }
    );
  }
}
