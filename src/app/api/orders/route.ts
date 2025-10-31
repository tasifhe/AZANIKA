import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';
    const offset = (Number(page) - 1) * Number(limit);
    
    let query = 'SELECT * FROM orders';
    let countQuery = 'SELECT COUNT(*) FROM orders';
    const params: any[] = [];
    
    if (status && status !== 'all') {
      query += ' WHERE status = $1';
      countQuery += ' WHERE status = $1';
      params.push(status);
    }
    
    query += ` ORDER BY order_date DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(Number(limit), offset);
    
    const ordersResult = await pool.query(query, params);
    const countResult = await pool.query(countQuery, status && status !== 'all' ? [status] : []);
    const total = parseInt(countResult.rows[0].count);
    
    return NextResponse.json({
      orders: ordersResult.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { message: 'Error fetching orders', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      order_number, user_id, customer_name, customer_email, customer_phone,
      shipping_address, total_amount, shipping_cost, tax, status,
      payment_method, payment_status, tracking_number, notes, items
    } = body;

    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Insert order
      const orderResult = await client.query(
        `INSERT INTO orders (
          order_number, user_id, customer_name, customer_email, customer_phone,
          shipping_address, total_amount, shipping_cost, tax, status,
          payment_method, payment_status, tracking_number, notes
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *`,
        [
          order_number, user_id, customer_name, customer_email, customer_phone,
          shipping_address, total_amount, shipping_cost, tax, status || 'Pending',
          payment_method, payment_status || 'pending', tracking_number, notes
        ]
      );
      
      const orderId = orderResult.rows[0].id;
      
      // Insert order items
      if (items && items.length > 0) {
        for (const item of items) {
          await client.query(
            `INSERT INTO order_items (
              order_id, product_id, product_name, quantity, price,
              selected_color, selected_size
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
              orderId, item.product_id, item.product_name, item.quantity,
              item.price, item.selected_color, item.selected_size
            ]
          );
        }
      }
      
      await client.query('COMMIT');
      return NextResponse.json(orderResult.rows[0], { status: 201 });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { message: 'Error creating order', error: error.message },
      { status: 500 }
    );
  }
}
