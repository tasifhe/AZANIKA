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
      // Get all orders with optional filters
      const { status, page = '1', limit = '10' } = req.query;
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
      
      return res.status(200).json({
        orders: ordersResult.rows,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      });
    } 
    
    else if (req.method === 'POST') {
      // Create a new order
      const {
        order_number, user_id, customer_name, customer_email, customer_phone,
        shipping_address, total_amount, shipping_cost, tax, status,
        payment_method, payment_status, tracking_number, notes, items
      } = req.body;

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
        return res.status(201).json(orderResult.rows[0]);
      } catch (error: any) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    }
    
    else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Error in orders API:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
