import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
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

const Order = model('Order', orderSchema);

export default Order;