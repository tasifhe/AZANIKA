"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrderStatus = exports.updateOrder = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const supabase_1 = __importDefault(require("../config/supabase"));
// Create a new order
const createOrder = async (req, res) => {
    const { order_number, user_id, customer_name, customer_email, customer_phone, shipping_address, total_amount, shipping_cost, tax, status, payment_method, payment_status, tracking_number, notes, items } = req.body;
    const client = await supabase_1.default.connect();
    try {
        await client.query('BEGIN');
        // Insert order
        const orderResult = await client.query(`INSERT INTO orders (
        order_number, user_id, customer_name, customer_email, customer_phone,
        shipping_address, total_amount, shipping_cost, tax, status,
        payment_method, payment_status, tracking_number, notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`, [
            order_number, user_id, customer_name, customer_email, customer_phone,
            shipping_address, total_amount, shipping_cost, tax, status || 'Pending',
            payment_method, payment_status || 'pending', tracking_number, notes
        ]);
        const orderId = orderResult.rows[0].id;
        // Insert order items
        if (items && items.length > 0) {
            for (const item of items) {
                await client.query(`INSERT INTO order_items (
            order_id, product_id, product_name, quantity, price,
            selected_color, selected_size
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [
                    orderId, item.product_id, item.product_name, item.quantity,
                    item.price, item.selected_color, item.selected_size
                ]);
            }
        }
        await client.query('COMMIT');
        res.status(201).json(orderResult.rows[0]);
    }
    catch (error) {
        await client.query('ROLLBACK');
        res.status(400).json({ message: error.message });
    }
    finally {
        client.release();
    }
};
exports.createOrder = createOrder;
// Get all orders with filters
const getAllOrders = async (req, res) => {
    try {
        const { status, page = 1, limit = 10 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);
        let query = 'SELECT * FROM orders';
        let countQuery = 'SELECT COUNT(*) FROM orders';
        const params = [];
        if (status && status !== 'all') {
            query += ' WHERE status = $1';
            countQuery += ' WHERE status = $1';
            params.push(status);
        }
        query += ' ORDER BY order_date DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
        params.push(Number(limit), offset);
        const ordersResult = await supabase_1.default.query(query, params);
        const countResult = await supabase_1.default.query(countQuery, status && status !== 'all' ? [status] : []);
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllOrders = getAllOrders;
// Get a specific order by ID
const getOrderById = async (req, res) => {
    try {
        const orderResult = await supabase_1.default.query('SELECT * FROM orders WHERE id = $1', [req.params.id]);
        if (orderResult.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        // Get order items
        const itemsResult = await supabase_1.default.query('SELECT * FROM order_items WHERE order_id = $1', [req.params.id]);
        const order = {
            ...orderResult.rows[0],
            items: itemsResult.rows
        };
        res.status(200).json(order);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getOrderById = getOrderById;
// Update an order by ID
const updateOrder = async (req, res) => {
    const { customer_name, customer_email, customer_phone, shipping_address, total_amount, shipping_cost, tax, status, payment_method, payment_status, tracking_number, notes } = req.body;
    try {
        const result = await supabase_1.default.query(`UPDATE orders 
       SET customer_name = $1, customer_email = $2, customer_phone = $3,
           shipping_address = $4, total_amount = $5, shipping_cost = $6,
           tax = $7, status = $8, payment_method = $9, payment_status = $10,
           tracking_number = $11, notes = $12, updated_at = NOW()
       WHERE id = $13
       RETURNING *`, [
            customer_name, customer_email, customer_phone, shipping_address,
            total_amount, shipping_cost, tax, status, payment_method,
            payment_status, tracking_number, notes, req.params.id
        ]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateOrder = updateOrder;
// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const result = await supabase_1.default.query('UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *', [status, req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateOrderStatus = updateOrderStatus;
// Delete an order by ID
const deleteOrder = async (req, res) => {
    try {
        const result = await supabase_1.default.query('DELETE FROM orders WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteOrder = deleteOrder;
