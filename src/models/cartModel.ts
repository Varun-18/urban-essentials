import mongoose, { Schema } from "mongoose";
import { CartInterface } from "types";

export const cartSchema: Schema<CartInterface> = new mongoose.Schema({
    email: { type: String, required: true },
    items: {
        type:[
        {
            id: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
        }
    ],
    default:[]
    }
});

export const Cart = mongoose.model<CartInterface>(
    'cart',
    cartSchema
  );