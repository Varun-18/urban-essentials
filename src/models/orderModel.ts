import mongoose, { Schema } from 'mongoose';
import { OrderInterface, OrderItems, Size } from 'types';

const orderItems: Schema<OrderItems> = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'products',
  },
  quantity: { type: Number, required: true },
  customisationText: { type: String, required: false, default: '' },
  size: { type: String, enum: Object.values(Size), required: true },
  unitPrice: { type: Number, required: true },
});

const orderSchema: Schema<OrderInterface> = new mongoose.Schema({
  email: { type: String, required: true },
  orderItems: { type: [orderItems], required: true, default: [] },
  address: { type: String, required: true },
  contact: { type: Number, required: true },
  orderTotal: { type: Number, required: true, default: 0 },
  pincode: { type: Number, required: true },
  status: {
    type: String,
    enum: ['completed', 'in transit', 'cancelled'],
    default: 'in transit',
  },
});

export const OrderModel = mongoose.model<OrderInterface>('orders', orderSchema);
