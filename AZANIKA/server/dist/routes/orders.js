"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_1 = require("../controllers/orders");
const router = express_1.default.Router();
// Route to create a new order
router.post('/', orders_1.createOrder);
// Route to get all orders (with filters)
router.get('/', orders_1.getAllOrders);
// Route to get a specific order by ID
router.get('/:id', orders_1.getOrderById);
// Route to update an order by ID
router.put('/:id', orders_1.updateOrder);
// Route to update order status
router.patch('/:id/status', orders_1.updateOrderStatus);
// Route to delete an order by ID
router.delete('/:id', orders_1.deleteOrder);
exports.default = router;
