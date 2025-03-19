import mongoose from 'mongoose';
import { Size } from './product';

export type OrderItems = {
  productId: mongoose.Types.ObjectId;
  customisationText?: string;
  quantity: number;
  size: Size;
  unitPrice: number;
};

export interface OrderInterface {
  email: string;
  orderItems: OrderItems[];
  orderTotal: number;
  address: string;
  pincode: number;
  contact: number;
  status: 'completed' | 'in transit' | 'cancelled';
}
