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
    // Get order by ID with items
    const orderResult = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [params.id]
    );
    
    if (orderResult.rows.length === 0) {
      return NextResponse.json(
        { message: 'Order not found' },
        { status: 404 }
      );
    }
    
    const itemsResult = await pool.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [params.id]
    );
    
    return NextResponse.json({
      ...orderResult.rows[0],
      items: itemsResult.rows
    });
  } catch (error: any) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { message: 'Error fetching order', error: error.message },
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
    const { status, tracking_number, payment_status, notes } = body;
    
    const result = await pool.query(
      `UPDATE orders 
       SET status = COALESCE($1, status),
           tracking_number = COALESCE($2, tracking_number),
           payment_status = COALESCE($3, payment_status),
           notes = COALESCE($4, notes),
           updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [status, tracking_number, payment_status, notes, params.id]
    );
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'Order not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { message: 'Error updating order', error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Delete order items first
      await client.query('DELETE FROM order_items WHERE order_id = $1', [params.id]);
      
      // Delete order
      const result = await client.query(
        'DELETE FROM orders WHERE id = $1 RETURNING *',
        [params.id]
      );
      
      if (result.rows.length === 0) {
        await client.query('ROLLBACK');
        return NextResponse.json(
          { message: 'Order not found' },
          { status: 404 }
        );
      }
      
      await client.query('COMMIT');
      return NextResponse.json({ message: 'Order deleted successfully' });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { message: 'Error deleting order', error: error.message },
      { status: 500 }
    );
  }
}
