import { Request, Response } from 'express';
import pool from '../config/supabase';

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
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
    res.status(201).json(orderResult.rows[0]);
  } catch (error: any) {
    await client.query('ROLLBACK');
    res.status(400).json({ message: error.message });
  } finally {
    client.release();
  }
};

// Get all orders with filters
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);
    
    let query = 'SELECT * FROM orders';
    let countQuery = 'SELECT COUNT(*) FROM orders';
    const params: any[] = [];
    
    if (status && status !== 'all') {
      query += ' WHERE status = $1';
      countQuery += ' WHERE status = $1';
      params.push(status);
    }
    
    query += ' ORDER BY order_date DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(Number(limit), offset);
    
    const ordersResult = await pool.query(query, params);
    const countResult = await pool.query(countQuery, status && status !== 'all' ? [status] : []);
    const total = parseInt(countResult.rows[0].count);
    
    res.status(200).json({
      orders: ordersResult.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderResult = await pool.query(
      'SELECT * FROM orders WHERE id = $1',
      [req.params.id]
    );
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Get order items
    const itemsResult = await pool.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [req.params.id]
    );
    
    const order = {
      ...orderResult.rows[0],
      items: itemsResult.rows
    };
    
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update an order by ID
export const updateOrder = async (req: Request, res: Response) => {
  const {
    customer_name, customer_email, customer_phone, shipping_address,
    total_amount, shipping_cost, tax, status, payment_method,
    payment_status, tracking_number, notes
  } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE orders 
       SET customer_name = $1, customer_email = $2, customer_phone = $3,
           shipping_address = $4, total_amount = $5, shipping_cost = $6,
           tax = $7, status = $8, payment_method = $9, payment_status = $10,
           tracking_number = $11, notes = $12, updated_at = NOW()
       WHERE id = $13
       RETURNING *`,
      [
        customer_name, customer_email, customer_phone, shipping_address,
        total_amount, shipping_cost, tax, status, payment_method,
        payment_status, tracking_number, notes, req.params.id
      ]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update order status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const result = await pool.query(
      'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [status, req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order by ID
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'DELETE FROM orders WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};