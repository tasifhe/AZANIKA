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
      // Get order by ID with items
      const orderResult = await pool.query(
        'SELECT * FROM orders WHERE id = $1',
        [id]
      );
      
      if (orderResult.rows.length === 0) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      const itemsResult = await pool.query(
        'SELECT * FROM order_items WHERE order_id = $1',
        [id]
      );
      
      return res.status(200).json({
        ...orderResult.rows[0],
        items: itemsResult.rows
      });
    } 
    
    else if (req.method === 'PUT') {
      // Update order
      const { status, tracking_number, payment_status, notes } = req.body;
      
      const result = await pool.query(
        `UPDATE orders 
         SET status = COALESCE($1, status),
             tracking_number = COALESCE($2, tracking_number),
             payment_status = COALESCE($3, payment_status),
             notes = COALESCE($4, notes),
             updated_at = NOW()
         WHERE id = $5
         RETURNING *`,
        [status, tracking_number, payment_status, notes, id]
      );
      
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      return res.status(200).json(result.rows[0]);
    } 
    
    else if (req.method === 'DELETE') {
      // Delete order
      const client = await pool.connect();
      
      try {
        await client.query('BEGIN');
        
        // Delete order items first
        await client.query('DELETE FROM order_items WHERE order_id = $1', [id]);
        
        // Delete order
        const result = await client.query(
          'DELETE FROM orders WHERE id = $1 RETURNING *',
          [id]
        );
        
        if (result.rows.length === 0) {
          await client.query('ROLLBACK');
          return res.status(404).json({ message: 'Order not found' });
        }
        
        await client.query('COMMIT');
        return res.status(200).json({ message: 'Order deleted successfully' });
      } catch (error) {
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
    console.error('Error in order API:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
