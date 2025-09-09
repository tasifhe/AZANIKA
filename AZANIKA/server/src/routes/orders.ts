import express from 'express';
import { createOrder, getOrder, getOrders } from '../controllers/orders';

const router = express.Router();

// Route to create a new order
router.post('/', createOrder);

// Route to get a specific order by ID
router.get('/:id', getOrder);

// Route to get all orders
router.get('/', getOrders);

export default router;