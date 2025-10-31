import express from 'express';
import { 
  createOrder, 
  getOrderById, 
  getAllOrders, 
  updateOrder, 
  updateOrderStatus, 
  deleteOrder 
} from '../controllers/orders';

const router = express.Router();

// Route to create a new order
router.post('/', createOrder);

// Route to get all orders (with filters)
router.get('/', getAllOrders);

// Route to get a specific order by ID
router.get('/:id', getOrderById);

// Route to update an order by ID
router.put('/:id', updateOrder);

// Route to update order status
router.patch('/:id/status', updateOrderStatus);

// Route to delete an order by ID
router.delete('/:id', deleteOrder);

export default router;