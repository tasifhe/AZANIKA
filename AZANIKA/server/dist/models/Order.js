"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    products: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
});
const Order = (0, mongoose_1.model)('Order', orderSchema);
exports.default = Order;
